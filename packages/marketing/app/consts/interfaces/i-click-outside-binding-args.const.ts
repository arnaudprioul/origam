import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_OUTSIDE_BINDING_ARGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-outside-binding-args',
    name: 'IClickOutsideBindingArgs',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_click_outside_binding_args.description',
    descriptionFallback: 'Object-form argument for the v-click-outside directive. Allows fine-grained control: conditional close logic and a list of elements to treat as "inside".',
    definition: `export interface IClickOutsideBindingArgs {
    handler: (e: MouseEvent) => void
    closeConditional?: (e: Event) => boolean
    include?: () => Array<HTMLElement>
}`,
    extends: [],
    props: [
        { name: 'handler', type: '(e: MouseEvent) => void', optional: false, descriptionFallback: 'Callback invoked when a pointer-down event lands outside the element.' },
        { name: 'closeConditional', type: '(e: Event) => boolean', optional: true, descriptionFallback: 'Guard function — when provided, the handler only fires if this returns true.' },
        { name: 'include', type: '() => Array<HTMLElement>', optional: true, descriptionFallback: 'Factory returning extra DOM elements that should be considered "inside" and therefore not trigger the handler.' },
    ],
    usedBy: [
        { slug: 'click-outside', name: 'v-click-outside', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/clickOutside.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_outside_binding_args.example',
            titleFallback: 'Using the object form of v-click-outside',
            code: `import type { IClickOutsideBindingArgs } from 'origam'

const binding: IClickOutsideBindingArgs = {
    handler: (e) => { console.log('outside', e) },
    closeConditional: (e) => !isMenuOpen.value,
    include: () => [anchorEl.value],
}`,
            lang: 'typescript',
        },
    ],
}
