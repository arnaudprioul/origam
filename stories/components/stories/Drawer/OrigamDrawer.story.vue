<template>
	<Story
			group="components"
			title="Drawer/OrigamDrawer"
	>

		<!--
			Real-world app shell: AppBar on top, permanent drawer on
			the left, main content + footer below. The drawer's
			`permanent` mode + useLayoutItem registration reserves
			space in the layout grid; the consumer-side toolbar /
			main / footer pick up the reserved offset via the
			inherited `--origam-layout---position-*` CSS vars and
			get PUSHED past the drawer instead of being painted over.
		-->
		<Variant title="App shell — drawer pushes toolbar + main + footer">
			<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="drawer-app-shell">
				<origam-app :full-height="false">
					<origam-toolbar title="My App" data-cy="drawer-app-shell-toolbar">
						<template #prepend>
							<origam-btn :icon="MDI_ICONS.MENU" aria-label="Menu"/>
						</template>
						<template #append>
							<origam-btn :icon="MDI_ICONS.MAGNIFY" aria-label="Search"/>
							<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More"/>
						</template>
					</origam-toolbar>
					<origam-drawer permanent data-cy="drawer-app-shell-nav">
						<div style="padding: 16px; font-weight: 700; border-bottom: 1px solid var(--origam-color-border-subtle, #ddd);">
							Navigation
						</div>
						<div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
							<span>· Dashboard</span>
							<span>· Reports</span>
							<span>· Settings</span>
						</div>
					</origam-drawer>
					<origam-main style="padding: 16px;" data-cy="drawer-app-shell-main">
						<p>Main content area. Notice it doesn't slide under the drawer.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!--
			Temporary drawer: hidden by default, animates in / out on
			toggle. The default OrigamSlideX transition glides the
			drawer in from the left edge with a CSS keyframe-driven
			horizontal slide. The scrim follows.
		-->
		<Variant
				title="Temporary (slide animation)"
				:init-state="() => useStoryInitState<{ open: boolean }>({ open: false })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 320px; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
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
							<p>Temporary drawer.</p>
							<p>Click outside the drawer or press the close btn.</p>
							<origam-btn text="Close" data-cy="drawer-temporary-close" @click="state.open = false"/>
						</div>
					</origam-drawer>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.open" title="open"/>
			</template>
		</Variant>

		<!--
			Rail: collapsed permanent drawer (56 px wide by default).
			Toggle to expand to full width. Useful for icon-only nav
			that the user can pin open.
		-->
		<Variant
				title="Rail (collapsed permanent)"
				:init-state="() => useStoryInitState<{ rail?: boolean }>({ rail: true })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 320px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-drawer
							:rail="state.rail"
							permanent
							data-cy="drawer-rail"
							style="position: relative; height: 100%;"
					>
						<div style="padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
							<origam-btn :icon="MDI_ICONS.HOME" aria-label="Home"/>
							<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
							<origam-btn :icon="MDI_ICONS.COG" aria-label="Settings"/>
							<origam-btn :icon="MDI_ICONS.HELP_CIRCLE" aria-label="Help"/>
						</div>
					</origam-drawer>
					<div style="flex: 1; padding: 16px;">Main content — toggle the rail above.</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.rail" title="rail"/>
			</template>
		</Variant>

		<!--
			Location switcher: drawer can dock on any edge. Top /
			bottom variants get a horizontal slide-y transition
			automatically (see OrigamSlideY); left / right keep
			slide-x.
		-->
		<Variant
				title="Location — left / right / top / bottom"
				:init-state="() => useStoryInitState<{ location: 'left' | 'right' | 'top' | 'bottom' }>({ location: 'left' })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 320px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-drawer
							:location="state.location"
							permanent
							data-cy="drawer-location"
							style="position: relative;"
					>
						<div style="padding: 16px;">location: <b>{{ state.location }}</b></div>
					</origam-drawer>
					<div style="flex: 1; padding: 16px;">Main content. Try every location.</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'left', value: 'left' },
							{ label: 'right', value: 'right' },
							{ label: 'top', value: 'top' },
							{ label: 'bottom', value: 'bottom' }
						]"
				/>
			</template>
		</Variant>

		<!--
			Slots: drawer ships with `prepend` (header) and `append`
			(footer) slots so you can build a typical Material-style
			nav drawer with a logo on top, links in the middle, app
			version / sign-out at the bottom.
		-->
		<Variant title="Slots — prepend (header) + append (footer)">
			<div style="position: relative; height: 360px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
				<origam-drawer permanent data-cy="drawer-slots" style="position: relative; height: 100%;">
					<template #prepend>
						<div style="padding: 16px; font-weight: 700; border-bottom: 1px solid var(--origam-color-border-subtle, #ddd); display: flex; align-items: center; gap: 8px;">
							<span style="font-size: 1.25rem;">⬡</span>
							<span>App Logo</span>
						</div>
					</template>
					<div style="padding: 16px; display: flex; flex-direction: column; gap: 6px;">
						<span>· Inbox</span>
						<span>· Sent</span>
						<span>· Drafts</span>
						<span>· Archive</span>
					</div>
					<template #append>
						<div style="padding: 16px; border-top: 1px solid var(--origam-color-border-subtle, #ddd); font-size: 0.75rem; color: var(--origam-color-text-secondary);">
							v1.0.0 — Signed in as user@example.com
						</div>
					</template>
				</origam-drawer>
				<div style="flex: 1; padding: 16px;">Main content</div>
			</div>
		</Variant>

		<!--
			Custom transition: override the default slide-x with a
			fade or any other registered transition component.
			Useful when the drawer is a side panel that overlaps
			rather than slides in.
		-->
		<Variant
				title="Custom transition (slide-x | slide-y | fade | none)"
				:init-state="() => useStoryInitState<{ open: boolean; choice: string }>({ open: false, choice: 'slide-x' })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 320px; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-btn
							text="Toggle"
							style="margin: 16px;"
							data-cy="drawer-transition-toggle"
							@click="state.open = !state.open"
					/>
					<origam-drawer
							v-model="state.open"
							temporary
							:transition="resolveTransition(state.choice)"
							data-cy="drawer-transition-custom"
					>
						<div style="padding: 16px;">
							<p>Current transition: <b>{{ state.choice }}</b></p>
							<origam-btn text="Close" @click="state.open = false"/>
						</div>
					</origam-drawer>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.choice"
						title="transition"
						:options="[
							{ label: 'slide-x (default)', value: 'slide-x' },
							{ label: 'slide-y',           value: 'slide-y' },
							{ label: 'fade',              value: 'fade' },
							{ label: 'none',              value: 'none' }
						]"
				/>
				<HstCheckbox v-model="state.open" title="open"/>
			</template>
		</Variant>

		<!--
			Emit lifecycle: shows the `update:modelValue` event firing
			when the drawer opens / closes. Hook into this from your
			parent to sync app state.
		-->
		<Variant title="Emit — update:modelValue">
			<div style="padding: 16px;">
				<origam-btn
						text="Toggle (watch Events tab)"
						data-cy="drawer-emit-toggle"
						@click="emitOpen = !emitOpen"
				/>
				<span style="margin-left: 12px;" data-cy="drawer-emit-state">open = {{ emitOpen }}</span>
			</div>
		</Variant>

		<!--
			Playground: every IDrawerProps knob exposed. Useful for
			ad-hoc visual checks while iterating.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDrawerProps>({
					permanent: true,
					temporary: false,
					rail: false,
					floating: false,
					width: 256,
					location: 'left',
					scrim: true,
					modelValue: true
				})"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 360px; display: flex; overflow: hidden; border: 1px solid var(--origam-color-border-subtle, #ccc);">
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
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
				<HstCheckbox v-model="state.rail"       title="rail"/>
				<HstCheckbox v-model="state.floating"   title="floating"/>
				<HstCheckbox v-model="state.scrim"      title="scrim"/>
				<HstNumber   v-model="state.width"      title="width"/>
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'left',   value: 'left' },
							{ label: 'right',  value: 'right' },
							{ label: 'top',    value: 'top' },
							{ label: 'bottom', value: 'bottom' }
						]"
				/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import {
		OrigamApp,
		OrigamBtn,
		OrigamDrawer,
		OrigamFade,
		OrigamMain,
		OrigamSlideX,
		OrigamSlideY,
		OrigamToolbar
	} from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDrawerProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const emitOpen = ref(false)

	// Map the HstSelect string options to the matching transition
	// component / disable value the OrigamDrawer expects.
	function resolveTransition (choice: string) {
		if (choice === 'none') return false
		if (choice === 'slide-x') return { component: OrigamSlideX }
		if (choice === 'slide-y') return { component: OrigamSlideY }
		if (choice === 'fade')    return { component: OrigamFade }
		return { component: OrigamSlideX }
	}
</script>

<docs lang="md" src="@docs/components/Drawer/OrigamDrawer.md"/>
