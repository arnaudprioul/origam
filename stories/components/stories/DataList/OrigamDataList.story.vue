<template>
	<Story
			group="components"
			title="DataList/OrigamDataList"
	>
		<!--
			Playground — first by convention. All main props wired via
			sidebar controls so the consumer can exercise the full API.
		-->
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
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.borderStyle" title="borderStyle" :options="borderStyleList"/>
				<HstText     v-model="state.borderColor" title="borderColor" placeholder="currentColor"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — items (basic)">
			<origam-data-list :items="basicItems" data-cy="data-list-basic"/>
		</Variant>

		<Variant
				title="Prop — density"
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
				title="Prop — prependIcon & appendIcon"
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
				title="Prop — border & rounded"
				:init-state="() => useStoryInitState<IBorderProps & IRoundedProps>({ border: false, rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state" data-cy="data-list-border"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.borderStyle" title="borderStyle" :options="borderStyleList"/>
				<HstText     v-model="state.borderColor" title="borderColor" placeholder="currentColor"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — mode (kv vs avatar)"
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

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — item">
			<origam-data-list :items="basicItems" data-cy="data-list-slot-item">
				<template #item="{ item }">
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

		<Variant title="Slot — value (KV mode custom cell)">
			<!-- The KV mode `value` slot lets you override any cell by key. -->
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

		<Variant title="KV — mixed value types (component cells)">
			<!--
				Demonstrates component-value cells: Status and Priority use
				an OrigamChip component instance as their value.
			-->
			<origam-data-list mode="kv" :items="kvMixedItems" data-cy="data-list-kv-mixed"/>
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
	import {
		borderList,
		borderStyleList,
		densityList, iconList, roundedList
	} from '@stories/const'

	// Vue's reactive proxy would otherwise wrap the imported component
	// definitions when they're stored inside an `items` array bound via
	// `:items`. `markRaw` keeps the component objects intact and silences
	// the dev-mode warning.
	const RawChip = markRaw(OrigamChip)

	const basicItems = [
		{ title: { text: 'Status' },   text: [{ text: 'Active' }] },
		{ title: { text: 'Created' },  text: [{ text: '2024-01-15' }] },
		{ title: { text: 'Owner' },    text: [{ text: 'Alice Dupont' }] },
		{ title: { text: 'Priority' }, text: [{ text: 'High' }] },
	]

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
