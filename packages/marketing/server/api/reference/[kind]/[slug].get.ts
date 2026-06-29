/**
 * GET /api/reference/:kind/:slug
 *
 * Returns the full documentation object for one entity. Replaces the per-family
 * import.meta.glob patterns in pages/[slug].vue files.
 *
 * The response is mapped to the exact *Doc interface (IComponentDoc, IComposableDoc,
 * IConstDoc, IDirectiveDoc, IEnumDoc, IInterfaceDoc, ITypeDoc, IUtilDoc) so
 * ticket D can rebind pages without touching the template.
 *
 * Validation:
 *   - :kind must be one of the 8 DOC_KINDS (400 if invalid)
 *   - :slug must match kebab-case (400 if invalid)
 *   - entry not found (404)
 *
 * Query params:
 *   ?limit=<number>   cap the values array for consts/enums/types with very
 *                     large value lists (e.g. mdi-icons: 7297 values). All values
 *                     are returned when the parameter is omitted.
 *
 * Cache: 5 min per kind:slug combination.
 * Invalidate on re-sync / backoffice edit (ticket E clears the storage key).
 */

import {
    DocEntry, DocProp, DocEmit, DocSlot, DocExample, DocValue,
    DocParam, DocReturn, DocDirectiveArg, DocDirectiveModifier, DocRelation,
} from '../../../db/entities'

/**
 * Inline child-collection types to avoid cross-directory import type issues
 * with Nitro esbuild. Mirrors the exported interfaces in reference-mappers.ts.
 */
type DescMap = Map<string, { description_key: string | null; description_fallback: string | null }>
interface ComponentChildren { props: any[]; emits: any[]; slots: any[]; examples: any[]; relations: any[]; descriptionsBySlug: DescMap }
interface ComposableChildren { params: any[]; returns: any[]; examples: any[]; relations: any[] }
interface ConstChildren { values: any[]; examples: any[]; relations: any[] }
interface DirectiveChildren { args: any[]; modifiers: any[]; examples: any[]; relations: any[]; descriptionsBySlug: DescMap }
interface EnumChildren { values: any[]; examples: any[]; relations: any[] }
interface InterfaceChildren { props: any[]; examples: any[]; relations: any[] }
interface TypeChildren { values: any[]; examples: any[]; relations: any[] }
interface UtilChildren { params: any[]; returns: any[]; examples: any[]; relations: any[] }

const CACHE_TTL_SECONDS = 300

export default defineCachedEventHandler(
    async (event) => {
        const kind = getRouterParam(event, 'kind') ?? ''
        const slug = getRouterParam(event, 'slug') ?? ''
        assertKind(kind)
        assertSlug(slug)

        const query = getQuery(event)
        const limitRaw = typeof query.limit === 'string' ? parseInt(query.limit, 10) : undefined
        const valuesLimit = limitRaw && Number.isFinite(limitRaw) && limitRaw > 0
            ? limitRaw
            : undefined

        const db = await useDb()

        // ─── 1. Fetch the root entry ─────────────────────────────────────

        const entry: any = await db
            .getRepository(DocEntry)
            .createQueryBuilder('e')
            .where('e.kind = :kind AND e.slug = :slug', { kind, slug })
            .getOne()

        if (!entry) {
            throw createError({ statusCode: 404, statusMessage: `${kind} '${slug}' not found` })
        }

        const entryId = entry.id

        // ─── 2. Fetch child tables in parallel based on kind ─────────────

        switch (kind) {
            case 'component': return buildComponentDoc(db, entry, entryId)
            case 'composable': return buildComposableDoc(db, entry, entryId)
            case 'const': return buildConstDoc(db, entry, entryId, valuesLimit)
            case 'directive': return buildDirectiveDoc(db, entry, entryId)
            case 'enum': return buildEnumDoc(db, entry, entryId, valuesLimit)
            case 'interface': return buildInterfaceDoc(db, entry, entryId)
            case 'type': return buildTypeDoc(db, entry, entryId, valuesLimit)
            case 'util': return buildUtilDoc(db, entry, entryId)
            default:
                throw createError({ statusCode: 500, statusMessage: 'Unhandled kind' })
        }
    },
    {
        maxAge: CACHE_TTL_SECONDS,
        name: 'reference-doc',
        getKey: (event) => {
            const kind = getRouterParam(event, 'kind') ?? ''
            const slug = getRouterParam(event, 'slug') ?? ''
            const q = getQuery(event)
            return `doc:${kind}:${slug}:${q.limit ?? ''}`
        },
    },
)

// ─── Helpers: ordered child-table queries ──────────────────────────────────

function byPosition (qb: any) {
    return qb.orderBy('r.position', 'ASC')
}

