import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SCROLL_TO_UTIL_DOC: IUtilDoc = {
    slug: 'scroll-to',
    name: 'scrollTo',
    category: 'Commons',
    icon: 'mdi-function',
    descriptionKey: '',
    descriptionFallback: 'Scroll to.',
    signature: `function scrollTo(_target: ComponentPublicInstance | HTMLElement | number | string, _options: Partial<IGoToOptions>, horizontal?: boolean, goTo?: IGoToInstance): Promise<unknown>`,
    params: [
        { name: '_target', type: 'ComponentPublicInstance | HTMLElement | number | string', required: true, descriptionKey: '', descriptionFallback: '' },
        { name: '_options', type: 'Partial<IGoToOptions>', required: true, descriptionKey: '', descriptionFallback: '' },
        { name: 'horizontal', type: 'boolean', required: false, descriptionKey: '', descriptionFallback: '' },
        { name: 'goTo', type: 'IGoToInstance', required: false, descriptionKey: '', descriptionFallback: '' },
    ],
    returns: { type: 'Promise<unknown>', descriptionKey: '', descriptionFallback: '' },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [],
    related: [],
}
