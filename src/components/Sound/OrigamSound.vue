<template>
	<div
			class="origam-sound"
			:class="rootClasses"
			:style="rootStyles"
			data-cy="origam-sound"
	>
		<audio
				ref="audioRef"
				class="origam-sound__el"
				:src="singleSrc"
				:autoplay="resolvedAutoplay"
				:muted="resolvedMuted"
				:loop="loop"
				:controls="controls === 'native'"
				:preload="preload"
				:crossorigin="crossorigin"
				data-cy="origam-sound-el"
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
		</audio>

		<div
				v-if="controls === 'custom'"
				class="origam-sound__inner"
		>
			<div
					v-if="showCover"
					class="origam-sound__cover"
					data-cy="origam-sound-cover"
			>
				<slot name="cover">
					<img
							class="origam-sound__cover-img"
							:src="resolvedCover"
							:alt="coverAlt"
							data-cy="origam-sound-cover-img"
					/>
				</slot>
			</div>

			<div class="origam-sound__body">
				<div
						v-if="hasMetadata"
						class="origam-sound__metadata"
						data-cy="origam-sound-metadata"
				>
					<slot
							name="metadata"
							:metadata="resolvedMetadata"
					>
						<span
								v-if="resolvedMetadata.title"
								class="origam-sound__title"
								data-cy="origam-sound-title"
						>{{ resolvedMetadata.title }}</span>
						<span
								v-if="resolvedMetadata.artist"
								class="origam-sound__artist"
								data-cy="origam-sound-artist"
						>{{ resolvedMetadata.artist }}</span>
						<span
								v-if="resolvedMetadata.album"
								class="origam-sound__album"
								data-cy="origam-sound-album"
						>{{ resolvedMetadata.album }}</span>
					</slot>
				</div>

				<div
						v-if="waveformEnabled"
						class="origam-sound__waveform"
						data-cy="origam-sound-waveform"
				>
					<slot
							name="waveform"
							:peaks="peaks"
							:current-time="state.currentTime.value"
							:duration="state.duration.value"
					>
						<canvas
								ref="canvasRef"
								class="origam-sound__waveform-canvas"
								:aria-label="waveformAriaLabel"
								role="img"
								data-cy="origam-sound-waveform-canvas"
								@click="onWaveformClick"
						/>
					</slot>
				</div>

				<div
						class="origam-sound__controls"
						data-cy="origam-sound-controls"
				>
					<slot
							name="controls"
							v-bind="slotBindings"
					>
						<button
								type="button"
								class="origam-sound__btn"
								:aria-label="state.playing.value ? 'Pause' : 'Play'"
								data-cy="origam-sound-play"
								@click="togglePlay"
						>
							<origam-icon
									:icon="state.playing.value ? ICONS.PAUSE : ICONS.PLAY"
									aria-hidden="true"
							/>
						</button>

						<span
								class="origam-sound__time"
								data-cy="origam-sound-time"
						>{{ formattedCurrentTime }} / {{ formattedDuration }}</span>

						<input
								v-if="!waveformEnabled"
								class="origam-sound__scrubber"
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
								data-cy="origam-sound-scrubber"
								@input="onScrubberInput"
						/>

						<button
								type="button"
								class="origam-sound__btn"
								:aria-label="state.muted.value ? 'Unmute' : 'Mute'"
								data-cy="origam-sound-mute"
								@click="methods.toggleMute()"
						>
							<origam-icon
									:icon="volumeIcon"
									aria-hidden="true"
							/>
						</button>

						<input
								class="origam-sound__volume"
								type="range"
								min="0"
								max="1"
								step="0.05"
								:value="state.muted.value ? 0 : state.volume.value"
								aria-label="Volume"
								data-cy="origam-sound-volume"
								@input="onVolumeInput"
						/>
					</slot>
				</div>
			</div>
		</div>

		<div
				v-if="state.error.value"
				class="origam-sound__error"
				role="alert"
				data-cy="origam-sound-error"
		>
			<slot
					name="error"
					:error="state.error.value"
			>
				<origam-icon
						:icon="ICONS.ALERT"
						class="origam-sound__error-icon"
						aria-hidden="true"
				/>
				<span class="origam-sound__error-msg">{{ errorMessage }}</span>
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
		nextTick,
		onBeforeUnmount,
		onMounted,
		ref,
		type StyleValue,
		watch
	} from 'vue'

	import { OrigamIcon } from '../Icon'

	import {
		shouldSuppressAudioAutoplay,
		useAudioPlayer,
		useWaveform
	} from '../../composables'

	import { MDI_ICONS } from '../../enums'

	import type {
		ISoundEmits,
		ISoundMetadata,
		ISoundProps,
		ISoundSource
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamSound>`. Mirrors the structure of
	 * `<OrigamVideo>` — a thin default skin on top of `useAudioPlayer`,
	 * plus the optional `useWaveform` decoder for the visual peak
	 * display. Three controls modes (custom / native / none), Media
	 * Session API integration, and SSR-safe waveform computation.
	 *
	 * Defaults are inlined here (not pulled from a `SOUND_DEFAULTS`
	 * const) because the Vue SFC compiler analyses `withDefaults`
	 * statically and only resolves literals — cf. CLAUDE.md rule.
	 ********************************************************/
	const props = withDefaults(defineProps<ISoundProps>(), {
		cover: undefined,
		metadata: () => ({}),
		waveform: false,
		waveformColor: 'currentColor',
		autoplay: false,
		muted: false,
		loop: false,
		controls: 'custom',
		preload: 'metadata',
		crossorigin: undefined
	})

	const emit = defineEmits<ISoundEmits>()

	/*********************************************************
	 * Icon refs — single source of truth for the toolbar glyphs.
	 ********************************************************/
	const ICONS = {
		PLAY: MDI_ICONS.PLAY,
		PAUSE: MDI_ICONS.PAUSE,
		ALERT: MDI_ICONS.ALERT_CIRCLE,
		VOLUME_HIGH: MDI_ICONS.VOLUME_HIGH,
		VOLUME_MEDIUM: MDI_ICONS.VOLUME_MEDIUM,
		VOLUME_LOW: MDI_ICONS.VOLUME_LOW,
		VOLUME_OFF: MDI_ICONS.VOLUME_OFF
	}

	/*********************************************************
	 * Resolved autoplay / muted — autoplay is suppressed when the user
	 * prefers reduced motion (a11y), and the browser requires muted=true
	 * for unattended playback in most cases.
	 ********************************************************/
	const resolvedAutoplay = computed(() => {
		if (!props.autoplay) return false
		if (shouldSuppressAudioAutoplay()) return false
		return true
	})

	const resolvedMuted = computed(() => {
		if (props.muted) return true
		if (resolvedAutoplay.value) return true
		return false
	})

	/*********************************************************
	 * Source resolution — `src` can be a single URL or an array of
	 * `<source>` descriptors. When it's an array we render multiple
	 * `<source>` children; when it's a string we set the `src`
	 * attribute on the `<audio>` directly.
	 ********************************************************/
	const singleSrc = computed<string | undefined>(() => {
		return typeof props.src === 'string' ? props.src : undefined
	})

	const resolvedSources = computed<Array<ISoundSource>>(() => {
		return Array.isArray(props.src) ? props.src : []
	})

	/**
	 * Active source string used by the waveform decoder. We pick the
	 * single `src` first; when an array is passed, we fall back to the
	 * first entry — multi-source markup is typically about codec
	 * fallbacks, not different recordings, so the first one decodes
	 * the same audio across browsers.
	 */
	const activeSrc = computed<string | undefined>(() => {
		if (singleSrc.value) return singleSrc.value
		return resolvedSources.value[0]?.src
	})

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
	 * Metadata — when the consumer omits the prop we fall back to an
	 * empty object so the template can branch on individual fields
	 * without needing a `?.` everywhere.
	 ********************************************************/
	const resolvedMetadata = computed<ISoundMetadata>(() => props.metadata ?? {})

	const hasMetadata = computed<boolean>(() => {
		const m = resolvedMetadata.value
		return Boolean(m.title || m.artist || m.album)
	})

	/*********************************************************
	 * Cover — explicit `cover` prop wins; otherwise we use the first
	 * artwork entry in the metadata block.
	 ********************************************************/
	const resolvedCover = computed<string | undefined>(() => {
		if (props.cover) return props.cover
		const first = resolvedMetadata.value.artwork?.[0]
		return first?.src
	})

	const coverAlt = computed<string>(() => {
		const m = resolvedMetadata.value
		if (m.title && m.artist) return `${m.title} — ${m.artist}`
		if (m.title) return m.title
		return ''
	})

	const showCover = computed<boolean>(() => Boolean(resolvedCover.value))

	/*********************************************************
	 * Waveform — `true` always enables the computation; `'auto'`
	 * activates it only when the browser supports
	 * `OfflineAudioContext` (SSR + jsdom fall through to `false`).
	 ********************************************************/
	const waveformEnabled = computed<boolean>(() => {
		if (props.waveform === true) return true
		if (props.waveform === 'auto') {
			if (typeof window === 'undefined') return false
			const win = window as unknown as { OfflineAudioContext?: unknown }
			return Boolean(win.OfflineAudioContext)
		}
		return false
	})

	const waveformSrc = computed<string | undefined>(() => waveformEnabled.value ? activeSrc.value : undefined)

	const { peaks } = useWaveform(waveformSrc, { bins: 200, crossOrigin: props.crossorigin })

	const waveformAriaLabel = computed<string>(() => 'Audio waveform')

	// Forward the computed peaks to the parent for consumer-side logging
	// / instrumentation. The watch fires once per recomputation (when
	// the source changes or the user calls `compute()`).
	watch(peaks, (next) => {
		if (next.length > 0) emit('waveform', next)
	})

	/*********************************************************
	 * Canvas rendering — re-paints on every peak / currentTime change.
	 * A ResizeObserver keeps the canvas crisp on layout changes.
	 ********************************************************/
	const canvasRef = ref<HTMLCanvasElement | null>(null)
	let resizeObserver: ResizeObserver | null = null

	function draw (): void {
		const canvas = canvasRef.value
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		const list = peaks.value
		if (list.length === 0) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			return
		}

		const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
		const rect = canvas.getBoundingClientRect()
		const width = Math.max(1, Math.floor(rect.width * dpr))
		const height = Math.max(1, Math.floor(rect.height * dpr))
		if (canvas.width !== width) canvas.width = width
		if (canvas.height !== height) canvas.height = height

		const styles = window.getComputedStyle(canvas)
		const playedColor = styles.getPropertyValue('--origam-sound__waveform---color-played').trim() || styles.color
		const unplayedColor = styles.getPropertyValue('--origam-sound__waveform---color-unplayed').trim() || styles.color

		const barCount = list.length
		const totalGapPx = (barCount - 1)
		const barWidth = Math.max(1, Math.floor((width - totalGapPx) / barCount))
		const midY = height / 2
		const progress = Number.isFinite(state.duration.value) && state.duration.value > 0
			? state.currentTime.value / state.duration.value
			: 0
		const playedBars = Math.floor(progress * barCount)

		ctx.clearRect(0, 0, width, height)
		for (let i = 0; i < barCount; i++) {
			const value = list[i] ?? 0
			const h = Math.max(1, value * midY)
			const x = i * (barWidth + 1)
			ctx.fillStyle = i <= playedBars ? playedColor : unplayedColor
			ctx.fillRect(x, midY - h, barWidth, h * 2)
		}
	}

	function scheduleDraw (): void {
		if (typeof window === 'undefined') return
		// Run after Vue flushes so the canvas dimensions are correct
		// (the `<canvas>` may have just been mounted).
		void nextTick(() => draw())
	}

	watch([peaks, () => state.currentTime.value, () => state.duration.value, () => props.waveformColor], scheduleDraw)
	watch(waveformEnabled, () => scheduleDraw())

	onMounted(() => {
		if (typeof window === 'undefined') return
		scheduleDraw()
		if (typeof ResizeObserver !== 'undefined' && canvasRef.value) {
			resizeObserver = new ResizeObserver(() => draw())
			resizeObserver.observe(canvasRef.value)
		}
	})

	onBeforeUnmount(() => {
		if (resizeObserver) {
			resizeObserver.disconnect()
			resizeObserver = null
		}
	})

	/**
	 * Click-to-seek on the waveform — the canvas spans the full
	 * duration, so we map `clientX` to a seconds value before calling
	 * `seek()`. Falls back to a no-op when the duration isn't yet
	 * known.
	 */
	function onWaveformClick (event: MouseEvent): void {
		const canvas = canvasRef.value
		if (!canvas) return
		if (!Number.isFinite(state.duration.value) || state.duration.value <= 0) return
		const rect = canvas.getBoundingClientRect()
		const x = event.clientX - rect.left
		const ratio = Math.max(0, Math.min(1, x / rect.width))
		methods.seek(ratio * state.duration.value)
	}

	/*********************************************************
	 * Media Session API — exposes the metadata + action handlers to the
	 * OS so the lock screen / Touch Bar / Bluetooth play button can
	 * drive the player without bringing the page to the foreground.
	 ********************************************************/
	function syncMediaSession (): void {
		if (typeof navigator === 'undefined') return
		const ms = (navigator as unknown as { mediaSession?: MediaSession }).mediaSession
		if (!ms) return
		const m = resolvedMetadata.value
		const MetaCtor = (window as unknown as { MediaMetadata?: typeof MediaMetadata }).MediaMetadata
		if (MetaCtor && (m.title || m.artist || m.album || m.artwork?.length)) {
			ms.metadata = new MetaCtor({
				title: m.title ?? '',
				artist: m.artist ?? '',
				album: m.album ?? '',
				artwork: m.artwork ?? []
			})
		}
		try {
			ms.setActionHandler('play', () => { void methods.play() })
			ms.setActionHandler('pause', () => methods.pause())
			ms.setActionHandler('seekto', (event) => {
				const detail = event as unknown as { seekTime?: number }
				if (typeof detail.seekTime === 'number') methods.seek(detail.seekTime)
			})
		} catch {
			// Older Safari versions throw on unknown action handlers —
			// swallow so the player still renders.
		}
	}

	function clearMediaSession (): void {
		if (typeof navigator === 'undefined') return
		const ms = (navigator as unknown as { mediaSession?: MediaSession }).mediaSession
		if (!ms) return
		try {
			ms.setActionHandler('play', null)
			ms.setActionHandler('pause', null)
			ms.setActionHandler('seekto', null)
		} catch { /* ignored */ }
	}

	onMounted(() => syncMediaSession())
	watch(resolvedMetadata, () => syncMediaSession(), { deep: true })
	onBeforeUnmount(() => clearMediaSession())

	/*********************************************************
	 * Native event handlers — forward to the parent emit pipeline.
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
	 * Toolbar handlers.
	 ********************************************************/
	function togglePlay (): void {
		if (state.playing.value) methods.pause()
		else methods.play()
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

	const errorMessage = computed(() => {
		const err = state.error.value
		if (!err) return 'Playback error'
		if ('message' in err && err.message) return err.message
		return 'Playback error'
	})

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
		loading: state.loading.value,
		error: state.error.value,
		methods
	}))

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-sound--playing': state.playing.value,
			'origam-sound--paused': state.paused.value,
			'origam-sound--loading': state.loading.value,
			'origam-sound--error': state.error.value !== null,
			'origam-sound--controls-native': props.controls === 'native',
			'origam-sound--controls-custom': props.controls === 'custom',
			'origam-sound--controls-none': props.controls === 'none',
			'origam-sound--has-cover': showCover.value,
			'origam-sound--has-waveform': waveformEnabled.value
		},
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		{
			'--origam-sound__waveform---color-played': props.waveformColor
		},
		props.style
	] as StyleValue)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		audioRef,
		state,
		methods,
		peaks
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-sound {
		display: block;
		width: 100%;
		padding: var(--origam-sound---padding, 12px);
		background-color: var(--origam-sound---background-color, #ffffff);
		border-radius: var(--origam-sound---border-radius, 8px);
		color: var(--origam-sound---color, inherit);
	}

	.origam-sound__el {
		display: none;
	}

	.origam-sound--controls-native .origam-sound__el {
		display: block;
		width: 100%;
	}

	.origam-sound__inner {
		display: flex;
		align-items: center;
		gap: var(--origam-sound---gap, 12px);
	}

	.origam-sound__cover {
		flex: 0 0 auto;
		width: var(--origam-sound__cover---size, 80px);
		height: var(--origam-sound__cover---size, 80px);
		overflow: hidden;
		border-radius: var(--origam-sound__cover---border-radius, 6px);
	}

	.origam-sound__cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.origam-sound__body {
		flex: 1 1 auto;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--origam-sound__body---gap, 6px);
	}

	.origam-sound__metadata {
		display: flex;
		flex-direction: column;
		gap: var(--origam-sound__metadata---gap, 2px);
		min-width: 0;
	}

	.origam-sound__title {
		color: var(--origam-sound__title---color, inherit);
		font-size: var(--origam-sound__title---font-size, 14px);
		font-weight: var(--origam-sound__title---font-weight, 600);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.origam-sound__artist {
		color: var(--origam-sound__artist---color, inherit);
		font-size: var(--origam-sound__artist---font-size, 12px);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0.85;
	}

	.origam-sound__album {
		color: var(--origam-sound__album---color, inherit);
		font-size: var(--origam-sound__album---font-size, 11px);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0.65;
	}

	.origam-sound__waveform {
		height: var(--origam-sound__waveform---height, 40px);
		width: 100%;
	}

	.origam-sound__waveform-canvas {
		display: block;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	.origam-sound__controls {
		display: flex;
		align-items: center;
		gap: var(--origam-sound__controls---gap, 8px);
		color: var(--origam-sound__controls---icon-color, inherit);
	}

	.origam-sound__btn {
		all: unset;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-sound__btn---size, 28px);
		height: var(--origam-sound__btn---size, 28px);
		border-radius: var(--origam-sound__btn---border-radius, 4px);
		cursor: pointer;
		font-size: var(--origam-sound__btn---font-size, 16px);
		color: var(--origam-sound__controls---icon-color, inherit);
		transition: background-color 120ms ease, color 120ms ease;
	}

	.origam-sound__btn:hover,
	.origam-sound__btn:focus-visible {
		color: var(--origam-sound__controls---icon-color-hover, inherit);
		background-color: var(--origam-sound__btn---background-color-hover, rgba(0, 0, 0, 0.08));
	}

	.origam-sound__time {
		font-family: var(--origam-sound__time---font-family, ui-monospace, monospace);
		font-size: var(--origam-sound__time---font-size, 11px);
		color: var(--origam-sound__time---color, inherit);
		white-space: nowrap;
	}

	.origam-sound__scrubber {
		flex: 1 1 auto;
		min-width: 0;
		accent-color: var(--origam-sound__scrubber---color, currentColor);
		cursor: pointer;
	}

	.origam-sound__volume {
		width: var(--origam-sound__volume---width, 80px);
		accent-color: var(--origam-sound__volume---color, currentColor);
		cursor: pointer;
	}

	.origam-sound__error {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px;
		color: var(--origam-sound--error---color, #b91c1c);
		font-size: 12px;
	}

	.origam-sound__error-icon {
		font-size: 16px;
	}
</style>
