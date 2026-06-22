import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_CONTROLLER_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-controller-slots',
    name: 'IMediaControllerSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_media_controller_slots.description',
    descriptionFallback: 'Scoped slots exposed by <OrigamMediaController>. Consumers inject media-specific blocks: OrigamAudio injects header + waveform + footer; OrigamVideo injects captions/PiP/fullscreen through extraControlsRight.',
    definition: `export interface IMediaControllerSlots {
    header?: () => any
    waveform?: (bindings: { state: IMediaPlayerState; methods: IMediaPlayerMethods }) => any
    footer?: () => any
    'prepend-transport'?: () => any
    'append-transport'?: () => any
    extraControlsLeft?: () => any
    extraControlsRight?: () => any
    configExtra?: (bindings: { closeMenu: () => void }) => any
}`,
    extends: [],
    props: [
        { name: 'header', type: '() => any', optional: true, descriptionFallback: 'Block rendered ABOVE the scrubber row. OrigamAudio injects the cover + metadata strip here; OrigamVideo typically leaves it empty.' },
        { name: 'waveform', type: '(bindings: { state: IMediaPlayerState; methods: IMediaPlayerMethods }) => any', optional: true, descriptionFallback: 'Replaces the default OrigamMediaScrubber scrubber row. Receives { state, methods } so the consumer can paint a custom scrubber (audio waveform) while still routing seeks through methods.seek.' },
        { name: 'footer', type: '() => any', optional: true, descriptionFallback: 'Block rendered BELOW the transport row. OrigamAudio injects the playlist list here.' },
        { name: 'prepend-transport', type: '() => any', optional: true, descriptionFallback: 'Buttons rendered at the start of the transport row, before the play button. OrigamAudio can inject custom shuffle / queue buttons here.' },
        { name: 'append-transport', type: '() => any', optional: true, descriptionFallback: 'Buttons rendered at the end of the transport row, after the config menu. Consumers add custom buttons (favourite, queue, ...) here.' },
        { name: 'extraControlsLeft', type: '() => any', optional: true, descriptionFallback: 'Additional buttons rendered on the left side of the toolbar, AFTER the time display. Legacy slot — prefer prepend-transport.' },
        { name: 'extraControlsRight', type: '() => any', optional: true, descriptionFallback: 'Additional buttons rendered on the right side of the toolbar, BEFORE the config menu. OrigamVideo injects its captions / PiP / fullscreen buttons here.' },
        { name: 'configExtra', type: '(bindings: { closeMenu: () => void }) => any', optional: true, descriptionFallback: 'Extra rows in the config menu (audio output device, subtitle track selector, ...). Receives { closeMenu }.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-controller.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_controller_slots.example',
            titleFallback: 'Injecting a custom header and extra right controls',
            code: `<OrigamMediaController :state="state" :methods="methods">
    <template #header>
        <div class="track-meta">{{ track.title }}</div>
    </template>
    <template #extraControlsRight>
        <OrigamBtn icon="mdi-heart" @click="toggleFavorite" />
    </template>
</OrigamMediaController>`,
            lang: 'vue',
        },
    ],
}
