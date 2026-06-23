import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HOVER_SHOW_UTIL_DOC: IUtilDoc = {
    slug: 'hover-show',
    name: 'hoverShow',
    category: 'Commons',
    icon: 'mdi-cursor-default',
    descriptionKey: 'utils.catalog.hover_show.description',
    descriptionFallback: 'Event handler that activates the hover visual effect on the current target element. Guards against duplicate touch/mouse events on Android/iOS. Uses the ORIGAM_HOVER_STOP_KEY sentinel to prevent bubble propagation to parent hover elements.',
    signature: `function hoverShow(e: THoverEvent): void`,
    params: [
        {
            name: 'e',
            type: 'THoverEvent',
            required: true,
            descriptionKey: 'utils.detail.hover_show.param_e',
            descriptionFallback: 'A mouseenter or touchstart event. e.currentTarget must be an IHoverHtmlElement with a _hover descriptor.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.hover_show.returns',
        descriptionFallback: 'Nothing. Displays the hover overlay and fires the optional mouseenter callback.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hover_show.example_basic',
            titleFallback: 'Manually bind hover effect',
            code: `import { hoverShow, hoverHide } from 'origam'

el._hover = { class: 'my-hover-class' }
el.addEventListener('mouseenter', hoverShow)
el.addEventListener('mouseleave', hoverHide)`,
            lang: 'typescript',
        },
    ],
    related: ['hover-hide', 'hover-remove-listeners'],
}
