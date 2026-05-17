<template>
	<Story
			group="components"
			title="TextMask/OrigamTextMask"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IPlaygroundState>({
					text: 'ORIGAM',
					from: 'primary',
					to: 'success',
					direction: 90,
					animated: true,
					animationType: 'pan',
					animationDuration: '3s',
					fontSize: '6rem',
					fontWeight: 900
				})"
		>
			<template #default="{ state }">
				<div style="padding: 32px; background: var(--origam-color__surface---default);">
					<origam-text-mask
							:text="state.text"
							:background="{ from: state.from, to: state.to, direction: state.direction }"
							:animated="state.animated"
							:animation-type="state.animationType"
							:animation-duration="state.animationDuration"
							:font-size="state.fontSize"
							:font-weight="state.fontWeight"
							data-cy="playground-mask"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.text"              title="text"/>
				<HstSelect v-model="state.from"              title="from"     :options="intentList"/>
				<HstSelect v-model="state.to"                title="to"       :options="intentList"/>
				<HstNumber v-model="state.direction"         title="direction (deg)" :min="0" :max="360" :step="15"/>
				<HstCheckbox v-model="state.animated"        title="animated"/>
				<HstSelect v-model="state.animationType"     title="animationType" :options="animationTypeList"/>
				<HstText   v-model="state.animationDuration" title="animationDuration"/>
				<HstText   v-model="state.fontSize"          title="fontSize"/>
				<HstNumber v-model="state.fontWeight"        title="fontWeight" :min="100" :max="900" :step="100"/>
			</template>
		</Variant>

		<Variant title="Prop — background gradient (IGradient)">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 32px; align-items: flex-start;">
				<origam-text-mask
						text="HELLO WORLD"
						:background="{ from: 'primary', to: 'success', direction: 90 }"
						font-size="5rem"
						font-weight="900"
						data-cy="gradient-mask-1"
				/>
				<origam-text-mask
						text="DESIGN SYSTEM"
						:background="{ from: 'warning', via: 'danger', to: 'primary', direction: 135 }"
						font-size="5rem"
						font-weight="900"
						data-cy="gradient-mask-2"
				/>
				<origam-text-mask
						text="ORIGAM"
						:background="{
							type: 'conic',
							stops: [
								{ color: 'primary', position: 0 },
								{ color: 'success', position: 50 },
								{ color: 'primary', position: 100 }
							]
						}"
						font-size="5rem"
						font-weight="900"
						data-cy="gradient-mask-3"
				/>
			</div>
		</Variant>

		<Variant title="Prop — background preset">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 32px; align-items: flex-start;">
				<origam-text-mask
						text="SUNSET"
						background="gradient-sunset"
						font-size="5rem"
						font-weight="900"
						data-cy="preset-mask-sunset"
				/>
				<origam-text-mask
						text="OCEAN"
						background="gradient-ocean"
						font-size="5rem"
						font-weight="900"
						data-cy="preset-mask-ocean"
				/>
				<origam-text-mask
						text="FOREST"
						background="gradient-forest"
						font-size="5rem"
						font-weight="900"
						data-cy="preset-mask-forest"
				/>
			</div>
		</Variant>

		<Variant title="Prop — raw CSS gradient string">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 32px; align-items: flex-start;">
				<origam-text-mask
						text="VIOLET"
						background="linear-gradient(135deg, #ff0080, #7928ca)"
						font-size="5rem"
						font-weight="900"
						data-cy="raw-mask"
				/>
			</div>
		</Variant>

		<Variant title="Prop — animation type">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 32px; align-items: flex-start;">
				<origam-text-mask
						text="PAN"
						:background="{ from: 'primary', to: 'success', direction: 90 }"
						animated
						animation-type="pan"
						font-size="4rem"
						font-weight="900"
						data-cy="anim-pan"
				/>
				<origam-text-mask
						text="ROTATE"
						:background="{ type: 'conic', stops: [
							{ color: 'primary', position: 0 },
							{ color: 'success', position: 50 },
							{ color: 'primary', position: 100 }
						] }"
						animated
						animation-type="rotate"
						font-size="4rem"
						font-weight="900"
						data-cy="anim-rotate"
				/>
				<origam-text-mask
						text="PULSE"
						:background="{ from: 'warning', to: 'danger', direction: 90 }"
						animated
						animation-type="pulse"
						font-size="4rem"
						font-weight="900"
						data-cy="anim-pulse"
				/>
				<origam-text-mask
						text="ZOOM"
						:background="{ from: 'info', to: 'primary', direction: 135 }"
						animated
						animation-type="zoom"
						font-size="4rem"
						font-weight="900"
						data-cy="anim-zoom"
				/>
			</div>
		</Variant>

		<Variant title="Slot — rich markup">
			<div style="padding: 32px; text-align: center;">
				<origam-text-mask
						:background="{ from: 'primary', via: 'warning', to: 'danger', direction: 135 }"
						animated
						tag="div"
						data-cy="slot-mask"
				>
					<h1 style="font-size: 6rem; font-weight: 900; margin: 0; line-height: 1;">DESIGN</h1>
					<span style="font-size: 2rem; font-weight: 600; display: block; margin-top: 8px;">— system —</span>
				</origam-text-mask>
			</div>
		</Variant>

		<Variant title="prefers-reduced-motion">
			<div style="padding: 32px;">
				<p style="margin-bottom: 16px; color: var(--origam-color__text---secondary);">
					Enable "Reduce Motion" in your OS settings to verify the animation halts.
					DevTools → Rendering → Emulate CSS media feature → prefers-reduced-motion: reduce.
				</p>
				<origam-text-mask
						text="STATIC"
						:background="{ from: 'primary', to: 'success', direction: 90 }"
						animated
						animation-type="pan"
						font-size="5rem"
						font-weight="900"
						data-cy="reduced-motion-mask"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTextMask } from '@origam/components'
	import type { TIntent, TTextMaskAnimation } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	interface IPlaygroundState {
		text: string
		from: TIntent
		to: TIntent
		direction: number
		animated: boolean
		animationType: TTextMaskAnimation
		animationDuration: string
		fontSize: string
		fontWeight: number
	}

	const animationTypeList = [
		{ label: 'Pan',    value: 'pan' },
		{ label: 'Rotate', value: 'rotate' },
		{ label: 'Pulse',  value: 'pulse' },
		{ label: 'Zoom',   value: 'zoom' }
	]
</script>

<docs lang="md" src="@docs/components/TextMask/OrigamTextMask.md"/>
