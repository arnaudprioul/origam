import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STICKY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sticky',
    name: 'ISticky',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_sticky.description',
    descriptionFallback: 'Return shape of the useSticky composable. Exposes the root element ref, a reactive flag indicating whether the component is currently stuck, and the computed CSS styles for the layout item slot.',
    definition: `export interface ISticky {
    rootEl: Ref<HTMLElement | undefined>
    isSticky: Ref<boolean>
    layoutItemStyles: Ref<CSSProperties>
}`,
    extends: [],
    props: [
        { name: 'rootEl', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'Template ref to the sticky component root element, used to measure its dimensions for the layout item slot.' },
        { name: 'isSticky', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the component has passed its scroll threshold and is currently in its sticky (fixed) position.' },
        { name: 'layoutItemStyles', type: 'Ref<CSSProperties>', optional: false, descriptionFallback: 'Reactive CSS properties object (height, top, etc.) provided to the Nuxt/layout slot to preserve the space the sticky component occupies in the normal flow.' },
    ],
    usedBy: [
        { slug: 'use-sticky', name: 'useSticky', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/sticky.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sticky.example',
            titleFallback: 'Consuming ISticky from useSticky',
            code: `import { useSticky } from 'origam'
import type { ISticky } from 'origam'

const { rootEl, isSticky, layoutItemStyles }: ISticky = useSticky(props)`,
            lang: 'typescript',
        },
    ],
}
