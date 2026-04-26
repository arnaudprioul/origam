import type { IOptions } from '@stories/interfaces'

/**
 * Material-style elevation rungs (0..24). The Lot 1 refactor maps these
 * onto the design-token shadow ladder (`{shadow.none|xs|sm|md|lg|xl}`).
 * The list is exhaustive so consumers can pin any specific level in a
 * story; the JS layer does not interpolate between rungs.
 */
export const elevationList: Array<IOptions<number | undefined>> = [
    { label: 'Default (none)', value: undefined },
    ...Array.from({ length: 25 }, (_, i): IOptions<number> => ({
        label: String(i),
        value: i
    }))
]
