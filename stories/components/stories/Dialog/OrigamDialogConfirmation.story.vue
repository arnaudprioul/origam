<template>
	<Story
			group="components"
			title="Dialog/OrigamDialogConfirmation"
	>

		<Variant title="Default (cancellable)">
			<div style="padding: 24px;">
				<origam-btn text="Open confirmation" @click="defaultOpen = true" data-cy="dialog-confirm-default-trigger"/>
				<origam-dialog-confirmation
						v-model="defaultOpen"
						title="Delete item?"
						text="This will remove the row permanently. You cannot undo this action."
						data-cy="dialog-confirm-default"
						@confirm="logEvent('confirm', $event)"
						@cancel="logEvent('cancel', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Non-cancellable (force a choice)">
			<div style="padding: 24px;">
				<origam-btn text="Open mandatory" @click="mandatoryOpen = true" data-cy="dialog-confirm-mandatory-trigger"/>
				<origam-dialog-confirmation
						v-model="mandatoryOpen"
						title="Accept terms"
						text="You must accept the updated terms before continuing."
						:cancellable="false"
						data-cy="dialog-confirm-mandatory"
				/>
			</div>
		</Variant>

		<Variant title="Danger intent">
			<div style="padding: 24px;">
				<origam-btn text="Open danger" color="danger" @click="dangerOpen = true" data-cy="dialog-confirm-danger-trigger"/>
				<origam-dialog-confirmation
						v-model="dangerOpen"
						title="Permanently delete account?"
						text="All your data, projects, and settings will be erased. This cannot be undone."
						color="danger"
						data-cy="dialog-confirm-danger"
				/>
			</div>
		</Variant>

		<Variant title="Custom slot — content">
			<div style="padding: 24px;">
				<origam-btn text="Open custom slot" @click="slotOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotOpen"
						title="Move to archive?"
						data-cy="dialog-confirm-slot"
				>
					<template #default>
						<p>The following items will be archived:</p>
						<ul style="margin: 8px 0; padding-left: 24px; font-size: 0.875rem;">
							<li>spec.pdf</li>
							<li>image.png</li>
							<li>notes.md</li>
						</ul>
						<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary);">
							You can restore them within 30 days.
						</p>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					title: string,
					text: string,
					cancellable: boolean,
					fullscreen: boolean,
					color: string,
				}>({
					title: 'Delete item?',
					text: 'This will remove the row permanently.',
					cancellable: true,
					fullscreen: false,
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-btn text="Open playground dialog" @click="playgroundOpen = true" data-cy="dialog-confirm-playground-trigger"/>
					<origam-dialog-confirmation
							v-model="playgroundOpen"
							v-bind="state"
							data-cy="dialog-confirm-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"       title="title"/>
				<HstText     v-model="state.text"        title="text"/>
				<HstCheckbox v-model="state.cancellable" title="cancellable"/>
				<HstCheckbox v-model="state.fullscreen"  title="fullscreen"/>
				<HstSelect   v-model="state.color"       title="color" :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamDialogConfirmation } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const defaultOpen   = ref(false)
	const mandatoryOpen = ref(false)
	const dangerOpen    = ref(false)
	const slotOpen      = ref(false)
	const playgroundOpen = ref(false)
</script>

<docs lang="md" src="@docs/components/Dialog/OrigamDialogConfirmation.md"/>
