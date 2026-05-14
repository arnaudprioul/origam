<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPickerSwatches"
	>
		<!--
			Playground — first by convention. Sub-component: a grid of
			preset colour swatches for quick selection.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
				}>({ disabled: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
					<origam-color-picker-swatches
							:color-hsv="defaultColor"
							:swatches="defaultSwatches"
							v-bind="state"
							data-cy="color-picker-swatches-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-swatches
						:color-hsv="defaultColor"
						:swatches="defaultSwatches"
						:disabled="true"
						data-cy="color-picker-swatches-disabled"
				/>
			</div>
		</Variant>

		<Variant title="Prop — swatches (custom palette)">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary); margin-bottom: 8px;">
					Brand palette — 4 columns × 2 rows
				</p>
				<origam-color-picker-swatches
						:color-hsv="defaultColor"
						:swatches="brandSwatches"
						data-cy="color-picker-swatches-custom"
				/>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:colorHsv"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
					<origam-color-picker-swatches
							:color-hsv="defaultColor"
							:swatches="defaultSwatches"
							data-cy="color-picker-swatches-emit"
							@update:color-hsv="(v: unknown) => {
								state.log = [JSON.stringify(v), ...state.log].slice(0, 5)
							}"
					/>
					<ul style="font-family: monospace; font-size: 0.75rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Click a swatch to see the emitted HSV value.
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
	import { OrigamColorPickerSwatches } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }

	const defaultSwatches = [
		['#F44336', '#E91E63', '#9C27B0'],
		['#3F51B5', '#2196F3', '#03A9F4'],
		['#009688', '#4CAF50', '#8BC34A'],
		['#FFEB3B', '#FF9800', '#FF5722'],
	]

	const brandSwatches = [
		['#1A1A2E', '#16213E', '#0F3460', '#533483'],
		['#E94560', '#F5A623', '#00B4D8', '#90E0EF'],
	]
</script>

<docs lang="md">
ColorPickerSwatches sub-component — grid of preset color swatches for quick selection.
</docs>
