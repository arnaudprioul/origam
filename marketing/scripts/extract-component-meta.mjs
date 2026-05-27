#!/usr/bin/env node
/**
 * extract-component-meta.mjs
 *
 * Scans origam src/ and produces marketing/.generated/components-meta.json
 * containing props / emits / slots for each catalogued component.
 *
 * Usage:
 *   node scripts/extract-component-meta.mjs [options]
 *
 * Options:
 *   --out=<path>         Output JSON path (default: .generated/components-meta.json)
 *   --component=<name>   Extract a single component only (by name or slug)
 *   --verbose            Log each prop / emit / slot found
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url))
const MARKETING_DIR = resolve(__dirname, '..')
const ORIGAM_SRC = resolve(MARKETING_DIR, '..', 'src')
const ORIGAM_ROOT = resolve(MARKETING_DIR, '..')

// ---------------------------------------------------------------------------
// CLI args parsing
// ---------------------------------------------------------------------------
const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
        const eqIdx = a.indexOf('=')
        const key = a.replace(/^--/, '').slice(0, eqIdx >= 0 ? eqIdx - 2 : undefined)
        // Re-parse cleanly
        const parts = a.replace(/^--/, '').split('=')
        return [parts[0], parts.length > 1 ? parts.slice(1).join('=') : true]
    })
)

const OUT_PATH = resolve(MARKETING_DIR, typeof args.out === 'string' ? args.out : '.generated/components-meta.json')
const FILTER_COMPONENT = typeof args.component === 'string' ? args.component : null
const VERBOSE = args.verbose === true || args.verbose === 'true'

// ---------------------------------------------------------------------------
// Structured logger (JSON-line format)
// ---------------------------------------------------------------------------
function log(level, message, data = {}) {
    const entry = { ts: new Date().toISOString(), level, message, ...data }
    if (level === 'error' || level === 'warn') {
        process.stderr.write(JSON.stringify(entry) + '\n')
    } else {
        process.stdout.write(JSON.stringify(entry) + '\n')
    }
}

function logDebug(message, data = {}) {
    if (VERBOSE) log('debug', message, data)
}

// ---------------------------------------------------------------------------
// Component list — mirrors app/consts/component-list.const.ts
// Duplicated here to avoid TS/ESM transpile dependency at build time.
// ---------------------------------------------------------------------------
const COMPONENT_LIST = [
    { name: 'Alert', slug: 'alert', category: 'feedback', description: 'Contextual message band for info, success, warning and error states.' },
    { name: 'App', slug: 'app', category: 'layout', description: 'Root application shell that wires themes, density and global defaults.' },
    { name: 'Audio', slug: 'audio', category: 'media', description: 'Accessible audio player with customisable controls and waveform.' },
    { name: 'Avatar', slug: 'avatar', category: 'media', description: 'Circular user picture with image, initials or icon fallback.' },
    { name: 'Badge', slug: 'badge', category: 'feedback', description: 'Numeric or dot indicator overlaid on another element.' },
    { name: 'Blockquote', slug: 'blockquote', category: 'utilities', description: 'Styled pull-quote with optional citation and accent border.' },
    { name: 'BottomNav', slug: 'bottom-nav', category: 'navigation', description: 'Mobile-first bottom navigation bar with icon + label items.' },
    { name: 'Bracket', slug: 'bracket', category: 'utilities', description: 'Decorative bracket wrapper for tournament-style bracket layouts.' },
    { name: 'Breadcrumb', slug: 'breadcrumb', category: 'navigation', description: 'Hierarchical page trail with custom separator and overflow collapse.' },
    { name: 'Btn', slug: 'btn', category: 'utilities', description: 'Versatile button with all variants, sizes, icons and loading state.' },
    { name: 'Calendar', slug: 'calendar', category: 'forms', description: 'Full month/week/day calendar view with event slots and navigation.' },
    { name: 'Card', slug: 'card', category: 'layout', description: 'Elevated surface container with header, media, content and action areas.' },
    { name: 'Carousel', slug: 'carousel', category: 'media', description: 'Touch-friendly horizontal slider with autoplay, dots and arrow controls.' },
    { name: 'Chart', slug: 'chart', category: 'media', description: '29 chart types (bar, line, pie, radar…) built on SVG with design tokens.' },
    { name: 'Checkbox', slug: 'checkbox', category: 'forms', description: 'Accessible checkbox with indeterminate state and custom label.' },
    { name: 'Chip', slug: 'chip', category: 'utilities', description: 'Compact tag or filter badge with optional close button and avatar.' },
    { name: 'ClientOnly', slug: 'client-only', category: 'utilities', description: 'Renders its slot only on the client, preventing SSR/hydration mismatches.' },
    { name: 'Clipboard', slug: 'clipboard', category: 'utilities', description: 'One-click copy-to-clipboard with visual confirmation feedback.' },
    { name: 'Code', slug: 'code', category: 'utilities', description: 'Syntax-highlighted code block with copy button and language label.' },
    { name: 'ColorPicker', slug: 'color-picker', category: 'forms', description: 'Full-featured colour picker with hue slider, opacity and hex/rgb inputs.' },
    { name: 'ColorPickerField', slug: 'color-picker-field', category: 'forms', description: 'Form field variant of ColorPicker with label, hint and validation.' },
    { name: 'CommandPalette', slug: 'command-palette', category: 'navigation', description: 'Keyboard-driven command palette overlay with fuzzy search.' },
    { name: 'ConfirmWrapper', slug: 'confirm-wrapper', category: 'overlay', description: 'Wraps any trigger with an inline confirmation prompt before action.' },
    { name: 'ContextualMenu', slug: 'contextual-menu', category: 'overlay', description: 'Right-click or long-press context menu anchored to a target element.' },
    { name: 'Counter', slug: 'counter', category: 'utilities', description: 'Animated number counter that tweens from one value to another.' },
    { name: 'DataList', slug: 'data-list', category: 'data', description: 'Key-value list renderer with optional KV mode and custom row slots.' },
    { name: 'DataTable', slug: 'data-table', category: 'data', description: 'Feature-rich table with sort, filter, pagination, selection and expansion.' },
    { name: 'DatePicker', slug: 'date-picker', category: 'forms', description: 'Standalone date/range picker with month grid and keyboard navigation.' },
    { name: 'DatePickerField', slug: 'date-picker-field', category: 'forms', description: 'Form field variant of DatePicker with label, hint and validation.' },
    { name: 'DefaultsProvider', slug: 'defaults-provider', category: 'utilities', description: 'Injects prop defaults to all descendent origam components in its tree.' },
    { name: 'Dialog', slug: 'dialog', category: 'overlay', description: 'Modal dialog with multiple sizes, fullscreen mode and focus trap.' },
    { name: 'Divider', slug: 'divider', category: 'layout', description: 'Horizontal or vertical separator with optional label inset.' },
    { name: 'Drawer', slug: 'drawer', category: 'overlay', description: 'Side-panel drawer that slides in from any edge with scrim backdrop.' },
    { name: 'EmptyState', slug: 'empty-state', category: 'feedback', description: 'Placeholder illustration + message for zero-data screens.' },
    { name: 'ExpansionPanel', slug: 'expansion-panel', category: 'layout', description: 'Accordion-style panel group with animated expand/collapse.' },
    { name: 'Field', slug: 'field', category: 'forms', description: 'Base form field shell with label, hint, error message and affix slots.' },
    { name: 'FileField', slug: 'file-field', category: 'forms', description: 'Drag-and-drop file upload field with preview, progress and multi-file.' },
    { name: 'Form', slug: 'form', category: 'forms', description: 'Form wrapper providing validation context and submit handling.' },
    { name: 'Grid', slug: 'grid', category: 'layout', description: 'CSS-grid row container with configurable columns and gutter.' },
    { name: 'Grids', slug: 'grids', category: 'layout', description: 'Responsive column component — the col counterpart to Grid row.' },
    { name: 'Icon', slug: 'icon', category: 'media', description: 'Universal icon wrapper supporting Material Symbols and custom SVGs.' },
    { name: 'Img', slug: 'img', category: 'media', description: 'Smart image with lazy-load, aspect-ratio, srcset and fallback.' },
    { name: 'InfiniteScroll', slug: 'infinite-scroll', category: 'data', description: 'Intersection-observer-based infinite scroll trigger for lists.' },
    { name: 'InlineEdit', slug: 'inline-edit', category: 'forms', description: 'Click-to-edit inline text with confirm/cancel controls.' },
    { name: 'Input', slug: 'input', category: 'forms', description: 'Low-level text input primitive consumed by all form field components.' },
    { name: 'ItemGroup', slug: 'item-group', category: 'utilities', description: 'Single or multi-select group managing active state across children.' },
    { name: 'Kbd', slug: 'kbd', category: 'utilities', description: 'Keyboard key badge rendering sequences like ⌘K or Ctrl+Shift+P.' },
    { name: 'Label', slug: 'label', category: 'forms', description: 'Accessible form label with required indicator and disabled styling.' },
    { name: 'Layout', slug: 'layout', category: 'layout', description: 'Application chrome layout with app-bar, drawer and main content areas.' },
    { name: 'Lazy', slug: 'lazy', category: 'utilities', description: 'Defers rendering of heavy slot content until it enters the viewport.' },
    { name: 'List', slug: 'list', category: 'navigation', description: 'Navigational list with items, sub-headers, dividers and icon slots.' },
    { name: 'Loader', slug: 'loader', category: 'feedback', description: 'Circular or linear loading indicator with determinate and indeterminate modes.' },
    { name: 'Main', slug: 'main', category: 'layout', description: 'Semantic main content area that adapts to Layout drawer/rail offsets.' },
    { name: 'Masonry', slug: 'masonry', category: 'layout', description: 'Pinterest-style masonry grid using CSS columns with auto flow.' },
    { name: 'Media', slug: 'media', category: 'media', description: 'Responsive media container that maintains any aspect-ratio.' },
    { name: 'Menu', slug: 'menu', category: 'overlay', description: 'Floating dropdown menu anchored to a trigger with smart positioning.' },
    { name: 'Messages', slug: 'messages', category: 'feedback', description: 'Renders a list of hint, warning or error messages below a form field.' },
    { name: 'NumberField', slug: 'number-field', category: 'forms', description: 'Numeric input with stepper controls, min/max, step and formatting.' },
    { name: 'NumberFormat', slug: 'number-format', category: 'utilities', description: 'Inline number formatter using Intl.NumberFormat with locale support.' },
    { name: 'OtpInputField', slug: 'otp-input-field', category: 'forms', description: '6-digit OTP input with auto-focus advance and paste handling.' },
    { name: 'Overlay', slug: 'overlay', category: 'overlay', description: 'Base scrim overlay layer used by dialogs, drawers and menus.' },
    { name: 'Pagination', slug: 'pagination', category: 'navigation', description: 'Page controls with prev/next, page numbers, jump-to and page-size picker.' },
    { name: 'Parallax', slug: 'parallax', category: 'media', description: 'Scroll-driven parallax image or slot with configurable speed factor.' },
    { name: 'PasswordField', slug: 'password-field', category: 'forms', description: 'Password input with show/hide toggle, strength meter and rules.' },
    { name: 'Picker', slug: 'picker', category: 'overlay', description: 'Generic floating picker shell used by ColorPicker and DatePicker.' },
    { name: 'Progress', slug: 'progress', category: 'feedback', description: 'Linear or circular progress bar with label and determinate/indeterminate modes.' },
    { name: 'QRCode', slug: 'qr-code', category: 'media', description: 'Renders a QR code SVG from any string value with custom colours.' },
    { name: 'Radio', slug: 'radio', category: 'forms', description: 'Accessible radio button with custom label and group binding.' },
    { name: 'RatingField', slug: 'rating-field', category: 'forms', description: 'Star or custom-icon rating input with half-star and read-only modes.' },
    { name: 'Responsive', slug: 'responsive', category: 'utilities', description: 'Slot-based breakpoint wrapper that renders content for a given viewport.' },
    { name: 'Section', slug: 'section', category: 'layout', description: 'Semantic section container with constrained-width inner content.' },
    { name: 'Select', slug: 'select', category: 'forms', description: 'Searchable select/combobox with single and multi-select modes.' },
    { name: 'SelectionControl', slug: 'selection-control', category: 'forms', description: 'Base selection primitive shared by Checkbox, Radio and Switch.' },
    { name: 'Sheet', slug: 'sheet', category: 'overlay', description: 'Bottom sheet with drag handle, snap points and swipe-to-dismiss.' },
    { name: 'Skeleton', slug: 'skeleton', category: 'feedback', description: 'Animated loading placeholder matching the shape of incoming content.' },
    { name: 'Slide', slug: 'slide', category: 'utilities', description: 'Single slide panel for Carousel — handles transitions and lazy media.' },
    { name: 'SliderField', slug: 'slider-field', category: 'forms', description: 'Range slider with single thumb or dual handles for interval selection.' },
    { name: 'Snackbar', slug: 'snackbar', category: 'feedback', description: 'Timed toast notification with action button and position variants.' },
    { name: 'Stepper', slug: 'stepper', category: 'navigation', description: 'Multi-step wizard with linear or non-linear navigation and step states.' },
    { name: 'Switch', slug: 'switch', category: 'forms', description: 'Toggle switch with animated thumb, custom labels and loading state.' },
    { name: 'SystemBar', slug: 'system-bar', category: 'layout', description: 'App-level status bar for notifications count, battery and time display.' },
    { name: 'Table', slug: 'table', category: 'data', description: 'Semantic HTML table primitives with sticky headers and responsive scroll.' },
    { name: 'Tabs', slug: 'tabs', category: 'navigation', description: 'Tab bar with panel content, icons, badges and scroll overflow.' },
    { name: 'TextareaField', slug: 'textarea-field', category: 'forms', description: 'Auto-resizing textarea with char counter, label and validation.' },
    { name: 'TextField', slug: 'text-field', category: 'forms', description: 'Full-featured text input with label, affixes, clear button and validation.' },
    { name: 'TextMask', slug: 'text-mask', category: 'forms', description: 'Input with pattern mask (phone, date, IBAN…) and live formatting.' },
    { name: 'ThemeProvider', slug: 'theme-provider', category: 'utilities', description: 'Sub-tree theme override — switch any branch to dark, light or brand.' },
    { name: 'Timeline', slug: 'timeline', category: 'data', description: 'Vertical or horizontal timeline with event items and connector lines.' },
    { name: 'Title', slug: 'title', category: 'utilities', description: 'Typographic title component rendering h1–h6 with design-token scales.' },
    { name: 'Toolbar', slug: 'toolbar', category: 'layout', description: 'Horizontal toolbar at 56dp height for actions, search and controls.' },
    { name: 'Tooltip', slug: 'tooltip', category: 'overlay', description: 'Hover or focus tooltip anchored to any element with smart flip.' },
    { name: 'Treeview', slug: 'treeview', category: 'data', description: 'Hierarchical tree with lazy-load, multi-select, drag-and-drop and icons.' },
    { name: 'Video', slug: 'video', category: 'media', description: 'Styled video player with poster, controls overlay and aspect-ratio.' },
    { name: 'VirtualScroll', slug: 'virtual-scroll', category: 'data', description: 'Virtualised list rendering only visible items for massive datasets.' },
    { name: 'Watermark', slug: 'watermark', category: 'utilities', description: 'Canvas-based watermark overlay with text or image, angle and opacity.' },
    { name: 'Window', slug: 'window', category: 'overlay', description: 'Draggable, resizable floating window panel for desktop-like UIs.' },
]

// ---------------------------------------------------------------------------
// Directory name mapping — handles repo name discrepancies between
// src/interfaces/ and src/components/ directories.
// Keys are component names; values are the directory names under src/interfaces/.
// src/components/ uses the canonical component name (no aliases needed there).
// ---------------------------------------------------------------------------
const INTERFACE_DIR_MAP = {
    DefaultsProvider: 'DefaultProvider',   // interface dir missing trailing 's'
    ExpansionPanel: 'ExpensionPanel',       // typo in repo: "Expension"
    QRCode: 'QrCode',
}

// Map component name → interface name prefix (when it differs from the component name)
// e.g. QRCode uses IQrCodeProps not IQRCodeProps
const INTERFACE_NAME_MAP = {
    QRCode: 'QrCode',
}

function getInterfaceDirName(name) {
    return INTERFACE_DIR_MAP[name] ?? name
}

function getInterfaceName(name) {
    return INTERFACE_NAME_MAP[name] ?? name
}

// ---------------------------------------------------------------------------
// File finders
// ---------------------------------------------------------------------------

/** Convert PascalCase to kebab-case */
function toKebab(s) {
    return s
        .replace(/([A-Z])/g, (m, c, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`))
}

function findInterfaceFile(name) {
    const dir = getInterfaceDirName(name)
    const kebab = toKebab(name)
    const candidates = [
        join(ORIGAM_SRC, 'interfaces', dir, `${kebab}.interface.ts`),
        join(ORIGAM_SRC, 'interfaces', dir, `${toKebab(dir)}.interface.ts`),
    ]
    return candidates.find(existsSync) ?? null
}

function findComponentFile(name) {
    // src/components/ always uses the canonical component name
    const vuePath = join(ORIGAM_SRC, 'components', name, `Origam${name}.vue`)
    return existsSync(vuePath) ? vuePath : null
}

function findDefaultsConst(name) {
    const dir = getInterfaceDirName(name)
    const kebab = toKebab(name)
    const candidates = [
        join(ORIGAM_SRC, 'consts', name, `${kebab}.const.ts`),
        join(ORIGAM_SRC, 'consts', dir, `${kebab}.const.ts`),
        join(ORIGAM_SRC, 'consts', name, `${toKebab(name)}.const.ts`),
    ]
    return candidates.find(existsSync) ?? null
}

// ---------------------------------------------------------------------------
// Defaults const parser — extract KEY_DEFAULTS object literal values
// ---------------------------------------------------------------------------
function parseDefaults(constPath) {
    if (!constPath) return {}
    try {
        const src = readFileSync(constPath, 'utf-8')
        // Match the first DEFAULTS object export
        const blockMatch = src.match(/DEFAULTS\s*[=:]\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s)
        if (!blockMatch) return {}
        const block = blockMatch[1]
        const defaults = {}
        // key: 'str' | "str" | `str` | number | boolean | identifier
        const entryRe = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(`[^`]*`)|(\btrue\b|\bfalse\b|\d[\d.]*(?:\w+)?))/g
        let m
        while ((m = entryRe.exec(block)) !== null) {
            defaults[m[1]] = m[2] ?? m[3] ?? m[4] ?? m[5] ?? ''
        }
        return defaults
    } catch {
        return {}
    }
}

