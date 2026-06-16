/**
 * /components/file-field — full documentation data for OrigamFileField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/FileField/file-field.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/FileField/OrigamFileField.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/file-field.json                  (CSS tokens)
 *
 * FAMILY (3 .vue):
 *   OrigamFileField, OrigamFileFieldDragNDropItem, OrigamFileFieldListItem
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const FILE_FIELD_DOC: IComponentDoc = {
    slug: 'file-field',
    name: 'FileField',
    tag: 'origam-file-field',
    icon: 'mdi-file-upload-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.file_field.description',
    descriptionFallback: 'File upload input with three display modes (list, chips, counter), an optional drag-and-drop dropzone, file size validation, progress tracking and per-item download/remove actions.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-filefield--design',
    docUrl: 'http://localhost:4000/components/FileField/OrigamFileField',

    family: [
        {
            slug: 'file-field-drag-n-drop-item',
            name: 'FileFieldDragNDropItem',
            descriptionKey: 'components.catalog.file_field_drag_n_drop_item.description',
            descriptionFallback: 'File card rendered inside the dropzone for single-file selection with progress and remove/download actions.'
        },
        {
            slug: 'file-field-list-item',
            name: 'FileFieldListItem',
            descriptionKey: 'components.catalog.file_field_list_item.description',
            descriptionFallback: 'File card rendered in list mode for each selected file with progress and remove action.'
        }
    ],

    related: [
        {
            slug: 'field',
            name: 'Field',
            kind: 'component',
            descriptionKey: 'components.catalog.field.description',
            descriptionFallback: 'Shared field primitive that FileField extends.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'TFile', slug: 'file', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.model_value.description',
            descriptionFallback: 'v-model binding. Accepts a single File, an array of File objects, or null/undefined when empty.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.multiple.description',
            descriptionFallback: 'Allows selecting multiple files at once.'
        },
        {
            name: 'display',
            type: { label: 'TFileFieldDisplay', slug: 'file-field-display', kind: 'type' },
            defaultValue: "'list'",
            descriptionKey: 'components.file_field.props.display.description',
            descriptionFallback: "How multi-file selection is rendered: 'list' (default card stack) | 'chips' (each file as a closable chip) | 'counter' (single \"{n} files\" summary)."
        },
        {
            name: 'dropzone',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.dropzone.description',
            descriptionFallback: 'Renders the field as a large outlined drag-and-drop zone instead of an inline input. Accepts native drag events and falls back to click-to-browse.'
        },
        {
            name: 'dragndrop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.dragndrop.description',
            descriptionFallback: 'Alias for dropzone. Kept for backward compatibility.'
        },
        {
            name: 'chips',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.chips.description',
            descriptionFallback: 'Renders each selected file as a closable chip (shortcut for display="chips").'
        },
        {
            name: 'counter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.counter.description',
            descriptionFallback: 'Shows a file count badge and total size hint in the field.'
        },
        {
            name: 'showSize',
            type: { label: 'TFileSize', slug: 'file-size', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.show_size.description',
            descriptionFallback: 'Shows file sizes beside filenames. Pass 1000 for SI (kB) or 1024 for binary (KiB).'
        },
        {
            name: 'maxFileSize',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.max_file_size.description',
            descriptionFallback: 'Maximum allowed file size in bytes. Files exceeding this emit the error:max-size event.'
        },
        {
            name: 'downloadable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.downloadable.description',
            descriptionFallback: 'Shows a download action button on each file item.'
        },
        {
            name: 'progress',
            type: { label: 'Array<number>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.progress.description',
            descriptionFallback: 'Upload progress for each file (0–100). Drives the progress bar on DragNDrop items and list items.'
        },
        {
            name: 'dragndropIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-cloud-upload-outline'",
            descriptionKey: 'components.file_field.props.dragndrop_icon.description',
            descriptionFallback: 'Icon displayed in the dropzone upload area.'
        },
        {
            name: 'dropzoneTitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.dropzone_title.description',
            descriptionFallback: 'Primary text shown inside the dropzone (e.g. "Drag & drop files here").'
        },
        {
            name: 'dropzoneSubtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.dropzone_subtitle.description',
            descriptionFallback: 'Secondary text shown below the dropzone title (e.g. "or click to browse").'
        },
        {
            name: 'browseText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.browse_text.description',
            descriptionFallback: 'Label for the click-to-browse link inside the dropzone.'
        },
        {
            name: 'maxFileSizeErrorString',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.max_file_size_error_string.description',
            descriptionFallback: 'Custom error message displayed when a file exceeds maxFileSize.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown in the field when no file is selected.'
        },
        {
            name: 'fileIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-file-outline'",
            descriptionKey: 'components.file_field.props.file_icon.description',
            descriptionFallback: 'Icon used as the generic file glyph on list and DnD items.'
        },
        {
            name: 'removeIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-close'",
            descriptionKey: 'components.file_field.props.remove_icon.description',
            descriptionFallback: 'Icon for the remove/clear action on each file item.'
        },
        {
            name: 'downloadIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'mdi-download'",
            descriptionKey: 'components.file_field.props.download_icon.description',
            descriptionFallback: 'Icon for the download action on each file item (visible when downloadable=true).'
        },
        // ── From IFieldProps ──────────────────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.label.description',
            descriptionFallback: 'Floating label text.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.disabled.description',
            descriptionFallback: 'Disables the field. Prevents file selection and drag events.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.file_field.props.readonly.description',
            descriptionFallback: 'Makes the field non-interactive without changing its visual state.'
        },
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.file_field.props.variant.description',
            descriptionFallback: 'Visual style: outlined | underlined | filled | solo | plain.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.file_field.props.color.description',
            descriptionFallback: 'Active border and label colour.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.file_field.props.density.description',
            descriptionFallback: 'Field density.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'TFile', slug: 'file', kind: 'type' },
            descriptionKey: 'components.file_field.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected file(s) change.'
        },
        {
            event: 'click:remove',
            payload: { label: '{ file: File, index: number }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field.emits.click_remove.description',
            descriptionFallback: 'Fired when the user clicks the remove button on a file item.'
        },
        {
            event: 'click:download',
            payload: { label: '{ file: File, index: number }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field.emits.click_download.description',
            descriptionFallback: 'Fired when the user clicks the download button on a file item.'
        },
        {
            event: 'drop',
            payload: { label: '{ files: Array<File>, event: DragEvent }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field.emits.drop.description',
            descriptionFallback: 'Fired when files are dropped onto the dropzone. Includes the raw DragEvent.'
        },
        {
            event: 'error:max-size',
            payload: { label: '{ files: Array<File>, maxFileSize: number, message: Array<string> }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field.emits.error_max_size.description',
            descriptionFallback: 'Fired when one or more dropped/selected files exceed maxFileSize. Includes the list of rejected files and generated error messages.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.file_field.emits.click_control.description',
            descriptionFallback: 'Fired when the main field control area is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.file_field.slots.default.description',
            descriptionFallback: 'Field slot — replaces the default file input + list/chips/counter rendering.'
        },
        {
            slot: 'dropzone',
            slotProps: '{ isDragging, browse }',
            descriptionKey: 'components.file_field.slots.dropzone.description',
            descriptionFallback: 'Replaces the built-in dropzone content (icon + title + subtitle + browse link). isDragging is true during dragover.'
        },
        {
            slot: 'item',
            slotProps: '{ file, index, progress, remove, download }',
            descriptionKey: 'components.file_field.slots.item.description',
            descriptionFallback: 'Replaces a single file item in list or dropzone mode. Provides the file object, index, progress value and action callbacks.'
        },
        {
            slot: 'chip',
            slotProps: '{ fileNames, totalBytes, totalBytesReadable, props }',
            descriptionKey: 'components.file_field.slots.chip.description',
            descriptionFallback: 'Replaces the entire chips summary in chips/counter display mode.'
        },
        {
            slot: 'selection',
            slotProps: '—',
            descriptionKey: 'components.file_field.slots.selection.description',
            descriptionFallback: 'Replaces the selected file display area (chips row or counter).'
        },
        {
            slot: 'counter',
            slotProps: '{ counter, value, max }',
            descriptionKey: 'components.file_field.slots.counter.description',
            descriptionFallback: 'Replaces the file count display with custom markup.'
        },
        {
            slot: 'field',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.file_field.slots.field.description',
            descriptionFallback: 'Replaces the entire field zone (both dropzone and list) for full customisation.'
        }
    ],

    examples: [
        {
            titleKey: 'components.file_field.examples.basic.title',
            titleFallback: 'Basic file input',
            lang: 'vue',
            code: `<template>
  <origam-file-field
    v-model="file"
    label="Upload a file"
    accept=".pdf,.docx"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const file = ref(null)
</script>`
        },
        {
            titleKey: 'components.file_field.examples.dropzone.title',
            titleFallback: 'Dropzone mode',
            lang: 'vue',
            code: `<template>
  <origam-file-field
    v-model="files"
    label="Documents"
    multiple
    dropzone
    dropzone-title="Drag & drop files here"
    dropzone-subtitle="or click to browse"
    :max-file-size="5 * 1024 * 1024"
    show-size
    @error:max-size="onSizeError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const files = ref([])
const onSizeError = ({ files, message }) => console.warn(message)
</script>`
        },
        {
            titleKey: 'components.file_field.examples.chips.title',
            titleFallback: 'Chips display',
            lang: 'vue',
            code: `<template>
  <origam-file-field
    v-model="files"
    label="Attachments"
    multiple
    chips
    show-size
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const files = ref([])
</script>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: { label: 'Upload a file', variant: 'outlined' }
        },
        {
            label: 'dropzone',
            props: { label: 'Drop files', dropzone: true, multiple: true }
        },
        {
            label: 'chips',
            props: { label: 'Attachments', chips: true, multiple: true }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-file-field',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamFileField',
        svgDesc: 'Schematic of the FileField component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="70" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">OrigamInput → OrigamField (label, prepend/append, clearable)</text>
  <rect x="48" y="128" width="604" height="76" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="170" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__dragndrop / file list (display mode: list | chips | counter)</text>
  <circle cx="36" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="136" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="140" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-file-field&gt;</code>. The root ① extends OrigamInput → OrigamField (label, icons, clearable). Below the field ②, the display zone renders in one of three modes: list (card stack), chips (closable chips row), or counter ("{n} files").`,
        legend: [
            {
                num: 1,
                cls: '.origam-file-field',
                descriptionKey: 'components.file_field.anatomy.root',
                descriptionFallback: 'Root element. Extends OrigamInput which itself renders an OrigamField with label, prepend/append zones, and clearable.'
            },
            {
                num: 2,
                cls: '.origam-file-field__dragndrop',
                descriptionKey: 'components.file_field.anatomy.dragndrop',
                descriptionFallback: 'Drag-and-drop wrapper rendered when dropzone/dragndrop=true. Houses the <label> dropzone area and the file list below it.'
            },
            {
                num: 3,
                cls: '.origam-file-field__dropzone',
                descriptionKey: 'components.file_field.anatomy.dropzone',
                descriptionFallback: '<label> element acting as the drop target. Accepts drag events, triggers the hidden file input on click. Has --dragging modifier on dragover.'
            },
            {
                num: 4,
                cls: '.origam-file-field__list',
                descriptionKey: 'components.file_field.anatomy.list',
                descriptionFallback: 'Vertical list of OrigamFileFieldListItem cards shown below the field in list display mode.'
            },
            {
                num: 5,
                cls: '.origam-file-field__dropzone-icon / __dropzone-title / __dropzone-subtitle',
                descriptionKey: 'components.file_field.anatomy.dropzone_content',
                descriptionFallback: 'Inner dropzone content zones: upload icon, primary title text, and secondary subtitle text.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-input class="origam-file-field">
  <!-- OrigamField handles label, prepend/append inner, clearable -->

  <!-- hidden native file input -->
  <input type="file" :multiple="multiple" style="opacity:0;position:absolute;" />

  <!-- dropzone mode -->
  <div v-if="isDropzoneMode" class="origam-file-field__dragndrop">
    <label class="origam-file-field__dropzone">
      <!-- icon + title + subtitle / single-file DnD item -->
      <origam-file-field-drag-n-drop-item v-if="!multiple && hasFiles" />
      <template v-else>
        <origam-icon class="origam-file-field__dropzone-icon" />
        <div class="origam-file-field__dropzone-title" />
        <div class="origam-file-field__dropzone-subtitle" />
      </template>
    </label>

    <!-- multi-file list below dropzone -->
    <div v-if="multiple && hasFiles" class="origam-file-field__list">
      <origam-file-field-list-item v-for="(file, i) in model" :key="i" />
    </div>
  </div>
</origam-input>`,
        classes: [
            {
                cls: 'origam-file-field',
                descriptionKey: 'components.file_field.anatomy.root',
                descriptionFallback: 'Root element wrapping OrigamInput.'
            },
            {
                cls: 'origam-file-field__dragndrop',
                descriptionKey: 'components.file_field.anatomy.dragndrop',
                descriptionFallback: 'Drag-and-drop container (dropzone + list below).'
            },
            {
                cls: 'origam-file-field__dropzone',
                descriptionKey: 'components.file_field.anatomy.dropzone',
                descriptionFallback: '<label> drop target. Adds --dragging modifier on dragover.'
            },
            {
                cls: 'origam-file-field__dropzone-icon',
                descriptionKey: 'components.file_field.anatomy.dropzone_icon',
                descriptionFallback: 'Upload icon glyph inside the dropzone.'
            },
            {
                cls: 'origam-file-field__dropzone-title',
                descriptionKey: 'components.file_field.anatomy.dropzone_title',
                descriptionFallback: 'Primary text area inside the dropzone.'
            },
            {
                cls: 'origam-file-field__dropzone-subtitle',
                descriptionKey: 'components.file_field.anatomy.dropzone_subtitle',
                descriptionFallback: 'Secondary text area inside the dropzone.'
            },
            {
                cls: 'origam-file-field__list',
                descriptionKey: 'components.file_field.anatomy.list',
                descriptionFallback: 'Vertical file card list below the field (list display mode).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-file-field---gap',
            defaultValue: '{space.2} (8px)',
            descriptionKey: 'components.file_field.css_vars.gap',
            descriptionFallback: 'Gap between the dropzone wrapper sections (dropzone + list).'
        },
        {
            name: '--origam-file-field---list-gap',
            defaultValue: '{space.2} (8px)',
            descriptionKey: 'components.file_field.css_vars.list_gap',
            descriptionFallback: 'Gap between file-field list items.'
        },
        {
            name: '--origam-file-field__dropzone---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.file_field.css_vars.dropzone_background_color',
            descriptionFallback: 'Default dropzone background colour.'
        },
        {
            name: '--origam-file-field__dropzone---color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.file_field.css_vars.dropzone_color',
            descriptionFallback: 'Dropzone dashed border colour and text colour fallback.'
        },
        {
            name: '--origam-file-field__dropzone---border-radius',
            defaultValue: '{radius.md} (8px)',
            descriptionKey: 'components.file_field.css_vars.dropzone_border_radius',
            descriptionFallback: 'Dropzone corner radius.'
        },
        {
            name: '--origam-file-field__dropzone---min-height',
            defaultValue: '140px',
            descriptionKey: 'components.file_field.css_vars.dropzone_min_height',
            descriptionFallback: 'Minimum height of the empty dropzone area.'
        },
        {
            name: '--origam-file-field__dropzone--dragging---background-color',
            defaultValue: '{color.feedback.info.bgSubtle}',
            descriptionKey: 'components.file_field.css_vars.dropzone_dragging_bg',
            descriptionFallback: 'Dropzone background during dragover.'
        },
        {
            name: '--origam-file-field__dropzone--dragging---border-color',
            defaultValue: '{color.feedback.info.bg}',
            descriptionKey: 'components.file_field.css_vars.dropzone_dragging_border',
            descriptionFallback: 'Dropzone border colour during dragover.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.file_field.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.file_field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.file_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.file_field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.file_field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.file_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.file_field.a11y.key_tab',
                actionFallback: 'Moves focus to the file input or dropzone label.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.file_field.a11y.key_activate',
                actionFallback: 'Opens the native file picker when the dropzone label has focus.'
            }
        ],
        notes: [
            {
                noteKey: 'components.file_field.a11y.label',
                noteFallback: 'The dropzone is a <label> element pointing to the hidden <input type="file">. Clicking anywhere on the label opens the native file picker.'
            },
            {
                noteKey: 'components.file_field.a11y.drag_events',
                noteFallback: 'Drag events (dragenter, dragover, dragleave, drop) are handled on the <label>. The --dragging modifier class provides visual feedback during dragover.'
            },
            {
                noteKey: 'components.file_field.a11y.disabled',
                noteFallback: 'When disabled=true, the hidden input is disabled and cursor changes to not-allowed. The dropzone opacity drops to 0.6.'
            },
            {
                noteKey: 'components.file_field.a11y.error',
                noteFallback: 'When error is truthy, the dropzone border changes to the danger semantic colour. The error message (if a string) is displayed inside the dropzone area.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/file-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'file-field.dropzone.background-color',
                value: 'transparent',
                type: 'color',
                descriptionKey: 'components.file_field.tokens.dropzone_bg',
                descriptionFallback: 'Default dropzone background.'
            },
            {
                tokenPath: 'file-field.dropzone.color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.file_field.tokens.dropzone_color',
                descriptionFallback: 'Dropzone dashed border and text colour.'
            },
            {
                tokenPath: 'file-field.dropzone.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.file_field.tokens.dropzone_border_radius',
                descriptionFallback: 'Dropzone corner radius (8px).'
            },
            {
                tokenPath: 'file-field.dropzone.min-height',
                value: '140px',
                type: 'dimension',
                descriptionKey: 'components.file_field.tokens.dropzone_min_height',
                descriptionFallback: 'Minimum height of the empty dropzone.'
            },
            {
                tokenPath: 'file-field.dropzone.dragging.background-color',
                value: '{color.feedback.info.bgSubtle}',
                type: 'color',
                descriptionKey: 'components.file_field.tokens.dropzone_dragging_bg',
                descriptionFallback: 'Dropzone background during dragover.'
            },
            {
                tokenPath: 'file-field.dropzone.error.border-color',
                value: '{color.feedback.danger.bg}',
                type: 'color',
                descriptionKey: 'components.file_field.tokens.dropzone_error_border',
                descriptionFallback: 'Dropzone border in error state.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.file_field.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Upload a file'
            },
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.file_field.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'underlined', value: 'underlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'solo', value: 'solo' }
                ]
            },
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.file_field.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'dropzone',
                kind: 'switch',
                labelKey: 'components.file_field.playground.dropzone',
                labelFallback: 'Dropzone mode',
                defaultValue: false
            },
            {
                prop: 'chips',
                kind: 'switch',
                labelKey: 'components.file_field.playground.chips',
                labelFallback: 'Chips display',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.file_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
