<template>
	<Story
			group="components"
			title="Grids/OrigamSpacer"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<ISpacerProps>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<div class="demo-flex-row">
					<span class="demo-cell">left</span>
					<origam-spacer :tag="state.tag"/>
					<span class="demo-cell">right</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="demo-flex-row">
				<span class="demo-cell">left</span>
				<origam-spacer>
					<span class="demo-slot-content">spacer with content</span>
				</origam-spacer>
				<span class="demo-cell">right</span>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISpacerProps>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<div class="demo-flex-row">
					<span class="demo-cell">A</span>
					<origam-spacer v-bind="state"/>
					<span class="demo-cell">B</span>
					<origam-spacer :style="{ '--origam-spacer---flex-grow': 2 }"/>
					<span class="demo-cell">C</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSpacer } from '@origam/components'
	import type { ISpacerProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { TAG_OPTIONS } from '@stories/const'
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

	.demo-slot-content {
		padding: 0 8px;
		opacity: 0.5;
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamSpacer.md"/>
