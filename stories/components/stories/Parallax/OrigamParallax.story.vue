<template>
	<Story
			group="components"
			title="Parallax/OrigamParallax"
	>

		<Variant title="Event — Move">
			<origam-parallax :event="PARALLAX_EVENT.MOVE" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Move your cursor ↔</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant title="Event — Scroll">
			<origam-parallax :event="PARALLAX_EVENT.SCROLL" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Scroll the page ↕</div>
				</origam-parallax-element>
			</origam-parallax>
			<div :style="scrollFiller"></div>
		</Variant>

		<Variant title="Event — Orientation">
			<origam-parallax :event="PARALLAX_EVENT.ORIENTATION" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Tilt your device 📱</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant
				title="Event (picker)"
				:init-state="() => useStoryInitState<{ event?: TParallaxEvent }>({ event: PARALLAX_EVENT.MOVE })"
		>
			<template #default="{ state }">
				<origam-parallax :event="state.event" :style="hostStyle">
					<origam-parallax-element :strength="20">
						<div :style="layerStyle">{{ state.event === PARALLAX_EVENT.SCROLL ? 'Scroll the page ↕' : state.event === PARALLAX_EVENT.ORIENTATION ? 'Tilt your device 📱' : 'Move your cursor ↔' }}</div>
					</origam-parallax-element>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.event" title="event" :options="parallaxEventList"/>
			</template>
		</Variant>

		<Variant
				title="Active"
				:init-state="() => useStoryInitState<{ active?: boolean }>({ active: true })"
		>
			<template #default="{ state }">
				<origam-parallax :active="state.active" :style="hostStyle">
					<origam-parallax-element :strength="30">
						<div :style="layerStyle">{{ state.active ? 'Reactive' : 'Frozen' }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active" title="active"/>
			</template>
		</Variant>

		<Variant
				title="Timing"
				:init-state="() => useStoryInitState<{ duration?: number, easing?: string }>({ duration: 1000, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })"
		>
			<template #default="{ state }">
				<origam-parallax v-bind="state" :style="hostStyle">
					<origam-parallax-element :strength="30">
						<div :style="layerStyle">Layer</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.duration" title="duration (ms)"/>
				<HstText   v-model="state.easing"   title="easing (CSS timing-function)"/>
			</template>
		</Variant>

		<Variant
				title="Perspective"
				:init-state="() => useStoryInitState<{ perspective?: number }>({ perspective: 1000 })"
		>
			<template #default="{ state }">
				<origam-parallax :perspective="state.perspective" :style="hostStyle">
					<origam-parallax-element :strength="40" type="depth">
						<div :style="layerStyle">perspective={{ state.perspective }}px</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.perspective" title="perspective (px)"/>
			</template>
		</Variant>

		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-parallax :tag="state.tag" :style="hostStyleShort">
					<origam-parallax-element :strength="20">
						<div :style="layerStyle">tag={{ state.tag }}</div>
					</origam-parallax-element>
				</origam-parallax>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<Variant title="Slot — default">
			<origam-parallax :style="hostStyle">
				<origam-parallax-element :strength="15" type="translate">
					<div :style="{ ...layerStyle, fontSize: '0.875rem', opacity: 0.85 }">Background layer</div>
				</origam-parallax-element>
				<origam-parallax-element :strength="40" type="translate">
					<div :style="layerStyle">Foreground layer</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IParallaxProps>({
					tag: 'div',
					event: PARALLAX_EVENT.MOVE,
					active: true,
					duration: 1000,
					easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
					perspective: 1000
				})"
		>
			<template #default="{ state }">
				<origam-parallax v-bind="state" :style="hostStyle">
					<origam-parallax-element :strength="30">
						<div :style="layerStyle">Playground</div>
					</origam-parallax-element>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.tag"         title="tag"         :options="tagList"/>
				<HstSelect   v-model="state.event"       title="event"       :options="parallaxEventList"/>
				<HstCheckbox v-model="state.active"      title="active"/>
				<HstNumber   v-model="state.duration"    title="duration (ms)"/>
				<HstText     v-model="state.easing"      title="easing"/>
				<HstNumber   v-model="state.perspective" title="perspective (px)"/>
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
	import { PARALLAX_EVENT } from '@origam/enums'
	import type {
		IOptions,
		IParallaxProps
	} from '@origam/interfaces'
	import type { TParallaxEvent } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'

	/**
	 * Parallax event sources. Inlined here because the parallax host is
	 * the only consumer at story level.
	 */
	const parallaxEventList: Array<IOptions<TParallaxEvent>> = [
		{ label: '(default — move)', value: undefined },
		{ label: 'Move (mouse / device-orientation on touch)', value: PARALLAX_EVENT.MOVE },
		{ label: 'Scroll (window scroll)', value: PARALLAX_EVENT.SCROLL },
		{ label: 'Orientation (device-orientation only)', value: PARALLAX_EVENT.ORIENTATION },
	]

	/**
	 * Host style — kept inline (no class wrappers) so we don't introduce
	 * any extra layout context that would interfere with the parallax
	 * `getTargetBox` / `inViewport` measurement at mount time.
	 *
	 * Real photograph as backdrop (Picsum + seed = reproducible) so the
	 * layer translation is visible against a non-flat surface.
	 */
	const hostStyle: CSSProperties = {
		width: '100%',
		height: '320px',
		backgroundImage: "url('https://picsum.photos/seed/origam-parallax/1600/900')",
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}

	const hostStyleShort: CSSProperties = {
		...hostStyle,
		height: '220px',
	}

	const layerStyle: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		fontWeight: '600',
		fontSize: '1.25rem',
		color: '#fff',
		textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
	}

	/**
	 * Filler block placed AFTER the parallax host on Variants where
	 * `event="scroll"` is meaningful. Provides extra page height so the
	 * window scroll listener has somewhere to scroll to without altering
	 * the layout context of the parallax host itself.
	 */
	const scrollFiller: CSSProperties = {
		height: '80vh',
	}
</script>

<docs lang="md" src="@docs/components/Parallax/OrigamParallax.md"/>
