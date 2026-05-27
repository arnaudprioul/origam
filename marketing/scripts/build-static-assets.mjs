#!/usr/bin/env node
/**
 * build-static-assets.mjs — assemble static assets for the origam marketing site.
 *
 * 1. Copies <repo>/dist/stories  → <marketing>/public/stories
 * 2. Copies <repo>/docs/.vitepress/dist → <marketing>/public/docs
 *
 * Histoire outDir is read from histoire.config.js (field `build.dir` or `outDir`).
 * VitePress output is always <repo>/docs/.vitepress/dist.
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
const REPO_ROOT = resolve(MARKETING_ROOT, '..')

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
async function resolveHistoireOutDir() {
    const configPath = join(REPO_ROOT, 'histoire.config.js')
    if (!existsSync(configPath)) {
        log('histoire-config', 'not-found', configPath)
        return resolve(REPO_ROOT, 'dist/stories')
    }

    try {
        const src = await readFile(configPath, 'utf-8')
        // Look for outDir: 'value' or outDir: "value"
        const match = src.match(/\boutDir\s*:\s*['"]([^'"]+)['"]/)
        if (match) {
            const outDir = match[1]
            const resolved = resolve(REPO_ROOT, outDir)
            log('histoire-config', 'resolved', resolved)
            return resolved
        }
    } catch (err) {
        log('histoire-config', 'parse-error', configPath)
    }

    // Fallback chain
    const fallback1 = resolve(REPO_ROOT, 'dist/stories')
    const fallback2 = resolve(REPO_ROOT, '.histoire/dist')
    if (existsSync(fallback1)) {
        log('histoire-config', 'fallback-dist-stories', fallback1)
        return fallback1
    }
    if (existsSync(fallback2)) {
        log('histoire-config', 'fallback-histoire-dist', fallback2)
        return fallback2
    }

    logError('histoire-config', 'Cannot determine Histoire outDir — run `npm run story:build` first')
    return fallback1
}

// --- Main ---
async function main() {
    log('start', CHECK_ONLY ? 'check' : 'copy', REPO_ROOT)

    const storiesSrc = await resolveHistoireOutDir()
    const docsSrc = resolve(REPO_ROOT, 'docs', '.vitepress', 'dist')

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
