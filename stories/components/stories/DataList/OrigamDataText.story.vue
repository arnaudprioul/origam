<template>
	<Story
			group="components"
			title="DataList/OrigamDataText"
	>
		<!--
			Playground — first by convention. Wire all main IDataTextProps
			knobs via the sidebar.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTextProps>({
					text: 'arnaud@example.com',
					prependIcon: undefined,
					appendIcon: undefined,
					prependAvatar: undefined,
					appendAvatar: undefined,
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<dl style="margin: 24px;">
					<origam-data-text
							v-bind="state"
							data-cy="data-text-playground"
					/>
				</dl>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"          title="text"/>
				<HstSelect   v-model="state.prependIcon"   title="prependIcon"   :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"    title="appendIcon"    :options="iconList"/>
				<HstSelect   v-model="state.density"       title="density"       :options="densityList"/>
				<HstSelect   v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect   v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — text (plain value)">
			<dl style="margin: 24px;">
				<origam-data-text
						text="hello@example.com"
						data-cy="data-text-default"
				/>
			</dl>
		</Variant>

		<Variant title="Prop — prependIcon">
			<dl style="margin: 24px;">
				<origam-data-text
						text="+33 6 12 34 56 78"
						:prepend-icon="MDI_ICONS.PHONE"
						data-cy="data-text-prepend-icon"
				/>
			</dl>
		</Variant>

		<Variant title="Prop — appendIcon">
			<dl style="margin: 24px;">
				<origam-data-text
						text="https://origam.dev"
						:append-icon="MDI_ICONS.OPEN_IN_NEW"
						data-cy="data-text-append-icon"
				/>
			</dl>
		</Variant>

		<Variant title="Prop — prependAvatar">
			<dl style="margin: 24px;">
				<origam-data-text
						text="Arnaud P."
						prepend-avatar="https://i.pravatar.cc/40?u=arnaud"
						data-cy="data-text-avatar"
				/>
			</dl>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<dl style="margin: 24px;">
					<origam-data-text
							text="Tinted value"
							v-bind="state"
							data-cy="data-text-color"
					/>
				</dl>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<dl style="margin: 24px;">
					<origam-data-text
							text="Density-aware text"
							:density="state.density"
							data-cy="data-text-density"
					/>
				</dl>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<dl style="margin: 24px;">
				<origam-data-text data-cy="data-text-slot-default">
					<strong style="color: var(--origam-color__action--primary---bg);">
						Custom-rendered text via the default slot
					</strong>
				</origam-data-text>
			</dl>
		</Variant>

		<Variant title="Slot — prepend & append">
			<dl style="margin: 24px;">
				<origam-data-text
						text="With slot affixes"
						data-cy="data-text-slot-affixes"
				>
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.STAR"/>
					</template>
					<template #append>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-text>
			</dl>
		</Variant>

		<Variant
				title="Slot — paired with OrigamDataTitle (semantic dl)"
				:init-state="() => useStoryInitState<{ density?: string }>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<dl style="margin: 24px; max-width: 360px;">
					<origam-data-title text="Email"   :density="state.density"/>
					<origam-data-text  text="arnaud@example.com" :density="state.density"/>

					<origam-data-title text="Phone"   :density="state.density"/>
					<origam-data-text  text="+33 6 12 34 56 78"  :density="state.density"/>

					<origam-data-title text="Country" :density="state.density"/>
					<origam-data-text  text="France"  :density="state.density"/>
				</dl>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataText, OrigamDataTitle, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDataTextProps, IDensityProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataText.md"/>
