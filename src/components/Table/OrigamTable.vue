<template>
	<component
			:is="tag"
			:class="tableClasses"
			:style="tableStyles"
	>
		<slot name="top"/>

		<div
				:class="tableWrapperClasses"
				:style="tableWrapperStyles"
		>
			<slot name="wrapper">
				<table>
					<slot name="default"/>
				</table>
			</slot>
		</div>

		<slot name="bottom"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, useSlots } from 'vue'
	import {
		useBorder,
		useDensity,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { ITableProps } from '../../interfaces'

	const props = withDefaults(defineProps<ITableProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<ITableProps>(props)

	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {roundedStyles, roundedClasses} = useRounded(props)
	const {elevationClasses} = useElevation(props)
	const {paddingStyles, paddingClasses} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const tableStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const tableClasses = computed(() => {
		return [
			'origam-table',
			{
				'origam-table--fixed-header': props.fixedHeader,
				'origam-table--fixed-footer': props.fixedFooter,
				'origam-table--has-top': slots.top,
				'origam-table--has-bottom': slots.bottom
			},
			densityClasses.value,
			borderClasses.value,
			roundedClasses.value,
			elevationClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const tableWrapperStyles = computed(() => {
		return [
			dimensionStyles.value,
			props.style
		] as StyleValue
	})
	const tableWrapperClasses = computed(() => {
		return [
			'origam-table__wrapper',
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
	.origam-table {
		background-color: var(--origam-table---background-color, var(--origam-color-surface-default));
		color: var(--origam-table---color, var(--origam-color-text-primary));
		font-size: var(--origam-table---font-size, 0.875rem);

		&__wrapper {
			overflow-x: auto;

			table {
				border-collapse: var(--origam-table---border-collapse, collapse);
				width: 100%;
			}

			:deep(th) {
				background-color: var(--origam-table__header-cell---background-color, var(--origam-color-surface-overlay));
				color: var(--origam-table__header-cell---color, var(--origam-color-text-primary));
				font-weight: var(--origam-table__header-cell---font-weight, 600);
				padding-block: var(--origam-table__header-cell---padding-block, 12px);
				padding-inline: var(--origam-table__header-cell---padding-inline, 16px);
				border-bottom: var(--origam-table__header-cell---border-bottom-width, 2px) solid var(--origam-table__header-cell---border-bottom-color, var(--origam-color-border-default));
				text-align: start;
			}

			:deep(td) {
				padding-block: var(--origam-table__cell---padding-block, 12px);
				padding-inline: var(--origam-table__cell---padding-inline, 16px);
				border-bottom: var(--origam-table__cell---border-width, 1px) solid var(--origam-table__cell---border-color, var(--origam-color-border-subtle));
			}

			:deep(tr:hover td) {
				background-color: var(--origam-table__row---hover-background-color, var(--origam-color-surface-sunken));
			}
		}
	}
</style>
