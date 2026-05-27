<template>
	<Story
			group="components"
			title="Chart/OrigamChartGauge"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					value: 62,
					gaugeMin: 0,
					gaugeMax: 100,
					gaugeUnit: '%',
					animated: true,
					height: 320
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="gauge-playground"
				>
					<origam-chart-gauge
							:series="[{ name: 'Value', data: [Number(state.value)], color: 'primary' }]"
							:gauge-min="Number(state.gaugeMin)"
							:gauge-max="Number(state.gaugeMax)"
							:gauge-unit="String(state.gaugeUnit)"
							:animated="Boolean(state.animated)"
							:height="Number(state.height)"
							title="Completion"
							data-cy="gauge-playground-chart"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.value"
						title="value (series[0].data[0])"
				/>
				<HstNumber
						v-model="state.gaugeMin"
						title="gaugeMin"
				/>
				<HstNumber
						v-model="state.gaugeMax"
						title="gaugeMax"
				/>
				<HstText
						v-model="state.gaugeUnit"
						title="gaugeUnit"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
			</template>
		</Variant>

		<Variant title="Prop — value (0 / 25 / 50 / 75 / 100)">
			<div
					class="story-shell"
					data-cy="gauge-values"
			>
				<div class="story-grid story-grid--5">
					<div class="story-col">
						<strong>0</strong>
						<origam-chart-gauge
								:series="[{ name: 'Progress', data: [0], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="200"
								data-cy="gauge-value-0"
						/>
					</div>
					<div class="story-col">
						<strong>25</strong>
						<origam-chart-gauge
								:series="[{ name: 'Progress', data: [25], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="200"
								data-cy="gauge-value-25"
						/>
					</div>
					<div class="story-col">
						<strong>50</strong>
						<origam-chart-gauge
								:series="[{ name: 'Progress', data: [50], color: 'warning' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="200"
								data-cy="gauge-value-50"
						/>
					</div>
					<div class="story-col">
						<strong>75</strong>
						<origam-chart-gauge
								:series="[{ name: 'Progress', data: [75], color: 'success' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="200"
								data-cy="gauge-value-75"
						/>
					</div>
					<div class="story-col">
						<strong>100</strong>
						<origam-chart-gauge
								:series="[{ name: 'Progress', data: [100], color: 'success' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="200"
								data-cy="gauge-value-100"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — gaugeMin / gaugeMax (0–100, -50–50, 0–1000)">
			<div
					class="story-shell"
					data-cy="gauge-range"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>0 – 100 (value=62)</strong>
						<origam-chart-gauge
								:series="[{ name: 'Metric', data: [62], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="240"
								data-cy="gauge-range-0-100"
						/>
					</div>
					<div class="story-col">
						<strong>-50 – 50 (value=12)</strong>
						<origam-chart-gauge
								:series="[{ name: 'Temperature delta', data: [12], color: 'info' }]"
								:gauge-min="-50"
								:gauge-max="50"
								gauge-unit="°C"
								:height="240"
								data-cy="gauge-range-neg50-50"
						/>
					</div>
					<div class="story-col">
						<strong>0 – 1000 (value=640)</strong>
						<origam-chart-gauge
								:series="[{ name: 'Throughput', data: [640], color: 'warning' }]"
								:gauge-min="0"
								:gauge-max="1000"
								gauge-unit="MB/s"
								:height="240"
								data-cy="gauge-range-0-1000"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — gaugeUnit (%, °C, MB/s, none)">
			<div
					class="story-shell"
					data-cy="gauge-unit"
			>
				<div class="story-grid story-grid--4">
					<div class="story-col">
						<strong>%</strong>
						<origam-chart-gauge
								:series="[{ name: 'Load', data: [73], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="220"
								data-cy="gauge-unit-percent"
						/>
					</div>
					<div class="story-col">
						<strong>°C</strong>
						<origam-chart-gauge
								:series="[{ name: 'Temp', data: [22], color: 'success' }]"
								:gauge-min="-20"
								:gauge-max="50"
								gauge-unit="°C"
								:height="220"
								data-cy="gauge-unit-celsius"
						/>
					</div>
					<div class="story-col">
						<strong>MB/s</strong>
						<origam-chart-gauge
								:series="[{ name: 'Bandwidth', data: [450], color: 'warning' }]"
								:gauge-min="0"
								:gauge-max="1000"
								gauge-unit="MB/s"
								:height="220"
								data-cy="gauge-unit-mbs"
						/>
					</div>
					<div class="story-col">
						<strong>no unit</strong>
						<origam-chart-gauge
								:series="[{ name: 'Score', data: [8], color: 'info' }]"
								:gauge-min="0"
								:gauge-max="10"
								gauge-unit=""
								:height="220"
								data-cy="gauge-unit-none"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="gauge-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>intent: primary</strong>
						<origam-chart-gauge
								:series="[{ name: 'CPU', data: [62], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="240"
								data-cy="gauge-color-primary"
						/>
					</div>
					<div class="story-col">
						<strong>intent: danger</strong>
						<origam-chart-gauge
								:series="[{ name: 'CPU', data: [87], color: 'danger' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="240"
								data-cy="gauge-color-danger"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS color</strong>
						<origam-chart-gauge
								:series="[{ name: 'CPU', data: [42], color: '#8b5cf6' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="240"
								data-cy="gauge-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — height">
			<div
					class="story-shell"
					data-cy="gauge-height"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>160px</strong>
						<origam-chart-gauge
								:series="[{ name: 'Load', data: [60], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="160"
								data-cy="gauge-height-160"
						/>
					</div>
					<div class="story-col">
						<strong>300px</strong>
						<origam-chart-gauge
								:series="[{ name: 'Load', data: [60], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="300"
								data-cy="gauge-height-300"
						/>
					</div>
					<div class="story-col">
						<strong>480px</strong>
						<origam-chart-gauge
								:series="[{ name: 'Load', data: [60], color: 'primary' }]"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								:height="480"
								data-cy="gauge-height-480"
						/>
					</div>
				</div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamChartGauge } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
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

	.story-grid--3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.story-grid--4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.story-grid--5 {
		grid-template-columns: repeat(5, minmax(0, 1fr));
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
</style>
