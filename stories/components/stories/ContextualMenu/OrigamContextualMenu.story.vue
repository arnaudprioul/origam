<template>
	<Story
			group="components"
			title="ContextualMenu/OrigamContextualMenu"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

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
				<HstText     v-model="state.title"               title="title"/>
				<HstCheckbox v-model="state.closeOnContentClick" title="closeOnContentClick"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — items (right-click a zone)">
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

		<Variant title="Prop — title">
			<!-- title displays a header above the menu items -->
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

		<Variant title="Prop — items with icons">
			<!-- Rich items using prependIcon to add visual context to each action -->
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

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default (custom content)">
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

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 32px;" data-cy="contextual-menu-emit-host">
					<div
							style="padding: 32px; border: 2px dashed var(--origam-color-border-subtle, #ccc); text-align: center; border-radius: 8px; cursor: context-menu;"
							data-cy="contextual-menu-emit-zone"
					>
						Right-click to open/close
					</div>
					<origam-contextual-menu
							:items="defaultItems"
							data-cy="contextual-menu-emit"
							@update:model-value="(v: boolean) => {
								state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 6)
							}"
					/>
					<ul v-if="state.log.length" style="font-family: monospace; font-size: 0.8rem; margin: 8px 0 0; padding-left: 16px;">
						<li v-for="(l, i) in state.log" :key="i">{{ l }}</li>
					</ul>
					<p v-else style="font-size: 0.8rem; color: var(--origam-color-text-secondary); margin: 8px 0 0;">Right-click to see events.</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
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