// ---------------------------------------------------------------------------
// Commons interface cache + finder
// ---------------------------------------------------------------------------
const commonsCache = new Map()
const COMMONS_DIR = join(ORIGAM_SRC, 'interfaces', 'Commons')

function findInCommons(interfaceName) {
    if (commonsCache.has(interfaceName)) return commonsCache.get(interfaceName)
    let fields = []
    try {
        const files = readdirSync(COMMONS_DIR)
        for (const f of files) {
            if (!f.endsWith('.interface.ts')) continue
            const content = readFileSync(join(COMMONS_DIR, f), 'utf-8')
            if (content.includes(`interface ${interfaceName}`)) {
                fields = parseInterfaceFields(content, interfaceName)
                break
            }
        }
    } catch { /* silently ignore */ }
    commonsCache.set(interfaceName, fields)
    return fields
}

function findEmitSrcInCommons(interfaceName) {
    try {
        const files = readdirSync(COMMONS_DIR)
        for (const f of files) {
            if (!f.endsWith('.interface.ts')) continue
            const content = readFileSync(join(COMMONS_DIR, f), 'utf-8')
            if (content.includes(`interface ${interfaceName}`)) return content
        }
    } catch { /* ignore */ }
    return null
}

// ---------------------------------------------------------------------------
// Regex utility
// ---------------------------------------------------------------------------
function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ---------------------------------------------------------------------------
// Interface field parser
// Extracts { name, type, required, jsdoc } from the body of an interface.
// ---------------------------------------------------------------------------
function parseInterfaceFields(src, interfaceName) {
    const fields = []
    const bodyRe = new RegExp(
        `interface\\s+${escapeRe(interfaceName)}[\\s\\w<,>]*(?:extends[^{]+)?\\{([^{}]*(?:\\{[^{}]*\\}[^{}]*)*)\\}`,
        's'
    )
    const bodyMatch = src.match(bodyRe)
    if (!bodyMatch) return fields

    const body = bodyMatch[1]
    const lines = body.split('\n')
    let pendingJsdoc = ''
    let inBlock = false

    for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line) { if (!inBlock) pendingJsdoc = ''; continue }

        // Multi-line block comment start
        if (line.startsWith('/**') || (line.startsWith('/*') && !line.includes('*/'))) {
            inBlock = true
            pendingJsdoc = line.replace(/^\/\*+\s*/, '').replace(/\s*\*+\/$/, '').trim()
            continue
        }
        // Block comment end
        if (inBlock && line.startsWith('*/')) { inBlock = false; continue }
        // Inside block comment
        if (inBlock) {
            const docLine = line.replace(/^\*\s?/, '').trim()
            if (docLine && !docLine.startsWith('@')) {
                pendingJsdoc = pendingJsdoc ? `${pendingJsdoc} ${docLine}` : docLine
            }
            continue
        }
        // Inline JSDoc
        const inlineDoc = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/)
        if (inlineDoc) { pendingJsdoc = inlineDoc[1].trim(); continue }
        // Single-line comment
        if (line.startsWith('//')) { pendingJsdoc = ''; continue }

        // Field: name?: Type or name: Type
        // Strip trailing semicolons, commas and inline comments first
        const cleanLine = line.replace(/[;,]$/, '').replace(/\s*\/\/.*$/, '').trim()
        const fieldMatch = cleanLine.match(/^(\w+)(\?)?:\s*(.+)$/)
        if (fieldMatch) {
            fields.push({
                name: fieldMatch[1],
                type: fieldMatch[3].trim(),
                required: fieldMatch[2] !== '?',
                jsdoc: pendingJsdoc || undefined,
            })
            pendingJsdoc = ''
        } else {
            pendingJsdoc = ''
        }
    }
    return fields
}

