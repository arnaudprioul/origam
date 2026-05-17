<template>
	<Story
			group="components"
			title="Tooltip/OrigamTooltip"
	>
		<!--
			Playground — first by convention. Exposes every ITooltipProps knob.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITooltipProps>({
					text: 'Tooltip text',
					openOnHover: true,
					openOnClick: false,
					offset: 10,
					location: 'right'
				})"
		>
			<template #default="{ state }">
				<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-playground-host">
					<origam-tooltip v-bind="state">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Interact with me" data-cy="tooltip-playground-activator"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"        title="text"/>
				<HstSelect   v-model="state.location"    title="location" :options="[
					{ label: 'top', value: 'top' },
					{ label: 'bottom', value: 'bottom' },
					{ label: 'left', value: 'left' },
					{ label: 'right', value: 'right' }
				]"/>
				<HstNumber   v-model="state.offset"      title="offset"/>
				<HstCheckbox v-model="state.openOnHover" title="openOnHover"/>
				<HstCheckbox v-model="state.openOnClick" title="openOnClick"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — location"
				:init-state="() => useStoryInitState<{ location: string }>({ location: 'top' })"
		>
			<template #default="{ state }">
				<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-location-host">
					<origam-tooltip :location="state.location as any" text="Tooltip text">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Hover me" data-cy="tooltip-location-activator"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'top', value: 'top' },
							{ label: 'bottom', value: 'bottom' },
							{ label: 'left', value: 'left' },
							{ label: 'right', value: 'right' }
						]"
				/>
			</template>
		</Variant>

		<Variant
				title="Prop — text"
				:init-state="() => useStoryInitState<{ text: string }>({ text: 'Tooltip content' })"
		>
			<template #default="{ state }">
				<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-text-host">
					<origam-tooltip :text="state.text">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Hover me" data-cy="tooltip-text-activator"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.text" title="text"/>
			</template>
		</Variant>

		<Variant title="Prop — openOnClick">
			<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-click-host">
				<origam-tooltip text="Click tooltip" open-on-click :open-on-hover="false">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Click me" data-cy="tooltip-click-activator"/>
					</template>
				</origam-tooltip>
			</div>
		</Variant>

		<Variant
				title="Prop — offset"
				:init-state="() => useStoryInitState<{ offset: number }>({ offset: 20 })"
		>
			<template #default="{ state }">
				<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-offset-host">
					<origam-tooltip :offset="state.offset" text="Offset tooltip">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Hover me" data-cy="tooltip-offset-activator"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.offset" title="offset"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — activator">
			<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-slot-activator-host">
				<origam-tooltip text="Tooltip text">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Custom activator" data-cy="tooltip-slot-activator-btn"/>
					</template>
				</origam-tooltip>
			</div>
		</Variant>

		<Variant title="Slot — default (rich content)">
			<div style="padding: 48px; display: flex; align-items: center; justify-content: center;" data-cy="tooltip-slot-default-host">
				<origam-tooltip location="top">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Rich tooltip" data-cy="tooltip-slot-activator"/>
					</template>
					<strong>Bold</strong> tooltip with <em>custom markup</em>.
				</origam-tooltip>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<div style="padding: 48px; display: flex; align-items: center; justify-content: center; gap: 16px;" data-cy="tooltip-emit-host">
				<origam-tooltip
						text="Watch Events tab"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Hover (watch Events)" data-cy="tooltip-emit-activator"/>
					</template>
				</origam-tooltip>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamTooltip } from '@origam/components'
	import type { ITooltipProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Tooltip/OrigamTooltip.md"/>
