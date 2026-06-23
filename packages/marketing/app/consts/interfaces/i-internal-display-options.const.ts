import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERNAL_DISPLAY_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-internal-display-options',
    name: 'IInternalDisplayOptions',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_internal_display_options.description',
    descriptionFallback: 'Resolved, non-optional display configuration used internally by the display composable after applying defaults — both mobileBreakpoint and thresholds are guaranteed to be present.',
    definition: `export interface IInternalDisplayOptions {
    mobileBreakpoint: number | TBreakpoint
    thresholds: TDisplayThresholds
}`,
    extends: [],
    props: [
        { name: 'mobileBreakpoint', type: 'number | TBreakpoint', optional: false, descriptionFallback: 'The resolved breakpoint at or below which the display is considered mobile — a pixel value or a named TBreakpoint.' },
        { name: 'thresholds', type: 'TDisplayThresholds', optional: false, descriptionFallback: 'Full resolved map of breakpoint pixel thresholds (xs, sm, md, lg, xl, xxl) used by the reactive display instance.' },
    ],
    usedBy: [
        { slug: 'use-display', name: 'useDisplay', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/display.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_internal_display_options.example',
            titleFallback: 'Internal usage inside the display plugin setup',
            code: `import type { IInternalDisplayOptions } from 'origam'

const resolved: IInternalDisplayOptions = {
    mobileBreakpoint: 'sm',
    thresholds: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560 },
}`,
            lang: 'typescript',
        },
    ],
}
