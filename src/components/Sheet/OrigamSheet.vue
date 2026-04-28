<template>
	<component
			:is="tag"
			:class="sheetClasses"
			:style="sheetStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef } from 'vue'
	import {
		useBorder,
		useBothColor,
		useDimension,
		useElevation,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded
	} from '../../composables'

	import type { ISheetProps } from "../../interfaces"

	const props = withDefaults(defineProps<ISheetProps>(), {tag: 'div'})

	const {filterProps} = useProps<ISheetProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {borderClasses, borderStyles} = useBorder(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses, elevationStyles} = useElevation(props)
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const sheetStyles = computed(() => {
		return [
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			elevationStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const sheetClasses = computed(() => {
		return [
			'origam-sheet',
			elevationClasses.value,
			positionClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
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
	.origam-sheet {
		position: var(--origam-sheet---position);
		display: var(--origam-sheet---display);
		box-sizing: var(--origam-sheet---box-sizing);

		border-color: var(--origam-sheet---border-color);
		border-style: var(--origam-sheet---border-style);
		border-width: var(--origam-sheet---border-width);
		border-radius: var(--origam-sheet---border-radius);

		width: var(--origam-sheet---width);
		max-width: var(--origam-sheet---max-width);
		min-width: var(--origam-sheet---min-width);
		height: var(--origam-sheet---height);
		max-height: var(--origam-sheet---max-height);
		min-height: var(--origam-sheet---min-height);

		padding-block-start: var(--origam-sheet---padding-block-start);
		padding-block-end: var(--origam-sheet---padding-block-end);
		padding-inline-start: var(--origam-sheet---padding-inline-start);
		padding-inline-end: var(--origam-sheet---padding-inline-end);

		margin-block-start: var(--origam-sheet---margin-block-start);
		margin-block-end: var(--origam-sheet---margin-block-end);
		margin-inline-start: var(--origam-sheet---margin-inline-start);
		margin-inline-end: var(--origam-sheet---margin-inline-end);

		background: var(--origam-sheet---background);
		box-shadow: var(--origam-sheet---box-shadow);
		color: var(--origam-sheet---color);

		&--border {
			border-width: var(--origam-sheet--border---border-width);
			box-shadow: var(--origam-sheet--border---box-shadow);
		}

		// Rounded variants — mirrors the OrigamBtn pattern. Each variant
		// binds `--origam-sheet---border-radius` to a primitive
		// `--origam-radius-*` token so theme switches stay seamless.
		&--rounded {
			--origam-sheet---border-radius: var(--origam-sheet--rounded---border-radius, var(--origam-radius-2xl, 24px));
		}

		&--rounded-x-small {
			--origam-sheet---border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			--origam-sheet---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			--origam-sheet---border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			--origam-sheet---border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			--origam-sheet---border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			--origam-sheet---border-radius: var(--origam-radius-2xl, 24px);
		}

		&--absolute {
			--origam-sheet---position: absolute;
		}

		&--fixed {
			--origam-sheet---position: fixed;
		}

		&--relative {
			--origam-sheet---position: relative;
		}

		&--sticky {
			--origam-sheet---position: sticky;
		}
	}
</style>

