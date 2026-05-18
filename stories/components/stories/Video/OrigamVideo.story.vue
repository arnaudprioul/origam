<template>
	<Story
			group="components"
			title="Video/OrigamVideo"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					src: BIG_BUCK_BUNNY,
					poster: BUNNY_POSTER,
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
					playbackRate: 1,
					inset: true,
					allowRemotePlayback: true,
					doubleTapToSkip: true,
					downloadable: false,
					downloadFilename: ''
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="video-default"
				>
					<origam-video
							:src="state.src"
							:poster="state.poster"
							:autoplay="Boolean(state.autoplay)"
							:muted="Boolean(state.muted)"
							:loop="Boolean(state.loop)"
							:controls="state.controls"
							:plays-inline="Boolean(state.playsInline)"
							:preload="state.preload"
							:aspect-ratio="state.aspectRatio"
							:crossorigin="state.crossorigin || undefined"
							:disable-picture-in-picture="Boolean(state.disablePictureInPicture)"
							:skip-seconds="Number(state.skipSeconds)"
							:playback-rate="Number(state.playbackRate)"
							:inset="Boolean(state.inset)"
							:allow-remote-playback="Boolean(state.allowRemotePlayback)"
							:double-tap-to-skip="Boolean(state.doubleTapToSkip)"
							:downloadable="Boolean(state.downloadable)"
							:download-filename="state.downloadFilename || undefined"
							class="story-video"
							data-cy="video-default-player"
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
				<HstSelect
						v-model="state.preload"
						title="preload"
						:options="preloadOptions"
				/>
				<HstSelect
						v-model="state.crossorigin"
						title="crossorigin"
						:options="crossoriginOptions"
				/>
				<HstNumber
						v-model="state.skipSeconds"
						title="skipSeconds"
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
						v-model="state.playsInline"
						title="playsInline"
				/>
				<HstCheckbox
						v-model="state.inset"
						title="inset"
				/>
				<HstCheckbox
						v-model="state.allowRemotePlayback"
						title="allowRemotePlayback"
				/>
				<HstCheckbox
						v-model="state.doubleTapToSkip"
						title="doubleTapToSkip"
				/>
				<HstCheckbox
						v-model="state.disablePictureInPicture"
						title="disablePictureInPicture"
				/>
				<HstCheckbox
						v-model="state.downloadable"
						title="downloadable"
				/>
			</template>
		</Variant>

		<Variant title="Prop — src (single URL vs multi-source array)">
			<div
					class="story-shell"
					data-cy="video-src-modes"
			>
				<p class="hint">
					`src` accepts a single URL or an array of &lt;source&gt; descriptors.
					The browser walks the array top-down and picks the first source
					whose `type` it can decode.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>src = string</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								class="story-video"
								data-cy="video-src-string"
						/>
					</div>
					<div class="story-col">
						<strong>src = Array (mp4 + webm)</strong>
						<origam-video
								:src="MULTI_SOURCES"
								:poster="BUNNY_POSTER"
								class="story-video"
								data-cy="video-src-array"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — controls (custom / native / none)">
			<div
					class="story-shell"
					data-cy="video-controls-modes"
			>
				<p class="hint">
					Three controls modes: a custom in-house toolbar, the browser's native
					bar, or no UI at all (consumer drives playback through the `#controls`
					slot or programmatically). Hover the mute icon on the `custom` toolbar
					to reveal the vertical `OrigamMediaScrubber` volume slider (drag up
					to un-mute, down to 0 to mute).
				</p>
				<p class="hint">
					The progress scrubber and the volume slider now share the same
					`&lt;OrigamMediaScrubber&gt;` implementation — same drag logic, keyboard
					contract and ARIA.
				</p>
				<p class="hint">
					The custom controls bar is now provided by `&lt;OrigamMediaController&gt;`,
					a reusable shell. The captions / PiP / fullscreen buttons are injected
					by `&lt;OrigamVideo&gt;` via the `#extraControlsRight` slot.
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

		<Variant title="Prop — aspectRatio (16/9 / 4/3 / 1/1 / 21/9 / 9/16)">
			<div
					class="story-shell"
					data-cy="video-aspect-ratios"
			>
				<p class="hint">
					Aspect ratio is applied via the CSS `aspect-ratio` property on the
					wrapper, so the page reserves space before metadata loads.
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

		<Variant title="Prop — preload (none / metadata / auto)">
			<div
					class="story-shell"
					data-cy="video-preload"
			>
				<p class="hint">
					Buffering hint forwarded to the native &lt;video preload&gt;. `'metadata'`
					(default) loads just enough to compute the duration; `'none'` defers
					everything until the user presses play; `'auto'` lets the browser
					pre-buffer.
				</p>
				<div class="story-grid">
					<div
							v-for="preloadValue in preloadValues"
							:key="preloadValue"
							class="story-col"
					>
						<strong>preload = {{ preloadValue }}</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:preload="preloadValue"
								class="story-video"
								:data-cy="`video-preload-${preloadValue}`"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — autoplay / muted / loop">
			<div
					class="story-shell"
					data-cy="video-playback-flags"
			>
				<p class="hint">
					`autoplay` is suppressed by `prefers-reduced-motion: reduce`. The
					browser also forces `muted` to be true when `autoplay` is enabled.
					`loop` restarts at 0 when the player reaches `ended`.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>autoplay (auto-muted)</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:autoplay="true"
								class="story-video"
								data-cy="video-flag-autoplay"
						/>
					</div>
					<div class="story-col">
						<strong>muted</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:muted="true"
								class="story-video"
								data-cy="video-flag-muted"
						/>
					</div>
					<div class="story-col">
						<strong>loop</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:loop="true"
								class="story-video"
								data-cy="video-flag-loop"
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
					Captions are declared as &lt;track&gt; children. The toolbar exposes a
					CC button that flips the active track between the declared `default`
					and `disabled`.
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

		<Variant title="Prop — skipSeconds (skip step, double-tap step)">
			<div
					class="story-shell"
					data-cy="video-skip-seconds"
			>
				<p class="hint">
					Skip step shared by the keyboard, the cog menu, and the double-tap
					gesture. Set to `0` to disable the skip feature entirely.
				</p>
				<div class="story-grid">
					<div
							v-for="value in skipValues"
							:key="value"
							class="story-col"
					>
						<strong>skipSeconds = {{ value }}</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:skip-seconds="value"
								class="story-video"
								:data-cy="`video-skip-${value}`"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — playbackRates / playbackRate (speed menu)">
			<div
					class="story-shell"
					data-cy="video-playback-rates"
			>
				<p class="hint">
					`playbackRates` lists the values exposed via the cog menu;
					`playbackRate` is the initial value. The runtime value is emitted via
					`update:playbackRate` whenever the viewer picks a different speed.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>default rates · initial = 1</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								class="story-video"
								data-cy="video-playback-rate-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom rates · initial = 1.5</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:playback-rates="[0.5, 1, 1.5, 2]"
								:playback-rate="1.5"
								class="story-video"
								data-cy="video-playback-rate-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — quality switcher (multi-source with quality)">
			<div
					class="story-shell"
					data-cy="video-quality-switcher"
			>
				<p class="hint">
					When `src` is an array with `quality` and `label` fields, the cog
					menu exposes a Quality drill-down row. Picking a new quality calls
					`video.load()` and resumes from the previous position. The active
					quality is emitted via `quality-change`.
				</p>
				<origam-video
						:src="QUALITY_SOURCES"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-quality-switcher-player"
						@quality-change="logEmit('quality-change', $event)"
				/>
				<pre
						class="story-log"
						data-cy="video-quality-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — inset (auto-hide toolbar vs always visible)">
			<div
					class="story-shell"
					data-cy="video-inset"
			>
				<p class="hint">
					`inset = true` (default) overlays the toolbar at the bottom edge and
					auto-hides it while playing once the cursor leaves the player.
					`inset = false` always paints the toolbar.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>inset = true</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:inset="true"
								class="story-video"
								data-cy="video-inset-true"
						/>
					</div>
					<div class="story-col">
						<strong>inset = false</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:inset="false"
								class="story-video"
								data-cy="video-inset-false"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — doubleTapToSkip / disablePictureInPicture / allowRemotePlayback">
			<div
					class="story-shell"
					data-cy="video-feature-flags"
			>
				<p class="hint">
					Behavioural switches. `doubleTapToSkip` enables the YouTube-style
					double-tap-to-skip gesture (single click toggles play/pause via a
					280ms deferred handler). `disablePictureInPicture` hides the PIP
					button. `allowRemotePlayback` shows a cast button when at least one
					remote device is detected.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>doubleTapToSkip = false</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:double-tap-to-skip="false"
								class="story-video"
								data-cy="video-flag-doubletap-off"
						/>
					</div>
					<div class="story-col">
						<strong>disablePictureInPicture</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:disable-picture-in-picture="true"
								class="story-video"
								data-cy="video-flag-pip-off"
						/>
					</div>
					<div class="story-col">
						<strong>allowRemotePlayback = false</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:allow-remote-playback="false"
								class="story-video"
								data-cy="video-flag-cast-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — downloadable / downloadFilename">
			<div
					class="story-shell"
					data-cy="video-download"
			>
				<p class="hint">
					Setting `downloadable` adds a Download row to the cog menu. Clicking
					it triggers the browser's standard download dialog. Override the
					destination file name via `downloadFilename`.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>downloadable = true</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:downloadable="true"
								class="story-video"
								data-cy="video-downloadable"
								@download="logEmit('download', $event)"
						/>
					</div>
					<div class="story-col">
						<strong>custom downloadFilename</strong>
						<origam-video
								:src="BIG_BUCK_BUNNY"
								:poster="BUNNY_POSTER"
								:downloadable="true"
								download-filename="origam-trailer.mp4"
								class="story-video"
								data-cy="video-downloadable-filename"
								@download="logEmit('download', $event)"
						/>
					</div>
				</div>
				<pre
						class="story-log"
						data-cy="video-download-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Slot — controls (timestamp-only minimal bar)">
			<div
					class="story-shell"
					data-cy="video-slot-controls"
			>
				<p class="hint">
					The default toolbar can be entirely replaced via the `#controls`
					scoped slot. The slot receives the runtime state + an imperative
					`methods` object.
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
						<div
								class="story-custom-poster"
								data-cy="video-slot-poster-overlay"
						>
							<span class="story-custom-poster__label">Click to watch</span>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Slot — loading (custom spinner)">
			<div
					class="story-shell"
					data-cy="video-slot-loading"
			>
				<p class="hint">
					The `#loading` slot replaces the default spinner shown between
					`loadstart` and `loadedmetadata`. Hard to capture statically — open
					DevTools, throttle the network to Slow 3G and reload to see it.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-slot-loading-player"
				>
					<template #loading>
						<div
								class="story-custom-loading"
								data-cy="video-slot-loading-overlay"
						>
							<span class="story-custom-loading__label">Decoding…</span>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Slot — error (custom error overlay)">
			<div
					class="story-shell"
					data-cy="video-slot-error"
			>
				<p class="hint">
					Forcing a 404 URL surfaces the `#error` slot — the slot receives the
					`MediaError | Error` payload via its bindings.
				</p>
				<origam-video
						src="https://invalid.example.com/missing-video.mp4"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-slot-error-player"
				>
					<template #error="{ error }">
						<div
								class="story-custom-error"
								data-cy="video-slot-error-overlay"
						>
							<strong>Cannot play this video</strong>
							<small>{{ (error as Error).message || 'Unknown media error' }}</small>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Slot — config (custom cog menu)">
			<div
					class="story-shell"
					data-cy="video-slot-config"
			>
				<p class="hint">
					The `#config` slot fully replaces the default drill-down menu of the
					cog button. The slot receives the runtime state, the imperative
					methods, and a `setPlaybackRate(rate)` / `closeMenu()` helper pair.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-slot-config-player"
				>
					<template #config="{ setPlaybackRate, closeMenu, playbackRate }">
						<div class="story-custom-config">
							<button
									v-for="rate in [0.75, 1, 1.5]"
									:key="rate"
									type="button"
									class="story-custom-config__item"
									:class="{ 'story-custom-config__item--active': Math.abs(playbackRate - rate) < 0.01 }"
									:data-cy="`video-slot-config-rate-${rate}`"
									@click="setPlaybackRate(rate); closeMenu()"
							>{{ rate === 1 ? 'Normal' : `${rate}×` }}</button>
						</div>
					</template>
				</origam-video>
			</div>
		</Variant>

		<Variant title="Emit — play / pause / ended (counters)">
			<div
					class="story-shell"
					data-cy="video-emit-lifecycle"
			>
				<p class="hint">
					Counters increment on each emit. Click the player surface or use the
					toolbar buttons to trigger them.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-lifecycle-player"
						@play="counters.play++"
						@pause="counters.pause++"
						@ended="counters.ended++"
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
				</dl>
			</div>
		</Variant>

		<Variant title="Emit — timeupdate / volumechange / loadedmetadata">
			<div
					class="story-shell"
					data-cy="video-emit-runtime"
			>
				<p class="hint">
					`timeupdate` fires roughly every 250ms during playback;
					`volumechange` covers both slider drag and mute toggle;
					`loadedmetadata` carries the resolved `duration` payload.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-runtime-player"
						@timeupdate="counters.timeupdate++"
						@volumechange="counters.volumechange++"
						@loadedmetadata="onLoadedMetadata"
				/>
				<dl class="story-counters">
					<div>
						<dt>timeupdate</dt>
						<dd data-cy="video-emit-count-timeupdate">{{ counters.timeupdate }}</dd>
					</div>
					<div>
						<dt>volumechange</dt>
						<dd data-cy="video-emit-count-volumechange">{{ counters.volumechange }}</dd>
					</div>
					<div>
						<dt>loadedmetadata.duration</dt>
						<dd data-cy="video-emit-loadedmetadata">{{ lastDuration }}</dd>
					</div>
				</dl>
			</div>
		</Variant>

		<Variant title="Emit — skip (positive forward / negative backward)">
			<div
					class="story-shell"
					data-cy="video-emit-skip"
			>
				<p class="hint">
					Double-tap the left or right half of the player to trigger a skip.
					The emit payload is the signed delta in seconds — positive forward,
					negative backward.
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-skip-player"
						@skip="logEmit('skip', $event)"
				/>
				<pre
						class="story-log"
						data-cy="video-emit-skip-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Emit — update:playbackRate / quality-change / download">
			<div
					class="story-shell"
					data-cy="video-emit-config"
			>
				<p class="hint">
					Pick a different speed, quality or click Download in the cog menu
					to drive these emits.
				</p>
				<origam-video
						:src="QUALITY_SOURCES"
						:poster="BUNNY_POSTER"
						:downloadable="true"
						class="story-video"
						data-cy="video-emit-config-player"
						@update:playback-rate="logEmit('update:playbackRate', $event)"
						@quality-change="logEmit('quality-change', $event)"
						@download="logEmit('download', $event)"
				/>
				<pre
						class="story-log"
						data-cy="video-emit-config-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Emit — enterfullscreen / exitfullscreen / enterpip / exitpip">
			<div
					class="story-shell"
					data-cy="video-emit-window"
			>
				<p class="hint">
					Click the fullscreen / PIP buttons in the toolbar to trigger these
					emits. PIP requires `document.pictureInPictureEnabled` (Chromium,
					Firefox, desktop Safari).
				</p>
				<origam-video
						:src="BIG_BUCK_BUNNY"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-window-player"
						@enterfullscreen="logEmit('enterfullscreen', null)"
						@exitfullscreen="logEmit('exitfullscreen', null)"
						@enterpip="logEmit('enterpip', null)"
						@exitpip="logEmit('exitpip', null)"
				/>
				<pre
						class="story-log"
						data-cy="video-emit-window-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Emit — error (forced 404 URL)">
			<div
					class="story-shell"
					data-cy="video-emit-error"
			>
				<p class="hint">
					An invalid `src` triggers the native `error` event. The wrapper
					forwards the `MediaError | Error` payload through the `error` emit.
				</p>
				<origam-video
						src="https://invalid.example.com/missing-video.mp4"
						:poster="BUNNY_POSTER"
						class="story-video"
						data-cy="video-emit-error-player"
						@error="logEmit('error', ($event as Error).message || 'media error')"
				/>
				<pre
						class="story-log"
						data-cy="video-emit-error-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive, ref } from 'vue'

	import { OrigamVideo } from '@origam/components'

	import type {
		IVideoSource,
		IVideoTrack
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const BIG_BUCK_BUNNY = 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
	const BUNNY_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg'

	const MULTI_SOURCES: Array<IVideoSource> = [
		{ src: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', type: 'video/mp4' },
		{ src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.webm', type: 'video/webm' }
	]

	const QUALITY_SOURCES: Array<IVideoSource> = [
		{ src: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', type: 'video/mp4', quality: '180p', label: '180p (SD)' },
		{ src: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_640x360.mp4', type: 'video/mp4', quality: '360p', label: '360p' }
	]

	const VTT_EN = 'data:text/vtt;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA0LjAwMApUaGUgYmlnIGJ1Y2sgYnVubnkgcHJlcGFyZXMgZm9yIGl0cyBlbmVtaWVzLgoKMDA6MDA6MDQuMDAwIC0tPiAwMDowMDowOC4wMDAKRW5nbGlzaCBjYXB0aW9uIHRyYWNrLgo='
	const VTT_FR = 'data:text/vtt;base64,V0VCVlRUCgowMDowMDowMC4wMDAgLS0+IDAwOjAwOjA0LjAwMApMZSBncm9zIGxhcGluIHByw6lwYXJlIGRlcyBwacOoZ2VzLgoKMDA6MDA6MDQuMDAwIC0tPiAwMDowMDowOC4wMDAKUGlzdGUgZGUgc291cy10aXRyZXMgZnJhbsOnYWlzZS4K'

	const trackFixtures: Array<IVideoTrack> = [
		{ kind: 'captions', src: VTT_EN, srclang: 'en', label: 'English', default: true },
		{ kind: 'captions', src: VTT_FR, srclang: 'fr', label: 'Français' }
	]

	const aspectRatios = ['16/9', '4/3', '1/1', '21/9', '9/16']
	const preloadValues: Array<'none' | 'metadata' | 'auto'> = ['none', 'metadata', 'auto']
	const skipValues = [5, 15, 30, 60]

	const controlsOptions = [
		{ value: 'custom', label: 'custom' },
		{ value: 'native', label: 'native' },
		{ value: 'none', label: 'none' }
	]

	const aspectRatioOptions = aspectRatios.map((ratio) => ({ value: ratio, label: ratio }))

	const preloadOptions = preloadValues.map((value) => ({ value, label: value }))

	const crossoriginOptions = [
		{ value: '', label: '(none)' },
		{ value: 'anonymous', label: 'anonymous' },
		{ value: 'use-credentials', label: 'use-credentials' }
	]

	const counters = reactive({
		play: 0,
		pause: 0,
		ended: 0,
		timeupdate: 0,
		volumechange: 0
	})

	const lastDuration = ref<string>('--')

	function onLoadedMetadata (payload: { duration: number }): void {
		lastDuration.value = Number.isFinite(payload.duration) ? payload.duration.toFixed(2) : '--'
	}

	const logLines = ref<Array<string>>([])

	function logEmit (name: string, payload: unknown): void {
		const safe = typeof payload === 'string' || typeof payload === 'number'
			? String(payload)
			: JSON.stringify(payload)
		logLines.value = [`${name} → ${safe}`, ...logLines.value].slice(0, 8)
	}

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

	.story-custom-loading {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		background: rgba(0, 0, 0, 0.6);
		color: #ffffff;
		border-radius: 8px;
		font: 0.875rem/1.2 system-ui, sans-serif;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.story-custom-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 16px;
		background: rgba(127, 29, 29, 0.85);
		color: #ffffff;
		border-radius: 8px;
		font: 0.875rem/1.3 system-ui, sans-serif;
	}

	.story-custom-error small {
		opacity: 0.85;
	}

	.story-custom-config {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 4px 0;
		min-width: 140px;
	}

	.story-custom-config__item {
		all: unset;
		padding: 6px 12px;
		font: 0.8125rem/1.2 system-ui, sans-serif;
		color: #ffffff;
		cursor: pointer;
	}

	.story-custom-config__item:hover,
	.story-custom-config__item:focus-visible {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.story-custom-config__item--active {
		font-weight: 600;
		color: var(--origam-color__action--primary---bg, #60a5fa);
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

	.story-log {
		margin: 0;
		padding: 8px 12px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 6px;
		font-size: 0.75rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		white-space: pre-wrap;
		min-height: 80px;
	}
</style>

<docs lang="md" src="@docs/components/Video/OrigamVideo.md"/>
