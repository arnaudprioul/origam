<template>
	<origam-btn-group
			ref="origamBtnGroupRef"
			:class="btnToggleClasses"
			:styles="btnToggleStyles"
			v-bind="btnGroupProps"
	>
		<template
				v-if="slots.default"
				#default
		>
			<slot
					name="default"
					v-bind="{items, isSelected, next, prev, select, selected }"
			/>
		</template>

		<template
				v-if="slots.item"
				#item="{item, index}"
		>
			<slot
					name="item"
					v-bind="{item, index}"
			/>
		</template>
	</origam-btn-group>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtnGroup } from '../../components'

	import { useGroup, useProps } from '../../composables'

	import { ORIGAM_BTN_TOGGLE_KEY } from '../../consts'

	import { DENSITY } from '../../enums'

	import type { IBtnToggleProps } from '../../interfaces'

	import type { TOrigamBtnGroup } from "../../types"

	import { computed, ref, StyleValue, useSlots } from 'vue'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits and group selection state for the toggle.
	 ********************************************************/
	const props = withDefaults(defineProps<IBtnToggleProps>(), {tag: 'div', items: () => [], density: DENSITY.DEFAULT})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IBtnToggleProps>(props)

	const {isSelected, next, prev, select, selected} = useGroup(props, ORIGAM_BTN_TOGGLE_KEY)

	const slots = useSlots()

	const origamBtnGroupRef = ref<TOrigamBtnGroup>()

	const btnGroupProps = computed(() => {
		return origamBtnGroupRef.value?.filterProps(props)
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Thin wrapper — adds only the toggle BEM modifier class.
	 ********************************************************/
	const btnToggleStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const btnToggleClasses = computed(() => {
		return [
			'origam-btn-toggle',
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface: group navigation + filterProps.
	 ********************************************************/
	defineExpose({
		next,
		prev,
		select,
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
