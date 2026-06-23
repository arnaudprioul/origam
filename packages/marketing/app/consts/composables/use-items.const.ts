import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ITEMS_DOC: IComposableDoc = {
    slug: 'use-items',
    name: 'useItems',
    domain: 'Commons',
    icon: 'mdi-format-list-bulleted',
    descriptionKey: '',
    descriptionFallback: 'Normalises the polymorphic items prop accepted by list-based components (Select, Combobox, Autocomplete, List). Transforms raw item arrays into internal list item descriptors and provides bidirectional model value transformers (in from model, out to model) that respect returnObject mode and a custom value comparator.',
    signature: `function useItems(
  props: IItemProps & { itemType?: string }
): {
  items: ComputedRef<IInternalListItem[]>
  transformIn: (value: any[]) => IInternalListItem[]
  transformOut: (value: IInternalListItem[]) => any[]
}`,
    params: [
        {
            name: 'props',
            type: 'IItemProps & { itemType?: string }',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending IItemProps (items, itemTitle, itemValue, itemProps, returnObject, valueComparator). itemType is an optional tag used during transformation.',
        },
    ],
    returns: [
        {
            name: 'items',
            type: 'ComputedRef<IInternalListItem[]>',
            descriptionKey: '',
            descriptionFallback: 'Computed array of normalised internal list items derived from props.items. Recomputes whenever props.items changes.',
        },
        {
            name: 'transformIn',
            type: '(value: any[]) => IInternalListItem[]',
            descriptionKey: '',
            descriptionFallback: 'Converts an array of model values (or raw objects in returnObject mode) to the matching internal list item descriptors. Handles null-item and custom comparator edge cases.',
        },
        {
            name: 'transformOut',
            type: '(value: IInternalListItem[]) => any[]',
            descriptionKey: '',
            descriptionFallback: 'Converts selected internal list items back to the model value format: raw objects when returnObject is true, item values otherwise.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Normalise a string item list',
            code: `<script setup lang="ts">
import { useItems } from 'origam'

const { items } = useItems({
  items: ['Apple', 'Banana', 'Cherry'],
  itemTitle: (v: string) => v,
  itemValue: (v: string) => v,
  returnObject: false
})
// items.value → [{ title: 'Apple', value: 'Apple', raw: 'Apple', ... }, ...]
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Round-trip with transformIn / transformOut',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useItems } from 'origam'

const modelValue = ref(['banana'])
const { items, transformIn, transformOut } = useItems({
  items: [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' }
  ],
  itemTitle: 'label',
  itemValue: 'id',
  returnObject: false
})

// Convert model → internal selection
const selected = transformIn(modelValue.value)
// Convert internal selection → model
const out = transformOut(selected)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-list', 'use-group'],
    consumedInterfaces: ['IItemProps', 'IInternalListItem'],
}
