<template>
	<Story
			group="components"
			title="Video/OrigamVideo"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IVideoProps>({
					src: BIG_BUCK_BUNNY,
					poster: BUNNY_POSTER,
					autoplay: false,
					muted: false,
					loop: false,
					controls: 'custom',
					aspectRatio: '16/9'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="video-playground"
				>
					<origam-video
							v-bind="state"
							class="story-video"
							data-cy="video-playground-player"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.src"
						title="src"
				/>
				<HstText
						v-model="state.poster"
						title="poster"
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
				<HstSelect
						v-model="state.controls"
						title="controls"
						:options="controlsOptions"
				/>
				<HstSelect
						v-model="state.aspectRatio"
						title="aspectRatio"
						:options="aspectRatioOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — controls (custom vs native vs none)">
			<div
					class="story-shell"
					data-cy="video-controls-modes"
			>
				<p class="hint">
					The component supports three controls modes: a custom in-house
					toolbar, the browser's native bar, or no UI at all (consumer
					drives playback through the `#controls` slot or
					programmatically).
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>controls = 'custom'</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								controls="custom"
								class="story-video"
								data-cy="video-controls-custom"
						/>
					</div>
					<div class="story-col">
						<strong>controls = 'native'</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								controls="native"
								class="story-video"
								data-cy="video-controls-native"
						/>
					</div>
					<div class="story-col">
						<strong>controls = 'none'</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								controls="none"
								class="story-video"
								data-cy="video-controls-none"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — tracks (captions on/off, language switch)">
			<div
					class="story-shell"
					data-cy="video-tracks"
			>
				<p class="hint">
					Captions are declared as `<track>` children. The toolbar
					exposes a toggle that flips the active track between the
					declared `default` and `disabled`.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						:tracks="trackFixtures"
						class="story-video"
						data-cy="video-tracks-player"
				/>
			</div>
		</Variant>

		<Variant title="Prop — aspectRatio (16/9 / 4/3 / 1/1 / 21/9 / 9/16)">
			<div
					class="story-shell"
					data-cy="video-aspect-ratios"
			>
				<p class="hint">
					Aspect ratio is applied via the CSS `aspect-ratio` property
					on the wrapper, so the page reserves space before metadata
					loads.
				</p>
				<div class="story-grid">
					<div
							v-for="ratio in aspectRatios"
							:key="ratio"
							class="story-col"
					>
						<strong>aspectRatio = {{ ratio }}</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:aspect-ratio="ratio"
								class="story-video"
								:data-cy="`video-aspect-${ratio.replace('/', '-')}`"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — controls (timestamp-only minimal bar)">
			<div
					class="story-shell"
					data-cy="video-slot-controls"
			>
				<p class="hint">
					The default toolbar can be entirely replaced via the
					`#controls` scoped slot. The slot receives the runtime
					state + an imperative `methods` object.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-slot-controls-player"
				>
					<template #controls="{ playing, currentTime, duration, methods }">
						<div class="story-custom-controls">
							<button
									type="button"
									class="story-custom-controls__btn"
									:aria-label="playing ? 'Pause' : 'Play'"
									data-cy="video-slot-controls-play"
									@click="playing ? methods.pause() : methods.play()"
							>{{ playing ? 'Pause' : 'Play' }}</button>
							<span class="story-custom-controls__time">
								{{ formatTimestamp(currentTime) }} / {{ formatTimestamp(duration) }}
							</span>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Slot — poster (custom overlay)">
			<div
					class="story-shell"
					data-cy="video-slot-poster"
			>
				<p class="hint">
					The `#poster` slot replaces the default overlay shown before
					playback starts.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-slot-poster-player"
				>
					<template #poster>
						<div class="story-custom-poster" data-cy="video-slot-poster-overlay">
							<span class="story-custom-poster__label">Click to watch</span>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Emit — play / pause / ended / timeupdate (counters)">
			<div
					class="story-shell"
					data-cy="video-emit-counters"
			>
				<p class="hint">
					Counters increment on each emit. `timeupdate` fires roughly
					every 250ms during playback.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-player"
						@play="counters.play++"
						@pause="counters.pause++"
						@ended="counters.ended++"
						@timeupdate="counters.timeupdate++"
				/>
				<dl class="story-counters">
					<div>
						<dt>play</dt>
						<dd data-cy="video-emit-count-play">{{ counters.play }}</dd>
					</div>
					<div>
						<dt>pause</dt>
						<dd data-cy="video-emit-count-pause">{{ counters.pause }}</dd>
					</div>
					<div>
						<dt>ended</dt>
						<dd data-cy="video-emit-count-ended">{{ counters.ended }}</dd>
					</div>
					<div>
						<dt>timeupdate</dt>
						<dd data-cy="video-emit-count-timeupdate">{{ counters.timeupdate }}</dd>
					</div>
				</dl>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive } from 'vue'

	import { OrigamVideo } from '@origam/components'

	import type {
		IVideoProps,
		IVideoTrack
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const BIG_BUCK_BUNNY = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	const BUNNY_POSTER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'

	const VTT_EN = 'data:text/vtt;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA0LjAwMApUaGUgYmlnIGJ1Y2sgYnVubnkgcHJlcGFyZXMgZm9yIGl0cyBlbmVtaWVzLgoKMDA6MDA6MDQuMDAwIC0tPiAwMDowMDowOC4wMDAKRW5nbGlzaCBjYXB0aW9uIHRyYWNrLgo='
	const VTT_FR = 'data:text/vtt;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA0LjAwMApMZSBncm9zIGxhcGluIHByw6lwYXJlIGRlcyBwacOoZ2VzLgoKMDA6MDA6MDQuMDAwIC0tPiAwMDowMDowOC4wMDAKUGlzdGUgZGUgc291cy10aXRyZXMgZnJhbsOnYWlzZS4K'

	const trackFixtures: Array<IVideoTrack> = [
		{ kind: 'captions', src: VTT_EN, srclang: 'en', label: 'English', default: true },
		{ kind: 'captions', src: VTT_FR, srclang: 'fr', label: 'Français' }
	]

	const aspectRatios = ['16/9', '4/3', '1/1', '21/9', '9/16']

	const controlsOptions = [
		{ value: 'custom', label: 'custom' },
		{ value: 'native', label: 'native' },
		{ value: 'none', label: 'none' }
	]

	const aspectRatioOptions = aspectRatios.map((ratio) => ({ value: ratio, label: ratio }))

	const counters = reactive({
		play: 0,
		pause: 0,
		ended: 0,
		timeupdate: 0
	})

	function formatTimestamp (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const m = Math.floor(total / 60)
		const s = total % 60
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 960px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-video {
		width: 100%;
		max-width: 720px;
		border-radius: 8px;
		overflow: hidden;
	}

	.story-custom-controls {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		background: rgba(0, 0, 0, 0.7);
		color: #ffffff;
		font: 0.875rem/1.2 system-ui, sans-serif;
	}

	.story-custom-controls__btn {
		background: rgba(255, 255, 255, 0.2);
		color: #ffffff;
		border: 0;
		padding: 4px 12px;
		border-radius: 4px;
		cursor: pointer;
		font: inherit;
	}

	.story-custom-controls__time {
		font-family: ui-monospace, monospace;
	}

	.story-custom-poster {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4), rgba(0, 0, 0, 0.9));
		color: #ffffff;
		cursor: pointer;
	}

	.story-custom-poster__label {
		font: 600 1rem/1.2 system-ui, sans-serif;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.story-counters {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin: 0;
		padding: 12px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 8px;
	}

	.story-counters > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.story-counters dt {
		font: 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-counters dd {
		margin: 0;
		font: 600 1rem/1.2 system-ui, sans-serif;
	}
</style>

<docs lang="md" src="@docs/components/Video/OrigamVideo.md"/>
