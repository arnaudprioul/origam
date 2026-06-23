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

		<Variant title="Slots - Default">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="true">
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
					<origam-app v-bind="state">
						<origam-toolbar title="Playground App"/>
						<origam-main>
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
	import { OrigamApp, OrigamMain, OrigamToolbar } from '@origam/components'
	import type { IAppProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/App/OrigamApp.md"/>
