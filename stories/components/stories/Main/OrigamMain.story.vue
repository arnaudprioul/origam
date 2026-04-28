<template>
	<Story
			group="components"
			title="Main/OrigamMain"
	>

		<!--
			OrigamMain reads the surrounding OrigamLayout. To keep stories
			self-contained, every variant wraps the component in a small
			layout shell so the layout-aware behaviour is visible.
		-->

		<!-- ════════════ BASIC USAGE ════════════ -->
		<Variant title="Basic usage">
			<origam-layout style="height: 280px; border: 1px dashed var(--origam-color-border-default, #ccc);">
				<origam-main>
					<div class="demo-content">Main content</div>
				</origam-main>
			</origam-layout>
		</Variant>

		<!-- ════════════ SCROLLABLE ════════════ -->
		<Variant
				title="Scrollable"
				:init-state="() => useStoryInitState<{ scrollable?: boolean }>({ scrollable: true })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 280px; border: 1px dashed var(--origam-color-border-default, #ccc);">
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

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 220px; border: 1px dashed var(--origam-color-border-default, #ccc);">
					<origam-main :rounded="state.rounded">
						<div class="demo-content">rounded={{ state.rounded ?? '(unset)' }}</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'main' })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 220px; border: 1px dashed var(--origam-color-border-default, #ccc);">
					<origam-main :tag="state.tag">
						<div class="demo-content">tag={{ state.tag }}</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-layout style="height: 220px;">
				<origam-main>
					<div class="demo-content">
						<strong>Custom slot content</strong>
						<p>Anything goes — pages, panels, …</p>
					</div>
				</origam-main>
			</origam-layout>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IMainProps>({
					scrollable: false,
					rounded: undefined,
					tag: 'main'
				})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 260px; border: 1px dashed var(--origam-color-border-default, #ccc);">
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
		background: var(--origam-color-surface-default, #fff);
	}
</style>

<docs lang="md" src="@docs/components/Main/OrigamMain.md"/>
