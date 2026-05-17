<template>
	<Story
			group="components"
			title="QRCode/OrigamQRCode"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IQRCodeProps>({
					value: 'https://origam.dev',
					size: 240,
					errorCorrectionLevel: 'M',
					foreground: '#000000',
					background: '#ffffff',
					margin: 4,
					cornerRadius: 0
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="qrcode-playground"
				>
					<origam-qrcode
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
						v-model="state.foreground"
						title="foreground"
				/>
				<HstText
						v-model="state.background"
						title="background"
				/>
				<HstNumber
						v-model="state.margin"
						title="margin (modules)"
				/>
				<HstNumber
						v-model="state.cornerRadius"
						title="cornerRadius"
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
					<origam-qrcode
							:value="entry.value"
							:size="160"
							foreground="#111111"
							background="#ffffff"
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
					<origam-qrcode
							value="https://origam.dev/design-system"
							:error-correction-level="level"
							:size="160"
							foreground="#111111"
							background="#ffffff"
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
					<origam-qrcode
							value="https://origam.dev"
							:corner-radius="radius"
							:size="160"
							foreground="#111111"
							background="#ffffff"
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
					<origam-qrcode
							value="https://origam.dev/qrcode-with-logo"
							error-correction-level="H"
							:logo="{ src: LOGO_SRC, size: entry.size }"
							:size="200"
							foreground="#111111"
							background="#ffffff"
							:data-cy="`qrcode-logo-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — foreground / background (theming)">
			<div
					class="story-shell"
					data-cy="qrcode-themed"
			>
				<p class="hint">
					Pure CSS theming — pass any colour to `foreground` /
					`background`, or use `currentColor` to inherit from the
					parent's `color`.
				</p>
				<div
						v-for="theme in themes"
						:key="theme.label"
						class="story-col"
						:style="theme.surfaceStyle"
				>
					<strong>{{ theme.label }}</strong>
					<origam-qrcode
							value="https://origam.dev"
							:foreground="theme.foreground"
							:background="theme.background"
							:size="160"
							:data-cy="`qrcode-theme-${theme.label}`"
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
	import { OrigamQRCode } from '@origam/components'

	import type { IQRCodeProps } from '@origam/interfaces'

	import type { TQRCodeErrorCorrectionLevel } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	interface IOption<T> {
		label: string
		value: T
	}

	const LOGO_SRC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23111827"/><text x="12" y="16" text-anchor="middle" fill="%23ffffff" font-size="10" font-family="Helvetica" font-weight="700">O</text></svg>'

	const eccLevels: TQRCodeErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']
	const cornerRadii = [0, 0.25, 0.5]

	const eccOptions: Array<IOption<TQRCodeErrorCorrectionLevel>> = eccLevels.map(v => ({ label: v, value: v }))

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
			foreground: '#0f172a',
			background: '#ffffff',
			surfaceStyle: { background: '#ffffff' }
		},
		{
			label: 'dark',
			foreground: '#f8fafc',
			background: '#0f172a',
			surfaceStyle: { background: '#0f172a', color: '#ffffff' }
		},
		{
			label: 'brand',
			foreground: '#7c3aed',
			background: '#f5f3ff',
			surfaceStyle: { background: '#f5f3ff' }
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
</style>

<docs lang="md" src="@docs/component./QrCode/OrigamQRCode.md"/>
