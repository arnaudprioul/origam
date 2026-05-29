import type { TLocale } from '~/types/locale.type'

export interface II18nLocale {
    code: TLocale
    iso: string
    name: string
    file: string
    dir?: 'ltr' | 'rtl'
}
