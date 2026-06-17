import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CALCULATE_UPDATED_TARGET_UTIL_DOC: IUtilDoc = {
    slug: 'calculate-updated-target',
    name: 'calculateUpdatedTarget',
    category: 'Slide',
    icon: 'mdi-arrow-expand-horizontal',
    descriptionKey: 'utils.catalog.calculate_updated_target.description',
    descriptionFallback: 'Compute the minimum scroll offset needed to bring a selected slide item fully into view within its container, with a 40% item-size buffer on each side. Returns the current scroll position unchanged if the item is already visible.',
    signature: `function calculateUpdatedTarget({
  selectedElement,
  containerElement,
  isRtl,
  isHorizontal
}: {
  selectedElement: HTMLElement
  containerElement: HTMLElement
  isRtl: boolean
  isHorizontal: boolean
}): number`,
    params: [
        {
            name: 'selectedElement',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.calculate_updated_target.param_selected_element',
            descriptionFallback: 'The slide item to scroll into view.',
        },
        {
            name: 'containerElement',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.calculate_updated_target.param_container_element',
            descriptionFallback: 'The scroll container element.',
        },
        {
            name: 'isRtl',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.calculate_updated_target.param_is_rtl',
            descriptionFallback: 'True for right-to-left layout. Adjusts scroll position reading direction.',
        },
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.calculate_updated_target.param_is_horizontal',
            descriptionFallback: 'True for horizontal groups (scrollLeft / offsetWidth), false for vertical (scrollTop / offsetHeight).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.calculate_updated_target.returns',
        descriptionFallback: 'The target scroll position in pixels to apply to containerElement.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.calculate_updated_target.example_basic',
            titleFallback: 'Scroll the active chip into view',
            code: `import { calculateUpdatedTarget } from 'origam'

const target = calculateUpdatedTarget({
    selectedElement: activeChip,
    containerElement: chipGroup,
    isRtl: false,
    isHorizontal: true,
})
chipGroup.scrollLeft = target`,
            lang: 'typescript',
        },
    ],
    related: ['calculate-centered-target', 'binary-closest'],
}
