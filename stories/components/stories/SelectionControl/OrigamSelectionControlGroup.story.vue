<template>
	<Story
			group="components"
			title="SelectionControl/OrigamSelectionControlGroup"
	>
		<!-- Propagation: parent density forwards to controls -->
		<Variant title="Propagation density">
			<origam-selection-control-group density="compact" type="checkbox">
				<origam-selection-control label="Option A" value="a"/>
				<origam-selection-control label="Option B" value="b"/>
			</origam-selection-control-group>
		</Variant>

		<!-- Propagation color -->
		<Variant title="Propagation color">
			<origam-selection-control-group color="primary" type="checkbox">
				<origam-selection-control label="Option A" value="a"/>
				<origam-selection-control label="Option B" value="b"/>
			</origam-selection-control-group>
		</Variant>

		<!-- Default -->
		<Variant title="Default">
			<origam-selection-control-group type="checkbox">
				<origam-selection-control label="Option A" value="a"/>
				<origam-selection-control label="Option B" value="b"/>
			</origam-selection-control-group>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSelectionControl, OrigamSelectionControlGroup } from '@origam/components'
</script>
