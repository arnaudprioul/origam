import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOTKEY_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hotkey-options',
    name: 'IHotkeyOptions',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hotkey_options.description',
    descriptionFallback: 'Configuration options for the useHotkey composable and the v-hotkey directive — controls the listened event type, whether inputs are excluded and sequence timing.',
    definition: `export interface IHotkeyOptions {
    event?: MaybeRef<'keydown' | 'keyup'>
    inputs?: MaybeRef<boolean>
    preventDefault?: MaybeRef<boolean>
    sequenceTimeout?: MaybeRef<number>
}`,
    extends: [],
    props: [
        { name: 'event', type: "MaybeRef<'keydown' | 'keyup'>", optional: true, descriptionFallback: "Keyboard event to listen on — 'keydown' (default) or 'keyup'." },
        { name: 'inputs', type: 'MaybeRef<boolean>', optional: true, descriptionFallback: 'When true, the hotkey fires even when focus is inside an input, textarea or select element. Defaults to false.' },
        { name: 'preventDefault', type: 'MaybeRef<boolean>', optional: true, descriptionFallback: 'When true, calls event.preventDefault() before invoking the handler. Defaults to false.' },
        { name: 'sequenceTimeout', type: 'MaybeRef<number>', optional: true, descriptionFallback: 'Milliseconds allowed between successive keys in a sequence binding before the sequence resets. Defaults to 1000.' },
    ],
    usedBy: [
        { slug: 'use-hotkey', name: 'useHotkey', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/hotkey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hotkey_options.example',
            titleFallback: 'Passing options to useHotkey',
            code: `import { useHotkey } from 'origam'
import type { IHotkeyOptions } from 'origam'

const options: IHotkeyOptions = {
    event: 'keydown',
    inputs: false,
    preventDefault: true,
    sequenceTimeout: 800,
}

useHotkey('ctrl+k', () => openSearch(), options)`,
            lang: 'typescript',
        },
    ],
}
