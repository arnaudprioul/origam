import { ref } from 'vue'

/*
 * `isOpen` is module-scoped so every caller of `useSearchHotkey()`
 * shares the same reactive state — SearchTrigger reads it to drive
 * `aria-expanded`, SearchOverlay binds it to `v-model` on the dialog.
 *
 * The keyboard handler is registered EXACTLY ONCE per session, on the
 * client only. Before this guard, both SearchTrigger and SearchOverlay
 * (and any future caller) each added their own `window.keydown`
 * listener via their own composable scope; pressing ⌘+K then ran
 * `toggle()` twice in a row, the dialog flashed open and closed in the
 * same tick. The fix is straightforward: register once, never tied to
 * a component scope.
 */

const isOpen = ref(false)
let isRegistered = false
let isMacCached: boolean | null = null

function detectMac (): boolean {
    if (isMacCached !== null) {
        return isMacCached
    }
    if (typeof navigator === 'undefined') {
        isMacCached = false
        return false
    }
    isMacCached = /mac/i.test(navigator.platform ?? navigator.userAgent ?? '')
    return isMacCached
}

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
    const isMac = detectMac()
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

function ensureRegistered (): void {
    if (isRegistered || typeof window === 'undefined') {
        return
    }
    window.addEventListener('keydown', handleKeydown)
    isRegistered = true
}

export function useSearchHotkey () {
    const isMac = detectMac()
    const shortcutLabel = isMac ? '⌘ K' : 'Ctrl K'

    if (import.meta.client) {
        ensureRegistered()
    }

    return {
        isOpen,
        open,
        close,
        toggle,
        shortcutLabel
    }
}
