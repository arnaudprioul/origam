import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const INFINITE_SCROLL_SIDE_ENUM_DOC: IEnumDoc = {
    slug: 'infinite-scroll-side',
    name: 'INFINITE_SCROLL_SIDE',
    category: 'Navigation',
    descriptionKey: 'enums.catalog.infinite_scroll_side.description',
    descriptionFallback: 'Which side(s) of the scroll container can trigger loading (start, end, both).',
    definition: `export enum INFINITE_SCROLL_SIDE {
    START = 'start',
    END   = 'end',
    BOTH  = 'both',
}`,
    values: [
        { value: 'INFINITE_SCROLL_SIDE.START', descriptionKey: 'enums.detail.infinite_scroll_side.start', descriptionFallback: 'Trigger at the beginning of the scroll list.' },
        { value: 'INFINITE_SCROLL_SIDE.END', descriptionKey: 'enums.detail.infinite_scroll_side.end', descriptionFallback: 'Trigger at the end of the scroll list.' },
        { value: 'INFINITE_SCROLL_SIDE.BOTH', descriptionKey: 'enums.detail.infinite_scroll_side.both', descriptionFallback: 'Trigger at both the start and end of the scroll list.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'side' },
    ],
    sourceFile: 'packages/ds/src/enums/InfiniteScroll/infinite-scroll.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.infinite_scroll_side.example',
            titleFallback: 'Using INFINITE_SCROLL_SIDE in template',
            code: `import { INFINITE_SCROLL_SIDE } from 'origam'

const side = INFINITE_SCROLL_SIDE.BOTH`,
            lang: 'typescript',
        },
    ],
}
