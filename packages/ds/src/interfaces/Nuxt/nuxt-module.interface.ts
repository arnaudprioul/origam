/**
 * Options passed by a consumer in `nuxt.config.ts` under the `origam` key.
 *
 * All fields are optional — the module applies sensible defaults (see
 * `DEFAULTS` in `src/nuxt/module.ts`). Themes are auto-injected as CSS
 * imports. Two orthogonal axes are resolved SSR-side to avoid FOUC and
 * hydration mismatches: the brand `theme` (via the theme cookie) and the
 * color `mode` (via the mode cookie + `Sec-CH-Prefers-Color-Scheme` hint).
 */
export interface IOrigamNuxtModuleOptions {
    /**
     * Theme (brand) names whose CSS file must be loaded. Each name must match
     * a generated `dist/src/assets/css/tokens/{theme}.css` exposed via
     * `origam/tokens/css/{theme}`.
     *
     * @default ['light', 'dark']
     */
    themes?: string[]

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
 * `useRuntimeConfig().public.origam`. The plugins read this at boot to
 * resolve the active theme/mode and configure the cookies.
 */
export interface IOrigamNuxtRuntimeConfig {
    themes: string[]
    defaultTheme: string
    modes: string[]
    defaultMode: string
    cookieName: string
    modeCookieName: string
    cookieMaxAge: number
}
