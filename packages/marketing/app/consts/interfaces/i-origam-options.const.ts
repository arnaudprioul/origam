import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ORIGAM_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-origam-options',
    name: 'IOrigamOptions',
    category: 'Plugin & Configuration',
    descriptionKey: 'interfaces.catalog.i_origam_options.description',
    descriptionFallback: 'Root configuration bag passed to `createOrigam()`. Covers component aliases, icon adapter, display breakpoints, SSR, navigation, date adapter, locale/RTL, a11y contrast guard and runtime theme injection.',
    definition: `export interface IOrigamOptions {
    aliases?: any
    blueprint?: IBlueprint
    components?: any
    directives?: any
    icons?: TIconOptions
    display?: IDisplayOptions
    ssr?: TSSROptions
    goTo?: IGoToOptions
    date?: IDateOptions
    locale?: ILocaleOptions & IRtlOptions
    contrast?: boolean | IContrastOptions
    theme?: IOrigamTheme
    themes?: IOrigamTheme[]
}`,
    extends: [],
    props: [
        { name: 'aliases', type: 'any', optional: true, descriptionFallback: 'Map of component name aliases. Allows registering a component under a different name globally.' },
        { name: 'blueprint', type: 'IBlueprint', optional: true, descriptionFallback: 'Preset of options that acts as a base layer — useful to ship a brand configuration that consumers can then override.' },
        { name: 'components', type: 'any', optional: true, descriptionFallback: 'Component overrides or additional components to register globally at plugin install time.' },
        { name: 'directives', type: 'any', optional: true, descriptionFallback: 'Custom directives to register globally alongside the built-in Origam directives.' },
        { name: 'icons', type: 'TIconOptions', optional: true, descriptionFallback: 'Icon adapter configuration — selects the icon set (MDI, FA, custom SVG) and registers aliases.' },
        { name: 'display', type: 'IDisplayOptions', optional: true, descriptionFallback: 'Responsive breakpoint thresholds used by the `useDisplay()` composable and `v-display` directive.' },
        { name: 'ssr', type: 'TSSROptions', optional: true, descriptionFallback: 'Server-side rendering hints passed to components that need to know the initial client dimensions before hydration.' },
        { name: 'goTo', type: 'IGoToOptions', optional: true, descriptionFallback: 'Default easing and duration for the `useGoTo()` scroll-to utility.' },
        { name: 'date', type: 'IDateOptions', optional: true, descriptionFallback: 'Date adapter registration used by date-picker and calendar components.' },
        { name: 'locale', type: 'ILocaleOptions & IRtlOptions', optional: true, descriptionFallback: 'Global locale configuration — active locale, fallback locale, message dictionary and optional RTL per-locale map.' },
        { name: 'contrast', type: 'boolean | IContrastOptions', optional: true, descriptionFallback: 'Runtime WCAG text-contrast guard. `true` (default) enables the check; `false` disables it; an object tunes the minimum contrast threshold.' },
        { name: 'theme', type: 'IOrigamTheme', optional: true, descriptionFallback: 'Single runtime theme injected into <head> at install time as a scoped block of --origam-* CSS variables. SSR-safe.' },
        { name: 'themes', type: 'IOrigamTheme[]', optional: true, descriptionFallback: 'Additional named runtime themes installed together. Each is injected as its own scoped CSS variable block and exposed via useInstalledThemes().' },
    ],
    usedBy: [
        { slug: 'create-origam', name: 'createOrigam', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_origam_options.example',
            titleFallback: 'Configuring the plugin with createOrigam',
            code: `import { createOrigam } from 'origam'
import type { IOrigamOptions } from 'origam'

const options: IOrigamOptions = {
    locale: { locale: 'fr', fallbackLocale: 'en', messages: {} },
    contrast: { enabled: true, threshold: 4.5 },
}

app.use(createOrigam(options))`,
            lang: 'typescript',
        },
    ],
}
