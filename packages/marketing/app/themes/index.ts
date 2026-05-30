import type { IOrigamTheme } from 'origam/interfaces'

import { appleDarkTheme, appleLightTheme } from './apple.theme'
import { cartoonDarkTheme, cartoonLightTheme } from './cartoon.theme'
import { ecomDarkTheme, ecomLightTheme } from './ecom.theme'
import { editorialDarkTheme, editorialLightTheme } from './editorial.theme'
import { geekDarkTheme, geekLightTheme } from './geek.theme'
import { glassDarkTheme, glassLightTheme } from './glass.theme'
import { materialDarkTheme, materialLightTheme } from './material.theme'
import { sobreDarkTheme, sobreLightTheme } from './sobre.theme'

export {
    appleDarkTheme,
    appleLightTheme,
    cartoonDarkTheme,
    cartoonLightTheme,
    ecomDarkTheme,
    ecomLightTheme,
    editorialDarkTheme,
    editorialLightTheme,
    geekDarkTheme,
    geekLightTheme,
    glassDarkTheme,
    glassLightTheme,
    materialDarkTheme,
    materialLightTheme,
    sobreDarkTheme,
    sobreLightTheme
}

export const SOBRE_THEMES: IOrigamTheme[] = [sobreLightTheme, sobreDarkTheme]

export const BRAND_THEMES: IOrigamTheme[] = [
    glassLightTheme,
    glassDarkTheme,
    geekLightTheme,
    geekDarkTheme,
    cartoonLightTheme,
    cartoonDarkTheme,
    editorialLightTheme,
    editorialDarkTheme,
    materialLightTheme,
    materialDarkTheme,
    ecomLightTheme,
    ecomDarkTheme,
    appleLightTheme,
    appleDarkTheme
]

export const MARKETING_THEMES_INSTALLED: IOrigamTheme[] = [
    ...SOBRE_THEMES,
    ...BRAND_THEMES
]
