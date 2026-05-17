<template>
	<Story
			group="components"
			title="App/OrigamApp"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ILayoutProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ILayoutProps>({
					fullHeight: false
				})"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color__border---subtle, #ccc);" data-cy="app-playground-host">
					<origam-app v-bind="state" data-cy="app-playground">
						<origam-toolbar title="Playground App" data-cy="app-playground-toolbar"/>
						<origam-main data-cy="app-playground-main">
							<div style="padding: 12px;">Playground content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — fullHeight"
				:init-state="() => useStoryInitState<{ fullHeight: boolean }>({ fullHeight: false })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color__border---subtle, #ccc);" data-cy="app-fullheight-host">
					<origam-app :full-height="state.fullHeight" data-cy="app-fullheight">
						<origam-toolbar title="Full height" data-cy="app-fullheight-toolbar"/>
						<origam-main data-cy="app-fullheight-main">
							<div style="padding: 12px;">fullHeight={{ state.fullHeight }}</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>

		<Variant
				title="Prop — drawer (with Drawer child)"
				:init-state="() => useStoryInitState<{ drawerOpen: boolean }>({ drawerOpen: true })"
		>
			<template #default="{ state }">
				<div style="height: 360px; border: 1px solid var(--origam-color__border---subtle, #ccc);" data-cy="app-drawer-host">
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
						<origam-main data-cy="app-drawer-main">
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.drawerOpen" title="drawerOpen"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);" data-cy="app-slot-default-host">
				<origam-app :full-height="false" data-cy="app-slot-default">
					<origam-toolbar title="Slot app" data-cy="app-slot-default-toolbar"/>
					<origam-main data-cy="app-slot-default-main">
						<div style="padding: 12px;">Content from the <strong>default slot</strong>.</div>
					</origam-main>
				</origam-app>
			</div>
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
