<template>
	<Story
			group="components"
			title="Treeview/OrigamTreeviewNode"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ITreeviewProps>>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="nestedItems"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:show-lines="state.showLines"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Structure">
					<HstCheckbox v-model="state.showLines" title="Show Lines"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ITreeviewProps>>({ selectMode: 'none', selectableNodes: 'leaf', expandOnClick: false })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="disabledItems"
						:select-mode="state.selectMode"
						:selectable-nodes="state.selectableNodes"
						:expand-on-click="state.expandOnClick"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Selection">
					<HstSelect   v-model="state.selectMode"       title="Select Mode"       :options="SELECT_MODE_OPTIONS"/>
					<HstSelect   v-model="state.selectableNodes"  title="Selectable Nodes"  :options="SELECTABLE_NODES_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.expandOnClick" title="Expand On Click"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - node">
			<origam-treeview :items="nestedItems">
				<template #node="{ node }">
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">
						Custom — {{ node.label }}
					</span>
				</template>
			</origam-treeview>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<ITreeviewProps>>({ color: 'primary', selectMode: 'none', selectableNodes: 'leaf', expandOnClick: false })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="nestedItems"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:show-lines="state.showLines"
						:select-mode="state.selectMode"
						:selectable-nodes="state.selectableNodes"
						:expand-on-click="state.expandOnClick"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.size"    title="Size"     :options="SIZE_OPTIONS"/>
					<HstSelect   v-model="state.density" title="Density"  :options="DENSITY_OPTIONS"/>
					<HstCheckbox v-model="state.showLines" title="Show Lines"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect   v-model="state.selectMode"      title="Select Mode"      :options="SELECT_MODE_OPTIONS"/>
					<HstSelect   v-model="state.selectableNodes" title="Selectable Nodes" :options="SELECTABLE_NODES_OPTIONS"/>
					<HstCheckbox v-model="state.expandOnClick"   title="Expand On Click"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTreeview } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ITreeviewProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		SIZE_OPTIONS
	} from '@stories/const'

	const SELECT_MODE_OPTIONS = [
		{ label: 'none', value: 'none' },
		{ label: 'single', value: 'single' },
		{ label: 'multiple', value: 'multiple' }
	]

	const SELECTABLE_NODES_OPTIONS = [
		{ label: 'leaf', value: 'leaf' },
		{ label: 'all', value: 'all' }
	]

	const nestedItems = [
		{
			id: '1',
			label: 'src',
			children: [
				{
					id: '1.1',
					label: 'components',
					children: [
						{ id: '1.1.1', label: 'OrigamBtn.vue' },
						{ id: '1.1.2', label: 'OrigamCard.vue' }
					]
				},
				{
					id: '1.2',
					label: 'composables',
					children: [
						{ id: '1.2.1', label: 'useColorEffect.ts' }
					]
				}
			]
		},
		{ id: '2', label: 'package.json' }
	]

	const disabledItems = [
		{
			id: '1',
			label: 'Allowed branch',
			icon: MDI_ICONS.FOLDER,
			children: [
				{ id: '1.1', label: 'Sub allowed' }
			]
		},
		{
			id: '2',
			label: 'Disabled branch',
			disabled: true,
			icon: MDI_ICONS.FOLDER,
			children: [
				{ id: '2.1', label: 'Cannot reach' }
			]
		}
	]
</script>

<docs lang="md" src="@docs/components/Treeview/OrigamTreeviewNode.md"/>
