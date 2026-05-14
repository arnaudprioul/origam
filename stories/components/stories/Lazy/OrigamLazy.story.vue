<template>
	<Story
			group="components"
			title="Lazy/OrigamLazy"
	>
		<!--
			Playground — first by convention. Exposes every prop knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					height?: number
					tag?: string
				}>({
					height: 120,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<div style="height: 500px; overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); padding: 16px; border-radius: 4px;">
					<p style="margin-bottom: 300px; opacity: 0.5;">Scroll down to reveal.</p>
					<origam-lazy
							:height="state.height"
							:tag="state.tag"
					>
						<div style="padding: 16px; background: var(--origam-color__surface---default, #f5f5f5); border-radius: 4px; font-weight: bold;">
							Lazy content!
						</div>
					</origam-lazy>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.height" title="height (px)" :min="40"/>
				<HstText   v-model="state.tag"    title="tag"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — height (scroll to reveal)">
			<div style="height: 600px; overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); padding: 16px; border-radius: 4px;">
				<p style="margin-bottom: 400px; opacity: 0.5;">Scroll down to reveal the lazy content below.</p>
				<origam-lazy height="100">
					<div style="padding: 16px; background: var(--origam-color__surface---default, #f5f5f5); border-radius: 4px; font-weight: bold;">
						Lazy content revealed!
					</div>
				</origam-lazy>
			</div>
		</Variant>

		<Variant title="Prop — modelValue (controlled)">
			<div style="display: flex; gap: 16px; align-items: flex-start;">
				<origam-lazy v-model="isVisible" height="80">
					<div style="padding: 16px; background: var(--origam-color__surface---default, #f5f5f5); border-radius: 4px;">
						Content is visible: {{ isVisible }}
					</div>
				</origam-lazy>
				<origam-btn text="Toggle" @click="isVisible = !isVisible"/>
			</div>
		</Variant>

		<Variant title="Prop — options (intersection margin)">
			<div style="height: 500px; overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); padding: 16px; border-radius: 4px;">
				<p style="margin-bottom: 300px; opacity: 0.5;">Scroll — triggers 200px before entering viewport.</p>
				<origam-lazy :options="{ rootMargin: '200px' }" height="100">
					<div style="padding: 16px; background: var(--origam-color__surface---default, #f5f5f5); border-radius: 4px; font-weight: bold;">
						Revealed with 200px margin!
					</div>
				</origam-lazy>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-lazy v-model="isVisible2" height="100">
				<div style="padding: 16px; border-radius: 4px; border: 2px dashed var(--origam-color__border---default, #ccc);">
					Custom lazy slot content
				</div>
			</origam-lazy>
			<origam-btn style="margin-top: 8px;" text="Reveal" @click="isVisible2 = true"/>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<div style="height: 400px; overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); padding: 16px; border-radius: 4px;">
				<p style="margin-bottom: 200px; opacity: 0.5;">Scroll down to trigger the emit.</p>
				<origam-lazy
						height="100"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<div style="padding: 16px; background: var(--origam-color__surface---default, #f5f5f5); border-radius: 4px;">
						Lazy emit fired!
					</div>
				</origam-lazy>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamBtn, OrigamLazy } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const isVisible = ref(false)
	const isVisible2 = ref(false)
</script>

<docs lang="md" src="@docs/components/Lazy/OrigamLazy.md"/>
