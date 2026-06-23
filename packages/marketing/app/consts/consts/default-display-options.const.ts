import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_DISPLAY_OPTIONS_CONST_DOC: IConstDoc = {
    slug: 'default-display-options',
    name: 'DEFAULT_DISPLAY_OPTIONS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.default_display_options.description',
    descriptionFallback: 'Default configuration object for the useDisplay composable. Sets the mobile breakpoint to lg and the pixel thresholds for the six named breakpoints (xs → xxl) used by the responsive display system.',
    definition: `export const DEFAULT_DISPLAY_OPTIONS: IDisplayOptions = {
    mobileBreakpoint: 'lg',
    thresholds: {
        xs:  0,
        sm:  600,
        md:  960,
        lg:  1280,
        xl:  1920,
        xxl: 2560
    }
}`,
    values: [
        { value: "mobileBreakpoint: 'lg'", descriptionKey: 'consts.detail.default_display_options.mobile_breakpoint', descriptionFallback: 'Viewports narrower than lg (< 1280px) are considered mobile.' },
        { value: 'thresholds.xs: 0', descriptionKey: 'consts.detail.default_display_options.xs', descriptionFallback: 'xs starts at 0px — the implicit base.' },
        { value: 'thresholds.sm: 600', descriptionKey: 'consts.detail.default_display_options.sm', descriptionFallback: 'Small — starts at 600px.' },
        { value: 'thresholds.md: 960', descriptionKey: 'consts.detail.default_display_options.md', descriptionFallback: 'Medium — starts at 960px.' },
        { value: 'thresholds.lg: 1280', descriptionKey: 'consts.detail.default_display_options.lg', descriptionFallback: 'Large — starts at 1280px.' },
        { value: 'thresholds.xl: 1920', descriptionKey: 'consts.detail.default_display_options.xl', descriptionFallback: 'Extra-large — starts at 1920px.' },
        { value: 'thresholds.xxl: 2560', descriptionKey: 'consts.detail.default_display_options.xxl', descriptionFallback: 'Double-extra-large — starts at 2560px.' },
    ],
    usedBy: [
        { name: 'useDisplay' },
        { name: 'BREAKPOINTS_ARRAY' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/display.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_display_options.example',
            titleFallback: 'Overriding the mobile breakpoint',
            code: `import { DEFAULT_DISPLAY_OPTIONS } from 'origam'

const myOptions = {
  ...DEFAULT_DISPLAY_OPTIONS,
  mobileBreakpoint: 'md' // treat < 960px as mobile
}`,
            lang: 'typescript',
        },
    ],
}
