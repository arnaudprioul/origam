<template>
	<Story
			group="components"
			title="Treeview/OrigamTreeviewNode"
	>

		<!--
			Note: <origam-treeview-node> reads its expand / select state
			from the parent <origam-treeview> via inject. Stories below
			wrap the node in its parent so the toggle handlers wire up.
		-->

		<Variant title="Default (leaf)">
			<origam-treeview :items="leafItems" data-cy="treeview-node-leaf"/>
		</Variant>

		<Variant title="With nested children (expandable)">
			<origam-treeview :items="nestedItems" data-cy="treeview-node-nested"/>
		</Variant>

		<Variant title="With icons">
			<origam-treeview :items="iconItems" data-cy="treeview-node-icons"/>
		</Variant>

		<Variant title="Disabled node">
			<origam-treeview :items="disabledItems" data-cy="treeview-node-disabled"/>
		</Variant>

		<Variant
				title="Show lines (parent-controlled)"
				:init-state="() => useStoryInitState<{ showLines: boolean }>({ showLines: true })"
		>
			<template #default="{ state }">
				<origam-treeview :items="nestedItems" :show-lines="state.showLines" data-cy="treeview-node-lines"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showLines" title="showLines"/>
			</template>
		</Variant>

		<Variant
				title="Color (parent intent)"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-treeview
						:items="nestedItems"
						:color="state.color"
						data-cy="treeview-node-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color (parent)" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ depth: number }>({ depth: 0 })"
		>
			<template #default="{ state }">
				<origam-treeview :items="nestedItems" data-cy="treeview-node-playground"/>
				<p style="padding: 12px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Note: <code>node</code> and <code>depth</code> on each
					&lt;origam-treeview-node&gt; are typically derived by the
					parent treeview from its <code>items</code> tree.
					Manually rendering one outside that loop is rarely useful.
				</p>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.depth" title="depth (display only)" :min="0" :max="6"/>
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

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const leafItems = [
		{ id: '1', label: 'Solitary leaf' },
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
						{ id: '1.1.2', label: 'OrigamCard.vue' },
					],
				},
				{
					id: '1.2',
					label: 'composables',
					children: [
						{ id: '1.2.1', label: 'useColorEffect.ts' },
					],
				},
			],
		},
		{ id: '2', label: 'package.json' },
	]

	const iconItems = [
		{
			id: '1',
			label: 'Documents',
			icon: MDI_ICONS.FOLDER,
			children: [
				{ id: '1.1', label: 'spec.pdf', icon: MDI_ICONS.FILE_PDF_BOX },
				{ id: '1.2', label: 'image.png', icon: MDI_ICONS.IMAGE },
			],
		},
		{ id: '2', label: 'Tasks', icon: MDI_ICONS.CALENDAR_CHECK },
	]

	const disabledItems = [
		{ id: '1', label: 'Allowed branch', children: [
			{ id: '1.1', label: 'Sub allowed' },
		] },
		{ id: '2', label: 'Disabled branch', disabled: true, children: [
			{ id: '2.1', label: 'Cannot reach' },
		] },
	]
</script>

<docs lang="md" src="@docs/components/Treeview/OrigamTreeviewNode.md"/>
