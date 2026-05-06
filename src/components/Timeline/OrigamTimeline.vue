<template>
	<component
		:is="tag || 'div'"
		:class="timelineClasses"
		:style="timelineStyles"
		role="list"
		:aria-label="ariaLabel"
	>
		<slot name="default">
			<origam-timeline-item
				v-for="(entry, index) in props.items"
				:key="index"
				:title="entry.title"
				:subtitle="entry.subtitle"
				:description="entry.description"
				:icon="entry.icon"
				:intent="entry.intent"
				:is-last="index === props.items!.length - 1"
				:truncate-line="props.truncateLine ?? false"
				:side="props.side ?? 'start'"
				:index="index"
				:data-cy="`timeline-item-${index}`"
			/>
		</slot>
	</component>
</template>

<script lang="ts" setup>
	import { computed, provide } from 'vue'
	import type { StyleValue } from 'vue'

	import { OrigamTimelineItem } from '../../components'
	import { useDensity, useProps, useSize } from '../../composables'
	import type { ITimelineProps } from '../../interfaces'
	import { TIMELINE_CONTEXT_KEY } from '../../consts'

	interface ITimelinePropsWithTag extends ITimelineProps {
		tag?: string
		ariaLabel?: string
	}

	const props = withDefaults(defineProps<ITimelinePropsWithTag>(), {
		side: 'start',
		truncateLine: false,
		tag: 'div'
	})

	const { filterProps } = useProps<ITimelinePropsWithTag>(props)
	const { densityClasses } = useDensity(props)
	const { sizeClasses } = useSize(props)

	// Provide context to nested OrigamTimelineItem children
	provide(TIMELINE_CONTEXT_KEY, {
		get side() { return props.side ?? 'start' },
		get truncateLine() { return props.truncateLine ?? false },
		get color() {
			const c = props.color
			return typeof c === 'string' ? c : undefined
		}
	})

	const timelineClasses = computed(() => [
		'origam-timeline',
		{
			[`origam-timeline--side-${props.side}`]: !!props.side,
			'origam-timeline--truncate-line': props.truncateLine
		},
		densityClasses.value,
		sizeClasses.value,
		props.class
	])

	const timelineStyles = computed(() => [
		props.style
	] as StyleValue)

	// EXPOSE
	defineExpose({ filterProps })
</script>

<style lang="scss" scoped>
	.origam-timeline {
		display: flex;
		flex-direction: column;
		background-color: var(--origam-timeline---background-color, var(--origam-color-surface-default));
		color: var(--origam-timeline---color, var(--origam-color-text-primary));
		padding-block: var(--origam-timeline---padding-block, 8px);
		padding-inline: var(--origam-timeline---padding-inline, 16px);
	}
</style>
