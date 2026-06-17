import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const VIDEO_CONTROLS_TYPE_DOC: ITypeDoc = {
    slug: 'video-controls',
    name: 'TVideoControls',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.video_controls.description',
    descriptionFallback: 'Controls rendering strategy for OrigamVideo — custom Origam UI, native browser controls, or no controls at all.',
    definition: `export type TVideoControls = 'custom' | 'native' | 'none'`,
    values: [
        {
            value: 'custom',
            descriptionKey: 'types.detail.video_controls.custom',
            descriptionFallback: 'The component paints its own toolbar with play/pause, scrubber, volume, captions, PIP and fullscreen buttons. The <video> element is rendered WITHOUT the native controls attribute. Default.',
        },
        {
            value: 'native',
            descriptionKey: 'types.detail.video_controls.native',
            descriptionFallback: 'The <video> element receives the native controls attribute and the browser paints its own toolbar. Useful for AirPlay on Safari or inside Tauri shells that talk to native players.',
        },
        {
            value: 'none',
            descriptionKey: 'types.detail.video_controls.none',
            descriptionFallback: 'Neither the custom nor the native toolbar is rendered. The consumer drives playback programmatically through the #controls slot or the exposed composable methods.',
        },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', propName: 'controls' },
    ],
    sourceFile: 'packages/ds/src/types/Video/video-controls.type.ts',
    examples: [
        {
            titleKey: 'types.detail.video_controls.example',
            titleFallback: 'Programmatic playback with controls="none"',
            code: `<origam-video
  ref="player"
  src="/movie.mp4"
  controls="none"
/>
<origam-btn @click="player.play()">Play</origam-btn>`,
            lang: 'html',
        },
    ],
}
