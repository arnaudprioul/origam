<template>
	<component
			:is="tag"
			ref="root"
			:class="progressCircularClasses"
			:style="progressCircularStyles"
	>
		<svg
				:style="svgStyles"
				:viewBox="svgViewBox"
				xmlns="http://www.w3.org/2000/svg"
		>
			<circle
					:r="MAGIC_RADIUS"
					:class="['origam-progress__underlay', backgroundColorClasses]"
					:stroke-dasharray="CIRCUMFERENCE"
					:stroke-width="strokeWidth"
					:style="backgroundStyles"
					cx="50%"
					cy="50%"
					fill="transparent"
					stroke-dashoffset="0"
			/>

			<circle
					:r="MAGIC_RADIUS"
					:class="['origam-progress__overlay', loaderColorClasses]"
					:stroke-dasharray="CIRCUMFERENCE"
					:stroke-dashoffset="strokeDashOffset"
					:stroke-width="strokeWidth"
					:style="loaderStyles"
					cx="50%"
					cy="50%"
					fill="transparent"
			/>
		</svg>

		<div
				v-if="hasContent"
				class="origam-progress__content"
		>
			<slot
					name="default"
					v-bind="{ value: normalizedValue }"
			/>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, toRef, watchEffect } from 'vue'
	import {
		useIntersectionObserver,
		useProgress,
		useProps,
		useResizeObserver,
		useSize,
		useTextColor
	} from '../../composables'

	import { CIRCUMFERENCE, MAGIC_RADIUS } from '../../consts'

	import type { IProgressCircularProps } from '../../interfaces'

	import { convertToUnit } from '../../utils'

	import { SIZES } from '../../enums'

	// Default size to `SIZES.DEFAULT` so the SCSS rule
	// `.origam-progress--circular.origam-progress--size-default { width: 32px; height: 32px }`
	// pins a width/height — without this the SVG (position: absolute) collapses
	// to 0×0 and the component renders invisible.
	const props = withDefaults(defineProps<IProgressCircularProps>(), {
		tag: 'div',
		modelValue: 0,
		max: 100,
		thickness: 4,
		size: SIZES.DEFAULT
	})

	const {filterProps} = useProps<IProgressCircularProps>(props)

	const {progressClasses, progressStyles, normalizedValue, thickness, hasContent} = useProgress(props)
	const {resizeRef, contentRect} = useResizeObserver()
	const {intersectionRef} = useIntersectionObserver()
	// Pass an explicit name so `useSize` emits `origam-progress--size-{size}`,
	// matching the SCSS rule `.origam-progress--circular.origam-progress--size-x` —
	// otherwise the class would be `origam-progress-circular--size-x` and the
	// pinned width/height would never apply (resulting in a 0×0 SVG).
	const {sizeStyles, sizeClasses} = useSize(props, 'origam-progress')
	const {textColorStyles: backgroundColorStyles, textColorClasses: backgroundColorClasses} = useTextColor(toRef(props, 'bgColor'))
	const {textColorStyles: loaderColorStyles, textColorClasses: loaderColorClasses} = useTextColor(toRef(props, 'color'))

	const root = ref<HTMLElement>()

	const size = computed(() => {
		// Get size from element if size prop value is small, large etc
		if (sizeStyles.value.length) {
			return Number(props.size)
		}

		if (contentRect.value) {
			return contentRect.value.width
		}

		return Math.max(thickness.value, 32)
	})
	const diameter = computed(() => {
		return (MAGIC_RADIUS / (1 - thickness.value / size.value)) * 2
	})
	const strokeWidth = computed(() => {
		return thickness.value / size.value * diameter.value
	})
	const strokeDashOffset = computed(() => {
		return convertToUnit(((100 - normalizedValue.value) / 100) * CIRCUMFERENCE)
	})
	const svgViewBox = computed(() => {
		return `0 0 ${diameter.value} ${diameter.value}`
	})

	watchEffect(() => {
		intersectionRef.value = root.value
		resizeRef.value = root.value
	})

	// CLASS & STYLES

	const progressCircularStyles = computed(() => {
		return [
			progressStyles.value,
			props.style
		] as StyleValue
	})
	const progressCircularClasses = computed(() => {
		return [
			`origam-progress--circular`,
			sizeClasses.value,
			progressClasses.value,
			props.class
		]
	})
	const svgStyles = computed(() => {
		return [`transform: rotate(calc(-90deg + ${Number(props.rotate)}deg))`]
	})
	const backgroundStyles = computed(() => {
		return [
			backgroundColorStyles.value
		]
	})
	const loaderStyles = computed(() => {
		return [
			loaderColorStyles.value
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
	// TODO - use css variables
	.origam-progress {
		$this: &;

		&--circular {
			align-items: center;
			display: inline-flex;
			justify-content: center;
			position: relative;
			vertical-align: middle;

			> svg {
				width: 100%;
				height: 100%;
				margin: auto;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 0;
			}

			#{$this}__content {
				align-items: center;
				display: flex;
				justify-content: center;
			}

			#{$this}__underlay {
				color: var(--origam-progress-circular__underlay---color, var(--origam-color-surface-disabled));
				stroke: currentColor;
				opacity: var(--origam-progress-circular__underlay---opacity, 0.5);
				z-index: 1;
			}

			#{$this}__overlay {
				color: var(--origam-progress-circular__overlay---color, inherit);
				stroke: currentColor;
				transition: all var(--origam-progress-circular---transition-duration, 0.2s) var(--origam-progress-circular---transition-easing, ease-in-out), stroke-width 0s;
				z-index: 2;
			}

			&#{$this}--size-x-small {
				height: 16px;
				width: 16px;
			}

			&#{$this}--size-small {
				height: 24px;
				width: 24px;
			}

			&#{$this}--size-default {
				height: 32px;
				width: 32px;
			}

			&#{$this}--size-large {
				height: 48px;
				width: 48px;
			}

			&#{$this}--size-x-large {
				height: 64px;
				width: 64px;
			}

			&#{$this}--indeterminate {
				> svg {
					animation: progress-circular-rotate 1.4s linear infinite;
					transform-origin: center center;
					transition: all 0.2s ease-in-out;
				}

				#{$this}__overlay {
					animation: progress-circular-dash 1.4s ease-in-out infinite, progress-circular-rotate 1.4s linear infinite;
					stroke-dasharray: 25, 200;
					stroke-dashoffset: 0;
					stroke-linecap: round;
					transform-origin: center center;
					transform: rotate(-90deg);
				}
			}
		}
	}

	@keyframes progress-circular-dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0px;
		}
		50% {
			stroke-dasharray: 100, 200;
			stroke-dashoffset: -15px;
		}
		100% {
			stroke-dasharray: 100, 200;
			stroke-dashoffset: -124px;
		}
	}

	@keyframes progress-circular-rotate {
		100% {
			transform: rotate(270deg);
		}
	}
</style>
