<template>
	<Story
			group="components"
			title="Field/OrigamField"
	>

		<!-- ════════════ VARIANT ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-field
						:variant="state.variant"
						label="Field label"
						data-cy="field-variant"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur" data-cy="field-variant-input"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<!-- ════════════ VARIANTS SHOWCASE ════════════ -->
		<Variant title="Variants showcase">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
				<div
						v-for="v in variantInputShowcaseList"
						:key="v.value"
						style="display: flex; align-items: center; gap: 16px;"
				>
					<span style="min-width: 120px; font-size: 13px; color: var(--origam-color-surface-fg, currentColor); opacity: 0.7;">{{ v.label }}</span>
					<origam-field
							:variant="v.value"
							label="Label"
							style="flex: 1;"
							:data-cy="`field-showcase-${v.value}`"
					>
						<template #default="{ id, onFocus, onBlur }">
							<input :id="id" class="origam-field__input" placeholder="Placeholder" @focus="onFocus" @blur="onBlur"/>
						</template>
					</origam-field>
				</div>
			</div>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-field
						:color="state.color"
						label="Colored field"
						data-cy="field-color"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-field
						:density="state.density"
						label="Density field"
						data-cy="field-density"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ PREFIX / SUFFIX ════════════ -->
		<Variant
				title="Prefix & suffix"
				:init-state="() => useStoryInitState<{ prefix: string, suffix: string }>({ prefix: '$', suffix: '.00' })"
		>
			<template #default="{ state }">
				<origam-field
						:prefix="state.prefix"
						:suffix="state.suffix"
						label="Price"
						data-cy="field-prefix"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.prefix" title="prefix"/>
				<HstText v-model="state.suffix" title="suffix"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, error: boolean, dirty: boolean }>({ disabled: false, error: false, dirty: false })"
		>
			<template #default="{ state }">
				<origam-field
						:disabled="state.disabled"
						:error="state.error"
						:dirty="state.dirty"
						label="Stateful field"
						data-cy="field-states"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.error"    title="error"/>
				<HstCheckbox v-model="state.dirty"    title="dirty"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: prependInner / appendInner ════════════ -->
		<Variant title="Slot — prependInner / appendInner">
			<origam-field label="With inner slots" data-cy="field-slot-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
				</template>
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.CLOSE"/>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<!-- ════════════ SLOT: label ════════════ -->
		<Variant title="Slot — label">
			<origam-field data-cy="field-slot-label">
				<template #label>
					<span style="font-style: italic; color: var(--origam-color-action-primary-bg);">Custom label</span>
				</template>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-field
					label="Focus & blur"
					data-cy="field-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<!-- ════════════ EMIT: click:clear ════════════ -->
		<Variant title="Emit — click:clear">
			<origam-field
					label="Clearable field"
					:persistent-clear="true"
					data-cy="field-emit-clear"
					@click:clear="logEvent('click:clear', $event)"
			>
				<template #default="{ id, onFocus, onBlur }">
					<input :id="id" class="origam-field__input" value="some value" @focus="onFocus" @blur="onBlur"/>
				</template>
			</origam-field>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IFieldProps>({
					label: 'Field label',
					color: 'primary',
					variant: undefined,
					density: undefined,
					prefix: '',
					suffix: '',
					disabled: false,
					error: false,
					dirty: false,
					flat: false,
					singleLine: false,
				})"
		>
			<template #default="{ state }">
				<origam-field
						v-bind="state"
						data-cy="field-playground"
				>
					<template #default="{ id, onFocus, onBlur }">
						<input :id="id" class="origam-field__input" @focus="onFocus" @blur="onBlur"/>
					</template>
				</origam-field>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"      title="label"/>
				<HstSelect   v-model="state.color"      title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant"    title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.density"    title="density" :options="densityList"/>
				<HstText     v-model="state.prefix"     title="prefix"/>
				<HstText     v-model="state.suffix"     title="suffix"/>
				<HstCheckbox v-model="state.disabled"   title="disabled"/>
				<HstCheckbox v-model="state.error"      title="error"/>
				<HstCheckbox v-model="state.dirty"      title="dirty"/>
				<HstCheckbox v-model="state.flat"       title="flat"/>
				<HstCheckbox v-model="state.singleLine" title="singleLine"/>
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
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IFieldProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	/** Full list for the showcase — no "(none)" entry. */
	const variantInputShowcaseList = variantInputList.filter(v => v.value !== undefined)
</script>

<docs lang="md" src="@docs/components/Field/OrigamField.md"/>
