<template>
	<Story
			group="components"
			title="Layout/OrigamLayout"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ILayoutProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ILayoutProps>({
					fullHeight: false,
					overlaps: []
				})"
		>
			<template #default="{ state }">
				<origam-layout v-bind="state" style="height: 280px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<div class="demo-stack">
						<div class="demo-bar">AppBar</div>
						<div class="demo-main">Main</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — default layout">
			<origam-layout style="height: 320px; border: 1px dashed var(--origam-color__border---default, #ccc);">
				<div class="demo-stack">
					<div class="demo-bar">SystemBar (mock)</div>
					<div class="demo-bar">AppBar (mock)</div>
					<div class="demo-main">Main content</div>
				</div>
			</origam-layout>
		</Variant>

		<Variant
				title="Prop — fullHeight"
				:init-state="() => useStoryInitState<{ fullHeight?: boolean }>({ fullHeight: false })"
		>
			<template #default="{ state }">
				<origam-layout
						:full-height="state.fullHeight"
						style="border: 1px dashed var(--origam-color__border---default, #ccc); min-height: 200px;"
				>
					<div class="demo-stack">
						<div class="demo-bar">AppBar (mock)</div>
						<div class="demo-main">Main content</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullHeight" title="fullHeight"/>
			</template>
		</Variant>

		<Variant
				title="Prop — overlaps"
				:init-state="() => useStoryInitState<{ overlaps?: string }>({ overlaps: 'AppBar:Drawer' })"
		>
			<template #default="{ state }">
				<origam-layout
						:overlaps="state.overlaps ? [state.overlaps] : []"
						style="height: 280px; border: 1px dashed var(--origam-color__border---default, #ccc);"
				>
					<div class="demo-stack">
						<div class="demo-bar">AppBar (mock — id="AppBar")</div>
						<div class="demo-row">
							<div class="demo-drawer">Drawer (mock — id="Drawer")</div>
							<div class="demo-main">Main content</div>
						</div>
					</div>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.overlaps" title="overlaps (single pair, e.g. AppBar:Drawer)"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-layout style="height: 240px;">
				<div class="demo-main">Custom slot content</div>
			</origam-layout>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLayout } from '@origam/components'
	import type { ILayoutProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
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
