import { computed } from 'vue'

const GITHUB_STARS_FALLBACK = 0

interface IGithubStarsData {
  stars: number
  cached: boolean
}

export function useGithubStars () {
  const { data, status } = useFetch<IGithubStarsData>('/api/github-stars', {
    default: () => ({ stars: GITHUB_STARS_FALLBACK, cached: false })
  })

  const stars = computed(() => data.value?.stars ?? GITHUB_STARS_FALLBACK)
  const isPending = computed(() => status.value === 'pending')

  return { stars, isPending }
}
