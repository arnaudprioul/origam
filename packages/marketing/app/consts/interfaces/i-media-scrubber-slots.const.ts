import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_SCRUBBER_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-scrubber-slots',
    name: 'IMediaScrubberSlots',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_media_scrubber_slots.description',
    descriptionFallback: 'Scoped slots exposed by <OrigamMediaScrubber>. Currently only a tooltip slot that overrides the default hover-tooltip body.',
    definition: `export interface IMediaScrubberSlots {
    tooltip?: (bindings: { value: number }) => any
}`,
    extends: [],
    props: [
        { name: 'tooltip', type: '(bindings: { value: number }) => any', optional: true, descriptionFallback: 'Hover-tooltip body. Receives the hovered value. Only rendered when showHoverTooltip=true AND the cursor sits over the track (horizontal orientation).' },
    ],
    usedBy: [
        { slug: 'media-scrubber', name: 'MediaScrubber', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-scrubber.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_scrubber_slots.example',
            titleFallback: 'Custom tooltip showing formatted timestamp',
            code: `<OrigamMediaScrubber
    v-model="currentTime"
    :max="duration"
    :show-hover-tooltip="true"
    aria-label="Video timeline"
>
    <template #tooltip="{ value }">
        <span>{{ formatTime(value) }}</span>
    </template>
</OrigamMediaScrubber>`,
            lang: 'vue',
        },
    ],
}
