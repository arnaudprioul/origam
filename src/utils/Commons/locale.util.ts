import { ComputedRef, Ref, watch } from "vue"

import { useI18n } from "vue-i18n"
import { useVModel } from "../../composables"

import type { ILocaleI18n, ILocaleInstance, ILocaleMessages, ILocaleProps } from "../../interfaces"

// vue-i18n's translate-args parser is strict — it throws
// `SyntaxError: Invalid arguments` when:
//   • the key is not a string, OR
//   • a value in the list is `undefined`/null, OR
//   • the list itself is the wrong shape for the resolved overload.
// The simplest path that works across all overloads:
//   • drop the second arg entirely when there are no extra params
//   • coerce nullish values inside the list to empty string
// so a half-bound template renders as `Rating 3 of ` instead of
// taking down the whole tree.
function callI18nT (
    fn: (key: string, list?: unknown[]) => string,
    key: string,
    params: unknown[]
): string {
    if (typeof key !== 'string' || !key) return key as unknown as string
    if (!params.length) return fn(key)
    const list = params.map(p => p == null ? '' : p)
    return fn(key, list)
}

export function createVueI18nAdapter ({i18n, useI18n}: ILocaleI18n): ILocaleInstance {
    const current = i18n.global.locale
    const fallback = i18n.global.fallbackLocale as Ref<string>
    const messages = i18n.global.messages as ComputedRef<ILocaleMessages>

    return {
        name: 'vue-i18n',
        current,
        fallback,
        messages,
        t: (key: string, ...params: unknown[]) => callI18nT(i18n.global.t.bind(i18n.global) as any, key, params),
        n: i18n.global.n,
        provide: createProvideFunction({current, fallback, messages, useI18n})
    }
}

export function createProvideFunction (data: {
    current: Ref<string>
    fallback: Ref<string>
    messages: ComputedRef<ILocaleMessages>
    useI18n: typeof useI18n
}) {
    return (props: ILocaleProps): ILocaleInstance => {
        const current = useProvided(props, 'locale', data.current)
        const fallback = useProvided(props, 'fallback', data.fallback)
        const messages = useProvided(props, 'messages', data.messages) as ComputedRef<ILocaleMessages>

        const i18n = data.useI18n({
            locale: current.value,
            fallbackLocale: fallback.value,
            messages: messages.value as unknown as Record<string, any>,
            useScope: 'local',
            legacy: false,
            inheritLocale: false
        })

        watch(current, v => {
            i18n.locale.value = v
        })

        return {
            name: 'vue-i18n',
            current,
            fallback,
            messages,
            t: (key: string, ...params: unknown[]) => callI18nT(i18n.t.bind(i18n) as any, key, params),
            n: i18n.n,
            provide: createProvideFunction({current, fallback, messages, useI18n: data.useI18n})
        }
    }
}

export function useProvided<T> (props: any, prop: string, provided: Ref<T>): Ref<T> {
    const internal = useVModel(props, prop)

    internal.value = props[prop] ?? provided.value

    watch(provided, v => {
        if (props[prop] == null) {
            internal.value = v
        }
    })

    return internal
}
