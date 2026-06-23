import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const AUDIO_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'audio-variant',
    name: 'TAudioVariant',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.audio_variant.description',
    descriptionFallback: 'Visual variant of OrigamAudio — expanded studio strip or compact transport dock.',
    definition: `export type TAudioVariant = \`\${AUDIO_VARIANT}\`

// Where AUDIO_VARIANT is:
export enum AUDIO_VARIANT {
    EXPANDED = 'expanded',
    COMPACT  = 'compact',
    /** @deprecated Use EXPANDED */ NORMAL  = 'normal',
    /** @deprecated Use COMPACT  */ MINIMAL = 'minimal'
}`,
    values: [
        {
            value: 'expanded',
            descriptionKey: 'types.detail.audio_variant.expanded',
            descriptionFallback: 'Full studio strip: 96 px album cover, title/artist/album metadata header, mini waveform scrubber above the transport row.',
        },
        {
            value: 'compact',
            descriptionKey: 'types.detail.audio_variant.compact',
            descriptionFallback: 'Slim transport-only dock: 48 px cover, single inline metadata strip, no waveform. Ideal for sticky bottom players.',
        },
        {
            value: 'normal',
            descriptionKey: 'types.detail.audio_variant.normal',
            descriptionFallback: 'Deprecated alias for "expanded". Kept for backward compatibility with v0.x consumers.',
        },
        {
            value: 'minimal',
            descriptionKey: 'types.detail.audio_variant.minimal',
            descriptionFallback: 'Deprecated alias for "compact". Kept for backward compatibility with v0.x consumers.',
        },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/Audio/audio-variant.type.ts',
    examples: [
        {
            titleKey: 'types.detail.audio_variant.example',
            titleFallback: 'Expanded vs compact audio player',
            code: `<!-- Full studio strip -->
<origam-audio src="/podcast.mp3" variant="expanded" title="Episode 42" />

<!-- Compact dock -->
<origam-audio src="/podcast.mp3" variant="compact" title="Episode 42" />`,
            lang: 'html',
        },
    ],
}
