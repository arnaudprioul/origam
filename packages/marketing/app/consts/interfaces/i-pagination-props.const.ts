import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PAGINATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-pagination-props',
    name: 'IPaginationProps',
    category: 'Pagination',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IPaginationProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, ISizeProps, IDensityProps {
    start?: number;
    modelValue?: number;
    disabled?: boolean;
    length?: number | string;
    totalVisible?: number | string;
    firstIcon?: TIcon;
    prevIcon?: TIcon;
    nextIcon?: TIcon;
    lastIcon?: TIcon;
    ariaLabel?: string;
    pageAriaLabel?: string;
    currentPageAriaLabel?: string;
    firstAriaLabel?: string;
    previousAriaLabel?: string;
    nextAriaLabel?: string;
    lastAriaLabel?: string;
    ellipsis?: string;
    showFirstLastPage?: boolean;
    compact?: boolean;
    pageText?: string;
    ofText?: string;
    withInfo?: boolean;
    total?: number | string;
    perPage?: number | string;
    infoText?: string;
    previousText?: string;
    nextText?: string;
    pageNumberAriaLabel?: string;
    hoverColor?: TColor;
    hoverBgColor?: TColor;
    activeColor?: TColor;
    activeBgColor?: TColor;
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IColorProps', 'IBgColorProps', 'IBorderProps', 'IPaddingProps', 'IMarginProps', 'IElevationProps', 'ISizeProps', 'IDensityProps'],
    props: [
        { name: 'start', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'modelValue', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'length', type: 'number | string', optional: true, descriptionFallback: '' },
        { name: 'totalVisible', type: 'number | string', optional: true, descriptionFallback: '' },
        { name: 'firstIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'prevIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'nextIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'lastIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'ariaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'pageAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'currentPageAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'firstAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'previousAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'nextAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'lastAriaLabel', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'ellipsis', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'showFirstLastPage', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'compact', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'pageText', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'ofText', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'withInfo', type: 'boolean', optional: true, descriptionFallback: `Toggle the "with info" mode — pagination then renders a left-side
range label \`Showing {start}-{end} of {total}\` next to the standard
list of page buttons. Requires \`total\` (and optionally \`perPage\`)
to compute meaningful start/end indices.` },
        { name: 'total', type: 'number | string', optional: true, descriptionFallback: `Total number of *items* (NOT pages). Drives the \`withInfo\` label —
"Showing 21-40 of {total}". When omitted while \`withInfo\` is true,
falls back to \`length * perPage\`.` },
        { name: 'perPage', type: 'number | string', optional: true, descriptionFallback: `Number of items rendered on a single page. Used together with
\`total\` to compute the Showing N-M range. Defaults to 10 when
\`withInfo\` is enabled.` },
        { name: 'infoText', type: 'string', optional: true, descriptionFallback: 'i18n key for the `withInfo` label. Receives `{0}=start`, `{1}=end`, `{2}=total`.' },
        { name: 'previousText', type: 'string', optional: true, descriptionFallback: `Label rendered next to the prev chevron in \`withInfo\` mode.
Default falls back to the \`origam.pagination.previous\` i18n key
(\`"Prev"\` in English). Useful for setting a translated label
inline without touching the locale catalogue.` },
        { name: 'nextText', type: 'string', optional: true, descriptionFallback: `Label rendered next to the next chevron in \`withInfo\` mode.
Default falls back to the \`origam.pagination.next\` i18n key
(\`"Next"\` in English).` },
        { name: 'pageNumberAriaLabel', type: 'string', optional: true, descriptionFallback: `aria-label for the compact mode page number \`<input>\`. Falls back to
the \`origam.pagination.ariaLabel.pageNumber\` i18n key.` },
        { name: 'hoverColor', type: 'TColor', optional: true, descriptionFallback: '' },
        { name: 'hoverBgColor', type: 'TColor', optional: true, descriptionFallback: '' },
        { name: 'activeColor', type: 'TColor', optional: true, descriptionFallback: '' },
        { name: 'activeBgColor', type: 'TColor', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Pagination/pagination.interface.ts',
    examples: [],
}
