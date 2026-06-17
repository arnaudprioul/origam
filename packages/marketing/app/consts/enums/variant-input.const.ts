import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const VARIANT_INPUT_ENUM_DOC: IEnumDoc = {
    slug: 'variant-input',
    name: 'VARIANT_INPUT',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.variant_input.description',
    descriptionFallback: 'TypeScript enum for the visual variant of text input controls — underlined, filled, solo, outlined, plain.',
    definition: `export enum VARIANT_INPUT {
    UNDERLINED = 'underlined',
    FILLED     = 'filled',
    SOLO       = 'solo',
    OUTLINED   = 'outlined',
    PLAIN      = 'plain',
}`,
    values: [
        { value: 'VARIANT_INPUT.UNDERLINED', descriptionKey: 'enums.detail.variant_input.underlined', descriptionFallback: 'Input has a bottom border only — classic Material Design style.' },
        { value: 'VARIANT_INPUT.FILLED', descriptionKey: 'enums.detail.variant_input.filled', descriptionFallback: 'Input has a filled background with a bottom border — Material filled style.' },
        { value: 'VARIANT_INPUT.SOLO', descriptionKey: 'enums.detail.variant_input.solo', descriptionFallback: 'Elevated card-like input with no visible border at rest.' },
        { value: 'VARIANT_INPUT.OUTLINED', descriptionKey: 'enums.detail.variant_input.outlined', descriptionFallback: 'Input with a full surrounding border — the most common accessible style.' },
        { value: 'VARIANT_INPUT.PLAIN', descriptionKey: 'enums.detail.variant_input.plain', descriptionFallback: 'Borderless, backgroundless input — minimal chrome for inline editing.' },
    ],
    usedBy: [
        { slug: 'field', name: 'Field', propName: 'variant' },
        { slug: 'slider-field', name: 'SliderField', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.variant_input.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { VARIANT_INPUT } from 'origam'

const variant: VARIANT_INPUT = VARIANT_INPUT.OUTLINED`,
            lang: 'typescript',
        },
    ],
}
