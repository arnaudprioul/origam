<template>
	<Story
			group="components"
			title="Icon/OrigamClassIcon"
	>
		<!--
			Playground — first by convention. OrigamClassIcon is the leaf
			that applies MDI class strings directly to the DOM element.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IIconComponentProps>({
					icon: MDI_HOME,
					size: undefined,
					tag: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-class-icon v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.icon" title="icon" :options="iconClassList"/>
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
				<HstSelect v-model="state.tag"  title="tag"  :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — icon (class string)"
				:init-state="() => useStoryInitState<{ icon?: string }>({ icon: MDI_HOME })"
		>
			<template #default="{ state }">
				<origam-class-icon :icon="state.icon"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.icon" title="icon" :options="iconClassList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-class-icon :size="state.size" :icon="MDI_HEART"/>
				</div>
				<div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
					<origam-class-icon :icon="MDI_COG" size="x-small"/>
					<origam-class-icon :icon="MDI_COG" size="small"/>
					<origam-class-icon :icon="MDI_COG" size="default"/>
					<origam-class-icon :icon="MDI_COG" size="large"/>
					<origam-class-icon :icon="MDI_COG" size="x-large"/>
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
				<origam-class-icon
						:tag="state.tag"
						:icon="MDI_STAR"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<Variant title="Prop — size (numeric override)">
			<div style="display: flex; gap: 16px; align-items: center;">
				<origam-class-icon :icon="MDI_BELL" :size="16"/>
				<origam-class-icon :icon="MDI_BELL" :size="24"/>
				<origam-class-icon :icon="MDI_BELL" :size="40"/>
				<origam-class-icon :icon="MDI_BELL" :size="64"/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamClassIcon } from '@origam/components'
	import type { IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'

	// OrigamClassIcon is the leaf component that applies icon names as CSS
	// classes. It expects the CSS class string directly (e.g. "mdi mdi-home"),
	// not the set-prefixed enum format ("mdi:mdi-home") used by the OrigamIcon
	// dispatcher. The dispatcher strips the prefix via useIcon(); here we must
	// provide the resolved class names.
	const MDI_HOME  = 'mdi mdi-home'
	const MDI_HEART = 'mdi mdi-heart'
	const MDI_STAR  = 'mdi mdi-star'
	const MDI_COG   = 'mdi mdi-cog'
	const MDI_BELL  = 'mdi mdi-bell'

	const iconClassList = [
		{ label: '(none)',   value: undefined   },
		{ label: 'Home',     value: MDI_HOME    },
		{ label: 'Heart',    value: MDI_HEART   },
		{ label: 'Star',     value: MDI_STAR    },
		{ label: 'Cog',      value: MDI_COG     },
		{ label: 'Bell',     value: MDI_BELL    },
		{ label: 'Account',  value: 'mdi mdi-account'  },
		{ label: 'Close',    value: 'mdi mdi-close'    },
		{ label: 'Check',    value: 'mdi mdi-check'    },
		{ label: 'Alert',    value: 'mdi mdi-alert'    },
		{ label: 'Menu',     value: 'mdi mdi-menu'     },
	]
</script>

<docs lang="md" src="@docs/components/Icon/OrigamClassIcon.md"/>
