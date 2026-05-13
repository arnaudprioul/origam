<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanel"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IExpansionPanelProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelProps>({
					title: 'Panel title',
					content: 'Panel content text',
					color: undefined,
					bgColor: undefined,
					density: undefined,
					rounded: undefined,
					expandIcon: MDI_ICONS.CHEVRON_DOWN,
					collapseIcon: MDI_ICONS.CHEVRON_UP,
					hideActions: false,
					readonly: false,
					disabled: false,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel v-bind="state" data-cy="ep-playground"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"        title="title"/>
				<HstText     v-model="state.content"      title="content"/>
				<HstSelect   v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect   v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect   v-model="state.density"      title="density"      :options="densityList"/>
				<HstSelect   v-model="state.rounded"      title="rounded"      :options="roundedList"/>
				<HstSelect   v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect   v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.hideActions"  title="hideActions"/>
				<HstCheckbox v-model="state.readonly"     title="readonly"/>
				<HstCheckbox v-model="state.disabled"     title="disabled"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IExpansionPanelProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel v-bind="state" title="Colored panel" content="Content here" data-cy="ep-color"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IExpansionPanelProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel :density="state.density" title="Dense panel" content="Content here" data-cy="ep-density"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IExpansionPanelProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel :rounded="state.rounded" title="Rounded panel" content="Content here" data-cy="ep-rounded"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — expandIcon, collapseIcon & hideActions"
				:init-state="() => useStoryInitState<{ expandIcon?: TIcon, collapseIcon?: TIcon, hideActions: boolean, readonly: boolean, focusable: boolean }>({ expandIcon: MDI_ICONS.CHEVRON_DOWN, collapseIcon: MDI_ICONS.CHEVRON_UP, hideActions: false, readonly: false, focusable: false })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel
							:expand-icon="state.expandIcon"
							:collapse-icon="state.collapseIcon"
							:hide-actions="state.hideActions"
							:readonly="state.readonly"
							:focusable="state.focusable"
							title="Header props panel"
							content="Content here"
							data-cy="ep-header-props"
					/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect   v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.hideActions"  title="hideActions"/>
				<HstCheckbox v-model="state.readonly"     title="readonly"/>
				<HstCheckbox v-model="state.focusable"    title="focusable"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: false })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel :disabled="state.disabled" title="Stateful panel" content="Content here" data-cy="ep-states"/>
					<origam-expansion-panel title="Normal panel" content="This one always works"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<Variant
				title="Prop — loading (interactive)"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-expansion-panels :model-value="[0]" multiple>
						<origam-expansion-panel
								:loading="resolveEpLoading(state)"
								title="Interactive loading panel"
								content="Panel body content goes here."
								data-cy="ep-loading-interactive"
						/>
					</origam-expansion-panels>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeEpLoading(state) }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.enabled" title="enabled (loading)"/>
				<HstSelect
						v-model="state.kind"
						title="kind"
						:options="[
							{ label: 'true (default)', value: 'bool' },
							{ label: 'number', value: 'number' },
							{ label: '{ type: line }', value: 'line' },
							{ label: '{ type: circular }', value: 'circular' },
							{ label: '{ type: skeleton }', value: 'skeleton' }
						]"
				/>
				<HstNumber v-model="state.progress" title="progress (when kind=number)" :min="0" :max="100" :step="1"/>
				<HstNumber v-model="state.circularSize" title="circular size (when kind=circular)" :min="12" :max="64" :step="2"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (content)">
			<origam-expansion-panels>
				<origam-expansion-panel title="Panel with slot content" data-cy="ep-slot-default">
					<template #default>
						<div style="padding: 8px;">
							<p>This content was inserted via the default slot.</p>
							<p>It supports rich markup.</p>
						</div>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Slot — title">
			<origam-expansion-panels>
				<origam-expansion-panel content="Content here" data-cy="ep-slot-title">
					<template #title>
						<span style="font-weight: 700;">Custom Title via Slot</span>
						<origam-icon :icon="MDI_ICONS.STAR" style="margin-left: 8px;"/>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-expansion-panels>
				<origam-expansion-panel title="With prepend" content="Content here" data-cy="ep-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.FOLDER"/>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Slot — append">
			<origam-expansion-panels>
				<origam-expansion-panel title="With append" content="Content here" data-cy="ep-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.INFORMATION_OUTLINE"/>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — group:selected"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel
							title="Select me"
							content="Content"
							data-cy="ep-emit-selected"
							@group:selected="(e: any) => { state.log = [`group:selected → ${JSON.stringify(e)}`, ...state.log].slice(0, 5) }"
					/>
				</origam-expansion-panels>
				<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
					<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
				</ul>
				<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click the panel header to fire the event.</p>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamExpansionPanel,
		OrigamExpansionPanels,
		OrigamIcon
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IExpansionPanelProps
	} from '@origam/interfaces'
	import type { TIcon, TLoadingValue } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList, roundedList } from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveEpLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeEpLoading = (state: ILoadingState): string => {
		const v = resolveEpLoading(state)
		return JSON.stringify(v, null, 2)
	}
</script>
