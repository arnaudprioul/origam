<template>
	<Story
			group="components"
			title="Icon/OrigamLigatureIcon"
	>
		<!--
			Playground — first by convention. OrigamLigatureIcon renders
			a Material Symbols / Material Icons ligature string inside a
			<span> with the appropriate font class.
		-->
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
				<HstSelect v-model="state.icon" title="icon (ligature)" :options="ligatureList"/>
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
				<HstSelect v-model="state.tag"  title="tag"  :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — icon (ligature name)"
				:init-state="() => useStoryInitState<{ icon?: string }>({ icon: 'home' })"
		>
			<template #default="{ state }">
				<origam-ligature-icon :icon="state.icon"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.icon" title="icon (ligature)" :options="ligatureList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-ligature-icon :size="state.size" icon="favorite"/>
				</div>
				<div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
					<origam-ligature-icon icon="home" size="x-small"/>
					<origam-ligature-icon icon="home" size="small"/>
					<origam-ligature-icon icon="home" size="default"/>
					<origam-ligature-icon icon="home" size="large"/>
					<origam-ligature-icon icon="home" size="x-large"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
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

		<Variant title="Prop — size (numeric override)">
			<div style="display: flex; gap: 16px; align-items: center;">
				<origam-ligature-icon icon="star" :size="16"/>
				<origam-ligature-icon icon="star" :size="24"/>
				<origam-ligature-icon icon="star" :size="40"/>
				<origam-ligature-icon icon="star" :size="64"/>
			</div>
		</Variant>

		<Variant title="Prop — icon (common ligature names showcase)">
			<div style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 24px;">
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLigatureIcon } from '@origam/components'
	import type { IIconComponentProps, IOptions, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'

	// Material Symbols / Material Icons font ligatures — these are
	// font-rendered character names, NOT MDI class names. Keep a
	// curated list of the common ones consumers reach for.
	const ligatureList: Array<IOptions<string>> = [
		{ label: 'home',           value: 'home' },
		{ label: 'favorite',       value: 'favorite' },
		{ label: 'settings',       value: 'settings' },
		{ label: 'account_circle', value: 'account_circle' },
		{ label: 'search',         value: 'search' },
		{ label: 'close',          value: 'close' },
		{ label: 'menu',           value: 'menu' },
		{ label: 'delete',         value: 'delete' },
		{ label: 'star',           value: 'star' },
		{ label: 'add',            value: 'add' },
		{ label: 'check',          value: 'check' },
		{ label: 'edit',           value: 'edit' },
		{ label: 'arrow_back',     value: 'arrow_back' },
		{ label: 'arrow_forward',  value: 'arrow_forward' },
		{ label: 'cloud_upload',   value: 'cloud_upload' },
		{ label: 'cloud_download', value: 'cloud_download' },
	]
</script>

<docs lang="md" src="@docs/components/Icon/OrigamLigatureIcon.md"/>
