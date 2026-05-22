<template>
	<Story
			group="components"
			title="Chart/OrigamChartWordCloud"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: false,
					showTooltip: true,
					legendPosition: 'bottom',
					rotation: 'none',
					minFontSize: 12,
					maxFontSize: 64,
					fontWeight: 600
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="word-cloud-playground"
				>
					<origam-chart-word-cloud
							:series="FIXTURE_TECH"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							:rotation="state.rotation"
							:min-font-size="Number(state.minFontSize)"
							:max-font-size="Number(state.maxFontSize)"
							:font-weight="Number(state.fontWeight)"
							title="Tech Buzzwords"
							subtitle="2026 — weighted by mention frequency"
							data-cy="word-cloud-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="word-cloud-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstSelect
						v-model="state.rotation"
						title="rotation"
						:options="ROTATION_OPTIONS"
				/>
				<HstNumber
						v-model="state.minFontSize"
						title="minFontSize (px)"
				/>
				<HstNumber
						v-model="state.maxFontSize"
						title="maxFontSize (px)"
				/>
				<HstNumber
						v-model="state.fontWeight"
						title="fontWeight"
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
			</template>
		</Variant>

		<Variant title="Prop — rotation (none / random / orthogonal)">
			<div
					class="story-shell"
					data-cy="word-cloud-rotation"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>none (all horizontal)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_FEEDBACK"
								:height="300"
								rotation="none"
								title="None"
								data-cy="word-cloud-rotation-none"
						/>
					</div>
					<div class="story-col">
						<strong>random ([-30°, 30°])</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_FEEDBACK"
								:height="300"
								rotation="random"
								title="Random"
								data-cy="word-cloud-rotation-random"
						/>
					</div>
					<div class="story-col">
						<strong>orthogonal (0° / 90° parity)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_FEEDBACK"
								:height="300"
								rotation="orthogonal"
								title="Orthogonal"
								data-cy="word-cloud-rotation-orthogonal"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — minFontSize / maxFontSize (compact vs giant)">
			<div
					class="story-shell"
					data-cy="word-cloud-font-size"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>compact (min 8, max 24)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_TECH"
								:height="360"
								:min-font-size="8"
								:max-font-size="24"
								title="Compact"
								data-cy="word-cloud-font-compact"
						/>
					</div>
					<div class="story-col">
						<strong>giant (min 20, max 80)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_TECH"
								:height="360"
								:min-font-size="20"
								:max-font-size="80"
								title="Giant"
								data-cy="word-cloud-font-giant"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (DS intents vs custom)">
			<div
					class="story-shell"
					data-cy="word-cloud-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default (DS intent cycle)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_TECH_NO_COLOR"
								:height="360"
								title="DS Intents"
								data-cy="word-cloud-color-intents"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS colors (violet ramp)</strong>
						<origam-chart-word-cloud
								:series="FIXTURE_TECH_NO_COLOR"
								:color-scheme="['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#7c3aed','#4f46e5','#818cf8','#ddd6fe']"
								:height="360"
								title="Custom colors"
								data-cy="word-cloud-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="word-cloud-slot-tooltip"
			>
				<origam-chart-word-cloud
						:series="FIXTURE_TECH"
						:height="400"
						title="Custom tooltip"
						data-cy="word-cloud-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ point?.y?.toLocaleString() }} mentions</span>
						</div>
					</template>
				</origam-chart-word-cloud>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="word-cloud-slot-empty"
			>
				<origam-chart-word-cloud
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="word-cloud-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No word frequency data available for this period.
						</div>
					</template>
				</origam-chart-word-cloud>
			</div>
		</Variant>

		<Variant title="Emit — point-click on word (live counter)">
			<div
					class="story-shell"
					data-cy="word-cloud-emit"
			>
				<origam-chart-word-cloud
						:series="FIXTURE_TECH"
						:height="400"
						title="Click or press Enter / Space on a word"
						data-cy="word-cloud-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="word-cloud-emit-log"
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

	import { OrigamChartWordCloud } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const ROTATION_OPTIONS = [
		{ value: 'none', label: 'none' },
		{ value: 'random', label: 'random' },
		{ value: 'orthogonal', label: 'orthogonal' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	type WordDatum = { text: string; value: number; color?: string }

	const TECH_DATA: Array<WordDatum> = [
		{ text: 'AI', value: 100 },
		{ text: 'ML', value: 90 },
		{ text: 'Cloud', value: 80 },
		{ text: 'Data', value: 75 },
		{ text: 'Kubernetes', value: 70 },
		{ text: 'Vue', value: 65 },
		{ text: 'React', value: 60 },
		{ text: 'TypeScript', value: 60 },
		{ text: 'Python', value: 55 },
		{ text: 'Rust', value: 50 },
		{ text: 'Go', value: 45 },
		{ text: 'GraphQL', value: 40 },
		{ text: 'REST', value: 35 },
		{ text: 'Docker', value: 35 },
		{ text: 'Serverless', value: 30 },
		{ text: 'Edge', value: 25 },
		{ text: 'WebAssembly', value: 20 },
		{ text: 'Tailwind', value: 18 },
		{ text: 'Vite', value: 15 },
		{ text: 'Bun', value: 12 }
	]

	const FEEDBACK_DATA: Array<WordDatum> = [
		{ text: 'Fast', value: 50 },
		{ text: 'Reliable', value: 45 },
		{ text: 'Smooth', value: 38 },
		{ text: 'Intuitive', value: 32 },
		{ text: 'Beautiful', value: 28 },
		{ text: 'Powerful', value: 25 },
		{ text: 'Stable', value: 22 },
		{ text: 'Modern', value: 18 },
		{ text: 'Clean', value: 15 },
		{ text: 'Polished', value: 12 },
		{ text: 'Snappy', value: 10 },
		{ text: 'Elegant', value: 8 }
	]

	const FIXTURE_TECH: Array<IChartSeries> = [
		{ name: 'Tech Buzzwords', data: TECH_DATA as any }
	]

	const FIXTURE_TECH_NO_COLOR: Array<IChartSeries> = [
		{ name: 'Tech Buzzwords', data: TECH_DATA.map(({ text, value }) => ({ text, value })) as any }
	]

	const FIXTURE_FEEDBACK: Array<IChartSeries> = [
		{ name: 'Customer Feedback', data: FEEDBACK_DATA as any }
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

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 4px;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
