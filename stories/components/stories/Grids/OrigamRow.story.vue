<template>
	<Story
			group="components"
			title="Grids/OrigamRow"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IRowProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRowProps>({
					align: undefined,
					justify: undefined,
					density: undefined,
					direction: undefined,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row v-bind="state">
						<origam-col cols="4">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">B</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.align"     title="align"     :options="alignList"/>
				<HstSelect v-model="state.justify"   title="justify"   :options="justifyList"/>
				<HstSelect v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
				<HstSelect v-model="state.tag"       title="tag"       :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — align"
				:init-state="() => useStoryInitState<IAlignProps>({ align: 'center' })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row :align="state.align" style="min-height: 120px; background: var(--origam-color-surface-overlay, #ececec);">
						<origam-col cols="4">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell" style="padding: 32px 12px;">B (taller)</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.align" title="align" :options="alignList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — justify"
				:init-state="() => useStoryInitState<IJustifyProps>({ justify: 'space-between' })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row :justify="state.justify">
						<origam-col cols="3">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="3">
							<div class="demo-cell">B</div>
						</origam-col>
						<origam-col cols="3">
							<div class="demo-cell">C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.justify" title="justify" :options="justifyList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row :density="state.density">
						<origam-col cols="4">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">B</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — direction"
				:init-state="() => useStoryInitState<{ direction?: TFlexDirection }>({ direction: undefined })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row :direction="state.direction">
						<origam-col cols="4">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">B</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.direction"
						title="direction"
						:options="directionList"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row :tag="state.tag">
						<origam-col cols="6">
							<div class="demo-cell">A</div>
						</origam-col>
						<origam-col cols="6">
							<div class="demo-cell">B</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-container>
				<origam-row>
					<origam-col cols="6">
						<div class="demo-cell">slot child A</div>
					</origam-col>
					<origam-col cols="6">
						<div class="demo-cell">slot child B</div>
					</origam-col>
				</origam-row>
			</origam-container>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import { FLEX_DIRECTION } from '@origam/enums'
	import type {
		IAlignProps,
		IDensityProps,
		IJustifyProps,
		IOptions,
		IRowProps
	} from '@origam/interfaces'
	import type { TFlexDirection } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		alignList,
		densityList,
		justifyList,
		tagList
	} from '@stories/const'

	// Local-only list — `direction` is unique to <OrigamRow>; doesn't justify
	// promoting to /stories/const yet (only one consumer).
	const directionList: Array<IOptions<TFlexDirection>> = [
		{ label: '(none)', value: undefined },
		{ label: 'row', value: FLEX_DIRECTION.ROW },
		{ label: 'row-reverse', value: FLEX_DIRECTION.ROW_REVERSE },
		{ label: 'column', value: FLEX_DIRECTION.COLUMN },
		{ label: 'column-reverse', value: FLEX_DIRECTION.COLUMN_REVERSE },
	]
</script>

<style scoped>
	.demo-cell {
		padding: 12px;
		background: var(--origam-color-surface-default, #fff);
		border: 1px solid var(--origam-color-border-default, #e5e5e5);
		border-radius: 4px;
		text-align: center;
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamRow.md"/>
