<template>
	<Story
			group="components"
			title="Card/OrigamCard"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<div style="padding: 16px;">
				<origam-card
						data-cy="card-basic"
						title="Card title"
						subtitle="Subtitle"
						text="Supporting body text for this card."
				/>
			</div>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<!--
			Side-by-side render of every intent so the e2e suite can
			assert the runtime computed `backgroundColor` differs per
			value. Pre-fix `ICardProps` didn't even extend `IColorProps`
			— `<origam-card color="primary">` was a silent no-op.
			Closes the user-reported audit gap on color/bgColor coverage.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" title="Interactive card" text="Tweak controls →" data-cy="card-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures (intent rungs):</small>
						<origam-card bg-color="primary" title="primary" data-cy="card-color-primary"/>
						<origam-card bg-color="success" title="success" data-cy="card-color-success"/>
						<origam-card bg-color="warning" title="warning" data-cy="card-color-warning"/>
						<origam-card bg-color="danger"  title="danger"  data-cy="card-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<{ elevation?: number, flat?: boolean }>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							:elevation="state.elevation"
							:flat="state.flat"
							title="Elevation card"
							text="Shadow changes with elevation."
							data-cy="card-elevation"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.flat" title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED (IRoundedProps) ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card :rounded="state.rounded" title="Interactive" text="Tweak controls →" data-cy="card-rounded"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures:</small>
						<origam-card title='rounded={false} (default)' data-cy="card-rounded-default"/>
						<origam-card title='rounded={true}' :rounded="true" data-cy="card-rounded-true"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" title="Interactive card" text="Toggle controls →" data-cy="card-border"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures:</small>
						<origam-card title='border={false} (default)'                   data-cy="card-border-default"/>
						<origam-card title='border={true}'   :border="true"             data-cy="card-border-true"/>
						<origam-card title='border="top"'    border="top"               data-cy="card-border-top"/>
						<origam-card title='border="right"'  border="right"             data-cy="card-border-right"/>
						<origam-card title='border="bottom"' border="bottom"            data-cy="card-border-bottom"/>
						<origam-card title='border="left"'   border="left"              data-cy="card-border-left"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							:density="state.density"
							title="Density card"
							text="Padding changes with density."
							data-cy="card-density"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ HEADER (adjacent icons) ════════════ -->
		<Variant
				title="Header (adjacent)"
				:init-state="() => useStoryInitState<IAdjacentProps & { title?: string, subtitle?: string }>({
					title: 'Card with icons',
					subtitle: 'Subtitle here'
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							v-bind="state"
							text="Use prepend/append icons to enrich the header."
							data-cy="card-adjacent"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon" title="appendIcon" :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar" title="appendAvatar (URL)"/>
				<HstText   v-model="state.title" title="title"/>
				<HstText   v-model="state.subtitle" title="subtitle"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					hover?: boolean
					loading?: boolean | number
					flat?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							v-bind="state"
							title="States card"
							text="Toggle states in the controls panel."
							data-cy="card-states"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.hover" title="hover"/>
				<HstCheckbox v-model="state.loading" title="loading (boolean)"/>
				<HstCheckbox v-model="state.flat" title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ IMAGE / ASSET ════════════ -->
		<Variant
				title="Image"
				:init-state="() => useStoryInitState<{ image?: string }>({ image: 'https://picsum.photos/600/200' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 400px;">
					<origam-card
							:image="state.image"
							title="Image card"
							text="An asset image above the body."
							data-cy="card-image"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.image" title="image (URL)"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-default">
					<div style="padding: 16px;">
						<p>Custom slot content — any markup goes here.</p>
					</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: header ════════════ -->
		<Variant title="Slot — header">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-header">
					<template #header>
						<div style="padding: 16px; font-weight: 700;">Custom header slot</div>
					</template>
					<div style="padding: 16px;">Body content.</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: footer ════════════ -->
		<Variant title="Slot — footer">
			<div style="padding: 16px;">
				<origam-card title="Footer card" text="Card with footer." data-cy="card-slot-footer">
					<template #footer>
						<div style="padding: 16px; display: flex; justify-content: flex-end; gap: 8px;">
							<origam-btn text="Cancel"/>
							<origam-btn color="primary" text="Confirm"/>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: loader ════════════ -->
		<Variant title="Slot — loader">
			<div style="padding: 16px;">
				<origam-card loading title="Custom loader" data-cy="card-slot-loader">
					<template #loader>
						<div style="text-align: center; padding: 4px;">Loading...</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: asset ════════════ -->
		<Variant title="Slot — asset">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card title="Asset slot" data-cy="card-slot-asset">
					<template #asset>
						<div style="background: var(--origam-color-surface-raised, #eee); height: 120px; display: flex; align-items: center; justify-content: center;">
							Custom asset placeholder
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ EMIT: click:prepend ════════════ -->
		<Variant title="Emit — click:prepend">
			<div style="padding: 16px;">
				<origam-card
						title="Prepend click"
						:prepend-icon="MDI_ICONS.ACCOUNT"
						data-cy="card-emit-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════ EMIT: click:append ════════════ -->
		<Variant title="Emit — click:append">
			<div style="padding: 16px;">
				<origam-card
						title="Append click"
						:append-icon="MDI_ICONS.DOTS_VERTICAL"
						data-cy="card-emit-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICardProps>({
					title: 'Card title',
					subtitle: 'Subtitle',
					text: 'Body text.',
					elevation: undefined,
					flat: false,
					hover: false,
					disabled: false,
					loading: false,
					rounded: undefined,
					density: undefined
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 420px;">
					<origam-card v-bind="state" data-cy="card-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"     title="title"/>
				<HstText     v-model="state.subtitle"  title="subtitle"/>
				<HstText     v-model="state.text"      title="text"/>
				<HstSelect   v-model="state.elevation" title="elevation"  :options="elevationList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"    :options="roundedList"/>
				<HstSelect   v-model="state.density"   title="density"    :options="densityList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.hover"     title="hover"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.loading"   title="loading"/>
				<HstCheckbox v-model="state.border"    title="border"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamCard } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IBorderProps,
		ICardProps,
		IColorProps,
		IDensityProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		iconList,
		intentList,
		roundedList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Card/OrigamCard.md"/>
