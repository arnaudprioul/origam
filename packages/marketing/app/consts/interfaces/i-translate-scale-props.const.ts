import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TRANSLATE_SCALE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-translate-scale-props',
    name: 'ITranslateScaleProps',
    category: 'Animation & Transition',
    descriptionKey: 'interfaces.catalog.i_translate_scale_props.description',
    descriptionFallback: 'Extends ITransitionProps with a target reference used by the translate-scale transition. The target anchors the transform-origin so the element scales from the activator position rather than its own center.',
    definition: `export interface ITranslateScaleProps extends ITransitionProps {
    target?: HTMLElement | [x: number, y: number]
}`,
    extends: ['ITransitionProps'],
    props: [
        { name: 'target', type: 'HTMLElement | [x: number, y: number]', optional: true, descriptionFallback: 'DOM element or pixel coordinates that anchor the translate+scale transform origin. When provided the element animates from/to that point.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Transition/transition.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_translate_scale_props.example',
            titleFallback: 'Scale from a known pixel point',
            code: `import type { ITranslateScaleProps } from 'origam'

const transition: ITranslateScaleProps = {
    name: 'origam-translate-scale',
    target: [120, 56],
}`,
            lang: 'typescript',
        },
    ],
}
