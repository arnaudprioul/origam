<template>
	<Story
			group="components"
			title="QrCode/OrigamQrCode"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IQrCodeProps>>({
					value: 'https://origam.dev',
					size: 200,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: undefined,
					elevation: undefined,
					padding: undefined,
					margin: undefined
				})"
		>
			<template #default="{ state }">
				<origam-qr-code
						:value="state.value || 'https://origam.dev'"
						:size="state.size"
						:color="state.color"
						:bg-color="state.bgColor"
						:rounded="state.rounded"
						:border="state.border"
						:elevation="state.elevation"
						:padding="state.padding"
						:margin="state.margin"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstNumber v-model="state.size" title="Size (px)" :min="80" :max="480" :step="8"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border" title="Border" :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IQrCodeProps>>({
					value: 'https://origam.dev',
					title: '',
					errorCorrectionLevel: 'M',
					quietZone: 4,
					icon: undefined,
					image: undefined,
					ariaLabel: '',
					tag: 'div',
					qrCodeProps: undefined
				})"
		>
			<template #default="{ state }">
				<origam-qr-code
						:value="state.value || 'https://origam.dev'"
						:title="state.title || undefined"
						:error-correction-level="state.errorCorrectionLevel"
						:quiet-zone="state.quietZone"
						:icon="state.icon || undefined"
						:image="state.image || undefined"
						:aria-label="state.ariaLabel || undefined"
						:tag="state.tag"
						:qr-code-props="state.qrCodeProps"
						:size="200"
						border="thin"
						rounded="medium"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstText   v-model="state.value" title="Value (payload)"/>
					<HstText   v-model="state.title" title="Title (heading)"/>
				</StoryGroup>
				<StoryGroup title="Matrix">
					<HstSelect v-model="state.errorCorrectionLevel" title="Error Correction Level" :options="ECC_OPTIONS"/>
					<HstNumber v-model="state.quietZone"            title="Quiet Zone (modules)"   :min="0" :max="10" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Overlay">
					<HstSelect v-model="state.icon"  title="Icon"  :options="ICON_OPTIONS"/>
					<HstText   v-model="state.image" title="Image (URL)"/>
				</StoryGroup>
				<StoryGroup title="Accessibility">
					<HstText v-model="state.ariaLabel" title="Aria Label"/>
				</StoryGroup>
				<StoryGroup title="Link">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - center">
			<origam-qr-code
					value="https://origam.dev/center-slot"
					error-correction-level="H"
					:size="200"
			>
				<template #center>
					<span class="qrcode-star-overlay">&#9733;</span>
				</template>
			</origam-qr-code>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IQrCodeProps>({
					value: 'https://origam.dev',
					size: 200,
					errorCorrectionLevel: 'M',
					quietZone: 4,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					elevation: undefined,
					border: undefined,
					padding: undefined,
					margin: undefined,
					title: undefined,
					icon: undefined,
					image: undefined,
					ariaLabel: undefined,
					qrCodeProps: undefined,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-qr-code v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.value" title="Value (payload)"/>
					<HstText v-model="state.title" title="Title (heading)"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
					<HstNumber v-model="state.size"      title="Size (px)" :min="80" :max="480" :step="8"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect v-model="state.errorCorrectionLevel" title="Error Correction Level" :options="ECC_OPTIONS"/>
					<HstNumber v-model="state.quietZone"            title="Quiet Zone (modules)"   :min="0" :max="10" :step="1"/>
					<HstSelect v-model="state.icon"                 title="Icon overlay"           :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.tag"                  title="Tag"                    :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
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

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const ECC_OPTIONS: Array<{ label: string; value: TQrCodeErrorCorrectionLevel }> = [
		{ label: 'L (~7% recovery)',  value: 'L' },
		{ label: 'M (~15% recovery)', value: 'M' },
		{ label: 'Q (~25% recovery)', value: 'Q' },
		{ label: 'H (~30% recovery)', value: 'H' }
	]

</script>

<style scoped>
	.qrcode-star-overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--origam-color__surface---raised, #fff);
		color: var(--origam-color__text---accent, #f97316);
		font-size: 18px;
		line-height: 1;
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.18);
	}
</style>

<docs lang="md" src="@docs/components/QrCode/OrigamQrCode.md"/>
