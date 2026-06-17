import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_COMMAND_DOC: IComposableDoc = {
    slug: 'use-command',
    name: 'useCommand',
    domain: 'CommandPalette',
    icon: 'mdi-console-line',
    descriptionKey: '',
    descriptionFallback: 'Process-wide command palette registry. Uses module-scope state (not provide/inject) so commands can be registered from anywhere — feature code, plugins, background services — without coupling to a Vue tree. Two callers on the same module instance see the exact same reactive list.',
    signature: `function useCommand(): {
  register: (cmd: ICommand) => () => void
  unregister: (id: string) => void
  commands: ComputedRef<ReadonlyArray<ICommand>>
  open: () => void
  close: () => void
  isOpen: Ref<boolean>
}`,
    params: [],
    returns: [
        {
            name: 'register',
            type: '(cmd: ICommand) => () => void',
            descriptionKey: '',
            descriptionFallback: 'Register a command. Returns an unregister() closure. When called inside a Vue effect scope, the entry is auto-unregistered on scope dispose (component unmount, route leave).',
        },
        {
            name: 'unregister',
            type: '(id: string) => void',
            descriptionKey: '',
            descriptionFallback: 'Drop the entry with the matching id. No-op if the id is unknown.',
        },
        {
            name: 'commands',
            type: 'ComputedRef<ReadonlyArray<ICommand>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive read-only view of every registered command, deduplicated by id.',
        },
        {
            name: 'open',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Open the global palette singleton.',
        },
        {
            name: 'close',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Close the global palette singleton.',
        },
        {
            name: 'isOpen',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reactive open/close state of the global palette singleton.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Register a command from a feature component',
            code: `<script setup lang="ts">
import { useCommand } from 'origam'

const { register } = useCommand()

// Auto-unregistered when the component unmounts
register({
  id: 'new-document',
  label: 'New document',
  icon: 'mdi-file-plus',
  shortcut: 'Ctrl+N',
  action: () => createDocument()
})
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Open and close the palette programmatically',
            code: `<script setup lang="ts">
import { useCommand } from 'origam'

const { open, close, isOpen } = useCommand()
</script>

<template>
  <button @click="open">Open palette</button>
  <origam-command-palette :model-value="isOpen" @update:model-value="isOpen.value = $event" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-hotkey'],
    consumedInterfaces: ['ICommand'],
    noteFallback: 'Entries are deduplicated by id at write time. Calling register() with the same id replaces the previous entry in place so the array length stays stable and watchers on length only see one mutation.',
}
