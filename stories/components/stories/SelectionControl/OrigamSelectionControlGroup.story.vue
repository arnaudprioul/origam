<template>
	<Story
			group="components"
			title="SelectionControl/OrigamSelectionControlGroup"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-selection-control-group v-model="defaultModel" type="checkbox" data-cy="scg-default">
				<origam-selection-control value="a" label="Option A" data-cy="scg-default-a"/>
				<origam-selection-control value="b" label="Option B" data-cy="scg-default-b"/>
				<origam-selection-control value="c" label="Option C" data-cy="scg-default-c"/>
			</origam-selection-control-group>
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

		<!-- ════════════ DEFAULT SLOT (explicit children) ════════════ -->
		<Variant title="Default slot">
			<origam-selection-control-group v-model="slotModel" type="radio" data-cy="scg-slot">
				<origam-selection-control value="x" label="Choice X" data-cy="scg-slot-x"/>
				<origam-selection-control value="y" label="Choice Y" data-cy="scg-slot-y"/>
				<origam-selection-control value="z" label="Choice Z" data-cy="scg-slot-z"/>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<origam-selection-control-group v-model="multipleModel" type="checkbox" multiple data-cy="scg-multiple">
				<origam-selection-control value="one"   label="One"   data-cy="scg-multiple-1"/>
				<origam-selection-control value="two"   label="Two"   data-cy="scg-multiple-2"/>
				<origam-selection-control value="three" label="Three" data-cy="scg-multiple-3"/>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ INLINE ════════════ -->
		<Variant
				title="Inline"
				:init-state="() => useStoryInitState<{ inline: boolean }>({ inline: true })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="inlineModel"
						type="checkbox"
						:inline="state.inline"
						data-cy="scg-inline"
				>
					<origam-selection-control value="a" label="Alpha" data-cy="scg-inline-a"/>
					<origam-selection-control value="b" label="Beta"  data-cy="scg-inline-b"/>
					<origam-selection-control value="c" label="Gamma" data-cy="scg-inline-c"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inline" title="inline"/>
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

		<!-- ════════════ DISABLED ════════════ -->
		<Variant
				title="Disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<origam-selection-control-group
						v-model="disabledModel"
						type="checkbox"
						:disabled="state.disabled"
						data-cy="scg-disabled"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-disabled-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-disabled-b"/>
				</origam-selection-control-group>
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
				<origam-selection-control-group
						v-model="readonlyModel"
						type="checkbox"
						:readonly="state.readonly"
						data-cy="scg-readonly"
				>
					<origam-selection-control value="a" label="Option A" data-cy="scg-readonly-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="scg-readonly-b"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISelectionControlGroupProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					multiple: false,
					inline: false,
					disabled: false,
					readonly: false,
					type: 'checkbox',
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
				<HstSelect   v-model="state.density"  title="density"  :options="densityList"/>
				<HstSelect   v-model="state.color"    title="color"    :options="intentList"/>
				<HstCheckbox v-model="state.multiple" title="multiple"/>
				<HstCheckbox v-model="state.inline"   title="inline"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstSelect   v-model="state.type"     title="type"     :options="typeList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamSelectionControl, OrigamSelectionControlGroup } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type {
		IColorProps,
		IDensityProps,
		IOptions,
		ISelectionControlGroupProps
	} from '@origam/interfaces'

	import { densityList, intentList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const defaultModel  = ref<string[]>([])
	const itemsModel    = ref<string[]>([])
	const slotModel     = ref<string | undefined>(undefined)
	const multipleModel = ref<string[]>([])
	const inlineModel   = ref<string[]>([])
	const densityModel  = ref<string[]>([])
	const colorModel    = ref<string[]>([])
	const disabledModel = ref<string[]>([])
	const readonlyModel = ref<string[]>(['a'])
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

