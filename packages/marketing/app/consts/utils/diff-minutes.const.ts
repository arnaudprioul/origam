import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DIFF_MINUTES_UTIL_DOC: IUtilDoc = {
    slug: 'diff-minutes',
    name: 'diffMinutes',
    category: 'Calendar',
    icon: 'mdi-timer-outline',
    descriptionKey: 'utils.catalog.diff_minutes.description',
    descriptionFallback: 'Returns the difference between two dates expressed in minutes (positive when b is after a). Used by the calendar component for event-height calculations in week / day timelines.',
    signature: `function diffMinutes(a: Date, b: Date): number`,
    params: [
        {
            name: 'a',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.diff_minutes.param_a',
            descriptionFallback: 'The start date (reference).',
        },
        {
            name: 'b',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.diff_minutes.param_b',
            descriptionFallback: 'The end date. A positive value is returned when b is after a.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.diff_minutes.returns',
        descriptionFallback: 'The rounded difference in minutes between b and a. Negative when b is before a.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.diff_minutes.example_basic',
            titleFallback: 'Event duration in minutes',
            code: `import { diffMinutes } from 'origam'

const start = new Date('2024-06-01T09:00:00')
const end   = new Date('2024-06-01T10:30:00')

diffMinutes(start, end) // → 90`,
            lang: 'typescript',
        },
    ],
    related: ['each-day-of-interval', 'end-of-day'],
}
