<template>
	<Story
			group="components"
			title="Btn/OrigamBtn"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
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

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariant }>({ variant: undefined })"
		>
			<template #default="{ state }">
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

		<Variant
				title="Prop — color & bgColor"
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
			</template>
		</Variant>

		<Variant
				title="Prop — hover (hoverColor & hoverBgColor)"
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
			</template>
		</Variant>

		<Variant
				title="Prop — active (activeColor & activeBgColor)"
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
			</template>
		</Variant>

		<Variant
				title="Prop — size"
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

		<Variant
				title="Prop — density"
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

		<Variant
				title="Prop — elevation & flat"
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

		<Variant
				title="Prop — rounded"
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

		<Variant
				title="Prop — border"
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
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — prependIcon & appendIcon"
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

		<Variant
				title="Prop — disabled, loading & readonly"
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

		<Variant
				title="Prop — block, slim & stacked"
				:init-state="() => useStoryInitState<{
					block?: boolean
					slim?: boolean
					stacked?: boolean
					icon?: boolean | string
				}>({})"
		>
			<template #default="{ state }">
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

		<Variant
				title="Prop — tag"
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

		<Variant
				title="Prop — loading (interactive)"
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
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeLoading(state) }}</pre>
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

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-btn>
				<span style="font-style: italic;">Custom slot content</span>
			</origam-btn>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-btn text="Button">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-btn>
		</Variant>

		<Variant title="Slot — append">
			<origam-btn text="Button">
				<template #append>
					<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
				</template>
			</origam-btn>
		</Variant>

		<Variant title="Slot — loader">
			<origam-btn loading text="Button">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-btn>
		</Variant>

		<Variant title="Slot — wrapper (full override)">
			<origam-btn>
				<template #wrapper>
					<span style="display:flex; gap: 8px; align-items: center;">
						<span>Wrapper</span>
						<span style="font-size: 0.75em; opacity: 0.6;">(full slot override)</span>
					</span>
				</template>
			</origam-btn>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<origam-btn
					color="primary"
					text="Click me"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:prepend">
			<origam-btn
					color="primary"
					:prepend-icon="MDI_ICONS.HEART"
					text="Click the icon"
					@click:prepend="logEvent('click:prepend', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:append">
			<origam-btn
					color="primary"
					:append-icon="MDI_ICONS.ARROW_RIGHT"
					text="Click the chevron"
					@click:append="logEvent('click:append', $event)"
			/>
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
		borderList,
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
