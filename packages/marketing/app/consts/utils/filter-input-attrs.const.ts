import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FILTER_INPUT_ATTRS_UTIL_DOC: IUtilDoc = {
    slug: 'filter-input-attrs',
    name: 'filterInputAttrs',
    category: 'Input',
    icon: 'mdi-filter-cog-outline',
    descriptionKey: 'utils.catalog.filter_input_attrs.description',
    descriptionFallback: 'Splits a component\'s $attrs into two groups: attributes that belong on the root element (class, style, id, data-*, bubbling events) and attributes that should be forwarded to the inner <input> element (non-bubbling events + the rest).',
    signature: `function filterInputAttrs(
  attrs: Record<string, unknown>
): [rootAttrs: Record<string, unknown>, inputAttrs: Record<string, unknown>]`,
    params: [
        {
            name: 'attrs',
            type: 'Record<string, unknown>',
            required: true,
            descriptionKey: 'utils.detail.filter_input_attrs.param_attrs',
            descriptionFallback: 'The component attrs object, typically $attrs from a Vue component using inheritAttrs: false.',
        },
    ],
    returns: {
        type: '[Record<string, unknown>, Record<string, unknown>]',
        descriptionKey: 'utils.detail.filter_input_attrs.returns',
        descriptionFallback: 'A tuple of [rootAttrs, inputAttrs]. rootAttrs contains class/style/id/data-* and bubbling event listeners; inputAttrs contains all remaining attributes and non-bubbling event listeners.',
    },
    sourceFile: 'packages/ds/src/utils/Input/input.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.filter_input_attrs.example_basic',
            titleFallback: 'Split attrs between root and input',
            code: `import { filterInputAttrs } from 'origam'

const attrs = {
    class: 'my-field',
    id: 'email',
    placeholder: 'Enter email',
    onInput: handler,
    onClick: rootHandler,
}

const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
// rootAttrs  → { class: 'my-field', onClick: rootHandler, id: 'email' }
// inputAttrs → { placeholder: 'Enter email', onInput: handler }`,
            lang: 'typescript',
        },
    ],
    related: ['filter-items'],
}
