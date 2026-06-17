import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_TAB_PANELS_CTX_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-tab-panels-ctx-key',
    name: 'ORIGAM_TAB_PANELS_CTX_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_tab_panels_ctx_key.description',
    descriptionFallback: 'Auxiliary Vue injection key (Symbol) exposed by OrigamTabPanels so child OrigamTabPanel components can read transition direction and swipe settings without re-declaring the same props at every nesting level.',
    definition: `export const ORIGAM_TAB_PANELS_CTX_KEY: InjectionKey<ITabPanelsProvide> = Symbol.for('origam:tab-panels-ctx')`,
    value: "Symbol.for('origam:tab-panels-ctx')",
    usedBy: [
        { name: 'OrigamTabPanels', slug: 'origam-tab-panels' },
        { name: 'OrigamTabPanel', slug: 'origam-tab-panel' },
    ],
    sourceFile: 'packages/ds/src/consts/Tabs/tabs.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_tab_panels_ctx_key.example',
            titleFallback: 'Injecting the auxiliary tab-panels context',
            code: `import { inject } from 'vue'
import { ORIGAM_TAB_PANELS_CTX_KEY } from 'origam'

const ctx = inject(ORIGAM_TAB_PANELS_CTX_KEY)
// ctx?.transition, ctx?.swipe, …`,
            lang: 'typescript',
        },
    ],
}
