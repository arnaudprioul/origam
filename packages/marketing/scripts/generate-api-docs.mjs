#!/usr/bin/env node
/**
 * generate-api-docs.mjs — keep the marketing API-Reference doc in sync with the
 * design-system source. (ADR 0001 — ticket B.)
 *
 * Its write target was REORIENTED from per-slug `.const.ts` files to the
 * PostgreSQL doc store. Three pipelines share the same libs (extract / merge /
 * read-existing) — no logic is duplicated:
 *
 *   --seed     First load. Reads the 1758 existing app/consts/**.const.ts `_DOC`
 *              objects (curated prose, all 8 families) and UPSERTs them into the
 *              DB without loss. Idempotent; respects the editorial lock.
 *
 *   (default)  Re-sync. Re-extracts STRUCTURAL facts from packages/ds/src for the
 *              4 auto-derivable families (enums, interfaces, consts, utils) and
 *              UPSERTs ONLY the [SRC] columns. Editorial fields are never touched.
 *
 *   --files    Legacy file writer (the original behaviour, unchanged). Kept until
 *              the pages are rebranched on the API and the const files are removed
 *              (ticket F). Lets the transition stay non-destructive.
 *
 * Every DB run is wrapped in a single transaction and recorded in doc_sync_run.
 * `--check` is a dry-run drift gate (rolls back, exits 1 if anything would change).
 *
 * USAGE
 *   node scripts/generate-api-docs.mjs --seed [--check] [--domain=<kind>] [--verbose]
 *   node scripts/generate-api-docs.mjs        [--check] [--domain=<dir>]  [--verbose]
 *   node scripts/generate-api-docs.mjs --files [--check] [--domain=<dir>] [--limit=N]
 *
 * VERACITY
 *   No prose is invented. [ÉDIT] content always comes from the curated files
 *   (seed) or is left as-is in the DB (re-sync). [SRC] always comes from the DS.
 */

import fs from 'node:fs'
import path from 'node:path'

import {
    DOMAINS, listSourceFiles, extractFile, createProgram, REPO_ROOT,
} from './lib/extract.mjs'
import { MERGERS } from './lib/merge.mjs'
import { serialize } from './lib/serialize.mjs'
import { readExistingDoc } from './lib/read-existing.mjs'
import { mapDoc } from './lib/doc-to-rows.ts'
import { ingestFull, ingestSrc } from './lib/db-upsert.ts'
import { getDb, closeDb, sourceCommit } from './lib/db.ts'
import { DOC_KIND_DIRS } from '../server/db/db.const.mjs'
import { DocEntry, DocSyncRun } from '../server/db/entities/index.ts'

const ARGS = process.argv.slice(2)
const CHECK = ARGS.includes('--check')
const VERBOSE = ARGS.includes('--verbose')
const SEED = ARGS.includes('--seed')
const FILES = ARGS.includes('--files')
const NEW_ONLY = ARGS.includes('--new-only')
const DOMAIN_ARG = (ARGS.find(a => a.startsWith('--domain=')) || '').split('=')[1]
const LIMIT = Number((ARGS.find(a => a.startsWith('--limit=')) || '').split('=')[1]) || 0

const MKT_CONSTS = path.join(REPO_ROOT, 'packages', 'marketing', 'app', 'consts')
const MKT_SEED   = path.join(REPO_ROOT, 'packages', 'marketing', 'server', 'db', 'seed')
const ROLLBACK = '__ROLLBACK_CHECK__'

const blank = () => ({ created: 0, updated: 0, unchanged: 0, orphaned: 0 })
const add = (a, b) => { a.created += b.created; a.updated += b.updated; a.unchanged += b.unchanged; a.orphaned += b.orphaned }

