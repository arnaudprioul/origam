<template>
	<div
			:class="responsiveClasses"
			:style="responsiveStyles"
	>
		<div
				:style="aspectStyles"
				class="origam-responsive__sizer"
		/>
		<slot name="additional"/>
		<div
				v-if="slots.default"
				:class="responsiveContentClasses"
		>
			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, useSlots } from 'vue'
	import {
		useAspectRatio,
		useBorder,
		useDimension,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import type { IResponsiveProps } from '../../interfaces'

	const props = withDefaults(defineProps<IResponsiveProps>(), {})

	const {filterProps} = useProps<IResponsiveProps>(props)

	const {aspectStyles} = useAspectRatio(props)
	const {dimensionStyles} = useDimension(props)
	const slots = useSlots()
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const responsiveStyles = computed(() => {
		return [
			dimensionStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const responsiveClasses = computed(() => {
		return [
			'origam-responsive',
			{'origam-responsive--inline': props.inline},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const responsiveContentClasses = computed(() => {
		return [
			'origam-responsive__content',
			props.contentClass
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
	.origam-responsive {
		$this: &;

		display: var(--origam-responsive---display);
		flex: var(--origam-responsive---flex);
		max-height: var(--origam-responsive---max-height);
		max-width: var(--origam-responsive---max-width);
		min-width: var(--origam-responsive---min-width);
		min-height: var(--origam-responsive---min-width);
		overflow: var(--origam-responsive---overflow);
		position: var(--origam-responsive---position);
		width: var(--origam-responsive---width);
		height: var(--origam-responsive---height);

		&--inline {
			display: var(--origam-responsive--inline---display);
			flex: var(--origam-responsive--inline---flex);
		}

		&__content {
			flex: var(--origam-responsive__content---flex);
			max-width: var(--origam-responsive__content---max-width);
			margin: var(--origam-responsive__content---margin);
		}

		&__sizer {
			flex: var(--origam-responsive__sizer---flex);
			transition: var(--origam-responsive__sizer---transition);
			pointer-events: var(--origam-responsive__sizer---pointer-events);
			padding-block-end: var(--origam-responsive__sizer---padding-block-end);

			~ #{$this}__content {
				--origam-responsive__content---margin-inline-start: -100%
			}
		}
	}
</style>

<!-- Lot 6 — `<style>:root{}` block removed; tokens now live in
     `tokens/component/responsive.json` (aspect-ratio + layout) and
     are emitted as theme-aware CSS variables by the build pipeline. -->

