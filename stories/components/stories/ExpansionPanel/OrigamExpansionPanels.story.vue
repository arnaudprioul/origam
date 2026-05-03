<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanels"
	>

		<!--
			REFERENCE STORY — pattern mirrors OrigamBtn.story.vue.

			Each <Variant> drives one orthogonal concern:
			  • one variant per "prop family" (color, size, density, …)
			  • one variant per slot
			  • one variant per emit — wire the listener to
			    `logEvent('event-name', $event)` (imported from
			    'histoire/client') so the emit shows up in histoire's
			    Events tab.
			  • one "playground" variant that exposes everything together
		-->

		<!-- ════════════ COLOR / INTENT ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :color="state.color" :bg-color="state.bgColor" data-cy="expansion-color">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
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
				<origam-expansion-panels :density="state.density" data-cy="expansion-density">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
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
				<origam-expansion-panels :rounded="state.rounded" data-cy="expansion-rounded">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :border="state.border" data-cy="expansion-border">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({ elevation: 4 })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :elevation="state.elevation" data-cy="expansion-elevation">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<!-- ════════════ ICONS (expand / collapse) ════════════ -->
		<Variant
				title="Icons"
				:init-state="() => useStoryInitState<{ expandIcon?: TIcon, collapseIcon?: TIcon, hideActions: boolean }>({ expandIcon: MDI_ICONS.CHEVRON_DOWN, collapseIcon: MDI_ICONS.CHEVRON_UP, hideActions: false })"
		>
			<template #default="{ state }">
				<origam-expansion-panels
						:expand-icon="state.expandIcon"
						:collapse-icon="state.collapseIcon"
						:hide-actions="state.hideActions"
						data-cy="expansion-icons"
				>
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect   v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.hideActions"  title="hideActions"/>
			</template>
		</Variant>

		<!-- ════════════ LAYOUT (flat / accordion / popout / inset) ════════════ -->
		<Variant
				title="Layout"
				:init-state="() => useStoryInitState<{ flat: boolean, accordion: boolean, popout: boolean, inset: boolean }>({ flat: false, accordion: false, popout: false, inset: false })"
		>
			<template #default="{ state }">
				<origam-expansion-panels
						:flat="state.flat"
						:accordion="state.accordion"
						:popout="state.popout"
						:inset="state.inset"
						data-cy="expansion-layout"
				>
					<origam-expansion-panel title="Step 1" content="First step content."/>
					<origam-expansion-panel title="Step 2" content="Second step content."/>
					<origam-expansion-panel title="Step 3" content="Third step content."/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.accordion" title="accordion"/>
				<HstCheckbox v-model="state.popout"    title="popout"/>
				<HstCheckbox v-model="state.inset"     title="inset"/>
			</template>
		</Variant>

		<!-- ════════════ SELECTION (multiple / mandatory) ════════════ -->
		<Variant
				title="Selection"
				:init-state="() => useStoryInitState<{ multiple: boolean, mandatory: boolean }>({ multiple: false, mandatory: false })"
		>
			<template #default="{ state }">
				<origam-expansion-panels
						:multiple="state.multiple"
						:mandatory="state.mandatory"
						data-cy="expansion-selection"
				>
					<origam-expansion-panel title="Alpha"   content="Alpha content"/>
					<origam-expansion-panel title="Beta"    content="Beta content"/>
					<origam-expansion-panel title="Gamma"   content="Gamma content"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-expansion-panels :items="panelItems" data-cy="expansion-items"/>
		</Variant>

		<!-- ════════════ SLOT: default (explicit children with title / content slots) ════════════ -->
		<Variant title="Slot — default">
			<origam-expansion-panels data-cy="expansion-slot-default">
				<origam-expansion-panel data-cy="expansion-slot-p1">
					<template #title>
						<span>Custom title one</span>
					</template>
					<template #default>
						<p>Slot-driven content for panel one.</p>
					</template>
				</origam-expansion-panel>
				<origam-expansion-panel data-cy="expansion-slot-p2">
					<template #title>
						<span>Custom title two</span>
					</template>
					<template #default>
						<p>Slot-driven content for panel two.</p>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ SLOT: item ════════════ -->
		<Variant title="Slot — item">
			<origam-expansion-panels :items="panelItems" data-cy="expansion-slot-item">
				<template #item="{ item, index, expandIcon, collapseIcon }">
					<origam-expansion-panel
							:title="`[${index + 1}] ${item.title}`"
							:content="item.content"
							:expand-icon="expandIcon"
							:collapse-icon="collapseIcon"
							:data-cy="`expansion-slot-item-${index}`"
					/>
				</template>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ SLOT: header ════════════ -->
		<Variant title="Slot — header">
			<origam-expansion-panels data-cy="expansion-slot-header">
				<origam-expansion-panel data-cy="expansion-slot-header-p1">
					<template #header="{ collapseIcon, expandIcon, expanded }">
						<origam-expansion-panel-header
								:collapse-icon="collapseIcon"
								:expand-icon="expandIcon"
								:prepend-icon="expanded ? MDI_ICONS.FOLDER_OPEN : MDI_ICONS.FOLDER"
								title="Custom header slot"
								data-cy="expansion-slot-header-custom"
						/>
					</template>
					<template #default>
						<p>Content shown when open.</p>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ SLOT: title ════════════ -->
		<Variant title="Slot — title">
			<origam-expansion-panels data-cy="expansion-slot-title">
				<origam-expansion-panel data-cy="expansion-slot-title-p1">
					<template #title>
						<span style="font-weight: 700; font-style: italic;">Custom title slot</span>
					</template>
					<template #default>
						<p>This is the content.</p>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-expansion-panels
					data-cy="expansion-emit-model"
					@update:model-value="logEvent('update:modelValue', $event)"
			>
				<origam-expansion-panel title="Panel 1" content="Click to fire emit"/>
				<origam-expansion-panel title="Panel 2" content="Click to fire emit"/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ EMIT: group:selected (via panel) ════════════ -->
		<Variant title="Emit — group:selected">
			<origam-expansion-panels data-cy="expansion-emit-selected">
				<origam-expansion-panel
						title="Select me"
						content="Content"
						data-cy="expansion-emit-selected-p1"
						@group:selected="logEvent('group:selected', $event)"
				/>
				<origam-expansion-panel
						title="Or me"
						content="Content"
						data-cy="expansion-emit-selected-p2"
						@group:selected="logEvent('group:selected', $event)"
				/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ PLAYGROUND (everything together) ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelsProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					flat: false,
					accordion: false,
					inset: false,
					popout: false,
					multiple: false,
					mandatory: false,
					hideActions: false,
					expandIcon: MDI_ICONS.CHEVRON_DOWN,
					collapseIcon: MDI_ICONS.CHEVRON_UP,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels v-bind="state" data-cy="expansion-playground">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
					<origam-expansion-panel title="Panel 3" content="Content 3"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"      title="density"      :options="densityList"/>
				<HstSelect   v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect   v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect   v-model="state.rounded"      title="rounded"      :options="roundedList"/>
				<HstSelect   v-model="state.elevation"    title="elevation"    :options="elevationList"/>
				<HstSelect   v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect   v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.border"       title="border"/>
				<HstCheckbox v-model="state.flat"         title="flat"/>
				<HstCheckbox v-model="state.accordion"    title="accordion"/>
				<HstCheckbox v-model="state.inset"        title="inset"/>
				<HstCheckbox v-model="state.popout"       title="popout"/>
				<HstCheckbox v-model="state.multiple"     title="multiple"/>
				<HstCheckbox v-model="state.mandatory"    title="mandatory"/>
				<HstCheckbox v-model="state.hideActions"  title="hideActions"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import {
		OrigamExpansionPanel,
		OrigamExpansionPanelHeader,
		OrigamExpansionPanels
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IColorProps,
		IDensityProps,
		IElevationProps,
		IExpansionPanelProps,
		IExpansionPanelsProps,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, elevationList, iconList, intentList, roundedList } from '@stories/const'

	const panelItems: Array<IExpansionPanelProps> = [
		{ title: 'Item A', content: 'Content for item A' },
		{ title: 'Item B', content: 'Content for item B' },
		{ title: 'Item C', content: 'Content for item C' },
	]
</script>
