<template>
	<template v-if="renderless">
		<slot
				name="renderless"
				v-bind="{ itemRef: resizeRef }"
		/>
	</template>
	<template v-else>
		<div
				ref="resizeRef"
				:class="virtualScrollItemClasses"
				:style="virtualScrollItemStyles"
				v-bind="{ ...attrs }"
		>
			<slot name="default"/>
		</div>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, useAttrs, watch } from 'vue'
	import { useProps, useResizeObserver } from '../../composables'

	import type { IVirtualScrollItemProps } from '../../interfaces'

	const props = withDefaults(defineProps<IVirtualScrollItemProps>(), {})

	const emits = defineEmits(['update:height'])

	const {filterProps} = useProps<IVirtualScrollItemProps>(props)

	const attrs = useAttrs()

	const {resizeRef, contentRect} = useResizeObserver(undefined, 'border')

	watch(() => contentRect.value?.height, (height) => {
		if (height != null) emits('update:height', height)
	})

	// CLASS & STYLES

	const virtualScrollItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const virtualScrollItemClasses = computed(() => {
		return [
			'origam-virtual-scroll-item',
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
	.origam-virtual-scroll-item {
		/* Item height is measured at runtime via ResizeObserver (update:height event).
		   The token --origam-virtual-scroll---item-height (48px) is the initial
		   estimated value used by the virtual engine before measurement. */
	}
</style>
