import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HUMAN_READABLE_FILE_SIZE_UTIL_DOC: IUtilDoc = {
    slug: 'human-readable-file-size',
    name: 'humanReadableFileSize',
    category: 'Commons',
    icon: 'mdi-file-outline',
    descriptionKey: 'utils.catalog.human_readable_file_size.description',
    descriptionFallback: 'Formats a raw byte count into a human-readable string using either SI (base-1000: k, M, G) or IEC (base-1024: Ki, Mi, Gi) prefixes.',
    signature: 'function humanReadableFileSize(bytes: number, base: 1000 | 1024 = 1000): string',
    params: [
        {
            name: 'bytes',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.human_readable_file_size.param_bytes',
            descriptionFallback: 'The raw size in bytes.',
        },
        {
            name: 'base',
            type: '1000 | 1024',
            required: false,
            defaultValue: '1000',
            descriptionKey: 'utils.detail.human_readable_file_size.param_base',
            descriptionFallback: 'The numeric base. 1000 uses SI prefixes (kB, MB, GB); 1024 uses IEC binary prefixes (KiB, MiB, GiB).',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.human_readable_file_size.returns',
        descriptionFallback: 'A formatted string such as "1.4 kB" or "3.7 MiB". Values below the base threshold are returned as "N B".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.human_readable_file_size.example_basic',
            titleFallback: 'SI vs IEC formatting',
            code: `import { humanReadableFileSize } from 'origam'

humanReadableFileSize(1500)        // → '1.5 kB'
humanReadableFileSize(1500, 1024)  // → '1.5 KiB'
humanReadableFileSize(512)         // → '512 B'`,
            lang: 'typescript',
        },
    ],
    related: ['format-bytes'],
}
