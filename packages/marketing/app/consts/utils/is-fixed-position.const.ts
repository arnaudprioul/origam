import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_FIXED_POSITION_UTIL_DOC: IUtilDoc = {
    slug: 'is-fixed-position',
    name: 'isFixedPosition',
    category: 'Commons',
    icon: 'mdi-pin-outline',
    descriptionKey: 'utils.catalog.is_fixed_position.description',
    descriptionFallback: 'Walks up the DOM ancestry of an element and returns true if any ancestor (including the element itself) has position: fixed in its computed style. Used by overlay and location strategies to decide whether teleport targets need special handling.',
    signature: 'function isFixedPosition(el?: HTMLElement): boolean',
    params: [
        {
            name: 'el',
            type: 'HTMLElement | undefined',
            required: false,
            descriptionKey: 'utils.detail.is_fixed_position.param_el',
            descriptionFallback: 'The element from which to start the ancestor walk. When undefined, the function immediately returns false.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_fixed_position.returns',
        descriptionFallback: 'true when el or any of its offsetParent ancestors has position: fixed; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_fixed_position.example_basic',
            titleFallback: 'Detect fixed-position ancestors',
            code: `import { isFixedPosition } from 'origam'

const trigger = document.querySelector('#my-btn') as HTMLElement
if (isFixedPosition(trigger)) {
  // Adjust overlay positioning for fixed containers
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parent', 'get-offset-position'],
}
