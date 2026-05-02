<template>
  <component
    :is="tag"
    :class="itemClasses"
    :style="itemStyles"
  >
    <slot
      name="default"
      v-bind="slotProps"
    />
  </component>
</template>

<script
  lang="ts"
  setup
>
  /**
   * Renderless item primitive — pairs with `<OrigamItemGroup>`.
   * Renders only its default slot, exposing the group registration
   * helpers as scope: `isSelected`, `selectedClass`, `toggle`,
   * `select`, `value`, `disabled`. Mirrors Vuetify's `<v-item>`.
   *
   * Typical usage — a card that toggles its border on selection:
   *
   *   <OrigamItemGroup v-model="picked">
   *     <OrigamItem v-for="opt in options"
   *                  :key="opt.value"
   *                  :value="opt.value"
   *                  v-slot="{ isSelected, toggle }">
   *       <OrigamCard :class="{ active: isSelected }" @click="toggle">
   *         {{ opt.label }}
   *       </OrigamCard>
   *     </OrigamItem>
   *   </OrigamItemGroup>
   */
  import { computed, StyleValue } from 'vue'

  import { useGroupItem, useProps } from '../../composables'

  import { ORIGAM_ITEM_GROUP_KEY } from '../../consts'

  import type { IItemGroupItemProps } from '../../interfaces'

  const props = withDefaults(defineProps<IItemGroupItemProps>(), {
    tag: 'div'
  })

  const { filterProps } = useProps<IItemGroupItemProps>(props)

  const groupItem = useGroupItem(props, ORIGAM_ITEM_GROUP_KEY)

  if (!groupItem) {
    throw new Error('[Origam] <OrigamItem> must be used inside an <OrigamItemGroup>')
  }

  const slotProps = computed(() => ({
    isSelected: groupItem.isSelected.value,
    selectedClass: groupItem.selectedClass.value,
    toggle: groupItem.toggle,
    select: groupItem.select,
    value: groupItem.value.value,
    disabled: groupItem.disabled.value
  }))

  // CLASS

  const itemClasses = computed(() => {
    return [
      'origam-item',
      groupItem?.selectedClass.value,
      props.class
    ]
  })
  const itemStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })

  // EXPOSE

  defineExpose({
    filterProps,
    toggle: groupItem.toggle
  })
</script>
