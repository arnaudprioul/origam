import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_POSITION_UTIL_DOC: IUtilDoc = {
    slug: 'get-position',
    name: 'getPosition',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_position.description',
    descriptionFallback: 'Extracts a named client coordinate (e.g. clientX, pageY) from a MouseEvent or TouchEvent in a unified way, handling both touch and pointer events transparently.',
    signature: `function getPosition(e: MouseEvent | TouchEvent, position: TClientPosition): number`,
    params: [
        {
            name: 'e',
            type: 'MouseEvent | TouchEvent',
            required: true,
            descriptionKey: 'utils.detail.get_position.param_e',
            descriptionFallback: 'The native DOM event. Touch events are read via e.touches[0] (or changedTouches[0] for touchend); mouse events are read directly.',
        },
        {
            name: 'position',
            type: 'TClientPosition',
            required: true,
            descriptionKey: 'utils.detail.get_position.param_position',
            descriptionFallback: 'The coordinate key to read, e.g. "clientX", "clientY", "pageX", "pageY", "screenX", "screenY".',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_position.returns',
        descriptionFallback: 'The numeric coordinate value in pixels from the requested position property.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_position.example_basic',
            titleFallback: 'Unified pointer coordinate from mouse or touch',
            code: `import { getPosition } from 'origam'

function onPointerDown(e: MouseEvent | TouchEvent) {
  const x = getPosition(e, 'clientX')
  const y = getPosition(e, 'clientY')
  console.log(x, y)
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset', 'get-prefixed-event-handlers'],
}
