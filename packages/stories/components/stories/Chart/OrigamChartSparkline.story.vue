<template>
	<Story
			group="components"
			title="Chart/OrigamChartSparkline"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					type: 'line',
					color: 'primary',
					lineWidth: 1.5,
					showMarkers: false,
					showMin: false,
					showMax: false,
					showLast: true,
					markerSize: 2.5,
					showTooltip: false,
					width: 120,
					height: 30
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="sparkline-playground"
				>
					<origam-chart-sparkline
							:type="state.type"
							:series="FIXTURE_SALES"
							:color="state.color"
							:line-width="Number(state.lineWidth)"
							:show-markers="Boolean(state.showMarkers)"
							:show-min="Boolean(state.showMin)"
							:show-max="Boolean(state.showMax)"
							:show-last="Boolean(state.showLast)"
							:marker-size="Number(state.markerSize)"
							:show-tooltip="Boolean(state.showTooltip)"
							:width="Number(state.width)"
							:height="Number(state.height)"
							data-cy="sparkline-playground-chart"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.type"
						title="type"
						:options="TYPE_OPTIONS"
				/>
				<HstSelect
						v-model="state.color"
						title="color"
						:options="COLOR_OPTIONS"
				/>
				<HstNumber
						v-model="state.lineWidth"
						title="lineWidth"
				/>
				<HstNumber
						v-model="state.markerSize"
						title="markerSize"
				/>
				<HstNumber
						v-model="state.width"
						title="width (px)"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstCheckbox
						v-model="state.showMarkers"
						title="showMarkers"
				/>
				<HstCheckbox
						v-model="state.showMin"
						title="showMin"
				/>
				<HstCheckbox
						v-model="state.showMax"
						title="showMax"
				/>
				<HstCheckbox
						v-model="state.showLast"
						title="showLast"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
			</template>
		</Variant>

		<Variant title="Prop — type (line / area / column / bar)">
			<div
					class="story-shell"
					data-cy="sparkline-types"
			>
				<div class="story-grid story-grid--4">
					<div class="story-col">
						<strong>line</strong>
						<origam-chart-sparkline
								type="line"
								:series="FIXTURE_SALES"
								color="primary"
								:width="120"
								:height="30"
								:show-last="true"
								data-cy="sparkline-type-line"
						/>
					</div>
					<div class="story-col">
						<strong>area</strong>
						<origam-chart-sparkline
								type="area"
								:series="FIXTURE_SALES"
								color="primary"
								:width="120"
								:height="30"
								:show-last="true"
								data-cy="sparkline-type-area"
						/>
					</div>
					<div class="story-col">
						<strong>column</strong>
						<origam-chart-sparkline
								type="column"
								:series="FIXTURE_SALES"
								color="primary"
								:width="120"
								:height="30"
								data-cy="sparkline-type-column"
						/>
					</div>
					<div class="story-col">
						<strong>bar</strong>
						<origam-chart-sparkline
								type="bar"
								:series="FIXTURE_SALES"
								color="primary"
								:width="120"
								:height="30"
								data-cy="sparkline-type-bar"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showMin / showMax / showLast">
			<div
					class="story-shell"
					data-cy="sparkline-markers"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>showMin + showMax</strong>
						<origam-chart-sparkline
								type="line"
								:series="FIXTURE_VOLATILE"
								color="primary"
								:show-min="true"
								:show-max="true"
								:show-last="false"
								:marker-size="3"
								:width="120"
								:height="30"
								data-cy="sparkline-markers-minmax"
						/>
					</div>
					<div class="story-col">
						<strong>showLast only (default)</strong>
						<origam-chart-sparkline
								type="line"
								:series="FIXTURE_VOLATILE"
								color="primary"
								:show-last="true"
								:marker-size="3"
								:width="120"
								:height="30"
								data-cy="sparkline-markers-last"
						/>
					</div>
					<div class="story-col">
						<strong>showMarkers + all specials</strong>
						<origam-chart-sparkline
								type="line"
								:series="FIXTURE_VOLATILE"
								color="primary"
								:show-markers="true"
								:show-min="true"
								:show-max="true"
								:show-last="true"
								:marker-size="2.5"
								:width="120"
								:height="30"
								data-cy="sparkline-markers-all"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — color (primary / success / danger)">
			<div
					class="story-shell"
					data-cy="sparkline-colors"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>primary (default)</strong>
						<origam-chart-sparkline
								type="area"
								:series="FIXTURE_SALES"
								color="primary"
								:show-last="true"
								:width="120"
								:height="30"
								data-cy="sparkline-color-primary"
						/>
					</div>
					<div class="story-col">
						<strong>success</strong>
						<origam-chart-sparkline
								type="area"
								:series="FIXTURE_SALES"
								color="success"
								:show-last="true"
								:width="120"
								:height="30"
								data-cy="sparkline-color-success"
						/>
					</div>
					<div class="story-col">
						<strong>danger</strong>
						<origam-chart-sparkline
								type="area"
								:series="FIXTURE_SALES_DOWN"
								color="danger"
								:show-last="true"
								:width="120"
								:height="30"
								data-cy="sparkline-color-danger"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Use case — stock prices table">
			<div
					class="story-shell"
					data-cy="sparkline-stocks"
			>
				<table class="stock-table">
					<caption class="visually-hidden">Weekly stock prices</caption>
					<thead>
						<tr>
							<th scope="col">Ticker</th>
							<th scope="col">Price</th>
							<th scope="col">7d trend</th>
						</tr>
					</thead>
					<tbody>
						<tr
								v-for="stock in FIXTURE_STOCKS"
								:key="stock.ticker"
								:data-cy="`sparkline-stock-${ stock.ticker.toLowerCase() }`"
						>
							<td class="stock-ticker">{{ stock.ticker }}</td>
							<td
									class="stock-price"
									:class="stock.change >= 0 ? 'stock-price--up' : 'stock-price--down'"
							>
								${{ stock.prices[stock.prices.length - 1].toFixed(2) }}
								<span class="stock-change">{{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}%</span>
							</td>
							<td class="stock-spark">
								<origam-chart-sparkline
										type="line"
										:series="[{ name: stock.ticker, data: stock.prices }]"
										:color="stock.change >= 0 ? 'success' : 'danger'"
										:show-last="true"
										:show-min="false"
										:show-max="false"
										:width="100"
										:height="28"
										:data-cy="`sparkline-stock-chart-${ stock.ticker.toLowerCase() }`"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="sparkline-slot-tooltip"
			>
				<p class="story-hint">Hover over the sparkline to see the custom tooltip.</p>
				<origam-chart-sparkline
						type="line"
						:series="FIXTURE_VOLATILE"
						color="primary"
						:show-tooltip="true"
						:show-markers="true"
						:width="200"
						:height="48"
						data-cy="sparkline-slot-tooltip-chart"
				>
					<template #tooltip="{ point, index }">
						<div class="custom-tooltip">
							<strong>#{{ index + 1 }}</strong>
							<span>{{ typeof point?.y === 'number' ? point.y.toLocaleString() : '' }}</span>
						</div>
					</template>
				</origam-chart-sparkline>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="sparkline-slot-empty"
			>
				<origam-chart-sparkline
						type="line"
						:series="[]"
						color="primary"
						:width="120"
						:height="30"
						data-cy="sparkline-slot-empty-chart"
				>
					<template #empty>
						<span class="custom-empty">N/A</span>
					</template>
				</origam-chart-sparkline>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamChartSparkline } from '@origam/components'

	import type { IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'line', label: 'line' },
		{ value: 'area', label: 'area' },
		{ value: 'column', label: 'column' },
		{ value: 'bar', label: 'bar' }
	]

	const COLOR_OPTIONS = [
		{ value: 'primary', label: 'primary' },
		{ value: 'success', label: 'success' },
		{ value: 'danger', label: 'danger' },
		{ value: 'warning', label: 'warning' },
		{ value: 'info', label: 'info' }
	]

	const FIXTURE_SALES: Array<IChartSeries> = [
		{ name: 'Monthly sales', data: [18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42, 45] }
	]

	const FIXTURE_SALES_DOWN: Array<IChartSeries> = [
		{ name: 'Monthly sales', data: [45, 42, 39, 36, 30, 33, 28, 32, 25, 19, 22, 18] }
	]

	const buildVolatile = (): Array<number> => {
		const result: Array<number> = []
		let price = 50000
		for (let i = 0; i < 24; i++) {
			price += (Math.random() - 0.48) * 2000
			result.push(Math.round(Math.max(40000, price)))
		}
		return result
	}

	const FIXTURE_VOLATILE: Array<IChartSeries> = [
		{ name: 'BTC/USD 24h', data: buildVolatile() }
	]

	interface IStockFixture {
		ticker: string
		prices: Array<number>
		change: number
	}

	const FIXTURE_STOCKS: Array<IStockFixture> = [
		{
			ticker: 'AAPL',
			prices: [182.5, 184.1, 183.0, 186.2, 188.5, 187.3, 190.1, 189.8, 191.5, 193.2, 192.0, 194.7, 196.3, 195.5],
			change: 7.40
		},
		{
			ticker: 'GOOGL',
			prices: [141.2, 140.0, 142.5, 139.8, 141.3, 143.0, 141.8, 140.5, 138.9, 140.2, 139.5, 141.0, 140.8, 139.3],
			change: -1.35
		},
		{
			ticker: 'MSFT',
			prices: [378.2, 380.5, 382.1, 379.8, 381.5, 384.2, 386.0, 385.3, 387.8, 386.2, 388.5, 390.1, 389.4, 391.2],
			change: 3.44
		},
		{
			ticker: 'TSLA',
			prices: [245.0, 238.5, 242.1, 235.8, 240.3, 233.7, 228.5, 232.0, 225.8, 229.3, 222.1, 226.4, 219.8, 215.5],
			change: -12.04
		},
		{
			ticker: 'AMZN',
			prices: [178.5, 180.2, 179.8, 182.3, 181.5, 184.0, 185.8, 184.5, 186.9, 188.3, 187.6, 189.2, 191.0, 190.4],
			change: 6.67
		}
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
	}

	.story-hint {
		font-size: 0.8125rem;
		color: var(--origam-color-text-secondary, #6b7280);
		margin: 0;
	}

	.story-grid {
		display: grid;
		gap: 16px;
	}

	.story-grid--3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.story-grid--4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
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

	.stock-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.stock-table th,
	.stock-table td {
		padding: 8px 12px;
		text-align: left;
		border-bottom: 1px solid var(--origam-color-border-subtle, #e5e7eb);
	}

	.stock-table th {
		font-weight: 600;
		color: var(--origam-color-text-secondary, #6b7280);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stock-ticker {
		font-weight: 700;
		font-family: var(--origam-font-family-mono, monospace);
	}

	.stock-price {
		font-variant-numeric: tabular-nums;
	}

	.stock-price--up {
		color: var(--origam-color__feedback--success---fgSubtle, #16a34a);
	}

	.stock-price--down {
		color: var(--origam-color__feedback--danger---fgSubtle, #dc2626);
	}

	.stock-change {
		font-size: 0.75rem;
		margin-left: 4px;
		opacity: 0.8;
	}

	.stock-spark {
		vertical-align: middle;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 2px;
		font-size: 0.75rem;
	}

	.custom-empty {
		font-size: 0.75rem;
		color: var(--origam-color-text-secondary, #6b7280);
	}
</style>
