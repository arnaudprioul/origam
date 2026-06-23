import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMAND_PALETTE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-command-palette-emits',
    name: 'ICommandPaletteEmits',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_command_palette_emits.description',
    descriptionFallback: 'Emits fired by OrigamCommandPalette — open/close state, selected command, and search query text.',
    definition: `export interface ICommandPaletteEmits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'select', command: ICommand): void
    (e: 'query', text: string): void
}`,
    extends: [],
    props: [
        { name: 'update:modelValue', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Emitted when the palette opens or closes. Used to sync v-model.' },
        { name: 'select', type: '(command: ICommand) => void', optional: false, descriptionFallback: 'Emitted when the user confirms a command. The full ICommand object is passed to allow additional side-effects at the call site.' },
        { name: 'query', type: '(text: string) => void', optional: false, descriptionFallback: 'Emitted on every keystroke in the search input. Useful for async command fetching or analytics.' },
    ],
    usedBy: [
        { slug: 'command-palette', name: 'CommandPalette', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/CommandPalette/command-palette.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_command_palette_emits.example',
            titleFallback: 'Handling palette events',
            code: `<OrigamCommandPalette
    v-model="open"
    @select="onCommand"
    @query="onSearch"
/>`,
            lang: 'vue',
        },
    ],
}
