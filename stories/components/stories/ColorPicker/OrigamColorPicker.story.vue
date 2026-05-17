<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPicker"
	>
		<!--
			Playground — first by convention. All props wired via sidebar
			controls so the consumer can exercise the full API in one place.
		-->
		<Variant
				title="Default"
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
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							v-bind="state"
							data-cy="color-picker-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideCanvas"        title="hideCanvas"/>
				<HstCheckbox v-model="state.hideSliders"       title="hideSliders"/>
				<HstCheckbox v-model="state.hideInputs"        title="hideInputs"/>
				<HstCheckbox v-model="state.showSwatches"      title="showSwatches"/>
				<HstSelect   v-model="state.mode"              title="mode" :options="colorModeList"/>
				<HstNumber   v-model="state.canvasHeight"      title="canvasHeight"/>
				<HstNumber   v-model="state.swatchesMaxHeight" title="swatchesMaxHeight"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — hideCanvas"
				:init-state="() => useStoryInitState<{ hideCanvas: boolean }>({ hideCanvas: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							:hide-canvas="state.hideCanvas"
							data-cy="color-picker-hide-canvas"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideCanvas" title="hideCanvas"/>
			</template>
		</Variant>

		<Variant
				title="Prop — canvasHeight"
				:init-state="() => useStoryInitState<{ canvasHeight: number }>({ canvasHeight: 150 })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							:canvas-height="state.canvasHeight"
							data-cy="color-picker-canvas-height"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.canvasHeight" title="canvasHeight" :min="50" :max="400"/>
			</template>
		</Variant>

		<Variant
				title="Prop — mode"
				:init-state="() => useStoryInitState<{ mode: TColorModes }>({ mode: COLOR_MODES_NAMES.RGBA })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							:mode="state.mode"
							data-cy="color-picker-mode"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.mode" title="mode" :options="colorModeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hideSliders & hideInputs"
				:init-state="() => useStoryInitState<{ hideSliders: boolean; hideInputs: boolean }>({ hideSliders: false, hideInputs: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							:hide-sliders="state.hideSliders"
							:hide-inputs="state.hideInputs"
							data-cy="color-picker-hide-sliders-inputs"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideSliders" title="hideSliders"/>
				<HstCheckbox v-model="state.hideInputs"  title="hideInputs"/>
			</template>
		</Variant>

		<Variant
				title="Prop — showSwatches & swatchesMaxHeight"
				:init-state="() => useStoryInitState<{ showSwatches: boolean; swatchesMaxHeight: number }>({ showSwatches: true, swatchesMaxHeight: 150 })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker
							v-model="color"
							:show-swatches="state.showSwatches"
							:swatches-max-height="state.swatchesMaxHeight"
							data-cy="color-picker-swatches"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showSwatches"     title="showSwatches"/>
				<HstNumber   v-model="state.swatchesMaxHeight" title="swatchesMaxHeight"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-color-picker v-model="color" data-cy="color-picker-slot-default">
					<span>Custom slot content</span>
				</origam-color-picker>
			</div>
		</Variant>

		<Variant title="Slot — header">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-color-picker v-model="color" data-cy="color-picker-slot-header">
					<template #header>
						<span style="font-weight: 600; padding: 8px 16px; display: block;">Custom header</span>
					</template>
				</origam-color-picker>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-color-picker v-model="color" data-cy="color-picker-slot-title">
					<template #title>
						<strong>Pick a colour</strong>
					</template>
				</origam-color-picker>
			</div>
		</Variant>

		<Variant title="Slot — actions">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-color-picker v-model="color" data-cy="color-picker-slot-actions">
					<template #actions>
						<origam-btn color="primary" text="Apply" size="small"/>
						<origam-btn text="Cancel" size="small"/>
					</template>
				</origam-color-picker>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-color-picker
								v-model="color"
								data-cy="color-picker-emit-model-value"
								@update:model-value="(v: string) => {
									state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Move the canvas or click a swatch to see events.
					</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — update:mode"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-color-picker
								v-model="color"
								data-cy="color-picker-emit-mode"
								@update:mode="(v: string) => {
									state.log = [`update:mode → ${v}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Click the mode toggle button to see events.
					</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
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
