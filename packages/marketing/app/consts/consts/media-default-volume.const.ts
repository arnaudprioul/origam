import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MEDIA_DEFAULT_VOLUME_CONST_DOC: IConstDoc = {
    slug: 'media-default-volume',
    name: 'MEDIA_DEFAULT_VOLUME',
    category: 'Media',
    descriptionKey: 'consts.catalog.media_default_volume.description',
    descriptionFallback: 'Default volume (0–1 range) for OrigamAudio and OrigamVideo. Value 1 means full volume, matching the browser native default. Materialised here so useMediaPlayer, OrigamAudio and OrigamVideo share a single source of truth instead of re-typing the literal.',
    definition: `export const MEDIA_DEFAULT_VOLUME = 1`,
    value: '1',
    usedBy: [
        { name: 'OrigamAudio', slug: 'audio' },
        { name: 'OrigamVideo', slug: 'video' },
        { name: 'useMediaPlayer' },
    ],
    sourceFile: 'packages/ds/src/consts/Media/media.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.media_default_volume.example',
            titleFallback: 'Initialising a custom player with the default volume',
            code: `import { MEDIA_DEFAULT_VOLUME } from 'origam'

const volume = ref(MEDIA_DEFAULT_VOLUME) // 1 (full volume)

// <origam-audio :volume="volume" />`,
            lang: 'typescript',
        },
    ],
}
