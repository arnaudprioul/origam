<template>
	<Story
			group="components"
			title="List/OrigamListGroupActivator"
	>
		<!--
			Note: <origam-list-group-activator> is a sub-component of <origam-list>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-list data-cy="origam-list-group-activator-default-parent">
				<origam-list-group-activator data-cy="origam-list-group-activator-default"/>
			</origam-list>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IListActivatorProps>({  })"
		>
			<template #default="{ state }">
			<origam-list data-cy="origam-list-group-activator-playground-parent">
				<origam-list-group-activator v-bind="state" data-cy="origam-list-group-activator-playground"/>
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
	import { OrigamListGroupActivator, OrigamList } from '@origam/components'
	import type { IListActivatorProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/List/OrigamListGroupActivator.md"/>
