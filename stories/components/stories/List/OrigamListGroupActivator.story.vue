<template>
	<Story
			group="components"
			title="List/OrigamListGroupActivator"
	>

		<!--
			<origam-list-group-activator> is the clickable header that
			expands / collapses the parent <origam-list-group>. Realistic
			usage is via the activator slot of <origam-list-group>.
		-->

		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant title="Default">
			<!-- ListGroupActivator is normally rendered automatically by ListGroup via the title prop -->
			<origam-list data-cy="list-group-activator-playground">
				<origam-list-group title="Mail" :prepend-icon="MDI_ICONS.EMAIL_OUTLINE">
					<origam-list-item title="Inbox"/>
					<origam-list-item title="Sent"/>
				</origam-list-group>
				<origam-list-group title="Calendar" :prepend-icon="MDI_ICONS.CALENDAR">
					<origam-list-item title="Today"/>
					<origam-list-item title="Upcoming"/>
				</origam-list-group>
				<origam-list-group title="Settings" :prepend-icon="MDI_ICONS.COG_OUTLINE">
					<origam-list-item title="Profile"/>
					<origam-list-item title="Notifications"/>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — default (via title prop on ListGroup)">
			<origam-list data-cy="list-group-activator-default">
				<origam-list-group title="Mail">
					<origam-list-item title="Inbox"   :prepend-icon="MDI_ICONS.INBOX"/>
					<origam-list-item title="Sent"    :prepend-icon="MDI_ICONS.SEND"/>
					<origam-list-item title="Drafts"  :prepend-icon="MDI_ICONS.FILE_DOCUMENT_OUTLINE"/>
				</origam-list-group>
				<origam-list-group title="Calendar">
					<origam-list-item title="Today"    :prepend-icon="MDI_ICONS.CALENDAR_TODAY"/>
					<origam-list-item title="Upcoming" :prepend-icon="MDI_ICONS.CALENDAR_CLOCK"/>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-list data-cy="list-group-activator-slot-default">
				<origam-list-group>
					<template #activator="{ props }">
						<origam-list-group-activator v-bind="props">
							<span>Custom slot content</span>
						</origam-list-group-activator>
					</template>
					<origam-list-item title="Inbox"/>
					<origam-list-item title="Sent"/>
				</origam-list-group>
			</origam-list>
		</Variant>

		<Variant title="Slot — activator (custom render via slot)">
			<origam-list data-cy="list-group-activator-slot">
				<origam-list-group>
					<template #activator="{ isOpen, props }">
						<origam-list-group-activator v-bind="props">
							<div style="display: flex; align-items: center; gap: 8px; padding: 6px 0;">
								<origam-icon :icon="isOpen ? MDI_ICONS.FOLDER_OPEN : MDI_ICONS.FOLDER"/>
								<strong>Mail</strong>
								<small style="color: var(--origam-color__text---secondary); margin-left: auto;">
									{{ isOpen ? 'open' : 'closed' }}
								</small>
							</div>
						</origam-list-group-activator>
					</template>

					<origam-list-item title="Inbox"  :prepend-icon="MDI_ICONS.INBOX"/>
					<origam-list-item title="Sent"   :prepend-icon="MDI_ICONS.SEND"/>
					<origam-list-item title="Drafts" :prepend-icon="MDI_ICONS.FILE_DOCUMENT_OUTLINE"/>
				</origam-list-group>
			</origam-list>
		</Variant>

		<Variant title="Note — usage guidance">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>&lt;origam-list-group-activator&gt;</code> is normally
					rendered for you by <code>&lt;origam-list-group&gt;</code>
					through the <code>title</code> prop. Override the
					<code>activator</code> slot only when you need a fully
					custom header (e.g. with a count badge, custom icons, or
					a non-text label).
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamIcon,
		OrigamList,
		OrigamListGroup,
		OrigamListGroupActivator,
		OrigamListItem,
	} from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
</script>

<docs lang="md" src="@docs/components/List/OrigamListGroupActivator.md"/>
