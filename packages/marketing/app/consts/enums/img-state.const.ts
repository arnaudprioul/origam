import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const IMG_STATE_ENUM_DOC: IEnumDoc = {
    slug: 'img-state',
    name: 'IMG_STATE',
    category: 'Media',
    descriptionKey: 'enums.catalog.img_state.description',
    descriptionFallback: 'Lifecycle states for the OrigamImg component (idle, loading, loaded, error).',
    definition: `export enum IMG_STATE {
    IDLE    = 'idle',
    LOADING = 'loading',
    LOADED  = 'loaded',
    ERROR   = 'error',
}`,
    values: [
        { value: 'IMG_STATE.IDLE', descriptionKey: 'enums.detail.img_state.idle', descriptionFallback: 'Image has not yet started loading.' },
        { value: 'IMG_STATE.LOADING', descriptionKey: 'enums.detail.img_state.loading', descriptionFallback: 'Image is currently being fetched.' },
        { value: 'IMG_STATE.LOADED', descriptionKey: 'enums.detail.img_state.loaded', descriptionFallback: 'Image loaded successfully.' },
        { value: 'IMG_STATE.ERROR', descriptionKey: 'enums.detail.img_state.error', descriptionFallback: 'Image failed to load.' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', propName: 'state (internal)' },
    ],
    sourceFile: 'packages/ds/src/enums/Img/img.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.img_state.example',
            titleFallback: 'Using IMG_STATE in script setup',
            code: `import { IMG_STATE } from 'origam'

const state: IMG_STATE = IMG_STATE.LOADING`,
            lang: 'typescript',
        },
    ],
}
