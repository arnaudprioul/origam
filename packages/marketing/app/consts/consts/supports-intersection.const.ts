import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SUPPORTS_INTERSECTION_CONST_DOC: IConstDoc = {
    slug: 'supports-intersection',
    name: 'SUPPORTS_INTERSECTION',
    category: 'Environment Detection',
    descriptionKey: 'consts.catalog.supports_intersection.description',
    descriptionFallback: 'Boolean flag set at module load time: true when the code runs in a browser that exposes the IntersectionObserver API. Always false during SSR.',
    definition: `export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window`,
    value: 'boolean (runtime)',
    usedBy: [
        { name: 'useIntersectionObserver' },
        { name: 'OrigamLazy' },
        { name: 'OrigamInfiniteScroll' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.supports_intersection.example',
            titleFallback: 'Guard an IntersectionObserver usage',
            code: `import { SUPPORTS_INTERSECTION } from 'origam'

if (SUPPORTS_INTERSECTION) {
  const observer = new IntersectionObserver(callback)
  observer.observe(el)
}`,
            lang: 'typescript',
        },
    ],
}
