<template>
	<Story
			group="components"
			title="Checkbox/OrigamCheckbox"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICheckboxProps>({
					label: 'Accept terms',
					color: 'primary',
					density: undefined,
					rounded: undefined,
					disabled: false,
					readonly: false,
					indeterminate: false,
				})"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="playgroundModel"
						v-bind="state"
						data-cy="checkbox-playground"
				/>
				<div data-cy="checkbox-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"    :options="intentList"/>
				<HstSelect   v-model="state.density"       title="density"  :options="densityList"/>
				<HstSelect   v-model="state.rounded"       title="rounded"  :options="roundedList"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-checkbox
							v-model="colorModel"
							v-bind="state"
							label="Colored checkbox (interactive)"
							data-cy="checkbox-color"
					/>
					<div data-cy="checkbox-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-checkbox :model-value="true"
						                 color="primary"
						                 label='color="primary" only'
						                 data-cy="checkbox-color-fixture-color-only"/>
						<origam-checkbox :model-value="true"
						                 bg-color="success"
						                 label='bg-color="success" only'
						                 data-cy="checkbox-color-fixture-bg-only"/>
						<origam-checkbox :model-value="true"
						                 color="warning" bg-color="primary"
						                 label='color="warning" + bg-color="primary"'
						                 data-cy="checkbox-color-fixture-combo"/>
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
					<origam-checkbox
							v-model="colorModel"
							v-bind="state"
							label="Colored checkbox (interactive)"
							data-cy="checkbox-color"
					/>
					<div data-cy="checkbox-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-checkbox :model-value="true"
						                 color="primary"
						                 label='color="primary" only'
						                 data-cy="checkbox-color-fixture-color-only"/>
						<origam-checkbox :model-value="true"
						                 bg-color="success"
						                 label='bg-color="success" only'
						                 data-cy="checkbox-color-fixture-bg-only"/>
						<origam-checkbox :model-value="true"
						                 color="warning" bg-color="primary"
						                 label='color="warning" + bg-color="primary"'
						                 data-cy="checkbox-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.hover" title="hover" :options="hoverList"/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-checkbox
							v-model="colorModel"
							v-bind="state"
							label="Colored checkbox (interactive)"
							data-cy="checkbox-color"
					/>
					<div data-cy="checkbox-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-checkbox :model-value="true"
						                 color="primary"
						                 label='color="primary" only'
						                 data-cy="checkbox-color-fixture-color-only"/>
						<origam-checkbox :model-value="true"
						                 bg-color="success"
						                 label='bg-color="success" only'
						                 data-cy="checkbox-color-fixture-bg-only"/>
						<origam-checkbox :model-value="true"
						                 color="warning" bg-color="primary"
						                 label='color="warning" + bg-color="primary"'
						                 data-cy="checkbox-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.active" title="active" :options="activeList"/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="densityModel"
						:density="state.density"
						label="Density checkbox"
						data-cy="checkbox-density"
				/>
				<div data-cy="checkbox-density-status">value = {{ densityModel }}</div>
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
				<origam-checkbox
						v-model="roundedModel"
						:rounded="state.rounded"
						label="Rounded checkbox"
						data-cy="checkbox-rounded"
				/>
				<div data-cy="checkbox-rounded-status">value = {{ roundedModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & indeterminate"
				:init-state="() => useStoryInitState<{
					disabled: boolean
					readonly: boolean
					indeterminate: boolean
				}>({ disabled: false, readonly: false, indeterminate: false })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:indeterminate="state.indeterminate"
						label="Stateful checkbox"
						data-cy="checkbox-states"
				/>
				<div data-cy="checkbox-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<Variant
				title="Prop — error & errorMessages"
				:init-state="() => useStoryInitState<{ error: boolean, errorMessages: string }>({ error: false, errorMessages: 'This field is required' })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="errorModel"
						:error="state.error"
						:error-messages="state.error ? [state.errorMessages] : []"
						label="Validate checkbox"
						data-cy="checkbox-error"
				/>
				<div data-cy="checkbox-error-status">value = {{ errorModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.error"         title="error"/>
				<HstText     v-model="state.errorMessages" title="errorMessages"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — label">
			<origam-checkbox v-model="slotLabelModel" data-cy="checkbox-slot-label">
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">
						I agree to the <strong>terms of service</strong>
					</span>
				</template>
			</origam-checkbox>
			<div data-cy="checkbox-slot-label-status">value = {{ slotLabelModel }}</div>
		</Variant>

		<Variant title="Slot — input">
			<origam-checkbox v-model="slotInputModel" label="Custom input" data-cy="checkbox-slot-input">
				<template #input="{ props: inputProps, icon, model }">
					<div
							v-bind="inputProps"
							style="width: 24px; height: 24px; border: 2px solid var(--origam-color__action--primary---bg); border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
					>
						<origam-icon v-if="icon" :icon="icon"/>
						<span v-else-if="model" style="font-size: 12px; color: var(--origam-color__action--primary---bg);">✓</span>
					</div>
				</template>
			</origam-checkbox>
			<div data-cy="checkbox-slot-input-status">value = {{ slotInputModel }}</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-checkbox
					v-model="emitModel"
					label="Toggle me"
					data-cy="checkbox-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="checkbox-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — focus & blur">
			<origam-checkbox
					v-model="emitFocusModel"
					label="Focus & blur me"
					data-cy="checkbox-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:label">
			<origam-checkbox
					v-model="emitClickLabelModel"
					label="Click the label"
					data-cy="checkbox-emit-click-label"
					@click:label="logEvent('click:label', $event)"
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

	import { OrigamCheckbox, OrigamIcon } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { ICheckboxProps, IColorProps, IDensityProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, roundedList,
		hoverList
	} from '@stories/const'

	const colorModel        = ref(false)
	const densityModel      = ref(false)
	const roundedModel      = ref(false)
	const statesModel       = ref(false)
	const errorModel        = ref(false)
	const slotLabelModel    = ref(false)
	const slotInputModel    = ref(false)
	const emitModel         = ref(false)
	const emitFocusModel    = ref(false)
	const emitClickLabelModel = ref(false)
	const playgroundModel   = ref(false)
</script>

<docs lang="md" src="@docs/components/Checkbox/OrigamCheckbox.md"/>
