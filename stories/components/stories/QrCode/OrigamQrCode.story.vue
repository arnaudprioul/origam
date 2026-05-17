<template>
	<Story
			group="components"
			title="QrCode/OrigamQrCode"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IQrCodeProps>({
					value: 'https://origam.dev',
					size: 240,
					errorCorrectionLevel: 'M',
					color: 'currentColor',
					bgColor: 'transparent',
					quietZone: 4,
					rounded: 'default',
					cornerRadius: 0
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="qrcode-playground"
				>
					<origam-qr-code
							v-bind="state"
							data-cy="qrcode-playground-host"
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
						title="bgColor (quiet zone bg)"
				/>
				<HstNumber
						v-model="state.quietZone"
						title="quietZone (modules)"
				/>
				<HstNumber
						v-model="state.cornerRadius"
						title="cornerRadius"
				/>
				<HstSelect
						v-model="state.rounded"
						title="rounded (wrapper)"
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

		<Variant title="Prop — cornerRadius (0 / 0.25 / 0.5)">
			<div
					class="story-shell"
					data-cy="qrcode-corner-radius"
			>
				<p class="hint">
					Rounded modules soften the look but reduce scanner
					tolerance on some readers — test before shipping a
					non-zero value to production.
				</p>
				<div
						v-for="radius in cornerRadii"
						:key="radius"
						class="story-col"
				>
					<strong>cornerRadius = {{ radius }}</strong>
					<origam-qr-code
							value="https://origam.dev"
							:corner-radius="radius"
							:size="160"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-corner-${radius}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — logo overlay (size 0.15 / 0.2 / 0.25)">
			<div
					class="story-shell"
					data-cy="qrcode-logo"
			>
				<p class="hint">
					Logo overlay scales as a fraction of the QR width. Pair
					with `errorCorrectionLevel="H"` — the overlay obscures
					modules that the Reed-Solomon redundancy has to
					reconstruct.
				</p>
				<div
						v-for="entry in logoSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>size = {{ entry.size }}</strong>
					<origam-qr-code
							value="https://origam.dev/qr-code-with-logo"
							error-correction-level="H"
							:logo="{ src: LOGO_SRC, size: entry.size }"
							:size="200"
							color="#111111"
							bg-color="#ffffff"
							:data-cy="`qrcode-logo-${entry.label}`"
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

		<Variant title="Slot — #center (custom centre overlay)">
			<div
					class="story-shell"
					data-cy="qrcode-center-slot"
			>
				<p class="hint">
					The `#center` slot replaces the logo overlay with arbitrary
					HTML. The slot receives `{ size }` (module units of the
					reserved square) so consumers can scale their icon without
					re-deriving the geometry. Use `errorCorrectionLevel="H"` —
					the centre area masks live codewords.
				</p>
				<div
						class="story-col"
						data-cy="qrcode-center-icon"
				>
					<strong>icon marker (orange star)</strong>
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

		<Variant title="Wrapper props — rounded / border / margin / padding">
			<div
					class="story-shell"
					data-cy="qrcode-wrapper-props"
			>
				<p class="hint">
					`rounded`, `border`, `margin`, `padding` are standard DS
					transverse props applied to the wrapper element — they do
					not affect the QR matrix geometry.
				</p>
				<div
						class="story-col"
						data-cy="qrcode-rounded-padding"
				>
					<strong>rounded="lg" + padding="3"</strong>
					<origam-qr-code
							value="https://origam.dev/wrapper-rounded"
							:size="160"
							color="#111111"
							bg-color="#e0f2fe"
							rounded="lg"
							padding="3"
					/>
				</div>
				<div
						class="story-col"
						data-cy="qrcode-border-rounded"
				>
					<strong>border="thin" + rounded="md" + padding="4"</strong>
					<origam-qr-code
							value="https://origam.dev/wrapper-border"
							:size="160"
							color="#0f172a"
							bg-color="#ffffff"
							border="thin"
							rounded="md"
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

	import type { TQrCodeErrorCorrectionLevel } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	interface IOption<T> {
		label: string
		value: T
	}

	const LOGO_SRC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23111827"/><text x="12" y="16" text-anchor="middle" fill="%23ffffff" font-size="10" font-family="Helvetica" font-weight="700">O</text></svg>'

	const eccLevels: TQrCodeErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']
	const cornerRadii = [0, 0.25, 0.5]

	const eccOptions: Array<IOption<TQrCodeErrorCorrectionLevel>> = eccLevels.map(v => ({ label: v, value: v }))

	const roundedOptions: Array<IOption<string>> = [
		{ label: 'none', value: '0' },
		{ label: 'xs', value: 'xs' },
		{ label: 'sm', value: 'sm' },
		{ label: 'default', value: 'default' },
		{ label: 'md', value: 'md' },
		{ label: 'lg', value: 'lg' },
		{ label: 'xl', value: 'xl' },
		{ label: '2xl', value: '2xl' },
		{ label: 'circle', value: 'circle' }
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

	const logoSamples = [
		{ label: '015', size: 0.15 },
		{ label: '020', size: 0.20 },
		{ label: '025', size: 0.25 }
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
