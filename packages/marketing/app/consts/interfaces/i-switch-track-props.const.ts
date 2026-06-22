import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_TRACK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-track-props',
    name: 'ISwitchTrackProps',
    category: 'Forms & Inputs',
    descriptionKey: 'interfaces.catalog.i_switch_track_props.description',
    descriptionFallback: 'Props for <OrigamSwitchTrack> — the rounded rail behind the thumb. Owns the visual surface (bgColor = rail, color = foreground/thumb intent) and exposes inset, error, disabled and readonly states.',
    definition: `export interface ISwitchTrackProps extends ICommonsComponentProps, IColorProps, IBgColorProps {
    modelValue?: boolean
    isValid?: boolean | null
    disabled?: boolean
    readonly?: boolean
    error?: boolean
    inset?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps'],
    props: [
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'Whether the switch is currently ON. Drives the --dirty modifier on the track.' },
        { name: 'isValid', type: 'boolean | null', optional: true, descriptionFallback: 'Validation state forwarded from the surrounding <OrigamInput>.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disabled state — applies the muted token and blocks pointer events.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Readonly state — keeps visual appearance but blocks input changes.' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Error state — overrides the rail background with the danger token.' },
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Inset (Material) variant — taller, fully-rounded rail.' },
    ],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_track_props.example',
            titleFallback: 'Rendering a track in error state',
            code: `<OrigamSwitchTrack
  :model-value="false"
  :error="true"
  bgColor="danger"
  inset
/>`,
            lang: 'html',
        },
    ],
}
