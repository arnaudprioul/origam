/**
 * GET /api/reference/:kind
 *
 * Returns the lightweight catalog for one entity family. Replaces the static
 * *_CATALOG constants and the import.meta.glob index patterns used by the
 * pages index.vue files.
 *
 * Validation: :kind must be one of the 8 DOC_KINDS (400 otherwise).
 *
 * Query params:
 *   ?category=<string>   filter by category/domain (all if omitted)
 *   ?limit=<number>      cap the number of entries returned (all if omitted)
 *   ?orphaned=1          include orphaned entries (excluded by default)
 *
 * Response shape per kind:
 *   component  - IComponentEntry[]   (includes family members via batch relation query)
 *   composable - IComposableEntry[]  (includes related slugs)
 *   const      - IConstEntry[]
 *   directive  - catalog entry (slug, name, icon, category, descriptionKey, descriptionFallback)
 *   enum       - IEnumEntry[]
 *   interface  - IInterfaceEntry[]
 *   type       - ITypeEntry[]        (includes kind: type or enum from kind_extra)
 *   util       - IUtilEntry[]        (includes related slugs)
 *
 * Cache: 5 min per kind + filter combination.
 * Invalidate on re-sync / backoffice edit (ticket E clears the storage keys).
 */

import { DocEntry, DocRelation } from '../../db/entities'

/** Inline type to avoid cross-directory import type issues with Nitro esbuild. */
type DescMap = Map<string, { description_key: string | null; description_fallback: string | null }>

const CACHE_TTL_SECONDS = 300

export default defineCachedEventHandler(
    async (event) => {
        const kind = getRouterParam(event, 'kind') ?? ''
        assertKind(kind)

        const query = getQuery(event)
        const categoryFilter = typeof query.category === 'string' && query.category
            ? query.category
            : undefined
        const limitRaw = typeof query.limit === 'string' ? parseInt(query.limit, 10) : undefined
        const limit = limitRaw && Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : undefined
        const includeOrphaned = query.orphaned === '1'

        const db = await useDb()
        const entryRepo = db.getRepository(DocEntry)

        let qb = entryRepo
            .createQueryBuilder('e')
            .where('e.kind = :kind', { kind })
            .orderBy('e.name', 'ASC')

        if (!includeOrphaned) {
            qb = qb.andWhere('e.orphaned_at IS NULL')
        }
        if (categoryFilter) {
            qb = qb.andWhere('e.category = :cat', { cat: categoryFilter })
        }
        if (limit) {
            qb = qb.limit(limit)
        }

        const entries: any[] = await qb.getMany()

        if (entries.length === 0) return []

        // ─── Kinds with relation data in the catalog ───────────────────────

        if (kind === 'component') {
            return buildComponentCatalog(db, entries)
        }
        if (kind === 'composable') {
            return buildRelatedCatalog(db, entries, mapComposableEntry)
        }
        if (kind === 'util') {
            return buildRelatedCatalog(db, entries, mapUtilEntry)
        }

        // ─── Kinds without relation data in the catalog ────────────────────

        return entries.map((e: any) => {
            switch (kind) {
                case 'const': return mapConstEntry(e)
                case 'directive': return mapDirectiveCatalogEntry(e)
                case 'enum': return mapEnumEntry(e)
                case 'interface': return mapInterfaceEntry(e)
                case 'type': return mapTypeEntry(e)
                default: return { slug: e.slug, name: e.name }
            }
        })
    },
    {
        maxAge: CACHE_TTL_SECONDS,
        name: 'reference-catalog',
        getKey: (event) => {
            const kind = getRouterParam(event, 'kind') ?? ''
            const q = getQuery(event)
            return `catalog:${kind}:${q.category ?? ''}:${q.limit ?? ''}:${q.orphaned ?? ''}`
        },
    },
)

// ─── Catalog builders with batch relation queries ──────────────────────────

/**
 * Component catalog: includes IComponentFamilyMember[] for each entry.
 * Two extra queries: family relations + family member descriptions.
 */
async function buildComponentCatalog (db: any, entries: any[]) {
    const ids = entries.map((e: any) => e.id as string)

    const familyRels: any[] = ids.length > 0
        ? await db
            .getRepository(DocRelation)
            .createQueryBuilder('r')
            .where('r.entry_id IN (:...ids)', { ids })
            .andWhere('r.rel_type = :rt', { rt: 'family' })
            .orderBy('r.position', 'ASC')
            .getMany()
        : []

    // Batch-fetch descriptions for family member entries.
    const descMap: DescMap = new Map()
    const familySlugs = [...new Set(familyRels.map((r: any) => r.to_slug).filter(Boolean))]
    if (familySlugs.length > 0) {
        const descRows: any[] = await db
            .getRepository(DocEntry)
            .createQueryBuilder('fe')
            .where('fe.kind = :k AND fe.slug IN (:...slugs)', { k: 'component', slugs: familySlugs })
            .getMany()
        for (const row of descRows) {
            descMap.set(row.slug, {
                description_key: row.description_key,
                description_fallback: row.description_fallback,
            })
        }
    }

    // Group family members by parent entry_id.
    const familyByEntryId = new Map<string, ReturnType<typeof mapComponentEntry>['family']>()
    for (const rel of familyRels) {
        const list = familyByEntryId.get(rel.entry_id) ?? []
        const desc = descMap.get(rel.to_slug) ?? { description_key: null, description_fallback: null }
        list.push({
            slug: rel.to_slug ?? '',
            name: rel.to_name ?? '',
            descriptionKey: rel.description_key || desc.description_key || '',
            descriptionFallback: rel.description_fallback || desc.description_fallback || '',
        })
        familyByEntryId.set(rel.entry_id, list)
    }

    return entries.map((e: any) =>
        mapComponentEntry(e, familyByEntryId.get(e.id) ?? []),
    )
}

/**
 * Generic "related slugs" catalog builder — used for composable and util.
 * Accepts the entry-level mapper so the shape stays kind-specific.
 */
async function buildRelatedCatalog (
    db: any,
    entries: any[],
    mapper: (row: any, related: string[]) => unknown,
) {
    const ids = entries.map((e: any) => e.id as string)

    const relRels: any[] = ids.length > 0
        ? await db
            .getRepository(DocRelation)
            .createQueryBuilder('r')
            .where('r.entry_id IN (:...ids)', { ids })
            .andWhere('r.rel_type = :rt', { rt: 'related' })
            .getMany()
        : []

    const relatedByEntryId = new Map<string, string[]>()
    for (const rel of relRels) {
        const list = relatedByEntryId.get(rel.entry_id) ?? []
        if (rel.to_slug) list.push(rel.to_slug)
        relatedByEntryId.set(rel.entry_id, list)
    }

    return entries.map((e: any) => mapper(e, relatedByEntryId.get(e.id) ?? []))
}
