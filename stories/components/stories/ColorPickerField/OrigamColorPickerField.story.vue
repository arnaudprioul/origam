<template>
	<Story
			group="components"
			title="ColorPickerField/OrigamColorPickerField"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant
				title="Basic"
				:init-state="() => useStoryInitState<{ label?: string }>({ label: 'Brand colour' })"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						:label="state.label"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.label" title="label"/>
			</template>
		</Variant>

		<!-- ════════════ CLOSE ON SELECT ════════════ -->
		<Variant
				title="Close on select"
				:init-state="() => useStoryInitState<{ closeOnSelect?: boolean }>({ closeOnSelect: true })"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						label="Colour"
						:close-on-select="state.closeOnSelect"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.closeOnSelect" title="closeOnSelect"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled?: boolean; readonly?: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						label="Colour"
						:disabled="state.disabled"
						:readonly="state.readonly"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: colorSelection ════════════ -->
		<Variant title="Slot — colorSelection">
			<origam-color-picker-field
					v-model="color"
					label="Custom value display"
					style="max-width: 320px"
			>
				<template #colorSelection>
					<span style="font-style: italic;">{{ color ?? 'none' }}</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:menu ════════════ -->
		<Variant title="Emit — update:menu">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
					style="max-width: 320px"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					closeOnSelect?: boolean
					disabled?: boolean
					readonly?: boolean
				}>({
					label: 'Brand colour',
					closeOnSelect: false,
					disabled: false,
					readonly: false
				})"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						v-bind="state"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstCheckbox v-model="state.closeOnSelect" title="closeOnSelect"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
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

	import { OrigamColorPickerField } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const color = ref(null)
</script>

<docs lang="md" src="@docs/components/ColorPickerField/OrigamColorPickerField.md"/>
