import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SHEET_FAST_FLICK_THRESHOLD_CONST_DOC: IConstDoc = {
    slug: 'sheet-fast-flick-threshold',
    name: 'SHEET_FAST_FLICK_THRESHOLD',
    category: 'Interaction & Gestures',
    descriptionKey: 'consts.catalog.sheet_fast_flick_threshold.description',
    descriptionFallback: 'Velocity threshold (in pixels per millisecond) above which a swipe release on a BottomSheet is treated as a "fast flick". When exceeded, the sheet snaps one step in the direction of motion instead of snapping to the nearest position by distance. 0.5 px/ms ≈ a 200 px swipe in 400 ms.',
    definition: `export const SHEET_FAST_FLICK_THRESHOLD = 0.5`,
    value: '0.5',
    usedBy: [
        { name: 'useSheetSwipe' },
    ],
    sourceFile: 'packages/ds/src/consts/Sheet/sheet-swipe.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.sheet_fast_flick_threshold.example',
            titleFallback: 'Detecting a fast flick in a custom swipe handler',
            code: `import { SHEET_FAST_FLICK_THRESHOLD } from 'origam'

const velocityPxPerMs = deltaY / deltaTime
const isFastFlick = Math.abs(velocityPxPerMs) > SHEET_FAST_FLICK_THRESHOLD`,
            lang: 'typescript',
        },
    ],
}
