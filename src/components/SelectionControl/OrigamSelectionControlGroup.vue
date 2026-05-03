<template>
	<div
			:id="name"
			:class="selectionControlGroupClasses"
			:style="selectionControlGroupStyles"
	>
		<origam-defaults-provider :defaults="slotDefaults">
			<slot
					name="default"
					v-bind="{items}"
			>
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<slot
							:name="`item.${index}`"
							v-bind="{item}"
					>
						<slot
								name="item"
								v-bind="{item, index}"
						/>
					</slot>
				</template>
			</slot>
		</origam-defaults-provider>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, onScopeDispose, provide, StyleValue } from 'vue'
	import { OrigamDefaultsProvider } from '../../components'
	import { useProps, useVModel } from '../../composables'

	import { ORIGAM_SELECTION_CONTROL_GROUP_KEY } from '../../consts'

	import { DENSITY } from '../../enums'

	import type { ISelectionControlGroupEmits, ISelectionControlGroupProps, ISelectionControlGroupSlots } from "../../interfaces"

	import { getUid } from '../../utils'

	const props = withDefaults(defineProps<ISelectionControlGroupProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		items: () => []
	})

	defineEmits<ISelectionControlGroupEmits>()

	defineSlots<ISelectionControlGroupSlots>()

	const {filterProps} = useProps<ISelectionControlGroupProps>(props)

	// Push visual-token props down to every descendant `<origam-selection-control>`
	// as DEFAULTS — controls that pass their own props still win.
	const slotDefaults = computed(() => ({
		'origam-selection-control': {
			density: props.density,
			color: props.color
		}
	}))

	const modelValue = useVModel(props, 'modelValue')
	const uid = getUid()
	const id = computed(() => {
		return props.id || `origam-selection-control-group-${uid}`
	})
	const name = computed(() => {
		return props.name || id.value
	})

	const updateHandlers = new Set<() => void>()

	provide(ORIGAM_SELECTION_CONTROL_GROUP_KEY, {
		modelValue,
		forceUpdate: () => {
			updateHandlers.forEach(fn => fn())
		},
		onForceUpdate: (cb) => {
			updateHandlers.add(cb)

			onScopeDispose(() => {
				updateHandlers.delete(cb)
			})
		}
	})

	// CLASS & STYLES

	const selectionControlGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const selectionControlGroupClasses = computed(() => {
		return [
			'origam-selection-control-group',
			{'origam-selection-control-group--inline': props.inline},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
