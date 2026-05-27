export interface ISendFromDirOptions {
    /**
     * When true, an unknown route returns the directory's `index.html` instead
     * of a 404. Use this for SPA builds (Histoire) where client-side routing
     * handles deep-links.
     */
    fallbackToIndex?: boolean

    /**
     * Override the regex used to detect a content-hash in the filename.
     * Defaults to `HASH_FILENAME_PATTERN` from static-serve.const.
     */
    immutableHashPattern?: RegExp
}
