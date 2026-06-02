<template>
	<Story
			group="components"
			title="Watermark/OrigamWatermark"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IWatermarkProps>>({
					text: 'CONFIDENTIAL',
					opacity: 0.1,
					angle: -30,
					gap: 120,
					fontSize: 16,
					color: '#111111',
					fontFamily: 'inherit',
					fontWeight: 400
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-watermark
							:text="state.text"
							:image="state.image"
							:color="state.color"
							:opacity="state.opacity"
							:font-size="state.fontSize"
							:font-family="state.fontFamily"
							:font-weight="state.fontWeight"
							:angle="state.angle"
							:gap="state.gap"
							class="story-watermark"
					>
						<div class="story-doc">
							<h3>Q1 2026 — Internal financial report</h3>
							<p>
								Revenue: <strong>€ 4.32 M</strong> (+18% YoY).
								Headcount: 42. Runway: 19 months.
							</p>
							<p>
								This block represents a confidential document
								preview. The diagonal overlay is repeated across
								the entire surface.
							</p>
						</div>
					</origam-watermark>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text"  title="Text"/>
					<HstText v-model="state.image" title="Image URL"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstText v-model="state.color" title="Color"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstNumber v-model="state.fontSize"   title="Font Size (px)"  :min="8"  :max="128" :step="1"/>
					<HstText   v-model="state.fontFamily" title="Font Family"/>
					<HstNumber v-model="state.fontWeight" title="Font Weight"     :min="100" :max="900" :step="100"/>
				</StoryGroup>
				<StoryGroup title="Opacity">
					<HstNumber v-model="state.opacity" title="Opacity (0..1)" :min="0" :max="1" :step="0.01"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstNumber v-model="state.angle" title="Angle (deg)" :min="-180" :max="180" :step="1"/>
					<HstNumber v-model="state.gap"   title="Gap (px)"    :min="20"   :max="400" :step="10"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IWatermarkProps>>({
					antiTamper: false,
					pointerEvents: 'none',
					zIndex: 1,
					tag: 'div',
					text: 'CONFIDENTIAL',
					opacity: 0.1
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-watermark
							:text="state.text"
							:anti-tamper="state.antiTamper"
							:pointer-events="state.pointerEvents"
							:z-index="state.zIndex"
							:tag="state.tag"
							:opacity="state.opacity"
							class="story-watermark"
					>
						<div class="story-doc">
							<p>Content beneath the watermark.</p>
							<button type="button">I am still clickable</button>
						</div>
					</origam-watermark>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Anti-Tamper">
					<HstCheckbox v-model="state.antiTamper" title="Anti-Tamper"/>
				</StoryGroup>
				<StoryGroup title="Pointer Events">
					<HstSelect v-model="state.pointerEvents" title="Pointer Events" :options="POINTER_EVENTS_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layer">
					<HstNumber v-model="state.zIndex" title="Z-Index" :min="0" :max="100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-watermark
						text="CONFIDENTIAL — j.doe@example.com — 2026-05-15"
						:opacity="0.08"
						:angle="-30"
						:gap="140"
						color="#dc2626"
						class="story-watermark story-watermark--pdf"
				>
					<article class="story-pdf">
						<header class="story-pdf__header">
							<h2>Project Falcon — Q1 review</h2>
							<span>Page 1 / 3</span>
						</header>
						<p class="story-pdf__body">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut
							aliquip ex ea commodo consequat.
						</p>
						<p class="story-pdf__body">
							Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla
							pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p>
					</article>
				</origam-watermark>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IWatermarkProps>({
					text: 'CONFIDENTIAL',
					opacity: 0.1,
					angle: -30,
					gap: 120,
					fontSize: 16,
					color: '#111111',
					antiTamper: false,
					pointerEvents: 'none',
					zIndex: 1,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-watermark
							v-bind="state"
							class="story-watermark"
					>
						<div class="story-doc">
							<h3>Q1 2026 — Internal financial report</h3>
							<p>
								Revenue: <strong>€ 4.32 M</strong> (+18% YoY).
								Headcount: 42. Runway: 19 months.
							</p>
							<p>
								This block represents a confidential document
								preview. The diagonal overlay is repeated across
								the entire surface and stays out of the way of
								interactive content.
							</p>
							<button type="button">I am still clickable</button>
						</div>
					</origam-watermark>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text"  title="Text"/>
					<HstText v-model="state.image" title="Image URL"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstText   v-model="state.color"      title="Color"/>
					<HstNumber v-model="state.opacity"    title="Opacity (0..1)"  :min="0"   :max="1"   :step="0.01"/>
					<HstNumber v-model="state.angle"      title="Angle (deg)"     :min="-180" :max="180" :step="1"/>
					<HstNumber v-model="state.gap"        title="Gap (px)"        :min="20"  :max="400" :step="10"/>
					<HstNumber v-model="state.fontSize"   title="Font Size (px)"  :min="8"   :max="128" :step="1"/>
					<HstText   v-model="state.fontFamily" title="Font Family"/>
					<HstNumber v-model="state.fontWeight" title="Font Weight"     :min="100" :max="900" :step="100"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.antiTamper"   title="Anti-Tamper"/>
					<HstSelect   v-model="state.pointerEvents" title="Pointer Events" :options="POINTER_EVENTS_OPTIONS"/>
					<HstNumber   v-model="state.zIndex"        title="Z-Index"        :min="0" :max="100" :step="1"/>
					<HstSelect   v-model="state.tag"           title="Tag"            :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamWatermark } from '@origam/components'
	import type { IWatermarkProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { TAG_OPTIONS } from '@stories/const'

	const POINTER_EVENTS_OPTIONS = [
		{ label: 'none (pass-through)', value: 'none' },
		{ label: 'auto (blocking)', value: 'auto' }
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 960px;
	}

	.story-watermark {
		border: 1px solid var(--origam-color__border---subtle, #ddd);
		border-radius: 8px;
		overflow: hidden;
	}

	.story-watermark--pdf {
		max-width: 540px;
	}

	.story-doc {
		padding: 24px;
		min-height: 160px;
		background: #ffffff;
		font: 0.875rem/1.5 system-ui, sans-serif;
		color: #111;
	}

	.story-doc h3 {
		margin: 0 0 12px;
	}

	.story-pdf {
		padding: 24px;
		background: #ffffff;
		color: #111;
		font: 0.9rem/1.5 system-ui, sans-serif;
		min-height: 320px;
	}

	.story-pdf__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		margin-bottom: 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.story-pdf__header h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.story-pdf__body {
		margin: 0 0 12px;
	}
</style>

<docs lang="md" src="@docs/components/Watermark/OrigamWatermark.md"/>
