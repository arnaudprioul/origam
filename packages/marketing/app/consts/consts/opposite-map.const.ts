import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const OPPOSITE_MAP_CONST_DOC: IConstDoc = {
    slug: 'opposite-map',
    name: 'OPPOSITE_MAP',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.opposite_map.description',
    descriptionFallback: 'Lookup table that maps each TLocation value to its geometric opposite. Used by the connected location strategy to flip a floating element when there is not enough space on the preferred side.',
    definition: `export const OPPOSITE_MAP = {
    center: 'center',
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    start: 'right',
    end: 'left'
}`,
    values: [
        { value: "center: 'center'", descriptionKey: 'consts.detail.opposite_map.center', descriptionFallback: 'center stays center (no geometric opposite).' },
        { value: "top: 'bottom'", descriptionKey: 'consts.detail.opposite_map.top', descriptionFallback: 'Opposite of top is bottom.' },
        { value: "bottom: 'top'", descriptionKey: 'consts.detail.opposite_map.bottom', descriptionFallback: 'Opposite of bottom is top.' },
        { value: "left: 'right'", descriptionKey: 'consts.detail.opposite_map.left', descriptionFallback: 'Opposite of left is right.' },
        { value: "right: 'left'", descriptionKey: 'consts.detail.opposite_map.right', descriptionFallback: 'Opposite of right is left.' },
        { value: "start: 'right'", descriptionKey: 'consts.detail.opposite_map.start', descriptionFallback: 'start (logical) maps to the physical right in the default LTR direction.' },
        { value: "end: 'left'", descriptionKey: 'consts.detail.opposite_map.end', descriptionFallback: 'end (logical) maps to the physical left in the default LTR direction.' },
    ],
    usedBy: [
        { name: 'useLocation' },
        { name: 'connectedLocationStrategy' },
        { name: 'OrigamMenu', slug: 'menu' },
        { name: 'OrigamTooltip', slug: 'tooltip' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/location.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.opposite_map.example',
            titleFallback: 'Flipping a placement when out of bounds',
            code: `import { OPPOSITE_MAP } from 'origam'

type TLocation = keyof typeof OPPOSITE_MAP

function flip(location: TLocation): TLocation {
  return OPPOSITE_MAP[location] as TLocation
}

flip('top')    // 'bottom'
flip('left')   // 'right'`,
            lang: 'typescript',
        },
    ],
}
