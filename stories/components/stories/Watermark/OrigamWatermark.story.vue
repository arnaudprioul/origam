<template>
	<Story
			group="components"
			title="Watermark/OrigamWatermark"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IWatermarkProps>({
					text: 'CONFIDENTIAL',
					opacity: 0.1,
					angle: -30,
					gap: 120,
					fontSize: 16,
					color: '#111111',
					antiTamper: false
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="watermark-playground"
				>
					<origam-watermark
							v-bind="state"
							class="story-watermark"
							data-cy="watermark-playground-host"
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
							<button
									type="button"
									data-cy="watermark-playground-button"
							>I am still clickable</button>
						</div>
					</origam-watermark>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.text"
						title="text"
				/>
				<HstNumber
						v-model="state.opacity"
						title="opacity (0..1)"
				/>
				<HstNumber
						v-model="state.angle"
						title="angle (deg)"
				/>
				<HstNumber
						v-model="state.gap"
						title="gap (px)"
				/>
				<HstNumber
						v-model="state.fontSize"
						title="fontSize (px)"
				/>
				<HstText
						v-model="state.color"
						title="color"
				/>
				<HstCheckbox
						v-model="state.antiTamper"
						title="antiTamper"
				/>
			</template>
		</Variant>

		<Variant title="Prop — text vs image">
			<div
					class="story-shell"
					data-cy="watermark-text-vs-image"
			>
				<p class="hint">
					`text` paints the glyph as `&lt;text&gt;` inside the SVG;
					`image` paints it as `&lt;image href&gt;`. When both are
					passed, `image` wins.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>text = "CONFIDENTIAL"</strong>
						<origam-watermark
								text="CONFIDENTIAL"
								:opacity="0.12"
								class="story-watermark"
								data-cy="watermark-mode-text"
						>
							<div class="story-doc">Document preview</div>
						</origam-watermark>
					</div>
					<div class="story-col">
						<strong>image = origam logo</strong>
						<origam-watermark
								:image="LOGO_SRC"
								:opacity="0.08"
								:font-size="32"
								:gap="160"
								class="story-watermark"
								data-cy="watermark-mode-image"
						>
							<div class="story-doc">Document preview</div>
						</origam-watermark>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — opacity (0.05 / 0.1 / 0.2)">
			<div
					class="story-shell"
					data-cy="watermark-opacity"
			>
				<p class="hint">
					Opacity is applied at the SVG glyph level, so the wrapped
					content stays at full opacity beneath.
				</p>
				<div class="story-grid">
					<div
							v-for="value in opacityValues"
							:key="value"
							class="story-col"
					>
						<strong>opacity = {{ value }}</strong>
						<origam-watermark
								text="DRAFT"
								:opacity="value"
								class="story-watermark"
								:data-cy="`watermark-opacity-${value}`"
						>
							<div class="story-doc">Draft content</div>
						</origam-watermark>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — angle (-45 / -30 / 0 / 30 / 45 / 90)">
			<div
					class="story-shell"
					data-cy="watermark-angle"
			>
				<p class="hint">
					Rotation of the glyph in degrees. Negative = counter-clockwise.
				</p>
				<div class="story-grid">
					<div
							v-for="value in angleValues"
							:key="value"
							class="story-col"
					>
						<strong>angle = {{ value }}°</strong>
						<origam-watermark
								text="ORIGAM"
								:angle="value"
								:opacity="0.18"
								class="story-watermark"
								:data-cy="`watermark-angle-${value}`"
						>
							<div class="story-doc">Sample preview</div>
						</origam-watermark>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — gap (60 / 120 / 200)">
			<div
					class="story-shell"
					data-cy="watermark-gap"
			>
				<p class="hint">
					Distance between two adjacent tiles. Smaller = tighter
					pattern = denser watermark.
				</p>
				<div class="story-grid">
					<div
							v-for="value in gapValues"
							:key="value"
							class="story-col"
					>
						<strong>gap = {{ value }}px</strong>
						<origam-watermark
								text="ORIGAM"
								:gap="value"
								:opacity="0.18"
								class="story-watermark"
								:data-cy="`watermark-gap-${value}`"
						>
							<div class="story-doc">Sample preview</div>
						</origam-watermark>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — antiTamper (try removing in DevTools)">
			<div
					class="story-shell"
					data-cy="watermark-anti-tamper"
			>
				<p class="hint">
					When `antiTamper` is true, a MutationObserver re-injects
					the layer if it is removed from the DOM. Try deleting
					`.origam-watermark__layer` in DevTools — it comes back
					(dissuasion only, not a security feature).
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>antiTamper = false</strong>
						<origam-watermark
								text="REMOVE ME"
								:opacity="0.2"
								:anti-tamper="false"
								class="story-watermark"
								data-cy="watermark-anti-tamper-off"
						>
							<div class="story-doc">Without anti-tamper</div>
						</origam-watermark>
					</div>
					<div class="story-col">
						<strong>antiTamper = true</strong>
						<origam-watermark
								text="RE-INJECTED"
								:opacity="0.2"
								:anti-tamper="true"
								class="story-watermark"
								data-cy="watermark-anti-tamper-on"
						>
							<div class="story-doc">With anti-tamper</div>
						</origam-watermark>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — default (PDF preview mock)">
			<div
					class="story-shell"
					data-cy="watermark-pdf-preview"
			>
				<p class="hint">
					Realistic use case — wrapping a PDF preview / sensitive
					screenshot with a per-recipient watermark.
				</p>
				<origam-watermark
						text="CONFIDENTIAL — j.doe@example.com — 2026-05-15"
						:opacity="0.08"
						:angle="-30"
						:gap="140"
						color="#dc2626"
						class="story-watermark story-watermark--pdf"
						data-cy="watermark-pdf-host"
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamWatermark } from '@origam/components'

	import type { IWatermarkProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LOGO_SRC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23111827"/><text x="12" y="16" text-anchor="middle" fill="%23ffffff" font-size="10" font-family="Helvetica" font-weight="700">O</text></svg>'

	const opacityValues = [0.05, 0.1, 0.2]
	const angleValues = [-45, -30, 0, 30, 45, 90]
	const gapValues = [60, 120, 200]
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
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
