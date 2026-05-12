<template>
	<Story
			group="components"
			title="Counter/OrigamCounter"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICounterProps>({
					value: 50,
					max: 100,
					active: true,
					disabled: false,
				})"
		>
			<template #default="{ state }">
				<origam-counter
						v-bind="state"
						data-cy="counter-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.value"    title="value"    :min="0"  :max="200"/>
				<HstSlider   v-model="state.max"      title="max"      :min="1"  :max="500"/>
				<HstCheckbox v-model="state.active"   title="active"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-counter :value="50" :max="100" :active="true" v-bind="state" data-cy="counter-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<origam-counter :value="10" :max="100" :active="true" color="primary" data-cy="counter-color-primary"/>
						<origam-counter :value="20" :max="100" :active="true" color="success" data-cy="counter-color-success"/>
						<origam-counter :value="30" :max="100" :active="true" color="warning" data-cy="counter-color-warning"/>
						<origam-counter :value="40" :max="100" :active="true" color="danger"  data-cy="counter-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — value & max"
				:init-state="() => useStoryInitState<{ value: number, max: number }>({ value: 42, max: 100 })"
		>
			<template #default="{ state }">
				<origam-counter
						:value="state.value"
						:max="state.max"
						:active="true"
						data-cy="counter-value"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.value" title="value" :min="0" :max="state.max"/>
				<HstSlider v-model="state.max"   title="max"   :min="1" :max="500"/>
			</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<{ active: boolean }>({ active: true })"
		>
			<template #default="{ state }">
				<origam-counter
						:value="30"
						:max="100"
						:active="state.active"
						data-cy="counter-active"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active" title="active"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<origam-counter
						:value="10"
						:max="50"
						:active="true"
						:disabled="state.disabled"
						data-cy="counter-disabled"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<Variant title="Prop — value (overflow)">
			<origam-counter
					:value="150"
					:max="100"
					:active="true"
					data-cy="counter-overflow"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCounter } from '@origam/components'
	import type { IColorProps, ICounterProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Counter/OrigamCounter.md"/>
