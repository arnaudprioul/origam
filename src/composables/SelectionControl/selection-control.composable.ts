import { useBackgroundColor, useDensity, useTextColor, useVModel } from '../../composables'

import { ORIGAM_SELECTION_CONTROL_GROUP_KEY } from '../../consts'

import type { ISelectionControlProps } from "../../interfaces"

import { deepEqual, wrapInArray } from '../../utils'

import { computed, inject } from 'vue'

export function useSelectionControl (props: ISelectionControlProps) {
    const group = inject(ORIGAM_SELECTION_CONTROL_GROUP_KEY, undefined)

    const {densityClasses} = useDensity(props)

    const modelValue = useVModel(props, 'modelValue')

    const trueValue = computed(() => {
        return props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true
    })
    const falseValue = computed(() => {
        return props.falseValue !== undefined ? props.falseValue : false
    })
    const isMultiple = computed(() => {
        return !!props.multiple || (props.multiple == null && Array.isArray(modelValue.value))
    })
    const valueComparator = computed(() => {
        return props.valueComparator ?? deepEqual
    })

    const model = computed({
        get () {
            const val = group ? group.modelValue.value : modelValue.value

            return isMultiple.value
                ? wrapInArray(val).some((v: any) => valueComparator.value(v, trueValue.value))
                : valueComparator.value(val, trueValue.value)
        },
        set (val: boolean) {
            if (props.readonly) return

            const currentValue = val ? trueValue.value : falseValue.value

            let newVal = currentValue

            if (isMultiple.value) {
                newVal = val
                    ? [...wrapInArray(modelValue.value), currentValue]
                    : wrapInArray(modelValue.value).filter((item: any) => !valueComparator.value(item, trueValue.value))
            }

            if (group) {
                group.modelValue.value = newVal
            } else {
                modelValue.value = newVal
            }
        }
    })

    // `activeColor` / `activeBgColor` fall back to `color` / `bgColor`
    // (and ultimately to `color` for the BACKGROUND when toggled on,
    // matching the Material/Vuetify switch contract: a single
    // `color="primary"` paints the track in the consumer's intent both
    // OFF and ON, instead of resetting to the SCSS default grey on
    // either state).
    //
    // Pre-fix: setting `color="primary"` on `<origam-switch>` only
    // applied the foreground in OFF state; the ON state read
    // `activeColor` (undefined → no styles → SCSS hardcoded grey
    // shipped through). Reported by the user — "la couleur/bgColor
    // pour le switch ne fonctionne pas".
    // Pre-fix: setting `color="primary"` on `<origam-switch>` only
    // applied the foreground in OFF state; the ON state read
    // `activeColor` (Vue-coerced from `undefined` to `false` because
    // `TColor` includes `false` in its type union, so `??` doesn't
    // catch it → produced `false` → `useColor` no-oped → SCSS
    // hardcoded grey shipped through). Reported by the user — "la
    // couleur/bgColor pour le switch ne fonctionne pas".
    //
    // Fix:
    // 1. Fall back through `activeColor → color` (and bgColor too)
    //    using `||` so any falsy value (false / undefined / null /
    //    empty string) yields the next link in the chain.
    // 2. Background gates on `props.color` as the final fallback so a
    //    consumer `color="primary"` paints the track when checked,
    //    matching the Material/Vuetify switch contract — no need to
    //    pass `bgColor` separately.
    const {textColorStyles} = useTextColor(computed(() => {
        if (props.error || props.disabled) return undefined

        return model.value ? (props.activeColor || props.color) : props.color
    }))
    const {backgroundColorStyles} = useBackgroundColor(computed(() => {
        if (props.error || props.disabled) return undefined

        return model.value
            ? (props.activeBgColor || props.bgColor || props.color)
            : props.bgColor
    }))

    const icon = computed(() => {
        return model.value ? props.trueIcon : props.falseIcon
    })

    return {
        group,
        densityClasses,
        trueValue,
        falseValue,
        model,
        textColorStyles,
        backgroundColorStyles,
        icon
    }
}
