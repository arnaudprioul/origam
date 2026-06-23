import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SELECTED_ENUM_DOC: IEnumDoc = {
    slug: 'selected',
    name: 'SELECTED',
    category: 'Behavior',
    descriptionKey: 'enums.catalog.selected.description',
    descriptionFallback: 'TypeScript enum for tri-state selection — on, off, or indeterminate.',
    definition: `export enum SELECTED {
    ON            = 'on',
    OFF           = 'off',
    INDETERMINATE = 'indeterminate'
}`,
    values: [
        { value: 'SELECTED.ON', descriptionKey: 'enums.detail.selected.on', descriptionFallback: 'The item is fully selected.' },
        { value: 'SELECTED.OFF', descriptionKey: 'enums.detail.selected.off', descriptionFallback: 'The item is not selected.' },
        { value: 'SELECTED.INDETERMINATE', descriptionKey: 'enums.detail.selected.indeterminate', descriptionFallback: 'The item is in a mixed/partial selection state — typically used for parent nodes in tree views.' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', propName: 'selected' },
        { slug: 'checkbox', name: 'Checkbox', propName: 'indeterminate' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/nested.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.selected.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SELECTED } from 'origam'

const state: SELECTED = SELECTED.INDETERMINATE`,
            lang: 'typescript',
        },
    ],
}
