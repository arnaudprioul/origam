import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STYLE_TAG_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-style-tag-options',
    name: 'IStyleTagOptions',
    category: 'Utilities',
    descriptionKey: 'interfaces.catalog.i_style_tag_options.description',
    descriptionFallback: 'Options bag for the useStyleTag composable — controls media query, immediate injection, manual mode, and the DOM id of the injected <style> element.',
    definition: `export interface IStyleTagOptions extends IConfigurableDocument {
    media?: string
    immediate?: boolean
    manual?: boolean
    id?: string
}`,
    extends: ['IConfigurableDocument'],
    props: [
        { name: 'media', type: 'string', optional: true, descriptionFallback: 'Media query string for the style tag (e.g. "print", "(prefers-color-scheme: dark)").' },
        { name: 'immediate', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'When true (default), the style is injected immediately on composable setup.' },
        { name: 'manual', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'When true, injection and removal are fully manual — the composable does not load/unload automatically.' },
        { name: 'id', type: 'string', optional: true, descriptionFallback: 'DOM id attribute set on the injected <style> tag. Auto-incremented when omitted.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/style.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_style_tag_options.example',
            titleFallback: 'Injecting a scoped style tag with a media query',
            code: `import { useStyleTag } from 'origam'

useStyleTag('.my-class { color: red; }', {
    media: '(prefers-color-scheme: dark)',
    id: 'my-dark-overrides',
})`,
            lang: 'typescript',
        },
    ],
}
