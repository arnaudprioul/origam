<template>
	<ul
			class="origam-chart__legend"
			:class="legendClasses"
			role="list"
			data-cy="origam-chart-legend"
	>
		<li
				v-for="entry in items"
				:key="entry.series.name"
				role="listitem"
				class="origam-chart__legend-item"
				:class="{ 'origam-chart__legend-item--hidden': isHidden(entry) }"
				:data-cy="`origam-chart-legend-${ entry.index }`"
				tabindex="0"
				@click="onItemClick(entry)"
				@keydown.enter.prevent="onItemClick(entry)"
				@keydown.space.prevent="onItemClick(entry)"
		>
			<slot
					name="legend-item"
					v-bind="{ series: entry.series, index: entry.index, visible: entry.visible }"
			>
				<span
						class="origam-chart__legend-swatch"
						:style="{ backgroundColor: entry.color }"
				/>
				<span class="origam-chart__legend-label">{{ entry.series.name }}</span>
			</slot>
		</li>
	</ul>
</template>

<script
		lang="ts"
		setup
>
	import { computed } from 'vue'

	import type {
		IChartLegendEmits,
		IChartLegendItem,
		IChartLegendProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Renders the chart's series legend. Extracted from the legacy
	 * `<OrigamChart>` so every family (cartesian / polar / radar /
	 * gauge) can share the same markup + slot API.
	 *
	 * Each entry is keyboard-activatable (Enter / Space + click),
	 * carries the series-resolved colour swatch, and toggles
	 * visibility via two emits: `legend-click` (raw click) and
	 * `series-toggle` (after the visibility flip).
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartLegend'
	})

	/*********************************************************
	 * Props / Emits — defaults inlined per CLAUDE.md.
	 ********************************************************/
	const props = withDefaults(defineProps<IChartLegendProps>(), {
		position: 'bottom'
	})

	const emit = defineEmits<IChartLegendEmits>()

	/*********************************************************
	 * Computed
	 *
	 * @description
	 * The position modifier doubles as a flex-direction toggle
	 * (row on top/bottom, column on left/right) — the CSS lives
	 * in the parent chart shell so visual parity is automatic.
	 ********************************************************/
	const legendClasses = computed(() => ({
		[`origam-chart__legend--${ props.position }`]: true
	}))

	/*********************************************************
	 * Interaction
	 *
	 * @description
	 * Surface both `legend-click` (raw click) and `series-toggle`
	 * (with the intended next visibility). The actual mutation of
	 * `entry.series.visible` MUST happen in the parent — `series`
	 * arrives through props as a readonly reactive proxy in the
	 * child scope, so a write here is silently dropped in dev
	 * and never propagates to the upstream `useChart` engine.
	 *
	 * This is the canonical Vue 3 "child emits, parent mutates"
	 * pattern. Originally the legend extract inlined the mutation
	 * here, which worked at compile-time but broke at runtime
	 * because Vue marks every nested prop value as readonly when
	 * the child receives it.
	 ********************************************************/
	/*
	 * Each legend entry carries its own `visible` flag (resolved from
	 * the parent's series state by `useChart`). Clicking emits the
	 * inverted visibility upward — the parent owns the actual state
	 * and re-derives `items` with the new `visible` value, which
	 * flows back through props and updates the `--hidden` modifier.
	 *
	 * The item REMAINS clickable while hidden so the user can
	 * re-enable a previously hidden series.
	 */
	const isHidden = (entry: IChartLegendItem): boolean => entry.visible === false

	const onItemClick = (entry: IChartLegendItem): void => {
		emit('legend-click', entry.series, entry.index)
		const nextVisible = entry.visible === false
		emit('series-toggle', entry.series, nextVisible)
	}
</script>
