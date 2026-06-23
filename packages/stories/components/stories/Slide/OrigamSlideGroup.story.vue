<template>
	<Story
			group="components"
			title="Slide/OrigamSlideGroup"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ISlideGroupProps>>({
					rounded: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					padding: undefined,
					paddingTop: undefined,
					paddingBottom: undefined,
					paddingLeft: undefined,
					paddingRight: undefined,
					margin: undefined,
					marginTop: undefined,
					marginBottom: undefined,
					marginLeft: undefined,
					marginRight: undefined,
					mobileBreakpoint: undefined,
					tag: 'div',
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-slide-group
							:rounded="state.rounded"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:padding="state.padding"
							:padding-top="state.paddingTop"
							:padding-bottom="state.paddingBottom"
							:padding-left="state.paddingLeft"
							:padding-right="state.paddingRight"
							:margin="state.margin"
							:margin-top="state.marginTop"
							:margin-bottom="state.marginBottom"
							:margin-left="state.marginLeft"
							:margin-right="state.marginRight"
							:tag="state.tag"
							show-arrows="always"
							:style="hostStyle"
					>
						<div v-for="n in 20" :key="n" class="story-tag">Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"        title="Padding"/>
					<HstText v-model="state.paddingTop"     title="Padding Top"/>
					<HstText v-model="state.paddingBottom"  title="Padding Bottom"/>
					<HstText v-model="state.paddingLeft"    title="Padding Left"/>
					<HstText v-model="state.paddingRight"   title="Padding Right"/>
					<HstText v-model="state.margin"         title="Margin"/>
					<HstText v-model="state.marginTop"      title="Margin Top"/>
					<HstText v-model="state.marginBottom"   title="Margin Bottom"/>
					<HstText v-model="state.marginLeft"     title="Margin Left"/>
					<HstText v-model="state.marginRight"    title="Margin Right"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ISlideGroupProps>>({
					direction: DIRECTION.HORIZONTAL,
					showArrows: 'always',
					centerActive: false,
					disabled: false,
					multiple: false,
					mandatory: false,
					modelValue: undefined,
					nextIcon: MDI_ICONS.CHEVRON_RIGHT,
					prevIcon: MDI_ICONS.CHEVRON_LEFT,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-slide-group
							:direction="state.direction"
							:show-arrows="state.showArrows"
							:center-active="state.centerActive"
							:disabled="state.disabled"
							:multiple="state.multiple"
							:mandatory="state.mandatory"
							:next-icon="state.nextIcon || undefined"
							:prev-icon="state.prevIcon || undefined"
							:style="state.direction === DIRECTION.VERTICAL ? hostStyleVertical : hostStyle"
					>
						<div v-for="n in 20" :key="n" class="story-tag">Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Direction">
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Arrows">
					<HstSelect v-model="state.showArrows" title="Show Arrows" :options="SHOW_ARROWS_OPTIONS"/>
					<HstSelect v-model="state.nextIcon"   title="Next Icon"   :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.prevIcon"   title="Prev Icon"   :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Scroll">
					<HstCheckbox v-model="state.centerActive" title="Center Active"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled"  title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Selection">
					<HstCheckbox v-model="state.multiple"  title="Multiple"/>
					<HstCheckbox v-model="state.mandatory" title="Mandatory"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:modelValue">
			<div class="story-shell">
				<origam-slide-group
						v-model="emitModel"
						:style="hostStyle"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<div
							v-for="n in 10"
							:key="n"
							class="story-tag story-tag--clickable"
					>Tag {{ n }}</div>
				</origam-slide-group>
				<p class="story-status">modelValue = {{ emitModel }}</p>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-slide-group :style="hostStyle">
					<div v-for="n in 10" :key="n" class="story-tag story-tag--custom">Custom {{ n }}</div>
				</origam-slide-group>
			</div>
		</Variant>

		<Variant title="Slots - Prev">
			<div class="story-shell">
				<origam-slide-group show-arrows="always" :style="hostStyle">
					<template #prev>
						<button class="story-arrow-btn">&lsaquo; Prev</button>
					</template>
					<div v-for="n in 25" :key="n" class="story-tag">Tag {{ n }}</div>
				</origam-slide-group>
			</div>
		</Variant>

		<Variant title="Slots - Next">
			<div class="story-shell">
				<origam-slide-group show-arrows="always" :style="hostStyle">
					<template #next>
						<button class="story-arrow-btn">Next &rsaquo;</button>
					</template>
					<div v-for="n in 25" :key="n" class="story-tag">Tag {{ n }}</div>
				</origam-slide-group>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISlideGroupProps>({
					direction: DIRECTION.HORIZONTAL,
					showArrows: 'always',
					centerActive: false,
					tag: 'div',
					disabled: false,
					multiple: false,
					mandatory: false,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-slide-group
							v-bind="state"
							:style="state.direction === DIRECTION.VERTICAL ? hostStyleVertical : hostStyle"
							@update:model-value="logEvent('update:modelValue', $event)"
					>
						<div v-for="n in 20" :key="n" class="story-tag">Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.rounded"     title="Rounded"      :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.tag"         title="Tag"          :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect   v-model="state.direction"    title="Direction"    :options="DIRECTION_OPTIONS"/>
					<HstSelect   v-model="state.showArrows"   title="Show Arrows"  :options="SHOW_ARROWS_OPTIONS"/>
					<HstCheckbox v-model="state.centerActive" title="Center Active"/>
					<HstCheckbox v-model="state.disabled"     title="Disabled"/>
					<HstCheckbox v-model="state.multiple"     title="Multiple"/>
					<HstCheckbox v-model="state.mandatory"    title="Mandatory"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { type CSSProperties, ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamSlideGroup } from '@origam/components'
	import { DIRECTION, MDI_ICONS } from '@origam/enums'
	import type { IOptions, ISlideGroupProps } from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const DIRECTION_OPTIONS: Array<IOptions<TDirection>> = [
		{ label: 'horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'vertical',   value: DIRECTION.VERTICAL },
	]

	const SHOW_ARROWS_OPTIONS: Array<IOptions<boolean | string>> = [
		{ label: 'true (overflow only)', value: true },
		{ label: 'always',               value: 'always' },
		{ label: 'desktop',              value: 'desktop' },
		{ label: 'mobile',               value: 'mobile' },
		{ label: 'false (never)',        value: false },
	]

	const emitModel = ref<unknown>(null)

	const hostStyle: CSSProperties = {
		width: '100%',
		maxWidth: '480px',
		border: '1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12))',
		borderRadius: '6px',
		padding: '8px',
	}

	const hostStyleVertical: CSSProperties = {
		...hostStyle,
		height: '240px',
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; }

	.story-tag {
		flex: 0 0 auto;
		padding: 8px 14px;
		margin: 0 6px;
		border-radius: 999px;
		background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06));
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		font: 0.875rem/1 system-ui, sans-serif;
		white-space: nowrap;
	}

	.story-tag--clickable { cursor: pointer; }

	.story-tag--custom {
		background: var(--origam-color__surface---raised, rgba(0, 0, 0, 0.04));
		font-style: italic;
	}

	.story-arrow-btn {
		padding: 4px 10px;
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 4px;
		background: transparent;
		cursor: pointer;
		font: 0.875rem/1 system-ui, sans-serif;
	}

	.story-status {
		margin: 0;
		font: 0.8rem/1.4 monospace;
		color: var(--origam-color__text---subtle, rgba(0, 0, 0, 0.6));
	}
</style>

<docs lang="md" src="@docs/components/Slide/OrigamSlideGroup.md"/>
