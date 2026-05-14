<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerHeader"
	>
		<!--
			Playground — the "Selected: May 8, 2026" heading at the top of
			the picker. Can be used standalone or inside the parent picker.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDensityProps & { color: string; header: string }>({
					density: DENSITY.DEFAULT,
					color: 'primary',
					header: 'May 8, 2026',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px;">
					<origam-date-picker-header
							:header="state.header"
							:density="state.density"
							:color="state.color"
							data-cy="dp-header-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.header"  title="header"/>
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — header (realistic, embedded in DatePicker)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="defaultValue" data-cy="dp-header-default"/>
			</div>
		</Variant>

		<Variant title="Prop — header (standalone custom text)">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header
						header="May 2026"
						data-cy="dp-header-custom"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — color"
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

		<Variant title="Prop — prependIcon & appendIcon">
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
				title="Prop — density"
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

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-date-picker-header>
			</div>
		</Variant>

		<Variant title="Slot — default">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-default">
					<span>Custom slot content</span>
				</origam-date-picker-header>
			</div>
		</Variant>

		<Variant title="Slot — prepend">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-date-picker-header>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<div style="padding: 24px; max-width: 320px;">
				<origam-date-picker-header
						header="May 8, 2026"
						data-cy="dp-header-emit-click"
						@click="logEvent('click', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamDatePicker, OrigamDatePickerHeader, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IDensityProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'

	const defaultValue = ref('2026-05-08')
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerHeader.md"/>
