import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STATUS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-status-props',
    name: 'IStatusProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_status_props.description',
    descriptionFallback: 'Status indicator props — extends IIconProps with a semantic status level (success, warning, danger, info) and a position for the status icon badge.',
    definition: `export interface IStatusProps extends IIconProps {
    status?: TStatus
    statusIconPosition?: TStatusPosition
}`,
    extends: ['IIconProps'],
    props: [
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Icon name or component to display (inherited from IIconProps).' },
        { name: 'status', type: 'TStatus', optional: true, descriptionFallback: 'Semantic status level — success, warning, danger or info. Controls the colour and default icon of the status indicator.' },
        { name: 'statusIconPosition', type: 'TStatusPosition', optional: true, descriptionFallback: 'Position of the status icon badge relative to the component surface (e.g. top-right, bottom-left).' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', kind: 'component' },
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'badge', name: 'Badge', kind: 'component' },
        { slug: 'dialog', name: 'Dialog', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/status.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_status_props.example',
            titleFallback: 'Extending IStatusProps on an Alert component',
            code: `import type { IStatusProps } from 'origam'

interface IAlertProps extends IStatusProps {
    closable?: boolean
}`,
            lang: 'typescript',
        },
    ],
}
