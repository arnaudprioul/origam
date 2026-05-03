<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanel"
	>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
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

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
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

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
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

		<!-- ════════════ HEADER PROPS (expandIcon / collapseIcon / hideActions / readonly) ════════════ -->
		<Variant
				title="Header props"
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

		<!-- ════════════ STATES (disabled) ════════════ -->
		<Variant
				title="States"
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

		<!-- ════════════ SLOT: default (content) ════════════ -->
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

		<!-- ════════════ SLOT: title ════════════ -->
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

		<!-- ════════════ SLOT: prepend ════════════ -->
		<Variant title="Slot — prepend">
			<origam-expansion-panels>
				<origam-expansion-panel title="With prepend" content="Content here" data-cy="ep-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.FOLDER"/>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ SLOT: append ════════════ -->
		<Variant title="Slot — append">
			<origam-expansion-panels>
				<origam-expansion-panel title="With append" content="Content here" data-cy="ep-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.INFORMATION_OUTLINE"/>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ EMIT: group:selected ════════════ -->
		<Variant title="Emit — group:selected">
			<origam-expansion-panels>
				<origam-expansion-panel
						title="Select me"
						content="Content"
						data-cy="ep-emit-selected"
						@group:selected="logEvent('group:selected', $event)"
				/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamExpansionPanel, OrigamExpansionPanels, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IColorProps,
		IDensityProps,
		IExpansionPanelProps,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList, roundedList } from '@stories/const'
</script>
