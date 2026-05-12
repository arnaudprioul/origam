<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPickerCanvas"
	>
		<!--
			Playground — first by convention. Sub-component: the 2-D HSV
			gradient canvas for hue/saturation picking. Controls expose the
			main surface props.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					dotSize?: number
				}>({ disabled: false, dotSize: 10 })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-color-picker-canvas
							:color-hsv="defaultColor"
							v-bind="state"
							data-cy="color-picker-canvas-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstNumber   v-model="state.dotSize"  title="dotSize" :min="4" :max="20"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-color-picker-canvas
						:color-hsv="defaultColor"
						:disabled="true"
						data-cy="color-picker-canvas-disabled"
				/>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:colorHsv"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
					<origam-color-picker-canvas
							:color-hsv="defaultColor"
							data-cy="color-picker-canvas-emit"
							@update:color-hsv="(v: unknown) => {
								state.log = [JSON.stringify(v), ...state.log].slice(0, 5)
							}"
					/>
					<ul style="font-family: monospace; font-size: 0.75rem; align-self: stretch;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color-text-secondary);">
						Drag the canvas picker to see events.
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
	import { OrigamColorPickerCanvas } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }
</script>

<docs lang="md">
ColorPickerCanvas sub-component — the 2-D HSV gradient canvas for hue/saturation picking.
</docs>
