<template>
	<component
			:is="tag"
			:id="id"
			:class="btnGroupClasses"
	>
		<origam-defaults-provider :defaults="slotDefaults">
			<slot name="default">
				<template v-if="hasItems">
					<template
							v-for="(item, index) in items"
							:key="index"
					>
						<slot
								name="item"
								v-bind="{item, index}"
						>
							<origam-btn v-bind="item"/>
						</slot>
					</template>
				</template>
			</slot>
		</origam-defaults-provider>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamDefaultsProvider } from '../../components'
	import {
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useStyle
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IBtnGroupProps, IBtnProps } from '../../interfaces'

	import { computed, ref, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBtnGroupProps>(), {tag: 'div', density: DENSITY.DEFAULT, items: () => []})

	const {filterProps} = useProps<IBtnGroupProps>(props)

	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {colorStyles, bgColor} = useColorEffect(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// Push the visual-token props down to every descendant `<origam-btn>`
	// as DEFAULTS — children that pass their own `density` / `color` /
	// `bgColor` / etc. still win (that's the contract: parent provides
	// defaults, child overrides). Children consume this map via
	// `useDefaults(props)` inside `OrigamBtn.vue`.
	const slotDefaults = computed(() => ({
		'origam-btn': {
			density: props.density,
			color: props.color,
			bgColor: props.bgColor,
			activeColor: props.activeColor,
			activeBgColor: props.activeBgColor,
			hoverColor: props.hoverColor,
			hoverBgColor: props.hoverBgColor
		}
	}))

	// The `items` array path used to manually merge with `props.x ?? item.x`,
	// which made the parent OVERRIDE the item (the inverse of the documented
	// "parent default, item override" contract). The merge is no longer
	// needed — `useDefaults` inside each child enforces the correct
	// resolution order and respects per-item overrides automatically.
	const items = computed(() => (props.items ?? []) as Array<IBtnProps>)

	const slots = useSlots()
	const hasItems = computed(() => {
		return slots.default || !!items.value
	})

	// CLASS & STYLES

	const btnGroupStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			colorStyles.value,
			marginStyles.value,
			paddingStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const btnGroupClasses = computed(() => {
		return [
			'origam-btn-group',
			{
				'origam-btn-group--divided': props.divided
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			marginClasses.value,
			paddingClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(btnGroupStyles)

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
	.origam-btn-group {
		display: inline-flex;
		flex-wrap: nowrap;
		overflow: hidden;
		vertical-align: middle;

		max-width: 100%;
		min-width: 0;
		min-height: calc(var(--origam-btn-group---height, 36px) + var(--origam-btn-group---density, 0));

		border-width: var(--origam-btn-group---border-width);
		border-style: var(--origam-btn-group---border-style);
		border-color: var(--origam-btn-group---border-color);
		border-radius: var(--origam-btn-group---border-radius, 4px);

		background-color: var(--origam-btn-group---background-color);
		color: var(--origam-btn-group---color);

		&--border {
			--origam-btn-group---border-width: thin;
		}

		// Rounded variants — mirrors OrigamBtn / OrigamSheet pattern.
		&--rounded {
			--origam-btn-group---border-radius: var(--origam-radius-2xl, 24px);
		}

		&--rounded-x-small {
			--origam-btn-group---border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			--origam-btn-group---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			--origam-btn-group---border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			--origam-btn-group---border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			--origam-btn-group---border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			--origam-btn-group---border-radius: var(--origam-radius-2xl, 24px);
		}

		// Density formula on the btn-group is `height + density`, so:
		//   • comfortable → density POSITIVE → height grows
		//   • compact     → density NEGATIVE → height shrinks
		// Pre-fix both rungs were +8, making them visually identical.
		&--density-comfortable {
			--origam-btn-group---density: 8px;
		}

		&--density-default {
			--origam-btn-group---density: 0px;
		}

		&--density-compact {
			--origam-btn-group---density: -8px;
		}

		:deep(.origam-btn) {
			border-radius: 0;
			border-color: inherit;

			&:not(:last-child) {
				border-inline-end: none;
			}

			&:not(:first-child) {
				border-inline-start: none;
			}
		}

		&--divided {
			:deep(.origam-btn) {
				&:not(:last-child) {
					border-inline-end-width: thin;
					border-inline-end-style: solid;
					border-inline-end-color: rgba(var(--v-border-color), var(--v-border-opacity));
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-btn-group---density: 0;

		--origam-btn-group---border-radius: 4px;
		--origam-btn-group---border-width: 0;
		--origam-btn-group---border-style: solid;
		--origam-btn-group---border-color: currentColor;

	}
</style>
