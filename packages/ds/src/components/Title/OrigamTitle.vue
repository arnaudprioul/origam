<template>
	<component
			:is="tag"
			:id="id"
			v-contrast
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
	import {
	useBorder,
	useBothColor,
	useDensity,
	useMargin,
	usePadding,
	useProps,
	useStyle,
	useTypography
} from '../../composables'

	import { vContrast } from '../../directives'

	import type { ITitleProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props with defaults, filterProps utility, and slot ref.
	 ********************************************************/
	const props = withDefaults(defineProps<ITitleProps>(), {tag: 'h1'})

	const {filterProps} = useProps<ITitleProps>(props)

	// Phase 3 (Vague D) — class-first companion alongside inline styles.

	/*********************************************************
	 * Color
	 ********************************************************/

	const {colorClasses, colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {densityClasses} = useDensity(props)
	const slots = useSlots()
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {typographyStyles} = useTypography(props, 'title')

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
			typographyStyles.value,
			props.style
		] as StyleValue
	})
	const titleClasses = computed(() => {
		return [
			'origam-title',
			colorClasses.value,
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	// NOTE: `useStyle` returns its own generated `id` (the injected
	// <style> element id). It MUST be aliased — leaving it named `id`
	// shadows the `id` PROP in the template, so `:id="id"` on the root
	// would bind the style-sheet id (undefined during SSR) instead of the
	// consumer's `id`, silently dropping `id` / breaking `aria-labelledby`.
	const {id: styleId, css, load, isLoaded, unload} = useStyle(titleStyles)


	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent refs.
	 ********************************************************/
	defineExpose({
		filterProps,
		css,
		id: styleId,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-title {
		color:          var(--origam-title---color);
		font-family:    var(--origam-title---font-family);
		font-size:      var(--origam-title---font-size);
		font-weight:    var(--origam-title---font-weight);
		letter-spacing: var(--origam-title---letter-spacing);
		line-height:    var(--origam-title---line-height);
		margin-block-start: var(--origam-title---margin-block-start);
		margin-block-end:   var(--origam-title---margin-block-end);

		&--density-compact {
			font-size: var(--origam-title---font-size, var(--origam-title---font-size-xs));
		}

		&--density-default {
			font-size: var(--origam-title---font-size, var(--origam-title---font-size-md));
		}

		&--density-comfortable {
			font-size: var(--origam-title---font-size, var(--origam-title---font-size-xl));
		}
	}
</style>
