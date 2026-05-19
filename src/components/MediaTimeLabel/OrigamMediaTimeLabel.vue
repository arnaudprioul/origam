<template>
	<span
			class="origam-media-time-label"
			:class="rootClasses"
			:style="style"
			:data-cy="dataCy"
	>
		<span class="origam-media-time-label__current">{{ formattedCurrent }}</span>
		<span class="origam-media-time-label__sep">/</span>
		<span class="origam-media-time-label__total">{{ formattedTotal }}</span>
	</span>
</template>

<script
		lang="ts"
		setup
>
	import { computed } from 'vue'

	import { formatMediaTime } from '../../utils'

	import type { IMediaTimeLabelProps } from '../../interfaces'

	const props = withDefaults(defineProps<IMediaTimeLabelProps>(), {
		format: undefined,
		dataCy: 'origam-media-time-label'
	})

	const rootClasses = computed(() => [props.class])

	const formatter = computed<(seconds: number) => string>(() => {
		return props.format ?? formatMediaTime
	})

	const formattedCurrent = computed<string>(() => formatter.value(props.currentTime))
	const formattedTotal = computed<string>(() => formatter.value(props.duration))
</script>

<style
		lang="scss"
		scoped
>
	.origam-media-time-label {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 0 6px;
		font-family: var(--origam-media-time-label---font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, monospace);
		font-size: var(--origam-media-time-label---font-size, 12px);
		font-variant-numeric: tabular-nums;
		color: var(--origam-media-time-label---color, #ffffff);
		white-space: nowrap;
		user-select: none;
	}

	.origam-media-time-label__sep {
		opacity: 0.6;
	}

	.origam-media-time-label__total {
		opacity: 0.7;
	}
</style>
