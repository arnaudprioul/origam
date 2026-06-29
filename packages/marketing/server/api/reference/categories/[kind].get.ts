/**
 * GET /api/reference/categories/:kind
 *
 * Returns the ordered display groups for one entity family, sourced from the
 * `doc_category` table. Replaces the static COMPONENTS_CATEGORIES constant
 * and its per-family equivalents.
 *
 * Validation:
 *   - :kind must be one of the 8 DOC_KINDS → 400 otherwise
 *
 * Response: IDocCategory[] — ordered by position ASC.
 *
 * Cache: 5 min per kind. Invalidate after a category edit in the backoffice
 * (ticket E will call nitro storage to clear the key).
 */

import { DocCategory } from '../../../db/entities'

const CACHE_TTL_SECONDS = 300

interface IDocCategory {
    key: string
    labelKey: string | null
    labelFallback: string | null
    icon: string | null
    position: number
}

export default defineCachedEventHandler(
    async (event): Promise<IDocCategory[]> => {
        const kind = getRouterParam(event, 'kind') ?? ''
        assertKind(kind)

        const db = await useDb()

        const rows: any[] = await db
            .getRepository(DocCategory)
            .createQueryBuilder('c')
            .where('c.kind = :kind', { kind })
            .orderBy('c.position', 'ASC')
            .getMany()

        return rows.map(c => ({
            key: c.key,
            labelKey: c.label_key ?? null,
            labelFallback: c.label_fallback ?? null,
            icon: c.icon ?? null,
            position: c.position,
        }))
    },
    {
        maxAge: CACHE_TTL_SECONDS,
        name: 'reference-categories',
        getKey: event => `categories:${getRouterParam(event, 'kind') ?? ''}`,
    },
)
