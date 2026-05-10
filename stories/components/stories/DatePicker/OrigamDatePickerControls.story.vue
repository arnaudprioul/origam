<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerControls"
	>

		<!--
			<origam-date-picker-controls> is the navigation strip at the
			top of <origam-date-picker> (today / arrows / month-year toggle).
			Best previewed via the parent picker.
		-->

		<Variant title="Embedded in OrigamDatePicker (real wiring)">
			<div style="padding: 24px;">
				<origam-date-picker v-model="defaultValue" data-cy="dp-controls-default"/>
			</div>
		</Variant>

		<Variant
				title="Disabled controls"
				:init-state="() => useStoryInitState<{ disabled: boolean, disabledNext: boolean, disabledPrev: boolean }>({ disabled: false, disabledNext: false, disabledPrev: false })"
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

		<Variant title="Year-disabled (pin month picker)">
			<div style="padding: 24px;">
				<origam-date-picker-controls
						:active="['date']"
						disabled-year
						data-cy="dp-controls-disabled-year"
				/>
			</div>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>OrigamDatePickerControls</code> is internal to
					<code>OrigamDatePicker</code>. The realistic wiring (Today
					button, arrow navigation) only works inside that parent —
					the standalone Variants here just show the chrome.
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

	import { OrigamDatePicker, OrigamDatePickerControls } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerControls.md"/>
