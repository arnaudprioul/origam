<template>
	<Story
			group="components"
			title="Icon/OrigamComponentIcon"
	>
		<!--
			Playground — first by convention. OrigamComponentIcon renders
			a Vue component passed as the `icon` prop.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IIconComponentProps>({
					size: undefined,
					tag: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-component-icon
						:icon="StarSvgComponent"
						v-bind="state"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
				<HstSelect v-model="state.tag"  title="tag"  :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-component-icon :size="state.size" :icon="StarSvgComponent"/>
				</div>
				<div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
					<origam-component-icon :icon="StarSvgComponent" size="x-small"/>
					<origam-component-icon :icon="StarSvgComponent" size="small"/>
					<origam-component-icon :icon="StarSvgComponent" size="default"/>
					<origam-component-icon :icon="StarSvgComponent" size="large"/>
					<origam-component-icon :icon="StarSvgComponent" size="x-large"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: undefined })"
		>
			<template #default="{ state }">
				<origam-component-icon
						:tag="state.tag"
						:icon="StarSvgComponent"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<Variant title="Prop — size (numeric override)">
			<div style="display: flex; gap: 16px; align-items: center;">
				<origam-component-icon :icon="StarSvgComponent" :size="16"/>
				<origam-component-icon :icon="StarSvgComponent" :size="24"/>
				<origam-component-icon :icon="StarSvgComponent" :size="40"/>
				<origam-component-icon :icon="StarSvgComponent" :size="64"/>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (overrides icon prop)">
			<origam-component-icon>
				<svg viewBox="0 0 24 24" style="width:1em;height:1em;fill:currentColor;" aria-hidden="true">
					<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
				</svg>
			</origam-component-icon>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { defineComponent, h } from 'vue'

	import { OrigamComponentIcon } from '@origam/components'
	import type { IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'

	// Inline lightweight Vue SVG component — no external icon-lib dependency.
	// Uses `currentColor` fill so it respects the design-token color cascade.
	const StarSvgComponent = defineComponent({
		name: 'StarSvgComponent',
		setup () {
			return () => h('svg', {
				viewBox: '0 0 24 24',
				style: 'width:1em;height:1em;fill:currentColor;',
				'aria-hidden': 'true',
			}, [
				h('path', {
					d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
				}),
			])
		},
	})
</script>

<docs lang="md" src="@docs/components/Icon/OrigamComponentIcon.md"/>
