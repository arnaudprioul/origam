<template>
	<Story
			group="components"
			title="Card/OrigamCard"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			ICardProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
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
				<HstSelect   v-model="state.color"     title="color"      :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"    :options="intentList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.hover"     title="hover"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.loading"   title="loading"/>
				<HstSelect   v-model="state.border"    title="border"     :options="borderList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<ICardProps>({ bgColor: 'primary' })"
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
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<ICardProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" :hover="state._hHover" title="Hover the card" text="Pick a hover config in the sidebar →" data-cy="card-hover"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures — every config routed through the single `hover` object prop:</small>
						<origam-card bg-color="primary" :hover="{ bgColor: 'success' }"                   title="bg → success" data-cy="card-hover-bg-success"/>
						<origam-card bg-color="primary" :hover="{ border: 'thick' }"                      title="border → thick"   data-cy="card-hover-border-thick"/>
						<origam-card bg-color="primary" :hover="{ rounded: 'full' }"                      title="rounded → full"   data-cy="card-hover-rounded-full"/>
						<origam-card bg-color="primary" :hover="{ elevation: 'xl' }"                      title="elevation → xl"   data-cy="card-hover-elev-xl"/>
						<origam-card bg-color="primary" :hover="{ bgColor: 'success', border: 'thick' }"  title="combo · bg success + thick border" data-cy="card-hover-combo"/>
						<origam-card bg-color="primary" :hover="{ enabled: true, bgColor: 'warning' }"    title="enabled + bg warning (forced on)"  data-cy="card-hover-forced"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
			</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<ICardProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" :active="state._hActive" title="Click & hold the card" text="Pick an active config in the sidebar →" data-cy="card-active"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures — click & hold to see the override:</small>
						<origam-card bg-color="primary" :active="{ bgColor: 'danger' }"                   title="bg → danger" data-cy="card-active-bg-danger"/>
						<origam-card bg-color="primary" :active="{ rounded: 'full' }"                    title="rounded → full" data-cy="card-active-rounded-full"/>
						<origam-card bg-color="primary" :active="{ elevation: 'lg' }"                    title="elevation → lg" data-cy="card-active-elev-lg"/>
						<origam-card bg-color="primary" :active="{ bgColor: 'primary', border: 'thick' }" title="combo · same bg + thick border" data-cy="card-active-combo"/>
						<origam-card bg-color="primary" :active="{ enabled: true, bgColor: 'success' }"   title="enabled + bg success (forced on)" data-cy="card-active-forced"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation & flat"
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

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<ICardProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card :rounded="state.rounded" title="Interactive" text="Tweak controls →" data-cy="card-rounded"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures:</small>
						<origam-card title='rounded={false} (default)' data-cy="card-rounded-default"/>
						<origam-card title='rounded={true}' :rounded="true" data-cy="card-rounded-true"/>
						<origam-card title='Shaped (TL+BR)' rounded="shaped" data-cy="card-rounded-shaped"/>
						<origam-card title='Shaped Invert (TR+BL)' rounded="shaped-invert" data-cy="card-rounded-shaped-invert"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — border"
				:init-state="() => useStoryInitState<ICardProps>({ border: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" title="Interactive card" text="Toggle controls →" data-cy="card-border"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures — every variant routed through the single `border` prop:</small>

						<small>Width:</small>
						<origam-card title='border="thin" (utility, 1px)'  border="thin"   data-cy="card-border-thin"/>
						<origam-card title='border="thick" (utility, 3px)' border="thick"  data-cy="card-border-thick"/>
						<origam-card title=':border="4" (px width)'        :border="4"     data-cy="card-border-w4"/>
						<origam-card title=':border="8" (px width)'        :border="8"     data-cy="card-border-w8"/>

						<small>Style:</small>
						<origam-card title='border="2px dashed"'  border="2px dashed"  data-cy="card-border-dashed"/>
						<origam-card title='border="2px dotted"'  border="2px dotted"  data-cy="card-border-dotted"/>
						<origam-card title='border="3px double"'  border="3px double"  data-cy="card-border-double"/>
						<origam-card title='border="4px groove"'  border="4px groove"  data-cy="card-border-groove"/>

						<small>Color:</small>
						<origam-card title='border="2px solid primary"' border="2px solid var(--origam-color__action--primary---bg)"     data-cy="card-border-primary"/>
						<origam-card title='border="2px solid success"' border="2px solid var(--origam-color__feedback--success---bg)"   data-cy="card-border-success"/>
						<origam-card title='border="2px solid danger"'  border="2px solid var(--origam-color__feedback--danger---bg)"    data-cy="card-border-danger"/>
						<origam-card title='border="3px dashed #ff8a00"' border="3px dashed #ff8a00" data-cy="card-border-orange"/>

						<small>Position:</small>
						<origam-card title='border="top"'     border="top"     data-cy="card-border-top"/>
						<origam-card title='border="right"'   border="right"   data-cy="card-border-right"/>
						<origam-card title='border="bottom"'  border="bottom"  data-cy="card-border-bottom"/>
						<origam-card title='border="left"'    border="left"    data-cy="card-border-left"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.border"      title="border"       :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<ICardProps>({})"
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

		<Variant
				title="Prop — title, subtitle & text"
				:init-state="() => useStoryInitState<ICardProps & { subtitle?: string }>({
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
				<HstSelect v-model="state.prependIcon"   title="prependIcon"       :options="iconList"/>
				<HstSelect v-model="state.appendIcon"    title="appendIcon"        :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar"  title="appendAvatar (URL)"/>
				<HstText   v-model="state.title"         title="title"/>
				<HstText   v-model="state.subtitle"      title="subtitle"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, hover & loading"
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
				<HstCheckbox v-model="state.hover"    title="hover"/>
				<HstCheckbox v-model="state.loading"  title="loading (boolean)"/>
				<HstCheckbox v-model="state.flat"     title="flat"/>
			</template>
		</Variant>

		<Variant
				title="Prop — image"
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

		<Variant
				title="Prop — loading (interactive)"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-card
							:loading="resolveCardLoading(state)"
							title="Interactive loading card"
							subtitle="Subtitle"
							text="Body text for the card demo."
							image="https://picsum.photos/seed/interactive/400/200"
							data-cy="card-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeCardLoading(state) }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.enabled" title="enabled (loading)"/>
				<HstSelect
						v-model="state.kind"
						title="kind"
						:options="[
							{ label: 'true (default)', value: 'bool' },
							{ label: 'number', value: 'number' },
							{ label: '{ type: line }', value: 'line' },
							{ label: '{ type: circular }', value: 'circular' },
							{ label: '{ type: skeleton }', value: 'skeleton' }
						]"
				/>
				<HstNumber v-model="state.progress" title="progress (when kind=number)" :min="0" :max="100" :step="1"/>
				<HstNumber v-model="state.circularSize" title="circular size (when kind=circular)" :min="12" :max="64" :step="2"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-default">
					<div style="padding: 16px;">
						<p>Custom slot content — any markup goes here.</p>
					</div>
				</origam-card>
			</div>
		</Variant>

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

		<Variant title="Slot — loader">
			<div style="padding: 16px;">
				<origam-card loading title="Custom loader" data-cy="card-slot-loader">
					<template #loader>
						<div style="text-align: center; padding: 4px;">Loading...</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — asset">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card title="Asset slot" data-cy="card-slot-asset">
					<template #asset>
						<div style="background: var(--origam-color__surface---raised, #eee); height: 120px; display: flex; align-items: center; justify-content: center;">
							Custom asset placeholder
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — header.append">
			<div style="padding: 16px;">
				<origam-card title="Header append slot" data-cy="card-slot-header-append">
					<template #header.append>
						<origam-icon :icon="MDI_ICONS.DOTS_VERTICAL"/>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — header.content">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-header-content">
					<template #header.content>
						<span>Custom slot content</span>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — header.prepend">
			<div style="padding: 16px;">
				<origam-card title="Header prepend slot" data-cy="card-slot-header-prepend">
					<template #header.prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — header.subtitle">
			<div style="padding: 16px;">
				<origam-card title="With subtitle slot" data-cy="card-slot-header-subtitle">
					<template #header.subtitle>
						<em>Custom subtitle text</em>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — header.title">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-header-title">
					<template #header.title>
						<strong>Custom title</strong>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — text">
			<div style="padding: 16px;">
				<origam-card title="Text slot" data-cy="card-slot-text">
					<template #text>
						<span>Custom slot content</span>
					</template>
				</origam-card>
			</div>
		</Variant>

		<Variant title="Slot — wrapper">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-wrapper">
					<template #wrapper>
						<div style="padding: 24px; border: 2px dashed var(--origam-color__border---subtle);">
							<span>Custom slot content</span>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — click:prepend"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							title="Prepend click"
							:prepend-icon="MDI_ICONS.ACCOUNT"
							data-cy="card-emit-prepend"
							@click:prepend="(e: Event) => { state.log = [`click:prepend fired`, ...state.log].slice(0, 5) }"
					/>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click the prepend icon to fire the event.</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — click:append"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							title="Append click"
							:append-icon="MDI_ICONS.DOTS_VERTICAL"
							data-cy="card-emit-append"
							@click:append="(e: Event) => { state.log = [`click:append fired`, ...state.log].slice(0, 5) }"
					/>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click the append icon to fire the event.</p>
				</div>
			</template>
		</Variant>

		<Variant title="Emit — update:active">
			<div style="padding: 16px;">
				<origam-card
						title="Active state"
						text="Click and hold to trigger active."
						data-cy="card-emit-active"
						@update:active="logEvent('update:active', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — update:hover">
			<div style="padding: 16px;">
				<origam-card
						title="Hover state"
						text="Hover over this card."
						data-cy="card-emit-hover"
						@update:hover="logEvent('update:hover', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamCard, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ICardProps } from '@origam/interfaces'
	import type { TLoadingValue } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		borderList,
		densityList,
		elevationList,
		hoverList,
		iconList,
		intentList,
		roundedList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveCardLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeCardLoading = (state: ILoadingState): string => {
		const v = resolveCardLoading(state)
		return JSON.stringify(v, null, 2)
	}
</script>

<docs lang="md" src="@docs/components/Card/OrigamCard.md"/>
