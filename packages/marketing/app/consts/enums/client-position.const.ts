import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CLIENT_POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'client-position',
    name: 'CLIENT_POSITION',
    category: 'Commons',
    descriptionKey: 'enums.catalog.client_position.description',
    descriptionFallback: 'Axis selector for pointer / touch event client coordinates (clientX or clientY).',
    definition: `export enum CLIENT_POSITION {
    Y = 'clientY',
    X = 'clientX',
}`,
    values: [
        {
            value: 'CLIENT_POSITION.Y',
            descriptionKey: 'enums.detail.client_position.y',
            descriptionFallback: 'Vertical axis — maps to the clientY property of a pointer event.',
        },
        {
            value: 'CLIENT_POSITION.X',
            descriptionKey: 'enums.detail.client_position.x',
            descriptionFallback: 'Horizontal axis — maps to the clientX property of a pointer event.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Commons/commons.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.client_position.example',
            titleFallback: 'Using CLIENT_POSITION to read the correct axis',
            code: `import { CLIENT_POSITION } from 'origam'

const axis: CLIENT_POSITION = CLIENT_POSITION.X
const value = event[axis] // event.clientX`,
            lang: 'typescript',
        },
    ],
}
