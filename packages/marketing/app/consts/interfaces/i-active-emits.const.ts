import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ACTIVE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-active-emits',
    name: 'IActiveEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_active_emits.description',
    descriptionFallback: 'Emit contract for components that propagate their active state — fires update:active whenever the active state changes.',
    definition: `export interface IActiveEmits {
    (e: 'update:active', event: any): void
}`,
    extends: [],
    props: [
        { name: 'update:active', type: '(e: \'update:active\', event: any) => void', optional: false, descriptionFallback: 'Emitted when the active state changes, carrying the new value.' },
    ],
    usedBy: [
        { slug: 'use-active', name: 'useActive', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/active.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_active_emits.example',
            titleFallback: 'Extending the emits interface',
            code: `import type { IActiveEmits } from 'origam'

interface ITabEmits extends IActiveEmits {
    (e: 'click', event: MouseEvent): void
}`,
            lang: 'typescript',
        },
    ],
}
