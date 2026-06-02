<template>
	<Story
			group="components"
			title="Audio/OrigamAudio"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAudioProps>>({
					src: SOUND_HELIX_TRACK,
					title: 'Origam Audio',
					artist: 'Origam',
					album: 'Design System',
					cover: PICSUM_COVER,
					variant: 'expanded',
					coverPosition: 'left'
				})"
		>
			<template #default="{ state }">
				<origam-audio
						:src="state.src"
						:title="state.title"
						:artist="state.artist"
						:album="state.album"
						:cover="state.cover"
						:variant="state.variant"
						:cover-position="state.coverPosition"
						:color="state.color"
						:bg-color="state.bgColor"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:width="state.width"
						:height="state.height"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Variant">
					<HstSelect v-model="state.variant" title="Variant" :options="AUDIO_VARIANT_OPTIONS"/>
					<HstSelect v-model="state.coverPosition" title="Cover Position" :options="COVER_POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IAudioProps>>({
					src: SOUND_HELIX_TRACK,
					title: 'Functional Demo',
					artist: 'Origam',
					cover: PICSUM_COVER,
					controls: 'custom',
					loopMode: 'none',
					preload: 'metadata',
					waveform: false,
					autoplay: false,
					muted: false,
					shuffle: false,
					downloadable: false,
					allowRemotePlayback: false,
					playbackRate: 1
				})"
		>
			<template #default="{ state }">
				<origam-audio
						:src="state.src"
						:title="state.title"
						:artist="state.artist"
						:cover="state.cover"
						:controls="state.controls"
						:loop-mode="state.loopMode"
						:preload="state.preload"
						:waveform="state.waveform"
						:autoplay="state.autoplay"
						:muted="state.muted"
						:shuffle="state.shuffle"
						:downloadable="state.downloadable"
						:allow-remote-playback="state.allowRemotePlayback"
						:playback-rate="state.playbackRate"
						:waveform-color="state.waveformColor"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Playback">
					<HstCheckbox v-model="state.autoplay"  title="Autoplay"/>
					<HstCheckbox v-model="state.muted"     title="Muted"/>
					<HstSelect   v-model="state.loopMode"  title="Loop Mode"  :options="AUDIO_LOOP_MODE_OPTIONS"/>
					<HstCheckbox v-model="state.shuffle"   title="Shuffle"/>
					<HstNumber   v-model="state.playbackRate" title="Playback Rate" :min="0.25" :max="3" :step="0.25"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstSelect   v-model="state.controls"  title="Controls"   :options="AUDIO_CONTROLS_OPTIONS"/>
					<HstCheckbox v-model="state.waveform"  title="Waveform"/>
					<HstText     v-model="state.waveformColor" title="Waveform Color"/>
				</StoryGroup>
				<StoryGroup title="Loading">
					<HstSelect v-model="state.preload" title="Preload" :options="AUDIO_PRELOAD_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Extra">
					<HstCheckbox v-model="state.downloadable"          title="Downloadable"/>
					<HstText     v-model="state.downloadFilename"       title="Download Filename"/>
					<HstCheckbox v-model="state.allowRemotePlayback"   title="Allow Remote Playback"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - play">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Play event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@play="logEvent('play', $event)"
			/>
		</Variant>

		<Variant title="Events - pause">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Pause event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@pause="logEvent('pause', $event)"
			/>
		</Variant>

		<Variant title="Events - ended">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Ended event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@ended="logEvent('ended', $event)"
			/>
		</Variant>

		<Variant title="Events - timeupdate">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Timeupdate event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@timeupdate="logEvent('timeupdate', $event)"
			/>
		</Variant>

		<Variant title="Events - error">
			<origam-audio
					src="https://example.com/this-track-does-not-exist.mp3"
					title="Error event"
					artist="Origam"
					@error="logEvent('error', $event)"
			/>
		</Variant>

		<Variant title="Events - waveform">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Waveform event"
					artist="Origam"
					:waveform="true"
					:cover="PICSUM_COVER"
					@waveform="logEvent('waveform', $event)"
			/>
		</Variant>

		<Variant title="Events - download">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Download event"
					artist="Origam"
					:cover="PICSUM_COVER"
					:downloadable="true"
					@download="logEvent('download', $event)"
			/>
		</Variant>

		<Variant title="Events - update:loopMode">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Loop Mode event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@update:loop-mode="logEvent('update:loopMode', $event)"
			/>
		</Variant>

		<Variant title="Events - update:shuffle">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Shuffle event"
					artist="Origam"
					:cover="PICSUM_COVER"
					@update:shuffle="logEvent('update:shuffle', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Metadata">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Original title"
					artist="Original artist"
					:cover="PICSUM_COVER"
			>
				<template #metadata>
					<figure class="story-custom-meta">
						<figcaption class="story-custom-meta__badge">Now playing</figcaption>
						<span class="story-custom-meta__title">Custom metadata via slot</span>
					</figure>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Cover">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Custom cover via slot"
					artist="Origam"
					album="Slot demos"
			>
				<template #cover>
					<figure class="custom-cover">
						<div class="custom-cover__vinyl"></div>
					</figure>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Waveform">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					:waveform="true"
					title="Custom waveform painter"
			>
				<template #waveform="{ peaks, currentTime, duration }">
					<figure class="custom-waveform">
						<div
								v-for="(peak, i) in peaks"
								:key="i"
								class="custom-waveform__bar"
								:class="{ 'custom-waveform__bar--played': duration > 0 && (i / peaks.length) <= (currentTime / duration) }"
								:style="{ height: Math.max(2, peak * 100) + '%' }"
						/>
					</figure>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Controls">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Slot test"
					artist="Override"
			>
				<template #controls="{ playing, currentTime, duration, methods }">
					<div class="story-custom-controls">
						<button
								type="button"
								class="story-custom-controls__btn"
								:aria-label="playing ? 'Pause' : 'Play'"
								@click="playing ? methods.pause() : void methods.play()"
						>{{ playing ? 'Pause' : 'Play' }}</button>
						<span class="story-custom-controls__time">
							{{ formatTimestamp(currentTime) }} / {{ formatTimestamp(duration) }}
						</span>
					</div>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Title">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Default title"
					artist="Stays default"
					album="Stays default"
					:cover="PICSUM_COVER"
			>
				<template #title>
					<h2 class="story-custom-title">Custom &lt;h2&gt; title via slot</h2>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Error">
			<origam-audio
					src="https://example.com/this-track-does-not-exist.mp3"
					title="Bad URL"
					artist="Origam"
			>
				<template #error="{ error }">
					<figure class="story-custom-error">
						<figcaption><strong>Error overlay (slot)</strong></figcaption>
						<code>{{ ('message' in error && error.message) || 'Playback error' }}</code>
					</figure>
				</template>
			</origam-audio>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAudioProps>({
					src: SOUND_HELIX_TRACK,
					title: 'Origam Audio',
					artist: 'Origam',
					album: 'Design System',
					cover: PICSUM_COVER,
					variant: 'expanded',
					coverPosition: 'left',
					loopMode: 'none',
					controls: 'custom',
					preload: 'metadata'
				})"
		>
			<template #default="{ state }">
				<origam-audio
						v-bind="state"
						@play="logEvent('play', $event)"
						@pause="logEvent('pause', $event)"
						@ended="logEvent('ended', $event)"
						@error="logEvent('error', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title"  title="Title"/>
					<HstText v-model="state.artist" title="Artist"/>
					<HstText v-model="state.album"  title="Album"/>
					<HstText v-model="state.cover"  title="Cover URL"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.variant"       title="Variant"        :options="AUDIO_VARIANT_OPTIONS"/>
					<HstSelect v-model="state.coverPosition" title="Cover Position" :options="COVER_POSITION_OPTIONS"/>
					<HstSelect v-model="state.color"         title="Color"          :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"       title="Bg Color"       :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"       title="Rounded"        :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation"     title="Elevation"      :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect   v-model="state.controls"  title="Controls"   :options="AUDIO_CONTROLS_OPTIONS"/>
					<HstSelect   v-model="state.loopMode"  title="Loop Mode"  :options="AUDIO_LOOP_MODE_OPTIONS"/>
					<HstCheckbox v-model="state.waveform"  title="Waveform"/>
					<HstCheckbox v-model="state.autoplay"  title="Autoplay"/>
					<HstCheckbox v-model="state.muted"     title="Muted"/>
					<HstCheckbox v-model="state.shuffle"   title="Shuffle"/>
					<HstCheckbox v-model="state.downloadable" title="Downloadable"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAudio } from '@origam/components'
	import { AUDIO_LOOP_MODE, AUDIO_VARIANT, COVER_POSITION } from '@origam/enums'
	import type { IAudioProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	const PICSUM_COVER = 'https://picsum.photos/seed/origam-audio/256/256'

	const AUDIO_VARIANT_OPTIONS = [
		{ label: 'Expanded', value: AUDIO_VARIANT.EXPANDED },
		{ label: 'Compact', value: AUDIO_VARIANT.COMPACT }
	]

	const COVER_POSITION_OPTIONS = [
		{ label: 'Left', value: COVER_POSITION.LEFT },
		{ label: 'Right', value: COVER_POSITION.RIGHT }
	]

	const AUDIO_LOOP_MODE_OPTIONS = [
		{ label: 'None', value: AUDIO_LOOP_MODE.NONE },
		{ label: 'All', value: AUDIO_LOOP_MODE.ALL },
		{ label: 'One', value: AUDIO_LOOP_MODE.ONE }
	]

	const AUDIO_CONTROLS_OPTIONS = [
		{ label: 'Custom', value: 'custom' },
		{ label: 'Native', value: 'native' }
	]

	const AUDIO_PRELOAD_OPTIONS = [
		{ label: 'Metadata', value: 'metadata' },
		{ label: 'None', value: 'none' },
		{ label: 'Auto', value: 'auto' }
	]

	function formatTimestamp (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const m = Math.floor(total / 60)
		const s = total % 60
		return `${ m.toString().padStart(2, '0') }:${ s.toString().padStart(2, '0') }`
	}
</script>

<style scoped>
	.story-custom-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 12px;
		margin: 0;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 8px;
	}

	.story-custom-meta__badge {
		font: 600 0.7rem/1.1 ui-monospace, monospace;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--origam-color__action--primary---bg, #2563eb);
	}

	.story-custom-meta__title {
		font: 600 0.95rem/1.3 system-ui, sans-serif;
	}

	.story-custom-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		font: 0.875rem/1.2 system-ui, sans-serif;
	}

	.story-custom-controls__btn {
		background: var(--origam-color__action--primary---bg, #2563eb);
		color: #ffffff;
		border: 0;
		padding: 6px 14px;
		border-radius: 6px;
		cursor: pointer;
		font: inherit;
	}

	.story-custom-controls__time {
		font-family: ui-monospace, monospace;
	}

	.story-custom-title {
		margin: 0;
		font: 700 1.1rem/1.2 system-ui, sans-serif;
		color: var(--origam-color__action--primary---bg, #2563eb);
	}

	.story-custom-error {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 14px;
		margin: 0;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.4);
		border-radius: 8px;
		color: #b91c1c;
		font: 0.875rem/1.3 system-ui, sans-serif;
	}

	.custom-waveform {
		display: flex;
		align-items: center;
		gap: 2px;
		width: 100%;
		height: 56px;
		margin: 0;
	}

	.custom-waveform__bar {
		flex: 1 1 auto;
		min-width: 2px;
		background: color-mix(in srgb, currentColor 30%, transparent);
		border-radius: 1px;
	}

	.custom-waveform__bar--played {
		background: var(--origam-audio__waveform---color-played, currentColor);
	}

	.custom-cover {
		width: var(--origam-audio__cover---size, 96px);
		height: var(--origam-audio__cover---size, 96px);
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at center, #1f2937 0%, #0f172a 100%);
		border-radius: 50%;
		overflow: hidden;
		margin: 0;
	}

	.custom-cover__vinyl {
		width: 80%;
		height: 80%;
		background:
				radial-gradient(circle at center, #f3f4f6 8%, transparent 9%),
				radial-gradient(circle at center, #1f2937 12%, transparent 13%),
				repeating-radial-gradient(circle at center, #111827 0 1px, #1f2937 1px 3px);
		border-radius: 50%;
		animation: vinyl-spin 4s linear infinite;
	}

	@keyframes vinyl-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>

<docs
		lang="md"
		src="@docs/components/Audio/OrigamAudio.md"
/>
