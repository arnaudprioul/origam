<template>
  <teleport to="body">
    <component
      :is="tag"
      :id="resolvedDomId"
      ref="rootRef"
      :aria-label="'Notifications'"
      :class="stackClasses"
      :style="stackStyles"
      role="region"
    >
      <transition-group
        :name="transitionName"
        tag="div"
        class="origam-snackbar-stack__items"
      >
        <origam-snackbar-item
          v-for="item in visibleItems"
          :key="item.id"
          :actions="item.actions"
          :aria-live="resolveAriaLive(item.intent)"
          :data-cy="`origam-snackbar-stack-item-${item.id}`"
          :dismiss-label="'Dismiss notification'"
          :dismissible="resolveDismissible(item)"
          :icon="item.icon"
          :intent="item.intent ?? 'info'"
          :message="item.message"
          :role="resolveAriaRole(item.intent)"
          :title="item.title"
          @action="(action) => handleActionClick(item, action)"
          @dismiss="handleDismissClick(item.id)"
        />
      </transition-group>
    </component>
  </teleport>
</template>

<script
  lang="ts"
  setup
>
  import { computed, ref, StyleValue } from 'vue'

  import OrigamSnackbarItem from '../SnackbarItem/OrigamSnackbarItem.vue'

  import { useProps, useStyle } from '../../composables'
  import { useSnackbarStackInternal } from '../../composables/SnackbarStack/snackbar-stack.composable'

  import {
    SNACKBAR_STACK_DEFAULT_DURATION,
    SNACKBAR_STACK_DEFAULT_ID,
    SNACKBAR_STACK_DEFAULT_MAX,
    SNACKBAR_STACK_DEFAULT_SPACING
  } from '../../consts'

  import type {
    ISnackbarStackItem,
    ISnackbarStackItemAction,
    ISnackbarStackProps
  } from '../../interfaces'

  import type { TIntent, TSnackbarStackDirection } from '../../types'

  /*********************************************************
   * Global
   *
   * @description
   * Props + filterProps for consumers that re-export the
   * stack as part of another composite.
   ********************************************************/
  const props = withDefaults(defineProps<ISnackbarStackProps>(), {
    tag: 'div',
    id: SNACKBAR_STACK_DEFAULT_ID,
    location: 'bottom-right',
    max: SNACKBAR_STACK_DEFAULT_MAX,
    defaultDuration: SNACKBAR_STACK_DEFAULT_DURATION,
    spacing: SNACKBAR_STACK_DEFAULT_SPACING
  })

  const { filterProps } = useProps<ISnackbarStackProps>(props)

  const rootRef = ref<HTMLElement>()

  /*********************************************************
   * Store wiring
   *
   * @description
   * The component subscribes to the matching stack id via
   * `useSnackbarStackInternal`. Items are mutated by the
   * public `useSnackbarStack({ id }).notify / dismiss /
   * dismissAll` composable — this side only reads them.
   ********************************************************/
  const { rawItems } = useSnackbarStackInternal(props.id)

  const visibleItems = computed<ReadonlyArray<ISnackbarStackItem>>(() => {
    const items = rawItems.value

    // FIFO trim — visible slice respects the `max` cap. The
    // composable also enforces a max if its `max` option is set,
    // but the component cap is independent: consumers can keep
    // many items in the store while only painting a few.
    const sliced = items.slice(-props.max)

    return effectiveDirection.value === 'bottom-up' ? [...sliced].reverse() : sliced
  })

  /*********************************************************
   * Direction & ARIA
   *
   * @description
   * `direction` defaults to `top-down` for `top-*` anchors
   * and `bottom-up` for `bottom-*` anchors so the newest
   * toast always appears closest to the anchored edge.
   ********************************************************/
  const effectiveDirection = computed<TSnackbarStackDirection>(() => {
    if (props.direction) return props.direction

    return props.location.startsWith('top') ? 'top-down' : 'bottom-up'
  })

  const resolveAriaRole = (intent?: TIntent): 'status' | 'alert' => {
    return intent === 'warning' || intent === 'danger' ? 'alert' : 'status'
  }

  const resolveAriaLive = (intent?: TIntent): 'polite' | 'assertive' => {
    return intent === 'warning' || intent === 'danger' ? 'assertive' : 'polite'
  }

  /*********************************************************
   * Items helpers
   ********************************************************/
  const resolveDismissible = (item: ISnackbarStackItem): boolean => {
    return item.dismissible !== false
  }

  /*********************************************************
   * Event handlers
   *
   * @description
   * `dismiss` is intentionally NOT imported from the public
   * `useSnackbarStack` here to avoid forming a circular
   * dependency at module init time. We mutate the raw items
   * directly through the internal helper.
   ********************************************************/
  const dismissItem = (itemId: string): void => {
    const index = rawItems.value.findIndex(it => it.id === itemId)

    if (index === -1) return

    const [removed] = rawItems.value.splice(index, 1)

    removed?.onDismiss?.()
  }

  const handleDismissClick = (itemId: string): void => {
    dismissItem(itemId)
  }

  const handleActionClick = (item: ISnackbarStackItem, action: ISnackbarStackItemAction): void => {
    action.handler()

    if (!action.keepOpen) {
      dismissItem(item.id)
    }
  }

  /*********************************************************
   * Class & Style
   ********************************************************/
  const transitionName = computed<string>(() => {
    if (props.location.startsWith('top')) return 'origam-snackbar-stack--slide-down'

    return 'origam-snackbar-stack--slide-up'
  })

  const spacingValue = computed<string>(() => {
    if (typeof props.spacing === 'number') return `${props.spacing}px`

    return props.spacing
  })

  const stackStyles = computed<StyleValue>(() => {
    return [
      {
        '--origam-snackbar-stack---gap': spacingValue.value
      },
      props.style
    ] as StyleValue
  })

  const stackClasses = computed(() => {
    return [
      'origam-snackbar-stack',
      `origam-snackbar-stack--${props.location}`,
      `origam-snackbar-stack--direction-${effectiveDirection.value}`,
      props.class
    ]
  })

  // The teleport target re-uses the consumer's `id` prop as both the
  // store key AND the DOM id of the rendered region. Doing it once
  // keeps screen-reader announcements addressable from outside.
  const resolvedDomId = computed(() => `origam-snackbar-stack-${props.id}`)

  const { id: styleId, css, load, isLoaded, unload } = useStyle(stackStyles)

  /*********************************************************
   * Expose
   ********************************************************/
  defineExpose({
    filterProps,
    visibleItems,
    css,
    id: styleId,
    load,
    unload,
    isLoaded
  })
