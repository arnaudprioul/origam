<template>
	<Story
			group="components"
			title="Counter/OrigamCounter"
	>

		<!-- ════════════ VALUE / MAX ════════════ -->
		<Variant
				title="Value & max"
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

		<!-- ════════════ ACTIVE ════════════ -->
		<Variant
				title="Active"
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

		<!-- ════════════ DISABLED ════════════ -->
		<Variant
				title="Disabled"
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

		<!-- ════════════ OVERFLOW (value > max) ════════════ -->
		<Variant title="Overflow (value > max)">
			<origam-counter
					:value="150"
					:max="100"
					:active="true"
					data-cy="counter-overflow"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCounter } from '@origam/components'
	import type { ICounterProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Counter/OrigamCounter.md"/>