// ---------------------------------------------------------------------------
// Extends resolver — extracts parent interface names from declaration
// ---------------------------------------------------------------------------
function parseExtends(src, interfaceName) {
    const re = new RegExp(
        `interface\\s+${escapeRe(interfaceName)}[\\s\\w,<>]*extends\\s+([^{]+)\\{`,
        's'
    )
    const m = src.match(re)
    if (!m) return []
    return m[1]
        .split(',')
        .map((s) => s.trim().replace(/<[^>]*>/g, '').trim())
        .filter(Boolean)
}

// ---------------------------------------------------------------------------
// Extract interface body (text between the outermost braces)
// ---------------------------------------------------------------------------
function extractInterfaceBody(src, interfaceName) {
    if (!src) return ''
    const re = new RegExp(
        `interface\\s+${escapeRe(interfaceName)}[\\s\\w,<>]*(?:extends[^{]+)?\\{([^{}]*)\\}`,
        's'
    )
    const m = src.match(re)
    return m ? m[1] : ''
}

// ---------------------------------------------------------------------------
// Props extractor — own fields + 1 level of Commons inheritance
// ---------------------------------------------------------------------------
function parseProps(interfaceFilePath, componentName, defaults) {
    if (!interfaceFilePath) return []
    let src
    try {
        src = readFileSync(interfaceFilePath, 'utf-8')
    } catch {
        log('warn', 'Cannot read interface file', { path: interfaceFilePath, component: componentName })
        return []
    }

    const propsInterfaceName = `I${getInterfaceName(componentName)}Props`
    const ownFields = parseInterfaceFields(src, propsInterfaceName)

    // Resolve one level of extends from Commons
    const extended = parseExtends(src, propsInterfaceName)
    const inheritedFields = []
    for (const extName of extended) {
        logDebug('resolving extends', { interface: propsInterfaceName, extends: extName })
        inheritedFields.push(...findInCommons(extName))
    }

    // Merge — own props take precedence; deduplicate by name
    const seen = new Set()
    const all = []
    for (const f of [...ownFields, ...inheritedFields]) {
        if (seen.has(f.name)) continue
        seen.add(f.name)
        all.push({
            name: f.name,
            type: f.type,
            required: f.required,
            ...(defaults[f.name] !== undefined ? { default: String(defaults[f.name]) } : {}),
            ...(f.jsdoc ? { description: f.jsdoc } : {}),
        })
    }
    return all
}

