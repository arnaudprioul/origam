<template>
	<Story
			group="components"
			title="Avatar/OrigamAvatar"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAvatarProps>>({ text: 'AP', bgColor: 'primary', color: 'white' })"
		>
			<template #default="{ state }">
				<origam-avatar
						:text="state.text"
						:image="state.image"
						:icon="state.icon || undefined"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:start="state.start"
						:end="state.end"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.text"  title="Text"/>
					<HstText   v-model="state.image" title="Image (URL)"/>
					<HstSelect v-model="state.icon"  title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.start" title="Start"/>
					<HstCheckbox v-model="state.end"   title="End"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IActiveProps & IBgColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-avatar :bg-color="state.bgColor" :hover="state.hover" :active="state.active" text="AP"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover"  title="Hover"  :options="HOVER_OPTIONS"/>
					<HstSelect v-model="state.active" title="Active" :options="ACTIVE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IAvatarProps>>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-avatar :tag="state.tag" text="AP" bg-color="primary"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:active">
			<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
				<origam-avatar
						tag="button"
						text="AP"
						bg-color="primary"
						@update:active="logEvent('update:active', $event)"
				/>
				<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color__text---secondary);">Click — watch the Events panel.</p>
			</div>
		</Variant>

		<Variant title="Events - update:hover">
			<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
				<origam-avatar
						tag="button"
						text="AP"
						bg-color="primary"
						@update:hover="logEvent('update:hover', $event)"
				/>
				<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color__text---secondary);">Hover — watch the Events panel.</p>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-avatar bg-color="primary">
				<span>Custom slot content</span>
			</origam-avatar>
		</Variant>

		<Variant title="Slots - Avatar">
			<origam-avatar text="AP" bg-color="primary">
				<template #avatar>
					<span>Custom avatar slot</span>
				</template>
			</origam-avatar>
		</Variant>

		<Variant title="Slots - Icon">
			<origam-avatar :icon="accountIcon" bg-color="primary">
				<template #icon>
					<origam-icon :icon="heartIcon"/>
				</template>
			</origam-avatar>
		</Variant>

		<Variant title="Slots - Text">
			<origam-avatar text="AP">
				<template #text>
					<span style="font-style: italic;">Custom</span>
				</template>
			</origam-avatar>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAvatarProps>({ text: 'AP', bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-avatar
						v-bind="state"
						@update:active="logEvent('update:active', $event)"
						@update:hover="logEvent('update:hover', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.text"  title="Text"/>
					<HstText   v-model="state.image" title="Image (URL)"/>
					<HstSelect v-model="state.icon"  title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"      title="Size"      :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect   v-model="state.tag"   title="Tag"   :options="TAG_OPTIONS"/>
					<HstCheckbox v-model="state.start" title="Start"/>
					<HstCheckbox v-model="state.end"   title="End"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IActiveProps,
		IAvatarProps,
		IBgColorProps,
		IHoverProps
	} from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const accountIcon = MDI_ICONS.ACCOUNT
	const heartIcon = MDI_ICONS.HEART
</script>

<docs lang="md" src="@docs/components/Avatar/OrigamAvatar.md"/>
