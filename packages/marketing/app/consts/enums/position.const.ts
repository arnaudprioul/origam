import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'position',
    name: 'POSITION',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.position.description',
    descriptionFallback: 'TypeScript enum for CSS position strategy — static, relative, fixed, absolute, or sticky.',
    definition: `export enum POSITION {
    STATIC   = 'static',
    RELATIVE = 'relative',
    FIXED    = 'fixed',
    ABSOLUTE = 'absolute',
    STICKY   = 'sticky'
}`,
    values: [
        { value: 'POSITION.STATIC', descriptionKey: 'enums.detail.position.static', descriptionFallback: 'Default flow position — top/left/right/bottom/z-index have no effect.' },
        { value: 'POSITION.RELATIVE', descriptionKey: 'enums.detail.position.relative', descriptionFallback: 'Element is offset relative to its normal position in the flow.' },
        { value: 'POSITION.FIXED', descriptionKey: 'enums.detail.position.fixed', descriptionFallback: 'Element is removed from flow and positioned relative to the viewport.' },
        { value: 'POSITION.ABSOLUTE', descriptionKey: 'enums.detail.position.absolute', descriptionFallback: 'Element is removed from flow and positioned relative to its closest positioned ancestor.' },
        { value: 'POSITION.STICKY', descriptionKey: 'enums.detail.position.sticky', descriptionFallback: 'Element is treated as relative until it crosses a defined scroll threshold, then fixed.' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', propName: 'position' },
        { slug: 'navigation-drawer', name: 'NavigationDrawer', propName: 'position' },
        { slug: 'toolbar', name: 'Toolbar', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/position.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.position.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { POSITION } from 'origam'

const pos: POSITION = POSITION.STICKY`,
            lang: 'typescript',
        },
    ],
}
