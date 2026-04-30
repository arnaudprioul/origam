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

		<!-- ════════════ CARD LAYOUT (Card AS the SelectionControl content) ════════════ -->
		<!--
			Same pattern as Vuetify's `v-selection-control` + `v-card`
			combo: the `<origam-selection-control>` owns the selection
			state and the (hidden) input; its `#default` slot scope
			exposes `model` so the consumer can render a fully custom
			visual — here an `<origam-card>` whose border / elevation
			switches via the slot's `model` flag. The SelectionControl
			still drives the click target, so toggling works through the
			whole card surface (no `:has()` workaround needed).
		-->
		<Variant title="Card layout">
			<div class="scg-card-row" data-cy="scg-cards">
				<origam-selection-control-group v-model="cardModel" type="radio">
					<origam-selection-control
							v-for="opt in cardOptions"
							:key="opt.value"
							:value="opt.value"
							:label="opt.label"
							:data-cy="`scg-cards-${opt.value}`"
							class="scg-card-control"
					>
						<template #default="{ model }">
							<origam-card
									border
									rounded="default"
									:class="['scg-card-option', { 'scg-card-option--active': model }]"
							>
								<div class="scg-card-option__icon">{{ opt.icon }}</div>
								<div class="scg-card-option__title">{{ opt.label }}</div>
								<div class="scg-card-option__desc">{{ opt.desc }}</div>
							</origam-card>
						</template>
					</origam-selection-control>
				</origam-selection-control-group>
			</div>
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
	import { OrigamCard, OrigamSelectionControl, OrigamSelectionControlGroup } from '@origam/components'
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
	const cardModel = ref<string | undefined>('m')

	const cardOptions = [
		{ value: 's', label: 'Small',  icon: '◔', desc: '~ 20 GB · 1 vCPU'  },
		{ value: 'm', label: 'Medium', icon: '◑', desc: '~ 80 GB · 2 vCPU'  },
		{ value: 'l', label: 'Large',  icon: '●', desc: '~ 320 GB · 4 vCPU' },
	]

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

<style scoped>
	.scg-card-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding: 16px;
	}

	/*
		The SelectionControl now owns the click surface — make the whole
		thing inline-block so the Card snaps to its label width, drop the
		default flex wrapper that pushes the radio dot to the side, and
		hide the native input + radio glyph entirely (the Card IS the
		visual now). Pointer-events on the input must stay so the click
		still reaches the input via the wrapping label semantics.
	*/
	.scg-card-control {
		flex: 1 1 200px;
		min-width: 200px;
		max-width: 320px;
	}
	:deep(.scg-card-control .origam-selection-control__wrapper) {
		display: block;
	}
	:deep(.scg-card-control .origam-selection-control__input) {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
	}
	/*
		The label is already rendered inside the card visual (the
		`opt.label` text in `__title`), so the SelectionControl's own
		label slot is redundant — hide it. Keeps the card the only
		visible target.
	*/
	:deep(.scg-card-control .origam-selection-control__label) {
		display: none;
	}

	.scg-card-option {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px 20px;
		min-height: 110px;
		transition: border-color 0.15s ease, border-width 0.15s ease, box-shadow 0.15s ease;
	}
	.scg-card-option__icon {
		font-size: 1.75rem;
		line-height: 1;
		opacity: 0.6;
	}
	.scg-card-option__title {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.scg-card-option__desc {
		font-size: 0.8125rem;
		opacity: 0.66;
	}

	/*
		Active state — driven by the slot's `model` flag (boolean) the
		consumer applies as `--active` modifier. No `:has()` needed
		(the SelectionControl exposes the state through slot scope), so
		this works back to any browser supporting CSS variables.
	*/
	.scg-card-option--active {
		border-color: var(--origam-color-action-primary-bg, rgb(124, 58, 237));
		border-width: 2px;
		box-shadow: 0 0 0 4px var(--origam-color-action-primary-bg-subtle, rgba(124, 58, 237, 0.1));
	}
</style>
