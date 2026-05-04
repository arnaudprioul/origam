<template>
	<Story
			group="components"
			title="Alert/OrigamAlert"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-alert text="This is a default alert." data-cy="alert-default"/>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<!--
			Side-by-side render of every intent. IAlertProps already
			extends IColorProps; the showcase surfaces the prop and
			gives the e2e suite a stable target.
		-->
		<Variant title="Color">
			<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
				<origam-alert bg-color="primary" text="primary" data-cy="alert-color-primary"/>
				<origam-alert bg-color="success" text="success" data-cy="alert-color-success"/>
				<origam-alert bg-color="warning" text="warning" data-cy="alert-color-warning"/>
				<origam-alert bg-color="danger"  text="danger"  data-cy="alert-color-danger"/>
			</div>
		</Variant>

		<!-- ════════════ STATUS ════════════ -->
		<Variant
				title="Status"
				:init-state="() => useStoryInitState<{ status?: TStatus }>({ status: 'info' })"
		>
			<template #default="{ state }">
				<origam-alert
						:status="state.status"
						title="Status alert"
						text="Contextual feedback message."
						data-cy="alert-status"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.status" title="status" :options="statusList"/>
			</template>
		</Variant>

		<!-- ════════════ CLOSABLE ════════════ -->
		<Variant title="Closable">
			<div class="story-shell" data-cy="alert-closable-shell">
				<origam-alert
						v-if="closableVisible"
						closable
						text="Dismiss this alert."
						data-cy="alert-closable"
						@click:close="logEvent('click:close', $event); closableVisible = false"
				/>
				<span class="story-status" data-cy="alert-closable-status">visible = <strong>{{ closableVisible }}</strong></span>
				<origam-btn size="small" text="Reset" data-cy="alert-closable-reset" @click="closableVisible = true"/>
			</div>
		</Variant>

		<!-- ════════════ TITLE prop (heading) ════════════ -->
		<Variant
				title="Title prop"
				:init-state="() => useStoryInitState<{ title?: string }>({ title: 'Alert title' })"
		>
			<template #default="{ state }">
				<origam-alert :title="state.title" data-cy="alert-title"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
			</template>
		</Variant>

		<!-- ════════════ TEXT prop (body) ════════════ -->
		<Variant
				title="Text prop"
				:init-state="() => useStoryInitState<{ text?: string }>({ text: 'Alert body text.' })"
		>
			<template #default="{ state }">
				<origam-alert :text="state.text" data-cy="alert-text"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.text" title="text"/>
			</template>
		</Variant>

		<!-- ════════════ PROMINENT ════════════ -->
		<Variant
				title="Prominent"
				:init-state="() => useStoryInitState<{ prominent: boolean }>({ prominent: true })"
		>
			<template #default="{ state }">
				<origam-alert
						:prominent="state.prominent"
						status="info"
						title="Prominent Alert"
						text="Larger icon layout for important messages."
						data-cy="alert-prominent"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.prominent" title="prominent"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-alert :density="state.density" text="Density alert" data-cy="alert-density"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-alert v-bind="state" text="Color alert" data-cy="alert-color"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: title ════════════ -->
		<Variant title="Slot — title">
			<origam-alert text="Body text." data-cy="alert-slot-title">
				<template #title>
					<strong>Custom title via slot</strong>
				</template>
			</origam-alert>
		</Variant>

		<!-- ════════════ SLOT: prepend ════════════ -->
		<Variant title="Slot — prepend">
			<origam-alert text="Custom prepend slot." data-cy="alert-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.SHIELD_CHECK" data-cy="alert-prepend-icon"/>
				</template>
			</origam-alert>
		</Variant>

		<!-- ════════════ EMIT: click:close ════════════ -->
		<Variant title="Emit — click:close">
			<origam-alert
					closable
					text="Click the close button"
					data-cy="alert-emit-close"
					@click:close="logEvent('click:close', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IAlertProps>({
					text: 'Alert message.',
					title: '',
					status: undefined,
					color: undefined,
					density: DENSITY.DEFAULT,
					closable: false,
					prominent: false,
					rounded: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-alert v-bind="state" data-cy="alert-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"      title="text"/>
				<HstText     v-model="state.title"     title="title"/>
				<HstSelect   v-model="state.status"    title="status"    :options="statusList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.closable"  title="closable"/>
				<HstCheckbox v-model="state.prominent" title="prominent"/>
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

	import { OrigamAlert, OrigamBtn, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS, STATUS } from '@origam/enums'
	import type { IAlertProps, IColorProps, IDensityProps } from '@origam/interfaces'
	import type { TStatus } from '@origam/types'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	import type { IOptions } from '@origam/interfaces'

	const statusList: Array<IOptions<TStatus | undefined>> = [
		{ label: '(none)',   value: undefined },
		{ label: 'Success',  value: STATUS.SUCCESS },
		{ label: 'Info',     value: STATUS.INFO },
		{ label: 'Warning',  value: STATUS.WARNING },
		{ label: 'Error',    value: STATUS.ERROR },
	]

	const closableVisible = ref(true)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Alert/OrigamAlert.md"/>
