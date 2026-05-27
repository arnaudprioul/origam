import type { TComponentCategory } from '~/types/component-category.type'

export interface IComponentMeta {
    readonly name: string
    readonly slug: string
    readonly category: TComponentCategory
    readonly description: string
}

export interface ICategoryEntry {
    readonly key: TComponentCategory
    readonly label: string
}
