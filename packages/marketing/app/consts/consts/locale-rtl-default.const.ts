import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LOCALE_RTL_DEFAULT_CONST_DOC: IConstDoc = {
    slug: 'locale-rtl-default',
    name: 'LOCALE_RTL_DEFAULT',
    category: 'Internals',
    descriptionKey: 'consts.catalog.locale_rtl_default.description',
    descriptionFallback: 'Frozen map of every supported locale code to its RTL flag. Used by the locale system to set the text-direction automatically when a locale is activated. RTL locales: ar, fa, he.',
    definition: `export const LOCALE_RTL_DEFAULT = Object.freeze({
    af: false, ar: true, bg: false, ca: false, ckb: false,
    cs: false, de: false, el: false, en: false, es: false,
    et: false, fa: true,  fi: false, fr: false, hr: false,
    hu: false, he: true,  id: false, it: false, ja: false,
    km: false, ko: false, lv: false, lt: false, nl: false,
    no: false, pl: false, pt: false, ro: false, ru: false,
    sk: false, sl: false, srCyrl: false, srLatn: false,
    sv: false, th: false, tr: false, az: false, uk: false,
    vi: false, zhHans: false, zhHant: false
    // … truncated — 42 entries total
})`,
    values: [
        { value: 'ar: true', descriptionKey: 'consts.detail.locale_rtl_default.ar', descriptionFallback: 'Arabic — RTL.' },
        { value: 'fa: true', descriptionKey: 'consts.detail.locale_rtl_default.fa', descriptionFallback: 'Persian (Farsi) — RTL.' },
        { value: 'he: true', descriptionKey: 'consts.detail.locale_rtl_default.he', descriptionFallback: 'Hebrew — RTL.' },
    ],
    usedBy: [
        { name: 'useLocale' },
        { name: 'useRtl' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/locale.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.locale_rtl_default.example',
            titleFallback: 'Checking if a locale is RTL',
            code: `import { LOCALE_RTL_DEFAULT } from 'origam'

const isRtl = (locale: string) =>
  LOCALE_RTL_DEFAULT[locale as keyof typeof LOCALE_RTL_DEFAULT] ?? false

isRtl('ar') // → true
isRtl('en') // → false`,
            lang: 'typescript',
        },
    ],
}
