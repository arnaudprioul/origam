import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MDI_ALIASES_CONST_DOC: IConstDoc = {
    slug: 'mdi-aliases',
    name: 'MDI_ALIASES',
    category: 'Icons',
    descriptionKey: 'consts.catalog.mdi_aliases.description',
    descriptionFallback: 'Semantic icon aliases for the MDI icon set. Spreads all MDI_ICONS enum values and adds named overrides (collapse, complete, cancel, close, delete, clear, success, info, warning, error, prev, next, checkboxOn/Off/Indeterminate, delimiter, sortAsc/Desc, expand, menu, subgroup, dropdown, radioOn/Off, edit, ratingEmpty/Full/Half, loading, first, last, unfold, file, plus, minus, calendar, eyeDropper, eyeOff, eyeOn). Pass alongside MDI to the icons.aliases option.',
    definition: `export const MDI_ALIASES: IIconAliases = {
    ...MDI_ICONS,
    collapse: 'mdi-chevron-up',
    complete: 'mdi-check',
    cancel: 'mdi-close-circle',
    close: 'mdi-close',
    delete: 'mdi-close-circle',
    clear: 'mdi-close-circle',
    success: 'mdi-check-circle',
    info: 'mdi-information',
    warning: 'mdi-alert-circle',
    error: 'mdi-close-circle',
    prev: 'mdi-chevron-left',
    next: 'mdi-chevron-right',
    checkboxOn: 'mdi-checkbox-marked',
    checkboxOff: 'mdi-checkbox-blank-outline',
    checkboxIndeterminate: 'mdi-minus-box',
    delimiter: 'mdi-circle',
    sortAsc: 'mdi-arrow-up',
    sortDesc: 'mdi-arrow-down',
    expand: 'mdi-chevron-down',
    menu: 'mdi-menu',
    subgroup: 'mdi-menu-down',
    dropdown: 'mdi-menu-down',
    radioOn: 'mdi-radiobox-marked',
    radioOff: 'mdi-radiobox-blank',
    edit: 'mdi-pencil',
    ratingEmpty: 'mdi-star-outline',
    ratingFull: 'mdi-star',
    ratingHalf: 'mdi-star-half-full',
    loading: 'mdi-cached',
    first: 'mdi-page-first',
    last: 'mdi-page-last',
    unfold: 'mdi-unfold-more-horizontal',
    file: 'mdi-paperclip',
    plus: 'mdi-plus',
    minus: 'mdi-minus',
    calendar: 'mdi-calendar',
    eyeDropper: 'mdi-eyedropper',
    eyeOff: 'mdi-eye-off-outline',
    eyeOn: 'mdi-eye-outline'
}`,
    values: [
        { value: "collapse: 'mdi-chevron-up'", descriptionKey: 'consts.detail.mdi_aliases.collapse', descriptionFallback: 'Collapse / hide action icon.' },
        { value: "complete: 'mdi-check'", descriptionKey: 'consts.detail.mdi_aliases.complete', descriptionFallback: 'Completed / confirmed state icon.' },
        { value: "cancel: 'mdi-close-circle'", descriptionKey: 'consts.detail.mdi_aliases.cancel', descriptionFallback: 'Cancel action icon.' },
        { value: "close: 'mdi-close'", descriptionKey: 'consts.detail.mdi_aliases.close', descriptionFallback: 'Close / dismiss icon.' },
        { value: "success: 'mdi-check-circle'", descriptionKey: 'consts.detail.mdi_aliases.success', descriptionFallback: 'Success state icon.' },
        { value: "warning: 'mdi-alert-circle'", descriptionKey: 'consts.detail.mdi_aliases.warning', descriptionFallback: 'Warning state icon.' },
        { value: "error: 'mdi-close-circle'", descriptionKey: 'consts.detail.mdi_aliases.error', descriptionFallback: 'Error state icon.' },
        { value: "expand: 'mdi-chevron-down'", descriptionKey: 'consts.detail.mdi_aliases.expand', descriptionFallback: 'Expand / show-more icon.' },
        { value: "loading: 'mdi-cached'", descriptionKey: 'consts.detail.mdi_aliases.loading', descriptionFallback: 'Loading / refresh spinner icon.' },
        { value: "sortAsc: 'mdi-arrow-up'", descriptionKey: 'consts.detail.mdi_aliases.sort_asc', descriptionFallback: 'Sort ascending icon.' },
        { value: "sortDesc: 'mdi-arrow-down'", descriptionKey: 'consts.detail.mdi_aliases.sort_desc', descriptionFallback: 'Sort descending icon.' },
    ],
    usedBy: [
        { name: 'MDI' },
        { name: 'OrigamIcon', slug: 'icon' },
        { name: 'useIcon' },
    ],
    sourceFile: 'packages/ds/src/consts/Icon/mdi.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.mdi_aliases.example',
            titleFallback: 'Using a semantic alias in a component',
            code: `import { createOrigam, MDI, MDI_ALIASES } from 'origam'

const origam = createOrigam({
  icons: {
    defaultSet: 'mdi',
    sets: { mdi: MDI },
    aliases: MDI_ALIASES
  }
})

// Then in templates, use the semantic alias name:
// <origam-icon icon="$success" />`,
            lang: 'typescript',
        },
    ],
}
