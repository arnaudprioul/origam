import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const LINES_TYPE_DOC: ITypeDoc = {
    slug: 'lines',
    name: 'TLines',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.lines.description',
    descriptionFallback: 'Number of lines of text a list item subtitle can occupy before being truncated — controls the vertical density of OrigamList and OrigamListItem.',
    definition: `export type TLines = \`\${LINES}\`

// Where LINES is:
export enum LINES {
    ONE   = 'one',
    TWO   = 'two',
    THREE = 'three'
}`,
    values: [
        { value: 'one', descriptionKey: 'types.detail.lines.one', descriptionFallback: 'Single-line item — subtitle clamps to 1 line. Most compact layout.' },
        { value: 'two', descriptionKey: 'types.detail.lines.two', descriptionFallback: 'Two-line item — subtitle wraps to at most 2 lines. Default for rich lists.' },
        { value: 'three', descriptionKey: 'types.detail.lines.three', descriptionFallback: 'Three-line item — subtitle wraps to at most 3 lines. Suitable for content-heavy lists.' },
    ],
    usedBy: [
        { slug: 'list', name: 'List', propName: 'lines' },
        { slug: 'list-item', name: 'ListItem', propName: 'lines' },
    ],
    sourceFile: 'packages/ds/src/types/List/list.type.ts',
    examples: [
        {
            titleKey: 'types.detail.lines.example',
            titleFallback: 'List with two-line items',
            code: `<origam-list lines="two">
  <origam-list-item
    title="Design system"
    subtitle="A collection of reusable components guided by clear standards."
  />
  <origam-list-item
    title="Accessibility"
    subtitle="Built-in ARIA, focus management and keyboard navigation."
  />
</origam-list>`,
            lang: 'html',
        },
    ],
}
