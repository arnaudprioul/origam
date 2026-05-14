<template>
	<Story
			group="components"
			title="ColorPicker/OrigamColorPickerPreview"
	>
		<!--
			Playground — first by convention. Sub-component: shows the hue
			and alpha slider tracks for colour preview.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					hideAlpha?: boolean
				}>({ disabled: false, hideAlpha: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
					<origam-color-picker-preview
							:color-hsv="defaultColor"
							v-bind="state"
							data-cy="color-picker-preview-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.hideAlpha" title="hideAlpha"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — hideAlpha">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-preview
						:color-hsv="defaultColor"
						:hide-alpha="true"
						data-cy="color-picker-preview-no-alpha"
				/>
			</div>
		</Variant>

		<Variant title="Prop — disabled">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-preview
						:color-hsv="defaultColor"
						:disabled="true"
						data-cy="color-picker-preview-disabled"
				/>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:colorHsv">
			<div style="padding: 24px; max-width: 360px; margin: 0 auto;">
				<origam-color-picker-preview
						:color-hsv="defaultColor"
						data-cy="color-picker-preview-emit-color-hsv"
						@update:color-hsv="logEvent('update:colorHsv', $event)"
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

	import { OrigamColorPickerPreview } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 0.6 }
</script>

<docs lang="md">
ColorPickerPreview sub-component — shows the hue/alpha slider tracks for color preview.
</docs>
