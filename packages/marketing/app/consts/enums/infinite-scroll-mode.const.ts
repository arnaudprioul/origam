import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const INFINITE_SCROLL_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'infinite-scroll-mode',
    name: 'INFINITE_SCROLL_MODE',
    category: 'Navigation',
    descriptionKey: 'enums.catalog.infinite_scroll_mode.description',
    descriptionFallback: 'Trigger mode for OrigamInfiniteScroll: intersection-observer or manual button.',
    definition: `export enum INFINITE_SCROLL_MODE {
    INTERSECT = 'intersect',
    MANUAL    = 'manual',
}`,
    values: [
        { value: 'INFINITE_SCROLL_MODE.INTERSECT', descriptionKey: 'enums.detail.infinite_scroll_mode.intersect', descriptionFallback: 'Load more items automatically when the sentinel enters the viewport.' },
        { value: 'INFINITE_SCROLL_MODE.MANUAL', descriptionKey: 'enums.detail.infinite_scroll_mode.manual', descriptionFallback: 'Load more items only when the user clicks the load-more button.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/InfiniteScroll/infinite-scroll.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.infinite_scroll_mode.example',
            titleFallback: 'Using INFINITE_SCROLL_MODE in template',
            code: `import { INFINITE_SCROLL_MODE } from 'origam'

// Manual trigger
const mode = INFINITE_SCROLL_MODE.MANUAL`,
            lang: 'typescript',
        },
    ],
}
