import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CODE_LANG_TYPE_DOC: ITypeDoc = {
    slug: 'code-lang',
    name: 'TCodeLang',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.code_lang.description',
    descriptionFallback: 'Syntax-highlighting language identifiers supported by OrigamCode — a curated subset of shiki grammars bundled with the design system.',
    definition: `export type TCodeLang = \`\${CODE_LANG}\`

// Where CODE_LANG is:
export enum CODE_LANG {
    PLAINTEXT = 'plaintext',
    VUE       = 'vue',
    TS        = 'ts',
    JS        = 'js',
    TSX       = 'tsx',
    JSX       = 'jsx',
    SCSS      = 'scss',
    CSS       = 'css',
    JSON      = 'json',
    BASH      = 'bash',
    HTML      = 'html',
    XML       = 'xml',
    YAML      = 'yaml',
    MD        = 'md'
}`,
    values: [
        { value: 'plaintext', descriptionKey: 'types.detail.code_lang.plaintext', descriptionFallback: 'No syntax highlighting — raw text output.' },
        { value: 'vue', descriptionKey: 'types.detail.code_lang.vue', descriptionFallback: 'Vue SFC — template, script and style blocks highlighted.' },
        { value: 'ts', descriptionKey: 'types.detail.code_lang.ts', descriptionFallback: 'TypeScript — type annotations, generics and interfaces.' },
        { value: 'js', descriptionKey: 'types.detail.code_lang.js', descriptionFallback: 'JavaScript — ES2022+ syntax supported.' },
        { value: 'tsx', descriptionKey: 'types.detail.code_lang.tsx', descriptionFallback: 'TypeScript JSX — React TSX files.' },
        { value: 'jsx', descriptionKey: 'types.detail.code_lang.jsx', descriptionFallback: 'JavaScript JSX — React JSX files.' },
        { value: 'scss', descriptionKey: 'types.detail.code_lang.scss', descriptionFallback: 'SCSS — variables, nesting and mixins highlighted.' },
        { value: 'css', descriptionKey: 'types.detail.code_lang.css', descriptionFallback: 'CSS — properties, selectors and at-rules.' },
        { value: 'json', descriptionKey: 'types.detail.code_lang.json', descriptionFallback: 'JSON — keys, values and nested structures.' },
        { value: 'bash', descriptionKey: 'types.detail.code_lang.bash', descriptionFallback: 'Bash / shell script — commands, flags and pipes.' },
        { value: 'html', descriptionKey: 'types.detail.code_lang.html', descriptionFallback: 'HTML — tags, attributes and inline scripts/styles.' },
        { value: 'xml', descriptionKey: 'types.detail.code_lang.xml', descriptionFallback: 'XML — elements, attributes and CDATA sections.' },
        { value: 'yaml', descriptionKey: 'types.detail.code_lang.yaml', descriptionFallback: 'YAML — keys, values, anchors and multi-line strings.' },
        { value: 'md', descriptionKey: 'types.detail.code_lang.md', descriptionFallback: 'Markdown — headings, emphasis, links and code fences.' },
    ],
    usedBy: [
        { slug: 'code', name: 'Code', propName: 'lang' },
    ],
    sourceFile: 'packages/ds/src/types/Code/code-lang.type.ts',
    examples: [
        {
            titleKey: 'types.detail.code_lang.example',
            titleFallback: 'Code block with TypeScript highlighting',
            code: `<origam-code lang="ts">
const greeting = (name: string): string => \`Hello, \${name}!\`
</origam-code>`,
            lang: 'html',
        },
    ],
}
