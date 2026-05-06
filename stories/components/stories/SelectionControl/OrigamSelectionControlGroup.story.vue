<template>
	<Story
			group="components"
			title="SelectionControl/OrigamSelectionControlGroup"
	>

		<!--
			REFERENCE STORY — pattern mirrors OrigamBtn.story.vue.

			Each <Variant> drives one orthogonal concern:
			  • one variant per "prop family" (color, size, density, …)
			  • one variant per slot
			  • one variant per emit — wire the listener to
			    `logEvent('event-name', $event)` (imported from
			    'histoire/client') so the emit shows up in histoire's
			    Events tab.
			  • one "playground" variant that exposes everything together
		-->

		<!-- ════════════ TYPE (checkbox / radio / switch) ════════════ -->
		<Variant
				title="Type"
				:init-state="() => useStoryInitState<{ type: string }>({ type: 'checkbox' })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="typeModel"
						:type="state.type"
						data-cy="scg-type"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-type-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-type-b"/>
					<origam-selection-control value="c" label="Option C" data-cy="scg-type-c"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type" title="type" :options="typeList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="colorModel"
						type="checkbox"
						:color="state.color"
						data-cy="scg-color"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-color-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-color-b"/>
				</origam-selection-control-group>
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
				<origam-selection-control-group
						v-model="densityModel"
						type="checkbox"
						:density="state.density"
						data-cy="scg-density"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-density-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-density-b"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ SELECTION MODIFIERS (inline / multiple) ════════════ -->
		<Variant
				title="Selection modifiers"
				:init-state="() => useStoryInitState<{ inline: boolean, multiple: boolean }>({ inline: false, multiple: false })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="modifiersModel"
						type="checkbox"
						:inline="state.inline"
						:multiple="state.multiple"
						data-cy="scg-modifiers"
				>
					<origam-selection-control value="a" label="Alpha" data-cy="scg-modifiers-a"/>
					<origam-selection-control value="b" label="Beta"  data-cy="scg-modifiers-b"/>
					<origam-selection-control value="c" label="Gamma" data-cy="scg-modifiers-c"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inline"   title="inline"/>
				<HstCheckbox v-model="state.multiple" title="multiple"/>
			</template>
		</Variant>

		<!-- ════════════ ICON OVERRIDES (trueIcon / falseIcon) ════════════ -->
		<Variant
				title="Icons (trueIcon / falseIcon)"
				:init-state="() => useStoryInitState<{ trueIcon?: TIcon, falseIcon?: TIcon }>({ trueIcon: MDI_ICONS.CHECK_CIRCLE, falseIcon: MDI_ICONS.CIRCLE_OUTLINE })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="iconsModel"
						type="checkbox"
						:true-icon="state.trueIcon"
						:false-icon="state.falseIcon"
						data-cy="scg-icons"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-icons-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-icons-b"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.trueIcon"  title="trueIcon"  :options="iconList"/>
				<HstSelect v-model="state.falseIcon" title="falseIcon" :options="iconList"/>
			</template>
		</Variant>

		<!-- ════════════ STATES (disabled / readonly / error) ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="statesModel"
						type="checkbox"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						data-cy="scg-states"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-states-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-states-b"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-selection-control-group
					v-model="itemsModel"
					type="checkbox"
					:items="checkboxItems"
					data-cy="scg-items"
			>
				<template #item="{ item, index }">
					<origam-selection-control
							:value="item.value"
							:label="item.label"
							:data-cy="`scg-items-${index}`"
					/>
				</template>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-selection-control-group
					v-model="slotDefaultModel"
					type="radio"
					data-cy="scg-slot-default"
			>
				<origam-selection-control value="x" label="Choice X" data-cy="scg-slot-x"/>
				<origam-selection-control value="y" label="Choice Y" data-cy="scg-slot-y"/>
				<origam-selection-control value="z" label="Choice Z" data-cy="scg-slot-z"/>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ SLOT: item ════════════ -->
		<Variant title="Slot — item">
			<origam-selection-control-group
					v-model="slotItemModel"
					type="checkbox"
					:items="checkboxItems"
					data-cy="scg-slot-item"
			>
				<template #item="{ item, index }">
					<div style="display: flex; align-items: center; gap: 8px; padding: 4px 0;">
						<origam-selection-control :value="item.value" :data-cy="`scg-slot-item-ctrl-${index}`"/>
						<span style="font-weight: 600;">{{ item.label }}</span>
					</div>
				</template>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-selection-control-group
					v-model="emitModel"
					type="checkbox"
					data-cy="scg-emit"
					@update:model-value="logEvent('update:modelValue', $event)"
			>
				<origam-selection-control value="a" label="Option A" data-cy="scg-emit-a"/>
				<origam-selection-control value="b" label="Option B" data-cy="scg-emit-b"/>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ PLAYGROUND (everything together) ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISelectionControlGroupProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					multiple: false,
					inline: false,
					disabled: false,
					readonly: false,
					error: false,
					type: 'checkbox',
					trueIcon: undefined,
					falseIcon: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="playgroundModel"
						v-bind="state"
						data-cy="scg-playground"
				>
					<origam-selection-control value="a" label="Alpha" data-cy="scg-playground-a"/>
					<origam-selection-control value="b" label="Beta"  data-cy="scg-playground-b"/>
					<origam-selection-control value="c" label="Gamma" data-cy="scg-playground-c"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.type"      title="type"      :options="typeList"/>
				<HstSelect   v-model="state.trueIcon"  title="trueIcon"  :options="iconList"/>
				<HstSelect   v-model="state.falseIcon" title="falseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.inline"    title="inline"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.error"     title="error"/>
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

	import { OrigamSelectionControl, OrigamSelectionControlGroup } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IColorProps,
		IDensityProps,
		IOptions,
		ISelectionControlGroupProps
	} from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'

	const typeModel      = ref<string[]>([])
	const colorModel     = ref<string[]>([])
	const densityModel   = ref<string[]>([])
	const modifiersModel = ref<string[]>([])
	const iconsModel     = ref<string[]>([])
	const statesModel    = ref<string[]>([])
	const itemsModel     = ref<string[]>([])
	const slotDefaultModel = ref<string | undefined>(undefined)
	const slotItemModel  = ref<string[]>([])
	const emitModel      = ref<string[]>([])
	const playgroundModel = ref<any>(undefined)

	const checkboxItems = [
		{ value: 'alpha', label: 'Alpha' },
		{ value: 'beta',  label: 'Beta'  },
		{ value: 'gamma', label: 'Gamma' },
	]

	const typeList: Array<IOptions<string>> = [
		{ label: 'checkbox', value: 'checkbox' },
		{ label: 'radio',    value: 'radio'    },
		{ label: 'switch',   value: 'switch'   },
	]
</script>
