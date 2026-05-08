<template>
	<component
			:is="tag"
			:class="activatorClasses"
			:style="activatorStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useNestedGroupActivator, useProps } from '../../composables'

	import type { IListActivatorProps } from '../../interfaces'

	const props = withDefaults(defineProps<IListActivatorProps>(), {tag: 'div'})

	const {filterProps} = useProps<IListActivatorProps>(props)

	useNestedGroupActivator()

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const activatorStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const activatorClasses = computed(() => {
		return [
			'origam-list-group-activator',
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		filterProps
	})
</script>
