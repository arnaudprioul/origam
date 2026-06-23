import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TIMELINE_ORIENTATION_TYPE_DOC: ITypeDoc = {
    slug: 'timeline-orientation',
    name: 'TTimelineOrientation',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.timeline_orientation.description',
    descriptionFallback: 'Layout axis of the OrigamTimeline — vertical (top-to-bottom) or horizontal (left-to-right).',
    definition: `export type TTimelineOrientation = 'vertical' | 'horizontal'`,
    values: [
        {
            value: 'vertical',
            descriptionKey: 'types.detail.timeline_orientation.vertical',
            descriptionFallback: 'Events are stacked from top to bottom along the Y axis. Default orientation.',
        },
        {
            value: 'horizontal',
            descriptionKey: 'types.detail.timeline_orientation.horizontal',
            descriptionFallback: 'Events are laid out left to right along the X axis. Useful for timelines that span calendar periods or process steps.',
        },
    ],
    usedBy: [
        { slug: 'timeline', name: 'Timeline', propName: 'orientation' },
        { slug: 'timeline-item', name: 'TimelineItem', propName: 'orientation' },
    ],
    sourceFile: 'packages/ds/src/types/Timeline/timeline.type.ts',
    examples: [
        {
            titleKey: 'types.detail.timeline_orientation.example',
            titleFallback: 'Horizontal process timeline',
            code: `<origam-timeline orientation="horizontal">
  <origam-timeline-item v-for="step in steps" :key="step.id" :title="step.label" />
</origam-timeline>`,
            lang: 'html',
        },
    ],
}
