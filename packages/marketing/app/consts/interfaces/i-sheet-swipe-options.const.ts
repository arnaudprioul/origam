import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SHEET_SWIPE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sheet-swipe-options',
    name: 'ISheetSwipeOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_sheet_swipe_options.description',
    descriptionFallback: 'Options bag passed to useSheetSwipe() — the bottom-sheet drag gesture composable. Wires reactive refs for the sheet element, the drag handle, snap-points, and behavioural flags.',
    definition: `export interface ISheetSwipeOptions {
    el: Ref<HTMLElement | null | undefined>
    handle: Ref<HTMLElement | null | undefined>
    snapPoints?: Ref<ReadonlyArray<TSheetSnapPoint>>
    defaultSnap?: Ref<TSheetSnapId>
    disabled?: Ref<boolean | undefined>
    persistent?: Ref<boolean | undefined>
}`,
    extends: [],
    props: [
        { name: 'el', type: 'Ref<HTMLElement | null | undefined>', optional: false, descriptionFallback: 'The sheet root element — used to read its current rendered height.' },
        { name: 'handle', type: 'Ref<HTMLElement | null | undefined>', optional: false, descriptionFallback: 'The drag-handle element — pointer events bind to this only, keeping the sheet body interactive.' },
        { name: 'snapPoints', type: 'Ref<ReadonlyArray<TSheetSnapPoint>>', optional: true, descriptionFallback: 'Ordered list of snap points (any order; the composable sorts them). Defaults to closed / peek / half / full.' },
        { name: 'defaultSnap', type: 'Ref<TSheetSnapId>', optional: true, descriptionFallback: 'Initial snap id; defaults to "half".' },
        { name: 'disabled', type: 'Ref<boolean | undefined>', optional: true, descriptionFallback: 'When true, ignore pointer events entirely.' },
        { name: 'persistent', type: 'Ref<boolean | undefined>', optional: true, descriptionFallback: 'When true, dragging past closed snaps back instead of dismissing.' },
    ],
    usedBy: [
        { slug: 'use-sheet-swipe', name: 'useSheetSwipe', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Sheet/sheet-swipe-options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sheet_swipe_options.example',
            titleFallback: 'Passing options to useSheetSwipe',
            code: `import { useSheetSwipe } from 'origam'
import type { ISheetSwipeOptions } from 'origam'

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

const opts: ISheetSwipeOptions = { el, handle }
const { currentSnap, snapTo } = useSheetSwipe(opts)`,
            lang: 'typescript',
        },
    ],
}
