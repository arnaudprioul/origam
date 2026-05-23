<template>
	<Story
			group="components"
			title="Chart/OrigamChartBullet"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					orientation: 'horizontal',
					height: 280,
					animated: true,
					showLegend: false,
					showTooltip: true,
					showAxis: true,
					legendPosition: 'bottom',
					barThickness: 0.45
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="bullet-playground"
				>
					<origam-chart-bullet
							:orientation="state.orientation"
							:series="FIXTURE_SALES"
							:categories="FIXTURE_SALES_CATEGORIES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-axis="Boolean(state.showAxis)"
							:legend-position="state.legendPosition"
							:bar-thickness="Number(state.barThickness)"
							title="Sales Targets Q1 2026"
							subtitle="Actual vs target with qualitative ranges"
							data-cy="bullet-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="bullet-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.orientation"
						title="orientation"
						:options="ORIENTATION_OPTIONS"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.barThickness"
						title="barThickness (0–1)"
				/>
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="LEGEND_POSITION_OPTIONS"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
				<HstCheckbox
						v-model="state.showLegend"
						title="showLegend"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
			</template>
		</Variant>

		<Variant title="Prop — orientation (horizontal vs vertical)">
			<div
					class="story-shell"
					data-cy="bullet-orientation"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>horizontal (default)</strong>
						<origam-chart-bullet
								orientation="horizontal"
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="260"
								title="Horizontal"
								data-cy="bullet-orientation-horizontal"
						/>
					</div>
					<div class="story-col">
						<strong>vertical</strong>
						<origam-chart-bullet
								orientation="vertical"
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								title="Vertical"
								data-cy="bullet-orientation-vertical"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — barThickness (slim vs thick)">
			<div
					class="story-shell"
					data-cy="bullet-bar-thickness"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>slim (0.25)</strong>
						<origam-chart-bullet
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:bar-thickness="0.25"
								:height="200"
								title="Slim bar"
								data-cy="bullet-thickness-slim"
						/>
					</div>
					<div class="story-col">
						<strong>thick (0.70)</strong>
						<origam-chart-bullet
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:bar-thickness="0.7"
								:height="200"
								title="Thick bar"
								data-cy="bullet-thickness-thick"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — rangeColors (DS intents vs custom palette)">
			<div
					class="story-shell"
					data-cy="bullet-range-colors"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>DS intents (danger / warning / success)</strong>
						<origam-chart-bullet
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:range-colors="['danger', 'warning', 'success']"
								:height="220"
								title="Intent palette"
								data-cy="bullet-range-intent"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS palette</strong>
						<origam-chart-bullet
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:range-colors="['#c7d2fe', '#818cf8', '#4338ca']"
								:height="220"
								title="Custom palette"
								data-cy="bullet-range-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="bullet-slot-tooltip"
			>
				<origam-chart-bullet
						:series="FIXTURE_SALES"
						:categories="FIXTURE_SALES_CATEGORIES"
						:height="260"
						title="Custom tooltip with delta %"
						data-cy="bullet-slot-tooltip-chart"
				>
					<template #tooltip="{ category, bullet, delta }">
						<div class="custom-tooltip">
							<strong class="custom-tooltip__title">{{ category }}</strong>
							<div class="custom-tooltip__row">
								<span>Value</span>
								<span class="custom-tooltip__value">{{ bullet?.datum?.value }}</span>
							</div>
							<div class="custom-tooltip__row">
								<span>Target</span>
								<span class="custom-tooltip__value">{{ bullet?.datum?.target }}</span>
							</div>
							<div class="custom-tooltip__row custom-tooltip__row--delta">
								<span>Achievement</span>
								<span
										class="custom-tooltip__value"
										:class="{ 'custom-tooltip__value--ok': delta >= 100, 'custom-tooltip__value--warn': delta < 100 }"
								>{{ delta }}%</span>
							</div>
						</div>
					</template>
				</origam-chart-bullet>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="bullet-slot-empty"
			>
				<origam-chart-bullet
						:series="[]"
						:categories="[]"
						:height="260"
						title="Empty state"
						data-cy="bullet-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No KPI data available for this period.
						</div>
					</template>
				</origam-chart-bullet>
			</div>
		</Variant>

		<Variant title="Emit — point-click on bullet">
			<div
					class="story-shell"
					data-cy="bullet-emit"
			>
				<origam-chart-bullet
						:series="FIXTURE_SALES"
						:categories="FIXTURE_SALES_CATEGORIES"
						:height="260"
						title="Click or press Enter / Space on a bar"
						data-cy="bullet-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="bullet-emit-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — 5 KPI performance metrics">
			<div
					class="story-shell"
					data-cy="bullet-performance"
			>
				<origam-chart-bullet
						:series="FIXTURE_PERFORMANCE"
						:categories="FIXTURE_PERFORMANCE_CATEGORIES"
						:height="340"
						title="Performance Metrics"
						subtitle="5 KPIs — Q1 2026"
						data-cy="bullet-performance-chart"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamChartBullet } from '@origam/components'

	import type { IChartBulletDatum, IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const ORIENTATION_OPTIONS = [
		{ value: 'horizontal', label: 'horizontal' },
		{ value: 'vertical', label: 'vertical' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_SALES_CATEGORIES = ['Revenue', 'Profit Margin', 'Customer Satisfaction']

	const FIXTURE_SALES: Array<IChartSeries> = [
		{
			name: 'Revenue',
			data: [{ value: 420, target: 500, ranges: [{ to: 200 }, { to: 350 }, { to: 600 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'Profit Margin',
			data: [{ value: 28, target: 35, ranges: [{ to: 15 }, { to: 25 }, { to: 40 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'Customer Satisfaction',
			data: [{ value: 4.3, target: 4.5, ranges: [{ to: 3 }, { to: 4 }, { to: 5 }] } as unknown as IChartBulletDatum]
		}
	]

	const FIXTURE_PERFORMANCE_CATEGORIES = ['NPS', 'Churn Rate', 'ARPU', 'CAC', 'LTV']

	const FIXTURE_PERFORMANCE: Array<IChartSeries> = [
		{
			name: 'NPS',
			data: [{ value: 42, target: 50, ranges: [{ to: 20 }, { to: 40 }, { to: 70 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'Churn Rate',
			data: [{ value: 3.2, target: 2.5, ranges: [{ to: 4 }, { to: 3 }, { to: 2 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'ARPU',
			data: [{ value: 85, target: 100, ranges: [{ to: 50 }, { to: 80 }, { to: 120 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'CAC',
			data: [{ value: 320, target: 280, ranges: [{ to: 400 }, { to: 320 }, { to: 250 }] } as unknown as IChartBulletDatum]
		},
		{
			name: 'LTV',
			data: [{ value: 1240, target: 1500, ranges: [{ to: 800 }, { to: 1200 }, { to: 2000 }] } as unknown as IChartBulletDatum]
		}
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → x="${ point.x }" y=${ point.y }`)
	}

	const onLegendClick = (series: IChartSeries, index: number) => {
		appendLog(`legend-click → ${ series.name } (index ${ index })`)
	}

	const onSeriesToggle = (series: IChartSeries, visible: boolean) => {
		appendLog(`series-toggle → ${ series.name } now ${ visible ? 'visible' : 'hidden' }`)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
	}

	.story-log {
		font-size: 0.75rem;
		color: var(--origam-color-text-secondary, #6b7280);
		min-height: 80px;
		border: 1px solid var(--origam-color-border-subtle, #e5e7eb);
		border-radius: 4px;
		padding: 8px;
		white-space: pre-wrap;
	}

	.story-grid {
		display: grid;
		gap: 16px;
	}

	.story-grid--2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
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

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px;
		min-width: 160px;
	}

	.custom-tooltip__title {
		font-size: 0.875rem;
		margin-bottom: 2px;
	}

	.custom-tooltip__row {
		display: flex;
		justify-content: space-between;
		font-size: 0.8125rem;
	}

	.custom-tooltip__row--delta {
		margin-top: 2px;
		padding-top: 4px;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	.custom-tooltip__value {
		font-weight: 600;
	}

	.custom-tooltip__value--ok {
		color: #4ade80;
	}

	.custom-tooltip__value--warn {
		color: #facc15;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
