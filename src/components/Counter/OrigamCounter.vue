<template>
	<origam-transition
			:disabled="!isBooted"
			:transition="transition"
	>
		<component
				:is="tag"
				v-show="active"
				:class="counterClasses"
				:style="counterStyles"
		>
			<slot
					name="default"
					v-bind="{ counter, max: props.max, value: props.value}"
			>
				{{ counter }}
			</slot>
		</component>
	</origam-transition>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSlideY, OrigamTransition } from "../../components"

	import { useBothColor, useProps, useSsrBoot } from "../../composables"

	import type { ICounterProps } from "../../interfaces"
	import type { TTransitionProps } from "../../types"

	import { computed, StyleValue, toRef } from "vue"

	const props = withDefaults(defineProps<ICounterProps>(), {
		value: 0,
		tag: 'div',
		transition: () => ({component: OrigamSlideY}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<ICounterProps>(props)

	// `useBothColor` produces inline `color: …` and `background-color: …`
	// declarations from intent props. ICounterProps already extends
	// IColorProps but the component never consumed it — `<origam-counter
	// color="primary">` was a silent no-op despite the type system
	// promising otherwise. Audit-fix.
	// Phase 3 (Vague D) — class-first companion alongside inline styles.
	const {colorClasses, colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const {isBooted} = useSsrBoot()

	const counter = computed(() => {
		return props.max ? `${props.value} / ${props.max}` : String(props.value)
	})

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const counterStyles = computed(() => {
		return [
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const counterClasses = computed(() => {
		return [
			'origam-counter',
			{
				'origam-counter--error': props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
			},
			colorClasses.value,
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

<style
		lang="scss"
		scoped
>
	.origam-counter {
		color: currentColor;
		flex: 0 1 auto;
		font-size: 12px;
		transition-duration: 150ms;
	}
</style>

