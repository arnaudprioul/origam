import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DRAWER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-drawer-emits',
    name: 'IDrawerEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_drawer_emits.description',
    descriptionFallback: 'Emit contract for <OrigamDrawer> — fires update:rail when the rail collapsed state changes.',
    definition: `export interface IDrawerEmits {
    (e: 'update:rail', value: boolean): void
}`,
    extends: [],
    props: [
        {
            name: 'update:rail',
            type: "(e: 'update:rail', value: boolean) => void",
            optional: false,
            descriptionFallback: 'Emitted when the rail prop changes (collapsed / expanded). Use with v-model:rail.',
        },
    ],
    usedBy: [
        { slug: 'drawer', name: 'Drawer', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Drawer/drawer.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_drawer_emits.example',
            titleFallback: 'Listening to the rail toggle',
            code: `<OrigamDrawer v-model:rail="isRail" @update:rail="onRailChange" />`,
            lang: 'vue',
        },
    ],
}
