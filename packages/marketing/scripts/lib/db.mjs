/**
 * db.mjs — TypeORM DataSource for the standalone ingestion pipeline (ticket B).
 *
 * Reuses the SAME DataSource definition as the Nitro runtime and the migration
 * CLI (server/db/data-source.mjs), so the script, the API and the migrations all
 * agree on one source of truth. No credential is hardcoded — everything comes
 * from the environment (DATABASE_URL or the discrete DB_* vars).
 */

import { execSync } from 'node:child_process'

import { createDataSource } from '../../server/db/data-source.mjs'
import { REPO_ROOT } from './extract.mjs'

let ds = null

/** Lazily create + initialize the shared DataSource for the pipeline. */
export async function getDb () {
    if (!ds) { ds = createDataSource(); await ds.initialize() }
    return ds
}

/** Tear down the connection pool (call once at the end of the script). */
export async function closeDb () {
    if (ds) { await ds.destroy(); ds = null }
}

/** Short git sha of the DS source at run time (for doc_sync_run audit). */
export function sourceCommit () {
    try {
        return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT })
            .toString().trim()
    } catch {
        return null
    }
}
