<template>
	<div
			class="origam-media-controller"
			:class="rootClasses"
			:style="style"
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
				<origam-media-play-btn
						:playing="state.playing.value"
						:play-label="t('origam.media.play')"
						:pause-label="t('origam.media.pause')"
						data-cy="origam-media-controller-play"
						@click="onTogglePlay"
				/>

				<origam-media-volume-control
						:volume="state.volume.value"
						:muted="state.muted.value"
						:mute-label="t('origam.media.mute')"
						:unmute-label="t('origam.media.unmute')"
						:volume-label="t('origam.media.volume')"
						data-cy="origam-media-controller-volume"
						@update:muted="onToggleMute"
						@update:volume="onVolumeChangeFromScrubber"
				/>

				<origam-media-time-label
						:current-time="state.currentTime.value"
						:duration="state.duration.value"
						data-cy="origam-media-controller-time"
				/>

				<slot name="extraControlsLeft" />
			</div>

			<div class="origam-media-controller__buttons-right">
				<slot name="extraControlsRight" />

				<origam-media-cast-btn
						:available="showCastButton"
						:casting="isCasting"
						:cast-label="t('origam.media.castToDevice')"
						:stop-cast-label="t('origam.media.stopCasting')"
						data-cy="origam-media-controller-cast"
						@click="onCastClick"
				/>

				<origam-media-config-menu
						v-if="hasConfigContent"
						v-model:open="configMenuOpen"
						v-model:section="configSection"
						:playback-rates="props.playbackRates"
						:playback-rate="state.playbackRate.value"
						:quality-options="props.qualityOptions"
						:current-quality="props.currentQuality"
						:downloadable="props.downloadable"
						:download-url="props.downloadUrl"
						:download-filename="props.downloadFilename"
						:settings-label="t('origam.media.settings')"
						:quality-label="t('origam.media.quality')"
						:speed-label="t('origam.media.playbackSpeed')"
						:download-label="t('origam.media.download')"
						:normal-speed-label="t('origam.media.normalSpeed')"
						data-cy="origam-media-controller-config"
						@update:playback-rate="onPlaybackRateChange"
						@quality-change="onQualityChange"
						@download="onDownload"
				>
					<template
							v-if="$slots.configExtra"
							#configExtra="bindings"
					>
						<slot
								name="configExtra"
								v-bind="bindings"
						/>
					</template>
				</origam-media-config-menu>
			</div>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, useSlots } from 'vue'

	import { OrigamMediaCastBtn } from '../MediaCastBtn'
	import { OrigamMediaConfigMenu } from '../MediaConfigMenu'
	import { OrigamMediaPlayBtn } from '../MediaPlayBtn'
	import { OrigamMediaScrubber } from '../MediaScrubber'
	import { OrigamMediaTimeLabel } from '../MediaTimeLabel'
	import { OrigamMediaVolumeControl } from '../MediaVolumeControl'

	import { useLocale } from '../../composables'

	import { formatMediaTime } from '../../utils'

	import type {
		IMediaControllerEmits,
		IMediaControllerProps,
		IMediaControllerSlots
	} from '../../interfaces'

	import type { TMediaConfigSection } from '../../types'

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
	 *
	 * Since v2.2, the toolbar internals are composed from atomic
	 * sub-components (`<OrigamMediaPlayBtn>`, `<OrigamMediaVolumeControl>`,
	 * `<OrigamMediaTimeLabel>`, `<OrigamMediaCastBtn>`,
	 * `<OrigamMediaConfigMenu>`) so `<OrigamAudio>` can recompose the
	 * same atoms into a Stemtracks-style studio strip without going
	 * through this Controller. The Controller keeps its public API
	 * byte-for-byte identical so `<OrigamVideo>` consumers keep working.
	 ********************************************************/
	const { t } = useLocale()

	const props = withDefaults(defineProps<IMediaControllerProps>(), {
		inset: false,
		visible: true,
		playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
		allowRemotePlayback: false,
		downloadable: false,
		downloadUrl: null,
		downloadFilename: undefined,
		qualityOptions: () => [],
		currentQuality: null
	})

	const emit = defineEmits<IMediaControllerEmits>()

	defineSlots<IMediaControllerSlots>()

	const slots = useSlots()

	/*********************************************************
	 * Reactive shorthands — surfaced as locals so the template stays
	 * free of `state.X.value` accesses (cf. CLAUDE.md "no logic in
	 * templates" rule).
	 ********************************************************/
	const state = computed(() => props.state)
	const methods = computed(() => props.methods)

	/*********************************************************
	 * Config menu — drill-down state. The refs live here (not inside
	 * the atom) because the legacy `defineExpose` contract surfaces
	 * them to consumers + unit tests by these exact names.
	 ********************************************************/
	const configMenuOpen = ref<boolean>(false)
	const configSection = ref<TMediaConfigSection>('main')

	const hasQualityOptions = computed<boolean>(() => props.qualityOptions.length >= 2)
	const hasPlaybackRates = computed<boolean>(() => (props.playbackRates?.length ?? 0) > 1)
	const canDownload = computed<boolean>(() => Boolean(props.downloadable) && Boolean(props.downloadUrl))

	const hasConfigContent = computed<boolean>(() => {
		return Boolean(slots.configExtra)
			|| hasPlaybackRates.value
			|| hasQualityOptions.value
			|| canDownload.value
	})

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
	function onTogglePlay (): void {
		if (state.value.playing.value) methods.value.pause()
		else methods.value.play()
	}

	/*********************************************************
	 * Mute / volume — `OrigamMediaVolumeControl` owns the off/low/
	 * med/high icon swap and the muted-collapse rule (slider sits at
	 * 0 when muted=true so a drag-up unmutes in a single gesture).
	 ********************************************************/
	function onToggleMute (): void {
		methods.value.toggleMute()
	}

	function onVolumeChangeFromScrubber (value: number): void {
		if (value > 0 && state.value.muted.value) methods.value.toggleMute()
		else if (value === 0 && !state.value.muted.value) methods.value.toggleMute()
		methods.value.setVolume(value)
	}

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
		return formatMediaTime(seconds)
	}

	/*********************************************************
	 * Time formatting — delegated to the shared
	 * `formatMediaTime()` util (consumed by both the scrubber
	 * hover-tooltip and the `<OrigamMediaTimeLabel>` atom).
	 ********************************************************/
	const formattedCurrentTime = computed<string>(() => formatMediaTime(state.value.currentTime.value))

	/*********************************************************
	 * Playback rate — config menu sub-section. The Controller calls
	 * `methods.setPlaybackRate(rate)` directly (no emit) and the
	 * config-menu atom handles closing itself.
	 ********************************************************/
	function onPlaybackRateChange (rate: number): void {
		methods.value.setPlaybackRate(rate)
	}

	/*********************************************************
	 * Quality — Controller forwards `quality-change` upward; the
	 * parent owns the actual `<source>` swap (we don't know the
	 * underlying element here). The config-menu atom closes itself.
	 ********************************************************/
	function onQualityChange (quality: string): void {
		emit('quality-change', quality)
	}

	/*********************************************************
	 * Download — the config-menu atom owns the same-origin /
	 * cross-origin fetch + blob fallback logic. The Controller just
	 * re-emits `download` so legacy consumers keep working.
	 ********************************************************/
	function onDownload (): void {
		emit('download')
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

	const style = computed(() => props.style)

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
</style>
