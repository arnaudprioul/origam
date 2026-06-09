<template>
	<Story
			group="components"
			title="Checkbox/OrigamCheckbox"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ICheckboxProps>>({ label: 'Checkbox', color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="designModel"
						:color="state.color"
						:padding="state.padding"
						:margin="state.margin"
						:bg-color="state.bgColor"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:true-icon="state.trueIcon || undefined"
						:false-icon="state.falseIcon || undefined"
						:prepend-icon="state.prependIcon || undefined"
						:append-icon="state.appendIcon || undefined"
						:width="state.width"
						:height="state.height"
						:label="state.label"
						:inline="state.inline"
				/>
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
				<StoryGroup title="Icons">
					<HstSelect v-model="state.trueIcon"    title="True Icon"    :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.falseIcon"   title="False Icon"   :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.prependIcon" title="Prepend Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendIcon"  title="Append Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.inline" title="Inline"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ ÉTAT ══════════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IActiveProps & IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="stateModel"
						:color="state.color"
						:hover="resolveHoverState(state.hover)"
						:active="resolveActiveState(state.active)"
						label="Checkbox"
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

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ICheckboxProps>>({
					label: 'Checkbox',
					disabled: false,
					readonly: false,
					required: false,
					indeterminate: false,
					multiple: false,
					error: false,
					errorMessages: 'This field is required',
					hint: '',
					persistentHint: false,
					hideDetails: false,
				})"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="functionalModel"
						:label="state.label"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:required="state.required"
						:indeterminate="state.indeterminate"
						:indeterminate-icon="state.indeterminateIcon || undefined"
						:multiple="state.multiple"
						:true-value="state.trueValue"
						:false-value="state.falseValue"
						:error="state.error"
						:error-messages="state.error ? [state.errorMessages] : []"
						:hint="state.hint"
						:persistent-hint="state.persistentHint"
						:hide-details="state.hideDetails"
				/>
				<div>value = {{ functionalModel }}</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled"      title="Disabled"/>
					<HstCheckbox v-model="state.readonly"      title="Readonly"/>
					<HstCheckbox v-model="state.required"      title="Required"/>
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstSelect   v-model="state.indeterminateIcon" title="Indeterminate Icon" :options="ICON_OPTIONS"/>
					<HstCheckbox v-model="state.multiple"      title="Multiple"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstText v-model="state.trueValue"  title="True Value"/>
					<HstText v-model="state.falseValue" title="False Value"/>
				</StoryGroup>
				<StoryGroup title="Validation">
					<HstCheckbox v-model="state.error"         title="Error"/>
					<HstText     v-model="state.errorMessages" title="Error Messages"/>
				</StoryGroup>
				<StoryGroup title="Hints">
					<HstText     v-model="state.hint"          title="Hint"/>
					<HstCheckbox v-model="state.persistentHint" title="Persistent Hint"/>
					<HstCheckbox v-model="state.hideDetails"   title="Hide Details"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:modelValue">
			<origam-checkbox
					v-model="emitModel"
					label="Toggle me"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div>value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Events - focus & blur">
			<origam-checkbox
					v-model="emitFocusModel"
					label="Focus & blur me"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<Variant title="Events - click:label">
			<origam-checkbox
					v-model="emitClickLabelModel"
					label="Click the label"
					@click:label="logEvent('click:label', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-checkbox v-model="slotDefaultModel">
				<span>Custom slot content</span>
			</origam-checkbox>
		</Variant>

		<Variant title="Slots - Label">
			<origam-checkbox v-model="slotLabelModel">
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">
						I agree to the <strong>terms of service</strong>
					</span>
				</template>
			</origam-checkbox>
			<div>value = {{ slotLabelModel }}</div>
		</Variant>

		<Variant title="Slots - Input">
			<origam-checkbox v-model="slotInputModel" label="Custom input">
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
			<div>value = {{ slotInputModel }}</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ICheckboxProps>({ label: 'Accept terms', color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-checkbox
						v-model="playgroundModel"
						v-bind="state"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
				<div>value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.label"  title="Label"/>
					<HstText   v-model="state.hint"   title="Hint"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled"      title="Disabled"/>
					<HstCheckbox v-model="state.readonly"      title="Readonly"/>
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstCheckbox v-model="state.error"         title="Error"/>
					<HstCheckbox v-model="state.inline"        title="Inline"/>
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

	import { OrigamCheckbox, OrigamIcon } from '@origam/components'
	import type {
		IActiveProps,
		ICheckboxProps,
		IColorProps,
		IHoverProps
	} from '@origam/interfaces'

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
		ICON_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const designModel         = ref(false)
	const stateModel          = ref(false)
	const functionalModel     = ref(false)
	const emitModel           = ref(false)
	const emitFocusModel      = ref(false)
	const emitClickLabelModel = ref(false)
	const slotDefaultModel    = ref(false)
	const slotLabelModel      = ref(false)
	const slotInputModel      = ref(false)
	const playgroundModel     = ref(false)
</script>

<docs lang="md" src="@docs/components/Checkbox/OrigamCheckbox.md"/>
