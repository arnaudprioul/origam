<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonths"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDatePickerMonthsProps>>({
					color: 'primary',
					month: 4,
					year: 2026,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-months
							:color="state.color"
							:month="state.month"
							:year="state.year"
							:width="state.width"
							:height="state.height"
							:min-width="state.minWidth"
							:max-width="state.maxWidth"
							:min-height="state.minHeight"
							:max-height="state.maxHeight"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDatePickerMonthsProps>>({
					month: 4,
					year: 2026,
					min: '2026-03-01',
					max: '2026-09-30',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-months
							:month="state.month"
							:year="state.year"
							:min="state.min"
							:max="state.max"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.month" title="Month (0–11)" :min="0" :max="11" :step="1"/>
					<HstNumber v-model="state.year"  title="Year"         :min="2000" :max="2100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Bounds">
					<HstText v-model="state.min" title="Min (YYYY-MM-DD)"/>
					<HstText v-model="state.max" title="Max (YYYY-MM-DD)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:month">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-months
						:month="emitMonth"
						:year="2026"
						@update:month="logEvent('update:month', $event); emitMonth = $event"
				/>
				<p style="margin-top: 8px; font-size: 0.75rem;">month = {{ emitMonth }}</p>
			</div>
		</Variant>

		<Variant title="Slots - month">
			<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
				<origam-date-picker-months
						:month="4"
						:year="2026"
				>
					<template #month="{ month, year }">
						<div style="text-align: center; font-weight: 600; padding: 6px; cursor: pointer;">
							{{ new Date(year, month).toLocaleString('en', { month: 'short' }) }}
						</div>
					</template>
				</origam-date-picker-months>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDatePickerMonthsProps>({
					month: 4,
					year: 2026,
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 320px; margin: 0 auto;">
					<origam-date-picker-months
							v-bind="state"
							@update:month="logEvent('update:month', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstNumber v-model="state.month" title="Month (0–11)" :min="0" :max="11" :step="1"/>
					<HstNumber v-model="state.year"  title="Year"         :min="2000" :max="2100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
					<HstText   v-model="state.width"  title="Width"/>
					<HstText   v-model="state.height" title="Height"/>
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
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamDatePickerMonths } from '@origam/components'
	import type { IDatePickerMonthsProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'

	const emitMonth = ref(4)
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonths.md"/>
