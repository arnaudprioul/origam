import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_INTRINSIC_SIZE_UTIL_DOC: IUtilDoc = {
    slug: 'get-intrinsic-size',
    name: 'getIntrinsicSize',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_intrinsic_size.description',
    descriptionFallback: 'Returns the bounding-box of an element with its right constraint removed and CSS transforms nullified, giving the element\'s natural (intrinsic) content dimensions. Used by the location/overlay positioning engine.',
    signature: `function getIntrinsicSize(el: HTMLElement): DOMRect`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.get_intrinsic_size.param_el',
            descriptionFallback: 'The overlay or positioned element to measure. Its inline right style is temporarily cleared and CSS transforms are zeroed before measurement.',
        },
    ],
    returns: {
        type: 'DOMRect',
        descriptionKey: 'utils.detail.get_intrinsic_size.returns',
        descriptionFallback: 'A DOMRect (or equivalent plain object) with x, y, width, height adjusted to remove the element\'s own transforms and right-pin offset.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_intrinsic_size.example_basic',
            titleFallback: 'Measure natural content dimensions of an overlay',
            code: `import { getIntrinsicSize } from 'origam'

const contentBox = getIntrinsicSize(menuEl)
// contentBox.width / contentBox.height = natural size before CSS constraints`,
            lang: 'typescript',
        },
    ],
    related: ['get-center', 'get-dimensions'],
}
