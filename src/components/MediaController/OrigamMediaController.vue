<template>
	<div
			class="origam-media-controller"
			:class="rootClasses"
			:style="props.style"
			data-cy="origam-media-controller"
	>
		<div class="origam-media-controller__progress-row">
			<origam-media-scrubber
					:model-value="state.currentTime.value"
					:max="scrubberMax"
					:step="0.1"
					:buffered="state.buffered.value"
					orientation="horizontal"
					show-thumb-on-hover-only
					show-hover-tooltip
					:format-hover-tooltip="formatScrubberTime"
					:aria-label="t('origam.media.seek')"
					:aria-value-text="formattedCurrentTime"
					class="origam-media-controller__scrubber"
					data-cy="origam-media-controller-scrubber"
					@update:model-value="onScrubberSeek"
					@change="onScrubberCommit"
			/>
		</div>

		<div class="origam-media-controller__buttons-row">
			<div class="origam-media-controller__buttons-left">
				<button
						type="button"
						class="origam-media-controller__btn"
						:aria-label="t(playPauseLabelKey)"
						data-cy="origam-media-controller-play"
						@click="onTogglePlay"
				>
					<origam-icon
							:icon="state.playing.value ? ICONS.PAUSE : ICONS.PLAY"
							aria-hidden="true"
					/>
				</button>

				<origam-tooltip
						:open-delay="80"
						:close-delay="300"
						location="top"
						content-class="origam-media-controller__volume-tooltip"
				>
					<template #activator="{ props: activatorProps }">
						<button
								v-bind="activatorProps"
								type="button"
								class="origam-media-controller__btn"
								:aria-label="t(muteLabelKey)"
								data-cy="origam-media-controller-mute"
								@click="onToggleMute"
						>
							<origam-icon
									:icon="volumeIcon"
									aria-hidden="true"
							/>
						</button>
					</template>
					<div
							class="origam-media-controller__volume-wrapper"
							data-cy="origam-media-controller-volume-wrapper"
					>
						<origam-media-scrubber
								class="origam-media-controller__volume-scrubber"
								orientation="vertical"
								:model-value="resolvedVolume"
								:max="1"
								:step="0.05"
								:aria-label="t('origam.media.volume')"
								:aria-value-text="formattedVolume"
								:format-hover-tooltip="formatVolumeTooltip"
								data-cy="origam-media-controller-volume"
								@update:model-value="onVolumeChangeFromScrubber"
						/>
					</div>
				</origam-tooltip>

				<span
						class="origam-media-controller__time"
						data-cy="origam-media-controller-time"
				>
					<span class="origam-media-controller__time-current">{{ formattedCurrentTime }}</span>
					<span class="origam-media-controller__time-sep">/</span>
					<span class="origam-media-controller__time-total">{{ formattedDuration }}</span>
				</span>

				<slot name="extraControlsLeft" />
			</div>

			<div class="origam-media-controller__buttons-right">
				<slot name="extraControlsRight" />

				<button
						v-if="showCastButton"
						type="button"
						class="origam-media-controller__btn"
						:class="{ 'origam-media-controller__btn--active': isCasting }"
						:aria-label="t(castLabelKey)"
						data-cy="origam-media-controller-cast"
						@click="onCastClick"
				>
					<origam-icon
							:icon="ICONS.CAST"
							aria-hidden="true"
					/>
				</button>

				<origam-tooltip
						v-if="hasConfigContent"
						v-model="configMenuOpen"
						:open-on-hover="false"
						:open-on-click="true"
						:close-on-content-click="false"
						location="top"
						content-class="origam-media-controller__config-menu"
				>
					<template #activator="{ props: activatorProps }">
						<button
								v-bind="activatorProps"
								type="button"
								class="origam-media-controller__btn"
								:class="{ 'origam-media-controller__btn--active': configMenuOpen }"
								:aria-label="t('origam.media.settings')"
								data-cy="origam-media-controller-config"
						>
							<origam-icon
									:icon="ICONS.COG"
									aria-hidden="true"
							/>
						</button>
					</template>
					<div
							class="origam-media-controller__config"
							data-cy="origam-media-controller-config-menu"
					>
						<template v-if="configSection === 'main'">
							<button
									v-if="hasQualityOptions"
									type="button"
									class="origam-media-controller__config-row"
									data-cy="origam-media-controller-config-open-quality"
									@click="onOpenQualitySection"
							>
								<span class="origam-media-controller__config-row-label">{{ t('origam.media.quality') }}</span>
								<span class="origam-media-controller__config-row-value">{{ formattedQuality }}</span>
								<span
										class="origam-media-controller__config-row-arrow"
										aria-hidden="true"
								>›</span>
							</button>
							<button
									v-if="hasPlaybackRates"
									type="button"
									class="origam-media-controller__config-row"
									data-cy="origam-media-controller-config-open-speed"
									@click="onOpenSpeedSection"
							>
								<span class="origam-media-controller__config-row-label">{{ t('origam.media.playbackSpeed') }}</span>
								<span class="origam-media-controller__config-row-value">{{ formattedPlaybackRate }}</span>
								<span
										class="origam-media-controller__config-row-arrow"
										aria-hidden="true"
								>›</span>
							</button>
							<button
									v-if="canDownload"
									type="button"
									class="origam-media-controller__config-row origam-media-controller__config-row--action"
									data-cy="origam-media-controller-config-download"
									@click="onDownloadClick"
							>
								<span
										class="origam-media-controller__config-row-icon"
										aria-hidden="true"
								>
									<origam-icon :icon="ICONS.DOWNLOAD" />
								</span>
								<span class="origam-media-controller__config-row-label">{{ t('origam.media.download') }}</span>
							</button>
							<slot
									name="configExtra"
									v-bind="configExtraBindings"
							/>
						</template>

						<template v-else-if="configSection === 'speed'">
							<button
									type="button"
									class="origam-media-controller__config-row origam-media-controller__config-row--back"
									data-cy="origam-media-controller-config-back"
									@click="onBackToMain"
							>
								<span
										class="origam-media-controller__config-row-arrow origam-media-controller__config-row-arrow--back"
										aria-hidden="true"
								>‹</span>
								<span class="origam-media-controller__config-row-label">{{ t('origam.media.playbackSpeed') }}</span>
							</button>
							<button
									v-for="rate in playbackRates"
									:key="rate"
									type="button"
									class="origam-media-controller__config-item"
									:class="{ 'origam-media-controller__config-item--active': isActivePlaybackRate(rate) }"
									:data-cy="`origam-media-controller-config-rate-${rate}`"
									@click="onPlaybackRateClick(rate)"
							>
								{{ playbackRateLabel(rate) }}
							</button>
						</template>

						<template v-else-if="configSection === 'quality'">
							<button
									type="button"
									class="origam-media-controller__config-row origam-media-controller__config-row--back"
									data-cy="origam-media-controller-config-back"
									@click="onBackToMain"
							>
								<span
										class="origam-media-controller__config-row-arrow origam-media-controller__config-row-arrow--back"
										aria-hidden="true"
								>‹</span>
								<span class="origam-media-controller__config-row-label">{{ t('origam.media.quality') }}</span>
							</button>
							<button
									v-for="q in qualityOptions"
									:key="q.quality"
									type="button"
									class="origam-media-controller__config-item"
									:class="{ 'origam-media-controller__config-item--active': isActiveQuality(q.quality) }"
									:data-cy="`origam-media-controller-config-quality-${q.quality}`"
									@click="onQualityClick(q.quality)"
							>
								{{ q.label }}
							</button>
						</template>
					</div>
				</origam-tooltip>
			</div>
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
		useSlots,
		watch
	} from 'vue'

	import { OrigamIcon } from '../Icon'
	import { OrigamMediaScrubber } from '../MediaScrubber'
	import { OrigamTooltip } from '../Tooltip'

	import { useLocale } from '../../composables'

	import { MDI_ICONS } from '../../enums'

	import type {
		IMediaControllerProps, IMediaControllerSlots} from '../../interfaces'

	import type { IMediaControllerEmits } from '../../interfaces/MediaController/media-controller.interface'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamMediaController>` — the reusable
	 * media-controls shell extracted from `<OrigamVideo>` so that
	 * `<OrigamAudio>` (step 4) can reuse the exact same scrubber row +
	 * buttons row + config menu surface. Media-agnostic: the parent
	 * owns the `<video>` / `<audio>` element AND feeds the Controller
	 * with the reactive `state` + `methods` returned by the underlying
	 * media-player composable.
	 *
	 * Defaults are inlined here (not pulled from a constant object)
	 * because the Vue SFC compiler analyses `withDefaults` statically
	 * and only resolves literal values — cf. CLAUDE.md rule.
	 ********************************************************/
	const { t } = useLocale()

	const props = withDefaults(defineProps<IMediaControllerProps>(), {
		inset: false,
		visible: true,
		playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
		allowRemotePlayback: false,
		downloadable: false,
		downloadUrl: null,
		qualityOptions: () => [],
		currentQuality: null
	})

	const emit = defineEmits<IMediaControllerEmits>()

	defineSlots<IMediaControllerSlots>()

	const slots = useSlots()

	/*********************************************************
	 * Icon refs — single source of truth for the toolbar glyphs.
	 * Mirrors the subset used by the previous OrigamVideo toolbar so
	 * the visual is identical; volume icons swap based on the runtime
	 * volume / muted state below.
	 ********************************************************/
	const ICONS = {
		PLAY: MDI_ICONS.PLAY,
		PAUSE: MDI_ICONS.PAUSE,
		VOLUME_HIGH: MDI_ICONS.VOLUME_HIGH,
		VOLUME_MEDIUM: MDI_ICONS.VOLUME_MEDIUM,
		VOLUME_LOW: MDI_ICONS.VOLUME_LOW,
		VOLUME_OFF: MDI_ICONS.VOLUME_OFF,
		COG: MDI_ICONS.COG,
		CAST: MDI_ICONS.CAST,
		DOWNLOAD: MDI_ICONS.DOWNLOAD
	}

	/*********************************************************
	 * Reactive shorthands — surfaced as locals so the template stays
	 * free of `state.X.value` accesses (cf. CLAUDE.md "no logic in
	 * templates" rule).
	 ********************************************************/
	const state = computed(() => props.state)
	const methods = computed(() => props.methods)

	/*********************************************************
	 * Config menu — drill-down state. Resets to 'main' on close so the
	 * user lands on the top level on the next open (YouTube UX).
	 ********************************************************/
	const configMenuOpen = ref<boolean>(false)
	const configSection = ref<'main' | 'speed' | 'quality'>('main')

	watch(configMenuOpen, (open) => {
		if (!open) configSection.value = 'main'
	})

	const hasQualityOptions = computed<boolean>(() => props.qualityOptions.length >= 2)
	const hasPlaybackRates = computed<boolean>(() => (props.playbackRates?.length ?? 0) > 1)
	const canDownload = computed<boolean>(() => Boolean(props.downloadable) && Boolean(props.downloadUrl))

	const hasConfigContent = computed<boolean>(() => {
		return Boolean(slots.configExtra)
			|| hasPlaybackRates.value
			|| hasQualityOptions.value
			|| canDownload.value
	})

	const closeMenu = (): void => {
		configMenuOpen.value = false
	}

	const configExtraBindings = computed(() => ({ closeMenu }))

	const onOpenQualitySection = (): void => {
		configSection.value = 'quality'
	}

	const onOpenSpeedSection = (): void => {
		configSection.value = 'speed'
	}

	const onBackToMain = (): void => {
		configSection.value = 'main'
	}

	/*********************************************************
	 * Cast / Remote Playback — visibility gate combines the parent's
	 * allow flag with the runtime `remoteAvailable` ref. We avoid
	 * peeking at the underlying media element from here because the
	 * Controller is intentionally media-agnostic.
	 ********************************************************/
	const showCastButton = computed<boolean>(() => {
		return Boolean(props.allowRemotePlayback) && state.value.remoteAvailable.value
	})

	const isCasting = computed<boolean>(() => state.value.remoteState.value === 'connected')

	const castLabelKey = computed<string>(() => {
		return isCasting.value ? 'origam.media.stopCasting' : 'origam.media.castToDevice'
	})

	async function onCastClick (): Promise<void> {
		await methods.value.requestRemotePlayback()
	}

	/*********************************************************
	 * Play / pause — uses the composable's `play()` / `pause()`
	 * methods directly. The parent can listen to the state ref to
	 * trigger any extra UX (e.g. the YouTube-style center pulse in
	 * OrigamVideo) — that side-effect is INTENTIONALLY left to the
	 * parent so the Controller stays media-agnostic.
	 ********************************************************/
	const playPauseLabelKey = computed<string>(() => {
		return state.value.playing.value ? 'origam.media.pause' : 'origam.media.play'
	})

	function onTogglePlay (): void {
		if (state.value.playing.value) methods.value.pause()
		else methods.value.play()
	}

	/*********************************************************
	 * Mute / volume — `resolvedVolume` collapses the "muted" axis: when
	 * muted=true the slider sits at the bottom (0) and the user can
	 * drag up to un-mute in a single gesture (YouTube parity).
	 ********************************************************/
	const muteLabelKey = computed<string>(() => {
		return state.value.muted.value ? 'origam.media.unmute' : 'origam.media.mute'
	})

	function onToggleMute (): void {
		methods.value.toggleMute()
	}

	const resolvedVolume = computed<number>(() => {
		return state.value.muted.value ? 0 : state.value.volume.value
	})

	const formattedVolume = computed<string>(() => {
		const pct = Math.round(resolvedVolume.value * 100)
		return `${pct} %`
	})

	function formatVolumeTooltip (value: number): string {
		return `${Math.round(value * 100)} %`
	}

	function onVolumeChangeFromScrubber (value: number): void {
		if (value > 0 && state.value.muted.value) methods.value.toggleMute()
		else if (value === 0 && !state.value.muted.value) methods.value.toggleMute()
		methods.value.setVolume(value)
	}

	const volumeIcon = computed<string>(() => {
		if (state.value.muted.value || state.value.volume.value === 0) return ICONS.VOLUME_OFF
		if (state.value.volume.value < 0.34) return ICONS.VOLUME_LOW
		if (state.value.volume.value < 0.67) return ICONS.VOLUME_MEDIUM
		return ICONS.VOLUME_HIGH
	})

	/*********************************************************
	 * Scrubber bindings — delegate to the headless
	 * `<OrigamMediaScrubber>`. Both `update:modelValue` (live drag) and
	 * `change` (commit) call `seek` so the video tracks the thumb in
	 * real time. The native `<video>` ignores redundant seeks to the
	 * same position, so no throttling needed.
	 ********************************************************/
	const scrubberMax = computed<number>(() => {
		return Number.isFinite(state.value.duration.value) ? state.value.duration.value : 0
	})

	function onScrubberSeek (value: number): void {
		methods.value.seek(value)
	}

	function onScrubberCommit (value: number): void {
		methods.value.seek(value)
	}

	function formatScrubberTime (seconds: number): string {
		return formatTime(seconds)
	}

	/*********************************************************
	 * Time formatting — mm:ss for short medias, hh:mm:ss for long
	 * ones. Returns an em-dash placeholder while metadata is loading
	 * so the toolbar doesn't flash "NaN:NaN".
	 ********************************************************/
	const formattedCurrentTime = computed<string>(() => formatTime(state.value.currentTime.value))
	const formattedDuration = computed<string>(() => formatTime(state.value.duration.value))

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
	 * Playback rate — config menu sub-section. The Controller calls
	 * `methods.setPlaybackRate(rate)` directly (no emit) and closes
	 * the menu. The parent observes `state.playbackRate` if it needs
	 * to surface the change externally (e.g. `update:playbackRate` on
	 * OrigamVideo).
	 ********************************************************/
	const formattedPlaybackRate = computed<string>(() => {
		const r = state.value.playbackRate.value
		if (Math.abs(r - 1) < 0.01) return t('origam.media.normalSpeed')
		return `${r}×`
	})

	function isActivePlaybackRate (rate: number): boolean {
		return Math.abs(state.value.playbackRate.value - rate) < 0.01
	}

	function playbackRateLabel (rate: number): string {
		return rate === 1 ? t('origam.media.normalSpeed') : `${rate}×`
	}

	function onPlaybackRateClick (rate: number): void {
		methods.value.setPlaybackRate(rate)
		closeMenu()
	}

	/*********************************************************
	 * Quality — Controller emits `quality-change`; parent owns the
	 * actual `<source>` swap (we don't know the underlying element
	 * here). Menu is closed by the Controller for consistency with
	 * the speed submenu.
	 ********************************************************/
	const formattedQuality = computed<string>(() => {
		if (!props.currentQuality) return ''
		const match = props.qualityOptions.find((q) => q.quality === props.currentQuality)
		return match?.label ?? props.currentQuality
	})

	function isActiveQuality (quality: string): boolean {
		return props.currentQuality === quality
	}

	function onQualityClick (quality: string): void {
		emit('quality-change', quality)
		closeMenu()
	}

	/*********************************************************
	 * Download — Controller emits `download`; parent owns the actual
	 * fetch / anchor click. Only fired when both `downloadable` is
	 * true AND `downloadUrl` is non-null (cf. `canDownload`).
	 ********************************************************/
	function onDownloadClick (): void {
		if (!canDownload.value) return
		emit('download')
		closeMenu()
	}

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-media-controller--inset': props.inset,
			'origam-media-controller--visible': props.visible
		},
		props.class
	])

	defineExpose({
		configMenuOpen,
		configSection
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-media-controller {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0 0 6px;
		color: var(--origam-media-controller---color, #ffffff);
		transition: opacity 180ms ease, transform 220ms ease;
	}

	.origam-media-controller__progress-row {
		padding: 0 12px;
	}

	.origam-media-controller__buttons-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8px;
		min-height: 36px;
	}

	.origam-media-controller__buttons-left,
	.origam-media-controller__buttons-right {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.origam-media-controller--inset {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 100%);
		opacity: 0;
		pointer-events: none;
	}

	.origam-media-controller--inset.origam-media-controller--visible {
		opacity: 1;
		pointer-events: auto;
	}

	.origam-media-controller__scrubber {
		--origam-media-scrubber---color: var(
			--origam-media-controller__scrubber---color,
			var(--origam-color__action--primary---bg, #ef4444)
		);
		--origam-media-scrubber---track-background-color: rgba(255, 255, 255, 0.3);
		--origam-media-scrubber---buffer-background-color: rgba(255, 255, 255, 0.4);
		width: 100%;
	}

	// YouTube-style compact volume popover :
	//   • dark translucent backdrop
	//   • narrow column (~28 px) so it never covers the playback area
	//   • 80 px tall track — short enough to scan in one glance, long
	//     enough to keep slider precision on a 0..1 range
	//   • track 4 px / thumb 10 px (overrides MediaScrubber defaults)
	//   • no chrome around the tooltip (border-radius lives on the
	//     Tooltip surface itself, our content is pure scrubber)
	:deep(.origam-media-controller__volume-tooltip) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 8px;
		background-color: rgba(28, 28, 28, 0.92);
	}

	.origam-media-controller__volume-wrapper {
		width: 14px;
		height: 80px;
		display: flex;
		align-items: stretch;
		justify-content: center;
	}

	.origam-media-controller__volume-scrubber {
		--origam-media-scrubber---color: #ffffff;
		--origam-media-scrubber---track-background-color: rgba(255, 255, 255, 0.3);
		--origam-media-scrubber---track-size: 4px;
		--origam-media-scrubber---track-size-active: 4px;
		--origam-media-scrubber---thumb-diameter: 10px;
	}

	.origam-media-controller__btn {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		color: #ffffff;
		transition: background-color 120ms ease, transform 120ms ease, opacity 120ms ease;
		opacity: 0.95;
	}

	.origam-media-controller__btn:hover,
	.origam-media-controller__btn:focus-visible {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-media-controller__btn:active {
		transform: scale(0.92);
	}

	.origam-media-controller__btn--active {
		opacity: 1;
		position: relative;
	}

	.origam-media-controller__btn--active::after {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #ef4444;
	}

	.origam-media-controller__btn .origam-icon {
		font-size: 20px;
		line-height: 1;
	}

	.origam-media-controller__time {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 0 6px;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		color: #ffffff;
		white-space: nowrap;
		user-select: none;
	}

	.origam-media-controller__time-sep {
		opacity: 0.6;
	}

	.origam-media-controller__time-total {
		opacity: 0.7;
	}

	:deep(.origam-media-controller__config-menu) {
		padding: 4px 0;
		min-width: 168px;
		max-width: 220px;
	}

	.origam-media-controller__config {
		display: flex;
		flex-direction: column;
		font-size: 0.75rem;
		line-height: 1.2;
	}

	.origam-media-controller__config-row {
		all: unset;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-media-controller__config-row:hover,
	.origam-media-controller__config-row:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-media-controller__config-row-label {
		flex: 1 1 auto;
		min-width: 0;
	}

	.origam-media-controller__config-row-value {
		color: rgba(255, 255, 255, 0.7);
	}

	.origam-media-controller__config-row-arrow {
		color: rgba(255, 255, 255, 0.55);
		font-size: 1rem;
		line-height: 1;
	}

	.origam-media-controller__config-row--back {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 2px;
		color: rgba(255, 255, 255, 0.85);
	}

	.origam-media-controller__config-row-arrow--back {
		font-size: 1.1rem;
	}

	.origam-media-controller__config-item {
		all: unset;
		display: flex;
		align-items: center;
		padding: 5px 12px;
		color: #ffffff;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.origam-media-controller__config-item:hover,
	.origam-media-controller__config-item:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.origam-media-controller__config-item--active {
		font-weight: 600;
		color: var(--origam-color__action--primary---bg, #60a5fa);
	}
</style>
