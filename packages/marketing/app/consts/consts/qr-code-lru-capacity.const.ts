import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_LRU_CAPACITY_CONST_DOC: IConstDoc = {
    slug: 'qr-code-lru-capacity',
    name: 'QR_CODE_LRU_CAPACITY',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_lru_capacity.description',
    descriptionFallback: 'Maximum number of entries kept in the module-level LRU cache keyed on serialised payload + options — 16 entries covers a realistic storybook scenario (value variants × ECC levels × small tweaks).',
    definition: `export const QR_CODE_LRU_CAPACITY = 16`,
    value: '16',
    usedBy: [
        { name: 'useQrCode' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_lru_capacity.example',
            titleFallback: 'Understanding the LRU cache size',
            code: `import { QR_CODE_LRU_CAPACITY } from 'origam'

// 16 serialised payload+options pairs are memoised across renders
console.log(QR_CODE_LRU_CAPACITY) // 16`,
            lang: 'typescript',
        },
    ],
}
