import type { IComponentDoc } from '~app/interfaces/component-doc.interface'
import meta from '~~/.generated/components-meta.json'

/**
 * GET /api/components — Returns the full component metadata list.
 * Used by the components gallery and for sitemap generation.
 */
export default defineEventHandler((): IComponentDoc[] => {
    return meta as IComponentDoc[]
})
