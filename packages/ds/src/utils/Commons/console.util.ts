import { warn } from 'vue'

/**
 * Console warn.
 *
 * @param message …
 */
export function consoleWarn (message: string): void {
    warn(`Origam: ${message}`)
}

/**
 * Console error.
 *
 * @param message …
 */
export function consoleError (message: string): void {
    warn(`Origam error: ${message}`)
}
