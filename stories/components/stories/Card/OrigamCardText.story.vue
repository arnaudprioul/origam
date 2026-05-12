<template>
	<Story
			group="components"
			title="Card/OrigamCardText"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ICardTextProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICardTextProps>({
					text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
					border: false,
					rounded: undefined
				})"
		>
			<template #default="{ state }">
				<origam-card style="max-width: 400px; margin: 24px auto;">
					<origam-card-text v-bind="state" data-cy="card-text-playground"/>
				</origam-card>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"    title="text"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstCheckbox v-model="state.border"  title="border"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — text">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-text
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!"
						data-cy="card-text-default"
				/>
			</origam-card>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<ICardTextProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-card style="max-width: 400px; margin: 24px auto;">
					<origam-card-text
							:rounded="state.rounded"
							text="Rounded card text block."
							data-cy="card-text-rounded"
					/>
				</origam-card>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (rich content)">
			<origam-card style="max-width: 400px; margin: 24px auto;">
				<origam-card-text data-cy="card-text-slot">
					<p>This is <strong>rich</strong> content rendered via the default slot.</p>
					<p>It supports any HTML markup.</p>
				</origam-card-text>
			</origam-card>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCard, OrigamCardText } from '@origam/components'
	import type { ICardTextProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { roundedList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Card/OrigamCardText.md"/>
