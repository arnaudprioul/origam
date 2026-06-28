/**
 * data-source.mjs — the TypeORM DataSource for the API-Reference store.
 *
 * Single source of truth for entities + migrations, shared by the Nitro runtime
 * (server/utils/db.ts), the migration CLI (migrate.mjs) and the ingestion
 * pipeline (scripts/). Connection options come from the environment via
 * connection.mjs — no secret is hardcoded. `synchronize` is always off; the
 * schema is owned exclusively by the versioned migrations.
 */

import { DataSource } from 'typeorm'

import { resolveConnection } from './connection.mjs'
import { ENTITIES } from './entities.mjs'
import { MIGRATIONS_TABLE } from './db.const.mjs'
import { InitDocReference1719600000001 } from './migrations/1719600000001-InitDocReference.mjs'

/** @param {NodeJS.ProcessEnv} [env] */
export function buildDataSourceOptions (env = process.env) {
    return {
        type: 'postgres',
        ...resolveConnection(env),
        entities: ENTITIES,
        migrations: [InitDocReference1719600000001],
        migrationsTableName: MIGRATIONS_TABLE,
        synchronize: false,
        logging: false,
    }
}

/** Build (not yet initialized) a DataSource from the environment. */
export function createDataSource (env = process.env) {
    return new DataSource(buildDataSourceOptions(env))
}
