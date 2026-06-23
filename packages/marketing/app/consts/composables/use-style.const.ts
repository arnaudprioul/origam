import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_STYLE_DOC: IComposableDoc = {
    slug: 'use-style',
    name: 'useStyle',
    domain: 'Commons',
    icon: 'mdi-code-tags',
    descriptionKey: '',
    descriptionFallback: 'Injects a dynamic <style> tag into document.head scoped to a generated element id, allowing components to apply per-instance CSS that cannot be expressed as inline styles (e.g. pseudo-element rules, :hover selectors, @keyframes). Also exposes the lower-level useStyleTag for raw CSS string injection. Both composables manage their own lifecycle: they load on mount and unload on scope dispose.',
    signature: `function useStyle(
  styles: ComputedRef,
  uniq?: string,
  name?: string
): {
  id: ComputedRef<string>
  styleTagId: string
  css: ShallowRef<string>
  load: () => void
  unload: () => void
  isLoaded: Readonly<ShallowRef<boolean>>
}

function useStyleTag(
  css: MaybeRef<string>,
  options?: IStyleTagOptions
): {
  id: string
  css: ShallowRef<string>
  load: () => void
  unload: () => void
  isLoaded: Readonly<ShallowRef<boolean>>
}`,
    params: [
        {
            name: 'styles',
            type: 'ComputedRef',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'A ComputedRef returning a CSS value array or object. Accepts the same formats as Vue :style bindings (array of objects, strings, or mixed). useStyle normalises this to a flat `#id { prop: value; … }` string and feeds it to useStyleTag.',
        },
        {
            name: 'uniq',
            type: 'string',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional fixed element id. When omitted, a unique id is generated from the component name and a counter (e.g. origam-card-3). Provide a fixed id when multiple instances must share the same <style> tag (e.g. global animation keyframes).',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the generated id. Defaults to the current Vue instance name.',
        },
    ],
    returns: [
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'The element id used as the CSS scope selector (#id). Apply this id to the root element of the component so the injected styles target only this instance.',
        },
        {
            name: 'css',
            type: 'ShallowRef<string>',
            descriptionKey: '',
            descriptionFallback: 'The current generated CSS string. Reactive — updates whenever the styles ComputedRef changes.',
        },
        {
            name: 'load / unload',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Manually control style tag injection. Normally called automatically on mount / scope dispose. Call load() to re-inject after an explicit unload().',
        },
        {
            name: 'isLoaded',
            type: 'Readonly<ShallowRef<boolean>>',
            descriptionKey: '',
            descriptionFallback: 'True when the <style> tag is currently present in document.head.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Per-instance scoped keyframes',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useStyle } from 'origam'

const props = defineProps<{ color: string }>()

const styles = computed(() => ({
  '--my-color': props.color,
}))

const { id } = useStyle(styles)
</script>

<template>
  <div :id="id" class="animated-box">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Raw CSS injection with useStyleTag',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useStyleTag } from 'origam'

const css = ref('.my-global-override { color: red; }')
const { load, unload } = useStyleTag(css)
</script>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['IStyleTagOptions'],
    noteFallback: 'useStyle targets the injected styles with a #id selector, so only the specific DOM element with that id is affected — it is component-scoped without the overhead of a Shadow DOM. The id must be applied to the element via :id="id" in the template.',
}
