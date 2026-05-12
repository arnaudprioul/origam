<template>
	<Story
			group="components"
			title="FileField/OrigamFileFieldDragNDropItem"
	>
		<!--
			<origam-file-field-drag-n-drop-item> renders a single dropped
			file inside the drop-zone variant of <origam-file-field>. It
			needs a real File object — stories below build mock Files via
			`new File([blob], name)`.
		-->

		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					progress: number,
					disabled: boolean,
					readonly: boolean,
					showSize: boolean,
					color: string,
				}>({
					progress: 0,
					disabled: false,
					readonly: false,
					showSize: true,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 480px;">
					<origam-file-field-drag-n-drop-item
							:file="mockFile('playground.pdf', 'application/pdf', 256000)"
							:index="0"
							v-bind="state"
							data-cy="dnd-item-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.progress"  title="progress" :min="0" :max="100" :step="1"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.showSize"  title="showSize"/>
				<HstSelect   v-model="state.color"     title="color"    :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — file (PDF)">
			<div style="padding: 24px; max-width: 480px;">
				<origam-file-field-drag-n-drop-item
						:file="mockFile('spec.pdf', 'application/pdf', 184320)"
						:index="0"
						data-cy="dnd-item-default"
				/>
			</div>
		</Variant>

		<Variant title="Prop — progress">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 12px;">
				<origam-file-field-drag-n-drop-item
						:file="mockFile('image.png', 'image/png', 4096000)"
						:index="0"
						:progress="35"
						data-cy="dnd-item-progress-35"
				/>
				<origam-file-field-drag-n-drop-item
						:file="mockFile('upload-finished.zip', 'application/zip', 1024000)"
						:index="1"
						:progress="100"
						data-cy="dnd-item-progress-100"
				/>
			</div>
		</Variant>

		<Variant title="Prop — showSize">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 12px;">
				<origam-file-field-drag-n-drop-item :file="mockFile('big.iso', 'application/octet-stream', 4 * 1024 * 1024 * 1024)" :index="0" :show-size="1024"/>
				<origam-file-field-drag-n-drop-item :file="mockFile('big.iso', 'application/octet-stream', 4 * 1024 * 1024 * 1024)" :index="1" :show-size="1000"/>
			</div>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 480px;">
					<origam-file-field-drag-n-drop-item
							:file="mockFile('tinted.txt', 'text/plain', 4096)"
							:index="0"
							:color="state.color"
							data-cy="dnd-item-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Prop — disabled & readonly">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 12px;">
				<origam-file-field-drag-n-drop-item :file="mockFile('disabled.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 32768)" :index="0" disabled/>
				<origam-file-field-drag-n-drop-item :file="mockFile('readonly.txt', 'text/plain', 4096)" :index="1" readonly/>
			</div>
		</Variant>

		<Variant title="Prop — embedded in OrigamFileField">
			<div style="padding: 24px; max-width: 600px;">
				<origam-file-field
						v-model="embeddedFiles"
						label="Drop files here"
						multiple
						drag-n-drop
						data-cy="dnd-item-embedded"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamFileField, OrigamFileFieldDragNDropItem } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const mockFile = (name: string, type: string, size: number): File => {
		// Histoire runs in the browser — `File` is available. The blob's
		// content doesn't matter, only its declared `size`.
		const blob = new Blob([new Uint8Array(Math.min(size, 64))], { type })
		const file = new File([blob], name, { type })
		Object.defineProperty(file, 'size', { value: size })
		return file
	}

	const embeddedFiles = ref<File[]>([
		mockFile('seed.png', 'image/png', 4096000),
		mockFile('notes.md', 'text/markdown', 8192),
	])
</script>

<docs lang="md" src="@docs/components/FileField/OrigamFileFieldDragNDropItem.md"/>
