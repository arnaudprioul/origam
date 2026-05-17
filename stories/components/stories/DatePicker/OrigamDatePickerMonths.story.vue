<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonths"
	>
		<!--
			Playground — the 4×3 month-name grid shown when clicking the
			year heading. Can be embedded in the parent picker or used
			standalone.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{ color: string; min: string; max: string }>({
					color: 'primary',
					min: '2026-01-01',
					max: '2026-12-31',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-months
							:month="4"
							:year="2026"
							:color="state.color"
							:min="state.min"
							:max="state.max"
							data-cy="dp-months-playground"
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

		<Variant title="Prop — realistic wiring (embedded in DatePicker, month view)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="defaultValue" view-mode="months" data-cy="dp-months-default"/>
			</div>
		</Variant>

		<Variant title="Prop — month & year (standalone, May 2026)">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-months
						:month="4"
						:year="2026"
						data-cy="dp-months-standalone"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — min & max (bounds disable out-of-range months)"
				:init-state="() => useStoryInitState<{ min: string; max: string }>({ min: '2026-03-01', max: '2026-09-30' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-months
							:month="4"
							:year="2026"
							:min="state.min"
							:max="state.max"
							data-cy="dp-months-bounds"
					/>
					<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary); margin-top: 8px;">
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
				title="Prop — color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
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

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — month">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-months
						:month="4"
						:year="2026"
						data-cy="dp-months-slot-month"
				>
					<template #month="{ month, year }">
						<div style="text-align: center; font-weight: 600; padding: 6px; cursor: pointer;">
							{{ new Date(year, month).toLocaleString('en', { month: 'short' }) }}
						</div>
					</template>
				</origam-date-picker-months>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:month">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-months
						:month="emitMonth"
						:year="2026"
						data-cy="dp-months-emit-update"
						@update:month="logEvent('update:month', $event); emitMonth = $event"
				/>
				<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary); margin-top: 8px;">
					month = {{ emitMonth }}
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamDatePicker, OrigamDatePickerMonths } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const defaultValue = ref('2026-05-08')
	const emitMonth = ref(4)
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonths.md"/>
