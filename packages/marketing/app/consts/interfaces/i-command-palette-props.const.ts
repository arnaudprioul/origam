import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMAND_PALETTE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-command-palette-props',
    name: 'ICommandPaletteProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_command_palette_props.description',
    descriptionFallback: 'Props for OrigamCommandPalette — a global ⌘K command palette that fuzzy-searches registered commands, supports custom hotkeys, grouping, async loading and slot customisation.',
    definition: `export interface ICommandPaletteProps extends ICommonsComponentProps {
    modelValue?: boolean
    hotkey?: TCommandPaletteHotkey | null
    commands?: ReadonlyArray<ICommand>
    placeholder?: string
    emptyText?: string
    maxHeight?: number | string
    width?: number | string
    loading?: boolean
    closeOnSelect?: boolean
    closeOnEscape?: boolean
    closeOnBackdrop?: boolean
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'Whether the palette is open. Used with v-model.' },
        { name: 'hotkey', type: 'TCommandPaletteHotkey | null', optional: true, descriptionFallback: 'Global hotkey(s) that toggle the palette. Defaults to [["meta","k"],["ctrl","k"]]. Pass null to disable.' },
        { name: 'commands', type: 'ReadonlyArray<ICommand>', optional: true, descriptionFallback: 'Static command list. When omitted the palette uses commands registered via the useCommand() global registry.' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder of the search input (already-translated string).' },
        { name: 'emptyText', type: 'string', optional: true, descriptionFallback: 'Empty-state message shown when no command matches the query.' },
        { name: 'maxHeight', type: 'number | string', optional: true, descriptionFallback: 'Max height of the result list. Number → px.' },
        { name: 'width', type: 'number | string', optional: true, descriptionFallback: 'Width of the palette dialog. Number → px.' },
        { name: 'loading', type: 'boolean', optional: true, descriptionFallback: 'Display a loader inside the result list (use during async command fetches).' },
        { name: 'closeOnSelect', type: 'boolean', optional: true, descriptionFallback: 'Close the palette automatically when a command is selected.' },
        { name: 'closeOnEscape', type: 'boolean', optional: true, descriptionFallback: 'Close when the user presses Escape.' },
        { name: 'closeOnBackdrop', type: 'boolean', optional: true, descriptionFallback: 'Close when the user clicks the backdrop.' },
    ],
    usedBy: [
        { slug: 'command-palette', name: 'CommandPalette', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/CommandPalette/command-palette.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_command_palette_props.example_basic',
            titleFallback: 'Minimal palette with default hotkey',
            code: `<OrigamCommandPalette v-model="open" />`,
            lang: 'vue',
        },
        {
            titleKey: 'interfaces.detail.i_command_palette_props.example_custom',
            titleFallback: 'Custom hotkey and width with async loading',
            code: `<OrigamCommandPalette
    v-model="open"
    :hotkey="[['ctrl', 'p']]"
    :loading="fetching"
    :width="560"
    :close-on-select="true"
    @query="fetchCommands"
/>`,
            lang: 'vue',
        },
    ],
}
