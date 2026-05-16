<template>
  <Story
    group="components"
    title="SnackbarItem/OrigamSnackbarItem"
  >
    <Variant
      title="Playground"
      :init-state="() => useStoryInitState<ISnackbarItemProps>({
        intent: 'info',
        title: 'Notification title',
        message: 'A body message with more context.',
        dismissible: true
      })"
    >
      <template #default="{ state }">
        <div
          class="story-shell"
          data-cy="snackbar-item-playground-host"
        >
          <origam-snackbar-item
            v-bind="state"
            data-cy="snackbar-item-playground"
            @dismiss="playgroundDismissed++"
            @action="playgroundActionFired++"
          />
          <div
            class="story-status"
            data-cy="snackbar-item-playground-status"
          >
            Dismissed: {{ playgroundDismissed }} — Actions: {{ playgroundActionFired }}
          </div>
        </div>
      </template>
      <template #controls="{ state }">
        <HstSelect
          v-model="state.intent"
          title="intent"
          :options="intentOptions"
        />
        <HstText
          v-model="state.title"
          title="title"
        />
        <HstText
          v-model="state.message"
          title="message"
        />
        <HstCheckbox
          v-model="state.dismissible"
          title="dismissible"
        />
      </template>
    </Variant>

    <Variant title="Prop — intent">
      <div
        class="story-shell"
        data-cy="snackbar-item-intent-host"
      >
        <origam-snackbar-item
          v-for="intent in intents"
          :key="intent"
          :data-cy="`snackbar-item-intent-${intent}`"
          :intent="intent"
          :message="`${intent} flavoured item.`"
          :title="intent"
        />
      </div>
    </Variant>

    <Variant title="Prop — dismissible">
      <div
        class="story-shell"
        data-cy="snackbar-item-dismissible-host"
      >
        <origam-snackbar-item
          :dismissible="true"
          data-cy="snackbar-item-dismissible-true"
          intent="info"
          message="This item has a dismiss button."
          title="Dismissible"
        />
        <origam-snackbar-item
          :dismissible="false"
          data-cy="snackbar-item-dismissible-false"
          intent="info"
          message="This item has no dismiss button."
          title="Not dismissible"
        />
      </div>
    </Variant>

    <Variant title="Prop — actions">
      <div
        class="story-shell"
        data-cy="snackbar-item-actions-host"
      >
        <origam-snackbar-item
          :actions="sampleActions"
          data-cy="snackbar-item-with-actions"
          intent="warning"
          message="A row was removed from your list."
          title="Item deleted"
          @action="handleAction"
        />
      </div>
    </Variant>

    <Variant title="Slot — actions">
      <div
        class="story-shell"
        data-cy="snackbar-item-slot-actions-host"
      >
        <origam-snackbar-item
          data-cy="snackbar-item-slot-actions"
          intent="success"
          message="Profile updated successfully."
          title="Saved"
        >
          <template #actions>
            <button
              class="story-btn"
              data-cy="snackbar-item-slot-action-undo"
              type="button"
              @click="slotActionFired++"
            >
              Undo
            </button>
          </template>
        </origam-snackbar-item>
        <div
          class="story-status"
          data-cy="snackbar-item-slot-action-counter"
        >
          Slot action clicks: {{ slotActionFired }}
        </div>
      </div>
    </Variant>

    <Variant title="Slot — prepend">
      <div
        class="story-shell"
        data-cy="snackbar-item-prepend-host"
      >
        <origam-snackbar-item
          data-cy="snackbar-item-prepend"
          intent="info"
          message="Custom prepend icon via slot."
          title="Custom icon"
        >
          <template #prepend>
            <origam-icon
              :icon="MDI_ICONS.HEART"
              :size="24"
            />
          </template>
        </origam-snackbar-item>
      </div>
    </Variant>

    <Variant title="Emit — dismiss">
      <div
        class="story-shell"
        data-cy="snackbar-item-emit-host"
      >
        <origam-snackbar-item
          data-cy="snackbar-item-emit"
          intent="danger"
          message="Click the dismiss button."
          title="Dismiss me"
          @dismiss="emitDismissCount++"
        />
        <div
          class="story-status"
          data-cy="snackbar-item-emit-counter"
        >
          Dismissed: {{ emitDismissCount }}
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script
  lang="ts"
  setup
>
  import { ref } from 'vue'

  import { OrigamIcon, OrigamSnackbarItem } from '@origam/components'
  import { MDI_ICONS } from '@origam/enums'
  import type { ISnackbarItemProps } from '@origam/interfaces'
  import type { ISnackbarGroupItemAction } from '@origam/interfaces'
  import type { TIntent } from '@origam/types'
  import type { IOptions } from '@origam/interfaces'

  import { useStoryInitState } from '@stories/composables'

  const intents: ReadonlyArray<TIntent> = ['info', 'success', 'warning', 'danger', 'primary', 'neutral']

  const intentOptions: Array<IOptions<TIntent>> = [
    { label: 'info',      value: 'info' },
    { label: 'success',   value: 'success' },
    { label: 'warning',   value: 'warning' },
    { label: 'danger',    value: 'danger' },
    { label: 'primary',   value: 'primary' },
    { label: 'neutral',   value: 'neutral' },
    { label: 'secondary', value: 'secondary' },
    { label: 'ghost',     value: 'ghost' }
  ]

  const sampleActions: ReadonlyArray<ISnackbarGroupItemAction> = [
    {
      label: 'Undo',
      intent: 'primary',
      handler: () => {
        actionClickCount.value++
      }
    }
  ]

  const playgroundDismissed = ref<number>(0)
  const playgroundActionFired = ref<number>(0)
  const actionClickCount = ref<number>(0)
  const slotActionFired = ref<number>(0)
  const emitDismissCount = ref<number>(0)

  const handleAction = (action: ISnackbarGroupItemAction): void => {
    action.handler()
  }
</script>

<style scoped>
  .story-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    padding: 16px;
    max-width: 500px;
  }

  .story-status {
    font: 0.875rem/1.4 system-ui, sans-serif;
    color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66));
  }

  .story-btn {
    background: transparent;
    border: 1px solid currentColor;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    padding: 4px 12px;
  }
</style>
