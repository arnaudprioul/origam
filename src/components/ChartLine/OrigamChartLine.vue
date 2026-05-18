<template>
	<origam-chart
			v-bind="forwardedProps"
			:data-cy="`origam-chart-line`"
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
		IChartLineProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Thin wrapper around `<OrigamChart>` that hard-codes
	 * `type="line"` and exposes only line-relevant
	 * props. Behaviour, styling, accessibility, and i18n are
	 * inherited verbatim from `<OrigamChart>`. Use this component
	 * when you want a type-safe surface; use `<OrigamChart>`
	 * directly when you need to switch types at runtime.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartLine',
		inheritAttrs: false
	})

	const props = defineProps<IChartLineProps>()

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
		type: 'line' as const
	}))
</script>
