import { SIZES_ARRAY } from '../../consts'
import type { ISizeProps } from "../../interfaces"

import type { TSize } from '../../types'

import { convertToUnit, getCurrentInstanceName } from '../../utils'
import { computed, isRef } from 'vue'

export function useSize (props: ISizeProps, name = getCurrentInstanceName()) {
    const sizeClasses = computed(() => {
        const size = isRef(props) ? props.value : props.size
        const classes = []

        if (size && SIZES_ARRAY.includes(size as TSize)) {
            classes.push(`${name}--size-${size}`)
        }

        return classes
    })

    const sizeStyles = computed(() => {
        const styles = []

        if (props.size && !SIZES_ARRAY.includes(props.size as TSize)) {
            // Note: previous version emitted `width': …` (stray apostrophe)
            // which Vue silently dropped — leading to 0×0 components when a
            // numeric/custom size was passed.
            styles.push(`width: ${convertToUnit(props.size)}`)
            styles.push(`height: ${convertToUnit(props.size)}`)
        }

        return styles
    })

    return {sizeStyles, sizeClasses}
}
