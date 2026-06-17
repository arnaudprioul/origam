import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_GROUP_DOC: IComposableDoc = {
    slug: 'use-group',
    name: 'useGroup',
    domain: 'Commons',
    icon: 'mdi-group',
    descriptionKey: '',
    descriptionFallback: 'Provides a reactive selection group that manages a list of registered items, single or multiple selection, mandatory enforcement, and max limit. Pairs with useGroupItem — the parent calls useGroup, each child calls useGroupItem.',
    signature: `function useGroup(
  props: IGroupProps,
  injectKey: InjectionKey<IGroupProvide>
): IGroupProvide

function useGroupItem(
  props: IGroupItemProps,
  injectKey: InjectionKey<IGroupProvide>,
  required?: boolean
): IGroupItemProvide | null`,
    params: [
        {
            name: 'props',
            type: 'IGroupProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props of the parent group component: modelValue, multiple, mandatory, max, selectedClass, disabled.',
        },
        {
            name: 'injectKey',
            type: 'InjectionKey<IGroupProvide>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Unique injection key used to link the group provider with its children. Must be the same symbol in both useGroup and useGroupItem calls.',
        },
        {
            name: 'required',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            descriptionKey: '',
            descriptionFallback: 'useGroupItem only — when false, the composable returns null silently instead of throwing if no matching group injection is found.',
        },
    ],
    returns: [
        {
            name: 'register',
            type: '(item: IGroupItem, vm: ComponentInternalInstance) => void',
            descriptionKey: '',
            descriptionFallback: 'Registers a child item into the group at the correct DOM order.',
        },
        {
            name: 'unregister',
            type: '(id: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Removes a child item from the group (called automatically on unmount).',
        },
        {
            name: 'selected',
            type: 'Ref<number[]>',
            descriptionKey: '',
            descriptionFallback: 'Reactive list of internal IDs that are currently selected.',
        },
        {
            name: 'select',
            type: '(id: number, value?: boolean) => void',
            descriptionKey: '',
            descriptionFallback: 'Toggles or forces the selection state of a specific item, respecting mandatory and max constraints.',
        },
        {
            name: 'prev',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Moves selection to the previous non-disabled item (wraps around).',
        },
        {
            name: 'next',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Moves selection to the next non-disabled item (wraps around).',
        },
        {
            name: 'isSelected',
            type: '(id: number) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true if the item with the given internal ID is currently selected.',
        },
        {
            name: 'selectedClass',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'CSS class applied to selected items, sourced from the group props.',
        },
        {
            name: 'items',
            type: 'ComputedRef<IGroupItem[]>',
            descriptionKey: '',
            descriptionFallback: 'Ordered list of all registered group items.',
        },
        {
            name: 'getItemIndex',
            type: '(value: unknown) => number',
            descriptionKey: '',
            descriptionFallback: 'Finds the internal index of an item by its external value.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Defining a group provider component',
            code: `<script setup lang="ts">
import { InjectionKey } from 'vue'
import { useGroup } from 'origam'
import type { IGroupProps, IGroupProvide } from 'origam'

const GROUP_KEY: InjectionKey<IGroupProvide> = Symbol('my-group')

const props = defineProps<IGroupProps>()
const { selected, next, prev } = useGroup(props, GROUP_KEY)
</script>

<template>
  <div role="group">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Registering a child item',
            code: `<script setup lang="ts">
import { InjectionKey } from 'vue'
import { useGroupItem } from 'origam'
import type { IGroupItemProps, IGroupProvide } from 'origam'

const GROUP_KEY: InjectionKey<IGroupProvide> = Symbol('my-group')

const props = defineProps<IGroupItemProps>()
const item = useGroupItem(props, GROUP_KEY)
</script>

<template>
  <button
    :class="item?.selectedClass.value"
    @click="item?.toggle()"
  >
    <slot />
  </button>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-active', 'use-v-model'],
    consumedInterfaces: ['IGroupProps', 'IGroupItemProps', 'IGroupProvide', 'IGroupItemProvide'],
    noteFallback: 'useGroup provides state via Vue provide/inject. The injectKey symbol must be shared between the parent and all children — export it from a dedicated const file to avoid symbol identity mismatches across module boundaries.',
}
