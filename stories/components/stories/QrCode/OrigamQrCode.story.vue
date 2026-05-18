<template>
	<Story
			group="components"
			title="QrCode/OrigamQrCode"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IQrCodeProps>({
					value: 'https://origam.dev',
					title: '',
					size: 240,
					errorCorrectionLevel: 'M',
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: undefined,
					elevation: undefined,
					quietZone: 4,
					qrCodeProps: {
						color: undefined,
						bgColor: undefined,
						rounded: undefined
					}
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
				<HstText
						v-model="state.title"
						title="title"
				/>
				<HstNumber
						v-model="state.size"
						title="size (px)"
				/>
				<HstNumber
						v-model="state.quietZone"
						title="quietZone (modules)"
				/>
				<HstSelect
						v-model="state.errorCorrectionLevel"
						title="errorCorrectionLevel"
						:options="eccOptions"
				/>
				<details>
					<summary>Wrapper chrome</summary>
					<HstSelect
							v-model="state.color"
							title="color (wrapper / modules fallback)"
							:options="intentList"
					/>
					<HstSelect
							v-model="state.bgColor"
							title="bgColor (wrapper background)"
							:options="intentList"
					/>
					<HstSelect
							v-model="state.rounded"
							title="rounded (wrapper border-radius)"
							:options="roundedList"
					/>
					<HstSelect
							v-model="state.border"
							title="border"
							:options="borderList"
					/>
					<HstSelect
							v-model="state.elevation"
							title="elevation"
							:options="elevationList"
					/>
				</details>
				<details>
					<summary>qrCodeProps (matrix internals)</summary>
					<HstSelect
							v-model="state.qrCodeProps.color"
							title="qrCodeProps.color (modules)"
							:options="intentList"
					/>
					<HstSelect
							v-model="state.qrCodeProps.bgColor"
							title="qrCodeProps.bgColor (quiet zone)"
							:options="intentList"
					/>
					<HstSelect
							v-model="state.qrCodeProps.rounded"
							title="qrCodeProps.rounded (per-module radius)"
							:options="roundedList"
					/>
				</details>
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
							:data-cy="`qrcode-value-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — title (heading above the matrix)">
			<div
					class="story-shell"
					data-cy="qrcode-title"
			>
				<p class="hint">
					`title` renders an &lt;h3&gt; heading inside the wrapper,
					centered above the QR matrix. Used when the QR is
					presented alongside meta (campaign name, recipient, …)
					so consumers don't have to wrap the component
					manually.
				</p>
				<div class="story-col">
					<origam-qr-code
							value="https://origam.dev/event-2026"
							title="Origam Conf 2026"
							:size="200"
							border="thin"
							rounded="medium"
							padding="3"
							data-cy="qrcode-title-event"
					/>
				</div>
				<div class="story-col">
					<origam-qr-code
							value="https://origam.dev/contact"
							title="Scan me"
							color="primary"
							bg-color="primary"
							:size="200"
							rounded="large"
							padding="3"
							data-cy="qrcode-title-contact"
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
							:data-cy="`qrcode-ecc-${level}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Wrapper chrome — color / bgColor / rounded / border / elevation / padding / margin">
			<div
					class="story-shell"
					data-cy="qrcode-wrapper"
			>
				<p class="hint">
					Every canonical DS transverse contract applies to the
					wrapper element — same vocabulary as on Card / Btn / etc.
					The SVG matrix inherits the wrapper `color` through
					`fill="currentColor"` unless `qrCodeProps.color`
					overrides.
				</p>
				<div
						v-for="theme in themes"
						:key="theme.label"
						class="story-col"
				>
					<strong>{{ theme.label }}</strong>
					<origam-qr-code
							v-bind="theme.props"
							value="https://origam.dev/themed"
							:size="160"
							:data-cy="`qrcode-wrapper-${theme.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — qrCodeProps (matrix-level overrides)">
			<div
					class="story-shell"
					data-cy="qrcode-internal"
			>
				<p class="hint">
					`qrCodeProps.color`, `.bgColor`, `.rounded` apply ONLY
					to the SVG matrix — the wrapper keeps its own
					chrome. Useful when the QR needs to read against a
					branded surface without forcing the wrapper to wear
					the same paint.
				</p>
				<div
						v-for="entry in qrCodePropsSamples"
						:key="entry.label"
						class="story-col"
				>
					<strong>{{ entry.label }}</strong>
					<origam-qr-code
							value="https://origam.dev/internal"
							:qr-code-props="entry.qrCodeProps"
							:bg-color="entry.bgColor"
							:size="160"
							rounded="medium"
							padding="3"
							:data-cy="`qrcode-internal-${entry.label}`"
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
					`image` accepts a raw URL or an `ISrcObject`. The asset
					is injected as an `&lt;OrigamAvatar&gt;` overlay above the SVG.
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
					square) so consumers can scale their custom paint
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
					>
						<template #center>
							<div class="center-slot-icon">&#9733;</div>
						</template>
					</origam-qr-code>
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

	import type { IQrCodeOptions, IQrCodeProps } from '@origam/interfaces'

	import type { TIcon, TIntent, TQrCodeErrorCorrectionLevel, TRounded } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	import { borderList, elevationList, intentList, roundedList } from '@stories/const'

	interface IOption<T> {
		label: string
		value: T
	}

	const LOGO_SRC = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23111827"/><text x="12" y="16" text-anchor="middle" fill="%23ffffff" font-size="10" font-family="Helvetica" font-weight="700">O</text></svg>'

	const eccLevels: TQrCodeErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']

	const eccOptions: Array<IOption<TQrCodeErrorCorrectionLevel>> = eccLevels.map(v => ({ label: v, value: v }))

	const valueSamples = [
		{ label: 'url', value: 'https://origam.dev' },
		{ label: 'text', value: 'Hello — origam!' },
		{ label: 'wifi', value: 'WIFI:T:WPA;S:origam-guest;P:welcome2026;;' },
		{
			label: 'vcard',
			value: 'BEGIN:VCARD\nVERSION:3.0\nN:Prioul;Arnaud\nORG:origam\nURL:https://origam.dev\nEND:VCARD'
		}
	]

	const iconSamples: Array<{ label: string, icon: TIcon }> = [
		{ label: 'mdi-star', icon: 'mdi-star' },
		{ label: 'mdi-account', icon: 'mdi-account' },
		{ label: 'mdi-heart', icon: 'mdi-heart' }
	]

	const themes: Array<{
		label: string
		props: Partial<IQrCodeProps>
	}> = [
		{
			label: 'plain',
			props: {
				border: 'thin',
				rounded: 'medium',
				padding: '3'
			}
		},
		{
			label: 'primary surface',
			props: {
				bgColor: 'primary' as TIntent,
				rounded: 'large',
				padding: '3'
			}
		},
		{
			label: 'success + elevation',
			props: {
				color: 'success' as TIntent,
				bgColor: 'success' as TIntent,
				rounded: 'medium',
				elevation: 'md',
				padding: '3'
			}
		},
		{
			label: 'circle + border',
			props: {
				border: 'thick',
				rounded: 'x-large' as TRounded,
				padding: '4'
			}
		}
	]

	const qrCodePropsSamples: Array<{
		label: string
		qrCodeProps: IQrCodeOptions
		bgColor?: TIntent
	}> = [
		{
			label: 'primary modules / no override bg',
			qrCodeProps: { color: 'primary' as TIntent, bgColor: undefined, rounded: undefined }
		},
		{
			label: 'danger modules + soft bg',
			qrCodeProps: { color: 'danger' as TIntent, bgColor: undefined, rounded: 'default' as TRounded },
			bgColor: 'danger' as TIntent
		},
		{
			label: 'circle modules (x-large)',
			qrCodeProps: { color: undefined, bgColor: undefined, rounded: 'x-large' as TRounded }
		},
		{
			label: 'info modules / large rounded',
			qrCodeProps: { color: 'info' as TIntent, bgColor: undefined, rounded: 'large' as TRounded }
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
		align-items: center;
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

	details {
		flex-basis: 100%;
	}

	details summary {
		cursor: pointer;
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		padding: 4px 0;
	}
</style>

<docs lang="md" src="@docs/components/QrCode/OrigamQrCode.md"/>
