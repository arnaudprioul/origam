<template>
	<!-- When not loading, render the slot content instead -->
	<template v-if="!props.loading">
		<slot/>
	</template>

	<!-- list-item: circular avatar + 2 text lines -->
	<div
			v-else-if="props.variant === 'list-item'"
			:class="skeletonContainerClasses"
			:style="skeletonContainerStyles"
			aria-busy="true"
			aria-label="Loading"
			role="status"
	>
		<div
				:class="[...skeletonBaseClasses, `${NAME}--circular`]"
				:style="circularStyle"
		/>
		<div :class="`${NAME}__lines`">
			<div
					:class="[...skeletonBaseClasses, `${NAME}--text`]"
					:style="{ width: '60%' }"
			/>
			<div
					:class="[...skeletonBaseClasses, `${NAME}--text`]"
					:style="{ width: '40%', opacity: 0.7 }"
			/>
		</div>
	</div>

	<!-- card: image rectangle + 3 text lines -->
	<div
			v-else-if="props.variant === 'card'"
			:class="skeletonContainerClasses"
			:style="skeletonContainerStyles"
			aria-busy="true"
			aria-label="Loading"
			role="status"
	>
		<div
				:class="[...skeletonBaseClasses, `${NAME}--rectangular`]"
				:style="{ height: '80px', marginBottom: '10px' }"
		/>
		<div
				:class="[...skeletonBaseClasses, `${NAME}--text`]"
				:style="{ width: '70%', marginBottom: '6px' }"
		/>
		<div
				:class="[...skeletonBaseClasses, `${NAME}--text`]"
				:style="{ width: '90%', marginBottom: '4px', opacity: 0.7 }"
		/>
		<div
				:class="[...skeletonBaseClasses, `${NAME}--text`]"
				:style="{ width: '50%', opacity: 0.7 }"
		/>
	</div>

	<!-- default: single skeleton block -->
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
	import { useProps, useRounded, useSize } from '../../composables'
	import type { ISkeletonProps } from '../../interfaces'
	import { convertToUnit } from '../../utils'
	import { computed } from 'vue'

	const NAME = 'origam-skeleton'

	const props = withDefaults(defineProps<ISkeletonProps>(), {
		variant: 'rectangular',
		loading: true,
		pulse: true
	})

	const {filterProps} = useProps<ISkeletonProps>(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {sizeClasses, sizeStyles} = useSize(props)

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

	// ── Base classes for inner elements of composite variants (card, list-item).
	// Variant class is appended by each call-site in the template.
	const skeletonBaseClasses = computed(() => [
		NAME,
		{[`${NAME}--pulse`]: props.pulse}
	])

	// ── Composite-variant container ────────────────────────────────────────
	const skeletonContainerClasses = computed(() => [
		`${NAME}-wrapper`,
		`${NAME}-wrapper--${props.variant}`,
		props.class
	])

	const skeletonContainerStyles = computed(() => [
		props.style
	])

	// ── Single-block classes & styles ──────────────────────────────────────
	const skeletonClasses = computed(() => [
		NAME,
		`${NAME}--${props.variant}`,
		{[`${NAME}--pulse`]: props.pulse},
		roundedClasses.value,
		sizeClasses.value,
		props.class
	])

	const skeletonStyles = computed(() => {
		const styles: Record<string, string | undefined> = {}

		if (props.bgColor) {
			// Pass through a CSS var override for custom bg color intent
			styles['--origam-skeleton---background-color'] = `var(--origam-color-action-${props.bgColor}-bg, ${props.bgColor})`
		}

		if (resolvedWidth.value) styles['width'] = resolvedWidth.value
		if (resolvedHeight.value) styles['height'] = resolvedHeight.value

		return [styles, roundedStyles.value, sizeStyles.value, props.style]
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
		$this: &;

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
			// width & height are set via inline style for circular
			flex-shrink: 0;
		}

		&--card,
		&--list-item {
			// composite variants — rendered by wrapper, not this class
			display: none;
		}
	}

	.origam-skeleton-wrapper {
		&--list-item {
			display: flex;
			gap: 12px;
			align-items: center;

			.origam-skeleton__lines {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 6px;
			}
		}

		&--card {
			display: flex;
			flex-direction: column;
		}
	}
</style>
