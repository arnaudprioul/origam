import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const FOCUS_LOCATION_ENUM_DOC: IEnumDoc = {
    slug: 'focus-location',
    name: 'FOCUS_LOCATION',
    category: 'Interaction',
    descriptionKey: 'enums.catalog.focus_location.description',
    descriptionFallback: 'Enum describing focus navigation directions within a component (next, prev, first, last).',
    definition: `export enum FOCUS_LOCATION {
    NEXT  = 'next',
    PREV  = 'prev',
    FIRST = 'first',
    LAST  = 'last',
}`,
    values: [
        { value: 'FOCUS_LOCATION.NEXT', descriptionKey: 'enums.detail.focus_location.next', descriptionFallback: 'Move focus to the next focusable item.' },
        { value: 'FOCUS_LOCATION.PREV', descriptionKey: 'enums.detail.focus_location.prev', descriptionFallback: 'Move focus to the previous focusable item.' },
        { value: 'FOCUS_LOCATION.FIRST', descriptionKey: 'enums.detail.focus_location.first', descriptionFallback: 'Move focus to the first focusable item.' },
        { value: 'FOCUS_LOCATION.LAST', descriptionKey: 'enums.detail.focus_location.last', descriptionFallback: 'Move focus to the last focusable item.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Commons/commons.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.focus_location.example',
            titleFallback: 'Using FOCUS_LOCATION in script setup',
            code: `import { FOCUS_LOCATION } from 'origam'

const direction: FOCUS_LOCATION = FOCUS_LOCATION.NEXT`,
            lang: 'typescript',
        },
    ],
}
