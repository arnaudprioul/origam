import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const LOCATION_TYPE_DOC: ITypeDoc = {
    slug: 'location',
    name: 'TLocationStrategy',
    kind: 'type',
    category: 'Navigation & Routing',
    descriptionKey: 'types.catalog.location.description',
    descriptionFallback: 'Overlay positioning strategy: static or connected.',
    definition: `export type TLocationStrategy = \`\${LOCATION_STRATEGIES}\`

// Where LOCATION_STRATEGIES is:
export enum LOCATION_STRATEGIES {
    STATIC    = 'static',
    CONNECTED = 'connected'
}`,
    values: [
        { value: 'static', descriptionKey: 'types.detail.location.static', descriptionFallback: 'Static — overlay is positioned in the normal document flow.' },
        { value: 'connected', descriptionKey: 'types.detail.location.connected', descriptionFallback: 'Connected — overlay is anchored to an activator element via computed position.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', propName: 'locationStrategy' },
        { slug: 'tooltip', name: 'Tooltip', propName: 'locationStrategy' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/location.type.ts',
    examples: [
        {
            titleKey: 'types.detail.location.example',
            titleFallback: 'Menu with connected strategy',
            code: `<origam-menu location-strategy="connected">
  <template #activator="{ props }">
    <origam-btn v-bind="props">Open</origam-btn>
  </template>
  <p>Connected menu content</p>
</origam-menu>`,
            lang: 'html',
        },
    ],
}
