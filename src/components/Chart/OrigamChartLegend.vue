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
	import { computed, ref } from 'vue'

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
	 * Local hidden-set fallback. Mutating `entry.series.visible` from a
	 * child relies on Vue 3's deep-reactivity over a prop array — that
	 * propagates fine when the consumer hands an explicitly reactive
	 * object, but breaks silently when the series live in a plain
	 * module-level `const` (the common case: fixtures, server payloads
	 * copied raw). The local Set guarantees an immediate visual flip
	 * regardless of how the consumer manages reactivity; the parent
	 * can ALSO mutate `series.visible` for actual data filtering, and
	 * the two states stay in sync because the legend reads the parent
	 * state first then layers its local override on top.
	 */
	const hiddenSeries = ref<Set<string>>(new Set())

	const isHidden = (entry: IChartLegendItem): boolean => {
		if (hiddenSeries.value.has(entry.series.name)) return true
		return entry.series.visible === false
	}

	const onItemClick = (entry: IChartLegendItem): void => {
		emit('legend-click', entry.series, entry.index)
		const wasHidden = isHidden(entry)
		const nextVisible = wasHidden
		// Mirror the toggle into our local Set so the legend item gets
		// the `--hidden` modifier even when the parent doesn't surface
		// the visibility flip back through the items prop.
		if (nextVisible) hiddenSeries.value.delete(entry.series.name)
		else hiddenSeries.value.add(entry.series.name)
		emit('series-toggle', entry.series, nextVisible)
	}
</script>
