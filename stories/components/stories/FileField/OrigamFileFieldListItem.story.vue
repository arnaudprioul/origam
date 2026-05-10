<template>
	<Story
			group="components"
			title="FileField/OrigamFileFieldListItem"
	>

		<!--
			<origam-file-field-list-item> renders a single file in the
			list-style display of <origam-file-field>. Needs a real
			File object — built via the `mockFile` helper.
		-->

		<Variant title="Default — single file">
			<div style="padding: 24px; max-width: 480px;">
				<origam-file-field-list-item
						:file="mockFile('spec.pdf', 'application/pdf', 184320)"
						:index="0"
						data-cy="list-item-default"
				/>
			</div>
		</Variant>

		<Variant title="Multiple files (list)">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 4px;">
				<origam-file-field-list-item :file="mockFile('image-1.jpg', 'image/jpeg', 1245184)" :index="0"/>
				<origam-file-field-list-item :file="mockFile('image-2.jpg', 'image/jpeg', 952832)"  :index="1"/>
				<origam-file-field-list-item :file="mockFile('archive.zip', 'application/zip', 8388608)" :index="2"/>
			</div>
		</Variant>

		<Variant title="With upload progress">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 4px;">
				<origam-file-field-list-item :file="mockFile('upload-1.bin', 'application/octet-stream', 524288)" :index="0" :progress="20"/>
				<origam-file-field-list-item :file="mockFile('upload-2.bin', 'application/octet-stream', 524288)" :index="1" :progress="65"/>
				<origam-file-field-list-item :file="mockFile('upload-3.bin', 'application/octet-stream', 524288)" :index="2" :progress="100"/>
			</div>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<{ color: string }>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 480px;">
					<origam-file-field-list-item
							:file="mockFile('tinted.txt', 'text/plain', 4096)"
							:index="0"
							:color="state.color"
							data-cy="list-item-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Disabled / readonly">
			<div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 4px;">
				<origam-file-field-list-item :file="mockFile('disabled.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 32768)" :index="0" disabled/>
				<origam-file-field-list-item :file="mockFile('readonly.txt', 'text/plain', 4096)" :index="1" readonly/>
			</div>
		</Variant>

		<Variant title="Embedded in OrigamFileField (real wiring)">
			<div style="padding: 24px; max-width: 600px;">
				<origam-file-field
						v-model="embeddedFiles"
						label="Pick files"
						multiple
						data-cy="list-item-embedded"
				/>
			</div>
		</Variant>

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
					<origam-file-field-list-item
							:file="mockFile('playground.pdf', 'application/pdf', 256000)"
							:index="0"
							v-bind="state"
							data-cy="list-item-playground"
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamFileField, OrigamFileFieldListItem } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const mockFile = (name: string, type: string, size: number): File => {
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

<docs lang="md" src="@docs/components/FileField/OrigamFileFieldListItem.md"/>
