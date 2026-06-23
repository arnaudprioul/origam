<template>
	<Story
			group="components"
			title="Radio/OrigamRadioGroup"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IRadioGroupProps>>({
					label: 'Pick one',
					color: 'primary',
					density: 'default',
					rounded: undefined,
					elevation: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					direction: 'vertical',
					width: undefined,
					height: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-radio-group
						v-model="designModel"
						:label="state.label"
						:padding="state.padding"
						:margin="state.margin"
						:color="state.color"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:direction="state.direction"
						:width="state.width"
						:height="state.height"
						:items="defaultItems"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density"  title="Density"   :options="DENSITY_OPTIONS"/>
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
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="State"
				:init-state="() => useStoryInitState<Partial<IRadioGroupProps>>({
					color: 'primary',
					hover: undefined,
					active: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-radio-group
						v-model="stateModel"
						:color="state.color"
						:hover="resolveHoverState(state.hover)"
						:active="resolveActiveState(state.active)"
						label="State demo"
						:items="defaultItems"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover"  title="Hover"  :options="HOVER_OPTIONS"/>
					<HstSelect v-model="state.active" title="Active" :options="ACTIVE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IRadioGroupProps>>({
					disabled: false,
					readonly: false,
					required: false,
					error: false,
					errorMessages: [],
					hint: '',
					persistentHint: false,
					hideDetails: false,
					inline: false,
					name: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-radio-group
						v-model="functionalModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:required="state.required"
						:error="state.error"
						:error-messages="state.errorMessages"
						:hint="state.hint"
						:persistent-hint="state.persistentHint"
						:hide-details="state.hideDetails"
						:inline="state.inline"
						:name="state.name"
						label="Functional group"
						:items="defaultItems"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
					<HstCheckbox v-model="state.readonly" title="Readonly"/>
					<HstCheckbox v-model="state.required" title="Required"/>
				</StoryGroup>
				<StoryGroup title="Validation">
					<HstCheckbox v-model="state.error"          title="Error"/>
					<HstText     v-model="state.hint"           title="Hint"/>
					<HstCheckbox v-model="state.persistentHint" title="Persistent Hint"/>
					<HstCheckbox v-model="state.hideDetails"    title="Hide Details"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.inline" title="Inline"/>
					<HstText     v-model="state.name"   title="Name"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:modelValue">
			<origam-radio-group
					v-model="eventModel"
					label="Pick one"
					:items="defaultItems"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Slots - Default">
			<origam-radio-group
					v-model="defaultSlotModel"
					label="Custom default slot"
			>
				<template #default>
					<span>Custom slot content</span>
				</template>
			</origam-radio-group>
		</Variant>

		<Variant title="Slots - Label">
			<origam-radio-group
					v-model="slotLabelModel"
					:items="defaultItems"
					required
			>
				<template #label="{ label, required }">
					<strong>Custom label</strong>
					<span v-if="required" style="color: var(--origam-color__feedback--danger---bg);"> *</span>
					<small style="display: block; color: var(--origam-color__text---secondary);">
						{{ label }}
					</small>
				</template>
			</origam-radio-group>
		</Variant>

		<Variant title="Slots - Item">
			<origam-radio-group
					v-model="slotItemModel"
					label="Custom-rendered options"
					:items="defaultItems"
			>
				<template #item="{ id }">
					<origam-radio
							v-model="slotItemModel"
							value="alpha"
							label="Alpha (slot)"
							:aria-describedby="id"
					/>
					<origam-radio
							v-model="slotItemModel"
							value="bravo"
							label="Bravo (slot)"
							:aria-describedby="id"
					/>
					<origam-radio
							v-model="slotItemModel"
							value="charlie"
							label="Charlie (slot)"
							:aria-describedby="id"
					/>
				</template>
			</origam-radio-group>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IRadioGroupProps>>({
					label: 'Pick one',
					color: 'primary',
					density: 'default',
					direction: 'vertical',
					disabled: false,
					readonly: false,
					required: false,
					error: false,
					hint: '',
					persistentHint: false,
					inline: false,
					rounded: undefined,
					elevation: undefined,
					border: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-radio-group
						v-model="playgroundModel"
						v-bind="state"
						:items="defaultItems"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.label" title="Label"/>
					<HstText v-model="state.hint"  title="Hint"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect   v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled"     title="Disabled"/>
					<HstCheckbox v-model="state.readonly"     title="Readonly"/>
					<HstCheckbox v-model="state.required"     title="Required"/>
					<HstCheckbox v-model="state.error"        title="Error"/>
					<HstCheckbox v-model="state.persistentHint" title="Persistent Hint"/>
					<HstCheckbox v-model="state.inline"       title="Inline"/>
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

	import { OrigamRadio, OrigamRadioGroup } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type { IRadioGroupProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const DIRECTION_OPTIONS = [
		{ label: 'Vertical',   value: DIRECTION.VERTICAL },
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL }
	]

	const defaultItems = [
		{ value: 'alpha',   label: 'Alpha'   },
		{ value: 'bravo',   label: 'Bravo'   },
		{ value: 'charlie', label: 'Charlie' }
	]

	const designModel      = ref()
	const stateModel       = ref()
	const functionalModel  = ref()
	const eventModel       = ref()
	const defaultSlotModel = ref()
	const slotLabelModel   = ref()
	const slotItemModel    = ref()
	const playgroundModel  = ref()
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadioGroup.md"/>
