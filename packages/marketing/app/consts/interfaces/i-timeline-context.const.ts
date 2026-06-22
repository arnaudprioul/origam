import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TIMELINE_CONTEXT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-timeline-context',
    name: 'ITimelineContext',
    category: 'Component Context',
    descriptionKey: 'interfaces.catalog.i_timeline_context.description',
    descriptionFallback: 'Context object provided by OrigamTimeline to its nested OrigamTimelineItem children via inject. Carries the parent layout direction and shared visual props without requiring explicit prop forwarding.',
    definition: `export interface ITimelineContext {
    side: 'start' | 'end' | 'alternating'
    truncateLine: boolean
    orientation: TTimelineOrientation
    color?: string
}`,
    extends: [],
    props: [
        { name: 'side', type: "'start' | 'end' | 'alternating'", optional: false, descriptionFallback: 'Layout side for item content: left of the dot (start), right of the dot (end), or alternating.' },
        { name: 'truncateLine', type: 'boolean', optional: false, descriptionFallback: 'Whether to truncate (hide) the connecting line after the last item.' },
        { name: 'orientation', type: 'TTimelineOrientation', optional: false, descriptionFallback: 'Layout direction of the timeline: vertical (top to bottom) or horizontal (left to right).' },
        { name: 'color', type: 'string', optional: true, descriptionFallback: 'Shared dot/line color inherited by all child items unless overridden per item.' },
    ],
    usedBy: [
        { slug: 'timeline', name: 'Timeline', kind: 'component' },
        { slug: 'timeline-item', name: 'TimelineItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Timeline/timeline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_timeline_context.example',
            titleFallback: 'Injecting timeline context in a child item',
            code: `import { inject } from 'vue'
import { TIMELINE_CONTEXT_KEY } from 'origam/consts'
import type { ITimelineContext } from 'origam'

const ctx = inject<ITimelineContext>(TIMELINE_CONTEXT_KEY)`,
            lang: 'typescript',
        },
    ],
}
