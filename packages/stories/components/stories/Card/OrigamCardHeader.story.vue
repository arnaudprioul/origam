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
				title="Default"
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

		<!-- ── Slots ─────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header title="Header" data-cy="card-header-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.DOTS_VERTICAL"/>
					</template>
				</origam-card-header>
			</origam-card>
		</Variant>

		<Variant title="Slot — default">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header data-cy="card-header-slot-default">
					<span>Custom slot content</span>
				</origam-card-header>
			</origam-card>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header title="Header" data-cy="card-header-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.ACCOUNT"/>
					</template>
				</origam-card-header>
			</origam-card>
		</Variant>

		<Variant title="Slot — subtitle">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header title="Header" data-cy="card-header-slot-subtitle">
					<template #subtitle>
						<em>Custom subtitle text</em>
					</template>
				</origam-card-header>
			</origam-card>
		</Variant>

		<Variant title="Slot — title">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header data-cy="card-header-slot-title">
					<template #title>
						<strong>Custom title text</strong>
					</template>
				</origam-card-header>
			</origam-card>
		</Variant>

		<Variant title="Slot — wrapper">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header data-cy="card-header-slot-wrapper">
					<template #wrapper>
						<div style="display: flex; gap: 8px; align-items: center; padding: 12px;">
							<span>Wrapper override</span>
						</div>
					</template>
				</origam-card-header>
			</origam-card>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────── -->

		<Variant title="Emit — click:append">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header
						title="Header"
						:append-icon="MDI_ICONS.DOTS_VERTICAL"
						data-cy="card-header-emit-click-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</origam-card>
		</Variant>

		<Variant title="Emit — click:prepend">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-header
						title="Header"
						:prepend-icon="MDI_ICONS.ACCOUNT"
						data-cy="card-header-emit-click-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</origam-card>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamCard, OrigamCardHeader, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ICardHeaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		borderList,
		densityList, roundedList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Card/OrigamCardHeader.md"/>
