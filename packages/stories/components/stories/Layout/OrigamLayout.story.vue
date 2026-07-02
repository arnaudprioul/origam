<template>
	<Story
			group="components"
			title="Layout/OrigamLayout"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ILayoutProps>>({})"
		>
			<template #default="{ state }">
				<origam-layout
						:color="state.color"
						:bg-color="state.bgColor"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:width="state.width"
						:height="state.height || '280px'"
						:min-height="state.minHeight"
						:min-width="state.minWidth"
						:max-height="state.maxHeight"
						:max-width="state.maxWidth"
						:margin="state.margin"
						:padding="state.padding"
				>
					<div class="demo-stack">
						<div class="demo-bar">AppBar (mock)</div>
						<div class="demo-main">Main content</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin"  title="Margin"/>
					<HstText v-model="state.padding" title="Padding"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ILayoutProps> & { overlapsRaw: string }>({ fullHeight: false, overlaps: [], overlapsRaw: '' })"
		>
			<template #default="{ state }">
				<origam-layout
						:full-height="state.fullHeight"
						:overlaps="state.overlapsRaw ? [state.overlapsRaw] : []"
						style="height: 280px; border: 1px dashed var(--origam-color__border---default, #ccc);"
				>
					<div class="demo-stack">
						<div class="demo-bar">AppBar (mock)</div>
						<div class="demo-row">
							<div class="demo-drawer">Drawer (mock)</div>
							<div class="demo-main">Main content</div>
						</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.fullHeight" title="Full Height"/>
				</StoryGroup>
				<StoryGroup title="Overlaps">
					<HstText v-model="state.overlapsRaw" title="Overlaps (pair, e.g. AppBar:Drawer)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-layout style="height: 240px; border: 1px dashed var(--origam-color__border---default, #ccc);">
				<div class="demo-main">Custom slot content</div>
			</origam-layout>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ILayoutProps>({ fullHeight: false, overlaps: [] })"
		>
			<template #default="{ state }">
				<origam-layout
						v-bind="state"
						style="height: 280px;"
				>
					<div class="demo-stack">
						<div class="demo-bar">AppBar (mock)</div>
						<div class="demo-main">Main content</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
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
	import { OrigamLayout } from '@origam/components'
	import type { ILayoutProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.demo-bar {
		padding: 8px 12px;
		background: var(--origam-color__surface---overlay, #ececec);
		border-bottom: 1px solid var(--origam-color__border---default, #e5e5e5);
		font-size: 0.85em;
	}

	.demo-row {
		display: flex;
		flex: 1 1 auto;
	}

	.demo-drawer {
		width: 120px;
		padding: 8px 12px;
		background: var(--origam-color__surface---overlay, #ececec);
		border-right: 1px solid var(--origam-color__border---default, #e5e5e5);
		font-size: 0.85em;
	}

	.demo-main {
		flex: 1 1 auto;
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
	}
</style>

<docs lang="md" src="@docs/components/Layout/OrigamLayout.md"/>
