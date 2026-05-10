<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonths"
	>

		<!--
			<origam-date-picker-months> is the 4×3 month-name grid you see
			when clicking the year heading. Best previewed via the parent.
		-->

		<Variant title="Embedded — month picker view">
			<div style="padding: 24px;">
				<origam-date-picker v-model="defaultValue" view-mode="months" data-cy="dp-months-default"/>
			</div>
		</Variant>

		<Variant title="Standalone — May 2026">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-months
						:month="4"
						:year="2026"
						data-cy="dp-months-standalone"
				/>
			</div>
		</Variant>

		<Variant
				title="Min / max bounds"
				:init-state="() => useStoryInitState<{ min: string, max: string }>({ min: '2026-03-01', max: '2026-09-30' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-months
							:month="4"
							:year="2026"
							:min="state.min"
							:max="state.max"
							data-cy="dp-months-bounds"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;">
						Months outside the [min .. max] range render disabled.
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
					<origam-date-picker-months
							:month="4"
							:year="2026"
							:color="state.color"
							data-cy="dp-months-color"
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

	import { OrigamDatePicker, OrigamDatePickerMonths } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonths.md"/>
