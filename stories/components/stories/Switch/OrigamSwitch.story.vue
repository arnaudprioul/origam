<template>
	<Story
			group="components"
			title="Switch/OrigamSwitch"
	>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-switch
							v-model="colorModel"
							v-bind="state"
							label="Colored switch (interactive)"
							data-cy="switch-color"
					/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-switch :model-value="true" color="primary"
						               label='color="primary" only'
						               data-cy="switch-color-fixture-color-only"/>
						<origam-switch :model-value="true" bg-color="success"
						               label='bg-color="success" only'
						               data-cy="switch-color-fixture-bg-only"/>
						<origam-switch :model-value="true" color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="switch-color-fixture-combo"/>
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
					<origam-switch
							v-model="colorModel"
							v-bind="state"
							label="Colored switch (interactive)"
							data-cy="switch-color"
					/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-switch :model-value="true" color="primary"
						               label='color="primary" only'
						               data-cy="switch-color-fixture-color-only"/>
						<origam-switch :model-value="true" bg-color="success"
						               label='bg-color="success" only'
						               data-cy="switch-color-fixture-bg-only"/>
						<origam-switch :model-value="true" color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="switch-color-fixture-combo"/>
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
					<origam-switch
							v-model="colorModel"
							v-bind="state"
							label="Colored switch (interactive)"
							data-cy="switch-color"
					/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-switch :model-value="true" color="primary"
						               label='color="primary" only'
						               data-cy="switch-color-fixture-color-only"/>
						<origam-switch :model-value="true" bg-color="success"
						               label='bg-color="success" only'
						               data-cy="switch-color-fixture-bg-only"/>
						<origam-switch :model-value="true" color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="switch-color-fixture-combo"/>
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
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="densityModel"
						:density="state.density"
						label="Density switch"
						data-cy="switch-density"
				/>
				<div data-cy="switch-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Inset & flat"
				:init-state="() => useStoryInitState<{ inset: boolean, flat: boolean }>({ inset: false, flat: false })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="insetModel"
						:inset="state.inset"
						:flat="state.flat"
						label="Inset / flat switch"
						data-cy="switch-inset"
				/>
				<div data-cy="switch-inset-status">value = {{ insetModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inset" title="inset"/>
				<HstCheckbox v-model="state.flat"  title="flat"/>
			</template>
		</Variant>

		<Variant
				title="Indeterminate"
				:init-state="() => useStoryInitState<{ indeterminate: boolean }>({ indeterminate: true })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="indeterminateModel"
						:indeterminate="state.indeterminate"
						label="Indeterminate switch"
						data-cy="switch-indeterminate"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						label="Stateful switch"
						data-cy="switch-states"
				/>
				<div data-cy="switch-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — loader">
			<origam-switch :model-value="false" loading label="Loading switch" data-cy="switch-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-switch>
		</Variant>

		<Variant title="Slot — track.false">
			<origam-switch v-model="slotTrackModel" label="Custom track" data-cy="switch-slot-track-false">
				<template #track.false>
					<span style="font-size: 10px; color: #fff;">OFF</span>
				</template>
			</origam-switch>
		</Variant>

		<Variant title="Slot — track.true">
			<origam-switch v-model="slotTrackModel" label="Custom track" data-cy="switch-slot-track">
				<template #track.true>
					<span style="font-size: 10px; color: #fff;">ON</span>
				</template>
				<template #track.false>
					<span style="font-size: 10px; color: #fff;">OFF</span>
				</template>
			</origam-switch>
			<div data-cy="switch-slot-track-status">value = {{ slotTrackModel }}</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:label">
			<origam-switch
					v-model="emitClickLabelModel"
					label="Click the label"
					data-cy="switch-emit-click-label"
					@click:label="logEvent('click:label', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:focused">
			<origam-switch
					v-model="emitFocusedModel"
					label="Focus me"
					data-cy="switch-emit-focused"
					@update:focused="logEvent('update:focused', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:indeterminate">
			<origam-switch
					v-model="emitIndeterminateModel"
					:indeterminate="true"
					label="Indeterminate switch"
					data-cy="switch-emit-indeterminate"
					@update:indeterminate="logEvent('update:indeterminate', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-switch
					v-model="emitModel"
					label="Toggle me"
					data-cy="switch-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="switch-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — focus / blur">
			<origam-switch
					v-model="emitFocusModel"
					label="Focus & blur me"
					data-cy="switch-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<Variant
				title="Loading — interactive"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'bool',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-switch
							:model-value="false"
							disabled
							:loading="resolveSwitchLoading(state)"
							label="Demo switch"
							data-cy="switch-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeSwitchLoading(state) }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.enabled" title="enabled (loading)"/>
				<HstSelect
						v-model="state.kind"
						title="kind"
						:options="[
							{ label: 'true (default)', value: 'bool' },
							{ label: 'number', value: 'number' },
							{ label: '{ type: line }', value: 'line' },
							{ label: '{ type: circular }', value: 'circular' },
							{ label: '{ type: skeleton }', value: 'skeleton' }
						]"
				/>
				<HstNumber v-model="state.progress" title="progress (when kind=number)" :min="0" :max="100" :step="1"/>
				<HstNumber v-model="state.circularSize" title="circular size (when kind=circular)" :min="12" :max="64" :step="2"/>
			</template>
		</Variant>

		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; max-width: 480px;">
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={true}</code>
					<origam-switch :model-value="false" loading disabled label="Bool" data-cy="switch-loading-bool"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={42}</code>
					<origam-switch :model-value="false" :loading="42" disabled label="42%" data-cy="switch-loading-number"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'line' }}</code>
					<origam-switch :model-value="false" :loading="{ type: 'line' }" disabled label="Line loader" data-cy="switch-loading-line"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'circular', size: 16 }}</code>
					<origam-switch :model-value="false" :loading="{ type: 'circular', size: 16 }" disabled label="Small spinner" data-cy="switch-loading-circular-override"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'skeleton' }}</code>
					<origam-switch :model-value="false" :loading="{ type: 'skeleton' }" disabled label="Skeleton mode" data-cy="switch-loading-skeleton"/>
				</div>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISwitchProps>({
					label: 'Enable feature',
					color: 'primary',
					density: undefined,
					inset: false,
					flat: false,
					indeterminate: false,
					disabled: false,
					readonly: false,
				})"
		>
			<template #default="{ state }">
				<origam-switch
						v-model="playgroundModel"
						v-bind="state"
						data-cy="switch-playground"
				/>
				<div data-cy="switch-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
				<HstCheckbox v-model="state.inset"         title="inset"/>
				<HstCheckbox v-model="state.flat"          title="flat"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
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

	import { OrigamSwitch } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IColorProps, IDensityProps, ISwitchProps } from '@origam/interfaces'
	import type { TLoadingValue } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList,
		hoverList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveSwitchLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeSwitchLoading = (state: ILoadingState): string => {
		const v = resolveSwitchLoading(state)
		return JSON.stringify(v, null, 2)
	}

	const colorModel              = ref(false)
	const densityModel            = ref(false)
	const insetModel              = ref(false)
	const indeterminateModel      = ref(false)
	const statesModel             = ref(false)
	const slotTrackModel          = ref(false)
	const emitClickLabelModel     = ref(false)
	const emitFocusedModel        = ref(false)
	const emitIndeterminateModel  = ref(false)
	const emitModel               = ref(false)
	const emitFocusModel          = ref(false)
	const playgroundModel         = ref(false)
</script>

<docs lang="md" src="@docs/components/Switch/OrigamSwitch.md"/>
