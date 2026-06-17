import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_EXPANSION_PANEL_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-expansion-panel-key',
    name: 'ORIGAM_EXPANSION_PANEL_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_expansion_panel_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the IGroupItemProvide selection context from OrigamExpansionPanels (accordion container) to each OrigamExpansionPanel item, enabling coordinated open/close state.',
    definition: `export const ORIGAM_EXPANSION_PANEL_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('origam:expansion-panel')`,
    value: "Symbol.for('origam:expansion-panel')",
    usedBy: [
        { name: 'OrigamExpansionPanels', slug: 'expansion-panels' },
        { name: 'OrigamExpansionPanel', slug: 'expansion-panel' },
    ],
    sourceFile: 'packages/ds/src/consts/ExpansionPanel/expansion-panel.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_expansion_panel_key.example',
            titleFallback: 'Coordinating panels with a shared group context',
            code: `<origam-expansion-panels v-model="open">
  <origam-expansion-panel value="panel-1">
    <template #title>Section A</template>
    Content A
  </origam-expansion-panel>
</origam-expansion-panels>`,
            lang: 'html',
        },
    ],
}
