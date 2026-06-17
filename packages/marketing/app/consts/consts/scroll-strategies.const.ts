import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SCROLL_STRATEGIES_CONST_DOC: IConstDoc = {
    slug: 'scroll-strategies',
    name: 'SCROLL_STRATEGIES',
    category: 'Overlay & Positioning',
    descriptionKey: 'consts.catalog.scroll_strategies.description',
    descriptionFallback: 'Map of scroll behaviour strategies consumed by overlaying components (Menu, Tooltip, Snackbar, ContextualMenu, Overlay). Keys are the prop string values; values are the strategy handler functions (or null for "none").',
    definition: `export const SCROLL_STRATEGIES = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
}`,
    values: [
        { value: 'none', descriptionKey: 'consts.detail.scroll_strategies.none', descriptionFallback: 'No scroll handling — overlay stays in place while the page scrolls freely.' },
        { value: 'close', descriptionKey: 'consts.detail.scroll_strategies.close', descriptionFallback: 'Overlay closes automatically when the user scrolls.' },
        { value: 'block', descriptionKey: 'consts.detail.scroll_strategies.block', descriptionFallback: 'Page scroll is blocked while the overlay is open.' },
        { value: 'reposition', descriptionKey: 'consts.detail.scroll_strategies.reposition', descriptionFallback: 'Overlay repositions itself to stay anchored as the page scrolls.' },
    ],
    usedBy: [
        { name: 'useScroll' },
        { name: 'OrigamOverlay' },
        { name: 'OrigamMenu' },
        { name: 'OrigamTooltip' },
        { name: 'OrigamSnackbar' },
        { name: 'OrigamContextualMenu' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/scroll.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.scroll_strategies.example',
            titleFallback: 'Listing all valid scroll strategy keys',
            code: `import { SCROLL_STRATEGIES } from 'origam'

const validKeys = Object.keys(SCROLL_STRATEGIES)
// ['none', 'close', 'block', 'reposition']`,
            lang: 'typescript',
        },
    ],
}
