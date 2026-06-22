import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SHEET_SWIPE_RETURN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sheet-swipe-return',
    name: 'ISheetSwipeReturn',
    category: 'Composable Return',
    descriptionKey: 'interfaces.catalog.i_sheet_swipe_return.description',
    descriptionFallback: 'Public surface returned by useSheetSwipe(). Exposes reactive state (currentSnap, dragOffset, isDragging, currentSnapHeight) and imperative controls (snapTo, dismiss) to drive the bottom-sheet from outside the composable.',
    definition: `export interface ISheetSwipeReturn {
    currentSnap: Ref<TSheetSnapId>
    dragOffset: Ref<number>
    isDragging: Ref<boolean>
    snapTo: (id: TSheetSnapId) => void
    dismiss: () => void
    currentSnapHeight: Ref<number>
}`,
    extends: [],
    props: [
        { name: 'currentSnap', type: 'Ref<TSheetSnapId>', optional: false, descriptionFallback: 'The currently-active snap id.' },
        { name: 'dragOffset', type: 'Ref<number>', optional: false, descriptionFallback: 'Live drag delta during a gesture (px from snap baseline).' },
        { name: 'isDragging', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True while a pointer is held on the handle.' },
        { name: 'snapTo', type: '(id: TSheetSnapId) => void', optional: false, descriptionFallback: 'Imperative snap — programmatically move the sheet to a named snap point.' },
        { name: 'dismiss', type: '() => void', optional: false, descriptionFallback: 'Convenience alias for snapTo("closed").' },
        { name: 'currentSnapHeight', type: 'Ref<number>', optional: false, descriptionFallback: 'Resolved height (in px) of the active snap point. Useful for layout maths and test assertions.' },
    ],
    usedBy: [
        { slug: 'use-sheet-swipe', name: 'useSheetSwipe', kind: 'composable' },
        { slug: 'sheet', name: 'Sheet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Sheet/sheet-swipe-return.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sheet_swipe_return.example',
            titleFallback: 'Programmatic sheet control via useSheetSwipe',
            code: `const { currentSnap, snapTo, dismiss } = useSheetSwipe({ el, handle })

// open the sheet to half-height
snapTo('half')

// dismiss (close) programmatically
dismiss()`,
            lang: 'typescript',
        },
    ],
}
