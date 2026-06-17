import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_BTN_TOGGLE_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-btn-toggle-key',
    name: 'ORIGAM_BTN_TOGGLE_KEY',
    category: 'Component Internals',
    descriptionKey: 'consts.catalog.origam_btn_toggle_key.description',
    descriptionFallback: "Symbol-based Vue injection key used by OrigamBtnToggle to provide IGroupProvide to its OrigamBtn children. Created with Symbol.for('origam:btn-toggle') so the key is globally unique and stable across module copies.",
    definition: `export const ORIGAM_BTN_TOGGLE_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:btn-toggle')`,
    value: "Symbol.for('origam:btn-toggle')",
    usedBy: [
        { name: 'OrigamBtnToggle', slug: 'btn-toggle' },
        { name: 'OrigamBtn', slug: 'btn' },
        { name: 'useGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Btn/btn-toggle.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_btn_toggle_key.example',
            titleFallback: 'Injecting the BtnToggle group context in a child',
            code: `import { inject } from 'vue'
import { ORIGAM_BTN_TOGGLE_KEY } from 'origam'

// Inside OrigamBtn (child of OrigamBtnToggle)
const group = inject(ORIGAM_BTN_TOGGLE_KEY)
const isSelected = computed(() =>
  group?.isSelected(props.value) ?? false
)`,
            lang: 'typescript',
        },
    ],
}
