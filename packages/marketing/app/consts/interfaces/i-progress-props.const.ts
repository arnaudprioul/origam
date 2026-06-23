import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PROGRESS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-progress-props',
    name: 'IProgressProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_progress_props.description',
    descriptionFallback: 'Unified props contract for <OrigamProgress> — the polymorphic wrapper that renders either a linear or circular indicator depending on the type prop. Extends both IProgressLinearProps and IProgressCircularProps.',
    definition: `export interface IProgressProps extends IProgressLinearProps, IProgressCircularProps {
    type?: TProgressType
}`,
    extends: ['IProgressLinearProps', 'IProgressCircularProps'],
    props: [
        { name: 'type', type: 'TProgressType', optional: true, descriptionFallback: 'Selects the progress variant — "linear" or "circular". Determines which renderer is mounted.' },
    ],
    usedBy: [
        { slug: 'progress', name: 'Progress', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Progress/progress.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_progress_props.example',
            titleFallback: 'Switching between linear and circular',
            code: `<origam-progress
    v-model="value"
    :type="isSpinner ? 'circular' : 'linear'"
    color="primary"
    :indeterminate="loading"
/>`,
            lang: 'html',
        },
    ],
}
