<template>
	<component
			:is="tag"
			:class="itemGroupClasses"
	>
		<slot
				name="default"
				v-bind="slotProps"
		/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	/**
	 * Generic, renderless selection group — origam's equivalent of
	 * Vuetify's `<v-item-group>`. The component imposes no visual; it
	 * only manages the v-model selection (single / multiple / mandatory)
	 * and exposes per-item selection state through the matching
	 * `<OrigamItem>` slot scope. Use it to build "card-as-radio",
	 * "tile-as-checkbox", or any custom selectable surface.
	 */
	import { computed, StyleValue, useSlots } from 'vue'

	import { useGroup, useProps } from '../../composables'

	import { ORIGAM_ITEM_GROUP_KEY } from '../../consts'

	import type { IItemGroupProps } from '../../interfaces'

	const props = withDefaults(defineProps<IItemGroupProps>(), {
		tag: 'div',
		selectedClass: 'origam-item--selected'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IItemGroupProps>(props)

	const {isSelected, select, next, prev, selected} = useGroup(props, ORIGAM_ITEM_GROUP_KEY)

	const slotProps = computed(() => ({
		isSelected,
		select,
		next,
		prev,
		selected
	}))

	const slots = useSlots()

	// CLASS

	const itemGroupClasses = computed(() => {
		return [
			'origam-item-group',
			props.class
		]
	})
	const itemGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps,
		next,
		prev,
		select
	})
</script>
