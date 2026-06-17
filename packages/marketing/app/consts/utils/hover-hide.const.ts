import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HOVER_HIDE_UTIL_DOC: IUtilDoc = {
    slug: 'hover-hide',
    name: 'hoverHide',
    category: 'Commons',
    icon: 'mdi-cursor-default-outline',
    descriptionKey: 'utils.catalog.hover_hide.description',
    descriptionFallback: 'Event handler that hides the hover visual effect on the current target element. Delegates to the internal HOVER.hide() strategy and fires the optional mouseleave callback registered on the element\'s _hover descriptor.',
    signature: `function hoverHide(e: Event): void`,
    params: [
        {
            name: 'e',
            type: 'Event',
            required: true,
            descriptionKey: 'utils.detail.hover_hide.param_e',
            descriptionFallback: 'A mouseleave, touchend, or touchcancel DOM event. e.currentTarget must be an IHoverHtmlElement with a _hover descriptor.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.hover_hide.returns',
        descriptionFallback: 'Nothing. Hides the hover overlay and fires the optional mouseleave callback.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hover_hide.example_basic',
            titleFallback: 'Manually attach hover listeners',
            code: `import { hoverShow, hoverHide } from 'origam'

el.addEventListener('mouseenter', hoverShow)
el.addEventListener('mouseleave', hoverHide)`,
            lang: 'typescript',
        },
    ],
    related: ['hover-show', 'hover-remove-listeners'],
}
