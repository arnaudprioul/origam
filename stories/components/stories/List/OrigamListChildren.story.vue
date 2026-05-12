<template>
	<Story
			group="components"
			title="List/OrigamListChildren"
	>

		<!--
			<origam-list-children> renders a recursive items array. The
			parent <origam-list> uses it internally to traverse nested
			children. Probing it standalone is useful for flat tests;
			the realistic flow drives it through the parent list.
		-->

		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant title="Playground — nested (most realistic form)">
			<!-- ListChildren is driven by items from the parent list context; this variant shows the realistic integration -->
			<origam-list :items="nestedItems" data-cy="list-children-playground"/>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — items (flat list)">
			<origam-list data-cy="list-children-flat">
				<origam-list-children :items="flatItems" return-object/>
			</origam-list>
		</Variant>

		<Variant title="Prop — items (nested groups, recursive)">
			<origam-list data-cy="list-children-nested">
				<origam-list-children :items="nestedItems"/>
			</origam-list>
		</Variant>

		<Variant title="Prop — items (via parent List)">
			<origam-list :items="nestedItems" data-cy="list-children-embedded"/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — note (usage guidance)">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>&lt;origam-list-children&gt;</code> is the recursive
					internal renderer for <code>OrigamList</code>'s items
					tree. It rarely needs to be used standalone — passing
					<code>items</code> directly to <code>&lt;origam-list&gt;</code>
					yields the same render and exposes a richer prop surface.
				</p>
				<p>
					Use this component when you need to render a sub-tree of
					list items inside a custom container, while still
					inheriting the parent list's group / select / activator
					context.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamList, OrigamListChildren } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'

	const flatItems = [
		{ title: 'Inbox',   prependIcon: MDI_ICONS.INBOX },
		{ title: 'Starred', prependIcon: MDI_ICONS.STAR },
		{ title: 'Sent',    prependIcon: MDI_ICONS.SEND },
		{ title: 'Drafts',  prependIcon: MDI_ICONS.FILE_DOCUMENT_OUTLINE },
	]

	const nestedItems = [
		{
			title: 'Mail',
			prependIcon: MDI_ICONS.EMAIL_OUTLINE,
			children: [
				{ title: 'Inbox',   prependIcon: MDI_ICONS.INBOX },
				{ title: 'Sent',    prependIcon: MDI_ICONS.SEND },
				{ title: 'Drafts',  prependIcon: MDI_ICONS.FILE_DOCUMENT_OUTLINE },
			],
		},
		{
			title: 'Calendar',
			prependIcon: MDI_ICONS.CALENDAR,
			children: [
				{ title: 'Today',    prependIcon: MDI_ICONS.CALENDAR_TODAY },
				{ title: 'Upcoming', prependIcon: MDI_ICONS.CALENDAR_CLOCK },
			],
		},
		{ title: 'Settings', prependIcon: MDI_ICONS.COG_OUTLINE },
	]
</script>

<docs lang="md" src="@docs/components/List/OrigamListChildren.md"/>
