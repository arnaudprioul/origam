import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PROGRESS_CIRCULAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-progress-circular-props',
    name: 'IProgressCircularProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_progress_circular_props.description',
    descriptionFallback: 'Props contract for <OrigamProgressCircular>. Extends IProgressTypeProps and ISizeProps with a rotate prop to control the starting angle of the arc.',
    definition: `export interface IProgressCircularProps extends IProgressTypeProps, ISizeProps {
    rotate?: string | number
}`,
    extends: ['IProgressTypeProps', 'ISizeProps'],
    props: [
        { name: 'rotate', type: 'string | number', optional: true, descriptionFallback: 'Starting angle of the arc in degrees. Default 0 = top of the circle. Accepts any CSS angle or a raw number (interpreted as degrees).' },
    ],
    usedBy: [
        { slug: 'progress-circular', name: 'ProgressCircular', kind: 'component' },
        { slug: 'progress', name: 'Progress', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Progress/progress-circular.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_progress_circular_props.example',
            titleFallback: 'Circular progress starting from the left',
            code: `<origam-progress-circular
    :model-value="progress"
    :rotate="-90"
    size="48"
    color="primary"
/>`,
            lang: 'html',
        },
    ],
}
