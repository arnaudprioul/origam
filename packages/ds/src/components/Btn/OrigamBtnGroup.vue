<template>
	<component
			:is="tag"
			:id="id"
			role="group"
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
		useDensity,
		useProps,
		useStateEffect,
		useStyle
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IBtnGroupProps, IBtnProps } from '../../interfaces'

	import { computed, StyleValue, useSlots } from 'vue'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props and slot defaults propagation to child buttons
	 * via OrigamDefaultsProvider.
	 ********************************************************/
	const props = withDefaults(defineProps<IBtnGroupProps>(), {tag: 'div', density: DENSITY.DEFAULT, items: () => []})

	const {filterProps} = useProps<IBtnGroupProps>(props)

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
			// New API: `hover` / `active` accept boolean | IHoverState |
			// IActiveState; pass-through propagates the parent's intent
			// override to each child OrigamBtn.
			hover: props.hover,
			active: props.active
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

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composes border, color, elevation, rounding and spacing
	 * classes/styles onto the group root element.
	 ********************************************************/

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {densityClasses} = useDensity(props)
	/*********************************************************
	 * Color
	 ********************************************************/

	const {
		colorStyles,
		borderClasses, borderStyles,
		roundedClasses, roundedStyles,
		elevationClasses, elevationStyles,
		paddingClasses, paddingStyles,
		marginClasses, marginStyles,
	} = useStateEffect(props)
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
	.origam-btn-group {
		display: inline-flex;
		flex-wrap: nowrap;
		align-items: center;
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

		&--rounded {
			--origam-btn-group---border-radius: var(--origam-radius---2xl, 24px);
		}

		&--rounded-x-small {
			--origam-btn-group---border-radius: var(--origam-radius---xs, 2px);
		}

		&--rounded-small {
			--origam-btn-group---border-radius: var(--origam-radius---sm, 4px);
		}

		&--rounded-default {
			--origam-btn-group---border-radius: var(--origam-radius---md, 8px);
		}

		&--rounded-medium {
			--origam-btn-group---border-radius: var(--origam-radius---lg, 12px);
		}

		&--rounded-large {
			--origam-btn-group---border-radius: var(--origam-radius---xl, 16px);
		}

		&--rounded-x-large {
			--origam-btn-group---border-radius: var(--origam-radius---2xl, 24px);
		}

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
			border-color: inherit;

			&:not(:last-child) {
				border-inline-end: none;
			}

			&:not(:first-child) {
				border-inline-start: none;
			}
		}

		// The GROUP owns the rounding and the elevation (a single shadow
		// around the whole group, one border-radius for the outer shape).
		// Child buttons are forced flat and shadowless so a per-child
		// `rounded` / `elevation` (own prop or active/hover state) can't
		// break the unified segmented look — e.g. rounded pills with the
		// group surface bleeding through the gaps. `!important` is
		// intentional: the group's design wins.
		//
		// `overflow: hidden` alone clips the group to its own rounded
		// shape but does NOT round the first/last child's own corners —
		// a fully square button sitting inside a rounded clip leaves a
		// visible gap at each of the 4 corners (the group's background
		// showing through a "square peg in a round hole"). The first and
		// last child must adopt the SAME radius on their outer corners so
		// the segmented control reads as one continuous pill, matching
		// the group's own `--origam-btn-group---border-radius` (which
		// already resolves from the theme's `origam-btn` radius).
		:deep(.origam-btn) {
			border-radius: 0 !important;
			box-shadow: none !important;

			&:first-child {
				border-start-start-radius: var(--origam-btn-group---border-radius, 4px) !important;
				border-end-start-radius: var(--origam-btn-group---border-radius, 4px) !important;
			}

			&:last-child {
				border-start-end-radius: var(--origam-btn-group---border-radius, 4px) !important;
				border-end-end-radius: var(--origam-btn-group---border-radius, 4px) !important;
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

		--origam-btn-group---border-radius: var(--origam-btn---border-radius, 4px);
		--origam-btn-group---border-width: var(--origam-btn---border-width, 0);
		--origam-btn-group---border-style: var(--origam-btn---border-style, solid);
		--origam-btn-group---border-color: var(--origam-btn---border-color, currentColor);

	}
</style>
