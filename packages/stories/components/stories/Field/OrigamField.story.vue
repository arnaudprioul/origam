<template>
	<Story
			group="components"
			title="Field/OrigamField"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IFieldProps>>({ label: 'Field label', color: 'primary', variant: undefined })"
		>
			<template #default="{ state }">
				<origam-field
						:variant="state.variant"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:flat="state.flat"
						:prefix="state.prefix"
						:suffix="state.suffix"
						:label="state.label"
						:font-size="state.fontSize"
						:prepend-inner-icon="state.prependInnerIcon || undefined"
						:append-inner-icon="state.appendInnerIcon || undefined"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Variant">
					<HstSelect v-model="state.variant" title="Variant" :options="VARIANT_INPUT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize" title="Label Font Size" :options="FONT_SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstCheckbox v-model="state.flat"      title="Flat"/>
				</StoryGroup>
				<StoryGroup title="Text Affixes">
					<HstText v-model="state.prefix" title="Prefix"/>
					<HstText v-model="state.suffix" title="Suffix"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prependInnerIcon" title="Prepend Inner Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendInnerIcon"  title="Append Inner Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="State"
				:init-state="() => useStoryInitState<Partial<IFieldProps>>({ color: 'primary', label: 'Field label' })"
		>
			<template #default="{ state }">
				<origam-field
						:color="state.color"
						:active="resolveActiveState(state.active)"
						:focused="state.focused"
						:label="state.label"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect   v-model="state.active"  title="Active"  :options="ACTIVE_OPTIONS"/>
					<HstCheckbox v-model="state.focused" title="Focused"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IFieldProps>>({ label: 'Field label', disabled: false, error: false, dirty: false, singleLine: false, inline: false, reverse: false, required: false, persistentClear: false, clearable: false })"
		>
			<template #default="{ state }">
				<origam-field
						:label="state.label"
						:disabled="state.disabled"
						:error="state.error"
						:dirty="state.dirty"
						:single-line="state.singleLine"
						:inline="state.inline"
						:reverse="state.reverse"
						:required="state.required"
						:persistent-clear="state.persistentClear"
						:clearable="state.clearable"
						:clear-icon="state.clearIcon || undefined"
						:loading="state.loading"
						:center-affix="state.centerAffix"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" value="Some value" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled"  title="Disabled"/>
					<HstCheckbox v-model="state.error"     title="Error (boolean)"/>
					<HstCheckbox v-model="state.dirty"     title="Dirty"/>
					<HstCheckbox v-model="state.required"  title="Required"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.singleLine"   title="Single Line"/>
					<HstCheckbox v-model="state.inline"       title="Inline"/>
					<HstCheckbox v-model="state.reverse"      title="Reverse"/>
					<HstCheckbox v-model="state.centerAffix"  title="Center Affix"/>
				</StoryGroup>
				<StoryGroup title="Loading">
					<HstCheckbox v-model="state.loading" title="Loading"/>
				</StoryGroup>
				<StoryGroup title="Clear">
					<HstCheckbox v-model="state.persistentClear" title="Persistent Clear"/>
					<HstCheckbox v-model="state.clearable"       title="Clearable"/>
					<HstSelect   v-model="state.clearIcon"       title="Clear Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - focus">
			<origam-field
					label="Focus & blur events"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Events - click:clear">
			<origam-field
					label="Clearable field"
					:persistent-clear="true"
					@click:clear="logEvent('click:clear', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" value="some value" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Events - click:appendInner">
			<origam-field
					label="Append inner click"
					:append-inner-icon="appendInnerIcon"
					@click:append-inner="logEvent('click:appendInner', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Events - click:prependInner">
			<origam-field
					label="Prepend inner click"
					:prepend-inner-icon="prependInnerIcon"
					@click:prepend-inner="logEvent('click:prependInner', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Default">
			<origam-field label="Default slot">
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" placeholder="Custom slot content" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Label">
			<origam-field>
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">Custom label</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - FloatingLabel">
			<origam-field label="Floating label slot">
				<template #floatingLabel>
					<span style="font-style: italic;">Custom floating label</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Prefix">
			<origam-field label="Prefix slot">
				<template #prefix>
					<span>$</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Suffix">
			<origam-field label="Suffix slot">
				<template #suffix>
					<span>kg</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - PrependInner">
			<origam-field label="Prepend inner slot">
				<template #prependInner>
					<origam-icon :icon="prependInnerIcon"/>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - AppendInner">
			<origam-field label="Append inner slot">
				<template #appendInner>
					<origam-icon :icon="appendInnerIcon"/>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Clear">
			<origam-field label="Clear slot" :persistent-clear="true">
				<template #clear>
					<origam-icon :icon="clearIcon"/>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" value="some value" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant title="Slots - Loader">
			<origam-field label="Loader slot" loading>
				<template #loader>
					<span>Loading…</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IFieldProps>({ label: 'Field label', color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-field
						v-bind="state"
						@focus="logEvent('focus', $event)"
						@blur="logEvent('blur', $event)"
						@click:clear="logEvent('click:clear', $event)"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.label"  title="Label"/>
					<HstText   v-model="state.prefix" title="Prefix"/>
					<HstText   v-model="state.suffix" title="Suffix"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.variant"   title="Variant"   :options="VARIANT_INPUT_OPTIONS"/>
					<HstSelect   v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.size"      title="Size"      :options="SIZE_OPTIONS"/>
					<HstSelect   v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstCheckbox v-model="state.flat"      title="Flat"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled"       title="Disabled"/>
					<HstCheckbox v-model="state.error"          title="Error"/>
					<HstCheckbox v-model="state.dirty"          title="Dirty"/>
					<HstCheckbox v-model="state.required"       title="Required"/>
					<HstCheckbox v-model="state.singleLine"     title="Single Line"/>
					<HstCheckbox v-model="state.loading"        title="Loading"/>
					<HstCheckbox v-model="state.persistentClear" title="Persistent Clear"/>
					<HstCheckbox v-model="state.clearable"      title="Clearable"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamField, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IFieldProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		FONT_SIZE_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		SIZE_OPTIONS,
		VARIANT_INPUT_OPTIONS
	} from '@stories/const'

	const prependInnerIcon = MDI_ICONS.MAGNIFY
	const appendInnerIcon = MDI_ICONS.INFORMATION_OUTLINE
	const clearIcon = MDI_ICONS.CLOSE_CIRCLE
</script>

<docs lang="md" src="@docs/components/Field/OrigamField.md"/>
