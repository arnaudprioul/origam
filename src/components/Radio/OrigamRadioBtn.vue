<template>
	<origam-selection-control
			ref="origamSelectionControlRef"
			v-model="model"
			:class="radioBtnClasses"
			:false-icon="falseIcon"
			:style="radioBtnStyles"
			:true-icon="trueIcon"
			type="radio"
			v-bind="controlProps"
			@click:label="handleClickLabel"
	>
		<template
				v-if="slots.default"
				#default
		>
			<slot name="default"/>
		</template>

		<template
				v-if="slots.input"
				#input="{props, icon, model}"
		>
			<slot
					name="input"
					v-bind="{props, icon, model}"
			/>
		</template>

		<template
				v-if="slots.label"
				#label
		>
			<slot name="label"/>
		</template>
	</origam-selection-control>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useSlots } from 'vue'
	import { OrigamSelectionControl } from '../../components'

	import { useProps, useVModel } from '../../composables'

	import { DENSITY, MDI_ICONS } from '../../enums'

	import type { IRadioBtnProps } from '../../interfaces'

	import type { TOrigamSelectionControl } from "../../types"

	const props = withDefaults(defineProps<IRadioBtnProps>(), {
		density: DENSITY.DEFAULT,
		trueIcon: MDI_ICONS.RADIOBOX_MARKED,
		falseIcon: MDI_ICONS.RADIOBOX_BLANK
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<IRadioBtnProps>(props)

	const origamSelectionControlRef = ref<TOrigamSelectionControl>()

	const model = useVModel(props, 'modelValue')

	const slots = useSlots()

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const controlProps = computed(() => {
		return origamSelectionControlRef.value?.filterProps(props, ['class', 'style', 'id', 'modelValue', 'falseIcon', 'trueIcon', 'type'])
	})

	// CLASS & STYLES

	const radioBtnStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const radioBtnClasses = computed(() => {
		return [
			'origam-radio-btn',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
