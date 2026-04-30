<template>
	<Story
			group="components"
			title="ItemGroup/OrigamItemGroup"
	>

		<!-- ════════════ DEFAULT (radio-style — single selection) ════════════ -->
		<Variant title="Default">
			<div class="ig-row">
				<origam-item-group v-model="defaultModel">
					<origam-item v-for="opt in plans" :key="opt.value" :value="opt.value">
						<template #default="{ isSelected, toggle }">
							<origam-card
									border
									rounded="default"
									:class="['ig-card', { 'ig-card--active': isSelected }]"
									@click="toggle"
							>
								<div class="ig-card__icon">{{ opt.icon }}</div>
								<div class="ig-card__title">{{ opt.label }}</div>
								<div class="ig-card__desc">{{ opt.desc }}</div>
							</origam-card>
						</template>
					</origam-item>
				</origam-item-group>
				<div class="ig-status" data-cy="ig-default-status">selected = <strong>{{ defaultModel }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<div class="ig-row">
				<origam-item-group v-model="multipleModel" multiple>
					<origam-item v-for="opt in formats" :key="opt.value" :value="opt.value">
						<template #default="{ isSelected, toggle }">
							<origam-card
									border
									rounded="default"
									:class="['ig-card ig-card--small', { 'ig-card--active': isSelected }]"
									@click="toggle"
							>
								<div class="ig-card__title">{{ opt.label }}</div>
							</origam-card>
						</template>
					</origam-item>
				</origam-item-group>
				<div class="ig-status" data-cy="ig-multiple-status">selected = <strong>{{ multipleModel.join(', ') || '(empty)' }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ MANDATORY ════════════ -->
		<Variant title="Mandatory">
			<div class="ig-row">
				<origam-item-group v-model="mandatoryModel" mandatory>
					<origam-item v-for="opt in plans" :key="opt.value" :value="opt.value">
						<template #default="{ isSelected, toggle }">
							<origam-card
									border
									rounded="default"
									:class="['ig-card', { 'ig-card--active': isSelected }]"
									@click="toggle"
							>
								<div class="ig-card__title">{{ opt.label }}</div>
								<div class="ig-card__desc">Always one selected — clicking the active one is a no-op.</div>
							</origam-card>
						</template>
					</origam-item>
				</origam-item-group>
				<div class="ig-status">selected = <strong>{{ mandatoryModel }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ DISABLED ITEM ════════════ -->
		<Variant title="Disabled item">
			<div class="ig-row">
				<origam-item-group v-model="disabledModel">
					<origam-item v-for="opt in plansWithDisabled" :key="opt.value" :value="opt.value" :disabled="opt.disabled">
						<template #default="{ isSelected, toggle, disabled }">
							<origam-card
									border
									rounded="default"
									:class="['ig-card', { 'ig-card--active': isSelected, 'ig-card--disabled': disabled }]"
									@click="!disabled && toggle()"
							>
								<div class="ig-card__title">{{ opt.label }}</div>
								<div class="ig-card__desc">{{ disabled ? 'Out of stock' : opt.desc }}</div>
							</origam-card>
						</template>
					</origam-item>
				</origam-item-group>
			</div>
		</Variant>

		<!-- ════════════ CUSTOM SELECTED CLASS ════════════ -->
		<Variant title="Custom selectedClass">
			<div class="ig-row">
				<origam-item-group v-model="customClassModel" selected-class="my-custom-active">
					<origam-item v-for="opt in formats" :key="opt.value" :value="opt.value">
						<template #default="{ isSelected, toggle }">
							<origam-card
									border
									rounded="default"
									:class="['ig-card ig-card--small', { 'my-custom-active': isSelected }]"
									@click="toggle"
							>
								<div class="ig-card__title">{{ opt.label }}</div>
							</origam-card>
						</template>
					</origam-item>
				</origam-item-group>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ multiple: boolean, mandatory: boolean }>({ multiple: false, mandatory: false })"
		>
			<template #default="{ state }">
				<div class="ig-row">
					<origam-item-group
							v-model="playgroundModel"
							:multiple="state.multiple"
							:mandatory="state.mandatory"
					>
						<origam-item v-for="opt in plans" :key="opt.value" :value="opt.value">
							<template #default="{ isSelected, toggle }">
								<origam-card
										border
										rounded="default"
										:class="['ig-card', { 'ig-card--active': isSelected }]"
										@click="toggle"
								>
									<div class="ig-card__icon">{{ opt.icon }}</div>
									<div class="ig-card__title">{{ opt.label }}</div>
									<div class="ig-card__desc">{{ opt.desc }}</div>
								</origam-card>
							</template>
						</origam-item>
					</origam-item-group>
					<div class="ig-status">selected = <strong>{{ JSON.stringify(playgroundModel) }}</strong></div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamCard, OrigamItem, OrigamItemGroup } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const plans = [
		{ value: 's', label: 'Small',  icon: '◔', desc: '~ 20 GB · 1 vCPU'  },
		{ value: 'm', label: 'Medium', icon: '◑', desc: '~ 80 GB · 2 vCPU'  },
		{ value: 'l', label: 'Large',  icon: '●', desc: '~ 320 GB · 4 vCPU' },
	]

	const plansWithDisabled = [
		{ value: 's', label: 'Small',  desc: 'Standard',  disabled: false },
		{ value: 'm', label: 'Medium', desc: 'Popular',   disabled: true  },
		{ value: 'l', label: 'Large',  desc: 'Pro tier',  disabled: false },
	]

	const formats = [
		{ value: 'bold',      label: 'Bold' },
		{ value: 'italic',    label: 'Italic' },
		{ value: 'underline', label: 'Underline' },
	]

	const defaultModel    = ref<string | undefined>('m')
	const multipleModel   = ref<Array<string>>(['bold'])
	const mandatoryModel  = ref<string>('s')
	const disabledModel   = ref<string | undefined>('s')
	const customClassModel = ref<string | undefined>('italic')
	const playgroundModel = ref<any>('m')
</script>

<style scoped>
	.ig-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding: 16px;
		align-items: stretch;
	}
	.ig-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px 20px;
		min-width: 180px;
		flex: 1 1 180px;
		max-width: 240px;
		cursor: pointer;
		transition: border-color 0.15s ease, border-width 0.15s ease, box-shadow 0.15s ease;
	}
	.ig-card--small {
		min-width: 120px;
		flex: 0 0 120px;
		min-height: auto;
	}
	.ig-card__icon {
		font-size: 1.75rem;
		line-height: 1;
		opacity: 0.6;
	}
	.ig-card__title {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.ig-card__desc {
		font-size: 0.8125rem;
		opacity: 0.66;
	}
	.ig-card--active,
	.ig-card.my-custom-active {
		border-color: var(--origam-color-action-primary-bg, rgb(124, 58, 237));
		border-width: 2px;
		box-shadow: 0 0 0 4px var(--origam-color-action-primary-bg-subtle, rgba(124, 58, 237, 0.1));
	}
	.ig-card--disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
	.ig-status {
		flex-basis: 100%;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66));
	}
</style>
