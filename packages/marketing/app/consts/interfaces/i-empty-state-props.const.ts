import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EMPTY_STATE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-empty-state-props',
    name: 'IEmptyStateProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_empty_state_props.description',
    descriptionFallback: 'Props for OrigamEmptyState — the placeholder shown when a list, table or collection has nothing to display. Five built-in visual presets (no-data, no-results, error, offline, locked) bundle icon and intent; both can be overridden.',
    definition: `export interface IEmptyStateProps extends ICommonsComponentProps, ITagProps {
    preset?: TEmptyStatePreset
    title?: string
    description?: string
    icon?: TIcon
    iconColor?: TIntent
    size?: TEmptyStateSize
    align?: TEmptyStateAlign
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'preset', type: 'TEmptyStatePreset', optional: true, default: "'no-data'", descriptionFallback: 'Visual preset — bundles a default icon and intent. One of: no-data, no-results, error, offline, locked.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Primary heading. Override entirely via the #title slot for richer markup.' },
        { name: 'description', type: 'string', optional: true, descriptionFallback: 'Optional sub-heading rendered below the title. Multiple lines supported.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Override the preset icon. Accepts an MDI/iconify string, SVG path tuples or a Vue Component.' },
        { name: 'iconColor', type: 'TIntent', optional: true, descriptionFallback: 'Override the preset icon color intent (primary, success, danger, warning, info …).' },
        { name: 'size', type: 'TEmptyStateSize', optional: true, default: "'md'", descriptionFallback: 'Vertical density — drives icon size, font sizes, padding and gap.' },
        { name: 'align', type: 'TEmptyStateAlign', optional: true, default: "'center'", descriptionFallback: 'Horizontal alignment of the icon / title / description / actions stack.' },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'OrigamEmptyState', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/EmptyState/empty-state.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_empty_state_props.example',
            titleFallback: 'Empty search results placeholder',
            code: `<OrigamEmptyState
    preset="no-results"
    title="No results found"
    description="Try adjusting your search or filters."
    align="center"
/>`,
            lang: 'html',
        },
    ],
}
