import { computed } from 'vue'

/**
 * Single source of truth for the displayed origam version.
 *
 * The value is injected at build time from `packages/ds/package.json` via
 * `runtimeConfig.public.npmVersion` (see nuxt.config). Components and i18n
 * interpolation pull it from here, so a release only requires bumping the DS
 * package version — never a manual edit of a badge string or a translation.
 */
export function useVersion () {
    const version = useRuntimeConfig().public.npmVersion as string
    const versionTag = computed(() => `v${version}`)

    return { version, versionTag }
}
