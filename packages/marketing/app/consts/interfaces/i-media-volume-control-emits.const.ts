import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_VOLUME_CONTROL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-volume-control-emits',
    name: 'IMediaVolumeControlEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_media_volume_control_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamMediaVolumeControl>. The atom does NOT call methods.* directly; the parent owns the media-side mutations. update:muted is fired on mute/unmute toggle, update:volume on scrubber drag.',
    definition: `export interface IMediaVolumeControlEmits {
    (e: 'update:muted', muted: boolean): void
    (e: 'update:volume', volume: number): void
}`,
    extends: [],
    props: [
        { name: 'update:muted', type: '(muted: boolean) => void', optional: false, descriptionFallback: 'The mute toggle button was clicked. Payload is the proposed new muted state (i.e. !muted).' },
        { name: 'update:volume', type: '(volume: number) => void', optional: false, descriptionFallback: 'The vertical scrubber moved. Payload is the new linear volume in [0, 1]. The parent must call setVolume() AND toggle mute as appropriate (rising from 0 to unmute, falling to 0 to mute).' },
    ],
    usedBy: [
        { slug: 'media-volume-control', name: 'MediaVolumeControl', kind: 'component' },
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-volume-control.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_volume_control_emits.example',
            titleFallback: 'Wiring update:muted and update:volume to media methods',
            code: `<OrigamMediaVolumeControl
    :volume="state.volume.value"
    :muted="state.muted.value"
    :mute-label="t('player.mute')"
    :unmute-label="t('player.unmute')"
    :volume-label="t('player.volume')"
    @update:muted="methods.toggleMute"
    @update:volume="methods.setVolume"
/>`,
            lang: 'vue',
        },
    ],
}
