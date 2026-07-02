const NPM_REGISTRY_DIST_TAGS_URL = 'https://registry.npmjs.org/-/package/origam/dist-tags'
const CACHE_TTL_SECONDS = 3600

interface INpmDistTagsResponse {
  latest: string
  [key: string]: string
}

interface INpmVersionResponse {
  version: string
}

export default defineCachedEventHandler(
  async (event): Promise<INpmVersionResponse> => {
    const fallback = useRuntimeConfig(event).public.npmVersion as string

    try {
      const data = await $fetch<INpmDistTagsResponse>(NPM_REGISTRY_DIST_TAGS_URL, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'origam-marketing/1.0'
        }
      })

      return {
        version: data.latest ?? fallback
      }
    } catch {
      return {
        version: fallback
      }
    }
  },
  {
    maxAge: CACHE_TTL_SECONDS,
    name: 'npm-version',
    getKey: () => 'npm-version'
  }
)
