import type { InjectionKey } from 'vue'

import type { TInstalledThemes } from '../../types'

export const ORIGAM_THEME_AUTO = 'auto'
export const ORIGAM_THEME_LIGHT = 'light'
export const ORIGAM_THEME_DARK = 'dark'

/**
 * App-level provide key carrying the list of brand themes installed via
 * `createOrigam({ themes })`. Read it through `useInstalledThemes()`.
 */
export const ORIGAM_THEMES_KEY: InjectionKey<TInstalledThemes> = Symbol.for('origam:themes')

export const ORIGAM_THEME_STORAGE_KEY = 'origam-theme'
export const ORIGAM_THEME_ATTR = 'data-theme'

export const ORIGAM_MODE_AUTO = 'auto'
export const ORIGAM_MODE_LIGHT = 'light'
export const ORIGAM_MODE_DARK = 'dark'

export const ORIGAM_MODE_STORAGE_KEY = 'origam-mode'
export const ORIGAM_MODE_ATTR = 'data-mode'

export const ORIGAM_NUXT_DEFAULT_COOKIE_NAME = 'origam-theme'
export const ORIGAM_NUXT_DEFAULT_MODE_COOKIE_NAME = 'origam-mode'
export const ORIGAM_NUXT_DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
export const ORIGAM_NUXT_DEFAULT_THEMES = ['light', 'dark'] as const
export const ORIGAM_NUXT_DEFAULT_MODES = ['light', 'dark'] as const
export const ORIGAM_NUXT_DEFAULT_THEME = 'auto'
export const ORIGAM_NUXT_DEFAULT_MODE = 'auto'
export const ORIGAM_NUXT_DEFAULT_PREFIX = 'Origam'
