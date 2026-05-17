<template>
	<Story
			group="components"
			title="Overlay/OrigamOverlay"
	>
		<!--
			Playground — first by convention. Exposes every IOverlayProps knob.
		-->
		<Variant
				title="Default"
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
						style="position: relative; height: 280px; border: 1px dashed var(--origam-color__border---subtle, #ccc);"
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

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — activator">
			<div class="story-host" data-cy="overlay-slot-activator-host">
				<origam-overlay v-model="slotActivatorOpen">
					<template #activator="{ props: activator }">
						<origam-btn
								v-bind="activator"
								color="primary"
								text="Custom activator slot"
								data-cy="overlay-slot-activator-btn"
						/>
					</template>
					<origam-sheet
							rounded
							elevation="8"
							style="padding: 24px;"
							data-cy="overlay-slot-activator-content"
					>
						<span>Custom slot content</span>
						<origam-btn text="Close" @click="slotActivatorOpen = false"/>
					</origam-sheet>
				</origam-overlay>
			</div>
		</Variant>

		<Variant title="Slot — default">
			<div class="story-host" data-cy="overlay-slot-default-host">
				<origam-overlay v-model="slotDefaultOpen">
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open default slot" data-cy="overlay-slot-default-activator"/>
					</template>
					<template #default>
						<origam-sheet
								rounded
								elevation="8"
								style="padding: 24px;"
								data-cy="overlay-slot-default-content"
						>
							<span>Custom slot content</span>
							<origam-btn text="Close" @click="slotDefaultOpen = false"/>
						</origam-sheet>
					</template>
				</origam-overlay>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — afterEnter">
			<div class="story-host" data-cy="overlay-emit-after-enter-host">
				<origam-overlay
						v-model="emitAfterEnterOpen"
						@afterEnter="logEvent('afterEnter', $event)"
				>
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open (afterEnter)" data-cy="overlay-emit-after-enter-activator"/>
					</template>
					<origam-sheet rounded elevation="8" style="padding: 24px;" data-cy="overlay-emit-after-enter-content">
						<origam-btn text="Close" @click="emitAfterEnterOpen = false"/>
					</origam-sheet>
				</origam-overlay>
			</div>
		</Variant>

		<Variant title="Emit — afterLeave">
			<div class="story-host" data-cy="overlay-emit-after-leave-host">
				<origam-overlay
						v-model="emitAfterLeaveOpen"
						@afterLeave="logEvent('afterLeave', $event)"
				>
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open (afterLeave)" data-cy="overlay-emit-after-leave-activator"/>
					</template>
					<origam-sheet rounded elevation="8" style="padding: 24px;" data-cy="overlay-emit-after-leave-content">
						<origam-btn text="Close" @click="emitAfterLeaveOpen = false"/>
					</origam-sheet>
				</origam-overlay>
			</div>
		</Variant>

		<Variant title="Emit — click:outside">
			<div class="story-host" data-cy="overlay-emit-click-outside-host">
				<origam-overlay
						v-model="emitClickOutsideOpen"
						@click:outside="logEvent('click:outside', $event)"
				>
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open (click outside)" data-cy="overlay-emit-click-outside-activator"/>
					</template>
					<origam-sheet rounded elevation="8" style="padding: 24px;" data-cy="overlay-emit-click-outside-content">
						Click outside to trigger the emit.
					</origam-sheet>
				</origam-overlay>
			</div>
		</Variant>

		<Variant title="Emit — keydown">
			<div class="story-host" data-cy="overlay-emit-keydown-host">
				<origam-overlay
						v-model="emitKeydownOpen"
						@keydown="logEvent('keydown', $event)"
				>
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open (keydown)" data-cy="overlay-emit-keydown-activator"/>
					</template>
					<origam-sheet rounded elevation="8" style="padding: 24px;" data-cy="overlay-emit-keydown-content">
						Press any key inside the overlay.
						<origam-btn text="Close" @click="emitKeydownOpen = false"/>
					</origam-sheet>
				</origam-overlay>
			</div>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<div class="story-host" data-cy="overlay-emit-update-host">
				<origam-overlay
						v-model="emitUpdateOpen"
						@update:modelValue="logEvent('update:modelValue', $event)"
				>
					<template #activator="{ props: activator }">
						<origam-btn v-bind="activator" text="Open (update:modelValue)" data-cy="overlay-emit-update-activator"/>
					</template>
					<origam-sheet rounded elevation="8" style="padding: 24px;" data-cy="overlay-emit-update-content">
						<origam-btn text="Close" @click="emitUpdateOpen = false"/>
					</origam-sheet>
				</origam-overlay>
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

	import { OrigamBtn, OrigamOverlay, OrigamSheet } from '@origam/components'
	import type { IOverlayProps } from '@origam/interfaces'
	import { useStoryInitState } from '@stories/composables'

	const scrimOpen = ref(false)
	const persistentOpen = ref(false)
	const disabledOpen = ref(false)
	const containedOpen = ref(false)
	const zIndexOpen = ref(false)
	const playgroundOpen = ref(false)
	const slotActivatorOpen = ref(false)
	const slotDefaultOpen = ref(false)
	const emitAfterEnterOpen = ref(false)
	const emitAfterLeaveOpen = ref(false)
	const emitClickOutsideOpen = ref(false)
	const emitKeydownOpen = ref(false)
	const emitUpdateOpen = ref(false)

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
