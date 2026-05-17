<template>
	<Story
			group="components"
			title="EmptyState/OrigamEmptyState"
	>
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
				<div
						class="story-shell"
						data-cy="empty-state-playground"
				>
					<origam-empty-state
							v-bind="state"
							data-cy="empty-state-playground-host"
					>
						<template #actions>
							<origam-btn
									data-cy="empty-state-playground-cta"
									@click="noop"
							>
								Create item
							</origam-btn>
						</template>
					</origam-empty-state>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.preset"
						title="preset"
						:options="presetOptions"
				/>
				<HstText
						v-model="state.title"
						title="title"
				/>
				<HstText
						v-model="state.description"
						title="description"
				/>
				<HstSelect
						v-model="state.size"
						title="size"
						:options="sizeOptions"
				/>
				<HstSelect
						v-model="state.align"
						title="align"
						:options="alignOptions"
				/>
				<HstSelect
						v-model="state.iconColor"
						title="iconColor"
						:options="iconColorOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — preset">
			<div
					class="story-shell"
					data-cy="empty-state-presets"
			>
				<div
						v-for="entry in presetSamples"
						:key="entry.preset"
						class="story-col"
				>
					<strong>preset = {{ entry.preset }}</strong>
					<origam-empty-state
							:preset="entry.preset"
							:title="entry.title"
							:description="entry.description"
							:data-cy="`empty-state-preset-${entry.preset}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — size">
			<div
					class="story-shell"
					data-cy="empty-state-sizes"
			>
				<div
						v-for="size in sizes"
						:key="size"
						class="story-col"
				>
					<strong>size = {{ size }}</strong>
					<origam-empty-state
							preset="no-data"
							:size="size"
							title="No items yet"
							description="Create your first item to get started."
							:data-cy="`empty-state-size-${size}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — icon (custom illustration)">
			<div
					class="story-shell"
					data-cy="empty-state-icon-slot"
			>
				<p class="hint">
					Replace the default `OrigamIcon` with any markup — SVG, `&lt;img&gt;`,
					or an inline illustration. The slot inherits the `--icon-color`
					token; SVGs that use `currentColor` will pick it up automatically.
				</p>
				<origam-empty-state
						preset="no-results"
						title="No results found"
						description="Try a different keyword or broaden the filters."
						data-cy="empty-state-icon-slot-host"
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
								data-cy="empty-state-icon-slot-svg"
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

		<Variant title="Slot — actions (1 vs 2 buttons)">
			<div
					class="story-shell"
					data-cy="empty-state-actions-slot"
			>
				<div class="story-col">
					<strong>1 action</strong>
					<origam-empty-state
							preset="no-data"
							title="No projects yet"
							description="Create a project to start tracking work."
							data-cy="empty-state-actions-one"
					>
						<template #actions>
							<origam-btn
									data-cy="empty-state-actions-one-create"
									@click="noop"
							>
								Create project
							</origam-btn>
						</template>
					</origam-empty-state>
				</div>

				<div class="story-col">
					<strong>2 actions</strong>
					<origam-empty-state
							preset="no-data"
							title="No projects yet"
							description="Create a new project or import from a CSV."
							data-cy="empty-state-actions-two"
					>
						<template #actions>
							<origam-btn
									data-cy="empty-state-actions-two-create"
									@click="noop"
							>
								Create project
							</origam-btn>
							<origam-btn
									data-cy="empty-state-actions-two-import"
									@click="noop"
							>
								Import CSV
							</origam-btn>
						</template>
					</origam-empty-state>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — default (fully custom)">
			<div
					class="story-shell"
					data-cy="empty-state-default-slot"
			>
				<p class="hint">
					When the default slot is provided, it replaces the entire
					built-in layout — the consumer regains full control over the
					placeholder markup. The `role="status"` + `aria-live` contract
					still holds on the root.
				</p>
				<origam-empty-state
						preset="no-data"
						data-cy="empty-state-default-slot-host"
				>
					<div
							class="story-custom"
							data-cy="empty-state-default-slot-custom"
					>
						<span class="story-custom__eyebrow">Inbox zero</span>
						<h3 class="story-custom__title">All caught up.</h3>
						<p class="story-custom__body">
							You have read every message in this conversation thread.
						</p>
					</div>
				</origam-empty-state>
			</div>
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

	import type { TEmptyStateAlign, TEmptyStatePreset, TEmptyStateSize, TIntent } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const presetOptions: Array<IOptions<TEmptyStatePreset>> = EMPTY_STATE_PRESETS.map(v => ({label: v, value: v}))
	const sizeOptions: Array<IOptions<TEmptyStateSize>> = EMPTY_STATE_SIZES.map(v => ({label: v, value: v}))
	const alignOptions: Array<IOptions<TEmptyStateAlign>> = EMPTY_STATE_ALIGNS.map(v => ({label: v, value: v}))

	const iconColorIntents: ReadonlyArray<TIntent> = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
	const iconColorOptions: Array<IOptions<TIntent>> = iconColorIntents.map(v => ({label: v, value: v}))

	const sizes: ReadonlyArray<TEmptyStateSize> = EMPTY_STATE_SIZES

	interface IPresetSample {
		preset: TEmptyStatePreset
		title: string
		description: string
	}

	const presetSamples: ReadonlyArray<IPresetSample> = [
		{
			preset: 'no-data',
			title: 'No items yet',
			description: 'Create your first item to get started.'
		},
		{
			preset: 'no-results',
			title: 'No results found',
			description: 'Try a different keyword or broaden the filters.'
		},
		{
			preset: 'error',
			title: 'Something went wrong',
			description: 'We could not load this list. Retry in a few seconds.'
		},
		{
			preset: 'offline',
			title: 'You are offline',
			description: 'Reconnect to refresh this list, or switch to offline mode.'
		},
		{
			preset: 'locked',
			title: 'Locked content',
			description: 'Upgrade your plan or sign in to unlock this section.'
		}
	]

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

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
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
