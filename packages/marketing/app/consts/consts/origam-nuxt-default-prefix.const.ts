import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_NUXT_DEFAULT_PREFIX_CONST_DOC: IConstDoc = {
    slug: 'origam-nuxt-default-prefix',
    name: 'ORIGAM_NUXT_DEFAULT_PREFIX',
    category: 'Nuxt / SSR',
    descriptionKey: 'consts.catalog.origam_nuxt_default_prefix.description',
    descriptionFallback: 'Default component prefix registered by the Origam Nuxt module. All auto-imported components are available as <OrigamXxx> out of the box.',
    definition: `export const ORIGAM_NUXT_DEFAULT_PREFIX = 'Origam'`,
    value: `'Origam'`,
    usedBy: [
        { name: 'origam Nuxt module' },
    ],
    sourceFile: 'packages/ds/src/consts/Theme/theme.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_nuxt_default_prefix.example',
            titleFallback: 'Custom prefix in nuxt.config',
            code: `// nuxt.config.ts
import { ORIGAM_NUXT_DEFAULT_PREFIX } from 'origam'

export default defineNuxtConfig({
  origam: {
    // Default is 'Origam' — change to 'Ds' to use <DsBtn />
    prefix: ORIGAM_NUXT_DEFAULT_PREFIX
  }
})`,
            lang: 'typescript',
        },
    ],
}
