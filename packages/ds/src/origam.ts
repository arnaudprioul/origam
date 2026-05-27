import * as origamComponents from './components'

import { createDate, createDisplay, createGoTo, createIcons, createLocale } from './composables'

import {
    IN_BROWSER,
    ORIGAM_DATE_ADAPTER_KEY,
    ORIGAM_DATE_OPTIONS_KEY,
    ORIGAM_DISPLAY_KEY,
    ORIGAM_GO_TO_KEY,
    ORIGAM_ICONS_KEY,
    ORIGAM_LOCALE_KEY
} from './consts'

import * as origamDirectives from './directives'

import type { IOrigamOptions } from './interfaces'
import type { TIconOptions } from './types'
import { getUid, mergeDeep } from './utils'

import '@mdi/font/css/materialdesignicons.css'

import { App, ComponentPublicInstance, defineComponent, effectScope, InjectionKey, nextTick, reactive } from 'vue'

export function createOrigam (origam: IOrigamOptions = {}) {
    const {blueprint, ...rest} = origam
    const options: IOrigamOptions = mergeDeep(blueprint, rest)
    const {
        aliases = {},
        components = origamComponents,
        directives = origamDirectives
    } = options

    const scope = effectScope()
    return scope.run(() => {
        const icons = createIcons(options.icons)
        const display = createDisplay(options.display, options.ssr)
        const locale = createLocale(options.locale)
        const date = createDate(options.date, locale)
        const goTo = createGoTo(options.goTo, locale)

        const install = (app: App) => {
            for (const key in directives) {
                app.directive(key, directives[key as keyof typeof directives])
            }

            for (const key in components) {
                app.component(key, components[key as keyof typeof components])
            }

            for (const key in aliases) {
                app.component(key, defineComponent({
                    ...aliases[key],
                    name: key,
                    aliasName: aliases[key].name
                }))
            }


            const appScope = effectScope()
            app.onUnmount(() => appScope.stop())

            app.provide(ORIGAM_ICONS_KEY, icons as Required<TIconOptions>)
            app.provide(ORIGAM_DISPLAY_KEY, display)
            app.provide(ORIGAM_LOCALE_KEY, locale)
            app.provide(ORIGAM_DATE_OPTIONS_KEY, date.options)
            app.provide(ORIGAM_DATE_ADAPTER_KEY, date.instance)
            app.provide(ORIGAM_GO_TO_KEY, goTo)

            if (IN_BROWSER && options.ssr) {
                if (app.$nuxt) {
                    app.$nuxt.hook('app:suspense:resolve', () => {
                        display.update()
                    })
                } else {
                    const {mount} = app
                    app.mount = (...args) => {
                        const vm = mount(...args)
                        nextTick(() => display.update())
                        app.mount = mount
                        return vm
                    }
                }
            }

            getUid.reset()

            if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
                app.mixin({
                    computed: {
                        $origam () {
                            return reactive({
                                display: inject.call(this as unknown as ComponentPublicInstance, ORIGAM_DISPLAY_KEY),
                                icons: inject.call(this as unknown as ComponentPublicInstance, ORIGAM_ICONS_KEY),
                                locale: inject.call(this as unknown as ComponentPublicInstance, ORIGAM_LOCALE_KEY),
                                date: inject.call(this as unknown as ComponentPublicInstance, ORIGAM_DATE_ADAPTER_KEY)
                            })
                        }
                    }
                })
            }
        }

        function unmount () {
            scope.stop()
        }

        return {
            install,
            unmount,
            display,
            icons,
            locale,
            date,
            goTo
        }
    })!
}

// Vue's inject() can only be used in setup
function inject (this: ComponentPublicInstance, key: InjectionKey<any> | string) {
    const vm = this.$

    const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides

    if (provides && (key as any) in provides) {
        return provides[(key as string)]
    }
}
