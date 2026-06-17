import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ONLY_UTIL_DOC: IUtilDoc = {
    slug: 'only',
    name: 'only',
    category: 'Commons',
    icon: 'mdi-filter-outline',
    descriptionKey: 'utils.catalog.only.description',
    descriptionFallback: 'Extract a strict subset of an object\'s keys into a new object. Unlike pick, every listed key is copied unconditionally — the result contains all listed keys, even when they are undefined on the source.',
    signature: `function only<
  T extends object,
  U extends Extract<keyof T, string>
>(obj: T, include: Array<U>): Pick<T, U>`,
    params: [
        {
            name: 'obj',
            type: 'T extends object',
            required: true,
            descriptionKey: 'utils.detail.only.param_obj',
            descriptionFallback: 'The source object to extract properties from.',
        },
        {
            name: 'include',
            type: 'Array<U>',
            required: true,
            descriptionKey: 'utils.detail.only.param_include',
            descriptionFallback: 'Array of key names to copy into the output. Each key is iterated and set on the clone regardless of whether it exists on the source.',
        },
    ],
    returns: {
        type: 'Pick<T, U>',
        descriptionKey: 'utils.detail.only.returns',
        descriptionFallback: 'A new object containing only the listed keys and their values from the source.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.only.example_basic',
            titleFallback: 'Extract specific keys',
            code: `import { only } from 'origam'

const props = { color: 'primary', size: 'md', disabled: false, label: 'Submit' }

only(props, ['color', 'size'])
// → { color: 'primary', size: 'md' }`,
            lang: 'typescript',
        },
    ],
    related: ['pick', 'pick-with-rest'],
}
