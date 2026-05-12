<template>
	<Story
			group="components"
			title="Menu/OrigamMenu"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IMenuProps>({
					title: undefined,
					openOnClick: true,
					openOnHover: false,
					closeOnContentClick: true,
					offset: 8
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;" data-cy="menu-playground-host">
					<origam-menu v-bind="state" :items="defaultItems">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Playground" data-cy="menu-playground-activator"/>
						</template>
					</origam-menu>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"               title="title"/>
				<HstCheckbox v-model="state.openOnClick"         title="openOnClick"/>
				<HstCheckbox v-model="state.openOnHover"         title="openOnHover"/>
				<HstCheckbox v-model="state.closeOnContentClick" title="closeOnContentClick"/>
				<HstNumber   v-model="state.offset"              title="offset"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — items (default open)">
			<div style="padding: 24px;" data-cy="menu-default-host">
				<origam-menu :items="defaultItems">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open menu" data-cy="menu-default-activator"/>
					</template>
				</origam-menu>
			</div>
		</Variant>

		<Variant title="Prop — title">
			<div style="padding: 24px;" data-cy="menu-title-host">
				<origam-menu title="Actions" :items="defaultItems">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open titled menu" data-cy="menu-title-activator"/>
					</template>
				</origam-menu>
			</div>
		</Variant>

		<Variant
				title="Prop — openOnHover"
				:init-state="() => useStoryInitState<{ openOnHover: boolean }>({ openOnHover: true })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;" data-cy="menu-hover-host">
					<origam-menu :open-on-hover="state.openOnHover" :open-on-click="!state.openOnHover" :items="defaultItems">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Hover/click me" data-cy="menu-hover-activator"/>
						</template>
					</origam-menu>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.openOnHover" title="openOnHover"/>
			</template>
		</Variant>

		<Variant
				title="Prop — offset"
				:init-state="() => useStoryInitState<{ offset: number }>({ offset: 8 })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;" data-cy="menu-offset-host">
					<origam-menu :offset="state.offset" :items="defaultItems">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Offset menu" data-cy="menu-offset-activator"/>
						</template>
					</origam-menu>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.offset" title="offset"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="padding: 24px;" data-cy="menu-slot-default-host">
				<origam-menu>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Custom content" data-cy="menu-slot-default-activator"/>
					</template>
					<div style="padding: 8px 16px; min-width: 160px;" data-cy="menu-slot-default-content">
						<p style="margin: 0; font-weight: 700;">Custom slot</p>
						<p style="margin: 4px 0 0;">Any markup is fine here.</p>
					</div>
				</origam-menu>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<div style="padding: 24px;" data-cy="menu-emit-host">
				<origam-menu
						:items="defaultItems"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Toggle (watch Events)" data-cy="menu-emit-activator"/>
					</template>
				</origam-menu>
			</div>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamMenu } from '@origam/components'
	import type { IMenuProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultItems = [
		{ title: 'Edit', prependIcon: 'mdi-pencil' },
		{ title: 'Duplicate', prependIcon: 'mdi-content-copy' },
		{ title: 'Delete', prependIcon: 'mdi-delete' }
	]
</script>

<docs lang="md" src="@docs/components/Menu/OrigamMenu.md"/>
