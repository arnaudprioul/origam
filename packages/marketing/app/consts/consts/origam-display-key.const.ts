import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DISPLAY_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-display-key',
    name: 'ORIGAM_DISPLAY_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_display_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the reactive IDisplayInstance (breakpoint flags, mobile/tablet booleans, thresholds, orientation) provided by the display system and consumed by useDisplay().',
    definition: `export const ORIGAM_DISPLAY_KEY: InjectionKey<IDisplayInstance> = Symbol.for('origam:display')`,
    value: "Symbol.for('origam:display')",
    usedBy: [
        { name: 'useDisplay' },
        { name: 'OrigamLayout', slug: 'layout' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/display.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_display_key.example',
            titleFallback: 'Reading the current breakpoint via useDisplay',
            code: `import { useDisplay } from 'origam'

const { mobile, sm, md, lg } = useDisplay()
// mobile.value → true when viewport < mobileBreakpoint`,
            lang: 'typescript',
        },
    ],
}
