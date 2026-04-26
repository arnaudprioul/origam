<template>
	<component
			:is="tag"
			:class="loaderClasses"
			:style="loaderStyles"
	>
		<template v-if="isLoading">
			<!--
				Mirror of OptimusLoader: the `__progress` class lives on the
				default spinner directly (no wrapper) so consumers replacing
				`#loader` get a clean slot without an extra DOM node.
			-->
			<slot name="loader">
				<origam-progress
						:color="color"
						:size="23"
						:type="PROGRESS_TYPE.CIRCULAR"
						:width="2"
						class="origam-loader__progress"
						indeterminate
				/>
			</slot>
		</template>
		<template v-else>
			<slot name="default"/>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { OrigamProgress } from '../../components'
	import { useProps } from "../../composables"

	import { PROGRESS_TYPE } from '../../enums'

	import type { ILoaderProps } from '../../interfaces'

	const props = withDefaults(defineProps<ILoaderProps>(), {tag: 'span'})

	const {filterProps} = useProps<ILoaderProps>(props)

	const isLoading = computed(() => {
		return !!props.loading
	})

	// CLASS & STYLES

	const loaderStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const loaderClasses = computed(() => {
		return [
			'origam-loader',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<!--
	Restored scoped style block (mirrors OptimusLoader exactly). Only sets
	the wrapper height + the progress margin: NO display rule, so the host
	(e.g. OrigamBtn `__loader`) keeps full control of the layout
	(grid/flex) without specificity tug-of-war.
-->
<style
		lang="scss"
		scoped
>
	.origam-loader {
		height: var(--origam-loader---height, 100%);

		&--fullscreen {
			position: var(--origam-loader__fullscreen---position, fixed);
			top: var(--origam-loader__fullscreen---top, 0);
			left: var(--origam-loader__fullscreen---left, 0);
			height: var(--origam-loader__fullscreen---height, 100vh);
			width: var(--origam-loader__fullscreen---width, 100vw);
		}

		&__progress {
			margin: var(--origam-loader__progress---margin, auto);
		}
	}
</style>
