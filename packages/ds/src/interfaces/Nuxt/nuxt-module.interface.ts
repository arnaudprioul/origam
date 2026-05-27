/**
 * Options passed by a consumer in `nuxt.config.ts` under the `origam` key.
 *
 * All fields are optional — the module applies sensible defaults (see
 * `DEFAULTS` in `src/nuxt/module.ts`). Themes are auto-injected as CSS
 * imports; the active theme is resolved SSR-side via cookie and the
 * `Sec-CH-Prefers-Color-Scheme` client hint to avoid FOUC and hydration
 * mismatches.
 */
export interface IOrigamNuxtModuleOptions {
    /**
     * Theme names whose CSS file must be loaded. Each name must match a
     * generated `dist/src/assets/css/tokens/{theme}.css` exposed via
     * `origam/tokens/css/{theme}`.
     *
     * @default ['light', 'dark']
     */
    themes?: string[]

    /**
     * Theme applied when no cookie is set and no usable
     * `Sec-CH-Prefers-Color-Scheme` hint is sent. Use `'auto'` to let the
     * server fall back to the client hint (or `'light'` if absent).
     *
     * @default 'auto'
     */
    defaultTheme?: string

    /**
     * Cookie name used to persist the user's chosen theme across sessions.
     *
     * @default 'origam-theme'
     */
    cookieName?: string

    /**
     * Cookie `max-age` in seconds.
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
 * resolve the active theme and configure the cookie.
 */
export interface IOrigamNuxtRuntimeConfig {
    themes: string[]
    defaultTheme: string
    cookieName: string
    cookieMaxAge: number
}
