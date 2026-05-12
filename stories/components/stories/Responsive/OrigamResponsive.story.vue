<template>
	<Story
			group="components"
			title="Responsive/OrigamResponsive"
	>
		<!--
			Playground — first by convention. Exposes every IResponsiveProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IResponsiveProps>({
					aspectRatio: '16/9',
					inline: false,
					maxWidth: 480,
					rounded: undefined,
					border: undefined
				})"
		>
			<template #default="{ state }">
				<origam-responsive v-bind="state">
					<div class="demo-fill">playground</div>
				</origam-responsive>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.aspectRatio" title="aspectRatio" :options="aspectRatioList"/>
				<HstCheckbox v-model="state.inline"      title="inline"/>
				<HstNumber   v-model="state.maxWidth"    title="maxWidth"/>
				<HstNumber   v-model="state.minWidth"    title="minWidth"/>
				<HstNumber   v-model="state.width"       title="width"/>
				<HstNumber   v-model="state.height"      title="height"/>
				<HstCheckbox v-model="state.rounded"     title="rounded"/>
				<HstCheckbox v-model="state.border"      title="border"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — aspectRatio"
				:init-state="() => useStoryInitState<{ aspectRatio?: string | number }>({ aspectRatio: '16/9' })"
		>
			<template #default="{ state }">
				<origam-responsive :aspect-ratio="state.aspectRatio" style="max-width: 480px;">
					<div class="demo-fill">{{ state.aspectRatio }}</div>
				</origam-responsive>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.aspectRatio"
						title="aspectRatio"
						:options="aspectRatioList"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — inline"
				:init-state="() => useStoryInitState<{ inline?: boolean }>({ inline: true })"
		>
			<template #default="{ state }">
				<p>
					Embedded
					<origam-responsive
							:inline="state.inline"
							aspect-ratio="1/1"
							:width="40"
							:height="40"
							style="vertical-align: middle;"
					>
						<div class="demo-fill" style="background: var(--origam-color-action-primary-bg, #1d4ed8);"/>
					</origam-responsive>
					inside a sentence — `inline` toggles between block and inline-flex.
				</p>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inline" title="inline"/>
			</template>
		</Variant>

		<Variant
				title="Prop — dimensions (width / height / maxWidth)"
				:init-state="() => useStoryInitState<IDimensionProps & { aspectRatio?: string }>({
					aspectRatio: '16/9',
					maxWidth: 360
				})"
		>
			<template #default="{ state }">
				<origam-responsive v-bind="state">
					<div class="demo-fill">maxWidth={{ state.maxWidth }}</div>
				</origam-responsive>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.aspectRatio" title="aspectRatio" :options="aspectRatioList"/>
				<HstNumber v-model="state.maxWidth"   title="maxWidth"/>
				<HstNumber v-model="state.minWidth"   title="minWidth"/>
				<HstNumber v-model="state.width"      title="width"/>
				<HstNumber v-model="state.height"     title="height"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded & border"
				:init-state="() => useStoryInitState<{
					rounded?: boolean
					border?: boolean
					aspectRatio?: string
				}>({ aspectRatio: '16/9' })"
		>
			<template #default="{ state }">
				<origam-responsive
						:rounded="state.rounded"
						:border="state.border"
						:aspect-ratio="state.aspectRatio"
						style="max-width: 360px;"
				>
					<div class="demo-fill">modifiers</div>
				</origam-responsive>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.rounded" title="rounded"/>
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstSelect   v-model="state.aspectRatio" title="aspectRatio" :options="aspectRatioList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-responsive aspect-ratio="16/9" style="max-width: 480px;">
				<div class="demo-fill">
					<strong>Default slot content</strong>
				</div>
			</origam-responsive>
		</Variant>

		<Variant title="Slot — additional (overlay)">
			<origam-responsive aspect-ratio="16/9" style="max-width: 480px; position: relative;">
				<div class="demo-fill">main media</div>
				<template #additional>
					<span style="position: absolute; top: 8px; left: 8px; padding: 4px 8px; background: rgba(0, 0, 0, 0.6); color: #fff; font-size: 0.75rem; border-radius: 4px;">
						LIVE
					</span>
				</template>
			</origam-responsive>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamResponsive } from '@origam/components'
	import type {
		IDimensionProps,
		IOptions,
		IResponsiveProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	// Local-only — `aspectRatio` shortcuts; not promoted to `/stories/const`
	// since `<OrigamResponsive>` is currently the only consumer.
	const aspectRatioList: Array<IOptions<string | number>> = [
		{ label: '(none)', value: undefined },
		{ label: '16/9 (default)', value: '16/9' },
		{ label: '4/3', value: '4/3' },
		{ label: '1/1 (square)', value: '1/1' },
		{ label: '3/4 (portrait)', value: '3/4' },
		{ label: '2.39/1 (cinema)', value: '2.39/1' },
	]
</script>

<style scoped>
	.demo-fill {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: var(--origam-color-surface-overlay, #ececec);
		border: 1px solid var(--origam-color-border-default, #e5e5e5);
		color: var(--origam-color-text-primary, #111);
		font-weight: 500;
	}
</style>

<docs lang="md" src="@docs/components/Responsive/OrigamResponsive.md"/>
