import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONFIGURABLE_DOCUMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-configurable-document',
    name: 'IConfigurableDocument',
    category: 'Utilities',
    descriptionKey: 'interfaces.catalog.i_configurable_document.description',
    descriptionFallback: 'Allows injecting a custom document reference — useful for iframes, shadow DOM, or SSR environments where the global document may not be available.',
    definition: `export interface IConfigurableDocument {
    document?: Document
}`,
    extends: [],
    props: [
        { name: 'document', type: 'Document', optional: true, descriptionFallback: 'Custom Document reference. Defaults to the global window.document when not provided.' },
    ],
    usedBy: [
        { slug: 'style-tag-options', name: 'IStyleTagOptions', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_configurable_document.example',
            titleFallback: 'Passing a custom document for iframe support',
            code: `import type { IConfigurableDocument } from 'origam'

function injectStyle(options: IConfigurableDocument) {
    const doc = options.document ?? window.document
    const el = doc.createElement('style')
    doc.head.appendChild(el)
}`,
            lang: 'typescript',
        },
    ],
}
