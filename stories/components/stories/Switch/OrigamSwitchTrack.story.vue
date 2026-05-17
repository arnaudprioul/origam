<template>
	<Story
			group="components"
			title="Switch/OrigamSwitchTrack"
	>

		<!--
			Note: <origam-switch-track> is the visual rail of <origam-switch>.
			It can be inspected standalone, but the realistic flow always
			involves the parent switch driving its `modelValue`.
		-->

		<Variant title="Default — both states">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
				<origam-switch-track :model-value="false" data-cy="switch-track-off"/>
				<origam-switch-track :model-value="true"  data-cy="switch-track-on"/>
			</div>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary', bgColor: undefined })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
					<origam-switch-track :model-value="true" v-bind="state" data-cy="switch-track-color-on"/>
					<origam-switch-track :model-value="false" v-bind="state" data-cy="switch-track-color-off"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Inset variant">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
				<origam-switch-track :model-value="true"  inset data-cy="switch-track-inset-on"/>
				<origam-switch-track :model-value="false" inset data-cy="switch-track-inset-off"/>
			</div>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled?: boolean, readonly?: boolean, error?: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
					<origam-switch-track :model-value="true" v-bind="state" data-cy="switch-track-states-on"/>
					<origam-switch-track :model-value="false" v-bind="state" data-cy="switch-track-states-off"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<Variant title="Slot — track.true / track.false (icon glyphs)">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
				<origam-switch-track :model-value="true" data-cy="switch-track-slot-on">
					<template #true><origam-icon :icon="MDI_ICONS.CHECK"/></template>
					<template #false><origam-icon :icon="MDI_ICONS.CLOSE"/></template>
				</origam-switch-track>
				<origam-switch-track :model-value="false" data-cy="switch-track-slot-off">
					<template #true><origam-icon :icon="MDI_ICONS.CHECK"/></template>
					<template #false><origam-icon :icon="MDI_ICONS.CLOSE"/></template>
				</origam-switch-track>
			</div>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────── -->

		<Variant title="Slot — track.false">
			<div style="padding: 24px;">
				<origam-switch-track :model-value="false" data-cy="switch-track-slot-track-false">
					<template #false><origam-icon :icon="MDI_ICONS.CLOSE"/></template>
				</origam-switch-track>
			</div>
		</Variant>

		<Variant title="Slot — track.true">
			<div style="padding: 24px;">
				<origam-switch-track :model-value="true" data-cy="switch-track-slot-track-true">
					<template #true><origam-icon :icon="MDI_ICONS.CHECK"/></template>
				</origam-switch-track>
			</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<div style="padding: 24px;">
				<origam-switch-track
						:model-value="false"
						data-cy="switch-track-emit-click"
						@click="logEvent('click', $event)"
				/>
			</div>
		</Variant>

		<Variant
				title="Embedded in OrigamSwitch (real wiring)"
				:init-state="() => useStoryInitState<{ value: boolean }>({ value: true })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-switch v-model="state.value" label="Wired" data-cy="switch-track-embedded"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.value" title="modelValue"/>
			</template>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISwitchTrackProps>({
					modelValue: true,
					inset: false,
					disabled: false,
					readonly: false,
					error: false,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-switch-track v-bind="state" data-cy="switch-track-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
				<HstCheckbox v-model="state.inset"      title="inset"/>
				<HstCheckbox v-model="state.disabled"   title="disabled"/>
				<HstCheckbox v-model="state.readonly"   title="readonly"/>
				<HstCheckbox v-model="state.error"      title="error"/>
				<HstSelect   v-model="state.color"      title="color"      :options="intentList"/>
				<HstSelect   v-model="state.bgColor"    title="bgColor"    :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamSwitch, OrigamSwitchTrack } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, ISwitchTrackProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Switch/OrigamSwitchTrack.md"/>
