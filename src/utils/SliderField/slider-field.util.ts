/**
 * Get slider field offset.
 *
 * @param e         …
 * @param el        …
 * @param direction …
 */
export function getSliderFieldOffset (e: MouseEvent | TouchEvent, el: HTMLElement, direction: string) {
    const vertical = direction === 'vertical'
    const rect = el.getBoundingClientRect()
    const touch = 'touches' in e ? e.touches[0] : e

    return vertical
        ? touch.clientY - (rect.top + rect.height / 2)
        : touch.clientX - (rect.left + rect.width / 2)
}
