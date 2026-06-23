import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CURRENT_INSTANCE_UTIL_DOC: IUtilDoc = {
    slug: 'get-current-instance',
    name: 'getCurrentInstance',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_current_instance.description',
    descriptionFallback: 'Asserts that the call is made inside a Vue component setup function and returns the current internal instance. Throws a descriptive [Origam] error when called outside a component context.',
    signature: `function getCurrentInstance(name: string, message?: string): ComponentInternalInstance`,
    params: [
        {
            name: 'name',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.get_current_instance.param_name',
            descriptionFallback: 'The caller name used in the thrown error message, e.g. "useColor".',
        },
        {
            name: 'message',
            type: 'string',
            required: false,
            descriptionKey: 'utils.detail.get_current_instance.param_message',
            descriptionFallback: 'Optional custom error message. Defaults to "must be called from inside a setup function".',
        },
    ],
    returns: {
        type: 'ComponentInternalInstance',
        descriptionKey: 'utils.detail.get_current_instance.returns',
        descriptionFallback: 'The current Vue component internal instance. Never null — throws if the context is absent.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/getCurrentInstance.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_current_instance.example_basic',
            titleFallback: 'Guard a composable to setup context',
            code: `import { getCurrentInstance } from 'origam'

export function useMyFeature () {
  // Throws '[Origam] useMyFeature must be called from inside a setup function'
  // when invoked outside <script setup> / setup()
  const vm = getCurrentInstance('useMyFeature')
  return vm
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-current-instance-name'],
}
