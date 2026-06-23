import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EXPAND_RECURRENCE_UTIL_DOC: IUtilDoc = {
    slug: 'expand-recurrence',
    name: 'expandRecurrence',
    category: 'Calendar',
    icon: 'mdi-repeat',
    descriptionKey: 'utils.catalog.expand_recurrence.description',
    descriptionFallback: 'Expands a single calendar event with an optional RRULE string into all occurrences that fall within a given date range. Supports a minimal RFC 5545 subset (FREQ=DAILY|WEEKLY|MONTHLY, INTERVAL, COUNT, UNTIL, BYDAY). Non-recurring events are returned as-is when they overlap the range.',
    signature: `function expandRecurrence(
  event: IEvent,
  range: { start: Date, end: Date }
): Array<IEvent>`,
    params: [
        {
            name: 'event',
            type: 'IEvent',
            required: true,
            descriptionKey: 'utils.detail.expand_recurrence.param_event',
            descriptionFallback: 'The calendar event to expand. If it has an rrule string, occurrences are generated; otherwise it is returned as-is (filtered against the range).',
        },
        {
            name: 'range',
            type: '{ start: Date, end: Date }',
            required: true,
            descriptionKey: 'utils.detail.expand_recurrence.param_range',
            descriptionFallback: 'The visible date window. Only occurrences that overlap this range are included in the result.',
        },
    ],
    returns: {
        type: 'Array<IEvent>',
        descriptionKey: 'utils.detail.expand_recurrence.returns',
        descriptionFallback: 'An array of event copies (one per occurrence) that fall within the range. Empty array when no occurrences match.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/rrule.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.expand_recurrence.example_basic',
            titleFallback: 'Weekly recurrence over a month',
            code: `import { expandRecurrence } from 'origam'

const event = {
    id: '1',
    title: 'Stand-up',
    start: '2024-06-03T09:00:00',
    end:   '2024-06-03T09:15:00',
    rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR',
}

const range = { start: new Date('2024-06-01'), end: new Date('2024-06-30') }
const occurrences = expandRecurrence(event, range)
// → array of cloned events for every Mon, Wed, Fri in June`,
            lang: 'typescript',
        },
    ],
    related: ['each-day-of-interval', 'diff-minutes'],
    noteKey: 'utils.detail.expand_recurrence.note',
    noteFallback: 'Only FREQ=DAILY|WEEKLY|MONTHLY, INTERVAL, COUNT, UNTIL, and BYDAY are supported. Other RFC 5545 directives (BYMONTHDAY, EXDATE, …) are silently ignored.',
}
