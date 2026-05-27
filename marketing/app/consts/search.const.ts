import type { TSearchResultType } from '~/types/search-result.type'

export const SEARCH_HOTKEY_MAC = 'cmd+k'
export const SEARCH_HOTKEY_PC = 'ctrl+k'
export const SEARCH_MIN_QUERY_LENGTH = 2
export const SEARCH_MAX_RESULTS_PER_GROUP = 5
export const SEARCH_PAGEFIND_PATH = '/pagefind/pagefind.js'

export const SEARCH_RESULT_TYPE_LABELS: Record<TSearchResultType, string> = {
    component: 'Components',
    blog: 'Blog posts',
    doc: 'Docs',
    page: 'Pages',
    story: 'Stories'
}

export const SEARCH_RESULT_TYPE_ICONS: Record<TSearchResultType, string> = {
    component: 'mdi:puzzle-outline',
    blog: 'mdi:post-outline',
    doc: 'mdi:book-open-outline',
    page: 'mdi:file-outline',
    story: 'mdi:palette-outline'
}
