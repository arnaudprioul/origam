import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PAGINATION_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-pagination-emits',
    name: 'IPaginationEmits',
    category: 'Pagination',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamPagination>\` — current page v-model + the four
navigation shortcuts (first / prev / next / last).`,
    definition: `export interface IPaginationEmits extends ICommonsComponentEmits {
    (e: 'first', value: number): void;
    (e: 'prev', value: number): void;
    (e: 'next', value: number): void;
    (e: 'last', value: number): void;
}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Pagination/pagination.interface.ts',
    examples: [],
}
