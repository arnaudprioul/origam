<template>
	<Story
			group="components"
			title="CommandPalette/OrigamCommandPalette"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{
					open: boolean
					placeholder: string
					emptyText: string
					maxHeight: number
					width: number
					loading: boolean
					closeOnSelect: boolean
					closeOnEscape: boolean
					closeOnBackdrop: boolean
				}>({
					open: false,
					placeholder: 'Type a command…',
					emptyText: 'No results',
					maxHeight: 480,
					width: 640,
					loading: false,
					closeOnSelect: true,
					closeOnEscape: true,
					closeOnBackdrop: true
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="command-palette-playground">
					<origam-btn
							text="Open palette"
							data-cy="command-palette-playground-trigger"
							@click="state.open = true"
					/>
					<div class="story-status" data-cy="command-palette-playground-hint">
						Press <strong>⌘K</strong> (macOS) or <strong>Ctrl+K</strong> (Windows / Linux) to toggle the palette
						globally. Last selected: <strong>{{ lastSelectedLabel || '—' }}</strong> • Query events:
						<strong>{{ queryCount }}</strong>
					</div>

					<origam-command-palette
							v-model="state.open"
							:commands="PLAYGROUND_COMMANDS"
							:placeholder="state.placeholder"
							:empty-text="state.emptyText"
							:max-height="state.maxHeight"
							:width="state.width"
							:loading="state.loading"
							:close-on-select="state.closeOnSelect"
							:close-on-escape="state.closeOnEscape"
							:close-on-backdrop="state.closeOnBackdrop"
							@select="onPlaygroundSelect"
							@query="onPlaygroundQuery"
					/>
				</div>
			</template>

			<template #controls="{ state }">
				<HstText      v-model="state.placeholder"     title="placeholder"/>
				<HstText      v-model="state.emptyText"       title="emptyText"/>
				<HstNumber    v-model="state.maxHeight"       title="maxHeight"/>
				<HstNumber    v-model="state.width"           title="width"/>
				<HstCheckbox  v-model="state.loading"         title="loading"/>
				<HstCheckbox  v-model="state.closeOnSelect"   title="closeOnSelect"/>
				<HstCheckbox  v-model="state.closeOnEscape"   title="closeOnEscape"/>
				<HstCheckbox  v-model="state.closeOnBackdrop" title="closeOnBackdrop"/>
			</template>
		</Variant>

		<Variant title="Prop — commands">
			<div class="story-shell" data-cy="command-palette-commands">
				<origam-btn
						text="Open with 15 commands"
						data-cy="command-palette-commands-trigger"
						@click="openCommands = true"
				/>
				<origam-command-palette
						v-model="openCommands"
						:commands="LARGE_FIXTURE"
						placeholder="15 commands ready…"
				/>
			</div>
		</Variant>

		<Variant title="Prop — kbd display">
			<div class="story-shell" data-cy="command-palette-kbd">
				<origam-btn
						text="Open palette (with kbd hints)"
						data-cy="command-palette-kbd-trigger"
						@click="openKbd = true"
				/>
				<origam-command-palette
						v-model="openKbd"
						:commands="KBD_FIXTURE"
						placeholder="Every action has its shortcut…"
				/>
			</div>
		</Variant>

		<Variant title="Prop — groups">
			<div class="story-shell" data-cy="command-palette-groups">
				<origam-btn
						text="Open palette (3 groups)"
						data-cy="command-palette-groups-trigger"
						@click="openGroups = true"
				/>
				<origam-command-palette
						v-model="openGroups"
						:commands="GROUPS_FIXTURE"
						placeholder="Navigation • Settings • Actions"
				/>
			</div>
		</Variant>

		<Variant title="Prop — empty state">
			<div class="story-shell" data-cy="command-palette-empty">
				<origam-btn
						text="Open and type 'zzzz'"
						data-cy="command-palette-empty-trigger"
						@click="openEmpty = true"
				/>
				<origam-command-palette
						v-model="openEmpty"
						:commands="GROUPS_FIXTURE"
						placeholder="Type something that doesn't match…"
						empty-text="No matches — try a different query"
				/>
			</div>
		</Variant>

		<Variant title="Slot — item">
			<div class="story-shell" data-cy="command-palette-slot-item">
				<origam-btn
						text="Open with custom rows"
						data-cy="command-palette-slot-item-trigger"
						@click="openSlotItem = true"
				/>
				<origam-command-palette
						v-model="openSlotItem"
						:commands="USER_FIXTURE"
						placeholder="Look up a teammate…"
				>
					<template #item="{ command, isActive }">
						<span
								:style="{
									width: '28px',
									height: '28px',
									borderRadius: '50%',
									backgroundColor: 'var(--origam-color__action--primary---bgSubtle, rgba(0, 0, 0, 0.06))',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 600,
									fontSize: '0.75rem',
									color: 'var(--origam-color__action--primary---fg, #1976d2)'
								}"
						>
							{{ command.label.charAt(0).toUpperCase() }}
						</span>
						<span style="flex: 1 1 auto; min-width: 0;">
							<strong>{{ command.label }}</strong>
							<span
									v-if="command.description"
									style="display: block; font-size: 0.75rem; opacity: 0.7;"
							>
								{{ command.description }}
							</span>
						</span>
						<small v-if="isActive" style="font-size: 0.625rem; opacity: 0.6;">↵</small>
					</template>
				</origam-command-palette>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div class="story-shell" data-cy="command-palette-slot-empty">
				<origam-btn
						text="Open and type 'zzzz'"
						data-cy="command-palette-slot-empty-trigger"
						@click="openSlotEmpty = true"
				/>
				<origam-command-palette
						v-model="openSlotEmpty"
						:commands="GROUPS_FIXTURE"
				>
					<template #empty>
						<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
							<strong>Want to add this?</strong>
							<small>Create a new shortcut for "zzzz" — it's just one keystroke away.</small>
						</div>
					</template>
				</origam-command-palette>
			</div>
		</Variant>

		<Variant title="Slot — footer">
			<div class="story-shell" data-cy="command-palette-slot-footer">
				<origam-btn
						text="Open with custom footer"
						data-cy="command-palette-slot-footer-trigger"
						@click="openSlotFooter = true"
				/>
				<origam-command-palette
						v-model="openSlotFooter"
						:commands="GROUPS_FIXTURE"
				>
					<template #footer>
						<span style="font-size: 0.75rem; opacity: 0.7;">
							Powered by origam · v2.3
						</span>
					</template>
				</origam-command-palette>
			</div>
		</Variant>

		<Variant title="Emit — select">
			<div class="story-shell" data-cy="command-palette-emit-select">
				<origam-btn
						text="Open palette"
						data-cy="command-palette-emit-select-trigger"
						@click="openEmitSelect = true"
				/>
				<div class="story-status" data-cy="command-palette-emit-select-counter">
					select fired: <strong>{{ selectCount }}</strong> times • last:
					<strong>{{ lastSelectedLabel || '—' }}</strong>
				</div>
				<origam-command-palette
						v-model="openEmitSelect"
						:commands="GROUPS_FIXTURE"
						@select="onEmitSelect"
				/>
			</div>
		</Variant>

		<Variant title="Emit — query">
			<div class="story-shell" data-cy="command-palette-emit-query">
				<origam-btn
						text="Open palette"
						data-cy="command-palette-emit-query-trigger"
						@click="openEmitQuery = true"
				/>
				<div class="story-status" data-cy="command-palette-emit-query-counter">
					query events: <strong>{{ queryCount }}</strong> • last: <strong>{{ lastQuery || '—' }}</strong>
				</div>
				<origam-command-palette
						v-model="openEmitQuery"
						:commands="GROUPS_FIXTURE"
						@query="onEmitQuery"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamBtn, OrigamCommandPalette } from '@origam/components'

	import { MDI_ICONS } from '@origam/enums'

	import type { ICommand } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const lastSelectedLabel = ref<string>('')
	const selectCount = ref<number>(0)
	const queryCount = ref<number>(0)
	const lastQuery = ref<string>('')

	const openCommands = ref<boolean>(false)
	const openKbd = ref<boolean>(false)
	const openGroups = ref<boolean>(false)
	const openEmpty = ref<boolean>(false)
	const openSlotItem = ref<boolean>(false)
	const openSlotEmpty = ref<boolean>(false)
	const openSlotFooter = ref<boolean>(false)
	const openEmitSelect = ref<boolean>(false)
	const openEmitQuery = ref<boolean>(false)

	const PLAYGROUND_COMMANDS: ReadonlyArray<ICommand> = [
		{ id: 'new', label: 'New document', icon: MDI_ICONS.FILE_PLUS, kbd: ['meta', 'n'], group: 'Actions', perform: () => logEvent('cmd', 'new') },
		{ id: 'open', label: 'Open file', icon: MDI_ICONS.FOLDER_OPEN, kbd: ['meta', 'o'], group: 'Actions', perform: () => logEvent('cmd', 'open') },
		{ id: 'save', label: 'Save', icon: MDI_ICONS.CONTENT_SAVE, kbd: ['meta', 's'], group: 'Actions', perform: () => logEvent('cmd', 'save') },
		{ id: 'settings', label: 'Settings', description: 'App preferences', icon: MDI_ICONS.COG, kbd: ['meta', ','], group: 'Navigation', keywords: ['preferences', 'config'], perform: () => logEvent('cmd', 'settings') },
		{ id: 'profile', label: 'Profile', icon: MDI_ICONS.ACCOUNT, group: 'Navigation', perform: () => logEvent('cmd', 'profile') },
		{ id: 'theme', label: 'Toggle theme', description: 'Switch between light and dark', icon: MDI_ICONS.WEATHER_NIGHT, kbd: ['meta', 'shift', 't'], group: 'Settings', keywords: ['dark', 'light'], perform: () => logEvent('cmd', 'theme') }
	]

	const LARGE_FIXTURE: ReadonlyArray<ICommand> = [
		{ id: 'goto-home', label: 'Go to Home', group: 'Navigation', icon: MDI_ICONS.HOME, perform: () => undefined },
		{ id: 'goto-inbox', label: 'Go to Inbox', group: 'Navigation', icon: MDI_ICONS.INBOX, perform: () => undefined },
		{ id: 'goto-projects', label: 'Go to Projects', group: 'Navigation', icon: MDI_ICONS.FOLDER, perform: () => undefined },
		{ id: 'goto-settings', label: 'Go to Settings', group: 'Navigation', icon: MDI_ICONS.COG, perform: () => undefined },
		{ id: 'goto-help', label: 'Go to Help', group: 'Navigation', icon: MDI_ICONS.HELP_CIRCLE, perform: () => undefined },
		{ id: 'set-theme', label: 'Set theme', group: 'Settings', icon: MDI_ICONS.PALETTE, perform: () => undefined },
		{ id: 'set-language', label: 'Set language', group: 'Settings', icon: MDI_ICONS.TRANSLATE, perform: () => undefined },
		{ id: 'set-density', label: 'Set density', group: 'Settings', icon: MDI_ICONS.ARROW_COLLAPSE_VERTICAL, perform: () => undefined },
		{ id: 'reset-password', label: 'Reset password', group: 'Settings', icon: MDI_ICONS.LOCK_RESET, perform: () => undefined },
		{ id: 'logout', label: 'Log out', group: 'Settings', icon: MDI_ICONS.LOGOUT, perform: () => undefined },
		{ id: 'new-doc', label: 'New document', group: 'Actions', icon: MDI_ICONS.FILE_PLUS, perform: () => undefined },
		{ id: 'open-doc', label: 'Open document', group: 'Actions', icon: MDI_ICONS.FOLDER_OPEN, perform: () => undefined },
		{ id: 'save-doc', label: 'Save document', group: 'Actions', icon: MDI_ICONS.CONTENT_SAVE, perform: () => undefined },
		{ id: 'duplicate-doc', label: 'Duplicate document', group: 'Actions', icon: MDI_ICONS.CONTENT_COPY, perform: () => undefined },
		{ id: 'delete-doc', label: 'Delete document', group: 'Actions', icon: MDI_ICONS.DELETE, disabled: true, perform: () => undefined }
	]

	const KBD_FIXTURE: ReadonlyArray<ICommand> = [
		{ id: 'new', label: 'New', kbd: ['meta', 'n'], perform: () => undefined },
		{ id: 'open', label: 'Open', kbd: ['meta', 'o'], perform: () => undefined },
		{ id: 'save', label: 'Save', kbd: ['meta', 's'], perform: () => undefined },
		{ id: 'find', label: 'Find', kbd: ['meta', 'f'], perform: () => undefined },
		{ id: 'replace', label: 'Replace', kbd: ['meta', 'shift', 'h'], perform: () => undefined }
	]

	const GROUPS_FIXTURE: ReadonlyArray<ICommand> = [
		{ id: 'nav-home', label: 'Home', group: 'Navigation', perform: () => undefined },
		{ id: 'nav-inbox', label: 'Inbox', group: 'Navigation', perform: () => undefined },
		{ id: 'nav-projects', label: 'Projects', group: 'Navigation', perform: () => undefined },
		{ id: 'settings-theme', label: 'Set theme', group: 'Settings', perform: () => undefined },
		{ id: 'settings-language', label: 'Set language', group: 'Settings', perform: () => undefined },
		{ id: 'action-create', label: 'Create item', group: 'Actions', perform: () => undefined },
		{ id: 'action-delete', label: 'Delete item', group: 'Actions', perform: () => undefined }
	]

	const USER_FIXTURE: ReadonlyArray<ICommand> = [
		{ id: 'user-alice', label: 'Alice Liddell', description: 'alice@example.com', perform: () => undefined },
		{ id: 'user-bob', label: 'Bob Stone', description: 'bob@example.com', perform: () => undefined },
		{ id: 'user-carol', label: 'Carol Danvers', description: 'carol@example.com', perform: () => undefined },
		{ id: 'user-dave', label: 'Dave Patel', description: 'dave@example.com', perform: () => undefined }
	]

	const onPlaygroundSelect = (cmd: ICommand) => {
		lastSelectedLabel.value = cmd.label
		logEvent('select', cmd.id)
	}

	const onPlaygroundQuery = (q: string) => {
		queryCount.value += 1
		lastQuery.value = q
		logEvent('query', q)
	}

	const onEmitSelect = (cmd: ICommand) => {
		selectCount.value += 1
		lastSelectedLabel.value = cmd.label
		logEvent('select', cmd.id)
	}

	const onEmitQuery = (q: string) => {
		queryCount.value += 1
		lastQuery.value = q
		logEvent('query', q)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: stretch;
		padding: 16px;
	}

	.story-status {
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66));
	}
</style>

<docs lang="md" src="@docs/components/CommandPalette/OrigamCommandPalette.md"/>
