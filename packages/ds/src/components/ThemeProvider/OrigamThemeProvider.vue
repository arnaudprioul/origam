<template>
	<component
			:is="tag"
			:class="themeProviderClasses"
			:data-theme="dataTheme"
			:data-mode="dataMode"
	>
		<slot/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, useAttrs } from 'vue'
	import type { TMode, TTheme } from '../../types'

	defineOptions({ inheritAttrs: false })

	interface Props {
		/**
		 * Theme (brand) to apply to this sub-tree. Children that read CSS vars
		 * resolve them against this `data-theme` instead of the document root.
		 *
		 * Use `'auto'` to defer to the closest ancestor (no `data-theme`
		 * attribute is rendered).
		 */
		theme?: TTheme
		/**
		 * Color mode to force on this sub-tree, applied as `data-mode`.
		 * Orthogonal to `theme`: a branded sub-tree can be pinned to light
		 * or dark independently of the document mode.
		 *
		 * Use `'auto'` to defer to the closest ancestor (no `data-mode`
		 * attribute is rendered).
		 */
		mode?: TMode
		/**
		 * HTML tag for the wrapper. Default `div`. Use `section`/`article`/etc.
		 * when the wrapper carries semantic meaning.
		 */
		tag?: string
	}

	/*********************************************************
	 * Global
	 ********************************************************/

	const props = withDefaults(defineProps<Props>(), {
		theme: 'auto',
		mode: 'auto',
		tag: 'div'
	})

	const attrs = useAttrs()

	const dataTheme = computed(() => (props.theme === 'auto' ? undefined : props.theme))
	const dataMode = computed(() => (props.mode === 'auto' ? undefined : props.mode))
	const themeProviderClasses = computed(() => {
		return ['origam-theme-provider', attrs.class]
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-theme-provider {
		display: contents;
	}
</style>
