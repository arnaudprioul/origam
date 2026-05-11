<template>
	<Story
			group="components"
			title="App/OrigamApp"
	>

		<Variant title="Default">
			<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="app-default">
				<origam-app :full-height="false" data-cy="app-default-inner">
					<origam-toolbar title="My Application" data-cy="app-default-toolbar"/>
					<origam-main style="padding: 16px;" data-cy="app-default-main">
						<p>Main content area</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant
				title="With Drawer"
				:init-state="() => useStoryInitState<{ drawerOpen: boolean }>({ drawerOpen: true })"
		>
			<template #default="{ state }">
				<!-- :full-height="false" lets OrigamApp respect its 360 px
				     parent instead of jumping to 100 vh (the default for
				     fullHeight: true). Without this, the inner Drawer
				     ($height = 100 % of layout wrapper = 100 vh) overflows
				     the 360 px story container by ~250 px — the "drawer
				     dépasse de son layout" bug the user reported. -->
				<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="app-drawer-host">
					<origam-app :full-height="false" data-cy="app-drawer">
						<origam-toolbar title="With Drawer" data-cy="app-drawer-toolbar">
							<template #prepend>
								<origam-btn
										:icon="MDI_ICONS.MENU"
										aria-label="Toggle drawer"
										data-cy="app-drawer-toggle"
										@click="state.drawerOpen = !state.drawerOpen"
								/>
							</template>
						</origam-toolbar>
						<origam-drawer v-model="state.drawerOpen" permanent data-cy="app-drawer-nav">
							<div style="padding: 16px;">Navigation</div>
						</origam-drawer>
						<origam-main style="padding: 16px;" data-cy="app-drawer-main">
							<p>Main content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.drawerOpen" title="drawerOpen"/>
			</template>
		</Variant>

		<Variant
				title="Full height"
				:init-state="() => useStoryInitState<{ fullHeight: boolean }>({ fullHeight: true })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="app-fullheight-host">
					<origam-app :full-height="state.fullHeight" data-cy="app-fullheight">
						<origam-toolbar title="Full height" data-cy="app-fullheight-toolbar"/>
						<origam-main style="padding: 16px;" data-cy="app-fullheight-main">
							<p>fullHeight={{ state.fullHeight }}</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>

		<Variant title="Slot — default">
			<div style="height: 280px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="app-slot-default-host">
				<origam-app :full-height="false" data-cy="app-slot-default">
					<origam-toolbar title="Slot app" data-cy="app-slot-default-toolbar"/>
					<origam-main style="padding: 16px;" data-cy="app-slot-default-main">
						<p>Content from the <strong>default slot</strong>.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ILayoutProps>({
					fullHeight: true
				})"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="app-playground-host">
					<origam-app v-bind="state" data-cy="app-playground">
						<origam-toolbar title="Playground App" data-cy="app-playground-toolbar"/>
						<origam-main style="padding: 16px;" data-cy="app-playground-main">
							<p>Playground content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamApp, OrigamBtn, OrigamDrawer, OrigamMain, OrigamToolbar } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ILayoutProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/App/OrigamApp.md"/>
