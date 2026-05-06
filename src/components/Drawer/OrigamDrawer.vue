<template>
	<!--
		`defer` (Vue 3.5+) waits until the current render cycle has
		settled before resolving the teleport target. Pre-fix the teleport
		evaluated `:to="#layout-0 .origam-layout__wrapper"` while the
		wrapper was still being mounted by the parent OrigamLayout — Vue
		warned `Failed to locate Teleport target` and `Invalid Teleport
		target on mount: null`, the drawer never mounted, and a cascade
		of `Cannot set properties of null (setting '__vnode')` errors
		took the rest of the variant down. With `defer`, the target lookup
		runs after the layout's wrapper is in the DOM.
	-->
	<teleport
			v-if="isActive"
			:disabled="isLayoutOrphan"
			:to="teleportDrawer"
			defer
	>
		<component
				:is="tag"
				:ref="rootEl"
				:class="drawerClasses"
				:style="drawerStyles"
				v-bind="{...scopeId, ...$attrs}"
				@mouseenter="handleMouseEnter"
				@mouseleave="handleMouseLeave"
		>
			<div class="origam-drawer__wrapper">
				<slot name="wrapper">
					<div
							v-if="hasPrepend"
							class="origam-drawer__prepend"
					>
						<slot name="prepend"/>
					</div>

					<div
							v-if="hasContent"
							class="origam-drawer__content"
					>
						<slot name="default"/>
					</div>

					<div
							v-if="hasAppend"
							class="origam-drawer__append"
					>
						<slot name="append"/>
					</div>
				</slot>
			</div>
		</component>
		<origam-overlay-scrim
				:active="isTemporary && (isDragging || isActive && !!scrim)"
				:scrim="scrim"
				:style="scrimStyles"
				v-bind="scopeId"
				@click="handleClickScrim"
		/>
	</teleport>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ComputedRef,
		nextTick,
		onBeforeMount,
		Ref,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		watch
	} from 'vue'
	import { OrigamOverlayScrim } from '../../components'

	import {
		useBackgroundColor,
		useBorder,
		useDensity,
		useElevation,
		useLayoutItem,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useRouter,
		useScopeId,
		useSsrBoot,
		useSticky,
		useToggleScope,
		useTouch,
		useVModel
	} from '../../composables'

	import { INLINE } from '../../enums'

	import type { IDrawerProps } from '../../interfaces'

	import { getUid, int } from "../../utils"

	const props = withDefaults(defineProps<IDrawerProps>(), {
		tag: 'nav',
		permanent: null,
		rail: null,
		railWidth: 56,
		scrim: true,
		width: 256,
		location: INLINE.LEFT,
		modelValue: true
	})

	const emits = defineEmits(['update:rail'])

	const {filterProps} = useProps<IDrawerProps>(props)

	const {backgroundColorStyles} = useBackgroundColor(toRef(props, 'bgColor'))
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const slots = useSlots()
	const router = useRouter()
	const {ssrBootStyles} = useSsrBoot()
	const {scopeId} = useScopeId()

	const isActive = useVModel(props, 'modelValue', false, v => !!v)
	const rootEl = ref<HTMLElement>()
	const isHovering = shallowRef(false)

	const width = computed(() => {
		return (props.rail && props.expandOnHover && isHovering.value)
				? Number(props.width)
				: Number(props.rail ? props.railWidth : props.width)
	})
	const location = computed(() => {
		return props.location as 'left' | 'right' | 'bottom'
	})
	const isTemporary = computed(() => !props.permanent && (props.temporary))
	const isSticky = computed(() => {
		return props.sticky && !isTemporary.value && location.value !== 'bottom'
	})

	useToggleScope(() => props.expandOnHover && props.rail != null, () => {
		watch(isHovering, val => emits('update:rail', !val))
	})
	useToggleScope(() => !props.disableResizeWatcher, () => {
		watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)))
	})
	useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
		watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false))
	})

	watch(() => props.permanent, val => {
		if (val) isActive.value = true
	})

	onBeforeMount(() => {
		if (props.modelValue != null || isTemporary.value) return

		isActive.value = props.permanent as boolean
	})

	// DRAG

	const {isDragging, dragProgress, dragStyles} = useTouch({
		isActive: isActive as Ref<boolean>,
		isTemporary,
		width,
		touchless: toRef(props, 'touchless'),
		position: location
	})

	// LAYOUT

	const layoutSize = computed(() => {
		const size = isTemporary.value ? 0
				: props.rail && props.expandOnHover ? Number(props.railWidth)
						: width.value

		return isDragging.value ? size * dragProgress.value : size
	})

	const {layoutItemStyles, layoutItemScrimStyles, layoutId} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order as string || getUid().toString() as string)),
		position: location,
		layoutSize,
		elementSize: width,
		active: computed(() => isActive.value || isDragging.value) as ComputedRef<boolean>,
		disableTransitions: computed(() => isDragging.value),
		absolute: computed(() =>
				props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
		)
	})

	// `useLayoutItem` falls back to `layoutId: 'origam-layout-orphan'`
	// when no `<OrigamLayout>` ancestor is in the tree (stories, modal
	// previews, tests). The corresponding `#origam-layout-orphan
	// .origam-layout__wrapper` selector doesn't exist in the DOM, so
	// `<teleport :to="…">` silently no-ops and the drawer never mounts.
	// Detect the orphan case and disable the teleport — Vue's
	// `disabled` flag falls back to inline rendering at the declared
	// position, which is what the consumer expects in standalone use.
	const isLayoutOrphan = computed(() => layoutId.value === 'origam-layout-orphan')
	const teleportDrawer = computed(() => {
		if (isLayoutOrphan.value) return undefined
		return `#${layoutId.value} .origam-layout__wrapper`
	})

	const {isStuck, stickyStyles} = useSticky({rootEl, isSticky, layoutItemStyles})

	// SCRIM
	const scrimStyles = computed(() => ({
		...isDragging.value ? {
			opacity: dragProgress.value * 0.2,
			transition: 'none'
		} : undefined,
		...layoutItemScrimStyles.value
	}))

	const handleClickScrim = () => {
		isActive.value = false
	}

	// HOVER

	const handleMouseEnter = () => {
		isHovering.value = true
	}
	const handleMouseLeave = () => {
		isHovering.value = false
	}

	// SLOTS

	const hasPrepend = computed(() => {
		return slots.prepend
	})
	const hasContent = computed(() => {
		return slots.default
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	// CLASSES & STYLES

	const drawerStyles = computed(() => {
		return [
			backgroundColorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			layoutItemStyles.value,
			dragStyles.value,
			ssrBootStyles.value,
			stickyStyles.value,
			props.style
		] as StyleValue
	})
	const drawerClasses = computed(() => {
		return [
			'origam-drawer',
			`origam-drawer--${location.value}`,
			{
				'origam-drawer--expand-on-hover': props.expandOnHover,
				'origam-drawer--floating': props.floating,
				'origam-drawer--is-hovering': isHovering.value,
				'origam-drawer--rail': props.rail,
				'origam-drawer--temporary': isTemporary.value,
				'origam-drawer--active': isActive.value,
				'origam-drawer--sticky': isSticky.value
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-drawer {
		-webkit-overflow-scrolling: touch;

		display: var(--origam-drawer---display);
		flex-direction: var(--origam-drawer---flex-direction);

		height: var(--origam-drawer---height);
		max-width: var(--origam-drawer---max-width);
		width: var(--origam-drawer---width);

		pointer-events: var(--origam-drawer---pointer-events);

		transform: var(--origam-layout---transform);
		transition-duration: var(--origam-drawer---transition-duration);
		transition-property: var(--origam-drawer---transition-property);
		transition-timing-function: var(--origam-drawer---transition-timing-function);

		position: var(--origam-layout---position, var(--origam-drawer---position));
		z-index: var(--origam-layout---zIndex, 1000);

		// Pre-fix two SCSS bugs were stacked here:
		// 1. Every `--origam-drawer--{prop}` (double-dash) read a CSS
		//    variable the token build never emits — tokens emit
		//    `--origam-drawer---{prop}` (TRIPLE dash). Net effect: 36/37
		//    drawer variables resolved to nothing, so the drawer rendered
		//    with browser-default backgrounds, transitions, and
		//    dimensions instead of the design tokens.
		// 2. `border-style` mistakenly read the `--border-color` variable
		//    (typo). Even if the var name were correct it would still
		//    produce an invalid `border-style` value.
		// Fixed in this commit by rewriting all reads to triple-dash and
		// pointing `border-style` at the correct variable. Per-side
		// widths + per-corner radii match the chromique pattern.
		border-color: var(--origam-drawer---border-color);
		border-style: var(--origam-drawer---border-style);
		border-top-width: var(--origam-drawer---border-top-width, 0);
		border-right-width: var(--origam-drawer---border-right-width, 0);
		border-bottom-width: var(--origam-drawer---border-bottom-width, 0);
		border-left-width: var(--origam-drawer---border-left-width, 0);
		border-start-start-radius: var(--origam-drawer---border-start-start-radius, 0);
		border-start-end-radius: var(--origam-drawer---border-start-end-radius, 0);
		border-end-end-radius: var(--origam-drawer---border-end-end-radius, 0);
		border-end-start-radius: var(--origam-drawer---border-end-start-radius, 0);

		background: var(--origam-drawer---background);
		box-shadow: var(--origam-drawer---box-shadow);
		color: var(--origam-drawer---color);

		// `border={true}` — opt-in border on all four sides (Vuetify
		// parity). The per-side reads above pick up these var values
		// automatically; the duplicate `border-{side}-width` declarations
		// previously baked into each directional modifier were redundant.
		&--border {
			--origam-drawer---border-top-width: thin;
			--origam-drawer---border-right-width: thin;
			--origam-drawer---border-bottom-width: thin;
			--origam-drawer---border-left-width: thin;
			--origam-drawer---box-shadow: none;
		}

		// Edge-anchored variants — only the side adjacent to the
		// content gets a border, mimicking the Material drawer treatment.
		&--top {
			top: 0;
			--origam-drawer---border-bottom-width: thin;
		}

		&--bottom {
			left: 0;
			--origam-drawer---border-top-width: thin;
		}

		&--left {
			top: 0;
			left: 0;
			right: auto;
			--origam-drawer---border-right-width: thin;
		}

		&--right {
			top: 0;
			left: auto;
			right: 0;
			--origam-drawer---border-left-width: thin;
		}

		&--floating {
			border: none;
		}

		&--temporary {
			--origam-drawer---box-shadow: var(--origam-shadow-lg);
		}

		&--sticky {
			--origam-drawer---height: auto;
			--origam-drawer---transition-property: box-shadow, transform, visibility, width, height, left, right;
		}

		&:deep(.origam-list) {
			overflow: hidden;
		}

		&__content {
			flex: 0 1 auto;
			height: 100%;
			max-width: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}

		&__img {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;

			img {
				height: inherit;
				object-fit: cover;
				width: inherit;
			}
		}

		&__scrim {
			/* CSS-first: toutes les valeurs passent par les tokens — pas de valeur hardcodée */
			position: var(--origam-drawer__scrim---position, absolute);
			top: var(--origam-drawer__scrim---position-top, 0);
			left: var(--origam-drawer__scrim---position-left, 0);
			width: var(--origam-drawer__scrim---width, 100%);
			height: var(--origam-drawer__scrim---height, 100%);
			background: var(--origam-drawer__scrim---background, var(--origam-color-overlay-scrim));
			opacity: var(--origam-drawer__scrim---opacity, 0.2);
			transition-property: var(--origam-drawer__scrim---transition-property, opacity);
			transition-duration: var(--origam-drawer__scrim---transition-duration, var(--origam-motion-duration-medium));
			transition-timing-function: var(--origam-drawer__scrim---transition-timing-function, var(--origam-motion-easing-standard));
			z-index: var(--origam-drawer__scrim---z-index, var(--origam-z-index-raised));
		}

		&__prepend,
		&__append {
			flex: none;
			overflow: hidden;
		}
	}
</style>

<!-- Les valeurs par défaut des CSS custom properties ci-dessus sont désormais
     émises par Style Dictionary depuis tokens/component/drawer.json.
     Le bloc :root global a été supprimé — Lot 2D migration design tokens. -->
