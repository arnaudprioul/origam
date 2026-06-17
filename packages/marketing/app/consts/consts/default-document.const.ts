import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_DOCUMENT_CONST_DOC: IConstDoc = {
    slug: 'default-document',
    name: 'DEFAULT_DOCUMENT',
    category: 'Browser & Runtime',
    descriptionKey: 'consts.catalog.default_document.description',
    descriptionFallback: 'Reference to window.document when running in a browser, or undefined during SSR. Derived from IN_BROWSER. Components that need to query the DOM use this instead of accessing window.document directly so SSR environments do not throw ReferenceError.',
    definition: `export const DEFAULT_DOCUMENT =
  /* #__PURE__ */ IN_BROWSER ? window.document : undefined`,
    value: 'window.document | undefined',
    usedBy: [
        { name: 'IN_BROWSER' },
        { name: 'useScrollLock' },
        { name: 'useEventListener' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_document.example',
            titleFallback: 'Querying the document safely in SSR-aware code',
            code: `import { DEFAULT_DOCUMENT } from 'origam'

function getActiveElement() {
  return DEFAULT_DOCUMENT?.activeElement ?? null
}`,
            lang: 'typescript',
        },
    ],
}
