import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CODE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-code-props',
    name: 'ICodeProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_code_props.description',
    descriptionFallback: 'Props for OrigamCode — a shiki-powered code block with line numbers, line highlighting, copy button, compact pill mode and theme awareness.',
    definition: `export interface ICodeProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IDimensionProps, IColorProps, IBgColorProps {
    code?: string
    lang?: TCodeLang
    lineNumbers?: boolean
    highlightLines?: number[] | string | null
    copyable?: boolean
    format?: boolean
    wrap?: boolean
    filename?: string
    compact?: boolean
    prompt?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IPaddingProps',
        'IMarginProps',
        'IDimensionProps',
        'IColorProps',
        'IBgColorProps',
    ],
    props: [
        { name: 'code', type: 'string', optional: true, descriptionFallback: 'The code to highlight. When omitted the default slot is used as the source. When both are provided the prop wins.' },
        { name: 'lang', type: 'TCodeLang', optional: true, descriptionFallback: 'Language grammar to apply (e.g. "typescript", "vue"). Unknown values fall back to "plaintext" with a one-shot console warning.' },
        { name: 'lineNumbers', type: 'boolean', optional: true, descriptionFallback: 'Show a left gutter with line numbers. Pure CSS — uses a CSS counter incremented per .origam-code__row.' },
        { name: 'highlightLines', type: 'number[] | string | null', optional: true, descriptionFallback: 'Lines to highlight. Accepts a pre-computed array of 1-based line numbers or a comma/range string ("2,5-7"). null / empty disables the feature.' },
        { name: 'copyable', type: 'boolean', optional: true, descriptionFallback: 'Show the copy-to-clipboard button in the top-right corner. Defaults to true.' },
        { name: 'format', type: 'boolean', optional: true, descriptionFallback: 'Auto-format the code before highlighting. Reserved for v3 — currently a no-op that warns once in dev.' },
        { name: 'wrap', type: 'boolean', optional: true, descriptionFallback: 'Wrap long lines instead of scrolling horizontally. Off by default so the visual column matches the source file.' },
        { name: 'filename', type: 'string', optional: true, descriptionFallback: 'Optional filename rendered in the header bar (e.g. "App.vue"). When provided and copyable is true, the header also hosts the copy button.' },
        { name: 'compact', type: 'boolean', optional: true, descriptionFallback: 'Render the block as a single-line pill — ideal for a copyable install command. Suppresses header, filename and line-numbers.' },
        { name: 'prompt', type: 'string', optional: true, descriptionFallback: 'Decorative prompt prefix rendered before the code (e.g. "$" for a shell command). Purely visual — never included in the clipboard copy.' },
    ],
    usedBy: [
        { slug: 'code', name: 'Code', kind: 'component' },
        { slug: 'use-code', name: 'useCode', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Code/code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_code_props.example_basic',
            titleFallback: 'Basic code block with language and line numbers',
            code: `<OrigamCode lang="typescript" :line-numbers="true" :copyable="true">
const x: number = 42
</OrigamCode>`,
            lang: 'vue',
        },
        {
            titleKey: 'interfaces.detail.i_code_props.example_compact',
            titleFallback: 'Compact install-command pill',
            code: `<OrigamCode lang="bash" :compact="true" prompt="$">
npm install origam
</OrigamCode>`,
            lang: 'vue',
        },
    ],
}
