<template>
	<Story
			group="components"
			title="Radio/OrigamRadio"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
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

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="a"
								label="Option A (interactive)"
								data-cy="radio-color"
						/>
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="b"
								label="Option B (interactive)"
								data-cy="radio-color-b"
						/>
						<div data-cy="radio-color-status">value = {{ colorModel }}</div>
					</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-radio :model-value="'a'" value="a"
						              color="primary"
						              label='color="primary" only'
						              data-cy="radio-color-fixture-color-only"/>
						<origam-radio :model-value="'a'" value="a"
						              bg-color="success"
						              label='bg-color="success" only'
						              data-cy="radio-color-fixture-bg-only"/>
						<origam-radio :model-value="'a'" value="a"
						              color="warning" bg-color="primary"
						              label='color="warning" + bg-color="primary"'
						              data-cy="radio-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="a"
								label="Option A (interactive)"
								data-cy="radio-color"
						/>
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="b"
								label="Option B (interactive)"
								data-cy="radio-color-b"
						/>
						<div data-cy="radio-color-status">value = {{ colorModel }}</div>
					</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-radio :model-value="'a'" value="a"
						              color="primary"
						              label='color="primary" only'
						              data-cy="radio-color-fixture-color-only"/>
						<origam-radio :model-value="'a'" value="a"
						              bg-color="success"
						              label='bg-color="success" only'
						              data-cy="radio-color-fixture-bg-only"/>
						<origam-radio :model-value="'a'" value="a"
						              color="warning" bg-color="primary"
						              label='color="warning" + bg-color="primary"'
						              data-cy="radio-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="a"
								label="Option A (interactive)"
								data-cy="radio-color"
						/>
						<origam-radio
								v-model="colorModel"
								v-bind="state"
								value="b"
								label="Option B (interactive)"
								data-cy="radio-color-b"
						/>
						<div data-cy="radio-color-status">value = {{ colorModel }}</div>
					</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-radio :model-value="'a'" value="a"
						              color="primary"
						              label='color="primary" only'
						              data-cy="radio-color-fixture-color-only"/>
						<origam-radio :model-value="'a'" value="a"
						              bg-color="success"
						              label='bg-color="success" only'
						              data-cy="radio-color-fixture-bg-only"/>
						<origam-radio :model-value="'a'" value="a"
						              color="warning" bg-color="primary"
						              label='color="warning" + bg-color="primary"'
						              data-cy="radio-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
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

		<Variant
				title="Prop — rounded"
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

		<Variant
				title="Prop — disabled & readonly"
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

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-radio v-model="slotAppendModel" value="custom" label="With append" data-cy="radio-slot-append">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-radio>
		</Variant>

		<Variant title="Slot — default">
			<origam-radio v-model="slotDefaultModel" value="custom" data-cy="radio-slot-default">
				<span>Custom slot content</span>
			</origam-radio>
		</Variant>

		<Variant title="Slot — details">
			<origam-radio v-model="slotDetailsModel" value="custom" label="With details" data-cy="radio-slot-details">
				<template #details>
					<span style="font-size: 0.75rem;">Custom hint text</span>
				</template>
			</origam-radio>
		</Variant>

		<Variant title="Slot — input">
			<origam-radio v-model="slotInputModel" value="custom" label="Custom input" data-cy="radio-slot-input">
				<template #input>
					<span>Custom slot content</span>
				</template>
			</origam-radio>
		</Variant>

		<Variant title="Slot — label">
			<origam-radio v-model="slotLabelModel" value="custom" data-cy="radio-slot-label">
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">Custom label slot</span>
				</template>
			</origam-radio>
			<div data-cy="radio-slot-label-status">value = {{ slotLabelModel }}</div>
		</Variant>

		<Variant title="Slot — message">
			<origam-radio v-model="slotMessageModel" value="custom" label="With message" :error="true" :error-messages="['Error']" data-cy="radio-slot-message">
				<template #message="{ message }">
					<span style="font-style: italic;">{{ message }}</span>
				</template>
			</origam-radio>
		</Variant>

		<Variant title="Slot — messages">
			<origam-radio v-model="slotMessagesModel" value="custom" label="With messages" :error="true" :error-messages="['Error one', 'Error two']" data-cy="radio-slot-messages">
				<template #messages>
					<span style="color: var(--origam-color__action--danger---bg);">Custom error display</span>
				</template>
			</origam-radio>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-radio v-model="slotPrependModel" value="custom" label="With prepend" data-cy="radio-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-radio>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:label">
			<origam-radio
					v-model="emitClickLabelModel"
					value="x"
					label="Click the label"
					data-cy="radio-emit-click-label"
					@click:label="logEvent('click:label', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:focused">
			<origam-radio
					v-model="emitFocusedModel"
					value="x"
					label="Focus me"
					data-cy="radio-emit-focused"
					@update:focused="logEvent('update:focused', $event)"
			/>
		</Variant>

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

		<Variant title="Emit — focus & blur">
			<origam-radio
					v-model="emitFocusModel"
					value="x"
					label="Focus & blur me"
					data-cy="radio-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamRadio } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IRadioProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, roundedList,
		hoverList
	} from '@stories/const'

	const colorModel          = ref<string | null>(null)
	const densityModel        = ref<string | null>(null)
	const roundedModel        = ref<string | null>(null)
	const statesModel         = ref<string | null>(null)
	const slotAppendModel     = ref<string | null>(null)
	const slotDefaultModel    = ref<string | null>(null)
	const slotDetailsModel    = ref<string | null>(null)
	const slotInputModel      = ref<string | null>(null)
	const slotLabelModel      = ref<string | null>(null)
	const slotMessageModel    = ref<string | null>(null)
	const slotMessagesModel   = ref<string | null>(null)
	const slotPrependModel    = ref<string | null>(null)
	const emitClickLabelModel = ref<string | null>(null)
	const emitFocusedModel    = ref<string | null>(null)
	const emitModel           = ref<string | null>(null)
	const emitFocusModel      = ref<string | null>(null)
	const playgroundModel     = ref<string | null>(null)
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadio.md"/>
