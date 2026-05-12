<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderFieldThumb"
	>

		<!--
			<origam-slider-field-thumb> is the draggable handle inside
			<origam-slider-field>. The Playground surfaces the raw thumb
			props; the surrounding variants show the thumb in its real
			parent (SliderField) so the consumer can also test the
			integrated UX (drag, focus, value flow).
		-->

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISliderFieldThumbProps>({
					min: 0,
					max: 100,
					modelValue: 42,
					position: 42,
					disabled: false,
					readonly: false,
					focused: false,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; position: relative; min-height: 80px;">
					<origam-slider-field-thumb v-bind="state" data-cy="slider-thumb-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.min"        title="min"/>
				<HstNumber   v-model="state.max"        title="max"/>
				<HstNumber   v-model="state.modelValue" title="modelValue"/>
				<HstNumber   v-model="state.position"   title="position (px)"/>
				<HstCheckbox v-model="state.disabled"   title="disabled"/>
				<HstCheckbox v-model="state.readonly"   title="readonly"/>
				<HstCheckbox v-model="state.focused"    title="focused"/>
				<HstSelect   v-model="state.color"      title="color"      :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — embedded in SliderField (real wiring)">
			<div style="padding: 24px; max-width: 400px;">
				<origam-slider-field
						v-model="defaultValue"
						label="Volume"
						data-cy="slider-thumb-default"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;">
					<origam-slider-field
							v-model="colorValue"
							v-bind="state"
							label="Tinted slider"
							data-cy="slider-thumb-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: SIZES.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;">
					<origam-slider-field
							v-model="sizeValue"
							:size="state.size"
							label="Size-aware slider"
							data-cy="slider-thumb-size"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant title="Prop — persistent-label (label always visible)">
			<div style="padding: 32px 24px; max-width: 400px;">
				<origam-slider-field
						v-model="labelValue"
						label="Persistent thumb label"
						persistent-label
						data-cy="slider-thumb-label-always"
				/>
			</div>
		</Variant>

		<Variant title="Prop — disabled / readonly">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
				<origam-slider-field v-model="stateValue" label="Disabled" disabled data-cy="slider-thumb-disabled"/>
				<origam-slider-field v-model="stateValue" label="Readonly" readonly data-cy="slider-thumb-readonly"/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamSliderField, OrigamSliderFieldThumb } from '@origam/components'
	import { SIZES } from '@origam/enums'
	import type { IColorProps, ISizeProps, ISliderFieldThumbProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, sizeList } from '@stories/const'

	const defaultValue = ref(42)
	const colorValue   = ref(60)
	const sizeValue    = ref(50)
	const labelValue   = ref(75)
	const stateValue   = ref(30)
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderFieldThumb.md"/>
