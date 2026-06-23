import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_LAYOUT_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-layout-key',
    name: 'ORIGAM_LAYOUT_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_layout_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the ILayoutProvide context from OrigamLayout to child layout items (AppBar, NavigationDrawer, Footer…). Enables items to register themselves, read the current layout map, and compute their CSS offsets relative to other registered panels.',
    definition: `export const ORIGAM_LAYOUT_KEY: InjectionKey<ILayoutProvide> = Symbol.for('origam:layout')`,
    value: "Symbol.for('origam:layout')",
    usedBy: [
        { name: 'OrigamLayout', slug: 'layout' },
        { name: 'useLayout' },
        { name: 'OrigamAppBar', slug: 'app-bar' },
        { name: 'OrigamNavigationDrawer', slug: 'navigation-drawer' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/layout.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_layout_key.example',
            titleFallback: 'Building a full-height app shell with OrigamLayout',
            code: `<origam-layout>
  <origam-app-bar>My App</origam-app-bar>
  <origam-navigation-drawer :rail="false">…</origam-navigation-drawer>
  <origam-main>
    <router-view />
  </origam-main>
</origam-layout>`,
            lang: 'html',
        },
    ],
}
