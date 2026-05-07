<template>
	<Story
			group="components"
			title="Btn/OrigamBtn"
	>

		<!--
			REFERENCE STORY — pattern for every other component story.

			Each <Variant> drives one orthogonal concern:
			  • one variant per "prop family" (color, size, density, …)
			  • one variant per slot
			  • one variant per emit — wire the listener to
			    `logEvent('event-name', $event)` (imported from
			    'histoire/client') so the emit shows up in histoire's
			    Events tab. Don't roll your own counter / log list.
			  • one "playground" variant that exposes everything together

			Histoire's `init-state` is typed via `useStoryInitState<T>` so the
			controls panel matches the component's own prop interfaces.
		-->

		<!-- ════════════ VARIANTS (text/flat/elevated/tonal/outlined/ghost/plain) ════════════ -->
		<!--
			Default `color="primary"` so the variants (especially `ghost`'s
			glassmorphic glow + intent border tint) read clearly against
			the Histoire neutral background. Without an intent the ghost
			variant inherits Btn's default text color and the halo barely
			shows.
		-->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariant }>({ variant: undefined })"
		>
			<template #default="{ state }">
				<!--
					`min-height` + generous `padding` give the ghost variant's
					box-shadow halo (`0 4px 18-24px 0` × 2 layers, hover bumps
					to 24px) room to render. Histoire's default render frame
					tightens to the content's bbox, so a 18 px outer halo gets
					clipped at the bottom edge if the wrapper doesn't reserve
					space. `overflow: visible` for the same reason.
				-->
				<div style="display: flex; align-items: center; justify-content: center; min-height: 120px; padding: 24px; overflow: visible;">
					<origam-btn
							:variant="state.variant"
							color="primary"
							text="Button"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.variant"
						title="variant"
						:options="variantList"
				/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-btn v-bind="state" text="Button" data-cy="btn-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px;">
						<origam-btn bg-color="primary" text="primary" data-cy="btn-color-primary"/>
						<origam-btn bg-color="success" text="success" data-cy="btn-color-success"/>
						<origam-btn bg-color="warning" text="warning" data-cy="btn-color-warning"/>
						<origam-btn bg-color="danger"  text="danger"  data-cy="btn-color-danger"/>
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

		<!-- ════════════ SIZES ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({})"
		>
			<template #default="{ state }">
				<origam-btn
						:size="state.size"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-btn
						:density="state.density"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<{ elevation?: number, flat?: boolean }>({})"
		>
			<template #default="{ state }">
				<origam-btn
						:elevation="state.elevation"
						:flat="state.flat"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED (IRoundedProps) ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: 'sm' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-btn :rounded="state.rounded" text="Button" data-cy="btn-rounded"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px; align-items: center;">
						<origam-btn text="default"                   data-cy="btn-rounded-default"/>
						<origam-btn :rounded="0"                     text="0"              data-cy="btn-rounded-0"/>
						<origam-btn rounded="sm"                     text="sm"             data-cy="btn-rounded-sm"/>
						<origam-btn rounded="lg"                     text="lg"             data-cy="btn-rounded-lg"/>
						<origam-btn rounded="circle"                 text="●"              data-cy="btn-rounded-circle"/>
						<origam-btn rounded="shaped"                 text="Shaped"         data-cy="btn-rounded-shaped"/>
						<origam-btn rounded="shaped-invert"          text="Shaped Invert"  data-cy="btn-rounded-shaped-invert"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER (IBorderProps) ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-btn v-bind="state" text="Button" data-cy="btn-border"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px;">
						<origam-btn text="default"                    data-cy="btn-border-default"/>
						<origam-btn :border="true"  text="true"       data-cy="btn-border-true"/>
						<origam-btn border="top"    text="top"        data-cy="btn-border-top"/>
						<origam-btn border="bottom" text="bottom"     data-cy="btn-border-bottom"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ ADJACENT (prepend / append icon, avatar) ════════════ -->
		<Variant
				title="Adjacent"
				:init-state="() => useStoryInitState<IAdjacentProps & { text?: string }>({ text: 'Button' })"
		>
			<template #default="{ state }">
				<origam-btn v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon"  title="prependIcon"  :options="iconList"/>
				<HstSelect v-model="state.appendIcon"   title="appendIcon"   :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar"  title="appendAvatar (URL)"/>
				<HstText   v-model="state.text"          title="text"/>
			</template>
		</Variant>

		<!-- ════════════ STATES (active / disabled / loading / readonly) ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{
					active?: boolean
					disabled?: boolean
					loading?: boolean
					readonly?: boolean
					hover?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<origam-btn
						v-bind="state"
						color="primary"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active"   title="active"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.loading"  title="loading"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.hover"    title="hover (force visual)"/>
			</template>
		</Variant>

		<!-- ════════════ MODIFIERS (block / slim / stacked / icon-only) ════════════ -->
		<Variant
				title="Modifiers"
				:init-state="() => useStoryInitState<{
					block?: boolean
					slim?: boolean
					stacked?: boolean
					icon?: boolean | string
				}>({})"
		>
			<template #default="{ state }">
				<!--
					Stacked example exposes the 3 vertical slots so the
					layout reads as designed: prepend icon on top, label
					in the middle, append icon at the bottom. Without
					append-icon you'd only see top + middle and the
					stacked layout would look incomplete.
				-->
				<origam-btn
						v-bind="state"
						:prepend-icon="state.stacked ? MDI_ICONS.HEART : undefined"
						:append-icon="state.stacked ? MDI_ICONS.STAR : undefined"
						color="primary"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.block"   title="block"/>
				<HstCheckbox v-model="state.slim"    title="slim"/>
				<HstCheckbox v-model="state.stacked" title="stacked"/>
				<HstCheckbox v-model="state.icon"    title="icon (icon-only mode)"/>
			</template>
		</Variant>

		<!-- ════════════ TAG (polymorphism) ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string, href?: string }>({ tag: undefined })"
		>
			<template #default="{ state }">
				<origam-btn
						:tag="state.tag"
						:href="state.href"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
				<HstText   v-model="state.href" title="href (when tag=&quot;a&quot;)"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-btn>
				<span style="font-style: italic;">Custom slot content</span>
			</origam-btn>
		</Variant>

		<!-- ════════════ SLOT: prepend ════════════ -->
		<Variant title="Slot — prepend">
			<origam-btn text="Button">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-btn>
		</Variant>

		<!-- ════════════ SLOT: append ════════════ -->
		<Variant title="Slot — append">
			<origam-btn text="Button">
				<template #append>
					<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
				</template>
			</origam-btn>
		</Variant>

		<!-- ════════════ SLOT: loader ════════════ -->
		<Variant title="Slot — loader">
			<origam-btn loading text="Button">
				<template #loader>
					<span>⏳</span>
				</template>
			</origam-btn>
		</Variant>

		<!-- ════════════ SLOT: wrapper (full override) ════════════ -->
		<Variant title="Slot — wrapper (advanced)">
			<origam-btn>
				<template #wrapper>
					<span style="display:flex; gap: 8px; align-items: center;">
						<span>Wrapper</span>
						<span style="font-size: 0.75em; opacity: 0.6;">(full slot override)</span>
					</span>
				</template>
			</origam-btn>
		</Variant>

		<!--
			Emit variants — each one wires the listener to histoire's
			`logEvent(name, payload)` so emits show up in the dedicated
			"Events" tab of the story (no custom counters / log lists
			needed). Mirrors the origam convention.
		-->

		<!-- ════════════ EMIT: @click ════════════ -->
		<Variant title="Emit — click">
			<origam-btn
					color="primary"
					text="Click me"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: @click:prepend ════════════ -->
		<Variant title="Emit — click:prepend">
			<origam-btn
					color="primary"
					:prepend-icon="MDI_ICONS.HEART"
					text="Click the icon"
					@click:prepend="logEvent('click:prepend', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: @click:append ════════════ -->
		<Variant title="Emit — click:append">
			<origam-btn
					color="primary"
					:append-icon="MDI_ICONS.ARROW_RIGHT"
					text="Click the chevron"
					@click:append="logEvent('click:append', $event)"
			/>
		</Variant>

		<!-- ════════════ LOADING — interactive ════════════ -->
		<Variant
				title="Loading — interactive"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'bool',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-btn
							:loading="resolveLoading(state)"
							text="Click me"
							color="primary"
							data-cy="btn-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color-surface-overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeLoading(state) }}</pre>
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

		<!-- ════════════ LOADING SHAPES ════════════ -->
		<!--
			Demonstrates the full `TLoadingValue` polymorphic API:
			  • boolean true  → defaultKind=circular, indeterminate
			  • number 42     → defaultKind=circular, determinate at 42 %
			  • { type: 'line' }                  → explicit linear renderer
			  • { type: 'circular', size: 16 }    → circular with size override
			  • { type: 'skeleton' }              → skeleton replaces content
		-->
		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; max-width: 480px;">
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={true}</code>
					<origam-btn loading text="Saving..." data-cy="btn-loading-bool"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={42}</code>
					<origam-btn :loading="42" text="42%" data-cy="btn-loading-number"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'line' }}</code>
					<origam-btn :loading="{ type: 'line' }" text="Line loader" data-cy="btn-loading-line"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'circular', size: 16 }}</code>
					<origam-btn :loading="{ type: 'circular', size: 16 }" text="Small spinner" data-cy="btn-loading-circular-override"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code v-pre style="min-width: 240px;">loading={{ type: 'skeleton' }}</code>
					<origam-btn :loading="{ type: 'skeleton' }" text="Skeleton mode" data-cy="btn-loading-skeleton"/>
				</div>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND (everything together) ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBtnProps>({
					color: 'primary',
					variant: undefined,
					size: undefined,
					density: undefined,
					rounded: undefined,
					elevation: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					text: 'Button',
					block: false,
					slim: false,
					stacked: false,
					disabled: false,
					loading: false,
					readonly: false
				})"
		>
			<template #default="{ state }">
				<origam-btn v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"          title="text"/>
				<HstSelect   v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect   v-model="state.variant"       title="variant"       :options="variantList"/>
				<HstSelect   v-model="state.size"          title="size"          :options="sizeList"/>
				<HstSelect   v-model="state.density"       title="density"       :options="densityList"/>
				<HstSelect   v-model="state.rounded"       title="rounded"       :options="roundedList"/>
				<HstSelect   v-model="state.elevation"     title="elevation"     :options="elevationList"/>
				<HstSelect   v-model="state.prependIcon"   title="prependIcon"   :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"    title="appendIcon"    :options="iconList"/>
				<HstCheckbox v-model="state.block"         title="block"/>
				<HstCheckbox v-model="state.slim"          title="slim"/>
				<HstCheckbox v-model="state.stacked"       title="stacked"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.loading"       title="loading"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IBorderProps,
		IBtnProps,
		IColorProps,
		IDensityProps,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'
	import type { TLoadingValue, TVariant } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		iconList,
		intentList,
		roundedList,
		sizeList,
		tagList,
		variantList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeLoading = (state: ILoadingState): string => {
		const v = resolveLoading(state)
		return JSON.stringify(v, null, 2)
	}
</script>

<docs lang="md" src="@docs/components/Btn/OrigamBtn.md"/>
