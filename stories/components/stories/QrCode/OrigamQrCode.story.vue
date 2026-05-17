<template>
	<Story
			group="components"
			title="QrCode/OrigamQrCode"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IQrCodeProps>({
					value: 'https://origam.dev',
					size: 240,
					errorCorrectionLevel: 'M',
					color: 'currentColor',
					bgColor: 'transparent',
					quietZone: 4,
					rounded: 'default'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="qrcode-default"
				>
					<origam-qr-code
							v-bind="state"
							data-cy="qrcode-default-host"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.value"
						title="value"
				/>
				<HstNumber
						v-model="state.size"
						title="size (px)"
				/>
				<HstSelect
						v-model="state.errorCorrectionLevel"
						title="errorCorrectionLevel"
						:options="eccOptions"
				/>
				<HstText
						v-model="state.color"
						title="color (dark modules)"
				/>
				<HstText
						v-model="state.bgColor"
						title="bgColor (quiet zone)"
				/>
				<HstNumber
						v-model="state.quietZone"
						title="quietZone (modules)"
				/>
				<HstSelect
						v-model="state.rounded"
						title="rounded (per-module)"
						:options="roundedOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — value (URL / vCard / WiFi / raw)">
			<div
					class="story-shell"
					data-cy="qrcode-values"
			>
				<p class="hint">
					Same encoder, four different payload classes. Compact
					payloads (URLs) produce small matrices; structured payloads
					(vCard) push the encoder onto a larger version.
				</p>
				<div
						v-for="entry in valueSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>{{ entry.label }}</strong>
					<origam-qr-code
							:value="entry.value"
							:size="160"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-value-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — size (named rungs + raw)">
			<div
					class="story-shell"
					data-cy="qrcode-size"
			>
				<p class="hint">
					`size` accepts the canonical `ISizeProps` taxonomy
					(`x-small`…`x-large`) **or** any raw number (pixels).
				</p>
				<div
						v-for="entry in sizeSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>{{ entry.label }}</strong>
					<origam-qr-code
							value="https://origam.dev"
							:size="entry.size"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-size-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — errorCorrectionLevel (L / M / Q / H)">
			<div
					class="story-shell"
					data-cy="qrcode-ecc"
			>
				<p class="hint">
					Higher levels reserve more matrix cells for Reed-Solomon
					redundancy — the matrix grows for the same payload as
					redundancy climbs from L (~7%) to H (~30%).
				</p>
				<div
						v-for="level in eccLevels"
						:key="level"
						class="story-col"
				>
					<strong>level = {{ level }}</strong>
					<origam-qr-code
							value="https://origam.dev/design-system"
							:error-correction-level="level"
							:size="160"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-ecc-${level}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — rounded (per-module shape)">
			<div
					class="story-shell"
					data-cy="qrcode-rounded"
			>
				<p class="hint">
					`rounded` (from `IRoundedProps`) controls the per-module
					SVG corner radius. Named rungs map to 0..0.5 module units
					(circles at `x-large`). Raw numbers in [0, 0.5] pass
					through. Soft modules reduce scanner tolerance on some
					readers — test before shipping.
				</p>
				<div
						v-for="entry in roundedSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>{{ entry.label }}</strong>
					<origam-qr-code
							value="https://origam.dev"
							:rounded="entry.rounded"
							:size="160"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-rounded-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — color / bgColor (theming)">
			<div
					class="story-shell"
					data-cy="qrcode-themed"
			>
				<p class="hint">
					DS-first theming — pass a `TIntent` token (`primary`,
					`success`, …) or any CSS colour to `color` / `bgColor`.
					Use `currentColor` to inherit from the parent text colour.
				</p>
				<div
						v-for="theme in themes"
						:key="theme.label"
						class="story-col"
						:style="theme.surfaceStyle"
				>
					<strong>{{ theme.label }}</strong>
					<origam-qr-code
							value="https://origam.dev"
							:color="theme.color"
							:bg-color="theme.bgColor"
							:size="160"
							:data-cy="`qrcode-theme-${theme.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — icon (centred OrigamIcon overlay)">
			<div
					class="story-shell"
					data-cy="qrcode-icon"
			>
				<p class="hint">
					`icon` accepts any `TIcon` value (MDI string, SVG path
					array, or Vue component). Pair with
					`errorCorrectionLevel="H"` — the overlay covers live
					codewords.
				</p>
				<div
						v-for="entry in iconSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>{{ entry.label }}</strong>
					<origam-qr-code
							value="https://origam.dev/icon-overlay"
							error-correction-level="H"
							:icon="entry.icon"
							:size="180"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-icon-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — image (centred image overlay)">
			<div
					class="story-shell"
					data-cy="qrcode-image"
			>
				<p class="hint">
					`image` accepts a raw URL or an `ISrcObject`. The asset is
					injected as an inline SVG `<image>` element — SSR-safe,
					no client-side fetch needed. Pair with `errorCorrectionLevel="H"`.
				</p>
				<div
						class="story-col"
						data-cy="qrcode-image-string"
				>
					<strong>image = string (URL)</strong>
					<origam-qr-code
							value="https://origam.dev/image-overlay"
							error-correction-level="H"
							:image="LOGO_SRC"
							:size="200"
							color="#111111"
							bg-color="#ffffff"
					/>
				</div>
				<div
						class="story-col"
						data-cy="qrcode-image-object"
				>
					<strong>image = ISrcObject</strong>
					<origam-qr-code
							value="https://origam.dev/image-overlay-object"
							error-correction-level="H"
							:image="{ src: LOGO_SRC, alt: 'Origam logo', aspectRatio: 1 }"
							:size="200"
							color="#111111"
							bg-color="#ffffff"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — quietZone (matrix padding)">
			<div
					class="story-shell"
					data-cy="qrcode-quietzone"
			>
				<p class="hint">
					`quietZone` reserves N modules as padding around the
					matrix (ISO requires ≥4). Smaller values save space but
					may break stricter scanners.
				</p>
				<div
						v-for="qz in [2, 4, 8]"
						:key="qz"
						class="story-col"
				>
					<strong>quietZone = {{ qz }}</strong>
					<origam-qr-code
							value="https://origam.dev"
							:quiet-zone="qz"
							:size="160"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-quietzone-${qz}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — #center (custom centre overlay)">
			<div
					class="story-shell"
					data-cy="qrcode-center-slot"
			>
				<p class="hint">
					The `#center` slot replaces both `icon` and `image`. It
					receives `{ size }` (module units of the reserved
					square) so consumers can scale their custom HTML / SVG
					without re-deriving the geometry.
				</p>
				<div
						class="story-col"
						data-cy="qrcode-center-star"
				>
					<strong>star marker</strong>
					<origam-qr-code
							value="https://origam.dev/center-slot"
							error-correction-level="H"
							:size="200"
							color="#111111"
							bg-color="#ffffff"
					>
						<template #center>
							<div class="center-slot-icon">&#9733;</div>
						</template>
					</origam-qr-code>
				</div>
				<div
						class="story-col"
						data-cy="qrcode-center-brand"
				>
					<strong>brand letter (purple O)</strong>
					<origam-qr-code
							value="https://origam.dev/center-slot-brand"
							error-correction-level="H"
							:size="200"
							color="#7c3aed"
							bg-color="#f5f3ff"
					>
						<template #center>
							<div class="center-slot-brand">O</div>
						</template>
					</origam-qr-code>
				</div>
			</div>
		</Variant>

		<Variant title="Wrapper props — border / margin / padding">
			<div
					class="story-shell"
					data-cy="qrcode-wrapper-props"
			>
				<p class="hint">
					`border`, `margin`, `padding` are the standard DS
					transverse props applied to the wrapper element — they
					do not affect the QR matrix geometry. Note: `rounded`
					on this component drives per-module corners (not the
					wrapper).
				</p>
				<div
						class="story-col"
						data-cy="qrcode-padding"
				>
					<strong>padding="3"</strong>
					<origam-qr-code
							value="https://origam.dev/wrapper-padding"
							:size="160"
							color="#111111"
							bg-color="#e0f2fe"
							padding="3"
					/>
				</div>
				<div
						class="story-col"
						data-cy="qrcode-border"
				>
					<strong>border="thin" + padding="4"</strong>
					<origam-qr-code
							value="https://origam.dev/wrapper-border"
							:size="160"
							color="#0f172a"
							bg-color="#ffffff"
							border="thin"
							padding="4"
					/>
				</div>
				<div
						class="story-col"
						data-cy="qrcode-margin"
				>
					<strong>margin="4"</strong>
					<origam-qr-code
							value="https://origam.dev/wrapper-margin"
							:size="160"
							color="#111111"
							bg-color="#fef9c3"
							margin="4"
					/>
				</div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamQrCode } from '@origam/components'

	import type { IQrCodeProps } from '@origam/interfaces'

	import type { TIcon, TQrCodeErrorCorrectionLevel, TRounded, TSize } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	interface IOption<T> {
		label: string
		value: T
	}

	const LOGO_SRC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23111827"/><text x="12" y="16" text-anchor="middle" fill="%23ffffff" font-size="10" font-family="Helvetica" font-weight="700">O</text></svg>'

	const eccLevels: TQrCodeErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']

	const eccOptions: Array<IOption<TQrCodeErrorCorrectionLevel>> = eccLevels.map(v => ({ label: v, value: v }))

	const roundedOptions: Array<IOption<TRounded | string>> = [
		{ label: 'none (0)', value: '' },
		{ label: 'x-small', value: 'x-small' },
		{ label: 'small', value: 'small' },
		{ label: 'default', value: 'default' },
		{ label: 'medium', value: 'medium' },
		{ label: 'large', value: 'large' },
		{ label: 'x-large (circle)', value: 'x-large' }
	]

	const valueSamples = [
		{ label: 'url', value: 'https://origam.dev' },
		{ label: 'text', value: 'Hello — origam!' },
		{ label: 'wifi', value: 'WIFI:T:WPA;S:origam-guest;P:welcome2026;;' },
		{
			label: 'vcard',
			value: 'BEGIN:VCARD\nVERSION:3.0\nN:Prioul;Arnaud\nORG:origam\nURL:https://origam.dev\nEND:VCARD'
		}
	]

	const sizeSamples: Array<{ label: string, size: TSize | number }> = [
		{ label: 'x-small', size: 'x-small' },
		{ label: 'small', size: 'small' },
		{ label: 'default', size: 'default' },
		{ label: 'large', size: 'large' },
		{ label: 'x-large', size: 'x-large' },
		{ label: '120 (px)', size: 120 },
		{ label: '200 (px)', size: 200 }
	]

	const roundedSamples: Array<{ label: string, rounded: TRounded | number }> = [
		{ label: 'none (0)', rounded: 0 },
		{ label: 'x-small', rounded: 'x-small' },
		{ label: 'default', rounded: 'default' },
		{ label: 'large', rounded: 'large' },
		{ label: 'x-large (circle)', rounded: 'x-large' }
	]

	const iconSamples: Array<{ label: string, icon: TIcon }> = [
		{ label: 'mdi-star', icon: 'mdi-star' },
		{ label: 'mdi-account', icon: 'mdi-account' },
		{ label: 'mdi-heart', icon: 'mdi-heart' }
	]

	const themes = [
		{
			label: 'light',
			color: '#0f172a',
			bgColor: '#ffffff',
			surfaceStyle: { background: '#ffffff' }
		},
		{
			label: 'dark',
			color: '#f8fafc',
			bgColor: '#0f172a',
			surfaceStyle: { background: '#0f172a', color: '#ffffff' }
		},
		{
			label: 'brand',
			color: '#7c3aed',
			bgColor: '#f5f3ff',
			surfaceStyle: { background: '#f5f3ff' }
		},
		{
			label: 'intent: primary',
			color: 'primary',
			bgColor: 'transparent',
			surfaceStyle: { background: '#ffffff' }
		}
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		padding: 16px;
		max-width: 720px;
	}

	.hint {
		flex-basis: 100%;
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		border-radius: 8px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		min-width: 180px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.center-slot-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #fff;
		color: #f97316;
		font-size: 18px;
		line-height: 1;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
	}

	.center-slot-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 6px;
		background: #7c3aed;
		color: #fff;
		font: 700 18px/1 system-ui, sans-serif;
	}
</style>

<docs lang="md" src="@docs/components/QrCode/OrigamQrCode.md"/>
