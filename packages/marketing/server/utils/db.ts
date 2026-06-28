/**
 * db.ts — Nitro-side TypeORM DataSource singleton for the API-Reference store.
 *
 * The DataSource definition (entities + connection) is shared with the
 * migrations and the ingestion pipeline (server/db/data-source.mjs). Connection
 * options are resolved from the environment — no credential is hardcoded. The
 * DataSource is lazily initialized and reused across requests within the Nitro
 * process.
 */

import type { DataSource } from 'typeorm'

// `.mjs` modules are imported as-is; they carry no Nuxt/TS dependency.
import { createDataSource } from '../db/data-source.mjs'
import { isConfigured } from '../db/connection.mjs'

let ds: DataSource | null = null

/** True when the environment provides enough to open a connection. */
export function isDbConfigured (): boolean {
    return isConfigured(process.env)
}

/**
 * Lazily-created, initialized DataSource. Throws a 503 (server-side, not a leak)
 * when the database is not configured, so callers in `server/api/**` surface a
 * clean error instead of crashing.
 */
export async function useDb (): Promise<DataSource> {
    if (!isConfigured(process.env)) {
        throw createError({ statusCode: 503, statusMessage: 'Database is not configured' })
    }
    if (!ds) ds = createDataSource()
    if (!ds.isInitialized) await ds.initialize()
    return ds
}

/**
 * Lightweight connectivity probe used by the healthcheck. Resolves true when a
 * `SELECT 1` round-trips within `timeoutMs`, false otherwise. Never throws.
 */
export async function pingDb (timeoutMs = 2000): Promise<boolean> {
    if (!isConfigured(process.env)) return false
    try {
        const conn = await useDb()
        const probe = conn.query('select 1')
        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('db ping timeout')), timeoutMs)
        )
        await Promise.race([probe, timeout])
        return true
    } catch {
        return false
    }
}
