/**
 * extract-i18n-keys.mjs
 * Scans app/**\/*.{vue,ts} for t('key', 'fallback') calls,
 * generates i18n/locales/en.json and app/locales/fr.json.
 *
 * Usage:
 *   node scripts/extract-i18n-keys.mjs
 *   node scripts/extract-i18n-keys.mjs --check
 */

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT = join(__dirname, '..')
const APP_DIR = join(ROOT, 'app')
const LOCALES_DIR = join(APP_DIR, 'locales')
const CHECK_MODE = process.argv.includes('--check')

const FR_TRANSLATIONS = {
    'Search': 'Rechercher',
    'Search…': 'Rechercher…',
    'Search components, posts, docs…': 'Rechercher des composants, articles, docs…',
    'Open': 'Ouvrir',
    'Close': 'Fermer',
    'Home': 'Accueil',
    'Components': 'Composants',
    'Playground': 'Playground',
    'Docs': 'Docs',
    'Stories': 'Stories',
    'Blog': 'Blog',
    'Changelog': 'Journal des modifications',
    'About': 'À propos',
    'GitHub': 'GitHub',
    'Loading…': 'Chargement…',
    'Next': 'Suivant',
    'Previous': 'Précédent',
    'Read article': "Lire l'article",
    'View on GitHub': 'Voir sur GitHub',
    'Skip to content': 'Aller au contenu',
    'Open menu': 'Ouvrir le menu',
    'Close menu': 'Fermer le menu',
    'Link copied!': 'Lien copié !',
    'Reset': 'Réinitialiser',
    'Searching…': 'Recherche en cours…',
    'navigate': 'naviguer',
    'select': 'sélectionner',
    'toggle': 'basculer',
    'Esc': 'Échap'
}

function log (level, message, data) {
    const entry = { level, message, timestamp: new Date().toISOString() }
    if (data !== undefined) entry.data = data
    process.stdout.write(JSON.stringify(entry) + '\n')
}

function walkDir (dir, ext, results = []) {
    const entries = readdirSync(dir)
    for (const entry of entries) {
        const fullPath = join(dir, entry)
        const stat = statSync(fullPath)
        if (stat.isDirectory()) {
            if (entry !== 'node_modules' && entry !== '.nuxt' && entry !== '.output') {
                walkDir(fullPath, ext, results)
            }
        } else if (ext.includes(extname(entry))) {
            results.push(fullPath)
        }
    }
    return results
}

const T_CALL_SINGLE = /\bt\(\s*'([^']+)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*\)/g
const T_CALL_TEMPLATE = /\bt\(\s*'([^']+)'\s*,\s*`([^`]+)`\s*\)/g

function extractFromFile (filePath) {
    const content = readFileSync(filePath, 'utf8')
    const entries = []
    let match

    T_CALL_SINGLE.lastIndex = 0
    while ((match = T_CALL_SINGLE.exec(content)) !== null) {
        entries.push({ key: match[1], fallback: match[2].replace(/\\'/g, "'") })
    }

    T_CALL_TEMPLATE.lastIndex = 0
    while ((match = T_CALL_TEMPLATE.exec(content)) !== null) {
        entries.push({ key: match[1], fallback: match[2] })
    }

    return entries
}

function setNestedValue (obj, keyPath, value) {
    const parts = keyPath.split('.')
    let current = obj
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i]
        if (typeof current[part] !== 'object' || current[part] === null) {
            current[part] = {}
        }
        current = current[part]
    }
    const last = parts[parts.length - 1]
    if (current[last] === undefined) {
        current[last] = value
    }
    return obj
}

function resolveFrTranslation (key, fallback) {
    if (FR_TRANSLATIONS[fallback]) {
        return FR_TRANSLATIONS[fallback]
    }
    return fallback
}

function main () {
    log('info', 'Scanning app directory', { dir: APP_DIR })

    const files = walkDir(APP_DIR, ['.vue', '.ts'])
    log('info', 'Files found', { count: files.length })

    const allEntries = []
    const seenKeys = new Set()
    const duplicates = []

    for (const file of files) {
        const entries = extractFromFile(file)
        for (const entry of entries) {
            if (seenKeys.has(entry.key)) {
                duplicates.push({ key: entry.key, file })
            } else {
                seenKeys.add(entry.key)
                allEntries.push(entry)
            }
        }
    }

    log('info', 'Keys extracted', { total: allEntries.length, duplicates: duplicates.length })

    if (CHECK_MODE) {
        if (duplicates.length > 0) {
            log('warn', 'Duplicate keys found', { duplicates })
        }

        const missingFallback = allEntries.filter(e => !e.fallback || e.fallback.trim() === '')
        if (missingFallback.length > 0) {
            log('error', 'Keys without fallback', { keys: missingFallback.map(e => e.key) })
            process.exit(1)
        }

        log('info', 'Check passed', { keys: allEntries.length, duplicates: duplicates.length })
        return
    }

    const enJson = {}
    const frJson = {}

    for (const { key, fallback } of allEntries) {
        setNestedValue(enJson, key, fallback)
        setNestedValue(frJson, key, resolveFrTranslation(key, fallback))
    }

    if (!existsSync(LOCALES_DIR)) {
        import('fs').then(fs => fs.mkdirSync(LOCALES_DIR, { recursive: true }))
    }

    writeFileSync(join(LOCALES_DIR, 'en.json'), JSON.stringify(enJson, null, 2) + '\n', 'utf8')
    writeFileSync(join(LOCALES_DIR, 'fr.json'), JSON.stringify(frJson, null, 2) + '\n', 'utf8')

    log('info', 'Locale files written', {
        en: join(LOCALES_DIR, 'en.json'),
        fr: join(LOCALES_DIR, 'fr.json'),
        totalKeys: allEntries.length
    })
}

main()
