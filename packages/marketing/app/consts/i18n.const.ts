import type { TLocale } from '~/types/locale.type'

export interface II18nLocale {
    code: TLocale
    iso: string
    name: string
    file: string
    dir?: 'ltr' | 'rtl'
}

export const I18N_LOCALES: II18nLocale[] = [
    { code: 'en', iso: 'en-US', name: 'English',  file: 'en.json', dir: 'ltr' },
    { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json', dir: 'ltr' }
]

export const I18N_COOKIE_KEY = 'origam_locale'
export const I18N_DEFAULT_LOCALE: TLocale = 'en'
