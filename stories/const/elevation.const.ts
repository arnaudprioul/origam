import type { IOptions } from '@origam/interfaces'

/**
 * Elevation rungs surfaced in Histoire controls.
 *
 * The values stay numeric on purpose — `useElevation` (in
 * `src/composables/Commons/elevation.composable.ts`) currently parses
 * `elevation` as a number and bucketises it onto the origam shadow ladder
 * (`--origam-shadow-{none|xs|sm|md|lg|xl}`). The labels surface the origam
 * rung names so testers immediately see which token will resolve.
 *
 * TODO(useElevation): once the composable is extended to accept the rung
 * strings directly (`'none'|'xs'|'sm'|'md'|'lg'|'xl'`), promote `value`
 * from `number` to a typed `TElevation = number | TShadowRung` union and
 * drop the parenthetical hints in the labels.
 */
export const elevationList: Array<IOptions<number>> = [
    { label: '(none)', value: undefined },
    { label: 'None (0)', value: 0 },
    { label: 'XS (1)', value: 1 },
    { label: 'SM (3)', value: 3 },
    { label: 'MD (8)', value: 8 },
    { label: 'LG (16)', value: 16 },
    { label: 'XL (24)', value: 24 },
]
