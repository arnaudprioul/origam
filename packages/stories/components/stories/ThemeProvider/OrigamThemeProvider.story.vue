<template>
	<Story
			group="components"
			title="ThemeProvider/OrigamThemeProvider"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<{ theme?: string; mode?: string }>({ theme: 'light', mode: 'auto' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :theme="state.theme" :mode="state.mode">
					<origam-btn color="primary" text="Themed button"/>
					<origam-btn variant="outlined" text="Outlined"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Theme">
					<HstSelect v-model="state.theme" title="Theme" :options="THEME_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Mode">
					<HstSelect v-model="state.mode" title="Mode" :options="MODE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :tag="state.tag" theme="light">
					<origam-btn color="primary" text="Button"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-theme-provider theme="dark">
				<template #default>
					<origam-btn text="From default slot" color="primary"/>
				</template>
			</origam-theme-provider>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{ theme?: string; mode?: string; tag?: string }>({ theme: 'light', mode: 'auto', tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-theme-provider :theme="state.theme" :mode="state.mode" :tag="state.tag">
					<origam-btn color="primary" text="Themed button"/>
					<origam-btn variant="outlined" text="Outlined"/>
				</origam-theme-provider>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.theme" title="Theme" :options="THEME_OPTIONS"/>
					<HstSelect v-model="state.mode"  title="Mode"  :options="MODE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamThemeProvider } from '@origam/components'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { TAG_OPTIONS } from '@stories/const'

	const THEME_OPTIONS = [
		{ label: 'auto',    value: 'auto' },
		{ label: 'light',   value: 'light' },
		{ label: 'dark',    value: 'dark' },
		{ label: 'brand-a', value: 'brand-a' },
	]

	const MODE_OPTIONS = [
		{ label: 'auto',  value: 'auto' },
		{ label: 'light', value: 'light' },
		{ label: 'dark',  value: 'dark' },
	]
</script>

<docs lang="md" src="@docs/components/ThemeProvider/OrigamThemeProvider.md"/>
