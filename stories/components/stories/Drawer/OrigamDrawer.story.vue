<template>
	<Story
			group="components"
			title="Drawer/OrigamDrawer"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IDrawerProps knob via the sidebar controls. Histoire doesn't
			auto-select by variant name (only when there's a single
			variant), so the user has to click — but we keep Playground
			at the top so it's the prominent default.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDrawerProps & { push: boolean | null, clipped: boolean | null }>({
					permanent: true,
					temporary: false,
					modelValue: true,
					rail: false,
					railWidth: 56,
					floating: false,
					scrim: true,
					width: 256,
					location: 'left',
					push: null,
					clipped: null
				})"
		>
			<template #default="{ state }">
				<div style="height: 360px; border: 1px solid var(--origam-color__border---subtle, #ccc);" data-cy="drawer-playground">
					<origam-app :full-height="false">
						<origam-app-bar title="My App">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Menu"/>
							</template>
						</origam-app-bar>
						<origam-drawer v-bind="state">
							<div style="padding: 16px;">Drawer content</div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Main content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.permanent"  title="permanent"/>
				<HstCheckbox v-model="state.temporary"  title="temporary"/>
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
				<HstCheckbox v-model="state.rail"       title="rail"/>
				<HstNumber   v-model="state.railWidth"  title="railWidth"/>
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
				<HstSelect
						v-model="state.push"
						title="push"
						:options="[
							{ label: 'auto (permanent → push, else overlay)', value: null },
							{ label: 'true — drawer pushes content',          value: true },
							{ label: 'false — drawer overlays content',       value: false }
						]"
				/>
				<HstSelect
						v-model="state.clipped"
						title="clipped"
						:options="[
							{ label: 'auto (HTML order — AppBar before → below)', value: null },
							{ label: 'true — drawer slots BELOW the AppBar',      value: true },
							{ label: 'false — drawer extends full height',        value: false }
						]"
				/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — permanent">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent>
						<div style="padding: 16px;">Permanent drawer — always visible, pushes the main content.</div>
					</origam-drawer>
					<origam-main>
						<p style="padding: 16px;">Main content beside the drawer.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant
				title="Prop — temporary"
				:init-state="() => useStoryInitState<{ open: boolean }>({ open: false })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar title="Click ≡ to toggle">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Toggle" @click="state.open = !state.open"/>
							</template>
						</origam-app-bar>
						<origam-drawer v-model="state.open" temporary>
							<div style="padding: 16px;">
								<p>Temporary drawer.</p>
								<origam-btn text="Close" @click="state.open = false"/>
							</div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Main content. Click ≡ — drawer slides in over the content.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
		</Variant>

		<Variant
				title="Prop — rail (collapsed permanent)"
				:init-state="() => useStoryInitState<{ rail: boolean }>({ rail: true })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer :rail="state.rail" permanent>
							<div style="padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
								<origam-btn :icon="MDI_ICONS.HOME" aria-label="Home"/>
								<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
								<origam-btn :icon="MDI_ICONS.COG" aria-label="Settings"/>
							</div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Toggle "rail" to see the drawer collapse.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.rail" title="rail"/>
			</template>
		</Variant>

		<Variant
				title="Prop — location (left / right / top / bottom)"
				:init-state="() => useStoryInitState<{ location: 'left' | 'right' | 'top' | 'bottom' }>({ location: 'left' })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer :location="state.location" permanent>
							<div style="padding: 16px;">location: <b>{{ state.location }}</b></div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Main content. Try every location.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
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

		<Variant
				title="Prop — width"
				:init-state="() => useStoryInitState<{ width: number }>({ width: 256 })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer :width="state.width" permanent>
							<div style="padding: 16px;">width: <b>{{ state.width }}px</b></div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Main content offsets dynamically.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.width" title="width" :min="64" :max="480"/>
			</template>
		</Variant>

		<Variant
				title="Prop — push (auto / true / false)"
				:init-state="() => useStoryInitState<{ push: boolean | null }>({ push: null })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer permanent :push="state.push">
							<div style="padding: 16px;">push: <b>{{ String(state.push) }}</b></div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">
								<b>push: true</b> → drawer reserves space, main offsets.
								<br><b>push: false</b> → drawer paints over the main content (overlay).
								<br><b>push: null</b> (default) → derived from `permanent`.
							</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.push"
						title="push"
						:options="[
							{ label: 'auto (derived from permanent)', value: null },
							{ label: 'true (force push)',             value: true },
							{ label: 'false (force overlay)',         value: false }
						]"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — clipped (auto / true / false)"
				:init-state="() => useStoryInitState<{ clipped: boolean | null }>({ clipped: null })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar title="App"/>
						<origam-drawer permanent :clipped="state.clipped">
							<div style="padding: 16px;">clipped: <b>{{ String(state.clipped) }}</b></div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">
								<b>clipped: true</b> → drawer below the AppBar.
								<br><b>clipped: false</b> → drawer full-height, AppBar pushed.
								<br><b>clipped: null</b> (default) → HTML order decides
								(AppBar first → below).
							</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.clipped"
						title="clipped"
						:options="[
							{ label: 'auto (HTML order)',     value: null },
							{ label: 'true (below AppBar)',   value: true },
							{ label: 'false (full height)',   value: false }
						]"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — floating"
				:init-state="() => useStoryInitState<{ floating: boolean }>({ floating: true })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer permanent :floating="state.floating">
							<div style="padding: 16px;">floating: removes the drawer's edge border so it reads as part of the surface.</div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Toggle the control to see the border appear / disappear.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.floating" title="floating"/>
			</template>
		</Variant>

		<Variant
				title="Prop — scrim (temporary drawer only)"
				:init-state="() => useStoryInitState<{ open: boolean, scrim: boolean }>({ open: true, scrim: true })"
		>
			<template #default="{ state }">
				<div style="height: 280px; position: relative; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer v-model="state.open" temporary :scrim="state.scrim">
							<div style="padding: 16px;">
								<p>scrim: <b>{{ state.scrim }}</b></p>
								<origam-btn text="Close" @click="state.open = false"/>
							</div>
						</origam-drawer>
						<origam-main>
							<p style="padding: 16px;">Toggle the scrim to see / hide the dim overlay behind the drawer.</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.open"  title="open"/>
				<HstCheckbox v-model="state.scrim" title="scrim"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent>
						<div style="padding: 16px; display: flex; flex-direction: column; gap: 6px;">
							<span>· Inbox</span>
							<span>· Sent</span>
							<span>· Drafts</span>
							<span>· Archive</span>
						</div>
					</origam-drawer>
					<origam-main>
						<p style="padding: 16px;">Default slot — drawer body content.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — prepend (header)">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent>
						<template #prepend>
							<div style="padding: 16px; font-weight: 700; border-bottom: 1px solid var(--origam-color__border---subtle, #ddd); display: flex; align-items: center; gap: 8px;">
								<span style="font-size: 1.25rem;">⬡</span>
								<span>App Logo</span>
							</div>
						</template>
						<div style="padding: 16px;">Default content (after the prepend slot).</div>
					</origam-drawer>
					<origam-main>
						<p style="padding: 16px;">Prepend slot — typically used for an app logo / brand.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — append (footer)">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent>
						<div style="padding: 16px;">Default content.</div>
						<template #append>
							<div style="padding: 16px; border-top: 1px solid var(--origam-color__border---subtle, #ddd); font-size: 0.75rem; color: var(--origam-color__text---secondary);">
								v1.0.0 — user@example.com
							</div>
						</template>
					</origam-drawer>
					<origam-main>
						<p style="padding: 16px;">Append slot — typically used for version info, sign-out, etc.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — wrapper (replace the drawer's inner skeleton)">
			<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-drawer permanent>
						<template #wrapper>
							<div style="padding: 24px; background: var(--origam-color__action--primary---bgSubtle, #f5f3ff); height: 100%;">
								<p style="font-weight: 700;">Custom wrapper</p>
								<p style="font-size: 0.875rem;">Replaces the drawer's default __prepend / __content / __append flex skeleton.</p>
							</div>
						</template>
					</origam-drawer>
					<origam-main>
						<p style="padding: 16px;">Use this slot when you need full control over the drawer's inner layout.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ open: boolean, log: string[] }>({ open: false, log: [] })"
		>
			<template #default="{ state }">
				<div style="height: 320px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar title="Watch update:modelValue">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Toggle" @click="state.open = !state.open"/>
							</template>
						</origam-app-bar>
						<origam-drawer
								:model-value="state.open"
								temporary
								@update:model-value="(v: boolean) => {
									state.open = v
									state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 6)
								}"
						>
							<div style="padding: 16px;">
								<p>Drawer open.</p>
								<origam-btn text="Close" @click="state.open = false"/>
							</div>
						</origam-drawer>
						<origam-main>
							<div style="padding: 16px;">
								<p>Last events emitted:</p>
								<ul style="font-family: monospace; font-size: 0.8rem;">
									<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
								</ul>
								<p v-if="state.log.length === 0" style="color: var(--origam-color__text---secondary);">
									Click ≡ to toggle the drawer.
								</p>
							</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — update:rail"
				:init-state="() => useStoryInitState<{ rail: boolean, log: string[] }>({ rail: true, log: [] })"
		>
			<template #default="{ state }">
				<div style="height: 280px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-drawer
								:rail="state.rail"
								permanent
								expand-on-hover
								@update:rail="(v: boolean) => {
									state.log = [`update:rail → ${v}`, ...state.log].slice(0, 6)
								}"
						>
							<div style="padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
								<origam-btn :icon="MDI_ICONS.HOME" aria-label="Home"/>
								<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
							</div>
						</origam-drawer>
						<origam-main>
							<div style="padding: 16px;">
								<p>Hover the drawer (expand-on-hover) to see update:rail fire.</p>
								<ul style="font-family: monospace; font-size: 0.8rem;">
									<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
								</ul>
							</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamApp, OrigamAppBar, OrigamBtn, OrigamDrawer, OrigamMain } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDrawerProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Drawer/OrigamDrawer.md"/>
