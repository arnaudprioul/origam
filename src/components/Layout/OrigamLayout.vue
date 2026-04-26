<template>
	<div
			:id="layoutId"
			ref="origamLayoutRef"
			:class="layClasses"
			:style="layStyles"
	>
		<div
				:id="`${layoutId}-wrapper`"
				class="origam-layout__wrapper"
		>
			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useCreateLayout, useProps } from '../../composables'

	import type { ILayoutProps } from '../../interfaces'

	const props = withDefaults(defineProps<ILayoutProps>(), {})

	const {filterProps} = useProps<ILayoutProps>(props)

	const {layoutClasses, layoutRef: origamLayoutRef, getLayoutItem, items, layoutId} = useCreateLayout(props)

	const layStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const layClasses = computed(() => {
		return [layoutClasses.value, props.class]
	})

	defineExpose({
		getLayoutItem,
		items,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-layout {
		&__wrapper {
			width: 100vw;
			height: 100vh;
			max-height: 100%;
			max-width: 100%;
		}
	}
</style>

