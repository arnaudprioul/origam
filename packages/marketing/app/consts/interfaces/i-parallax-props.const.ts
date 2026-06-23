import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-props',
    name: 'IParallaxProps',
    category: 'Motion & Parallax',
    descriptionKey: 'interfaces.catalog.i_parallax_props.description',
    descriptionFallback: 'Full props contract for <OrigamParallax>. Extends common component, color, spacing, border, dimension and audio contracts, plus parallax-specific controls for easing, speed, direction, event type and threshold.',
    definition: `export interface IParallaxProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IDimensionProps, IAudioProps {
    animationDuration?: number
    easing?: TParallaxEasing | string
    perspective?: number
    event?: TParallaxEvent
    active?: boolean
    duration?: number
    direction?: TParallaxDirection
    speed?: number
    disabled?: boolean
    threshold?: number
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IColorProps',
        'IBgColorProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IDimensionProps',
        'IAudioProps',
    ],
    props: [
        { name: 'animationDuration', type: 'number', optional: true, descriptionFallback: 'Deprecated — use `duration` instead. Kept as a silent alias for backwards compat; a one-shot console warning is emitted when used.' },
        { name: 'easing', type: 'TParallaxEasing | string', optional: true, descriptionFallback: 'Easing curve. Accepts a TParallaxEasing keyword (linear | ease-out | spring) or any raw CSS timing-function string.' },
        { name: 'perspective', type: 'number', optional: true, descriptionFallback: 'CSS perspective depth (px) applied to the parallax container for 3D transform effects.' },
        { name: 'event', type: 'TParallaxEvent', optional: true, descriptionFallback: 'Event type that drives the parallax — scroll, move (mouse), or similar. Controls which input is read.' },
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: 'Freezes the mouse-driven mode when false. Distinct from `disabled` which stops all effects.' },
        { name: 'duration', type: 'number', optional: true, descriptionFallback: 'Transition duration (ms) for the parallax interpolation. Replaces the deprecated `animationDuration`.' },
        { name: 'direction', type: 'TParallaxDirection', optional: true, descriptionFallback: 'Direction of the parallax effect — "vertical" (translateY), "horizontal" (translateX), or "both" (2D on mouse move).' },
        { name: 'speed', type: 'number', optional: true, descriptionFallback: 'Global speed multiplier in single-layer mode. Default 0.5. Equivalent to wrapping slot in a single layer with this speed.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Forces the parallax effect OFF (translate stays at 0). Useful for SSR, snapshot tests or prefers-reduced-motion integrations.' },
        { name: 'threshold', type: 'number', optional: true, descriptionFallback: 'Proportion (0→1) of host visible in viewport before the effect activates. 0 = starts immediately at viewport edge, 0.3 = waits until 30% visible.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_parallax_props.example',
            titleFallback: 'Using IParallaxProps for a multi-layer parallax',
            code: `import type { IParallaxProps } from 'origam'

const parallaxConfig: Partial<IParallaxProps> = {
    direction: 'vertical',
    speed: 0.4,
    easing: 'ease-out',
    threshold: 0.1,
    disabled: false,
}`,
            lang: 'typescript',
        },
    ],
}
