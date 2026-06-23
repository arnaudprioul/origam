import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERSECTION_OBSERVER_INIT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-intersection-observer-init',
    name: 'IIntersectionObserverInit',
    category: 'Observers & Events',
    descriptionKey: 'interfaces.catalog.i_intersection_observer_init.description',
    descriptionFallback: 'Typed options bag for configuring an IntersectionObserver — mirrors the native IntersectionObserverInit with nullable root and flexible threshold.',
    definition: `export interface IIntersectionObserverInit {
    root?: Element | Document | null
    rootMargin?: string
    threshold?: number | Array<number>
}`,
    extends: [],
    props: [
        {
            name: 'root',
            type: 'Element | Document | null',
            optional: true,
            descriptionFallback: 'The element used as the viewport for checking visibility. Defaults to the browser viewport when null or omitted.',
        },
        {
            name: 'rootMargin',
            type: 'string',
            optional: true,
            descriptionFallback: 'CSS margin around the root applied before computing intersections, e.g. "10px 0px".',
        },
        {
            name: 'threshold',
            type: 'number | Array<number>',
            optional: true,
            descriptionFallback: 'Single ratio or list of ratios at which the observer callback fires. Defaults to 0.',
        },
    ],
    usedBy: [
        { slug: 'lazy', name: 'Lazy', kind: 'component' },
        { slug: 'use-intersect', name: 'useIntersect', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_intersection_observer_init.example',
            titleFallback: 'Passing options to OrigamLazy',
            code: `<OrigamLazy :options="{ root: null, rootMargin: '0px', threshold: 0.5 }">
    <OrigamImg src="/hero.webp" />
</OrigamLazy>`,
            lang: 'html',
        },
    ],
}
