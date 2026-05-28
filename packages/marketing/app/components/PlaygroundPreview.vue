<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import type { ReplStore } from '@vue/repl'

/*
 * @vue/repl@4 API:
 * - `useStore({...})` is a *composable* (NOT a constructor) — calling
 *   `new ReplStore(...)` was the old @vue/repl@2 API. After minification
 *   that became `new i(...)` → "i is not a constructor" runtime crash.
 * - The new store mutates its own `files` ref; updates flow through
 *   `addFile()` / `renameFile()` / direct `store.files['App.vue'] = ...`
 *   on a fresh File instance.
 */

const props = defineProps<{
    code: string
}>()

const { t } = useI18nFallback()

const isClient = ref(false)
const isLoading = ref(true)
const compileError = ref<string | null>(null)

const store = shallowRef<ReplStore | null>(null)
const ReplComponent = shallowRef<object | null>(null)

async function initRepl () {
    const { useStore, Repl, File } = await import('@vue/repl')

    const replStore = useStore()

    // Replace the default playground file with the consumer code.
    replStore.files['App.vue'] = new File('App.vue', props.code)
    replStore.activeFilename = 'App.vue'

    store.value = replStore
    ReplComponent.value = Repl
    isLoading.value = false
}

const hasError = computed(() => compileError.value !== null)

onMounted(() => {
    isClient.value = true
    initRepl().catch((err: unknown) => {
        compileError.value = err instanceof Error ? err.message : String(err)
        isLoading.value = false
    })
})

watch(() => props.code, async (newCode) => {
    if (!store.value) {
        return
    }
    try {
        const { File } = await import('@vue/repl')
        compileError.value = null
        store.value.files['App.vue'] = new File('App.vue', newCode)
        store.value.activeFilename = 'App.vue'
    } catch (err: unknown) {
        compileError.value = err instanceof Error ? err.message : String(err)
    }
})
</script>

<template>
    <div class="playground-preview">
        <template v-if="!isClient">
            <div
                class="playground-preview__placeholder"
                :aria-label="t('playground.preview.ssr', 'Preview renders in the browser')"
                role="status"
            >
                <span class="playground-preview__placeholder-text">
                    {{ t('playground.preview.loadingBrowser', 'Preview renders in the browser') }}
                </span>
            </div>
        </template>
        <template v-else-if="isLoading">
            <div
                class="playground-preview__loading"
                role="status"
                :aria-label="t('playground.preview.loading', 'Compiling preview…')"
            >
                <div class="playground-preview__spinner" aria-hidden="true" />
                <span class="playground-preview__loading-text">
                    {{ t('playground.preview.loading', 'Compiling preview…') }}
                </span>
            </div>
        </template>
        <template v-else-if="hasError">
            <div
                class="playground-preview__error"
                role="alert"
                :aria-label="t('playground.preview.errorLabel', 'Compilation error')"
            >
                <p class="playground-preview__error-title">
                    {{ t('playground.preview.errorTitle', 'Compilation error') }}
                </p>
                <pre class="playground-preview__error-message">{{ compileError }}</pre>
            </div>
        </template>
        <template v-else-if="ReplComponent && store">
            <component
                :is="ReplComponent"
                :store="store"
                :clear-console="false"
                :show-compile-output="false"
                :show-import-map="false"
                layout="vertical"
                class="playground-preview__repl"
            />
        </template>
    </div>
</template>

<style scoped>
.playground-preview {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    border-radius: var(--origam-rounded-2xl, 1rem);
    background-color: var(--origam-color-surface-default, transparent);
    border: 1px solid var(--origam-color-border-default, transparent);
}

.playground-preview__placeholder,
.playground-preview__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: var(--origam-space-4, 1rem);
    color: var(--origam-color-text-muted, currentColor);
}

.playground-preview__placeholder-text,
.playground-preview__loading-text {
    font-size: var(--origam-font-size-sm, 0.875rem);
}

.playground-preview__spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--origam-color-border-default, currentColor);
    border-top-color: var(--origam-color-action-primary-bg, currentColor);
    border-radius: 50%;
    animation: preview-spin 0.8s linear infinite;
}

.playground-preview__error {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-6, 1.5rem);
    height: 100%;
    overflow: auto;
    background-color: var(--origam-color-surface-danger-subtle, transparent);
}

.playground-preview__error-title {
    margin: 0;
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-danger, currentColor);
    font-size: var(--origam-font-size-sm, 0.875rem);
}

.playground-preview__error-message {
    margin: 0;
    font-family: var(--origam-font-family-mono, monospace);
    font-size: var(--origam-font-size-xs, 0.75rem);
    line-height: 1.6;
    color: var(--origam-color-text-danger, currentColor);
    white-space: pre-wrap;
    word-break: break-all;
}

.playground-preview__repl {
    width: 100%;
    height: 100%;
}

@keyframes preview-spin {
    to { transform: rotate(360deg); }
}
</style>
