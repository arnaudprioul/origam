<template>
	<Story
			group="components"
			title="DefaultsProvider/OrigamDefaultsProvider"
	>

		<!-- ════════════ GLOBAL DEFAULTS ════════════ -->
		<Variant title="Global defaults (density)">
			<origam-defaults-provider
					:defaults="{ global: { density: 'compact' } }"
			>
				<div style="display: flex; gap: 8px; flex-wrap: wrap;">
					<origam-btn text="Button A"/>
					<origam-btn text="Button B" color="primary"/>
					<origam-btn text="Button C" variant="outlined"/>
				</div>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════ COMPONENT-LEVEL DEFAULTS ════════════ -->
		<Variant title="Component-level defaults">
			<origam-defaults-provider
					:defaults="{ 'origam-btn': { color: 'primary', variant: 'flat' } }"
			>
				<div style="display: flex; gap: 8px;">
					<origam-btn text="Inherits primary"/>
					<origam-btn text="Override" color="danger"/>
				</div>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════ SCOPED (no parent inheritance) ════════════ -->
		<Variant title="Scoped (no parent inheritance)">
			<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary' } }">
				<origam-btn text="Sees primary" style="margin-bottom: 8px; display: block;"/>
				<origam-defaults-provider
						:defaults="{ 'origam-btn': { color: 'danger' } }"
						scoped
				>
					<origam-btn text="Scoped: only danger"/>
				</origam-defaults-provider>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════ DISABLED ════════════ -->
		<Variant title="Disabled (pass-through)">
			<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary' } }">
				<origam-btn text="Outer default (primary)" style="margin-bottom: 8px; display: block;"/>
				<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'danger' } }" disabled>
					<origam-btn text="Disabled provider — inherits primary from outer"/>
				</origam-defaults-provider>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-defaults-provider :defaults="{ global: { size: 'small' } }">
				<template #default>
					<origam-btn text="Small from slot"/>
				</template>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					color?: string
					density?: string
					disabled?: boolean
					scoped?: boolean
				}>({
					color: 'primary',
					density: undefined,
					disabled: false,
					scoped: false
				})"
		>
			<template #default="{ state }">
				<origam-defaults-provider
						:defaults="{
							'origam-btn': {
								color:   state.color,
								density: state.density
							}
						}"
						:disabled="state.disabled"
						:scoped="state.scoped"
				>
					<div style="display: flex; gap: 8px; flex-wrap: wrap;">
						<origam-btn text="Button A"/>
						<origam-btn text="Button B" variant="outlined"/>
						<origam-btn text="Button C (explicit)" color="success"/>
					</div>
				</origam-defaults-provider>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.color"   title="injected color"   :options="intentList"/>
				<HstSelect   v-model="state.density" title="injected density" :options="densityList"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.scoped"   title="scoped"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamDefaultsProvider } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/DefaultsProvider/OrigamDefaultsProvider.md"/>
