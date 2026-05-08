<template>
	<div
			ref="intersectionRef"
			class="origam-infinite-scroll-intersect"
	>&nbsp;
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { watch } from 'vue'
	import { useIntersectionObserver, useProps } from '../../composables'

	import type { IInfiniteScrollIntersectProps } from '../../interfaces'

	const props = withDefaults(defineProps<IInfiniteScrollIntersectProps>(), {})

	const emits = defineEmits(['intersect'])

	const {filterProps} = useProps<IInfiniteScrollIntersectProps>(props)

	const {intersectionRef, isIntersecting} = useIntersectionObserver(() => {
	}, props.margin ? {rootMargin: props.margin} : undefined)

	watch(isIntersecting, async (val) => {
		emits('intersect', props.side, val)
	})

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		filterProps
	})
</script>
