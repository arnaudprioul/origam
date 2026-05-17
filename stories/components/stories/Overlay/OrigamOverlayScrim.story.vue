<template>
	<Story
			group="components"
			title="Overlay/OrigamOverlayScrim"
	>
		<!--
			Playground — first by convention. Exposes every IOverlayScrimProps knob.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IOverlayScrimProps>({
					active: false,
					scrim: true
				})"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="scrim-playground-host">
					<origam-btn
							text="Toggle scrim"
							data-cy="scrim-playground-toggle"
							@click="state.active = !state.active"
					/>
					<origam-overlay-scrim
							v-bind="state"
							data-cy="scrim-playground"
							@click="state.active = false"
					/>
					<span data-cy="scrim-playground-state">active={{ state.active }} | scrim={{ String(state.scrim) }}</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active" title="active"/>
				<HstSelect
						v-model="state.scrim"
						title="scrim"
						:options="scrimColorList"
				/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<{ active: boolean }>({ active: false })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="scrim-active-host">
					<origam-overlay-scrim
							:active="state.active"
							data-cy="scrim-active"
					/>
					<span data-cy="scrim-active-label">active={{ state.active }}</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active" title="active"/>
			</template>
		</Variant>

		<Variant
				title="Prop — scrim (color)"
				:init-state="() => useStoryInitState<{ scrim: boolean | string }>({ scrim: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="scrim-color-host">
					<origam-btn
							text="Toggle"
							data-cy="scrim-color-toggle"
							@click="colorActive = !colorActive"
					/>
					<origam-overlay-scrim
							:active="colorActive"
							:scrim="state.scrim"
							data-cy="scrim-color"
							@click="colorActive = false"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.scrim"
						title="scrim"
						:options="scrimColorList"
				/>
			</template>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<div class="story-host" data-cy="scrim-emit-host">
				<origam-btn
						text="Show scrim"
						data-cy="scrim-emit-toggle"
						@click="emitActive = true"
				/>
				<origam-overlay-scrim
						:active="emitActive"
						data-cy="scrim-emit"
						@click="handleClick"
				/>
				<span data-cy="scrim-emit-counter">clicks={{ clickCount }}</span>
			</div>
		</Variant>

		<Variant title="Emit — mouseenter">
			<div class="story-host" data-cy="scrim-emit-mouseenter-host">
				<origam-btn
						text="Show scrim"
						data-cy="scrim-emit-mouseenter-toggle"
						@click="mouseenterActive = true"
				/>
				<origam-overlay-scrim
						:active="mouseenterActive"
						data-cy="scrim-emit-mouseenter"
						@click="mouseenterActive = false"
						@mouseenter="logEvent('mouseenter', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — mouseleave">
			<div class="story-host" data-cy="scrim-emit-mouseleave-host">
				<origam-btn
						text="Show scrim"
						data-cy="scrim-emit-mouseleave-toggle"
						@click="mouseleaveActive = true"
				/>
				<origam-overlay-scrim
						:active="mouseleaveActive"
						data-cy="scrim-emit-mouseleave"
						@click="mouseleaveActive = false"
						@mouseleave="logEvent('mouseleave', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'
	import { OrigamBtn, OrigamOverlayScrim } from '@origam/components'
	import type { IOverlayScrimProps } from '@origam/interfaces'
	import { useStoryInitState } from '@stories/composables'

	const colorActive      = ref(false)
	const emitActive       = ref(false)
	const mouseenterActive = ref(false)
	const mouseleaveActive = ref(false)
	const clickCount       = ref(0)

	const handleClick = () => {
		clickCount.value += 1
		emitActive.value = false
	}

	const scrimColorList = [
		{ label: 'true (default)', value: true },
		{ label: 'false', value: false },
		{ label: 'primary', value: 'primary' },
		{ label: 'rgba blue', value: 'rgba(0, 120, 255, .45)' }
	]
</script>

<style scoped>
	.story-host {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 16px;
		min-height: 80px;
	}
</style>

<docs lang="md" src="@docs/components/Overlay/OrigamOverlayScrim.md"/>
