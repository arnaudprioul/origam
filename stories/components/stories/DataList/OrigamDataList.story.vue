<template>
	<Story
			group="components"
			title="DataList/OrigamDataList"
	>

		<Variant title="Basic">
			<origam-data-list :items="basicItems" data-cy="data-list-basic"/>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: undefined })"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" :density="state.density" data-cy="data-list-density"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Adjacent icons"
				:init-state="() => useStoryInitState<IAdjacentProps>({})"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state" data-cy="data-list-adjacent"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Border and rounded"
				:init-state="() => useStoryInitState<IBorderProps & IRoundedProps>({ border: false, rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state" data-cy="data-list-border"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant title="Slot — item">
			<origam-data-list :items="basicItems" data-cy="data-list-slot-item">
				<template #item="{ item, index }">
					<div style="display: flex; justify-content: space-between; padding: 4px 0;">
						<strong>{{ item.title?.text }}</strong>
						<span>{{ item.text?.[0]?.text }}</span>
					</div>
				</template>
			</origam-data-list>
		</Variant>

		<Variant title="Slot — item.title">
			<origam-data-list :items="basicItems" data-cy="data-list-slot-item-title">
				<template #item.title="props">
					<em>{{ props.text }}</em>
				</template>
			</origam-data-list>
		</Variant>

		<Variant title="KV — basic">
			<origam-data-list mode="kv" :items="kvBasicItems" data-cy="data-list-kv-basic"/>
		</Variant>

		<Variant title="KV — mixed values">
			<origam-data-list mode="kv" :items="kvMixedItems" data-cy="data-list-kv-mixed"/>
		</Variant>

		<Variant title="KV — slot override">
			<origam-data-list mode="kv" :items="kvBasicItems" data-cy="data-list-kv-slot">
				<template #value="{ key, value }">
					<a
							v-if="key === 'Owner'"
							href="#owner-profile"
							data-cy="kv-slot-owner-link"
					>
						{{ value }}
					</a>
					<span v-else>{{ value }}</span>
				</template>
			</origam-data-list>
		</Variant>

		<Variant
				title="KV — mode toggle"
				:init-state="() => useStoryInitState<{ mode: 'avatar' | 'kv' }>({ mode: 'kv' })"
		>
			<template #default="{ state }">
				<origam-data-list
						:mode="state.mode"
						:items="state.mode === 'kv' ? kvBasicItems : basicItems"
						data-cy="data-list-kv-toggle"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.mode"
						title="mode"
						:options="[{ label: 'avatar', value: 'avatar' }, { label: 'kv', value: 'kv' }]"
				/>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDensityProps & IAdjacentProps & IBorderProps & IRoundedProps>({
					density: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					border: false,
					rounded: undefined
				})"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state" data-cy="data-list-playground"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"     title="density"     :options="densityList"/>
				<HstSelect   v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstCheckbox v-model="state.border"      title="border"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { markRaw } from 'vue'

	import { OrigamChip, OrigamDataList } from '@origam/components'
	import type { IAdjacentProps, IBorderProps, IDataListKVItem, IDensityProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, roundedList } from '@stories/const'

	// Vue's reactive proxy would otherwise wrap the imported component
	// definitions when they're stored inside an `items` array bound via
	// `:items` (Histoire's <Variant> wraps state). `markRaw` keeps the
	// component objects intact and silences the dev-mode warning.
	const RawChip = markRaw(OrigamChip)

	const basicItems = [
		{ title: { text: 'Status' },   text: [{ text: 'Active' }] },
		{ title: { text: 'Created' },  text: [{ text: '2024-01-15' }] },
		{ title: { text: 'Owner' },    text: [{ text: 'Alice Dupont' }] },
		{ title: { text: 'Priority' }, text: [{ text: 'High' }] },
	]

	// ────────────────────────────────────────────────────────────────
	// KV-mode datasets — mirrors the PDF reference deck:
	//   `Status / Active(chip)`, `Owner / Arnaud Martin`, …
	// ────────────────────────────────────────────────────────────────
	const kvBasicItems: IDataListKVItem[] = [
		{ key: 'Status',     value: 'Active' },
		{ key: 'Owner',      value: 'Arnaud Martin' },
		{ key: 'Created at', value: 'Apr 12, 2026' },
		{ key: 'Priority',   value: 'High' },
	]

	const kvMixedItems: IDataListKVItem[] = [
		{
			key: 'Status',
			value: { component: RawChip, props: { text: 'Active', bgColor: 'success' } }
		},
		{ key: 'Owner', value: 'Arnaud Martin' },
		{ key: 'Created at', value: 'Apr 12, 2026' },
		{
			key: 'Priority',
			value: { component: RawChip, props: { text: 'High', bgColor: 'danger' } }
		},
	]
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataList.md"/>
