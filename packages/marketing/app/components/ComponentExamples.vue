<script setup lang="ts">
import type { IComponentDoc } from '~/interfaces/component-doc.interface'

const props = defineProps<{
    doc: IComponentDoc
}>()

const basicSnippet = computed(() => `<Origam${props.doc.name} />`)

const playgroundUrl = computed(() => `/playground?template=${props.doc.slug}`)
</script>

<template>
    <figure class="component-example">
        <figcaption class="component-example__label">Basic usage</figcaption>
        <pre class="component-example__pre"><code class="component-example__code">{{ basicSnippet }}</code></pre>
        <footer class="component-example__footer">
            <NuxtLink
                :to="playgroundUrl"
                class="component-example__playground-link"
            >Open in playground</NuxtLink>
        </footer>
    </figure>
</template>

<style scoped>
.component-example {
    margin: 0;
}

.component-example__label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--origam-color-text-secondary);
    margin-block-end: 0.5rem;
}

.component-example__pre {
    margin: 0;
    padding: 1rem;
    background-color: color-mix(in srgb, var(--origam-color-neutral-900) 96%, transparent);
    border-radius: var(--origam-rounded-md, 0.375rem);
    overflow-x: auto;
}

.component-example__code {
    font-family: var(--origam-font-mono, ui-monospace, monospace);
    font-size: 0.8125rem;
    color: var(--origam-color-primary-300);
    white-space: pre;
}

.component-example__footer {
    display: flex;
    justify-content: flex-end;
    margin-block-start: 0.75rem;
}

.component-example__playground-link {
    font-size: 0.8125rem;
    color: var(--origam-color-primary-600);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.component-example__playground-link:hover {
    color: var(--origam-color-primary-800);
}
</style>
