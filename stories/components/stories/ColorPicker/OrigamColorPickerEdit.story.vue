<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPickerEdit"
	>
		<!--
			Playground — first by convention. Sub-component: the numeric
			input fields for editing color channel values.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					mode?: string
				}>({ disabled: false, mode: 'rgba' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
					<origam-color-picker-edit
							:color-hsv="defaultColor"
							v-bind="state"
							data-cy="color-picker-edit-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstSelect
						v-model="state.mode"
						title="mode"
						:options="[
							{ value: 'rgb',  label: 'RGB' },
							{ value: 'rgba', label: 'RGBA' },
							{ value: 'hsl',  label: 'HSL' },
							{ value: 'hsla', label: 'HSLA' },
							{ value: 'hex',  label: 'HEX' },
							{ value: 'hexa', label: 'HEXA' },
						]"
				/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-edit
						:color-hsv="defaultColor"
						:disabled="true"
						data-cy="color-picker-edit-disabled"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — mode"
				:init-state="() => useStoryInitState<{ mode: string }>({ mode: 'rgb' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
					<origam-color-picker-edit
							:color-hsv="defaultColor"
							:mode="state.mode"
							data-cy="color-picker-edit-modes"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.mode"
						title="mode"
						:options="[
							{ value: 'rgb',  label: 'RGB' },
							{ value: 'rgba', label: 'RGBA' },
							{ value: 'hsl',  label: 'HSL' },
							{ value: 'hsla', label: 'HSLA' },
							{ value: 'hex',  label: 'HEX' },
							{ value: 'hexa', label: 'HEXA' },
						]"
				/>
			</template>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:colorHsv">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-edit
						:color-hsv="defaultColor"
						data-cy="color-picker-edit-emit-color-hsv"
						@update:color-hsv="logEvent('update:colorHsv', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — update:mode">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-edit
						:color-hsv="defaultColor"
						data-cy="color-picker-edit-emit-mode"
						@update:mode="logEvent('update:mode', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamColorPickerEdit } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }
</script>

<docs lang="md">
ColorPickerEdit sub-component — the numeric input fields for color channel editing.
</docs>
