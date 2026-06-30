/**
 * POST /api/admin/reference/sync
 *
 * Triggers the docs:sync pipeline (scripts/generate-api-docs.mjs). The
 * pipeline re-extracts structural [SRC] facts from packages/ds/src for the 4
 * auto-derivable families (enums, interfaces, consts, utils) and UPSERTs them
 * while respecting the editorial lock (edited_by_user rows are never touched).
 *
 * Implementation: the pipeline is spawned as a child process (it manages its
 * own DB connection and writes a DocSyncRun row when done). This endpoint
 * returns 202 Accepted immediately with the run id of a pre-created
 * 'running' row. The client polls GET /api/admin/reference/sync/runs to
 * observe completion.
 *
 * The running row counts (created/updated/…) are filled from the parsed stdout
 * when the child exits. The pipeline also inserts its own DocSyncRun — that is
 * the detail row with accurate counts; the 'running' row is updated to reflect
 * the final status and exit code.
 *
 * Returns 503 when the pipeline script or `tsx` are not present (production
 * builds without source files).
 */

import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'

import { DocSyncRun } from '../../../db/entities'

function parseSummary (output: string) {
    const m = output.match(/summary\s*[—-]\s*created:\s*(\d+),\s*updated:\s*(\d+),\s*unchanged:\s*(\d+),\s*orphaned:\s*(\d+)/i)
    if (!m) return null
    return {
        created_count: parseInt(m[1], 10),
        updated_count: parseInt(m[2], 10),
        unchanged_count: parseInt(m[3], 10),
        orphaned_count: parseInt(m[4], 10),
    }
}

export default defineEventHandler(async (event) => {
    const cwd = process.cwd()
    const script = resolve(cwd, 'scripts', 'generate-api-docs.mjs')
    const tsxBin = resolve(cwd, 'node_modules', '.bin', 'tsx')
    const tsconfigPath = resolve(cwd, 'tsconfig.typeorm.json')

    if (!existsSync(script) || !existsSync(tsxBin)) {
        throw createError({
            statusCode: 503,
            statusMessage: 'Sync pipeline not available in this environment (source files or tsx missing)',
        })
    }

    const db = await useDb()
    const runRepo = db.getRepository(DocSyncRun)

    const run = runRepo.create({
        domain: null,
        status: 'running',
        created_count: 0,
        updated_count: 0,
        unchanged_count: 0,
        orphaned_count: 0,
        source_commit: null,
    })
    await runRepo.save(run)

    const child = spawn(
        tsxBin,
        ['--tsconfig', tsconfigPath, script],
        { env: { ...process.env }, cwd, stdio: 'pipe' },
    )

    let output = ''
    child.stdout?.on('data', (chunk: Buffer) => { output += chunk.toString() })
    child.stderr?.on('data', (chunk: Buffer) => { output += chunk.toString() })

    child.on('close', async (code) => {
        try {
            const db2 = await useDb()
            const counts = parseSummary(output)
            await db2.getRepository(DocSyncRun).update({ id: run.id }, {
                status: code === 0 ? 'success' : 'failed',
                finished_at: new Date(),
                created_count: counts?.created_count ?? 0,
                updated_count: counts?.updated_count ?? 0,
                unchanged_count: counts?.unchanged_count ?? 0,
                orphaned_count: counts?.orphaned_count ?? 0,
                error: code !== 0 ? output.slice(-1024) : null,
            })
        } catch { /* non-fatal — the pipeline wrote its own DocSyncRun row */ }
    })

    setResponseStatus(event, 202)
    return { id: run.id, status: 'running' }
})
