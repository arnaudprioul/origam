<template>
	<Story
			group="components"
			title="Timeline/OrigamTimelineItem"
	>
		<!--
			Note: <origam-timeline-item> is a sub-component of <origam-timeline>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-timeline data-cy="origam-timeline-item-default-parent">
				<origam-timeline-item data-cy="origam-timeline-item-default"/>
			</origam-timeline>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITimelineItemProps>({ title: '', subtitle: '', isLast: false, truncateLine: false, side: undefined, index: 0 })"
		>
			<template #default="{ state }">
			<origam-timeline data-cy="origam-timeline-item-playground-parent">
				<origam-timeline-item v-bind="state" data-cy="origam-timeline-item-playground"/>
			</origam-timeline>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
				<HstText v-model="state.subtitle" title="subtitle"/>
				<HstCheckbox v-model="state.isLast" title="isLast"/>
				<HstCheckbox v-model="state.truncateLine" title="truncateLine"/>
				<HstSelect v-model="state.side" title="side" :options="[{ label: 'start', value: 'start' }, { label: 'end', value: 'end' }, { label: 'alternating', value: 'alternating' }]"/>
				<HstNumber v-model="state.index" title="index"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTimelineItem, OrigamTimeline } from '@origam/components'
	import type { ITimelineItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Timeline/OrigamTimelineItem.md"/>
