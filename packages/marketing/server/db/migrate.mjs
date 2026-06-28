#!/usr/bin/env node
/**
 * migrate.mjs — thin migration runner around the TypeORM DataSource.
 *
 * Used instead of the `typeorm` CLI to avoid its ESM/ts-node loader quirks: it
 * just initializes the DataSource and calls the documented migration APIs.
 *
 *   node server/db/migrate.mjs run      → apply all pending (DataSource.runMigrations)
 *   node server/db/migrate.mjs revert   → revert the last applied (undoLastMigration)
 *   node server/db/migrate.mjs show     → report whether pending migrations exist
 */

import { createDataSource } from './data-source.mjs'

const cmd = process.argv[2] || 'run'
const ds = createDataSource()
await ds.initialize()

try {
    if (cmd === 'run') {
        const applied = await ds.runMigrations({ transaction: 'all' })
        console.log(applied.length
            ? `ran ${applied.length} migration(s): ${applied.map(m => m.name).join(', ')}`
            : 'no pending migrations')
    } else if (cmd === 'revert') {
        await ds.undoLastMigration({ transaction: 'all' })
        console.log('reverted last migration')
    } else if (cmd === 'show') {
        const hasPending = await ds.showMigrations()
        console.log(hasPending ? 'pending migrations exist' : 'schema up to date')
    } else {
        console.error(`unknown command: ${cmd} (expected run | revert | show)`)
        process.exitCode = 2
    }
} catch (e) {
    console.error(e)
    process.exitCode = 1
} finally {
    await ds.destroy()
}
