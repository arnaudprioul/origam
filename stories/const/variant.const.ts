import { VARIANT, VARIANT_INPUT } from '@origam/enums'
import type { TVariant, TVariantInput } from '@origam/types'
import type { IOptions } from '@stories/interfaces'

/**
 * Action-style variants — applies to Btn, Card, Chip and any component that
 * sits on the `IVariantProps` mixin.
 */
export const variantList: Array<IOptions<TVariant | undefined>> = [
    { label: 'Default (none)', value: undefined },
    { label: 'Text',     value: VARIANT.TEXT },
    { label: 'Flat',     value: VARIANT.FLAT },
    { label: 'Elevated', value: VARIANT.ELEVATED },
    { label: 'Tonal',    value: VARIANT.TONAL },
    { label: 'Outlined', value: VARIANT.OUTLINED },
    { label: 'Plain',    value: VARIANT.PLAIN }
]

/**
 * Input-style variants — applies to TextField, NumberField, PasswordField
 * and any control that wraps the `<OrigamInput>` chrome.
 */
export const variantInputList: Array<IOptions<TVariantInput | undefined>> = [
    { label: 'Default (none)', value: undefined },
    { label: 'Outlined',      value: VARIANT_INPUT.OUTLINED },
    { label: 'Filled',        value: VARIANT_INPUT.FILLED },
    { label: 'Solo',          value: VARIANT_INPUT.SOLO },
    { label: 'Solo-filled',   value: VARIANT_INPUT.SOLO_FILLED },
    { label: 'Solo-inverted', value: VARIANT_INPUT.SOLO_INVERTED },
    { label: 'Underlined',    value: VARIANT_INPUT.UNDERLINED },
    { label: 'Plain',         value: VARIANT_INPUT.PLAIN }
]