</script>

<style
  lang="scss"
  scoped
>
  .origam-snackbar-stack {
    position: fixed;
    z-index: var(--origam-snackbar-stack---z-index, var(--origam-z-index-toast, 1060));
    pointer-events: none;
    max-width: var(--origam-snackbar-stack---max-width, 420px);
    width: max-content;
    display: flex;
    flex-direction: column;

    &__items {
      display: flex;
      flex-direction: column;
      gap: var(--origam-snackbar-stack---gap, 12px);
      width: 100%;
    }

    &--top-left {
      top: var(--origam-snackbar-stack---position-top, 16px);
      left: var(--origam-snackbar-stack---position-left, 16px);
    }

    &--top-right {
      top: var(--origam-snackbar-stack---position-top, 16px);
      right: var(--origam-snackbar-stack---position-right, 16px);
    }

    &--top-center,
    &--top {
      top: var(--origam-snackbar-stack---position-top, 16px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom-left {
      bottom: var(--origam-snackbar-stack---position-bottom, 16px);
      left: var(--origam-snackbar-stack---position-left, 16px);
    }

    &--bottom-right {
      bottom: var(--origam-snackbar-stack---position-bottom, 16px);
      right: var(--origam-snackbar-stack---position-right, 16px);
    }

    &--bottom-center,
    &--bottom {
      bottom: var(--origam-snackbar-stack---position-bottom, 16px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--slide-down-enter-from,
    &--slide-down-leave-to {
      opacity: 0;
      transform: translateY(-12px);
    }

    &--slide-up-enter-from,
    &--slide-up-leave-to {
      opacity: 0;
      transform: translateY(12px);
    }

    &--slide-down-enter-active,
    &--slide-down-leave-active,
    &--slide-up-enter-active,
    &--slide-up-leave-active {
      transition: opacity var(--origam-snackbar-stack---transition-duration, 180ms) ease,
      transform var(--origam-snackbar-stack---transition-duration, 180ms) ease;
    }

    &--slide-down-move,
    &--slide-up-move {
      transition: transform var(--origam-snackbar-stack---transition-duration, 180ms) ease;
    }

    @media (prefers-reduced-motion: reduce) {
      &--slide-down-enter-active,
      &--slide-down-leave-active,
      &--slide-up-enter-active,
      &--slide-up-leave-active {
        transition: opacity 100ms ease;
        transform: none !important;
      }

      &--slide-down-enter-from,
      &--slide-down-leave-to,
      &--slide-up-enter-from,
      &--slide-up-leave-to {
        transform: none;
      }
    }
  }
</style>

<style>
  :root {
    --origam-snackbar-stack---gap: 12px;
    --origam-snackbar-stack---max-width: 420px;
    --origam-snackbar-stack---position-top: 16px;
    --origam-snackbar-stack---position-bottom: 16px;
    --origam-snackbar-stack---position-left: 16px;
    --origam-snackbar-stack---position-right: 16px;
    --origam-snackbar-stack---transition-duration: 180ms;
  }
</style>
