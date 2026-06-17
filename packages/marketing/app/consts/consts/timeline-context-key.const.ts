import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const TIMELINE_CONTEXT_KEY_CONST_DOC: IConstDoc = {
    slug: 'timeline-context-key',
    name: 'TIMELINE_CONTEXT_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.timeline_context_key.description',
    descriptionFallback: 'Vue InjectionKey used to provide and inject the ITimelineContext between OrigamTimeline and its OrigamTimelineItem children.',
    definition: `export const TIMELINE_CONTEXT_KEY: InjectionKey<ITimelineContext | null> = Symbol.for('origam:timeline')`,
    value: `Symbol.for('origam:timeline')`,
    usedBy: [
        { name: 'OrigamTimeline', slug: 'timeline' },
        { name: 'OrigamTimelineItem', slug: 'timeline-item' },
    ],
    sourceFile: 'packages/ds/src/consts/Timeline/timeline.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.timeline_context_key.example',
            titleFallback: 'Inject the timeline context in a custom child',
            code: `import { inject } from 'vue'
import { TIMELINE_CONTEXT_KEY } from 'origam'

const timeline = inject(TIMELINE_CONTEXT_KEY, null)`,
            lang: 'typescript',
        },
    ],
}
