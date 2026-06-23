import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DESTRUCT_COMPUTED_UTIL_DOC: IUtilDoc = {
    slug: 'destruct-computed',
    name: 'destructComputed',
    category: 'Commons',
    icon: 'mdi-vector-difference',
    descriptionKey: 'utils.catalog.destruct_computed.description',
    descriptionFallback: 'Converts a computed getter that returns an object into individual reactive refs, one per key. Lets you destructure a computed without losing reactivity.',
    signature: `function destructComputed<T extends object>(getter: ComputedGetter<T & TNotAUnion<T>>): ToRefs<T>
function destructComputed<T extends object>(getter: ComputedGetter<T>): ToRefs<T>`,
    params: [
        {
            name: 'getter',
            type: 'ComputedGetter<T>',
            required: true,
            descriptionKey: 'utils.detail.destruct_computed.param_getter',
            descriptionFallback: 'A function used as the computed getter. It must return a plain object whose keys will each become a reactive ref.',
        },
    ],
    returns: {
        type: 'ToRefs<T>',
        descriptionKey: 'utils.detail.destruct_computed.returns',
        descriptionFallback: 'An object of Vue refs, one per key of the value returned by the getter. Each ref updates automatically when the computed changes.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.destruct_computed.example_basic',
            titleFallback: 'Destructure a computed object reactively',
            code: `import { destructComputed } from 'origam'
import { computed, ref } from 'vue'

const count = ref(0)
const { doubled, label } = destructComputed(() => ({
    doubled: count.value * 2,
    label: \`value is \${count.value}\`,
}))

console.log(doubled.value) // 0
count.value = 5
console.log(doubled.value) // 10`,
            lang: 'typescript',
        },
    ],
    related: ['deep-equal', 'merge-deep'],
}
