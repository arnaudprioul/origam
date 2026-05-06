<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "../../composables"
	import { SIZES_ARRAY } from '../../consts'
	import type { IIconComponentProps } from '../../interfaces'
	import type { TSize } from '../../types'

	import { convertToUnit } from '../../utils'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'i'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	// Numeric `size` → explicit font-size (pixel-perfect override). Named
	// sizes are wired through the `.origam-icon--size-{name}` rule emitted by
	// OrigamIcon — see that component's <style> block. We DO NOT re-emit the
	// rule here so a single source of truth stays for icon sizing tokens.
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
			namedSize,
			props.icon,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
