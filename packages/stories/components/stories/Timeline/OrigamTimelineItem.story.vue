<template>
	<Story
			group="components"
			title="Timeline/OrigamTimelineItem"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ITimelineItemProps>>({ intent: 'primary', color: undefined, icon: undefined, side: 'start', orientation: 'vertical' })"
		>
			<template #default="{ state }">
				<origam-timeline :side="state.side">
					<origam-timeline-item
							title="Step 1"
							subtitle="Subtitle"
							description="Design variant — adjust props on the right."
							:intent="state.intent"
							:color="state.color"
							:icon="state.icon || undefined"
							:side="state.side"
							:orientation="state.orientation"
					/>
					<origam-timeline-item
							title="Step 2"
							subtitle="Second"
							description="Second item for context."
							:intent="state.intent"
							:color="state.color"
							:icon="state.icon || undefined"
							:side="state.side"
							:orientation="state.orientation"
							:is-last="true"
					/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Intent">
					<HstSelect v-model="state.intent" title="Intent" :options="INTENT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.icon" title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.side"        title="Side"        :options="SIDE_OPTIONS"/>
					<HstSelect v-model="state.orientation" title="Orientation" :options="ORIENTATION_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ITimelineItemProps> & { description: string }>({ title: 'Step', subtitle: 'Subtitle', description: 'Description text', isLast: false, truncateLine: false, index: 0 })"
		>
			<template #default="{ state }">
				<origam-timeline>
					<origam-timeline-item
							:title="state.title"
							:subtitle="state.subtitle"
							:description="state.description"
							:is-last="state.isLast"
							:truncate-line="state.truncateLine"
							:index="state.index"
							intent="primary"
					/>
					<origam-timeline-item
							v-if="!state.isLast"
							title="Next step"
							subtitle="Next"
							description="Subsequent item."
							intent="neutral"
							:is-last="true"
							:truncate-line="state.truncateLine"
							:index="1"
					/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title"       title="Title"/>
					<HstText v-model="state.subtitle"    title="Subtitle"/>
					<HstText v-model="state.description" title="Description"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.isLast"       title="Is Last"/>
					<HstCheckbox v-model="state.truncateLine" title="Truncate Line"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstNumber v-model="state.index" title="Index" :min="0"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-timeline>
				<origam-timeline-item intent="primary">
					<template #default>
						<div style="display: flex; gap: 8px; align-items: baseline;">
							<strong style="font-size: 1.05rem;">v1.0.0</strong>
							<small style="color: var(--origam-color__text---secondary);">May 5, 2026</small>
						</div>
						<p style="margin: 4px 0 0; font-size: 0.875rem;">
							Custom-rendered content via the <code>default</code> slot.
						</p>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant title="Slots - Body">
			<origam-timeline>
				<origam-timeline-item
						title="v0.9-rc"
						subtitle="Apr 28"
						intent="success"
				>
					<template #body>
						<ul style="margin: 0; padding-left: 16px; font-size: 0.75rem;">
							<li>API surface frozen</li>
							<li>240 components shipped</li>
							<li>Token coverage at 100%</li>
						</ul>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant title="Slots - Dot">
			<origam-timeline>
				<origam-timeline-item
						title="Custom dot"
						subtitle="Star indicator"
						intent="warning"
				>
					<template #dot>
						<origam-icon :icon="starIcon" :size="14" style="color: white;"/>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITimelineItemProps & { description: string }>({
					title: 'Step',
					subtitle: 'Subtitle',
					description: 'Playground item — bind any prop on the right.',
					intent: 'primary',
					side: 'start',
					orientation: 'vertical',
					isLast: false,
					truncateLine: false,
					index: 0,
				})"
		>
			<template #default="{ state }">
				<origam-timeline :side="state.side">
					<origam-timeline-item v-bind="state"/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.title"       title="Title"/>
					<HstText   v-model="state.subtitle"    title="Subtitle"/>
					<HstText   v-model="state.description" title="Description"/>
					<HstSelect v-model="state.icon"        title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.intent"      title="Intent"      :options="INTENT_OPTIONS"/>
					<HstSelect v-model="state.color"       title="Color"       :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.side"        title="Side"        :options="SIDE_OPTIONS"/>
					<HstSelect v-model="state.orientation" title="Orientation" :options="ORIENTATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.isLast"       title="Is Last"/>
					<HstCheckbox v-model="state.truncateLine" title="Truncate Line"/>
					<HstNumber   v-model="state.index"        title="Index" :min="0"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon, OrigamTimeline, OrigamTimelineItem } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ITimelineItemProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ICON_OPTIONS,
		INTENT_OPTIONS,
	} from '@stories/const'

	const starIcon = MDI_ICONS.STAR

	const SIDE_OPTIONS = [
		{ label: 'start',       value: 'start' },
		{ label: 'end',         value: 'end' },
		{ label: 'alternating', value: 'alternating' },
	]

	const ORIENTATION_OPTIONS = [
		{ label: 'vertical',   value: 'vertical' },
		{ label: 'horizontal', value: 'horizontal' },
	]
</script>

<docs lang="md" src="@docs/components/Timeline/OrigamTimelineItem.md"/>
