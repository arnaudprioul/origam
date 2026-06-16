/**
 * /components/file-field-list-item — full documentation data for OrigamFileFieldListItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/FileField/file-field-list-item.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/FileField/OrigamFileFieldListItem.vue         (template BEM, defineExpose)
 *   - packages/ds/tokens/component/file-field-list-item.json                  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const FILE_FIELD_LIST_ITEM_DOC: IComponentDoc = {
    slug: 'file-field-list-item',
    name: 'FileFieldListItem',
    tag: 'origam-file-field-list-item',
    icon: 'mdi-file-document-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.file_field_list_item.description',
    descriptionFallback: 'File card rendered in list mode for each selected file. Displays name, human-readable size, an optional progress bar and a remove button. Renders as a semantic <li> element.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-filefield--design',
    docUrl: 'http://localhost:4000/components/FileField/OrigamFileField',
    parentSlug: 'file-field',

    family: [],

    related: [
        {
            slug: 'file-field',
            name: 'FileField',
            kind: 'component',
            descriptionKey: 'components.catalog.file_field.description',
            descriptionFallback: 'Parent file upload field that renders FileFieldListItem in list display mode.'
        },
        {
            slug: 'file-field-drag-n-drop-item',
            name: 'FileFieldDragNDropItem',
            kind: 'component',
            descriptionKey: 'components.catalog.file_field_drag_n_drop_item.description',
            descriptionFallback: 'Sister component used inside the drag-and-drop dropzone.'
        }
    ],

    props: [
        {
            name: 'file',
            type: { label: 'File', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.file_field_list_item.props.file.description',
            descriptionFallback: 'The native File object to display. Provides name and size.'
        },
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.file_field_list_item.props.index.description',
            descriptionFallback: 'Zero-based index of the file in the current selection. Passed back in the click:remove emit payload.'
        },
        {
            name: 'progress',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_list_item.props.progress.description',
            descriptionFallback: 'Upload progress from 0 to 100. When defined, an OrigamProgress bar is rendered below the file meta.'
        },
        {
            name: 'fileIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'MDI_ICONS.FILE',
            descriptionKey: 'components.file_field_list_item.props.file_icon.description',
            descriptionFallback: 'MDI icon name for the file type indicator. Defaults to the generic file icon.'
        },
        {
            name: 'removeIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'MDI_ICONS.CLOSE',
            descriptionKey: 'components.file_field_list_item.props.remove_icon.description',
            descriptionFallback: 'MDI icon for the remove button. Defaults to mdi-close.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field_list_item.props.disabled.description',
            descriptionFallback: 'Disables the remove button.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field_list_item.props.readonly.description',
            descriptionFallback: 'Makes the remove button non-interactive without altering its visual state.'
        },
        {
            name: 'showSize',
            type: { label: 'boolean | 1000 | 1024', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_list_item.props.show_size.description',
            descriptionFallback: 'Controls the SI base for the human-readable file size display. true uses the default base; 1000 = SI (kB), 1024 = IEC (KiB).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_list_item.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the progress bar.'
        }
    ],

    emits: [
        {
            event: 'click:remove',
            payload: { label: '{ file: File, index: number }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field_list_item.emits.click_remove.description',
            descriptionFallback: 'Fired when the user clicks the remove button. Payload carries the File reference and its index so the parent can splice the selection array.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.file_field_list_item.slots.default.description',
            descriptionFallback: 'Replaces the entire card content (icon + name + meta + progress + remove button) with custom markup.'
        }
    ],

    examples: [
        {
            titleKey: 'components.file_field_list_item.examples.basic.title',
            titleFallback: 'Standalone list item',
            lang: 'vue',
            code: `<template>
  <ul>
    <origam-file-field-list-item
      :file="file"
      :index="0"
      :progress="65"
      color="primary"
      @click:remove="onRemove"
    />
  </ul>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-file-field-list-item',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamFileFieldListItem',
        svgDesc: 'Schematic of the list file item with 5 numbered parts: root <li>, icon, content column, progress bar, actions.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="30" width="660" height="100" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="28" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="40" y="44" width="60" height="72" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="70" y="83" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <circle cx="48" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <rect x="116" y="44" width="450" height="72" rx="4" fill="var(--origam-color__surface---sunken, #f9f5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="210" y="64" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" font-weight="600" font-family="'JetBrains Mono',monospace">document.docx</text>
  <text x="210" y="80" font-size="9" fill="var(--origam-color__text---secondary, #7e5fb0)" font-family="'JetBrains Mono',monospace">320 kB</text>
  <rect x="136" y="90" width="410" height="6" rx="3" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.12))"/>
  <rect x="136" y="90" width="267" height="6" rx="3" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="124" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="124" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="340" cy="95" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="340" y="99" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <rect x="580" y="44" width="72" height="72" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="616" y="83" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">remove</text>
  <circle cx="588" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="588" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-file-field-list-item&gt;</code> — renders as a semantic <code>&lt;li&gt;</code>. 5 internal parts: root card ①, file icon ②, content column ③ (name + meta + optional progress ④), and the actions zone ⑤ with the remove button.`,
        legend: [
            {
                num: 1,
                cls: '.origam-file-field-list-item',
                descriptionKey: 'components.file_field_list_item.anatomy.root',
                descriptionFallback: 'Root <li> element. display: flex; align-items: center. Has background-color, border (1px solid), border-radius and padding from design tokens.'
            },
            {
                num: 2,
                cls: '.origam-file-field-list-item__icon',
                descriptionKey: 'components.file_field_list_item.anatomy.icon',
                descriptionFallback: 'OrigamIcon rendered from the fileIcon prop. flex-shrink: 0; color from --origam-file-field-list-item__icon---color.'
            },
            {
                num: 3,
                cls: '.origam-file-field-list-item__content',
                descriptionKey: 'components.file_field_list_item.anatomy.content',
                descriptionFallback: 'Flex column: stacks __name, __meta and optional __progress. flex-grow: 1; min-width: 0 for truncation support.'
            },
            {
                num: 4,
                cls: '.origam-file-field-list-item__progress',
                descriptionKey: 'components.file_field_list_item.anatomy.progress',
                descriptionFallback: 'OrigamProgress bar. Rendered only when the progress prop is a number. height: 4px; rounded; has margin-top from token.'
            },
            {
                num: 5,
                cls: '.origam-file-field-list-item__actions',
                descriptionKey: 'components.file_field_list_item.anatomy.actions',
                descriptionFallback: 'Flex row of action buttons. flex-shrink: 0. Contains the remove OrigamBtn (flat, size="small").'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<li class="origam-file-field-list-item">
  <slot>
    <origam-icon class="origam-file-field-list-item__icon" />
    <div class="origam-file-field-list-item__content">
      <div class="origam-file-field-list-item__name">document.docx</div>
      <div class="origam-file-field-list-item__meta">320 kB</div>
      <origam-progress class="origam-file-field-list-item__progress" />
    </div>
    <div class="origam-file-field-list-item__actions">
      <origam-btn :icon="removeIcon" flat size="small" @click.stop="handleRemove" />
    </div>
  </slot>
</li>`,
        classes: [
            {
                cls: 'origam-file-field-list-item',
                descriptionKey: 'components.file_field_list_item.anatomy.root',
                descriptionFallback: 'Root <li> flex container with background, border, border-radius and padding tokens.'
            },
            {
                cls: 'origam-file-field-list-item__icon',
                descriptionKey: 'components.file_field_list_item.anatomy.icon',
                descriptionFallback: 'File type icon (flex-shrink: 0).'
            },
            {
                cls: 'origam-file-field-list-item__content',
                descriptionKey: 'components.file_field_list_item.anatomy.content',
                descriptionFallback: 'Column container for name, meta and progress.'
            },
            {
                cls: 'origam-file-field-list-item__name',
                descriptionKey: 'components.file_field_list_item.anatomy.name',
                descriptionFallback: 'File name text. Truncated with text-overflow: ellipsis.'
            },
            {
                cls: 'origam-file-field-list-item__meta',
                descriptionKey: 'components.file_field_list_item.anatomy.meta',
                descriptionFallback: 'Human-readable file size text.'
            },
            {
                cls: 'origam-file-field-list-item__progress',
                descriptionKey: 'components.file_field_list_item.anatomy.progress',
                descriptionFallback: 'Upload progress bar (conditional on progress prop).'
            },
            {
                cls: 'origam-file-field-list-item__actions',
                descriptionKey: 'components.file_field_list_item.anatomy.actions',
                descriptionFallback: 'Action buttons zone (remove button).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-file-field-list-item---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.file_field_list_item.css_vars.background_color',
            descriptionFallback: 'Card background color.'
        },
        {
            name: '--origam-file-field-list-item---border-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.file_field_list_item.css_vars.border_color',
            descriptionFallback: 'Card border color.'
        },
        {
            name: '--origam-file-field-list-item---border-width',
            defaultValue: '1px',
            descriptionKey: 'components.file_field_list_item.css_vars.border_width',
            descriptionFallback: 'Card border width.'
        },
        {
            name: '--origam-file-field-list-item---border-style',
            defaultValue: 'solid',
            descriptionKey: 'components.file_field_list_item.css_vars.border_style',
            descriptionFallback: 'Card border style.'
        },
        {
            name: '--origam-file-field-list-item---border-radius',
            defaultValue: '{radius.sm} (6px)',
            descriptionKey: 'components.file_field_list_item.css_vars.border_radius',
            descriptionFallback: 'Card corner radius (6px as fallback in the .vue; closest token is radius.sm = 4px).'
        },
        {
            name: '--origam-file-field-list-item---gap',
            defaultValue: '{space.3} (12px)',
            descriptionKey: 'components.file_field_list_item.css_vars.gap',
            descriptionFallback: 'Gap between the icon, content column and actions zone.'
        },
        {
            name: '--origam-file-field-list-item---padding-block',
            defaultValue: '{space.2} (10px)',
            descriptionKey: 'components.file_field_list_item.css_vars.padding_block',
            descriptionFallback: 'Block (top/bottom) padding of the card.'
        },
        {
            name: '--origam-file-field-list-item---padding-inline',
            defaultValue: '{space.3} (12px)',
            descriptionKey: 'components.file_field_list_item.css_vars.padding_inline',
            descriptionFallback: 'Inline (left/right) padding of the card.'
        },
        {
            name: '--origam-file-field-list-item__icon---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.file_field_list_item.css_vars.icon_color',
            descriptionFallback: 'Color of the file type icon glyph.'
        },
        {
            name: '--origam-file-field-list-item__name---font-size',
            defaultValue: '{font.size.md} (0.875rem)',
            descriptionKey: 'components.file_field_list_item.css_vars.name_font_size',
            descriptionFallback: 'Font size for the file name label.'
        },
        {
            name: '--origam-file-field-list-item__name---font-weight',
            defaultValue: '{font.weight.medium} (500)',
            descriptionKey: 'components.file_field_list_item.css_vars.name_font_weight',
            descriptionFallback: 'Font weight for the file name label.'
        },
        {
            name: '--origam-file-field-list-item__meta---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.file_field_list_item.css_vars.meta_color',
            descriptionFallback: 'Color of the file size / meta text.'
        },
        {
            name: '--origam-file-field-list-item__meta---font-size',
            defaultValue: '{font.size.sm} (0.75rem)',
            descriptionKey: 'components.file_field_list_item.css_vars.meta_font_size',
            descriptionFallback: 'Font size for the file size / meta text.'
        },
        {
            name: '--origam-file-field-list-item__progress---margin-top',
            defaultValue: '{space.1} (4px)',
            descriptionKey: 'components.file_field_list_item.css_vars.progress_margin_top',
            descriptionFallback: 'Top margin of the progress bar inside the content column.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.file_field_list_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.file_field_list_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed root styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.file_field_list_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.file_field_list_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.file_field_list_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.file_field_list_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['listitem'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.file_field_list_item.a11y.key_remove',
                actionFallback: 'Activates the remove button when focused — native <button> behaviour.'
            },
            {
                key: 'Tab',
                actionKey: 'components.file_field_list_item.a11y.key_tab',
                actionFallback: 'Moves focus to the remove button and then to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.file_field_list_item.a11y.semantic_li',
                noteFallback: 'The root element is a semantic <li>. It must be used inside a <ul> (provided by OrigamFileField in list display mode) to satisfy the HTML content model.'
            },
            {
                noteKey: 'components.file_field_list_item.a11y.remove_btn',
                noteFallback: 'The remove button is a native <button> (via OrigamBtn). It is disabled when disabled=true or readonly=true.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/file-field-list-item.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'file-field-list-item.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.file_field_list_item.tokens.background_color',
                descriptionFallback: 'Card background color.'
            },
            {
                tokenPath: 'file-field-list-item.border-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.file_field_list_item.tokens.border_color',
                descriptionFallback: 'Card border color.'
            },
            {
                tokenPath: 'file-field-list-item.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.file_field_list_item.tokens.border_radius',
                descriptionFallback: 'Card corner radius.'
            },
            {
                tokenPath: 'file-field-list-item.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.file_field_list_item.tokens.gap',
                descriptionFallback: 'Gap between icon, content and actions (12px).'
            }
        ]
    } satisfies IComponentTokens
}
