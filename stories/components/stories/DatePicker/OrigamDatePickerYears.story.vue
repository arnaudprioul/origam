<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerYears"
	>
		<!--
			Playground — the scrollable year grid shown behind the year
			heading. Can be embedded in the parent picker or used
			standalone.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ color: string; min: string; max: string }>({
					color: 'primary',
					min: '2020-01-01',
					max: '2030-12-31',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-years
							:year="2026"
							:color="state.color"
							:min="state.min"
							:max="state.max"
							data-cy="dp-years-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
				<HstText   v-model="state.min"   title="min (YYYY-MM-DD)"/>
				<HstText   v-model="state.max"   title="max (YYYY-MM-DD)"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — realistic wiring (embedded in DatePicker, year view)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="defaultValue" view-mode="year" data-cy="dp-years-default"/>
			</div>
		</Variant>

		<Variant title="Prop — year (standalone, centred on 2026)">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-years :year="2026" data-cy="dp-years-standalone"/>
			</div>
		</Variant>

		<Variant
				title="Prop — min & max (bounds disable out-of-range years)"
				:init-state="() => useStoryInitState<{ min: string; max: string }>({ min: '2020-01-01', max: '2030-12-31' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-years
							:year="2026"
							:min="state.min"
							:max="state.max"
							data-cy="dp-years-bounds"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary); margin-top: 8px;">
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
				title="Prop — color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
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
