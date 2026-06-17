import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SUPPORTS_TOUCH_CONST_DOC: IConstDoc = {
    slug: 'supports-touch',
    name: 'SUPPORTS_TOUCH',
    category: 'Environment Detection',
    descriptionKey: 'consts.catalog.supports_touch.description',
    descriptionFallback: 'Boolean flag set at module load time: true when the current environment supports touch events (ontouchstart present or maxTouchPoints > 0). Always false during SSR.',
    definition: `export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)`,
    value: 'boolean (runtime)',
    usedBy: [
        { name: 'useTouch' },
        { name: 'useRipple' },
        { name: 'OrigamSlider' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.supports_touch.example',
            titleFallback: 'Conditionally bind touch handlers',
            code: `import { SUPPORTS_TOUCH } from 'origam'

if (SUPPORTS_TOUCH) {
  el.addEventListener('touchstart', onTouchStart, { passive: true })
}`,
            lang: 'typescript',
        },
    ],
}
