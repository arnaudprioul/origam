import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_TABS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-tabs-key',
    name: 'ORIGAM_TABS_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_tabs_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamTabs (provider) and each OrigamTab (consumer). Uses a dedicated symbol so an OrigamTabs nested inside an OrigamBtnToggle does not cross-register items with the outer group.',
    definition: `export const ORIGAM_TABS_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:tabs')`,
    value: "Symbol.for('origam:tabs')",
    usedBy: [
        { name: 'OrigamTabs', slug: 'origam-tabs' },
        { name: 'OrigamTab', slug: 'origam-tab' },
    ],
    sourceFile: 'packages/ds/src/consts/Tabs/tabs.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_tabs_key.example',
            titleFallback: 'Injecting the tabs group context in a custom tab',
            code: `import { inject } from 'vue'
import { ORIGAM_TABS_KEY } from 'origam'

const group = inject(ORIGAM_TABS_KEY)`,
            lang: 'typescript',
        },
    ],
}
