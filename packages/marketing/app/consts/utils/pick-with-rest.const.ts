import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PICK_WITH_REST_UTIL_DOC: IUtilDoc = {
    slug: 'pick-with-rest',
    name: 'pickWithRest',
    category: 'Commons',
    icon: 'mdi-call-split',
    descriptionKey: 'utils.catalog.pick_with_rest.description',
    descriptionFallback: 'Split an object\'s keys into two buckets: `yes` (keys matching any of the paths, minus any explicitly excluded ones) and `no` (everything else). Paths may be plain strings or `RegExp` patterns.',
    signature: `function pickWithRest<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
>(
  obj: T,
  paths: Array<U | RegExp>,
  exclude?: Array<E>
): [yes: Partial<T>, no: Partial<T>]`,
    params: [
        {
            name: 'obj',
            type: 'T extends object',
            required: true,
            descriptionKey: 'utils.detail.pick_with_rest.param_obj',
            descriptionFallback: 'The source object to split.',
        },
        {
            name: 'paths',
            type: 'Array<U | RegExp>',
            required: true,
            descriptionKey: 'utils.detail.pick_with_rest.param_paths',
            descriptionFallback: 'An array of string keys and/or regular expressions. A key is placed in the `yes` bucket when it matches any entry in this array.',
        },
        {
            name: 'exclude',
            type: 'Array<E>',
            required: false,
            descriptionKey: 'utils.detail.pick_with_rest.param_exclude',
            descriptionFallback: 'Optional array of keys to forcibly keep in the `no` bucket even when they match a path or regex.',
        },
    ],
    returns: {
        type: '[yes: Partial<T>, no: Partial<T>]',
        descriptionKey: 'utils.detail.pick_with_rest.returns',
        descriptionFallback: 'A 2-tuple: the first element contains matched keys, the second contains all remaining keys. Neither input is mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pick_with_rest.example_basic',
            titleFallback: 'Split component props from inherited attrs',
            code: `import { pickWithRest } from 'origam'

const attrs = { class: 'foo', id: 'bar', 'aria-label': 'close', color: 'primary' }

const [componentProps, htmlAttrs] = pickWithRest(attrs, ['color', /^aria-/])
// componentProps → { color: 'primary', 'aria-label': 'close' }
// htmlAttrs      → { class: 'foo', id: 'bar' }`,
            lang: 'typescript',
        },
    ],
    related: ['pick', 'only', 'filter-input-attrs'],
}
