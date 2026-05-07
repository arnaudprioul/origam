<template>
	<Story
			group="components"
			title="Chip/OrigamChip"
	>

		<Variant title="Default">
			<origam-chip text="My chip" data-cy="chip-default"/>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-chip v-bind="state" text="Interactive chip" data-cy="chip-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px;">
						<origam-chip bg-color="primary" text="primary" data-cy="chip-color-primary"/>
						<origam-chip bg-color="success" text="success" data-cy="chip-color-success"/>
						<origam-chip bg-color="warning" text="warning" data-cy="chip-color-warning"/>
						<origam-chip bg-color="danger"  text="danger"  data-cy="chip-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Closable">
			<div class="story-shell" data-cy="chip-closable-shell">
				<origam-chip
						v-if="closableVisible"
						closable
						text="Close me"
						data-cy="chip-closable"
						@click:close="logEvent('click:close', $event); closableVisible = false"
				/>
				<span class="story-status" data-cy="chip-closable-status">visible = <strong>{{ closableVisible }}</strong></span>
				<origam-btn size="small" text="Reset" data-cy="chip-closable-reset" @click="closableVisible = true"/>
			</div>
		</Variant>

		<Variant title="Filter">
			<div class="story-shell">
				<origam-chip-group v-model="filterSelected" filter data-cy="chip-filter-group">
					<origam-chip :value="1" filter link text="Option A" data-cy="chip-filter-a"/>
					<origam-chip :value="2" filter link text="Option B" data-cy="chip-filter-b"/>
					<origam-chip :value="3" filter link text="Option C" data-cy="chip-filter-c"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-filter-status">selected = <strong>{{ filterSelected }}</strong></span>
			</div>
		</Variant>

		<Variant
				title="Pill"
				:init-state="() => useStoryInitState<{ pill: boolean }>({ pill: true })"
		>
			<template #default="{ state }">
				<origam-chip :pill="state.pill" text="Pill chip" data-cy="chip-pill"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.pill" title="pill"/>
			</template>
		</Variant>

		<Variant
				title="Label shape"
				:init-state="() => useStoryInitState<{ label: boolean }>({ label: true })"
		>
			<template #default="{ state }">
				<origam-chip :label="state.label" text="Label chip" data-cy="chip-label"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.label" title="label"/>
			</template>
		</Variant>

		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({})"
		>
			<template #default="{ state }">
				<origam-chip :size="state.size" text="Size" data-cy="chip-size"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-chip :density="state.density" text="Density" data-cy="chip-density"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-chip v-bind="state" text="Color" data-cy="chip-color"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Adjacent"
				:init-state="() => useStoryInitState<IAdjacentProps & { text?: string }>({ text: 'Chip', prependIcon: MDI_ICONS.ACCOUNT })"
		>
			<template #default="{ state }">
				<origam-chip v-bind="state" data-cy="chip-adjacent"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstText   v-model="state.text"        title="text"/>
			</template>
		</Variant>

		<Variant
				title="Draggable"
				:init-state="() => useStoryInitState<{ draggable: boolean }>({ draggable: true })"
		>
			<template #default="{ state }">
				<origam-chip :draggable="state.draggable" text="Drag me" data-cy="chip-draggable"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.draggable" title="draggable"/>
			</template>
		</Variant>

		<Variant title="Emit — click">
			<origam-chip
					link
					text="Click me"
					data-cy="chip-emit-click"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<Variant title="Slot — default">
			<origam-chip data-cy="chip-slot-default">
				<span style="font-style: italic;">Custom slot</span>
			</origam-chip>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-chip text="With prepend" data-cy="chip-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART" size="x-small"/>
				</template>
			</origam-chip>
		</Variant>

		<Variant title="Slot — close">
			<origam-chip closable text="Custom close" data-cy="chip-slot-close">
				<template #close>
					<origam-icon :icon="MDI_ICONS.CLOSE" size="x-small" data-cy="chip-close-custom"/>
				</template>
			</origam-chip>
		</Variant>

		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 12px; align-items: center; padding: 16px; flex-wrap: wrap;">
					<origam-chip :rounded="state.rounded" text="Interactive"     data-cy="chip-rounded"/>
					<origam-chip rounded="shaped"         text="Shaped"          data-cy="chip-rounded-shaped"/>
					<origam-chip rounded="shaped-invert"  text="Shaped Invert"   data-cy="chip-rounded-shaped-invert"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IChipProps>({
					text: 'Chip',
					color: undefined,
					size: undefined,
					density: DENSITY.DEFAULT,
					rounded: undefined,
					closable: false,
					pill: false,
					label: false,
					draggable: false,
					prependIcon: undefined,
					appendIcon: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-chip v-bind="state" data-cy="chip-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"        title="text"/>
				<HstSelect   v-model="state.color"       title="color"       :options="intentList"/>
				<HstSelect   v-model="state.bgColor"     title="bgColor"     :options="intentList"/>
				<HstSelect   v-model="state.size"        title="size"        :options="sizeList"/>
				<HstSelect   v-model="state.density"     title="density"     :options="densityList"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
				<HstSelect   v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstCheckbox v-model="state.closable"    title="closable"/>
				<HstCheckbox v-model="state.pill"        title="pill"/>
				<HstCheckbox v-model="state.label"       title="label"/>
				<HstCheckbox v-model="state.draggable"   title="draggable"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamChip, OrigamChipGroup, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IChipProps,
		IColorProps,
		IDensityProps,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'

	import { densityList, iconList, intentList, roundedList, sizeList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const closableVisible = ref(true)
	const filterSelected = ref<number | undefined>(undefined)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Chip/OrigamChip.md"/>
