import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SCROLL_STRATEGIES_ENUM_DOC: IEnumDoc = {
    slug: 'scroll-strategies',
    name: 'SCROLL_STRATEGIES',
    category: 'Behavior',
    descriptionKey: 'enums.catalog.scroll_strategies.description',
    descriptionFallback: 'TypeScript enum for overlay scroll strategy — none, close, block, or reposition.',
    definition: `export enum SCROLL_STRATEGIES {
    NONE       = 'none',
    CLOSE      = 'close',
    BLOCK      = 'block',
    REPOSITION = 'reposition'
}`,
    values: [
        { value: 'SCROLL_STRATEGIES.NONE', descriptionKey: 'enums.detail.scroll_strategies.none', descriptionFallback: 'No scroll strategy — overlay stays visible and scroll is unrestricted.' },
        { value: 'SCROLL_STRATEGIES.CLOSE', descriptionKey: 'enums.detail.scroll_strategies.close', descriptionFallback: 'Overlay closes automatically when the user scrolls.' },
        { value: 'SCROLL_STRATEGIES.BLOCK', descriptionKey: 'enums.detail.scroll_strategies.block', descriptionFallback: 'Body scroll is blocked while the overlay is open.' },
        { value: 'SCROLL_STRATEGIES.REPOSITION', descriptionKey: 'enums.detail.scroll_strategies.reposition', descriptionFallback: 'Overlay repositions itself as the user scrolls to stay anchored to its target element.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', propName: 'scrollStrategy' },
        { slug: 'dialog', name: 'Dialog', propName: 'scrollStrategy' },
        { slug: 'tooltip', name: 'Tooltip', propName: 'scrollStrategy' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/scroll.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.scroll_strategies.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SCROLL_STRATEGIES } from 'origam'

const strategy: SCROLL_STRATEGIES = SCROLL_STRATEGIES.CLOSE`,
            lang: 'typescript',
        },
    ],
}
