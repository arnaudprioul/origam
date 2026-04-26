<template>
  <div
      :class="dragNDropItemClasses"
      :style="dragNDropItemStyles"
  >
    <slot>
      <origam-icon
          :icon="props.fileIcon"
          class="origam-file-field-dragndrop-item__icon"
      />
      <div class="origam-file-field-dragndrop-item__content">
        <div class="origam-file-field-dragndrop-item__name">
          {{ props.file.name }}
        </div>
        <div class="origam-file-field-dragndrop-item__meta">
          {{ humanReadableFileSize(props.file.size, base) }}
        </div>
        <origam-progress
            v-if="hasProgress"
            class="origam-file-field-dragndrop-item__progress"
            :model-value="props.progress"
            :color="props.color"
            height="4"
            rounded
        />
      </div>
      <div class="origam-file-field-dragndrop-item__actions">
        <origam-btn
            :icon="props.removeIcon"
            flat
            size="small"
            :disabled="props.disabled || props.readonly"
            @click.stop.prevent="handleRemove"
        />
      </div>
    </slot>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { computed, StyleValue } from 'vue'

  import { OrigamBtn, OrigamIcon, OrigamProgress } from '../../components'
  import { useDefaults, useProps } from '../../composables'
  import { MDI_ICONS } from '../../enums'
  import type { IFileFieldDragNDropItemEmits, IFileFieldDragNDropItemProps, IFileFieldDragNDropItemSlots } from '../../interfaces'
  import { humanReadableFileSize } from '../../utils'

  /*********************************************************
   * Global
   *
   * @description
   * Props for the `IFileFieldDragNDropItemProps` interface used in the component.
   *    Contains default values provided via the `withDefaults` utility.
   * Emits an event. The `defineEmits` function can be used in Vue 3 to declare emitted events.
   *    This variable serves as a declaration point for all events that the component can emit.
   * Slots for the component.
   ********************************************************/
  const _props = withDefaults(defineProps<IFileFieldDragNDropItemProps>(), {
    fileIcon: MDI_ICONS.FILE,
    removeIcon: MDI_ICONS.CLOSE,
  })
  const props = useDefaults(_props)

  const emits = defineEmits<IFileFieldDragNDropItemEmits>()

  defineSlots<IFileFieldDragNDropItemSlots>()

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
   * dragNDropItemClasses is a computed property that returns an array of classes for the component.
   * dragNDropItemStyles is a computed property that returns an array of styles for the component.
   ********************************************************/
  const dragNDropItemStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const dragNDropItemClasses = computed(() => {
    return [
      'origam-file-field-dragndrop-item',
      props.class
    ]
  })

  /*********************************************************
   * Expose
   *
   * @description
   * Exposes functions and components to the world.
   *    filterProps is a function that filters out props that are not defined in the `IFileFieldDragNDropItemProps` interface.
   ********************************************************/
  const { filterProps } = useProps<IFileFieldDragNDropItemProps>(props)

  defineExpose({ filterProps })
</script>

<style
    lang="scss"
    scoped
>
  .origam-file-field-dragndrop-item {
    align-items: center;
    display: flex;
    gap: 12px;
    width: 100%;
    z-index: 2;

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
      color: var(--origam-file-field-dragndrop-item__meta---color, rgba(0, 0, 0, 0.6));
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
