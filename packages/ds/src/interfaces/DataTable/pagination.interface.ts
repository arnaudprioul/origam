import type { ComputedRef, Ref } from 'vue'

export interface IDataTablePaginationProps {
    page?: number | string
    itemsPerPage?: number | string
}

export interface IDataTableProvidePagination {
    page: Ref<number>
    itemsPerPage: Ref<number>
    startIndex: ComputedRef<number>
    stopIndex: ComputedRef<number>
    pageCount: ComputedRef<number>
    itemsLength: Ref<number>
    nextPage: () => void
    prevPage: () => void
    setPage: (value: number) => void
    setItemsPerPage: (value: number) => void
}
