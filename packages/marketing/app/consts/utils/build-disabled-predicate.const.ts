import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BUILD_DISABLED_PREDICATE_UTIL_DOC: IUtilDoc = {
    slug: 'build-disabled-predicate',
    name: 'buildDisabledPredicate',
    category: 'Calendar',
    icon: 'mdi-calendar-remove-outline',
    descriptionKey: 'utils.catalog.build_disabled_predicate.description',
    descriptionFallback: 'Factory that normalises the disabledDates prop (array of Date | string, or a custom predicate) into a single (date: Date) => boolean function consumed by calendar cell builders.',
    signature: `function buildDisabledPredicate(
  input: Array<Date | string> | ((d: Date) => boolean) | undefined
): (date: Date) => boolean`,
    params: [
        {
            name: 'input',
            type: 'Array<Date | string> | ((d: Date) => boolean) | undefined',
            required: false,
            descriptionKey: 'utils.detail.build_disabled_predicate.param_input',
            descriptionFallback: 'Disabled dates as an array of Date / ISO string values, a custom predicate function, or undefined. When undefined, the returned predicate always returns false.',
        },
    ],
    returns: {
        type: '(date: Date) => boolean',
        descriptionKey: 'utils.detail.build_disabled_predicate.returns',
        descriptionFallback: 'A single predicate that returns true for any date that should be disabled in the calendar.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.build_disabled_predicate.example_array',
            titleFallback: 'Disable specific dates from an array',
            code: `import { buildDisabledPredicate } from 'origam'

const isDisabled = buildDisabledPredicate([
    new Date('2024-12-25'),
    '2024-12-31',
])

isDisabled(new Date('2024-12-25')) // → true
isDisabled(new Date('2024-12-24')) // → false`,
            lang: 'typescript',
        },
        {
            titleKey: 'utils.detail.build_disabled_predicate.example_fn',
            titleFallback: 'Pass a custom predicate directly',
            code: `import { buildDisabledPredicate } from 'origam'

const isDisabled = buildDisabledPredicate(
    (d) => d.getDay() === 0 || d.getDay() === 6 // weekends
)
isDisabled(new Date('2024-12-28')) // → true (Saturday)`,
            lang: 'typescript',
        },
    ],
    related: ['build-month-matrix', 'add-weeks'],
}
