<template>
	<Story
			group="components"
			title="SystemBar/OrigamSystemBar"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ISystemBarProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISystemBarProps>({
					window: false,
					color: undefined,
					bgColor: undefined,
					elevation: undefined,
					rounded: undefined,
					absolute: false,
					tag: 'div',
					name: 'systembar',
					order: '0'
				})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 200px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar v-bind="state">
						<span>SystemBar playground</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.window"    title="window"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.absolute"  title="absolute"/>
				<HstSelect   v-model="state.tag"       title="tag"       :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — window"
				:init-state="() => useStoryInitState<{ window?: boolean }>({ window: false })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 200px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar :window="state.window" name="systembar" order="0">
						<span>window={{ state.window }} (32px when true)</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main content (pushed by the bar)</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.window" title="window (32px)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar v-bind="state" name="systembar" order="0">
						<span>color={{ state.color ?? '(unset)' }}, bgColor={{ state.bgColor ?? '(unset)' }}</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
				:init-state="() => useStoryInitState<IElevationProps>({})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar :elevation="state.elevation" name="systembar" order="0">
						<span>elevation={{ state.elevation ?? '(unset)' }}</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar :rounded="state.rounded" name="systembar" order="0">
						<span>rounded={{ state.rounded ?? '(unset)' }}</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — absolute"
				:init-state="() => useStoryInitState<{ absolute?: boolean }>({ absolute: false })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar :absolute="state.absolute" name="systembar" order="0">
						<span>absolute={{ state.absolute }}</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main (overlapped when absolute)</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.absolute" title="absolute"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
					<origam-system-bar :tag="state.tag" name="systembar" order="0">
						<span>tag={{ state.tag }}</span>
					</origam-system-bar>
					<origam-main>
						<div class="demo-content">main</div>
					</origam-main>
				</origam-layout>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-layout style="height: 180px; border: 1px dashed var(--origam-color__border---default, #ccc);">
				<origam-system-bar window name="systembar" order="0">
					<strong>App name</strong>
					<span style="opacity: 0.7; margin-inline-start: 12px;">— ready</span>
				</origam-system-bar>
				<origam-main>
					<div class="demo-content">main</div>
				</origam-main>
			</origam-layout>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLayout, OrigamMain, OrigamSystemBar } from '@origam/components'
	import type {
		IColorProps,
		IElevationProps,
		IRoundedProps,
		ISystemBarProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		elevationList,
		intentList,
		roundedList,
		tagList
	} from '@stories/const'
</script>

<style scoped>
	.demo-content {
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
	}
</style>

<docs lang="md" src="@docs/components/SystemBar/OrigamSystemBar.md"/>
