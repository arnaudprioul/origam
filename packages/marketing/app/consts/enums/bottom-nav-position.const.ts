import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BOTTOM_NAV_POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'bottom-nav-position',
    name: 'BOTTOM_NAV_POSITION',
    category: 'Navigation',
    descriptionKey: 'enums.catalog.bottom_nav_position.description',
    descriptionFallback: 'TypeScript enum for horizontal placement of the BottomNav bar when it does not span full width (start, center, end).',
    definition: `export enum BOTTOM_NAV_POSITION {
    START  = 'start',
    CENTER = 'center',
    END    = 'end',
}`,
    values: [
        { value: 'BOTTOM_NAV_POSITION.START', descriptionKey: 'enums.detail.bottom_nav_position.start', descriptionFallback: 'Align the bottom nav to the inline-start (left in LTR) of the layout region.' },
        { value: 'BOTTOM_NAV_POSITION.CENTER', descriptionKey: 'enums.detail.bottom_nav_position.center', descriptionFallback: 'Center the bottom nav horizontally in the layout region.' },
        { value: 'BOTTOM_NAV_POSITION.END', descriptionKey: 'enums.detail.bottom_nav_position.end', descriptionFallback: 'Align the bottom nav to the inline-end (right in LTR) of the layout region.' },
    ],
    usedBy: [
        { slug: 'bottom-nav', name: 'BottomNav', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/enums/BottomNav/bottom-nav-position.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.bottom_nav_position.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BOTTOM_NAV_POSITION } from 'origam'

const position: BOTTOM_NAV_POSITION = BOTTOM_NAV_POSITION.CENTER`,
            lang: 'typescript',
        },
    ],
}
