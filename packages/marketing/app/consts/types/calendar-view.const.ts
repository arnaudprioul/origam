import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CALENDAR_VIEW_TYPE_DOC: ITypeDoc = {
    slug: 'calendar-view',
    name: 'TCalendarView',
    kind: 'type',
    category: 'Time & Calendar',
    descriptionKey: 'types.catalog.calendar_view.description',
    descriptionFallback: 'Calendar display mode: month, week, day, or agenda.',
    definition: `export type TCalendarView = 'month' | 'week' | 'day' | 'agenda'`,
    values: [
        { value: 'month', descriptionKey: 'types.detail.calendar_view.month', descriptionFallback: '6×7 day grid — the canonical month-at-a-glance view.' },
        { value: 'week', descriptionKey: 'types.detail.calendar_view.week', descriptionFallback: '7-column vertical timeline with one row per time slot.' },
        { value: 'day', descriptionKey: 'types.detail.calendar_view.day', descriptionFallback: 'Single-column vertical timeline zoomed into one day.' },
        { value: 'agenda', descriptionKey: 'types.detail.calendar_view.agenda', descriptionFallback: 'Flat list grouped by day — optimal for screen readers and dense schedules.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', propName: 'view' },
    ],
    sourceFile: 'packages/ds/src/types/Calendar/calendar-view.type.ts',
    examples: [
        {
            titleKey: 'types.detail.calendar_view.example',
            titleFallback: 'Calendar week view',
            code: `<origam-calendar view="week" :events="myEvents" />`,
            lang: 'html',
        },
    ],
}
