<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanelHeader"
	>
		<!--
			Note: <origam-expansion-panel-header> is a sub-component of <origam-expansion-panel>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-expansion-panel data-cy="origam-expansion-panel-header-default-parent">
				<origam-expansion-panel-header data-cy="origam-expansion-panel-header-default"/>
			</origam-expansion-panel>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelHeaderProps>({  })"
		>
			<template #default="{ state }">
			<origam-expansion-panel data-cy="origam-expansion-panel-header-playground-parent">
				<origam-expansion-panel-header v-bind="state" data-cy="origam-expansion-panel-header-playground"/>
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
	import { OrigamExpansionPanelHeader, OrigamExpansionPanel } from '@origam/components'
	import type { IExpansionPanelHeaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/ExpansionPanel/OrigamExpansionPanelHeader.md"/>
