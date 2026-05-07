<template>
	<Story
			group="components"
			title="Chip/OrigamChipGroup"
	>

		<Variant title="Default">
			<div class="story-shell" data-cy="chip-group-default-shell">
				<origam-chip-group v-model="defaultSelected" data-cy="chip-group-default">
					<origam-chip :value="1" link text="Vue"        data-cy="chip-group-default-1"/>
					<origam-chip :value="2" link text="TypeScript" data-cy="chip-group-default-2"/>
					<origam-chip :value="3" link text="Vite"       data-cy="chip-group-default-3"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-group-default-status">selected = <strong>{{ defaultSelected }}</strong></span>
			</div>
		</Variant>

		<Variant title="Multiple">
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
				title="Mandatory"
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

		<Variant title="Filter">
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
				title="Column"
				:init-state="() => useStoryInitState<{ column: boolean }>({ column: true })"
		>
			<template #default="{ state }">
				<origam-chip-group :column="state.column" data-cy="chip-group-column">
					<origam-chip link text="One"   data-cy="chip-group-column-1"/>
					<origam-chip link text="Two"   data-cy="chip-group-column-2"/>
					<origam-chip link text="Three" data-cy="chip-group-column-3"/>
				</origam-chip-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.column" title="column"/>
			</template>
		</Variant>

		<Variant
				title="Color (intent)"
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

		<Variant
				title="Playground"
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

	const defaultSelected = ref<number | undefined>(undefined)
	const multipleSelected = ref<Array<string>>([])
	const mandatorySelected = ref<string>('grid')
	const filterGroupSelected = ref<number | undefined>(undefined)
	const colorSelected = ref<number | undefined>(undefined)
	const playgroundSelected = ref<number | Array<number> | undefined>(undefined)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Chip/OrigamChipGroup.md"/>