async function fetchProps (db: any, entryId: string) {
    return db
        .getRepository(DocProp)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchEmits (db: any, entryId: string) {
    return db
        .getRepository(DocEmit)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchSlots (db: any, entryId: string) {
    return db
        .getRepository(DocSlot)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchExamples (db: any, entryId: string) {
    return db
        .getRepository(DocExample)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchValues (db: any, entryId: string, limit?: number) {
    let qb = db
        .getRepository(DocValue)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
    if (limit) qb = qb.limit(limit)
    return qb.getMany()
}

async function fetchParams (db: any, entryId: string) {
    return db
        .getRepository(DocParam)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchReturns (db: any, entryId: string) {
    return db
        .getRepository(DocReturn)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchRelations (db: any, entryId: string) {
    return db
        .getRepository(DocRelation)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .andWhere('r.orphaned_at IS NULL')
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchDirectiveArgs (db: any, entryId: string) {
    return db
        .getRepository(DocDirectiveArg)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

async function fetchDirectiveModifiers (db: any, entryId: string) {
    return db
        .getRepository(DocDirectiveModifier)
        .createQueryBuilder('r')
        .where('r.entry_id = :id', { id: entryId })
        .orderBy('r.position', 'ASC')
        .getMany()
}

/**
 * Batch-fetches descriptions for a list of slugs of a given kind.
 * Used to enrich family/related relations with the target entry's descriptions.
 */
async function fetchDescriptionsBySlug (
    db: any,
    kind: string,
    slugs: string[],
): Promise<DescMap> {
    const map: DescMap = new Map()
    if (slugs.length === 0) return map
    const rows: any[] = await db
        .getRepository(DocEntry)
        .createQueryBuilder('e')
        .where('e.kind = :kind AND e.slug IN (:...slugs)', { kind, slugs })
        .getMany()
    for (const row of rows) {
        map.set(row.slug, {
            description_key: row.description_key,
            description_fallback: row.description_fallback,
        })
    }
    return map
}

// ─── Kind-specific doc builders ────────────────────────────────────────────

async function buildComponentDoc (db: any, entry: any, entryId: string) {
    const [props, emits, slots, examples, relations] = await Promise.all([
        fetchProps(db, entryId),
        fetchEmits(db, entryId),
        fetchSlots(db, entryId),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])

    // Collect slugs of family/related entries for description enrichment.
    const slugsToFetch = [
        ...relations
            .filter((r: any) => r.rel_type === 'family' || r.rel_type === 'related')
            .map((r: any) => r.to_slug)
            .filter(Boolean),
    ]
    const descriptionsBySlug = await fetchDescriptionsBySlug(
        db,
        'component',
        [...new Set(slugsToFetch)],
    )

    const ch: ComponentChildren = { props, emits, slots, examples, relations, descriptionsBySlug }
    return mapComponentDoc(entry, ch)
}

async function buildComposableDoc (db: any, entry: any, entryId: string) {
    const [params, returns, examples, relations] = await Promise.all([
        fetchParams(db, entryId),
        fetchReturns(db, entryId),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: ComposableChildren = { params, returns, examples, relations }
    return mapComposableDoc(entry, ch)
}

async function buildConstDoc (db: any, entry: any, entryId: string, valuesLimit?: number) {
    const [values, examples, relations] = await Promise.all([
        fetchValues(db, entryId, valuesLimit),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: ConstChildren = { values, examples, relations }
    return mapConstDoc(entry, ch)
}

async function buildDirectiveDoc (db: any, entry: any, entryId: string) {
    const [args, modifiers, examples, relations] = await Promise.all([
        fetchDirectiveArgs(db, entryId),
        fetchDirectiveModifiers(db, entryId),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])

    const relatedSlugs = relations
        .filter((r: any) => r.rel_type === 'related')
        .map((r: any) => r.to_slug)
        .filter(Boolean)
    const descriptionsBySlug = await fetchDescriptionsBySlug(
        db,
        'component',
        [...new Set(relatedSlugs)],
    )

    const ch: DirectiveChildren = { args, modifiers, examples, relations, descriptionsBySlug }
    return mapDirectiveDoc(entry, ch)
}

async function buildEnumDoc (db: any, entry: any, entryId: string, valuesLimit?: number) {
    const [values, examples, relations] = await Promise.all([
        fetchValues(db, entryId, valuesLimit),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: EnumChildren = { values, examples, relations }
    return mapEnumDoc(entry, ch)
}

async function buildInterfaceDoc (db: any, entry: any, entryId: string) {
    const [props, examples, relations] = await Promise.all([
        fetchProps(db, entryId),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: InterfaceChildren = { props, examples, relations }
    return mapInterfaceDoc(entry, ch)
}

async function buildTypeDoc (db: any, entry: any, entryId: string, valuesLimit?: number) {
    const [values, examples, relations] = await Promise.all([
        fetchValues(db, entryId, valuesLimit),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: TypeChildren = { values, examples, relations }
    return mapTypeDoc(entry, ch)
}

async function buildUtilDoc (db: any, entry: any, entryId: string) {
    const [params, returns, examples, relations] = await Promise.all([
        fetchParams(db, entryId),
        fetchReturns(db, entryId),
        fetchExamples(db, entryId),
        fetchRelations(db, entryId),
    ])
    const ch: UtilChildren = { params, returns, examples, relations }
    return mapUtilDoc(entry, ch)
}
