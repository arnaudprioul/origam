import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-props',
    name: 'IFileFieldProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_file_field_props.description',
    descriptionFallback: 'Full prop surface for OrigamFileField — controls multiple selection, display mode (list/chips/counter), dropzone mode, upload progress, size display, custom icons and inherits the full IFieldProps and IInputProps surfaces.',
    definition: `export interface IFileFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    chips?: boolean
    counter?: boolean
    counterSizeString?: string
    counterString?: string
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    multiple?: boolean
    showSize?: TFileSize
    modelValue?: TFile
    chipProps?: IChipProps
    divider?: string
    iconColor?: string
    maxFileSize?: number
    dragndrop?: boolean
    dragndropIcon?: string
    fileIcon?: string
    removeIcon?: string
    downloadIcon?: string
    downloadable?: boolean
    progress?: Array<number>
    dropzoneTitle?: string
    dropzoneSubtitle?: string
    browseText?: string
    maxFileSizeErrorString?: string
    display?: TFileFieldDisplay
    dropzone?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IDensityProps',
        'IFieldProps',
        'IInputProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
    ],
    props: [
        { name: 'chips', type: 'boolean', optional: true, descriptionFallback: 'Render selected files as chips (shorthand for display="chips").' },
        { name: 'counter', type: 'boolean', optional: true, descriptionFallback: 'Show a file count indicator.' },
        { name: 'counterSizeString', type: 'string', optional: true, descriptionFallback: 'Custom size format string for the counter.' },
        { name: 'counterString', type: 'string', optional: true, descriptionFallback: 'Custom count format string for the counter.' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder text shown when no file is selected.' },
        { name: 'persistentPlaceholder', type: 'boolean', optional: true, descriptionFallback: 'Keep the placeholder visible even when a file is selected.' },
        { name: 'persistentCounter', type: 'boolean', optional: true, descriptionFallback: 'Keep the counter visible even when no file is selected.' },
        { name: 'multiple', type: 'boolean', optional: true, descriptionFallback: 'Allow multiple file selection.' },
        { name: 'showSize', type: 'TFileSize', optional: true, descriptionFallback: 'Display file sizes. Pass 1000 (SI) or 1024 (binary).' },
        { name: 'modelValue', type: 'TFile', optional: true, descriptionFallback: 'v-model value — a File, FileList, or array of Files.' },
        { name: 'chipProps', type: 'IChipProps', optional: true, descriptionFallback: 'Extra props forwarded to each chip when display="chips".' },
        { name: 'divider', type: 'string', optional: true, descriptionFallback: 'Separator string between file names in the inline text display.' },
        { name: 'iconColor', type: 'string', optional: true, descriptionFallback: 'Override the color of the file type icon.' },
        { name: 'maxFileSize', type: 'number', optional: true, descriptionFallback: 'Maximum allowed file size in bytes. Triggers error:max-size when exceeded.' },
        { name: 'dragndrop', type: 'boolean', optional: true, descriptionFallback: 'Legacy alias for dropzone — enable drag-and-drop mode.' },
        { name: 'dragndropIcon', type: 'string', optional: true, descriptionFallback: 'Icon shown in the dropzone area.' },
        { name: 'fileIcon', type: 'string', optional: true, descriptionFallback: 'Default icon for file items.' },
        { name: 'removeIcon', type: 'string', optional: true, descriptionFallback: 'Icon for the remove action on file items.' },
        { name: 'downloadIcon', type: 'string', optional: true, descriptionFallback: 'Icon for the download action on file items.' },
        { name: 'downloadable', type: 'boolean', optional: true, descriptionFallback: 'Show a download button on each file item.' },
        { name: 'progress', type: 'Array<number>', optional: true, descriptionFallback: 'Per-file upload progress values (0–100) indexed by file position.' },
        { name: 'dropzoneTitle', type: 'string', optional: true, descriptionFallback: 'Title text displayed inside the dropzone.' },
        { name: 'dropzoneSubtitle', type: 'string', optional: true, descriptionFallback: 'Subtitle text displayed inside the dropzone.' },
        { name: 'browseText', type: 'string', optional: true, descriptionFallback: 'Label for the browse/click-to-select action inside the dropzone.' },
        { name: 'maxFileSizeErrorString', type: 'string', optional: true, descriptionFallback: 'Custom error message template for the max-size violation.' },
        { name: 'display', type: 'TFileFieldDisplay', optional: true, descriptionFallback: 'How to render multi-file selections: list (default), chips, or counter.' },
        { name: 'dropzone', type: 'boolean', optional: true, descriptionFallback: 'Render as a large outlined drag-and-drop zone instead of an inline input.' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_props.example',
            titleFallback: 'Multi-file dropzone with progress and size display',
            code: `<OrigamFileField
    v-model="files"
    dropzone
    multiple
    :show-size="1024"
    :progress="uploadProgress"
    :max-file-size="10_000_000"
/>`,
            lang: 'vue',
        },
    ],
}
