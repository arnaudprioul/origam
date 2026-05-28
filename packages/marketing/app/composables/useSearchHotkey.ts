import { ref, onScopeDispose } from 'vue'

const isOpen = ref(false)

export function useSearchHotkey () {
    const isMac = import.meta.client
        ? /mac/i.test(navigator.platform ?? navigator.userAgent)
        : false

    const shortcutLabel = isMac ? '⌘ K' : 'Ctrl K'

    function open (): void {
        isOpen.value = true
    }

    function close (): void {
        isOpen.value = false
    }

    function toggle (): void {
        isOpen.value = !isOpen.value
    }

    function handleKeydown (e: KeyboardEvent): void {
        const isK = e.key === 'k' || e.key === 'K'
        const isModifier = isMac ? e.metaKey : e.ctrlKey

        if (isK && isModifier) {
            e.preventDefault()
            toggle()
            return
        }

        if (e.key === 'Escape' && isOpen.value) {
            e.preventDefault()
            close()
        }
    }

    if (import.meta.client) {
        window.addEventListener('keydown', handleKeydown)

        onScopeDispose(() => {
            window.removeEventListener('keydown', handleKeydown)
        })
    }

    return {
        isOpen,
        open,
        close,
        toggle,
        shortcutLabel
    }
}
