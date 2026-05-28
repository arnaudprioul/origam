<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Default"
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
					variant: 'field',
					buffered: undefined,
					showThumbOnHoverOnly: false,
					showHoverTooltip: false,
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
				<HstText     v-model="state.label"                title="label"/>
				<HstSelect   v-model="state.variant"              title="variant"  :options="sliderFieldVariantList"/>
				<HstSelect   v-model="state.color"                title="color"    :options="intentList"/>
				<HstSelect   v-model="state.density"              title="density"  :options="densityList"/>
				<HstSlider   v-model="state.min"                  title="min"      :min="-100" :max="0"/>
				<HstSlider   v-model="state.max"                  title="max"      :min="1"    :max="200"/>
				<HstSlider   v-model="state.step"                 title="step"     :min="1"    :max="50"/>
				<HstSlider   v-model="state.buffered"             title="buffered" :min="0"    :max="100"/>
				<HstCheckbox v-model="state.range"                title="range"/>
				<HstCheckbox v-model="state.reverse"              title="reverse"/>
				<HstCheckbox v-model="state.disabled"             title="disabled"/>
				<HstCheckbox v-model="state.readonly"             title="readonly"/>
				<HstCheckbox v-model="state.error"                title="error"/>
				<HstCheckbox v-model="state.showThumbOnHoverOnly" title="showThumbOnHoverOnly"/>
				<HstCheckbox v-model="state.showHoverTooltip"     title="showHoverTooltip"/>
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
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
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
				title="Variant — variant=timer (video scrubber)"
				:init-state="() => useStoryInitState<{ buffered: number, showHoverTooltip: boolean }>({ buffered: 65, showHoverTooltip: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; background: #111; border-radius: 8px;">
					<small style="color: rgba(255,255,255,0.6);">Sober video-scrubber look — no input chrome, hairline rail, thumb hidden until hover.</small>
					<origam-slider-field
							v-model="timerModel"
							variant="timer"
							color="primary"
							:buffered="state.buffered"
							:show-hover-tooltip="state.showHoverTooltip"
							:format-hover-tooltip="formatTimerHover"
							:min="0"
							:max="100"
							label="Playback timeline"
							data-cy="slider-timer"
					/>
					<div data-cy="slider-timer-status" style="color: rgba(255,255,255,0.8);">value = {{ timerModel }} / buffered = {{ state.buffered }}</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.buffered"         title="buffered"         :min="0" :max="100"/>
				<HstCheckbox v-model="state.showHoverTooltip" title="showHoverTooltip"/>
			</template>
		</Variant>

		<Variant
				title="Variant — variant=audio (waveform)"
				:init-state="() => useStoryInitState<{ buffered: number }>({ buffered: 80 })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; background: #111; border-radius: 8px;">
					<small style="color: rgba(255,255,255,0.6);">Waveform background painted from `peaks` — bars left of the thumb use the active color, bars right use a 35 % mix.</small>
					<origam-slider-field
							v-model="audioModel"
							variant="audio"
							color="primary"
							:buffered="state.buffered"
							:peaks="demoPeaks"
							:show-hover-tooltip="true"
							:format-hover-tooltip="formatTimerHover"
							:min="0"
							:max="100"
							label="Audio waveform"
							data-cy="slider-audio"
					/>
					<div data-cy="slider-audio-status" style="color: rgba(255,255,255,0.8);">value = {{ audioModel }} / peaks = {{ demoPeaks.length }} bars</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.buffered" title="buffered" :min="0" :max="100"/>
			</template>
		</Variant>

		<Variant
				title="Variant — buffered (media loaded indicator)"
				:init-state="() => useStoryInitState<{ buffered: number }>({ buffered: 50 })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<small>The `buffered` prop renders a secondary fill at reduced opacity between `min` and `buffered`. Works for every variant.</small>
					<origam-slider-field
							v-model="bufferedFieldModel"
							variant="field"
							color="primary"
							:buffered="state.buffered"
							:min="0"
							:max="100"
							label="variant=field"
							data-cy="slider-buffered-field"
					/>
					<origam-slider-field
							v-model="bufferedTimerModel"
							variant="timer"
							color="primary"
							:buffered="state.buffered"
							:min="0"
							:max="100"
							label="variant=timer"
							data-cy="slider-buffered-timer"
					/>
					<div data-cy="slider-buffered-status">field = {{ bufferedFieldModel }} / timer = {{ bufferedTimerModel }} / buffered = {{ state.buffered }}</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.buffered" title="buffered" :min="0" :max="100"/>
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

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamSliderField } from '@origam/components'
	import type { IColorProps, IOptions, ISliderFieldProps } from '@origam/interfaces'
	import type { TSliderFieldVariant } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList,
		hoverList
	} from '@stories/const'

	const colorModel         = ref(50)
	const rangeModel         = ref([20, 80])
	const stepModel          = ref(50)
	const ticksModel         = ref(50)
	const directionModel     = ref(50)
	const reverseModel       = ref(50)
	const statesModel        = ref(40)
	const playgroundModel    = ref(50)
	const timerModel         = ref(35)
	const audioModel         = ref(50)
	const bufferedFieldModel = ref(30)
	const bufferedTimerModel = ref(30)

	const ticksList: Array<IOptions<string>> = [
		{ label: 'always', value: 'always' },
	]

	const directionList: Array<IOptions<string>> = [
		{ label: 'horizontal', value: 'horizontal' },
		{ label: 'vertical',   value: 'vertical'   },
	]

	const sliderFieldVariantList: Array<IOptions<TSliderFieldVariant>> = [
		{ label: 'field (default)', value: 'field' },
		{ label: 'timer',           value: 'timer' },
		{ label: 'audio',           value: 'audio' },
	]

	const formatTimerHover = (value: number): string => {
		const totalSeconds = Math.round(value * 1.8)
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60
		return `${minutes}:${String(seconds).padStart(2, '0')}`
	}

	const demoPeaks: ReadonlyArray<number> = Array.from({ length: 200 }, (_, index) => {
		const phase = (index / 200) * Math.PI * 6
		const envelope = 0.6 + 0.35 * Math.sin(phase * 0.5)
		const detail = 0.35 * Math.sin(phase * 2.7) + 0.15 * Math.sin(phase * 5.1)
		const noise = ((index * 9301 + 49297) % 233280) / 233280 * 0.18
		const raw = envelope + detail + noise
		return Math.max(0.05, Math.min(1, Math.abs(raw)))
	})
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderField.md"/>
