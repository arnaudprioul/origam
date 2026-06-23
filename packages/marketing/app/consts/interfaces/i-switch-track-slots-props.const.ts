import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_TRACK_SLOTS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-track-slots-props',
    name: 'ISwitchTrackSlotsProps',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_switch_track_slots_props.description',
    descriptionFallback: 'Slot payload forwarded to the track.true, track.false and overlay slots of <OrigamSwitchTrack> — provides model (ON/OFF) and isValid so slot content can adapt contextually.',
    definition: `export interface ISwitchTrackSlotsProps {
    model: boolean
    isValid: boolean | null
}`,
    extends: [],
    props: [
        { name: 'model', type: 'boolean', optional: false, descriptionFallback: 'Current ON/OFF state of the switch — true = ON.' },
        { name: 'isValid', type: 'boolean | null', optional: false, descriptionFallback: 'Validation state forwarded from the surrounding input context. null = pristine.' },
    ],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_track_slots_props.example',
            titleFallback: 'Conditional icon based on model + validity',
            code: `<template #track.true="{ model, isValid }">
  <OrigamIcon
    :icon="isValid === false ? 'mdi-alert' : 'mdi-check'"
    size="10"
  />
</template>`,
            lang: 'html',
        },
    ],
}
