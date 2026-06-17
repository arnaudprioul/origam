import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HAS_UTIL_DOC: IUtilDoc = {
    slug: 'has',
    name: 'has',
    category: 'Commons',
    icon: 'mdi-check-circle-outline',
    descriptionKey: 'utils.catalog.has.description',
    descriptionFallback: 'Type-safe own-property check. Returns true (and narrows the type) when every key in the provided array is an own property of the object. Relies on Object.prototype.hasOwnProperty to avoid false positives from prototype properties.',
    signature: `function has<T extends string>(
  obj: object,
  key: Array<T>
): obj is Record<T, unknown>`,
    params: [
        {
            name: 'obj',
            type: 'object',
            required: true,
            descriptionKey: 'utils.detail.has.param_obj',
            descriptionFallback: 'The object to inspect.',
        },
        {
            name: 'key',
            type: 'Array<T>',
            required: true,
            descriptionKey: 'utils.detail.has.param_key',
            descriptionFallback: 'One or more property key strings. All must be own properties for the guard to pass.',
        },
    ],
    returns: {
        type: 'obj is Record<T, unknown>',
        descriptionKey: 'utils.detail.has.returns',
        descriptionFallback: 'A type predicate that narrows obj to Record<T, unknown> when every key is present as an own property.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.has.example_basic',
            titleFallback: 'Guard on multiple keys',
            code: `import { has } from 'origam'

const color = { r: 255, g: 0, b: 0 }

if (has(color, ['r', 'g', 'b'])) {
  // TypeScript narrows to Record<'r'|'g'|'b', unknown>
  console.log(color.r, color.g, color.b)
}`,
            lang: 'typescript',
        },
    ],
    related: ['has-alpha', 'has-event'],
}
