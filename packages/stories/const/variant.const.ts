import { VARIANT, VARIANT_INPUT } from '@origam/enums'
import type { IOptions } from '@origam/interfaces'
import type { TVariant, TVariantInput } from '@origam/types'

export const variantList: Array<IOptions<TVariant>> = [
    { label: '(none)', value: undefined },
    { label: 'Flat', value: VARIANT.FLAT },
    { label: 'Elevated', value: VARIANT.ELEVATED },
    { label: 'Tonal', value: VARIANT.TONAL },
    { label: 'Outlined', value: VARIANT.OUTLINED },
    { label: 'Text', value: VARIANT.TEXT },
    { label: 'Plain', value: VARIANT.PLAIN },
    { label: 'Ghost', value: VARIANT.GHOST },
]

/** Variant options for input field components (TextField, NumberField, etc.). */
export const variantInputList: Array<IOptions<TVariantInput>> = [
    { label: '(none)', value: undefined },
    { label: 'Outlined', value: VARIANT_INPUT.OUTLINED },
    { label: 'Filled', value: VARIANT_INPUT.FILLED },
    { label: 'Plain', value: VARIANT_INPUT.PLAIN },
    { label: 'Underlined', value: VARIANT_INPUT.UNDERLINED },
    { label: 'Solo', value: VARIANT_INPUT.SOLO },
]
