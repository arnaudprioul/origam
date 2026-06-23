import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-group-props',
    name: 'ISnackbarGroupProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_snackbar_group_props.description',
    descriptionFallback: 'Props contract for <OrigamSnackbarGroup> — a multi-toast container that orchestrates a queue of OrigamSnackbar instances driven through the useSnackbarGroup({ id }) composable.',
    definition: `export interface ISnackbarGroupProps extends ICommonsComponentProps, ITagProps {
    id?: string
    location?: TSnackbarGroupLocation
    max?: number
    defaultDuration?: number
    spacing?: string | number
    direction?: TSnackbarGroupDirection
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'id', type: 'string', optional: true, descriptionFallback: 'Identifier of the stack this container renders. Pair with useSnackbarGroup({ id }) to push items into the same stack. Defaults to "default".' },
        { name: 'location', type: 'TSnackbarGroupLocation', optional: true, descriptionFallback: 'Anchor location on the viewport — drives both absolute positioning and the direction default. Defaults to "bottom-right".' },
        { name: 'max', type: 'number', optional: true, descriptionFallback: 'Maximum number of items rendered concurrently. When exceeded, the oldest item is evicted FIFO. Defaults to 5.' },
        { name: 'defaultDuration', type: 'number', optional: true, descriptionFallback: 'Default auto-dismiss timeout (ms) for items without their own duration. Pass 0 to make all items sticky. Defaults to 5000.' },
        { name: 'spacing', type: 'string | number', optional: true, descriptionFallback: 'Gap between stacked items (CSS dimension). Defaults to "12px".' },
        { name: 'direction', type: 'TSnackbarGroupDirection', optional: true, descriptionFallback: 'Stacking order. Defaults to "top-down" for top-* locations and "bottom-up" for bottom-* locations.' },
    ],
    usedBy: [
        { slug: 'snackbar-group', name: 'SnackbarGroup', kind: 'component' },
        { slug: 'use-snackbar-group', name: 'useSnackbarGroup', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_group_props.example',
            titleFallback: 'Global toast container at top-right',
            code: `<OrigamSnackbarGroup
    id="global"
    location="top-right"
    :max="3"
    :default-duration="4000"
/>`,
            lang: 'vue',
        },
    ],
}
