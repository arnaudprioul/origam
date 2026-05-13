<template>
	<Story
			group="components"
			title="Grids/OrigamSpacer"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ISpacerProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISpacerProps>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<div class="demo-flex-row">
					<span class="demo-cell">left</span>
					<origam-spacer v-bind="state"/>
					<span class="demo-cell">right</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — tag">
			<div class="demo-flex-row">
				<span class="demo-cell">left</span>
				<origam-spacer/>
				<span class="demo-cell">right</span>
			</div>
		</Variant>

		<Variant
				title="Prop — flex-grow (CSS var override)"
				:init-state="() => useStoryInitState<{ growA?: number, growB?: number }>({ growA: 1, growB: 2 })"
		>
			<template #default="{ state }">
				<div class="demo-flex-row">
					<span class="demo-cell">A</span>
					<origam-spacer :style="{ '--origam-spacer---flex-grow': state.growA }"/>
					<span class="demo-cell">B</span>
					<origam-spacer :style="{ '--origam-spacer---flex-grow': state.growB }"/>
					<span class="demo-cell">C</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.growA" title="grow (first spacer)"/>
				<HstNumber v-model="state.growB" title="grow (second spacer)"/>
			</template>
		</Variant>

		<Variant title="Prop — multiple spacers">
			<div class="demo-flex-row">
				<span class="demo-cell">A</span>
				<origam-spacer/>
				<span class="demo-cell">B</span>
				<origam-spacer/>
				<span class="demo-cell">C</span>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (rare)">
			<div class="demo-flex-row">
				<span class="demo-cell">left</span>
				<origam-spacer>
					<span style="opacity: 0.5; padding: 0 8px;">spacer with slot</span>
				</origam-spacer>
				<span class="demo-cell">right</span>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSpacer } from '@origam/components'
	import type { ISpacerProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'
</script>

<style scoped>
	.demo-flex-row {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 12px;
		background: var(--origam-color__surface---overlay, #ececec);
		border-radius: 4px;
	}

	.demo-cell {
		padding: 8px 12px;
		background: var(--origam-color__surface---default, #fff);
		border: 1px solid var(--origam-color__border---default, #e5e5e5);
		border-radius: 4px;
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamSpacer.md"/>
