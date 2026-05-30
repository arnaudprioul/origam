import type { IOrigamTheme } from '../Theme/origam-theme.interface'

/**
 * One entry of the module's `themes` option: a built-in preset **name**
 * (`'sobre'`), a single **theme object** (`IOrigamTheme`), or an **array** of
 * theme objects (e.g. the per-brand `sobreTheme` preset, or a Builder export
 * carrying both modes).
 */
export type TOrigamModuleThemeEntry = string | IOrigamTheme | IOrigamTheme[]

/**
 * Options passed by a consumer in `nuxt.config.ts` under the `origam` key.
 *
 * All fields are optional — the module applies sensible defaults (see
 * `DEFAULTS` in `src/nuxt/module.ts`). Themes are installed as runtime objects
 * (ADR-003): the module resolves the `themes` entries to `IOrigamTheme[]` and
 * hands them to `createOrigam` in the plugins, which inject each as a name×mode
 * scoped `--origam-*` block. The theme-invariant `primitive` + `utilities`
 * sheets are still loaded as CSS. Two orthogonal axes are resolved SSR-side to
 * avoid FOUC: the brand `theme` (cookie) and the color `mode` (cookie +
 * `Sec-CH-Prefers-Color-Scheme` hint).
 */
export interface IOrigamNuxtModuleOptions {
    /**
     * Themes to install. Each entry is a built-in preset name (`'sobre'`,
     * resolved to objects from `origam/themes`), a single `IOrigamTheme`
     * object, or an array of them. The module injects every resolved theme as
     * a scoped CSS-var block — no pre-generated per-theme CSS file is loaded.
     *
     * @default ['origam']
     */
    themes?: TOrigamModuleThemeEntry[]

    /**
     * Theme (brand) applied when no cookie is set. Use `'auto'` to render no
     * `data-theme` attribute (the default brand).
     *
     * @default 'auto'
     */
    defaultTheme?: string

    /**
     * Color modes supported by the loaded token sheets. Used to validate the
     * resolved mode before applying it.
     *
     * @default ['light', 'dark']
     */
    modes?: string[]

    /**
     * Color mode applied when no cookie is set and no usable
     * `Sec-CH-Prefers-Color-Scheme` hint is sent. Use `'auto'` to let the
     * server fall back to the client hint (or `'light'` if absent).
     *
     * @default 'auto'
     */
    defaultMode?: string

    /**
     * Cookie name used to persist the user's chosen theme (brand) across
     * sessions.
     *
     * @default 'origam-theme'
     */
    cookieName?: string

    /**
     * Cookie name used to persist the user's chosen color mode across
     * sessions.
     *
     * @default 'origam-mode'
     */
    modeCookieName?: string

    /**
     * Cookie `max-age` in seconds (shared by the theme and mode cookies).
     *
     * @default 31_536_000 (1 year)
     */
    cookieMaxAge?: number

    /**
     * Register components and composables as Nuxt auto-imports. Disable if
     * you want to opt-out and import everything explicitly (or namespace
     * the imports to avoid conflicts with another design system).
     *
     * @default true
     */
    autoImport?: boolean

    /**
     * Inject the generated utility classes stylesheet (`origam-utilities.css`).
     * Keep it on unless the consumer ships their own utility layer.
     *
     * @default true
     */
    includeUtilities?: boolean

    /**
     * Prefix applied to auto-imported components. Origam ships components
     * already prefixed `Origam*` so the default is an empty prefix — set
     * this to override if you need a custom namespace.
     *
     * @default 'Origam'
     */
    prefix?: string
}

/**
 * Shape of the public runtime config exposed by the module on
 * `useRuntimeConfig().public.origam`. The plugins read this at boot to install
 * the theme objects, resolve the active theme/mode, and configure the cookies.
 */
export interface IOrigamNuxtRuntimeConfig {
    /**
     * Distinct installed brand names, in install order. Lightweight — meant
     * for a switcher to list the available brands SSR-side.
     */
    themes: string[]
    /**
     * Preset brand names to re-resolve to objects (from `origam/themes`) in the
     * plugins. Kept separate from `customThemes` so the heavy preset `vars`
     * maps never bloat the per-page runtime-config payload — only the names
     * travel; the objects come from the bundled presets.
     */
    presetNames: string[]
    /**
     * Inline `IOrigamTheme` objects passed directly in the `themes` option
     * (e.g. a Builder export). These DO travel in the payload — the consumer
     * opted into that cost by passing objects instead of preset names.
     */
    customThemes: IOrigamTheme[]
    defaultTheme: string
    modes: string[]
    defaultMode: string
    cookieName: string
    modeCookieName: string
    cookieMaxAge: number
}
