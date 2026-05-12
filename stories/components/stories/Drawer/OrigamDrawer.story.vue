<template>
	<Story
			group="components"
			title="Drawer/OrigamDrawer"
	>

		<!--
			Push vs overlay — side-by-side comparison.

			The drawer doesn't ship a separate `push` prop. The
			push / overlay behaviour is driven by `permanent`
			(or its inverse, `temporary`):

			  • `permanent: true` (or modelValue=true and no
			    `temporary`) → drawer is registered with useLayoutItem,
			    which reserves space in the layout grid. The toolbar /
			    main / footer inherit `--origam-layout---position-*`
			    CSS vars and offset themselves → PUSH.
			  • `temporary: true` → drawer overlays the layout with
			    its own z-index + scrim, no space reserved → OVERLAY.

			Toggle the checkbox to flip mode on the same App shell.
		-->
		<Variant
				title="Push vs overlay (toggle permanent)"
				:init-state="() => useStoryInitState<{ pushMode: boolean }>({ pushMode: true })"
		>
			<template #default="{ state }">
				<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="drawer-push-toggle">
					<origam-app :full-height="false">
						<origam-toolbar title="Push vs overlay">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Menu"/>
							</template>
						</origam-toolbar>
						<origam-drawer
								:permanent="state.pushMode"
								:temporary="!state.pushMode"
								:model-value="true"
								data-cy="drawer-push-toggle-nav"
						>
							<div style="padding: 16px;">
								<p style="font-weight: 700;">Drawer</p>
								<p>Mode: <b>{{ state.pushMode ? 'permanent (push)' : 'temporary (overlay)' }}</b></p>
							</div>
						</origam-drawer>
						<origam-main>
							<p>Main content.</p>
							<p>In <b>push</b> mode the drawer reserves its width in the
								layout grid and the toolbar / main offset to the right
								via the inherited <code>--origam-layout---position-*</code>
								CSS vars.</p>
							<p>In <b>overlay</b> mode the drawer floats on top with
								its own z-index + scrim — toolbar / main are NOT pushed.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.pushMode" title="pushMode (permanent vs temporary)"/>
			</template>
		</Variant>

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
			<!--
				Uses `<origam-app-bar>` (NOT `<origam-toolbar>`) so the
				bar registers itself as a layout item and reserves
				its height at the top of the layout grid. The drawer,
				registered with a higher default `order`, then takes
				the LEFT lane EXCLUDING the top — so it naturally
				starts BELOW the AppBar. To get drawer-full-height
				(clipping the AppBar from the left), set
				`:order="0"` on the drawer.
			-->
			<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);" data-cy="drawer-app-shell">
				<origam-app :full-height="false">
					<origam-app-bar title="My App" data-cy="drawer-app-shell-toolbar">
						<template #prepend>
							<origam-btn :icon="MDI_ICONS.MENU" aria-label="Menu"/>
						</template>
						<template #append>
							<origam-btn :icon="MDI_ICONS.MAGNIFY" aria-label="Search"/>
							<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More"/>
						</template>
					</origam-app-bar>
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
					<origam-main data-cy="drawer-app-shell-main">
						<p>Main content area. Notice it doesn't slide under the drawer.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!--
			Temporary drawer: hidden by default, animates in / out on
			toggle. Drawer is wrapped in <origam-app> so it picks up a
			real layout context (without it the drawer falls back to
			`position: fixed` and escapes the story container).
		-->
		<Variant
				title="Temporary (slide animation)"
				:init-state="() => useStoryInitState<{ open: boolean }>({ open: false })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-toolbar title="App with temporary drawer">
							<template #prepend>
								<origam-btn
										:icon="MDI_ICONS.MENU"
										aria-label="Toggle drawer"
										data-cy="drawer-temporary-activator"
										@click="state.open = !state.open"
								/>
							</template>
						</origam-toolbar>
						<origam-drawer
								v-model="state.open"
								temporary
								data-cy="drawer-temporary"
						>
							<div style="padding: 16px;">
								<p>Temporary drawer.</p>
								<p>Click the menu icon (or the close btn) to toggle.</p>
								<origam-btn text="Close" data-cy="drawer-temporary-close" @click="state.open = false"/>
							</div>
						</origam-drawer>
						<origam-main>
							<p>Main content — drawer slides in from the left.</p>
						</origam-main>
					</origam-app>
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
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer
								:rail="state.rail"
								permanent
								data-cy="drawer-rail"
						>
							<div style="padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
								<origam-btn :icon="MDI_ICONS.HOME" aria-label="Home"/>
								<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
								<origam-btn :icon="MDI_ICONS.COG" aria-label="Settings"/>
								<origam-btn :icon="MDI_ICONS.HELP_CIRCLE" aria-label="Help"/>
							</div>
						</origam-drawer>
						<origam-main>
							Main content — toggle the rail above.
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.rail" title="rail"/>
			</template>
		</Variant>

		<!--
			Location switcher: drawer can dock on any edge. The slide
			animation auto-adapts to the docking edge (translateY for
			top/bottom, translateX for left/right) thanks to the
			location-aware keyframes in OrigamDrawer's global style.
		-->
		<Variant
				title="Location — left / right / top / bottom"
				:init-state="() => useStoryInitState<{ location: 'left' | 'right' | 'top' | 'bottom' }>({ location: 'left' })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer
								:location="state.location"
								permanent
								data-cy="drawer-location"
						>
							<div style="padding: 16px;">location: <b>{{ state.location }}</b></div>
						</origam-drawer>
						<origam-main>
							Main content. Try every location.
						</origam-main>
					</origam-app>
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
			<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent data-cy="drawer-slots">
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
								v1.0.0 — user@example.com
							</div>
						</template>
					</origam-drawer>
					<origam-main>
						Main content
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!--
			Custom transition: override the default drawer slide with
			any other transition component (fade, slide-x, slide-y,
			or none for instant open / close).
		-->
		<Variant
				title="Custom transition (drawer | slide-x | slide-y | fade | none)"
				:init-state="() => useStoryInitState<{ open: boolean; choice: string }>({ open: false, choice: 'drawer' })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-toolbar title="Custom transition">
							<template #prepend>
								<origam-btn
										:icon="MDI_ICONS.MENU"
										aria-label="Toggle drawer"
										@click="state.open = !state.open"
								/>
							</template>
						</origam-toolbar>
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
						<origam-main>
							<p>Click ≡ then change the transition.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.choice"
						title="transition"
						:options="[
							{ label: 'drawer (default — full slide)', value: 'drawer' },
							{ label: 'slide-x',                       value: 'slide-x' },
							{ label: 'slide-y',                       value: 'slide-y' },
							{ label: 'fade',                          value: 'fade' },
							{ label: 'none',                          value: 'none' }
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
				<div style="height: 360px; border: 1px solid var(--origam-color-border-subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer
								v-bind="state"
								data-cy="drawer-playground"
						>
							<div style="padding: 16px;">Drawer content</div>
						</origam-drawer>
						<origam-main>
							Main content area
						</origam-main>
					</origam-app>
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
		OrigamAppBar,
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
		if (choice === 'none')    return false
		if (choice === 'drawer')  return 'origam-transition--drawer'
		if (choice === 'slide-x') return { component: OrigamSlideX }
		if (choice === 'slide-y') return { component: OrigamSlideY }
		if (choice === 'fade')    return { component: OrigamFade }
		return 'origam-transition--drawer'
	}
</script>

<docs lang="md" src="@docs/components/Drawer/OrigamDrawer.md"/>
