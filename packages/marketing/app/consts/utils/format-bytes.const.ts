import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_BYTES_UTIL_DOC: IUtilDoc = {
    slug: 'format-bytes',
    name: 'formatBytes',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_bytes.description',
    descriptionFallback: 'Convert a raw byte count to a human-readable string (e.g. "1.5 MB"). Uses base-1024 with SI suffixes (B, KB, MB, GB, TB, PB). Non-finite or negative values return "0 B".',
    signature: `function formatBytes(bytes: number, decimals?: number): string`,
    params: [
        {
            name: 'bytes',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.format_bytes.param_bytes',
            descriptionFallback: 'Raw byte count. Non-finite or negative values are treated as 0.',
        },
        {
            name: 'decimals',
            type: 'number',
            required: false,
            defaultValue: '1',
            descriptionKey: 'utils.detail.format_bytes.param_decimals',
            descriptionFallback: 'Number of decimal places to display when the value is ≥ 1 KB. Defaults to 1.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.format_bytes.returns',
        descriptionFallback: 'Human-readable size string, e.g. "0 B", "512 B", "1.5 KB", "3.2 MB".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/format-bytes.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_bytes.example_basic',
            titleFallback: 'Format file sizes',
            code: `import { formatBytes } from 'origam'

formatBytes(0)           // → '0 B'
formatBytes(512)         // → '512 B'
formatBytes(1536)        // → '1.5 KB'
formatBytes(1048576)     // → '1 MB'
formatBytes(1536, 2)     // → '1.50 KB'
formatBytes(-1)          // → '0 B'`,
            lang: 'typescript',
        },
    ],
    related: ['format-media-time'],
}
