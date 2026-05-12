<template>
	<Story
			group="components"
			title="Dialog/OrigamDialog"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IDialogProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDialogProps>({
					title: 'Dialog',
					fullscreen: false,
					scrollable: false,
					retainFocus: true
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;" data-cy="dialog-playground-host">
					<origam-dialog v-model="playgroundOpen" v-bind="state">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Open playground" data-cy="dialog-playground-activator"/>
						</template>
						<template #content>
							<p style="padding: 0 16px;">Playground content.</p>
						</template>
						<template #footer>
							<div style="padding: 8px 16px; text-align: right;">
								<origam-btn text="Close" data-cy="dialog-playground-close" @click="playgroundOpen = false"/>
							</div>
						</template>
					</origam-dialog>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"       title="title"/>
				<HstCheckbox v-model="state.fullscreen"  title="fullscreen"/>
				<HstCheckbox v-model="state.scrollable"  title="scrollable"/>
				<HstCheckbox v-model="state.retainFocus" title="retainFocus"/>
				<HstCheckbox v-model="state.persistent"  title="persistent"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — title (default)">
			<div style="padding: 16px;" data-cy="dialog-default-host">
				<origam-dialog v-model="defaultOpen" title="Dialog title">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open dialog" data-cy="dialog-default-activator"/>
					</template>
					<template #content>
						<p style="padding: 0 16px;">Dialog body content goes here.</p>
					</template>
					<template #footer>
						<div style="display: flex; justify-content: flex-end; gap: 8px; padding: 8px 16px;">
							<origam-btn text="Cancel" data-cy="dialog-default-cancel" @click="defaultOpen = false"/>
							<origam-btn color="primary" text="Confirm" data-cy="dialog-default-confirm" @click="defaultOpen = false"/>
						</div>
					</template>
				</origam-dialog>
			</div>
		</Variant>

		<Variant
				title="Prop — fullscreen"
				:init-state="() => useStoryInitState<{ fullscreen: boolean }>({ fullscreen: true })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;" data-cy="dialog-fullscreen-host">
					<origam-dialog v-model="fullscreenOpen" :fullscreen="state.fullscreen" title="Fullscreen dialog">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Open fullscreen" data-cy="dialog-fullscreen-activator"/>
						</template>
						<template #content>
							<p style="padding: 0 16px;">fullscreen={{ state.fullscreen }}</p>
						</template>
						<template #footer>
							<div style="padding: 8px 16px;">
								<origam-btn text="Close" data-cy="dialog-fullscreen-close" @click="fullscreenOpen = false"/>
							</div>
						</template>
					</origam-dialog>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fullscreen" title="fullscreen"/>
			</template>
		</Variant>

		<Variant title="Prop — size">
			<div style="padding: 16px; display: flex; flex-wrap: wrap; gap: 8px;" data-cy="dialog-sizes-host">
				<origam-dialog v-model="sizeXsOpen" size="x-small" title="xs · 320px">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="xs · 320" data-cy="dialog-size-xs-activator"/>
					</template>
					<template #content><p style="padding: 0 16px;">Size x-small — 320px</p></template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn text="Close" data-cy="dialog-size-xs-close" @click="sizeXsOpen = false"/>
						</div>
					</template>
				</origam-dialog>

				<origam-dialog v-model="sizeSmOpen" size="small" title="sm · 400px">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="sm · 400" data-cy="dialog-size-sm-activator"/>
					</template>
					<template #content><p style="padding: 0 16px;">Size small — 400px</p></template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn text="Close" data-cy="dialog-size-sm-close" @click="sizeSmOpen = false"/>
						</div>
					</template>
				</origam-dialog>

				<origam-dialog v-model="sizeMdOpen" size="default" title="md · 720px">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="md · 720" data-cy="dialog-size-md-activator"/>
					</template>
					<template #content><p style="padding: 0 16px;">Size default — 720px</p></template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn text="Close" data-cy="dialog-size-md-close" @click="sizeMdOpen = false"/>
						</div>
					</template>
				</origam-dialog>

				<origam-dialog v-model="sizeLgOpen" size="large" title="lg · 960px">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="lg · 960" data-cy="dialog-size-lg-activator"/>
					</template>
					<template #content><p style="padding: 0 16px;">Size large — 960px</p></template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn text="Close" data-cy="dialog-size-lg-close" @click="sizeLgOpen = false"/>
						</div>
					</template>
				</origam-dialog>

				<origam-dialog v-model="sizeXlOpen" size="x-large" title="xl · 1080px">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="xl · 1080" data-cy="dialog-size-xl-activator"/>
					</template>
					<template #content><p style="padding: 0 16px;">Size x-large — 1080px</p></template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn text="Close" data-cy="dialog-size-xl-close" @click="sizeXlOpen = false"/>
						</div>
					</template>
				</origam-dialog>
			</div>
		</Variant>

		<Variant title="Prop — scrollable">
			<div style="padding: 16px;" data-cy="dialog-scrollable-host">
				<origam-dialog v-model="scrollableOpen" scrollable title="Scrollable dialog">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open scrollable" data-cy="dialog-scrollable-activator"/>
					</template>
					<template #content>
						<div style="padding: 0 16px;">
							<p v-for="n in 20" :key="n">Line {{ n }} of scrollable content.</p>
						</div>
					</template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn color="primary" text="Done" data-cy="dialog-scrollable-close" @click="scrollableOpen = false"/>
						</div>
					</template>
				</origam-dialog>
			</div>
		</Variant>

		<Variant title="Prop — persistent">
			<div style="padding: 16px;" data-cy="dialog-persistent-host">
				<origam-dialog v-model="persistentOpen" persistent title="Persistent dialog">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open persistent" data-cy="dialog-persistent-activator"/>
					</template>
					<template #content>
						<p style="padding: 0 16px;">Cannot close by clicking outside.</p>
					</template>
					<template #footer>
						<div style="padding: 8px 16px; text-align: right;">
							<origam-btn color="danger" text="Close" data-cy="dialog-persistent-close" @click="persistentOpen = false"/>
						</div>
					</template>
				</origam-dialog>
			</div>
		</Variant>

		<Variant
				title="Prop — status"
				:init-state="() => useStoryInitState<{ status?: string }>({ status: 'success' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;" data-cy="dialog-status-host">
					<origam-dialog v-model="statusOpen" :status="state.status as any" title="Status dialog">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Open status dialog" data-cy="dialog-status-activator"/>
						</template>
						<template #content>
							<p style="padding: 0 16px;">Status: {{ state.status }}</p>
						</template>
						<template #footer>
							<div style="padding: 8px 16px; text-align: right;">
								<origam-btn text="OK" data-cy="dialog-status-close" @click="statusOpen = false"/>
							</div>
						</template>
					</origam-dialog>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.status"
						title="status"
						:options="[
							{ label: '(none)', value: undefined },
							{ label: 'success', value: 'success' },
							{ label: 'warning', value: 'warning' },
							{ label: 'danger', value: 'danger' },
							{ label: 'info', value: 'info' }
						]"
				/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — header-prepend">
			<div style="padding: 16px;" data-cy="dialog-slot-header-prepend-host">
				<origam-dialog v-model="slotPrependOpen" title="With prepend icon">
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Open" data-cy="dialog-slot-prepend-activator"/>
					</template>
					<template #header-prepend>
						<origam-icon :icon="MDI_ICONS.INFORMATION" :size="28"/>
					</template>
					<template #content>
						<p style="padding: 0 16px;">Custom header-prepend slot.</p>
					</template>
				</origam-dialog>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;" data-cy="dialog-emit-host">
					<origam-dialog
							v-model="emitOpen"
							title="Emit dialog"
							@update:model-value="(v: boolean) => { state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 5) }"
					>
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Toggle (watch Events tab)" data-cy="dialog-emit-activator"/>
						</template>
						<template #content>
							<p style="padding: 0 16px;">Watch the log below.</p>
						</template>
					</origam-dialog>
					<span data-cy="dialog-emit-state" style="display: block; margin-top: 8px;">open={{ emitOpen }}</span>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 4px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — click:outside"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;" data-cy="dialog-emit-outside-host">
					<origam-dialog
							v-model="emitOutsideOpen"
							title="Click outside"
							@click:outside="(e: MouseEvent) => { state.log = [`click:outside fired`, ...state.log].slice(0, 5) }"
					>
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Open then click outside" data-cy="dialog-emit-outside-activator"/>
						</template>
						<template #content>
							<p style="padding: 0 16px;">Click outside this dialog.</p>
						</template>
					</origam-dialog>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Open the dialog and click outside.</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamBtn, OrigamDialog, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDialogProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultOpen = ref(false)
	const fullscreenOpen = ref(false)
	const scrollableOpen = ref(false)
	const persistentOpen = ref(false)
	const statusOpen = ref(false)
	const slotPrependOpen = ref(false)
	const emitOpen = ref(false)
	const emitOutsideOpen = ref(false)
	const playgroundOpen = ref(false)
	const sizeXsOpen = ref(false)
	const sizeSmOpen = ref(false)
	const sizeMdOpen = ref(false)
	const sizeLgOpen = ref(false)
	const sizeXlOpen = ref(false)
</script>

<docs lang="md" src="@docs/components/Dialog/OrigamDialog.md"/>
