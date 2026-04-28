<template>
	<Story
			group="components"
			title="Icon/OrigamLigatureIcon"
	>
		<!--
			Note: Material Icons / Material Symbols font is NOT loaded in this
			storybook. The ligature name renders as plain text — which is
			the documented fallback behaviour and is still testable.
		-->

		<!-- ════════════ ICON (ligature name) ════════════ -->
		<Variant
				title="Icon (ligature name)"
				:init-state="() => useStoryInitState<{ icon?: string }>({ icon: 'home' })"
		>
			<template #default="{ state }">
				<origam-ligature-icon :icon="state.icon"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.icon" title="icon (ligature name)"/>
			</template>
		</Variant>

		<!-- ════════════ SIZE ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<origam-ligature-icon
						:size="state.size"
						icon="favorite"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: undefined })"
		>
			<template #default="{ state }">
				<origam-ligature-icon
						:tag="state.tag"
						icon="settings"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ ALL SIZES side by side ════════════ -->
		<Variant title="All sizes — side by side">
			<div style="display:flex;gap:16px;align-items:center;">
				<origam-ligature-icon icon="home" size="x-small"/>
				<origam-ligature-icon icon="home" size="small"/>
				<origam-ligature-icon icon="home" size="default"/>
				<origam-ligature-icon icon="home" size="large"/>
				<origam-ligature-icon icon="home" size="x-large"/>
			</div>
		</Variant>

		<!-- ════════════ NUMERIC SIZE ════════════ -->
		<Variant title="Numeric size override">
			<div style="display:flex;gap:16px;align-items:center;">
				<origam-ligature-icon icon="star" :size="16"/>
				<origam-ligature-icon icon="star" :size="24"/>
				<origam-ligature-icon icon="star" :size="40"/>
				<origam-ligature-icon icon="star" :size="64"/>
			</div>
		</Variant>

		<!-- ════════════ COMMON LIGATURE NAMES ════════════ -->
		<Variant title="Common ligature names">
			<div style="display:flex;gap:16px;flex-wrap:wrap;font-size:24px;">
				<origam-ligature-icon icon="home"/>
				<origam-ligature-icon icon="favorite"/>
				<origam-ligature-icon icon="settings"/>
				<origam-ligature-icon icon="account_circle"/>
				<origam-ligature-icon icon="search"/>
				<origam-ligature-icon icon="close"/>
				<origam-ligature-icon icon="menu"/>
				<origam-ligature-icon icon="delete"/>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IIconComponentProps>({
					icon: 'home',
					size: undefined,
					tag: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-ligature-icon v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.icon" title="icon (ligature name)"/>
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
				<HstSelect v-model="state.tag"  title="tag"  :options="tagList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLigatureIcon } from '@origam/components'
	import type { IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'
</script>
