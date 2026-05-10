<template>
	<Story
			group="components"
			title="Timeline/OrigamTimelineItem"
	>

		<!--
			Note: <origam-timeline-item> renders best inside <origam-timeline>
			(side / truncateLine come via inject), but it can also be used
			standalone with its own props. Each Variant shows the relevant
			usage form.
		-->

		<Variant title="Default (inside Timeline)">
			<origam-timeline data-cy="timeline-item-default-parent">
				<origam-timeline-item
						title="v1.0.0"
						subtitle="May 5, 2026"
						description="Stable release · 240 components"
						intent="primary"
						data-cy="timeline-item-default"
				/>
			</origam-timeline>
		</Variant>

		<Variant title="With icon">
			<origam-timeline>
				<origam-timeline-item
						title="Deployed to production"
						subtitle="2:14 PM"
						description="Build #1284 went live"
						intent="success"
						:icon="MDI_ICONS.ROCKET_LAUNCH"
						data-cy="timeline-item-icon"
				/>
			</origam-timeline>
		</Variant>

		<Variant title="Intent palette">
			<origam-timeline data-cy="timeline-item-intents">
				<origam-timeline-item title="Primary" subtitle="(default)" intent="primary"   description="Primary intent dot"/>
				<origam-timeline-item title="Success" subtitle="OK"        intent="success"   description="Success intent dot"/>
				<origam-timeline-item title="Warning" subtitle="!"         intent="warning"   description="Warning intent dot"/>
				<origam-timeline-item title="Danger"  subtitle="!"         intent="danger"    description="Danger intent dot"/>
				<origam-timeline-item title="Info"    subtitle="i"         intent="info"      description="Info intent dot"/>
				<origam-timeline-item title="Neutral" subtitle="-"         intent="neutral"   description="Neutral intent dot" :is-last="true"/>
			</origam-timeline>
		</Variant>

		<Variant
				title="Side"
				:init-state="() => useStoryInitState<{ side: 'start' | 'end' | 'alternating' }>({ side: 'start' })"
		>
			<template #default="{ state }">
				<origam-timeline :side="state.side" data-cy="timeline-item-side">
					<origam-timeline-item title="Step 1" subtitle="First"  intent="primary" description="Lorem ipsum dolor sit amet"/>
					<origam-timeline-item title="Step 2" subtitle="Second" intent="success" description="Consectetur adipiscing elit"/>
					<origam-timeline-item title="Step 3" subtitle="Third"  intent="info"    description="Sed do eiusmod tempor"/>
					<origam-timeline-item title="Step 4" subtitle="Done"   intent="neutral" description="Incididunt ut labore" :is-last="true"/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.side" title="side" :options="[
					{ label: 'start',       value: 'start' },
					{ label: 'end',         value: 'end' },
					{ label: 'alternating', value: 'alternating' },
				]"/>
			</template>
		</Variant>

		<Variant
				title="Truncate line (last item drops the connector)"
				:init-state="() => useStoryInitState<{ truncateLine: boolean }>({ truncateLine: true })"
		>
			<template #default="{ state }">
				<origam-timeline :truncate-line="state.truncateLine" data-cy="timeline-item-truncate">
					<origam-timeline-item title="Step 1" subtitle="May 5"  intent="primary" description="First milestone"/>
					<origam-timeline-item title="Step 2" subtitle="May 6"  intent="success" description="Second milestone"/>
					<origam-timeline-item
							title="Step 3"
							subtitle="May 7"
							intent="info"
							description="Last milestone"
							:is-last="true"
							:truncate-line="state.truncateLine"
					/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.truncateLine" title="truncateLine"/>
			</template>
		</Variant>

		<Variant title="Slot — body">
			<origam-timeline>
				<origam-timeline-item
						title="v0.9-rc"
						subtitle="Apr 28"
						intent="success"
						data-cy="timeline-item-slot-body"
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

		<Variant title="Slot — default (custom layout)">
			<origam-timeline>
				<origam-timeline-item
						intent="primary"
						data-cy="timeline-item-slot-default"
				>
					<template #default>
						<div style="display: flex; gap: 8px; align-items: baseline;">
							<strong style="font-size: 1.05rem;">v1.0.0</strong>
							<small style="color: var(--origam-color-text-secondary);">May 5, 2026</small>
						</div>
						<p style="margin: 4px 0 0; font-size: 0.875rem;">
							Custom-rendered content via the <code>default</code> slot.
						</p>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant title="Slot — dot (replace the indicator)">
			<origam-timeline>
				<origam-timeline-item
						title="Custom dot"
						subtitle="Star indicator"
						intent="warning"
						data-cy="timeline-item-slot-dot"
				>
					<template #dot>
						<origam-icon :icon="MDI_ICONS.STAR" :size="14" style="color: white;"/>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITimelineItemProps>({
					title: 'Step',
					subtitle: 'Subtitle',
					intent: 'primary',
					side: 'start',
					isLast: false,
					truncateLine: false,
					index: 0,
				})"
		>
			<template #default="{ state }">
				<origam-timeline data-cy="timeline-item-playground-parent">
					<origam-timeline-item
							v-bind="state"
							description="Playground item — bind any prop on the right."
							data-cy="timeline-item-playground"
					/>
				</origam-timeline>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"        title="title"/>
				<HstText     v-model="state.subtitle"     title="subtitle"/>
				<HstSelect   v-model="state.intent"       title="intent"     :options="intentList"/>
				<HstSelect   v-model="state.side"         title="side"       :options="[
					{ label: 'start',       value: 'start' },
					{ label: 'end',         value: 'end' },
					{ label: 'alternating', value: 'alternating' },
				]"/>
				<HstCheckbox v-model="state.isLast"       title="isLast"/>
				<HstCheckbox v-model="state.truncateLine" title="truncateLine"/>
				<HstNumber   v-model="state.index"        title="index"      :min="0"/>
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

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Timeline/OrigamTimelineItem.md"/>
