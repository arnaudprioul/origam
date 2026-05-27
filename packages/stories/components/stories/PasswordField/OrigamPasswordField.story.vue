<template>
	<Story
			group="components"
			title="PasswordField/OrigamPasswordField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Default"
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

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="variantModel"
						:variant="state.variant"
						label="Variant"
						data-cy="passwordfield-variant"
				/>
				<div data-cy="passwordfield-variant-status">value = {{ variantModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-password-field
							v-model="colorModel"
							v-bind="state"
							label="Colored password (interactive)"
							data-cy="passwordfield-color"
					/>
					<div data-cy="passwordfield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-password-field :model-value="'secret123'"
						                       color="primary"
						                       label='color="primary" only'
						                       data-cy="passwordfield-color-fixture-color-only"/>
						<origam-password-field :model-value="'secret123'"
						                       bg-color="success"
						                       label='bg-color="success" only'
						                       data-cy="passwordfield-color-fixture-bg-only"/>
						<origam-password-field :model-value="'secret123'"
						                       color="warning" bg-color="primary"
						                       label='color="warning" + bg-color="primary"'
						                       data-cy="passwordfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-password-field
							v-model="colorModel"
							v-bind="state"
							label="Colored password (interactive)"
							data-cy="passwordfield-color"
					/>
					<div data-cy="passwordfield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-password-field :model-value="'secret123'"
						                       color="primary"
						                       label='color="primary" only'
						                       data-cy="passwordfield-color-fixture-color-only"/>
						<origam-password-field :model-value="'secret123'"
						                       bg-color="success"
						                       label='bg-color="success" only'
						                       data-cy="passwordfield-color-fixture-bg-only"/>
						<origam-password-field :model-value="'secret123'"
						                       color="warning" bg-color="primary"
						                       label='color="warning" + bg-color="primary"'
						                       data-cy="passwordfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-password-field
							v-model="colorModel"
							v-bind="state"
							label="Colored password (interactive)"
							data-cy="passwordfield-color"
					/>
					<div data-cy="passwordfield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-password-field :model-value="'secret123'"
						                       color="primary"
						                       label='color="primary" only'
						                       data-cy="passwordfield-color-fixture-color-only"/>
						<origam-password-field :model-value="'secret123'"
						                       bg-color="success"
						                       label='bg-color="success" only'
						                       data-cy="passwordfield-color-fixture-bg-only"/>
						<origam-password-field :model-value="'secret123'"
						                       color="warning" bg-color="primary"
						                       label='color="warning" + bg-color="primary"'
						                       data-cy="passwordfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-password-field
						v-model="densityModel"
						:density="state.density"
						label="Density password"
						data-cy="passwordfield-density"
				/>
				<div data-cy="passwordfield-density-status">value = {{ densityModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — onIcon & offIcon"
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

		<Variant
				title="Prop — requirements"
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

		<Variant
				title="Prop — persistentRequirements"
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

		<Variant
				title="Prop — disabled, readonly & error"
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

		<Variant title="Prop — strengthBar">
			<origam-password-field
					v-model="strengthBarModel"
					strength-bar
					label="Password (strength bar)"
					data-cy="password-field-strength-bar"
					@update:strength="logEvent('update:strength', $event)"
			/>
			<div data-cy="password-field-strength-bar-status">value = {{ strengthBarModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<Variant title="Prop — requirementsLayout (list)">
			<origam-password-field
					v-model="requirementsListModel"
					:requirements="true"
					requirements-layout="list"
					label="Password (requirements list)"
					data-cy="password-field-requirements-list"
			/>
			<div data-cy="password-field-requirements-list-status">value = {{ requirementsListModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<Variant title="Prop — requirementsLayout (tiles)">
			<origam-password-field
					v-model="requirementsTilesModel"
					:requirements="true"
					requirements-layout="tiles"
					label="Password (requirements tiles)"
					data-cy="password-field-requirements-tiles"
			/>
			<div data-cy="password-field-requirements-tiles-status">value = {{ requirementsTilesModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<Variant title="Prop — minimal">
			<origam-password-field
					v-model="minimalModel"
					minimal
					label="Confirm password"
					data-cy="password-field-minimal"
			/>
			<div data-cy="password-field-minimal-status">value = {{ minimalModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-password-field label="Password" data-cy="passwordfield-slot-append">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-password-field label="Password" data-cy="passwordfield-slot-append-inner">
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — clear">
			<origam-password-field label="Password" model-value="secret" clearable data-cy="passwordfield-slot-clear">
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE"/>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — counter">
			<origam-password-field label="Password" counter data-cy="passwordfield-slot-counter">
				<template #counter>
					<span>Custom counter</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-password-field label="Password" data-cy="passwordfield-slot-default">
				<span>Custom slot content</span>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-password-field label="Password" data-cy="passwordfield-slot-details">
				<template #details>
					<span>Custom details</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — field">
			<origam-password-field label="Password" data-cy="passwordfield-slot-field">
				<template #field>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-password-field label="Password" data-cy="passwordfield-slot-floating-label">
				<template #floatingLabel>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — info">
			<origam-password-field label="Password" data-cy="passwordfield-slot-info">
				<template #info>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-password-field label="Password" data-cy="passwordfield-slot-label">
				<template #label>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-password-field label="Password" loading data-cy="passwordfield-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — message">
			<origam-password-field label="Password" :error-messages="['Error message']" data-cy="passwordfield-slot-message">
				<template #message="{ message }">
					<span>{{ message }}</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — messages">
			<origam-password-field label="Password" :error-messages="['Error A', 'Error B']" data-cy="passwordfield-slot-messages">
				<template #messages="{ messages }">
					<span v-for="(m, i) in messages" :key="i">{{ m }}</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-password-field label="Password" data-cy="passwordfield-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-password-field label="Password" data-cy="passwordfield-slot-prepend-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-password-field label="Password" data-cy="passwordfield-slot-prefix">
				<template #prefix>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-password-field label="Password" data-cy="passwordfield-slot-suffix">
				<template #suffix>
					<span>Custom slot content</span>
				</template>
			</origam-password-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:control">
			<origam-password-field
					label="Click the field"
					data-cy="passwordfield-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — mousedown:control">
			<origam-password-field
					label="Mousedown the field"
					data-cy="passwordfield-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-password-field
					v-model="emitModel"
					label="Type password"
					data-cy="passwordfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="passwordfield-emit-status">value = {{ emitModel ? '(set)' : '(empty)' }}</div>
		</Variant>

		<Variant title="Emit — focus & blur">
			<origam-password-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="passwordfield-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamPasswordField } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IPasswordFieldProps } from '@origam/interfaces'
	import type { TIcon, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, iconList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	const variantModel     = ref('')
	const colorModel       = ref('')
	const densityModel     = ref('')
	const iconsModel       = ref('')
	const requirementsModel = ref('')
	const persistentModel  = ref('')
	const statesModel      = ref('')
	const emitModel        = ref('')
	const emitFocusModel   = ref('')
	const playgroundModel  = ref('')

	// Display mode refs — one per Variant for isolation.
	const strengthBarModel       = ref('')
	const requirementsListModel  = ref('')
	const requirementsTilesModel = ref('')
	// Pre-seed with a partial value (has length, mixed case, digit → some rules satisfied).
	const minimalModel           = ref('')
</script>

<docs lang="md" src="@docs/components/PasswordField/OrigamPasswordField.md"/>
