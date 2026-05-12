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
				<HstText   v-model="state.icon" title="icon (ligature name)"/>
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
				<HstText v-model="state.icon" title="icon (ligature name)"/>
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
	import type { IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Icon/OrigamLigatureIcon.md"/>
