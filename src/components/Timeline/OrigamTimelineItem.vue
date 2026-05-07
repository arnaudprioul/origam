<template>
	<div :class="itemClasses" :style="itemStyles" role="listitem">
		<div class="origam-timeline-item__track" aria-hidden="true">
			<div class="origam-timeline-item__dot" :style="dotStyles">
				<slot name="dot">
					<origam-icon
						v-if="props.icon"
						:icon="props.icon"
						:size="10"
					/>
				</slot>
			</div>
			<span
				v-if="showConnector"
				class="origam-timeline-item__connector"
				:style="connectorStyles"
			/>
		</div>

		<div class="origam-timeline-item__content">
			<slot name="default">
				<div class="origam-timeline-item__header">
					<span
						v-if="props.title"
						class="origam-timeline-item__title"
					>{{ props.title }}</span>
					<span
						v-if="props.subtitle"
						class="origam-timeline-item__subtitle"
					>{{ props.subtitle }}</span>
				</div>
				<div
					v-if="$slots.body || description"
					class="origam-timeline-item__body"
				>
					<slot name="body">{{ description }}</slot>
				</div>
			</slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, inject } from 'vue'
	import type { StyleValue } from 'vue'

	import { OrigamIcon } from '../../components'
	import { useDensity, useProps, useSize } from '../../composables'
	import type { ITimelineItemProps } from '../../interfaces'

	import { TIMELINE_CONTEXT_KEY } from '../../consts'

	const props = withDefaults(defineProps<ITimelineItemProps & { description?: string }>(), {
		side: 'start',
		isLast: false,
		truncateLine: false,
		index: 0
	})

	// Inject parent context if nested in OrigamTimeline
	const timelineCtx = inject(TIMELINE_CONTEXT_KEY, null)

	const { filterProps } = useProps<ITimelineItemProps>(props)
	const { densityClasses } = useDensity(props)
	const { sizeClasses } = useSize(props)

	const effectiveSide = computed(() => {
		if (timelineCtx?.side) return timelineCtx.side
		return props.side
	})

	const effectiveTruncateLine = computed(() => {
		if (timelineCtx?.truncateLine !== undefined) return timelineCtx.truncateLine
		return props.truncateLine
	})

	const showConnector = computed(() => {
		if (effectiveTruncateLine.value && props.isLast) return false
		return true
	})

	// Resolve which intent to use for the dot
	const resolvedIntent = computed(() => props.intent ?? timelineCtx?.color ?? 'primary')

	const dotStyles = computed(() => {
		const intent = resolvedIntent.value
		const intentBg = intentToBgToken(intent)
		const intentFg = intentToFgToken(intent)
		return {
			'--origam-timeline-item---dot-bg': intentBg,
			'--origam-timeline-item---dot-color': intentFg
		}
	})

	const connectorStyles = computed(() => ({
		'background-color': 'var(--origam-timeline---connector-color, var(--origam-color-border-subtle))',
		'width': 'var(--origam-timeline---connector-thickness, var(--origam-border-width-thin, 1px))'
	}))

	function intentToBgToken(intent: string): string {
		if (intent === 'primary' || intent === 'secondary' || intent === 'ghost' || intent === 'neutral') {
			return `var(--origam-color-action-${intent}-bg, var(--origam-color-action-primary-bg))`
		}
		if (intent === 'success' || intent === 'warning' || intent === 'danger' || intent === 'info') {
			return `var(--origam-color-feedback-${intent}-bg)`
		}
		return 'var(--origam-color-action-primary-bg)'
	}

	function intentToFgToken(intent: string): string {
		if (intent === 'primary' || intent === 'secondary' || intent === 'ghost' || intent === 'neutral') {
			return `var(--origam-color-action-${intent}-fg, var(--origam-color-action-primary-fg))`
		}
		if (intent === 'success' || intent === 'warning' || intent === 'danger' || intent === 'info') {
			return `var(--origam-color-feedback-${intent}-fg)`
		}
		return 'var(--origam-color-action-primary-fg)'
	}

	const contentSide = computed(() => {
		const side = effectiveSide.value
		if (side === 'alternating') {
			return props.index % 2 === 0 ? 'start' : 'end'
		}
		return side
	})

	const itemClasses = computed(() => [
		'origam-timeline-item',
		{
			'origam-timeline-item--side-start': effectiveSide.value === 'start' || contentSide.value === 'start',
			'origam-timeline-item--side-end': effectiveSide.value === 'end' || contentSide.value === 'end',
			'origam-timeline-item--alternating': effectiveSide.value === 'alternating',
			'origam-timeline-item--content-end': contentSide.value === 'end',
			'origam-timeline-item--last': props.isLast
		},
		densityClasses.value,
		sizeClasses.value,
		props.class
	])

	const itemStyles = computed(() => [
		props.style
	] as StyleValue)

	// EXPOSE
	defineExpose({ filterProps })
</script>

<style lang="scss" scoped>
	.origam-timeline-item {
		display: flex;
		flex-direction: row;
		gap: var(--origam-timeline---gap, 14px);
		position: relative;

		&__track {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-shrink: 0;
			width: var(--origam-timeline---track-width, 24px);
			position: relative;
		}

		&__dot {
			width: var(--origam-timeline---dot-size, 12px);
			height: var(--origam-timeline---dot-size, 12px);
			border-radius: 50%;
			background-color: var(--origam-timeline-item---dot-bg, var(--origam-timeline---dot-bg, var(--origam-color-action-primary-bg)));
			color: var(--origam-timeline-item---dot-color, var(--origam-timeline---dot-color, var(--origam-color-action-primary-fg)));
			border: var(--origam-timeline---dot-border-width, 2px) solid var(--origam-timeline---dot-border-color, var(--origam-color-surface-default));
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 0 0 1px var(--origam-color-border-default, var(--origam-color-border-subtle));
			z-index: 1;
			position: relative;
		}

		&__connector {
			flex: 1;
			min-height: 16px;
			width: var(--origam-timeline---connector-thickness, 1px);
			background-color: var(--origam-timeline---connector-color, var(--origam-color-border-subtle));
			margin-top: 4px;
			display: block;
		}

		&__content {
			flex: 1;
			padding-bottom: var(--origam-timeline---gap, 14px);
			padding-top: 0;
		}

		&__header {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			gap: 6px;
		}

		&__title {
			font-size: var(--origam-timeline---title-font-size, var(--origam-font-size-md, 0.875rem));
			font-weight: var(--origam-timeline---title-font-weight, var(--origam-font-weight-semibold, 600));
			font-family: var(--origam-font-family-mono, monospace);
			color: var(--origam-timeline---color, var(--origam-color-text-primary));
			line-height: 1.4;
		}

		&__subtitle {
			font-size: var(--origam-timeline---subtitle-font-size, var(--origam-font-size-sm, 0.75rem));
			color: var(--origam-timeline---subtitle-color, var(--origam-color-text-secondary));
			line-height: 1.4;
		}

		&__body {
			font-size: var(--origam-timeline---subtitle-font-size, var(--origam-font-size-sm, 0.75rem));
			color: var(--origam-timeline---subtitle-color, var(--origam-color-text-secondary));
			margin-top: 4px;
			line-height: 1.5;
		}

		&--content-end {
			flex-direction: row-reverse;

			.origam-timeline-item__content {
				text-align: end;
			}

			.origam-timeline-item__header {
				flex-direction: row-reverse;
			}
		}

		&--last {
			.origam-timeline-item__content {
				padding-bottom: 0;
			}
		}
	}
</style>
