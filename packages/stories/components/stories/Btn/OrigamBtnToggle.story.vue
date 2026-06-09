<template>
	<Story
			group="components"
			title="Btn/OrigamBtnToggle"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBtnToggleProps>>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-btn-toggle
							:color="state.color"
							:bg-color="state.bgColor"
							:density="state.density"
							:rounded="state.rounded"
							:elevation="state.elevation"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:divided="state.divided"
							:tag="state.tag"
					>
						<origam-btn :value="1" text="One"/>
						<origam-btn :value="2" text="Two"/>
						<origam-btn :value="3" text="Three"/>
					</origam-btn-toggle>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.divided" title="Divided"/>
					<HstSelect   v-model="state.tag"     title="Tag"     :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IBtnToggleProps>>({ multiple: false, mandatory: false, disabled: false })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-btn-toggle
							v-model="functionalValue"
							:multiple="state.multiple"
							:mandatory="state.mandatory"
							:disabled="state.disabled"
							:max="state.max"
							:selected-class="state.selectedClass"
					>
						<origam-btn :value="1" text="One"/>
						<origam-btn :value="2" text="Two"/>
						<origam-btn :value="3" text="Three"/>
					</origam-btn-toggle>
					<div class="story-status">selected = <strong>{{ JSON.stringify(functionalValue) }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Selection">
					<HstCheckbox v-model="state.multiple"  title="Multiple"/>
					<HstCheckbox v-model="state.mandatory" title="Mandatory"/>
					<HstNumber   v-model="state.max"       title="Max" :min="0" :max="10" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Style">
					<HstText v-model="state.selectedClass" title="Selected Class"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:modelValue">
			<div class="story-shell">
				<origam-btn-toggle
						v-model="emitValue"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<origam-btn :value="1" text="One"/>
					<origam-btn :value="2" text="Two"/>
					<origam-btn :value="3" text="Three"/>
				</origam-btn-toggle>
				<div class="story-status">selected = <strong>{{ JSON.stringify(emitValue) }}</strong></div>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-btn-toggle v-model="slotDefaultValue">
					<origam-btn :value="'a'" text="Custom A"/>
					<origam-btn :value="'b'" text="Custom B"/>
					<origam-btn :value="'c'" text="Custom C"/>
				</origam-btn-toggle>
				<div class="story-status">selected = <strong>{{ slotDefaultValue ?? '(empty)' }}</strong></div>
			</div>
		</Variant>

		<Variant title="Slots - Item">
			<div class="story-shell">
				<origam-btn-toggle v-model="slotItemValue" :items="slotItems">
					<template #item="{ item }">
						<origam-btn :value="item" :text="`[ ${item} ]`"/>
					</template>
				</origam-btn-toggle>
				<div class="story-status">selected = <strong>{{ slotItemValue ?? '(empty)' }}</strong></div>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IBtnToggleProps>>({ color: 'primary', multiple: false, mandatory: false, disabled: false })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-btn-toggle
							v-bind="state"
							v-model="playgroundValue"
							@update:model-value="logEvent('update:modelValue', $event)"
					>
						<origam-btn :value="1" text="One"/>
						<origam-btn :value="2" text="Two"/>
						<origam-btn :value="3" text="Three"/>
					</origam-btn-toggle>
					<div class="story-status">selected = <strong>{{ JSON.stringify(playgroundValue) }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"       title="Color"        :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"     title="Bg Color"     :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.density"     title="Density"      :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.rounded"     title="Rounded"      :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation"   title="Elevation"    :options="ELEVATION_OPTIONS"/>
					<HstCheckbox v-model="state.divided"     title="Divided"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.multiple"  title="Multiple"/>
					<HstCheckbox v-model="state.mandatory" title="Mandatory"/>
					<HstCheckbox v-model="state.disabled"  title="Disabled"/>
				</StoryGroup>
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

	import { OrigamBtn, OrigamBtnToggle } from '@origam/components'
	import type { IBtnToggleProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const slotItems: Array<string> = ['X', 'Y', 'Z']

	const functionalValue  = ref<number | Array<number> | undefined>(1)
	const emitValue        = ref<number | undefined>(undefined)
	const slotDefaultValue = ref<string | undefined>(undefined)
	const slotItemValue    = ref<string | undefined>(undefined)
	const playgroundValue  = ref<number | Array<number> | undefined>(1)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Btn/OrigamBtnToggle.md"/>
