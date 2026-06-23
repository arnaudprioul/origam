import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const MODE_ENUM_DOC: IEnumDoc = {
    slug: 'mode',
    name: 'MODE',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.mode.description',
    descriptionFallback: 'Scroll / expand axis for components like InfiniteScroll and Transition (horizontal, vertical, shift).',
    definition: `export enum MODE {
    HORIZONTAL = 'horizontal',
    VERTICAL   = 'vertical',
    SHIFT      = 'shift',
}`,
    values: [
        { value: 'MODE.HORIZONTAL', descriptionKey: 'enums.detail.mode.horizontal', descriptionFallback: 'Operate along the horizontal axis.' },
        { value: 'MODE.VERTICAL', descriptionKey: 'enums.detail.mode.vertical', descriptionFallback: 'Operate along the vertical axis.' },
        { value: 'MODE.SHIFT', descriptionKey: 'enums.detail.mode.shift', descriptionFallback: 'Shift mode — translates content diagonally or based on pointer delta.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'mode (internal)' },
        { slug: 'expand-x', name: 'ExpandX', propName: 'mode' },
        { slug: 'expand-y', name: 'ExpandY', propName: 'mode' },
        { slug: 'translate-scale', name: 'TranslateScale', propName: 'mode' },
        { slug: 'date-picker', name: 'DatePicker', propName: 'mode' },
        { slug: 'select', name: 'Select', propName: 'mode' },
        { slug: 'chart-map', name: 'ChartMap', propName: 'mode' },
        { slug: 'chart-pictorial', name: 'ChartPictorial', propName: 'mode' },
        { slug: 'textarea-field', name: 'TextareaField', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.mode.example',
            titleFallback: 'Using MODE in script setup',
            code: `import { MODE } from 'origam'

const scrollMode: MODE = MODE.VERTICAL`,
            lang: 'typescript',
        },
    ],
}
