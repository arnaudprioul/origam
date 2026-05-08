<template>
	<template v-if="!props.loading">
		<slot/>
	</template>

	<div
			v-else-if="props.variant === 'list-item'"
			:class="skeletonContainerClasses"
			:style="skeletonContainerStyles"
			aria-busy="true"
			aria-label="Loading"
			role="status"
	>
		<div
				:class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--circular']"
				:style="circularStyle"
		/>
		<div class="origam-skeleton__lines">
			<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--text']"/>
			<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--text']"/>
		</div>
	</div>

	<div
			v-else-if="props.variant === 'card'"
			:class="skeletonContainerClasses"
			:style="skeletonContainerStyles"
			aria-busy="true"
			aria-label="Loading"
			role="status"
	>
		<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--rectangular']"/>
		<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--text']"/>
		<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--text']"/>
		<div :class="['origam-skeleton', { 'origam-skeleton--pulse': props.pulse }, 'origam-skeleton--text']"/>
	</div>

	<div
			v-else
			:class="skeletonClasses"
			:style="skeletonStyles"
			aria-busy="true"
			aria-label="Loading"
			role="status"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useBothColor, useProps, useRounded, useSize } from '../../composables'
	import type { ISkeletonProps } from '../../interfaces'
	import { convertToUnit } from '../../utils'
	import { computed, toRef } from 'vue'
	import type { StyleValue } from 'vue'

	const props = withDefaults(defineProps<ISkeletonProps>(), {
		variant: 'rectangular',
		loading: true,
		pulse: true
	})

	const {filterProps} = useProps<ISkeletonProps>(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	// Phase 3 (Vague D) — class-first companion alongside inline styles.
	const {colorClasses, colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	// ── Resolve width / height to CSS strings ──────────────────────────────
	const resolvedWidth = computed(() => {
		if (props.variant === 'text' && props.width == null) return '100%'
		return props.width != null ? convertToUnit(props.width) : undefined
	})

	const resolvedHeight = computed(() => {
		if (props.variant === 'text') {
			return props.height != null ? convertToUnit(props.height) : 'var(--origam-skeleton---text-height)'
		}
		if (props.variant === 'circular') {
			// height mirrors width for circles
			return props.width != null ? convertToUnit(props.width) : undefined
		}
		return props.height != null ? convertToUnit(props.height) : undefined
	})

	// ── For circular, expose as a sub-style so the preset wrappers can use it ──
	const circularSize = computed(() => props.width != null ? convertToUnit(props.width) : '36px')
	const circularStyle = computed(() => ({
		width: circularSize.value,
		height: circularSize.value
	}))

	// ── Composite-variant container ────────────────────────────────────────
	const skeletonContainerClasses = computed(() => [
		'origam-skeleton-wrapper',
		`origam-skeleton-wrapper--${props.variant}`,
		props.class
	])

	const skeletonContainerStyles = computed<StyleValue>(() => [
		props.style
	])

	// ── Single-block classes & styles ──────────────────────────────────────
	const skeletonClasses = computed(() => [
		'origam-skeleton',
		`origam-skeleton--${props.variant}`,
		{'origam-skeleton--pulse': props.pulse},
		colorClasses.value,
		roundedClasses.value,
		sizeClasses.value,
		props.class
	])

	const skeletonStyles = computed<StyleValue>(() => {
		const styles: Record<string, string | undefined> = {}

		if (resolvedWidth.value) styles['width'] = resolvedWidth.value
		if (resolvedHeight.value) styles['height'] = resolvedHeight.value

		return [styles, colorStyles.value, roundedStyles.value, sizeStyles.value, props.style]
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
	@keyframes origam-skeleton-pulse {
		0%   { opacity: var(--origam-skeleton---opacity-min, 0.4) }
		50%  { opacity: var(--origam-skeleton---opacity-max, 0.8) }
		100% { opacity: var(--origam-skeleton---opacity-min, 0.4) }
	}

	.origam-skeleton {
		display: block;
		background-color: var(--origam-skeleton---background-color);
		border-radius: var(--origam-skeleton---border-radius);
		width: 100%;
		height: var(--origam-skeleton---text-height);

		&--pulse {
			animation: origam-skeleton-pulse var(--origam-skeleton---animation-duration, 1500ms) ease-in-out infinite;
		}

		&--text {
			height: var(--origam-skeleton---text-height);
			border-radius: var(--origam-skeleton---border-radius);
		}

		&--rectangular {
			border-radius: var(--origam-skeleton---border-radius);
			height: 100%;
		}

		&--circular {
			border-radius: var(--origam-skeleton---border-radius-circular, 50%);
			flex-shrink: 0;
		}

		&--card,
		&--list-item {
			display: none;
		}
	}

	.origam-skeleton-wrapper {
		&--list-item {
			display: flex;
			gap: var(--origam-skeleton---gap, 12px);
			align-items: center;

			> .origam-skeleton--circular {
				flex-shrink: 0;
			}

			> .origam-skeleton__lines {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 6px;

				> .origam-skeleton:nth-child(1) {
					width: 60%;
				}

				> .origam-skeleton:nth-child(2) {
					width: 40%;
					opacity: 0.7;
				}
			}
		}

		&--card {
			display: flex;
			flex-direction: column;

			> .origam-skeleton:nth-child(1) {
				height: 80px;
				margin-bottom: 10px;
			}

			> .origam-skeleton:nth-child(2) {
				width: 70%;
				margin-bottom: 6px;
			}

			> .origam-skeleton:nth-child(3) {
				width: 90%;
				margin-bottom: 4px;
				opacity: 0.7;
			}

			> .origam-skeleton:nth-child(4) {
				width: 50%;
				opacity: 0.7;
			}
		}
	}
</style>
