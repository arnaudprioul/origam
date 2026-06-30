<template>
	<Story
			group="components"
			title="App/OrigamApp"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAppProps>>({ bgColor: 'surface', color: 'on-surface' })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app
							:bg-color="state.bgColor"
							:color="state.color"
							:full-height="true"
					>
						<origam-toolbar title="Design Preview"/>
						<origam-main>
							<div style="padding: 12px;">App content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IAppProps>>({ fullHeight: true })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app
							:full-height="state.fullHeight"
							:overlaps="state.overlaps"
					>
						<origam-toolbar title="Functional Preview"/>
						<origam-main>
							<div style="padding: 12px;">fullHeight={{ state.fullHeight }}</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.fullHeight" title="Full Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Prop — fullHeight">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="true" data-cy="app-fullheight">
					<origam-toolbar title="Full Height App"/>
					<origam-main>
						<div style="padding: 12px;">fullHeight=true — fills the container height</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Prop — drawer (with Drawer child)">
			<div style="height: 360px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="true">
					<origam-toolbar title="App with Drawer">
						<template #prepend>
							<origam-btn :icon="menuIcon" aria-label="Open navigation" data-cy="app-drawer-toggle"/>
						</template>
					</origam-toolbar>
					<origam-drawer permanent data-cy="app-drawer-nav">
						<div style="padding: 12px;">Navigation items</div>
					</origam-drawer>
					<origam-main>
						<div style="padding: 12px;">Content area</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="true" data-cy="app-slot-default">
					<origam-toolbar title="Custom Slot"/>
					<origam-main>
						<div style="padding: 12px;">Content from the <strong>default slot</strong>.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAppProps>({ fullHeight: true })"
		>
			<template #default="{ state }">
				<div style="height: 360px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app v-bind="state" data-cy="app-playground">
						<origam-toolbar title="Playground App" data-cy="app-playground-toolbar"/>
						<origam-main data-cy="app-playground-main">
							<div style="padding: 12px;">Playground content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.fullHeight" title="Full Height"/>
				</StoryGroup>
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
	import type { IAppProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'

	const menuIcon = MDI_ICONS.MENU
</script>

<docs lang="md" src="@docs/components/App/OrigamApp.md"/>
