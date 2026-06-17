import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HOVER_STOP_UTIL_DOC: IUtilDoc = {
    slug: 'hover-stop',
    name: 'hoverStop',
    category: 'Commons',
    icon: 'mdi-cursor-default-gesture',
    descriptionKey: 'utils.catalog.hover_stop.description',
    descriptionFallback: 'Marks a hover event with the internal stop token so that ancestor hover handlers skip processing — the equivalent of stopPropagation for the Origam hover system.',
    signature: 'function hoverStop(e: THoverEvent): void',
    params: [
        {
            name: 'e',
            type: 'THoverEvent',
            required: true,
            descriptionKey: 'utils.detail.hover_stop.param_e',
            descriptionFallback: 'The hover event object (a MouseEvent extended with the Origam internal stop key). Mutated in place by setting the stop flag.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.hover_stop.returns',
        descriptionFallback: 'Nothing. The event object is mutated in place.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hover_stop.example_basic',
            titleFallback: 'Stop hover propagation on a nested element',
            code: `import { hoverStop } from 'origam'

// In a v-hover directive handler of a child element
function onChildHover(e: MouseEvent) {
  hoverStop(e)  // parent v-hover will not fire
}`,
            lang: 'typescript',
        },
    ],
    related: ['hover-show', 'hover-hide'],
}
