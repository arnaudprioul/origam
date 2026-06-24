#!/usr/bin/env node
/**
 * generate-api-docs.mjs — (re)generate the per-slug `_DOC` data files for the
 * marketing API Reference pages (/enums, /interfaces, /consts, /utils) from
 * the design-system source under packages/ds/src.
 *
 * WHY
 *   The detail pages read app/consts/<domain>/<slug>.const.ts via
 *   import.meta.glob and render the `*_DOC` export. Those files mix
 *   STRUCTURAL facts (definition, signature, members, props, params) that
 *   can be derived from the DS source, with CURATED prose (descriptions,
 *   examples, "used by") written by hand. This script resyncs the structural
 *   half whenever the DS evolves, WITHOUT clobbering the curated half.
 *
 * WHAT IT DOES
 *   1. Parses every exported enum / interface / const / util in
 *      packages/ds/src/{enums,interfaces,consts,utils} (TypeScript compiler API).
 *   2. For each symbol, computes its kebab slug (matching the historical
 *      per-domain convention) and the target file path.
 *   3. Reads the existing _DOC (if any) and MERGES: structural fields are
 *      regenerated; curated fields (descriptions, examples, usedBy, related,
 *      icon, category, notes) are preserved verbatim.
 *   4. Writes (or, with --check, diffs) the deterministic TS output.
 *
 * VERACITY
 *   No prose is invented. A description is only filled from source JSDoc when
 *   it is real (not the DS placeholder "@param x …"). Otherwise the curated
 *   value is kept, or the field is left empty for later manual enrichment.
 *
 * USAGE
 *   node scripts/generate-api-docs.mjs [--check] [--domain=enums|interfaces|consts|utils] [--limit=N] [--verbose]
 *   pnpm -F @origam/marketing docs:generate            # write all domains
 *   pnpm -F @origam/marketing docs:generate:check       # dry-run, diff only
 *
 * FLAGS
 *   --check        dry-run; report what WOULD change, write nothing. Exit 1 if
 *                  any file would change (CI-friendly drift gate).
 *   --domain=<d>   restrict to one domain.
 *   --limit=N      process only the first N symbols per domain (for sampling).
 *   --new-only     write/diff only slugs that have no existing _DOC yet.
 *   --verbose      list every per-file decision.
 */

import fs from 'node:fs'
import path from 'node:path'
import {
    DOMAINS, listSourceFiles, extractFile, createProgram, REPO_ROOT,
} from './lib/extract.mjs'
import { MERGERS } from './lib/merge.mjs'
import { serialize } from './lib/serialize.mjs'
import { readExistingDoc } from './lib/read-existing.mjs'

const ARGS = process.argv.slice(2)
const CHECK = ARGS.includes('--check')
const VERBOSE = ARGS.includes('--verbose')
const NEW_ONLY = ARGS.includes('--new-only')
const DOMAIN_ARG = (ARGS.find(a => a.startsWith('--domain=')) || '').split('=')[1]
const LIMIT = Number((ARGS.find(a => a.startsWith('--limit=')) || '').split('=')[1]) || 0

const MKT_CONSTS = path.join(REPO_ROOT, 'packages', 'marketing', 'app', 'consts')

const norm = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim()

async function run () {
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
        // dedupe by slug (first wins) — defensive against rare cross-file collisions
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

            if (!exists) {
                created++
                if (VERBOSE) console.log(`  + NEW   ${domainKey}/${src.slug}`)
                if (!CHECK) { fs.writeFileSync(target, output); written++ }
            } else if (!isSame) {
                changed++
                if (VERBOSE) console.log(`  ~ CHG   ${domainKey}/${src.slug}`)
                if (!CHECK) { fs.writeFileSync(target, output); written++ }
            } else {
                same++
                if (VERBOSE) console.log(`  = same  ${domainKey}/${src.slug}`)
            }
        }

        console.log(
            `[${domainKey}] symbols=${symbols.length} new=${created} changed=${changed} unchanged=${same}` +
            (CHECK ? '' : ` written=${written}`)
        )
        totalChanged += changed; totalNew += created; totalSame += same; totalWritten += written
    }

    console.log(
        `\n${CHECK ? 'CHECK' : 'WRITE'} summary — new: ${totalNew}, changed: ${totalChanged}, unchanged: ${totalSame}` +
        (CHECK ? '' : `, written: ${totalWritten}`) + (totalErrors ? `, errors: ${totalErrors}` : '')
    )

    if (CHECK && (totalNew + totalChanged) > 0) {
        console.log('\n--check: files WOULD change. Run without --check to apply.')
        process.exit(1)
    }
    if (totalErrors) process.exit(2)
}

run().catch(e => { console.error(e); process.exit(2) })
