import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TIMELINE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-timeline-props',
    name: 'ITimelineProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_timeline_props.description',
    descriptionFallback: 'Full props contract for <OrigamTimeline>. Supports vertical and horizontal orientations, data-driven rendering via items, side alignment, and the full color/size/density surface.',
    definition: `export interface ITimelineProps extends ICommonsComponentProps, ITagProps, IColorProps, ISizeProps, IDensityProps {
    items?: ITimelineEntry[]
    orientation?: TTimelineOrientation
    side?: 'start' | 'end' | 'alternating'
    truncateLine?: boolean
    ariaLabel?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IColorProps', 'ISizeProps', 'IDensityProps'],
    props: [
        { name: 'items', type: 'ITimelineEntry[]', optional: true, descriptionFallback: 'Data array driving automatic item rendering. Each entry maps to an OrigamTimelineItem.' },
        { name: 'orientation', type: 'TTimelineOrientation', optional: true, descriptionFallback: 'Layout direction: vertical (default, top to bottom) or horizontal (left to right with scroll-snap).' },
        { name: 'side', type: "'start' | 'end' | 'alternating'", optional: true, descriptionFallback: 'Default side for item content relative to the connector line.' },
        { name: 'truncateLine', type: 'boolean', optional: true, descriptionFallback: 'Hide the trailing connector line after the last item.' },
        { name: 'ariaLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the timeline landmark (aria-label on the root element).' },
    ],
    usedBy: [
        { slug: 'timeline', name: 'Timeline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Timeline/timeline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_timeline_props.example',
            titleFallback: 'Horizontal timeline with alternating sides',
            code: `<OrigamTimeline
    :items="steps"
    orientation="horizontal"
    side="alternating"
    color="primary"
    aria-label="Project milestones"
/>`,
            lang: 'vue',
        },
    ],
}
