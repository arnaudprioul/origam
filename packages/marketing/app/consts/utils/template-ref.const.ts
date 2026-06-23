import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TEMPLATE_REF_UTIL_DOC: IUtilDoc = {
    slug: 'template-ref',
    name: 'templateRef',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.template_ref.description',
    descriptionFallback: 'Create a dual-purpose template ref that can be passed as a Vue callback ref and also read like a normal ShallowRef. Exposes both `.value` (the raw ComponentPublicInstance or HTMLElement) and `.el` (the resolved HTMLElement).',
    signature: `function templateRef(): TTemplateRef`,
    params: [],
    returns: {
        type: 'TTemplateRef',
        descriptionKey: 'utils.detail.template_ref.returns',
        descriptionFallback: 'A function that can be used directly as a `:ref` binding, with `.value` (raw ref target) and `.el` (resolved HTMLElement) properties attached.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.template_ref.example_basic',
            titleFallback: 'Attach a template ref and read its element',
            code: `import { templateRef } from 'origam'

const rootEl = templateRef()

// In template: <div :ref="rootEl">
// In script:
console.log(rootEl.el)    // HTMLDivElement | null
console.log(rootEl.value) // same ref target`,
            lang: 'typescript',
        },
    ],
    related: ['forward-refs', 'get-current-instance'],
}
