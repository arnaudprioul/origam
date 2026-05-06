import type { ExtractPropTypes, StyleValue } from 'vue'
import type * as Components from "../../components"
import type * as Directives from "../../directives"
import type { IDateOptions, IDisplayOptions, IGoToOptions, ILocaleOptions, IRtlOptions } from '../../interfaces'

import { TIconOptions, TOrigamPluginOptionsImport, TSSROptions } from '../../types'

export interface IOrigamOptions {
    aliases?: any
    blueprint?: IBlueprint
    components?: any
    directives?: any
    icons?: TIconOptions
    display?: IDisplayOptions
    ssr?: TSSROptions
    goTo?: IGoToOptions
    date?: IDateOptions
    locale?: ILocaleOptions & IRtlOptions
}

export interface IOrigamPluginOptions {
    autoImport?: TOrigamPluginOptionsImport
}

export interface IOrigamPluginOptionsObject {
    ignore?: (keyof typeof Components | keyof typeof Directives)[]
}

export interface IBlueprint extends Omit<IOrigamOptions, 'blueprint'> {
}

export interface ICommonsComponentProps {
    id?: string,
    class?: string | Array<string> | object,
    style?: string | Array<string> | object | StyleValue
}

/** Default v-model emit shape shared by every input-style component. */
export interface ICommonsComponentEmits {
    (e: 'update:modelValue', event: any): void
}

/** Default slot signature shared by container components. */
export interface ICommonsComponentSlots {
    default?: () => any
}

export interface ITagProps {
    tag?: string
}

export interface ISample {
    t: number
    d: number
}

export interface IIntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | Array<number>;
}

export interface IFilterPropsOptions<PropsOptions extends {
    [key: string]: any
}, Props = ExtractPropTypes<PropsOptions>> {
    props: PropsOptions

    filterProps<
        T extends Partial<Props>,
        U extends Extract<keyof T, string>
    > (properties: T, excludes?: string[]): Partial<Pick<T, U>>
}

export interface IConfigurableDocument {
    document?: Document
}
