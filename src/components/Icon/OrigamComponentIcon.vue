<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	>
		<slot name="default">
			<component
					:is="iconComponent"
					v-if="hasIcon"
			/>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "../../composables"
	import { SIZES_ARRAY } from '../../consts'

	import type { IIconComponentProps } from '../../interfaces'
	import type { Component } from 'vue'
	import { computed, StyleValue } from 'vue'

	import type { TSize } from '../../types'
	import { convertToUnit } from '../../utils'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'div'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	const hasIcon = computed(() => {
		return !!props.icon
	})
	const iconComponent = computed(() => {
		return props.icon as Component
	})

	// CLASS & STYLES

	// Numeric size pins the wrapper's font-size; the inner Vue component icon
	// is expected to size in `em` (most icon libs do — feather, lucide, hugeicons).
	const iconStyles = computed(() => {
		const numericSize = typeof props.size === 'number'
				? convertToUnit(props.size)
				: undefined

		return [
			{
				'font-size': numericSize,
				'width': numericSize,
				'height': numericSize
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
			'origam-icon--component',
			namedSize,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
