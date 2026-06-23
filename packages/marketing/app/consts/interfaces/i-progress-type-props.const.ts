import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PROGRESS_TYPE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-progress-type-props',
    name: 'IProgressTypeProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_progress_type_props.description',
    descriptionFallback: 'Base props shared by all progress variants (linear and circular). Carries value, indeterminate mode, thickness, active flag, absolute positioning, max value, striped mode and an accessible label.',
    definition: `export interface IProgressTypeProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps {
    indeterminate?: boolean
    modelValue?: string | number
    thickness?: string | number
    active?: boolean
    absolute?: boolean
    max?: number | string
    striped?: boolean
    label?: string
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IColorProps', 'IPaddingProps', 'IMarginProps'],
    props: [
        { name: 'indeterminate', type: 'boolean', optional: true, descriptionFallback: 'Puts the progress bar in indeterminate mode — animates continuously without a value.' },
        { name: 'modelValue', type: 'string | number', optional: true, descriptionFallback: 'Current progress value (v-model). Interpreted as a percentage between 0 and max.' },
        { name: 'thickness', type: 'string | number', optional: true, descriptionFallback: 'Track thickness. A number is resolved to px; a string is used verbatim.' },
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: 'Whether the progress indicator is visible. When false the element is hidden without being removed from the DOM.' },
        { name: 'absolute', type: 'boolean', optional: true, descriptionFallback: 'Positions the progress bar absolutely (typically at the top of a container).' },
        { name: 'max', type: 'number | string', optional: true, descriptionFallback: 'Maximum value. Defaults to 100.' },
        { name: 'striped', type: 'boolean', optional: true, descriptionFallback: 'Adds a diagonal stripe pattern over the filled portion (linear only).' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Accessible aria-label for the progress bar. Defaults to "Loading" when omitted.' },
    ],
    usedBy: [
        { slug: 'progress', name: 'Progress', kind: 'component' },
        { slug: 'progress-linear', name: 'ProgressLinear', kind: 'component' },
        { slug: 'progress-circular', name: 'ProgressCircular', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Progress/progress.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_progress_type_props.example',
            titleFallback: 'Determinate progress bar with max and label',
            code: `<origam-progress-linear
    :model-value="42"
    :max="100"
    label="Upload progress"
    color="primary"
/>`,
            lang: 'html',
        },
    ],
}
