<template>
	<Story
			group="components"
			title="ThemeProvider/OrigamThemeProvider"
	>

		<Variant title="Light theme">
			<origam-theme-provider theme="light" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Light theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Dark theme">
			<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Dark theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Auto (inherits from ancestor)">
			<origam-theme-provider theme="auto" style="padding: 16px; display: block;">
				<origam-btn color="primary" text="Auto theme button"/>
			</origam-theme-provider>
		</Variant>

		<Variant title="Nested providers">
			<origam-theme-provider theme="light" style="padding: 16px; display: block;">
				<origam-btn text="Light" color="primary" style="margin-bottom: 8px; display: block;"/>
				<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
					<origam-btn text="Dark (nested)" color="primary"/>
				</origam-theme-provider>
			</origam-theme-provider>
		</Variant>

		<Variant
				title="Tag"
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

		<Variant title="Slot — default">
			<origam-theme-provider theme="dark" style="padding: 16px; display: block;">
				<template #default>
					<origam-btn text="From slot" color="primary"/>
				</template>
			</origam-theme-provider>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ theme?: string; tag?: string }>({ theme: 'light', tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :theme="state.theme" :tag="state.tag" style="padding: 16px; display: block;">
					<origam-btn color="primary" text="Themed button"/>
					<origam-btn variant="outlined" text="Outlined" style="margin-left: 8px;"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.theme" title="theme" :options="themeList"/>
				<HstSelect v-model="state.tag"   title="tag"   :options="tagList"/>
			</template>
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
</script>

<docs lang="md" src="@docs/components/ThemeProvider/OrigamThemeProvider.md"/>
