<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerYears"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDatePickerYearsProps>>({ year: 2026, color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-date-picker-years
						:year="state.year ?? 2026"
						:color="state.color"
						:height="state.height"
						:width="state.width"
						:min-height="state.minHeight"
						:min-width="state.minWidth"
						:max-height="state.maxHeight"
						:max-width="state.maxWidth"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDatePickerYearsProps>>({ year: 2026, min: '2020-01-01', max: '2030-12-31' })"
		>
			<template #default="{ state }">
				<origam-date-picker-years
						:year="state.year ?? 2026"
						:min="state.min"
						:max="state.max"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.year" title="Year" :min="1900" :max="2100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Bounds">
					<HstText v-model="state.min" title="Min (YYYY-MM-DD)"/>
					<HstText v-model="state.max" title="Max (YYYY-MM-DD)"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:year">
			<origam-date-picker-years
					:year="2026"
					@update:year="logEvent('update:year', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - year">
			<origam-date-picker-years :year="2026">
				<template #year="{ year, isSelected }">
					<strong :style="isSelected ? 'color: var(--origam-color__action--primary---bg);' : ''">
						{{ year }}
					</strong>
				</template>
			</origam-date-picker-years>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDatePickerYearsProps>({ year: 2026, color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-date-picker-years
						v-bind="state"
						@update:year="logEvent('update:year', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstNumber v-model="state.year" title="Year" :min="1900" :max="2100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"    title="Color"      :options="COLOR_OPTIONS"/>
					<HstText   v-model="state.height"   title="Height"/>
					<HstText   v-model="state.width"    title="Width"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstText v-model="state.min" title="Min (YYYY-MM-DD)"/>
					<HstText v-model="state.max" title="Max (YYYY-MM-DD)"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamDatePickerYears } from '@origam/components'
	import type { IDatePickerYearsProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerYears.md"/>
