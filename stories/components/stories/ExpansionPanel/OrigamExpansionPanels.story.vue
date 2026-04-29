<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanels"
	>
		<!-- Propagation: parent density forwards to panels -->
		<Variant title="Density">
			<origam-expansion-panels density="compact">
				<origam-expansion-panel title="Panel 1">Content 1</origam-expansion-panel>
				<origam-expansion-panel title="Panel 2">Content 2</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- BgColor -->
		<Variant title="BgColor">
			<origam-expansion-panels bg-color="primary">
				<origam-expansion-panel title="Panel 1">Content 1</origam-expansion-panel>
				<origam-expansion-panel title="Panel 2">Content 2</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- Default -->
		<Variant title="Default">
			<origam-expansion-panels>
				<origam-expansion-panel title="Panel 1">Content 1</origam-expansion-panel>
				<origam-expansion-panel title="Panel 2">Content 2</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamExpansionPanel, OrigamExpansionPanels } from '@origam/components'
</script>
