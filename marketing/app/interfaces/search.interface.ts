import type { TSearchResultType } from '~/types/search-result.type'

export interface ISearchResult {
    id: string
    url: string
    title: string
    excerpt: string
    type: TSearchResultType
    category?: string
    score: number
}

export interface ISearchGroup {
    type: TSearchResultType
    label: string
    results: ISearchResult[]
}

export interface IPagefindResult {
    id: string
    url: string
    data: () => Promise<IPagefindData>
}

export interface IPagefindData {
    url: string
    excerpt: string
    meta: { title: string; [key: string]: string }
    filters?: { type?: string; category?: string }
    content: string
}
