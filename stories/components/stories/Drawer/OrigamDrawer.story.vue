<template>
	<Story
			group="components"
			title="Drawer/OrigamDrawer"
	>

		<Variant title="Default (permanent)">
			<div style="position: relative; height: 280px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
				<origam-drawer permanent data-cy="drawer-default" style="position: relative; height: 100%;">
					<div style="padding: 16px;">Navigation items here</div>
				</origam-drawer>
				<div style="flex: 1; padding: 16px;">Main content</div>
			</div>
		</Variant>

		<Variant
				title="Temporary"
				:init-state="() => useStoryInitState<{ open: boolean }>({ open: false })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 280px; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-btn
							text="Open Drawer"
							style="margin: 16px;"
							data-cy="drawer-temporary-activator"
							@click="state.open = true"
					/>
					<origam-drawer
							v-model="state.open"
							temporary
							data-cy="drawer-temporary"
					>
						<div style="padding: 16px;">
							<p>Temporary drawer content</p>
							<origam-btn text="Close" data-cy="drawer-temporary-close" @click="state.open = false"/>
						</div>
					</origam-drawer>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.open" title="open"/>
			</template>
		</Variant>

		<Variant
				title="Rail"
				:init-state="() => useStoryInitState<{ rail?: boolean }>({ rail: true })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 280px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-drawer
							:rail="state.rail"
							permanent
							data-cy="drawer-rail"
							style="position: relative; height: 100%;"
					>
						<div style="padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
							<origam-btn :icon="MDI_ICONS.HOME" aria-label="Home"/>
							<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
						</div>
					</origam-drawer>
					<div style="flex: 1; padding: 16px;">Main content</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.rail" title="rail"/>
			</template>
		</Variant>

		<Variant
				title="Location"
				:init-state="() => useStoryInitState<{ location: string }>({ location: 'left' })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 280px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-drawer
							:location="state.location as any"
							permanent
							data-cy="drawer-location"
							style="position: relative; height: 100%;"
					>
						<div style="padding: 16px;">location: {{ state.location }}</div>
					</origam-drawer>
					<div style="flex: 1; padding: 16px;">Main content</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'left', value: 'left' },
							{ label: 'right', value: 'right' }
						]"
				/>
			</template>
		</Variant>

		<Variant title="Slot — prepend">
			<div style="position: relative; height: 280px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
				<origam-drawer permanent data-cy="drawer-slot-prepend" style="position: relative; height: 100%;">
					<template #prepend>
						<div style="padding: 16px; font-weight: 700; border-bottom: 1px solid var(--origam-color-border-subtle, #ddd);">
							App Logo
						</div>
					</template>
					<div style="padding: 16px;">Body content</div>
				</origam-drawer>
				<div style="flex: 1; padding: 16px;">Main</div>
			</div>
		</Variant>

		<Variant title="Slot — append">
			<div style="position: relative; height: 280px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
				<origam-drawer permanent data-cy="drawer-slot-append" style="position: relative; height: 100%;">
					<div style="padding: 16px;">Body</div>
					<template #append>
						<div style="padding: 16px; border-top: 1px solid var(--origam-color-border-subtle, #ddd);">
							v1.0.0
						</div>
					</template>
				</origam-drawer>
				<div style="flex: 1; padding: 16px;">Main</div>
			</div>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<div style="padding: 16px;">
				<origam-btn
						text="Toggle (watch Events tab)"
						data-cy="drawer-emit-toggle"
						@click="emitOpen = !emitOpen"
				/>
				<span style="margin-left: 12px;" data-cy="drawer-emit-state">open={{ emitOpen }}</span>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDrawerProps>({
					permanent: true,
					temporary: false,
					rail: false,
					floating: false,
					width: 256
				})"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 320px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-drawer
							v-bind="state"
							data-cy="drawer-playground"
							style="position: relative; height: 100%;"
					>
						<div style="padding: 16px;">Drawer content</div>
					</origam-drawer>
					<div style="flex: 1; padding: 16px;">Main content area</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.permanent"  title="permanent"/>
				<HstCheckbox v-model="state.temporary"  title="temporary"/>
				<HstCheckbox v-model="state.rail"       title="rail"/>
				<HstCheckbox v-model="state.floating"   title="floating"/>
				<HstNumber   v-model="state.width"      title="width"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamBtn, OrigamDrawer } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDrawerProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const emitOpen = ref(false)
</script>

<docs lang="md" src="@docs/components/Drawer/OrigamDrawer.md"/>
