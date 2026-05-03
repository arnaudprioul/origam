<template>
	<Story
			group="components"
			title="PasswordField/OrigamPasswordField"
	>

		<!-- ════════════ SHOW / HIDE ICONS ════════════ -->
		<Variant
				title="Show / hide icons"
				:init-state="() => useStoryInitState<{ onIcon?: TIcon, offIcon?: TIcon }>({ onIcon: MDI_ICONS.EYE, offIcon: MDI_ICONS.EYE_OFF })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="iconsModel"
						:on-icon="state.onIcon"
						:off-icon="state.offIcon"
						label="Password"
						data-cy="passwordfield-icons"
				/>
				<div data-cy="passwordfield-icons-status">value = {{ iconsModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.onIcon"  title="onIcon"  :options="iconList"/>
				<HstSelect v-model="state.offIcon" title="offIcon" :options="iconList"/>
			</template>
		</Variant>

		<!-- ════════════ REQUIREMENTS ════════════ -->
		<Variant
				title="Strength requirements"
				:init-state="() => useStoryInitState<{
					requirements: boolean
					minLength: number
					needTiny: boolean
					needUppercase: boolean
					needNumber: boolean
					needSpecial: boolean
				}>({ requirements: true, minLength: 8, needTiny: true, needUppercase: true, needNumber: true, needSpecial: false })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="requirementsModel"
						:requirements="state.requirements"
						:min-length="state.minLength"
						:need-tiny="state.needTiny"
						:need-uppercase="state.needUppercase"
						:need-number="state.needNumber"
						:need-special="state.needSpecial"
						label="New password"
						data-cy="passwordfield-requirements"
				/>
				<div data-cy="passwordfield-requirements-status">value = {{ requirementsModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.requirements"  title="requirements"/>
				<HstSlider   v-model="state.minLength"     title="minLength" :min="4" :max="32"/>
				<HstCheckbox v-model="state.needTiny"      title="needTiny"/>
				<HstCheckbox v-model="state.needUppercase" title="needUppercase"/>
				<HstCheckbox v-model="state.needNumber"    title="needNumber"/>
				<HstCheckbox v-model="state.needSpecial"   title="needSpecial"/>
			</template>
		</Variant>

		<!-- ════════════ PERSISTENT REQUIREMENTS ════════════ -->
		<Variant
				title="Persistent requirements"
				:init-state="() => useStoryInitState<{ persistentRequirements: boolean }>({ persistentRequirements: true })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="persistentModel"
						requirements
						:persistent-requirements="state.persistentRequirements"
						need-uppercase
						need-number
						label="Always visible requirements"
						data-cy="passwordfield-persistent"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.persistentRequirements" title="persistentRequirements"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Password too weak'] : []"
						label="Stateful password"
						data-cy="passwordfield-states"
				/>
				<div data-cy="passwordfield-states-status">value = {{ statesModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-password-field
					v-model="emitModel"
					label="Type password"
					data-cy="passwordfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="passwordfield-emit-status">value = {{ emitModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-password-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="passwordfield-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IPasswordFieldProps>({
					label: 'Password',
					color: 'primary',
					density: undefined,
					requirements: false,
					minLength: 8,
					needTiny: false,
					needUppercase: false,
					needNumber: false,
					needSpecial: false,
					persistentRequirements: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="passwordfield-playground"
				/>
				<div data-cy="passwordfield-playground-status">value = {{ playgroundModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"                  title="label"/>
				<HstSelect   v-model="state.color"                  title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"                title="density" :options="densityList"/>
				<HstCheckbox v-model="state.requirements"           title="requirements"/>
				<HstSlider   v-model="state.minLength"              title="minLength" :min="4" :max="32"/>
				<HstCheckbox v-model="state.needTiny"               title="needTiny"/>
				<HstCheckbox v-model="state.needUppercase"          title="needUppercase"/>
				<HstCheckbox v-model="state.needNumber"             title="needNumber"/>
				<HstCheckbox v-model="state.needSpecial"            title="needSpecial"/>
				<HstCheckbox v-model="state.persistentRequirements" title="persistentRequirements"/>
				<HstCheckbox v-model="state.disabled"               title="disabled"/>
				<HstCheckbox v-model="state.readonly"               title="readonly"/>
				<HstCheckbox v-model="state.error"                  title="error"/>
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

	import { OrigamPasswordField } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IPasswordFieldProps } from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'

	const iconsModel       = ref('')
	const requirementsModel = ref('')
	const persistentModel  = ref('')
	const statesModel      = ref('')
	const emitModel        = ref('')
	const emitFocusModel   = ref('')
	const playgroundModel  = ref('')
</script>

<docs lang="md" src="@docs/components/PasswordField/OrigamPasswordField.md"/>
