import { ref } from 'vue'

/**
 * Copy-to-clipboard helper shared by sections exposing a copyable code
 * snippet (Hero install command, CTA install command). Returns a reactive
 * `copied` flag that auto-resets, so a button can swap its label/icon to a
 * confirmation state without each consumer re-implementing the timer.
 */
export function useCopy (resetMs = 2000) {
    const copied = ref(false)
    let timer: ReturnType<typeof setTimeout> | null = null

    const copy = async (text: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text)
            copied.value = true
        } catch {
            copied.value = false
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            copied.value = false
        }, resetMs)
    }

    return { copied, copy }
}
