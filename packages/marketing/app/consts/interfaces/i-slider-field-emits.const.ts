import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SLIDER_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-slider-field-emits',
    name: 'ISliderFieldEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_slider_field_emits.description',
    descriptionFallback: 'Emits contract for <OrigamSliderField> — v-model value updates, focus/blur lifecycle, and drag start/end events.',
    definition: `export interface ISliderFieldEmits extends ICommonsComponentEmits, IFocusEmits {
    (e: 'start', value: number | string | Array<number> | Array<string>): void
    (e: 'end', value: number | string | Array<number> | Array<string>): void
}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits'],
    props: [
        { name: 'start', type: '(e: "start", value: number | string | Array<number> | Array<string>) => void', optional: false, descriptionFallback: 'Fired on pointerdown of a thumb — signals the start of a drag gesture.' },
        { name: 'end', type: '(e: "end", value: number | string | Array<number> | Array<string>) => void', optional: false, descriptionFallback: 'Fired on pointerup — signals the end of a drag gesture.' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SliderField/slider-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_slider_field_emits.example',
            titleFallback: 'Listening to drag start and end',
            code: `<OrigamSliderField
    v-model="volume"
    @start="onDragStart"
    @end="onDragEnd"
    @focus="onFocus"
/>`,
            lang: 'vue',
        },
    ],
}
