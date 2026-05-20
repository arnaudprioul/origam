<template>
	<Story
		group="components"
		title="Timeline/OrigamTimeline"
	>

		<Variant title="Default">
			<origam-timeline :items="releaseEntries" data-cy="timeline-default"/>
		</Variant>

		<Variant title="With icons">
			<origam-timeline :items="iconEntries" data-cy="timeline-icons"/>
		</Variant>

		<Variant title="Sides">
			<div style="display: flex; gap: 32px; flex-wrap: wrap;">
				<div>
					<p style="font-size: 0.75rem; margin-bottom: 8px; font-weight: 600;">side="start"</p>
					<origam-timeline
						:items="simpleEntries"
						side="start"
						data-cy="timeline-side-start"
					/>
				</div>
				<div>
					<p style="font-size: 0.75rem; margin-bottom: 8px; font-weight: 600;">side="end"</p>
					<origam-timeline
						:items="simpleEntries"
						side="end"
						data-cy="timeline-side-end"
					/>
				</div>
				<div>
					<p style="font-size: 0.75rem; margin-bottom: 8px; font-weight: 600;">side="alternating"</p>
					<origam-timeline
						:items="simpleEntries"
						side="alternating"
						data-cy="timeline-side-alternating"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Intent mix">
			<origam-timeline :items="intentEntries" data-cy="timeline-intent"/>
		</Variant>

		<Variant
			title="Color"
			:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-timeline
					:color="state.color"
					:bg-color="state.bgColor"
					:items="simpleEntries"
					data-cy="timeline-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
			title="Size / Density"
			:init-state="() => useStoryInitState<ISizeProps & IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-timeline
					:density="state.density"
					:size="state.size"
					:items="simpleEntries"
					data-cy="timeline-size-density"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
				<HstSelect v-model="state.size"    title="size"    :options="sizeList"/>
			</template>
		</Variant>

		<Variant title="Slot — default (custom content)">
			<origam-timeline data-cy="timeline-slot-default">
				<origam-timeline-item
					title="v1.0.0"
					subtitle="May 5, 2026"
					intent="primary"
					:is-last="false"
					data-cy="timeline-slot-item-0"
				>
					<template #default>
						<div class="timeline-custom-content">
							<p style="font-weight: 600; margin: 0 0 4px;">v1.0.0 — Stable release</p>
							<ul style="margin: 0; padding-left: 16px; font-size: 0.75rem;">
								<li>240 components shipped</li>
								<li>Full token coverage</li>
								<li>Playwright e2e suite</li>
							</ul>
						</div>
					</template>
				</origam-timeline-item>
				<origam-timeline-item
					title="v0.9-rc"
					subtitle="Apr 28, 2026"
					intent="success"
					:is-last="true"
					data-cy="timeline-slot-item-1"
				>
					<template #default>
						<p style="margin: 0; font-size: 0.75rem; color: var(--origam-color__text---secondary)">
							Release candidate — API surface frozen.
						</p>
					</template>
				</origam-timeline-item>
			</origam-timeline>
		</Variant>

		<Variant
			title="Truncate line"
			:init-state="() => useStoryInitState<{ truncateLine: boolean }>({ truncateLine: true })"
		>
			<template #default="{ state }">
				<origam-timeline
					:items="simpleEntries"
					:truncate-line="state.truncateLine"
					data-cy="timeline-truncate"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.truncateLine" title="truncateLine"/>
			</template>
		</Variant>

		<Variant title="Prop — orientation (horizontal, scroll-snap slider)">
			<div style="max-width: 560px;">
				<origam-timeline
					orientation="horizontal"
					:items="releaseEntries"
					data-cy="timeline-horizontal"
				/>
				<p style="margin-top: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Swipe / drag horizontally to navigate point-to-point. Each dot snaps to the start of the viewport.
				</p>
			</div>
		</Variant>

		<Variant title="Prop — orientation (horizontal with icons)">
			<div style="max-width: 560px;">
				<origam-timeline
					orientation="horizontal"
					:items="iconEntries"
					color="primary"
					data-cy="timeline-horizontal-icons"
				/>
			</div>
		</Variant>

		<Variant
			title="Default"
			:init-state="() => useStoryInitState<ITimelineProps>({
				orientation: 'vertical',
				side: 'start',
				truncateLine: false,
				color: undefined,
				bgColor: undefined,
				density: DENSITY.DEFAULT
			})"
		>
			<template #default="{ state }">
				<div :style="state.orientation === 'horizontal' ? { maxWidth: '560px' } : {}">
					<origam-timeline
						v-bind="state"
						:items="releaseEntries"
						data-cy="timeline-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.orientation"  title="orientation"  :options="[
					{ label: 'vertical',   value: 'vertical' },
					{ label: 'horizontal', value: 'horizontal' },
				]"/>
				<HstSelect   v-model="state.side"         title="side"         :options="sideList"/>
				<HstCheckbox v-model="state.truncateLine" title="truncateLine"/>
				<HstSelect   v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect   v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect   v-model="state.density"      title="density"      :options="densityList"/>
				<HstSelect   v-model="state.size"         title="size"         :options="sizeList"/>
			</template>
		</Variant>

	</Story>
