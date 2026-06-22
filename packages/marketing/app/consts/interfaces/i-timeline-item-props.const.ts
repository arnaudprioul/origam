import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TIMELINE_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-timeline-item-props',
    name: 'ITimelineItemProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_timeline_item_props.description',
    descriptionFallback: 'Props contract for <OrigamTimelineItem>. Carries the per-item visual and layout configuration including title, subtitle, icon, intent, and layout context inherited from the parent OrigamTimeline.',
    definition: `export interface ITimelineItemProps extends ICommonsComponentProps, IColorProps {
    title?: string
    subtitle?: string
    icon?: TIcon
    intent?: TIntent
    isLast?: boolean
    truncateLine?: boolean
    side?: 'start' | 'end' | 'alternating'
    orientation?: TTimelineOrientation
    index?: number
}`,
    extends: ['ICommonsComponentProps', 'IColorProps'],
    props: [
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Primary label rendered next to the timeline dot.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Secondary label rendered below the title.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'MDI icon name rendered inside the timeline dot.' },
        { name: 'intent', type: 'TIntent', optional: true, descriptionFallback: 'Semantic intent that colors the dot (primary, success, danger, warning, info, neutral).' },
        { name: 'isLast', type: 'boolean', optional: true, descriptionFallback: 'Whether this is the last item in the timeline. Hides the trailing connector line when true.' },
        { name: 'truncateLine', type: 'boolean', optional: true, descriptionFallback: 'Inherited from the parent context. When true the last connecting line is hidden.' },
        { name: 'side', type: "'start' | 'end' | 'alternating'", optional: true, descriptionFallback: 'Layout side for content: left, right, or alternating. Inherited from parent context.' },
        { name: 'orientation', type: 'TTimelineOrientation', optional: true, descriptionFallback: 'Layout direction forwarded by the parent OrigamTimeline. Defaults to vertical when unset.' },
        { name: 'index', type: 'number', optional: true, descriptionFallback: 'Zero-based position of this item in the parent items array. Used to compute alternating side.' },
    ],
    usedBy: [
        { slug: 'timeline-item', name: 'TimelineItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Timeline/timeline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_timeline_item_props.example',
            titleFallback: 'Standalone timeline item with intent',
            code: `<OrigamTimelineItem
    title="Deployed"
    subtitle="2026-06-01 14:30"
    icon="mdi-rocket"
    intent="success"
/>`,
            lang: 'vue',
        },
    ],
}
