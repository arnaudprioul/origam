/**
 * read-existing.mjs — load the curated object out of an existing
 * app/consts/<domain>/<slug>.const.ts file WITHOUT executing project code.
 *
 * The files are pure data modules whose only import is a TYPE-ONLY
 * `import type { IXxxDoc } from '~/...'`. We strip imports, transpile TS→JS
 * with the TypeScript compiler, then import the JS as a data: URL. The
 * returned object holds the curated fields (descriptions, examples, usedBy…)
 * we must preserve across regeneration.
 */

import { createRequire } from 'node:module'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
/** @type {import('typescript')} */
const ts = require('typescript')

/**
 * @param {string} filePath absolute path to the existing .const.ts
 * @returns {Promise<{ exportName: string, doc: any } | null>}
 */
export async function readExistingDoc (filePath) {
    let src
    try { src = fs.readFileSync(filePath, 'utf-8') } catch { return null }

    // Drop the type-only import line(s) — they reference the '~' alias which
    // node cannot resolve and they carry no runtime value.
    const cleaned = src.replace(/^\s*import\s+type\s+.*$/gm, '')

    const out = ts.transpileModule(cleaned, {
        compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
            removeComments: false,
        },
    })

    const dataUrl = 'data:text/javascript;base64,' + Buffer.from(out.outputText).toString('base64')
    let mod
    try { mod = await import(dataUrl) } catch { return null }

    const exportName = Object.keys(mod).find(k => k.endsWith('_DOC'))
    if (!exportName) return null
    return { exportName, doc: mod[exportName] }
}
