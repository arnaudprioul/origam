<template>
	<Story
			group="components"
			title="ItemGroup/OrigamItem"
	>
		<!--
			Note: <origam-item> is a sub-component of <origam-item-group>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-item-group data-cy="origam-item-default-parent">
				<origam-item data-cy="origam-item-default"/>
			</origam-item-group>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IItemProps>({  })"
		>
			<template #default="{ state }">
			<origam-item-group data-cy="origam-item-playground-parent">
				<origam-item v-bind="state" data-cy="origam-item-playground"/>
			</origam-item-group>
			</template>
			<template #controls="{ state }">
				<!-- TODO: add HstControl bindings for the prop surface -->
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamItem, OrigamItemGroup } from '@origam/components'
	import type { IItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/ItemGroup/OrigamItem.md"/>
