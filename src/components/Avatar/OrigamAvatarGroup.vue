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
						v-bind="avatarProps"
				>
					<template #default>
						<slot name="default">
							+{{ restItems.length }}
						</slot>
					</template>
				</origam-avatar>
			</slot>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>

	import { OrigamAvatar } from "../../components"
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

		&___item {
			margin-block-start: var(--origam-avatar-group__item---margin-block-start);
			margin-block-end: var(--origam-avatar-group__item---margin-block-end);
			margin-inline-start: var(--origam-avatar-group__item---margin-inline-start);
			margin-inline-end: var(--origam-avatar-group__item---margin-inline-end);
		}

		&--expand-on-hover,
		&--expand-on-click {
			#{$this}___item {
				&:not(:first-child) {
					transition: var(--origam-avatar-group__avatar---transition);
				}
			}
		}

		&--elevated {
			box-shadow: var(--origam-avatar-group---box-shadow-elevated, var(--origam-shadow-md));
		}

		&--density-comfortable {
			--origam-avatar-group---density: 8px;
		}

		&--density-default {
			--origam-avatar-group---density: 0px;
		}

		&--density-compact {
			--origam-avatar-group---density: 8px;
		}

		&--horizontal {
			--origam-avatar-group---flex-direction: row;

			#{$this}___item {
				&:not(:first-child) {
					--origam-avatar-group---margin-inline-start: calc(-18px + var(--origam-avatar-group---density));
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					#{$this}___item {
						--origam-avatar-group---margin-inline-start: 0;
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					#{$this}___item {
						--origam-avatar-group---margin-inline-start: 0;
					}
				}
			}
		}

		&--vertical {
			flex-direction: column;

			#{$this}___item {
				&:not(:first-child) {
					--origam-avatar-group---margin-block-start: calc(-18px + var(--origam-avatar-group---density));
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					#{$this}___item {
						--origam-avatar-group---margin-block-start: 0;
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					#{$this}___item {
						--origam-avatar-group---margin-block-start: 0;
					}
				}
			}
		}
	}
</style>

<!--
	Lot 1.5 migration — `<style>:root{}` block removed.
	`--origam-avatar-group---*` and `--origam-avatar-group__avatar---*`
	are now generated from `tokens/component/avatar-group.json`.
-->
