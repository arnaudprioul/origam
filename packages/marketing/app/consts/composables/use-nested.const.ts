import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_NESTED_DOC: IComposableDoc = {
    slug: 'use-nested',
    name: 'useNested',
    domain: 'Commons',
    icon: 'mdi-family-tree',
    descriptionKey: '',
    descriptionFallback: 'Manages a tree of selectable and openable items via provide/inject. Maintains a parent→child registry, applies a configurable open strategy (single / list / multiple) and a select strategy (classic / leaf / independent / single-leaf / single-independent). Used internally by OrigamTreeview, OrigamList, and OrigamExpansionPanels.',
    signature: `// Root — call once on the container component
function useNested(props: INestedProps): {
  opened: Ref<Set<unknown>>
  selected: Ref<Map<unknown, 'on' | 'off' | 'indeterminate'>>
  selectedValues: ComputedRef<unknown[]>
  register: (id: unknown, parentId: unknown, isGroup: boolean) => void
  unregister: (id: unknown) => void
  open: (id: unknown, value: boolean, event?: Event) => void
  select: (id: unknown, value: boolean, event?: Event) => void
  children: Ref<Map<unknown, unknown[]>>
  parents: Ref<Map<unknown, unknown>>
}

// Item — call on each tree node
function useNestedItem(
  id: Ref<unknown>,
  isGroup: boolean
): { isOpen: ComputedRef<boolean>; isSelected: ComputedRef<boolean>; isIndeterminate: ComputedRef<boolean>; isLeaf: ComputedRef<boolean>; open: (open: boolean, e: Event) => void; select: (selected: boolean, e?: Event) => void; parent: ComputedRef<unknown> }

// Group activator — call inside a group activator slot
function useNestedGroupActivator(): void`,
    params: [
        {
            name: 'props',
            type: 'INestedProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props including `opened` (initial open set), `selected` (initial selection map), `selectStrategy` (string or custom object), `openStrategy` (string or custom object), and `mandatory`.',
        },
    ],
    returns: [
        {
            name: 'opened',
            type: 'Ref<Set<unknown>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive set of currently open node IDs. Synced to v-model:opened via useVModel.',
        },
        {
            name: 'selected',
            type: 'Ref<Map<unknown, "on" | "off" | "indeterminate">>',
            descriptionKey: '',
            descriptionFallback: 'Reactive selection map. Values are "on", "off", or "indeterminate" (for classic strategy parent nodes).',
        },
        {
            name: 'selectedValues',
            type: 'ComputedRef<unknown[]>',
            descriptionKey: '',
            descriptionFallback: 'Flat array of IDs whose selection state is "on". Convenient for v-model:selected binding.',
        },
        {
            name: 'register',
            type: '(id: unknown, parentId: unknown, isGroup: boolean) => void',
            descriptionKey: '',
            descriptionFallback: 'Registers a node in the parent/children maps. Called automatically by useNestedItem on mount.',
        },
        {
            name: 'unregister',
            type: '(id: unknown) => void',
            descriptionKey: '',
            descriptionFallback: 'Removes a node from all maps and closes it. Called automatically by useNestedItem on unmount.',
        },
        {
            name: 'open',
            type: '(id: unknown, value: boolean, event?: Event) => void',
            descriptionKey: '',
            descriptionFallback: 'Toggles the open state of a node according to the active open strategy. Emits click:open and update:opened.',
        },
        {
            name: 'select',
            type: '(id: unknown, value: boolean, event?: Event) => void',
            descriptionKey: '',
            descriptionFallback: 'Applies the active select strategy for the given node. Emits click:select and update:selected.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Treeview with classic select strategy',
            code: `<template>
  <origam-treeview
    :items="tree"
    v-model:opened="opened"
    v-model:selected="selected"
    select-strategy="classic"
    open-strategy="multiple"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const opened = ref([])
const selected = ref([])
const tree = [
  { id: 1, title: 'Root', children: [
    { id: 2, title: 'Child A' },
    { id: 3, title: 'Child B' }
  ]}
]
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Single-open expansion panel list',
            code: `<template>
  <origam-expansion-panels
    v-model="expanded"
    open-strategy="single"
  >
    <origam-expansion-panel title="Panel 1">Content 1</origam-expansion-panel>
    <origam-expansion-panel title="Panel 2">Content 2</origam-expansion-panel>
  </origam-expansion-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const expanded = ref([])
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-group', 'use-active'],
    consumedInterfaces: ['INestedProps'],
}
