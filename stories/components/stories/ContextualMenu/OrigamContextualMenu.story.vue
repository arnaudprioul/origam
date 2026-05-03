<template>
	<Story
			group="components"
			title="ContextualMenu/OrigamContextualMenu"
	>

		<!-- ════════════ DEFAULT (right-click) ════════════ -->
		<Variant title="Default (right-click)">
			<div style="padding: 32px;" data-cy="contextual-menu-default-host">
				<origam-contextual-menu :items="defaultItems" data-cy="contextual-menu-default">
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-default-zone"
					>
						Right-click this area
					</div>
				</origam-contextual-menu>
			</div>
		</Variant>

		<!-- ════════════ WITH TITLE ════════════ -->
		<Variant title="With title">
			<div style="padding: 32px;" data-cy="contextual-menu-title-host">
				<origam-contextual-menu title="Actions" :items="defaultItems" data-cy="contextual-menu-title">
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-title-zone"
					>
						Right-click for titled menu
					</div>
				</origam-contextual-menu>
			</div>
		</Variant>

		<!-- ════════════ RICH ITEMS ════════════ -->
		<Variant title="Rich items (icons)">
			<div style="padding: 32px;" data-cy="contextual-menu-icons-host">
				<origam-contextual-menu :items="richItems" data-cy="contextual-menu-icons">
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-icons-zone"
					>
						Right-click for icon menu
					</div>
				</origam-contextual-menu>
			</div>
		</Variant>

		<!-- ════════════ SLOT: default (custom content) ════════════ -->
		<Variant title="Slot — default">
			<div style="padding: 32px;" data-cy="contextual-menu-slot-host">
				<origam-contextual-menu data-cy="contextual-menu-slot">
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-slot-zone"
					>
						Right-click for custom content
					</div>
					<template #default>
						<div style="padding: 8px 16px; min-width: 180px;" data-cy="contextual-menu-slot-content">
							<p style="margin: 0; font-weight: 700;">Custom menu</p>
							<p style="margin: 4px 0 0; font-size: 0.875rem;">Any content goes here.</p>
						</div>
					</template>
				</origam-contextual-menu>
			</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<div style="padding: 32px;" data-cy="contextual-menu-emit-host">
				<origam-contextual-menu
						:items="defaultItems"
						data-cy="contextual-menu-emit"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-emit-zone"
					>
						Right-click (watch Events tab)
					</div>
				</origam-contextual-menu>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IContextualMenuProps>({
					title: undefined,
					closeOnContentClick: true
				})"
		>
			<template #default="{ state }">
				<div style="padding: 32px;" data-cy="contextual-menu-playground-host">
					<origam-contextual-menu v-bind="state" :items="defaultItems" data-cy="contextual-menu-playground">
						<div
								style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
								data-cy="contextual-menu-playground-zone"
						>
							Right-click to open menu
						</div>
					</origam-contextual-menu>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"              title="title"/>
				<HstCheckbox v-model="state.closeOnContentClick" title="closeOnContentClick"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamContextualMenu } from '@origam/components'
	import type { IContextualMenuProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultItems = [
		{ title: 'Copy' },
		{ title: 'Paste' },
		{ title: 'Select all' }
	]

	const richItems = [
		{ title: 'Edit', prependIcon: 'mdi-pencil' },
		{ title: 'Duplicate', prependIcon: 'mdi-content-copy' },
		{ title: 'Delete', prependIcon: 'mdi-delete' }
	]
</script>

<docs lang="md" src="@docs/components/ContextualMenu/OrigamContextualMenu.md"/>
