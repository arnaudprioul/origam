<template>
	<Story
			group="components"
			title="Audio/OrigamAudio"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					src: SOUND_HELIX_TRACK,
					title: 'Daydream',
					artist: 'Origam DS Cast',
					album: 'Season 3',
					cover: PICSUM_COVER,
					variant: 'expanded',
					coverPosition: 'left',
					position: 'relative',
					color: '',
					bgColor: '',
					autoplay: false,
					muted: false,
					loop: false,
					controls: 'custom',
					preload: 'metadata',
					playbackRate: 1,
					downloadable: false,
					downloadFilename: '',
					allowRemotePlayback: false,
					waveform: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="audio-default"
				>
					<p class="hint">
						Stemtracks studio strip playground. Toggle the variant
						(expanded vs compact), flip the cover side, drag both
						scrubbers (waveform mini + inline timer), and exercise
						every prop from the controls panel.
					</p>
					<origam-audio
							:src="state.src as string"
							:title="(state.title as string) || undefined"
							:artist="(state.artist as string) || undefined"
							:album="(state.album as string) || undefined"
							:cover="(state.cover as string) || undefined"
							:variant="state.variant as 'expanded' | 'compact'"
							:cover-position="state.coverPosition as 'left' | 'right'"
							:position="state.position as 'relative' | 'static' | 'absolute' | 'fixed' | 'sticky'"
							:color="(state.color as string) || undefined"
							:bg-color="(state.bgColor as string) || undefined"
							:autoplay="Boolean(state.autoplay)"
							:muted="Boolean(state.muted)"
							:loop="Boolean(state.loop)"
							:controls="state.controls as 'custom' | 'native'"
							:preload="state.preload as 'none' | 'metadata' | 'auto'"
							:playback-rate="Number(state.playbackRate)"
							:downloadable="Boolean(state.downloadable)"
							:download-filename="(state.downloadFilename as string) || undefined"
							:allow-remote-playback="Boolean(state.allowRemotePlayback)"
							:waveform="Boolean(state.waveform)"
							class="story-audio"
							data-cy="audio-default-player"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.variant"
						title="variant"
						:options="variantOptions"
				/>
				<HstSelect
						v-model="state.coverPosition"
						title="coverPosition"
						:options="coverPositionOptions"
				/>
				<HstSelect
						v-model="state.position"
						title="position"
						:options="positionOptions"
				/>
				<HstSelect
						v-model="state.color"
						title="color"
						:options="intentOptions"
				/>
				<HstSelect
						v-model="state.bgColor"
						title="bgColor"
						:options="intentOptions"
				/>
				<HstText
						v-model="state.src"
						title="src"
				/>
				<HstText
						v-model="state.title"
						title="title"
				/>
				<HstText
						v-model="state.artist"
						title="artist"
				/>
				<HstText
						v-model="state.album"
						title="album"
				/>
				<HstText
						v-model="state.cover"
						title="cover (URL)"
				/>
				<HstSelect
						v-model="state.controls"
						title="controls"
						:options="controlsOptions"
				/>
				<HstSelect
						v-model="state.preload"
						title="preload"
						:options="preloadOptions"
				/>
				<HstNumber
						v-model="state.playbackRate"
						title="playbackRate"
				/>
				<HstText
						v-model="state.downloadFilename"
						title="downloadFilename"
				/>
				<HstCheckbox
						v-model="state.autoplay"
						title="autoplay"
				/>
				<HstCheckbox
						v-model="state.muted"
						title="muted"
				/>
				<HstCheckbox
						v-model="state.loop"
						title="loop"
				/>
				<HstCheckbox
						v-model="state.downloadable"
						title="downloadable"
				/>
				<HstCheckbox
						v-model="state.allowRemotePlayback"
						title="allowRemotePlayback"
				/>
				<HstCheckbox
						v-model="state.waveform"
						title="waveform"
				/>
			</template>
		</Variant>

		<Variant title="Prop — variant (expanded)">
			<div
					class="story-shell"
					data-cy="audio-expanded"
			>
				<p class="hint">
					The default Stemtracks studio strip: 96 px cover, full
					title / artist / album header, waveform mini scrubber
					above the transport row.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						variant="expanded"
						title="Daydream"
						artist="Origam DS Cast"
						album="Season 3"
						:cover="PICSUM_COVER"
						:waveform="true"
						data-cy="audio-expanded-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — variant (compact)">
			<div
					class="story-shell"
					data-cy="audio-compact"
			>
				<p class="hint">
					Compact transport dock: 48 px cover, inline metadata,
					no waveform, transport row only. Use for sticky
					bottom docks and mini-players.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						variant="compact"
						title="Daydream"
						artist="Origam DS Cast"
						:cover="PICSUM_COVER"
						data-cy="audio-compact-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — coverPosition (right edge)">
			<div
					class="story-shell"
					data-cy="audio-cover-right"
			>
				<p class="hint">
					Flip the album cover to the right edge so the body
					column sits against the page's left rail.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						cover-position="right"
						title="Right cover"
						artist="Origam"
						album="Layout"
						:cover="PICSUM_COVER"
						:waveform="true"
						data-cy="audio-cover-right-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — position (sticky docked bottom)">
			<div
					class="story-shell story-shell--tall"
					data-cy="audio-docked"
			>
				<p class="hint">
					<code>position="sticky"</code> + <code>bottom="0"</code> pin
					the compact dock to the bottom of the scrollable shell.
				</p>
				<div class="story-scroll" data-cy="audio-docked-scroll">
					<p
							v-for="n in 12"
							:key="n"
							class="story-filler"
					>Filler line {{ n }} — scroll within this card.</p>
					<origam-audio
							:src="SOUND_HELIX_TRACK"
							variant="compact"
							position="sticky"
							bottom="0"
							title="Pinned"
							artist="Origam"
							:cover="PICSUM_COVER"
							data-cy="audio-docked-player"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — controls (custom / native)">
			<div
					class="story-shell"
					data-cy="audio-native"
			>
				<p class="hint">
					Falls back to the browser's built-in audio bar. No
					transport <code>&lt;nav&gt;</code> is mounted.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						controls="native"
						title="Native controls"
						artist="Browser default"
						class="story-audio"
						data-cy="audio-native-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — downloadable + downloadFilename">
			<div
					class="story-shell"
					data-cy="audio-downloadable"
			>
				<p class="hint">
					Setting <code>downloadable</code> adds a Download row to
					the cog menu. Clicking it triggers the native download
					dialog and emits a <code>download</code> event with the
					source URL.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						:downloadable="true"
						title="Downloadable Track"
						artist="SoundHelix"
						class="story-audio"
						data-cy="audio-downloadable-player"
						@download="logEmit('download', $event)"
				/>
				<pre
						class="story-log"
						data-cy="audio-downloadable-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — src (array form, codec fallback)">
			<div
					class="story-shell"
					data-cy="audio-multi"
			>
				<p class="hint">
					<code>src</code> as an array lets the browser pick the
					first decodable codec.
				</p>
				<origam-audio
						:src="MULTI_SOURCES"
						title="Sample Track"
						artist="SoundHelix"
						class="story-audio"
						data-cy="audio-multi-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — bgColor + color (branded surface)">
			<div
					class="story-shell"
					data-cy="audio-brand"
			>
				<p class="hint">
					Repaint the surface via the DS intent system —
					<code>bgColor="primary"</code> picks the action ramp,
					<code>color="surface"</code> picks a contrast-aware
					foreground.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						bg-color="primary"
						color="surface"
						title="Branded"
						artist="Origam DS"
						album="Tokens"
						:cover="PICSUM_COVER"
						class="story-audio"
						data-cy="audio-brand-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — src (single track, no metadata)">
			<div
					class="story-shell"
					data-cy="audio-single"
			>
				<p class="hint">
					Bare <code>&lt;origam-audio&gt;</code> with just an
					<code>src</code>. The metadata strip stays hidden when
					title / artist / cover are absent.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						class="story-audio"
						data-cy="audio-single-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — src (playlist, multi-track)">
			<div
					class="story-shell"
					data-cy="audio-playlist"
			>
				<p class="hint">
					Pass a <code>playlist</code> to enable track navigation —
					prev / next jump tracks (instead of skipping 10 s), the
					cover / metadata strip swap, and a clickable list renders
					below the transport. The loop button cycles
					<strong>none → all → one</strong> (icon swaps to a "loop
					once" glyph on the third state). The shuffle button (only
					shown when a playlist is active) flips the navigation
					order to a deterministic Fisher-Yates shuffle.
				</p>
				<origam-audio
						v-model:current-track-index="playlistIndex"
						v-model:loop-mode="playlistLoopMode"
						v-model:shuffle="playlistShuffle"
						:playlist="DEMO_PLAYLIST"
						class="story-audio"
						data-cy="audio-playlist-player"
						@track-change="(track, idx) => logEmit('track-change', `${ idx } · ${ track.title }`)"
						@update:loop-mode="(m) => logEmit('update:loopMode', m)"
						@update:shuffle="(s) => logEmit('update:shuffle', String(s))"
				/>
				<pre
						class="story-log"
						data-cy="audio-playlist-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamAudio } from '@origam/components'

	import type { IAudioSource, IAudioTrack } from '@origam/interfaces'
	import type { TAudioLoopMode } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	const PICSUM_COVER = 'https://picsum.photos/seed/origam-audio/256/256'

	const MULTI_SOURCES: Array<IAudioSource> = [
		{ src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', type: 'audio/mpeg' },
		{ src: 'https://www.soundhelix.com/examples/ogg/SoundHelix-Song-1.ogg', type: 'audio/ogg' }
	]

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
		},
		{
			id: 'sh-4',
			src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
			title: 'Pixel Drift',
			artist: 'SoundHelix',
			album: 'Examples',
			cover: 'https://picsum.photos/seed/audio-4/96',
			duration: 313
		}
	]

	const playlistIndex = ref(0)
	const playlistLoopMode = ref<TAudioLoopMode>('none')
	const playlistShuffle = ref(false)

	const controlsOptions = [
		{ value: 'custom', label: 'custom' },
		{ value: 'native', label: 'native' }
	]

	const preloadOptions = [
		{ value: 'none', label: 'none' },
		{ value: 'metadata', label: 'metadata' },
		{ value: 'auto', label: 'auto' }
	]

	const variantOptions = [
		{ value: 'expanded', label: 'expanded' },
		{ value: 'compact', label: 'compact' }
	]

	const coverPositionOptions = [
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const positionOptions = [
		{ value: 'static', label: 'static' },
		{ value: 'relative', label: 'relative' },
		{ value: 'absolute', label: 'absolute' },
		{ value: 'fixed', label: 'fixed' },
		{ value: 'sticky', label: 'sticky' }
	]

	const intentOptions = [
		{ value: '', label: '— (none)' },
		{ value: 'primary', label: 'primary' },
		{ value: 'secondary', label: 'secondary' },
		{ value: 'success', label: 'success' },
		{ value: 'warning', label: 'warning' },
		{ value: 'danger', label: 'danger' },
		{ value: 'info', label: 'info' },
		{ value: 'surface', label: 'surface' }
	]

	const logLines = ref<Array<string>>([])

	function logEmit (name: string, payload: unknown): void {
		const safe = typeof payload === 'string' || typeof payload === 'number'
			? String(payload)
			: JSON.stringify(payload)
		logLines.value = [`${ name } → ${ safe }`, ...logLines.value].slice(0, 8)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 720px;
	}

	.story-shell--tall {
		max-width: 720px;
	}

	.story-scroll {
		position: relative;
		max-height: 320px;
		overflow-y: auto;
		border: 1px solid var(--origam-color__border---default, #d4d4d8);
		border-radius: 12px;
		padding: 12px;
	}

	.story-filler {
		margin: 0 0 12px;
		padding: 12px;
		border-radius: 8px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		font: 0.85rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-audio {
		width: 100%;
		max-width: 640px;
	}

	.story-log {
		margin: 0;
		padding: 8px 12px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 6px;
		font-size: 0.75rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		white-space: pre-wrap;
		min-height: 60px;
	}
</style>
