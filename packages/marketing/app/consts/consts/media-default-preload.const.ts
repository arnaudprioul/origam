import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MEDIA_DEFAULT_PRELOAD_CONST_DOC: IConstDoc = {
    slug: 'media-default-preload',
    name: 'MEDIA_DEFAULT_PRELOAD',
    category: 'Media',
    descriptionKey: 'consts.catalog.media_default_preload.description',
    descriptionFallback: "Default preload hint forwarded to the native <audio>/<video> element. The value 'metadata' loads only enough data to compute the duration, avoiding auto-buffering and reducing bandwidth on initial render.",
    definition: `export const MEDIA_DEFAULT_PRELOAD: 'none' | 'metadata' | 'auto' = 'metadata'`,
    value: "'metadata'",
    usedBy: [
        { name: 'OrigamAudio', slug: 'audio' },
        { name: 'OrigamVideo', slug: 'video' },
        { name: 'useMediaPlayer' },
    ],
    sourceFile: 'packages/ds/src/consts/Media/media.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.media_default_preload.example',
            titleFallback: 'Overriding the default preload hint',
            code: `import { MEDIA_DEFAULT_PRELOAD } from 'origam'

// Default: 'metadata' (just duration, no buffering)
console.log(MEDIA_DEFAULT_PRELOAD) // 'metadata'

// Override per instance to fully buffer:
// <origam-audio preload="auto" src="..." />`,
            lang: 'typescript',
        },
    ],
}
