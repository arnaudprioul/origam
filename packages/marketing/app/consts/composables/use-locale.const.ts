import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LOCALE_DOC: IComposableDoc = {
    slug: 'use-locale',
    name: 'useLocale',
    domain: 'Commons',
    icon: 'mdi-translate',
    descriptionKey: '',
    descriptionFallback: 'Injects the Origam locale instance created by createLocale() (or the vue-i18n adapter wired in createOrigam()). Provides the current locale ref, the RTL flag, and the translation function used by all internal DS components. Throws if called outside a createOrigam context.',
    signature: `function useLocale(): ILocaleInstance & IRtlInstance`,
    params: [],
    returns: [
        {
            name: 'current',
            type: 'Ref<string>',
            descriptionKey: '',
            descriptionFallback: 'Reactive BCP-47 locale tag (e.g. "en", "fr", "ar"). Changing this ref switches the active DS locale.',
        },
        {
            name: 'fallback',
            type: 'Ref<string>',
            descriptionKey: '',
            descriptionFallback: 'Fallback locale used when a message key is not found in current.',
        },
        {
            name: 't',
            type: '(key: string) => string',
            descriptionKey: '',
            descriptionFallback: 'Translation function for DS-internal message keys (e.g. "close", "pagination.next"). Uses the current locale.',
        },
        {
            name: 'isRtl',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the active locale is configured as RTL in the rtl map passed to createOrigam().',
        },
        {
            name: 'rtl',
            type: 'Ref<Record<string, boolean>>',
            descriptionKey: '',
            descriptionFallback: 'Map of locale → RTL boolean. Editable at runtime to toggle directionality per locale.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Read the active locale in a component',
            code: `<script setup lang="ts">
import { useLocale } from 'origam'

const { current, isRtl, t } = useLocale()
// current.value → 'en'
// isRtl.value   → false
// t('close')    → 'Close'
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Switch locale at runtime',
            code: `<script setup lang="ts">
import { useLocale } from 'origam'

const { current } = useLocale()

function setFrench () {
  current.value = 'fr'
}
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Override locale for a component subtree (provideLocale)',
            code: `<script setup lang="ts">
import { provideLocale } from 'origam'

// Scoped override — descendants read 'ar' and isRtl = true
provideLocale({ locale: 'ar', rtl: { ar: true } })
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-theme', 'use-installed-themes'],
    consumedInterfaces: ['ILocaleInstance', 'ILocaleOptions', 'IRtlInstance'],
    noteFallback: 'useLocale exposes the DS-internal translation keys only. For application-level i18n (your own strings), keep using @nuxtjs/i18n or vue-i18n directly. The DS adapter wires into your existing i18n instance when configured via createOrigam({ locale: { adapter } }).',
}
