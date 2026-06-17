import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CHECK_IS_ACTIVE_UTIL_DOC: IUtilDoc = {
    slug: 'check-is-active',
    name: 'checkIsActive',
    category: 'Commons',
    icon: 'mdi-cursor-pointer',
    descriptionKey: 'utils.catalog.check_is_active.description',
    descriptionFallback: 'Evaluates the closeConditional guard of a v-click-outside directive binding. Returns true when the directive is currently active, undefined when no guard is provided.',
    signature: `function checkIsActive(
  e: MouseEvent,
  binding: IClickOutsideDirectiveBinding
): boolean | void`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent',
            required: true,
            descriptionKey: 'utils.detail.check_is_active.param_e',
            descriptionFallback: 'The mouse event passed to the conditional guard.',
        },
        {
            name: 'binding',
            type: 'IClickOutsideDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.check_is_active.param_binding',
            descriptionFallback: 'The v-click-outside directive binding, optionally carrying a closeConditional function.',
        },
    ],
    returns: {
        type: 'boolean | void',
        descriptionKey: 'utils.detail.check_is_active.returns',
        descriptionFallback: 'The result of the closeConditional function, or true when none is supplied.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/clickOutside.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.check_is_active.example_basic',
            titleFallback: 'Guard check inside a directive handler',
            code: `import { checkIsActive } from 'origam'

if (checkIsActive(e, binding)) {
  // directive is active — proceed with outside-click logic
}`,
            lang: 'typescript',
        },
    ],
    related: ['check-event'],
}
