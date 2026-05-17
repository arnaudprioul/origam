<template>
	<Story
			group="components"
			title="Chip/OrigamChip"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IChipProps>({
					text: 'Chip',
					color: undefined,
					bgColor: undefined,
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

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-color-shell">
					<origam-chip v-bind="state" text="Interactive chip" data-cy="chip-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
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
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-color-shell">
					<origam-chip v-bind="state" :hover="state._hHover" text="Interactive chip" data-cy="chip-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
						<origam-chip bg-color="primary" text="primary" data-cy="chip-color-primary"/>
						<origam-chip bg-color="success" text="success" data-cy="chip-color-success"/>
						<origam-chip bg-color="warning" text="warning" data-cy="chip-color-warning"/>
						<origam-chip bg-color="danger"  text="danger"  data-cy="chip-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-color-shell">
					<origam-chip v-bind="state" :active="state._hActive" text="Interactive chip" data-cy="chip-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
						<origam-chip bg-color="primary" text="primary" data-cy="chip-color-primary"/>
						<origam-chip bg-color="success" text="success" data-cy="chip-color-success"/>
						<origam-chip bg-color="warning" text="warning" data-cy="chip-color-warning"/>
						<origam-chip bg-color="danger"  text="danger"  data-cy="chip-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — size"
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
				title="Prop — density"
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
				title="Prop — rounded"
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
				title="Prop — pill"
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
				title="Prop — label"
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
				title="Prop — closable"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="chip-closable-shell">
					<origam-chip
							v-if="closableVisible"
							closable
							text="Close me"
							data-cy="chip-closable"
							@click:close="(e: Event) => {
								state.log = [`click:close`, ...state.log].slice(0, 6)
								closableVisible = false
							}"
					/>
					<span class="story-status" data-cy="chip-closable-status">visible = <strong>{{ closableVisible }}</strong></span>
					<origam-btn size="small" text="Reset" data-cy="chip-closable-reset" @click="closableVisible = true"/>
					<ul v-if="state.log.length" style="font-family: monospace; font-size: 0.8rem; margin: 0; padding-left: 16px;">
						<li v-for="(l, i) in state.log" :key="i">{{ l }}</li>
					</ul>
				</div>
			</template>
		</Variant>

		<Variant
				title="Prop — adjacent (prependIcon / appendIcon)"
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
				title="Prop — draggable"
				:init-state="() => useStoryInitState<{ draggable: boolean }>({ draggable: true })"
		>
			<template #default="{ state }">
				<origam-chip :draggable="state.draggable" text="Drag me" data-cy="chip-draggable"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.draggable" title="draggable"/>
			</template>
		</Variant>

		<Variant title="Prop — filter (inside ChipGroup)">
			<!-- filter prop makes a chip show a check when selected inside a group -->
			<div class="story-shell">
				<origam-chip-group v-model="filterSelected" filter data-cy="chip-filter-group">
					<origam-chip :value="1" filter link text="Option A" data-cy="chip-filter-a"/>
					<origam-chip :value="2" filter link text="Option B" data-cy="chip-filter-b"/>
					<origam-chip :value="3" filter link text="Option C" data-cy="chip-filter-c"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-filter-status">selected = <strong>{{ filterSelected }}</strong></span>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

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

		<Variant title="Slot — append">
			<origam-chip text="With append" data-cy="chip-slot-append">
				<template #append>
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

		<Variant title="Slot — filter">
			<div class="story-shell">
				<origam-chip-group v-model="filterSlotSelected" filter data-cy="chip-slot-filter-group">
					<origam-chip :value="1" filter link text="Option A" data-cy="chip-slot-filter-a">
						<template #filter>
							<origam-icon :icon="MDI_ICONS.HEART" size="x-small"/>
						</template>
					</origam-chip>
					<origam-chip :value="2" filter link text="Option B" data-cy="chip-slot-filter-b"/>
				</origam-chip-group>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant
				title="Emit — click"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-chip
							link
							text="Click me"
							data-cy="chip-emit-click"
							@click="state.log = [`click fired`, ...state.log].slice(0, 6)"
					/>
					<ul v-if="state.log.length" style="font-family: monospace; font-size: 0.8rem; margin: 0; padding-left: 16px;">
						<li v-for="(l, i) in state.log" :key="i">{{ l }}</li>
					</ul>
					<p v-else class="story-status">Click the chip above.</p>
				</div>
			</template>
		</Variant>

		<Variant title="Emit — click:append">
			<origam-chip
					text="Click append"
					:append-icon="MDI_ICONS.HEART"
					data-cy="chip-emit-click-append"
					@click:append="logEvent('click:append', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:close">
			<origam-chip
					closable
					text="Close me"
					data-cy="chip-emit-click-close"
					@click:close="logEvent('click:close', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:prepend">
			<origam-chip
					text="Click prepend"
					:prepend-icon="MDI_ICONS.HEART"
					data-cy="chip-emit-click-prepend"
					@click:prepend="logEvent('click:prepend', $event)"
			/>
		</Variant>

		<Variant title="Emit — group:selected">
			<div class="story-shell">
				<origam-chip-group data-cy="chip-emit-group-selected">
					<origam-chip
							:value="1"
							link
							text="Option A"
							data-cy="chip-emit-selected-a"
							@group:selected="logEvent('group:selected', $event)"
					/>
					<origam-chip
							:value="2"
							link
							text="Option B"
							data-cy="chip-emit-selected-b"
							@group:selected="logEvent('group:selected', $event)"
					/>
				</origam-chip-group>
			</div>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<div class="story-shell">
				<origam-chip-group
						v-model="emitModelValue"
						data-cy="chip-emit-update-model"
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<origam-chip :value="1" link text="A" data-cy="chip-emit-model-a"/>
					<origam-chip :value="2" link text="B" data-cy="chip-emit-model-b"/>
				</origam-chip-group>
				<span class="story-status" data-cy="chip-emit-model-status">selected = <strong>{{ emitModelValue }}</strong></span>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamChip, OrigamChipGroup, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IChipProps,
		IColorProps,
		IDensityProps,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'

	import {
		activeList,
		densityList, iconList, intentList, roundedList, sizeList,
		hoverList
	} from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const closableVisible = ref(true)
	const filterSelected = ref<number | undefined>(undefined)
	const filterSlotSelected = ref<number | undefined>(undefined)
	const emitModelValue = ref<number | undefined>(undefined)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Chip/OrigamChip.md"/>
