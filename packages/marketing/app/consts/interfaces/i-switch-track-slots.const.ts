import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_TRACK_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-track-slots',
    name: 'ISwitchTrackSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_switch_track_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamSwitchTrack> — exposes track.true and track.false half-label slots plus an overlay slot for absolute-positioned decorations (e.g. a loading bar).',
    definition: `export interface ISwitchTrackSlots extends ICommonsComponentSlots {
    'track.true'?: (props: ISwitchTrackSlotsProps) => any
    'track.false'?: (props: ISwitchTrackSlotsProps) => any
    overlay?: (props: ISwitchTrackSlotsProps) => any
}`,
    extends: ['ICommonsComponentSlots'],
    props: [
        { name: 'track.true', type: '(props: ISwitchTrackSlotsProps) => any', optional: true, descriptionFallback: 'Content rendered on the left (ON) half of the rail. Receives model and isValid.' },
        { name: 'track.false', type: '(props: ISwitchTrackSlotsProps) => any', optional: true, descriptionFallback: 'Content rendered on the right (OFF) half of the rail. Receives model and isValid.' },
        { name: 'overlay', type: '(props: ISwitchTrackSlotsProps) => any', optional: true, descriptionFallback: 'Free-form overlay rendered inside the track after the half-labels. Used for loading bars or decorative elements.' },
    ],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_track_slots.example',
            titleFallback: 'Icon labels on each half of the track',
            code: `<OrigamSwitch v-model="dark">
  <template #track.true>
    <OrigamIcon icon="mdi-weather-night" size="10" />
  </template>
  <template #track.false>
    <OrigamIcon icon="mdi-weather-sunny" size="10" />
  </template>
</OrigamSwitch>`,
            lang: 'html',
        },
    ],
}
