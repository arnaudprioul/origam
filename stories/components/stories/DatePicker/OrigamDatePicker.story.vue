<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePicker"
	>

		<Variant title="Single date">
			<origam-date-picker v-model="date"/>
		</Variant>

		<Variant title="Range">
			<origam-date-picker v-model="dates" range/>
		</Variant>

		<Variant title="Multiple">
			<origam-date-picker v-model="dates" multiple/>
		</Variant>

		<Variant
				title="Constraints (min / max)"
				:init-state="() => useStoryInitState<{ min?: string; max?: string }>({ min: minDefault, max: maxDefault })"
		>
			<template #default="{ state }">
				<origam-date-picker
						v-model="date"
						:min="state.min"
						:max="state.max"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.min" title="min (ISO 8601)"/>
				<HstText v-model="state.max" title="max (ISO 8601)"/>
			</template>
		</Variant>

		<Variant
				title="Show week numbers"
				:init-state="() => useStoryInitState<{ showWeek?: boolean }>({ showWeek: true })"
		>
			<template #default="{ state }">
				<origam-date-picker v-model="date" :show-week="state.showWeek"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showWeek" title="showWeek"/>
			</template>
		</Variant>

		<Variant title="Slot — actions">
			<origam-date-picker v-model="date">
				<template #actions>
					<origam-btn color="primary" text="OK" size="small"/>
					<origam-btn text="Cancel" size="small"/>
				</template>
			</origam-date-picker>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-date-picker
					v-model="date"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:month">
			<origam-date-picker
					v-model="date"
					@update:month="logEvent('update:month', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:year">
			<origam-date-picker
					v-model="date"
					@update:year="logEvent('update:year', $event)"
			/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					multiple?: boolean
					range?: boolean
					showWeek?: boolean
					min?: string
					max?: string
				}>({
					multiple: false,
					range: false,
					showWeek: false,
					min: undefined,
					max: undefined
				})"
		>
			<template #default="{ state }">
				<origam-date-picker
						v-model="date"
						:multiple="state.multiple"
						:range="state.range"
						:show-week="state.showWeek"
						:min="state.min"
						:max="state.max"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.range"     title="range"/>
				<HstCheckbox v-model="state.showWeek"  title="showWeek"/>
				<HstText     v-model="state.min"        title="min"/>
				<HstText     v-model="state.max"        title="max"/>
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

	import { OrigamBtn, OrigamDatePicker } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const date = ref(null)
	const dates = ref([])

	const today = new Date()
	const minDefault = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10)
	const maxDefault = new Date(today.getFullYear(), today.getMonth() + 3, 0).toISOString().slice(0, 10)
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePicker.md"/>