// ─── DB seed: ingest the existing curated files (all 8 families) ────────────
//
// Strategy:
//   1. If the legacy app/consts/<dir>/ directory exists, read the .const.ts
//      files as before (backward-compatible path, used before ticket F).
//   2. If the directory is gone (ticket F removed it), fall back to the JSON
//      fixture at server/db/seed/<kind>.json produced by dump-db-fixture.mjs.
//      Restores the full content, including the editorial lock flag.
//
async function runSeed (manager) {
    const total = blank()
    const kinds = DOMAIN_ARG ? [DOMAIN_ARG] : Object.keys(DOC_KIND_DIRS)

    for (const kind of kinds) {
        const dir = DOC_KIND_DIRS[kind]
        if (!dir) { console.error(`Unknown kind: ${kind}`); continue }
        const dirPath = path.join(MKT_CONSTS, dir)
        const c = blank()

        if (fs.existsSync(dirPath)) {
            // ── Legacy path: read from .const.ts files (pre-ticket-F) ────────
            let files = fs.readdirSync(dirPath).filter(f => f.endsWith('.const.ts')).sort()
            if (LIMIT) files = files.slice(0, LIMIT)

            for (const file of files) {
                const existing = await readExistingDoc(path.join(dirPath, file))
                if (!existing?.doc) { console.error(`  ! no _DOC in ${dir}/${file}`); continue }
                const record = mapDoc(kind, existing.doc)
                const r = await ingestFull(manager, record)
                add(c, r); add(total, r)
                if (VERBOSE) console.log(`  ${kind}/${record.entry.slug}: +${r.created} ~${r.updated} =${r.unchanged} ⌀${r.orphaned}`)
            }
            console.log(`[${kind}] files=${files.length} created=${c.created} updated=${c.updated} unchanged=${c.unchanged} orphaned=${c.orphaned}`)
        } else {
            // ── Fixture path: read from server/db/seed/<kind>.json ─────────
            const fixturePath = path.join(MKT_SEED, `${kind}.json`)
            if (!fs.existsSync(fixturePath)) {
                console.error(`  ! [${kind}] no const dir and no fixture at ${fixturePath} — skipping`)
                continue
            }
            const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'))
            let records = fixture.entries ?? []
            if (LIMIT) records = records.slice(0, LIMIT)

            for (const record of records) {
                const r = await ingestFull(manager, record)
                add(c, r); add(total, r)
                if (VERBOSE) console.log(`  ${kind}/${record.entry.slug}: +${r.created} ~${r.updated} =${r.unchanged} ⌀${r.orphaned}`)
                // Restore the editorial lock — ingestFull uses the 'all' mask but
                // never sets edited_by_user itself (it defaults to false on INSERT).
                if (record.entry.edited_by_user) {
                    await manager.update(DocEntry, { kind: record.entry.kind, slug: record.entry.slug }, { edited_by_user: true })
                }
            }
            console.log(`[${kind}] fixture=${records.length} created=${c.created} updated=${c.updated} unchanged=${c.unchanged} orphaned=${c.orphaned}`)
        }
    }
    return total
}

// ─── DB re-sync: structural [SRC] facts from the DS source (4 families) ──────
async function runResync (manager) {
    const total = blank()
    const { program, checker } = createProgram()
    const domains = DOMAIN_ARG ? [DOMAIN_ARG] : Object.keys(DOMAINS)

    for (const domainKey of domains) {
        if (!DOMAINS[domainKey]) { console.error(`Unknown domain: ${domainKey}`); continue }
        const kind = DOMAINS[domainKey].kind
        const files = listSourceFiles(domainKey)
        let symbols = []
        for (const f of files) symbols.push(...extractFile(domainKey, f, program, checker))
        const seen = new Set()
        symbols = symbols.filter(s => (seen.has(s.slug) ? false : (seen.add(s.slug), true)))
        if (LIMIT) symbols = symbols.slice(0, LIMIT)

        const c = blank()
        for (const src of symbols) {
            // util: extract exposes `returnType`; normalise to the _DOC `returns` shape.
            const doc = kind === 'util' ? { ...src, returns: { type: src.returnType } } : src
            const record = mapDoc(kind, doc)
            const r = await ingestSrc(manager, record)
            add(c, r); add(total, r)
            if (VERBOSE) console.log(`  ${kind}/${record.entry.slug}: +${r.created} ~${r.updated} =${r.unchanged} ⌀${r.orphaned}`)
        }
        console.log(`[${domainKey}] symbols=${symbols.length} created=${c.created} updated=${c.updated} unchanged=${c.unchanged} orphaned=${c.orphaned}`)
    }
    return total
}

async function recordRun (db, { domain, counts, status, error }) {
    await db.getRepository(DocSyncRun).insert({
        finished_at: new Date(),
        domain: domain ?? null,
        created_count: counts.created,
        updated_count: counts.updated,
        unchanged_count: counts.unchanged,
        orphaned_count: counts.orphaned,
        source_commit: sourceCommit(),
        status,
        error: error ?? null,
    })
}

async function reportKindCounts (db) {
    const rows = await db.getRepository(DocEntry)
        .createQueryBuilder('e')
        .select('e.kind', 'kind').addSelect('COUNT(*)', 'n')
        .groupBy('e.kind').orderBy('e.kind')
        .getRawMany()
    console.log('\ndoc_entry by kind:')
    let total = 0
    for (const r of rows) { console.log(`  ${r.kind.padEnd(12)} ${r.n}`); total += Number(r.n) }
    console.log(`  ${'TOTAL'.padEnd(12)} ${total}`)
}

