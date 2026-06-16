/**
 * /components/card — full documentation data for OrigamCard.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Card/card.interface.ts   (props + emits)
 *   - packages/ds/src/components/Card/OrigamCard.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/card.json              (CSS tokens)
 *
 * Family: OrigamCard + OrigamCardHeader + OrigamCardText
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CARD_DOC: IComponentDoc = {
    slug: 'card',
    name: 'Card',
    tag: 'origam-card',
    icon: 'mdi-card-outline',
    category: 'Surface',
    descriptionKey: 'components.catalog.card.description',
    descriptionFallback: 'Versatile surface container with title, subtitle, image asset, text body, footer slots, link support, loading states and ripple interaction.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-card--design',
    docUrl: 'http://localhost:4000/components/Card/OrigamCard',

    family: [
        {
            slug: 'card-header',
            name: 'CardHeader',
            descriptionKey: 'components.catalog.card_header.description',
            descriptionFallback: 'Card header section rendering title, subtitle and optional prepend/append icon or avatar.'
        },
        {
            slug: 'card-text',
            name: 'CardText',
            descriptionKey: 'components.catalog.card_text.description',
            descriptionFallback: 'Card body text section with density-aware padding.'
        }
    ],

    related: [
        { slug: 'dialog', name: 'Dialog', kind: 'component', descriptionFallback: 'Elevated card-like surface presented in an overlay.', descriptionKey: 'components.catalog.dialog.description' },
        { slug: 'sheet', name: 'Sheet', kind: 'component', descriptionFallback: 'Simpler flat surface without interactive affordances.', descriptionKey: 'components.catalog.sheet.description' }
    ],

    props: [
        {
            name: 'title',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.title.description',
            descriptionFallback: 'Card title rendered in OrigamCardHeader. Can be overridden via the #header.title slot.'
        },
        {
            name: 'subtitle',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.subtitle.description',
            descriptionFallback: 'Card subtitle rendered below the title in OrigamCardHeader.'
        },
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.text.description',
            descriptionFallback: 'Card body text rendered in OrigamCardText. Can be overridden via the #text slot.'
        },
        {
            name: 'image',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.image.description',
            descriptionFallback: 'Image URL rendered inside the card asset slot as <origam-img cover>. Can be overridden via the #asset slot.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card.props.disabled.description',
            descriptionFallback: 'Disables interaction. Sets tabindex="-1" and applies opacity-disabled styling.'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card.props.flat.description',
            descriptionFallback: 'Removes the default box-shadow, rendering a flat surface without elevation.'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card.props.hover.description',
            descriptionFallback: 'Force the hover visual state (elevated shadow + overlay tint). Used for programmatic preview.'
        },
        {
            name: 'link',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card.props.link.description',
            descriptionFallback: 'Makes the card fully clickable (ripple + overlay + cursor pointer). Automatically true when href or to is set.'
        },
        {
            name: 'type',
            type: { label: 'TCardType', slug: 'card-type', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.type.description',
            descriptionFallback: 'Semantic card type hint (e.g. "article", "product", "profile"). Consumed by OrigamCardHeader for specific layout adjustments.'
        },
        {
            name: 'ripple',
            type: { label: 'boolean | { class: string }', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.card.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple effect on click when the card is interactive.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed in the header prepend area.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.append_icon.description',
            descriptionFallback: 'Icon displayed in the header append area.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.prepend_avatar.description',
            descriptionFallback: 'Avatar image URL displayed in the header prepend area.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.append_avatar.description',
            descriptionFallback: 'Avatar image URL displayed in the header append area.'
        },
        {
            name: 'href',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.href.description',
            descriptionFallback: 'Renders the card as an anchor pointing to this URL.'
        },
        {
            name: 'to',
            type: { label: 'string | RouteLocationRaw', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card.props.to.description',
            descriptionFallback: 'Vue Router destination. Automatically sets tag="a" and uses router-link.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.card.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Becomes <a> automatically when href or to is set.'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.color.description', descriptionFallback: 'Intent or custom foreground color.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.bg_color.description', descriptionFallback: 'Background color override.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.elevation.description', descriptionFallback: 'Box-shadow elevation token. Default is sm shadow.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.card.props.border.description', descriptionFallback: 'Applies a border to the card surface.' },
        { name: 'density', type: { label: 'TDensity', slug: 'density', kind: 'type' }, defaultValue: "'default'", descriptionKey: 'components.card.props.density.description', descriptionFallback: 'Density modifier propagated to CardHeader and CardText.' },
        { name: 'width', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.width.description', descriptionFallback: 'Card width override.' },
        { name: 'height', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.card.props.height.description', descriptionFallback: 'Card height override.' },
        { name: 'loading', type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' }, defaultValue: 'false', descriptionKey: 'components.card.props.loading.description', descriptionFallback: 'Shows a skeleton or progress loader overlaid on the card content. Accepts boolean, "skeleton", "line" or "circular".' },
        { name: 'active', type: { label: 'boolean', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.card.props.active.description', descriptionFallback: 'Forces the active/pressed visual state (drives activeColor / activeBgColor resolution).' }
    ],

    emits: [
        { event: 'click:prepend', payload: { label: 'MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.card.emits.click_prepend.description', descriptionFallback: 'Fired when the user clicks the header prepend area.' },
        { event: 'click:append', payload: { label: 'MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.card.emits.click_append.description', descriptionFallback: 'Fired when the user clicks the header append area.' },
        { event: 'update:active', payload: { label: 'boolean', slug: '', kind: 'primitive' }, descriptionKey: 'components.card.emits.update_active.description', descriptionFallback: 'Two-way binding for the active (pressed) state.' },
        { event: 'mouseenter', payload: { label: 'MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.card.emits.mouseenter.description', descriptionFallback: 'Propagated mouseenter — triggers hover state for hoverColor / hoverBgColor.' },
        { event: 'mouseleave', payload: { label: 'MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.card.emits.mouseleave.description', descriptionFallback: 'Propagated mouseleave — clears hover state.' }
    ],

    slots: [
        { slot: 'default', slotProps: '—', descriptionKey: 'components.card.slots.default.description', descriptionFallback: 'Main card content placed inside the __content div, after any header, asset and text sections.' },
        { slot: 'wrapper', slotProps: '—', descriptionKey: 'components.card.slots.wrapper.description', descriptionFallback: 'Full override of the card inner layout (header + asset + content + footer). Advanced use only.' },
        { slot: 'header', slotProps: '—', descriptionKey: 'components.card.slots.header.description', descriptionFallback: 'Override the default OrigamCardHeader. Rendered only when title, subtitle or prepend/append props are set.' },
        { slot: 'header.title', slotProps: '—', descriptionKey: 'components.card.slots.header_title.description', descriptionFallback: 'Override the title inside the default CardHeader.' },
        { slot: 'header.subtitle', slotProps: '—', descriptionKey: 'components.card.slots.header_subtitle.description', descriptionFallback: 'Override the subtitle inside the default CardHeader.' },
        { slot: 'header.prepend', slotProps: '—', descriptionKey: 'components.card.slots.header_prepend.description', descriptionFallback: 'Override the prepend area inside the default CardHeader.' },
        { slot: 'header.append', slotProps: '—', descriptionKey: 'components.card.slots.header_append.description', descriptionFallback: 'Override the append area inside the default CardHeader.' },
        { slot: 'header.content', slotProps: '—', descriptionKey: 'components.card.slots.header_content.description', descriptionFallback: 'Override the full content area inside the default CardHeader.' },
        { slot: 'asset', slotProps: '—', descriptionKey: 'components.card.slots.asset.description', descriptionFallback: 'Override the image asset area. Defaults to <origam-img cover>.' },
        { slot: 'text', slotProps: '—', descriptionKey: 'components.card.slots.text.description', descriptionFallback: 'Override the default OrigamCardText section.' },
        { slot: 'footer', slotProps: '—', descriptionKey: 'components.card.slots.footer.description', descriptionFallback: 'Card footer area (typically action buttons).' },
        { slot: 'loader', slotProps: '—', descriptionKey: 'components.card.slots.loader.description', descriptionFallback: 'Override the loading state renderer (skeleton / progress bar / spinner).' }
    ],

    examples: [
        {
            titleKey: 'components.card.examples.basic.title',
            titleFallback: 'Basic card',
            lang: 'vue',
            code: `<template>
  <origam-card
    title="Card Title"
    subtitle="Card subtitle text"
    text="This is the card body content. It can contain multiple lines of text."
    image="/images/card-cover.jpg"
    rounded="md"
  >
    <template #footer>
      <div style="display: flex; gap: 0.5rem; padding: 1rem;">
        <origam-btn color="primary" text="Action" />
        <origam-btn variant="text" text="Cancel" />
      </div>
    </template>
  </origam-card>
</template>`
        },
        {
            titleKey: 'components.card.examples.clickable.title',
            titleFallback: 'Clickable card with link',
            lang: 'vue',
            code: `<template>
  <origam-card
    title="Click me"
    text="This card navigates on click."
    to="/components/card"
    color="primary"
    :hover="true"
    rounded="lg"
  />
</template>`
        },
        {
            titleKey: 'components.card.examples.loading.title',
            titleFallback: 'Loading states',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <origam-card title="Skeleton" loading="skeleton" width="250" />
    <origam-card title="Progress" loading="line" color="primary" width="250">
      <p>Content while loading…</p>
    </origam-card>
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { title: 'Card Title', subtitle: 'Subtitle', text: 'Body content.' }, slotContent: undefined },
        { label: 'elevated', props: { title: 'Elevated', elevation: 'md', rounded: 'md' } },
        { label: 'clickable', props: { title: 'Clickable', link: true, color: 'primary', rounded: 'md' } },
        { label: 'flat', props: { title: 'Flat', flat: true, border: true } },
        { label: 'with image', props: { title: 'With Image', image: 'https://picsum.photos/400/200', rounded: 'lg' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-card',
        svgViewBox: '0 0 700 320',
        svgTitle: 'Anatomy of OrigamCard',
        svgDesc: 'Schematic of the Card component with 8 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="320" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="50" y="20" width="600" height="280" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="50" y="20" width="600" height="5" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.3"/>
  <rect x="50" y="20" width="600" height="5" rx="4" fill="var(--origam-color__surface---raised, #fff)" opacity="0"/>
  <rect x="50" y="20" width="600" height="80" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="350" y="68" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-card-header: prepend / title / subtitle / append</text>
  <rect x="50" y="105" width="600" height="80" rx="0" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="150" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__asset (image / #asset slot)</text>
  <rect x="50" y="190" width="600" height="80" rx="0" fill="var(--origam-color__surface---raised, #fff)"/>
  <text x="350" y="235" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__content: origam-card-text + #default slot</text>
  <rect x="50" y="275" width="600" height="25" rx="0" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.15))" stroke-width="1"/>
  <text x="350" y="293" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__footer (#footer slot)</text>
  <rect x="50" y="20" width="600" height="280" rx="8" fill="var(--origam-color__overlay---scrim, rgba(0,0,0,0.04))" stroke="none" opacity="0" class="origam-card__overlay"/>
  <circle cx="52" cy="22" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="52" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="64" cy="22" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="64" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="52" cy="107" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="52" y="111" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="52" cy="192" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="52" y="196" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="52" cy="277" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="52" y="281" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-card&gt;</code> — 5 visible parts: root ①, header ②, asset ③, content ④, footer ⑤. Two absolute layers (overlay for hover scrim and underlay) sit above the root.',
        legend: [
            { num: 1, cls: '.origam-card', descriptionKey: 'components.card.anatomy.root', descriptionFallback: 'Root element. Defaults to <div>; becomes <a> when href/to is set. Carries color, shadow, rounded and density classes.' },
            { num: 2, cls: '.origam-card__overlay', descriptionKey: 'components.card.anatomy.overlay', descriptionFallback: 'Absolute scrim. opacity: 0 → overlay-opacity-hover on hover when the card is clickable. Driven by --origam-card__overlay---opacity.' },
            { num: 3, cls: '.origam-card__header', descriptionKey: 'components.card.anatomy.header', descriptionFallback: 'OrigamCardHeader. Rendered only when title, subtitle or prepend/append slots are populated.' },
            { num: 4, cls: '.origam-card__asset', descriptionKey: 'components.card.anatomy.asset', descriptionFallback: 'Image container rendered when the image prop or #asset slot is present. Contains <origam-img cover> by default.' },
            { num: 5, cls: '.origam-card__content', descriptionKey: 'components.card.anatomy.content', descriptionFallback: 'Main content wrapper. Contains OrigamCardText (if text prop is set) and the #default slot.' },
            { num: 6, cls: '.origam-card__text', descriptionKey: 'components.card.anatomy.text', descriptionFallback: 'OrigamCardText — density-aware padding wrapper around the text prop value.' },
            { num: 7, cls: '.origam-card__footer', descriptionKey: 'components.card.anatomy.footer', descriptionFallback: '<div> rendered only when the #footer slot is populated. Typically contains action buttons.' },
            { num: 8, cls: '.origam-card__loader', descriptionKey: 'components.card.anatomy.loader', descriptionFallback: 'Loading overlay rendered when loading prop is set. Contains skeleton, progress-linear or progress-circular.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="link.tag" class="origam-card">
  <!-- Hover/active scrim (v-if="isClickable") -->
  <span class="origam-card__overlay" />
  <span class="origam-card__underlay" />

  <slot name="wrapper">
    <!-- Loader overlay (v-if="hasLoading") -->
    <div class="origam-card__loader">
      <origam-skeleton v-if="loaderConfig.kind === 'skeleton'" variant="card" />
      <origam-progress v-else :active="true" />
    </div>

    <!-- Header (v-if="hasHeader") -->
    <origam-card-header class="origam-card__header"
      :title="title" :subtitle="subtitle"
      :prepend-icon="prependIcon" :append-icon="appendIcon"
    />

    <!-- Asset / Image (v-if="hasAsset") -->
    <div class="origam-card__asset">
      <slot name="asset">
        <origam-img :src="image" class="origam-card__image" cover />
      </slot>
    </div>

    <!-- Content area -->
    <div class="origam-card__content">
      <origam-card-text class="origam-card__text" :text="text" />
      <slot name="default" />
    </div>

    <!-- Footer (v-if="hasFooter") -->
    <div class="origam-card__footer">
      <slot name="footer" />
    </div>
  </slot>
</component>`,
        rootClass: 'origam-card',
        classes: [
            { cls: 'origam-card', descriptionKey: 'components.card.anatomy.root_class', descriptionFallback: 'Root surface element.' },
            { cls: 'origam-card__overlay', descriptionKey: 'components.card.anatomy.overlay_class', descriptionFallback: 'Absolute interaction scrim (hover tint).' },
            { cls: 'origam-card__underlay', descriptionKey: 'components.card.anatomy.underlay_class', descriptionFallback: 'Absolute underlay reserved for future compositing.' },
            { cls: 'origam-card__loader', descriptionKey: 'components.card.anatomy.loader_class', descriptionFallback: 'Loading state container.' },
            { cls: 'origam-card__header', descriptionKey: 'components.card.anatomy.header_class', descriptionFallback: 'Header section (OrigamCardHeader).' },
            { cls: 'origam-card__asset', descriptionKey: 'components.card.anatomy.asset_class', descriptionFallback: 'Image asset wrapper.' },
            { cls: 'origam-card__image', descriptionKey: 'components.card.anatomy.image_class', descriptionFallback: '<origam-img> inside the asset area.' },
            { cls: 'origam-card__content', descriptionKey: 'components.card.anatomy.content_class', descriptionFallback: 'Main content wrapper.' },
            { cls: 'origam-card__text', descriptionKey: 'components.card.anatomy.text_class', descriptionFallback: 'OrigamCardText body.' },
            { cls: 'origam-card__footer', descriptionKey: 'components.card.anatomy.footer_class', descriptionFallback: 'Footer area for action buttons.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-card---background', defaultValue: '{color.surface.raised}', descriptionKey: 'components.card.css_vars.background', descriptionFallback: 'Card surface background.' },
        { name: '--origam-card---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.card.css_vars.color', descriptionFallback: 'Default text color.' },
        { name: '--origam-card---box-shadow', defaultValue: '{shadow.sm}', descriptionKey: 'components.card.css_vars.box_shadow', descriptionFallback: 'Default box-shadow. Overridden to shadow.lg on hover when link=true.' },
        { name: '--origam-card---box-shadow-hover', defaultValue: '{shadow.lg}', descriptionKey: 'components.card.css_vars.box_shadow_hover', descriptionFallback: 'Box-shadow on hover for interactive cards.' },
        { name: '--origam-card---transition-duration', defaultValue: '{motion.duration.slow}', descriptionKey: 'components.card.css_vars.transition_duration', descriptionFallback: 'Transition duration for shadow, opacity and background.' },
        { name: '--origam-card---opacity', defaultValue: '{opacity.100}', descriptionKey: 'components.card.css_vars.opacity', descriptionFallback: 'Card opacity. Set to opacity-disabled (0.6) when disabled.' },
        { name: '--origam-card__overlay---opacity', defaultValue: '0', descriptionKey: 'components.card.css_vars.overlay_opacity', descriptionFallback: 'Overlay scrim opacity. Animates to overlay-opacity-hover (0.12) on hover.' },
        { name: '--origam-card---border-radius-rounded', defaultValue: '{radius.md}', descriptionKey: 'components.card.css_vars.border_radius_rounded', descriptionFallback: 'Border-radius applied when rounded=true.' },
        { name: '--origam-card---density', defaultValue: '0px', descriptionKey: 'components.card.css_vars.density', descriptionFallback: 'Density offset applied to card padding.' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>', descriptionKey: 'components.card.exposed.filter_props', descriptionFallback: 'Utility to forward a filtered subset of props to child components.' },
        { name: 'css', type: 'Ref<string>', descriptionKey: 'components.card.exposed.css', descriptionFallback: 'Reactive CSS string generated by useStyle.' },
        { name: 'id', type: 'string', descriptionKey: 'components.card.exposed.id', descriptionFallback: 'Unique style-sheet ID for this instance.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.card.exposed.load', descriptionFallback: 'Injects the computed style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.card.exposed.unload', descriptionFallback: 'Removes the injected style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.card.exposed.is_loaded', descriptionFallback: 'True once the style sheet has been injected.' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['article', 'link', 'button'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.card.a11y.key_tab', actionFallback: 'Moves focus to the card when it is interactive (link=true or href/to is set).' },
            { key: 'Enter / Space', actionKey: 'components.card.a11y.key_activate', actionFallback: 'Activates the card link or click handler when focused.' }
        ],
        notes: [
            { noteKey: 'components.card.a11y.disabled_tabindex', noteFallback: 'When disabled=true, tabindex="-1" is set to remove the card from the tab order.' },
            { noteKey: 'components.card.a11y.link_semantics', noteFallback: 'When href or to is set, the card root renders as <a> with proper link semantics. The ripple v-ripple directive triggers on the native click event.' },
            { noteKey: 'components.card.a11y.focus_visible', noteFallback: 'Focus-visible outline is applied via :focus-visible in the component SCSS — visible for keyboard navigation, not mouse clicks.' },
            { noteKey: 'components.card.a11y.overlay_hidden', noteFallback: 'The __overlay and __underlay spans are aria-hidden (inert layers).' },
            { noteKey: 'components.card.a11y.v_contrast', noteFallback: 'The v-contrast directive is applied to ensure accessible foreground/background contrast when color is set.' },
            { noteKey: 'components.card.a11y.loader', noteFallback: 'The OrigamProgress inside the loader slot has role="progressbar". OrigamSkeleton is aria-hidden (decorative).' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/card.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'card.background', value: '{color.surface.raised}', type: 'color', descriptionKey: 'components.card.tokens.background', descriptionFallback: 'Card background.' },
            { tokenPath: 'card.box-shadow', value: '{shadow.sm}', type: 'shadow', descriptionKey: 'components.card.tokens.box_shadow', descriptionFallback: 'Default elevation shadow.' },
            { tokenPath: 'card.box-shadow-hover', value: '{shadow.lg}', type: 'shadow', descriptionKey: 'components.card.tokens.box_shadow_hover', descriptionFallback: 'Hover elevation shadow for interactive cards.' },
            { tokenPath: 'card.transition-duration', value: '{motion.duration.slow}', type: 'duration', descriptionKey: 'components.card.tokens.transition_duration', descriptionFallback: 'Transition duration for shadow and opacity.' },
            { tokenPath: 'card.overlay.opacity', value: '0', type: 'number', descriptionKey: 'components.card.tokens.overlay_opacity', descriptionFallback: 'Resting overlay opacity (0 = invisible).' },
            { tokenPath: 'card.overlay-opacity-hover', value: '{opacity.12}', type: 'number', descriptionKey: 'components.card.tokens.overlay_opacity_hover', descriptionFallback: 'Overlay opacity on hover (12%).' },
            { tokenPath: 'card.opacity-disabled', value: '{opacity.60}', type: 'number', descriptionKey: 'components.card.tokens.opacity_disabled', descriptionFallback: 'Card opacity when disabled.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'title', kind: 'text', labelKey: 'components.card.playground.title', labelFallback: 'Title', defaultValue: 'Card Title' },
            { prop: 'subtitle', kind: 'text', labelKey: 'components.card.playground.subtitle', labelFallback: 'Subtitle', defaultValue: 'Card subtitle' },
            { prop: 'text', kind: 'text', labelKey: 'components.card.playground.text', labelFallback: 'Body text', defaultValue: 'Card body content.' },
            { prop: 'color', kind: 'select', labelKey: 'components.card.playground.color', labelFallback: 'Color', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'primary', value: 'primary' }, { label: 'secondary', value: 'secondary' }, { label: 'success', value: 'success' }] },
            { prop: 'rounded', kind: 'select', labelKey: 'components.card.playground.rounded', labelFallback: 'Rounded', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'sm', value: 'sm' }, { label: 'md', value: 'md' }, { label: 'lg', value: 'lg' }, { label: 'xl', value: 'xl' }] },
            { prop: 'flat', kind: 'switch', labelKey: 'components.card.playground.flat', labelFallback: 'Flat', defaultValue: false },
            { prop: 'disabled', kind: 'switch', labelKey: 'components.card.playground.disabled', labelFallback: 'Disabled', defaultValue: false },
            { prop: 'loading', kind: 'select', labelKey: 'components.card.playground.loading', labelFallback: 'Loading', defaultValue: false, options: [{ label: 'none', value: false }, { label: 'skeleton', value: 'skeleton' }, { label: 'line', value: 'line' }, { label: 'circular', value: 'circular' }] }
        ]
    } satisfies IComponentPlayground
}
