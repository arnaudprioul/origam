import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_R_RULE_UTIL_DOC: IUtilDoc = {
    slug: 'parse-r-rule',
    name: 'parseRRule',
    category: 'Calendar',
    icon: 'mdi-calendar-refresh-outline',
    descriptionKey: 'utils.catalog.parse_r_rule.description',
    descriptionFallback: 'Parse a raw RFC 5545 RRULE string into a normalised `IParsedRule` object, or return `null` when the directive is malformed or uses an unsupported `FREQ` value. Supports `DAILY`, `WEEKLY`, and `MONTHLY` frequencies.',
    signature: `function parseRRule(rrule: string): IParsedRule | null`,
    params: [
        {
            name: 'rrule',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_r_rule.param_rrule',
            descriptionFallback: 'A raw RRULE string with or without the `RRULE:` prefix (e.g. `"RRULE:FREQ=WEEKLY;BYDAY=MO,WE;COUNT=10"` or `"FREQ=MONTHLY;INTERVAL=2"`). Semicolon-separated key=value pairs are parsed case-insensitively.',
        },
    ],
    returns: {
        type: 'IParsedRule | null',
        descriptionKey: 'utils.detail.parse_r_rule.returns',
        descriptionFallback: 'A normalised `{ freq, interval, count, until, byDay }` object on success, or `null` when the input is empty, malformed, or uses an unsupported frequency. Callers should fall back to single-occurrence rendering on `null`.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/rrule.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_r_rule.example_basic',
            titleFallback: 'Parse a weekly recurrence rule',
            code: `import { parseRRule } from 'origam'

parseRRule('RRULE:FREQ=WEEKLY;BYDAY=MO,WE;COUNT=10')
// → {
//   freq: 'WEEKLY',
//   interval: 1,
//   count: 10,
//   until: null,
//   byDay: [1, 3]   // Monday=1, Wednesday=3
// }

parseRRule('FREQ=YEARLY')  // → null (unsupported FREQ)`,
            lang: 'typescript',
        },
    ],
    related: ['expand-recurrence', 'parse-iso', 'parse-local-date'],
}
