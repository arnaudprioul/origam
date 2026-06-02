<template>
	<Story
			group="components"
			title="Grid/OrigamGrid"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IGridProps>>({
					columns: 4,
					rows: 'auto',
					gap: 'md',
					alignItems: 'stretch',
					justifyItems: 'stretch',
					alignContent: undefined,
					justifyContent: undefined,
					columnGap: undefined,
					rowGap: undefined,
					autoColumns: undefined,
					autoRows: undefined,
					areas: undefined,
					bgColor: undefined,
					color: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					rounded: undefined,
					elevation: undefined,
					width: undefined,
					height: undefined
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-grid
							:columns="state.columns"
							:rows="state.rows"
							:gap="state.gap"
							:column-gap="state.columnGap"
							:row-gap="state.rowGap"
							:align-items="state.alignItems"
							:justify-items="state.justifyItems"
							:align-content="state.alignContent"
							:justify-content="state.justifyContent"
							:auto-columns="state.autoColumns"
							:auto-rows="state.autoRows"
							:bg-color="state.bgColor"
							:color="state.color"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:rounded="state.rounded"
							:elevation="state.elevation"
							:width="state.width"
							:height="state.height"
							class="grid-host"
					>
						<div
								v-for="n in 8"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstNumber v-model="state.columns" title="Columns (number)" :min="1" :max="12"/>
					<HstText   v-model="state.rows"    title="Rows"/>
				</StoryGroup>
				<StoryGroup title="Gap">
					<HstSelect v-model="state.gap"       title="Gap"        :options="GRID_GAP_OPTIONS"/>
					<HstText   v-model="state.columnGap" title="Column Gap (override)"/>
					<HstText   v-model="state.rowGap"    title="Row Gap (override)"/>
				</StoryGroup>
				<StoryGroup title="Align">
					<HstSelect v-model="state.alignItems"     title="Align Items"     :options="GRID_PLACE_ITEMS_OPTIONS"/>
					<HstSelect v-model="state.justifyItems"   title="Justify Items"   :options="GRID_PLACE_ITEMS_OPTIONS"/>
					<HstSelect v-model="state.alignContent"   title="Align Content"   :options="GRID_PLACE_CONTENT_OPTIONS"/>
					<HstSelect v-model="state.justifyContent" title="Justify Content" :options="GRID_PLACE_CONTENT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Implicit Tracks">
					<HstText v-model="state.autoColumns" title="Auto Columns"/>
					<HstText v-model="state.autoRows"    title="Auto Rows"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IGridProps>>({
					autoFlow: 'row',
					inline: false,
					tag: 'div',
					columns: 4,
					gap: 'md'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-grid
							:columns="state.columns"
							:gap="state.gap"
							:auto-flow="state.autoFlow"
							:inline="state.inline"
							:tag="state.tag"
							class="grid-host"
					>
						<div
								v-for="n in 8"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Flow">
					<HstSelect v-model="state.autoFlow" title="Auto Flow" :options="GRID_AUTO_FLOW_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstCheckbox v-model="state.inline" title="Inline (inline-grid)"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-grid
						:columns="3"
						gap="sm"
						class="grid-host"
				>
					<div class="cell cell--span">First</div>
					<div class="cell cell--span">Second</div>
					<div class="cell cell--span">Third</div>
				</origam-grid>
			</div>
		</Variant>

		<!-- ════════════════ PROP VARIANTS (démonstrations) ════════════════ -->

		<Variant title="Prop — columns">
			<div class="story-shell">
				<div class="story-col">
					<p class="story-label">number = 3 (repeat(3, 1fr))</p>
					<origam-grid
							:columns="3"
							gap="sm"
							class="grid-host"
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
					<p class="story-label">number = 12 (repeat(12, 1fr))</p>
					<origam-grid
							:columns="12"
							gap="sm"
							class="grid-host"
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
					<p class="story-label">string = '1fr 2fr 1fr'</p>
					<origam-grid
							columns="1fr 2fr 1fr"
							gap="sm"
							class="grid-host"
					>
						<div class="cell">1fr</div>
						<div class="cell">2fr</div>
						<div class="cell">1fr</div>
					</origam-grid>
				</div>

				<div class="story-col">
					<p class="story-label">array = ['200px', '1fr', '200px']</p>
					<origam-grid
							:columns="['200px', '1fr', '200px']"
							gap="sm"
							class="grid-host"
					>
						<div class="cell">200px</div>
						<div class="cell">1fr</div>
						<div class="cell">200px</div>
					</origam-grid>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — areas">
			<div class="story-shell">
				<origam-grid
						:areas="HOLY_GRAIL_AREAS"
						columns="200px 1fr 200px"
						rows="auto 1fr auto"
						gap="sm"
						class="grid-host grid-host--areas"
				>
					<div
							class="cell cell--area"
							style="grid-area: header"
					>
						header
					</div>
					<div
							class="cell cell--area"
							style="grid-area: sidebar"
					>
						sidebar
					</div>
					<div
							class="cell cell--area"
							style="grid-area: main"
					>
						main
					</div>
					<div
							class="cell cell--area"
							style="grid-area: aside"
					>
						aside
					</div>
					<div
							class="cell cell--area"
							style="grid-area: footer"
					>
						footer
					</div>
				</origam-grid>
			</div>
		</Variant>

		<Variant title="Prop — gap">
			<div class="story-shell">
				<div
						v-for="size in GRID_GAP_SIZES"
						:key="size"
						class="story-col"
				>
					<p class="story-label">gap = {{ size }}</p>
					<origam-grid
							:columns="4"
							:gap="size"
							class="grid-host"
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
			<div class="story-shell">
				<div class="story-col">
					<p class="story-label">autoFlow = row</p>
					<origam-grid
							:columns="3"
							auto-flow="row"
							gap="sm"
							class="grid-host"
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
					<p class="story-label">autoFlow = column</p>
					<origam-grid
							:rows="3"
							auto-flow="column"
							gap="sm"
							class="grid-host"
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
					<p class="story-label">autoFlow = row dense</p>
					<origam-grid
							:columns="4"
							auto-flow="row dense"
							gap="sm"
							class="grid-host"
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

		<!-- ════════════════ SUB-COMPOSANT OrigamGridItem ════════════════ -->

		<Variant
				title="Sub-component — OrigamGridItem"
				:init-state="() => useStoryInitState<Partial<IGridItemProps>>({
					alignSelf: undefined,
					justifySelf: undefined
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div class="story-col">
						<p class="story-label">column span (object syntax)</p>
						<origam-grid
								:columns="6"
								gap="sm"
								class="grid-host"
						>
							<origam-grid-item
									:column="{ start: 1, end: 4 }"
									:align-self="state.alignSelf"
									:justify-self="state.justifySelf"
									class="cell cell--span"
							>
								start: 1, end: 4
							</origam-grid-item>
							<origam-grid-item
									:column="{ start: 4, span: 3 }"
									class="cell cell--span"
							>
								start: 4, span: 3
							</origam-grid-item>
							<origam-grid-item
									:column="{ span: 2 }"
									class="cell cell--span"
							>
								span: 2
							</origam-grid-item>
							<origam-grid-item
									column="span 4"
									class="cell cell--span"
							>
								raw: span 4
							</origam-grid-item>
						</origam-grid>
					</div>

					<div class="story-col">
						<p class="story-label">area-named (parent grid declares areas)</p>
						<origam-grid
								:areas="HOLY_GRAIL_AREAS"
								columns="200px 1fr 200px"
								rows="auto 1fr auto"
								gap="sm"
								class="grid-host grid-host--areas"
						>
							<origam-grid-item
									area="header"
									class="cell cell--area"
							>
								header
							</origam-grid-item>
							<origam-grid-item
									area="sidebar"
									class="cell cell--area"
							>
								sidebar
							</origam-grid-item>
							<origam-grid-item
									area="main"
									class="cell cell--area"
							>
								main
							</origam-grid-item>
							<origam-grid-item
									area="aside"
									class="cell cell--area"
							>
								aside
							</origam-grid-item>
							<origam-grid-item
									area="footer"
									class="cell cell--area"
							>
								footer
							</origam-grid-item>
						</origam-grid>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Self-alignment (first item)">
					<HstSelect v-model="state.alignSelf"   title="Align Self"   :options="GRID_PLACE_SELF_OPTIONS"/>
					<HstSelect v-model="state.justifySelf" title="Justify Self" :options="GRID_PLACE_SELF_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IGridProps>>({
					columns: 4,
					rows: 'auto',
					gap: 'md',
					autoFlow: 'row',
					alignItems: 'stretch',
					justifyItems: 'stretch',
					inline: false,
					tag: 'div',
					bgColor: undefined,
					color: undefined,
					rounded: undefined,
					elevation: undefined
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-grid
							v-bind="state"
							class="grid-host"
					>
						<div
								v-for="n in 8"
								:key="n"
								class="cell"
						>
							{{ n }}
						</div>
					</origam-grid>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstNumber   v-model="state.columns"   title="Columns (number)" :min="1" :max="12"/>
					<HstText     v-model="state.rows"      title="Rows"/>
					<HstSelect   v-model="state.autoFlow"  title="Auto Flow"        :options="GRID_AUTO_FLOW_OPTIONS"/>
					<HstCheckbox v-model="state.inline"    title="Inline (inline-grid)"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.gap"          title="Gap"           :options="GRID_GAP_OPTIONS"/>
					<HstSelect v-model="state.alignItems"   title="Align Items"   :options="GRID_PLACE_ITEMS_OPTIONS"/>
					<HstSelect v-model="state.justifyItems" title="Justify Items" :options="GRID_PLACE_ITEMS_OPTIONS"/>
					<HstSelect v-model="state.rounded"      title="Rounded"       :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation"    title="Elevation"     :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.bgColor"      title="Bg Color"      :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.color"        title="Color"         :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamGrid, OrigamGridItem } from '@origam/components'

	import { GRID_AUTO_FLOWS, GRID_GAP_SIZES, GRID_PLACE_CONTENT, GRID_PLACE_ITEMS, GRID_PLACE_SELF } from '@origam/consts'

	import type { IGridItemProps, IGridProps, IOptions } from '@origam/interfaces'

	import type { TGridAutoFlow, TGridGapSize, TGridPlaceContent, TGridPlaceItems, TGridPlaceSelf } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const GRID_GAP_OPTIONS: Array<IOptions<TGridGapSize>> = GRID_GAP_SIZES.map(v => ({ label: v, value: v }))

	const GRID_AUTO_FLOW_OPTIONS: Array<IOptions<TGridAutoFlow>> = GRID_AUTO_FLOWS.map(v => ({ label: v, value: v }))

	const GRID_PLACE_ITEMS_OPTIONS: Array<IOptions<TGridPlaceItems>> = GRID_PLACE_ITEMS.map(v => ({ label: v, value: v }))

	const GRID_PLACE_CONTENT_OPTIONS: Array<IOptions<TGridPlaceContent | undefined>> = [
		{ label: '(none)', value: undefined },
		...GRID_PLACE_CONTENT.map(v => ({ label: v, value: v as TGridPlaceContent }))
	]

	const GRID_PLACE_SELF_OPTIONS: Array<IOptions<TGridPlaceSelf | undefined>> = [
		{ label: '(none)', value: undefined },
		...GRID_PLACE_SELF.map(v => ({ label: v, value: v as TGridPlaceSelf }))
	]

	const HOLY_GRAIL_AREAS: ReadonlyArray<string> = [
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

	.story-label {
		margin: 0;
		font: 0.8125rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #666);
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
