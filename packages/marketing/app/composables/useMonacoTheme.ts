import { computed } from 'vue'

type TMonacoTheme = 'vs' | 'vs-dark'

export function useMonacoTheme () {
    const { resolvedMode } = useTheme()

    const monacoTheme = computed<TMonacoTheme>(() => (resolvedMode.value === 'dark' ? 'vs-dark' : 'vs'))

    return { monacoTheme }
}
