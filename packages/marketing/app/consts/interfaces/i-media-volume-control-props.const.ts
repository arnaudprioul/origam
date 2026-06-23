import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_VOLUME_CONTROL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-volume-control-props',
    name: 'IMediaVolumeControlProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_media_volume_control_props.description',
    descriptionFallback: 'Props for <OrigamMediaVolumeControl> — the mute/unmute button and the YouTube-style vertical scrubber tooltip. Owns the off/low/medium/high icon swap and the resolvedVolume collapse when muted. Does not own the media-side mutations.',
    definition: `export interface IMediaVolumeControlProps extends ICommonsComponentProps {
    volume: number
    muted: boolean
    muteLabel: string
    unmuteLabel: string
    volumeLabel: string
    dataCy?: string
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'volume', type: 'number', optional: false, descriptionFallback: 'Linear volume in [0, 1]. Typically state.volume.value. Required.' },
        { name: 'muted', type: 'boolean', optional: false, descriptionFallback: 'Whether the media is muted. When true, the slider collapses to 0 (resolvedVolume rule) and the icon becomes VOLUME_OFF. Required.' },
        { name: 'muteLabel', type: 'string', optional: false, descriptionFallback: 'aria-label rendered on the toggle button when the media is NOT muted (clicking will mute). Already-translated. Required.' },
        { name: 'unmuteLabel', type: 'string', optional: false, descriptionFallback: 'aria-label rendered on the toggle button when the media IS muted (clicking will unmute). Already-translated. Required.' },
        { name: 'volumeLabel', type: 'string', optional: false, descriptionFallback: 'aria-label rendered on the vertical scrubber inside the tooltip. Already-translated. Required.' },
        { name: 'dataCy', type: 'string', optional: true, default: "'origam-media-volume-control'", descriptionFallback: 'Optional data-cy prefix used on the toggle button. The tooltip wrapper and scrubber expose their own selectors via convention.' },
    ],
    usedBy: [
        { slug: 'media-volume-control', name: 'MediaVolumeControl', kind: 'component' },
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-volume-control.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_volume_control_props.example',
            titleFallback: 'Volume control wired to media state',
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
