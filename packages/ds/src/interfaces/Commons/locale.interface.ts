import type { ComputedRef, Ref } from "vue"
import type { I18n, useI18n } from "vue-i18n"

export interface ILocaleMessages {
    [key: string]: ILocaleMessages | string
}

export interface ILocaleInstance {
    name: string
    messages: ComputedRef<ILocaleMessages>
    current: Ref<string>
    fallback: Ref<string>
    t: (key: string, ...params: unknown[]) => string
    n: (value: number) => string
    provide: (props: ILocaleProps) => ILocaleInstance
}

export interface ILocaleOptions {
    locale?: string
    fallbackLocale: string
    messages: Record<string, unknown>
}

export interface ILocaleI18n {
    i18n: I18n<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, string, false>
    useI18n: typeof useI18n
}

export interface ILocaleProps {
    messages?: ILocaleMessages
    locale?: string
    fallback?: string
    adapter?: ILocaleInstance
}

export interface IRtlOptions {
    rtl?: Record<string, boolean>
}

export interface IRtlInstance {
    isRtl: Ref<boolean>
    rtl: Ref<Record<string, boolean>>
}

export interface IRtlProps {
    rtl?: boolean
}
