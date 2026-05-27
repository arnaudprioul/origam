import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SECTION_TYPE_MAP = {
    added: 'feat',
    'added —': 'feat',
    features: 'feat',
    feat: 'feat',
    changed: 'refactor',
    'changed —': 'refactor',
    refactor: 'refactor',
    refactors: 'refactor',
    fixed: 'fix',
    'bug fixes': 'fix',
    'fix': 'fix',
    fixes: 'fix',
    removed: 'chore',
    deprecated: 'chore',
    internal: 'chore',
    chore: 'chore',
    documentation: 'docs',
    docs: 'docs',
    security: 'breaking',
    'breaking changes': 'breaking',
    '⚠ breaking changes': 'breaking',
    'breaking': 'breaking'
}

const SKIP_SECTION_PREFIXES = [
    'migrating from',
    'known limits',
    'outstanding',
    'pre-2.0'
]

const DEFAULT_OUT = resolve(__dirname, '../.generated/changelog.json')
const CHANGELOG_PATH = resolve(__dirname, '../../CHANGELOG.md')

function log (level, message, data) {
    const entry = { level, message, ts: new Date().toISOString() }
    if (data !== undefined) {
        entry.data = data
    }
    process.stderr.write(JSON.stringify(entry) + '\n')
}

function parseArgs () {
    const args = process.argv.slice(2)
    let outPath = DEFAULT_OUT
    let verbose = false

    for (const arg of args) {
        if (arg.startsWith('--out=')) {
            outPath = resolve(process.cwd(), arg.slice('--out='.length))
        } else if (arg === '--verbose') {
            verbose = true
        }
    }

    return { outPath, verbose }
}

function resolveType (rawTitle) {
    const normalized = rawTitle.trim().toLowerCase()

    for (const prefix of SKIP_SECTION_PREFIXES) {
        if (normalized.startsWith(prefix)) {
            return null
        }
    }

    for (const [key, type] of Object.entries(SECTION_TYPE_MAP)) {
        if (normalized === key || normalized.startsWith(key + ' ')) {
            return type
        }
    }

    return 'chore'
}

function parseEntry (line) {
    const trimmed = line.replace(/^-\s+/, '').trim()
    if (!trimmed) {
        return null
    }

    const scopeMatch = trimmed.match(/^\*\*([^*]+)\*\*[:\s]+(.+)$/) ||
        trimmed.match(/^`([^`]+)`[:\s]+(.+)$/)

    if (scopeMatch) {
        return {
            description: scopeMatch[2].trim(),
            scope: scopeMatch[1].trim()
        }
    }

    const prMatch = trimmed.match(/\(#(\d+)\)\s*$/)
    if (prMatch) {
        return {
            description: trimmed.replace(/\s*\(#\d+\)\s*$/, '').trim(),
            pr: prMatch[1]
        }
    }

    return { description: trimmed }
}

function parseChangelog (content) {
    const lines = content.split('\n')
    const releases = []

    let currentRelease = null
    let currentSection = null
    let currentEntryLines = []

    function flushEntry () {
        if (currentEntryLines.length === 0 || !currentSection) {
            return
        }
        const fullLine = currentEntryLines.join(' ')
        const entry = parseEntry(fullLine)
        if (entry) {
            currentSection.entries.push(entry)
        }
        currentEntryLines = []
    }

    function flushSection () {
        flushEntry()
        if (!currentSection || currentSection.entries.length === 0) {
            currentSection = null
            return
        }
        currentRelease.sections.push(currentSection)
        currentSection = null
    }

    for (const line of lines) {
        const versionMatch = line.match(/^##\s+\[([^\]]+)\]\s+[—-]+\s+(\d{4}-\d{2}-\d{2})/)

        if (versionMatch) {
            if (currentRelease) {
                flushSection()
                releases.push(currentRelease)
            }

            currentRelease = {
                version: versionMatch[1],
                date: versionMatch[2],
                sections: []
            }
            currentSection = null
            currentEntryLines = []
            continue
        }

        const unreleasedMatch = line.match(/^##\s+\[Unreleased\]/i)
        if (unreleasedMatch) {
            if (currentRelease) {
                flushSection()
                releases.push(currentRelease)
            }
            currentRelease = {
                version: 'Unreleased',
                date: '',
                sections: []
            }
            currentSection = null
            currentEntryLines = []
            continue
        }

        const preHistoryMatch = line.match(/^##\s+Pre-/)
        if (preHistoryMatch) {
            if (currentRelease) {
                flushSection()
                releases.push(currentRelease)
            }
            currentRelease = null
            continue
        }

        if (!currentRelease) {
            continue
        }

        const sectionMatch = line.match(/^###\s+(.+)$/)
        if (sectionMatch) {
            flushSection()
            const rawTitle = sectionMatch[1]
            const type = resolveType(rawTitle)
            if (type !== null) {
                currentSection = { type, entries: [] }
            } else {
                currentSection = null
            }
            continue
        }

        if (!currentSection) {
            continue
        }

        if (line.match(/^-\s+/)) {
            flushEntry()
            currentEntryLines = [line]
        } else if (line.match(/^\s+/) && currentEntryLines.length > 0) {
            currentEntryLines.push(line.trim())
        } else {
            flushEntry()
        }
    }

    if (currentRelease) {
        flushSection()
        releases.push(currentRelease)
    }

    return releases.filter(r => r.version !== 'Unreleased' || r.sections.length > 0)
}

function mergeDuplicateSections (releases) {
    return releases.map(release => {
        const merged = {}
        for (const section of release.sections) {
            if (!merged[section.type]) {
                merged[section.type] = { type: section.type, entries: [] }
            }
            merged[section.type].entries.push(...section.entries)
        }
        return {
            ...release,
            sections: Object.values(merged)
        }
    })
}

function main () {
    const { outPath, verbose } = parseArgs()

    let content
    try {
        content = readFileSync(CHANGELOG_PATH, 'utf-8')
    } catch {
        log('error', 'CHANGELOG.md not found', { path: CHANGELOG_PATH })
        process.exit(1)
    }

    log('info', 'Parsing changelog', { path: CHANGELOG_PATH })

    const releases = mergeDuplicateSections(parseChangelog(content))

    if (verbose) {
        for (const release of releases) {
            log('debug', 'Release parsed', {
                version: release.version,
                date: release.date,
                sections: release.sections.map(s => ({ type: s.type, count: s.entries.length }))
            })
        }
    }

    const totalEntries = releases.reduce((acc, r) => acc + r.sections.reduce((a, s) => a + s.entries.length, 0), 0)
    log('info', 'Parse complete', { releases: releases.length, totalEntries })

    const outDir = dirname(outPath)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(outPath, JSON.stringify(releases, null, 2), 'utf-8')

    log('info', 'Output written', { path: outPath })

    process.exit(0)
}

main()
