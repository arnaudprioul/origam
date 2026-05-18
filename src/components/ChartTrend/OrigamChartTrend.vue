<template>
	<origam-chart
			v-bind="forwardedProps"
			:data-cy="`origam-chart-trend`"
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
		IChartTrendProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Thin wrapper around `<OrigamChart>` that hard-codes
	 * `type="trend"` and exposes only trend-relevant
	 * props. Behaviour, styling, accessibility, and i18n are
	 * inherited verbatim from `<OrigamChart>`. Use this component
	 * when you want a type-safe surface; use `<OrigamChart>`
	 * directly when you need to switch types at runtime.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartTrend',
		inheritAttrs: false
	})

	const props = defineProps<IChartTrendProps>()

	defineEmits<IChartBaseEmits>()

	/*********************************************************
	 * Forwarded props — spread every declared prop onto the
	 * inner `<OrigamChart>` AND inject the hard-coded `type`.
	 * Extra HTML attributes flow through Vue's `$attrs` mechanism
	 * because `inheritAttrs: false` defers the attribute fallthrough
	 * to the wrapped component.
	 ********************************************************/
	const forwardedProps = computed(() => ({
		...props,
		type: 'trend' as const
	}))
</script>
