import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SINGLE_OPEN_STRATEGY_CONST_DOC: IConstDoc = {
    slug: 'single-open-strategy',
    name: 'SINGLE_OPEN_STRATEGY',
    category: 'Overlay & Positioning',
    descriptionKey: 'consts.catalog.single_open_strategy.description',
    descriptionFallback: 'Nested-open strategy that enforces a single-open-at-a-time policy: opening a node closes any previously open sibling, while parents of the newly opened node are kept open. The `select` hook is a no-op (returns null). Used as the default strategy for ExpansionPanel.',
    definition: `export const SINGLE_OPEN_STRATEGY: TStrategyOpen = {
    open: ({id, value, opened, parents}) => {
        if (value) {
            const newOpened = new Set<unknown>()
            newOpened.add(id)
            let parent = parents.get(id)
            while (parent != null) {
                newOpened.add(parent)
                parent = parents.get(parent)
            }
            return newOpened
        } else {
            opened.delete(id)
            return opened
        }
    },
    select: () => null
}`,
    values: [
        { value: 'open', descriptionKey: 'consts.detail.single_open_strategy.open', descriptionFallback: 'Handler called on open/close events — enforces single-active constraint.' },
        { value: 'select', descriptionKey: 'consts.detail.single_open_strategy.select', descriptionFallback: 'Selection handler — no-op (returns null) for this strategy.' },
    ],
    usedBy: [
        { name: 'useNested' },
        { name: 'OrigamExpansionPanel' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/nested.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.single_open_strategy.example',
            titleFallback: 'Passing the strategy to an OrigamExpansionPanels',
            code: `<template>
  <origam-expansion-panels :open-strategy="SINGLE_OPEN_STRATEGY">
    <origam-expansion-panel title="Panel A">Content A</origam-expansion-panel>
    <origam-expansion-panel title="Panel B">Content B</origam-expansion-panel>
  </origam-expansion-panels>
</template>

<script setup lang="ts">
import { SINGLE_OPEN_STRATEGY } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
