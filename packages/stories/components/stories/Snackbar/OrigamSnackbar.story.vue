<template>
	<Story
			group="components"
			title="Snackbar/OrigamSnackbar"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ISnackbarProps>>({
					text: 'Snackbar message',
					bgColor: 'primary',
					color: 'white',
					timeout: -1
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;">
					<origam-btn text="Show" @click="designOpen = true"/>
					<origam-snackbar
							v-model="designOpen"
							:color="state.color"
							:bg-color="state.bgColor"
							:status="state.status"
							:status-icon-position="state.statusIconPosition"
							:rounded="state.rounded"
							:elevation="state.elevation"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:location="state.location"
							:position="state.position"
							:timeout="state.timeout"
							:text="state.text"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Status">
					<HstSelect v-model="state.status"             title="Status"          :options="STATUS_OPTIONS"/>
					<HstSelect v-model="state.statusIconPosition" title="Status Position" :options="STATUS_POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Location">
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Position">
					<HstSelect v-model="state.position" title="Position" :options="POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IBgColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;">
					<origam-btn text="Show" @click="stateOpen = true"/>
					<origam-snackbar
							v-model="stateOpen"
							:bg-color="state.bgColor"
							:hover="resolveHoverState(state.hover)"
							:timeout="-1"
							text="State demo"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover" title="Hover" :options="HOVER_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ISnackbarProps>>({
					text: 'Functional snackbar',
					timeout: 5000,
					multiLine: false,
					vertical: false,
					timer: false
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;">
					<origam-btn text="Show" @click="functionalOpen = true"/>
					<origam-snackbar
							v-model="functionalOpen"
							:text="state.text"
							:timeout="state.timeout"
							:multi-line="state.multiLine"
							:vertical="state.vertical"
							:timer="state.timer"
							:tag="state.tag"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.multiLine" title="Multi Line"/>
					<HstCheckbox v-model="state.vertical"  title="Vertical"/>
				</StoryGroup>
				<StoryGroup title="Timer">
					<HstCheckbox v-model="state.timer"   title="Timer"/>
					<HstNumber   v-model="state.timeout" title="Timeout (ms)" :min="-1" :max="30000" :step="500"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:modelValue">
			<div style="padding: 16px; position: relative; min-height: 120px;">
				<origam-btn text="Show (watch Events)" @click="emitOpen = true"/>
				<origam-snackbar
						v-model="emitOpen"
						text="Watch the Events tab."
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div style="padding: 16px; position: relative; min-height: 120px;">
				<origam-btn text="Show" @click="defaultSlotOpen = true"/>
				<origam-snackbar v-model="defaultSlotOpen">
					<span><strong>Custom</strong> default slot content</span>
				</origam-snackbar>
			</div>
		</Variant>

		<Variant title="Slots - Prepend">
			<div style="padding: 16px; position: relative; min-height: 120px;">
				<origam-btn text="Show with prepend" @click="prependSlotOpen = true"/>
				<origam-snackbar v-model="prependSlotOpen" text="With prepend icon.">
					<template #prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-snackbar>
			</div>
		</Variant>

		<Variant title="Slots - Text">
			<div style="padding: 16px; position: relative; min-height: 120px;">
				<origam-btn text="Show custom text" @click="textSlotOpen = true"/>
				<origam-snackbar v-model="textSlotOpen">
					<template #text>
						<strong>Custom</strong> text slot content.
					</template>
				</origam-snackbar>
			</div>
		</Variant>

		<Variant title="Slots - Action">
			<div style="padding: 16px; position: relative; min-height: 120px;">
				<origam-btn text="Show with action" @click="actionSlotOpen = true"/>
				<origam-snackbar v-model="actionSlotOpen" text="Item deleted.">
					<template #action="{ isActive }">
						<origam-btn
								text="Undo"
								color="primary"
								@click="isActive.value = false"
						/>
					</template>
				</origam-snackbar>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISnackbarProps>({
					text: 'Snackbar message',
					timeout: 5000,
					multiLine: false,
					vertical: false,
					timer: false
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;">
					<origam-btn text="Show" @click="playgroundOpen = true"/>
					<origam-snackbar
							v-model="playgroundOpen"
							v-bind="state"
							@update:model-value="logEvent('update:modelValue', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"    title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"  title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.status"   title="Status"   :options="STATUS_OPTIONS"/>
					<HstSelect v-model="state.rounded"  title="Rounded"  :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.multiLine" title="Multi Line"/>
					<HstCheckbox v-model="state.vertical"  title="Vertical"/>
					<HstCheckbox v-model="state.timer"     title="Timer"/>
					<HstNumber   v-model="state.timeout"   title="Timeout (ms)" :min="-1" :max="30000" :step="500"/>
				</StoryGroup>
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

	import { OrigamBtn, OrigamIcon, OrigamSnackbar } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IBgColorProps,
		IHoverProps,
		ISnackbarProps
	} from '@origam/interfaces'
	import type { TAnchor } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		POSITION_OPTIONS,
		ROUNDED_OPTIONS,
		STATUS_OPTIONS,
		STATUS_POSITION_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const LOCATION_OPTIONS: Array<{ label: string; value: TAnchor | undefined }> = [
		{ label: '(none)', value: undefined },
		{ label: 'bottom', value: 'bottom' },
		{ label: 'top', value: 'top' },
		{ label: 'top start', value: 'top start' },
		{ label: 'top end', value: 'top end' },
		{ label: 'top left', value: 'top left' },
		{ label: 'top right', value: 'top right' },
		{ label: 'bottom start', value: 'bottom start' },
		{ label: 'bottom end', value: 'bottom end' },
		{ label: 'bottom left', value: 'bottom left' },
		{ label: 'bottom right', value: 'bottom right' },
		{ label: 'center', value: 'center' }
	]

	const designOpen = ref(false)
	const stateOpen = ref(false)
	const functionalOpen = ref(false)
	const emitOpen = ref(false)
	const defaultSlotOpen = ref(false)
	const prependSlotOpen = ref(false)
	const textSlotOpen = ref(false)
	const actionSlotOpen = ref(false)
	const playgroundOpen = ref(false)
</script>

<docs lang="md" src="@docs/components/Snackbar/OrigamSnackbar.md"/>
