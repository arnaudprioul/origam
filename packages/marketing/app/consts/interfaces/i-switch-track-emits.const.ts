import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_TRACK_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-track-emits',
    name: 'ISwitchTrackEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_switch_track_emits.description',
    descriptionFallback: 'Emit contract for <OrigamSwitchTrack> — extends commons component emits with a native click event forwarded from the track rail.',
    definition: `export interface ISwitchTrackEmits extends ICommonsComponentEmits {
    (e: 'click', event: MouseEvent): void
}`,
    extends: ['ICommonsComponentEmits'],
    props: [
        { name: 'click', type: '(e: \'click\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the track rail is clicked.' },
    ],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_track_emits.example',
            titleFallback: 'Extending the track emits interface',
            code: `import type { ISwitchTrackEmits } from 'origam'

interface IMyTrackEmits extends ISwitchTrackEmits {
    (e: 'animationEnd'): void
}`,
            lang: 'typescript',
        },
    ],
}
