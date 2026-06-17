import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_TAB_PANELS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-tab-panels-key',
    name: 'ORIGAM_TAB_PANELS_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_tab_panels_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamTabPanels (provider) and each OrigamTabPanel (consumer). Kept distinct from ORIGAM_TABS_KEY so the panels group can be rendered as a sibling of the tab list under a common ancestor.',
    definition: `export const ORIGAM_TAB_PANELS_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:tab-panels')`,
    value: "Symbol.for('origam:tab-panels')",
    usedBy: [
        { name: 'OrigamTabPanels', slug: 'origam-tab-panels' },
        { name: 'OrigamTabPanel', slug: 'origam-tab-panel' },
    ],
    sourceFile: 'packages/ds/src/consts/Tabs/tabs.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_tab_panels_key.example',
            titleFallback: 'Injecting the tab-panels group context',
            code: `import { inject } from 'vue'
import { ORIGAM_TAB_PANELS_KEY } from 'origam'

const group = inject(ORIGAM_TAB_PANELS_KEY)`,
            lang: 'typescript',
        },
    ],
}
