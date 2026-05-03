<template>
	<Story
			group="components"
			title="Switch/OrigamSwitch"
	>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="colorModel"
						:color="state.color"
						label="Colored switch"
						data-cy="switch-color"
				/>
				<div data-cy="switch-color-status">value = {{ colorModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="densityModel"
						:density="state.density"
						label="Density switch"
						data-cy="switch-density"
				/>
				<div data-cy="switch-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ INSET / FLAT ════════════ -->
		<Variant
				title="Inset & flat"
				:init-state="() => useStoryInitState<{ inset: boolean, flat: boolean }>({ inset: false, flat: false })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="insetModel"
						:inset="state.inset"
						:flat="state.flat"
						label="Inset / flat switch"
						data-cy="switch-inset"
				/>
				<div data-cy="switch-inset-status">value = {{ insetModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inset" title="inset"/>
				<HstCheckbox v-model="state.flat"  title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ INDETERMINATE ════════════ -->
		<Variant
				title="Indeterminate"
				:init-state="() => useStoryInitState<{ indeterminate: boolean }>({ indeterminate: true })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="indeterminateModel"
						:indeterminate="state.indeterminate"
						label="Indeterminate switch"
						data-cy="switch-indeterminate"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						label="Stateful switch"
						data-cy="switch-states"
				/>
				<div data-cy="switch-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: track.true / track.false ════════════ -->
		<Variant title="Slot — track.true / track.false">
			<origam-switch v-model="slotTrackModel" label="Custom track" data-cy="switch-slot-track">
				<template #track.true>
					<span style="font-size: 10px; color: #fff;">ON</span>
				</template>
				<template #track.false>
					<span style="font-size: 10px; color: #fff;">OFF</span>
				</template>
			</origam-switch>
			<div data-cy="switch-slot-track-status">value = {{ slotTrackModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-switch
					v-model="emitModel"
					label="Toggle me"
					data-cy="switch-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="switch-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-switch
					v-model="emitFocusModel"
					label="Focus & blur me"
					data-cy="switch-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISwitchProps>({
					label: 'Enable feature',
					color: 'primary',
					density: undefined,
					inset: false,
					flat: false,
					indeterminate: false,
					disabled: false,
					readonly: false,
				})"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="playgroundModel"
						v-bind="state"
						data-cy="switch-playground"
				/>
				<div data-cy="switch-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
				<HstCheckbox v-model="state.inset"         title="inset"/>
				<HstCheckbox v-model="state.flat"          title="flat"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
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

	import { OrigamSwitch } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IColorProps, IDensityProps, ISwitchProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'

	const colorModel         = ref(false)
	const densityModel       = ref(false)
	const insetModel         = ref(false)
	const indeterminateModel = ref(false)
	const statesModel        = ref(false)
	const slotTrackModel     = ref(false)
	const emitModel          = ref(false)
	const emitFocusModel     = ref(false)
	const playgroundModel    = ref(false)
</script>

<docs lang="md" src="@docs/components/Switch/OrigamSwitch.md"/>
