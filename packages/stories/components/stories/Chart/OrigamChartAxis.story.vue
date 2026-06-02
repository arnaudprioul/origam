<template>
	<Story
			group="components"
			title="Chart/OrigamChartAxis"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IChartAxisProps>>({
					showAxis: true,
					showGrid: true
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<svg
							viewBox="0 0 600 360"
							class="story-svg"
							aria-label="Axis design preview"
							data-cy="axis-design-svg"
					>
						<origam-chart-axis
								:plot="PLOT_DEFAULT"
								:ticks="ticksFor(5)"
								:show-axis="state.showAxis"
								:show-grid="state.showGrid"
						/>
					</svg>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Axis Visibility">
					<HstCheckbox v-model="state.showAxis" title="Show Axis"/>
					<HstCheckbox v-model="state.showGrid" title="Show Grid"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ FONCTIONNEL ════════════════════════ -->

		<Variant title="Prop — ticks (5 / 10 / 20 ticks per axis)">
			<div
					class="story-shell"
					data-cy="axis-tick-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>5 Y-ticks</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="5 ticks axis"
								data-cy="axis-ticks-5"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="true"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>10 Y-ticks</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="10 ticks axis"
								data-cy="axis-ticks-10"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(10)"
									:show-axis="true"
									:show-grid="true"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>20 Y-ticks</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="20 ticks axis"
								data-cy="axis-ticks-20"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(20)"
									:show-axis="true"
									:show-grid="true"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — xAxisFormat (date / number / category)">
			<div
					class="story-shell"
					data-cy="axis-format-x"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>date format</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Date formatted X axis"
								data-cy="axis-formatx-date"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="TICKS_DATE_X"
									:show-axis="true"
									:show-grid="false"
									:x-axis-format="formatDate"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>number format</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Number formatted X axis"
								data-cy="axis-formatx-number"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="TICKS_NUMBER_X"
									:show-axis="true"
									:show-grid="false"
									:x-axis-format="formatNumber"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>category label</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Category label X axis"
								data-cy="axis-formatx-category"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="TICKS_CATEGORY_X"
									:show-axis="true"
									:show-grid="false"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — yAxisFormat (currency / percent / SI)">
			<div
					class="story-shell"
					data-cy="axis-format-y"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>currency ($)</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Currency Y axis"
								data-cy="axis-formaty-currency"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="true"
									:y-axis-format="formatCurrency"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>percent (%)</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Percent Y axis"
								data-cy="axis-formaty-percent"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="true"
									:y-axis-format="formatPercent"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>SI prefix (k / M)</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="SI prefix Y axis"
								data-cy="axis-formaty-si"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksForSI(5)"
									:show-axis="true"
									:show-grid="true"
									:y-axis-format="formatSI"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showGrid (true / false)">
			<div
					class="story-shell"
					data-cy="axis-show-grid"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showGrid = true</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Grid visible"
								data-cy="axis-grid-on"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="true"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>showGrid = false</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="Grid hidden"
								data-cy="axis-grid-off"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="false"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — secondaryYTicks (dual-axis)">
			<div
					class="story-shell"
					data-cy="axis-secondary-y"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>without secondary Y</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="No secondary Y axis"
								data-cy="axis-secondary-off"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:show-axis="true"
									:show-grid="true"
							/>
						</svg>
					</div>
					<div class="story-col">
						<strong>with secondary Y (right axis)</strong>
						<svg
								viewBox="0 0 600 360"
								class="story-svg"
								aria-label="With secondary Y axis"
								data-cy="axis-secondary-on"
						>
							<origam-chart-axis
									:plot="PLOT_DEFAULT"
									:ticks="ticksFor(5)"
									:secondary-y-ticks="secondaryYTicksFor(5)"
									:show-axis="true"
									:show-grid="true"
									:secondary-y-axis-format="formatCurrency"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IChartAxisProps>>({
					showAxis: true,
					showGrid: true
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<svg
							viewBox="0 0 600 360"
							class="story-svg"
							aria-label="Axis playground"
							data-cy="axis-playground-svg"
					>
						<origam-chart-axis
								:plot="PLOT_DEFAULT"
								:ticks="ticksFor(5)"
								:show-axis="state.showAxis"
								:show-grid="state.showGrid"
						/>
					</svg>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Visibility">
					<HstCheckbox v-model="state.showAxis" title="Show Axis"/>
					<HstCheckbox v-model="state.showGrid" title="Show Grid"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamChartAxis } from '@origam/components'
	import type { IChartAxisProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const PLOT_DEFAULT = {
		x0: 48,
		y0: 24,
		x1: 576,
		y1: 324,
		cx: 312,
		cy: 174
	}

	const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const ticksFor = (count: number) => {
		const step = (PLOT_DEFAULT.y1 - PLOT_DEFAULT.y0) / (count - 1)
		const valueStep = 100 / (count - 1)
		const y = Array.from({ length: count }, (_, i) => ({
			position: PLOT_DEFAULT.y1 - i * step,
			value: Math.round(i * valueStep)
		}))
		const xCount = 12
		const xStep = (PLOT_DEFAULT.x1 - PLOT_DEFAULT.x0) / (xCount - 1)
		const x = MONTH_LABELS.map((label, i) => ({
			position: PLOT_DEFAULT.x0 + i * xStep,
			value: label
		}))
		return { x, y }
	}

	const ticksForSI = (count: number) => {
		const step = (PLOT_DEFAULT.y1 - PLOT_DEFAULT.y0) / (count - 1)
		const y = Array.from({ length: count }, (_, i) => ({
			position: PLOT_DEFAULT.y1 - i * step,
			value: i * 250000
		}))
		const xCount = 12
		const xStep = (PLOT_DEFAULT.x1 - PLOT_DEFAULT.x0) / (xCount - 1)
		const x = MONTH_LABELS.map((label, i) => ({
			position: PLOT_DEFAULT.x0 + i * xStep,
			value: label
		}))
		return { x, y }
	}

	const secondaryYTicksFor = (count: number) => {
		const step = (PLOT_DEFAULT.y1 - PLOT_DEFAULT.y0) / (count - 1)
		return Array.from({ length: count }, (_, i) => ({
			position: PLOT_DEFAULT.y1 - i * step,
			value: i * 500
		}))
	}

	const DATES = ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5']
	const TICKS_DATE_X = {
		x: DATES.map((d, i) => ({
			position: PLOT_DEFAULT.x0 + i * ((PLOT_DEFAULT.x1 - PLOT_DEFAULT.x0) / (DATES.length - 1)),
			value: d
		})),
		y: ticksFor(5).y
	}

	const NUMBERS = [0, 20, 40, 60, 80, 100]
	const TICKS_NUMBER_X = {
		x: NUMBERS.map((n, i) => ({
			position: PLOT_DEFAULT.x0 + i * ((PLOT_DEFAULT.x1 - PLOT_DEFAULT.x0) / (NUMBERS.length - 1)),
			value: n
		})),
		y: ticksFor(5).y
	}

	const CATEGORIES = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']
	const TICKS_CATEGORY_X = {
		x: CATEGORIES.map((c, i) => ({
			position: PLOT_DEFAULT.x0 + i * ((PLOT_DEFAULT.x1 - PLOT_DEFAULT.x0) / (CATEGORIES.length - 1)),
			value: c
		})),
		y: ticksFor(5).y
	}

	const formatDate = (value: string | number) => String(value)
	const formatNumber = (value: string | number) => String(value)
	const formatCurrency = (value: number) => `$${value}`
	const formatPercent = (value: number) => `${value}%`
	const formatSI = (value: number) => {
		if (value >= 1_000_000) return `${value / 1_000_000}M`
		if (value >= 1_000) return `${value / 1_000}k`
		return String(value)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
	}

	.story-grid {
		display: grid;
		gap: 16px;
	}

	.story-grid--2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.story-grid--3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.story-col strong {
		font-size: 0.8125rem;
		color: var(--origam-color-text-secondary, #6b7280);
	}

	.story-svg {
		width: 100%;
		height: auto;
		border: 1px solid var(--origam-color-border-subtle, #e5e7eb);
		border-radius: 6px;
		background-color: var(--origam-color-surface-default, #ffffff);
	}
</style>

<docs
		lang="md"
		src="@docs/components/Chart/OrigamChartAxis.md"
/>
