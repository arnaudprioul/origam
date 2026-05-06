<template>
	<Story
			group="components"
			title="FileField/OrigamFileField"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant
				title="Basic"
				:init-state="() => useStoryInitState<{ label?: string }>({ label: 'Upload file' })"
		>
			<template #default="{ state }">
				<origam-file-field
						v-model="files"
						:label="state.label"
						style="max-width: 400px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.label" title="label"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-file-field v-model="colorModel" v-bind="state" label="Colored file (interactive)" data-cy="filefield-color" style="max-width: 400px"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-file-field color="primary" label='color="primary" only' data-cy="filefield-color-fixture-color-only" style="max-width: 400px"/>
						<origam-file-field bg-color="success" label='bg-color="success" only' data-cy="filefield-color-fixture-bg-only" style="max-width: 400px"/>
						<origam-file-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="filefield-color-fixture-combo" style="max-width: 400px"/>
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

		<!-- ════════════ VARIANT (TVariantInput) ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-file-field v-model="variantModel" :variant="state.variant" label="Variant" data-cy="filefield-variant" style="max-width: 400px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-file-field v-model="densityModel" :density="state.density" label="Density file" data-cy="filefield-density" style="max-width: 400px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant
				title="Multiple files"
				:init-state="() => useStoryInitState<{ chips?: boolean; showSize?: boolean }>({ chips: false, showSize: false })"
		>
			<template #default="{ state }">
				<origam-file-field
						v-model="multiFiles"
						label="Upload files"
						multiple
						:chips="state.chips"
						:show-size="state.showSize"
						style="max-width: 400px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.chips"    title="chips"/>
				<HstCheckbox v-model="state.showSize" title="showSize"/>
			</template>
		</Variant>

		<!-- ════════════ DRAG & DROP ════════════ -->
		<Variant title="Drag and drop (single)">
			<origam-file-field
					v-model="files"
					label="Drop file here"
					dragndrop
					style="max-width: 400px"
			/>
		</Variant>

		<!-- ════════════ DRAG & DROP MULTIPLE ════════════ -->
		<Variant title="Drag and drop (multiple)">
			<origam-file-field
					v-model="multiFiles"
					label="Drop files here"
					dragndrop
					multiple
					style="max-width: 400px"
			/>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled?: boolean; readonly?: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-file-field
						v-model="files"
						label="Upload"
						:disabled="state.disabled"
						:readonly="state.readonly"
						style="max-width: 400px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: dropzone ════════════ -->
		<Variant title="Slot — dropzone">
			<origam-file-field
					v-model="files"
					label="Custom dropzone"
					dragndrop
					style="max-width: 400px"
			>
				<template #dropzone="{ isDragging, browse }">
					<div style="text-align: center; padding: 24px;">
						<p>{{ isDragging ? 'Release to upload!' : 'Custom dropzone — click to browse' }}</p>
						<origam-btn size="small" text="Browse" @click="browse"/>
					</div>
				</template>
			</origam-file-field>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-file-field
					v-model="files"
					label="Upload"
					style="max-width: 400px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: click:remove ════════════ -->
		<Variant title="Emit — click:remove">
			<origam-file-field
					v-model="multiFiles"
					label="Upload"
					multiple
					chips
					style="max-width: 400px"
					@click:remove="logEvent('click:remove', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: drop ════════════ -->
		<Variant title="Emit — drop">
			<origam-file-field
					v-model="files"
					label="Drop zone"
					dragndrop
					style="max-width: 400px"
					@drop="logEvent('drop', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					multiple?: boolean
					chips?: boolean
					showSize?: boolean
					dragndrop?: boolean
					disabled?: boolean
					readonly?: boolean
					counter?: boolean
				}>({
					label: 'Upload',
					multiple: false,
					chips: false,
					showSize: false,
					dragndrop: false,
					disabled: false,
					readonly: false,
					counter: false
				})"
		>
			<template #default="{ state }">
				<origam-file-field
						v-model="files"
						v-bind="state"
						style="max-width: 400px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"    title="label"/>
				<HstCheckbox v-model="state.multiple" title="multiple"/>
				<HstCheckbox v-model="state.chips"    title="chips"/>
				<HstCheckbox v-model="state.showSize" title="showSize"/>
				<HstCheckbox v-model="state.dragndrop" title="dragndrop"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.counter"  title="counter"/>
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

	import { OrigamBtn, OrigamFileField } from '@origam/components'
	import { DENSITY, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const files = ref(null)
	const multiFiles = ref([])
	const colorModel = ref(null)
	const variantModel = ref(null)
	const densityModel = ref(null)
</script>

<docs lang="md" src="@docs/components/FileField/OrigamFileField.md"/>
