import type { TComponentCategory } from '~/types/component-category.type'

export interface IPropDoc {
    name: string
    type: string
    required: boolean
    default?: string
    description?: string
}

export interface IEmitDoc {
    name: string
    payload: string
    description?: string
}

export interface ISlotDoc {
    name: string
    scope?: string
    description?: string
}

export interface IComponentDoc {
    name: string
    slug: string
    category: TComponentCategory
    description: string
    interfacePath: string
    componentPath: string
    props: IPropDoc[]
    emits: IEmitDoc[]
    slots: ISlotDoc[]
}
