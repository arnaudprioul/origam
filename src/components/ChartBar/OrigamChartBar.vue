<template>
	<origam-chart
			v-bind="forwardedProps"
			:data-cy="`origam-chart-bar`"
			@point-click="(point, originalEvent) => emit('point-click', point, originalEvent)"
			@legend-click="(series, index) => emit('legend-click', series, index)"
			@series-toggle="(series, visible) => emit('series-toggle', series, visible)"
	>
		<template
				v-for="(_, name) in $slots"
				#[name]="slotProps"
		>
			<slot
					:name="name"
					v-bind="slotProps ?? {}"
			/>
		</template>
	</origam-chart>
</template>

<script
		lang="ts"
		setup
>
	import { computed } from 'vue'

	import { OrigamChart } from '../Chart'

	import type {
		IChartBaseEmits,
		IChartBarProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Thin wrapper around `<OrigamChart>` that hard-codes
	 * `type="bar"` and exposes only bar-relevant
	 * props. Behaviour, styling, accessibility, and i18n are
	 * inherited verbatim from `<OrigamChart>`. Use this component
	 * when you want a type-safe surface; use `<OrigamChart>`
	 * directly when you need to switch types at runtime.
	 *
	 * Emits (point-click / legend-click / series-toggle) are
	 * explicitly re-emitted because Vue 3 custom events do NOT
	 * bubble — without these listeners the parent never hears
	 * the inner component's events.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartBar',
		inheritAttrs: false
	})

	const props = defineProps<IChartBarProps>()

	const emit = defineEmits<IChartBaseEmits>()

	/*********************************************************
	 * Forwarded props — spread every declared prop onto the
	 * inner `<OrigamChart>` AND inject the hard-coded `type`.
	 * Extra HTML attributes flow through Vue's `$attrs` mechanism
	 * because `inheritAttrs: false` defers the attribute fallthrough
	 * to the wrapped component.
	 ********************************************************/
	const forwardedProps = computed(() => ({
		...props,
		type: 'bar' as const
	}))
</script>
