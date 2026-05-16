/**
 * A single artwork descriptor — mirrors the
 * [`MediaImage`](https://developer.mozilla.org/docs/Web/API/MediaImage)
 * dictionary expected by the Media Session API. Lock-screen surfaces
 * (iOS Now Playing, Android Media Style notification, macOS Touch Bar)
 * pick the artwork variant whose `sizes` best matches the host
 * platform's icon slot, so passing multiple entries is the cheapest
 * way to look sharp everywhere.
 */
export interface ISoundArtwork {
    /** Absolute or root-relative URL to the artwork image. */
    src: string
    /**
     * Space-separated `WxH` dimensions string (`"96x96 256x256 512x512"`).
     * The Media Session implementation matches against the slot the OS
     * is about to paint — leaving it undefined makes the OS treat the
     * image as a single-size resource.
     */
    sizes?: string
    /** MIME type — `"image/png"`, `"image/jpeg"`, … */
    type?: string
}

/**
 * Metadata block surfaced to the OS through the Media Session API AND
 * displayed in the default toolbar (title / artist / album). Pass at
 * least a `title` for the lock-screen UI to be informative — without
 * it the platform falls back to the document `<title>`, which rarely
 * matches the currently-playing track.
 */
export interface ISoundMetadata {
    /** Track title shown in the toolbar and on the lock screen. */
    title?: string
    /** Artist name shown under the title. */
    artist?: string
    /** Album name shown under the artist (smaller font). */
    album?: string
    /**
     * Artwork variants exposed to the Media Session API. The default
     * toolbar additionally renders the first artwork entry as a cover
     * if no `cover` prop was passed to the component. Empty array
     * (the default) means no artwork.
     */
    artwork?: Array<ISoundArtwork>
}
