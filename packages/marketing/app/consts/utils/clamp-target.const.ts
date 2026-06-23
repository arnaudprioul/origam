import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CLAMP_TARGET_UTIL_DOC: IUtilDoc = {
    slug: 'clamp-target',
    name: 'clampTarget',
    category: 'Commons',
    icon: 'mdi-arrow-collapse-horizontal',
    descriptionKey: 'utils.catalog.clamp_target.description',
    descriptionFallback: 'Clamps a scroll target value to the valid scroll range of a container element, supporting both vertical and horizontal axes. Used internally by the goTo scroll utility.',
    signature: `function clampTarget(
  container: HTMLElement,
  value: number,
  horizontal: boolean
): number`,
    params: [
        {
            name: 'container',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.clamp_target.param_container',
            descriptionFallback: 'The scrollable container whose scroll range is used as bounds.',
        },
        {
            name: 'value',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.clamp_target.param_value',
            descriptionFallback: 'The desired scroll position in pixels.',
        },
        {
            name: 'horizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.clamp_target.param_horizontal',
            descriptionFallback: 'When true, clamps against the horizontal scroll range; otherwise the vertical range.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.clamp_target.returns',
        descriptionFallback: 'The clamped scroll position between 0 and the maximum scrollable distance of the container.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.clamp_target.example_basic',
            titleFallback: 'Prevent over-scrolling',
            code: `import { clampTarget } from 'origam'

const safeY = clampTarget(document.documentElement, 9999, false)
// → max vertical scroll position of the page`,
            lang: 'typescript',
        },
    ],
    related: ['clamp'],
}
