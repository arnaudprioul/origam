<template>
	<Story
			group="components"
			title="Chart/OrigamChartCandlestick"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: false,
					showTooltip: true,
					showGrid: true,
					showAxis: true,
					legendPosition: 'bottom',
					bullishColor: 'success',
					bearishColor: 'danger',
					candleWidth: 0.6,
					wickWidth: 1
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="candlestick-playground"
				>
					<origam-chart-candlestick
							:series="FIXTURE_AAPL"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-grid="Boolean(state.showGrid)"
							:show-axis="Boolean(state.showAxis)"
							:legend-position="state.legendPosition"
							:bullish-color="state.bullishColor"
							:bearish-color="state.bearishColor"
							:candle-width="Number(state.candleWidth)"
							:wick-width="Number(state.wickWidth)"
							title="AAPL — 14 trading days"
							subtitle="Prices in USD"
							data-cy="candlestick-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="candlestick-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstText
						v-model="state.bullishColor"
						title="bullishColor"
				/>
				<HstText
						v-model="state.bearishColor"
						title="bearishColor"
				/>
				<HstNumber
						v-model="state.candleWidth"
						title="candleWidth [0..1]"
				/>
				<HstNumber
						v-model="state.wickWidth"
						title="wickWidth (px)"
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
						v-model="state.showGrid"
						title="showGrid"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
			</template>
		</Variant>

		<Variant title="Prop — bullishColor / bearishColor (DS intents vs custom hex)">
			<div
					class="story-shell"
					data-cy="candlestick-colors"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>DS intents: success / danger (default)</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								bullish-color="success"
								bearish-color="danger"
								:show-axis="false"
								title="AAPL — intents"
								data-cy="candlestick-color-intents"
						/>
					</div>
					<div class="story-col">
						<strong>Custom hex: #22d3ee / #f43f5e</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								bullish-color="#22d3ee"
								bearish-color="#f43f5e"
								:show-axis="false"
								title="AAPL — custom hex"
								data-cy="candlestick-color-hex"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — candleWidth (slim 0.3 vs wide 0.9)">
			<div
					class="story-shell"
					data-cy="candlestick-candle-width"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>slim (0.3)</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								:candle-width="0.3"
								title="candleWidth = 0.3"
								data-cy="candlestick-width-slim"
						/>
					</div>
					<div class="story-col">
						<strong>wide (0.9)</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								:candle-width="0.9"
								title="candleWidth = 0.9"
								data-cy="candlestick-width-wide"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — wickWidth (thin 0.5 vs thick 2)">
			<div
					class="story-shell"
					data-cy="candlestick-wick-width"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>thin (0.5)</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								:wick-width="0.5"
								title="wickWidth = 0.5"
								data-cy="candlestick-wick-thin"
						/>
					</div>
					<div class="story-col">
						<strong>thick (2)</strong>
						<origam-chart-candlestick
								:series="FIXTURE_AAPL"
								:height="300"
								:wick-width="2"
								title="wickWidth = 2"
								data-cy="candlestick-wick-thick"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="candlestick-slot-tooltip"
			>
				<origam-chart-candlestick
						:series="FIXTURE_BTC"
						:height="360"
						title="BTC/USD — custom tooltip"
						data-cy="candlestick-slot-tooltip-chart"
				>
					<template #tooltip="{ datum, change, changePct, isBullish }">
						<div
								class="custom-tooltip"
								:style="{ borderLeftColor: isBullish ? '#22c55e' : '#ef4444' }"
						>
							<strong>{{ datum?.date }}</strong>
							<span>O: ${{ datum?.open?.toLocaleString() }}</span>
							<span>H: ${{ datum?.high?.toLocaleString() }}</span>
							<span>L: ${{ datum?.low?.toLocaleString() }}</span>
							<span>C: ${{ datum?.close?.toLocaleString() }}</span>
							<span :style="{ color: isBullish ? '#22c55e' : '#ef4444' }">
								{{ isBullish ? '+' : '' }}{{ change?.toFixed(0) }} ({{ changePct?.toFixed(2) }}%)
							</span>
						</div>
					</template>
				</origam-chart-candlestick>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="candlestick-slot-empty"
			>
				<origam-chart-candlestick
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="candlestick-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No market data</strong>
							<span>Connect a data source to view the candlestick chart.</span>
						</div>
					</template>
				</origam-chart-candlestick>
			</div>
		</Variant>

		<Variant title="Emit — point-click on candle">
			<div
					class="story-shell"
					data-cy="candlestick-emit"
			>
				<origam-chart-candlestick
						:series="FIXTURE_AAPL"
						:height="360"
						title="Click a candle"
						data-cy="candlestick-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="candlestick-emit-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamChartCandlestick } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_AAPL: Array<IChartSeries> = [
		{
			name: 'AAPL',
			data: [
				{ date: 'May 1', open: 150.20, high: 153.80, low: 149.50, close: 152.90 },
				{ date: 'May 2', open: 152.90, high: 155.40, low: 151.20, close: 151.60 },
				{ date: 'May 5', open: 151.60, high: 154.20, low: 150.80, close: 153.70 },
				{ date: 'May 6', open: 153.70, high: 157.30, low: 153.10, close: 156.80 },
				{ date: 'May 7', open: 156.80, high: 158.90, low: 154.60, close: 155.20 },
				{ date: 'May 8', open: 155.20, high: 157.00, low: 153.40, close: 154.10 },
				{ date: 'May 9', open: 154.10, high: 156.50, low: 152.70, close: 155.90 },
				{ date: 'May 12', open: 155.90, high: 159.80, low: 155.30, close: 158.40 },
				{ date: 'May 13', open: 158.40, high: 161.20, low: 157.90, close: 160.10 },
				{ date: 'May 14', open: 160.10, high: 162.50, low: 158.60, close: 159.30 },
				{ date: 'May 15', open: 159.30, high: 162.00, low: 158.00, close: 161.70 },
				{ date: 'May 16', open: 161.70, high: 164.30, low: 160.40, close: 163.50 },
				{ date: 'May 19', open: 163.50, high: 166.20, low: 162.10, close: 162.80 },
				{ date: 'May 20', open: 162.80, high: 165.40, low: 161.90, close: 164.90 }
			] as any
		}
	]

	const FIXTURE_BTC: Array<IChartSeries> = [
		{
			name: 'BTC/USD',
			data: [
				{ date: 'Apr 1', open: 45000, high: 46800, low: 44200, close: 46200 },
				{ date: 'Apr 2', open: 46200, high: 48100, low: 45500, close: 47500 },
				{ date: 'Apr 3', open: 47500, high: 49300, low: 46100, close: 45800 },
				{ date: 'Apr 4', open: 45800, high: 47600, low: 44800, close: 46900 },
				{ date: 'Apr 5', open: 46900, high: 50200, low: 46400, close: 49800 },
				{ date: 'Apr 6', open: 49800, high: 51500, low: 48200, close: 48600 },
				{ date: 'Apr 7', open: 48600, high: 50800, low: 47300, close: 50100 },
				{ date: 'Apr 8', open: 50100, high: 52600, low: 49500, close: 51800 },
				{ date: 'Apr 9', open: 51800, high: 53200, low: 49800, close: 50200 },
				{ date: 'Apr 10', open: 50200, high: 52000, low: 48600, close: 51500 },
				{ date: 'Apr 11', open: 51500, high: 54800, low: 50900, close: 54200 },
				{ date: 'Apr 12', open: 54200, high: 56100, low: 52800, close: 53400 },
				{ date: 'Apr 13', open: 53400, high: 55600, low: 52100, close: 54900 },
				{ date: 'Apr 14', open: 54900, high: 57200, low: 54100, close: 56800 },
				{ date: 'Apr 15', open: 56800, high: 58400, low: 55200, close: 55600 },
				{ date: 'Apr 16', open: 55600, high: 57900, low: 54300, close: 57100 },
				{ date: 'Apr 17', open: 57100, high: 59800, low: 56400, close: 59200 },
				{ date: 'Apr 18', open: 59200, high: 61500, low: 57800, close: 58400 },
				{ date: 'Apr 19', open: 58400, high: 60200, low: 56800, close: 59700 },
				{ date: 'Apr 20', open: 59700, high: 62300, low: 58900, close: 61800 },
				{ date: 'Apr 21', open: 61800, high: 63500, low: 60200, close: 60600 },
				{ date: 'Apr 22', open: 60600, high: 62800, low: 59400, close: 62100 },
				{ date: 'Apr 23', open: 62100, high: 64200, low: 61300, close: 63500 },
				{ date: 'Apr 24', open: 63500, high: 65800, low: 62400, close: 64900 },
				{ date: 'Apr 25', open: 64900, high: 67200, low: 63800, close: 63200 },
				{ date: 'Apr 26', open: 63200, high: 65500, low: 62000, close: 64600 },
				{ date: 'Apr 27', open: 64600, high: 66900, low: 63700, close: 66200 },
				{ date: 'Apr 28', open: 66200, high: 68500, low: 65100, close: 65400 },
				{ date: 'Apr 29', open: 65400, high: 67800, low: 64300, close: 67000 },
				{ date: 'Apr 30', open: 67000, high: 69400, low: 66200, close: 52000 }
			] as any
		}
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → date="${ point.x }" close=${ point.y }`)
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
		gap: 2px;
		padding: 4px 8px;
		border-left: 3px solid transparent;
		font-size: 0.8125rem;
	}

	.custom-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		color: var(--origam-color-text-secondary, #6b7280);
	}

	.custom-empty strong {
		font-size: 1rem;
		color: var(--origam-color-text-primary, #111827);
	}
</style>
