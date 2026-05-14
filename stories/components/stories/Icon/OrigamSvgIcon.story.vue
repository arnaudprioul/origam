<template>
	<Story
			group="components"
			title="Icon/OrigamSvgIcon"
	>
		<!--
			Playground — first by convention. OrigamSvgIcon renders an inline
			SVG from a path string, array of paths, or opacity tuples.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IIconComponentProps>({
					size: undefined,
					tag: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-svg-icon
						:icon="SVG_PATH_HEART"
						v-bind="state"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
				<HstSelect v-model="state.tag"  title="tag"  :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — icon (single path)"
		>
			<origam-svg-icon :icon="SVG_PATH_HEART"/>
		</Variant>

		<Variant
				title="Prop — icon (multi-path array)"
		>
			<origam-svg-icon :icon="SVG_PATHS_MULTI"/>
		</Variant>

		<Variant
				title="Prop — icon (multi-path with opacity tuples)"
		>
			<origam-svg-icon :icon="SVG_PATHS_OPACITY"/>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-svg-icon :size="state.size" :icon="SVG_PATH_HEART"/>
				</div>
				<div style="display: flex; gap: 16px; align-items: center; margin-top: 16px;">
					<origam-svg-icon :icon="SVG_PATH_STAR" size="x-small"/>
					<origam-svg-icon :icon="SVG_PATH_STAR" size="small"/>
					<origam-svg-icon :icon="SVG_PATH_STAR" size="default"/>
					<origam-svg-icon :icon="SVG_PATH_STAR" size="large"/>
					<origam-svg-icon :icon="SVG_PATH_STAR" size="x-large"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size (numeric override)"
		>
			<div style="display: flex; gap: 16px; align-items: center;">
				<origam-svg-icon :icon="SVG_PATH_HEART" :size="16"/>
				<origam-svg-icon :icon="SVG_PATH_HEART" :size="24"/>
				<origam-svg-icon :icon="SVG_PATH_HEART" :size="40"/>
				<origam-svg-icon :icon="SVG_PATH_HEART" :size="64"/>
			</div>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: undefined })"
		>
			<template #default="{ state }">
				<origam-svg-icon
						:tag="state.tag"
						:icon="SVG_PATH_STAR"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSvgIcon } from '@origam/components'
	import type { IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { sizeList, tagList } from '@stories/const'

	// ── SVG path data (24×24 grid) ──────────────────────────────────────────

	/** Heart path */
	const SVG_PATH_HEART =
		'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

	/** Star path */
	const SVG_PATH_STAR =
		'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'

	/**
	 * Two-path example: check circle outline + inner check mark.
	 * Both paths are plain strings → opaque fill.
	 */
	const SVG_PATHS_MULTI: string[] = [
		'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
		'M10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z',
	]

	/**
	 * Two-path example with per-path opacity tuples:
	 * - first path at 30% opacity (background circle)
	 * - second path at 100% (foreground check)
	 */
	const SVG_PATHS_OPACITY: Array<string | [string, number]> = [
		['M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', 0.3],
		'M10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z',
	]
</script>

<docs lang="md" src="@docs/components/Icon/OrigamSvgIcon.md"/>
