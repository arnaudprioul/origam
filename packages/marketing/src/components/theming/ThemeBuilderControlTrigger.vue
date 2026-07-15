<script setup lang="ts">
/**
 * ThemeBuilderControlTrigger — shared trigger button + popover shell for the
 * 5 rich theme-builder controls (Color, Rounded, Elevation, Border, Box
 * model). Owns only the open/close chrome (origam-menu + trigger button);
 * every field-specific composable/markup lives in the consuming component's
 * default slot. Matches the trigger pattern validated across every state in
 * `packages/marketing/wireframes/theming-controls/*.html`.
 */
withDefaults(defineProps<{
    label: string
    valueLabel: string
    hint?: boolean
    swatch?: boolean
    swatchClass?: string
    swatchStyle?: Record<string, string>
    dataCy: string
}>(), {
    hint: false,
    swatch: false,
    swatchClass: undefined,
    swatchStyle: undefined
})

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
    <origam-menu
        v-model="open"
        :close-on-content-click="false"
        location="bottom"
        class="tbc-menu"
    >
        <template #activator="{ props: menuProps }">
            <origam-btn
                variant="outlined"
                density="compact"
                size="x-small"
                block
                class="tbc-trigger"
                :aria-label="label"
                :data-cy="`${dataCy}-trigger`"
                v-bind="menuProps"
            >
                <span
                    v-if="swatch"
                    class="tbc-trigger__swatch"
                    :class="swatchClass"
                    :style="swatchStyle"
                    aria-hidden="true"
                />
                <span
                    class="tbc-trigger__value"
                    :class="{ 'tbc-trigger__value--hint': hint }"
                >{{ valueLabel }}</span>
            </origam-btn>
        </template>

        <template #default>
            <div
                class="tbc-popover"
                :data-cy="`${dataCy}-popover`"
            >
                <slot />
            </div>
        </template>
    </origam-menu>
</template>

<style scoped lang="scss">
.tbc-trigger {
    justify-content: flex-start;
    inline-size: 100%;
    font-size: 0.6875rem;

    :deep(.origam-btn__content) {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        min-inline-size: 0;
        justify-content: flex-start;
    }

    &__swatch {
        flex: 0 0 auto;
        inline-size: 0.875rem;
        block-size: 0.875rem;
        border-radius: var(--origam-radius-sm, 0.25rem);
        border: 1px solid var(--origam-color-border-default);
    }

    &__value {
        flex: 1 1 auto;
        min-inline-size: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: start;

        &--hint {
            font-style: italic;
            color: var(--origam-color-text-subtle);
        }
    }
}

.tbc-popover {
    display: flex;
    flex-direction: column;
    gap: var(--origam-spacing-3, 0.75rem);
    padding: var(--origam-spacing-3, 0.75rem);
    inline-size: 16rem;
}
</style>
