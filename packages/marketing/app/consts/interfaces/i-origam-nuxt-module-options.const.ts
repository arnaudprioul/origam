import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ORIGAM_NUXT_MODULE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-origam-nuxt-module-options',
    name: 'IOrigamNuxtModuleOptions',
    category: 'Nuxt',
    descriptionKey: '',
    descriptionFallback: `Options passed by a consumer in \`nuxt.config.ts\` under the \`origam\` key.

All fields are optional — the module applies sensible defaults (see
\`DEFAULTS\` in \`src/nuxt/module.ts\`). Themes are installed as runtime OBJECTS
(ADR-004): the module passes the \`themes\` array straight through to the
runtime config and on to \`createOrigam\` in the plugins, which inject each as
a name×mode scoped \`--origam-*\` block. The theme-invariant \`primitive\` +
\`utilities\` sheets are still loaded as CSS. Two orthogonal axes are resolved
SSR-side to avoid FOUC: the brand \`theme\` (cookie) and the color \`mode\`
(cookie + \`Sec-CH-Prefers-Color-Scheme\` hint).

ADR-004 (Implemented): the DS ships exactly ONE neutral identity (the origam
baseline). Brand themes live in the consuming app (e.g. the marketing
package) and are passed here as \`IOrigamTheme[]\` objects authored in
semantic JSON — the DS no longer resolves preset names or ships brand
token sheets.`,
    definition: `export interface IOrigamNuxtModuleOptions {
    themes?: IOrigamTheme[];
    defaultTheme?: string;
    modes?: string[];
    defaultMode?: string;
    cookieName?: string;
    modeCookieName?: string;
    cookieMaxAge?: number;
    autoImport?: boolean;
    includeUtilities?: boolean;
    prefix?: string;
}`,
    extends: [],
    props: [
        { name: 'themes', type: 'IOrigamTheme[]', optional: true, descriptionFallback: `Themes to install, as \`IOrigamTheme\` objects (one per brand×mode). The
objects are passed verbatim to \`createOrigam\`, which injects each as a
scoped CSS-var block — no pre-generated per-theme CSS file is loaded.
When omitted, \`createOrigam\` installs the DS built-in baseline (neutral identity).` },
        { name: 'defaultTheme', type: 'string', optional: true, descriptionFallback: `Theme (brand) applied when no cookie is set. Use \`'auto'\` to render no
\`data-theme\` attribute (the default brand).` },
        { name: 'modes', type: 'string[]', optional: true, descriptionFallback: `Color modes supported by the loaded token sheets. Used to validate the
resolved mode before applying it.` },
        { name: 'defaultMode', type: 'string', optional: true, descriptionFallback: `Color mode applied when no cookie is set and no usable
\`Sec-CH-Prefers-Color-Scheme\` hint is sent. Use \`'auto'\` to let the
server fall back to the client hint (or \`'light'\` if absent).` },
        { name: 'cookieName', type: 'string', optional: true, descriptionFallback: `Cookie name used to persist the user's chosen theme (brand) across
sessions.` },
        { name: 'modeCookieName', type: 'string', optional: true, descriptionFallback: `Cookie name used to persist the user's chosen color mode across
sessions.` },
        { name: 'cookieMaxAge', type: 'number', optional: true, descriptionFallback: 'Cookie `max-age` in seconds (shared by the theme and mode cookies).' },
        { name: 'autoImport', type: 'boolean', optional: true, descriptionFallback: `Register components and composables as Nuxt auto-imports. Disable if
you want to opt-out and import everything explicitly (or namespace
the imports to avoid conflicts with another design system).` },
        { name: 'includeUtilities', type: 'boolean', optional: true, descriptionFallback: `Inject the generated utility classes stylesheet (\`origam-utilities.css\`).
Keep it on unless the consumer ships their own utility layer.` },
        { name: 'prefix', type: 'string', optional: true, descriptionFallback: `Prefix applied to auto-imported components. Origam ships components
already prefixed \`Origam*\` so the default is an empty prefix — set
this to override if you need a custom namespace.` },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Nuxt/nuxt-module.interface.ts',
    examples: [],
}
