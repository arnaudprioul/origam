<template>
	<component
			:is="tag"
			class="origam-audio"
			:class="rootClasses"
			:style="rootStyles"
			data-cy="origam-audio"
	>
		<audio
				ref="audioRef"
				class="origam-audio__el"
				:src="singleSrc"
				:autoplay="resolvedAutoplay"
				:muted="resolvedMuted"
				:loop="loop"
				:controls="isNativeControls"
				:preload="preload"
				:crossorigin="crossorigin"
				data-cy="origam-audio-el"
				@play="emit('play')"
				@pause="emit('pause')"
				@ended="emit('ended')"
				@timeupdate="onTimeUpdate"
				@volumechange="onVolumeChange"
				@loadedmetadata="onLoadedMetadata"
				@error="onErrorEvent"
		>
			<source
					v-for="source in resolvedSources"
					:key="source.src"
					:src="source.src"
					:type="source.type"
			/>
			<track
					v-for="trackItem in resolvedTracks"
					:key="`${trackItem.kind}-${trackItem.srclang}`"
					:kind="trackItem.kind"
					:src="trackItem.src"
					:srclang="trackItem.srclang"
					:label="trackItem.label || trackItem.srclang.toUpperCase()"
					:default="trackItem.default || undefined"
			/>
		</audio>

		<div
				v-if="hasMetadata"
				class="origam-audio__metadata"
				data-cy="origam-audio-metadata"
		>
			<slot name="metadata">
				<slot name="cover">
					<origam-img
							v-if="resolvedCover"
							:src="resolvedCover"
							:alt="coverAlt"
							class="origam-audio__cover"
							data-cy="origam-audio-cover"
					/>
				</slot>
				<div
						class="origam-audio__text"
						data-cy="origam-audio-text"
				>
					<slot name="title">
						<strong
								v-if="title"
								class="origam-audio__title"
								data-cy="origam-audio-title"
						>{{ title }}</strong>
					</slot>
					<span
							v-if="artist"
							class="origam-audio__artist"
							data-cy="origam-audio-artist"
					>{{ artist }}</span>
				</div>
			</slot>
		</div>

		<slot
				name="controls"
				v-bind="slotBindings"
		>
			<origam-media-controller
					v-if="isCustomControls"
					:state="state"
					:methods="methods"
					:playback-rates="playbackRates"
					:allow-remote-playback="allowRemotePlayback"
					:downloadable="downloadable"
					:download-url="downloadUrl"
					data-cy="origam-audio-controls"
					@download="onDownloadClick"
			/>
		</slot>

		<div
				v-if="state.loading.value && !state.error.value"
				class="origam-audio__loading"
				role="status"
				:aria-label="t('origam.loading')"
				data-cy="origam-audio-loading"
		>
			<slot name="loading">
				<origam-icon
						:icon="ICONS.LOADING"
						class="origam-audio__loading-icon"
						aria-hidden="true"
				/>
			</slot>
		</div>

		<div
				v-if="state.error.value"
				class="origam-audio__error"
				role="alert"
				data-cy="origam-audio-error"
		>
			<slot
					name="error"
					:error="state.error.value"
			>
				<origam-icon
						:icon="ICONS.ALERT"
						class="origam-audio__error-icon"
						aria-hidden="true"
				/>
				<span class="origam-audio__error-msg">{{ errorMessage }}</span>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		type StyleValue,
		watch
	} from 'vue'

	import { OrigamIcon } from '../Icon'
	import { OrigamImg } from '../Img'
	import { OrigamMediaController } from '../MediaController'

	import { useLocale } from '../../composables'
	import { useAudioPlayer } from '../../composables/Audio/use-audio-player.composable'
	import { shouldSuppressAutoplay } from '../../composables/Media/use-media-player.composable'

	import { MDI_ICONS } from '../../enums'

	import type {
		IAudioEmits,
		IAudioProps,
		IAudioSource
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamAudio>`. The component is a thin
	 * default skin on top of `useAudioPlayer` — it owns the metadata
	 * strip (cover + title + artist), the `<audio>` element, and the
	 * wiring between the native element and `<OrigamMediaController>`.
	 *
	 * Two controls modes :
	 *   - 'custom' (default) — `<OrigamMediaController>` is painted on
	 *     top of the `<audio>`.
	 *   - 'native' — the native `controls` attribute is set on the
	 *     `<audio>` and no custom UI is rendered.
	 *
	 * Defaults are inlined here (not pulled from a constant object)
	 * because the Vue SFC compiler analyses `withDefaults` statically
	 * and only resolves literals — cf. CLAUDE.md rule.
	 *
	 * Media-shared i18n keys live under `origam.media.*`; video-only
	 * keys under `origam.video.*` and the audio component reuses the
	 * media set entirely.
	 ********************************************************/
	const { t } = useLocale()

	const props = withDefaults(defineProps<IAudioProps>(), {
		tag: 'div',
		tracks: () => [],
		title: undefined,
		artist: undefined,
		cover: undefined,
		autoplay: false,
		muted: false,
		loop: false,
		preload: 'metadata',
		crossorigin: undefined,
		controls: 'custom',
		playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
		playbackRate: 1,
		allowRemotePlayback: false,
		downloadable: false,
		downloadFilename: undefined
	})

	const emit = defineEmits<IAudioEmits>()

	/*********************************************************
	 * Icon refs — single source of truth for the overlay glyphs.
	 ********************************************************/
	const ICONS = {
		LOADING: MDI_ICONS.LOADING,
		ALERT: MDI_ICONS.ALERT_CIRCLE
	}

	/*********************************************************
	 * Resolved autoplay / muted — autoplay is suppressed when the user
	 * prefers reduced motion (a11y), and the browser requires muted=true
	 * for unattended playback in most cases. The composable also logs
	 * the suppression at mount time; we keep the SFC-level resolution
	 * here so the native `<audio autoplay>` attribute is correct from
	 * the very first render.
	 ********************************************************/
	const resolvedAutoplay = computed<boolean>(() => {
		if (!props.autoplay) return false
		if (shouldSuppressAutoplay()) return false
		return true
	})

	const resolvedMuted = computed<boolean>(() => {
		if (props.muted) return true
		// Browsers gate `autoplay` on `muted` — auto-force when the
		// consumer asked for autoplay without explicitly muting.
		if (resolvedAutoplay.value) return true
		return false
	})

	/*********************************************************
	 * Controls strategy — drives both the native `controls` attribute
	 * on the `<audio>` AND the conditional render of
	 * `<OrigamMediaController>`. Extracted so the template stays
	 * declarative (cf. CLAUDE.md "no logic in templates" rule).
	 ********************************************************/
	const isCustomControls = computed<boolean>(() => props.controls === 'custom')
	const isNativeControls = computed<boolean>(() => props.controls === 'native')

	/*********************************************************
	 * Source resolution — `src` can be a single URL, a source
	 * descriptor, or an array of descriptors. When it's an object or
	 * array we render `<source>` children; when it's a string we set
	 * the `src` attribute on the `<audio>` directly (and skip the
	 * children).
	 ********************************************************/
	const singleSrc = computed<string | undefined>(() => {
		return typeof props.src === 'string' ? props.src : undefined
	})

	const resolvedSources = computed<Array<IAudioSource>>(() => {
		if (typeof props.src === 'string') return []
		if (Array.isArray(props.src)) return props.src
		return [props.src]
	})

	const resolvedTracks = computed(() => props.tracks ?? [])

	/*********************************************************
	 * Composable
	 ********************************************************/
	const { audioRef, state, methods } = useAudioPlayer({
		autoplay: props.autoplay,
		muted: resolvedMuted.value,
		loop: props.loop,
		preload: props.preload
	})

	/*********************************************************
	 * Native event handlers — forward to the parent emit pipeline.
	 * The composable already listens to the same events internally;
	 * the forwarding here keeps the public emit contract independent
	 * of the headless state surface.
	 ********************************************************/
	function onTimeUpdate (event: Event): void {
		emit('timeupdate', event)
	}

	function onVolumeChange (event: Event): void {
		emit('volumechange', event)
	}

	function onLoadedMetadata (event: Event): void {
		emit('loadedmetadata', event)
	}

	function onErrorEvent (event: Event): void {
		emit('error', state.error.value ?? event)
	}

	/*********************************************************
	 * Metadata strip — hides itself when title/artist/cover are all
	 * absent so the bare audio + controls take the full card.
	 ********************************************************/
	const resolvedCover = computed<string | undefined>(() => {
		if (!props.cover) return undefined
		if (typeof props.cover === 'string') return props.cover
		return props.cover.src
	})

	const coverAlt = computed<string>(() => {
		if (props.title && props.artist) return `${props.title} — ${props.artist}`
		if (props.title) return props.title
		return ''
	})

	const hasMetadata = computed<boolean>(() => {
		return Boolean(props.title || props.artist || resolvedCover.value)
	})

	/*********************************************************
	 * Download — analogous to OrigamVideo's contract. Single-source
	 * playback means we always know the active URL; multi-source
	 * arrays fall back to the first entry.
	 ********************************************************/
	const downloadUrl = computed<string | null>(() => {
		if (typeof props.src === 'string') return props.src || null
		if (Array.isArray(props.src)) {
			const first = props.src[0]
			return first?.src ?? null
		}
		return props.src?.src ?? null
	})

	function onDownloadClick (): void {
		const url = downloadUrl.value
		if (!url) return
		const a = document.createElement('a')
		a.href = url
		a.download = props.downloadFilename || url.split('/').pop()?.split('?')[0] || 'audio'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		emit('download', url)
	}

	/*********************************************************
	 * Apply initial playback rate (prop) once metadata is ready.
	 * Subsequent prop changes are honoured via the watcher below.
	 ********************************************************/
	watch(() => props.playbackRate, (rate) => {
		if (typeof rate === 'number' && Number.isFinite(rate) && rate > 0) {
			methods.setPlaybackRate(rate)
		}
	}, { immediate: true })

	/*********************************************************
	 * Forward playback-rate changes initiated by the Controller's
	 * config menu via the public `update:playbackRate` emit so the
	 * v-model contract on the wrapper stays intact.
	 ********************************************************/
	watch(() => state.playbackRate.value, (rate) => {
		emit('update:playbackRate', rate)
	})

	/*********************************************************
	 * Error formatting for the default error overlay.
	 ********************************************************/
	const errorMessage = computed<string>(() => {
		const err = state.error.value
		if (!err) return 'Playback error'
		if ('message' in err && err.message) return err.message
		return 'Playback error'
	})

	/*********************************************************
	 * Slot bindings — single source of truth for the `#controls`
	 * scoped slot.
	 ********************************************************/
	const slotBindings = computed(() => ({
		playing: state.playing.value,
		paused: state.paused.value,
		currentTime: state.currentTime.value,
		duration: state.duration.value,
		buffered: state.buffered.value,
		volume: state.volume.value,
		muted: state.muted.value,
		playbackRate: state.playbackRate.value,
		loading: state.loading.value,
		error: state.error.value,
		methods
	}))

	/*********************************************************
	 * Class & Style — only carries the user-provided style + state
	 * modifier classes. Layout (radius, padding, margin, border) is
	 * absorbed via the DS shared interfaces (the host page can pass
	 * tokens via the matching props).
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-audio--playing': state.playing.value,
			'origam-audio--paused': state.paused.value,
			'origam-audio--loading': state.loading.value,
			'origam-audio--error': state.error.value !== null,
			'origam-audio--controls-native': isNativeControls.value,
			'origam-audio--controls-custom': isCustomControls.value
		},
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [props.style] as StyleValue)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		audioRef,
		state,
		methods
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-audio {
		display: flex;
		flex-direction: column;
		gap: var(--origam-audio---gap, 12px);
		padding: var(--origam-audio---padding, 12px);
		background-color: var(--origam-audio---background-color, var(--origam-color__surface---raised, transparent));
		border-radius: var(--origam-audio---border-radius, var(--origam-radius---md, 8px));
		color: var(--origam-audio---color, inherit);
		position: relative;
	}

	.origam-audio__el {
		display: block;
		width: 100%;
	}

	.origam-audio--controls-custom .origam-audio__el {
		display: none;
	}

	.origam-audio__metadata {
		display: flex;
		align-items: center;
		gap: var(--origam-audio__metadata---gap, 12px);
	}

	.origam-audio__cover {
		flex: 0 0 var(--origam-audio__cover---size, 64px);
		width: var(--origam-audio__cover---size, 64px);
		height: var(--origam-audio__cover---size, 64px);
		border-radius: var(--origam-audio__cover---border-radius, var(--origam-radius---md, 8px));
		overflow: hidden;
	}

	.origam-audio__text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		gap: var(--origam-audio__text---gap, 2px);
	}

	.origam-audio__title {
		font: var(--origam-audio__title---font, 600 0.95rem/1.3 inherit);
		color: var(--origam-audio__title---color, inherit);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.origam-audio__artist {
		font: var(--origam-audio__artist---font, 0.85rem/1.3 inherit);
		color: var(--origam-audio__artist---color, var(--origam-color__text---secondary, inherit));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.origam-audio__loading {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		color: var(--origam-audio__loading---color, inherit);
		font-size: var(--origam-audio__loading---font-size, 0.875rem);
	}

	.origam-audio__error {
		display: inline-flex;
		align-items: center;
		gap: var(--origam-audio--error---gap, 6px);
		padding: var(--origam-audio--error---padding, 8px 12px);
		background-color: var(--origam-audio--error---background-color, var(--origam-color__status--error--bg, transparent));
		color: var(--origam-audio--error---color, var(--origam-color__status--error---color, inherit));
		border-radius: var(--origam-audio--error---border-radius, var(--origam-radius---sm, 4px));
		font-size: var(--origam-audio--error---font-size, 0.875rem);
	}

	.origam-audio__error-icon {
		font-size: var(--origam-audio--error---icon-font-size, 1.1rem);
	}
</style>
