import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_CONTROLLER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-controller-emits',
    name: 'IMediaControllerEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_media_controller_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamMediaController>. The shell calls methods.* directly for the basic ops (toggle play, seek, set volume, set rate, toggle mute, request cast) — those do not bubble. These emits are the ones the parent must handle because the Controller does not own enough context.',
    definition: `export interface IMediaControllerEmits {
    (e: 'quality-change', quality: string): void
    (e: 'download'): void
    (e: 'previous'): void
    (e: 'next'): void
    (e: 'update:loopMode', mode: TAudioLoopMode): void
    (e: 'update:shuffle', shuffle: boolean): void
}`,
    extends: [],
    props: [
        { name: 'quality-change', type: '(quality: string) => void', optional: false, descriptionFallback: 'Fired when the user picks a quality level. The parent owns the <source> swap logic.' },
        { name: 'download', type: '() => void', optional: false, descriptionFallback: 'Fired when "Download" is clicked. The parent owns the URL fetch / anchor click.' },
        { name: 'previous', type: '() => void', optional: false, descriptionFallback: 'Fired when the previous transport button is clicked. The parent owns the playlist or skip-time policy.' },
        { name: 'next', type: '() => void', optional: false, descriptionFallback: 'Fired when the next transport button is clicked. The parent owns the playlist or skip-time policy.' },
        { name: 'update:loopMode', type: '(mode: TAudioLoopMode) => void', optional: false, descriptionFallback: 'Two-way binding for the loop mode transport toggle.' },
        { name: 'update:shuffle', type: '(shuffle: boolean) => void', optional: false, descriptionFallback: 'Two-way binding for the shuffle transport toggle.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-controller.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_controller_emits.example',
            titleFallback: 'Handling controller emits in a parent component',
            code: `<OrigamMediaController
    :state="state"
    :methods="methods"
    :show-previous="true"
    :show-next="true"
    @previous="playlist.prev()"
    @next="playlist.next()"
    @quality-change="onQualityChange"
/>`,
            lang: 'vue',
        },
    ],
}
