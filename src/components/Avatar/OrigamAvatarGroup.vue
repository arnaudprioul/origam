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
					<!--
						`avatarProps` is a function (line 104). Without the
						call parens, Vue tries to spread the function ref
						itself as props — `density`, `size`, `color`, …
						forwarded from OrigamAvatarGroup never reached the
						rest chip. Calling it () returns the merged props.
					-->
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
	import { useActive, useDensity, useHover, useMargin, usePadding, useProps, useRtl, useStyle } from "../../composables"
	import { DIRECTION } from "../../enums"
	import type { IAvatarGroupProps, IAvatarProps } from "../../interfaces"
	import type { TOrigamAvatar } from '../../types'

	import type { StyleValue, VNodeProps } from 'vue'
	import { computed, mergeProps, ref } from "vue"

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

	defineEmits(['update:active', 'update:hover'])

	const {filterProps} = useProps<IAvatarGroupProps>(props)

	const {isRtl} = useRtl()

	const max = ref(props.max)

	const restItems = computed(() => {
		if (props.items.length > max.value) {
			return props.items.slice(max.value - 1, props.items.length)
		}

		return []
	})
	const displayItems = computed(() => {
		if (props.items.length > max.value) {
			return props.items.slice(0, max.value - 1)
		}

		if (props.items.length === max.value) {
			return props.items.slice(0, max.value)
		}

		return props.items
	})

	const {hoverClasses, isHover, onMouseleave, onMouseenter} = useHover(props)
	const {activeClasses, isActive, onActive} = useActive(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {densityClasses} = useDensity(props)

	const origamAvatarRef = ref<TOrigamAvatar>()
	const avatarProps = (item: IAvatarProps = {}) => {
		const ignoreProps = ['margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']
		const avatarDefaultProps = origamAvatarRef.value?.[0]?.filterProps(props, ignoreProps) || origamAvatarRef.value?.filterProps(props, ignoreProps)

		return mergeProps(item as VNodeProps, avatarDefaultProps, {hover: isHover.value, active: isActive.value})
	}

	const handleMouseEnter = () => {
		if (props.expandOnHover) {
			max.value = props.items.length
		}

		onMouseenter()
	}
	const handleMouseLeave = () => {
		if (props.expandOnHover) {
			max.value = props.max
		}

		onMouseleave()
	}

	const handleClick = () => {
		if (props.expandOnClick) {
			if (isActive.value) {
				max.value = props.max
			} else {
				max.value = props.items.length
			}
		}

		onActive()
	}

	// CLASS & STYLES

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

	// EXPOSE

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

		// Transition on the margin LONGHAND directly — CSS variables don't
		// trigger transitions when their value changes; only the consumer
		// property (here `margin-inline-start` / `margin-block-start`)
		// does, and only when that exact property is in
		// `transition-property`. Composing the longhands manually because
		// the tokens expose `-property` / `-duration` / `-timing-function`
		// individually (no shorthand `--…--transition` token).
		// `__rest` (the +N chip) is part of the same overlap chain — it
		// sits at the end of the cluster and must chevauche the last
		// `__item` exactly like every other non-first slot. Both
		// selectors are applied below in `--horizontal` / `--vertical`
		// and in the transition declaration.
		&--expand-on-hover,
		&--expand-on-click {
			#{$this}__item:not(:first-child),
			#{$this}__rest:not(:first-child) {
				transition-property: var(--origam-avatar-group__avatar---transition-property, margin);
				transition-duration: var(--origam-avatar-group__avatar---transition-duration, 200ms);
				transition-timing-function: var(--origam-avatar-group__avatar---transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
			}
		}

		// `expand-on-click` is the actionable variant — the wrapper itself
		// is the click target. Surface that affordance with `cursor:
		// pointer` so users know the cluster is interactive (hover-only
		// expand stays on the default cursor — no click handler).
		&--expand-on-click {
			cursor: pointer;
		}

		&--elevated {
			box-shadow: var(--origam-avatar-group---box-shadow-elevated, var(--origam-shadow-md));
		}

		// Density rungs — offset added to the cluster's overlap margin
		// (`calc(-18px + density)`):
		//   compact      = -6px  → total margin -24px → tightest stack
		//   default      =  0    → total margin -18px → standard
		//   comfortable  = 10px  → total margin  -8px → roomy stack
		// Compact and comfortable used to share `8px` — the two rungs
		// rendered identically and `compact` actually loosened the stack
		// instead of tightening it.
		&--density-compact {
			--origam-avatar-group---density: -6px;
		}

		&--density-default {
			--origam-avatar-group---density: 0px;
		}

		&--density-comfortable {
			--origam-avatar-group---density: 10px;
		}

		// Horizontal stack — overlapping margins on every non-first item.
		// Apply margin DIRECTLY (not via a CSS variable) so the
		// `transition-property: margin` declared above can pick up the
		// change to `margin-inline-start` when the wrapper enters the
		// `:hover` / `--active` state.
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

<!--
	Lot 1.5 migration — `<style>:root{}` block removed.
	`--origam-avatar-group---*` and `--origam-avatar-group__avatar---*`
	are now generated from `tokens/component/avatar-group.json`.
-->
