<template>
	<component
			:is="tag"
			:class="avatarGroupClasses"
			:style="avatarGroupStyles"
			role="group"
			@click="handleClick"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
	>
		<origam-defaults-provider :defaults="slotDefaults">
			<template
					v-for="(item, index) in displayItems"
					:key="index"
			>
				<slot
						name="avatar"
						v-bind="{item, index}"
				>
					<origam-avatar
							:id="`avatar-${index}`"
							ref="origamAvatarRef"
							class="origam-avatar-group__item"
							v-bind="avatarProps(item)"
					/>
				</slot>
			</template>

			<template v-if="restItems.length">
				<slot
						name="rest"
						v-bind="{rest: restItems, length: restItems.length}"
				>
					<origam-avatar
							ref="origamAvatarRef"
							class="origam-avatar-group__rest"
							v-bind="avatarProps()"
					>
						<template #default>
							<slot name="default">
								+{{ restItems.length }}
							</slot>
						</template>
					</origam-avatar>
				</slot>
			</template>
		</origam-defaults-provider>
	</component>
</template>

<script
		lang="ts"
		setup
>

	import { OrigamAvatar, OrigamDefaultsProvider } from "../../components"
	import { useActive, useDensity, useHover, useProps, useRtl, useStateEffect, useStyle } from "../../composables"
	import { DIRECTION } from "../../enums"
	import type { IAvatarGroupEmits, IAvatarGroupProps, IAvatarProps } from "../../interfaces"
	import type { TOrigamAvatar } from '../../types'

	import type { ComputedRef, StyleValue, VNodeProps } from 'vue'
	import { computed, mergeProps, ref } from "vue"

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props with defaults and slot defaults propagation to
	 * child avatars via OrigamDefaultsProvider.
	 ********************************************************/
	const props = withDefaults(defineProps<IAvatarGroupProps>(), {
		items: () => [],
		max: 5,
		tag: 'div',
		direction: DIRECTION.HORIZONTAL
	})

	// Push visual-token props down to every descendant `<origam-avatar>` as
	// DEFAULTS — children that pass their own props still win.
	const slotDefaults = computed(() => ({
		'origam-avatar': {
			density: props.density,
			size: props.size,
			color: props.color,
			bgColor: props.bgColor
		}
	}))

	defineEmits<IAvatarGroupEmits>()

	const {filterProps} = useProps<IAvatarGroupProps>(props)

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {isRtl} = useRtl()

	/*********************************************************
	 * Group items
	 *
	 * @description
	 * Computes which items to display and which overflow
	 * into the rest (+N) chip based on the `max` prop.
	 *
	 * `isExpanded` is the orthogonal toggle driven by
	 * `expandOnHover` / `expandOnClick` — when true the visible
	 * list shows EVERY item (effectiveMax = items.length). The
	 * earlier implementation used a `ref(props.max)` which froze
	 * the value at mount and never re-tracked the prop — user
	 * report: "la prop max ne fonctionne pas".
	 ********************************************************/
	const isExpanded = ref(false)
	const effectiveMax = computed(() => {
		return isExpanded.value ? props.items.length : props.max
	})

	const restItems = computed(() => {
		if (props.items.length > effectiveMax.value) {
			return props.items.slice(effectiveMax.value - 1, props.items.length)
		}

		return []
	})
	const displayItems = computed(() => {
		if (props.items.length > effectiveMax.value) {
			return props.items.slice(0, effectiveMax.value - 1)
		}

		if (props.items.length === effectiveMax.value) {
			return props.items.slice(0, effectiveMax.value)
		}

		return props.items
	})

	/*********************************************************
	 * Effect
	 *
	 * @description
	 * Hover / active state with optional expand-on-hover and
	 * expand-on-click behaviour.
	 ********************************************************/
	const {hoverClasses, hoverState, isHover, onMouseleave, onMouseenter} = useHover(props)
	const {activeClasses, activeState, isActive, onActive} = useActive(props)

	const origamAvatarRef = ref<TOrigamAvatar>()
	const avatarProps = (item: IAvatarProps = {}) => {
		const ignoreProps = ['margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']
		const avatarDefaultProps = origamAvatarRef.value?.[0]?.filterProps(props, ignoreProps) || origamAvatarRef.value?.filterProps(props, ignoreProps)

		return mergeProps(item as VNodeProps, avatarDefaultProps, {hover: isHover.value, active: isActive.value})
	}

	/*********************************************************
	 * Event handlers
	 ********************************************************/

	const handleMouseEnter = () => {
		if (props.expandOnHover) {
			isExpanded.value = true
		}

		onMouseenter()
	}
	const handleMouseLeave = () => {
		if (props.expandOnHover) {
			isExpanded.value = false
		}

		onMouseleave()
	}

	const handleClick = () => {
		if (props.expandOnClick) {
			isExpanded.value = !isActive.value
		}

		onActive()
	}

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composes direction, RTL, hover/active, density and
	 * spacing classes/styles onto the root element.
	 ********************************************************/
	const {
		marginClasses, marginStyles,
		paddingClasses, paddingStyles,
	} = useStateEffect(props, isHover, isActive as unknown as ComputedRef<boolean>, hoverState, activeState)
	const {densityClasses} = useDensity(props)

	const avatarGroupStyles = computed(() => {
		return [
			marginStyles.value,
			paddingStyles.value,
			props.style
		] as StyleValue
	})
	const avatarGroupClasses = computed(() => {
		return [
			'origam-avatar-group',
			`origam-avatar-group--${props.direction}`,
			{
				'origam-avatar-group--expand-on-hover': props.expandOnHover,
				'origam-avatar-group--expand-on-click': props.expandOnClick,
				'origam-avatar-group--rtl': isRtl
			},
			hoverClasses.value,
			activeClasses.value,
			marginClasses.value,
			paddingClasses.value,
			densityClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(avatarGroupStyles)

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface: filterProps, style utilities.
	 ********************************************************/
	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})

</script>

<style
		lang="scss"
		scoped
>
	.origam-avatar-group {
		$this: &;

		position: var(--origam-avatar-group---position);

		flex-wrap: nowrap;
		display: inline-flex;
		flex-direction: var(--origam-avatar-group---flex-direction);

		padding-block-start: var(--origam-avatar-group---padding-block-start);
		padding-block-end: var(--origam-avatar-group---padding-block-end);
		padding-inline-start: var(--origam-avatar-group---padding-inline-start);
		padding-inline-end: var(--origam-avatar-group---padding-inline-end);
		margin-block-start: var(--origam-avatar-group---margin-block-start);
		margin-block-end: var(--origam-avatar-group---margin-block-end);
		margin-inline-start: var(--origam-avatar-group---margin-inline-start);
		margin-inline-end: var(--origam-avatar-group---margin-inline-end);

		&__item {
			margin-block-start: var(--origam-avatar-group__item---margin-block-start);
			margin-block-end: var(--origam-avatar-group__item---margin-block-end);
			margin-inline-start: var(--origam-avatar-group__item---margin-inline-start);
			margin-inline-end: var(--origam-avatar-group__item---margin-inline-end);
		}

		&--expand-on-hover,
		&--expand-on-click {
			#{$this}__item:not(:first-child),
			#{$this}__rest:not(:first-child) {
				transition-property: var(--origam-avatar-group__avatar---transition-property, margin);
				transition-duration: var(--origam-avatar-group__avatar---transition-duration, 200ms);
				transition-timing-function: var(--origam-avatar-group__avatar---transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
			}
		}

		&--expand-on-click {
			cursor: pointer;
		}

		&--elevated {
			box-shadow: var(--origam-avatar-group---box-shadow-elevated, var(--origam-shadow---md));
		}

		&--density-compact {
			--origam-avatar-group---density: -6px;
		}

		&--density-default {
			--origam-avatar-group---density: 0px;
		}

		&--density-comfortable {
			--origam-avatar-group---density: 10px;
		}

		&--horizontal {
			flex-direction: row;

			#{$this}__item:not(:first-child),
			#{$this}__rest:not(:first-child) {
				margin-inline-start: calc(-18px + var(--origam-avatar-group---density, 0px));
			}

			&#{$this}--expand-on-hover:hover #{$this}__item:not(:first-child),
			&#{$this}--expand-on-hover:hover #{$this}__rest:not(:first-child),
			&#{$this}--expand-on-click#{$this}--active #{$this}__item:not(:first-child),
			&#{$this}--expand-on-click#{$this}--active #{$this}__rest:not(:first-child) {
				margin-inline-start: 0;
			}
		}

		&--vertical {
			flex-direction: column;

			#{$this}__item:not(:first-child),
			#{$this}__rest:not(:first-child) {
				margin-block-start: calc(-18px + var(--origam-avatar-group---density, 0px));
			}

			&#{$this}--expand-on-hover:hover #{$this}__item:not(:first-child),
			&#{$this}--expand-on-hover:hover #{$this}__rest:not(:first-child),
			&#{$this}--expand-on-click#{$this}--active #{$this}__item:not(:first-child),
			&#{$this}--expand-on-click#{$this}--active #{$this}__rest:not(:first-child) {
				margin-block-start: 0;
			}
		}

	}
</style>

