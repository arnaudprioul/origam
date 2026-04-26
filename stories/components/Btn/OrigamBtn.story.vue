<template>
	<Story
			group="components"
			title="Btn/OrigamBtn"
			:layout="{ type: 'grid', width: 240 }"
	>
		<!--
			REFERENCE STORY — pattern for every other component story.

			Each <Variant> drives one orthogonal concern:
			  • one variant per "prop family" (color, size, density, …)
			  • one variant per slot
			  • one variant per emit
			  • one "playground" variant that exposes everything together

			Histoire's `init-state` is typed via `useStoryInitState<T>` so the
			controls panel matches the component's own prop interfaces.
		-->

		<!-- ════════════ VARIANTS (text/flat/elevated/tonal/outlined/plain) ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariant }>({ variant: undefined })"
		>
			<template #default="{ state }">
				<origam-btn
						:variant="state.variant"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.variant"
						title="variant"
						:options="variantList"
				/>
			</template>
		</Variant>

		<!-- ════════════ COLOR / INTENT ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-btn
						v-bind="state"
						text="Button"
				/>
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

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-btn
						:rounded="state.rounded"
						text="Button"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
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
				<origam-btn
						v-bind="state"
						:prepend-icon="state.stacked ? MDI_ICONS.HEART : undefined"
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

		<!-- ════════════ EMIT: @click ════════════ -->
		<Variant
				title="Emit — click"
				:init-state="() => useStoryInitState<{ count: number }>({ count: 0 })"
		>
			<template #default="{ state }">
				<div style="display: grid; gap: 12px;">
					<origam-btn
							color="primary"
							text="Click me"
							@click="state.count++"
					/>
					<small>Click count : <strong>{{ state.count }}</strong></small>
				</div>
			</template>
		</Variant>

		<!-- ════════════ EMIT: @click:prepend ════════════ -->
		<Variant
				title="Emit — click:prepend"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="display: grid; gap: 12px;">
					<origam-btn
							color="primary"
							:prepend-icon="MDI_ICONS.HEART"
							text="Click the icon"
							@click:prepend="state.log.unshift(`prepend at ${new Date().toLocaleTimeString()}`)"
					/>
					<ul style="font-size: 0.75rem; max-height: 100px; overflow: auto;">
						<li v-for="(line, i) in state.log.slice(0, 5)" :key="i">{{ line }}</li>
					</ul>
				</div>
			</template>
		</Variant>

		<!-- ════════════ EMIT: @click:append ════════════ -->
		<Variant
				title="Emit — click:append"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="display: grid; gap: 12px;">
					<origam-btn
							color="primary"
							:append-icon="MDI_ICONS.ARROW_RIGHT"
							text="Click the chevron"
							@click:append="state.log.unshift(`append at ${new Date().toLocaleTimeString()}`)"
					/>
					<ul style="font-size: 0.75rem; max-height: 100px; overflow: auto;">
						<li v-for="(line, i) in state.log.slice(0, 5)" :key="i">{{ line }}</li>
					</ul>
				</div>
			</template>
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
	import { OrigamBtn, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IBtnProps,
		IColorProps,
		IDensityProps,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'
	import type { TVariant } from '@origam/types'

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
</script>
