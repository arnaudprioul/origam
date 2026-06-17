import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_HOTKEY_DOC: IComposableDoc = {
    slug: 'use-hotkey',
    name: 'useHotkey',
    domain: 'Commons',
    icon: 'mdi-keyboard',
    descriptionKey: '',
    descriptionFallback: 'Registers a global keyboard shortcut (single key, modifier combination, or multi-step sequence) and calls the provided callback on match. Automatically cleans up the event listener on component unmount. Supports reactive key strings via MaybeRef.',
    signature: `function useHotkey(
  keys: MaybeRef<string | undefined>,
  callback: (e: KeyboardEvent) => void,
  options?: IHotkeyOptions
): () => void`,
    params: [
        {
            name: 'keys',
            type: 'MaybeRef<string | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Hotkey definition string. Use "+" to combine modifiers (e.g. "ctrl+k"), ">" to define a sequence (e.g. "g>i"). Accepted modifiers: ctrl, shift, alt, meta, cmd. Reactive — updating the ref re-registers the listener.',
        },
        {
            name: 'callback',
            type: '(e: KeyboardEvent) => void',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Function called when the key combination or sequence is matched. Receives the native KeyboardEvent.',
        },
        {
            name: 'options',
            type: 'IHotkeyOptions',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional configuration: event type (default "keydown"), inputs flag, preventDefault flag, and sequenceTimeout (ms).',
        },
        {
            name: 'options.event',
            type: 'string',
            required: false,
            defaultValue: "'keydown'",
            descriptionKey: '',
            descriptionFallback: 'DOM keyboard event type to listen to.',
        },
        {
            name: 'options.inputs',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            descriptionKey: '',
            descriptionFallback: 'When false (default), the hotkey is suppressed while an input, textarea, or contenteditable element is focused.',
        },
        {
            name: 'options.preventDefault',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            descriptionKey: '',
            descriptionFallback: 'Calls event.preventDefault() when the hotkey matches.',
        },
        {
            name: 'options.sequenceTimeout',
            type: 'number',
            required: false,
            defaultValue: '1000',
            descriptionKey: '',
            descriptionFallback: 'Time in milliseconds between consecutive keys in a sequence before it resets.',
        },
    ],
    returns: [
        {
            name: 'cleanup',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Function that removes the event listener and clears any pending sequence timer. Called automatically on unmount when useHotkey is used inside a component setup.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Simple modifier hotkey',
            code: `<script setup lang="ts">
import { useHotkey } from 'origam'

useHotkey('ctrl+k', () => {
  console.log('Command palette opened')
})
</script>`,
            lang: 'ts',
        },
        {
            titleKey: '',
            titleFallback: 'Key sequence (vim-style)',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useHotkey } from 'origam'

const message = ref('')

useHotkey('g>i', () => {
  message.value = 'Navigated to inbox'
}, { sequenceTimeout: 800 })
</script>`,
            lang: 'ts',
        },
        {
            titleKey: '',
            titleFallback: 'Reactive hotkey (toggleable)',
            code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHotkey } from 'origam'

const enabled = ref(true)
const hotkey = computed(() => enabled.value ? 'escape' : undefined)

useHotkey(hotkey, () => {
  console.log('Escape pressed')
})
</script>`,
            lang: 'ts',
        },
    ],
    related: ['use-event-listener', 'use-touch'],
    consumedInterfaces: ['IHotkeyOptions'],
    noteFallback: 'useHotkey is a no-op in SSR (non-browser environments). On macOS, "cmd" and "meta" map to the Command key; "ctrl+cmd" is treated as Ctrl+Meta to cover cross-platform combinations.',
}
