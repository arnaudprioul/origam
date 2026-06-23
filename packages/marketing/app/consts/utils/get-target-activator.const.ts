import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_TARGET_ACTIVATOR_UTIL_DOC: IUtilDoc = {
    slug: 'get-target-activator',
    name: 'getTargetActivator',
    category: 'Commons',
    icon: 'mdi-cursor-pointer',
    descriptionKey: 'utils.catalog.get_target_activator.description',
    descriptionFallback: 'Resolves an activator selector to the concrete HTMLElement that should act as the trigger for an overlay (Menu, Tooltip, …). Accepts the special value "parent" to walk up the DOM and skip data-no-activator nodes.',
    signature: `function getTargetActivator<T extends 'parent' | string | Element | ComponentPublicInstance | [x: number, y: number] | undefined>(
  selector: T,
  vm: ComponentInternalInstance
): HTMLElement | undefined | [x: number, y: number]`,
    params: [
        {
            name: 'selector',
            type: "'parent' | string | Element | ComponentPublicInstance | [x: number, y: number] | undefined",
            required: true,
            descriptionKey: 'utils.detail.get_target_activator.param_selector',
            descriptionFallback: 'The activator descriptor. "parent" walks up to the nearest parent that is not marked data-no-activator. A CSS string is queried via querySelector. An [x, y] tuple is passed through for cursor-position overlays.',
        },
        {
            name: 'vm',
            type: 'ComponentInternalInstance',
            required: true,
            descriptionKey: 'utils.detail.get_target_activator.param_vm',
            descriptionFallback: 'The calling component instance, used as the starting point when selector is "parent".',
        },
    ],
    returns: {
        type: 'HTMLElement | undefined | [x: number, y: number]',
        descriptionKey: 'utils.detail.get_target_activator.returns',
        descriptionFallback: 'The resolved HTMLElement, an [x, y] coordinate tuple for cursor overlays, or undefined when the selector is falsy or no matching element is found.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/activator.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_target_activator.example_basic',
            titleFallback: 'Resolve the parent activator',
            code: `import { getTargetActivator } from 'origam'
import { getCurrentInstance } from 'vue'

const vm = getCurrentInstance()!
const el = getTargetActivator('parent', vm)  // → nearest non-excluded parent`,
            lang: 'typescript',
        },
    ],
    related: ['get-target', 'get-target-box'],
}