</template>

<script lang="ts" setup>
	import {
		OrigamTimeline,
		OrigamTimelineItem
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOptions, ISizeProps } from '@origam/interfaces'
	import type { ITimelineEntry, ITimelineProps } from '@origam/interfaces'
	import type { TTimelineSide } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, sizeList } from '@stories/const'

	// ── Side options ────────────────────────────────────────────────────────
	const sideList: Array<IOptions<TTimelineSide>> = [
		{ label: 'start',       value: 'start' },
		{ label: 'end',         value: 'end' },
		{ label: 'alternating', value: 'alternating' }
	]

	// ── Fixture data ────────────────────────────────────────────────────────
	const releaseEntries: ITimelineEntry[] = [
		{
			title: 'v1.0.0',
			subtitle: 'May 5, 2026',
			description: 'Stable release · 240 components',
			intent: 'primary'
		},
		{
			title: 'v0.9-rc',
			subtitle: 'Apr 28, 2026',
			description: 'Release candidate, API freeze',
			intent: 'success'
		},
		{
			title: 'v0.8',
			subtitle: 'Apr 12, 2026',
			description: 'Dark theme tokens, motion system',
			intent: 'info'
		},
		{
			title: 'v0.7',
			subtitle: 'Mar 30, 2026',
			description: 'Forms refactor, OTP component',
			intent: 'warning'
		}
	]

	const iconEntries: ITimelineEntry[] = [
		{
			title: 'v1.0.0',
			subtitle: 'May 5, 2026',
			description: 'Stable release · 240 components',
			intent: 'primary',
			icon: MDI_ICONS.ROCKET_LAUNCH
		},
		{
			title: 'v0.9-rc',
			subtitle: 'Apr 28, 2026',
			description: 'Release candidate, API freeze',
			intent: 'success',
			icon: MDI_ICONS.PACKAGE
		},
		{
			title: 'v0.8',
			subtitle: 'Apr 12, 2026',
			description: 'Dark theme tokens, motion system',
			intent: 'info',
			icon: MDI_ICONS.TAG
		},
		{
			title: 'v0.7',
			subtitle: 'Mar 30, 2026',
			description: 'Forms refactor, OTP component',
			intent: 'warning',
			icon: MDI_ICONS.HISTORY
		}
	]

	const simpleEntries: ITimelineEntry[] = [
		{ title: 'Step 1', subtitle: 'Jan 2026', description: 'First milestone', intent: 'primary' },
		{ title: 'Step 2', subtitle: 'Feb 2026', description: 'Second milestone', intent: 'success' },
		{ title: 'Step 3', subtitle: 'Mar 2026', description: 'Third milestone', intent: 'info' }
	]

	const intentEntries: ITimelineEntry[] = [
		{ title: 'Primary',   subtitle: 'Intent primary',   description: 'Primary intent dot',   intent: 'primary' },
		{ title: 'Success',   subtitle: 'Intent success',   description: 'Success intent dot',   intent: 'success' },
		{ title: 'Warning',   subtitle: 'Intent warning',   description: 'Warning intent dot',   intent: 'warning' },
		{ title: 'Danger',    subtitle: 'Intent danger',    description: 'Danger intent dot',    intent: 'danger' },
		{ title: 'Info',      subtitle: 'Intent info',      description: 'Info intent dot',      intent: 'info' }
	]
</script>
