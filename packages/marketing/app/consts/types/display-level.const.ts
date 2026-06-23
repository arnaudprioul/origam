import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const DISPLAY_LEVEL_TYPE_DOC: ITypeDoc = {
    slug: 'display-level',
    name: 'TDisplayLevel',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.display_level.description',
    descriptionFallback: 'Responsive breakpoint threshold prop — accepts a named breakpoint key or a raw pixel width, below which the component switches to its mobile behaviour.',
    definition: `// number: raw pixel threshold
// TBreakpoint: one of the named breakpoints from the BREAKPOINTS enum
type TDisplayLevel = number | TBreakpoint

// Where TBreakpoint is:
export type TBreakpoint = \`\${BREAKPOINTS}\`

export enum BREAKPOINTS {
    XS  = 'xs',
    SM  = 'sm',
    MD  = 'md',
    LG  = 'lg',
    XL  = 'xl',
    XXL = 'xxl',
}`,
    values: [
        { value: 'xs', descriptionKey: 'types.detail.display_level.xs', descriptionFallback: 'Extra-small breakpoint — typically < 600 px.' },
        { value: 'sm', descriptionKey: 'types.detail.display_level.sm', descriptionFallback: 'Small breakpoint — typically 600–959 px.' },
        { value: 'md', descriptionKey: 'types.detail.display_level.md', descriptionFallback: 'Medium breakpoint — typically 960–1279 px.' },
        { value: 'lg', descriptionKey: 'types.detail.display_level.lg', descriptionFallback: 'Large breakpoint — typically 1280–1919 px.' },
        { value: 'xl', descriptionKey: 'types.detail.display_level.xl', descriptionFallback: 'Extra-large breakpoint — typically 1920–2559 px.' },
        { value: 'xxl', descriptionKey: 'types.detail.display_level.xxl', descriptionFallback: 'Double extra-large breakpoint — typically ≥ 2560 px.' },
        { value: '<number>', descriptionKey: 'types.detail.display_level.number', descriptionFallback: 'Any integer pixel value used as a custom mobile threshold.' },
    ],
    usedBy: [
        { slug: 'slide', name: 'Slide', propName: 'mobileBreakpoint' },
        { slug: 'data-table', name: 'DataTable', propName: 'mobileBreakpoint' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/display.type.ts',
    examples: [
        {
            titleKey: 'types.detail.display_level.example_named',
            titleFallback: 'Hide arrows below the sm breakpoint',
            code: `<origam-slide-group :mobile-breakpoint="'sm'" show-arrows>
  <!-- slide items -->
</origam-slide-group>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.display_level.example_number',
            titleFallback: 'Custom pixel threshold',
            code: `<origam-slide-group :mobile-breakpoint="768" show-arrows>
  <!-- slide items -->
</origam-slide-group>`,
            lang: 'html',
        },
    ],
}
