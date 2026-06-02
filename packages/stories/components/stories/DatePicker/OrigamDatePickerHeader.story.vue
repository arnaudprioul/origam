<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerHeader"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<IDatePickerHeaderProps>({
					header: 'May 8, 2026',
					color: 'primary',
					density: 'default',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px;">
					<origam-date-picker-header
							:header="state.header"
							:color="state.color"
							:density="state.density"
							:prepend-icon="state.prependIcon || undefined"
							:prepend-avatar="state.prependAvatar || undefined"
							:append-icon="state.appendIcon || undefined"
							:append-avatar="state.appendAvatar || undefined"
							data-cy="dp-header-design"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.header" title="Header"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prependIcon" title="Prepend Icon" :options="ICON_OPTIONS"/>
					<HstText   v-model="state.prependAvatar" title="Prepend Avatar (URL)"/>
					<HstSelect v-model="state.appendIcon" title="Append Icon" :options="ICON_OPTIONS"/>
					<HstText   v-model="state.appendAvatar" title="Append Avatar (URL)"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IDatePickerHeaderProps & { transitionName: string; transitionMode: string }>({
					header: 'May 8, 2026',
					transitionName: '',
					transitionMode: TRANSITION_MODE.OUT_IN,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px;">
					<origam-date-picker-header
							:header="state.header"
							:transition="state.transitionName ? { name: state.transitionName, mode: state.transitionMode as TTransitionMode } : undefined"
							data-cy="dp-header-functional"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.header" title="Header"/>
				</StoryGroup>
				<StoryGroup title="Transition">
					<HstText   v-model="state.transitionName" title="Transition Name"/>
					<HstSelect v-model="state.transitionMode" title="Transition Mode" :options="TRANSITION_MODE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - click">
			<div style="padding: 24px; max-width: 360px;">
				<origam-date-picker-header
						header="May 8, 2026"
						data-cy="dp-header-emit-click"
						@click="logEvent('click', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div style="padding: 24px; max-width: 360px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-default">
					<span>Custom slot content</span>
				</origam-date-picker-header>
			</div>
		</Variant>

		<Variant title="Slots - Prepend">
			<div style="padding: 24px; max-width: 360px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-prepend">
					<template #prepend>
						<origam-icon :icon="calendarIcon"/>
					</template>
				</origam-date-picker-header>
			</div>
		</Variant>

		<Variant title="Slots - Append">
			<div style="padding: 24px; max-width: 360px;">
				<origam-date-picker-header header="May 8, 2026" data-cy="dp-header-slot-append">
					<template #append>
						<origam-icon :icon="chevronIcon"/>
					</template>
				</origam-date-picker-header>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDatePickerHeaderProps>({
					header: 'May 8, 2026',
					color: 'primary',
					density: 'default',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 360px;">
					<origam-date-picker-header
							v-bind="state"
							@click="logEvent('click', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.header" title="Header"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prependIcon" title="Prepend Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendIcon"  title="Append Icon"  :options="ICON_OPTIONS"/>
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

	import { OrigamDatePickerHeader, OrigamIcon } from '@origam/components'
	import { MDI_ICONS, TRANSITION_MODE } from '@origam/enums'
	import type { IDatePickerHeaderProps } from '@origam/interfaces'
	import type { TTransitionMode } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

	const calendarIcon = MDI_ICONS.CALENDAR
	const chevronIcon  = MDI_ICONS.CHEVRON_DOWN

	const TRANSITION_MODE_OPTIONS = [
		{ label: 'out-in', value: TRANSITION_MODE.OUT_IN },
		{ label: 'in-out', value: TRANSITION_MODE.IN_OUT },
		{ label: 'default', value: TRANSITION_MODE.DEFAULT }
	]
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerHeader.md"/>
