<template>
	<origam-transition :transition="transition">
		<div
				v-if="active"
				:class="scrimClasses"
				:style="scrimStyles"
				v-bind="$attrs"
				@click="handleClick"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave"
		/>
	</origam-transition>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { OrigamFade, OrigamTransition } from '../../components'
	import { useBackgroundColor, useProps } from '../../composables'
	import type { IOverlayScrimProps } from '../../interfaces'
	import type { TTransitionProps } from "../../types"

	const props = withDefaults(defineProps<IOverlayScrimProps>(), {
		transition: () => ({component: OrigamFade}) as unknown as TTransitionProps
	})

	const emits = defineEmits(['click', 'mouseenter', 'mouseleave'])

	const {filterProps} = useProps<IOverlayScrimProps>(props)

	const {backgroundColorStyles} = useBackgroundColor(computed(() => {
		return typeof props.scrim === 'string' ? props.scrim : null
	}))

	const handleClick = (e: Event) => {
		emits('click', e)
	}
	const handleMouseenter = (e: MouseEvent) => {
		emits('mouseenter', e)
	}
	const handleMouseleave = (e: MouseEvent) => {
		emits('mouseleave', e)
	}

	// CLASS & STYLES

	const scrimStyles = computed(() => {
		return [
			backgroundColorStyles.value,
			props.style
		] as StyleValue
	})
	const scrimClasses = computed(() => {
		return [
			'origam-scrim',
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
	.origam-scrim {
		background-color: var(--origam-overlay-scrim---background-color, var(--origam-color-overlay-scrim)); // TODO: rename to color.overlay.backdrop once #arbitration2 resolved
		pointer-events: var(--origam-overlay-scrim---pointer-events, auto);
		border-radius: inherit;
		inset: 0;
		opacity: var(--origam-overlay-scrim---opacity, 0.32);
		position: fixed;
		transition-property: var(--origam-overlay-scrim---transition-property, opacity);
		transition-duration: var(--origam-overlay-scrim---transition-duration, 200ms);
		transition-timing-function: var(--origam-overlay-scrim---transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
	}
</style>
