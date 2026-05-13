<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumbItem"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBreadcrumbItemProps>({
					title: 'Breadcrumb item',
					href: '/',
					disabled: false,
					density: undefined,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item v-bind="state" data-cy="breadcrumb-item-playground"/>
						</li>
					</ol>
				</origam-breadcrumb>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"       title="title"/>
				<HstText     v-model="state.href"        title="href"/>
				<HstSelect   v-model="state.color"       title="color"       :options="intentList"/>
				<HstSelect   v-model="state.bgColor"     title="bgColor"     :options="intentList"/>
				<HstSelect   v-model="state.density"     title="density"     :options="densityList"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
				<HstSelect   v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstCheckbox v-model="state.disabled"    title="disabled"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item v-bind="state" title="Home" href="/" data-cy="breadcrumb-item-color"/>
						</li>
					</ol>
				</origam-breadcrumb>
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
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item :density="state.density" title="Dense item" data-cy="breadcrumb-item-density"/>
						</li>
					</ol>
				</origam-breadcrumb>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — adjacent (prependIcon / appendIcon)"
				:init-state="() => useStoryInitState<IAdjacentProps>({ prependIcon: MDI_ICONS.HOME })"
		>
			<template #default="{ state }">
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item v-bind="state" title="Home" href="/" data-cy="breadcrumb-item-adjacent"/>
						</li>
					</ol>
				</origam-breadcrumb>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon"   title="prependIcon"   :options="iconList"/>
				<HstSelect v-model="state.appendIcon"    title="appendIcon"    :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar"  title="appendAvatar (URL)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item :rounded="state.rounded" title="Rounded" data-cy="breadcrumb-item-rounded"/>
						</li>
					</ol>
				</origam-breadcrumb>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled & active"
				:init-state="() => useStoryInitState<{ disabled: boolean, active: boolean }>({ disabled: false, active: false })"
		>
			<template #default="{ state }">
				<origam-breadcrumb>
					<ol class="origam-breadcrumb__items">
						<li class="origam-breadcrumb__item">
							<origam-breadcrumb-item
									:disabled="state.disabled"
									:active="state.active"
									title="Item"
									href="/item"
									data-cy="breadcrumb-item-states"
							/>
						</li>
					</ol>
				</origam-breadcrumb>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.active"   title="active"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-breadcrumb>
				<ol class="origam-breadcrumb__items">
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Ignored when slot used" data-cy="breadcrumb-item-slot-default">
							<template #default>
								<strong style="color: var(--origam-color__action--primary---bg);">Custom Content</strong>
							</template>
						</origam-breadcrumb-item>
					</li>
				</ol>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-breadcrumb>
				<ol class="origam-breadcrumb__items">
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="With custom prepend" href="/" data-cy="breadcrumb-item-slot-prepend">
							<template #prepend>
								<origam-icon :icon="MDI_ICONS.HOME" style="font-size: 1em; margin-right: 4px;"/>
							</template>
						</origam-breadcrumb-item>
					</li>
				</ol>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slot — append">
			<origam-breadcrumb>
				<ol class="origam-breadcrumb__items">
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="With custom append" href="/" data-cy="breadcrumb-item-slot-append">
							<template #append>
								<origam-icon :icon="MDI_ICONS.OPEN_IN_NEW" style="font-size: 0.8em; margin-left: 4px;"/>
							</template>
						</origam-breadcrumb-item>
					</li>
				</ol>
			</origam-breadcrumb>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamBreadcrumb,
		OrigamBreadcrumbItem,
		OrigamIcon
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IBreadcrumbItemProps,
		IColorProps,
		IDensityProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList, roundedList } from '@stories/const'
</script>
