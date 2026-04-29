<template>
	<Story
			group="components"
			title="Btn/OrigamBtnToggle"
	>

		<!-- ════════════ DEFAULT (single selection) ════════════ -->
		<Variant title="Default">
			<div class="story-shell" data-cy="btn-toggle-default">
				<origam-btn-toggle v-model="defaultValue">
					<origam-btn :value="'left'"   text="Left"   data-cy="bt-default-left"/>
					<origam-btn :value="'center'" text="Center" data-cy="bt-default-center"/>
					<origam-btn :value="'right'"  text="Right"  data-cy="bt-default-right"/>
				</origam-btn-toggle>
				<div class="story-status" data-cy="bt-default-status">selected = <strong>{{ defaultValue }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<div class="story-shell" data-cy="btn-toggle-multiple">
				<origam-btn-toggle v-model="multipleValue" multiple>
					<origam-btn :value="'bold'"      text="B" data-cy="bt-multiple-bold"/>
					<origam-btn :value="'italic'"    text="I" data-cy="bt-multiple-italic"/>
					<origam-btn :value="'underline'" text="U" data-cy="bt-multiple-underline"/>
				</origam-btn-toggle>
				<div class="story-status" data-cy="bt-multiple-status">selected = <strong>{{ multipleValue.join(', ') || '(empty)' }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ MANDATORY ════════════ -->
		<Variant
				title="Mandatory"
				:init-state="() => useStoryInitState<{ mandatory: boolean }>({ mandatory: true })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="btn-toggle-mandatory">
					<origam-btn-toggle v-model="mandatoryValue" :mandatory="state.mandatory">
						<origam-btn :value="'compact'"     text="Compact"     data-cy="bt-mandatory-compact"/>
						<origam-btn :value="'default'"     text="Default"     data-cy="bt-mandatory-default"/>
						<origam-btn :value="'comfortable'" text="Comfortable" data-cy="bt-mandatory-comfortable"/>
					</origam-btn-toggle>
					<div class="story-status" data-cy="bt-mandatory-status">selected = <strong>{{ mandatoryValue }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>

		<!-- ════════════ DISABLED ════════════ -->
		<Variant
				title="Disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="btn-toggle-disabled">
					<origam-btn-toggle v-model="disabledValue" :disabled="state.disabled">
						<origam-btn :value="'a'" text="A" data-cy="bt-disabled-a"/>
						<origam-btn :value="'b'" text="B" data-cy="bt-disabled-b"/>
					</origam-btn-toggle>
					<div class="story-status" data-cy="bt-disabled-status">selected = <strong>{{ disabledValue ?? '(empty)' }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<{ density?: TDensity }>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-btn-toggle v-model="densityValue" :density="state.density" data-cy="btn-toggle-density">
					<origam-btn :value="1" text="One"   data-cy="bt-density-1"/>
					<origam-btn :value="2" text="Two"   data-cy="bt-density-2"/>
					<origam-btn :value="3" text="Three" data-cy="bt-density-3"/>
				</origam-btn-toggle>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<{ rounded?: boolean | string }>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-btn-toggle v-model="roundedValue" :rounded="state.rounded" data-cy="btn-toggle-rounded">
					<origam-btn :value="'grid'" text="Grid" data-cy="bt-rounded-grid"/>
					<origam-btn :value="'list'" text="List" data-cy="bt-rounded-list"/>
				</origam-btn-toggle>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-btn-toggle v-bind="state" v-model="colorValue" data-cy="btn-toggle-color">
					<origam-btn :value="'grid'" text="Grid" data-cy="bt-color-grid"/>
					<origam-btn :value="'list'" text="List" data-cy="bt-color-list"/>
				</origam-btn-toggle>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBtnToggleProps>({
					density: DENSITY.DEFAULT,
					divided: false,
					rounded: undefined,
					mandatory: false,
					multiple: false,
					disabled: false,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="btn-toggle-playground">
					<origam-btn-toggle v-bind="state" v-model="playgroundValue">
						<origam-btn :value="1" text="One"   data-cy="bt-playground-1"/>
						<origam-btn :value="2" text="Two"   data-cy="bt-playground-2"/>
						<origam-btn :value="3" text="Three" data-cy="bt-playground-3"/>
					</origam-btn-toggle>
					<div class="story-status" data-cy="bt-playground-status">selected = <strong>{{ JSON.stringify(playgroundValue) }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstCheckbox v-model="state.divided"   title="divided"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamBtn, OrigamBtnToggle } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IBtnToggleProps, IColorProps } from '@origam/interfaces'
	import type { TDensity } from '@origam/types'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const defaultValue = ref<'left' | 'center' | 'right'>('center')
	const multipleValue = ref<Array<string>>(['bold'])
	const mandatoryValue = ref<'compact' | 'default' | 'comfortable'>('default')
	const disabledValue = ref<'a' | 'b' | undefined>(undefined)
	const densityValue = ref<number>(2)
	const roundedValue = ref<'grid' | 'list'>('grid')
	const colorValue = ref<'grid' | 'list'>('grid')
	const playgroundValue = ref<number | Array<number> | undefined>(1)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Btn/OrigamBtnToggle.md"/>
