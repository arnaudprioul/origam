<template>
	<Story
			group="components"
			title="Overlay/OrigamOverlay"
	>
		<!--
			Playground — first by convention. Exposes every IOverlayProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IOverlayProps>({
					modelValue: false,
					scrim: true,
					persistent: false,
					disabled: false,
					contained: false,
					zIndex: 2000
				})"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="overlay-playground-host">
					<origam-overlay v-bind="state" v-model="playgroundOpen">
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Open playground"
									data-cy="overlay-playground-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-playground-content"
						>
							Floating content.
							<origam-btn
									text="Close"
									data-cy="overlay-playground-close"
									@click="playgroundOpen = false"
							/>
						</origam-sheet>
					</origam-overlay>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.scrim"      title="scrim"/>
				<HstCheckbox v-model="state.persistent" title="persistent"/>
				<HstCheckbox v-model="state.disabled"   title="disabled"/>
				<HstCheckbox v-model="state.contained"  title="contained"/>
				<HstNumber   v-model="state.zIndex"     title="zIndex"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — scrim"
				:init-state="() => useStoryInitState<{ scrim: boolean | string }>({ scrim: true })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="overlay-scrim-host">
					<origam-overlay v-model="scrimOpen" :scrim="state.scrim">
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Open scrim variant"
									data-cy="overlay-scrim-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-scrim-content"
						>
							scrim={{ String(state.scrim) }}
							<origam-btn
									text="Close"
									data-cy="overlay-scrim-close"
									@click="scrimOpen = false"
							/>
						</origam-sheet>
					</origam-overlay>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.scrim"
						title="scrim"
						:options="scrimList"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — persistent"
				:init-state="() => useStoryInitState<{ persistent: boolean }>({ persistent: true })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="overlay-persistent-host">
					<origam-overlay
							v-model="persistentOpen"
							:persistent="state.persistent"
					>
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Open persistent"
									data-cy="overlay-persistent-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-persistent-content"
						>
							persistent={{ state.persistent }} — outside-clicks bounce back.
							<origam-btn
									text="Close"
									data-cy="overlay-persistent-close"
									@click="persistentOpen = false"
							/>
						</origam-sheet>
					</origam-overlay>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.persistent" title="persistent"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="overlay-disabled-host">
					<origam-overlay
							v-model="disabledOpen"
							:disabled="state.disabled"
					>
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Try open (disabled)"
									data-cy="overlay-disabled-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-disabled-content"
						>
							You should not see this when disabled is true.
						</origam-sheet>
					</origam-overlay>
					<span data-cy="overlay-disabled-state">open={{ disabledOpen }}</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<Variant
				title="Prop — contained"
				:init-state="() => useStoryInitState<{ contained: boolean }>({ contained: true })"
		>
			<template #default="{ state }">
				<div
						class="story-host story-host--bounded"
						data-cy="overlay-contained-host"
						style="position: relative; height: 280px; border: 1px dashed var(--origam-color-border-subtle, #ccc);"
				>
					<origam-overlay
							v-model="containedOpen"
							:contained="state.contained"
					>
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Open contained"
									data-cy="overlay-contained-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-contained-content"
						>
							contained={{ state.contained }}
							<origam-btn
									text="Close"
									data-cy="overlay-contained-close"
									@click="containedOpen = false"
							/>
						</origam-sheet>
					</origam-overlay>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.contained" title="contained"/>
			</template>
		</Variant>

		<Variant
				title="Prop — zIndex"
				:init-state="() => useStoryInitState<{ zIndex: number }>({ zIndex: 2000 })"
		>
			<template #default="{ state }">
				<div class="story-host" data-cy="overlay-zindex-host">
					<origam-overlay
							v-model="zIndexOpen"
							:z-index="state.zIndex"
					>
						<template #activator="{ props: activator }">
							<origam-btn
									v-bind="activator"
									text="Open z-index"
									data-cy="overlay-zindex-activator"
							/>
						</template>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-zindex-content"
						>
							z-index={{ state.zIndex }}
							<origam-btn
									text="Close"
									data-cy="overlay-zindex-close"
									@click="zIndexOpen = false"
							/>
						</origam-sheet>
					</origam-overlay>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.zIndex" title="zIndex"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamBtn, OrigamOverlay, OrigamSheet } from '@origam/components'
	import type { IOverlayProps } from '@origam/interfaces'
	import { useStoryInitState } from '@stories/composables'

	const scrimOpen = ref(false)
	const persistentOpen = ref(false)
	const disabledOpen = ref(false)
	const containedOpen = ref(false)
	const zIndexOpen = ref(false)
	const playgroundOpen = ref(false)

	const scrimList = [
		{ label: 'true (default)', value: true },
		{ label: 'false (no scrim)', value: false },
		{ label: 'primary', value: 'primary' },
		{ label: 'rgba red', value: 'rgba(255, 0, 80, .4)' }
	]
</script>

<style scoped>
	.story-host {
		display: flex;
		gap: 12px;
		padding: 16px;
	}
	.story-host--bounded {
		display: block;
	}
</style>

<docs lang="md" src="@docs/components/Overlay/OrigamOverlay.md"/>
