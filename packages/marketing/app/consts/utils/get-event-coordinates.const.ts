import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_EVENT_COORDINATES_UTIL_DOC: IUtilDoc = {
    slug: 'get-event-coordinates',
    name: 'getEventCoordinates',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_event_coordinates.description',
    descriptionFallback: 'Extracts {clientX, clientY} from a MouseEvent or TouchEvent in a unified way. For touch events, the coordinates of the first touch point are returned.',
    signature: `function getEventCoordinates(e: MouseEvent | TouchEvent): { clientX: number; clientY: number }`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent | TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.get_event_coordinates.param_e',
            descriptionFallback: 'The pointer event. Touch events use e.touches[0]; mouse events use e.clientX / e.clientY directly.',
        },
    ],
    returns: {
        type: '{ clientX: number; clientY: number }',
        descriptionKey: 'utils.detail.get_event_coordinates.returns',
        descriptionFallback: 'Object with clientX and clientY in viewport pixels, normalised across mouse and touch input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_event_coordinates.example_basic',
            titleFallback: 'Normalise pointer position',
            code: `import { getEventCoordinates } from 'origam'

element.addEventListener('pointerdown', (e) => {
  const { clientX, clientY } = getEventCoordinates(e as MouseEvent)
  console.log(clientX, clientY)
})`,
            lang: 'typescript',
        },
    ],
    related: ['get-center'],
}
