<template>
	<Story
			group="components"
			title="Treeview/OrigamTreeview"
	>
		<Variant title="Default">
			<origam-treeview
					:items="fileTree"
					data-cy="treeview-default"
			/>
		</Variant>

		<Variant
				title="Selection single"
				:init-state="() => useStoryInitState<{ selected: string }>({ selected: '' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<origam-treeview
							v-model="state.selected"
							:items="fileTree"
							select-mode="single"
							selectable-nodes="leaf"
							:expanded-value="defaultExpanded"
							data-cy="treeview-single"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary);">
						Selected: {{ state.selected || '(none)' }}
					</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Selection multiple"
				:init-state="() => useStoryInitState<{ selected: string[] }>({ selected: [] })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<origam-treeview
							v-model="state.selected"
							:items="fileTree"
							select-mode="multiple"
							selectable-nodes="leaf"
							:expanded-value="defaultExpanded"
							data-cy="treeview-multiple"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary);">
						Selected: {{ state.selected.length > 0 ? state.selected.join(', ') : '(none)' }}
					</p>
				</div>
			</template>
		</Variant>

		<Variant title="Expand on click">
			<origam-treeview
					:items="fileTree"
					:expand-on-click="true"
					data-cy="treeview-expand-on-click"
			/>
		</Variant>

		<Variant title="Show lines">
			<origam-treeview
					:items="fileTree"
					:show-lines="true"
					:expanded-value="defaultExpanded"
					data-cy="treeview-show-lines"
			/>
		</Variant>

		<Variant title="No lines">
			<origam-treeview
					:items="fileTree"
					:show-lines="false"
					:expanded-value="defaultExpanded"
					data-cy="treeview-no-lines"
			/>
		</Variant>

		<Variant title="Disabled nodes">
			<origam-treeview
					:items="treeWithDisabled"
					select-mode="multiple"
					selectable-nodes="all"
					:expanded-value="['active-folder', 'disabled-folder']"
					data-cy="treeview-disabled"
			/>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="fileTree"
						:color="state.color"
						:bg-color="state.bgColor"
						:expanded-value="defaultExpanded"
						data-cy="treeview-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="fileTree"
						:color="state.color"
						:bg-color="state.bgColor"
						:expanded-value="defaultExpanded"
						data-cy="treeview-color"
				/>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="fileTree"
						:color="state.color"
						:bg-color="state.bgColor"
						:expanded-value="defaultExpanded"
						data-cy="treeview-color"
				/>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Size / Density"
				:init-state="() => useStoryInitState<{ size: TSize; density: TDensity }>({ size: 'default', density: 'default' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="fileTree"
						:size="state.size"
						:density="state.density"
						:expanded-value="defaultExpanded"
						data-cy="treeview-size-density"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size"    title="size"    :options="sizeList"/>
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Slot node">
			<origam-treeview
					:items="fileTree"
					:expanded-value="defaultExpanded"
					data-cy="treeview-slot-node"
			>
				<template #node="{ node, depth, isExpanded, isSelected }">
					<span
							:style="{
								paddingInlineStart: `${(depth ?? 0) * 8}px`,
								fontSize: '0.7rem',
								color: isSelected ? 'var(--origam-color__action--primary---bg)' : 'var(--origam-color__text---secondary)',
								fontStyle: 'italic'
							}"
					>
						[slot] {{ node.label }} {{ isExpanded ? '(open)' : '' }}
					</span>
				</template>
			</origam-treeview>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — select">
			<origam-treeview
					:items="fileTree"
					select-mode="single"
					selectable-nodes="leaf"
					:expanded-value="defaultExpanded"
					data-cy="treeview-emit-select"
					@select="logEvent('select', $event)"
			/>
		</Variant>

		<Variant title="Emit — toggle">
			<origam-treeview
					:items="fileTree"
					:expanded-value="defaultExpanded"
					data-cy="treeview-emit-toggle"
					@toggle="logEvent('toggle', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:expandedValue">
			<origam-treeview
					:items="fileTree"
					:expanded-value="defaultExpanded"
					data-cy="treeview-emit-expanded"
					@update:expanded-value="logEvent('update:expandedValue', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-treeview
					:items="fileTree"
					select-mode="multiple"
					selectable-nodes="leaf"
					:expanded-value="defaultExpanded"
					data-cy="treeview-emit-model-value"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITreeviewProps>({
					selectMode: 'none',
					selectableNodes: 'leaf',
					showLines: true,
					expandOnClick: false,
					color: undefined,
					bgColor: undefined,
					density: 'default',
					size: 'default'
				})"
		>
			<template #default="{ state }">
				<origam-treeview
						v-bind="state"
						:active="state._hActive" :hover="state._hHover" :items="fileTree"
						:expanded-value="defaultExpanded"
						data-cy="treeview-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.selectMode"      title="selectMode"      :options="selectModeList"/>
				<HstSelect   v-model="state.selectableNodes" title="selectableNodes" :options="selectableNodesList"/>
				<HstCheckbox v-model="state.showLines"       title="showLines"/>
				<HstCheckbox v-model="state.expandOnClick"   title="expandOnClick"/>
				<HstSelect   v-model="state.color"           title="color"           :options="intentList"/>
				<HstSelect   v-model="state.bgColor"         title="bgColor"         :options="intentList"/>
				<HstSelect   v-model="state.density"         title="density"         :options="densityList"/>
				<HstSelect   v-model="state.size"            title="size"            :options="sizeList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamTreeview } from '@origam/components'
	import type { IColorProps, IOptions, ITreeviewNode, ITreeviewProps } from '@origam/interfaces'
	import type { TDensity, TSize, TTreeviewSelectMode, TTreeviewSelectableNodes } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, sizeList,
		hoverList
	} from '@stories/const'

	// Select mode options
	const selectModeList: Array<IOptions<TTreeviewSelectMode>> = [
		{ label: 'None', value: 'none' },
		{ label: 'Single', value: 'single' },
		{ label: 'Multiple', value: 'multiple' }
	]

	// Selectable nodes options
	const selectableNodesList: Array<IOptions<TTreeviewSelectableNodes>> = [
		{ label: 'Leaf only', value: 'leaf' },
		{ label: 'All', value: 'all' }
	]

	// Default file tree fixture
	const fileTree: ITreeviewNode[] = [
		{
			id: 'src',
			label: 'src',
			children: [
				{
					id: 'src/components',
					label: 'components',
					children: [
						{ id: 'src/components/Btn.vue', label: 'Btn.vue', size: '12.4 KB' },
						{ id: 'src/components/Card.vue', label: 'Card.vue', size: '8.1 KB' }
					]
				},
				{
					id: 'src/types',
					label: 'types',
					children: [
						{ id: 'src/types/commons.type.ts', label: 'commons.type.ts', size: '2.3 KB' }
					]
				}
			]
		},
		{
			id: 'tokens',
			label: 'tokens',
			children: [
				{ id: 'tokens/primitive.json', label: 'primitive.json', size: '24 KB' },
				{ id: 'tokens/semantic.light.json', label: 'semantic.light.json', size: '12 KB' },
				{ id: 'tokens/semantic.dark.json', label: 'semantic.dark.json', size: '12 KB' }
			]
		},
		{
			id: 'README.md',
			label: 'README.md',
			size: '3.2 KB'
		}
	]

	// Pre-expanded nodes for variants that show nested content
	const defaultExpanded: string[] = ['src', 'src/components', 'tokens']

	// Tree with disabled nodes
	const treeWithDisabled: ITreeviewNode[] = [
		{
			id: 'active-folder',
			label: 'Active folder',
			children: [
				{ id: 'active-file.ts', label: 'active-file.ts', size: '4 KB' },
				{ id: 'disabled-file.ts', label: 'disabled-file.ts', size: '2 KB', disabled: true }
			]
		},
		{
			id: 'disabled-folder',
			label: 'Disabled folder (locked)',
			disabled: true,
			children: [
				{ id: 'nested-file.ts', label: 'nested-file.ts' }
			]
		},
		{ id: 'normal-file.md', label: 'normal-file.md', size: '1 KB' }
	]
</script>

<docs lang="md" src="@docs/components/Treeview/OrigamTreeview.md"/>
