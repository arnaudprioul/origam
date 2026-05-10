<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerHeader"
	>

		<!--
			<origam-date-picker-header> is the big "Selected: May 8, 2026"
			heading at the top of the picker. It shows the currently
			selected date and reacts to the user's selection.
		-->

		<Variant title="Embedded in OrigamDatePicker">
			<div style="padding: 24px;">
				<origam-date-picker v-model="defaultValue" data-cy="dp-header-default"/>
			</div>
		</Variant>

		<Variant title="Standalone with custom header text">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header
						header="May 2026"
						data-cy="dp-header-custom"
				/>
			</div>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-header
							header="Tinted heading"
							:color="state.color"
							data-cy="dp-header-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="With prepend / append icons">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header
						header="May 8, 2026"
						:prepend-icon="MDI_ICONS.CALENDAR"
						:append-icon="MDI_ICONS.CHEVRON_DOWN"
						data-cy="dp-header-icons"
				/>
			</div>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-header
							header="Density-aware heading"
							:density="state.density"
							data-cy="dp-header-density"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamDatePicker, OrigamDatePickerHeader } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IDensityProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerHeader.md"/>
