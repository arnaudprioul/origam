<template>
	<origam-toolbar
			ref="origamToolbarRef"
			:class="appBarClasses"
			:collapse="isCollapsed"
			:flat="isFlat"
			:style="appBarStyles"
			v-bind="toolbarProps"
	>
		<template
				v-if="hasAppend"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="hasPrepend"
				#prepend
		>
			<slot name="prepend"/>
			<div
					v-if="hasImage"
					class="origam-bar__img"
			>
				<slot name="img">
					<origam-img v-bind="image"/>
				</slot>
			</div>
		</template>

		<template
				v-if="hasContent"
				#content
		>
			<slot name="content"/>
		</template>

		<template
				v-if="slots.default"
				#default
		>
			<slot name="default"/>
		</template>
	</origam-toolbar>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamImg, OrigamToolbar } from '../../components'

	import { useActive, useLayoutItem, useProps, useScroll, useSsrBoot, useToggleScope } from '../../composables'

	import { BLOCK, DENSITY } from '../../enums'

	import type { IAppBarProps } from '../../interfaces'

	import type { TOrigamToolbar } from "../../types"

	import { forwardRefs, int } from "../../utils"

	import { computed, ComputedRef, ref, shallowRef, StyleValue, toRef, useSlots, watchEffect } from 'vue'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits and slot detection for the AppBar component.
	 ********************************************************/
	const props = withDefaults(defineProps<IAppBarProps>(), {
		tag: 'header',
		density: DENSITY.DEFAULT,
		scrollThreshold: 300,
		location: BLOCK.TOP,
		modelValue: true
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IAppBarProps>(props)

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {ssrBootStyles} = useSsrBoot()
	const slots = useSlots()

	const origamToolbarRef = ref<TOrigamToolbar>()

	/*********************************************************
	 * Forwarded props
	 ********************************************************/

	const toolbarProps = computed(() => {
		return origamToolbarRef.value?.filterProps(props, ['class', 'style', 'collapse', 'flat'])
	})

	const hasImage = computed(() => {
		return !!(props.image || slots.img)
	})
	const hasPrepend = computed(() => {
		return hasImage.value || slots.prepend
	})
	const hasContent = computed(() => {
		return slots.content
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	/*********************************************************
	 * Effect
	 ********************************************************/

	const {isActive, activeClasses} = useActive(props, 'modelValue')

	/*********************************************************
	 * Scroll
	 *
	 * @description
	 * Scroll-behaviour driven visibility, collapse and
	 * elevation logic for the sticky app bar.
	 ********************************************************/
	const scrollBehavior = computed(() => {
		const behavior = new Set(props.scrollBehavior?.split(' ') ?? [])

		return {
			hide: behavior.has('hide'),
			// fullyHide: behavior.has('fully-hide'),
			inverted: behavior.has('inverted'),
			collapse: behavior.has('collapse'),
			elevate: behavior.has('elevate'),
			fadeImage: behavior.has('fade-image')
			// shrink: behavior.has('shrink'),
		}
	})
	const canScroll = computed(() => {
		const behavior = scrollBehavior.value

		return (
				behavior.hide ||
				behavior.inverted ||
				behavior.collapse ||
				behavior.elevate ||
				behavior.fadeImage ||
				!isActive.value
		)
	})

	const {
		currentScroll,
		scrollThreshold,
		isScrollingUp,
		scrollRatio
	} = useScroll(props, {canScroll})
	useToggleScope(computed(() => !!props.scrollBehavior), () => {
		watchEffect(() => {
			if (scrollBehavior.value.hide) {
				if (scrollBehavior.value.inverted) {
					isActive.value = currentScroll.value > scrollThreshold.value
				} else {
					isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value)
				}
			} else {
				isActive.value = true
			}
		})
	})

	const isCollapsed = computed(() => props.collapse || (
			scrollBehavior.value.collapse &&
			(scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
	))
	const isFlat = computed(() => props.flat || (
			scrollBehavior.value.elevate &&
			(scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
	))
	const height = computed(() => {
		if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0

		return props.height ?? 0
	})

	/*********************************************************
	 * Layout
	 *
	 * @description
	 * Registers the bar as a layout item so sibling regions
	 * (main, nav drawer) offset correctly.
	 ********************************************************/
	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order as string)),
		position: toRef(props, 'location'),
		layoutSize: height,
		elementSize: shallowRef(undefined),
		active: isActive as unknown as ComputedRef,
		absolute: toRef(props, 'absolute')
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composes layout item styles and active modifier class.
	 ********************************************************/
	const appBarStyles = computed(() => {
		return [
			layoutItemStyles.value,
			ssrBootStyles.value,
			props.style
		] as StyleValue
	})
	const appBarClasses = computed(() => {
		return [
			'origam-app-bar',
			`origam-app-bar--${props.location}`,
			activeClasses.value,
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface: filterProps forwarded from toolbar ref.
	 ********************************************************/
	defineExpose(forwardRefs({
		filterProps
	}, origamToolbarRef))

</script>

<style
		lang="scss"
		scoped
>
	// ── Btn surface contract inside the AppBar ─────────────────────────
	//
	// Same approach as OrigamPagination: the bar itself owns the surface
	// (whether transparent over the page or filled via a `color`/`bgColor`
	// prop on OrigamAppBar), and every nested OrigamBtn defaults to a
	// transparent fill so the chrome reads as a uniform bar — NOT a row
	// of competing intent-coloured pills.
	//
	//   normal  →  --bg-base (transparent by default)
	//   hover   →  color-mix(--bg-base, black 20 %)   ← derived
	//   active  →  color-mix(--bg-base, black 30 %)   ← derived
	//
	// Shape: rounded-SQUARE (8 px). The Btn's own `&--icon { border-radius:
	// 50% }` rule would otherwise circle every icon-only btn inside the bar
	// (menu, dots, search, …) — that looked off against the bar's straight
	// edges. The square keeps the icon hit-area aligned with the bar's
	// rhythm (and matches the same fix already applied to Pagination).

	.origam-app-bar {
		// ── Btn surface base (DEDICATED var, NOT the AppBar's own bg) ──
		// `--origam-app-bar---background-color` is the bar's OWN
		// surface (typically white in light theme). If we pointed the
		// btn surface at that, every nested btn would paint white on a
		// white bar → invisible. The btn surface needs its own knob,
		// defaulting to `transparent` so the bar's fill shows through.
		// Declarations BEFORE nested rules (Sass mixed-decls).
		--btn-bg-base: var(--origam-app-bar---btn-background-color, transparent);
		--btn-fg-base: var(--origam-app-bar---btn-color, currentColor);

		// Inline gutter so the content (icon prepend / title / icon
		// append) never sits flush against the bar's edges. With a
		// prepend btn the gutter looks natural; WITHOUT a prepend the
		// title was previously glued to the left edge — user reported
		// "si pas d'icon, le titre est trop collé au bord". 16 px matches
		// Material / iOS app-bar spec for inline padding.
		padding-inline: var(--origam-app-bar---padding-inline, 16px);

		// Normal state — transparent fill, btn icon reads on the bar.
		:deep(.origam-btn:not(:hover):not(.origam-btn--active)) {
			--origam-btn---background-color: var(--btn-bg-base);
			--origam-btn---color: var(--btn-fg-base);
		}

		// Hover state — 20 % darker than --btn-bg-base. With a
		// transparent base, color-mix produces rgba(0, 0, 0, 0.2),
		// i.e. a subtle dark overlay on the bar's surface.
		:deep(.origam-btn:hover:not(.origam-btn--active)) {
			--origam-btn---background-color: var(
				--origam-app-bar---btn-background-color-hover,
				color-mix(in srgb, var(--btn-bg-base), black 20%)
			);
		}

		// Active state — 30 % darker.
		:deep(.origam-btn.origam-btn--active) {
			--origam-btn---background-color: var(
				--origam-app-bar---btn-background-color-active,
				color-mix(in srgb, var(--btn-bg-base), black 30%)
			);
		}

		// Shape — rounded square (8 px) on every nested btn, overriding
		// the Btn's default `&--icon { border-radius: 50% }`.
		:deep(.origam-btn) {
			--origam-btn---border-radius: var(--origam-app-bar---btn-border-radius, 8px);
			--origam-btn---border-radius-icon: var(--origam-app-bar---btn-border-radius, 8px);
			border-radius: var(--origam-app-bar---btn-border-radius, 8px);
		}

		// Breathing room between the prepend / append btn cluster and
		// the title. The Toolbar's title var `margin-inline-start: auto`
		// is a flex-justification trick (pushes title to centre / right),
		// NOT a gap — so the menu btn ends up flush against the title.
		// We add a small inline margin on the prepend / append blocks
		// instead, leaving the consumer a CSS var to retune.
		:deep(.origam-toolbar__prepend) {
			margin-inline-end: var(--origam-app-bar__prepend---margin-inline-end, 12px);
		}
		:deep(.origam-toolbar__append) {
			margin-inline-start: var(--origam-app-bar__append---margin-inline-start, 12px);
		}

		// Title color inheritance. OrigamTitle's own SCSS pins its color
		// to `--origam-title---color` (a fixed neutral token) which does
		// NOT inherit from its parent's currentColor. So when the AppBar
		// is given `color="primary"`, the toolbar root paints primary
		// via useBothColor's inline style, but the OrigamTitle inside
		// stays neutral — the user reported "color works on btn icons
		// but not on the title". Repoint the title's color var to
		// currentColor so it picks up whatever the toolbar root is using
		// (intent-resolved fg, or the auto-contrast pair when bgColor
		// triggers the clash detection).
		:deep(.origam-toolbar__title .origam-title) {
			--origam-title---color: var(--origam-app-bar__title---color, currentColor);
		}
	}
</style>
