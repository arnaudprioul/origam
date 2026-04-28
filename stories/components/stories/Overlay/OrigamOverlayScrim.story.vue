<template>
	<Story
			group="components"
			title="Overlay/OrigamOverlayScrim"
	>
		<!-- ════════════ DEFAULT (toggled active) ════════════ -->
		<Variant title="Default">
			<div class="story-host" data-cy="scrim-default-host">
				<origam-btn
						text="Toggle scrim"
						data-cy="scrim-default-toggle"
						@click="defaultActive = !defaultActive"
				/>
				<origam-overlay-scrim
						:active="defaultActive"
						data-cy="scrim-default"
						@click="defaultActive = false"
				/>
			</div>
		</Variant>

		<!-- ════════════ ACTIVE TOGGLE ════════════ -->
		<Variant
				title="Active"
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

		<!-- ════════════ SCRIM COLOR ════════════ -->
		<Variant
				title="Scrim color"
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

		<!-- ════════════ EMITS — click ════════════ -->
		<Variant title="Emits — click">
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

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IOverlayScrimProps>({
					active: false,
					scrim: true
				})"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="scrim-playground-host">
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamBtn, OrigamOverlayScrim } from '@origam/components'
	import type { IOverlayScrimProps } from '@origam/interfaces'
	import { useStoryInitState } from '@stories/composables'

	const defaultActive = ref(false)
	const colorActive = ref(false)
	const emitActive = ref(false)
	const clickCount = ref(0)

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