async function runDb () {
    const db = await getDb()
    const mode = SEED ? 'seed' : 'resync'
    let counts = blank()

    try {
        await db.transaction(async (manager) => {
            counts = SEED ? await runSeed(manager) : await runResync(manager)
            if (CHECK) throw new Error(ROLLBACK)
        })
    } catch (e) {
        if (e.message !== ROLLBACK) {
            if (!CHECK) await recordRun(db, { domain: DOMAIN_ARG, counts, status: 'failed', error: String(e.message) }).catch(() => {})
            throw e
        }
    }

    const drift = counts.created + counts.updated + counts.orphaned
    console.log(
        `\n${CHECK ? 'CHECK' : mode.toUpperCase()} summary — created: ${counts.created}, ` +
        `updated: ${counts.updated}, unchanged: ${counts.unchanged}, orphaned: ${counts.orphaned}`
    )

    if (!CHECK) {
        await recordRun(db, { domain: DOMAIN_ARG, counts, status: 'success' })
        await reportKindCounts(db)
    }
    if (CHECK && drift > 0) {
        console.log('\n--check: the database WOULD change. Run without --check to apply.')
        await closeDb()
        process.exit(1)
    }
    await closeDb()
}

// ─── Legacy file writer (unchanged original behaviour, kept for transition) ──
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim()

async function runFiles () {
    const { program, checker } = createProgram()
    const domains = DOMAIN_ARG ? [DOMAIN_ARG] : Object.keys(DOMAINS)
    let totalChanged = 0, totalNew = 0, totalSame = 0, totalWritten = 0, totalErrors = 0

    for (const domainKey of domains) {
        if (!DOMAINS[domainKey]) { console.error(`Unknown domain: ${domainKey}`); totalErrors++; continue }
        const files = listSourceFiles(domainKey)
        const targetDir = path.join(MKT_CONSTS, domainKey)
        fs.mkdirSync(targetDir, { recursive: true })

        let symbols = []
        for (const f of files) symbols.push(...extractFile(domainKey, f, program, checker))
        const seen = new Set()
        symbols = symbols.filter(s => (seen.has(s.slug) ? false : (seen.add(s.slug), true)))
        if (LIMIT) symbols = symbols.slice(0, LIMIT)

        let changed = 0, created = 0, same = 0, written = 0
        const merger = MERGERS[domainKey === 'enums' ? 'enum' : domainKey === 'interfaces' ? 'interface' : domainKey === 'consts' ? 'const' : 'util']
        const kind = DOMAINS[domainKey].kind

        for (const src of symbols) {
            const target = path.join(targetDir, `${src.slug}.const.ts`)
            const exists = fs.existsSync(target)
            if (NEW_ONLY && exists) continue

            let existing = null
            if (exists) {
                try { existing = await readExistingDoc(target) }
                catch (e) { console.error(`  ! failed to read existing ${src.slug}: ${e.message}`); totalErrors++ }
            }

            const merged = merger(src, existing)
            const output = serialize(kind, merged)
            const current = exists ? fs.readFileSync(target, 'utf-8') : null
            const isSame = current !== null && norm(current) === norm(output)

            if (!exists) { created++; if (!CHECK) { fs.writeFileSync(target, output); written++ } }
            else if (!isSame) { changed++; if (!CHECK) { fs.writeFileSync(target, output); written++ } }
            else { same++ }
        }

        console.log(`[${domainKey}] symbols=${symbols.length} new=${created} changed=${changed} unchanged=${same}` + (CHECK ? '' : ` written=${written}`))
        totalChanged += changed; totalNew += created; totalSame += same; totalWritten += written
    }

    console.log(`\n${CHECK ? 'CHECK' : 'WRITE'} summary — new: ${totalNew}, changed: ${totalChanged}, unchanged: ${totalSame}` + (CHECK ? '' : `, written: ${totalWritten}`) + (totalErrors ? `, errors: ${totalErrors}` : ''))
    if (CHECK && (totalNew + totalChanged) > 0) { console.log('\n--check: files WOULD change.'); process.exit(1) }
    if (totalErrors) process.exit(2)
}

async function run () {
    if (FILES) return runFiles()
    return runDb()
}

run().catch(async (e) => { console.error(e); await closeDb().catch(() => {}); process.exit(2) })
