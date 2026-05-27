<script setup lang="ts">
import type { IEmitDoc } from '~/interfaces/component-doc.interface'

defineProps<{
    emits: IEmitDoc[]
}>()
</script>

<template>
    <table class="doc-table">
        <caption class="doc-table__caption">Component emits</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Payload</th>
                <th scope="col">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="emit in emits"
                :key="emit.name"
                class="doc-table__row"
            >
                <td class="doc-table__cell doc-table__cell--name">
                    <code class="doc-table__code">{{ emit.name }}</code>
                </td>
                <td class="doc-table__cell">
                    <code class="doc-table__code doc-table__code--type">{{ emit.payload }}</code>
                </td>
                <td class="doc-table__cell doc-table__cell--desc">
                    {{ emit.description ?? '—' }}
                </td>
            </tr>
            <tr v-if="emits.length === 0">
                <td
                    colspan="3"
                    class="doc-table__empty-row"
                >No emits documented.</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.doc-table {
    inline-size: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
}

.doc-table__caption {
    text-align: start;
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--origam-color-text-primary);
    margin-block-end: 0.5rem;
    caption-side: top;
}

.doc-table thead th {
    padding: 0.5rem 0.75rem;
    text-align: start;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--origam-color-text-secondary);
    border-block-end: 2px solid var(--origam-color-border-subtle);
    white-space: nowrap;
}

.doc-table__row {
    border-block-end: 1px solid var(--origam-color-border-subtle);
}

.doc-table__row:last-child {
    border-block-end: none;
}

.doc-table__cell {
    padding: 0.5rem 0.75rem;
    vertical-align: top;
    color: var(--origam-color-text-primary);
}

.doc-table__cell--name {
    white-space: nowrap;
}

.doc-table__cell--desc {
    color: var(--origam-color-text-secondary);
}

.doc-table__code {
    font-family: var(--origam-font-mono, ui-monospace, monospace);
    font-size: 0.75rem;
    background-color: color-mix(in srgb, var(--origam-color-primary-500) 8%, transparent);
    color: var(--origam-color-primary-700);
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
}

.doc-table__code--type {
    background-color: color-mix(in srgb, var(--origam-color-neutral-500) 8%, transparent);
    color: var(--origam-color-text-secondary);
    word-break: break-word;
    display: inline-block;
    max-inline-size: 30ch;
    overflow-wrap: break-word;
    white-space: normal;
}

.doc-table__empty-row {
    padding: 1rem 0.75rem;
    color: var(--origam-color-text-secondary);
    text-align: center;
}
</style>
