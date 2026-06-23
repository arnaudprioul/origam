import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GENERATE_LAYERS_UTIL_DOC: IUtilDoc = {
    slug: 'generate-layers',
    name: 'generateLayers',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.generate_layers.description',
    descriptionFallback: 'Compute the cumulative layout offset layers for the Origam layout system. Each registered layout item (AppBar, NavigationDrawer, Footer…) contributes its size to the running totals for its side (top/bottom/left/right), producing a cascade of offset objects used by the layout composable.',
    signature: `function generateLayers(
  layout: Array<string>,
  positions: Map<string, Ref<TDirectionBoth>>,
  layoutSizes: Map<string, Ref<number | string>>,
  activeItems: Map<string, Ref<boolean>>
): Array<{ id: string; layer: ILayer }>`,
    params: [
        {
            name: 'layout',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.generate_layers.param_layout',
            descriptionFallback: 'Ordered list of layout item IDs. Items are stacked in this order.',
        },
        {
            name: 'positions',
            type: 'Map<string, Ref<TDirectionBoth>>',
            required: true,
            descriptionKey: 'utils.detail.generate_layers.param_positions',
            descriptionFallback: 'Map from layout item ID to its anchored side (top | bottom | left | right).',
        },
        {
            name: 'layoutSizes',
            type: 'Map<string, Ref<number | string>>',
            required: true,
            descriptionKey: 'utils.detail.generate_layers.param_layout_sizes',
            descriptionFallback: 'Map from layout item ID to its rendered size on its anchor axis (pixels or CSS length).',
        },
        {
            name: 'activeItems',
            type: 'Map<string, Ref<boolean>>',
            required: true,
            descriptionKey: 'utils.detail.generate_layers.param_active_items',
            descriptionFallback: 'Map from layout item ID to its visibility state. Inactive items contribute 0 to the offset.',
        },
    ],
    returns: {
        type: 'Array<{ id: string; layer: ILayer }>',
        descriptionKey: 'utils.detail.generate_layers.returns',
        descriptionFallback: 'Ordered array of layer snapshots. Each entry holds the ID and the cumulative ILayer offsets at that point in the stack.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/layout.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.generate_layers.example_basic',
            titleFallback: 'Compute layout offsets for AppBar + Footer',
            code: `import { generateLayers } from 'origam'
import { ref } from 'vue'

const layers = generateLayers(
  ['appbar', 'footer'],
  new Map([['appbar', ref('top')], ['footer', ref('bottom')]]),
  new Map([['appbar', ref(64)],   ['footer', ref(56)]]),
  new Map([['appbar', ref(true)], ['footer', ref(true)]])
)
// layers[1].layer → { top: 64, left: 0, right: 0, bottom: 0 }
// layers[2].layer → { top: 64, left: 0, right: 0, bottom: 56 }`,
            lang: 'typescript',
        },
    ],
    related: ['gen-defaults', 'merge-deep'],
}
