import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CALENDAR_STRATEGY_ENUM_DOC: IEnumDoc = {
    slug: 'calendar-strategy',
    name: 'CALENDAR_STRATEGY',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.calendar_strategy.description',
    descriptionFallback: 'TypeScript enum for the rendering strategy of the date picker calendar (dynamic, static).',
    definition: `export enum CALENDAR_STRATEGY {
    DYNAMIC = 'dynamic',
    STATIC  = 'static',
}`,
    values: [
        { value: 'CALENDAR_STRATEGY.DYNAMIC', descriptionKey: 'enums.detail.calendar_strategy.dynamic', descriptionFallback: 'Dynamic — the calendar renders on demand inside a floating overlay.' },
        { value: 'CALENDAR_STRATEGY.STATIC', descriptionKey: 'enums.detail.calendar_strategy.static', descriptionFallback: 'Static — the calendar is permanently visible inline, not in an overlay.' },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'DatePicker', propName: 'strategy' },
        { slug: 'date-picker-month', name: 'DatePickerMonth', propName: 'strategy' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/calendar.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.calendar_strategy.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CALENDAR_STRATEGY } from 'origam'

const strategy: CALENDAR_STRATEGY = CALENDAR_STRATEGY.STATIC`,
            lang: 'typescript',
        },
    ],
}
