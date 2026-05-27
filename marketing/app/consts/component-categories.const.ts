import type { ICategoryEntry } from '~/interfaces/component.interface'

export const COMPONENT_CATEGORIES = [
    { key: 'layout',     label: 'Layout' },
    { key: 'navigation', label: 'Navigation' },
    { key: 'forms',      label: 'Forms' },
    { key: 'data',       label: 'Data' },
    { key: 'feedback',   label: 'Feedback' },
    { key: 'overlay',    label: 'Overlay' },
    { key: 'media',      label: 'Media' },
    { key: 'utilities',  label: 'Utilities' }
] as const satisfies ReadonlyArray<ICategoryEntry>
