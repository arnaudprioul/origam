<template>
	<origam-overlay
			:id="id"
			ref="origamOverlayRef"
			v-model="isActive"
			:activator-props="activatorProps"
			:class="tooltipClasses"
			:location="location"
			:origin="origin"
			:style="tooltipStyles"
			:transition="transition"
			absolute
			disable-global-stack
			persistent
			role="tooltip"
			v-bind="{...overlayProps, ...scopeId}"
	>
		<template #activator="{props}">
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default>
			<slot name="default">
				<span>{{ text }}</span>
			</slot>
		</template>
	</origam-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { computed, mergeProps, ref, StyleValue } from 'vue'
	import { OrigamFade, OrigamOverlay, OrigamTranslateScale } from '../../components'

	import { useProps, useScopeId, useVModel } from '../../composables'

	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from '../../enums'

	import type { ITooltipProps } from '../../interfaces'

	import type { TAnchor, TOrigamOverlay } from '../../types'

	import { forwardRefs, getUid } from '../../utils'

	const props = withDefaults(defineProps<ITooltipProps>(), {
		closeOnBack: false,
		location: INLINE.RIGHT,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		eager: true,
		minWidth: 0,
		offset: 10,
		openOnClick: false,
		openOnHover: true,
		origin: 'auto',
		scrim: false,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		transition: false
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ITooltipProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()

	const uid = getUid()
	const id = computed(() => props.id || `origam-tooltip-${uid}`)

	const origamOverlayRef = ref<TOrigamOverlay>()

	const location = computed(() => {
		return props.location.split(' ').length > 1
				? props.location
				: props.location + ' center' as TAnchor
	})

	const origin = computed(() => {
		return (
				props.origin === 'auto' ||
				props.origin === 'overlap' ||
				props.origin.split(' ').length > 1 ||
				props.location.split(' ').length > 1
		) ? props.origin
				: props.origin + ' center' as TAnchor | 'auto' | 'overlap'
	})

	const transition = computed(() => {
		if (props.transition) return props.transition
		return {component: isActive.value ? OrigamTranslateScale : OrigamFade}
	})

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-describedby': id.value
		}, props.activatorProps)
	})

	const overlayProps = computed(() => {
		return origamOverlayRef.value?.filterProps(props, ['activatorProps', 'class', 'style', 'modelValue', 'location', 'origin', 'transition', 'disableGlobalStack', 'absolute', 'persistent', 'id'])
	})

	// CLASS & STYLES

	const tooltipStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const tooltipClasses = computed(() => {
		return [
			'origam-tooltip',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, origamOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-tooltip {
		background-color: var(--origam-tooltip---background-color, var(--origam-color-neutral-800));
		color: var(--origam-tooltip---color, var(--origam-color-text-inverse));
		font-size: var(--origam-tooltip---font-size, 0.75rem);
		font-weight: var(--origam-tooltip---font-weight, 500);
		line-height: var(--origam-tooltip---line-height, 1.5);
		padding-block: var(--origam-tooltip---padding-block, 4px);
		padding-inline: var(--origam-tooltip---padding-inline, 8px);
		border-radius: var(--origam-tooltip---border-radius, 4px);
		z-index: var(--origam-tooltip---z-index, 1070);
		max-width: var(--origam-tooltip---max-width, 300px);
		opacity: var(--origam-tooltip---opacity, 1);
	}
</style>
