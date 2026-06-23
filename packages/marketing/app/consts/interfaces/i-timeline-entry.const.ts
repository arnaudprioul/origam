import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TIMELINE_ENTRY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-timeline-entry',
    name: 'ITimelineEntry',
    category: 'Data Models',
    descriptionKey: 'interfaces.catalog.i_timeline_entry.description',
    descriptionFallback: 'Shape of a single timeline data item. Passed via the items prop of OrigamTimeline to render each dot, its optional icon, title, subtitle, and description automatically.',
    definition: `export interface ITimelineEntry {
    title: string
    subtitle?: string
    description?: string
    icon?: TIcon
    intent?: TIntent
}`,
    extends: [],
    props: [
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'Primary label rendered next to the timeline dot.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Secondary label rendered below the title.' },
        { name: 'description', type: 'string', optional: true, descriptionFallback: 'Longer body text rendered below the subtitle.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'MDI icon name rendered inside the timeline dot.' },
        { name: 'intent', type: 'TIntent', optional: true, descriptionFallback: 'Semantic intent that colors the dot (primary, success, danger, warning, info, neutral).' },
    ],
    usedBy: [
        { slug: 'timeline', name: 'Timeline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Timeline/timeline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_timeline_entry.example',
            titleFallback: 'Timeline driven by an ITimelineEntry array',
            code: `import type { ITimelineEntry } from 'origam'

const steps: ITimelineEntry[] = [
    { title: 'Order placed', icon: 'mdi-cart', intent: 'primary' },
    { title: 'Shipped', subtitle: '2026-06-01', icon: 'mdi-truck', intent: 'info' },
    { title: 'Delivered', icon: 'mdi-check-circle', intent: 'success' },
]`,
            lang: 'typescript',
        },
    ],
}
