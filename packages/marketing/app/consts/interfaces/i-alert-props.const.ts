import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ALERT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-alert-props',
    name: 'IAlertProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_alert_props.description',
    descriptionFallback: 'Full props contract for <OrigamAlert> — closable banner with optional icon, title, text, v-model visibility and the full design surface (color, border, spacing, elevation, position).',
    definition: `export interface IAlertProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IBorderProps, IDimensionProps, IPaddingProps, IMarginProps, IDensityProps, IElevationProps, ILocationProps, IPositionProps, IRoundedProps, IStatusProps, IHoverProps, IAdjacentProps {
    closable?: boolean
    closeIcon?: TIcon
    closeLabel?: string
    modelValue?: boolean
    title?: string
    text?: string
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IColorProps', 'IBgColorProps',
        'IBorderProps', 'IDimensionProps', 'IPaddingProps', 'IMarginProps',
        'IDensityProps', 'IElevationProps', 'ILocationProps', 'IPositionProps',
        'IRoundedProps', 'IStatusProps', 'IHoverProps', 'IAdjacentProps',
    ],
    props: [
        { name: 'closable', type: 'boolean', optional: true, descriptionFallback: 'Shows a close button on the alert. Triggers the click:close emit when pressed.' },
        { name: 'closeIcon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon for the close button. Defaults to the DS close icon.' },
        { name: 'closeLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the close button (aria-label). Defaults to "Close".' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'Controls the visibility of the alert via v-model. When false the alert is hidden.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Bold heading rendered above the alert body.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Body text of the alert. Rendered inside the default slot when the slot is not used.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Alert/alert.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_alert_props.example',
            titleFallback: 'Closable danger alert with v-model',
            code: `<OrigamAlert
    v-model="show"
    color="danger"
    closable
    title="Error"
    text="Something went wrong."
/>`,
            lang: 'vue',
        },
    ],
}
