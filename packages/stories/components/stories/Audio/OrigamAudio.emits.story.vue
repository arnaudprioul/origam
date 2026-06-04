<template>
	<Story
			group="components"
			title="Audio/OrigamAudio (emits)"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAudioProps>>({
					src: SOUND_HELIX_TRACK,
					title: 'Daydream',
					artist: 'Origam DS Cast',
					album: 'Season 3',
					cover: PICSUM_COVER,
					variant: 'expanded',
					coverPosition: 'left',
					color: 'primary',
					bgColor: undefined,
					rounded: undefined,
					elevation: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					position: 'relative'
				})"
		>
			<template #default="{ state }">
				<origam-audio
						:src="state.src as string"
						:title="state.title"
						:artist="state.artist"
						:album="state.album"
						:cover="(state.cover as string) || undefined"
						:variant="state.variant"
						:cover-position="state.coverPosition"
						:color="state.color || undefined"
						:bg-color="state.bgColor || undefined"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:position="state.position"
						:waveform="true"
						class="story-audio"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Variant">
					<HstSelect v-model="state.variant"       title="Variant"        :options="AUDIO_VARIANT_OPTIONS"/>
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
				<StoryGroup title="Position">
					<HstSelect v-model="state.position" title="Position" :options="POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Metadata">
					<HstText v-model="state.title"  title="Title"/>
					<HstText v-model="state.artist" title="Artist"/>
					<HstText v-model="state.album"  title="Album"/>
					<HstText v-model="state.cover"  title="Cover URL"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IAudioProps>>({
					src: SOUND_HELIX_TRACK,
					controls: 'custom',
					preload: 'metadata',
					playbackRate: 1,
					autoplay: false,
					muted: false,
					loop: false,
					loopMode: 'none',
					shuffle: false,
					waveform: false,
					downloadable: false,
					downloadFilename: '',
					allowRemotePlayback: false
				})"
		>
			<template #default="{ state }">
				<origam-audio
						:src="state.src as string"
						title="Functional demo"
						artist="Origam"
						:controls="state.controls"
						:preload="state.preload"
						:playback-rate="state.playbackRate"
						:autoplay="state.autoplay"
						:muted="state.muted"
						:loop="state.loop"
						:loop-mode="state.loopMode"
						:shuffle="state.shuffle"
						:waveform="state.waveform"
						:downloadable="state.downloadable"
						:download-filename="state.downloadFilename || undefined"
						:allow-remote-playback="state.allowRemotePlayback"
						class="story-audio"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Controls">
					<HstSelect v-model="state.controls" title="Controls" :options="AUDIO_CONTROLS_OPTIONS"/>
					<HstSelect v-model="state.preload"  title="Preload"  :options="PRELOAD_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Playback">
					<HstNumber   v-model="state.playbackRate" title="Playback Rate" :min="0.25" :max="4" :step="0.25"/>
					<HstSelect   v-model="state.loopMode"     title="Loop Mode"     :options="AUDIO_LOOP_MODE_OPTIONS"/>
					<HstCheckbox v-model="state.loop"         title="Loop (legacy)"/>
					<HstCheckbox v-model="state.shuffle"      title="Shuffle"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.autoplay"           title="Autoplay"/>
					<HstCheckbox v-model="state.muted"              title="Muted"/>
					<HstCheckbox v-model="state.waveform"           title="Waveform"/>
					<HstCheckbox v-model="state.downloadable"       title="Downloadable"/>
					<HstCheckbox v-model="state.allowRemotePlayback" title="Allow Remote Playback"/>
				</StoryGroup>
				<StoryGroup title="Download">
					<HstText v-model="state.downloadFilename" title="Download Filename"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - play">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Play emit demo"
					artist="Origam"
					class="story-audio"
					@play="logEvent('play', undefined)"
			/>
		</Variant>

		<Variant title="Events - pause">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Pause emit demo"
					artist="Origam"
					class="story-audio"
					@pause="logEvent('pause', undefined)"
			/>
		</Variant>

		<Variant title="Events - ended">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Ended emit demo"
					artist="Origam"
					class="story-audio"
					@ended="logEvent('ended', undefined)"
			/>
		</Variant>

		<Variant title="Events - update:playbackRate">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Playback rate emit demo"
					artist="Origam"
					class="story-audio"
					@update:playback-rate="logEvent('update:playbackRate', $event)"
			/>
		</Variant>

		<Variant title="Events - previous">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Previous emit demo"
					artist="Origam"
					class="story-audio"
					@previous="logEvent('previous', undefined)"
			/>
		</Variant>

		<Variant title="Events - next">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Next emit demo"
					artist="Origam"
					class="story-audio"
					@next="logEvent('next', undefined)"
			/>
		</Variant>

		<Variant title="Events - timeupdate">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Timeupdate emit demo"
					artist="Origam"
					class="story-audio"
					@timeupdate="logEvent('timeupdate', $event)"
			/>
		</Variant>

		<Variant title="Events - volumechange">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Volumechange emit demo"
					artist="Origam"
					class="story-audio"
					@volumechange="logEvent('volumechange', $event)"
			/>
		</Variant>

		<Variant title="Events - loadedmetadata">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Loadedmetadata emit demo"
					artist="Origam"
					class="story-audio"
					@loadedmetadata="logEvent('loadedmetadata', $event)"
			/>
		</Variant>

		<Variant title="Events - waveform">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					:waveform="true"
					title="Waveform emit demo"
					artist="Origam"
					class="story-audio"
					@waveform="logEvent('waveform', $event)"
			/>
		</Variant>

		<Variant title="Events - download">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					:downloadable="true"
					title="Download emit demo"
					artist="Origam"
					class="story-audio"
					@download="logEvent('download', $event)"
			/>
		</Variant>

		<Variant title="Events - error">
			<origam-audio
					src="https://example.com/this-track-does-not-exist.mp3"
					title="Error emit demo"
					artist="Origam"
					class="story-audio"
					@error="logEvent('error', $event)"
			/>
		</Variant>

		<Variant title="Events - update:currentTrackIndex">
			<origam-audio
					:playlist="DEMO_PLAYLIST"
					class="story-audio"
					@update:current-track-index="logEvent('update:currentTrackIndex', $event)"
			/>
		</Variant>

		<Variant title="Events - update:loopMode">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Loop mode emit demo"
					artist="Origam"
					class="story-audio"
					@update:loop-mode="logEvent('update:loopMode', $event)"
			/>
		</Variant>

		<Variant title="Events - update:shuffle">
			<origam-audio
					:playlist="DEMO_PLAYLIST"
					class="story-audio"
					@update:shuffle="logEvent('update:shuffle', $event)"
			/>
		</Variant>

		<Variant title="Events - track-change">
			<origam-audio
					:playlist="DEMO_PLAYLIST"
					class="story-audio"
					@track-change="logEvent('track-change', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Metadata">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Original title"
					artist="Original artist"
					:cover="PICSUM_COVER"
					class="story-audio"
			>
				<template #metadata>
					<strong>Custom metadata via slot</strong>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Cover">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Custom cover"
					artist="Origam"
					class="story-audio"
			>
				<template #cover>
					<div class="story-custom-cover">
						<span>🎵</span>
					</div>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Title">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Default title"
					artist="Stays default"
					:cover="PICSUM_COVER"
					class="story-audio"
			>
				<template #title>
					<em>Custom title via slot</em>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Waveform">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					:waveform="true"
					title="Custom waveform"
					artist="Origam"
					class="story-audio"
			>
				<template #waveform="{ peaks, currentTime, duration }">
					<div class="story-waveform">
						<div
								v-for="(peak, i) in peaks"
								:key="i"
								class="story-waveform__bar"
								:class="{ 'story-waveform__bar--played': duration > 0 && (i / peaks.length) <= (currentTime / duration) }"
								:style="{ height: Math.max(2, peak * 100) + '%' }"
						/>
					</div>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Controls">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Custom controls"
					artist="Origam"
					class="story-audio"
			>
				<template #controls="{ playing, methods }">
					<div class="story-custom-controls">
						<button
								type="button"
								:aria-label="playing ? 'Pause' : 'Play'"
								@click="playing ? methods.pause() : void methods.play()"
						>{{ playing ? 'Pause' : 'Play' }}</button>
					</div>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Loading">
			<origam-audio
					:src="SOUND_HELIX_TRACK"
					title="Loading slot"
					artist="Origam"
					class="story-audio"
			>
				<template #loading>
					<span>Loading audio…</span>
				</template>
			</origam-audio>
		</Variant>

		<Variant title="Slots - Error">
			<origam-audio
					src="https://example.com/this-track-does-not-exist.mp3"
					title="Error slot"
					artist="Origam"
					class="story-audio"
			>
				<template #error="{ error }">
					<strong>Error: {{ ('message' in error && error.message) || 'Playback error' }}</strong>
				</template>
			</origam-audio>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IAudioProps>>({
					src: SOUND_HELIX_TRACK,
					title: 'Daydream',
					artist: 'Origam DS Cast',
					album: 'Season 3',
					cover: PICSUM_COVER,
					variant: 'expanded',
					coverPosition: 'left',
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					elevation: undefined,
					controls: 'custom',
					preload: 'metadata',
					playbackRate: 1,
					autoplay: false,
					muted: false,
					loop: false,
					loopMode: 'none',
					shuffle: false,
					waveform: true,
					downloadable: false,
					allowRemotePlayback: false
				})"
		>
			<template #default="{ state }">
				<origam-audio
						v-bind="state"
						class="story-audio"
						@play="logEvent('play', undefined)"
						@pause="logEvent('pause', undefined)"
						@ended="logEvent('ended', undefined)"
						@update:playback-rate="logEvent('update:playbackRate', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.src"    title="Src (URL)"/>
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
					<HstSelect   v-model="state.controls"          title="Controls"             :options="AUDIO_CONTROLS_OPTIONS"/>
					<HstSelect   v-model="state.preload"           title="Preload"              :options="PRELOAD_OPTIONS"/>
					<HstSelect   v-model="state.loopMode"          title="Loop Mode"            :options="AUDIO_LOOP_MODE_OPTIONS"/>
					<HstNumber   v-model="state.playbackRate"      title="Playback Rate"        :min="0.25" :max="4" :step="0.25"/>
					<HstCheckbox v-model="state.autoplay"          title="Autoplay"/>
					<HstCheckbox v-model="state.muted"             title="Muted"/>
					<HstCheckbox v-model="state.loop"              title="Loop (legacy)"/>
					<HstCheckbox v-model="state.shuffle"           title="Shuffle"/>
					<HstCheckbox v-model="state.waveform"          title="Waveform"/>
					<HstCheckbox v-model="state.downloadable"      title="Downloadable"/>
					<HstCheckbox v-model="state.allowRemotePlayback" title="Allow Remote Playback"/>
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
	import type { IAudioProps, IAudioTrack } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		POSITION_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	const PICSUM_COVER = 'https://picsum.photos/seed/origam-audio/256/256'

	const DEMO_PLAYLIST: ReadonlyArray<IAudioTrack> = [
		{
			id: 'sh-1',
			src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
			title: 'Daydream',
			artist: 'SoundHelix',
			album: 'Examples',
			cover: 'https://picsum.photos/seed/audio-1/96',
			duration: 372
		},
		{
			id: 'sh-2',
			src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
			title: 'Liftoff',
			artist: 'SoundHelix',
			album: 'Examples',
			cover: 'https://picsum.photos/seed/audio-2/96',
			duration: 422
		},
		{
			id: 'sh-3',
			src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
			title: 'Submerged',
			artist: 'SoundHelix',
			album: 'Examples',
			cover: 'https://picsum.photos/seed/audio-3/96',
			duration: 366
		}
	]

	const AUDIO_VARIANT_OPTIONS = [
		{ label: 'expanded', value: AUDIO_VARIANT.EXPANDED },
		{ label: 'compact', value: AUDIO_VARIANT.COMPACT }
	]

	const COVER_POSITION_OPTIONS = [
		{ label: 'left', value: COVER_POSITION.LEFT },
		{ label: 'right', value: COVER_POSITION.RIGHT }
	]

	const AUDIO_CONTROLS_OPTIONS = [
		{ label: 'custom', value: 'custom' },
		{ label: 'native', value: 'native' }
	]

	const AUDIO_LOOP_MODE_OPTIONS = [
		{ label: 'none', value: AUDIO_LOOP_MODE.NONE },
		{ label: 'all', value: AUDIO_LOOP_MODE.ALL },
		{ label: 'one', value: AUDIO_LOOP_MODE.ONE }
	]

	const PRELOAD_OPTIONS = [
		{ label: 'none', value: 'none' },
		{ label: 'metadata', value: 'metadata' },
		{ label: 'auto', value: 'auto' }
	]
</script>

<style scoped>
	.story-audio {
		width: 100%;
		max-width: 640px;
	}

	.story-custom-cover {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--origam-audio__cover---size, 96px);
		height: var(--origam-audio__cover---size, 96px);
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 8px;
		font-size: 2rem;
	}

	.story-custom-controls {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 8px;
	}

	.story-waveform {
		display: flex;
		align-items: center;
		gap: 2px;
		width: 100%;
		height: 56px;
	}

	.story-waveform__bar {
		flex: 1 1 auto;
		min-width: 2px;
		background: color-mix(in srgb, currentColor 30%, transparent);
		border-radius: 1px;
	}

	.story-waveform__bar--played {
		background: var(--origam-color__accent---base, currentColor);
	}
</style>

<docs
		lang="md"
		src="@docs/components/Audio/OrigamAudio.md"
/>
