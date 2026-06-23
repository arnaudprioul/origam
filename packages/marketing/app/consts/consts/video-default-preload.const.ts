import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const VIDEO_DEFAULT_PRELOAD_CONST_DOC: IConstDoc = {
    slug: 'video-default-preload',
    name: 'VIDEO_DEFAULT_PRELOAD',
    category: 'Media',
    descriptionKey: 'consts.catalog.video_default_preload.description',
    descriptionFallback: "Default preload hint for the <video> element: 'metadata' loads only the duration/dimensions metadata without buffering the full stream.",
    definition: `export const VIDEO_DEFAULT_PRELOAD: 'none' | 'metadata' | 'auto' = 'metadata'`,
    value: "'metadata'",
    usedBy: [
        { name: 'OrigamVideo', slug: 'video' },
    ],
    sourceFile: 'packages/ds/src/consts/Video/video.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.video_default_preload.example',
            titleFallback: 'Override the default preload hint',
            code: `<OrigamVideo
  src="/my-video.mp4"
  preload="auto"
/>
<!-- Default is VIDEO_DEFAULT_PRELOAD = 'metadata' -->`,
            lang: 'html',
        },
    ],
}
