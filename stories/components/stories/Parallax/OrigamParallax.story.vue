<template>
	<Story
			group="components"
			title="Parallax/OrigamParallax"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IParallaxProps>({
					tag: 'div',
					event: PARALLAX_EVENT.MOVE,
					active: true,
					duration: 1000,
					easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
					perspective: 1000,
					direction: PARALLAX_DIRECTION.VERTICAL,
					speed: 0.5,
					disabled: false,
					threshold: 0
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
				<HstSelect   v-model="state.direction"   title="direction"   :options="parallaxDirectionList"/>
				<HstSelect   v-model="state.easing"      title="easing"      :options="parallaxEasingList"/>
				<HstNumber   v-model="state.speed"       title="speed"       :step="0.1"/>
				<HstNumber   v-model="state.threshold"   title="threshold"   :step="0.1"/>
				<HstCheckbox v-model="state.active"      title="active"/>
				<HstCheckbox v-model="state.disabled"    title="disabled"/>
				<HstNumber   v-model="state.duration"    title="duration (ms)"/>
				<HstNumber   v-model="state.perspective" title="perspective (px)"/>
			</template>
		</Variant>

		<Variant title="Event — Move">
			<origam-parallax :event="PARALLAX_EVENT.MOVE" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Move your cursor</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant title="Event — Scroll">
			<origam-parallax :event="PARALLAX_EVENT.SCROLL" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Scroll the page</div>
				</origam-parallax-element>
			</origam-parallax>
			<div :style="scrollFiller"></div>
		</Variant>

		<Variant title="Event — Orientation">
			<origam-parallax :event="PARALLAX_EVENT.ORIENTATION" :style="hostStyle">
				<origam-parallax-element :strength="20">
					<div :style="layerStyle">Tilt your device</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant
				title="Prop — active"
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
				title="Prop — duration & easing"
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
				title="Prop — perspective"
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
				title="Prop — tag"
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

		<Variant title="Slot — default (layered elements)">
			<origam-parallax :style="hostStyle">
				<origam-parallax-element :strength="15" type="translate">
					<div :style="{ ...layerStyle, fontSize: '0.875rem', opacity: 0.85 }">Background layer</div>
				</origam-parallax-element>
				<origam-parallax-element :strength="40" type="translate">
					<div :style="layerStyle">Foreground layer</div>
				</origam-parallax-element>
			</origam-parallax>
		</Variant>

		<Variant title="Mode — multi-layer (scroll-driven)">
			<origam-parallax :style="hostStyleTall" :event="PARALLAX_EVENT.SCROLL">
				<origam-parallax-layer :speed="0.2">
					<div :style="layerBg">Background — speed 0.2</div>
				</origam-parallax-layer>
				<origam-parallax-layer :speed="0.5">
					<div :style="layerMid">Midground — speed 0.5</div>
				</origam-parallax-layer>
				<origam-parallax-layer :speed="0.8">
					<div :style="layerFg">Foreground — speed 0.8</div>
				</origam-parallax-layer>
			</origam-parallax>
			<div :style="scrollFiller"></div>
		</Variant>

		<Variant
				title="Prop — direction"
				:init-state="() => useStoryInitState<{ direction?: TParallaxDirection }>({ direction: PARALLAX_DIRECTION.VERTICAL })"
		>
			<template #default="{ state }">
				<origam-parallax :direction="state.direction" :style="hostStyleTall">
					<origam-parallax-layer :speed="0.3">
						<div :style="layerBg">Background</div>
					</origam-parallax-layer>
					<origam-parallax-layer :speed="0.7">
						<div :style="layerFg">Foreground — direction={{ state.direction }}</div>
					</origam-parallax-layer>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="parallaxDirectionList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — easing"
				:init-state="() => useStoryInitState<{ easing?: string }>({ easing: PARALLAX_EASING.LINEAR })"
		>
			<template #default="{ state }">
				<origam-parallax :easing="state.easing" :style="hostStyleTall">
					<origam-parallax-layer :speed="0.4">
						<div :style="layerMid">easing = {{ state.easing }}</div>
					</origam-parallax-layer>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.easing" title="easing" :options="parallaxEasingList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — threshold"
				:init-state="() => useStoryInitState<{ threshold?: number }>({ threshold: 0.3 })"
		>
			<template #default="{ state }">
				<div :style="scrollFiller"></div>
				<origam-parallax :threshold="state.threshold" :style="hostStyleTall">
					<origam-parallax-layer :speed="0.5">
						<div :style="layerMid">threshold = {{ state.threshold }} (effect starts when 30% visible)</div>
					</origam-parallax-layer>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.threshold" title="threshold" :step="0.1"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled"
				:init-state="() => useStoryInitState<{ disabled?: boolean }>({ disabled: false })"
		>
			<template #default="{ state }">
				<origam-parallax :disabled="state.disabled" :style="hostStyleTall">
					<origam-parallax-layer :speed="0.5">
						<div :style="layerMid">{{ state.disabled ? 'Disabled — no movement' : 'Active — scrolling' }}</div>
					</origam-parallax-layer>
				</origam-parallax>
				<div :style="scrollFiller"></div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<Variant title="Emit — @enter / @leave">
			<origam-parallax
					:style="hostStyleTall"
					@enter="emitState.enter++"
					@leave="emitState.leave++"
			>
				<origam-parallax-layer :speed="0.4">
					<div :style="layerMid">
						enter: {{ emitState.enter }} — leave: {{ emitState.leave }}
					</div>
				</origam-parallax-layer>
			</origam-parallax>
			<div :style="scrollFiller"></div>
		</Variant>

		<Variant title="Emit — @scroll-progress">
			<origam-parallax
					:style="hostStyleTall"
					@scroll-progress="(p) => emitState.progress = p"
			>
				<origam-parallax-layer :speed="0.5">
					<div :style="layerMid" data-cy="scroll-progress">
						progress = {{ emitState.progress.toFixed(3) }}
					</div>
				</origam-parallax-layer>
			</origam-parallax>
			<div :style="scrollFiller"></div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive, type CSSProperties } from 'vue'

	import { OrigamParallax, OrigamParallaxElement, OrigamParallaxLayer } from '@origam/components'
	import { PARALLAX_DIRECTION, PARALLAX_EASING, PARALLAX_EVENT } from '@origam/enums'
	import type {
		IOptions,
		IParallaxProps
	} from '@origam/interfaces'
	import type { TParallaxDirection, TParallaxEasing, TParallaxEvent } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'

	const parallaxEventList: Array<IOptions<TParallaxEvent>> = [
		{ label: '(default — move)', value: undefined },
		{ label: 'Move (mouse / device-orientation on touch)', value: PARALLAX_EVENT.MOVE },
		{ label: 'Scroll (window scroll)', value: PARALLAX_EVENT.SCROLL },
		{ label: 'Orientation (device-orientation only)', value: PARALLAX_EVENT.ORIENTATION },
	]

	const parallaxDirectionList: Array<IOptions<TParallaxDirection>> = [
		{ label: 'vertical', value: PARALLAX_DIRECTION.VERTICAL },
		{ label: 'horizontal', value: PARALLAX_DIRECTION.HORIZONTAL },
		{ label: 'both (2D mouse-driven)', value: PARALLAX_DIRECTION.BOTH },
	]

	const parallaxEasingList: Array<IOptions<TParallaxEasing | string>> = [
		{ label: 'linear', value: PARALLAX_EASING.LINEAR },
		{ label: 'ease-out', value: PARALLAX_EASING.EASE_OUT },
		{ label: 'spring (lerp-based)', value: PARALLAX_EASING.SPRING },
	]

	const emitState = reactive({
		enter: 0,
		leave: 0,
		progress: 0
	})

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

	const hostStyleTall: CSSProperties = {
		...hostStyle,
		height: '420px',
		backgroundColor: '#222',
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

	const layerBg: CSSProperties = {
		...layerStyle,
		backgroundImage: "url('https://picsum.photos/seed/origam-parallax-bg/1600/900')",
		backgroundSize: 'cover',
		opacity: '0.6',
	}

	const layerMid: CSSProperties = {
		...layerStyle,
		backgroundColor: 'rgba(255, 64, 128, 0.5)',
		fontSize: '1.4rem',
	}

	const layerFg: CSSProperties = {
		...layerStyle,
		backgroundColor: 'rgba(64, 200, 255, 0.4)',
		fontSize: '1.6rem',
	}

	const scrollFiller: CSSProperties = {
		height: '80vh',
	}
</script>

<docs lang="md" src="@docs/components/Parallax/OrigamParallax.md"/>
