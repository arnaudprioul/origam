<template>
	<Story
			group="components"
			title="BottomNav/OrigamBottomNav"
	>
		<!-- Propagation: parent color forwards to btn children -->
		<Variant title="Propagation color">
			<div style="position: relative; height: 80px; width: 100%;">
				<origam-bottom-nav
						color="primary"
						:model-value="true"
						:items="navItems"
						style="position: relative; transform: none;"
				/>
			</div>
		</Variant>

		<!-- Propagation density -->
		<Variant title="Propagation density">
			<div style="position: relative; height: 80px; width: 100%;">
				<origam-bottom-nav
						density="compact"
						:model-value="true"
						:items="navItems"
						style="position: relative; transform: none;"
				/>
			</div>
		</Variant>

		<!-- Default -->
		<Variant title="Default">
			<div style="position: relative; height: 80px; width: 100%;">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						style="position: relative; transform: none;"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBottomNav } from '@origam/components'

	const navItems = [
		{ text: 'Home', prependIcon: 'mdi-home', value: 'home' },
		{ text: 'Search', prependIcon: 'mdi-magnify', value: 'search' },
		{ text: 'Profile', prependIcon: 'mdi-account', value: 'profile' }
	]
</script>
