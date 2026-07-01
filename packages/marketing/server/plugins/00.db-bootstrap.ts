// server/plugins/00.db-bootstrap.ts
//
// Auto-provisionne la base API-Reference au démarrage du serveur Nitro — donc
// à CHAQUE déploiement, sans aucune commande manuelle. Séquence :
//   1. applique les migrations TypeORM (crée les 14 tables si absentes) ;
//   2. si la table doc_entry est vide, charge le seed depuis
//      server/assets/db-seed.sql (snapshot data-only, ~1734 entrées).
//
// Robustesse :
//   - un VERROU D'AVIS Postgres (pg_advisory_lock) sur une connexion dédiée
//     sérialise l'opération : si plusieurs instances / invocations démarrent en
//     même temps, une seule migre+seed, les autres attendent puis constatent la
//     base peuplée et passent leur tour (pas de course, pas de doublon) ;
//   - idempotent (migrations déjà jouées = no-op ; base déjà peuplée = pas de
//     seed) ;
//   - NON-FATAL : une base non configurée ou injoignable ne fait pas planter le
//     serveur — le site tourne et /api/health reflète l'état (db.ok).

const BOOTSTRAP_LOCK_KEY = 4021

export default defineNitroPlugin(async () => {
    if (!isDbConfigured()) {
        console.info('[db-bootstrap] DB non configurée — skip (site OK, pages API-Reference vides tant que NUXT_DB_* absent).')
        return
    }

    let runner
    try {
        const ds = await useDb()
        runner = ds.createQueryRunner()
        await runner.connect()

        // Verrou inter-instances : bloque jusqu'à obtention (une seule bootstrap à la fois).
        await runner.query(`SELECT pg_advisory_lock(${BOOTSTRAP_LOCK_KEY})`)

        const applied = await ds.runMigrations()
        if (applied.length) {
            console.info(`[db-bootstrap] ${applied.length} migration(s) appliquée(s).`)
        }

        // Vérif d'existence NON-throwante (to_regclass renvoie NULL au lieu de
        // lever une erreur) : évite le bruit si une init concurrente n'a pas
        // encore rendu la table visible sur cette connexion.
        const reg = await runner.query("SELECT to_regclass('public.doc_entry') AS t")
        if (!reg[0].t) {
            console.info('[db-bootstrap] schéma pas encore prêt (init concurrente) — une autre instance s\'en charge.')
            return
        }

        const before = await runner.query('SELECT count(*)::int AS count FROM public.doc_entry')
        if (before[0].count > 0) {
            console.info(`[db-bootstrap] base déjà peuplée (${before[0].count} entrées) — seed ignoré.`)
            return
        }

        const seed = await useStorage('assets:server').getItem('db-seed.sql')
        if (!seed) {
            console.warn('[db-bootstrap] server/assets/db-seed.sql introuvable — seed ignoré.')
            return
        }

        await runner.query(typeof seed === 'string' ? seed : String(seed))

        const after = await runner.query('SELECT count(*)::int AS count FROM doc_entry')
        console.info(`[db-bootstrap] seed appliqué — ${after[0].count} entrées.`)
    } catch (err) {
        console.error('[db-bootstrap] échec (non-fatal) :', err instanceof Error ? err.message : err)
    } finally {
        if (runner) {
            await runner.query(`SELECT pg_advisory_unlock(${BOOTSTRAP_LOCK_KEY})`).catch(() => {})
            await runner.release().catch(() => {})
        }
    }
})
