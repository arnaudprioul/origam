import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ROUTE_LOCATION_RAW_TYPE_DOC: ITypeDoc = {
    slug: 'route-location-raw',
    name: 'RouteLocationRaw',
    kind: 'type',
    category: 'Navigation & Routing',
    descriptionKey: 'types.catalog.route_location_raw.description',
    descriptionFallback: 'Vue Router route destination — string path, location object or named route descriptor.',
    definition: `// From vue-router
export type RouteLocationRaw =
    | string
    | RouteLocationPathRaw
    | RouteLocationNameRaw`,
    values: [],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'to' },
        { slug: 'breadcrumb-item', name: 'BreadcrumbItem', propName: 'to' },
        { slug: 'tab', name: 'Tab', propName: 'to' },
        { slug: 'menu', name: 'Menu', propName: 'to' },
    ],
    sourceFile: 'node_modules/vue-router/dist/vue-router.d.ts',
    examples: [
        {
            titleKey: 'types.detail.route_location_raw.example_string',
            titleFallback: 'String path',
            code: `<origam-btn to="/dashboard">Go to dashboard</origam-btn>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.route_location_raw.example_object',
            titleFallback: 'Location object with params',
            code: `<origam-btn :to="{ name: 'user', params: { id: 42 } }">
  View user
</origam-btn>`,
            lang: 'html',
        },
    ],
}
