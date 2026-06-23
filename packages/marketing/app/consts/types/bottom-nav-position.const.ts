import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BOTTOM_NAV_POSITION_TYPE_DOC: ITypeDoc = {
    slug: 'bottom-nav-position',
    name: 'TBottomNavPosition',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.bottom_nav_position.description',
    descriptionFallback: 'Horizontal alignment of the bottom navigation bar when it does not span the full width.',
    definition: `export type TBottomNavPosition = \`\${BOTTOM_NAV_POSITION}\`

// Where BOTTOM_NAV_POSITION is:
export enum BOTTOM_NAV_POSITION {
    START  = 'start',
    CENTER = 'center',
    END    = 'end'
}`,
    values: [
        { value: 'start', descriptionKey: 'types.detail.bottom_nav_position.start', descriptionFallback: 'Aligns the bar to the inline-start edge (left in LTR).' },
        { value: 'center', descriptionKey: 'types.detail.bottom_nav_position.center', descriptionFallback: 'Centers the bar horizontally within the layout region.' },
        { value: 'end', descriptionKey: 'types.detail.bottom_nav_position.end', descriptionFallback: 'Aligns the bar to the inline-end edge (right in LTR).' },
    ],
    usedBy: [
        { slug: 'bottom-nav', name: 'BottomNav', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/enums/BottomNav/bottom-nav-position.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.bottom_nav_position.example',
            titleFallback: 'Bottom navigation centered with custom width',
            code: `<origam-bottom-nav position="center" width="480">
  <origam-btn>Home</origam-btn>
  <origam-btn>Search</origam-btn>
  <origam-btn>Profile</origam-btn>
</origam-bottom-nav>`,
            lang: 'html',
        },
    ],
}
