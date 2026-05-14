<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderFieldTrack"
	>

		<!--
			<origam-slider-field-track> is the rail behind the slider's
			thumb. The `start` / `stop` props express the filled segment in
			percent (0-100). Realistic usage is via <origam-slider-field>.
		-->

		<Variant title="Default (full track)">
			<div style="padding: 24px;">
				<origam-slider-field-track :start="0" :stop="100" data-cy="slider-track-full"/>
			</div>
		</Variant>

		<Variant title="Filled segment 0–60">
			<div style="padding: 24px;">
				<origam-slider-field-track :start="0" :stop="60" data-cy="slider-track-half"/>
			</div>
		</Variant>

		<Variant title="Range segment 25–75">
			<div style="padding: 24px;">
				<origam-slider-field-track :start="25" :stop="75" data-cy="slider-track-range"/>
			</div>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-slider-field-track :start="0" :stop="60" v-bind="state" data-cy="slider-track-color"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: SIZES.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-slider-field-track :start="0" :stop="60" :size="state.size" data-cy="slider-track-size"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant title="Disabled">
			<div style="padding: 24px;">
				<origam-slider-field-track :start="0" :stop="60" disabled data-cy="slider-track-disabled"/>
			</div>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — item">
			<div style="padding: 24px;">
				<origam-slider-field-track :start="0" :stop="60" data-cy="slider-track-slot-item">
					<template #item="{ position }">
						<span
								style="position: absolute; width: 2px; height: 12px; background: currentColor; top: 50%; transform: translateY(-50%);"
								:style="{ left: position + '%' }"
						/>
					</template>
				</origam-slider-field-track>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISliderFieldTrackProps>({
					start: 25,
					stop: 75,
					disabled: false,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-slider-field-track v-bind="state" data-cy="slider-track-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.start"    title="start"    :min="0" :max="100"/>
				<HstSlider   v-model="state.stop"     title="stop"     :min="0" :max="100"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstSelect   v-model="state.color"    title="color"    :options="intentList"/>
				<HstSelect   v-model="state.bgColor"  title="bgColor"  :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSliderFieldTrack } from '@origam/components'
	import { SIZES } from '@origam/enums'
	import type { IColorProps, ISizeProps, ISliderFieldTrackProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, sizeList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderFieldTrack.md"/>
