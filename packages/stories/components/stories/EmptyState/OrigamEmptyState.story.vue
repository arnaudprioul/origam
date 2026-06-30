<template>
	<Story
			group="components"
			title="EmptyState/OrigamEmptyState"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<IEmptyStateProps>({
					preset: 'no-data',
					title: 'No items yet',
					description: 'Create your first item to get started.',
					size: 'md',
					align: 'center'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-empty-state
							:preset="state.preset"
							:size="state.size"
							:align="state.align"
							:icon-color="state.iconColor"
							:icon="state.icon || undefined"
							:title="state.title"
							:description="state.description"
							:font-family="state.fontFamily"
							:font-size="state.fontSize"
							:font-weight="state.fontWeight"
							:line-height="state.lineHeight"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Preset">
					<HstSelect v-model="state.preset" title="Preset" :options="PRESET_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"  title="Size"  :options="EMPTY_SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontFamily" title="Font Family" :options="FONT_FAMILY_OPTIONS"/>
					<HstSelect v-model="state.fontSize"   title="Font Size"   :options="FONT_SIZE_OPTIONS"/>
					<HstSelect v-model="state.fontWeight" title="Font Weight" :options="FONT_WEIGHT_OPTIONS"/>
					<HstSelect v-model="state.lineHeight" title="Line Height" :options="LINE_HEIGHT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Align">
					<HstSelect v-model="state.align" title="Align" :options="EMPTY_ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icon Color">
					<HstSelect v-model="state.iconColor" title="Icon Color" :options="INTENT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icon Override">
					<HstSelect v-model="state.icon" title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IEmptyStateProps>({
					preset: 'no-data',
					title: 'No items yet',
					description: 'Create your first item to get started.',
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-empty-state
							:preset="state.preset"
							:tag="state.tag"
							:title="state.title"
							:description="state.description"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title"       title="Title"/>
					<HstText v-model="state.description" title="Description"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Icon">
			<div class="story-shell">
				<origam-empty-state
						preset="no-results"
						title="No results found"
						description="Try a different keyword or broaden the filters."
				>
					<template #icon>
						<svg
								class="story-illustration"
								viewBox="0 0 64 64"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
						>
							<circle cx="28" cy="28" r="18"/>
							<line x1="42" y1="42" x2="56" y2="56"/>
							<line x1="20" y1="28" x2="36" y2="28"/>
						</svg>
					</template>
				</origam-empty-state>
			</div>
		</Variant>

		<Variant title="Slots - Title">
			<div class="story-shell">
				<origam-empty-state
						preset="no-data"
						description="Create your first item to get started."
				>
					<template #title>
						<strong>Custom <em>title</em> markup</strong>
					</template>
				</origam-empty-state>
			</div>
		</Variant>

		<Variant title="Slots - Description">
			<div class="story-shell">
				<origam-empty-state
						preset="no-data"
						title="No items yet"
				>
					<template #description>
						<span>Custom <strong>description</strong> with rich markup.</span>
					</template>
				</origam-empty-state>
			</div>
		</Variant>

		<Variant title="Slots - Actions">
			<div class="story-shell">
				<div class="story-col">
					<strong>1 action</strong>
					<origam-empty-state
							preset="no-data"
							title="No projects yet"
							description="Create a project to start tracking work."
					>
						<template #actions>
							<origam-btn @click="noop">Create project</origam-btn>
						</template>
					</origam-empty-state>
				</div>

				<div class="story-col">
					<strong>2 actions</strong>
					<origam-empty-state
							preset="no-data"
							title="No projects yet"
							description="Create a new project or import from a CSV."
					>
						<template #actions>
							<origam-btn @click="noop">Create project</origam-btn>
							<origam-btn @click="noop">Import CSV</origam-btn>
						</template>
					</origam-empty-state>
				</div>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-empty-state preset="no-data">
					<div class="story-custom">
						<span class="story-custom__eyebrow">Inbox zero</span>
						<h3 class="story-custom__title">All caught up.</h3>
						<p class="story-custom__body">
							You have read every message in this conversation thread.
						</p>
					</div>
				</origam-empty-state>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IEmptyStateProps>({
					preset: 'no-data',
					title: 'No items yet',
					description: 'Create your first item to get started.',
					size: 'md',
					align: 'center'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-empty-state v-bind="state"/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.title"       title="Title"/>
					<HstText   v-model="state.description" title="Description"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.preset"    title="Preset"     :options="PRESET_OPTIONS"/>
					<HstSelect v-model="state.size"      title="Size"       :options="EMPTY_SIZE_OPTIONS"/>
					<HstSelect v-model="state.align"     title="Align"      :options="EMPTY_ALIGN_OPTIONS"/>
					<HstSelect v-model="state.iconColor" title="Icon Color" :options="INTENT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
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
	import { OrigamBtn, OrigamEmptyState } from '@origam/components'
	import { EMPTY_STATE_ALIGNS, EMPTY_STATE_PRESETS, EMPTY_STATE_SIZES } from '@origam/consts'
	import type { IEmptyStateProps, IOptions } from '@origam/interfaces'
	import type { TEmptyStateAlign, TEmptyStatePreset, TEmptyStateSize } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		FONT_FAMILY_OPTIONS,
		FONT_SIZE_OPTIONS,
		FONT_WEIGHT_OPTIONS,
		ICON_OPTIONS,
		INTENT_OPTIONS,
		LINE_HEIGHT_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const PRESET_OPTIONS: Array<IOptions<TEmptyStatePreset>> = EMPTY_STATE_PRESETS.map(v => ({ label: v, value: v }))
	const EMPTY_SIZE_OPTIONS: Array<IOptions<TEmptyStateSize>> = EMPTY_STATE_SIZES.map(v => ({ label: v, value: v }))
	const EMPTY_ALIGN_OPTIONS: Array<IOptions<TEmptyStateAlign>> = EMPTY_STATE_ALIGNS.map(v => ({ label: v, value: v }))

	const noop = () => {}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding: 16px;
		max-width: 760px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col > strong {
		font: 0.75rem/1 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.story-illustration {
		width: 64px;
		height: 64px;
		color: var(--origam-color__action--primary---bg, #7c3aed);
	}

	.story-custom {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 24px;
		border-radius: 12px;
		background: var(--origam-color__surface---subtle, #f5f5f5);
		text-align: left;
	}

	.story-custom__eyebrow {
		font: 600 0.75rem/1 system-ui, sans-serif;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--origam-color__action--primary---bg, #7c3aed);
	}

	.story-custom__title {
		margin: 0;
		font: 600 1.25rem/1.3 system-ui, sans-serif;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-custom__body {
		margin: 0;
		font: 0.875rem/1.5 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #525252);
	}
</style>

<docs lang="md" src="@docs/components/EmptyState/OrigamEmptyState.md"/>
