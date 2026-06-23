import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const NUMBER_FORMAT_LRU_CAPACITY_CONST_DOC: IConstDoc = {
    slug: 'number-format-lru-capacity',
    name: 'NUMBER_FORMAT_LRU_CAPACITY',
    category: 'Internationalisation',
    descriptionKey: 'consts.catalog.number_format_lru_capacity.description',
    descriptionFallback: 'Maximum number of Intl.NumberFormat instances kept in the module-level LRU cache. 16 covers most realistic UIs (a few locales × a few format variants) without leaking memory in long-lived apps where every prop tweak would otherwise spawn a fresh resolver.',
    definition: `export const NUMBER_FORMAT_LRU_CAPACITY = 16`,
    value: '16',
    usedBy: [
        { name: 'useNumberFormat' },
        { name: 'OrigamNumberFormat', slug: 'number-format' },
    ],
    sourceFile: 'packages/ds/src/consts/NumberFormat/number-format.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.number_format_lru_capacity.example',
            titleFallback: 'The LRU cache capping in useNumberFormat',
            code: `import { NUMBER_FORMAT_LRU_CAPACITY } from 'origam'

// Internal LRU implementation (simplified):
const cache = new Map<string, Intl.NumberFormat>()

function getFormatter(key: string, options: Intl.NumberFormatOptions) {
  if (!cache.has(key)) {
    if (cache.size >= NUMBER_FORMAT_LRU_CAPACITY) {
      // evict the oldest entry
      cache.delete(cache.keys().next().value)
    }
    cache.set(key, new Intl.NumberFormat(key, options))
  }
  return cache.get(key)!
}`,
            lang: 'typescript',
        },
    ],
}
