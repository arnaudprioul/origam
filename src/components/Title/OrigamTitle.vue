<template>
	<component
			:is="tag"
			:class="titleClasses"
			:style="titleStyles"
	>
		<slot
				v-if="hasContent"
				name="default"
		>
			{{ text }}
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useSlots } from 'vue'
	import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps } from '../../composables'

	import type { ITitleProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props with defaults, filterProps utility, and slot ref.
	 ********************************************************/
	const props = withDefaults(defineProps<ITitleProps>(), {tag: 'h1'})

	const {filterProps} = useProps<ITitleProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const slots = useSlots()
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const hasContent = computed(() => {
		return slots.default || props.text
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Root element classes and styles.
	 ********************************************************/
	const titleStyles = computed(() => {
		return [
			colorStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const titleClasses = computed(() => {
		return [
			'origam-title',
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent refs.
	 ********************************************************/
	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-title {
		color:          var(--origam-title---color);
		font-family:    var(--origam-title---font-family);
		font-weight:    var(--origam-title---font-weight);
		letter-spacing: var(--origam-title---letter-spacing);
		line-height:    var(--origam-title---line-height);
		margin-block-start: var(--origam-title---margin-block-start);
		margin-block-end:   var(--origam-title---margin-block-end);

		// Density rungs — map the browser-native h1..h6 font-size scale to
		// the `font-size-xs .. font-size-3xl` tokens. Each rung maps one
		// heading level so the visual hierarchy stays intact across densities.
		//
		//   compact      → tag-based sizes stepped down one notch (xs/sm/md/lg/xl/2xl/3xl)
		//   default      → token defaults applied per heading level
		//   comfortable  → tag-based sizes stepped up one notch
		&--density-compact {
			font-size: var(--origam-title---font-size-xs);
		}

		&--density-default {
			font-size: var(--origam-title---font-size-md);
		}

		&--density-comfortable {
			font-size: var(--origam-title---font-size-xl);
		}
	}
</style>
