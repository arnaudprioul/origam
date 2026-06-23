import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CODE_CACHE_MAX_ENTRIES_CONST_DOC: IConstDoc = {
    slug: 'code-cache-max-entries',
    name: 'CODE_CACHE_MAX_ENTRIES',
    category: 'Components',
    descriptionKey: 'consts.catalog.code_cache_max_entries.description',
    descriptionFallback: 'Maximum entries kept by the per-singleton LRU cache in useCode. 64 is large enough for a page with dozens of small snippets while keeping memory under ~1 MB of pre-rendered HTML.',
    definition: `export const CODE_CACHE_MAX_ENTRIES = 64`,
    value: '64',
    usedBy: [
        { name: 'useCode' },
        { name: 'OrigamCode', slug: 'code' },
    ],
    sourceFile: 'packages/ds/src/consts/Code/code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.code_cache_max_entries.example',
            titleFallback: 'The LRU cache size used internally by useCode',
            code: `import { CODE_CACHE_MAX_ENTRIES } from 'origam'

// The highlight cache evicts the oldest entry once it reaches this size
console.log(CODE_CACHE_MAX_ENTRIES) // 64`,
            lang: 'typescript',
        },
    ],
}
