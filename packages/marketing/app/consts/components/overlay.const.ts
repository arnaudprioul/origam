/**
 * /components/overlay — full documentation data for OrigamOverlay.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Overlay/overlay.interface.ts
 * cross-checked against packages/ds/src/components/Overlay/OrigamOverlay.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const OVERLAY_DOC: IComponentDoc = {
    slug: 'overlay',
    name: 'Overlay',
    tag: 'origam-overlay',
    icon: 'mdi-layers-outline',
    category: 'Overlay & Surface',
    descriptionKey: 'components.catalog.overlay.description',
    descriptionFallback: 'Low-level overlay with portal, scrim and position management.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-overlay--design',
    docUrl: 'http://localhost:4000/components/Overlay/OrigamOverlay',

    family: [
        {
            slug: 'overlay-scrim',
            name: 'OverlayScrim',
            descriptionKey: 'components.catalog.overlay_scrim.description',
            descriptionFallback: 'Backdrop scrim element used by Overlay-based components.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.model_value.description',
            descriptionFallback: 'Controls the visibility of the overlay (v-model).'
        },
        {
            name: 'absolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.absolute.description',
            descriptionFallback: 'Positions the overlay absolutely within its parent instead of fixed to the viewport.'
        },
        {
            name: 'attach',
            type: { label: 'boolean | string | Element', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.attach.description',
            descriptionFallback: 'Teleport target. true = parent element, string = CSS selector, Element = direct reference.'
        },
        {
            name: 'closeOnBack',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.overlay.props.close_on_back.description',
            descriptionFallback: 'Close the overlay when the browser back button is pressed.'
        },
        {
            name: 'contentClass',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.content_class.description',
            descriptionFallback: 'Additional CSS classes applied to the content wrapper element.'
        },
        {
            name: 'contentProps',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.content_props.description',
            descriptionFallback: 'Additional attributes passed directly to the content wrapper element.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.disabled.description',
            descriptionFallback: 'Prevents the overlay from opening.'
        },
        {
            name: 'noClickAnimation',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.no_click_animation.description',
            descriptionFallback: 'Disables the bounce animation when clicking outside a persistent overlay.'
        },
        {
            name: 'persistent',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.persistent.description',
            descriptionFallback: 'Prevents closing the overlay by clicking outside or pressing Escape.'
        },
        {
            name: 'zIndex',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '2000',
            descriptionKey: 'components.overlay.props.z_index.description',
            descriptionFallback: 'z-index of the overlay. Overrides the automatic stacking.'
        },
        {
            name: 'disableGlobalStack',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay.props.disable_global_stack.description',
            descriptionFallback: 'Opt out of the global overlay stack management.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.height.description',
            descriptionFallback: 'Height of the overlay content area.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.width.description',
            descriptionFallback: 'Width of the overlay content area.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.max_height.description',
            descriptionFallback: 'Maximum height of the overlay content area.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.overlay.props.max_width.description',
            descriptionFallback: 'Maximum width of the overlay content area.'
        },
        {
            name: 'transition',
            type: { label: 'string | object', slug: '', kind: 'primitive' },
            defaultValue: "'dialog-transition'",
            descriptionKey: 'components.overlay.props.transition.description',
            descriptionFallback: 'Vue transition applied when the overlay enters and leaves.'
        },
        {
            name: 'scrim',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.overlay.props.scrim.description',
            descriptionFallback: 'Whether to show the backdrop scrim. Pass a color string to tint it.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay.emits.update_model_value.description',
            descriptionFallback: 'Fired when the overlay opens or closes.'
        },
        {
            event: 'click:outside',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay.emits.click_outside.description',
            descriptionFallback: 'Fired when the user clicks outside the overlay content.'
        },
        {
            event: 'afterEnter',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay.emits.after_enter.description',
            descriptionFallback: 'Fired after the enter transition completes.'
        },
        {
            event: 'afterLeave',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay.emits.after_leave.description',
            descriptionFallback: 'Fired after the leave transition completes.'
        },
        {
            event: 'keydown',
            payload: { label: 'KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay.emits.keydown.description',
            descriptionFallback: 'Fired on keydown events (used for Escape key handling).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isActive }',
            descriptionKey: 'components.overlay.slots.default.description',
            descriptionFallback: 'Content rendered inside the overlay. Receives isActive (the open state ref).'
        },
        {
            slot: 'activator',
            slotProps: '{ isActive, props }',
            descriptionKey: 'components.overlay.slots.activator.description',
            descriptionFallback: 'Trigger element. Receives isActive and spread-ready props for the activator element.'
        }
    ],

    examples: [
        {
            titleKey: 'components.overlay.examples.basic.title',
            titleFallback: 'Basic overlay',
            lang: 'vue',
            code: `<template>
  <origam-overlay v-model="show">
    <div class="content">Overlay content</div>
  </origam-overlay>
  <origam-btn text="Open" @click="show = true" />
</template>

<script setup>
const show = ref(false)
</script>`
        },
        {
            titleKey: 'components.overlay.examples.activator.title',
            titleFallback: 'With activator slot',
            lang: 'vue',
            code: `<template>
  <origam-overlay>
    <template #activator="{ isActive, props }">
      <origam-btn v-bind="props" :text="isActive ? 'Close' : 'Open'" />
    </template>
    <template #default="{ isActive }">
      <div v-if="isActive" style="padding: 2rem; background: white;">
        Click outside to close
      </div>
    </template>
  </origam-overlay>
</template>`
        },
        {
            titleKey: 'components.overlay.examples.persistent.title',
            titleFallback: 'Persistent overlay',
            lang: 'vue',
            code: `<template>
  <origam-overlay v-model="show" persistent>
    <div style="padding: 2rem; background: white;">
      <origam-btn text="Close" @click="show = false" />
    </div>
  </origam-overlay>
</template>`
        }
    ]
}
