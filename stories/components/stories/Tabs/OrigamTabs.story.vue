<template>
	<Story
			group="components"
			title="Tabs/OrigamTabs"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITabsProps>({
					variant: TAB_VARIANT.DEFAULT,
					direction: DIRECTION.HORIZONTAL,
					density: DENSITY.DEFAULT,
					fixed: false,
					centered: false,
					mandatory: true,
					disabled: false,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="tabs-playground">
					<origam-tabs v-bind="state" v-model="playgroundValue" data-cy="tabs-playground-host">
						<origam-tab :value="0" data-cy="tab-playground-0">Profile</origam-tab>
						<origam-tab :value="1" data-cy="tab-playground-1">Settings</origam-tab>
						<origam-tab :value="2" data-cy="tab-playground-2">Billing</origam-tab>
					</origam-tabs>

					<origam-tab-panels v-model="playgroundValue" data-cy="tab-panels-playground">
						<origam-tab-panel :value="0" data-cy="panel-playground-0">Profile details panel.</origam-tab-panel>
						<origam-tab-panel :value="1" data-cy="panel-playground-1">Settings panel.</origam-tab-panel>
						<origam-tab-panel :value="2" data-cy="panel-playground-2">Billing panel.</origam-tab-panel>
					</origam-tab-panels>

					<div class="story-status" data-cy="tabs-playground-status">selected = <strong>{{ playgroundValue }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="tabVariantList"/>
				<HstSelect v-model="state.direction" title="direction" :options="tabDirectionList"/>
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
				<HstCheckbox v-model="state.fixed" title="fixed"/>
				<HstCheckbox v-model="state.centered" title="centered"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Prop — variant">
			<div class="story-shell" data-cy="tabs-variant">
				<div class="story-row">
					<div class="story-col" data-cy="tabs-variant-default">
						<strong>default</strong>
						<origam-tabs v-model="variantDefault" :variant="TAB_VARIANT.DEFAULT" data-cy="tabs-variant-default-host">
							<origam-tab :value="0" data-cy="tab-variant-default-0">One</origam-tab>
							<origam-tab :value="1" data-cy="tab-variant-default-1">Two</origam-tab>
						</origam-tabs>
					</div>
					<div class="story-col" data-cy="tabs-variant-pills">
						<strong>pills</strong>
						<origam-tabs v-model="variantPills" :variant="TAB_VARIANT.PILLS" data-cy="tabs-variant-pills-host">
							<origam-tab :value="0" data-cy="tab-variant-pills-0">One</origam-tab>
							<origam-tab :value="1" data-cy="tab-variant-pills-1">Two</origam-tab>
						</origam-tabs>
					</div>
					<div class="story-col" data-cy="tabs-variant-underline">
						<strong>underline</strong>
						<origam-tabs v-model="variantUnderline" :variant="TAB_VARIANT.UNDERLINE" data-cy="tabs-variant-underline-host">
							<origam-tab :value="0" data-cy="tab-variant-underline-0">One</origam-tab>
							<origam-tab :value="1" data-cy="tab-variant-underline-1">Two</origam-tab>
						</origam-tabs>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — direction">
			<div class="story-shell" data-cy="tabs-direction">
				<div class="story-row">
					<div class="story-col" data-cy="tabs-direction-horizontal">
						<strong>horizontal</strong>
						<origam-tabs v-model="directionH" :direction="DIRECTION.HORIZONTAL" data-cy="tabs-direction-h-host">
							<origam-tab :value="0" data-cy="tab-dir-h-0">One</origam-tab>
							<origam-tab :value="1" data-cy="tab-dir-h-1">Two</origam-tab>
							<origam-tab :value="2" data-cy="tab-dir-h-2">Three</origam-tab>
						</origam-tabs>
					</div>
					<div class="story-col" data-cy="tabs-direction-vertical">
						<strong>vertical</strong>
						<origam-tabs v-model="directionV" :direction="DIRECTION.VERTICAL" data-cy="tabs-direction-v-host">
							<origam-tab :value="0" data-cy="tab-dir-v-0">One</origam-tab>
							<origam-tab :value="1" data-cy="tab-dir-v-1">Two</origam-tab>
							<origam-tab :value="2" data-cy="tab-dir-v-2">Three</origam-tab>
						</origam-tabs>
					</div>
				</div>
			</div>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<{ density?: TDensity }>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="tabs-density">
					<origam-tabs v-model="densityValue" :density="state.density" data-cy="tabs-density-host">
						<origam-tab :value="0" data-cy="tab-density-0">Compact</origam-tab>
						<origam-tab :value="1" data-cy="tab-density-1">Default</origam-tab>
						<origam-tab :value="2" data-cy="tab-density-2">Comfortable</origam-tab>
					</origam-tabs>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Prop — disabled">
			<div class="story-shell" data-cy="tabs-disabled">
				<origam-tabs v-model="disabledValue" data-cy="tabs-disabled-host">
					<origam-tab :value="0" data-cy="tab-disabled-0">Enabled A</origam-tab>
					<origam-tab :value="1" disabled data-cy="tab-disabled-1">Disabled</origam-tab>
					<origam-tab :value="2" data-cy="tab-disabled-2">Enabled C</origam-tab>
				</origam-tabs>
				<div class="story-status" data-cy="tabs-disabled-status">selected = <strong>{{ disabledValue }}</strong></div>
			</div>
		</Variant>

		<Variant title="Prop — eager vs lazy">
			<div class="story-shell" data-cy="tabs-eager">
				<origam-tabs v-model="eagerValue" data-cy="tabs-eager-host">
					<origam-tab :value="0" data-cy="tab-eager-0">Tab 0</origam-tab>
					<origam-tab :value="1" data-cy="tab-eager-1">Tab 1</origam-tab>
					<origam-tab :value="2" data-cy="tab-eager-2">Tab 2</origam-tab>
				</origam-tabs>
				<origam-tab-panels v-model="eagerValue" data-cy="tab-panels-eager">
					<origam-tab-panel :value="0" data-cy="panel-eager-0">
						<div data-cy="panel-eager-0-marker">panel 0 (lazy)</div>
					</origam-tab-panel>
					<origam-tab-panel :value="1" eager data-cy="panel-eager-1">
						<div data-cy="panel-eager-1-marker">panel 1 (eager — mounted from start)</div>
					</origam-tab-panel>
					<origam-tab-panel :value="2" data-cy="panel-eager-2">
						<div data-cy="panel-eager-2-marker">panel 2 (lazy)</div>
					</origam-tab-panel>
				</origam-tab-panels>
			</div>
		</Variant>

		<Variant title="Slot — default">
			<div class="story-shell" data-cy="tabs-slot-default">
				<origam-tabs v-model="slotDefaultValue" data-cy="tabs-slot-default-host">
					<origam-tab :value="'inbox'" data-cy="tab-slot-default-inbox">
						<template #default>
							<span class="story-badge">Inbox <em data-cy="tab-slot-default-inbox-count">42</em></span>
						</template>
					</origam-tab>
					<origam-tab :value="'archive'" data-cy="tab-slot-default-archive">Archive</origam-tab>
				</origam-tabs>
			</div>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<div class="story-shell" data-cy="tabs-emit">
				<origam-tabs
						v-model="emitValue"
						data-cy="tabs-emit-host"
						@update:model-value="onEmitChange($event)"
				>
					<origam-tab :value="0" data-cy="tab-emit-0">One</origam-tab>
					<origam-tab :value="1" data-cy="tab-emit-1">Two</origam-tab>
					<origam-tab :value="2" data-cy="tab-emit-2">Three</origam-tab>
				</origam-tabs>
				<div class="story-status" data-cy="tabs-emit-status">
					selected = <strong>{{ emitValue }}</strong> | switches = <strong data-cy="tabs-emit-counter">{{ emitCount }}</strong>
				</div>
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

	import { OrigamTab, OrigamTabPanel, OrigamTabPanels, OrigamTabs } from '@origam/components'
	import { DENSITY, DIRECTION, TAB_VARIANT } from '@origam/enums'
	import type { IOptions, ITabsProps } from '@origam/interfaces'
	import type { TDensity, TTabVariant } from '@origam/types'

	import { densityList, intentList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const tabVariantList: Array<IOptions<TTabVariant>> = [
		{label: 'default', value: TAB_VARIANT.DEFAULT},
		{label: 'pills', value: TAB_VARIANT.PILLS},
		{label: 'underline', value: TAB_VARIANT.UNDERLINE}
	]

	const tabDirectionList: Array<IOptions<'horizontal' | 'vertical'>> = [
		{label: 'horizontal', value: DIRECTION.HORIZONTAL},
		{label: 'vertical', value: DIRECTION.VERTICAL}
	]

	const playgroundValue = ref<number>(0)
	const variantDefault = ref<number>(0)
	const variantPills = ref<number>(0)
	const variantUnderline = ref<number>(0)
	const directionH = ref<number>(0)
	const directionV = ref<number>(0)
	const densityValue = ref<number>(1)
	const disabledValue = ref<number>(0)
	const eagerValue = ref<number>(0)
	const slotDefaultValue = ref<string>('inbox')
	const emitValue = ref<number>(0)
	const emitCount = ref<number>(0)

	const onEmitChange = (value: number) => {
		emitCount.value += 1
		logEvent('update:modelValue', value)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: stretch;
		padding: 16px;
	}

	.story-row {
		display: flex;
		gap: 32px;
		align-items: flex-start;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-status {
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66));
	}

	.story-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.story-badge em {
		font-style: normal;
		font-size: 0.75rem;
		padding: 2px 6px;
		border-radius: 9999px;
		background: var(--origam-color__action--primary---bg, #1976d2);
		color: var(--origam-color__action--primary---fg, white);
	}
</style>

<docs lang="md" src="@docs/components/Tabs/OrigamTabs.md"/>
