import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ALLOWED_URL_SCHEMES_CONST_DOC: IConstDoc = {
    slug: 'allowed-url-schemes',
    name: 'ALLOWED_URL_SCHEMES',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.allowed_url_schemes.description',
    descriptionFallback: 'URL schemes allowed on <a href> values in the rich Textarea sanitiser. Tested against the start of the trimmed, lower-cased href. Anything else (notably javascript:, data:, vbscript:) is stripped.',
    definition: `export const ALLOWED_URL_SCHEMES: ReadonlyArray<string> = [
    'http:',
    'https:',
    'mailto:',
    'tel:'
]`,
    values: [
        { value: "'http:'", descriptionKey: 'consts.detail.allowed_url_schemes.http', descriptionFallback: 'Plain HTTP links.' },
        { value: "'https:'", descriptionKey: 'consts.detail.allowed_url_schemes.https', descriptionFallback: 'Secure HTTPS links.' },
        { value: "'mailto:'", descriptionKey: 'consts.detail.allowed_url_schemes.mailto', descriptionFallback: 'Email links.' },
        { value: "'tel:'", descriptionKey: 'consts.detail.allowed_url_schemes.tel', descriptionFallback: 'Phone links.' },
    ],
    usedBy: [
        { name: 'OrigamTextarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.allowed_url_schemes.example',
            titleFallback: 'Validating a URL scheme',
            code: `import { ALLOWED_URL_SCHEMES } from 'origam'

const isSafeUrl = (href: string) =>
  ALLOWED_URL_SCHEMES.some(s => href.trim().toLowerCase().startsWith(s))`,
            lang: 'typescript',
        },
    ],
}
