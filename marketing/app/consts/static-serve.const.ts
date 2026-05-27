export const STATIC_DOCS_DIR = 'public/docs' as const
export const STATIC_STORIES_DIR = 'public/stories' as const

export const CACHE_CONTROL_IMMUTABLE = 'public, max-age=31536000, immutable' as const
export const CACHE_CONTROL_HTML = 'public, max-age=0, must-revalidate' as const
export const CACHE_CONTROL_DEFAULT = 'public, max-age=3600' as const

/** Matches filenames that embed a content hash of 8+ lowercase hex chars before the extension. */
export const HASH_FILENAME_PATTERN = /\.[0-9a-f]{8,}\.[^./]+$/i

export const MIME_TYPES: Readonly<Record<string, string>> = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
} as const
