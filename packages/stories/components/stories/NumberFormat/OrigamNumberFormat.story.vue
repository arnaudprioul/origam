<template>
	<Story
			group="components"
			title="NumberFormat/OrigamNumberFormat"
	>
		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<INumberFormatProps>({
					value: 1234567.89,
					format: 'decimal',
					locale: 'fr-FR',
					currency: 'EUR',
					currencyDisplay: 'symbol',
					unit: 'kilometer-per-hour',
					unitDisplay: 'short',
					notation: undefined,
					compactDisplay: 'short',
					minimumFractionDigits: undefined,
					maximumFractionDigits: undefined,
					minimumSignificantDigits: undefined,
					maximumSignificantDigits: undefined,
					useGrouping: true,
					signDisplay: 'auto',
					tag: 'span'
				})"
		>
			<template #default="{ state }">
				<origam-number-format
						:value="state.value"
						:format="state.format"
						:locale="state.locale"
						:currency="state.currency"
						:currency-display="state.currencyDisplay"
						:unit="state.unit"
						:unit-display="state.unitDisplay"
						:notation="state.notation || undefined"
						:compact-display="state.compactDisplay"
						:minimum-fraction-digits="state.minimumFractionDigits || undefined"
						:maximum-fraction-digits="state.maximumFractionDigits || undefined"
						:minimum-significant-digits="state.minimumSignificantDigits || undefined"
						:maximum-significant-digits="state.maximumSignificantDigits || undefined"
						:use-grouping="state.useGrouping"
						:sign-display="state.signDisplay"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.value" title="Value"/>
				</StoryGroup>
				<StoryGroup title="Format">
					<HstSelect v-model="state.format"   title="Format"   :options="FORMAT_OPTIONS"/>
					<HstSelect v-model="state.notation" title="Notation" :options="NOTATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Locale">
					<HstSelect v-model="state.locale" title="Locale" :options="LOCALE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Currency">
					<HstSelect v-model="state.currency"        title="Currency"         :options="CURRENCY_OPTIONS"/>
					<HstSelect v-model="state.currencyDisplay" title="Currency Display" :options="CURRENCY_DISPLAY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Unit">
					<HstSelect v-model="state.unit"        title="Unit"         :options="UNIT_OPTIONS"/>
					<HstSelect v-model="state.unitDisplay" title="Unit Display" :options="UNIT_DISPLAY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Compact">
					<HstSelect v-model="state.compactDisplay" title="Compact Display" :options="COMPACT_DISPLAY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Precision">
					<HstNumber v-model="state.minimumFractionDigits"   title="Min Fraction Digits"   :min="0" :max="20" :step="1"/>
					<HstNumber v-model="state.maximumFractionDigits"   title="Max Fraction Digits"   :min="0" :max="20" :step="1"/>
					<HstNumber v-model="state.minimumSignificantDigits" title="Min Significant Digits" :min="1" :max="21" :step="1"/>
					<HstNumber v-model="state.maximumSignificantDigits" title="Max Significant Digits" :min="1" :max="21" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstSelect   v-model="state.signDisplay"  title="Sign Display"  :options="SIGN_DISPLAY_OPTIONS"/>
					<HstCheckbox v-model="state.useGrouping"  title="Use Grouping"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="story-shell">
				<p class="hint">
					The default slot is scoped — it exposes
					<code>{ formatted, parts, value }</code> so consumers can paint
					specific segments (here the currency glyph in orange).
				</p>
				<origam-number-format
						:value="1234567.89"
						format="currency"
						currency="EUR"
						locale="fr-FR"
				>
					<template #default="{ parts }">
						<span
								v-for="(part, index) in parts"
								:key="index"
								:class="`number-format-slot-part-${part.type}`"
						>{{ part.value }}</span>
					</template>
				</origam-number-format>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

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
				<origam-number-format v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.value" title="Value"/>
				</StoryGroup>
				<StoryGroup title="Format">
					<HstSelect v-model="state.format"    title="Format"    :options="FORMAT_OPTIONS"/>
					<HstSelect v-model="state.locale"    title="Locale"    :options="LOCALE_OPTIONS"/>
					<HstSelect v-model="state.notation"  title="Notation"  :options="NOTATION_OPTIONS"/>
					<HstSelect v-model="state.currency"  title="Currency"  :options="CURRENCY_OPTIONS"/>
					<HstSelect v-model="state.unit"      title="Unit"      :options="UNIT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstSelect   v-model="state.signDisplay" title="Sign Display"  :options="SIGN_DISPLAY_OPTIONS"/>
					<HstCheckbox v-model="state.useGrouping" title="Use Grouping"/>
				</StoryGroup>
			</template>
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
		TNumberFormatCompactDisplay,
		TNumberFormatCurrencyDisplay,
		TNumberFormatFormat,
		TNumberFormatNotation,
		TNumberFormatSignDisplay,
		TNumberFormatUnitDisplay
	} from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { TAG_OPTIONS } from '@stories/const'

	const FORMAT_OPTIONS: Array<{ label: string; value: TNumberFormatFormat }> = [
		{ label: 'decimal', value: 'decimal' },
		{ label: 'currency', value: 'currency' },
		{ label: 'percent', value: 'percent' },
		{ label: 'unit', value: 'unit' },
		{ label: 'compact', value: 'compact' },
		{ label: 'scientific', value: 'scientific' },
		{ label: 'engineering', value: 'engineering' }
	]

	const NOTATION_OPTIONS: Array<{ label: string; value: TNumberFormatNotation | undefined }> = [
		{ label: '(default)', value: undefined },
		{ label: 'standard', value: 'standard' },
		{ label: 'compact', value: 'compact' },
		{ label: 'scientific', value: 'scientific' },
		{ label: 'engineering', value: 'engineering' }
	]

	const CURRENCY_DISPLAY_OPTIONS: Array<{ label: string; value: TNumberFormatCurrencyDisplay }> = [
		{ label: 'symbol', value: 'symbol' },
		{ label: 'narrowSymbol', value: 'narrowSymbol' },
		{ label: 'code', value: 'code' },
		{ label: 'name', value: 'name' }
	]

	const UNIT_DISPLAY_OPTIONS: Array<{ label: string; value: TNumberFormatUnitDisplay }> = [
		{ label: 'short', value: 'short' },
		{ label: 'long', value: 'long' },
		{ label: 'narrow', value: 'narrow' }
	]

	const COMPACT_DISPLAY_OPTIONS: Array<{ label: string; value: TNumberFormatCompactDisplay }> = [
		{ label: 'short', value: 'short' },
		{ label: 'long', value: 'long' }
	]

	const SIGN_DISPLAY_OPTIONS: Array<{ label: string; value: TNumberFormatSignDisplay }> = [
		{ label: 'auto', value: 'auto' },
		{ label: 'always', value: 'always' },
		{ label: 'except-zero', value: 'except-zero' },
		{ label: 'negative', value: 'negative' },
		{ label: 'never', value: 'never' }
	]

	const LOCALE_OPTIONS: Array<{ label: string; value: string }> = [
		{ label: 'auto (runtime)', value: 'auto' },
		{ label: 'fr-FR', value: 'fr-FR' },
		{ label: 'en-US', value: 'en-US' },
		{ label: 'de-DE', value: 'de-DE' },
		{ label: 'ja-JP', value: 'ja-JP' },
		{ label: 'ar-EG', value: 'ar-EG' }
	]

	const CURRENCY_OPTIONS: Array<{ label: string; value: string }> = [
		{ label: 'EUR', value: 'EUR' },
		{ label: 'USD', value: 'USD' },
		{ label: 'JPY', value: 'JPY' },
		{ label: 'GBP', value: 'GBP' },
		{ label: 'CHF', value: 'CHF' },
		{ label: 'CNY', value: 'CNY' }
	]

	const UNIT_OPTIONS: Array<{ label: string; value: string }> = [
		{ label: 'kilometer-per-hour', value: 'kilometer-per-hour' },
		{ label: 'celsius', value: 'celsius' },
		{ label: 'liter', value: 'liter' },
		{ label: 'megabyte', value: 'megabyte' }
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

	.number-format-slot-part-currency {
		color: orange;
		font-weight: 700;
	}
</style>

<docs lang="md" src="@docs/components/NumberFormat/OrigamNumberFormat.md"/>
