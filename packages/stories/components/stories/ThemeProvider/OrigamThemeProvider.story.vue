<template>
	<Story
			group="components"
			title="ThemeProvider/OrigamThemeProvider"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			OrigamThemeProvider knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{ theme?: string; mode?: string; tag?: string }>({ theme: 'light', mode: 'auto', tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :theme="state.theme" :mode="state.mode" :tag="state.tag" style="padding: 16px; display: block;">
					<origam-btn color="primary" text="Themed button"/>
					<origam-btn variant="outlined" text="Outlined" style="margin-left: 8px;"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.theme" title="theme" :options="themeList"/>
				<HstSelect v-model="state.mode"  title="mode"  :options="modeList"/>
				<HstSelect v-model="state.tag"   title="tag"   :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — theme (light)">
			<origam-theme-provider theme="light" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Light theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — theme (dark)">
			<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Dark theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — theme (auto)">
			<origam-theme-provider theme="auto" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Auto theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — mode (light)">
			<origam-theme-provider mode="light" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Light mode button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — mode (dark)">
			<origam-theme-provider mode="dark" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Dark mode button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — theme + mode">
			<origam-theme-provider theme="brand-a" mode="dark" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="brand-a / dark"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Prop — nested providers">
			<origam-theme-provider theme="light" style="padding: 16px; display: block;">
				<origam-btn text="Light" color="primary" style="margin-bottom: 8px; display: block;"/>
				<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
					<origam-btn text="Dark (nested)" color="primary"/>
				</origam-theme-provider>
			</origam-theme-provider>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'section' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :tag="state.tag" theme="light" style="padding: 16px; display: block;">
					<origam-btn text="Button" color="primary"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
				<template #default>
					<origam-btn text="From slot" color="primary"/>
				</template>
			</origam-theme-provider>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamThemeProvider } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'

	const themeList = [
		{ label: 'light', value: 'light' },
		{ label: 'dark',  value: 'dark' },
		{ label: 'auto',  value: 'auto' },
	]

	const modeList = [
		{ label: 'auto',  value: 'auto' },
		{ label: 'light', value: 'light' },
		{ label: 'dark',  value: 'dark' },
	]
</script>

<docs lang="md" src="@docs/components/ThemeProvider/OrigamThemeProvider.md"/>
