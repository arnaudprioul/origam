<template>
	<origam-responsive
			class="origam-video"
			:class="rootClasses"
			:style="rootStyles"
			:aspect-ratio="effectiveAspectRatio"
			content-class="origam-video__inner"
			data-cy="origam-video"
			@mouseenter="onPlayerMouseEnter"
			@mouseleave="onPlayerMouseLeave"
	>
		<template #additional>
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
				@pointerup="onVideoTap"
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
				v-if="showCenterOverlay && !showPosterOverlay && controls === 'custom'"
				class="origam-video__center"
				:class="{ 'origam-video__center--visible': showCenterOverlay }"
				data-cy="origam-video-center"
				@pointerup="onVideoTap"
		>
			<slot
					name="centerControls"
					v-bind="slotBindings"
			>
				<button
						v-if="skipSeconds > 0"
						class="origam-video__center-btn origam-video__center-btn--skip-back origam-video__skip-icon"
						:aria-label="t('origam.video.rewind', skipSeconds)"
						data-cy="origam-video-skip-back"
						type="button"
						@click="onSkipBack"
				>
					<origam-icon
							:icon="ICONS.ROTATE_LEFT"
							aria-hidden="true"
					/>
					<span class="origam-video__skip-seconds" aria-hidden="true">{{ skipSeconds }}</span>
				</button>
				<origam-btn
						:icon="state.playing.value ? ICONS.PAUSE : ICONS.PLAY"
						class="origam-video__center-btn origam-video__center-btn--play"
						:aria-label="t(state.playing.value ? 'origam.video.pause' : 'origam.video.play')"
						data-cy="origam-video-center-play"
						size="x-large"
						variant="elevated"
						@click="togglePlay"
				/>
				<button
						v-if="skipSeconds > 0"
						class="origam-video__center-btn origam-video__center-btn--skip-forward origam-video__skip-icon"
						:aria-label="t('origam.video.forward', skipSeconds)"
						data-cy="origam-video-skip-forward"
						type="button"
						@click="onSkipForward"
				>
					<origam-icon
							:icon="ICONS.ROTATE_RIGHT"
							aria-hidden="true"
					/>
					<span class="origam-video__skip-seconds" aria-hidden="true">{{ skipSeconds }}</span>
				</button>
			</slot>
		</div>

		<transition name="origam-video-skip-ripple">
			<div
					v-if="skipFeedback"
					:key="skipFeedback.id"
					class="origam-video__skip-ripple"
					:class="`origam-video__skip-ripple--${skipFeedback.side}`"
					aria-hidden="true"
					data-cy="origam-video-skip-ripple"
			>
				<div class="origam-video__skip-ripple-content">
					<div class="origam-video__skip-chevrons">
						<origam-icon
								:icon="skipFeedback.side === 'left' ? ICONS.CHEVRON_LEFT : ICONS.CHEVRON_RIGHT"
								class="origam-video__skip-chevron origam-video__skip-chevron--1"
								aria-hidden="true"
						/>
						<origam-icon
								:icon="skipFeedback.side === 'left' ? ICONS.CHEVRON_LEFT : ICONS.CHEVRON_RIGHT"
								class="origam-video__skip-chevron origam-video__skip-chevron--2"
								aria-hidden="true"
						/>
						<origam-icon
								:icon="skipFeedback.side === 'left' ? ICONS.CHEVRON_LEFT : ICONS.CHEVRON_RIGHT"
								class="origam-video__skip-chevron origam-video__skip-chevron--3"
								aria-hidden="true"
						/>
					</div>
					<span class="origam-video__skip-ripple-label">{{ t('origam.video.seconds', skipFeedback.seconds) }}</span>
				</div>
			</div>
		</transition>

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
				<origam-btn
						:icon="ICONS.PLAY"
						class="origam-video__poster-btn"
						:aria-label="t('origam.video.play')"
						data-cy="origam-video-poster-btn"
						size="large"
						variant="elevated"
						@click.stop="methods.play()"
				/>
			</slot>
		</div>

		<div
				v-if="state.loading.value && !state.error.value"
				class="origam-video__loading"
				role="status"
				:aria-label="t('origam.loading')"
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
				:class="{
					'origam-video__controls--inset': inset,
					'origam-video__controls--visible': controlsVisible
				}"
				data-cy="origam-video-controls"
		>
			<slot
					name="controls"
					v-bind="slotBindings"
			>
				<origam-btn
						:icon="state.playing.value ? ICONS.PAUSE : ICONS.PLAY"
						class="origam-video__btn"
						:aria-label="t(state.playing.value ? 'origam.video.pause' : 'origam.video.play')"
						data-cy="origam-video-play"
						size="small"
						variant="text"
						@click="togglePlay"
				/>

				<span
						class="origam-video__time"
						data-cy="origam-video-time"
				>{{ formattedCurrentTime }} / {{ formattedDuration }}</span>

				<div
						ref="scrubberRef"
						class="origam-video__scrubber"
						:class="{ 'origam-video__scrubber--scrubbing': isScrubbing }"
						role="slider"
						tabindex="0"
						:aria-label="t('origam.video.seek')"
						:aria-valuemin="0"
						:aria-valuemax="scrubberMax"
						:aria-valuenow="state.currentTime.value"
						:aria-valuetext="formattedCurrentTime"
						data-cy="origam-video-scrubber"
						@pointerdown="onScrubberPointerDown"
						@pointermove="onScrubberPointerMove"
						@pointerleave="onScrubberPointerLeave"
						@keydown="onScrubberKeyDown"
				>
					<div class="origam-video__scrubber-track">
						<div
								class="origam-video__scrubber-buffer"
								:style="{ width: bufferedPct + '%' }"
								aria-hidden="true"
						/>
						<div
								class="origam-video__scrubber-progress"
								:style="{ width: progressPct + '%' }"
								aria-hidden="true"
						/>
						<div
								v-if="hoverPct !== null"
								class="origam-video__scrubber-hover-time"
								:style="{ left: hoverPct + '%' }"
								aria-hidden="true"
						>{{ hoverTimeFormatted }}</div>
						<div
								class="origam-video__scrubber-thumb"
								:style="{ left: progressPct + '%' }"
								aria-hidden="true"
						/>
					</div>
				</div>

				<origam-tooltip
						:open-on-hover="true"
						:open-on-click="false"
						:close-delay="300"
						:open-delay="80"
						location="top"
						content-class="origam-video__volume-tooltip"
				>
					<template #activator="{ props: activatorProps }">
						<origam-btn
								v-bind="activatorProps"
								:icon="volumeIcon"
								class="origam-video__btn"
								:aria-label="t(state.muted.value ? 'origam.video.unmute' : 'origam.video.mute')"
								data-cy="origam-video-mute"
								size="small"
								variant="text"
								@click="methods.toggleMute()"
						/>
					</template>
					<div class="origam-video__volume-wrapper">
						<input
								class="origam-video__volume"
								type="range"
								min="0"
								max="1"
								step="0.05"
								:value="state.muted.value ? 0 : state.volume.value"
								:aria-label="t('origam.video.volume')"
								data-cy="origam-video-volume"
								@input="onVolumeInput($event)"
						/>
					</div>
				</origam-tooltip>

				<origam-btn
						v-if="hasCaptions"
						:icon="ICONS.CAPTIONS"
						class="origam-video__btn"
						:class="{ 'origam-video__btn--active': captionsEnabled }"
						:aria-label="t(captionsEnabled ? 'origam.video.disableCaptions' : 'origam.video.enableCaptions')"
						data-cy="origam-video-captions"
						size="small"
						variant="text"
						:color="captionsEnabled ? 'primary' : undefined"
						@click="toggleCaptions"
				/>

				<origam-btn
						v-if="pipSupported"
						:icon="ICONS.PIP"
						class="origam-video__btn"
						:aria-label="t(state.pip.value ? 'origam.video.exitPip' : 'origam.video.enterPip')"
						data-cy="origam-video-pip"
						size="small"
						variant="text"
						@click="togglePipBtn"
				/>

				<origam-btn
						v-if="allowRemotePlayback && state.remoteAvailable.value"
						:icon="ICONS.CAST"
						class="origam-video__btn"
						:aria-label="t(state.remoteState.value === 'connected' ? 'origam.video.stopCasting' : 'origam.video.castToDevice')"
						data-cy="origam-video-cast"
						size="small"
						variant="text"
						:color="state.remoteState.value === 'connected' ? 'primary' : undefined"
						@click="onCastClick"
				/>

				<origam-tooltip
						v-if="hasConfigContent"
						v-model="configMenuOpen"
						:open-on-hover="false"
						:open-on-click="true"
						:close-on-content-click="false"
						location="top"
						content-class="origam-video__config-menu"
				>
					<template #activator="{ props: activatorProps }">
						<origam-btn
								v-bind="activatorProps"
								:icon="ICONS.COG"
								class="origam-video__btn"
								:class="{ 'origam-video__btn--active': configMenuOpen }"
								:aria-label="t('origam.video.settings')"
								data-cy="origam-video-config"
								size="small"
								variant="text"
						/>
					</template>
					<div class="origam-video__config" data-cy="origam-video-config-menu">
						<slot
								name="config"
								v-bind="{
									...slotBindings,
									setPlaybackRate: onPlaybackRateClick,
									closeMenu: () => { configMenuOpen = false }
								}"
						>
							<!-- Main level — rows that drill into a submenu. -->
							<template v-if="configSection === 'main'">
								<button
										v-if="(playbackRates?.length ?? 0) > 1"
										type="button"
										class="origam-video__config-row"
										data-cy="origam-video-config-open-speed"
										@click="configSection = 'speed'"
								>
									<span class="origam-video__config-row-label">{{ t('origam.video.playbackSpeed') }}</span>
									<span class="origam-video__config-row-value">{{ formattedPlaybackRate }}</span>
									<span class="origam-video__config-row-arrow" aria-hidden="true">›</span>
								</button>
							</template>

							<!-- Playback speed submenu. -->
							<template v-else-if="configSection === 'speed'">
								<button
										type="button"
										class="origam-video__config-row origam-video__config-row--back"
										data-cy="origam-video-config-back"
										@click="configSection = 'main'"
								>
									<span class="origam-video__config-row-arrow origam-video__config-row-arrow--back" aria-hidden="true">‹</span>
									<span class="origam-video__config-row-label">{{ t('origam.video.playbackSpeed') }}</span>
								</button>
								<button
										v-for="rate in playbackRates"
										:key="rate"
										type="button"
										class="origam-video__config-item"
										:class="{ 'origam-video__config-item--active': Math.abs(state.playbackRate.value - rate) < 0.01 }"
										:data-cy="`origam-video-config-rate-${rate}`"
										@click="onPlaybackRateClick(rate)"
								>
									{{ rate === 1 ? t('origam.video.normalSpeed') : `${rate}×` }}
								</button>
							</template>
						</slot>
					</div>
				</origam-tooltip>

				<origam-btn
						:icon="state.fullscreen.value ? ICONS.FULLSCREEN_EXIT : ICONS.FULLSCREEN"
						class="origam-video__btn"
						:aria-label="t(state.fullscreen.value ? 'origam.video.exitFullscreen' : 'origam.video.enterFullscreen')"
						data-cy="origam-video-fullscreen"
						size="small"
						variant="text"
						@click="toggleFullscreenBtn"
				/>
			</slot>
		</div>
		</template>
	</origam-responsive>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		onBeforeUnmount,
		ref,
		type StyleValue,
		useSlots,
		watch
	} from 'vue'

	import { OrigamBtn } from '../Btn'
	import { OrigamIcon } from '../Icon'
	import { OrigamResponsive } from '../Responsive'
	import { OrigamTooltip } from '../Tooltip'

	import { shouldSuppressAutoplay, useLocale, useVideoPlayer } from '../../composables'

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
	/*********************************************************
	 * i18n — every user-facing label and aria string passes through
	 * `t()`. Keys live under `origam.video.*` in locales/{en,fr}.json.
	 ********************************************************/
	const { t } = useLocale()

	const props = withDefaults(defineProps<IVideoProps & {
		// Belt-and-braces inline re-declaration (cf. ISliderField inset
		// note): forces the Vue SFC compiler to resolve these in the
		// runtime props descriptor even when HMR caches the interface.
		skipSeconds?: number
		showCenterControls?: boolean
		playbackRates?: ReadonlyArray<number>
		playbackRate?: number
		inset?: boolean
		allowRemotePlayback?: boolean
		doubleTapToSkip?: boolean
	}>(), {
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
		disablePictureInPicture: false,
		skipSeconds: 30,
		showCenterControls: true,
		playbackRates: () => [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
		playbackRate: 1,
		inset: true,
		allowRemotePlayback: true,
		doubleTapToSkip: true
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
		VOLUME_OFF: MDI_ICONS.VOLUME_OFF,
		REWIND: MDI_ICONS.REWIND,
		FAST_FORWARD: MDI_ICONS.FAST_FORWARD,
		ROTATE_LEFT: MDI_ICONS.ROTATE_LEFT,
		ROTATE_RIGHT: MDI_ICONS.ROTATE_RIGHT,
		CHEVRON_LEFT: MDI_ICONS.CHEVRON_LEFT,
		CHEVRON_RIGHT: MDI_ICONS.CHEVRON_RIGHT,
		COG: MDI_ICONS.COG,
		CAST: MDI_ICONS.CAST
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

	const naturalWidth = ref<number | null>(null)
	const naturalHeight = ref<number | null>(null)

	function onLoadedMetadata (event: Event) {
		const v = event.target as HTMLVideoElement
		if (v.videoWidth && v.videoHeight) {
			naturalWidth.value = v.videoWidth
			naturalHeight.value = v.videoHeight
		}
		emit('loadedmetadata', { duration: state.duration.value })
	}

	// Effective aspect-ratio fed to OrigamResponsive. Priority:
	//   1. Explicit `aspectRatio` prop (string '16/9' or number).
	//   2. Natural dimensions from <video> metadata once loaded.
	//   3. Fallback to 16/9 so the placeholder area has a sensible
	//      shape before the video metadata arrives.
	const effectiveAspectRatio = computed<string | number>(() => {
		if (props.aspectRatio) return props.aspectRatio
		if (naturalWidth.value && naturalHeight.value) {
			return naturalWidth.value / naturalHeight.value
		}
		return '16/9'
	})

	function onErrorEvent () {
		if (state.error.value) emit('error', state.error.value)
	}

	/*********************************************************
	 * Hover / auto-hide state — `inset` controls auto-fade once the
	 * cursor leaves the player (except while paused, where the
	 * toolbar stays visible). `hovered` also gates the center-control
	 * overlay (play / ±skip buttons floating over the video).
	 ********************************************************/
	const hovered = ref<boolean>(false)
	const onPlayerMouseEnter = (): void => { hovered.value = true }
	const onPlayerMouseLeave = (): void => { hovered.value = false }

	const showCenterOverlay = computed<boolean>(() => {
		if (!props.showCenterControls) return false
		// Visible on hover OR while paused (matches the YouTube-style UX).
		return hovered.value || state.paused.value
	})

	const controlsVisible = computed<boolean>(() => {
		// In `inset` mode the bottom toolbar auto-hides while the
		// video plays and the cursor sits outside the player. In the
		// non-inset (always-on) mode, the toolbar always paints.
		if (!props.inset) return true
		if (state.paused.value) return true
		return hovered.value
	})

	/*********************************************************
	 * Skip handlers — wrap the composable skip methods so we also
	 * emit a `skip` event (positive seconds = forward, negative =
	 * backward). The default skip seconds come from the prop.
	 ********************************************************/
	const skipBy = (seconds: number): void => {
		if (seconds > 0) methods.skipForward(seconds)
		else if (seconds < 0) methods.skipBackward(Math.abs(seconds))
		emit('skip', seconds)
	}
	const onSkipBack = (): void => skipBy(-Math.abs(props.skipSeconds || 0))
	const onSkipForward = (): void => skipBy(Math.abs(props.skipSeconds || 0))

	/*********************************************************
	 * Double-tap / double-click to skip. YouTube-style: two clicks
	 * within 300ms on the same half (left = backward, right =
	 * forward) of the video surface trigger a skip. Works for BOTH
	 * touch (pointerType === 'touch') AND mouse (pointerType ===
	 * 'mouse' or 'pen') so desktop users get the same behaviour
	 * as mobile.
	 *
	 * Single clicks fall through to the center play/pause button
	 * via the parent overlay — no `event.stopPropagation()` here.
	 *
	 * The visual feedback (ripple + seconds badge) is driven by
	 * `skipFeedback`, consumed by the template overlay.
	 ********************************************************/
	const _lastTap = ref<{ time: number, side: 'left' | 'right' } | null>(null)
	const skipFeedback = ref<{ side: 'left' | 'right', seconds: number, id: number } | null>(null)
	let _skipFeedbackTimeout = -1

	const triggerSkipFeedback = (side: 'left' | 'right'): void => {
		skipFeedback.value = { side, seconds: props.skipSeconds, id: Date.now() }
		if (_skipFeedbackTimeout !== -1) window.clearTimeout(_skipFeedbackTimeout)
		_skipFeedbackTimeout = window.setTimeout(() => {
			skipFeedback.value = null
			_skipFeedbackTimeout = -1
		}, 700)
	}

	onBeforeUnmount(() => {
		if (_skipFeedbackTimeout !== -1) window.clearTimeout(_skipFeedbackTimeout)
	})

	const onVideoTap = (event: PointerEvent): void => {
		if (!props.doubleTapToSkip) return
		// Skip keyboard / synthetic events without coordinates.
		if (event.clientX == null) return

		// Ignore taps on the inline center skip buttons — they have
		// their own @click handlers and should not also count as a
		// surface tap.
		const eventTarget = event.target as HTMLElement | null
		if (eventTarget?.closest('.origam-video__center-btn')) return

		// Compute the side based on the VIDEO element bounding box,
		// not the current target (which may be the center overlay).
		const videoEl = videoRef.value
		if (!videoEl) return
		const rect = videoEl.getBoundingClientRect()
		const side: 'left' | 'right' = event.clientX - rect.left < rect.width / 2 ? 'left' : 'right'
		const now = Date.now()
		const last = _lastTap.value
		if (last && now - last.time < 300 && last.side === side) {
			if (side === 'left') onSkipBack()
			else onSkipForward()
			triggerSkipFeedback(side)
			_lastTap.value = null
			event.preventDefault()
		} else {
			_lastTap.value = { time: now, side }
		}
	}

	/*********************************************************
	 * Config menu — only renders the cog button when the user passed
	 * either a `#config` slot or a non-empty `configItems` array (the
	 * built-in playback-rate menu always counts as content, so the
	 * cog shows up by default).
	 ********************************************************/
	const configMenuOpen = ref<boolean>(false)
	const configSection = ref<'main' | 'speed'>('main')
	const slots = useSlots()
	const hasConfigContent = computed<boolean>(() => {
		// Built-in: playback rates list. Externally: a custom slot.
		return Boolean(slots.config) || (props.playbackRates?.length ?? 0) > 1
	})

	// Always reset the drill-down to `main` when the menu closes — the
	// user expects to land on the top level on next open (YouTube UX).
	watch(configMenuOpen, (open) => {
		if (!open) configSection.value = 'main'
	})

	const formattedPlaybackRate = computed<string>(() => {
		const r = state.playbackRate.value
		if (Math.abs(r - 1) < 0.01) return t('origam.video.normalSpeed')
		return `${r}×`
	})

	const onPlaybackRateClick = (rate: number): void => {
		methods.setPlaybackRate(rate)
		emit('update:playbackRate', rate)
		configMenuOpen.value = false
	}

	/*********************************************************
	 * Cast / Remote Playback handler — opens the native device picker
	 * via the Remote Playback API. The button only renders when
	 * `allowRemotePlayback` is true AND at least one device is
	 * available (see `state.remoteAvailable`).
	 ********************************************************/
	async function onCastClick (): Promise<void> {
		await methods.requestRemotePlayback()
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

	/*********************************************************
	 * Custom YouTube-style scrubber
	 *
	 * `<input type="range">` doesn't expose enough customisation
	 * for the YouTube vocabulary (thin → thick-on-hover track,
	 * separate buffer indicator showing the downloaded portion,
	 * hover time tooltip). Custom DOM + pointer-events handlers
	 * cover all of it without touching accessibility — the root
	 * keeps `role="slider"` + `aria-value*` attributes.
	 ********************************************************/
	const scrubberRef = ref<HTMLElement | null>(null)
	const isScrubbing = ref<boolean>(false)
	const hoverPct = ref<number | null>(null)

	const progressPct = computed(() => {
		const max = scrubberMax.value
		if (max <= 0) return 0
		return Math.min(100, Math.max(0, (state.currentTime.value / max) * 100))
	})

	const bufferedPct = computed(() => {
		const max = scrubberMax.value
		if (max <= 0) return 0
		return Math.min(100, Math.max(0, (state.buffered.value / max) * 100))
	})

	const hoverTimeFormatted = computed(() => {
		if (hoverPct.value === null) return ''
		return formatTime((hoverPct.value / 100) * scrubberMax.value)
	})

	function pctFromPointer (event: PointerEvent): number {
		const el = scrubberRef.value
		if (!el) return 0
		const rect = el.getBoundingClientRect()
		const x = Math.min(rect.right, Math.max(rect.left, event.clientX))
		return ((x - rect.left) / rect.width) * 100
	}

	function onScrubberPointerDown (event: PointerEvent): void {
		const el = scrubberRef.value
		if (!el) return
		isScrubbing.value = true
		el.setPointerCapture(event.pointerId)
		const pct = pctFromPointer(event)
		methods.seek((pct / 100) * scrubberMax.value)

		const onMove = (e: PointerEvent) => {
			if (!isScrubbing.value) return
			const next = pctFromPointer(e)
			hoverPct.value = next
			methods.seek((next / 100) * scrubberMax.value)
		}
		const onUp = () => {
			isScrubbing.value = false
			el.removeEventListener('pointermove', onMove)
			el.removeEventListener('pointerup', onUp)
			el.removeEventListener('pointercancel', onUp)
		}
		el.addEventListener('pointermove', onMove)
		el.addEventListener('pointerup', onUp)
		el.addEventListener('pointercancel', onUp)
	}

	function onScrubberPointerMove (event: PointerEvent): void {
		hoverPct.value = pctFromPointer(event)
	}

	function onScrubberPointerLeave (): void {
		if (isScrubbing.value) return
		hoverPct.value = null
	}

	function onScrubberKeyDown (event: KeyboardEvent): void {
		const max = scrubberMax.value
		if (max <= 0) return
		const step = event.shiftKey ? 10 : 5
		if (event.key === 'ArrowLeft') {
			methods.seek(Math.max(0, state.currentTime.value - step))
			event.preventDefault()
		} else if (event.key === 'ArrowRight') {
			methods.seek(Math.min(max, state.currentTime.value + step))
			event.preventDefault()
		} else if (event.key === 'Home') {
			methods.seek(0)
			event.preventDefault()
		} else if (event.key === 'End') {
			methods.seek(max)
			event.preventDefault()
		}
	}

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
		playbackRate: state.playbackRate.value,
		remoteAvailable: state.remoteAvailable.value,
		remoteState: state.remoteState.value,
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

	// aspect-ratio is now handled by `<origam-responsive :aspect-ratio>`.
	// rootStyles only carries the user-provided style pass-through.
	const rootStyles = computed<StyleValue>(() => [props.style] as StyleValue)

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
		position: absolute;
		inset: 0;
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
		transition: opacity 180ms ease, transform 220ms ease;
	}

	/* In inset mode, controls auto-fade unless `--visible` is added (on
	 * hover or while paused). The non-inset mode skips the fade.       */
	.origam-video__controls--inset {
		opacity: 0;
		pointer-events: none;
	}

	.origam-video__controls--inset.origam-video__controls--visible {
		opacity: 1;
		pointer-events: auto;
	}

	/* Center controls overlay — skip back / play / skip forward.
	 * Fades in on hover OR when paused. Pointer-events guarded so the
	 * pointer can still reach the underlying <video> for double-tap. */
	.origam-video__center {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 48px;
		z-index: 2;
		opacity: 0;
		pointer-events: none;
		transition: opacity 180ms ease;
	}

	.origam-video__center--visible {
		opacity: 1;
		pointer-events: auto;
	}

	.origam-video__center-btn {
		color: #ffffff !important;
	}

	.origam-video__center-btn--play {
		background: rgba(0, 0, 0, 0.55) !important;
		backdrop-filter: blur(4px);
		border-radius: 50%;
	}

	.origam-video__skip-icon {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		border: none;
		border-radius: 50%;
		color: #ffffff;
		cursor: pointer;
		transition: background 180ms ease, transform 180ms ease;
		padding: 0;
	}

	.origam-video__skip-icon:hover,
	.origam-video__skip-icon:focus-visible {
		background: rgba(0, 0, 0, 0.75);
		transform: scale(1.05);
	}

	.origam-video__skip-icon:focus-visible {
		outline: 2px solid #ffffff;
		outline-offset: 2px;
	}

	.origam-video__skip-icon .origam-icon {
		font-size: 36px;
		line-height: 1;
	}

	.origam-video__skip-seconds {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 11px;
		font-weight: 700;
		font-family: var(--origam-font---family, system-ui, sans-serif);
		color: #ffffff;
		pointer-events: none;
		user-select: none;
	}

	.origam-video__skip-ripple {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 12%;
		z-index: 3;
		pointer-events: none;
		background: rgba(0, 0, 0, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.origam-video__skip-ripple--left {
		left: 0;
		border-top-right-radius: 50% 50%;
		border-bottom-right-radius: 50% 50%;
	}

	.origam-video__skip-ripple--right {
		right: 0;
		border-top-left-radius: 50% 50%;
		border-bottom-left-radius: 50% 50%;
	}

	.origam-video__skip-ripple-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		color: #ffffff;
		text-align: center;
	}

	.origam-video__skip-chevrons {
		display: inline-flex;
		align-items: center;
		gap: 0;
		line-height: 1;
	}

	.origam-video__skip-chevron {
		display: inline-block;
		line-height: 1;
		opacity: 0.4;
		margin: 0 -10px;
		animation: origam-video-chevron-pulse 900ms ease-in-out infinite;
	}

	.origam-video__skip-chevron .origam-icon {
		font-size: 26px;
		line-height: 1;
	}

	.origam-video__skip-chevron--1 { animation-delay: 0ms; }
	.origam-video__skip-chevron--2 { animation-delay: 150ms; }
	.origam-video__skip-chevron--3 { animation-delay: 300ms; }

	@keyframes origam-video-chevron-pulse {
		0%, 100% { opacity: 0.4; }
		50%      { opacity: 1; }
	}

	.origam-video__skip-ripple-label {
		font-size: 11px;
		font-weight: 600;
		font-family: var(--origam-font---family, system-ui, sans-serif);
		letter-spacing: 0.02em;
		white-space: nowrap;
		user-select: none;
		line-height: 1.2;
	}

	.origam-video-skip-ripple-enter-active {
		transition: opacity 200ms ease, transform 200ms ease;
	}

	.origam-video-skip-ripple-leave-active {
		transition: opacity 320ms ease, transform 320ms ease;
	}

	.origam-video-skip-ripple-enter-from,
	.origam-video-skip-ripple-leave-to {
		opacity: 0;
	}

	.origam-video__skip-ripple--right.origam-video-skip-ripple-enter-from,
	.origam-video__skip-ripple--right.origam-video-skip-ripple-leave-to {
		transform: translateX(8%);
	}

	.origam-video__skip-ripple--left.origam-video-skip-ripple-enter-from,
	.origam-video__skip-ripple--left.origam-video-skip-ripple-leave-to {
		transform: translateX(-8%);
	}

	.origam-video-skip-ripple-enter-to,
	.origam-video-skip-ripple-leave-from {
		opacity: 1;
		transform: translateX(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-video__skip-icon,
		.origam-video__skip-ripple,
		.origam-video-skip-ripple-enter-active,
		.origam-video-skip-ripple-leave-active {
			transition: none;
		}
		.origam-video__skip-chevron {
			animation: none;
			opacity: 0.85;
		}
	}

	/* Config menu (cog) — compact YouTube-style drill-down :
	 * Level 1 lists category rows ("Playback speed → 1×"). Tapping a
	 * row swaps the body for the matching submenu (with a back row at
	 * the top). Width stays tight so the menu never dwarfs the player. */
	:deep(.origam-video__config-menu) {
		padding: 4px 0;
		min-width: 168px;
		max-width: 220px;
	}

	.origam-video__config {
		display: flex;
		flex-direction: column;
		font-size: 0.75rem;
		line-height: 1.2;
	}

	/* Drill-down row used on the main level + the back row of a
	 * submenu. Compact height, label + value/arrow ends. */
	.origam-video__config-row {
		all: unset;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-video__config-row:hover,
	.origam-video__config-row:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-video__config-row-label {
		flex: 1 1 auto;
		min-width: 0;
	}

	.origam-video__config-row-value {
		color: rgba(255, 255, 255, 0.7);
	}

	.origam-video__config-row-arrow {
		color: rgba(255, 255, 255, 0.55);
		font-size: 1rem;
		line-height: 1;
	}

	.origam-video__config-row--back {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 2px;
		color: rgba(255, 255, 255, 0.85);
	}

	.origam-video__config-row-arrow--back {
		font-size: 1.1rem;
	}

	/* Leaf option (e.g. one playback rate). Same compact size as the
	 * rows, with an active state for the currently-selected value. */
	.origam-video__config-item {
		all: unset;
		display: flex;
		align-items: center;
		padding: 5px 12px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-video__config-item:hover,
	.origam-video__config-item:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-video__config-item--active {
		font-weight: 600;
		color: var(--origam-color__action--primary---bg, #60a5fa);
	}

	/* Scrubber — YouTube-style custom DOM. Thin (3px) track at rest
	 * that grows to 5px on hover. Three stacked layers (buffer +
	 * played + thumb) anchored on a single track row. Hover tooltip
	 * shows the timestamp at the cursor position. */
	.origam-video__scrubber {
		flex: 1 1 auto;
		min-width: 0;
		position: relative;
		height: 18px;
		display: flex;
		align-items: center;
		cursor: pointer;
		touch-action: none;
		outline: none;
		--origam-video__scrubber---primary: var(
			--origam-video__scrubber---color,
			var(--origam-color__action--primary---bg, #ef4444)
		);
	}

	.origam-video__scrubber-track {
		position: relative;
		width: 100%;
		height: 3px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		transition: height 140ms ease;
	}

	.origam-video__scrubber:hover .origam-video__scrubber-track,
	.origam-video__scrubber:focus-visible .origam-video__scrubber-track,
	.origam-video__scrubber--scrubbing .origam-video__scrubber-track {
		height: 5px;
	}

	.origam-video__scrubber-buffer,
	.origam-video__scrubber-progress {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		border-radius: 2px;
		pointer-events: none;
	}

	.origam-video__scrubber-buffer {
		background: rgba(255, 255, 255, 0.4);
		z-index: 1;
	}

	.origam-video__scrubber-progress {
		background: var(--origam-video__scrubber---primary);
		z-index: 2;
	}

	.origam-video__scrubber-thumb {
		position: absolute;
		top: 50%;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--origam-video__scrubber---primary);
		transform: translate(-50%, -50%) scale(0);
		transition: transform 140ms ease;
		pointer-events: none;
		z-index: 3;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
	}

	.origam-video__scrubber:hover .origam-video__scrubber-thumb,
	.origam-video__scrubber:focus-visible .origam-video__scrubber-thumb,
	.origam-video__scrubber--scrubbing .origam-video__scrubber-thumb {
		transform: translate(-50%, -50%) scale(1);
	}

	.origam-video__scrubber-hover-time {
		position: absolute;
		bottom: calc(100% + 8px);
		transform: translateX(-50%);
		padding: 3px 6px;
		background: rgba(0, 0, 0, 0.85);
		color: #ffffff;
		font-size: 11px;
		font-weight: 600;
		font-family: var(--origam-font---family, system-ui, sans-serif);
		border-radius: 3px;
		white-space: nowrap;
		pointer-events: none;
		z-index: 4;
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-video__scrubber-track,
		.origam-video__scrubber-thumb {
			transition: none;
		}
	}

	/* Volume slider — native <input type="range"> rendered horizontally
	 * but visually rotated 90° anticlockwise via `transform: rotate`.
	 * `transform` only affects PAINT, not layout, so we need a wrapper
	 * div with the final vertical dimensions to constrain the tooltip's
	 * bounding box. The slider sits inside, absolutely centered, with
	 * its un-rotated 100×4 dims that the rotation spins into 4×100 vis.
	 *
	 * (writing-mode: vertical-lr was the alternative but had unreliable
	 *  thumb/track rendering across engines — transform is the dependable
	 *  pattern used by HTML5 video players in the wild.) */
	:deep(.origam-video__volume-tooltip) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.origam-video__volume-wrapper {
		width: 28px;
		height: 110px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.origam-video__volume {
		appearance: none;
		-webkit-appearance: none;
		width: 100px;
		height: 4px;
		margin: 0;
		padding: 0;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		cursor: pointer;
		outline: none;
		transform: rotate(-90deg);
		transform-origin: center;
		flex: 0 0 auto;
	}

	.origam-video__volume::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		border: none;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	.origam-video__volume::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border: none;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
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
