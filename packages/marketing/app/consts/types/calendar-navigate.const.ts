import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CALENDAR_NAVIGATE_TYPE_DOC: ITypeDoc = {
    slug: 'calendar-navigate',
    name: 'TCalendarNavigate',
    kind: 'type',
    category: 'Time & Calendar',
    descriptionKey: 'types.catalog.calendar_navigate.description',
    descriptionFallback: 'Navigation direction for the calendar toolbar and the navigate event: move to the previous period, next period, or jump to today.',
    definition: `export type TCalendarNavigate = 'prev' | 'next' | 'today'`,
    values: [
        { value: 'prev', descriptionKey: 'types.detail.calendar_navigate.prev', descriptionFallback: 'Moves the calendar back by one period (month, week, or day depending on the active view).' },
        { value: 'next', descriptionKey: 'types.detail.calendar_navigate.next', descriptionFallback: 'Advances the calendar forward by one period.' },
        { value: 'today', descriptionKey: 'types.detail.calendar_navigate.today', descriptionFallback: 'Jumps the calendar to the current date regardless of which period is currently displayed.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', propName: 'navigate (event)' },
    ],
    sourceFile: 'packages/ds/src/types/Calendar/calendar-time-format.type.ts',
    examples: [
        {
            titleKey: 'types.detail.calendar_navigate.example',
            titleFallback: 'Listening to the navigate event',
            code: `<origam-calendar
  :events="events"
  @navigate="(dir) => console.log('navigated:', dir)"
/>`,
            lang: 'html',
        },
    ],
}
