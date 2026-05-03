<template>
	<Story
			group="components"
			title="Form/OrigamForm"
	>

		<!-- ════════════ BASIC WIRING ════════════ -->
		<Variant title="Basic wiring (TextField + NumberField)">
			<origam-form v-model="basicValid" data-cy="form-basic" @submit.prevent="handleBasicSubmit">
				<origam-text-field
						v-model="basicName"
						label="Full name"
						:rules="[nameRule]"
						data-cy="form-basic-name"
				/>
				<origam-number-field
						v-model="basicAge"
						label="Age"
						:min="0"
						:max="150"
						:rules="[ageRule]"
						data-cy="form-basic-age"
				/>
				<origam-btn type="submit" color="primary" text="Submit" data-cy="form-basic-submit"/>
			</origam-form>
			<div data-cy="form-basic-valid-status">isValid = {{ basicValid }}</div>
			<div data-cy="form-basic-submit-status">submitted = {{ basicSubmitted }}</div>
		</Variant>

		<!-- ════════════ VALIDATE ON ════════════ -->
		<Variant
				title="Validate on"
				:init-state="() => useStoryInitState<{ validateOn: TValidateOn }>({ validateOn: 'blur' })"
		>
			<template #default="{ state }">
				<origam-form :validate-on="state.validateOn" data-cy="form-validateon">
					<origam-text-field
							v-model="validateOnModel"
							label="Required field"
							:rules="[v => !!v || 'Required']"
							data-cy="form-validateon-field"
					/>
				</origam-form>
				<div data-cy="form-validateon-status">value = {{ validateOnModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.validateOn" title="validateOn" :options="validateOnList"/>
			</template>
		</Variant>

		<!-- ════════════ DISABLED ════════════ -->
		<Variant
				title="Disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<origam-form :disabled="state.disabled" data-cy="form-disabled">
					<origam-text-field label="Name" model-value="Locked" data-cy="form-disabled-field"/>
					<origam-number-field label="Count" :model-value="5" data-cy="form-disabled-number"/>
				</origam-form>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ════════════ READONLY ════════════ -->
		<Variant
				title="Readonly"
				:init-state="() => useStoryInitState<{ readonly: boolean }>({ readonly: true })"
		>
			<template #default="{ state }">
				<origam-form :readonly="state.readonly" data-cy="form-readonly">
					<origam-text-field label="Name" model-value="Read only" data-cy="form-readonly-field"/>
				</origam-form>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ FAST FAIL ════════════ -->
		<Variant
				title="Fast fail"
				:init-state="() => useStoryInitState<{ fastFail: boolean }>({ fastFail: true })"
		>
			<template #default="{ state }">
				<origam-form :fast-fail="state.fastFail" data-cy="form-fastfail" @submit.prevent>
					<origam-text-field
							v-model="fastFailF1"
							label="Field 1"
							:rules="[v => !!v || 'Required']"
							data-cy="form-fastfail-f1"
					/>
					<origam-text-field
							v-model="fastFailF2"
							label="Field 2"
							:rules="[v => !!v || 'Required']"
							data-cy="form-fastfail-f2"
					/>
					<origam-btn type="submit" text="Validate" data-cy="form-fastfail-submit"/>
				</origam-form>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fastFail" title="fastFail"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: actions ════════════ -->
		<Variant title="Slot — actions">
			<origam-form data-cy="form-slot-actions">
				<origam-text-field v-model="actionsName" label="Name" data-cy="form-actions-field"/>
				<template #actions="{ submit, reset }">
					<div style="display: flex; gap: 8px; margin-top: 12px;">
						<origam-btn
								text="Submit"
								color="primary"
								data-cy="form-actions-submit"
								@click="submit"
						/>
						<origam-btn
								text="Reset"
								variant="outlined"
								data-cy="form-actions-reset"
								@click="reset"
						/>
					</div>
				</template>
			</origam-form>
		</Variant>

		<!-- ════════════ EMIT: submit ════════════ -->
		<Variant title="Emit — submit">
			<origam-form data-cy="form-emit-submit" @submit.prevent="logEvent('submit', $event)">
				<origam-text-field v-model="emitSubmitName" label="Name" data-cy="form-emit-field"/>
				<origam-btn type="submit" text="Submit" color="primary" data-cy="form-emit-submit-btn"/>
			</origam-form>
		</Variant>

		<!-- ════════════ EMIT: reset ════════════ -->
		<Variant title="Emit — reset">
			<origam-form data-cy="form-emit-reset" @reset="logEvent('reset', $event)">
				<origam-text-field v-model="emitResetName" label="Name" data-cy="form-emit-reset-field"/>
				<origam-btn type="reset" text="Reset" variant="outlined" data-cy="form-emit-reset-btn"/>
			</origam-form>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IFormProps>({
					disabled: false,
					readonly: false,
					fastFail: false,
					validateOn: 'input',
				})"
		>
			<template #default="{ state }">
				<origam-form v-bind="state" data-cy="form-playground" @submit.prevent>
					<origam-text-field
							v-model="playgroundName"
							label="Name"
							:rules="[v => !!v || 'Name is required']"
							data-cy="form-playground-name"
					/>
					<origam-number-field
							v-model="playgroundAge"
							label="Age"
							:min="0"
							:max="150"
							data-cy="form-playground-age"
					/>
					<origam-btn type="submit" text="Submit" color="primary" data-cy="form-playground-submit"/>
				</origam-form>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.fastFail"  title="fastFail"/>
				<HstSelect   v-model="state.validateOn" title="validateOn" :options="validateOnList"/>
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

	import { OrigamBtn, OrigamForm, OrigamNumberField, OrigamTextField } from '@origam/components'
	import type { IFormProps, IOptions } from '@origam/interfaces'
	import type { TValidateOn } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	// Basic wiring
	const basicValid     = ref<boolean | null>(null)
	const basicName      = ref('')
	const basicAge       = ref<number | null>(null)
	const basicSubmitted = ref(false)
	const nameRule = (v: string) => !!v || 'Name is required'
	const ageRule  = (v: number | null) => (v !== null && v >= 0) || 'Age must be ≥ 0'
	const handleBasicSubmit = () => { basicSubmitted.value = true }

	// Validate on
	const validateOnModel = ref('')

	// Disabled / readonly
	// Fast fail
	const fastFailF1 = ref('')
	const fastFailF2 = ref('')

	// Actions slot
	const actionsName = ref('')

	// Emits
	const emitSubmitName = ref('')
	const emitResetName  = ref('')

	// Playground
	const playgroundName = ref('')
	const playgroundAge  = ref<number | null>(null)

	const validateOnList: Array<IOptions<TValidateOn>> = [
		{ label: 'input',  value: 'input'  },
		{ label: 'blur',   value: 'blur'   },
		{ label: 'submit', value: 'submit' },
		{ label: 'lazy',   value: 'lazy'   },
	]
</script>

<docs lang="md" src="@docs/components/Form/OrigamForm.md"/>
