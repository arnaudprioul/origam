<template>
	<Story
			group="components"
			title="DatePickerField/OrigamDatePickerField"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant
				title="Basic"
				:init-state="() => useStoryInitState<{ label?: string }>({ label: 'Appointment' })"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						:label="state.label"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.label" title="label"/>
			</template>
		</Variant>

		<!-- ════════════ RANGE ════════════ -->
		<Variant title="Range">
			<origam-date-picker-field
					v-model="dates"
					label="Date range"
					range
					style="max-width: 320px"
			/>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<origam-date-picker-field
					v-model="dates"
					label="Select dates"
					multiple
					style="max-width: 320px"
			/>
		</Variant>

		<!-- ════════════ CLOSE ON SELECT ════════════ -->
		<Variant
				title="Close on select"
				:init-state="() => useStoryInitState<{ closeOnSelect?: boolean }>({ closeOnSelect: true })"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						label="Date"
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
				<origam-date-picker-field
						v-model="date"
						label="Date"
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

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:menu ════════════ -->
		<Variant title="Emit — update:menu">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					range?: boolean
					multiple?: boolean
					closeOnSelect?: boolean
					disabled?: boolean
					readonly?: boolean
				}>({
					label: 'Appointment',
					range: false,
					multiple: false,
					closeOnSelect: false,
					disabled: false,
					readonly: false
				})"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						v-bind="state"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstCheckbox v-model="state.range"         title="range"/>
				<HstCheckbox v-model="state.multiple"      title="multiple"/>
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

	import { OrigamDatePickerField } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const date = ref(null)
	const dates = ref([])
</script>

<docs lang="md" src="@docs/components/DatePickerField/OrigamDatePickerField.md"/>
