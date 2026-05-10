<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerYears"
	>

		<!--
			<origam-date-picker-years> is the scrollable year grid behind
			the year heading. Best previewed via the parent picker in
			"years" view-mode.
		-->

		<Variant title="Embedded — year picker view">
			<div style="padding: 24px;">
				<origam-date-picker v-model="defaultValue" view-mode="year" data-cy="dp-years-default"/>
			</div>
		</Variant>

		<Variant title="Standalone — centered on 2026">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-years :year="2026" data-cy="dp-years-standalone"/>
			</div>
		</Variant>

		<Variant
				title="Min / max bounds"
				:init-state="() => useStoryInitState<{ min: string, max: string }>({ min: '2020-01-01', max: '2030-12-31' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-years
							:year="2026"
							:min="state.min"
							:max="state.max"
							data-cy="dp-years-bounds"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;">
						Years outside [min .. max] render disabled.
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.min" title="min (YYYY-MM-DD)"/>
				<HstText v-model="state.max" title="max (YYYY-MM-DD)"/>
			</template>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-years
							:year="2026"
							:color="state.color"
							data-cy="dp-years-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamDatePicker, OrigamDatePickerYears } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerYears.md"/>
