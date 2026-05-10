<template>
	<Story
			group="components"
			title="Treeview/OrigamTreeviewNode"
	>
		<!--
			Note: <origam-treeview-node> is a sub-component of <origam-treeview>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-treeview data-cy="origam-treeview-node-default-parent">
				<origam-treeview-node data-cy="origam-treeview-node-default"/>
			</origam-treeview>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITreeviewNodeProps>({ depth: 0 })"
		>
			<template #default="{ state }">
			<origam-treeview data-cy="origam-treeview-node-playground-parent">
				<origam-treeview-node v-bind="state" data-cy="origam-treeview-node-playground"/>
			</origam-treeview>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.depth" title="depth"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTreeviewNode, OrigamTreeview } from '@origam/components'
	import type { ITreeviewNodeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Treeview/OrigamTreeviewNode.md"/>
