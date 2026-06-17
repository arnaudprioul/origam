import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CURRENT_INSTANCE_NAME_UTIL_DOC: IUtilDoc = {
    slug: 'get-current-instance-name',
    name: 'getCurrentInstanceName',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_current_instance_name.description',
    descriptionFallback: 'Returns the kebab-case name of the currently active Vue component, resolved from aliasName, name, or __name. Useful for generating stable, component-scoped CSS class prefixes inside composables.',
    signature: `function getCurrentInstanceName(name?: string): string`,
    params: [
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: "'composable'",
            descriptionKey: 'utils.detail.get_current_instance_name.param_name',
            descriptionFallback: 'Name passed to the underlying getCurrentInstance call for error messages. Defaults to "composable".',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.get_current_instance_name.returns',
        descriptionFallback: 'The kebab-case component name string derived from the active instance, e.g. "origam-btn" from "OrigamBtn".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/getCurrentInstance.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_current_instance_name.example_basic',
            titleFallback: 'Derive CSS class prefix from component name',
            code: `import { getCurrentInstanceName } from 'origam'

// Inside <script setup> of OrigamBtn.vue
const name = getCurrentInstanceName()
// → 'origam-btn'`,
            lang: 'typescript',
        },
    ],
    related: ['get-current-instance'],
}
