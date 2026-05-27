<template>
	<Story
			group="components"
			title="Chip/OrigamChipGroup"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IChipGroupProps>({
					column: false,
					filter: false,
					mandatory: false,
					multiple: false,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-group-playground-shell">
					<origam-chip-group v-model="playgroundSelected" v-bind="state" data-cy="chip-group-playground">
						<origam-chip :value="1" link text="Alpha" data-cy="chip-group-playground-1"/>
						<origam-chip :value="2" link text="Beta"  data-cy="chip-group-playground-2"/>
						<origam-chip :value="3" link text="Gamma" data-cy="chip-group-playground-3"/>
					</origam-chip-group>
					<span class="story-status" data-cy="chip-group-playground-status">selected = <strong>{{ JSON.stringify(playgroundSelected) }}</strong></span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.column"    title="column"/>
				<HstCheckbox v-model="state.filter"    title="filter"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — multiple (checkbox-style selection)">
			<!-- multiple allows selecting more than one chip simultaneously -->
			<div class="story-shell" data-cy="chip-group-multiple-shell">
				<origam-chip-group v-model="multipleSelected" multiple data-cy="chip-group-multiple">
					<origam-chip :value="'a'" link text="Alpha" data-cy="chip-group-multiple-a"/>
					<origam-chip :value="'b'" link text="Beta"  data-cy="chip-group-multiple-b"/>
					<origam-chip :value="'c'" link text="Gamma" data-cy="chip-group-multiple-c"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-group-multiple-status">selected = <strong>{{ multipleSelected.join(', ') || '(empty)' }}</strong></span>
			</div>
		</Variant>

		<Variant
				title="Prop — mandatory (always one selected)"
				:init-state="() => useStoryInitState<{ mandatory: boolean }>({ mandatory: true })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-group-mandatory-shell">
					<origam-chip-group v-model="mandatorySelected" :mandatory="state.mandatory" data-cy="chip-group-mandatory">
						<origam-chip :value="'grid'" link text="Grid" data-cy="chip-group-mandatory-grid"/>
						<origam-chip :value="'list'" link text="List" data-cy="chip-group-mandatory-list"/>
					</origam-chip-group>
					<span class="story-status" data-cy="chip-group-mandatory-status">selected = <strong>{{ mandatorySelected ?? '(none)' }}</strong></span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>

		<Variant title="Prop — filter (check icon when selected)">
			<!-- filter adds a visible check mark to selected chips -->
			<div class="story-shell" data-cy="chip-group-filter-shell">
				<origam-chip-group v-model="filterGroupSelected" filter data-cy="chip-group-filter">
					<origam-chip :value="1" filter link text="News"   data-cy="chip-group-filter-1"/>
					<origam-chip :value="2" filter link text="Art"    data-cy="chip-group-filter-2"/>
					<origam-chip :value="3" filter link text="Sports" data-cy="chip-group-filter-3"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-group-filter-status">selected = <strong>{{ filterGroupSelected }}</strong></span>
			</div>
		</Variant>

		<Variant
				title="Prop — column (wraps chips to new lines)"
				:init-state="() => useStoryInitState<{ column: boolean }>({ column: true })"
		>
			<template #default="{ state }">
				<origam-chip-group :column="state.column" data-cy="chip-group-column">
					<origam-chip link text="One"   data-cy="chip-group-column-1"/>
					<origam-chip link text="Two"   data-cy="chip-group-column-2"/>
					<origam-chip link text="Three" data-cy="chip-group-column-3"/>
					<origam-chip link text="Four"  data-cy="chip-group-column-4"/>
					<origam-chip link text="Five"  data-cy="chip-group-column-5"/>
					<origam-chip link text="Six"   data-cy="chip-group-column-6"/>
				</origam-chip-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.column" title="column"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color (applies to selected chip)"
				:init-state="() => useStoryInitState<{ color?: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-chip-group v-model="colorSelected" :color="state.color" data-cy="chip-group-color">
					<origam-chip :value="1" link text="One" data-cy="chip-group-color-1"/>
					<origam-chip :value="2" link text="Two" data-cy="chip-group-color-2"/>
				</origam-chip-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Prop — selectedClass (custom active class)">
			<!-- selectedClass allows using your own CSS class for the active state -->
			<div class="story-shell" data-cy="chip-group-selectedclass-shell">
				<origam-chip-group v-model="selectedClassModel" selected-class="my-chip-active" data-cy="chip-group-selectedclass">
					<origam-chip :value="1" link text="Alpha" data-cy="chip-group-sc-1"/>
					<origam-chip :value="2" link text="Beta"  data-cy="chip-group-sc-2"/>
					<origam-chip :value="3" link text="Gamma" data-cy="chip-group-sc-3"/>
				</origam-chip-group>
				<span class="story-status">selected = <strong>{{ selectedClassModel }}</strong></span>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div class="story-shell" data-cy="chip-group-slot-default-shell">
				<origam-chip-group v-model="playgroundSelected" data-cy="chip-group-slot-default">
					<origam-chip :value="1" link text="Alpha" data-cy="chip-group-slot-default-1"/>
					<origam-chip :value="2" link text="Beta" data-cy="chip-group-slot-default-2"/>
					<origam-chip :value="3" link text="Gamma" data-cy="chip-group-slot-default-3"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-group-slot-default-status">selected = <strong>{{ JSON.stringify(playgroundSelected) }}</strong></span>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-group-emit-shell">
					<origam-chip-group
							v-model="emitModel"
							data-cy="chip-group-emit"
							@update:model-value="(v: any) => {
								state.log = [`update:modelValue → ${JSON.stringify(v)}`, ...state.log].slice(0, 6)
							}"
					>
						<origam-chip :value="1" link text="Alpha" data-cy="chip-group-emit-1"/>
						<origam-chip :value="2" link text="Beta"  data-cy="chip-group-emit-2"/>
						<origam-chip :value="3" link text="Gamma" data-cy="chip-group-emit-3"/>
					</origam-chip-group>
					<ul v-if="state.log.length" style="font-family: monospace; font-size: 0.8rem; margin: 0; padding-left: 16px;">
						<li v-for="(l, i) in state.log" :key="i">{{ l }}</li>
					</ul>
					<p v-else class="story-status">Click a chip to see events.</p>
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

	import { OrigamChip, OrigamChipGroup } from '@origam/components'
	import type { IChipGroupProps } from '@origam/interfaces'

	import { intentList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const multipleSelected = ref<Array<string>>([])
	const mandatorySelected = ref<string>('grid')
	const filterGroupSelected = ref<number | undefined>(undefined)
	const colorSelected = ref<number | undefined>(undefined)
	const playgroundSelected = ref<number | Array<number> | undefined>(undefined)
	const selectedClassModel = ref<number | undefined>(undefined)
	const emitModel = ref<number | undefined>(undefined)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); }
	:deep(.my-chip-active) {
		background: var(--origam-color__action--primary---bg, rgb(124, 58, 237));
		color: var(--origam-color__action--primary---fg, white);
	}
</style>

<docs lang="md" src="@docs/components/Chip/OrigamChipGroup.md"/>
