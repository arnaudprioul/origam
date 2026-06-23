import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const PARALLAX_EVENT_ENUM_DOC: IEnumDoc = {
    slug: 'parallax-event',
    name: 'PARALLAX_EVENT',
    category: 'Animation & Motion',
    descriptionKey: 'enums.catalog.parallax_event.description',
    descriptionFallback: 'TypeScript enum for the browser event driving the Parallax effect — mouse move, scroll, or device orientation.',
    definition: `export enum PARALLAX_EVENT {
    MOVE        = 'move',
    SCROLL      = 'scroll',
    ORIENTATION = 'orientation'
}`,
    values: [
        { value: 'PARALLAX_EVENT.MOVE', descriptionKey: 'enums.detail.parallax_event.move', descriptionFallback: 'Effect is driven by the mousemove event — element tracks the pointer position.' },
        { value: 'PARALLAX_EVENT.SCROLL', descriptionKey: 'enums.detail.parallax_event.scroll', descriptionFallback: 'Effect is driven by the scroll event — element moves with page scroll progress.' },
        { value: 'PARALLAX_EVENT.ORIENTATION', descriptionKey: 'enums.detail.parallax_event.orientation', descriptionFallback: 'Effect is driven by the deviceorientation event — element reacts to gyroscope tilt (mobile).' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', propName: 'event' },
    ],
    sourceFile: 'packages/ds/src/enums/Parallax/parallax.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.parallax_event.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { PARALLAX_EVENT } from 'origam'

const trigger: PARALLAX_EVENT = PARALLAX_EVENT.SCROLL`,
            lang: 'typescript',
        },
    ],
}
