import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_ITEM_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-item-group-key',
    name: 'ORIGAM_ITEM_GROUP_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_item_group_key.description',
    descriptionFallback: 'Vue provide/inject symbol shared by OrigamItemGroup (provider) and OrigamItem (consumer). Carries the IGroupProvide selection context (selected values, toggle, isSelected…) enabling single / multiple / mandatory selection over any custom UI.',
    definition: `export const ORIGAM_ITEM_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:item-group')`,
    value: "Symbol.for('origam:item-group')",
    usedBy: [
        { name: 'OrigamItemGroup', slug: 'item-group' },
        { name: 'OrigamItem', slug: 'item-group' },
        { name: 'useGroupItem' },
    ],
    sourceFile: 'packages/ds/src/consts/ItemGroup/item-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_item_group_key.example',
            titleFallback: 'Building a custom tile selector with OrigamItemGroup',
            code: `<origam-item-group v-model="selected" multiple>
  <origam-item v-for="opt in options" :key="opt.value" :value="opt.value">
    <template #default="{ isSelected, toggle }">
      <div :class="{ active: isSelected }" @click="toggle">
        {{ opt.label }}
      </div>
    </template>
  </origam-item>
</origam-item-group>`,
            lang: 'html',
        },
    ],
}
