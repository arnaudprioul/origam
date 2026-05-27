import type { IComponentDoc } from '~app/interfaces/component-doc.interface'
import meta from '~~/.generated/components-meta.json'

/**
 * GET /api/components/:slug — Returns the metadata for a single component.
 *
 * Validation: slug is sanitised to prevent path traversal. Only lowercase
 * alphanumeric characters and hyphens are accepted (matches the slug format
 * used throughout the component list).
 */
export default defineEventHandler((event): IComponentDoc | { error: string } => {
    const rawSlug = getRouterParam(event, 'slug') ?? ''

    // Input validation — allow only [a-z0-9-]
    if (!/^[a-z0-9-]+$/.test(rawSlug)) {
        setResponseStatus(event, 400)
        return { error: 'Invalid component slug' }
    }

    const doc = (meta as IComponentDoc[]).find((c) => c.slug === rawSlug)

    if (!doc) {
        setResponseStatus(event, 404)
        return { error: 'Component not found' }
    }

    return doc
})
