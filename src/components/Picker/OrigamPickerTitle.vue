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
	import { computed, StyleValue } from "vue"
	import { useProps } from "../../composables"

	import type { IPickerTitleProps } from "../../interfaces"

	const props = withDefaults(defineProps<IPickerTitleProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<IPickerTitleProps>(props)

	// CLASS & STYLES

	const pickerTitleStyles = computed(() => {
		return [
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
