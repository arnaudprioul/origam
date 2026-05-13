<template>
	<Story
			group="components"
			title="List/OrigamListItem"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IListItemProps>({
					title: 'List item',
					subtitle: 'Subtitle text',
					density: undefined,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					active: false,
					disabled: false,
					nav: false,
					slim: false,
					lines: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item v-bind="state" data-cy="list-item-playground"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"       title="title"/>
				<HstText     v-model="state.subtitle"    title="subtitle"/>
				<HstSelect   v-model="state.density"     title="density"     :options="densityList"/>
				<HstSelect   v-model="state.color"       title="color"       :options="intentList"/>
				<HstSelect   v-model="state.bgColor"     title="bgColor"     :options="intentList"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
				<HstSelect   v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstSelect   v-model="state.lines"       title="lines"       :options="linesList"/>
				<HstCheckbox v-model="state.active"      title="active"/>
				<HstCheckbox v-model="state.disabled"    title="disabled"/>
				<HstCheckbox v-model="state.nav"         title="nav"/>
				<HstCheckbox v-model="state.slim"        title="slim"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — adjacent (prependIcon / appendIcon)"
				:init-state="() => useStoryInitState<IAdjacentProps & { title?: string }>({ title: 'List item' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item v-bind="state" data-cy="list-item-adjacent"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon"   title="prependIcon"   :options="iconList"/>
				<HstSelect v-model="state.appendIcon"    title="appendIcon"    :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar"  title="appendAvatar (URL)"/>
				<HstText   v-model="state.title"         title="title"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item :density="state.density" title="Dense item" data-cy="list-item-density"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item v-bind="state" title="Colored item" data-cy="list-item-color"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item :rounded="state.rounded" title="Rounded item" data-cy="list-item-rounded"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — lines"
				:init-state="() => useStoryInitState<{ lines?: TLines }>({ lines: LINES.TWO })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item
							:lines="state.lines"
							title="Multi-line item"
							subtitle="This subtitle wraps depending on the lines value"
							data-cy="list-item-lines"
					/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.lines" title="lines" :options="linesList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — active / disabled / nav / slim"
				:init-state="() => useStoryInitState<{ active: boolean, disabled: boolean, nav: boolean, slim: boolean }>({ active: false, disabled: false, nav: false, slim: false })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-item
							:active="state.active"
							:disabled="state.disabled"
							:nav="state.nav"
							:slim="state.slim"
							title="Stateful item"
							subtitle="With subtitle"
							:prepend-icon="MDI_ICONS.ACCOUNT"
							data-cy="list-item-states"
					/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active"   title="active"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.nav"      title="nav"/>
				<HstCheckbox v-model="state.slim"     title="slim"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-list>
				<origam-list-item data-cy="list-item-slot-default">
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">Custom default slot content</span>
				</origam-list-item>
			</origam-list>
		</Variant>

		<Variant title="Slot — title">
			<origam-list>
				<origam-list-item data-cy="list-item-slot-title">
					<template #title="{ title }">
						<strong>{{ title ?? 'Custom Title' }}</strong>
					</template>
				</origam-list-item>
			</origam-list>
		</Variant>

		<Variant title="Slot — subtitle">
			<origam-list>
				<origam-list-item title="Main title" data-cy="list-item-slot-subtitle">
					<template #subtitle>
						<em style="opacity: 0.7;">Custom subtitle slot</em>
					</template>
				</origam-list-item>
			</origam-list>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-list>
				<origam-list-item title="Item with custom prepend" data-cy="list-item-slot-prepend">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.HEART" style="color: var(--origam-color-danger-default);"/>
					</template>
				</origam-list-item>
			</origam-list>
		</Variant>

		<Variant title="Slot — append">
			<origam-list>
				<origam-list-item title="Item with custom append" data-cy="list-item-slot-append">
					<template #append>
						<origam-icon :icon="MDI_ICONS.CHEVRON_RIGHT"/>
					</template>
				</origam-list-item>
			</origam-list>
		</Variant>

		<Variant title="Slot — wrapper">
			<origam-list>
				<origam-list-item data-cy="list-item-slot-wrapper">
					<template #wrapper>
						<div style="display: flex; align-items: center; gap: 12px; padding: 8px 16px;">
							<origam-icon :icon="MDI_ICONS.STAR"/>
							<span>Full wrapper override</span>
						</div>
					</template>
				</origam-list-item>
			</origam-list>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<origam-list>
				<origam-list-item
						link
						title="Click me"
						:prepend-icon="MDI_ICONS.CURSOR_DEFAULT_CLICK"
						data-cy="list-item-emit-click"
						@click="logEvent('click', $event)"
				/>
			</origam-list>
		</Variant>

		<Variant title="Emit — click:prepend">
			<origam-list>
				<origam-list-item
						title="Click the prepend icon"
						:prepend-icon="MDI_ICONS.HEART"
						data-cy="list-item-emit-click-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</origam-list>
		</Variant>

		<Variant title="Emit — click:append">
			<origam-list>
				<origam-list-item
						title="Click the append icon"
						:append-icon="MDI_ICONS.CHEVRON_RIGHT"
						data-cy="list-item-emit-click-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</origam-list>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamList, OrigamListItem } from '@origam/components'
	import { DENSITY, LINES, MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IColorProps,
		IDensityProps,
		IListItemProps,
		IOptions,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TLines } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList, roundedList } from '@stories/const'

	const linesList: Array<IOptions<TLines | undefined>> = [
		{ label: '(none)', value: undefined   },
		{ label: 'One',    value: LINES.ONE   },
		{ label: 'Two',    value: LINES.TWO   },
		{ label: 'Three',  value: LINES.THREE },
	]
</script>
