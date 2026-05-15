<template>
	<Story
			group="components"
			title="Grid/OrigamGrid"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IGridProps>({
					columns: 4,
					rows: 'auto',
					gap: 'md',
					autoFlow: 'row',
					alignItems: 'stretch',
					justifyItems: 'stretch',
					inline: false
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="grid-playground"
				>
					<origam-grid
							v-bind="state"
							class="grid-host"
							data-cy="grid-playground-host"
					>
						<div
								v-for="n in 8"
								:key="n"
								class="cell"
								data-cy="grid-playground-cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.gap"
						title="gap"
						:options="gridGapList"
				/>
				<HstSelect
						v-model="state.autoFlow"
						title="autoFlow"
						:options="gridAutoFlowList"
				/>
				<HstSelect
						v-model="state.alignItems"
						title="alignItems"
						:options="gridPlaceItemsList"
				/>
				<HstSelect
						v-model="state.justifyItems"
						title="justifyItems"
						:options="gridPlaceItemsList"
				/>
				<HstNumber
						v-model="state.columns"
						title="columns (number)"
						:min="1"
						:max="12"
				/>
				<HstCheckbox
						v-model="state.inline"
						title="inline"
				/>
			</template>
		</Variant>

		<Variant title="Prop — columns">
			<div
					class="story-shell"
					data-cy="grid-columns"
			>
				<div class="story-col">
					<strong>number = 3 (repeat(3, 1fr))</strong>
					<origam-grid
							:columns="3"
							gap="sm"
							class="grid-host"
							data-cy="grid-columns-number-3"
					>
						<div
								v-for="n in 6"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>number = 12 (repeat(12, 1fr))</strong>
					<origam-grid
							:columns="12"
							gap="sm"
							class="grid-host"
							data-cy="grid-columns-number-12"
					>
						<div
								v-for="n in 12"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>string = '1fr 2fr 1fr'</strong>
					<origam-grid
							columns="1fr 2fr 1fr"
							gap="sm"
							class="grid-host"
							data-cy="grid-columns-string"
					>
						<div class="cell">1fr</div>
						<div class="cell">2fr</div>
						<div class="cell">1fr</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>array = ['200px', '1fr', '200px']</strong>
					<origam-grid
							:columns="['200px', '1fr', '200px']"
							gap="sm"
							class="grid-host"
							data-cy="grid-columns-array"
					>
						<div class="cell">200px</div>
						<div class="cell">1fr</div>
						<div class="cell">200px</div>
					</origam-grid>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — areas">
			<div
					class="story-shell"
					data-cy="grid-areas"
			>
				<origam-grid
						:areas="HOLY_GRAIL_AREAS"
						columns="200px 1fr 200px"
						rows="auto 1fr auto"
						gap="sm"
						class="grid-host grid-host--areas"
						data-cy="grid-areas-host"
				>
					<div
							class="cell cell--area"
							style="grid-area: header"
							data-cy="grid-areas-header"
					>
						header
					</div>
					<div
							class="cell cell--area"
							style="grid-area: sidebar"
							data-cy="grid-areas-sidebar"
					>
						sidebar
					</div>
					<div
							class="cell cell--area"
							style="grid-area: main"
							data-cy="grid-areas-main"
					>
						main
					</div>
					<div
							class="cell cell--area"
							style="grid-area: aside"
							data-cy="grid-areas-aside"
					>
						aside
					</div>
					<div
							class="cell cell--area"
							style="grid-area: footer"
							data-cy="grid-areas-footer"
					>
						footer
					</div>
				</origam-grid>
			</div>
		</Variant>

		<Variant title="Prop — gap">
			<div
					class="story-shell"
					data-cy="grid-gap"
			>
				<div
						v-for="size in gridGapSizes"
						:key="size"
						class="story-col"
				>
					<strong>gap = {{ size }}</strong>
					<origam-grid
							:columns="4"
							:gap="size"
							class="grid-host"
							:data-cy="`grid-gap-${size}`"
					>
						<div
								v-for="n in 4"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — autoFlow">
			<div
					class="story-shell"
					data-cy="grid-flow"
			>
				<div class="story-col">
					<strong>autoFlow = row</strong>
					<origam-grid
							:columns="3"
							autoFlow="row"
							gap="sm"
							class="grid-host"
							data-cy="grid-flow-row"
					>
						<div
								v-for="n in 5"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>autoFlow = column</strong>
					<origam-grid
							:rows="3"
							autoFlow="column"
							gap="sm"
							class="grid-host"
							data-cy="grid-flow-column"
					>
						<div
								v-for="n in 5"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>autoFlow = row dense</strong>
					<origam-grid
							:columns="4"
							autoFlow="row dense"
							gap="sm"
							class="grid-host"
							data-cy="grid-flow-dense"
					>
						<div
								class="cell"
								style="grid-column: span 2"
						>
							span 2
						</div>
						<div class="cell">a</div>
						<div class="cell">b</div>
						<div
								class="cell"
								style="grid-column: span 3"
						>
							span 3
						</div>
						<div class="cell">c</div>
					</origam-grid>
				</div>
			</div>
		</Variant>

		<Variant title="Sub-component — OrigamGridItem">
			<div
					class="story-shell"
					data-cy="grid-item"
			>
				<div class="story-col">
					<strong>column span (object syntax)</strong>
					<origam-grid
							:columns="6"
							gap="sm"
							class="grid-host"
							data-cy="grid-item-span-host"
					>
						<origam-grid-item
								:column="{ start: 1, end: 4 }"
								class="cell cell--span"
								data-cy="grid-item-span-1-to-4"
						>
							start: 1, end: 4
						</origam-grid-item>
						<origam-grid-item
								:column="{ start: 4, span: 3 }"
								class="cell cell--span"
								data-cy="grid-item-span-4-span-3"
						>
							start: 4, span: 3
						</origam-grid-item>
						<origam-grid-item
								:column="{ span: 2 }"
								class="cell cell--span"
								data-cy="grid-item-span-2"
						>
							span: 2
						</origam-grid-item>
						<origam-grid-item
								column="span 4"
								class="cell cell--span"
								data-cy="grid-item-span-raw"
						>
							raw: span 4
						</origam-grid-item>
					</origam-grid>
				</div>

				<div class="story-col">
					<strong>area-named (parent grid declares `areas`)</strong>
					<origam-grid
							:areas="HOLY_GRAIL_AREAS"
							columns="200px 1fr 200px"
							rows="auto 1fr auto"
							gap="sm"
							class="grid-host grid-host--areas"
							data-cy="grid-item-area-host"
					>
						<origam-grid-item
								area="header"
								class="cell cell--area"
								data-cy="grid-item-area-header"
						>
							header
						</origam-grid-item>
						<origam-grid-item
								area="sidebar"
								class="cell cell--area"
								data-cy="grid-item-area-sidebar"
						>
							sidebar
						</origam-grid-item>
						<origam-grid-item
								area="main"
								class="cell cell--area"
								data-cy="grid-item-area-main"
						>
							main
						</origam-grid-item>
						<origam-grid-item
								area="aside"
								class="cell cell--area"
								data-cy="grid-item-area-aside"
						>
							aside
						</origam-grid-item>
						<origam-grid-item
								area="footer"
								class="cell cell--area"
								data-cy="grid-item-area-footer"
						>
							footer
						</origam-grid-item>
					</origam-grid>
				</div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamGrid, OrigamGridItem } from '@origam/components'

	import { GRID_AUTO_FLOWS, GRID_GAP_SIZES, GRID_PLACE_ITEMS } from '@origam/consts'

	import type { IGridProps, IOptions } from '@origam/interfaces'

	import type { TGridAutoFlow, TGridGapSize, TGridPlaceItems } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const gridGapList: Array<IOptions<TGridGapSize>> = GRID_GAP_SIZES.map(v => ({label: v, value: v}))
	const gridAutoFlowList: Array<IOptions<TGridAutoFlow>> = GRID_AUTO_FLOWS.map(v => ({label: v, value: v}))
	const gridPlaceItemsList: Array<IOptions<TGridPlaceItems>> = GRID_PLACE_ITEMS.map(v => ({label: v, value: v}))

	const gridGapSizes: ReadonlyArray<TGridGapSize> = GRID_GAP_SIZES

	const HOLY_GRAIL_AREAS = [
		'header header header',
		'sidebar main aside',
		'footer footer footer'
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 16px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.grid-host {
		padding: 8px;
		border: 1px dashed var(--origam-color__border---subtle, rgba(0, 0, 0, 0.16));
		border-radius: 6px;
		background: var(--origam-color__surface---subtle, #f7f7f7);
	}

	.grid-host--areas {
		min-height: 240px;
	}

	.cell {
		min-height: 40px;
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 4px;
		font: 0.875rem/1 system-ui, sans-serif;
		color: var(--origam-color__text---primary, #1a1a1a);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cell--span {
		background: var(--origam-color__action--primary---bg-subtle, rgba(25, 118, 210, 0.08));
		border-color: var(--origam-color__action--primary---bg, #1976d2);
	}

	.cell--area {
		background: var(--origam-color__action--info---bg-subtle, rgba(2, 136, 209, 0.1));
		border-color: var(--origam-color__action--info---bg, #0288d1);
	}
</style>

<docs lang="md" src="@docs/components/Grid/OrigamGrid.md"/>
