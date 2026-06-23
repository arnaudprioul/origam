import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BUILT_IN_PATTERNS_CONST_DOC: IConstDoc = {
    slug: 'built-in-patterns',
    name: 'BUILT_IN_PATTERNS',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.built_in_patterns.description',
    descriptionFallback: 'Curated mask presets map (name → { pattern, validator }). Covers common formats: French/US/international phone, IBAN, SIRET, credit card, ISO date, FR/US date, time, and postal codes.',
    definition: `export const BUILT_IN_PATTERNS: Record<TBuiltInPattern, IMaskOptions> = {
    [BUILT_IN_PATTERN.PHONE_FR]: { pattern: '## ## ## ## ##', validator: null },
    [BUILT_IN_PATTERN.PHONE_US]: { pattern: '(###) ###-####', validator: null },
    [BUILT_IN_PATTERN.PHONE_INTERNATIONAL]: { pattern: '+## ## ## ## ## ##', validator: null },
    [BUILT_IN_PATTERN.IBAN]: { pattern: '**** **** **** **** **** **** ****  **', validator: PATTERN_VALIDATOR.IBAN },
    [BUILT_IN_PATTERN.SIRET]: { pattern: '### ### ### #####', validator: null },
    [BUILT_IN_PATTERN.CREDIT_CARD]: { pattern: '#### #### #### ####', validator: PATTERN_VALIDATOR.LUHN },
    [BUILT_IN_PATTERN.DATE_ISO]: { pattern: '####-##-##', validator: PATTERN_VALIDATOR.DATE_ISO },
    [BUILT_IN_PATTERN.DATE_FR]: { pattern: '##/##/####', validator: PATTERN_VALIDATOR.DATE_FR },
    [BUILT_IN_PATTERN.DATE_US]: { pattern: '##/##/####', validator: PATTERN_VALIDATOR.DATE_US },
    [BUILT_IN_PATTERN.TIME]: { pattern: '##:##', validator: null },
    [BUILT_IN_PATTERN.TIME_12H]: { pattern: '##:## AA', validator: null },
    [BUILT_IN_PATTERN.POSTCODE_FR]: { pattern: '#####', validator: null },
    [BUILT_IN_PATTERN.POSTCODE_US]: { pattern: '#####', validator: null }
}`,
    values: [
        { value: 'BUILT_IN_PATTERN.PHONE_FR', descriptionKey: 'consts.detail.built_in_patterns.phone_fr', descriptionFallback: 'French phone number: ## ## ## ## ##.' },
        { value: 'BUILT_IN_PATTERN.PHONE_US', descriptionKey: 'consts.detail.built_in_patterns.phone_us', descriptionFallback: 'US phone number: (###) ###-####.' },
        { value: 'BUILT_IN_PATTERN.PHONE_INTERNATIONAL', descriptionKey: 'consts.detail.built_in_patterns.phone_international', descriptionFallback: 'International phone number: +## ## ## ## ## ##.' },
        { value: 'BUILT_IN_PATTERN.IBAN', descriptionKey: 'consts.detail.built_in_patterns.iban', descriptionFallback: 'IBAN up to 34 chars (mod-97 validator).' },
        { value: 'BUILT_IN_PATTERN.SIRET', descriptionKey: 'consts.detail.built_in_patterns.siret', descriptionFallback: 'French SIRET: ### ### ### #####.' },
        { value: 'BUILT_IN_PATTERN.CREDIT_CARD', descriptionKey: 'consts.detail.built_in_patterns.credit_card', descriptionFallback: 'Credit card 16 digits (Luhn validator).' },
        { value: 'BUILT_IN_PATTERN.DATE_ISO', descriptionKey: 'consts.detail.built_in_patterns.date_iso', descriptionFallback: 'ISO date: ####-##-##.' },
        { value: 'BUILT_IN_PATTERN.DATE_FR', descriptionKey: 'consts.detail.built_in_patterns.date_fr', descriptionFallback: 'French date: ##/##/####.' },
        { value: 'BUILT_IN_PATTERN.DATE_US', descriptionKey: 'consts.detail.built_in_patterns.date_us', descriptionFallback: 'US date: ##/##/####.' },
        { value: 'BUILT_IN_PATTERN.TIME', descriptionKey: 'consts.detail.built_in_patterns.time', descriptionFallback: '24h time: ##:##.' },
        { value: 'BUILT_IN_PATTERN.TIME_12H', descriptionKey: 'consts.detail.built_in_patterns.time_12h', descriptionFallback: '12h time with AM/PM: ##:## AA.' },
        { value: 'BUILT_IN_PATTERN.POSTCODE_FR', descriptionKey: 'consts.detail.built_in_patterns.postcode_fr', descriptionFallback: 'French postal code: #####.' },
        { value: 'BUILT_IN_PATTERN.POSTCODE_US', descriptionKey: 'consts.detail.built_in_patterns.postcode_us', descriptionFallback: 'US ZIP code: #####.' },
    ],
    usedBy: [
        { name: 'OrigamMask', slug: 'mask' },
        { name: 'useMask' },
    ],
    sourceFile: 'packages/ds/src/consts/Mask/built-in-patterns.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.built_in_patterns.example',
            titleFallback: 'Using a built-in mask preset',
            code: `import { OrigamTextField } from 'origam'

<OrigamTextField mask="phone:fr" label="Téléphone" />`,
            lang: 'typescript',
        },
    ],
}
