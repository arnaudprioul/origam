import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAB_PANELS_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tab-panels-provide',
    name: 'ITabPanelsProvide',
    category: 'Provide / Inject',
    descriptionKey: 'interfaces.catalog.i_tab_panels_provide.description',
    descriptionFallback: 'Context provided by <OrigamTabPanels> to descendant panels — exposes the active transition name and the reversed-direction flag so each panel can animate correctly without re-declaring props.',
    definition: `export interface ITabPanelsProvide {
    transition: ComputedRef<string | false>
    isReversed: Ref<boolean>
}`,
    extends: [],
    props: [
        { name: 'transition', type: 'ComputedRef<string | false>', optional: false, descriptionFallback: 'Computed ref resolving to the current transition name, or false when transitions are disabled.' },
        { name: 'isReversed', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Reactive flag set to true when the tab selection moves backwards — panels use it to reverse their transition direction.' },
    ],
    usedBy: [
        { slug: 'tab-panels', name: 'TabPanels', kind: 'component' },
        { slug: 'tab-panel', name: 'TabPanel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tab-panels.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tab_panels_provide.example',
            titleFallback: 'Injecting the panels context in a custom panel',
            code: `import { inject } from 'vue'
import { ORIGAM_TAB_PANELS_KEY } from 'origam'
import type { ITabPanelsProvide } from 'origam'

const { transition, isReversed } = inject<ITabPanelsProvide>(ORIGAM_TAB_PANELS_KEY)!`,
            lang: 'typescript',
        },
    ],
}
