import { computed } from 'vue'

import { IN_BROWSER } from '../../consts'

/*********************************************************
 * useAspectRatio
 *
 * SSR safety
 * ──────────
 * During SSR (`!IN_BROWSER`) we cannot read `window.innerWidth/Height`.
 * When the consumer passes an explicit `aspectRatio` prop the ratio is
 * derived from it (no DOM needed). Otherwise we return an empty styles
 * array — the layout collapses to its natural box on the server, then
 * the first browser-side computed access fills in the padding-bottom
 * value. The component's intrinsic height takes over after hydration,
 * so the difference is invisible to the user.
 ********************************************************/
export function useAspectRatio (props: { aspectRatio?: string | number }) {
    const aspectStyles = computed(() => {
        const aspectRatio = []
        let ratio: number

        if (props.aspectRatio) {
            ratio = eval(props.aspectRatio as string)
        } else if (IN_BROWSER) {
            ratio = window.innerWidth / window.innerHeight
        } else {
            return aspectRatio
        }

        if (ratio) {
            aspectRatio.push(`padding-block-end: ${String(1 / ratio * 100)}%`)
        }

        return aspectRatio
    })

    return {aspectStyles}
}
