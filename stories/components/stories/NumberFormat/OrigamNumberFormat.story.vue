<template>
	<Story
			group="components"
			title="NumberFormat/OrigamNumberFormat"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<INumberFormatProps>({
					value: 1234567.89,
					format: 'currency',
					locale: 'fr-FR',
					currency: 'EUR',
					unit: 'kilometer-per-hour',
					notation: undefined,
					minimumFractionDigits: undefined,
					maximumFractionDigits: undefined,
					useGrouping: true,
					signDisplay: 'auto'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="number-format-playground"
				>
					<origam-number-format
							v-bind="state"
							data-cy="number-format-playground-host"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.value"
						title="value"
				/>
				<HstSelect
						v-model="state.format"
						title="format"
						:options="formatOptions"
				/>
				<HstSelect
						v-model="state.locale"
						title="locale"
						:options="localeOptions"
				/>
				<HstSelect
						v-model="state.currency"
						title="currency"
						:options="currencyOptions"
				/>
				<HstSelect
						v-model="state.unit"
						title="unit"
						:options="unitOptions"
				/>
				<HstSelect
						v-model="state.notation"
						title="notation"
						:options="notationOptions"
				/>
				<HstNumber
						v-model="state.minimumFractionDigits"
						title="minimumFractionDigits"
				/>
				<HstNumber
						v-model="state.maximumFractionDigits"
						title="maximumFractionDigits"
				/>
				<HstCheckbox
						v-model="state.useGrouping"
						title="useGrouping"
				/>
				<HstSelect
						v-model="state.signDisplay"
						title="signDisplay"
						:options="signOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — format (parallel)">
			<div
					class="story-shell"
					data-cy="number-format-formats"
			>
				<p class="hint">
					Same value (`1234567.89`) rendered through every dialect.
					Currency and unit need their companion props; the others
					are self-contained.
				</p>
				<div
						v-for="entry in formatSamples"
						:key="entry.format"
						class="story-col"
				>
					<strong>format = {{ entry.format }}</strong>
					<origam-number-format
							:value="1234567.89"
							:format="entry.format"
							:currency="entry.currency"
							:unit="entry.unit"
							locale="en-US"
							:data-cy="`number-format-format-${entry.format}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — locale (parallel)">
			<div
					class="story-shell"
					data-cy="number-format-locales"
			>
				<p class="hint">
					Same currency value rendered in five locales — note the
					glyph position (prefix vs suffix), the thousands
					separator, and the decimal mark all shift.
				</p>
				<div
						v-for="loc in locales"
						:key="loc"
						class="story-col"
				>
					<strong>locale = {{ loc }}</strong>
					<origam-number-format
							:value="1234567.89"
							format="currency"
							currency="EUR"
							:locale="loc"
							:data-cy="`number-format-locale-${loc}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — currency (parallel)">
			<div
					class="story-shell"
					data-cy="number-format-currencies"
			>
				<div
						v-for="curr in currencies"
						:key="curr"
						class="story-col"
				>
					<strong>currency = {{ curr }}</strong>
					<origam-number-format
							:value="9999.99"
							format="currency"
							:currency="curr"
							locale="en-US"
							:data-cy="`number-format-currency-${curr}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — unit (parallel)">
			<div
					class="story-shell"
					data-cy="number-format-units"
			>
				<p class="hint">
					Sanctioned units — full list via
					`Intl.supportedValuesOf('unit')` at runtime.
				</p>
				<div
						v-for="u in units"
						:key="u"
						class="story-col"
				>
					<strong>unit = {{ u }}</strong>
					<origam-number-format
							:value="42"
							format="unit"
							:unit="u"
							locale="en-US"
							:data-cy="`number-format-unit-${u}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — notation compact (1.2K / 1.2M / 1.2B)">
			<div
					class="story-shell"
					data-cy="number-format-compact"
			>
				<p class="hint">
					Compact notation scales the suffix automatically — no
					custom thresholds to maintain.
				</p>
				<div
						v-for="entry in compactSamples"
						:key="entry.value"
						class="story-col"
				>
					<strong>value = {{ entry.value.toLocaleString('en-US') }}</strong>
					<origam-number-format
							:value="entry.value"
							format="compact"
							locale="en-US"
							:data-cy="`number-format-compact-${entry.label}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — signDisplay (parallel)">
			<div
					class="story-shell"
					data-cy="number-format-signs"
			>
				<div
						v-for="sign in signs"
						:key="sign"
						class="story-col"
				>
					<strong>signDisplay = {{ sign }}</strong>
					<origam-number-format
							:value="42"
							:sign-display="sign"
							locale="en-US"
							:data-cy="`number-format-sign-${sign}-positive`"
					/>
					<origam-number-format
							:value="-42"
							:sign-display="sign"
							locale="en-US"
							:data-cy="`number-format-sign-${sign}-negative`"
					/>
					<origam-number-format
							:value="0"
							:sign-display="sign"
							locale="en-US"
							:data-cy="`number-format-sign-${sign}-zero`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — default scoped (highlight currency symbol)">
			<div
					class="story-shell"
					data-cy="number-format-slot"
			>
				<p class="hint">
					The default slot is scoped — it exposes
					`{ formatted, parts, value }` so consumers can paint
					specific segments (here the currency glyph in orange).
				</p>
				<origam-number-format
						:value="1234567.89"
						format="currency"
						currency="EUR"
						locale="fr-FR"
						data-cy="number-format-slot-host"
				>
					<template #default="{ parts }">
						<span
								v-for="(part, index) in parts"
								:key="index"
								:class="`number-format-slot-part-${part.type}`"
								:data-cy="`number-format-slot-part-${part.type}`"
						>{{ part.value }}</span>
					</template>
				</origam-number-format>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamNumberFormat } from '@origam/components'

	import type { INumberFormatProps } from '@origam/interfaces'

	import type {
		TNumberFormatFormat,
		TNumberFormatNotation,
		TNumberFormatSignDisplay
	} from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	interface IOption<T> {
		label: string
		value: T
	}

	const formats: TNumberFormatFormat[] = ['decimal', 'currency', 'percent', 'unit', 'compact', 'scientific', 'engineering']
	const locales = ['fr-FR', 'en-US', 'de-DE', 'ja-JP', 'ar-EG']
	const currencies = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'CNY']
	const units = ['kilometer-per-hour', 'celsius', 'liter', 'megabyte']
	const signs: TNumberFormatSignDisplay[] = ['auto', 'always', 'except-zero', 'negative', 'never']
	const notations: Array<TNumberFormatNotation | undefined> = [undefined, 'standard', 'compact', 'scientific', 'engineering']

	const formatOptions: Array<IOption<TNumberFormatFormat>> = formats.map(v => ({ label: v, value: v }))
	const localeOptions: Array<IOption<string>> = locales.map(v => ({ label: v, value: v }))
	const currencyOptions: Array<IOption<string>> = currencies.map(v => ({ label: v, value: v }))
	const unitOptions: Array<IOption<string>> = units.map(v => ({ label: v, value: v }))
	const signOptions: Array<IOption<TNumberFormatSignDisplay>> = signs.map(v => ({ label: v, value: v }))
	const notationOptions: Array<IOption<TNumberFormatNotation | undefined>> = notations.map(v => ({
		label: v ?? '(default)',
		value: v as TNumberFormatNotation
	}))

	const formatSamples: Array<{
		format: TNumberFormatFormat
		currency?: string
		unit?: string
	}> = [
		{ format: 'decimal' },
		{ format: 'currency', currency: 'USD' },
		{ format: 'percent' },
		{ format: 'unit', unit: 'kilometer-per-hour' },
		{ format: 'compact' },
		{ format: 'scientific' },
		{ format: 'engineering' }
	]

	const compactSamples = [
		{ label: 'K', value: 1234 },
		{ label: 'M', value: 1234567 },
		{ label: 'B', value: 1234567890 }
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 540px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 12px;
		border-radius: 4px;
		background: var(--origam-color__surface---raised, #f5f5f5);
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.number-format-slot-part-currency {
		color: orange;
		font-weight: 700;
	}
</style>

<docs lang="md" src="@docs/components/NumberFormat/OrigamNumberFormat.md"/>
