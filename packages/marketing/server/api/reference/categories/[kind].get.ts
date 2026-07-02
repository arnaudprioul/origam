/**
 * GET /api/reference/categories/:kind
 *
 * Returns the list of category names for one entity family, DÉRIVÉES des
 * entrées réelles (`SELECT DISTINCT category FROM doc_entry`). Les pages index
 * groupent par catégorie (`entry.category === category`) → cet endpoint doit
 * renvoyer des chaînes qui matchent `entry.category`.
 *
 * NB : la table `doc_category` (ordre/labels curatés) n'est pas peuplée par le
 * pipeline ; on dérive donc directement des entrées pour que la grille ne soit
 * jamais vide. Ordre alphabétique (l'ordre curaté pourra venir de doc_category
 * plus tard, en fallback sur ce dérivé).
 *
 * Validation : :kind ∈ 8 DOC_KINDS (400 sinon).
 * Réponse : string[] (noms de catégories, triés).
 * Cache : 5 min par kind.
 */

const CACHE_TTL_SECONDS = 300

export default defineCachedEventHandler(
    async (event): Promise<string[]> => {
        const kind = getRouterParam(event, 'kind') ?? ''
        assertKind(kind)

        const db = await useDb()

        const rows: Array<{ category: string }> = await db.query(
            `SELECT DISTINCT category
             FROM public.doc_entry
             WHERE kind = $1
               AND category IS NOT NULL
               AND category <> ''
               AND orphaned_at IS NULL
             ORDER BY category ASC`,
            [kind],
        )

        return rows.map(r => r.category)
    },
    {
        maxAge: CACHE_TTL_SECONDS,
        name: 'reference-categories',
        getKey: event => `categories:${getRouterParam(event, 'kind') ?? ''}`,
    },
)
