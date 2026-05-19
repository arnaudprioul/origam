<template>
	<button
			v-if="available"
			type="button"
			class="origam-media-cast-btn"
			:class="rootClasses"
			:style="style"
			:aria-label="casting ? stopCastLabel : castLabel"
			:data-cy="dataCy"
			@click="onClick"
	>
		<origam-icon
				:icon="CAST_ICON"
				aria-hidden="true"
		/>
	</button>
</template>

<script
		lang="ts"
		setup
>
	import { computed } from 'vue'

	import { OrigamIcon } from '../Icon'

	import { MDI_ICONS } from '../../enums'

	import type {
		IMediaCastBtnEmits,
		IMediaCastBtnProps
	} from '../../interfaces'

	const props = withDefaults(defineProps<IMediaCastBtnProps>(), {
		dataCy: 'origam-media-cast-btn'
	})

	const emit = defineEmits<IMediaCastBtnEmits>()

	const CAST_ICON = MDI_ICONS.CAST

	const rootClasses = computed(() => [
		{ 'origam-media-cast-btn--active': props.casting },
		props.class
	])

	function onClick (event: MouseEvent): void {
		emit('click', event)
	}
</script>

<style
		lang="scss"
		scoped
>
	.origam-media-cast-btn {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-media-cast-btn---size, 36px);
		height: var(--origam-media-cast-btn---size, 36px);
		border-radius: var(--origam-media-cast-btn---border-radius, 50%);
		cursor: pointer;
		color: var(--origam-media-cast-btn---color, #ffffff);
		transition: background-color 120ms ease, transform 120ms ease, opacity 120ms ease;
		opacity: 0.95;
	}

	.origam-media-cast-btn:hover,
	.origam-media-cast-btn:focus-visible {
		opacity: 1;
		background-color: var(--origam-media-cast-btn---hover-background-color, rgba(255, 255, 255, 0.12));
	}

	.origam-media-cast-btn:active {
		transform: scale(0.92);
	}

	.origam-media-cast-btn--active {
		opacity: 1;
		position: relative;
	}

	.origam-media-cast-btn--active::after {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--origam-media-cast-btn--active---indicator-color, #ef4444);
	}

	.origam-media-cast-btn .origam-icon {
		font-size: var(--origam-media-cast-btn---icon-size, 20px);
		line-height: 1;
	}
</style>
