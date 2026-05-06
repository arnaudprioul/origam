import { computed, ref, watch } from "vue"
import type { IHoverProps } from "../../interfaces"

import { getCurrentInstanceName } from "../../utils"

/**
 * Track whether the host element is being hovered.
 *
 * Two modes:
 *  - **uncontrolled (default — `props.hover` undefined)**: the returned
 *    `isHover` ref reflects the actual mouseenter/mouseleave state of the
 *    host. This is what enables `useColorEffect` to swap `hoverColor` /
 *    `hoverBgColor` automatically when the consumer passes one without
 *    opting into anything else.
 *  - **controlled (`props.hover === true`)**: `isHover` is locked to
 *    `true`. Useful for stories, tests, or a parent component that wants
 *    to force the hover state programmatically.
 *
 * The `hoverClasses` ref is kept in sync with `isHover` so the historical
 * `${name}--hovered` class still lights up under the same conditions.
 *
 * Historical note: an earlier version of this composable required
 * `props.hover === true` as an *opt-in gate* before mouseenter/mouseleave
 * would have any effect. That meant every consumer of `hoverColor` /
 * `hoverBgColor` had to also pass `hover` — which nobody did, so the props
 * were silently dead. The current contract treats `props.hover` strictly
 * as an override.
 */
export function useHover (props: IHoverProps, name = getCurrentInstanceName()) {
    const isHovered = ref(false)
    const forced = ref<boolean>(props.hover === true)

    const isHover = computed(() => forced.value || isHovered.value)

    const hoverClasses = computed(() => {
        const classes: Array<string> = []

        if (isHover.value) {
            classes.push(`${name}--hovered`)
        }

        return classes
    })

    const onMouseenter = () => {
        isHovered.value = true
    }
    const onMouseleave = () => {
        isHovered.value = false
    }

    // Keep `forced` in sync if the consumer toggles `props.hover` later.
    watch(() => props.hover, (next) => {
        forced.value = next === true
    })

    return {
        isHover,
        hoverClasses,
        onMouseenter,
        onMouseleave
    }
}
