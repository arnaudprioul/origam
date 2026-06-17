import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PICK_UTIL_DOC: IUtilDoc = {
    slug: 'pick',
    name: 'pick',
    category: 'Commons',
    icon: 'mdi-select-all',
    descriptionKey: 'utils.catalog.pick.description',
    descriptionFallback: 'Extract a subset of an object\'s own enumerable keys into a new object. Only keys that actually exist on `obj` are included — missing keys are silently skipped (contrast with `only`, which copies all listed keys unconditionally).',
    signature: `function pick<
  T extends object,
  U extends Extract<keyof T, string>
>(obj: T, paths: Array<U>): Pick<T, U>`,
    params: [
        {
            name: 'obj',
            type: 'T extends object',
            required: true,
            descriptionKey: 'utils.detail.pick.param_obj',
            descriptionFallback: 'The source object to extract properties from.',
        },
        {
            name: 'paths',
            type: 'Array<U>',
            required: true,
            descriptionKey: 'utils.detail.pick.param_paths',
            descriptionFallback: 'Array of key names to include. Only keys that exist in the source object (checked via `Object.keys`) are copied; absent keys are skipped.',
        },
    ],
    returns: {
        type: 'Pick<T, U>',
        descriptionKey: 'utils.detail.pick.returns',
        descriptionFallback: 'A new object with only the requested keys that were present on the source. Does not mutate the original.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pick.example_basic',
            titleFallback: 'Extract known keys from an object',
            code: `import { pick } from 'origam'

const props = { color: 'primary', size: 'md', label: 'Submit' }

pick(props, ['color', 'size'])
// → { color: 'primary', size: 'md' }

pick(props, ['color', 'nonExistent'])
// → { color: 'primary' }  (nonExistent is silently skipped)`,
            lang: 'typescript',
        },
    ],
    related: ['only', 'pick-with-rest'],
}
