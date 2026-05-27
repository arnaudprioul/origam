import { ref } from 'vue'
import { useDebounce } from '~/composables/useDebounce'
import {
    SEARCH_MIN_QUERY_LENGTH,
    SEARCH_MAX_RESULTS_PER_GROUP,
    SEARCH_PAGEFIND_PATH,
    SEARCH_RESULT_TYPE_LABELS
} from '~/consts/search.const'
import type { ISearchGroup, ISearchResult, IPagefindResult, IPagefindData } from '~/interfaces/search.interface'
import type { TSearchResultType } from '~/types/search-result.type'

interface IPagefindInstance {
    search: (query: string) => Promise<{ results: IPagefindResult[] }>
    destroy?: () => void
}

const FALLBACK_TYPE: TSearchResultType = 'page'

export function usePagefindSearch () {
    const query = ref('')
    const results = ref<ISearchGroup[]>([])
    const pending = ref(false)
    const hasError = ref(false)
    const isReady = ref(false)

    const debouncedQuery = useDebounce(query, 200)

    let pagefind: IPagefindInstance | null = null

    async function init (): Promise<void> {
        if (!import.meta.client) return
        if (isReady.value || hasError.value) return

        try {
            const mod = await import(/* @vite-ignore */ SEARCH_PAGEFIND_PATH)
            pagefind = (mod.default ?? mod) as IPagefindInstance
            isReady.value = true
        } catch {
            hasError.value = true
            if (process.env.NODE_ENV === 'development') {
                console.warn(
                    '[origam search] Search index not available in dev mode — run `npm run build && npm run preview` to test.'
                )
            }
        }
    }

    async function search (q: string): Promise<ISearchGroup[]> {
        if (!pagefind || q.length < SEARCH_MIN_QUERY_LENGTH) {
            results.value = []
            return []
        }

        pending.value = true

        try {
            const raw = await pagefind.search(q)
            const settled = await Promise.all(
                raw.results.map(async (r: IPagefindResult) => {
                    const data: IPagefindData = await r.data()
                    const rawType = data.filters?.type
                    const type: TSearchResultType = (rawType as TSearchResultType) ?? FALLBACK_TYPE

                    const result: ISearchResult = {
                        id: r.id,
                        url: data.url,
                        title: data.meta?.title ?? data.url,
                        excerpt: data.excerpt,
                        type,
                        category: data.filters?.category,
                        score: 1
                    }
                    return result
                })
            )

            const grouped = new Map<TSearchResultType, ISearchResult[]>()
            for (const item of settled) {
                const bucket = grouped.get(item.type) ?? []
                if (bucket.length < SEARCH_MAX_RESULTS_PER_GROUP) {
                    bucket.push(item)
                    grouped.set(item.type, bucket)
                }
            }

            const groups: ISearchGroup[] = Array.from(grouped.entries()).map(([type, items]) => ({
                type,
                label: SEARCH_RESULT_TYPE_LABELS[type],
                results: items
            }))

            results.value = groups
            return groups
        } finally {
            pending.value = false
        }
    }

    function destroy (): void {
        pagefind?.destroy?.()
        pagefind = null
        isReady.value = false
        results.value = []
        query.value = ''
    }

    watch(debouncedQuery, (q) => {
        search(q)
    })

    return {
        query,
        results,
        pending,
        hasError,
        isReady,
        init,
        search,
        destroy
    }
}
