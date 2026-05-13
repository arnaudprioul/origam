<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanels"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IExpansionPanelsProps knob via the sidebar controls.
		-->
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
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstCheckbox v-model="state.flat"         title="flat"/>
				<HstCheckbox v-model="state.accordion"    title="accordion"/>
				<HstCheckbox v-model="state.inset"        title="inset"/>
				<HstCheckbox v-model="state.popout"       title="popout"/>
				<HstCheckbox v-model="state.multiple"     title="multiple"/>
				<HstCheckbox v-model="state.mandatory"    title="mandatory"/>
				<HstCheckbox v-model="state.hideActions"  title="hideActions"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
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

		<Variant
				title="Prop — density"
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

		<Variant
				title="Prop — rounded"
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

		<Variant
				title="Prop — border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :border="state.border" data-cy="expansion-border">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
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

		<Variant
				title="Prop — expandIcon & collapseIcon"
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

		<Variant
				title="Prop — flat, accordion, popout & inset"
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

		<Variant
				title="Prop — multiple & mandatory (selection)"
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

		<Variant title="Prop — items">
			<origam-expansion-panels :items="panelItems" data-cy="expansion-items"/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

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

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<origam-expansion-panels
						data-cy="expansion-emit-model"
						@update:model-value="(v: any) => { state.log = [`update:modelValue → ${JSON.stringify(v)}`, ...state.log].slice(0, 5) }"
				>
					<origam-expansion-panel title="Panel 1" content="Click to fire emit"/>
					<origam-expansion-panel title="Panel 2" content="Click to fire emit"/>
				</origam-expansion-panels>
				<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
					<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
				</ul>
				<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click a panel header to fire the event.</p>
			</template>
		</Variant>

		<Variant
				title="Emit — group:selected"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-emit-selected">
					<origam-expansion-panel
							title="Select me"
							content="Content"
							data-cy="expansion-emit-selected-p1"
							@group:selected="(e: any) => { state.log = [`group:selected → ${JSON.stringify(e)}`, ...state.log].slice(0, 5) }"
					/>
					<origam-expansion-panel
							title="Or me"
							content="Content"
							data-cy="expansion-emit-selected-p2"
							@group:selected="(e: any) => { state.log = [`group:selected → ${JSON.stringify(e)}`, ...state.log].slice(0, 5) }"
					/>
				</origam-expansion-panels>
				<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
					<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
				</ul>
				<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click a panel header.</p>
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
	import {
		borderList,
		densityList, elevationList, iconList, intentList, roundedList
	} from '@stories/const'

	const panelItems: Array<IExpansionPanelProps> = [
		{ title: 'Item A', content: 'Content for item A' },
		{ title: 'Item B', content: 'Content for item B' },
		{ title: 'Item C', content: 'Content for item C' },
	]
</script>
