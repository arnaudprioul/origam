<template>
	<Story
			group="components"
			title="Radio/OrigamRadio"
	>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-radio
						v-model="colorModel"
						:color="state.color"
						value="a"
						label="Option A"
						data-cy="radio-color"
				/>
				<origam-radio
						v-model="colorModel"
						:color="state.color"
						value="b"
						label="Option B"
						data-cy="radio-color-b"
				/>
				<div data-cy="radio-color-status">value = {{ colorModel }}</div>
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
				<origam-radio
						v-model="densityModel"
						:density="state.density"
						value="x"
						label="Density radio"
						data-cy="radio-density"
				/>
				<div data-cy="radio-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-radio
						v-model="roundedModel"
						:rounded="state.rounded"
						value="x"
						label="Rounded radio"
						data-cy="radio-rounded"
				/>
				<div data-cy="radio-rounded-status">value = {{ roundedModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-radio
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						value="x"
						label="Stateful radio"
						data-cy="radio-states"
				/>
				<div data-cy="radio-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: label ════════════ -->
		<Variant title="Slot — label">
			<origam-radio v-model="slotLabelModel" value="custom" data-cy="radio-slot-label">
				<template #label>
					<span style="font-style: italic; color: var(--origam-color-action-primary-bg);">Custom label slot</span>
				</template>
			</origam-radio>
			<div data-cy="radio-slot-label-status">value = {{ slotLabelModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-radio
					v-model="emitModel"
					value="yes"
					label="Select me"
					data-cy="radio-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="radio-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-radio
					v-model="emitFocusModel"
					value="x"
					label="Focus & blur me"
					data-cy="radio-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRadioProps>({
					label: 'Radio option',
					value: 'opt',
					color: 'primary',
					density: undefined,
					rounded: undefined,
					disabled: false,
					readonly: false,
				})"
		>
			<template #default="{ state }">
				<origam-radio
						v-model="playgroundModel"
						v-bind="state"
						data-cy="radio-playground"
				/>
				<div data-cy="radio-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"   title="label"/>
				<HstText     v-model="state.value"   title="value"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
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

	import { OrigamRadio } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IColorProps, IDensityProps, IRadioProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, roundedList } from '@stories/const'

	const colorModel      = ref<string | null>(null)
	const densityModel    = ref<string | null>(null)
	const roundedModel    = ref<string | null>(null)
	const statesModel     = ref<string | null>(null)
	const slotLabelModel  = ref<string | null>(null)
	const emitModel       = ref<string | null>(null)
	const emitFocusModel  = ref<string | null>(null)
	const playgroundModel = ref<string | null>(null)
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadio.md"/>
