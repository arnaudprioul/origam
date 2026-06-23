import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DESCRIPTOR_UTIL_DOC: IUtilDoc = {
    slug: 'get-descriptor',
    name: 'getDescriptor',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_descriptor.description',
    descriptionFallback: 'Walks the prototype chain of an object and returns the first property descriptor found for the given key. Works across the full inheritance hierarchy, not just own properties.',
    signature: `function getDescriptor(obj: any, key: PropertyKey): PropertyDescriptor | undefined`,
    params: [
        {
            name: 'obj',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_descriptor.param_obj',
            descriptionFallback: 'The object (or instance) to inspect. The function walks up via Object.getPrototypeOf until the key is found or the chain ends.',
        },
        {
            name: 'key',
            type: 'PropertyKey',
            required: true,
            descriptionKey: 'utils.detail.get_descriptor.param_key',
            descriptionFallback: 'The property key to look for (string, number, or symbol).',
        },
    ],
    returns: {
        type: 'PropertyDescriptor | undefined',
        descriptionKey: 'utils.detail.get_descriptor.returns',
        descriptionFallback: 'The first matching PropertyDescriptor, or undefined when the key is not found anywhere in the chain.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/forwardRefs.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_descriptor.example_basic',
            titleFallback: 'Read a getter from a prototype',
            code: `import { getDescriptor } from 'origam'

class Base { get value () { return 42 } }
class Child extends Base {}

const desc = getDescriptor(new Child(), 'value')
// desc.get !== undefined → true`,
            lang: 'typescript',
        },
    ],
    related: [],
}
