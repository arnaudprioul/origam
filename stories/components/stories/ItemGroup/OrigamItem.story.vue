<template>
	<Story
			group="components"
			title="ItemGroup/OrigamItem"
	>

		<!--
			<origam-item> is a renderless registration wrapper inside
			<origam-item-group>. It exposes its `value` to the group's
			selection model via inject. The default slot receives a
			scoped `{ isSelected, toggle }` for the consumer to render
			whatever chrome they want.
		-->

		<Variant
				title="Single-select group"
				:init-state="() => useStoryInitState<{ value: string }>({ value: 'b' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-item-group v-model="state.value" data-cy="item-single">
						<origam-item v-for="v in ['a', 'b', 'c']" :key="v" :value="v">
							<template #default="{ isSelected, toggle }">
								<button
										:class="['demo-pill', { 'demo-pill--active': isSelected }]"
										@click="toggle"
										:data-cy="`item-single-${v}`"
								>
									{{ v.toUpperCase() }}
								</button>
							</template>
						</origam-item>
					</origam-item-group>
					<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 12px;">
						Selected: {{ state.value }}
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.value" title="value" :options="[
					{ label: 'A', value: 'a' },
					{ label: 'B', value: 'b' },
					{ label: 'C', value: 'c' },
				]"/>
			</template>
		</Variant>

		<Variant title="Multi-select group">
			<div style="padding: 24px;">
				<origam-item-group v-model="multiValue" multiple data-cy="item-multi">
					<origam-item v-for="v in ['cat', 'dog', 'fish', 'bird']" :key="v" :value="v">
						<template #default="{ isSelected, toggle }">
							<button
									:class="['demo-pill', { 'demo-pill--active': isSelected }]"
									@click="toggle"
									:data-cy="`item-multi-${v}`"
							>
								{{ v }}
							</button>
						</template>
					</origam-item>
				</origam-item-group>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 12px;">
					Selected: {{ multiValue.join(', ') || '(none)' }}
				</p>
			</div>
		</Variant>

		<Variant title="Mandatory selection">
			<div style="padding: 24px;">
				<origam-item-group v-model="mandatoryValue" mandatory data-cy="item-mandatory">
					<origam-item v-for="v in ['low', 'medium', 'high']" :key="v" :value="v">
						<template #default="{ isSelected, toggle }">
							<button
									:class="['demo-pill', { 'demo-pill--active': isSelected }]"
									@click="toggle"
							>
								{{ v }}
							</button>
						</template>
					</origam-item>
				</origam-item-group>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;">
					Always at least one item selected. Current: {{ mandatoryValue }}
				</p>
			</div>
		</Variant>

		<Variant title="Disabled item (still registered, can't toggle)">
			<div style="padding: 24px;">
				<origam-item-group v-model="disabledValue" data-cy="item-disabled">
					<origam-item value="alpha">
						<template #default="{ isSelected, toggle }">
							<button :class="['demo-pill', { 'demo-pill--active': isSelected }]" @click="toggle">alpha</button>
						</template>
					</origam-item>
					<origam-item value="bravo" disabled>
						<template #default="{ isSelected, toggle }">
							<button
									:class="['demo-pill', { 'demo-pill--active': isSelected, 'demo-pill--disabled': true }]"
									@click="toggle"
									disabled
							>bravo (disabled)</button>
						</template>
					</origam-item>
					<origam-item value="charlie">
						<template #default="{ isSelected, toggle }">
							<button :class="['demo-pill', { 'demo-pill--active': isSelected }]" @click="toggle">charlie</button>
						</template>
					</origam-item>
				</origam-item-group>
			</div>
		</Variant>

		<Variant title="Playground">
			<div style="padding: 24px;">
				<origam-item-group v-model="playgroundValue" data-cy="item-playground">
					<origam-item value="alpha">
						<template #default="slotProps">
							<button class="demo-pill" @click="slotProps.toggle">{{ JSON.stringify(slotProps) }}</button>
						</template>
					</origam-item>
				</origam-item-group>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;">
					Inspect the scoped slot props above (isSelected, toggle, value).
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamItem, OrigamItemGroup } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const multiValue     = ref(['cat'])
	const mandatoryValue = ref('medium')
	const disabledValue  = ref('alpha')
	const playgroundValue = ref()
</script>

<style scoped>
.demo-pill {
	padding: 6px 14px;
	margin-right: 6px;
	border-radius: 999px;
	border: 1px solid var(--origam-color-border-subtle);
	background: var(--origam-color-surface-default);
	cursor: pointer;
	font-size: 0.875rem;
}
.demo-pill--active {
	background: var(--origam-color-action-primary-bg);
	color: var(--origam-color-action-primary-fg);
	border-color: var(--origam-color-action-primary-bg);
}
.demo-pill--disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
</style>

<docs lang="md" src="@docs/components/ItemGroup/OrigamItem.md"/>