// ---------------------------------------------------------------------------
// Emits extractor
// Handles: defineEmits<IXxxEmits>(), defineEmits<{...}>(), defineEmits([...])
// ---------------------------------------------------------------------------
function parseEmitBody(body) {
    if (!body) return []
    const emits = []
    // (e: 'eventName', param?: Type): void
    const lineRe = /\(e:\s*['"]([^'"]+)['"](?:,\s*([^)]+))?\)\s*:/g
    let m
    while ((m = lineRe.exec(body)) !== null) {
        const name = m[1]
        let payload = 'void'
        if (m[2]) {
            payload = m[2]
                .split(',')
                .map((p) => {
                    const idx = p.indexOf(':')
                    return idx >= 0 ? p.slice(idx + 1).trim() : p.trim()
                })
                .join(', ')
        }
        emits.push({ name, payload })
    }
    return emits
}

function resolveEmitsInterface(interfaceName, interfaceFilePath) {
    let src = ''
    if (interfaceFilePath && existsSync(interfaceFilePath)) {
        src = readFileSync(interfaceFilePath, 'utf-8')
    }
    const ownEmits = parseEmitBody(extractInterfaceBody(src, interfaceName))
    const extended = src ? parseExtends(src, interfaceName) : []
    const inherited = []
    for (const extName of extended) {
        const extSrc = findEmitSrcInCommons(extName)
        if (extSrc) {
            inherited.push(...parseEmitBody(extractInterfaceBody(extSrc, extName)))
        }
    }
    const seen = new Set()
    const all = []
    for (const e of [...ownEmits, ...inherited]) {
        if (seen.has(e.name)) continue
        seen.add(e.name)
        all.push(e)
    }
    return all
}

