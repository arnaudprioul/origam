<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumb"
	>
		<!-- Propagation smoke-test: parent color forwards to items -->
		<Variant title="Color">
			<origam-breadcrumb
					color="primary"
					:items="items"
			/>
		</Variant>

		<!-- Density -->
		<Variant title="Density">
			<origam-breadcrumb
					density="compact"
					:items="items"
			/>
		</Variant>

		<!-- Default (no parent color — items render with their own defaults) -->
		<Variant title="Default">
			<origam-breadcrumb :items="items"/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumb } from '@origam/components'

	const items = [
		{ title: 'Home', href: '/' },
		{ title: 'Section', href: '/section' },
		{ title: 'Current' }
	]
</script>
