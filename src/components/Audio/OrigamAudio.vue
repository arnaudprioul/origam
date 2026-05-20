<template>
	<article
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
				:loop="audioLoopAttr"
				:controls="isNativeControls"
				:preload="preload"
				:crossorigin="crossorigin"
				data-cy="origam-audio-el"
				@play="emit('play')"
				@pause="emit('pause')"
				@ended="onNativeEnded"
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

		<figure
				v-if="hasCover"
				class="origam-audio__cover"
				data-cy="origam-audio-cover-figure"
		>
			<slot name="cover">
				<img
						:src="resolvedCover!"
						:alt="coverAlt"
						:width="coverSizePx"
						:height="coverSizePx"
						class="origam-audio__cover-img"
						data-cy="origam-audio-cover"
						loading="lazy"
						decoding="async"
				/>
			</slot>
		</figure>

		<section
				v-if="isCustomControls"
				class="origam-audio__body"
				data-cy="origam-audio-body"
		>
			<header
					v-if="hasMetadata"
					class="origam-audio__metadata"
					data-cy="origam-audio-metadata"
			>
				<slot name="metadata">
					<slot name="title">
						<strong
								v-if="resolvedTitle"
								class="origam-audio__title"
								data-cy="origam-audio-title"
						>{{ resolvedTitle }}</strong>
					</slot>
					<span
							v-if="hasMetaLine"
							class="origam-audio__meta"
					>
						<span
								v-if="resolvedArtist"
								class="origam-audio__artist"
								data-cy="origam-audio-artist"
						>{{ resolvedArtist }}</span>
						<span
								v-if="resolvedAlbum"
								class="origam-audio__album"
								data-cy="origam-audio-album"
						>{{ resolvedAlbum }}</span>
						<span
								v-if="hasDurationLabel"
								class="origam-audio__duration"
								data-cy="origam-audio-duration"
						>{{ formattedDuration }}</span>
					</span>
				</slot>
			</header>

			<div
					v-if="showWaveform"
					class="origam-audio__waveform"
					data-cy="origam-audio-waveform"
			>
				<slot
						name="waveform"
						:peaks="peaks"
						:current-time="state.currentTime.value"
						:duration="state.duration.value"
				>
					<origam-slider-field
							:model-value="state.currentTime.value"
							:max="scrubberMax"
							:step="0.1"
							:buffered="state.buffered.value"
							:peaks="displayedPeaks"
							:aria-label="waveformAriaLabel"
							variant="audio"
							show-thumb-on-hover-only
							show-hover-tooltip
							:format-hover-tooltip="formatTimeTooltip"
							class="origam-audio__waveform-slider"
							data-cy="origam-audio-waveform-slider"
							@update:model-value="onWaveformSeek"
					/>
				</slot>
			</div>

			<slot
					name="controls"
					v-bind="slotBindings"
			>
				<nav
						class="origam-audio__transport"
						:aria-label="transportLabel"
						data-cy="origam-audio-controls"
				>
					<button
							type="button"
							class="origam-audio__nav-btn origam-audio__nav-btn--previous"
							:aria-label="previousLabel"
							data-cy="origam-audio-previous"
							@click="onPrevious"
					>
						<origam-icon
								:icon="ICONS.PREVIOUS"
								aria-hidden="true"
						/>
					</button>

					<origam-media-play-btn
							class="origam-audio__play-btn"
							:playing="state.playing.value"
							:play-label="playLabel"
							:pause-label="pauseLabel"
							data-cy="origam-audio-play"
							@click="onTogglePlay"
					/>

					<button
							type="button"
							class="origam-audio__nav-btn origam-audio__nav-btn--next"
							:aria-label="nextLabel"
							data-cy="origam-audio-next"
							@click="onNext"
					>
						<origam-icon
								:icon="ICONS.NEXT"
								aria-hidden="true"
						/>
					</button>

					<origam-media-time-label
							class="origam-audio__time"
							:current-time="state.currentTime.value"
							:duration="state.duration.value"
							data-cy="origam-audio-time"
					/>

					<span class="origam-audio__spacer" aria-hidden="true" />

					<origam-media-volume-control
							class="origam-audio__volume"
							:volume="state.volume.value"
							:muted="state.muted.value"
							:mute-label="muteLabel"
							:unmute-label="unmuteLabel"
							:volume-label="volumeLabel"
							data-cy="origam-audio-volume"
							@update:muted="onToggleMute"
							@update:volume="onVolumeFromScrubber"
					/>

					<origam-media-cast-btn
							v-if="showCastButton"
							class="origam-audio__cast"
							:available="showCastButton"
							:casting="isCasting"
							:cast-label="castLabel"
							:stop-cast-label="stopCastLabel"
							data-cy="origam-audio-cast"
							@click="onCastClick"
					/>

					<button
							v-if="hasPlaylist"
							type="button"
							class="origam-audio__nav-btn origam-audio__nav-btn--shuffle"
							:class="{ 'origam-audio__nav-btn--active': internalShuffle }"
							:aria-label="shuffleLabel"
							:aria-pressed="internalShuffle"
							data-cy="origam-audio-shuffle"
							@click="onToggleShuffle"
					>
						<origam-icon
								:icon="ICONS.SHUFFLE"
								aria-hidden="true"
						/>
					</button>

					<button
							type="button"
							class="origam-audio__nav-btn origam-audio__nav-btn--loop"
							:class="loopBtnClasses"
							:aria-label="loopAriaLabel"
							:aria-pressed="isLoopActive"
							data-cy="origam-audio-loop"
							@click="onToggleLoop"
					>
						<origam-icon
								:icon="loopIcon"
								aria-hidden="true"
						/>
					</button>

					<origam-media-config-menu
							v-if="hasConfigContent"
							class="origam-audio__config"
							:playback-rates="playbackRates"
							:playback-rate="state.playbackRate.value"
							:downloadable="downloadable"
							:download-url="downloadUrl"
							:download-filename="downloadFilename"
							:settings-label="settingsLabel"
							:quality-label="qualityLabel"
							:speed-label="speedLabel"
							:download-label="downloadLabelText"
							:normal-speed-label="normalSpeedLabel"
							data-cy="origam-audio-config"
							@update:playback-rate="onPlaybackRateChange"
							@download="onDownloadClick"
					/>
				</nav>
			</slot>
		</section>

		<slot
				v-if="hasPlaylist"
				name="playlist"
				:tracks="props.playlist"
				:current-index="safeTrackIndex"
				:select="setActiveTrack"
		>
			<ol
					class="origam-audio__playlist"
					data-cy="origam-audio-playlist"
			>
				<li
						v-for="(track, index) in props.playlist"
						:key="track.id ?? index"
						class="origam-audio__playlist-item"
						:class="{ 'origam-audio__playlist-item--active': index === safeTrackIndex }"
						:data-cy="`origam-audio-playlist-item-${ index }`"
				>
					<button
							type="button"
							class="origam-audio__playlist-btn"
							:aria-current="index === safeTrackIndex ? 'true' : undefined"
							@click="setActiveTrack(index)"
					>
						<span
								class="origam-audio__playlist-index"
								aria-hidden="true"
						>{{ index + 1 }}</span>
						<img
								v-if="track.cover"
								:src="track.cover"
								:alt="track.title ?? ''"
								class="origam-audio__playlist-cover"
								loading="lazy"
								decoding="async"
								width="32"
								height="32"
						/>
						<span class="origam-audio__playlist-text">
							<span class="origam-audio__playlist-title">{{ track.title ?? `Track ${ index + 1 }` }}</span>
							<span
									v-if="track.artist"
									class="origam-audio__playlist-artist"
							>{{ track.artist }}</span>
						</span>
						<span
								v-if="track.duration"
								class="origam-audio__playlist-duration"
						>{{ formatMediaTime(track.duration) }}</span>
					</button>
				</li>
			</ol>
		</slot>

		<div
				v-if="state.loading.value && !state.error.value"
				class="origam-audio__loading"
				role="status"
				:aria-label="loadingLabel"
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
	</article>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		nextTick,
		ref,
		type StyleValue,
		watch
	} from 'vue'

	import { OrigamIcon } from '../Icon'
	import { OrigamMediaCastBtn } from '../MediaCastBtn'
	import { OrigamMediaConfigMenu } from '../MediaConfigMenu'
	import { OrigamMediaPlayBtn } from '../MediaPlayBtn'
	import { OrigamMediaTimeLabel } from '../MediaTimeLabel'
	import { OrigamMediaVolumeControl } from '../MediaVolumeControl'
	import { OrigamSliderField } from '../SliderField'

	import {
		useBackgroundColor,
		useBorder,
		useElevation,
		useLocale,
		useMargin,
		usePadding,
		usePosition,
		useRounded,
		useTextColor
	} from '../../composables'
	import { useAudioPlayer } from '../../composables/Audio/use-audio-player.composable'
	import { useWaveform } from '../../composables/Audio/use-waveform.composable'
	import { shouldSuppressAutoplay } from '../../composables/Media/use-media-player.composable'

	import { MDI_ICONS } from '../../enums'

	import type {
		IAudioEmits,
		IAudioProps,
		IAudioSource,
		IAudioTrack
	} from '../../interfaces/Audio/audio-player.interface'

	import type { TAudioLoopMode } from '../../types'

	import { formatMediaTime } from '../../utils'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Stemtracks studio strip: cover (left/right) + body column with
	 * a metadata header, a waveform mini scrubber, and a transport
	 * `<nav>` row. The body is a CSS grid composed entirely from atomic
	 * media components — `<OrigamMediaController>` is intentionally NOT
	 * used here so the audio shell can ship its own transport layout.
	 *
	 * Defaults are inlined here (not pulled from a constant object)
	 * because the Vue SFC compiler analyses `withDefaults` statically
	 * and only resolves literal values — cf. CLAUDE.md rule.
	 ********************************************************/
	const { t } = useLocale()

	const props = withDefaults(defineProps<IAudioProps>(), {
		tag: 'article',
		variant: 'expanded',
		coverPosition: 'left',
		position: 'relative',
		top: undefined,
		bottom: undefined,
		left: undefined,
		right: undefined,
		color: undefined,
		bgColor: undefined,
		tracks: () => [],
		title: undefined,
		artist: undefined,
		album: undefined,
		cover: undefined,
		autoplay: false,
		muted: false,
		loop: false,
		loopMode: 'none',
		shuffle: false,
		playlist: undefined,
		currentTrackIndex: 0,
		preload: 'metadata',
		crossorigin: undefined,
		controls: 'custom',
		playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
		playbackRate: 1,
		allowRemotePlayback: false,
		downloadable: false,
		downloadFilename: undefined,
		waveform: false,
		waveformColor: 'currentColor'
	})

	const emit = defineEmits<IAudioEmits>()

	/*********************************************************
	 * Icon refs — single source of truth for the transport + status
	 * glyphs. Inlined as a const object so the template only sees
	 * literal references (CLAUDE.md "no logic in templates" rule).
	 ********************************************************/
	const ICONS = {
		LOADING: MDI_ICONS.LOADING,
		ALERT: MDI_ICONS.ALERT_CIRCLE,
		PREVIOUS: MDI_ICONS.SKIP_PREVIOUS,
		NEXT: MDI_ICONS.SKIP_NEXT,
		LOOP: MDI_ICONS.REPEAT,
		LOOP_ONE: MDI_ICONS.REPEAT_ONCE,
		SHUFFLE: MDI_ICONS.SHUFFLE
	}

	/*********************************************************
	 * i18n labels — pre-translated so the template stays free of
	 * `t(...)` calls (atomic media components require pre-translated
	 * `xxxLabel` props).
	 ********************************************************/
	const playLabel = computed<string>(() => t('origam.media.play', 'Play'))
	const pauseLabel = computed<string>(() => t('origam.media.pause', 'Pause'))
	const muteLabel = computed<string>(() => t('origam.media.mute', 'Mute'))
	const unmuteLabel = computed<string>(() => t('origam.media.unmute', 'Unmute'))
	const volumeLabel = computed<string>(() => t('origam.media.volume', 'Volume'))
	const waveformAriaLabel = computed<string>(() => t('origam.media.seek', 'Seek'))
	const castLabel = computed<string>(() => t('origam.media.castToDevice', 'Cast to device'))
	const stopCastLabel = computed<string>(() => t('origam.media.stopCasting', 'Stop casting'))
	const settingsLabel = computed<string>(() => t('origam.media.settings', 'Settings'))
	const qualityLabel = computed<string>(() => t('origam.media.quality', 'Quality'))
	const speedLabel = computed<string>(() => t('origam.media.playbackSpeed', 'Playback speed'))
	const downloadLabelText = computed<string>(() => t('origam.media.download', 'Download'))
	const normalSpeedLabel = computed<string>(() => t('origam.media.normalSpeed', 'Normal'))
	const previousLabel = computed<string>(() => t('origam.media.previousTrack', 'Previous track'))
	const nextLabel = computed<string>(() => t('origam.media.nextTrack', 'Next track'))
	const loopAllLabel = computed<string>(() => t('origam.media.loopAll', 'Loop playlist'))
	const loopOneLabel = computed<string>(() => t('origam.media.loopOne', 'Loop track'))
	const loopOffLabel = computed<string>(() => t('origam.media.loopOff', 'Loop off'))
	const shuffleLabel = computed<string>(() => t('origam.media.shuffle', 'Shuffle'))
	const loadingLabel = computed<string>(() => t('origam.loading', 'Loading'))
	const transportLabel = computed<string>(() => t('origam.media.transport', 'Transport controls'))

	/*********************************************************
	 * Resolved autoplay / muted — autoplay is suppressed when the user
	 * prefers reduced motion (a11y), and the browser requires muted=true
	 * for unattended playback in most cases.
	 ********************************************************/
	const resolvedAutoplay = computed<boolean>(() => {
		if (!props.autoplay) return false
		if (shouldSuppressAutoplay()) return false
		return true
	})

	const resolvedMuted = computed<boolean>(() => {
		if (props.muted) return true
		if (resolvedAutoplay.value) return true
		return false
	})

	/*********************************************************
	 * Controls strategy — drives both the native `controls` attribute
	 * on the `<audio>` AND the conditional render of the custom
	 * Stemtracks body.
	 ********************************************************/
	const isCustomControls = computed<boolean>(() => props.controls === 'custom')
	const isNativeControls = computed<boolean>(() => props.controls === 'native')

	/*********************************************************
	 * Variant normalisation — accept the legacy `'normal' | 'minimal'`
	 * aliases as well as the canonical `'expanded' | 'compact'` values
	 * so the brief swap is non-breaking for v0.x consumers.
	 ********************************************************/
	const isCompactVariant = computed<boolean>(() => {
		return props.variant === 'compact' || props.variant === 'minimal'
	})
	const isExpandedVariant = computed<boolean>(() => !isCompactVariant.value)

	/*********************************************************
	 * Playlist state machine
	 *
	 * @description
	 * When `props.playlist` is set, the active track drives the
	 * `<audio>` source AND the metadata strip. The component owns
	 * an internal `currentTrackIndex` ref that v-models against the
	 * parent so consumers can either read it or control it externally.
	 *
	 * Shuffle mode picks a new track uniformly at random from the
	 * full playlist at EACH navigation event (prev / next / auto-
	 * advance on `ended`). Same track twice in a row is allowed —
	 * it's true randomness, not a pre-computed permutation. To avoid
	 * "stuck on the same track" feeling on small playlists, we
	 * retry once when the picked index matches the current track and
	 * the playlist has more than one entry.
	 ********************************************************/
	const hasPlaylist = computed<boolean>(() => Array.isArray(props.playlist) && props.playlist.length > 0)

	const internalTrackIndex = ref<number>(props.currentTrackIndex ?? 0)

	watch(() => props.currentTrackIndex, (next) => {
		if (typeof next === 'number' && next !== internalTrackIndex.value) {
			internalTrackIndex.value = next
		}
	})

	const safeTrackIndex = computed<number>(() => {
		if (!hasPlaylist.value) return 0
		const total = props.playlist!.length
		if (total === 0) return 0
		const i = internalTrackIndex.value
		return ((i % total) + total) % total
	})

	const activeTrack = computed<IAudioTrack | undefined>(() => {
		if (!hasPlaylist.value) return undefined
		return props.playlist![safeTrackIndex.value]
	})

	function setActiveTrack (nextIndex: number): void {
		if (!hasPlaylist.value) return
		const total = props.playlist!.length
		if (total === 0) return
		const wrapped = ((nextIndex % total) + total) % total
		if (wrapped === safeTrackIndex.value) return
		internalTrackIndex.value = wrapped
		emit('update:currentTrackIndex', wrapped)
		const track = props.playlist![wrapped]
		if (track) emit('track-change', track, wrapped)
	}

	/*********************************************************
	 * Random pick — uniformly samples a playlist index from the
	 * (total - 1) non-current tracks. Guarantees the next track
	 * is always different from the current one, so shuffle always
	 * advances. The math `(cur + 1 + r) % total` with `r` uniform
	 * in `[0, total - 1)` enumerates every non-current index
	 * exactly once with equal probability.
	 ********************************************************/
	function pickRandomIndex (): number {
		const total = props.playlist?.length ?? 0
		if (total <= 1) return 0
		const cur = safeTrackIndex.value
		const offset = 1 + Math.floor(Math.random() * (total - 1))
		return (cur + offset) % total
	}

	function navigateRelative (delta: 1 | -1): void {
		if (!hasPlaylist.value) return
		const total = props.playlist!.length
		if (total === 0) return

		if (internalShuffle.value) {
			setActiveTrack(pickRandomIndex())
			return
		}

		let target = safeTrackIndex.value + delta
		if (target < 0 || target >= total) {
			if (resolvedLoopMode.value === 'all' || resolvedLoopMode.value === 'one') {
				target = ((target % total) + total) % total
			} else {
				return
			}
		}
		setActiveTrack(target)
	}

	/*********************************************************
	 * Loop mode (tri-state) + shuffle — v-modelled with the parent.
	 * `loopMode` cycle: 'none' → 'all' → 'one' → 'none'.
	 *
	 * Legacy `loop: true` maps to `loopMode='one'` at read-time when
	 * the consumer hasn't explicitly set `loopMode`.
	 ********************************************************/
	// Initialise the internal loop mode honouring the legacy `loop:true`
	// flag when the consumer hasn't passed an explicit `loopMode`.
	// `withDefaults` resolves `loopMode` to `'none'` by default, so we
	// only fall through to `'one'` when `loop:true` AND `loopMode` was
	// left at its default — never overriding an explicit `'none'`.
	const initialLoopMode: TAudioLoopMode =
		props.loopMode && props.loopMode !== 'none'
			? props.loopMode
			: (props.loop ? 'one' : 'none')

	const internalLoopMode = ref<TAudioLoopMode>(initialLoopMode)
	watch(() => props.loopMode, (next) => {
		if (next && next !== internalLoopMode.value) internalLoopMode.value = next
	})

	const resolvedLoopMode = computed<TAudioLoopMode>(() => internalLoopMode.value)

	function cycleLoopMode (): void {
		const next: TAudioLoopMode =
			internalLoopMode.value === 'none' ? 'all'
				: internalLoopMode.value === 'all' ? 'one'
					: 'none'
		internalLoopMode.value = next
		emit('update:loopMode', next)
	}

	/*********************************************************
	 * Loop button — icon swap + active flag + ARIA label driven by
	 * the current tri-state mode. The button stays in the transport
	 * row regardless of whether a playlist is set; in single-track
	 * use, `'all'` and `'one'` are equivalent (no next track to wrap
	 * to) but the visual cue still tells the user the player will
	 * restart on `ended`.
	 ********************************************************/
	const loopIcon = computed<string>(() => {
		return resolvedLoopMode.value === 'one' ? ICONS.LOOP_ONE : ICONS.LOOP
	})

	const isLoopActive = computed<boolean>(() => resolvedLoopMode.value !== 'none')

	const loopBtnClasses = computed(() => ({
		'origam-audio__nav-btn--active': isLoopActive.value,
		'origam-audio__nav-btn--loop-one': resolvedLoopMode.value === 'one',
		'origam-audio__nav-btn--loop-all': resolvedLoopMode.value === 'all'
	}))

	const loopAriaLabel = computed<string>(() => {
		if (resolvedLoopMode.value === 'one') return loopOneLabel.value
		if (resolvedLoopMode.value === 'all') return loopAllLabel.value
		return loopOffLabel.value
	})

	const internalShuffle = ref<boolean>(props.shuffle ?? false)
	watch(() => props.shuffle, (next) => {
		if (typeof next === 'boolean' && next !== internalShuffle.value) {
			internalShuffle.value = next
		}
	})

	function toggleShuffle (): void {
		internalShuffle.value = !internalShuffle.value
		emit('update:shuffle', internalShuffle.value)
	}

	/*********************************************************
	 * Source resolution — when a playlist is active the `<audio>`
	 * source comes from the active track; otherwise we fall back to
	 * the root `src` prop.
	 ********************************************************/
	const effectiveSrc = computed<string | IAudioSource | Array<IAudioSource> | undefined>(() => {
		if (hasPlaylist.value && activeTrack.value) return activeTrack.value.src
		return props.src
	})

	const singleSrc = computed<string | undefined>(() => {
		const s = effectiveSrc.value
		return typeof s === 'string' ? s : undefined
	})

	const resolvedSources = computed<Array<IAudioSource>>(() => {
		const s = effectiveSrc.value
		if (typeof s === 'string' || s == null) return []
		if (Array.isArray(s)) return s
		return [s]
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
	 * Metadata strip — hides itself when title/artist/album are
	 * absent. Cover figure renders separately so the cover can still
	 * stand on its own if the consumer only passes an image.
	 ********************************************************/
	const resolvedTitle = computed<string | undefined>(() => activeTrack.value?.title ?? props.title)
	const resolvedArtist = computed<string | undefined>(() => activeTrack.value?.artist ?? props.artist)
	const resolvedAlbum = computed<string | undefined>(() => activeTrack.value?.album ?? props.album)

	const resolvedCover = computed<string | undefined>(() => {
		if (activeTrack.value?.cover) return activeTrack.value.cover
		if (!props.cover) return undefined
		if (typeof props.cover === 'string') return props.cover
		return props.cover.src
	})

	const coverAlt = computed<string>(() => {
		const t = resolvedTitle.value
		const a = resolvedArtist.value
		if (t && a) return `${ t } — ${ a }`
		if (t) return t
		return ''
	})

	const hasCover = computed<boolean>(() => Boolean(resolvedCover.value))

	/*********************************************************
	 * Cover size — `<origam-img>` needs explicit `width` / `height`
	 * attribute values to clamp its inner `<img>` (CSS scoped on
	 * the parent doesn't pierce the wrapper). Resolved at the parent
	 * level from the variant — 96px for `expanded`, 48px for `compact`.
	 ********************************************************/
	const coverSizePx = computed<number>(() => (isCompactVariant.value ? 48 : 96))

	const hasMetadata = computed<boolean>(() => {
		return Boolean(resolvedTitle.value || resolvedArtist.value || resolvedAlbum.value)
	})
	const hasMetaLine = computed<boolean>(() => {
		return Boolean(resolvedArtist.value || resolvedAlbum.value || hasDurationLabel.value)
	})

	const hasDurationLabel = computed<boolean>(() => {
		return Number.isFinite(state.duration.value) && state.duration.value > 0
	})

	const formattedDuration = computed<string>(() => formatMediaTime(state.duration.value))

	/*********************************************************
	 * Waveform — decoded on the fly via `useWaveform`. The waveform
	 * mini scrubber lives between the metadata header and the
	 * transport row in the EXPANDED variant; the COMPACT variant
	 * hides it to keep the dock height tight.
	 ********************************************************/
	const waveformEnabled = computed<boolean>(() => {
		if (isCompactVariant.value) return false
		if (props.waveform === true) return true
		if (props.waveform === 'auto') {
			if (typeof window === 'undefined') return false
			const win = window as unknown as { OfflineAudioContext?: unknown }
			return Boolean(win.OfflineAudioContext)
		}
		return false
	})

	const showWaveform = computed<boolean>(() => waveformEnabled.value || isExpandedVariant.value)

	const waveformSrc = computed<string | undefined>(() => {
		if (!waveformEnabled.value) return undefined
		if (typeof props.src === 'string') return props.src
		if (Array.isArray(props.src)) return props.src[0]?.src
		return props.src?.src
	})

	const { peaks } = useWaveform(waveformSrc, {
		bins: 200,
		crossOrigin: props.crossorigin === 'use-credentials' || props.crossorigin === 'anonymous'
			? props.crossorigin
			: undefined
	})

	watch(peaks, (next) => {
		if (next.length > 0) emit('waveform', next)
	})

	/*********************************************************
	 * Displayed peaks — the audio variant of `<OrigamSliderField>`
	 * only paints its waveform SVG when the `peaks` array is non-empty.
	 * Real peaks come from `useWaveform` which depends on a successful
	 * `OfflineAudioContext.decodeAudioData()`. The decode fails silently
	 * on CORS-blocked or HLS sources — the visual identity of the
	 * scrubber would collapse back to a hairline (Stemtracks loses its
	 * signature). We seed a deterministic synthetic waveform (sum of
	 * three sine waves, ~120 bars, values 0.15-1.0) so the audio
	 * scrubber ALWAYS reads as "audio" at a glance, then overwrites
	 * with real peaks as soon as `useWaveform` resolves.
	 ********************************************************/
	const SYNTHETIC_PEAKS_COUNT = 120
	const syntheticPeaks: ReadonlyArray<number> = (() => {
		const out: Array<number> = []
		for (let i = 0; i < SYNTHETIC_PEAKS_COUNT; i++) {
			const t = i / SYNTHETIC_PEAKS_COUNT
			const w =
				Math.sin(t * Math.PI * 7) * 0.5 +
				Math.sin(t * Math.PI * 13 + 1.2) * 0.3 +
				Math.sin(t * Math.PI * 29 + 0.4) * 0.2
			out.push(0.55 + w * 0.42)
		}
		return out.map(v => Math.max(0.12, Math.min(1, Math.abs(v))))
	})()

	const displayedPeaks = computed<ReadonlyArray<number>>(() => {
		if (peaks.value && peaks.value.length > 0) return peaks.value
		return syntheticPeaks
	})

	/*********************************************************
	 * Scrubber math — both the waveform mini scrubber AND the inline
	 * timer scrubber share the same `max` (clamped to a finite
	 * duration) and seek handler.
	 ********************************************************/
	const scrubberMax = computed<number>(() => {
		return Number.isFinite(state.duration.value) ? state.duration.value : 0
	})

	function onWaveformSeek (value: number | Array<number>): void {
		if (Array.isArray(value)) return
		methods.seek(value)
	}

	function formatTimeTooltip (seconds: number): string {
		return formatMediaTime(seconds)
	}

	/*********************************************************
	 * Transport handlers — play/pause toggle, mute, volume, previous,
	 * next, loop, cast, playback rate. The "prev" / "next" buttons
	 * skip ±10 s internally when the consumer has not bound a listener
	 * (so an isolated `<OrigamAudio>` keeps working without a playlist
	 * controller in front of it).
	 ********************************************************/
	function onTogglePlay (): void {
		if (state.playing.value) methods.pause()
		else void methods.play()
	}

	function onToggleMute (): void {
		methods.toggleMute()
	}

	function onVolumeFromScrubber (value: number): void {
		if (value > 0 && state.muted.value) methods.toggleMute()
		else if (value === 0 && !state.muted.value) methods.toggleMute()
		methods.setVolume(value)
	}

	function onPrevious (): void {
		emit('previous')
		if (hasPlaylist.value) {
			navigateRelative(-1)
		} else {
			methods.skipBackward(10)
		}
	}

	function onNext (): void {
		emit('next')
		if (hasPlaylist.value) {
			navigateRelative(1)
		} else {
			methods.skipForward(10)
		}
	}

	function onToggleLoop (): void {
		cycleLoopMode()
	}

	function onToggleShuffle (): void {
		toggleShuffle()
	}

	/*********************************************************
	 * Native `<audio>` loop attribute — mapped from the resolved
	 * loop mode. `'one'` sets the native `loop` flag so the same
	 * track restarts on `ended` without our intervention. `'all'`
	 * keeps `loop=false` and triggers a programmatic `next` on
	 * `ended` to advance through the playlist; on the last track
	 * we wrap to the first. `'none'` lets playback stop after the
	 * last track.
	 ********************************************************/
	const audioLoopAttr = computed<boolean>(() => resolvedLoopMode.value === 'one')

	function onNativeEnded (): void {
		emit('ended')
		if (resolvedLoopMode.value === 'one') return
		if (!hasPlaylist.value) return
		const total = props.playlist!.length
		if (total === 0) return

		if (internalShuffle.value) {
			setActiveTrack(pickRandomIndex())
			void nextTick(() => { void methods.play() })
			return
		}

		const cur = safeTrackIndex.value
		const target = cur + 1
		if (target < total) {
			setActiveTrack(target)
			void nextTick(() => { void methods.play() })
		} else if (resolvedLoopMode.value === 'all') {
			setActiveTrack(0)
			void nextTick(() => { void methods.play() })
		}
	}

	/*********************************************************
	 * Cast / Remote Playback — visibility gate combines the consumer
	 * `allowRemotePlayback` flag with the runtime `remoteAvailable` ref.
	 ********************************************************/
	const showCastButton = computed<boolean>(() => {
		return Boolean(props.allowRemotePlayback) && state.remoteAvailable.value
	})

	const isCasting = computed<boolean>(() => state.remoteState.value === 'connected')

	async function onCastClick (): Promise<void> {
		await methods.requestRemotePlayback()
	}

	/*********************************************************
	 * Config menu visibility — show the cog only when at least one
	 * sub-section has meaningful content (rates, download).
	 ********************************************************/
	const hasPlaybackRates = computed<boolean>(() => (props.playbackRates?.length ?? 0) > 1)
	const canDownload = computed<boolean>(() => Boolean(props.downloadable) && Boolean(downloadUrl.value))
	const hasConfigContent = computed<boolean>(() => hasPlaybackRates.value || canDownload.value)

	/*********************************************************
	 * Download — analogous to OrigamVideo's contract. Single-source
	 * playback means we always know the active URL; multi-source
	 * arrays fall back to the first entry. Emits the URL when the
	 * download row is clicked.
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
		emit('download', url)
	}

	/*********************************************************
	 * Apply initial playback rate (prop) once metadata is ready.
	 ********************************************************/
	watch(() => props.playbackRate, (rate) => {
		if (typeof rate === 'number' && Number.isFinite(rate) && rate > 0) {
			methods.setPlaybackRate(rate)
		}
	}, { immediate: true })

	function onPlaybackRateChange (rate: number): void {
		methods.setPlaybackRate(rate)
		emit('update:playbackRate', rate)
	}

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
	 * Wrapper chrome — every canonical DS transverse composable.
	 * The SCSS host carries the dark studio backdrop by default;
	 * `bgColor` overrides it when the consumer provides an intent
	 * or hex.
	 ********************************************************/
	const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
	const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
	const { roundedClasses, roundedStyles } = useRounded(props)
	const { borderClasses, borderStyles } = useBorder(props)
	const { paddingClasses, paddingStyles } = usePadding(props)
	const { marginClasses, marginStyles } = useMargin(props)
	const { elevationClasses, elevationStyles } = useElevation(props)
	const { positionClasses, positionStyles } = usePosition(props)

	/*********************************************************
	 * Class & Style — Strategy A: classes win for tokenised values,
	 * inline styles win for raw CSS, both bind in parallel.
	 ********************************************************/
	const variantClassName = computed<string>(() => `origam-audio--${ isCompactVariant.value ? 'compact' : 'expanded' }`)

	const rootClasses = computed(() => [
		variantClassName.value,
		`origam-audio--cover-${ props.coverPosition }`,
		{
			'origam-audio--playing': state.playing.value,
			'origam-audio--paused': state.paused.value,
			'origam-audio--loading': state.loading.value,
			'origam-audio--error': state.error.value !== null,
			'origam-audio--controls-native': isNativeControls.value,
			'origam-audio--controls-custom': isCustomControls.value,
			'origam-audio--has-cover': hasCover.value,
			'origam-audio--has-waveform': showWaveform.value
		},
		positionClasses.value,
		...textColorClasses.value,
		...backgroundColorClasses.value,
		...roundedClasses.value,
		...borderClasses.value,
		...paddingClasses.value,
		...marginClasses.value,
		...elevationClasses.value,
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		positionStyles.value,
		textColorStyles.value,
		backgroundColorStyles.value,
		roundedStyles.value,
		borderStyles.value,
		paddingStyles.value,
		marginStyles.value,
		elevationStyles.value,
		props.style
	] as StyleValue)

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
		display: grid;
		gap: var(--origam-audio---gap, 16px);
		padding: var(--origam-audio---padding, 16px);
		border-radius: var(--origam-audio---border-radius, var(--origam-radius---lg, 12px));
		color: var(--origam-audio---color, var(--origam-color__text--inverse---fg, #f4f4f5));
		background-color: var(--origam-audio---background-color, rgba(14, 14, 16, 0.92));
		accent-color: var(--origam-audio---accent-color, var(--origam-color__accent---base));
		grid-template-columns: auto 1fr;
		align-items: start;
	}

	.origam-audio:not(.origam-audio--has-cover) {
		grid-template-columns: 1fr;
	}

	.origam-audio--cover-right.origam-audio--has-cover {
		grid-template-columns: 1fr auto;
	}

	.origam-audio--cover-right .origam-audio__cover {
		grid-column: 2;
		grid-row: 1;
	}

	.origam-audio--cover-right .origam-audio__body {
		grid-column: 1;
		grid-row: 1;
	}

	.origam-audio__el {
		display: block;
		width: 100%;
		grid-column: 1 / -1;
	}

	.origam-audio--controls-custom .origam-audio__el {
		display: none;
	}

	.origam-audio--controls-native .origam-audio__el {
		display: block;
	}

	.origam-audio__cover {
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
	}

	.origam-audio__cover-img {
		display: block;
		width: var(--origam-audio__cover---size, 96px);
		height: var(--origam-audio__cover---size, 96px);
		border-radius: var(--origam-audio__cover---border-radius, var(--origam-radius---md, 8px));
		object-fit: cover;
		flex: 0 0 auto;
	}

	.origam-audio--compact .origam-audio__cover-img {
		width: var(--origam-audio--compact__cover---size, 48px);
		height: var(--origam-audio--compact__cover---size, 48px);
	}

	.origam-audio__body {
		display: grid;
		grid-template-rows: auto auto auto;
		gap: var(--origam-audio__body---gap, 12px);
		min-width: 0;
		align-content: center;
	}

	.origam-audio--compact .origam-audio__body {
		grid-template-rows: auto auto;
		gap: var(--origam-audio--compact__body---gap, 6px);
	}

	.origam-audio__metadata {
		display: flex;
		flex-direction: column;
		min-width: 0;
		gap: var(--origam-audio__metadata---gap, 2px);
	}

	.origam-audio--compact .origam-audio__metadata {
		flex-direction: row;
		align-items: baseline;
		gap: var(--origam-audio--compact__metadata---gap, 8px);
		flex-wrap: wrap;
	}

	.origam-audio__title {
		font-size: var(--origam-audio__title---font-size, 18px);
		font-weight: var(--origam-audio__title---font-weight, 700);
		line-height: var(--origam-audio__title---line-height, 1.25);
		color: var(--origam-audio__title---color, inherit);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.origam-audio--compact .origam-audio__title {
		font-size: var(--origam-audio--compact__title---font-size, 14px);
	}

	.origam-audio__meta {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--origam-audio__meta---gap, 6px);
		font-size: var(--origam-audio__meta---font-size, 13px);
		color: var(--origam-audio__meta---color, color-mix(in srgb, currentColor 60%, transparent));
		min-width: 0;
	}

	.origam-audio__artist + .origam-audio__album::before,
	.origam-audio__artist + .origam-audio__duration::before,
	.origam-audio__album + .origam-audio__duration::before {
		content: var(--origam-audio__meta-separator---content, "·");
		margin-inline-end: 6px;
		opacity: 0.6;
	}

	.origam-audio__artist,
	.origam-audio__album,
	.origam-audio__duration {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
	}

	.origam-audio__waveform {
		display: block;
		width: 100%;
		--origam-slider-field--audio---track-height: var(--origam-audio__waveform---height, 56px);
	}

	.origam-audio__waveform-slider {
		width: 100%;
		color: var(--origam-audio__waveform---color, var(--origam-audio---accent-color, var(--origam-color__accent---base)));
	}

	.origam-audio__transport {
		display: flex;
		align-items: center;
		gap: var(--origam-audio__transport---gap, 8px);
		min-height: var(--origam-audio__transport---min-height, 48px);
	}

	.origam-audio__nav-btn {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-audio__nav-btn---size, 32px);
		height: var(--origam-audio__nav-btn---size, 32px);
		border-radius: var(--origam-audio__nav-btn---border-radius, 50%);
		cursor: pointer;
		color: var(--origam-audio__nav-btn---color, inherit);
		opacity: 0.85;
		transition: background-color 120ms ease, opacity 120ms ease, transform 120ms ease;
	}

	.origam-audio__nav-btn:hover,
	.origam-audio__nav-btn:focus-visible {
		opacity: 1;
		background-color: var(--origam-audio__nav-btn---hover-background-color, rgba(255, 255, 255, 0.08));
	}

	.origam-audio__nav-btn:active {
		transform: scale(0.92);
	}

	.origam-audio__nav-btn--active {
		color: var(--origam-audio---accent-color, var(--origam-color__accent---base));
		opacity: 1;
		background-color: var(--origam-audio__nav-btn--active---background-color, color-mix(in srgb, var(--origam-audio---accent-color, var(--origam-color__accent---base)) 18%, transparent));
		position: relative;
	}

	.origam-audio__nav-btn--active::after {
		content: '';
		position: absolute;
		bottom: 3px;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--origam-audio---accent-color, var(--origam-color__accent---base));
		pointer-events: none;
	}

	.origam-audio__play-btn {
		--origam-media-play-btn---size: var(--origam-audio__play-btn---size, 48px);
		--origam-media-play-btn---icon-size: var(--origam-audio__play-btn---icon-size, 24px);
		--origam-media-play-btn---color: var(--origam-audio__play-btn---color, var(--origam-audio---accent-color, var(--origam-color__accent---base)));
	}

	.origam-audio__time {
		--origam-media-time-label---color: var(--origam-audio__time---color, inherit);
	}

	.origam-audio__spacer {
		flex: 1 1 auto;
		min-width: 0;
	}

	.origam-audio__volume,
	.origam-audio__cast,
	.origam-audio__config {
		flex: 0 0 auto;
	}

	.origam-audio__loading {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		color: var(--origam-audio__loading---color, inherit);
		font-size: var(--origam-audio__loading---font-size, 0.875rem);
		grid-column: 1 / -1;
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
		grid-column: 1 / -1;
	}

	.origam-audio__error-icon {
		font-size: var(--origam-audio--error---icon-font-size, 1.1rem);
	}

	.origam-audio__playlist {
		grid-column: 1 / -1;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--origam-audio__playlist---gap, 2px);
		max-height: var(--origam-audio__playlist---max-height, 220px);
		overflow-y: auto;
		border-top: 1px solid var(--origam-audio__playlist---border-color, rgba(244, 244, 245, 0.08));
		padding-top: var(--origam-audio__playlist---padding-top, 8px);
	}

	.origam-audio__playlist-item {
		margin: 0;
	}

	.origam-audio__playlist-btn {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		gap: var(--origam-audio__playlist-btn---gap, 10px);
		padding: var(--origam-audio__playlist-btn---padding, 6px 8px);
		width: 100%;
		border-radius: var(--origam-audio__playlist-btn---border-radius, 6px);
		cursor: pointer;
		color: var(--origam-audio__playlist-btn---color, color-mix(in srgb, currentColor 80%, transparent));
		transition: background-color 120ms ease, color 120ms ease;
	}

	.origam-audio__playlist-btn:hover,
	.origam-audio__playlist-btn:focus-visible {
		background-color: var(--origam-audio__playlist-btn--hover---background-color, rgba(255, 255, 255, 0.06));
		color: var(--origam-audio__playlist-btn--hover---color, inherit);
	}

	.origam-audio__playlist-item--active .origam-audio__playlist-btn {
		color: var(--origam-audio---accent-color, var(--origam-color__accent---base));
		background-color: var(--origam-audio__playlist-item--active---background-color, rgba(124, 58, 237, 0.12));
	}

	.origam-audio__playlist-index {
		font-variant-numeric: tabular-nums;
		font-size: 12px;
		min-width: 18px;
		text-align: end;
		opacity: 0.6;
	}

	.origam-audio__playlist-cover {
		flex: 0 0 32px;
		width: 32px;
		height: 32px;
		border-radius: 4px;
		object-fit: cover;
		display: block;
	}

	.origam-audio__playlist-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		flex: 1 1 auto;
		gap: 1px;
	}

	.origam-audio__playlist-title {
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: inherit;
	}

	.origam-audio__playlist-artist {
		font-size: 12px;
		opacity: 0.65;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.origam-audio__playlist-duration {
		font-variant-numeric: tabular-nums;
		font-size: 12px;
		opacity: 0.6;
		flex: 0 0 auto;
	}

	.origam-audio__nav-btn--loop-one {
		color: var(--origam-audio---accent-color, var(--origam-color__accent---base));
	}

	.origam-audio--compact .origam-audio__playlist {
		display: none;
	}
</style>
