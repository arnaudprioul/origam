import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_CODE_RETURN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-code-return',
    name: 'IUseCodeReturn',
    category: 'Composable Returns',
    descriptionKey: 'interfaces.catalog.i_use_code_return.description',
    descriptionFallback: 'Public surface of the useCode composable. Lazily instantiates a shiki highlighter on first call and reuses it across every OrigamCode instance for the lifetime of the page.',
    definition: `export interface IUseCodeReturn {
    highlight (code: string, lang: TCodeLang): Promise<string>
    prime (): Promise<void>
    isReady (): boolean
    resetCacheForTesting (): void
}`,
    extends: [],
    props: [
        { name: 'highlight', type: '(code: string, lang: TCodeLang) => Promise<string>', optional: false, descriptionFallback: 'Render code to a pre-tokenised HTML string. Resolves once the underlying shiki highlighter has loaded the requested language / theme.' },
        { name: 'prime', type: '() => Promise<void>', optional: false, descriptionFallback: 'Force the highlighter to load. Useful for stories / tests that want to warm the cache before mounting consumers.' },
        { name: 'isReady', type: '() => boolean', optional: false, descriptionFallback: 'Whether the singleton highlighter is ready. False on first paint, flips to true once the dynamic import finishes.' },
        { name: 'resetCacheForTesting', type: '() => void', optional: false, descriptionFallback: 'Wipe the LRU cache. Test-only — production code never needs this.' },
    ],
    usedBy: [
        { slug: 'use-code', name: 'useCode', kind: 'composable' },
        { slug: 'code', name: 'Code', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Code/code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_code_return.example',
            titleFallback: 'Consuming useCode in a component',
            code: `const { highlight, isReady } = useCode()
const html = await highlight('const x = 1', 'typescript')`,
            lang: 'typescript',
        },
    ],
}
