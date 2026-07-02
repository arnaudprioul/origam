/**
 * Maximum number of cached `Intl.NumberFormat` instances kept in the
 * module-level LRU. Sixteen covers most realistic UIs (a handful of
 * locales × a handful of format variations) without leaking memory on
 * long-lived storybook-style apps where every prop tweak would otherwise
 * spawn a fresh resolver.
 */
export const NUMBER_FORMAT_LRU_CAPACITY = 16

/**
 * SSR-safe fallback locale used when no `<html lang>` attribute, no
 * `navigator.language`, and no explicit prop are available.
 */
export const NUMBER_FORMAT_FALLBACK_LOCALE = 'en-US'

/**
 * Default currency used when `format === 'currency'` and the consumer
 * omits the `currency` prop. ISO 4217 mandates a code — we pick USD
 * rather than throwing so storybook controls stay forgiving.
 */
export const NUMBER_FORMAT_DEFAULT_CURRENCY = 'USD'
