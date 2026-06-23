import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SUPPORTED_LANGS_CONST_DOC: IConstDoc = {
    slug: 'supported-langs',
    name: 'SUPPORTED_LANGS',
    category: 'Code & Syntax',
    descriptionKey: 'consts.catalog.supported_langs.description',
    descriptionFallback: 'Frozen list of language identifiers (CODE_LANG enum values) bundled with the default shiki highlighter. OrigamCode accepts only these values for its `lang` prop unless a custom highlighter is registered. Keep this list and the `langs` argument of `createHighlighter()` in lockstep.',
    definition: `export const SUPPORTED_LANGS: ReadonlyArray<CODE_LANG> = Object.freeze([
    CODE_LANG.PLAINTEXT,
    CODE_LANG.VUE,
    CODE_LANG.TS,
    CODE_LANG.JS,
    CODE_LANG.TSX,
    CODE_LANG.JSX,
    CODE_LANG.SCSS,
    CODE_LANG.CSS,
    CODE_LANG.JSON,
    CODE_LANG.BASH,
    CODE_LANG.HTML,
    CODE_LANG.XML,
    CODE_LANG.YAML,
    CODE_LANG.MD
])`,
    values: [
        { value: 'CODE_LANG.PLAINTEXT', descriptionKey: 'consts.detail.supported_langs.plaintext', descriptionFallback: 'Plain text — no syntax highlighting.' },
        { value: 'CODE_LANG.VUE', descriptionKey: 'consts.detail.supported_langs.vue', descriptionFallback: 'Vue SFC syntax.' },
        { value: 'CODE_LANG.TS', descriptionKey: 'consts.detail.supported_langs.ts', descriptionFallback: 'TypeScript.' },
        { value: 'CODE_LANG.JS', descriptionKey: 'consts.detail.supported_langs.js', descriptionFallback: 'JavaScript.' },
        { value: 'CODE_LANG.TSX', descriptionKey: 'consts.detail.supported_langs.tsx', descriptionFallback: 'TypeScript JSX.' },
        { value: 'CODE_LANG.JSX', descriptionKey: 'consts.detail.supported_langs.jsx', descriptionFallback: 'JavaScript JSX.' },
        { value: 'CODE_LANG.SCSS', descriptionKey: 'consts.detail.supported_langs.scss', descriptionFallback: 'SCSS.' },
        { value: 'CODE_LANG.CSS', descriptionKey: 'consts.detail.supported_langs.css', descriptionFallback: 'CSS.' },
        { value: 'CODE_LANG.JSON', descriptionKey: 'consts.detail.supported_langs.json', descriptionFallback: 'JSON.' },
        { value: 'CODE_LANG.BASH', descriptionKey: 'consts.detail.supported_langs.bash', descriptionFallback: 'Bash / shell.' },
        { value: 'CODE_LANG.HTML', descriptionKey: 'consts.detail.supported_langs.html', descriptionFallback: 'HTML.' },
        { value: 'CODE_LANG.XML', descriptionKey: 'consts.detail.supported_langs.xml', descriptionFallback: 'XML.' },
        { value: 'CODE_LANG.YAML', descriptionKey: 'consts.detail.supported_langs.yaml', descriptionFallback: 'YAML.' },
        { value: 'CODE_LANG.MD', descriptionKey: 'consts.detail.supported_langs.md', descriptionFallback: 'Markdown.' },
    ],
    usedBy: [
        { name: 'useCode' },
        { name: 'OrigamCode' },
        { name: 'ICodeProps' },
    ],
    sourceFile: 'packages/ds/src/consts/Code/code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.supported_langs.example',
            titleFallback: 'Validating a lang value before passing it to OrigamCode',
            code: `import { SUPPORTED_LANGS } from 'origam'

const isSupported = (lang: string) =>
  SUPPORTED_LANGS.includes(lang as never)`,
            lang: 'typescript',
        },
    ],
}
