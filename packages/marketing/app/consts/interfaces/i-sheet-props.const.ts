import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SHEET_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sheet-props',
    name: 'ISheetProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_sheet_props.description',
    descriptionFallback: 'Full props contract for <OrigamSheet> — a bottom/side sheet with optional swipe-to-expand gesture, discrete snap-points, and the full design surface (color, border, spacing, elevation, position).',
    definition: `export interface ISheetProps extends ITagProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IDimensionProps, ILocationProps, IPositionProps, IActiveProps, IHoverProps {
    side?: TDirectionBoth
    swipeable?: boolean
    snapPoints?: ReadonlyArray<TSheetSnapPoint>
    defaultSnap?: TSheetSnapId
    open?: boolean
    disabled?: boolean
    persistent?: boolean
}`,
    extends: [
        'ITagProps', 'ICommonsComponentProps', 'IPaddingProps', 'IMarginProps',
        'IColorProps', 'IBorderProps', 'IRoundedProps', 'IElevationProps',
        'IDimensionProps', 'ILocationProps', 'IPositionProps', 'IActiveProps', 'IHoverProps',
    ],
    props: [
        { name: 'side', type: 'TDirectionBoth', optional: true, descriptionFallback: 'Edge the sheet is anchored to. Only bottom activates the swipe-to-expand gesture today; other values are reserved for future side-sheet patterns.' },
        { name: 'swipeable', type: 'boolean', optional: true, descriptionFallback: 'Enable the mobile-style swipe-to-expand / swipe-to-dismiss gesture. Requires side === "bottom".' },
        { name: 'snapPoints', type: 'ReadonlyArray<TSheetSnapPoint>', optional: true, descriptionFallback: 'Discrete snap-points the sheet can settle on between drags. Each point is a px number or a CSS length string.' },
        { name: 'defaultSnap', type: 'TSheetSnapId', optional: true, descriptionFallback: 'Initial snap id when the sheet mounts. Defaults to "half".' },
        { name: 'open', type: 'boolean', optional: true, descriptionFallback: 'v-model:open binding — false maps to the closed snap, truthy keeps the last non-closed snap.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables the swipe gesture entirely. The sheet stays at defaultSnap and pointer events on the handle are no-ops.' },
        { name: 'persistent', type: 'boolean', optional: true, descriptionFallback: 'Persistent sheets cannot be swiped past closed — a fast downward flick snaps back instead of dismissing.' },
    ],
    usedBy: [
        { slug: 'sheet', name: 'Sheet', kind: 'component' },
        { slug: 'use-sheet-swipe', name: 'useSheetSwipe', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Sheet/sheet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sheet_props.example',
            titleFallback: 'Bottom sheet with swipe gesture',
            code: `<OrigamSheet
    side="bottom"
    swipeable
    :snap-points="['120px', '50vh', '90vh']"
    default-snap="half"
    v-model:open="isOpen"
/>`,
            lang: 'vue',
        },
    ],
}
