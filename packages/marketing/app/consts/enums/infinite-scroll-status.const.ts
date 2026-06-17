import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const INFINITE_SCROLL_STATUS_ENUM_DOC: IEnumDoc = {
    slug: 'infinite-scroll-status',
    name: 'INFINITE_SCROLL_STATUS',
    category: 'Navigation',
    descriptionKey: 'enums.catalog.infinite_scroll_status.description',
    descriptionFallback: 'Current fetch status emitted by OrigamInfiniteScroll (ok, empty, loading, error).',
    definition: `export enum INFINITE_SCROLL_STATUS {
    OK      = 'ok',
    EMPTY   = 'empty',
    LOADING = 'loading',
    ERROR   = 'error',
}`,
    values: [
        { value: 'INFINITE_SCROLL_STATUS.OK', descriptionKey: 'enums.detail.infinite_scroll_status.ok', descriptionFallback: 'Data was loaded successfully; more items may be available.' },
        { value: 'INFINITE_SCROLL_STATUS.EMPTY', descriptionKey: 'enums.detail.infinite_scroll_status.empty', descriptionFallback: 'No more items to load.' },
        { value: 'INFINITE_SCROLL_STATUS.LOADING', descriptionKey: 'enums.detail.infinite_scroll_status.loading', descriptionFallback: 'A fetch is currently in progress.' },
        { value: 'INFINITE_SCROLL_STATUS.ERROR', descriptionKey: 'enums.detail.infinite_scroll_status.error', descriptionFallback: 'The last fetch failed.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'status' },
    ],
    sourceFile: 'packages/ds/src/enums/InfiniteScroll/infinite-scroll.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.infinite_scroll_status.example',
            titleFallback: 'Using INFINITE_SCROLL_STATUS in script setup',
            code: `import { INFINITE_SCROLL_STATUS } from 'origam'

function onLoad(done: (status: INFINITE_SCROLL_STATUS) => void) {
    // after fetch
    done(INFINITE_SCROLL_STATUS.OK)
}`,
            lang: 'typescript',
        },
    ],
}
