import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const IN_BROWSER_CONST_DOC: IConstDoc = {
    slug: 'in-browser',
    name: 'IN_BROWSER',
    category: 'Internals',
    descriptionKey: 'consts.catalog.in_browser.description',
    descriptionFallback: 'Boolean flag that is true only when code is running in a real browser context (window + document available). Used throughout the DS to guard DOM access and prevent SSR crashes.',
    definition: `export const IN_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined'`,
    value: 'typeof window !== \'undefined\' && typeof document !== \'undefined\'',
    usedBy: [
        { name: 'useDisplay' },
        { name: 'useIntersectionObserver' },
        { name: 'useTouchSupport' },
        { name: 'SUPPORTS_TOUCH' },
        { name: 'SUPPORTS_INTERSECTION' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.in_browser.example',
            titleFallback: 'Guarding DOM access with IN_BROWSER',
            code: `import { IN_BROWSER } from 'origam'

if (IN_BROWSER) {
  document.addEventListener('click', handler)
}`,
            lang: 'typescript',
        },
    ],
}
