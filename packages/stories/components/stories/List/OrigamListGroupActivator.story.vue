<template>
	<Story
			group="components"
			title="List/OrigamListGroupActivator"
	>

		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IListActivatorProps>>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group title="Mail">
						<template #activator="{ props: activatorProps }">
							<origam-list-group-activator
									v-bind="activatorProps"
									:tag="state.tag"
							>
								Mail
							</origam-list-group-activator>
						</template>
						<origam-list-item title="Inbox"/>
						<origam-list-item title="Sent"/>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-list>
				<origam-list-group>
					<template #activator="{ props: activatorProps }">
						<origam-list-group-activator v-bind="activatorProps">
							<span>Custom slot content</span>
						</origam-list-group-activator>
					</template>
					<origam-list-item title="Inbox"/>
					<origam-list-item title="Sent"/>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IListActivatorProps>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group title="Mail" :prepend-icon="mailIcon">
						<template #activator="{ props: activatorProps }">
							<origam-list-group-activator v-bind="{ ...activatorProps, ...state }">
								Mail
							</origam-list-group-activator>
						</template>
						<origam-list-item title="Inbox"/>
						<origam-list-item title="Sent"/>
					</origam-list-group>
					<origam-list-group title="Calendar" :prepend-icon="calendarIcon">
						<origam-list-item title="Today"/>
						<origam-list-item title="Upcoming"/>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Functional">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamList,
		OrigamListGroup,
		OrigamListGroupActivator,
		OrigamListItem
	} from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IListActivatorProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { TAG_OPTIONS } from '@stories/const'

	const mailIcon = MDI_ICONS.EMAIL_OUTLINE
	const calendarIcon = MDI_ICONS.CALENDAR
</script>

<docs lang="md" src="@docs/components/List/OrigamListGroupActivator.md"/>