function parseEmitsFromVue(vueSrc, interfaceFilePath, componentName) {
    // Strategy 1: defineEmits<IXxxEmits>()
    const byInterface = vueSrc.match(/defineEmits<\s*(I\w+Emits)\s*>/)
    if (byInterface) {
        return resolveEmitsInterface(byInterface[1], interfaceFilePath)
    }
    // Strategy 2: defineEmits<{ ... }>() inline
    const inlineMatch = vueSrc.match(/defineEmits<\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}>/s)
    if (inlineMatch) return parseEmitBody(inlineMatch[1])
    // Strategy 3: defineEmits([...]) array form
    const arrayMatch = vueSrc.match(/defineEmits\(\s*\[([^\]]*)\]/)
    if (arrayMatch) {
        return (arrayMatch[1].match(/['"]([^'"]+)['"]/g) ?? []).map((e) => ({
            name: e.replace(/['"]/g, ''),
            payload: 'unknown',
        }))
    }
    return []
}

// ---------------------------------------------------------------------------
// Slots extractor
// Handles: defineSlots<{...}>() or <slot name="..."> fallback
// ---------------------------------------------------------------------------
function parseSlotsBody(body) {
    if (!body) return []
    const slots = []
    // slotName?: (scope: { ... }) => any | slotName?: () => any
    const lineRe = /(\w+)\??\s*:\s*\(([^)]*)\)\s*=>/g
    let m
    while ((m = lineRe.exec(body)) !== null) {
        const scope = m[2].trim() || undefined
        slots.push({ name: m[1], ...(scope ? { scope } : {}) })
    }
    return slots
}

