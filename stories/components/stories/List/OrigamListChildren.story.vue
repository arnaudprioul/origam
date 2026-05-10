<template>
	<Story
			group="components"
			title="List/OrigamListChildren"
	>
		<!--
			Note: <origam-list-children> is a sub-component of <origam-list>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-list data-cy="origam-list-children-default-parent">
				<origam-list-children data-cy="origam-list-children-default"/>
			</origam-list>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IListChildrenProps>({  })"
		>
			<template #default="{ state }">
			<origam-list data-cy="origam-list-children-playground-parent">
				<origam-list-children v-bind="state" data-cy="origam-list-children-playground"/>
			</origam-list>
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
	import { OrigamListChildren, OrigamList } from '@origam/components'
	import type { IListChildrenProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/List/OrigamListChildren.md"/>
