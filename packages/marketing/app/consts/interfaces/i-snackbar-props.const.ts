import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-props',
    name: 'ISnackbarProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_snackbar_props.description',
    descriptionFallback: 'Full props contract for <OrigamSnackbar> — a positioned notification surface with auto-dismiss timer, optional progress bar, multi-line and vertical layout modes, and the full design surface (color, border, elevation, spacing).',
    definition: `export interface ISnackbarProps extends ICommonsComponentProps, ITagProps, IStatusProps, IColorProps, IBgColorProps, IOverlayProps, IPositionProps, ILocationProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, ITransitionComponentProps, IActiveProps, IHoverProps {
    multiLine?: boolean
    text?: string
    timer?: boolean | string
    timeout?: number | string
    vertical?: boolean
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IStatusProps', 'IColorProps', 'IBgColorProps',
        'IOverlayProps', 'IPositionProps', 'ILocationProps', 'IRoundedProps', 'IBorderProps',
        'IPaddingProps', 'IMarginProps', 'IElevationProps', 'ITransitionComponentProps',
        'IActiveProps', 'IHoverProps',
    ],
    props: [
        { name: 'multiLine', type: 'boolean', optional: true, descriptionFallback: 'Allows the snackbar text to wrap across multiple lines.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Body text of the snackbar. Can be used instead of the default slot.' },
        { name: 'timer', type: 'boolean | string', optional: true, descriptionFallback: 'Shows a progress bar indicating the remaining auto-dismiss time. Pass a color string to tint it.' },
        { name: 'timeout', type: 'number | string', optional: true, descriptionFallback: 'Auto-dismiss delay in ms. Defaults to 5000. Pass -1 to disable auto-dismiss.' },
        { name: 'vertical', type: 'boolean', optional: true, descriptionFallback: 'Stacks the text and action vertically instead of inline.' },
    ],
    usedBy: [
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_props.example',
            titleFallback: 'Auto-dismiss snackbar with timer',
            code: `<OrigamSnackbar
    v-model="show"
    text="Your changes have been saved."
    :timeout="4000"
    timer
    location="bottom-center"
/>`,
            lang: 'vue',
        },
    ],
}
