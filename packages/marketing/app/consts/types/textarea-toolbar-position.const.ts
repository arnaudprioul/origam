import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TEXTAREA_TOOLBAR_POSITION_TYPE_DOC: ITypeDoc = {
    slug: 'textarea-toolbar-position',
    name: 'TTextareaToolbarPosition',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.textarea_toolbar_position.description',
    descriptionFallback: 'Where the rich-text toolbar is rendered relative to the editable surface.',
    definition: `export type TTextareaToolbarPosition = \`\${TEXTAREA_TOOLBAR_POSITION}\`

// Where TEXTAREA_TOOLBAR_POSITION is:
export enum TEXTAREA_TOOLBAR_POSITION {
    TOP      = 'top',
    BOTTOM   = 'bottom',
    FLOATING = 'floating'
}`,
    values: [
        {
            value: 'top',
            descriptionKey: 'types.detail.textarea_toolbar_position.top',
            descriptionFallback: 'Toolbar is placed above the editable surface, inside the Field shell.',
        },
        {
            value: 'bottom',
            descriptionKey: 'types.detail.textarea_toolbar_position.bottom',
            descriptionFallback: 'Toolbar is placed below the editable surface, inside the Field shell.',
        },
        {
            value: 'floating',
            descriptionKey: 'types.detail.textarea_toolbar_position.floating',
            descriptionFallback: 'Toolbar uses position: sticky inside the Field shell so it stays visible as the editable surface scrolls.',
        },
    ],
    usedBy: [
        { slug: 'textarea', name: 'Textarea', propName: 'toolbarPosition' },
    ],
    sourceFile: 'packages/ds/src/enums/Textarea/textarea-toolbar-position.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.textarea_toolbar_position.example',
            titleFallback: 'Floating toolbar that stays visible on scroll',
            code: `<origam-textarea
  toolbar-position="floating"
  output="html"
  v-model="content"
/>`,
            lang: 'html',
        },
    ],
}
