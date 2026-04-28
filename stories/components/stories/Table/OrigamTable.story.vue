<template>
	<Story
			group="components"
			title="Table/OrigamTable"
	>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-table :density="state.density">
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
						<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-table :rounded="state.rounded" border>
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
						<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({})"
		>
			<template #default="{ state }">
				<origam-table :elevation="state.elevation">
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
						<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<{ border?: boolean }>({})"
		>
			<template #default="{ state }">
				<origam-table v-bind="state">
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
						<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ DIMENSION ════════════ -->
		<Variant
				title="Dimension"
				:init-state="() => useStoryInitState<IDimensionProps>({ height: 160 })"
		>
			<template #default="{ state }">
				<origam-table v-bind="state" border>
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr v-for="i in 12" :key="i">
							<td>User {{ i }}</td>
							<td>user{{ i }}@example.com</td>
						</tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.width"  title="width"/>
				<HstNumber v-model="state.height" title="height"/>
				<HstNumber v-model="state.maxWidth"  title="maxWidth"/>
				<HstNumber v-model="state.maxHeight" title="maxHeight"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-table :tag="state.tag" border>
					<thead><tr><th>Tag</th></tr></thead>
					<tbody><tr><td>{{ state.tag }}</td></tr></tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-table border>
				<thead><tr><th>Name</th><th>Email</th></tr></thead>
				<tbody>
					<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
					<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
				</tbody>
			</origam-table>
		</Variant>

		<!-- ════════════ SLOT: top ════════════ -->
		<Variant title="Slot — top">
			<origam-table border>
				<template #top>
					<div style="padding: 12px; background: var(--origam-color-surface-overlay);">
						Toolbar / search bar
					</div>
				</template>
				<thead><tr><th>Name</th></tr></thead>
				<tbody><tr><td>Ada Lovelace</td></tr></tbody>
			</origam-table>
		</Variant>

		<!-- ════════════ SLOT: bottom ════════════ -->
		<Variant title="Slot — bottom">
			<origam-table border>
				<thead><tr><th>Name</th></tr></thead>
				<tbody><tr><td>Ada Lovelace</td></tr></tbody>
				<template #bottom>
					<div style="padding: 12px; background: var(--origam-color-surface-overlay);">
						Pagination / summary
					</div>
				</template>
			</origam-table>
		</Variant>

		<!-- ════════════ SLOT: wrapper (advanced) ════════════ -->
		<Variant title="Slot — wrapper (advanced)">
			<origam-table border>
				<template #wrapper>
					<div style="padding: 16px; font-style: italic;">
						Wrapper slot fully replaces the &lt;table&gt; element.
					</div>
				</template>
			</origam-table>
		</Variant>

		<!-- ════════════ FIXED HEADER ════════════ -->
		<!--
			`fixedHeader` activates sticky positioning on <thead> so the
			header stays visible while the body scrolls. The wrapper must
			have an explicit height for overflow to kick in.
		-->
		<Variant title="Fixed header">
			<origam-table fixed-header border :max-height="160">
				<thead><tr><th>Name</th><th>Email</th></tr></thead>
				<tbody>
					<tr v-for="i in 12" :key="i">
						<td>User {{ i }}</td>
						<td>user{{ i }}@example.com</td>
					</tr>
				</tbody>
			</origam-table>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITableProps>({
					tag: 'div',
					density: undefined,
					rounded: undefined,
					elevation: undefined,
					border: false,
					width: undefined,
					height: undefined
				})"
		>
			<template #default="{ state }">
				<origam-table v-bind="state">
					<thead><tr><th>Name</th><th>Email</th></tr></thead>
					<tbody>
						<tr><td>Ada Lovelace</td><td>ada@example.com</td></tr>
						<tr><td>Linus Torvalds</td><td>linus@example.com</td></tr>
					</tbody>
				</origam-table>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.tag"       title="tag"       :options="tagList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstNumber   v-model="state.width"     title="width"/>
				<HstNumber   v-model="state.height"    title="height"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTable } from '@origam/components'
	import type {
		IDensityProps,
		IDimensionProps,
		IElevationProps,
		IRoundedProps,
		ITableProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		roundedList,
		tagList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Table/OrigamTable.md"/>
