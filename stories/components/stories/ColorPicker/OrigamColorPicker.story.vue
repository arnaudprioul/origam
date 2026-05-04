<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPicker"
	>

		<!-- ════════════ CANVAS ════════════ -->
		<Variant
				title="Canvas"
				:init-state="() => useStoryInitState<{
					hideCanvas?: boolean
					canvasHeight?: number
					canvasWidth?: string
				}>({ hideCanvas: false, canvasHeight: 150, canvasWidth: '100%' })"
		>
			<template #default="{ state }">
				<origam-color-picker
						v-model="color"
						:hide-canvas="state.hideCanvas"
						:canvas-height="state.canvasHeight"
						:canvas-width="state.canvasWidth"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideCanvas"  title="hideCanvas"/>
				<HstNumber   v-model="state.canvasHeight" title="canvasHeight"/>
				<HstText     v-model="state.canvasWidth"  title="canvasWidth"/>
			</template>
		</Variant>

		<!-- ════════════ MODE ════════════ -->
		<Variant
				title="Mode"
				:init-state="() => useStoryInitState<{ mode?: TColorModes }>({ mode: COLOR_MODES_NAMES.RGBA })"
		>
			<template #default="{ state }">
				<origam-color-picker
						v-model="color"
						:mode="state.mode"
						:modes="colorModeList.map(o => o.value).filter(Boolean)"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.mode" title="mode" :options="colorModeList"/>
			</template>
		</Variant>

		<!-- ════════════ SLIDERS & INPUTS ════════════ -->
		<Variant
				title="Sliders and inputs"
				:init-state="() => useStoryInitState<{
					hideSliders?: boolean
					hideInputs?: boolean
				}>({ hideSliders: false, hideInputs: false })"
		>
			<template #default="{ state }">
				<origam-color-picker
						v-model="color"
						:hide-sliders="state.hideSliders"
						:hide-inputs="state.hideInputs"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideSliders" title="hideSliders"/>
				<HstCheckbox v-model="state.hideInputs"  title="hideInputs"/>
			</template>
		</Variant>

		<!-- ════════════ SWATCHES ════════════ -->
		<Variant
				title="Swatches"
				:init-state="() => useStoryInitState<{
					showSwatches?: boolean
					swatchesMaxHeight?: number
				}>({ showSwatches: true, swatchesMaxHeight: 150 })"
		>
			<template #default="{ state }">
				<origam-color-picker
						v-model="color"
						:show-swatches="state.showSwatches"
						:swatches-max-height="state.swatchesMaxHeight"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showSwatches"     title="showSwatches"/>
				<HstNumber   v-model="state.swatchesMaxHeight" title="swatchesMaxHeight"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: title ════════════ -->
		<Variant title="Slot — title">
			<origam-color-picker v-model="color">
				<template #title>
					<strong>Pick a colour</strong>
				</template>
			</origam-color-picker>
		</Variant>

		<!-- ════════════ SLOT: actions ════════════ -->
		<Variant title="Slot — actions">
			<origam-color-picker v-model="color">
				<template #actions>
					<origam-btn color="primary" text="Apply" size="small"/>
				</template>
			</origam-color-picker>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-color-picker
					v-model="color"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:mode ════════════ -->
		<Variant title="Emit — update:mode">
			<origam-color-picker
					v-model="color"
					@update:mode="logEvent('update:mode', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					hideCanvas?: boolean
					hideSliders?: boolean
					hideInputs?: boolean
					showSwatches?: boolean
					mode?: TColorModes
					canvasHeight?: number
					swatchesMaxHeight?: number
				}>({
					hideCanvas: false,
					hideSliders: false,
					hideInputs: false,
					showSwatches: false,
					mode: COLOR_MODES_NAMES.RGBA,
					canvasHeight: 150,
					swatchesMaxHeight: 150
				})"
		>
			<template #default="{ state }">
				<origam-color-picker
						v-model="color"
						v-bind="state"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideCanvas"       title="hideCanvas"/>
				<HstCheckbox v-model="state.hideSliders"      title="hideSliders"/>
				<HstCheckbox v-model="state.hideInputs"       title="hideInputs"/>
				<HstCheckbox v-model="state.showSwatches"     title="showSwatches"/>
				<HstSelect   v-model="state.mode"             title="mode" :options="colorModeList"/>
				<HstNumber   v-model="state.canvasHeight"     title="canvasHeight"/>
				<HstNumber   v-model="state.swatchesMaxHeight" title="swatchesMaxHeight"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamBtn, OrigamColorPicker } from '@origam/components'
	import { COLOR_MODES_NAMES } from '@origam/enums'
	import type { TColorModes } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const color = ref('#42a5f5')

	const colorModeList = [
		{ label: 'RGB',  value: COLOR_MODES_NAMES.RGB },
		{ label: 'RGBA', value: COLOR_MODES_NAMES.RGBA },
		{ label: 'HSL',  value: COLOR_MODES_NAMES.HSL },
		{ label: 'HSLA', value: COLOR_MODES_NAMES.HSLA },
		{ label: 'HEX',  value: COLOR_MODES_NAMES.HEX },
		{ label: 'HEXA', value: COLOR_MODES_NAMES.HEXA },
	]
</script>

<docs lang="md" src="@docs/components/ColorPicker/OrigamColorPicker.md"/>
