import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-item-props',
    name: 'ISnackbarItemProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_snackbar_item_props.description',
    descriptionFallback: 'Props contract for <OrigamSnackbarItem> — the pure visual layer of a single toast notification. Owns intent theming, icon/title/message layout, action buttons, dismiss button, and ARIA semantics.',
    definition: `export interface ISnackbarItemProps extends ICommonsComponentProps {
    intent?: TIntent
    title?: string
    message?: string
    icon?: TIcon | false
    actions?: ReadonlyArray<ISnackbarGroupItemAction>
    dismissible?: boolean
    dismissLabel?: string
    role?: 'status' | 'alert'
    ariaLive?: 'polite' | 'assertive'
    dataCy?: string
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'intent', type: 'TIntent', optional: true, descriptionFallback: 'Semantic intent — drives icon defaults and surface coloring. Defaults to "info".' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Optional title rendered as a bold first line.' },
        { name: 'message', type: 'string', optional: true, descriptionFallback: 'Body text rendered under the title (or as the sole line when title is absent).' },
        { name: 'icon', type: 'TIcon | false', optional: true, descriptionFallback: 'Prepend icon override. Pass false to suppress the icon entirely. Defaults to the per-intent icon.' },
        { name: 'actions', type: 'ReadonlyArray<ISnackbarGroupItemAction>', optional: true, descriptionFallback: 'Action buttons rendered inline after the text block.' },
        { name: 'dismissible', type: 'boolean', optional: true, descriptionFallback: 'Whether to render the close dismiss button. Defaults to true.' },
        { name: 'dismissLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the dismiss button. Defaults to "Dismiss notification".' },
        { name: 'role', type: "'status' | 'alert'", optional: true, descriptionFallback: 'ARIA role for the item element. Inferred from intent when not set: warning/danger → "alert", others → "status".' },
        { name: 'ariaLive', type: "'polite' | 'assertive'", optional: true, descriptionFallback: 'ARIA live region politeness. Inferred from intent: warning/danger → "assertive", others → "polite".' },
        { name: 'dataCy', type: 'string', optional: true, descriptionFallback: 'data-cy attribute injected on the root item element for e2e test addressing.' },
    ],
    usedBy: [
        { slug: 'snackbar-item', name: 'SnackbarItem', kind: 'component' },
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
        { slug: 'snackbar-group', name: 'SnackbarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_item_props.example',
            titleFallback: 'Danger alert toast with custom icon',
            code: `<OrigamSnackbarItem
    intent="danger"
    title="Upload failed"
    message="The file exceeds the 10 MB limit."
    :icon="mdiCloudOffOutline"
    dismissible
/>`,
            lang: 'vue',
        },
    ],
}
