import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const AUDIO_VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'audio-variant',
    name: 'AUDIO_VARIANT',
    category: 'Audio',
    descriptionKey: 'enums.catalog.audio_variant.description',
    descriptionFallback: 'TypeScript enum for the visual variant of OrigamAudio (expanded, compact). Deprecated aliases: normal, minimal.',
    definition: `export enum AUDIO_VARIANT {
    EXPANDED = 'expanded',
    COMPACT  = 'compact',
    /** @deprecated Use \`EXPANDED\` — same runtime value. */
    NORMAL   = 'normal',
    /** @deprecated Use \`COMPACT\` — same runtime value. */
    MINIMAL  = 'minimal',
}`,
    values: [
        { value: 'AUDIO_VARIANT.EXPANDED', descriptionKey: 'enums.detail.audio_variant.expanded', descriptionFallback: 'Full studio strip: 96px album cover, title/artist/album header, waveform scrubber and transport row.' },
        { value: 'AUDIO_VARIANT.COMPACT', descriptionKey: 'enums.detail.audio_variant.compact', descriptionFallback: 'Slim transport-only dock: 48px cover, single inline metadata strip, transport row only.' },
        { value: 'AUDIO_VARIANT.NORMAL', descriptionKey: 'enums.detail.audio_variant.normal', descriptionFallback: 'Deprecated alias for EXPANDED — same runtime value.' },
        { value: 'AUDIO_VARIANT.MINIMAL', descriptionKey: 'enums.detail.audio_variant.minimal', descriptionFallback: 'Deprecated alias for COMPACT — same runtime value.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Audio/audio-variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.audio_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { AUDIO_VARIANT } from 'origam'

const variant: AUDIO_VARIANT = AUDIO_VARIANT.COMPACT`,
            lang: 'typescript',
        },
    ],
}
