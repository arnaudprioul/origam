import type { TPlaygroundTemplate } from '~/types/playground-template.type'

export const PLAYGROUND_DEFAULT_TEMPLATE: TPlaygroundTemplate = 'btn'

export const PLAYGROUND_SHARE_URL_PARAM = 'code'

export const PLAYGROUND_TEMPLATE_URL_PARAM = 'template'

export const PLAYGROUND_MONACO_OPTIONS = {
    theme: 'vs',
    fontSize: 14,
    fontFamily: 'var(--origam-font-family-mono, "Fira Code", "Cascadia Code", monospace)',
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    lineNumbers: 'on' as const,
    tabSize: 4,
    insertSpaces: true,
    renderWhitespace: 'selection' as const,
    bracketPairColorization: { enabled: true },
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    formatOnType: false,
    formatOnPaste: true,
    scrollbar: {
        verticalScrollbarSize: 6,
        horizontalScrollbarSize: 6
    }
} as const

export const PLAYGROUND_REPL_OPTIONS = {
    clearConsole: false,
    showCompileOutput: false,
    showImportMap: false,
    layout: 'vertical' as const
} as const
