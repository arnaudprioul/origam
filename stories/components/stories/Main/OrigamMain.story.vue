<template>
	<Story
			group="components"
			title="Main/OrigamMain"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IMainProps knob via the sidebar controls.
			Note: padding on <origam-main> itself overrides the layout-driven
			padding-inline-start. Apply padding on a child div instead.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IMainProps>({
					scrollable: false,
					rounded: undefined,
					tag: 'main'
				})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 260px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-main v-bind="state">
						<div class="demo-content">
							<p v-for="n in 10" :key="n">Line {{ n }}</p>
						</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.scrollable" title="scrollable"/>
				<HstSelect   v-model="state.rounded"    title="rounded" :options="roundedList"/>
				<HstSelect   v-model="state.tag"        title="tag"     :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — default layout">
			<origam-layout style="height: 280px; border: 1px dashed var(--origam-color__border---default, #ccc);">
				<origam-main>
					<div class="demo-content">Main content</div>
				</origam-main>
			</origam-layout>
		</Variant>

		<Variant
				title="Prop — scrollable"
				:init-state="() => useStoryInitState<{ scrollable?: boolean }>({ scrollable: true })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 280px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-main :scrollable="state.scrollable">
						<div class="demo-content">
							<p v-for="n in 30" :key="n">Long content line {{ n }}</p>
						</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.scrollable" title="scrollable"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 220px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-main :rounded="state.rounded">
						<div class="demo-content">rounded={{ state.rounded ?? '(unset)' }}</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'main' })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 220px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-main :tag="state.tag">
						<div class="demo-content">tag={{ state.tag }}</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-layout style="height: 220px;">
				<origam-main>
					<div class="demo-content">
						<strong>Custom slot content</strong>
						<p>Anything goes — pages, panels, ...</p>
					</div>
				</origam-main>
			</origam-layout>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLayout, OrigamMain } from '@origam/components'
	import type { IMainProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { roundedList, tagList } from '@stories/const'
</script>

<style scoped>
	.demo-content {
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
	}
</style>

<docs lang="md" src="@docs/components/Main/OrigamMain.md"/>
