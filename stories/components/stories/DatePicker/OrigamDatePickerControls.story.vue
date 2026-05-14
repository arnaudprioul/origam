<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerControls"
	>
		<!--
			Playground — navigation strip (today / arrows / month-year
			toggle). Full wiring only works inside OrigamDatePicker; the
			standalone variant shows the chrome in isolation.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ disabled: boolean; disabledNext: boolean; disabledPrev: boolean; disabledYear: boolean }>({
					disabled: false,
					disabledNext: false,
					disabledPrev: false,
					disabledYear: false,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-date-picker-controls
							:active="['date']"
							v-bind="state"
							data-cy="dp-controls-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"     title="disabled (all)"/>
				<HstCheckbox v-model="state.disabledNext" title="disabledNext"/>
				<HstCheckbox v-model="state.disabledPrev" title="disabledPrev"/>
				<HstCheckbox v-model="state.disabledYear" title="disabledYear"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — realistic wiring (embedded in DatePicker)">
			<!--
				The controls are automatically wired when inside the parent
				picker — arrows fire month navigation, the heading toggles the
				year/month grid.
			-->
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="defaultValue" data-cy="dp-controls-default"/>
			</div>
		</Variant>

		<Variant
				title="Prop — disabled (standalone)"
				:init-state="() => useStoryInitState<{ disabled: boolean; disabledNext: boolean; disabledPrev: boolean }>({ disabled: false, disabledNext: false, disabledPrev: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-date-picker-controls
							:active="['date']"
							:disabled="state.disabled"
							:disabled-next="state.disabledNext"
							:disabled-prev="state.disabledPrev"
							data-cy="dp-controls-disabled"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"     title="disabled (all)"/>
				<HstCheckbox v-model="state.disabledNext" title="disabledNext"/>
				<HstCheckbox v-model="state.disabledPrev" title="disabledPrev"/>
			</template>
		</Variant>

		<Variant title="Prop — disabledYear (pin to month view)">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						disabled-year
						data-cy="dp-controls-disabled-year"
				/>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — click:month">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						data-cy="dp-controls-emit-month"
						@click:month="logEvent('click:month', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:next">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						data-cy="dp-controls-emit-next"
						@click:next="logEvent('click:next', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:prev">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						data-cy="dp-controls-emit-prev"
						@click:prev="logEvent('click:prev', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:text">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						data-cy="dp-controls-emit-text"
						@click:text="logEvent('click:text', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:year">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						data-cy="dp-controls-emit-year"
						@click:year="logEvent('click:year', $event)"
				/>
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

	import { OrigamDatePicker, OrigamDatePickerControls } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerControls.md"/>
