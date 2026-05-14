<template>
	<Story
			group="components"
			title="DataList/OrigamDataTitle"
	>
		<!--
			Playground — first by convention. Wire all main IDataTitleProps
			knobs via the sidebar.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTitleProps>({
					text: 'Email',
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
					<origam-data-title
							v-bind="state"
							data-cy="data-title-playground"
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

		<Variant title="Prop — text (label)">
			<dl style="margin: 24px;">
				<origam-data-title
						text="Email"
						data-cy="data-title-default"
				/>
			</dl>
		</Variant>

		<Variant title="Prop — prependIcon">
			<dl style="margin: 24px;">
				<origam-data-title
						text="Phone"
						:prepend-icon="MDI_ICONS.PHONE"
						data-cy="data-title-prepend-icon"
				/>
			</dl>
		</Variant>

		<Variant title="Prop — prependAvatar">
			<dl style="margin: 24px;">
				<origam-data-title
						text="Author"
						prepend-avatar="https://i.pravatar.cc/40?u=author"
						data-cy="data-title-avatar"
				/>
			</dl>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<dl style="margin: 24px;">
					<origam-data-title
							text="Tinted label"
							v-bind="state"
							data-cy="data-title-color"
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
					<origam-data-title
							text="Density-aware label"
							:density="state.density"
							data-cy="data-title-density"
					/>
				</dl>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (with bound text)">
			<dl style="margin: 24px;">
				<origam-data-title
						text="Customer"
						data-cy="data-title-slot-default"
				>
					<template #default="{ text }">
						<span style="font-variant: small-caps; letter-spacing: 0.08em;">
							{{ text }}
						</span>
					</template>
				</origam-data-title>
			</dl>
		</Variant>

		<Variant title="Slot — append">
			<dl style="margin: 24px;">
				<origam-data-title text="With append slot" data-cy="data-title-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-title>
			</dl>
		</Variant>

		<Variant title="Slot — prepend">
			<dl style="margin: 24px;">
				<origam-data-title text="With prepend slot" data-cy="data-title-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-title>
			</dl>
		</Variant>

		<Variant title="Slot — paired with OrigamDataText (semantic dl/dt/dd)">
			<dl style="margin: 24px; max-width: 360px;">
				<origam-data-title text="Email"   :prepend-icon="MDI_ICONS.EMAIL"/>
				<origam-data-text  text="arnaud@example.com"/>

				<origam-data-title text="Phone"   :prepend-icon="MDI_ICONS.PHONE"/>
				<origam-data-text  text="+33 6 12 34 56 78"/>

				<origam-data-title text="Country" :prepend-icon="MDI_ICONS.MAP"/>
				<origam-data-text  text="France"/>
			</dl>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataText, OrigamDataTitle, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDataTitleProps, IDensityProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataTitle.md"/>
