import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CALCULATE_CENTERED_TARGET_UTIL_DOC: IUtilDoc = {
    slug: 'calculate-centered-target',
    name: 'calculateCenteredTarget',
    category: 'Slide',
    icon: 'mdi-focus-field',
    descriptionKey: 'utils.catalog.calculate_centered_target.description',
    descriptionFallback: 'Compute the scroll offset that places a selected slide item at the visual center of its container. Used by OrigamSlideGroup in centered-scroll mode.',
    signature: `function calculateCenteredTarget({
  selectedElement,
  containerElement,
  isHorizontal
}: {
  selectedElement: HTMLElement
  containerElement: HTMLElement
  isHorizontal: boolean
}): number`,
    params: [
        {
            name: 'selectedElement',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.calculate_centered_target.param_selected_element',
            descriptionFallback: 'The slide item element to center.',
        },
        {
            name: 'containerElement',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.calculate_centered_target.param_container_element',
            descriptionFallback: 'The scroll container element.',
        },
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.calculate_centered_target.param_is_horizontal',
            descriptionFallback: 'True for horizontal slide groups (measures scrollLeft / offsetWidth), false for vertical (scrollTop / offsetHeight).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.calculate_centered_target.returns',
        descriptionFallback: 'The scroll position (in pixels) to set on the container so that the selected element appears centered.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.calculate_centered_target.example_basic',
            titleFallback: 'Center the active tab in a tab bar',
            code: `import { calculateCenteredTarget } from 'origam'

const target = calculateCenteredTarget({
    selectedElement: activeTab,
    containerElement: tabBar,
    isHorizontal: true,
})
tabBar.scrollLeft = target`,
            lang: 'typescript',
        },
    ],
    related: ['calculate-updated-target', 'binary-closest'],
}
