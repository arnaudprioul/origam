<template>
	<Story
			group="components"
			title="Parallax/OrigamParallaxElement"
	>

		<!-- ════════════ TYPE (translate / rotate / scale / depth / …) ════════════ -->
		<Variant
				title="Type"
				:init-state="() => useStoryInitState<{ type?: TParallaxElementType }>({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE })"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element :type="state.type" :strength="state.type === 'rotate' ? 8 : state.type === 'scale' || state.type?.startsWith('scale') ? 0.1 : 30">
						<div :style="layerStyle">type={{ state.type }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type" title="type" :options="parallaxElementTypeList"/>
			</template>
		</Variant>

		<!-- ════════════ STRENGTH ════════════ -->
		<Variant
				title="Strength"
				:init-state="() => useStoryInitState<{ strength?: number }>({ strength: 30 })"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element :strength="state.strength">
						<div :style="layerStyle">strength={{ state.strength }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.strength" title="strength"/>
			</template>
		</Variant>

		<!-- ════════════ AXIS ════════════ -->
		<Variant
				title="Axis"
				:init-state="() => useStoryInitState<{ axis?: TAxis }>({ axis: undefined })"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element :axis="state.axis" :strength="40">
						<div :style="layerStyle">axis={{ state.axis ?? '(both)' }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.axis" title="axis" :options="axisList"/>
			</template>
		</Variant>

		<!-- ════════════ ORIGIN (transformOrigin / originX / originY) ════════════ -->
		<Variant
				title="Origin"
				:init-state="() => useStoryInitState<{ transformOrigin?: TAnchor, originX?: number, originY?: number }>({
					transformOrigin: 'center',
					originX: 50,
					originY: 50
				})"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element
							:transform-origin="state.transformOrigin"
							:origin-x="state.originX"
							:origin-y="state.originY"
							:strength="30"
					>
						<div :style="layerStyle">origin</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.transformOrigin" title="transformOrigin (CSS)"/>
				<HstNumber v-model="state.originX"         title="originX (0-100)"/>
				<HstNumber v-model="state.originY"         title="originY (0-100)"/>
			</template>
		</Variant>

		<!-- ════════════ CLAMPING (min / max X & Y) ════════════ -->
		<Variant
				title="Clamping"
				:init-state="() => useStoryInitState<{ minX?: number, maxX?: number, minY?: number, maxY?: number }>({
					minX: -20,
					maxX: 20,
					minY: -10,
					maxY: 10
				})"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element v-bind="state" :strength="80">
						<div :style="layerStyle">clamped</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.minX" title="minX"/>
				<HstNumber v-model="state.maxX" title="maxX"/>
				<HstNumber v-model="state.minY" title="minY"/>
				<HstNumber v-model="state.maxY" title="maxY"/>
			</template>
		</Variant>

		<!-- ════════════ CYCLIC MODE ════════════ -->
		<Variant
				title="Cycle"
				:init-state="() => useStoryInitState<{ cycle?: number }>({ cycle: 2 })"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element :cycle="state.cycle" :strength="30">
						<div :style="layerStyle">cycle={{ state.cycle }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.cycle" title="cycle (count)"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element :tag="state.tag" :strength="20">
						<div :style="layerStyle">tag={{ state.tag }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-parallax :style="hostStyle">
				<origam-parallax-element :strength="30">
					<strong :style="layerStyle">Custom slot content</strong>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IParallaxElementProps>({
					tag: 'div',
					type: PARALLAX_ELEMENT_TYPE.TRANSLATE,
					strength: 30,
					axis: undefined,
					transformOrigin: 'center',
					originX: 50,
					originY: 50,
					cycle: 0,
					audioIndex: 50
				})"
		>
			<template #default="{ state }">
				<origam-parallax :style="hostStyle">
					<origam-parallax-element v-bind="state">
						<div :style="layerStyle">Playground</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag"             title="tag"             :options="tagList"/>
				<HstSelect v-model="state.type"            title="type"            :options="parallaxElementTypeList"/>
				<HstNumber v-model="state.strength"        title="strength"/>
				<HstSelect v-model="state.axis"            title="axis"            :options="axisList"/>
				<HstText   v-model="state.transformOrigin" title="transformOrigin"/>
				<HstNumber v-model="state.originX"         title="originX"/>
				<HstNumber v-model="state.originY"         title="originY"/>
				<HstNumber v-model="state.cycle"           title="cycle"/>
				<HstNumber v-model="state.audioIndex"      title="audioIndex"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import type { CSSProperties } from 'vue'

	import { OrigamParallax, OrigamParallaxElement } from '@origam/components'
	import { AXIS, PARALLAX_ELEMENT_TYPE } from '@origam/enums'
	import type {
		IOptions,
		IParallaxElementProps
	} from '@origam/interfaces'
	import type { TAnchor, TAxis, TParallaxElementType } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'

	/**
	 * Available CSS-transform "shapes" each parallax element can apply.
	 * Mirrors the `PARALLAX_ELEMENT_TYPE` enum.
	 */
	const parallaxElementTypeList: Array<IOptions<TParallaxElementType>> = [
		{ label: '(default — translate)', value: undefined },
		{ label: 'Translate', value: PARALLAX_ELEMENT_TYPE.TRANSLATE },
		{ label: 'Rotate', value: PARALLAX_ELEMENT_TYPE.ROTATE },
		{ label: 'Scale', value: PARALLAX_ELEMENT_TYPE.SCALE },
		{ label: 'Scale X', value: PARALLAX_ELEMENT_TYPE.SCALE_X },
		{ label: 'Scale Y', value: PARALLAX_ELEMENT_TYPE.SCALE_Y },
		{ label: 'Depth (Z translate)', value: PARALLAX_ELEMENT_TYPE.DEPTH },
		{ label: 'Depth — inverted', value: PARALLAX_ELEMENT_TYPE.DEPTH_INV },
		{ label: 'Custom (consumer-driven)', value: PARALLAX_ELEMENT_TYPE.CUSTOM },
	]

	/**
	 * Movement axis. `undefined` = both axes (free 2D motion).
	 */
	const axisList: Array<IOptions<TAxis>> = [
		{ label: '(none — both axes)', value: undefined },
		{ label: 'X', value: AXIS.X },
		{ label: 'Y', value: AXIS.Y },
	]

	const hostStyle: CSSProperties = {
		height: '280px',
		width: '100%',
		background: 'var(--origam-color-surface-overlay)',
	}

	const layerStyle: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		fontWeight: '600',
		color: 'var(--origam-color-text-primary)',
	}
</script>

<docs lang="md" src="@docs/components/Parallax/OrigamParallaxElement.md"/>
