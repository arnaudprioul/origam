<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanelContent"
	>
		<!--
			Note: <origam-expansion-panel-content> is a sub-component of <origam-expansion-panel>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-expansion-panel data-cy="origam-expansion-panel-content-default-parent">
				<origam-expansion-panel-content data-cy="origam-expansion-panel-content-default"/>
			</origam-expansion-panel>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelContentProps>({  })"
		>
			<template #default="{ state }">
			<origam-expansion-panel data-cy="origam-expansion-panel-content-playground-parent">
				<origam-expansion-panel-content v-bind="state" data-cy="origam-expansion-panel-content-playground"/>
			</origam-expansion-panel>
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
	import { OrigamExpansionPanelContent, OrigamExpansionPanel } from '@origam/components'
	import type { IExpansionPanelContentProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/ExpansionPanel/OrigamExpansionPanelContent.md"/>
