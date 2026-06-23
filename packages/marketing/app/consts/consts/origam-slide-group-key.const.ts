import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_SLIDE_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-slide-group-key',
    name: 'ORIGAM_SLIDE_GROUP_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_slide_group_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<IGroupProvide>) used by OrigamSlideGroup to broadcast group-selection state (selected items, register/unregister) to child OrigamSlideGroupItem components.',
    definition: `export const ORIGAM_SLIDE_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:slide-group')`,
    value: `Symbol.for('origam:slide-group')`,
    usedBy: [
        { name: 'OrigamSlideGroup', slug: 'slide' },
    ],
    sourceFile: 'packages/ds/src/consts/Slide/slide-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_slide_group_key.example',
            titleFallback: 'Injecting the slide-group context in a custom item',
            code: `import { inject } from 'vue'
import { ORIGAM_SLIDE_GROUP_KEY } from 'origam'

const group = inject(ORIGAM_SLIDE_GROUP_KEY)
group?.select(myValue, true)`,
            lang: 'typescript',
        },
    ],
}
