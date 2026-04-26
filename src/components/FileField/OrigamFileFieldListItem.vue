<template>
  <li
      :class="listItemClasses"
      :style="listItemStyles"
  >
    <slot>
      <origam-icon
          :icon="props.fileIcon"
          class="origam-file-field-list-item__icon"
      />
      <div class="origam-file-field-list-item__content">
        <div class="origam-file-field-list-item__name">
          {{ props.file.name }}
        </div>
        <div class="origam-file-field-list-item__meta">
          {{ humanReadableFileSize(props.file.size, base) }}
        </div>
        <origam-progress
            v-if="hasProgress"
            class="origam-file-field-list-item__progress"
            :model-value="props.progress"
            :color="props.color"
            height="4"
            rounded
        />
      </div>
      <div class="origam-file-field-list-item__actions">
        <origam-btn
            :icon="props.removeIcon"
            flat
            size="small"
            :disabled="props.disabled || props.readonly"
            @click.stop="handleRemove"
        />
      </div>
    </slot>
  </li>
</template>

<script
    lang="ts"
    setup
>
  import { computed, StyleValue } from 'vue'

  import { OrigamBtn, OrigamIcon, OrigamProgress } from '../../components'
  import { useDefaults, useProps } from '../../composables'
  import { MDI_ICONS } from '../../enums'
  import type { IFileFieldListItemEmits, IFileFieldListItemProps, IFileFieldListItemSlots } from '../../interfaces'
  import { humanReadableFileSize } from '../../utils'

  /*********************************************************
   * Global
   *
   * @description
   * Props for the `IFileFieldListItemProps` interface used in the component.
   *    Contains default values provided via the `withDefaults` utility.
   * Emits an event. The `defineEmits` function can be used in Vue 3 to declare emitted events.
   *    This variable serves as a declaration point for all events that the component can emit.
   * Slots for the component.
   ********************************************************/
  const _props = withDefaults(defineProps<IFileFieldListItemProps>(), {
    fileIcon: MDI_ICONS.FILE,
    removeIcon: MDI_ICONS.CLOSE,
  })
  const props = useDefaults(_props)

  const emits = defineEmits<IFileFieldListItemEmits>()

  defineSlots<IFileFieldListItemSlots>()

  /*********************************************************
   * Events
   *
   * @description
   * Handlers for remove actions.
   ********************************************************/
  const handleRemove = () => {
    emits('click:remove', { file: props.file, index: props.index })
  }

  /*********************************************************
   * Computed
   *
   * @description
   * Progress and file size helpers.
   ********************************************************/
  const base = computed(() => {
    return typeof props.showSize !== 'boolean' ? props.showSize : undefined
  })
  const hasProgress = computed(() => {
    return typeof props.progress === 'number'
  })

  /*********************************************************
   * Class & Style
   *
   * @description
   * listItemClasses is a computed property that returns an array of classes for the component.
   * listItemStyles is a computed property that returns an array of styles for the component.
   ********************************************************/
  const listItemStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const listItemClasses = computed(() => {
    return [
      'origam-file-field-list-item',
      props.class
    ]
  })

  /*********************************************************
   * Expose
   *
   * @description
   * Exposes functions and components to the world.
   *    filterProps is a function that filters out props that are not defined in the `IFileFieldListItemProps` interface.
   ********************************************************/
  const { filterProps } = useProps<IFileFieldListItemProps>(props)

  defineExpose({ filterProps })
</script>

<style
    lang="scss"
    scoped
>
  .origam-file-field-list-item {
    align-items: center;
    background-color: var(--origam-file-field-list-item---background-color, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--origam-file-field-list-item---border-color, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-file-field-list-item---border-radius, 6px);
    display: flex;
    gap: 12px;
    padding: 10px 12px;

    &__icon {
      flex-shrink: 0;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 4px;
      min-width: 0;
    }

    &__name {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__meta {
      color: var(--origam-file-field-list-item__meta---color, rgba(0, 0, 0, 0.6));
      font-size: 12px;
    }

    &__progress {
      margin-top: 4px;
    }

    &__actions {
      align-items: center;
      display: flex;
      flex-shrink: 0;
      gap: 4px;
    }
  }
</style>
