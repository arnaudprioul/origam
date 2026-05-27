import type { TPlaygroundTemplate } from '~/types/playground-template.type'
import { PLAYGROUND_SHARE_URL_PARAM, PLAYGROUND_TEMPLATE_URL_PARAM } from '~/consts/playground.const'

function encodeShare (code: string): string {
    const bytes = new TextEncoder().encode(code)
    const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('')
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '.')
}

function decodeShare (encoded: string): string {
    const base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .replace(/\./g, '=')
    const binary = atob(base64)
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
}

function getShareUrl (code: string): string {
    const encoded = encodeShare(code)
    return `${location.origin}/playground?${PLAYGROUND_SHARE_URL_PARAM}=${encoded}`
}

function parseInitialCode (): { code: string | null; template: TPlaygroundTemplate | null } {
    const route = useRoute()

    const rawCode = route.query[PLAYGROUND_SHARE_URL_PARAM]
    const rawTemplate = route.query[PLAYGROUND_TEMPLATE_URL_PARAM]

    let code: string | null = null
    if (typeof rawCode === 'string' && rawCode.length > 0) {
        try {
            code = decodeShare(rawCode)
        } catch {
            code = null
        }
    }

    const template = typeof rawTemplate === 'string' && rawTemplate.length > 0
        ? (rawTemplate as TPlaygroundTemplate)
        : null

    return { code, template }
}

export function usePlaygroundShare () {
    return {
        encodeShare,
        decodeShare,
        getShareUrl,
        parseInitialCode
    }
}
