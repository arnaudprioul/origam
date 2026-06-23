import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TOGGLE_SCOPE_DOC: IComposableDoc = {
    slug: 'use-toggle-scope',
    name: 'useToggleScope',
    domain: 'Commons',
    icon: 'mdi-toggle-switch-outline',
    descriptionKey: '',
    descriptionFallback: 'Conditionally activates a Vue effectScope driven by a reactive boolean source. When the source turns true the scope starts (running the provided callback inside it); when it turns false the scope is stopped and discarded. The scope is also stopped on parent scope dispose.',
    signature: `function useToggleScope(
  source: WatchSource<boolean>,
  fn: (reset: () => void) => void
): void`,
    params: [
        {
            name: 'source',
            type: 'WatchSource<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive boolean source (ref, computed, or getter). When it evaluates to true the scope is started; when false the scope is stopped.',
        },
        {
            name: 'fn',
            type: '(reset: () => void) => void',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Callback run inside the new effectScope. Receives a `reset()` function that can be called from inside the scope to stop the current scope and immediately restart it — useful for subscriptions that need to re-initialise when an inner condition changes.',
        },
    ],
    returns: [],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Run a watcher only while a panel is open',
            code: `<script setup lang="ts">
import { useToggleScope } from 'origam'
import { ref, watch } from 'vue'

const isOpen = ref(false)
const data = ref<string[]>([])

useToggleScope(() => isOpen.value, () => {
    watch(data, (val) => {
        console.log('Panel is open, data changed:', val)
    })
})
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Reset the scope when a sub-condition changes',
            code: `<script setup lang="ts">
import { useToggleScope } from 'origam'
import { ref, watch } from 'vue'

const enabled = ref(false)
const mode = ref('fast')

useToggleScope(() => enabled.value, (reset) => {
    watch(mode, () => {
        // Re-initialise the scope whenever mode changes
        reset()
    })
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-v-model', 'use-validation'],
    consumedInterfaces: [],
    noteFallback: 'useToggleScope is a low-level primitive used internally by useVModel, useValidation, and other composables that need conditional effect trees. Prefer those higher-level composables for typical use cases.',
}