function parseSlotsFromVue(vueSrc) {
    // Strategy 1: defineSlots<{...}>()
    const defineSlotsMatch = vueSrc.match(/defineSlots<\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}>/s)
    if (defineSlotsMatch) return parseSlotsBody(defineSlotsMatch[1])

    // Strategy 2: <slot name="..."> template scan
    const seen = new Set()
    const slots = []
    const slotRe = /<slot(?:\s+name="([^"]*)")?[^>]*>/g
    let m
    while ((m = slotRe.exec(vueSrc)) !== null) {
        const name = m[1] ?? 'default'
        if (!seen.has(name)) { seen.add(name); slots.push({ name }) }
    }
    return slots
}

// ---------------------------------------------------------------------------
// Single component extraction
// ---------------------------------------------------------------------------
function extractComponent(meta) {
    const { name, slug, category, description } = meta

    const interfaceFilePath = findInterfaceFile(name)
    const componentFilePath = findComponentFile(name)
    const defaultsConstPath = findDefaultsConst(name)

    logDebug('processing', {
        component: name,
        interfaceFile: interfaceFilePath ?? 'NOT FOUND',
        componentFile: componentFilePath ?? 'NOT FOUND',
        defaultsConst: defaultsConstPath ?? 'none',
    })

    if (!interfaceFilePath) {
        log('warn', 'Interface file not found', { component: name })
    }
    if (!componentFilePath) {
        log('warn', 'Component .vue file not found', { component: name })
    }

    const defaults = parseDefaults(defaultsConstPath)
    const props = parseProps(interfaceFilePath, name, defaults)
    let emits = []
    let slots = []

    if (componentFilePath) {
        try {
            const vueSrc = readFileSync(componentFilePath, 'utf-8')
            emits = parseEmitsFromVue(vueSrc, interfaceFilePath, name)
            slots = parseSlotsFromVue(vueSrc)
        } catch (err) {
            log('warn', 'Cannot read .vue file', { component: name, error: err.message })
        }
    }

    log('info', 'extracted', { component: name, props: props.length, emits: emits.length, slots: slots.length })

    // Build relative paths from origam repo root
    const toRelative = (p) => p ? p.replace(ORIGAM_ROOT + '/', '') : ''

    return {
        name,
        slug,
        category,
        description,
        interfacePath: toRelative(interfaceFilePath),
        componentPath: toRelative(componentFilePath),
        props,
        emits,
        slots,
    }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
    const list = FILTER_COMPONENT
        ? COMPONENT_LIST.filter(
              (c) =>
                  c.name.toLowerCase() === FILTER_COMPONENT.toLowerCase() ||
                  c.slug === FILTER_COMPONENT
          )
        : COMPONENT_LIST

    if (FILTER_COMPONENT && list.length === 0) {
        log('error', 'Component not found in list', { component: FILTER_COMPONENT })
        process.exit(1)
    }

    log('info', 'starting extraction', { total: list.length, out: OUT_PATH, verbose: VERBOSE })

    const results = []
    let errorCount = 0

    for (const meta of list) {
        try {
            results.push(extractComponent(meta))
        } catch (err) {
            log('error', 'failed to extract component', {
                component: meta.name,
                error: err instanceof Error ? err.message : String(err),
            })
            errorCount++
            // Push skeleton so the API stays consistent
            results.push({
                name: meta.name,
                slug: meta.slug,
                category: meta.category,
                description: meta.description,
                interfacePath: '',
                componentPath: '',
                props: [],
                emits: [],
                slots: [],
            })
        }
    }

    mkdirSync(dirname(OUT_PATH), { recursive: true })
    writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + '\n', 'utf-8')

    log('info', 'done', { total: results.length, errors: errorCount, out: OUT_PATH })
    process.exit(0)
}

main().catch((err) => {
    log('error', 'fatal error', { error: err instanceof Error ? err.message : String(err) })
    process.exit(1)
})
