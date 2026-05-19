<template>
	<button
			type="button"
			class="origam-media-play-btn"
			:class="rootClasses"
			:style="style"
			:aria-label="playing ? pauseLabel : playLabel"
			:data-cy="dataCy"
			@click="onClick"
	>
		<origam-icon
				:icon="playing ? PAUSE_ICON : PLAY_ICON"
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
		IMediaPlayBtnEmits,
		IMediaPlayBtnProps
	} from '../../interfaces'

	const props = withDefaults(defineProps<IMediaPlayBtnProps>(), {
		dataCy: 'origam-media-play-btn'
	})

	const emit = defineEmits<IMediaPlayBtnEmits>()

	const PLAY_ICON = MDI_ICONS.PLAY
	const PAUSE_ICON = MDI_ICONS.PAUSE

	const rootClasses = computed(() => [props.class])

	function onClick (event: MouseEvent): void {
		emit('click', event)
	}
</script>

<style
		lang="scss"
		scoped
>
	.origam-media-play-btn {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-media-play-btn---size, 36px);
		height: var(--origam-media-play-btn---size, 36px);
		border-radius: var(--origam-media-play-btn---border-radius, 50%);
		cursor: pointer;
		color: var(--origam-media-play-btn---color, #ffffff);
		transition: background-color 120ms ease, transform 120ms ease, opacity 120ms ease;
		opacity: 0.95;
	}

	.origam-media-play-btn:hover,
	.origam-media-play-btn:focus-visible {
		opacity: 1;
		background-color: var(--origam-media-play-btn---hover-background-color, rgba(255, 255, 255, 0.12));
	}

	.origam-media-play-btn:active {
		transform: scale(0.92);
	}

	.origam-media-play-btn .origam-icon {
		font-size: var(--origam-media-play-btn---icon-size, 20px);
		line-height: 1;
	}
</style>
