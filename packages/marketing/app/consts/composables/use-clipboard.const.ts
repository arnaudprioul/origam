import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CLIPBOARD_DOC: IComposableDoc = {
    slug: 'use-clipboard',
    name: 'useClipboard',
    domain: 'Clipboard',
    icon: 'mdi-clipboard-outline',
    descriptionKey: '',
    descriptionFallback: 'Headless clipboard composable. Wraps the modern navigator.clipboard.writeText API with a legacy execCommand fallback. Exposes a self-resetting copied flag so consumers do not need to wire the reset timeout themselves. Never throws — callers branch on the returned boolean.',
    signature: `function useClipboard(options?: IUseClipboardOptions): {
  copy: (text: string) => Promise<boolean>
  copied: Ref<boolean>
  error: Ref<Error | null>
  isSupported: Ref<boolean>
}`,
    params: [
        {
            name: 'options',
            type: 'IUseClipboardOptions',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional configuration object. Currently only feedbackDuration is supported.',
        },
        {
            name: 'options.feedbackDuration',
            type: 'number',
            required: false,
            defaultValue: '2000',
            descriptionKey: '',
            descriptionFallback: 'Duration in milliseconds the copied ref stays true after a successful write before auto-resetting.',
        },
    ],
    returns: [
        {
            name: 'copy',
            type: '(text: string) => Promise<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Writes text to the clipboard. Returns true on success, false on failure. Resets the copied flag timer on each call.',
        },
        {
            name: 'copied',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reactive flag that is true for feedbackDuration ms after a successful copy, then automatically resets to false.',
        },
        {
            name: 'error',
            type: 'Ref<Error | null>',
            descriptionKey: '',
            descriptionFallback: 'Set to the Error instance when the last copy attempt failed. Null after a successful copy or before any attempt.',
        },
        {
            name: 'isSupported',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Whether the modern navigator.clipboard.writeText API is available. False in non-HTTPS contexts and older browsers — the execCommand fallback is still attempted in that case.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Copy with automatic feedback',
            code: `<script setup lang="ts">
import { useClipboard } from 'origam'

const { copy, copied, error } = useClipboard({ feedbackDuration: 2000 })
</script>

<template>
  <button @click="copy('Hello, world!')">
    {{ copied ? 'Copied!' : 'Copy' }}
  </button>
  <p v-if="error">Failed: {{ error.message }}</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Check API support before copying',
            code: `<script setup lang="ts">
import { useClipboard } from 'origam'

const { copy, isSupported } = useClipboard()

async function handleCopy() {
  if (!isSupported.value) {
    console.warn('Clipboard API not available — using fallback')
  }
  const ok = await copy('npm install origam')
  if (!ok) console.error('Copy failed')
}
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-code'],
    consumedInterfaces: ['IUseClipboardOptions'],
    noteFallback: 'The timeout is cleared on Vue scope dispose (component unmount). No manual cleanup is required.',
}
