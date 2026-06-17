import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ROOT_ZINDEX_CONST_DOC: IConstDoc = {
    slug: 'root-zindex',
    name: 'ROOT_ZINDEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.root_zindex.description',
    descriptionFallback: 'Base z-index value (1000) from which all overlay components (Overlay, Menu, Tooltip, Dialog…) derive their stacking level. Overlays stack incrementally above this floor.',
    definition: `export const ROOT_ZINDEX = 1000`,
    value: '1000',
    usedBy: [
        { name: 'useLayout' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/layout.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.root_zindex.example',
            titleFallback: 'Reading the base z-index',
            code: `import { ROOT_ZINDEX } from 'origam'

// Custom overlay stacked above the DS base
const myOverlayZIndex = ROOT_ZINDEX + 50`,
            lang: 'typescript',
        },
    ],
}
