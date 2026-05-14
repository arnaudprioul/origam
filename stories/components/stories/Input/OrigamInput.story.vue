<template>
	<Story
			group="components"
			title="Input/OrigamInput"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IInputProps>({
					label: 'Input',
					color: 'primary',
					density: undefined,
					hint: '',
					persistentHint: false,
					hideDetails: false,
					prependIcon: undefined,
					appendIcon: undefined,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-input
						v-model="playgroundModel"
						v-bind="state"
						data-cy="input-playground"
				>
					<template #default="{ id, isDisabled, isReadonly }">
						<input :id="id" v-model="playgroundModel" :disabled="isDisabled" :readonly="isReadonly" style="border: none; outline: none; background: transparent; width: 100%;"/>
					</template>
				</origam-input>
				<div data-cy="input-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
				<HstText     v-model="state.hint"          title="hint"/>
				<HstCheckbox v-model="state.persistentHint" title="persistentHint"/>
				<HstSelect   v-model="state.prependIcon"   title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"    title="appendIcon"  :options="iconList"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
				<HstCheckbox v-model="state.error"         title="error"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-input
						v-model="colorModel"
						:color="state.color"
						label="Colored input"
						data-cy="input-color"
				>
					<template #default="{ id, isDisabled, isReadonly }">
						<input
								:id="id"
								v-model="colorModel"
								:disabled="isDisabled"
								:readonly="isReadonly"
								style="border: none; outline: none; background: transparent; width: 100%;"
						/>
					</template>
				</origam-input>
				<div data-cy="input-color-status">value = {{ colorModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-input
						v-model="densityModel"
						:density="state.density"
						label="Density input"
						data-cy="input-density"
				>
					<template #default="{ id, isDisabled }">
						<input :id="id" v-model="densityModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
					</template>
				</origam-input>
				<div data-cy="input-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hint & persistentHint"
				:init-state="() => useStoryInitState<{ hint: string, persistentHint: boolean }>({ hint: 'Helper text here', persistentHint: true })"
		>
			<template #default="{ state }">
				<origam-input
						v-model="hintModel"
						:hint="state.hint"
						:persistent-hint="state.persistentHint"
						label="With hint"
						data-cy="input-hint"
				>
					<template #default="{ id, isDisabled }">
						<input :id="id" v-model="hintModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
					</template>
				</origam-input>
				<div data-cy="input-hint-status">value = {{ hintModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.hint"          title="hint"/>
				<HstCheckbox v-model="state.persistentHint" title="persistentHint"/>
			</template>
		</Variant>

		<Variant
				title="Prop — prependIcon & appendIcon"
				:init-state="() => useStoryInitState<{ prependIcon?: TIcon, appendIcon?: TIcon }>({ prependIcon: MDI_ICONS.ACCOUNT, appendIcon: MDI_ICONS.STAR })"
		>
			<template #default="{ state }">
				<origam-input
						v-model="adjacentModel"
						:prepend-icon="state.prependIcon"
						:append-icon="state.appendIcon"
						label="With icons"
						data-cy="input-adjacent"
				>
					<template #default="{ id, isDisabled }">
						<input :id="id" v-model="adjacentModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
					</template>
				</origam-input>
				<div data-cy="input-adjacent-status">value = {{ adjacentModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & error"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-input
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Invalid value'] : []"
						label="Stateful input"
						data-cy="input-states"
				>
					<template #default="{ id, isDisabled, isReadonly }">
						<input :id="id" v-model="statesModel" :disabled="isDisabled" :readonly="isReadonly" style="border: none; outline: none; background: transparent; width: 100%;"/>
					</template>
				</origam-input>
				<div data-cy="input-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — prepend">
			<origam-input v-model="slotPrependModel" label="With prepend slot" data-cy="input-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART" style="color: var(--origam-color__feedback--danger---bg);"/>
				</template>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotPrependModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
			<div data-cy="input-slot-prepend-status">value = {{ slotPrependModel }}</div>
		</Variant>

		<Variant title="Slot — messages">
			<origam-input
					v-model="slotMsgModel"
					label="Custom messages"
					hint="Custom hint"
					persistent-hint
					data-cy="input-slot-messages"
			>
				<template #messages="{ messages }">
					<em style="color: var(--origam-color__feedback--info---bg);">{{ messages.join(', ') }}</em>
				</template>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotMsgModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>

		<Variant title="Slot — append">
			<origam-input v-model="slotAppendModel" label="With append slot" data-cy="input-slot-append">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotAppendModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>

		<Variant title="Slot — default">
			<origam-input v-model="slotDefaultModel" label="Custom default slot" data-cy="input-slot-default">
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotDefaultModel" :disabled="isDisabled" placeholder="Custom slot content" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>

		<Variant title="Slot — details">
			<origam-input v-model="slotDetailsModel" label="With details slot" data-cy="input-slot-details">
				<template #details>
					<span style="font-size: 0.75rem; color: var(--origam-color__text---secondary);">Custom slot content</span>
				</template>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotDetailsModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>

		<Variant title="Slot — message">
			<origam-input
					v-model="slotMessageModel"
					label="With message slot"
					:error-messages="['Validation error']"
					error
					data-cy="input-slot-message"
			>
				<template #message="{ message }">
					<em style="color: var(--origam-color__feedback--danger---bg);">{{ message }}</em>
				</template>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="slotMessageModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-input
					v-model="emitModel"
					label="Type here"
					data-cy="input-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="emitModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;" @input="(e) => emitModel = (e.target as HTMLInputElement).value"/>
				</template>
			</origam-input>
			<div data-cy="input-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — click:prepend & click:append">
			<origam-input
					v-model="emitClickModel"
					label="Click icons"
					:prepend-icon="MDI_ICONS.ACCOUNT"
					:append-icon="MDI_ICONS.STAR"
					data-cy="input-emit-click"
					@click:prepend="logEvent('click:prepend', $event)"
					@click:append="logEvent('click:append', $event)"
			>
				<template #default="{ id, isDisabled }">
					<input :id="id" v-model="emitClickModel" :disabled="isDisabled" style="border: none; outline: none; background: transparent; width: 100%;"/>
				</template>
			</origam-input>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamInput } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IInputProps } from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'

	const colorModel        = ref('')
	const densityModel      = ref('')
	const hintModel         = ref('')
	const adjacentModel     = ref('')
	const statesModel       = ref('')
	const slotPrependModel  = ref('')
	const slotMsgModel      = ref('')
	const slotAppendModel   = ref('')
	const slotDefaultModel  = ref('')
	const slotDetailsModel  = ref('')
	const slotMessageModel  = ref('')
	const emitModel         = ref('')
	const emitClickModel    = ref('')
	const playgroundModel   = ref('')
</script>

<docs lang="md" src="@docs/components/Input/OrigamInput.md"/>
