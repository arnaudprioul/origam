<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonth"
	>
		<!--
			Playground — the 28-31-day grid. Full wiring via the parent
			picker; individual props demonstrated below.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ color: string; showWeek: boolean; hideWeekdays: boolean }>({
					color: 'primary',
					showWeek: false,
					hideWeekdays: false,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-date-picker
							v-model="singleValue"
							:color="state.color"
							:show-week="state.showWeek"
							:hide-weekdays="state.hideWeekdays"
							data-cy="dp-month-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.color"        title="color"        :options="intentList"/>
				<HstCheckbox v-model="state.showWeek"     title="showWeek"/>
				<HstCheckbox v-model="state.hideWeekdays" title="hideWeekdays"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — modelValue (single date selection)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="singleValue" data-cy="dp-month-single"/>
			</div>
		</Variant>

		<Variant title="Prop — multiple (multi-day selection)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="multipleValue" multiple data-cy="dp-month-multiple"/>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;">
					{{ multipleValue.length }} dates selected
				</p>
			</div>
		</Variant>

		<Variant title="Prop — range">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="rangeValue" range data-cy="dp-month-range"/>
			</div>
		</Variant>

		<Variant title="Prop — hideWeekdays">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="hideWeekdaysValue" hide-weekdays data-cy="dp-month-hide-weekdays"/>
			</div>
		</Variant>

		<Variant title="Prop — showWeek (week numbers)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="showWeekValue" show-week data-cy="dp-month-show-week"/>
			</div>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-date-picker v-model="colorValue" :color="state.color" data-cy="dp-month-color"/>
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

	import { OrigamDatePicker } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const singleValue       = ref('2026-05-08')
	const multipleValue     = ref<string[]>(['2026-05-01', '2026-05-15'])
	const rangeValue        = ref<string[]>(['2026-05-04', '2026-05-12'])
	const hideWeekdaysValue = ref('2026-05-08')
	const showWeekValue     = ref('2026-05-08')
	const colorValue        = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonth.md"/>
