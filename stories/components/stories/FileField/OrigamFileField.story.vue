<template>
	<Story
			group="components"
			title="FileField/OrigamFileField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					multiple?: boolean
					display?: TFileFieldDisplay
					showSize?: boolean
					dropzone?: boolean
					disabled?: boolean
					readonly?: boolean
					counter?: boolean
					error?: string
				}>({
					label: 'Upload',
					multiple: false,
					display: 'list',
					showSize: false,
					dropzone: false,
					disabled: false,
					readonly: false,
					counter: false,
					error: ''
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
				<HstSelect   v-model="state.display"  title="display" :options="displayOptions"/>
				<HstCheckbox v-model="state.showSize" title="showSize"/>
				<HstCheckbox v-model="state.dropzone" title="dropzone"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.counter"  title="counter"/>
				<HstText     v-model="state.error"    title="error (string)"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — single + paperclip">
			<origam-file-field
					v-model="files"
					label="Document"
					data-cy="file-field-single-paperclip"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				Default single-file mode — paperclip prepend, file name shows after selection.
			</p>
		</Variant>

		<Variant title="Prop — empty state">
			<origam-file-field
					:model-value="null"
					label="Empty file field"
					placeholder="No file selected"
					data-cy="file-field-empty"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				Empty state — placeholder text + paperclip prepend, no value.
			</p>
		</Variant>

		<Variant title="Prop — multiple (chips)">
			<origam-file-field
					v-model="multiFiles"
					label="Multiple chips"
					multiple
					display="chips"
					data-cy="file-field-chips"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				display="chips" + multiple — each file as a closable OrigamChip.
			</p>
		</Variant>

		<Variant title="Prop — multiple (counter)">
			<origam-file-field
					v-model="multiFiles"
					label="Multiple counter"
					multiple
					display="counter"
					data-cy="file-field-counter"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				display="counter" + multiple — "{n} files" + an OrigamCounter pill.
			</p>
		</Variant>

		<Variant title="Prop — dropzone (empty)">
			<origam-file-field
					v-model="files"
					label="Drop here"
					dropzone
					data-cy="file-field-dropzone-empty"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				dropzone=true + no value — large dashed-border drop area with cloud icon.
			</p>
		</Variant>

		<Variant title="Prop — dropzone (single file)">
			<origam-file-field
					v-model="dropzoneSingleFile"
					label="Single file dropped"
					dropzone
					show-size
					data-cy="file-field-dropzone-single"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				dropzone + single file in model — collapsed card preview with name +
				size + remove action.
			</p>
		</Variant>

		<Variant title="Prop — dropzone (multiple files)">
			<origam-file-field
					v-model="dropzoneMultiFiles"
					label="Multiple files dropped"
					dropzone
					multiple
					show-size
					data-cy="file-field-dropzone-multiple"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				dropzone + multiple — list of cards stacked under the dropzone.
			</p>
		</Variant>

		<Variant title="Prop — dropzone (error)">
			<origam-file-field
					v-model="files"
					label="Errored upload"
					dropzone
					error="File too large — 10 MB max."
					data-cy="file-field-dropzone-error"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				error="…" — paints the dropzone border in danger.bg and prints
				the message under the title.
			</p>
		</Variant>

		<Variant
				title="Prop — disabled & readonly"
				:init-state="() => useStoryInitState<{ disabled?: boolean; readonly?: boolean; dropzone?: boolean }>({ disabled: true, readonly: false, dropzone: true })"
		>
			<template #default="{ state }">
				<origam-file-field
						v-model="files"
						label="Locked"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:dropzone="state.dropzone"
						data-cy="file-field-disabled"
						style="max-width: 400px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.dropzone" title="dropzone"/>
			</template>
		</Variant>

		<Variant title="Prop — showSize">
			<origam-file-field
					v-model="sizedFiles"
					label="Files with size"
					multiple
					show-size
					data-cy="file-field-show-size"
					style="max-width: 400px"
			/>
			<p style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
				show-size + multiple — appends "(2.4 MB)" after each file name.
			</p>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-file-field v-model="colorModel" v-bind="state" label="Colored file (interactive)" data-cy="filefield-color" style="max-width: 400px"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-file-field v-model="variantModel" :variant="state.variant" label="Variant" data-cy="filefield-variant" style="max-width: 400px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-file-field v-model="densityModel" :density="state.density" label="Density file" data-cy="filefield-density" style="max-width: 400px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — dropzone">
			<origam-file-field
					v-model="files"
					label="Custom dropzone"
					dropzone
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

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-file-field
					v-model="files"
					label="Upload"
					style="max-width: 400px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:remove">
			<origam-file-field
					v-model="multiFiles"
					label="Upload"
					multiple
					display="chips"
					style="max-width: 400px"
					@click:remove="logEvent('click:remove', $event)"
			/>
		</Variant>

		<Variant title="Emit — drop">
			<origam-file-field
					v-model="files"
					label="Drop zone"
					dropzone
					style="max-width: 400px"
					@drop="logEvent('drop', $event)"
			/>
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
	import type { TFileFieldDisplay, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	// Per-Variant model refs so the test fixtures remain isolated.
	const files = ref(null)
	const multiFiles = ref([])
	const sizedFiles = ref([])
	const colorModel = ref(null)
	const variantModel = ref(null)
	const densityModel = ref(null)

	// Mode 7 / Mode 8 — pre-populated with synthetic File objects so the
	// dropzone-as-card-preview is visible without a real OS drag.
	const dropzoneSingleFile = ref([
		new File(['demo content'], 'rapport.pdf', { type: 'application/pdf' })
	])
	const dropzoneMultiFiles = ref([
		new File(['lorem ipsum dolor'], 'specs.docx', { type: 'application/msword' }),
		new File([new Uint8Array(2_400_000)], 'design.fig', { type: 'application/octet-stream' }),
		new File(['payload'], 'meeting.txt', { type: 'text/plain' })
	])

	const displayOptions: Array<TFileFieldDisplay> = ['list', 'chips', 'counter']
</script>

<docs lang="md" src="@docs/components/FileField/OrigamFileField.md"/>
