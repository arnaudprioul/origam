<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	>
		{{ icon }}
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useProps } from "../../composables"
	import { SIZES_ARRAY } from '../../consts'

	import type { IIconComponentProps } from '../../interfaces'
	import type { TSize } from '../../types'

	import { convertToUnit } from '../../utils'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'div'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	// CLASS & STYLES

	const iconStyles = computed(() => {
		const numericSize = typeof props.size === 'number'
				? convertToUnit(props.size)
				: undefined

		return [
			{
				'font-size': numericSize,
				'line-height': numericSize
			},
			props.style
		] as StyleValue
	})
	const iconClasses = computed(() => {
		const namedSize = typeof props.size === 'string' && SIZES_ARRAY.includes(props.size as TSize)
				? `origam-icon--size-${props.size}`
				: undefined

		return [
			'origam-icon',
			'origam-icon--ligature',
			namedSize,
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
	// Material-style ligature icons render the icon name as text and rely on
	// the icon font (Material Icons, Material Symbols, …) to substitute the
	// text by the glyph at render time. The font itself must be loaded by
	// the host app — typically by including the Google Fonts CSS at the
	// document level. We DO NOT load the font here.
	.origam-icon--ligature {
		font-family: 'Material Icons', 'Material Symbols Outlined', sans-serif;
		font-weight: normal;
		font-style: normal;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
	}
</style>
