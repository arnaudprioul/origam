import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DISPLAY_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-display-options',
    name: 'IDisplayOptions',
    category: 'Display & Responsive',
    descriptionKey: 'interfaces.catalog.i_display_options.description',
    descriptionFallback: 'Configuration bag for the useDisplay() plugin — sets the global mobile breakpoint and the named breakpoint thresholds at install time.',
    definition: `export interface IDisplayOptions {
    mobileBreakpoint?: number | TBreakpoint
    thresholds?: Partial<TDisplayThresholds>
}`,
    extends: [],
    props: [
        {
            name: 'mobileBreakpoint',
            type: 'number | TBreakpoint',
            optional: true,
            descriptionFallback: 'Global breakpoint below which `mobile` is true. Defaults to "sm".',
        },
        {
            name: 'thresholds',
            type: 'Partial<TDisplayThresholds>',
            optional: true,
            descriptionFallback: 'Override the pixel widths for each named breakpoint (xs, sm, md, lg, xl, xxl).',
        },
    ],
    usedBy: [
        { slug: 'use-display', name: 'useDisplay', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/display.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_display_options.example',
            titleFallback: 'Passing custom thresholds to the plugin',
            code: `import type { IDisplayOptions } from 'origam'

const displayOptions: IDisplayOptions = {
    mobileBreakpoint: 'md',
    thresholds: { xs: 0, sm: 480, md: 768, lg: 1024, xl: 1280, xxl: 1920 },
}`,
            lang: 'typescript',
        },
    ],
}
