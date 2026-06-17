import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ACTIVATOR_UTIL_DOC: IUtilDoc = {
    slug: 'activator',
    name: 'activator',
    category: 'DOM',
    icon: 'mdi-cursor-pointer',
    descriptionKey: 'utils.catalog.activator.description',
    descriptionFallback: 'Wire an activator element (identified by IActivatorProps.activator) to a component\'s event bindings. Watches for prop changes to rebind or unbind events reactively, and cleans up on scope disposal.',
    signature: `function activator(
  props: IActivatorProps,
  vm: ComponentInternalInstance,
  { activatorEl, activatorEvents }: Pick<ReturnType<typeof useActivator>, 'activatorEl' | 'activatorEvents'>
): void`,
    params: [
        {
            name: 'props',
            type: 'IActivatorProps',
            required: true,
            descriptionKey: 'utils.detail.activator.param_props',
            descriptionFallback: 'Component props containing the activator selector and optional activatorProps to bind.',
        },
        {
            name: 'vm',
            type: 'ComponentInternalInstance',
            required: true,
            descriptionKey: 'utils.detail.activator.param_vm',
            descriptionFallback: 'The calling component\'s internal instance, used to resolve "parent" selectors.',
        },
        {
            name: '{ activatorEl, activatorEvents }',
            type: 'Pick<ReturnType<typeof useActivator>, "activatorEl" | "activatorEvents">',
            required: true,
            descriptionKey: 'utils.detail.activator.param_refs',
            descriptionFallback: 'Reactive refs from useActivator(): activatorEl holds the resolved DOM element, activatorEvents holds the event listener map to bind.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.activator.returns',
        descriptionFallback: 'Sets up watchers and scope disposal. Returns nothing — side effects only.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/activator.util.ts',
    examples: [],
    related: [],
}
