<template>
	<component
			:is="tag"
			:class="labelClasses"
			:style="labelStyles"
			:id="id"
			:name="name"
			@click="handleClick"
	>
		<slot name="default">
			<span>{{ text }}</span><sup v-if="required">*</sup>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef } from 'vue'
	import { useBorder, useBothColor, useDefaults, useMargin, usePadding, useProps, useRounded } from '../../composables'

	import type { ILabelEmits, ILabelProps, ILabelSlots } from '../../interfaces'

	const _props = withDefaults(defineProps<ILabelProps>(), {
		tag: 'label'
	})
	const props = useDefaults(_props)

	const emits = defineEmits<ILabelEmits>()

	defineSlots<ILabelSlots>()

	const handleClick = (e: MouseEvent) => {
		emits('click', e)
	}

	// CLASS & STYLES

	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const labelStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const labelClasses = computed(() => {
		return [
			'origam-label',
			{
				'origam-label--floating': props.floating
			},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	const {filterProps} = useProps<ILabelProps>(props)

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>

</style>

<style>
	:root {

	}
</style>
