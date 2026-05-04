<template>
	<component
			:is="tag"
			:class="pickerTitleClasses"
			:style="pickerTitleStyles"
	>
		<slot name="default">
			{{ title }}
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef } from "vue"
	import { useBothColor, useProps } from "../../composables"

	import type { IPickerTitleProps } from "../../interfaces"

	const props = withDefaults(defineProps<IPickerTitleProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<IPickerTitleProps>(props)

	// `useBothColor` produces inline `color: …` and `background-color: …`
	// declarations. Pre-fix the SCSS read `var(--origam-picker-title---color)`
	// from tokens but the consumer's `color`/`bgColor` props had no path
	// to the rendered element.
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	// CLASS & STYLES

	const pickerTitleStyles = computed(() => {
		return [
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const pickerTitleClasses = computed(() => {
		return [
			'origam-picker-title',
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
	.origam-picker-title {
		text-transform: var(--origam-picker-title---text-transform, uppercase);
		font-size: var(--origam-picker-title---font-size, .75rem);
		padding-inline: var(--origam-picker-title---padding-inline, 24px 12px);
		padding-block: var(--origam-picker-title---padding-block, 16px);
		font-weight: var(--origam-picker-title---font-weight, 400);
		letter-spacing: var(--origam-picker-title---letter-spacing, .1666666667em);
		color: var(--origam-picker-title---color, var(--origam-picker--title---color, inherit));
	}
</style>
