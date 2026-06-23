import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SNACKBAR_GROUP_DOC: IComposableDoc = {
    slug: 'use-snackbar-group',
    name: 'useSnackbarGroup',
    domain: 'Snackbar',
    icon: 'mdi-bell-outline',
    descriptionKey: '',
    descriptionFallback: 'Module-level singleton store for a named snackbar stack. Push notifications via notify(), dismiss them by id or all at once. Each call sharing the same id option reads and writes the same reactive items list — the composable and the matching <OrigamSnackbarGroup id="…"> component share live state with no event bus required.',
    signature: `function useSnackbarGroup(
  options?: IUseSnackbarGroupOptions
): {
  items: Readonly<Ref<ReadonlyArray<ISnackbarGroupItem>>>
  notify: (opts: ISnackbarGroupItemOptions) => string
  dismiss: (itemId: string) => void
  dismissAll: () => void
}`,
    params: [
        {
            name: 'options',
            type: 'IUseSnackbarGroupOptions',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional configuration. id (string) namespaces the stack so multiple independent stacks can coexist on the same page (default: SNACKBAR_GROUP_DEFAULT_ID). max (number) caps the stack size with FIFO eviction. defaultDuration (ms) is the fallback auto-dismiss delay for items that omit their own (default: 5000 ms).',
        },
    ],
    returns: [
        {
            name: 'items',
            type: 'Readonly<Ref<ReadonlyArray<ISnackbarGroupItem>>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive read-only snapshot of the current stack. Mutate only through notify / dismiss / dismissAll — direct writes are blocked at the TypeScript level.',
        },
        {
            name: 'notify',
            type: '(opts: ISnackbarGroupItemOptions) => string',
            descriptionKey: '',
            descriptionFallback: 'Push a new item onto the stack. Accepts ISnackbarGroupItemOptions (message, variant, icon, duration, onDismiss callback…). Returns the generated item id so the caller can dismiss it early.',
        },
        {
            name: 'dismiss',
            type: '(itemId: string) => void',
            descriptionKey: '',
            descriptionFallback: 'Remove the item with the given id from the stack, cancel its auto-dismiss timer, and invoke its onDismiss callback if any.',
        },
        {
            name: 'dismissAll',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Dismiss every item in the stack in one call. Iterates a snapshot of the ids so mid-loop mutations are safe.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Push a success notification from any component',
            code: `<script setup lang="ts">
import { useSnackbarGroup } from 'origam'

const { notify } = useSnackbarGroup()

function save() {
  // … perform save …
  notify({ message: 'Record saved', variant: 'success', duration: 4000 })
}
</script>

<template>
  <origam-btn @click="save">Save</origam-btn>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Named stack with bounded capacity',
            code: `<!-- app.vue — register the rendering component once -->
<origam-snackbar-group id="alerts" :max="3" />

<!-- any.vue — address the same stack by id -->
<script setup lang="ts">
import { useSnackbarGroup } from 'origam'

const { notify, dismissAll } = useSnackbarGroup({ id: 'alerts', max: 3 })
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-snackbar'],
    consumedInterfaces: ['IUseSnackbarGroupOptions', 'ISnackbarGroupItem', 'ISnackbarGroupItemOptions'],
    noteFallback: 'The store is a module-level Map keyed by id. It persists across component unmounts — dismissAll() or setting a low max are the recommended cleanup strategies. For testing, import resetSnackbarGroupForTesting() to wipe counters and timers between specs.',
}
