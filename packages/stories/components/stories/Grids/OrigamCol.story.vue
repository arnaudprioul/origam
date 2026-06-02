<template>
	<Story
			group="components"
			title="Grids/OrigamCol"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IColProps>>({
					cols: '6',
					color: undefined,
					bgColor: undefined,
					border: false,
					borderColor: undefined,
					borderStyle: undefined,
					padding: undefined,
					margin: undefined,
					align: undefined,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col
								:cols="state.cols"
								:color="state.color"
								:bg-color="state.bgColor"
								:border="state.border"
								:border-color="state.borderColor"
								:border-style="state.borderStyle"
								:padding="state.padding"
								:margin="state.margin"
								:align="state.align"
								:tag="state.tag"
						>
							<div class="demo-cell">col A</div>
						</origam-col>
						<origam-col
								:cols="state.cols"
								:color="state.color"
								:bg-color="state.bgColor"
								:border="state.border"
								:border-color="state.borderColor"
								:border-style="state.borderStyle"
								:padding="state.padding"
								:margin="state.margin"
								:align="state.align"
								:tag="state.tag"
						>
							<div class="demo-cell">col B</div>
						</origam-col>
						<origam-col
								:cols="state.cols"
								:color="state.color"
								:bg-color="state.bgColor"
								:border="state.border"
								:border-color="state.borderColor"
								:border-style="state.borderStyle"
								:padding="state.padding"
								:margin="state.margin"
								:align="state.align"
								:tag="state.tag"
						>
							<div class="demo-cell">col C</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstSelect v-model="state.cols" title="Cols" :options="COLS_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
				<StoryGroup title="Align">
					<HstSelect v-model="state.align" title="Align (self)" :options="ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════ PROP — cols ════════════════════ -->

		<Variant
				title="Prop — cols"
				:init-state="() => useStoryInitState<{ cols?: TCols }>({ cols: '6' })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col
								v-for="n in (Number(state.cols) > 0 ? Math.floor(12 / Number(state.cols)) : 3)"
								:key="n"
								:cols="state.cols"
						>
							<div class="demo-cell">cols={{ state.cols }} ({{ n }})</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstSelect v-model="state.cols" title="Cols" :options="COLS_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════ PROP — breakpoints ════════════════ -->

		<Variant
				title="Prop — sm, md, lg (breakpoints)"
				:init-state="() => useStoryInitState<{
					cols?: TCols
					sm?: TCols
					md?: TCols
					lg?: TCols
					xl?: TCols
					xxl?: TCols
				}>({ cols: '12', sm: '6', md: '4', lg: '3' })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col
								:cols="state.cols"
								:sm="state.sm"
								:md="state.md"
								:lg="state.lg"
								:xl="state.xl"
								:xxl="state.xxl"
						>
							<div class="demo-cell">card</div>
						</origam-col>
						<origam-col
								:cols="state.cols"
								:sm="state.sm"
								:md="state.md"
								:lg="state.lg"
								:xl="state.xl"
								:xxl="state.xxl"
						>
							<div class="demo-cell">card</div>
						</origam-col>
						<origam-col
								:cols="state.cols"
								:sm="state.sm"
								:md="state.md"
								:lg="state.lg"
								:xl="state.xl"
								:xxl="state.xxl"
						>
							<div class="demo-cell">card</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstSelect v-model="state.cols" title="Cols (default)" :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.sm"   title="sm (≥600px)"   :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.md"   title="md (≥960px)"   :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.lg"   title="lg (≥1280px)"  :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.xl"   title="xl (≥1920px)"  :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.xxl"  title="xxl (≥2560px)" :options="COLS_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════ PROP — offset ═════════════════ -->

		<Variant
				title="Prop — offset"
				:init-state="() => useStoryInitState<{ cols?: TCols; offset?: Omit<TCols, '12'> }>({ cols: '4', offset: '2' as Omit<TCols, '12'> })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col :cols="state.cols" :offset="state.offset">
							<div class="demo-cell">offset={{ state.offset ?? '(unset)' }}</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstSelect v-model="state.cols"   title="Cols"   :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.offset" title="Offset" :options="COLS_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════ PROP — order ══════════════════ -->

		<Variant
				title="Prop — order"
				:init-state="() => useStoryInitState<{ orderA?: number; orderB?: number }>({ orderA: 2, orderB: 1 })"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col cols="6" :order="state.orderA">
							<div class="demo-cell">A (order={{ state.orderA }})</div>
						</origam-col>
						<origam-col cols="6" :order="state.orderB">
							<div class="demo-cell">B (order={{ state.orderB }})</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstNumber v-model="state.orderA" title="Order A" :min="0" :max="12" :step="1"/>
					<HstNumber v-model="state.orderB" title="Order B" :min="0" :max="12" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════ PROP — align ══════════════════ -->

		<Variant
				title="Prop — align"
				:init-state="() => useStoryInitState<IAlignProps>({})"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row align="start" style="min-height: 120px; background: var(--origam-color__surface---overlay, #ececec);">
						<origam-col cols="4">
							<div class="demo-cell">parent (align=start)</div>
						</origam-col>
						<origam-col cols="4" :align="state.align">
							<div class="demo-cell">align={{ state.align ?? '(unset)' }}</div>
						</origam-col>
						<origam-col cols="4">
							<div class="demo-cell">parent</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Align">
					<HstSelect v-model="state.align" title="Align (self)" :options="ALIGN_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-container>
				<origam-row>
					<origam-col cols="6">
						<div class="demo-cell">
							<strong>Custom default slot</strong>
							<p>Anything goes here.</p>
						</div>
					</origam-col>
				</origam-row>
			</origam-container>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IColProps>>({
					cols: '6',
					sm: undefined,
					md: undefined,
					lg: undefined,
					xl: undefined,
					xxl: undefined,
					offset: undefined,
					order: undefined,
					color: undefined,
					bgColor: undefined,
					align: undefined,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-container>
					<origam-row>
						<origam-col v-bind="state">
							<div class="demo-cell">card</div>
						</origam-col>
						<origam-col v-bind="state">
							<div class="demo-cell">card</div>
						</origam-col>
						<origam-col v-bind="state">
							<div class="demo-cell">card</div>
						</origam-col>
						<origam-col v-bind="state">
							<div class="demo-cell">card</div>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Grid">
					<HstSelect v-model="state.cols"   title="Cols (default)"  :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.sm"     title="sm (≥600px)"     :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.md"     title="md (≥960px)"     :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.lg"     title="lg (≥1280px)"    :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.xl"     title="xl (≥1920px)"    :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.xxl"    title="xxl (≥2560px)"   :options="COLS_OPTIONS"/>
					<HstSelect v-model="state.offset" title="Offset"          :options="COLS_OPTIONS"/>
					<HstNumber v-model="state.order"  title="Order" :min="0" :max="12" :step="1"/>
					<HstSelect v-model="state.align"  title="Align (self)"    :options="ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
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
	import { OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import type { IAlignProps, IColProps } from '@origam/interfaces'
	import type { TCols } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ALIGN_OPTIONS,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		COLS_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>

<style scoped>
	.demo-cell {
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
		border: 1px solid var(--origam-color__border---default, #e5e5e5);
		border-radius: 4px;
		text-align: center;
		color: var(--origam-color__text---onColor, #000);
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamCol.md"/>
