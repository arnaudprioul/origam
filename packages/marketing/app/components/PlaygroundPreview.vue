<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import type { ReplStore } from '@vue/repl'

/*
 * @vue/repl@4 file naming:
 * - The store's `mainFile` defaults to `"src/App.vue"` (not `"App.vue"`).
 * - `setDefaultFile()` is called during `useStore()` and populates
 *   `files["src/App.vue"]` with `template.welcomeSFC`. We override
 *   `welcomeSFC` to inject the user's code at construction time so the
 *   preview renders the right content on first mount.
 * - For subsequent updates, `store.setFiles({ 'App.vue': newCode })`
 *   is the correct API — it calls `addSrcPrefix` internally, so
 *   `'App.vue'` is normalized to `'src/App.vue'` before updating the
 *   reactive `files` map that the preview iframe watches.
 * - `deleteFile()` must NOT be used for updates — it calls
 *   `window.confirm()` which blocks the UI.
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
const EditorComponent = shallowRef<object | null>(null)

async function initRepl () {
    // @vue/repl@4 requires explicitly passing an editor component to
    // the `<Repl>` for tree-shaking — without it the Repl crashes
    // silently and the preview pane stays blank. We pick Monaco
    // (Volar support + autocomplete) to match the standalone
    // PlaygroundEditor used elsewhere in the marketing.
    const [replModule, monacoModule] = await Promise.all([
        import('@vue/repl'),
        import('@vue/repl/monaco-editor')
    ])
    const { useStore, Repl } = replModule
    const Monaco = (monacoModule as { default: object }).default ?? monacoModule

    // Pass the user's code as `welcomeSFC` so that `setDefaultFile()`
    // — which runs synchronously inside `useStore()` — populates the
    // store's mainFile (`src/App.vue`) with the correct content.
    // Calling `addFile('App.vue', ...)` AFTER init would only create a
    // second, inactive file keyed as `"App.vue"` while `mainFile` stays
    // `"src/App.vue"` with the default "Hello World!" content.
    //
    // `StoreState` is `ToRefs<{...}>` so `template` expects a `Ref`.
    const replStore = useStore({
        template: ref({ welcomeSFC: props.code })
    })

    // `init()` sets up the internal `watchEffect` that recompiles the
    // active file whenever its code changes. Call it once after store
    // creation; calling it before is a no-op, calling it after
    // `setFiles` is fine — the watcher picks up the current state.
    replStore.init()

    store.value = replStore
    ReplComponent.value = Repl
    EditorComponent.value = Monaco
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
        compileError.value = null
        // `setFiles` is the correct API for replacing file content:
        // - it calls `addSrcPrefix` so `'App.vue'` maps to `'src/App.vue'`
        // - it recompiles all files and pushes errors into `store.errors`
        // - it calls `setActive(store.mainFile)` so the preview re-renders
        // Do NOT use `deleteFile` (calls `window.confirm`) or `addFile`
        // (does not overwrite existing files, adds a duplicate key).
        await store.value.setFiles({ 'App.vue': newCode })
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
        <template v-else-if="ReplComponent && store && EditorComponent">
            <component
                :is="ReplComponent"
                :store="store"
                :editor="EditorComponent"
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
