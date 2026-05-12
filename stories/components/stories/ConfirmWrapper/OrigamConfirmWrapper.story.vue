<template>
	<Story
			group="components"
			title="ConfirmWrapper/OrigamConfirmWrapper"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IConfirmWrapperProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IConfirmWrapperProps>({
					label: 'Value',
					direction: 'vertical',
					disabled: false,
					readonly: false,
					error: false
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 500px;" data-cy="confirm-wrapper-playground">
					<origam-confirm-wrapper
							v-model="playgroundValue"
							v-model:confirm="playgroundConfirm"
							v-bind="state"
							field="text-field"
							:defaults="{ label: state.label }"
							data-cy="confirm-wrapper-playground-input"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"     title="label"/>
				<HstSelect   v-model="state.direction" title="direction" :options="[
					{ label: 'vertical', value: 'vertical' },
					{ label: 'horizontal', value: 'horizontal' }
				]"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.error"     title="error"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — field (shorthand)">
			<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-default">
				<origam-confirm-wrapper
						v-model="defaultValue"
						v-model:confirm="defaultConfirm"
						field="text-field"
						:defaults="{ label: 'Email' }"
						data-cy="confirm-wrapper-default-input"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — direction"
				:init-state="() => useStoryInitState<{ direction: string }>({ direction: 'vertical' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 600px;" data-cy="confirm-wrapper-direction">
					<origam-confirm-wrapper
							v-model="directionValue"
							v-model:confirm="directionConfirm"
							:direction="state.direction as any"
							field="text-field"
							:defaults="{ label: 'Email' }"
							data-cy="confirm-wrapper-direction-input"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.direction"
						title="direction"
						:options="[
							{ label: 'vertical', value: 'vertical' },
							{ label: 'horizontal', value: 'horizontal' }
						]"
				/>
			</template>
		</Variant>

		<Variant title="Prop — label & prependIcon">
			<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-label">
				<origam-confirm-wrapper
						v-model="labelValue"
						v-model:confirm="labelConfirm"
						label="New password"
						prepend-icon="mdi-lock"
						field="text-field"
						:defaults="{ label: 'Password', type: 'password' }"
						data-cy="confirm-wrapper-label-input"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & error"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					readonly?: boolean
					error?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-states">
					<origam-confirm-wrapper
							v-model="statesValue"
							v-model:confirm="statesConfirm"
							v-bind="state"
							field="text-field"
							:defaults="{ label: 'Email' }"
							data-cy="confirm-wrapper-states-input"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<Variant title="Prop — confirm (mismatch validation)">
			<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-validation">
				<origam-confirm-wrapper
						v-model="validValue"
						v-model:confirm="validConfirm"
						field="text-field"
						:defaults="{ label: 'Password', type: 'password' }"
						data-cy="confirm-wrapper-validation-input"
				/>
				<p style="font-size: 0.75rem; margin-top: 8px;" data-cy="confirm-wrapper-validation-status">
					primary={{ validValue }} | confirm={{ validConfirm }}
				</p>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — header">
			<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-slot-header">
				<origam-confirm-wrapper
						v-model="slotValue"
						v-model:confirm="slotConfirm"
						field="text-field"
						:defaults="{ label: 'Email' }"
						data-cy="confirm-wrapper-slot-header-input"
				>
					<template #header>
						<div style="padding-bottom: 8px; font-weight: 700;">Custom header slot</div>
					</template>
				</origam-confirm-wrapper>
			</div>
		</Variant>

		<Variant title="Slot — default & confirm">
			<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-slot-custom">
				<origam-confirm-wrapper
						v-model="customValue"
						v-model:confirm="customConfirm"
						data-cy="confirm-wrapper-slot-custom-input"
				>
					<origam-text-field v-model="customValue" label="Custom input" data-cy="confirm-wrapper-custom-field"/>
					<template #confirm>
						<origam-text-field v-model="customConfirm" label="Confirm custom input" data-cy="confirm-wrapper-confirm-field"/>
					</template>
				</origam-confirm-wrapper>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue & update:confirm"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;" data-cy="confirm-wrapper-emit">
					<origam-confirm-wrapper
							v-model="emitValue"
							v-model:confirm="emitConfirm"
							field="text-field"
							:defaults="{ label: 'Email' }"
							data-cy="confirm-wrapper-emit-input"
							@update:model-value="(v: any) => { state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 5) }"
							@update:confirm="(v: any) => { state.log = [`update:confirm → ${v}`, ...state.log].slice(0, 5) }"
					/>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Type to fire events.</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamConfirmWrapper, OrigamTextField } from '@origam/components'
	import type { IConfirmWrapperProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultValue = ref('')
	const defaultConfirm = ref('')

	const directionValue = ref('')
	const directionConfirm = ref('')

	const labelValue = ref('')
	const labelConfirm = ref('')

	const statesValue = ref('')
	const statesConfirm = ref('')

	const validValue = ref('')
	const validConfirm = ref('')

	const slotValue = ref('')
	const slotConfirm = ref('')

	const customValue = ref('')
	const customConfirm = ref('')

	const emitValue = ref('')
	const emitConfirm = ref('')

	const playgroundValue = ref('')
	const playgroundConfirm = ref('')
</script>

<docs lang="md" src="@docs/components/ConfirmWrapper/OrigamConfirmWrapper.md"/>
