<template>
	<Story
			group="components"
			title="Dialog/OrigamDialogConfirmation"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IDialogConfirmationProps knob via the sidebar controls.
		-->
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

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — cancellable (default)">
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

		<Variant title="Prop — cancellable (false) — force a choice">
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

		<Variant title="Prop — color (danger intent)">
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

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (custom content)">
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
						<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary);">
							You can restore them within 30 days.
						</p>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — activator">
			<div style="padding: 24px;">
				<origam-dialog-confirmation
						v-model="slotActivatorOpen"
						title="Confirm action?"
						text="This will apply the change immediately."
						data-cy="dialog-confirm-slot-activator"
				>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open via activator slot" color="primary"/>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — asset">
			<div style="padding: 24px;">
				<origam-btn text="Open asset slot" @click="slotAssetOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotAssetOpen"
						title="Upload complete"
						data-cy="dialog-confirm-slot-asset"
				>
					<template #asset>
						<div style="display: flex; justify-content: center; padding: 16px;">
							<origam-icon :icon="MDI_ICONS.CHECK_CIRCLE" style="font-size: 48px; color: var(--origam-color__feedback--success---bg);"/>
						</div>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — content">
			<div style="padding: 24px;">
				<origam-btn text="Open content slot" @click="slotContentOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotContentOpen"
						title="Custom content"
						data-cy="dialog-confirm-slot-content"
				>
					<template #content>
						<span>Custom slot content</span>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — footer">
			<div style="padding: 24px;">
				<origam-btn text="Open footer slot" @click="slotFooterOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotFooterOpen"
						title="Custom footer"
						text="Footer is fully overridden below."
						data-cy="dialog-confirm-slot-footer"
				>
					<template #footer>
						<div style="padding: 12px 16px; display: flex; justify-content: flex-end; gap: 8px;">
							<origam-btn text="Dismiss" @click="slotFooterOpen = false"/>
						</div>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header">
			<div style="padding: 24px;">
				<origam-btn text="Open header slot" @click="slotHeaderOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderOpen"
						data-cy="dialog-confirm-slot-header"
				>
					<template #header>
						<div style="padding: 16px; font-weight: 700; font-size: 1.125rem;">Custom header slot</div>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header-append">
			<div style="padding: 24px;">
				<origam-btn text="Open header-append slot" @click="slotHeaderAppendOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderAppendOpen"
						title="Header with append"
						data-cy="dialog-confirm-slot-header-append"
				>
					<template #header-append>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header-content">
			<div style="padding: 24px;">
				<origam-btn text="Open header-content slot" @click="slotHeaderContentOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderContentOpen"
						data-cy="dialog-confirm-slot-header-content"
				>
					<template #header-content>
						<span>Custom slot content</span>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header-prepend">
			<div style="padding: 24px;">
				<origam-btn text="Open header-prepend slot" @click="slotHeaderPrependOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderPrependOpen"
						title="Header with prepend"
						data-cy="dialog-confirm-slot-header-prepend"
				>
					<template #header-prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header-subtitle">
			<div style="padding: 24px;">
				<origam-btn text="Open header-subtitle slot" @click="slotHeaderSubtitleOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderSubtitleOpen"
						title="With subtitle slot"
						data-cy="dialog-confirm-slot-header-subtitle"
				>
					<template #header-subtitle>
						<em>Custom subtitle text</em>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — header-title">
			<div style="padding: 24px;">
				<origam-btn text="Open header-title slot" @click="slotHeaderTitleOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotHeaderTitleOpen"
						data-cy="dialog-confirm-slot-header-title"
				>
					<template #header-title>
						<strong>Custom title</strong>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — loader">
			<div style="padding: 24px;">
				<origam-btn text="Open loader slot" @click="slotLoaderOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotLoaderOpen"
						loading
						title="Loading dialog"
						data-cy="dialog-confirm-slot-loader"
				>
					<template #loader>
						<span>Loading…</span>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<Variant title="Slot — text">
			<div style="padding: 24px;">
				<origam-btn text="Open text slot" @click="slotTextOpen = true"/>
				<origam-dialog-confirmation
						v-model="slotTextOpen"
						title="Custom text slot"
						data-cy="dialog-confirm-slot-text"
				>
					<template #text>
						<span>Custom slot content</span>
					</template>
				</origam-dialog-confirmation>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — confirm & cancel"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-btn text="Open" @click="emitOpen = true" data-cy="dialog-confirm-emit-trigger"/>
					<origam-dialog-confirmation
							v-model="emitOpen"
							title="Watch events"
							text="Click confirm or cancel and observe the log."
							data-cy="dialog-confirm-emit"
							@confirm="(e: any) => { state.log = [`confirm fired`, ...state.log].slice(0, 5) }"
							@cancel="(e: any) => { state.log = [`cancel fired`, ...state.log].slice(0, 5) }"
					/>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Open the dialog and click a button.</p>
				</div>
			</template>
		</Variant>

		<Variant title="Emit — cancel">
			<div style="padding: 24px;">
				<origam-btn text="Open" @click="emitCancelOpen = true" data-cy="dialog-confirm-emit-cancel-trigger"/>
				<origam-dialog-confirmation
						v-model="emitCancelOpen"
						title="Watch cancel"
						text="Click cancel and observe the Histoire event log."
						data-cy="dialog-confirm-emit-cancel"
						@cancel="logEvent('cancel', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — validate">
			<div style="padding: 24px;">
				<origam-btn text="Open" @click="emitValidateOpen = true" data-cy="dialog-confirm-emit-validate-trigger"/>
				<origam-dialog-confirmation
						v-model="emitValidateOpen"
						title="Watch validate"
						text="Click confirm and observe the Histoire event log."
						data-cy="dialog-confirm-emit-validate"
						@validate="logEvent('validate', $event)"
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
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamDialogConfirmation, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const defaultOpen             = ref(false)
	const mandatoryOpen           = ref(false)
	const dangerOpen              = ref(false)
	const slotOpen                = ref(false)
	const slotActivatorOpen       = ref(false)
	const slotAssetOpen           = ref(false)
	const slotContentOpen         = ref(false)
	const slotFooterOpen          = ref(false)
	const slotHeaderOpen          = ref(false)
	const slotHeaderAppendOpen    = ref(false)
	const slotHeaderContentOpen   = ref(false)
	const slotHeaderPrependOpen   = ref(false)
	const slotHeaderSubtitleOpen  = ref(false)
	const slotHeaderTitleOpen     = ref(false)
	const slotLoaderOpen          = ref(false)
	const slotTextOpen            = ref(false)
	const emitOpen                = ref(false)
	const emitCancelOpen          = ref(false)
	const emitValidateOpen        = ref(false)
	const playgroundOpen          = ref(false)
</script>

<docs lang="md" src="@docs/components/Dialog/OrigamDialogConfirmation.md"/>
