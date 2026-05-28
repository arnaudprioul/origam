<script setup lang="ts">
import { onMounted, onScopeDispose, ref, watch } from 'vue'
import { useMonacoTheme } from '~/composables/useMonacoTheme'
import { PLAYGROUND_MONACO_OPTIONS } from '~/consts/playground.const'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const { t } = useI18nFallback()
const { monacoTheme } = useMonacoTheme()

const editorRoot = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const isClient = ref(false)

let editorInstance: import('monaco-editor').editor.IStandaloneCodeEditor | null = null
let monacoModule: typeof import('monaco-editor') | null = null

async function initMonaco () {
    if (!editorRoot.value) {
        return
    }

    monacoModule = await import('monaco-editor')

    /*
     * Vite + Nuxt 4 worker loading: use the `?worker` import suffix
     * so Vite emits the workers as separate chunks. `new URL(..., import.meta.url)`
     * fails to resolve through the Nuxt srcDir (app/) — paths get
     * mistakenly rebased to `app/components/monaco-editor/...`.
     */
    const [{ default: EditorWorker }, { default: TsWorker }] = await Promise.all([
        import('monaco-editor/esm/vs/editor/editor.worker?worker'),
        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker')
    ])

    self.MonacoEnvironment = {
        getWorker (_: string, label: string) {
            if (label === 'typescript' || label === 'javascript') {
                return new TsWorker()
            }
            return new EditorWorker()
        }
    }

    editorInstance = monacoModule.editor.create(editorRoot.value, {
        ...PLAYGROUND_MONACO_OPTIONS,
        value: props.modelValue,
        language: 'html',
        theme: monacoTheme.value
    })

    editorInstance.onDidChangeModelContent(() => {
        const value = editorInstance?.getValue() ?? ''
        emit('update:modelValue', value)
    })

    isLoading.value = false
}

onMounted(() => {
    isClient.value = true
    initMonaco()
})

watch(monacoTheme, (theme) => {
    if (monacoModule) {
        monacoModule.editor.setTheme(theme)
    }
})

watch(() => props.modelValue, (newVal) => {
    if (editorInstance && editorInstance.getValue() !== newVal) {
        editorInstance.setValue(newVal)
    }
})

onScopeDispose(() => {
    editorInstance?.dispose()
    editorInstance = null
})
</script>

<template>
    <div class="playground-editor">
        <template v-if="!isClient">
            <pre class="playground-editor__ssr-fallback"><code>{{ modelValue }}</code></pre>
        </template>
        <template v-else>
            <div
                v-if="isLoading"
                class="playground-editor__skeleton"
                role="status"
                :aria-label="t('playground.editor.loading', 'Loading editor…')"
            >
                <div class="playground-editor__skeleton-bar" />
                <div class="playground-editor__skeleton-bar playground-editor__skeleton-bar--short" />
                <div class="playground-editor__skeleton-bar" />
                <div class="playground-editor__skeleton-bar playground-editor__skeleton-bar--medium" />
            </div>
            <div
                ref="editorRoot"
                class="playground-editor__root"
                :class="{ 'playground-editor__root--hidden': isLoading }"
                :aria-label="t('playground.editor.label', 'Vue SFC code editor')"
                role="region"
            />
        </template>
    </div>
</template>

<style scoped>
.playground-editor {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    border-radius: var(--origam-rounded-2xl, 1rem);
}

.playground-editor__ssr-fallback {
    margin: 0;
    padding: var(--origam-space-6, 1.5rem);
    height: 100%;
    overflow: auto;
    font-family: var(--origam-font-family-mono, monospace);
    font-size: var(--origam-font-size-sm, 0.875rem);
    line-height: 1.6;
    background-color: var(--origam-color-surface-code, #1e1e2e);
    color: var(--origam-color-text-on-dark, #cdd6f4);
    white-space: pre;
}

.playground-editor__skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-6, 1.5rem);
    height: 100%;
    background-color: var(--origam-color-surface-subtle, transparent);
}

.playground-editor__skeleton-bar {
    height: 1rem;
    border-radius: var(--origam-rounded-sm, 0.25rem);
    background-color: var(--origam-color-surface-muted, currentColor);
    opacity: 0.15;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
    width: 100%;
}

.playground-editor__skeleton-bar--short {
    width: 40%;
}

.playground-editor__skeleton-bar--medium {
    width: 70%;
}

.playground-editor__root {
    width: 100%;
    height: 100%;
}

.playground-editor__root--hidden {
    visibility: hidden;
    position: absolute;
    inset: 0;
}

@keyframes skeleton-pulse {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.3; }
}
</style>
