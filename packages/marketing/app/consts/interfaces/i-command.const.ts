import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMAND_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-command',
    name: 'ICommand',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_command.description',
    descriptionFallback: 'A single command/action exposed by OrigamCommandPalette — holds the stable id, label, optional description, icon, keyboard shortcut hint, group, extra search keywords and the perform handler.',
    definition: `export interface ICommand {
    id: string
    label: string
    description?: string
    icon?: TIcon
    kbd?: ReadonlyArray<string>
    group?: string
    keywords?: ReadonlyArray<string>
    perform: () => void | Promise<void>
    disabled?: boolean
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Stable identifier used as the v-for key, the ARIA aria-activedescendant target and the dedup key in the registry.' },
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Visible primary label. Drives the default fuzzy-match input.' },
        { name: 'description', type: 'string', optional: true, descriptionFallback: 'Secondary line shown under the label.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Optional prepend icon.' },
        { name: 'kbd', type: 'ReadonlyArray<string>', optional: true, descriptionFallback: 'Keyboard shortcut hint rendered through OrigamKbd next to the action. Display-only — does NOT bind a global listener.' },
        { name: 'group', type: 'string', optional: true, descriptionFallback: 'Group label (e.g. "Navigation", "Settings"). Commands sharing the same group render under the same subheader.' },
        { name: 'keywords', type: 'ReadonlyArray<string>', optional: true, descriptionFallback: 'Extra search terms that should match the command (e.g. ["preferences", "config"] for a "Settings" entry).' },
        { name: 'perform', type: '() => void | Promise<void>', optional: false, descriptionFallback: 'Handler invoked when the command is selected. May be async — the palette awaits the returned promise before closing when closeOnSelect is true.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disabled commands stay visible but cannot be selected.' },
    ],
    usedBy: [
        { slug: 'command-palette', name: 'CommandPalette', kind: 'component' },
        { slug: 'use-command', name: 'useCommand', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/CommandPalette/command.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_command.example_register',
            titleFallback: 'Registering a command via the composable',
            code: `import { useCommand } from 'origam'

const { register } = useCommand()

register({
    id: 'go-settings',
    label: 'Settings',
    icon: 'mdi-cog',
    group: 'Navigation',
    kbd: ['meta', ','],
    perform: () => router.push('/settings'),
})`,
            lang: 'typescript',
        },
        {
            titleKey: 'interfaces.detail.i_command.example_palette',
            titleFallback: 'Declaring commands inline on the palette',
            code: `<OrigamCommandPalette
    v-model="open"
    :commands="[
        { id: 'dark', label: 'Toggle dark mode', icon: 'mdi-theme-light-dark', perform: toggleTheme },
    ]"
/>`,
            lang: 'vue',
        },
    ],
}
