<template>
	<Story
			group="components"
			title="Card/OrigamCardHeader"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ICardHeaderProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICardHeaderProps>({
					title: 'Card Title',
					subtitle: 'Card Subtitle',
					density: undefined,
					border: false,
					rounded: undefined
				})"
		>
			<template #default="{ state }">
				<origam-card style="max-width: 400px; margin: 24px auto;">
					<origam-card-header v-bind="state" data-cy="card-header-playground"/>
				</origam-card>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.title"    title="title"/>
				<HstText   v-model="state.subtitle" title="subtitle"/>
				<HstSelect v-model="state.density"  title="density"  :options="densityList"/>
				<HstSelect v-model="state.rounded"  title="rounded"  :options="roundedList"/>
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.borderStyle" title="borderStyle" :options="borderStyleList"/>
				<HstText     v-model="state.borderColor" title="borderColor" placeholder="currentColor"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — title & subtitle">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header
						title="Card Title"
						subtitle="Card Subtitle"
						data-cy="card-header-default"
				/>
			</origam-card>
		</Variant>

		<Variant title="Prop — prependIcon & appendIcon (adjacent)">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header
						title="Account Settings"
						subtitle="Manage your profile"
						:prepend-icon="MDI_ICONS.ACCOUNT"
						:append-icon="MDI_ICONS.DOTS_VERTICAL"
						data-cy="card-header-icons"
				/>
			</origam-card>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<ICardHeaderProps>({ density: undefined })"
		>
			<template #default="{ state }">
				<origam-card style="max-width: 400px; margin: 24px auto;">
					<origam-card-header
							v-bind="state"
							title="Card Title"
							subtitle="Card Subtitle"
							data-cy="card-header-density"
					/>
				</origam-card>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<ICardHeaderProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-card style="max-width: 400px; margin: 24px auto;">
					<origam-card-header
							v-bind="state"
							title="Rounded header"
							subtitle="Adjust the control"
							data-cy="card-header-rounded"
					/>
				</origam-card>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCard, OrigamCardHeader } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ICardHeaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		borderList,
		borderStyleList,
		densityList, roundedList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Card/OrigamCardHeader.md"/>
