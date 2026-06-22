import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-emits',
    name: 'ISwitchEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_switch_emits.description',
    descriptionFallback: 'Emit contract for <OrigamSwitch> — aggregates commons component events, focus lifecycle, indeterminate three-state changes and label click.',
    definition: `export interface ISwitchEmits extends ICommonsComponentEmits, IFocusEmits, IIndeterminateEmits, IClickLabelEmits {}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits', 'IIndeterminateEmits', 'IClickLabelEmits'],
    props: [],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_emits.example',
            titleFallback: 'Listening to Switch events',
            code: `<OrigamSwitch
  @update:modelValue="val => console.log(val)"
  @focus="onFocus"
  @update:indeterminate="ind => console.log(ind)"
  @click:label="onLabelClick"
/>`,
            lang: 'html',
        },
    ],
}
