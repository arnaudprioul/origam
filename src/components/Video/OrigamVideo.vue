<template>
	<div
			class="origam-video"
			:class="rootClasses"
			:style="rootStyles"
			data-cy="origam-video"
	>
		<video
				ref="videoRef"
				class="origam-video__el"
				:src="singleSrc"
				:poster="poster"
				:autoplay="resolvedAutoplay"
				:muted="resolvedMuted"
				:loop="loop"
				:controls="controls === 'native'"
				:playsinline="playsInline"
				:preload="preload"
				:crossorigin="crossorigin"
				:disablepictureinpicture="disablePictureInPicture || undefined"
				data-cy="origam-video-el"
				@play="emit('play')"
				@pause="emit('pause')"
				@ended="emit('ended')"
				@timeupdate="onTimeUpdate"
				@volumechange="onVolumeChange"
				@loadedmetadata="onLoadedMetadata"
				@error="onErrorEvent"
				@enterpictureinpicture="emit('enterpip')"
				@leavepictureinpicture="emit('exitpip')"
		>
			<source
					v-for="source in resolvedSources"
					:key="source.src"
					:src="source.src"
					:type="source.type"
			/>
			<track
					v-for="track in tracks"
					:key="`${track.kind}-${track.srclang}`"
					:kind="track.kind"
					:src="track.src"
					:srclang="track.srclang"
					:label="track.label || track.srclang.toUpperCase()"
					:default="track.default || undefined"
			/>
		</video>

		<div
				v-if="showPosterOverlay"
				class="origam-video__poster"
				data-cy="origam-video-poster"
				@click="methods.play()"
		>
			<slot name="poster">
				<img
						v-if="poster"
						class="origam-video__poster-img"
						:src="poster"
						alt=""
				/>
				<button
						type="button"
						class="origam-video__poster-btn"
						aria-label="Play"
						data-cy="origam-video-poster-btn"
						@click.stop="methods.play()"
				>
					<origam-icon
							:icon="ICONS.PLAY"
							aria-hidden="true"
					/>
				</button>
			</slot>
		</div>

		<div
				v-if="state.loading.value && !state.error.value"
				class="origam-video__loading"
				role="status"
				aria-label="Loading"
				data-cy="origam-video-loading"
		>
			<slot name="loading">
				<origam-icon
						:icon="ICONS.LOADING"
						class="origam-video__loading-icon"
						aria-hidden="true"
				/>
			</slot>
		</div>

		<div
				v-if="state.error.value"
				class="origam-video__error"
				role="alert"
				data-cy="origam-video-error"
		>
			<slot
					name="error"
					:error="state.error.value"
			>
				<origam-icon
						:icon="ICONS.ALERT"
						class="origam-video__error-icon"
						aria-hidden="true"
				/>
				<span class="origam-video__error-msg">{{ errorMessage }}</span>
			</slot>
		</div>

		<div
				v-if="controls === 'custom'"
				class="origam-video__controls"
				data-cy="origam-video-controls"
		>
			<slot
					name="controls"
					v-bind="slotBindings"
			>
				<button
						type="button"
						class="origam-video__btn"
						:aria-label="state.playing.value ? 'Pause' : 'Play'"
						data-cy="origam-video-play"
						@click="togglePlay"
				>
					<origam-icon
							:icon="state.playing.value ? ICONS.PAUSE : ICONS.PLAY"
							aria-hidden="true"
					/>
				</button>

				<span
						class="origam-video__time"
						data-cy="origam-video-time"
				>{{ formattedCurrentTime }} / {{ formattedDuration }}</span>

				<input
						class="origam-video__scrubber"
						type="range"
						min="0"
						:max="scrubberMax"
						:step="0.1"
						:value="state.currentTime.value"
						role="slider"
						aria-label="Seek"
						:aria-valuemin="0"
						:aria-valuemax="scrubberMax"
						:aria-valuenow="state.currentTime.value"
						:aria-valuetext="formattedCurrentTime"
						data-cy="origam-video-scrubber"
						@input="onScrubberInput"
				/>

				<button
						type="button"
						class="origam-video__btn"
						:aria-label="state.muted.value ? 'Unmute' : 'Mute'"
						data-cy="origam-video-mute"
						@click="methods.toggleMute()"
				>
					<origam-icon
							:icon="volumeIcon"
							aria-hidden="true"
					/>
				</button>

				<input
						class="origam-video__volume"
						type="range"
						min="0"
						max="1"
						step="0.05"
						:value="state.muted.value ? 0 : state.volume.value"
						aria-label="Volume"
						data-cy="origam-video-volume"
						@input="onVolumeInput"
				/>

				<button
						v-if="hasCaptions"
						type="button"
						class="origam-video__btn"
						:class="{ 'origam-video__btn--active': captionsEnabled }"
						:aria-label="captionsEnabled ? 'Disable captions' : 'Enable captions'"
						data-cy="origam-video-captions"
						@click="toggleCaptions"
				>
					<origam-icon
							:icon="ICONS.CAPTIONS"
							aria-hidden="true"
					/>
				</button>

				<button
						v-if="pipSupported"
						type="button"
						class="origam-video__btn"
						:aria-label="state.pip.value ? 'Exit picture in picture' : 'Enter picture in picture'"
						data-cy="origam-video-pip"
						@click="togglePipBtn"
				>
					<origam-icon
							:icon="ICONS.PIP"
							aria-hidden="true"
					/>
				</button>

				<button
						type="button"
						class="origam-video__btn"
						:aria-label="state.fullscreen.value ? 'Exit fullscreen' : 'Enter fullscreen'"
						data-cy="origam-video-fullscreen"
						@click="toggleFullscreenBtn"
				>
					<origam-icon
							:icon="state.fullscreen.value ? ICONS.FULLSCREEN_EXIT : ICONS.FULLSCREEN"
							aria-hidden="true"
					/>
				</button>
			</slot>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ref,
		type StyleValue,
		watch
	} from 'vue'

	import { OrigamIcon } from '../Icon'

	import { shouldSuppressAutoplay, useVideoPlayer } from '../../composables'

	import { MDI_ICONS } from '../../enums'

	import type {
		IVideoEmits,
		IVideoProps,
		IVideoSource
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamVideo>`. The component is a thin
	 * default skin on top of `useVideoPlayer` — it owns the toolbar
	 * markup, the poster / loading / error overlays, and the wiring
	 * between the native `<video>` element and the headless composable.
	 *
	 * Three controls modes:
	 *   - 'custom' (default): toolbar painted by this component.
	 *   - 'native': the native `controls` attribute is set on the
	 *     `<video>` and no custom UI is rendered.
	 *   - 'none': nothing — consumers either drive the player through
	 *     the `#controls` slot or programmatically.
	 *
	 * Defaults are inlined here (not pulled from a `VIDEO_DEFAULTS`
	 * const) because the Vue SFC compiler analyses `withDefaults`
	 * statically and only resolves literals — cf. CLAUDE.md rule.
	 ********************************************************/
	const props = withDefaults(defineProps<IVideoProps>(), {
		poster: undefined,
		tracks: () => [],
		autoplay: false,
		muted: false,
		loop: false,
		controls: 'custom',
		playsInline: true,
		preload: 'metadata',
		aspectRatio: '16/9',
		crossorigin: undefined,
		disablePictureInPicture: false
	})

	const emit = defineEmits<IVideoEmits>()

	/*********************************************************
	 * Icon refs — single source of truth for the toolbar glyphs.
	 ********************************************************/
	const ICONS = {
		PLAY: MDI_ICONS.PLAY,
		PAUSE: MDI_ICONS.PAUSE,
		LOADING: MDI_ICONS.LOADING,
		ALERT: MDI_ICONS.ALERT_CIRCLE,
		CAPTIONS: MDI_ICONS.CLOSED_CAPTION,
		PIP: MDI_ICONS.PICTURE_IN_PICTURE_BOTTOM_RIGHT,
		FULLSCREEN: MDI_ICONS.FULLSCREEN,
		FULLSCREEN_EXIT: MDI_ICONS.FULLSCREEN_EXIT,
		VOLUME_HIGH: MDI_ICONS.VOLUME_HIGH,
		VOLUME_MEDIUM: MDI_ICONS.VOLUME_MEDIUM,
		VOLUME_LOW: MDI_ICONS.VOLUME_LOW,
		VOLUME_OFF: MDI_ICONS.VOLUME_OFF
	}

	/*********************************************************
	 * Resolved autoplay / muted — autoplay is suppressed when the user
	 * prefers reduced motion (a11y), and the browser requires muted=true
	 * for unattended playback in most cases. The composable also logs
	 * the suppression at mount time; we keep the SFC-level resolution
	 * here so the native `<video autoplay>` attribute is correct from
	 * the very first render.
	 ********************************************************/
	const resolvedAutoplay = computed(() => {
		if (!props.autoplay) return false
		if (shouldSuppressAutoplay()) return false
		return true
	})

	const resolvedMuted = computed(() => {
		if (props.muted) return true
		// Browsers gate `autoplay` on `muted` — auto-force when the
		// consumer asked for autoplay without explicitly muting.
		if (resolvedAutoplay.value) return true
		return false
	})

	/*********************************************************
	 * Source resolution — `src` can be a single URL or an array of
	 * `<source>` descriptors. When it's an array we render multiple
	 * `<source>` children; when it's a string we set the `src`
	 * attribute on the `<video>` directly (and skip the children).
	 ********************************************************/
	const singleSrc = computed<string | undefined>(() => {
		return typeof props.src === 'string' ? props.src : undefined
	})

	const resolvedSources = computed<Array<IVideoSource>>(() => {
		return Array.isArray(props.src) ? props.src : []
	})

	/*********************************************************
	 * Composable
	 ********************************************************/
	const { videoRef, state, methods } = useVideoPlayer({
		autoplay: props.autoplay,
		muted: resolvedMuted.value,
		loop: props.loop,
		preload: props.preload
	})

	/*********************************************************
	 * Native event handlers — forward to the parent emit pipeline. The
	 * composable already listens to the same events internally; the
	 * forwarding here keeps the public emit contract independent of
	 * the headless state surface.
	 ********************************************************/
	function onTimeUpdate () {
		emit('timeupdate', state.currentTime.value)
	}

	function onVolumeChange () {
		emit('volumechange', state.volume.value)
	}

	function onLoadedMetadata () {
		emit('loadedmetadata', { duration: state.duration.value })
	}

	function onErrorEvent () {
		if (state.error.value) emit('error', state.error.value)
	}

	/*********************************************************
	 * Toolbar handlers — wrap the composable methods so we can also
	 * surface the user gesture as the matching emit event (parents
	 * who want to log a play/pause click track these directly).
	 ********************************************************/
	function togglePlay (): void {
		if (state.playing.value) methods.pause()
		else methods.play()
	}

	async function toggleFullscreenBtn (): Promise<void> {
		const wasFs = state.fullscreen.value
		await methods.toggleFullscreen()
		// The composable updates `fullscreen` via the document-level
		// `fullscreenchange` listener — after the await we know the
		// new value is committed and can fire the right event.
		if (state.fullscreen.value && !wasFs) emit('enterfullscreen')
		else if (!state.fullscreen.value && wasFs) emit('exitfullscreen')
	}

	async function togglePipBtn (): Promise<void> {
		await methods.togglePip()
	}

	function onScrubberInput (event: Event): void {
		const input = event.target as HTMLInputElement
		methods.seek(Number(input.value))
	}

	function onVolumeInput (event: Event): void {
		const input = event.target as HTMLInputElement
		methods.setVolume(Number(input.value))
	}

	/*********************************************************
	 * Captions — track the active text track index and allow toggling
	 * the whole subtitle UI off. We treat any non-disabled track as
	 * "captions on"; toggling off sets every track to `disabled`.
	 ********************************************************/
	const captionsEnabled = ref<boolean>(false)

	const hasCaptions = computed(() => props.tracks.some((track) => {
		return track.kind === 'captions' || track.kind === 'subtitles'
	}))

	function toggleCaptions (): void {
		const el = videoRef.value
		if (!el) return
		const trackList = el.textTracks
		captionsEnabled.value = !captionsEnabled.value
		for (let i = 0; i < trackList.length; i++) {
			const track = trackList[i]
			if (!captionsEnabled.value) {
				track.mode = 'disabled'
			} else {
				// Activate the first one that matches the user's
				// declared default; otherwise the very first.
				const declared = props.tracks[i]
				if (declared?.default) track.mode = 'showing'
				else if (i === 0) track.mode = 'showing'
				else track.mode = 'disabled'
			}
		}
	}

	// Watch ready to initialise captions once tracks are wired up.
	watch(() => state.ready.value, (ready) => {
		if (!ready) return
		const el = videoRef.value
		if (!el) return
		// Mirror the `default` attribute to our internal flag so the
		// first paint after metadata matches what the user expected.
		const someShowing = Array.from(el.textTracks).some((track) => track.mode === 'showing')
		captionsEnabled.value = someShowing
	})

	/*********************************************************
	 * PIP support — fall back gracefully on browsers that don't expose
	 * the API (Firefox, some embedded WebViews). We feature-detect at
	 * computation time rather than at module load so SSR doesn't crash.
	 ********************************************************/
	const pipSupported = computed<boolean>(() => {
		if (props.disablePictureInPicture) return false
		if (typeof document === 'undefined') return false
		const doc = document as unknown as { pictureInPictureEnabled?: boolean }
		return Boolean(doc.pictureInPictureEnabled)
	})

	/*********************************************************
	 * Derived display values — formatted time, volume icon, scrubber
	 * max. Kept as computeds so the template stays free of inline
	 * logic (cf. CLAUDE.md "no logic in templates" rule).
	 ********************************************************/
	const formattedCurrentTime = computed(() => formatTime(state.currentTime.value))
	const formattedDuration = computed(() => formatTime(state.duration.value))

	const scrubberMax = computed(() => {
		return Number.isFinite(state.duration.value) ? state.duration.value : 0
	})

	const volumeIcon = computed(() => {
		if (state.muted.value || state.volume.value === 0) return ICONS.VOLUME_OFF
		if (state.volume.value < 0.34) return ICONS.VOLUME_LOW
		if (state.volume.value < 0.67) return ICONS.VOLUME_MEDIUM
		return ICONS.VOLUME_HIGH
	})

	const showPosterOverlay = computed(() => {
		return Boolean(props.poster) &&
			state.paused.value &&
			state.currentTime.value === 0 &&
			!state.error.value
	})

	const errorMessage = computed(() => {
		const err = state.error.value
		if (!err) return 'Playback error'
		if ('message' in err && err.message) return err.message
		return 'Playback error'
	})

	/*********************************************************
	 * Format helper — mm:ss for short videos, hh:mm:ss for long ones.
	 * Returns an em dash placeholder while metadata is still loading
	 * (duration is NaN) so the toolbar doesn't flash "NaN:NaN".
	 ********************************************************/
	function formatTime (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const h = Math.floor(total / 3600)
		const m = Math.floor((total % 3600) / 60)
		const s = total % 60
		const pad = (value: number) => value.toString().padStart(2, '0')
		if (h > 0) return `${h}:${pad(m)}:${pad(s)}`
		return `${pad(m)}:${pad(s)}`
	}

	/*********************************************************
	 * Slot bindings — single source of truth for the `#controls` slot.
	 ********************************************************/
	const slotBindings = computed(() => ({
		playing: state.playing.value,
		paused: state.paused.value,
		currentTime: state.currentTime.value,
		duration: state.duration.value,
		buffered: state.buffered.value,
		volume: state.volume.value,
		muted: state.muted.value,
		fullscreen: state.fullscreen.value,
		pip: state.pip.value,
		loading: state.loading.value,
		error: state.error.value,
		methods
	}))

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-video--playing': state.playing.value,
			'origam-video--paused': state.paused.value,
			'origam-video--loading': state.loading.value,
			'origam-video--error': state.error.value !== null,
			'origam-video--fullscreen': state.fullscreen.value,
			'origam-video--pip': state.pip.value,
			'origam-video--controls-native': props.controls === 'native',
			'origam-video--controls-custom': props.controls === 'custom',
			'origam-video--controls-none': props.controls === 'none'
		},
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		{
			aspectRatio: props.aspectRatio
		},
		props.style
	] as StyleValue)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		videoRef,
		state,
		methods
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-video {
		position: relative;
		display: block;
		width: 100%;
		background-color: var(--origam-video---background-color, #000000);
		overflow: hidden;
		border-radius: var(--origam-video---border-radius, 0);
	}

	.origam-video__el {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.origam-video__poster {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: var(--origam-video__poster---background-color, #000000);
	}

	.origam-video__poster-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.origam-video__poster-btn {
		all: unset;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-video---poster-btn-size, 64px);
		height: var(--origam-video---poster-btn-size, 64px);
		border-radius: 50%;
		background-color: var(--origam-video---poster-btn-background-color, rgba(0, 0, 0, 0.6));
		color: var(--origam-video---poster-btn-color, #ffffff);
		font-size: var(--origam-video---poster-btn-font-size, 28px);
		cursor: pointer;
		transition: background-color 160ms ease;
	}

	.origam-video__poster-btn:hover {
		background-color: var(--origam-video---poster-btn-background-color-hover, rgba(0, 0, 0, 0.8));
	}

	.origam-video__loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--origam-video__loading---color, #ffffff);
		font-size: var(--origam-video__loading---font-size, 32px);
		pointer-events: none;
	}

	.origam-video__loading-icon {
		animation: origam-video-spin 1s linear infinite;
	}

	@keyframes origam-video-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.origam-video__error {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: var(--origam-video--error---gap, 8px);
		padding: var(--origam-video--error---padding, 16px);
		background-color: var(--origam-video--error---background-color, rgba(0, 0, 0, 0.85));
		color: var(--origam-video--error---color, #f87171);
		font-size: var(--origam-video--error---font-size, 14px);
		text-align: center;
	}

	.origam-video__error-icon {
		font-size: var(--origam-video--error---icon-font-size, 32px);
	}

	.origam-video__controls {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: var(--origam-video__controls---gap, 8px);
		padding: var(--origam-video__controls---padding, 8px 12px);
		background: var(--origam-video__controls---background-color, linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent));
		color: var(--origam-video__controls---color, #ffffff);
	}

	.origam-video__btn {
		all: unset;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-video__btn---size, 32px);
		height: var(--origam-video__btn---size, 32px);
		border-radius: var(--origam-video__btn---border-radius, 4px);
		cursor: pointer;
		font-size: var(--origam-video__btn---font-size, 18px);
		color: var(--origam-video__btn---color, #ffffff);
		transition: background-color 120ms ease, color 120ms ease;
	}

	.origam-video__btn:hover,
	.origam-video__btn:focus-visible {
		background-color: var(--origam-video__btn---background-color-hover, rgba(255, 255, 255, 0.15));
		color: var(--origam-video__btn---color-hover, #ffffff);
	}

	.origam-video__btn--active {
		background-color: var(--origam-video__btn---background-color-active, rgba(255, 255, 255, 0.25));
	}

	.origam-video__time {
		font-family: var(--origam-video__time---font-family, ui-monospace, monospace);
		font-size: var(--origam-video__time---font-size, 12px);
		color: var(--origam-video__time---color, #ffffff);
		white-space: nowrap;
	}

	.origam-video__scrubber {
		flex: 1 1 auto;
		min-width: 0;
		accent-color: var(--origam-video__scrubber---color, #ffffff);
		height: var(--origam-video__scrubber---thumb-size, 16px);
		cursor: pointer;
	}

	.origam-video__volume {
		width: var(--origam-video__volume---width, 80px);
		accent-color: var(--origam-video__volume---color, #ffffff);
		cursor: pointer;
	}

	.origam-video--fullscreen {
		border-radius: 0;
	}

	.origam-video--error .origam-video__controls,
	.origam-video--error .origam-video__poster {
		display: none;
	}
</style>
