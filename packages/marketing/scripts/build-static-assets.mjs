#!/usr/bin/env node
/**
 * build-static-assets.mjs — assemble static assets for the origam marketing site.
 *
 * 1. Copies the Histoire build  → <marketing>/public/stories
 * 2. Copies the VitePress build → <marketing>/public/docs
 *
 * After the monorepo migration, the canonical sources live under the
 * dedicated workspace packages:
 *   - packages/stories/histoire.config.js (outDir relative to packages/stories)
 *   - packages/docs/.vitepress/dist
 *
 * For both, we keep a fallback chain to the pre-monorepo layout so a
 * checkout on a transitional branch still works.
 *
 * CLI flags:
 *   --check    Verify that source directories exist without copying anything.
 *   --verbose  Log each copied file path.
 */

import { existsSync, rmSync } from 'node:fs'
import { cp, readFile } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// --- Paths ---
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const MARKETING_ROOT = resolve(SCRIPT_DIR, '..')
// packages/marketing/scripts/.. = packages/marketing
// packages/marketing/.. = packages
// packages/.. = repo root
const REPO_ROOT = resolve(MARKETING_ROOT, '..', '..')
const STORIES_PKG = resolve(REPO_ROOT, 'packages', 'stories')
const DOCS_PKG = resolve(REPO_ROOT, 'packages', 'docs')

// --- CLI args ---
const args = process.argv.slice(2)
const CHECK_ONLY = args.includes('--check')
const VERBOSE = args.includes('--verbose')

// --- Structured logging helpers ---
function log(step, status, path = '') {
    console.log(JSON.stringify({ step, status, path }))
}

function logError(step, message, path = '') {
    console.error(JSON.stringify({ step, status: 'error', message, path }))
}

// --- Resolve Histoire outDir ---
// Resolution order (monorepo first, legacy fallback after):
//   1. packages/stories/histoire.config.js — parse `outDir`, resolve relative
//      to the stories package directory.
//   2. <repo>/histoire.config.js — same parsing, relative to repo root
//      (pre-monorepo layout, kept for transitional branches).
//   3. packages/stories/dist  → 4. <repo>/dist/stories → 5. <repo>/.histoire/dist
async function resolveHistoireOutDir() {
    const candidates = [
        { configPath: join(STORIES_PKG, 'histoire.config.js'), base: STORIES_PKG },
        { configPath: join(REPO_ROOT, 'histoire.config.js'), base: REPO_ROOT },
    ]

    for (const { configPath, base } of candidates) {
        if (!existsSync(configPath)) continue
        try {
            const src = await readFile(configPath, 'utf-8')
            const match = src.match(/\boutDir\s*:\s*['"]([^'"]+)['"]/)
            if (match) {
                const resolved = resolve(base, match[1])
                log('histoire-config', 'resolved', resolved)
                return resolved
            }
        } catch (err) {
            log('histoire-config', 'parse-error', configPath)
        }
    }

    // Fallback chain (no config or no outDir field)
    const fallbacks = [
        resolve(STORIES_PKG, 'dist'),
        resolve(REPO_ROOT, 'dist/stories'),
        resolve(REPO_ROOT, '.histoire/dist'),
    ]
    for (const candidate of fallbacks) {
        if (existsSync(candidate)) {
            log('histoire-config', 'fallback', candidate)
            return candidate
        }
    }

    logError(
        'histoire-config',
        'Cannot determine Histoire outDir — run `pnpm -F @origam/stories build` first'
    )
    return fallbacks[0]
}

// --- Resolve VitePress outDir ---
// Default for VitePress is `<srcDir>/.vitepress/dist`. After the monorepo
// migration the docs live at `packages/docs`, so the build lands at
// `packages/docs/.vitepress/dist`. We keep `docs/.vitepress/dist` as a
// transitional fallback.
function resolveDocsOutDir() {
    const candidates = [
        resolve(DOCS_PKG, '.vitepress', 'dist'),
        resolve(REPO_ROOT, 'docs', '.vitepress', 'dist'),
    ]
    for (const candidate of candidates) {
        if (existsSync(candidate)) {
            log('docs-config', 'resolved', candidate)
            return candidate
        }
    }
    // Return the canonical path so the missing-source error message points
    // the developer to the right place.
    return candidates[0]
}

// --- Main ---
async function main() {
    log('start', CHECK_ONLY ? 'check' : 'copy', REPO_ROOT)

    const storiesSrc = await resolveHistoireOutDir()
    const docsSrc = resolveDocsOutDir()

    const storiesDest = resolve(MARKETING_ROOT, 'public', 'stories')
    const docsDest = resolve(MARKETING_ROOT, 'public', 'docs')

    const sources = [
        { label: 'stories', src: storiesSrc, dest: storiesDest },
        { label: 'docs', src: docsSrc, dest: docsDest },
    ]

    // --- Check phase: verify sources exist ---
    let hasErrors = false
    for (const { label, src } of sources) {
        if (existsSync(src)) {
            log(`check-${label}`, 'ok', src)
        } else {
            logError(`check-${label}`, `Source directory missing — run the matching build command first`, src)
            hasErrors = true
        }
    }

    if (hasErrors) {
        logError('result', 'One or more source directories are missing. Aborting.')
        process.exit(1)
    }

    if (CHECK_ONLY) {
        log('result', 'check-passed')
        process.exit(0)
    }

    // --- Copy phase ---
    for (const { label, src, dest } of sources) {
        // Clean destination before copy to prevent stale assets
        if (existsSync(dest)) {
            log(`clean-${label}`, 'removing', dest)
            rmSync(dest, { recursive: true, force: true })
        }

        log(`copy-${label}`, 'start', `${src} → ${dest}`)
        try {
            await cp(src, dest, {
                recursive: true,
                verbatimSymlinks: false,
                ...(VERBOSE
                    ? {
                        filter: (srcFile) => {
                            log(`copy-${label}`, 'file', srcFile)
                            return true
                        }
                    }
                    : {}),
            })
            log(`copy-${label}`, 'done', dest)
        } catch (err) {
            logError(`copy-${label}`, err.message ?? String(err), dest)
            process.exit(1)
        }
    }

    log('result', 'success')
    process.exit(0)
}

main()
