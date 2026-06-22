import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MESSAGES_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-messages-props',
    name: 'IMessagesProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_messages_props.description',
    descriptionFallback: 'Props for <OrigamMessages> — a validation messages renderer used internally by form fields to display one or more inline error, warning or hint messages with animated transitions.',
    definition: `export interface IMessagesProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IDensityProps, IElevationProps {
    active?: boolean
    messages?: Array<string> | string
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'ITransitionComponentProps',
        'IColorProps', 'IBorderProps', 'IPaddingProps', 'IMarginProps',
        'IRoundedProps', 'IDensityProps', 'IElevationProps',
    ],
    props: [
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: 'When true the messages container is visible. Drives the transition in/out animation.' },
        { name: 'messages', type: 'Array<string> | string', optional: true, descriptionFallback: 'One or more message strings to display. A single string is normalised internally to an array. Used by form fields to pass validation errors or hints.' },
    ],
    usedBy: [
        { slug: 'messages', name: 'Messages', kind: 'component' },
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Messages/messages.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_messages_props.example',
            titleFallback: 'Messages in a custom form field',
            code: `<OrigamMessages
    :active="errors.length > 0"
    :messages="errors"
    color="danger"
/>`,
            lang: 'vue',
        },
    ],
}
