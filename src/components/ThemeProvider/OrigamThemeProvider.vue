<template>
	<component
			:is="tag"
			:class="['origam-theme-provider', $attrs.class]"
			:data-theme="dataTheme"
	>
		<slot/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed } from 'vue'
	import type { TTheme } from '../../types'

	defineOptions({ inheritAttrs: false })

	interface Props {
		/**
		 * Theme to apply to this sub-tree. Children that read CSS vars
		 * resolve them against this `data-theme` instead of the document root.
		 *
		 * Use `'auto'` to defer to the closest ancestor (no `data-theme`
		 * attribute is rendered).
		 */
		theme?: TTheme
		/**
		 * HTML tag for the wrapper. Default `div`. Use `section`/`article`/etc.
		 * when the wrapper carries semantic meaning.
		 */
		tag?: string
	}

	const props = withDefaults(defineProps<Props>(), {
		theme: 'auto',
		tag: 'div'
	})

	const dataTheme = computed(() => (props.theme === 'auto' ? undefined : props.theme))
</script>

<style
		lang="scss"
		scoped
>
	.origam-theme-provider {
		display: contents;
	}
</style>
