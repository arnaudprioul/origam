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
	import {
	useCreateLayout,
	useProps,
	useStyle
} from '../../composables'

	import type { ILayoutProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, layout composable and template ref wiring.
	 ********************************************************/

	const props = withDefaults(defineProps<ILayoutProps>(), {})

	const {filterProps} = useProps<ILayoutProps>(props)

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {layoutClasses, layoutStyles, layoutRef: origamLayoutRef, getLayoutItem, items, layoutId} = useCreateLayout(props)

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Root element classes and inline styles. `layoutStyles` from
	 * useCreateLayout emits the `--origam-layout---position-{left,right,
	 * top,bottom}` CSS custom properties that reflect the reserved-space
	 * each registered layout item (drawer, bottom nav, system bar, …)
	 * carved out of the layout. Descendants (toolbar, main, footer)
	 * inherit them and offset themselves accordingly — that's the "push
	 * content" behaviour. Without binding them onto the root, drawers
	 * register their width but main / toolbar never receive the offset.
	 ********************************************************/

	const layStyles = computed(() => {
		return [layoutStyles.value, props.style] as StyleValue
	})
	const layClasses = computed(() => {
		return [layoutClasses.value, props.class]
	})
	const {id, css, load, isLoaded, unload} = useStyle(layStyles)


	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent components.
	 ********************************************************/

	defineExpose({
		getLayoutItem,
		items,
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-layout {
		// position: relative makes this the containing block for any
		// position:absolute / position:relative descendants (drawer,
		// scrim, …) so their `height: 100 %` resolves against the
		// layout — NOT the viewport.
		position: relative;

		// `height: 100 %` so the layout inherits its parent's bounds
		// (typical consumer wraps OrigamApp in a fixed-height container
		// — story divs, Tauri windows, embedded dashboards …). Without
		// this, the layout collapses to its content height, and the
		// drawer's `height: 100 %` can't compute a meaningful value.
		height: 100%;
		width: 100%;

		&__wrapper {
			width: 100%;
			// `height: 100 %` (not just `max-height`) so nested drawers
			// in `height: 100 %` measure against the wrapper, not the
			// viewport. Without this, the drawer inflated to 100 vh and
			// overflowed any story / consumer container with a fixed
			// height ("le drawer dépasse de son layout").
			height: 100%;
			max-height: 100%;
			max-width: 100%;
		}

		&--full-height &__wrapper {
			width: 100vw;
			height: 100vh;
		}
	}
</style>

