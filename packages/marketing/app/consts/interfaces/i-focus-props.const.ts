import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FOCUS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-focus-props',
    name: 'IFocusProps',
    category: 'Interaction & State',
    descriptionKey: 'interfaces.catalog.i_focus_props.description',
    descriptionFallback: 'Focus contract — a single `focused` prop that lets the parent control or observe the focus state of a component that manages keyboard focus internally.',
    definition: `export interface IFocusProps {
    focused?: boolean
}`,
    extends: [],
    props: [
        {
            name: 'focused',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, the component renders in its focused visual state. Typically bound as v-model:focused for two-way sync.',
        },
    ],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/focus.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_focus_props.example',
            titleFallback: 'Two-way binding with v-model:focused',
            code: `<OrigamTextField v-model:focused="isFocused" />`,
            lang: 'html',
        },
    ],
}
