import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SHEET_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sheet-emits',
    name: 'ISheetEmits',
    category: 'Overlay & Feedback',
    descriptionKey: 'interfaces.catalog.i_sheet_emits.description',
    descriptionFallback: 'Emit signature for <OrigamSheet>. Two events drive the v-model surface: update:snap fires whenever a gesture or programmatic snapTo() call settles on a new snap-point id, and update:open fires on the closed/non-closed boundary so the parent stays in sync when the user dismisses via swipe-down.',
    definition: `export interface ISheetEmits {
    (e: 'update:snap', id: TSheetSnapId): void
    (e: 'update:open', value: boolean): void
}`,
    extends: [],
    props: [
        { name: 'update:snap', type: '(id: TSheetSnapId) => void', optional: false, descriptionFallback: 'Fired when the sheet settles on a snap-point — either after a swipe gesture or after a programmatic snapTo() call. The id is the TSheetSnapId of the new active snap-point.' },
        { name: 'update:open', type: '(value: boolean) => void', optional: false, descriptionFallback: 'v-model:open companion — emitted when the sheet crosses the open/closed boundary (e.g. user swipes fully down to dismiss).' },
    ],
    usedBy: [
        { slug: 'sheet', name: 'Sheet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Sheet/sheet-emits.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sheet_emits.example',
            titleFallback: 'Binding v-model on a bottom sheet',
            code: `<OrigamSheet
    v-model:open="sheetOpen"
    v-model:snap="currentSnap"
    :snaps="['peek', 'half', 'full']"
    @update:snap="onSnapChange"
/>`,
            lang: 'html',
        },
    ],
}
