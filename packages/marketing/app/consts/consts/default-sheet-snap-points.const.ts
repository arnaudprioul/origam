import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_SHEET_SNAP_POINTS_CONST_DOC: IConstDoc = {
    slug: 'default-sheet-snap-points',
    name: 'DEFAULT_SHEET_SNAP_POINTS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.default_sheet_snap_points.description',
    descriptionFallback: 'Default snap-point set used by OrigamSheet when the consumer does not pass custom snap points. Defines four positions: closed (0), peek (120px), half (50vh), and full (90vh).',
    definition: `export const DEFAULT_SHEET_SNAP_POINTS: ReadonlyArray<TSheetSnapPoint> = [
    { id: 'closed', height: 0 },
    { id: 'peek',   height: '120px' },
    { id: 'half',   height: '50vh' },
    { id: 'full',   height: '90vh' }
] as const`,
    values: [
        { value: "{ id: 'closed', height: 0 }", descriptionKey: 'consts.detail.default_sheet_snap_points.closed', descriptionFallback: 'Collapses the sheet height to zero — the parent is responsible for unmounting.' },
        { value: "{ id: 'peek', height: '120px' }", descriptionKey: 'consts.detail.default_sheet_snap_points.peek', descriptionFallback: 'Shows ~120 px of content (drag handle + teaser line).' },
        { value: "{ id: 'half', height: '50vh' }", descriptionKey: 'consts.detail.default_sheet_snap_points.half', descriptionFallback: 'Roughly 50% of the viewport height.' },
        { value: "{ id: 'full', height: '90vh' }", descriptionKey: 'consts.detail.default_sheet_snap_points.full', descriptionFallback: 'Leaves a 10vh strip at the top so the underlying scrim is still dismissible.' },
    ],
    usedBy: [
        { name: 'OrigamSheet', slug: 'sheet' },
        { name: 'useSheet' },
    ],
    sourceFile: 'packages/ds/src/consts/Sheet/sheet-snap-points.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_sheet_snap_points.example',
            titleFallback: 'Overriding the snap points',
            code: `import { DEFAULT_SHEET_SNAP_POINTS } from 'origam'

// Add a custom "quarter" stop before "half"
const snapPoints = [
  DEFAULT_SHEET_SNAP_POINTS[0], // closed
  { id: 'quarter', height: '25vh' },
  ...DEFAULT_SHEET_SNAP_POINTS.slice(2)
]`,
            lang: 'typescript',
        },
    ],
}
