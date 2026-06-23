import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_UID_UTIL_DOC: IUtilDoc = {
    slug: 'get-uid',
    name: 'getUid',
    category: 'Commons',
    icon: 'mdi-identifier',
    descriptionKey: 'utils.catalog.get_uid.description',
    descriptionFallback: 'Returns a stable numeric UID for the calling Vue component instance. The same instance always receives the same integer; different instances receive different integers. Useful for generating unique DOM id attributes (aria-controls, aria-labelledby, …).',
    signature: `function getUid(): number`,
    params: [],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_uid.returns',
        descriptionFallback: 'A positive integer unique to the current component instance for the lifetime of the application.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/getCurrentInstance.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_uid.example_basic',
            titleFallback: 'Generate a stable aria id',
            code: `import { getUid } from 'origam'

const uid = getUid()
// In template: <button :aria-controls="\`panel-\${uid}\`">`,
            lang: 'typescript',
        },
    ],
    related: ['has-event'],
}
