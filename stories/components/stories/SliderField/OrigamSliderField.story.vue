<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISliderFieldProps>({
					label: 'Slider',
					color: 'primary',
					density: undefined,
					min: 0,
					max: 100,
					step: 1,
					range: false,
					reverse: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-slider-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="slider-playground"
				/>
				<div data-cy="slider-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"    title="label"/>
				<HstSelect   v-model="state.color"    title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"  title="density" :options="densityList"/>
				<HstSlider   v-model="state.min"      title="min"     :min="-100" :max="0"/>
				<HstSlider   v-model="state.max"      title="max"     :min="1"    :max="200"/>
				<HstSlider   v-model="state.step"     title="step"    :min="1"    :max="50"/>
				<HstCheckbox v-model="state.range"    title="range"/>
				<HstCheckbox v-model="state.reverse"  title="reverse"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-slider-field
							v-model="colorModel"
							v-bind="state"
							:min="0"
							:max="100"
							label="Volume (interactive)"
							data-cy="slider-color"
					/>

					<div style="border-top: 1px dashed var(--origam-color__border---subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="primary"
						                     label='color="primary" only'
						                     data-cy="slider-color-fixture-color-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     bg-color="success"
						                     label='bg-color="success" only'
						                     data-cy="slider-color-fixture-bg-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="warning" bg-color="primary"
						                     label='color="warning" + bg-color="primary"'
						                     data-cy="slider-color-fixture-combo"/>
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
					<origam-slider-field
							v-model="colorModel"
							v-bind="state"
							:min="0"
							:max="100"
							label="Volume (interactive)"
							data-cy="slider-color"
					/>

					<div style="border-top: 1px dashed var(--origam-color__border---subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="primary"
						                     label='color="primary" only'
						                     data-cy="slider-color-fixture-color-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     bg-color="success"
						                     label='bg-color="success" only'
						                     data-cy="slider-color-fixture-bg-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="warning" bg-color="primary"
						                     label='color="warning" + bg-color="primary"'
						                     data-cy="slider-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.hover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => { if (v && typeof v === 'object') { if (!state.hover || typeof state.hover !== 'object') state.hover = {}; const t = state.hover; for (const k of Object.keys(t)) delete t[k]; Object.assign(t, v) } else { state.hover = v } }"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-slider-field
							v-model="colorModel"
							v-bind="state"
							:min="0"
							:max="100"
							label="Volume (interactive)"
							data-cy="slider-color"
					/>

					<div style="border-top: 1px dashed var(--origam-color__border---subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="primary"
						                     label='color="primary" only'
						                     data-cy="slider-color-fixture-color-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     bg-color="success"
						                     label='bg-color="success" only'
						                     data-cy="slider-color-fixture-bg-only"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     color="warning" bg-color="primary"
						                     label='color="warning" + bg-color="primary"'
						                     data-cy="slider-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.active"
							:options="activeList"
							title="active"
							@update:model-value="(v) => { if (v && typeof v === 'object') { if (!state.active || typeof state.active !== 'object') state.active = {}; const t = state.active; for (const k of Object.keys(t)) delete t[k]; Object.assign(t, v) } else { state.active = v } }"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — range"
				:init-state="() => useStoryInitState<{ range: boolean }>({ range: true })"
		>
			<template #default="{ state }">
				<origam-slider-field
						v-model="rangeModel"
						:range="state.range"
						:min="0"
						:max="100"
						label="Price range"
						data-cy="slider-range"
				/>
				<div data-cy="slider-range-status">value = {{ rangeModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.range" title="range"/>
			</template>
		</Variant>

		<Variant
				title="Prop — step"
				:init-state="() => useStoryInitState<{ step: number }>({ step: 10 })"
		>
			<template #default="{ state }">
				<origam-slider-field
						v-model="stepModel"
						:step="state.step"
						:min="0"
						:max="100"
						label="Step"
						data-cy="slider-step"
				/>
				<div data-cy="slider-step-status">value = {{ stepModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.step" title="step" :min="1" :max="50"/>
			</template>
		</Variant>

		<Variant
				title="Prop — ticks"
				:init-state="() => useStoryInitState<{ showTicks: string }>({ showTicks: 'always' })"
		>
			<template #default="{ state }">
				<origam-slider-field
						v-model="ticksModel"
						:show-ticks="state.showTicks"
						:step="25"
						:min="0"
						:max="100"
						label="With ticks"
						data-cy="slider-ticks"
				/>
				<div data-cy="slider-ticks-status">value = {{ ticksModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.showTicks" title="showTicks" :options="ticksList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — direction"
				:init-state="() => useStoryInitState<{ direction: string }>({ direction: 'horizontal' })"
		>
			<template #default="{ state }">
				<div :style="state.direction === 'vertical' ? 'height: 200px; display: flex;' : ''">
					<origam-slider-field
							v-model="directionModel"
							:direction="state.direction"
							:min="0"
							:max="100"
							label="Direction"
							data-cy="slider-direction"
					/>
				</div>
				<div data-cy="slider-direction-status">value = {{ directionModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — reverse"
				:init-state="() => useStoryInitState<{ reverse: boolean }>({ reverse: true })"
		>
			<template #default="{ state }">
				<origam-slider-field
						v-model="reverseModel"
						:reverse="state.reverse"
						:min="0"
						:max="100"
						label="Reversed"
						data-cy="slider-reverse"
				/>
				<div data-cy="slider-reverse-status">value = {{ reverseModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.reverse" title="reverse"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & error"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-slider-field
							v-model="statesModel"
							:disabled="state.disabled"
							:readonly="state.readonly"
							:error="state.error"
							:min="0"
							:max="100"
							label="Stateful slider"
							data-cy="slider-states"
					/>
					<div data-cy="slider-states-status">value = {{ statesModel }}</div>

					<div style="border-top: 1px dashed var(--origam-color__border---subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — error forces danger on color + bgColor:</small>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     error
						                     label='error only (no color/bgColor)'
						                     data-cy="slider-states-fixture-error"/>
						<origam-slider-field :model-value="40" :min="0" :max="100"
						                     error color="primary" bg-color="success"
						                     label='error overrides color="primary" + bg-color="success"'
						                     data-cy="slider-states-fixture-error-overrides"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-slider-field
					v-model="emitModel"
					:min="0"
					:max="100"
					label="Move me"
					data-cy="slider-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="slider-emit-status">value = {{ emitModel }}</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamSliderField } from '@origam/components'
	import type { IColorProps, IOptions, ISliderFieldProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList,
		hoverList
	} from '@stories/const'

	const colorModel      = ref(50)
	const rangeModel      = ref([20, 80])
	const stepModel       = ref(50)
	const ticksModel      = ref(50)
	const directionModel  = ref(50)
	const reverseModel    = ref(50)
	const statesModel     = ref(40)
	const emitModel       = ref(50)
	const playgroundModel = ref(50)

	const ticksList: Array<IOptions<string>> = [
		{ label: 'always', value: 'always' },
	]

	const directionList: Array<IOptions<string>> = [
		{ label: 'horizontal', value: 'horizontal' },
		{ label: 'vertical',   value: 'vertical'   },
	]
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderField.md"/>
