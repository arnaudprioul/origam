import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GRID_DEFAULTS_CONST_DOC: IConstDoc = {
    slug: 'grid-defaults',
    name: 'GRID_DEFAULTS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.grid_defaults.description',
    descriptionFallback: 'Default prop values used by OrigamGrid and its sub-components. Exposes the baseline settings (columns: auto, rows: auto, gap: md, autoFlow: row, alignItems: stretch, justifyItems: stretch, inline: false, tag: div) so consumers can reference them when authoring wrappers.',
    definition: `export const GRID_DEFAULTS = {
    columns:      'auto',
    rows:         'auto',
    gap:          'md',
    autoFlow:     'row',
    alignItems:   'stretch',
    justifyItems: 'stretch',
    inline:       false,
    tag:          'div'
} as const`,
    values: [
        { value: "columns: 'auto'", descriptionKey: 'consts.detail.grid_defaults.columns', descriptionFallback: 'Default grid-template-columns — browser auto-placement.' },
        { value: "rows: 'auto'", descriptionKey: 'consts.detail.grid_defaults.rows', descriptionFallback: 'Default grid-template-rows — browser auto-placement.' },
        { value: "gap: 'md'", descriptionKey: 'consts.detail.grid_defaults.gap', descriptionFallback: 'Default gap token — medium spacing.' },
        { value: "autoFlow: 'row'", descriptionKey: 'consts.detail.grid_defaults.auto_flow', descriptionFallback: 'Default auto-flow direction — row.' },
        { value: "alignItems: 'stretch'", descriptionKey: 'consts.detail.grid_defaults.align_items', descriptionFallback: 'Default align-items — stretch to fill the cell.' },
        { value: "justifyItems: 'stretch'", descriptionKey: 'consts.detail.grid_defaults.justify_items', descriptionFallback: 'Default justify-items — stretch to fill the cell.' },
        { value: 'inline: false', descriptionKey: 'consts.detail.grid_defaults.inline', descriptionFallback: 'Renders as block (display: grid) by default.' },
        { value: "tag: 'div'", descriptionKey: 'consts.detail.grid_defaults.tag', descriptionFallback: 'Default HTML tag for the grid root element.' },
    ],
    usedBy: [
        { name: 'OrigamGrid', slug: 'grid' },
        { name: 'GRID_AUTO_FLOWS' },
    ],
    sourceFile: 'packages/ds/src/consts/Grid/grid.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.grid_defaults.example',
            titleFallback: 'Referencing defaults in a wrapper component',
            code: `import { GRID_DEFAULTS } from 'origam'

const props = withDefaults(defineProps<IMyGridProps>(), {
  gap:      GRID_DEFAULTS.gap,      // 'md'
  autoFlow: GRID_DEFAULTS.autoFlow  // 'row'
})`,
            lang: 'typescript',
        },
    ],
}
