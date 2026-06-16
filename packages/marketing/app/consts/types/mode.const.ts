import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const MODE_TYPE_DOC: ITypeDoc = {
    slug: 'mode',
    name: 'TMode',
    kind: 'type',
    category: 'Interaction & State',
    descriptionKey: 'types.catalog.mode.description',
    descriptionFallback: 'Display mode for BottomNav: horizontal, vertical, or shift.',
    definition: `export type TMode = \`\${MODE}\`

// Where MODE is:
export enum MODE {
    HORIZONTAL = 'horizontal',
    VERTICAL   = 'vertical',
    SHIFT      = 'shift'
}`,
    values: [
        { value: 'horizontal', descriptionKey: 'types.detail.mode.horizontal', descriptionFallback: 'Horizontal layout — icon and label side by side.' },
        { value: 'vertical', descriptionKey: 'types.detail.mode.vertical', descriptionFallback: 'Vertical layout — icon above label.' },
        { value: 'shift', descriptionKey: 'types.detail.mode.shift', descriptionFallback: 'Shift mode — active item expands, inactive items show icon only.' },
    ],
    usedBy: [
        { slug: 'bottom-nav', name: 'BottomNav', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/mode.type.ts',
    examples: [
        {
            titleKey: 'types.detail.mode.example',
            titleFallback: 'BottomNav shift mode',
            code: `<origam-bottom-nav mode="shift">
  <origam-btn icon="mdi-home">Home</origam-btn>
  <origam-btn icon="mdi-magnify">Search</origam-btn>
</origam-bottom-nav>`,
            lang: 'html',
        },
    ],
}
