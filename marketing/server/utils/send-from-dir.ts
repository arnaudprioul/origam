import { createReadStream, existsSync } from 'node:fs'
import { resolve, extname, join, normalize } from 'node:path'
import { setResponseStatus, setResponseHeader, sendStream, send } from 'h3'
import type { H3Event } from 'h3'
import type { ISendFromDirOptions } from '~app/interfaces/send-from-dir.interface'
import {
    MIME_TYPES,
    CACHE_CONTROL_IMMUTABLE,
    CACHE_CONTROL_HTML,
    CACHE_CONTROL_DEFAULT,
    HASH_FILENAME_PATTERN,
} from '~app/consts/static-serve.const'

function resolveMime(filePath: string): string {
    const ext = extname(filePath).toLowerCase()
    return MIME_TYPES[ext] ?? 'application/octet-stream'
}

function resolveCacheControl(filePath: string, hashPattern: RegExp): string {
    const ext = extname(filePath).toLowerCase()
    if (ext === '.html') {
        return CACHE_CONTROL_HTML
    }
    if (hashPattern.test(filePath)) {
        return CACHE_CONTROL_IMMUTABLE
    }
    return CACHE_CONTROL_DEFAULT
}

function logStaticServe(path: string, status: number, baseDir: string): void {
    if (status >= 400) {
        console.log(JSON.stringify({ event: 'static-serve', path, status, baseDir }))
    }
}

/**
 * Serve a static file from `baseDir/<relativePath>` inside the Nitro process cwd.
 * Enforces path-traversal protection and sets appropriate Cache-Control headers.
 */
export async function sendFromDir(
    event: H3Event,
    baseDir: string,
    relativePath: string,
    options: ISendFromDirOptions = {}
): Promise<void> {
    const { fallbackToIndex = false, immutableHashPattern = HASH_FILENAME_PATTERN } = options

    // --- Security: block path traversal attempts ---
    const normalised = normalize(relativePath)
    if (normalised.includes('..')) {
        logStaticServe(relativePath, 403, baseDir)
        setResponseStatus(event, 403)
        await send(event, 'Forbidden', 'text/plain')
        return
    }

    // Resolve base directory relative to the Nitro process cwd
    const absBaseDir = resolve(process.cwd(), baseDir)

    // Append index.html for directory-like paths
    let filePath = normalised === '' || normalised.endsWith('/')
        ? join(absBaseDir, normalised, 'index.html')
        : join(absBaseDir, normalised)

    // If the file doesn't exist, attempt SPA fallback or 404
    if (!existsSync(filePath)) {
        if (fallbackToIndex) {
            const fallback = join(absBaseDir, 'index.html')
            if (existsSync(fallback)) {
                filePath = fallback
            } else {
                logStaticServe(relativePath, 404, baseDir)
                setResponseStatus(event, 404)
                await send(event, 'Not found', 'text/plain')
                return
            }
        } else {
            logStaticServe(relativePath, 404, baseDir)
            setResponseStatus(event, 404)
            await send(event, 'Not found', 'text/plain')
            return
        }
    }

    const mime = resolveMime(filePath)
    const cacheControl = resolveCacheControl(filePath, immutableHashPattern)

    setResponseHeader(event, 'Content-Type', mime)
    setResponseHeader(event, 'Cache-Control', cacheControl)

    const stream = createReadStream(filePath)
    await sendStream(event, stream)
}
