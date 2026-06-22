import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_KBD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-kbd-props',
    name: 'IKbdProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_kbd_props.description',
    descriptionFallback: 'Props for <OrigamKbd> — renders keyboard shortcuts as styled <kbd> elements. Supports single key labels, composed shortcut combinations, and visual variants.',
    definition: `export interface IKbdProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IBorderProps, IRoundedProps {
    text?: string
    combination?: string[]
    separator?: string
    variant?: TKbdVariant
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'ISizeProps', 'IBorderProps', 'IRoundedProps'],
    props: [
        {
            name: 'text',
            type: 'string',
            optional: true,
            descriptionFallback: 'Single key label (e.g. "Ctrl", "A"). Overridden by the default slot.',
        },
        {
            name: 'combination',
            type: 'string[]',
            optional: true,
            descriptionFallback: 'Composed shortcut rendered as individual nested <kbd> elements (e.g. ["Ctrl", "Shift", "Z"]).',
        },
        {
            name: 'separator',
            type: 'string',
            optional: true,
            default: '+',
            descriptionFallback: 'Character shown between each key in a combination. Defaults to "+".',
        },
        {
            name: 'variant',
            type: 'TKbdVariant',
            optional: true,
            default: 'outlined',
            descriptionFallback: 'Visual variant controlling the look of the key badge. Defaults to "outlined".',
        },
    ],
    usedBy: [
        { slug: 'kbd', name: 'Kbd', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Kbd/kbd.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_kbd_props.example_single',
            titleFallback: 'Single key',
            code: `<OrigamKbd text="Ctrl" />`,
            lang: 'vue',
        },
        {
            titleKey: 'interfaces.detail.i_kbd_props.example_combination',
            titleFallback: 'Keyboard shortcut combination',
            code: `<OrigamKbd :combination="['Ctrl', 'Shift', 'Z']" separator="+" />`,
            lang: 'vue',
        },
    ],
}
