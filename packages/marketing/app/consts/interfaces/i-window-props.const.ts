import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WINDOW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-window-props',
    name: 'IWindowProps',
    category: 'Layout & Structure',
    descriptionKey: 'interfaces.catalog.i_window_props.description',
    descriptionFallback: 'Props contract for <OrigamWindow> — a swipeable, keyboard-navigable carousel container. Combines visual theming, directional control, navigation arrows, touch handling and group selection.',
    definition: `export interface IWindowProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IElevationProps, IBgColorProps, IHoverProps, IActiveProps {
    continuous?: boolean
    nextIcon?: TIcon
    prevIcon?: TIcon
    reverse?: boolean
    showArrows?: string | boolean
    touch?: boolean | ITouchHandlers
    modelValue?: any
    disabled?: boolean
    selectedClass?: string
    mandatory?: boolean
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IDirectionProps', 'IBorderProps', 'IPaddingProps', 'IMarginProps', 'IRoundedProps', 'IElevationProps', 'IBgColorProps', 'IHoverProps', 'IActiveProps'],
    props: [
        { name: 'continuous', type: 'boolean', optional: true, descriptionFallback: 'When true, navigating past the last item wraps back to the first (and vice-versa).' },
        { name: 'nextIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered on the "next" navigation arrow button.' },
        { name: 'prevIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered on the "previous" navigation arrow button.' },
        { name: 'reverse', type: 'boolean', optional: true, descriptionFallback: 'Reverses the slide transition direction so next slides in from the left.' },
        { name: 'showArrows', type: 'string | boolean', optional: true, descriptionFallback: 'Controls visibility of prev/next arrow buttons. Pass true to always show, false to hide, or "hover" to show only on pointer hover.' },
        { name: 'touch', type: 'boolean | ITouchHandlers', optional: true, descriptionFallback: 'Enable touch/swipe navigation. Pass false to disable, or an ITouchHandlers object to customise swipe callbacks.' },
        { name: 'modelValue', type: 'any', optional: true, descriptionFallback: 'Index or value of the currently visible slide (v-model).' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all navigation interactions (arrows, touch, keyboard).' },
        { name: 'selectedClass', type: 'string', optional: true, descriptionFallback: 'CSS class added to the currently active WindowItem.' },
        { name: 'mandatory', type: 'boolean', optional: true, descriptionFallback: 'When true, at least one item must always be selected (prevents deselection).' },
    ],
    usedBy: [
        { slug: 'window', name: 'Window', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Window/window.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_window_props.example',
            titleFallback: 'Basic keyboard-navigable carousel',
            code: `<OrigamWindow v-model="slide" :show-arrows="true" continuous>
  <OrigamWindowItem v-for="(img, i) in images" :key="i">
    <img :src="img.src" :alt="img.alt" />
  </OrigamWindowItem>
</OrigamWindow>`,
            lang: 'html',
        },
    ],
}
