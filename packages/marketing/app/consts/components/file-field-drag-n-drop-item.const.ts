/**
 * /components/file-field-drag-n-drop-item — full documentation data for OrigamFileFieldDragNDropItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/FileField/file-field-dragndrop-item.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/FileField/OrigamFileFieldDragNDropItem.vue         (template BEM, defineExpose)
 *   - packages/ds/tokens/component/file-field-dragndrop-item.json                  (CSS tokens)
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

export const FILE_FIELD_DRAG_N_DROP_ITEM_DOC: IComponentDoc = {
    slug: 'file-field-drag-n-drop-item',
    name: 'FileFieldDragNDropItem',
    tag: 'origam-file-field-drag-n-drop-item',
    icon: 'mdi-file-upload-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.file_field_drag_n_drop_item.description',
    descriptionFallback: 'File card rendered inside a drag-and-drop dropzone. Displays the file icon, name, human-readable size, an optional progress bar, and a remove button.',
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
            descriptionFallback: 'Parent file upload field that renders FileFieldDragNDropItem inside the dropzone.'
        },
        {
            slug: 'file-field-list-item',
            name: 'FileFieldListItem',
            kind: 'component',
            descriptionKey: 'components.catalog.file_field_list_item.description',
            descriptionFallback: 'Sister component used in list display mode.'
        }
    ],

    props: [
        {
            name: 'file',
            type: { label: 'File', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.file_field_drag_n_drop_item.props.file.description',
            descriptionFallback: 'The native File object to display. Provides name and size.'
        },
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.file_field_drag_n_drop_item.props.index.description',
            descriptionFallback: 'Zero-based index of the file in the current selection. Passed back in the click:remove emit payload.'
        },
        {
            name: 'progress',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.progress.description',
            descriptionFallback: 'Upload progress from 0 to 100. When defined, an OrigamProgress bar is rendered below the file meta.'
        },
        {
            name: 'fileIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'MDI_ICONS.FILE',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.file_icon.description',
            descriptionFallback: 'MDI icon name for the file type indicator. Defaults to the generic file icon.'
        },
        {
            name: 'removeIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'MDI_ICONS.CLOSE',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.remove_icon.description',
            descriptionFallback: 'MDI icon for the remove button. Defaults to mdi-close.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.disabled.description',
            descriptionFallback: 'Disables the remove button.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.readonly.description',
            descriptionFallback: 'Makes the remove button non-interactive without altering its visual state.'
        },
        {
            name: 'showSize',
            type: { label: 'boolean | 1000 | 1024', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.show_size.description',
            descriptionFallback: 'Controls the SI base for the human-readable file size display. true uses the default base; 1000 = SI (kB), 1024 = IEC (KiB).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field_drag_n_drop_item.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the progress bar.'
        }
    ],

    emits: [
        {
            event: 'click:remove',
            payload: { label: '{ file: File, index: number }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field_drag_n_drop_item.emits.click_remove.description',
            descriptionFallback: 'Fired when the user clicks the remove button. Payload carries the File reference and its index so the parent can splice the selection array.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.file_field_drag_n_drop_item.slots.default.description',
            descriptionFallback: 'Replaces the entire card content (icon + name + meta + progress + remove button) with custom markup.'
        }
    ],

    examples: [
        {
            titleKey: 'components.file_field_drag_n_drop_item.examples.basic.title',
            titleFallback: 'Standalone drag-n-drop item',
            lang: 'vue',
            code: `<template>
  <origam-file-field-drag-n-drop-item
    :file="file"
    :index="0"
    :progress="42"
    color="primary"
    @click:remove="onRemove"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-file-field-dragndrop-item',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamFileFieldDragNDropItem',
        svgDesc: 'Schematic of the drag-and-drop file item with 5 numbered parts: root, icon, content, progress bar, actions.',
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
  <text x="210" y="64" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" font-weight="600" font-family="'JetBrains Mono',monospace">filename.pdf</text>
  <text x="210" y="80" font-size="9" fill="var(--origam-color__text---secondary, #7e5fb0)" font-family="'JetBrains Mono',monospace">1.2 MB</text>
  <rect x="136" y="88" width="410" height="6" rx="3" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.12))"/>
  <rect x="136" y="88" width="172" height="6" rx="3" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="124" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="124" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="340" cy="93" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="340" y="97" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <rect x="580" y="44" width="72" height="72" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="616" y="83" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">remove</text>
  <circle cx="588" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="588" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-file-field-dragndrop-item&gt;</code> — 5 internal parts. The root ① is a horizontal flex row; the icon ② is a static file glyph; the content ③ stacks the name, meta text and optional progress bar ④; the actions zone ⑤ holds the remove button.`,
        legend: [
            {
                num: 1,
                cls: '.origam-file-field-dragndrop-item',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.root',
                descriptionFallback: 'Root element. display: flex; align-items: center; gap driven by --origam-file-field-dragndrop-item---gap (default 12px).'
            },
            {
                num: 2,
                cls: '.origam-file-field-dragndrop-item__icon',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.icon',
                descriptionFallback: 'OrigamIcon rendered from the fileIcon prop. flex-shrink: 0; color from --origam-file-field-dragndrop-item__icon---color.'
            },
            {
                num: 3,
                cls: '.origam-file-field-dragndrop-item__content',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.content',
                descriptionFallback: 'Flex column: stacks __name, __meta and optional __progress. flex-grow: 1; min-width: 0 (truncation support).'
            },
            {
                num: 4,
                cls: '.origam-file-field-dragndrop-item__progress',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.progress',
                descriptionFallback: 'OrigamProgress bar. Rendered only when the progress prop is a number. height: 4px; rounded.'
            },
            {
                num: 5,
                cls: '.origam-file-field-dragndrop-item__actions',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.actions',
                descriptionFallback: 'Flex row of action buttons. flex-shrink: 0. Contains the remove OrigamBtn (flat, size="small").'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-file-field-dragndrop-item">
  <slot>
    <origam-icon class="origam-file-field-dragndrop-item__icon" />
    <div class="origam-file-field-dragndrop-item__content">
      <div class="origam-file-field-dragndrop-item__name">filename.pdf</div>
      <div class="origam-file-field-dragndrop-item__meta">1.2 MB</div>
      <origam-progress class="origam-file-field-dragndrop-item__progress" />
    </div>
    <div class="origam-file-field-dragndrop-item__actions">
      <origam-btn :icon="removeIcon" flat size="small" @click.stop.prevent="handleRemove" />
    </div>
  </slot>
</div>`,
        classes: [
            {
                cls: 'origam-file-field-dragndrop-item',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.root',
                descriptionFallback: 'Root flex container.'
            },
            {
                cls: 'origam-file-field-dragndrop-item__icon',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.icon',
                descriptionFallback: 'File type icon (flex-shrink: 0).'
            },
            {
                cls: 'origam-file-field-dragndrop-item__content',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.content',
                descriptionFallback: 'Column container for name, meta and progress.'
            },
            {
                cls: 'origam-file-field-dragndrop-item__name',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.name',
                descriptionFallback: 'File name text. Truncated with text-overflow: ellipsis.'
            },
            {
                cls: 'origam-file-field-dragndrop-item__meta',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.meta',
                descriptionFallback: 'Human-readable file size display.'
            },
            {
                cls: 'origam-file-field-dragndrop-item__progress',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.progress',
                descriptionFallback: 'Progress bar (conditional on progress prop).'
            },
            {
                cls: 'origam-file-field-dragndrop-item__actions',
                descriptionKey: 'components.file_field_drag_n_drop_item.anatomy.actions',
                descriptionFallback: 'Action buttons zone (remove).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-file-field-dragndrop-item---gap',
            defaultValue: '{space.3} (12px)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.gap',
            descriptionFallback: 'Gap between the icon, content column and actions zone.'
        },
        {
            name: '--origam-file-field-dragndrop-item---content-gap',
            defaultValue: '{space.1} (4px)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.content_gap',
            descriptionFallback: 'Gap between name, meta and progress bar inside the content column.'
        },
        {
            name: '--origam-file-field-dragndrop-item---actions-gap',
            defaultValue: '{space.1} (4px)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.actions_gap',
            descriptionFallback: 'Gap between action buttons (when multiple are rendered).'
        },
        {
            name: '--origam-file-field-dragndrop-item__icon---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.icon_color',
            descriptionFallback: 'Color of the file type icon glyph.'
        },
        {
            name: '--origam-file-field-dragndrop-item__name---font-size',
            defaultValue: '{font.size.md} (0.875rem)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.name_font_size',
            descriptionFallback: 'Font size for the file name label.'
        },
        {
            name: '--origam-file-field-dragndrop-item__name---font-weight',
            defaultValue: '{font.weight.medium} (500)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.name_font_weight',
            descriptionFallback: 'Font weight for the file name label.'
        },
        {
            name: '--origam-file-field-dragndrop-item__meta---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.meta_color',
            descriptionFallback: 'Color of the file size / meta text.'
        },
        {
            name: '--origam-file-field-dragndrop-item__meta---font-size',
            defaultValue: '{font.size.sm} (0.75rem)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.meta_font_size',
            descriptionFallback: 'Font size for the file size / meta text.'
        },
        {
            name: '--origam-file-field-dragndrop-item__progress---margin-top',
            defaultValue: '{space.1} (4px)',
            descriptionKey: 'components.file_field_drag_n_drop_item.css_vars.progress_margin_top',
            descriptionFallback: 'Top margin of the progress bar inside the content column.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed root styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.file_field_drag_n_drop_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.file_field_drag_n_drop_item.a11y.key_remove',
                actionFallback: 'Activates the remove button when focused — native <button> behaviour.'
            },
            {
                key: 'Tab',
                actionKey: 'components.file_field_drag_n_drop_item.a11y.key_tab',
                actionFallback: 'Moves focus to the remove button and then to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.file_field_drag_n_drop_item.a11y.remove_btn',
                noteFallback: 'The remove button is a native <button> (via OrigamBtn). It is disabled when disabled=true or readonly=true — pointer events and keyboard activation are suppressed.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/file-field-dragndrop-item.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'file-field-dragndrop-item.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.file_field_drag_n_drop_item.tokens.gap',
                descriptionFallback: 'Gap between icon, content column and actions (12px).'
            },
            {
                tokenPath: 'file-field-dragndrop-item.icon.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.file_field_drag_n_drop_item.tokens.icon_color',
                descriptionFallback: 'File type icon foreground color.'
            },
            {
                tokenPath: 'file-field-dragndrop-item.name.font-size',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.file_field_drag_n_drop_item.tokens.name_font_size',
                descriptionFallback: 'File name font size (0.875rem).'
            },
            {
                tokenPath: 'file-field-dragndrop-item.meta.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.file_field_drag_n_drop_item.tokens.meta_color',
                descriptionFallback: 'File size / meta text color.'
            }
        ]
    } satisfies IComponentTokens
}
