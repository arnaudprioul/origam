<template>
	<Story
			group="components"
			title="ContextualMenu/OrigamContextualMenu"
	>

		<!-- ════════════ DEFAULT (right-click) ════════════ -->
		<!--
			With `activator="cursor"` the trigger is `document.body` —
			right-clicking anywhere opens the menu. The visual hint `<div>`
			is therefore a SIBLING of `<origam-contextual-menu>`, not a
			child: passing it as a default slot child would override the
			`<origam-list :items>` rendering inside `<origam-menu>` and
			the menu would render an empty popup (now that the wrapper
			forwards slots properly).
		-->
		<Variant title="Default (right-click)">
			<div style="padding: 32px;" data-cy="contextual-menu-default-host">
				<div
						style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
						data-cy="contextual-menu-default-zone"
				>
					Right-click anywhere
				</div>
				<origam-contextual-menu :items="defaultItems" data-cy="contextual-menu-default"/>
			</div>
		</Variant>

		<!-- ════════════ WITH TITLE ════════════ -->
		<Variant title="With title">
			<div style="padding: 32px;" data-cy="contextual-menu-title-host">
				<div
						style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
						data-cy="contextual-menu-title-zone"
				>
					Right-click for titled menu
				</div>
				<origam-contextual-menu title="Actions" :items="defaultItems" data-cy="contextual-menu-title"/>
			</div>
		</Variant>

		<!-- ════════════ RICH ITEMS ════════════ -->
		<Variant title="Rich items (icons)">
			<div style="padding: 32px;" data-cy="contextual-menu-icons-host">
				<div
						style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
						data-cy="contextual-menu-icons-zone"
				>
					Right-click for icon menu
				</div>
				<origam-contextual-menu :items="richItems" data-cy="contextual-menu-icons"/>
			</div>
		</Variant>

		<!-- ════════════ SLOT: default (custom content) ════════════ -->
		<!--
			`activator="cursor"` resolves to `document.body` (see
			`getTargetActivator` in src/utils/Commons/activator.util.ts) so
			right-clicking ANYWHERE on the page opens the menu. The
			visual hint `<div>` therefore lives as a sibling of
			`<origam-contextual-menu>` — passing it as a default-slot child
			would conflict with `<template #default>` and Vue would drop
			one of them with the "Extraneous children found when component
			already has explicitly named default slot" warning.
		-->
		<Variant title="Slot — default">
			<div style="padding: 32px;" data-cy="contextual-menu-slot-host">
				<div
						style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
						data-cy="contextual-menu-slot-zone"
				>
					Right-click anywhere for custom content
				</div>
				<origam-contextual-menu data-cy="contextual-menu-slot">
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
				<div
						style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
						data-cy="contextual-menu-emit-zone"
				>
					Right-click (watch Events tab)
				</div>
				<origam-contextual-menu
						:items="defaultItems"
						data-cy="contextual-menu-emit"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
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
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-playground-zone"
					>
						Right-click to open menu
					</div>
					<origam-contextual-menu v-bind="state" :items="defaultItems" data-cy="contextual-menu-playground"/>
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
