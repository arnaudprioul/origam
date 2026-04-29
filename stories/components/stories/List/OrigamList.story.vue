<template>
	<Story
			group="components"
			title="List/OrigamList"
	>
		<!-- Propagation: parent density forwards to list items -->
		<Variant title="Density">
			<origam-list density="compact">
				<origam-list-item title="Item one"/>
				<origam-list-item title="Item two"/>
				<origam-list-item title="Item three"/>
			</origam-list>
		</Variant>

		<!-- BgColor -->
		<Variant title="BgColor">
			<origam-list bg-color="primary">
				<origam-list-item title="Item one"/>
				<origam-list-item title="Item two"/>
			</origam-list>
		</Variant>

		<!-- Default -->
		<Variant title="Default">
			<origam-list>
				<origam-list-item title="Item one"/>
				<origam-list-item title="Item two"/>
			</origam-list>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamList, OrigamListItem } from '@origam/components'
</script>
