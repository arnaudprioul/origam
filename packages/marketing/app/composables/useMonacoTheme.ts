import { computed, onMounted, onScopeDispose, ref } from 'vue'

type TMonacoTheme = 'vs' | 'vs-dark'

function resolveTheme (dataTheme: string | null): TMonacoTheme {
    return dataTheme === 'dark' ? 'vs-dark' : 'vs'
}

export function useMonacoTheme () {
    const rawTheme = ref<string | null>(null)

    const monacoTheme = computed<TMonacoTheme>(() => resolveTheme(rawTheme.value))

    let observer: MutationObserver | null = null

    onMounted(() => {
        const html = document.documentElement
        rawTheme.value = html.getAttribute('data-theme')

        observer = new MutationObserver(() => {
            rawTheme.value = html.getAttribute('data-theme')
        })

        observer.observe(html, {
            attributes: true,
            attributeFilter: ['data-theme']
        })
    })

    onScopeDispose(() => {
        observer?.disconnect()
        observer = null
    })

    return { monacoTheme }
}
