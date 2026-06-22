import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PROGRESS_LINEAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-progress-linear-props',
    name: 'IProgressLinearProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_progress_linear_props.description',
    descriptionFallback: 'Props contract for <OrigamProgressLinear>. Extends IProgressTypeProps, IRoundedProps and ILocationProps with buffer value, clickable track, reverse direction and stream mode.',
    definition: `export interface IProgressLinearProps extends IProgressTypeProps, IRoundedProps, ILocationProps {
    bufferValue?: number | string
    clickable?: boolean
    reverse?: boolean
    stream?: boolean
}`,
    extends: ['IProgressTypeProps', 'IRoundedProps', 'ILocationProps'],
    props: [
        { name: 'bufferValue', type: 'number | string', optional: true, descriptionFallback: 'Secondary buffer fill level (0..max). Renders a lighter secondary segment behind the main fill, useful for media buffering states.' },
        { name: 'clickable', type: 'boolean', optional: true, descriptionFallback: 'Allows the user to click the track to seek/set the value. Emits update:modelValue on click.' },
        { name: 'reverse', type: 'boolean', optional: true, descriptionFallback: 'Fills the bar from right to left instead of left to right.' },
        { name: 'stream', type: 'boolean', optional: true, descriptionFallback: 'Adds a streaming animation on the buffer area to suggest incoming data.' },
    ],
    usedBy: [
        { slug: 'progress-linear', name: 'ProgressLinear', kind: 'component' },
        { slug: 'progress', name: 'Progress', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Progress/progress-linear.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_progress_linear_props.example',
            titleFallback: 'Buffered video progress bar',
            code: `<origam-progress-linear
    :model-value="playProgress"
    :buffer-value="bufferProgress"
    :stream="isBuffering"
    :clickable="true"
    @update:model-value="seek"
/>`,
            lang: 'html',
        },
    ],
}
