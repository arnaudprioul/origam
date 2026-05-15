<template>
	<Story
			group="components"
			title="TextareaField/OrigamTextareaField"
	>

		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="variantModel"
						:variant="state.variant"
						label="Label"
						data-cy="textarea-variant"
				/>
				<div data-cy="textarea-variant-status">value = {{ variantModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-textarea-field v-model="colorModel" v-bind="state" label="Colored textarea (interactive)" data-cy="textareafield-color"/>
					<div data-cy="textareafield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-textarea-field :model-value="'Sample text'" color="primary" label='color="primary" only' data-cy="textareafield-color-fixture-color-only"/>
						<origam-textarea-field :model-value="'Sample text'" bg-color="success" label='bg-color="success" only' data-cy="textareafield-color-fixture-bg-only"/>
						<origam-textarea-field :model-value="'Sample text'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="textareafield-color-fixture-combo"/>
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
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-textarea-field v-model="colorModel" v-bind="state" label="Colored textarea (interactive)" data-cy="textareafield-color"/>
					<div data-cy="textareafield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-textarea-field :model-value="'Sample text'" color="primary" label='color="primary" only' data-cy="textareafield-color-fixture-color-only"/>
						<origam-textarea-field :model-value="'Sample text'" bg-color="success" label='bg-color="success" only' data-cy="textareafield-color-fixture-bg-only"/>
						<origam-textarea-field :model-value="'Sample text'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="textareafield-color-fixture-combo"/>
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
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-textarea-field v-model="colorModel" v-bind="state" label="Colored textarea (interactive)" data-cy="textareafield-color"/>
					<div data-cy="textareafield-color-status">value = {{ colorModel ? '(set)' : '(empty)' }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-textarea-field :model-value="'Sample text'" color="primary" label='color="primary" only' data-cy="textareafield-color-fixture-color-only"/>
						<origam-textarea-field :model-value="'Sample text'" bg-color="success" label='bg-color="success" only' data-cy="textareafield-color-fixture-bg-only"/>
						<origam-textarea-field :model-value="'Sample text'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="textareafield-color-fixture-combo"/>
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
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-textarea-field v-model="densityModel" :density="state.density" label="Density textarea" data-cy="textareafield-density"/>
				<div data-cy="textareafield-density-status">value = {{ densityModel ? '(set)' : '(empty)' }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Rows"
				:init-state="() => useStoryInitState<{ rows: number, autoGrow: boolean, maxRows: number }>({ rows: 3, autoGrow: false, maxRows: 8 })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="rowsModel"
						:rows="state.rows"
						:auto-grow="state.autoGrow"
						:max-rows="state.maxRows"
						label="Rows config"
						data-cy="textarea-rows"
				/>
				<div data-cy="textarea-rows-status">value = {{ rowsModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.rows"     title="rows"     :min="1" :max="10"/>
				<HstCheckbox v-model="state.autoGrow" title="autoGrow"/>
				<HstSlider   v-model="state.maxRows"  title="maxRows"  :min="1" :max="20"/>
			</template>
		</Variant>

		<Variant
				title="No resize"
				:init-state="() => useStoryInitState<{ noResize: boolean }>({ noResize: true })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="noResizeModel"
						:no-resize="state.noResize"
						label="No resize"
						data-cy="textarea-no-resize"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.noResize" title="noResize"/>
			</template>
		</Variant>

		<Variant
				title="Counter"
				:init-state="() => useStoryInitState<{ counter: number }>({ counter: 500 })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="counterModel"
						:counter="state.counter"
						label="With counter"
						data-cy="textarea-counter"
				/>
				<div data-cy="textarea-counter-status">value = {{ counterModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.counter" title="counter (max chars)" :min="10" :max="2000"/>
			</template>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Content too long'] : []"
						label="Stateful textarea"
						data-cy="textarea-states"
				/>
				<div data-cy="textarea-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-textarea-field v-model="slotOuterModel" label="With outer slots" data-cy="textarea-slot-outer">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.TEXT_BOX"/>
				</template>
				<template #append>
					<origam-icon :icon="MDI_ICONS.STAR"/>
				</template>
			</origam-textarea-field>
			<div data-cy="textarea-slot-outer-status">value = {{ slotOuterModel }}</div>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-textarea-field v-model="slotInnerModel" label="With inner slots" data-cy="textarea-slot-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.TEXT_BOX"/>
				</template>
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.CLOSE"/>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — clear">
			<origam-textarea-field v-model="slotClearModel" label="Clearable" clearable data-cy="textarea-slot-clear">
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — counter">
			<origam-textarea-field v-model="slotCounterModel" label="Custom counter" :counter="200" data-cy="textarea-slot-counter">
				<template #counter>
					<span>{{ slotCounterModel.length }} / 200</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-textarea-field label="Default slot" data-cy="textarea-slot-default">
				<span>Custom slot content</span>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-textarea-field v-model="slotDetailsModel" label="Custom details" data-cy="textarea-slot-details">
				<template #details>
					<span style="font-size: 0.75rem;">Custom hint text</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-textarea-field v-model="slotFloatingLabelModel" data-cy="textarea-slot-floating-label">
				<template #floatingLabel>
					<span style="font-style: italic;">Floating label</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-textarea-field v-model="slotLabelModel" data-cy="textarea-slot-label">
				<template #label>
					<span style="font-style: italic;">Custom label</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-textarea-field loading label="Loading textarea" data-cy="textarea-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — message">
			<origam-textarea-field v-model="slotMessageModel" label="Single message" :error="true" :error-messages="['Error']" data-cy="textarea-slot-message">
				<template #message="{ message }">
					<span style="font-style: italic;">{{ message }}</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — messages">
			<origam-textarea-field v-model="slotMessagesModel" label="Custom messages" :error="true" :error-messages="['Error one', 'Error two']" data-cy="textarea-slot-messages">
				<template #messages>
					<span style="color: var(--origam-color__action--danger---bg);">Custom error display</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-textarea-field v-model="slotPrefixModel" label="With prefix" data-cy="textarea-slot-prefix">
				<template #prefix>
					<span>Note:</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-textarea-field v-model="slotOuterModel" label="With outer slots" data-cy="textarea-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.TEXT_BOX"/>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-textarea-field v-model="slotInnerModel" label="With inner slots" data-cy="textarea-slot-prepend-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.TEXT_BOX"/>
				</template>
			</origam-textarea-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-textarea-field v-model="slotSuffixModel" label="With suffix" data-cy="textarea-slot-suffix">
				<template #suffix>
					<span>chars</span>
				</template>
			</origam-textarea-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:control">
			<origam-textarea-field
					v-model="emitControlModel"
					label="Click the control"
					data-cy="textarea-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — mousedown:control">
			<origam-textarea-field
					v-model="emitMousedownModel"
					label="Mousedown on control"
					data-cy="textarea-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-textarea-field
					v-model="emitModel"
					label="Type here"
					data-cy="textarea-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="textarea-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — focus / blur">
			<origam-textarea-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="textarea-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:height">
			<origam-textarea-field
					v-model="emitHeightModel"
					label="Auto-grow (watch height)"
					auto-grow
					data-cy="textarea-emit-height"
					@update:height="logEvent('update:height', $event)"
			/>
		</Variant>

		<Variant
				title="Loading — interactive"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-textarea-field
							:loading="resolveTextareaLoading(state)"
							label="Demo field"
							data-cy="textareafield-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeTextareaLoading(state) }}</pre>
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

		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
				<origam-textarea-field label="loading={true}" loading data-cy="textarea-loading-bool"/>
				<origam-textarea-field label="loading={42}" :loading="42" data-cy="textarea-loading-number"/>
				<origam-textarea-field label="loading={ type: 'line' }" :loading="{ type: 'line' }" data-cy="textarea-loading-line"/>
				<origam-textarea-field label="loading={ type: 'circular' }" :loading="{ type: 'circular' }" data-cy="textarea-loading-circular"/>
				<origam-textarea-field label="loading={ type: 'skeleton' }" :loading="{ type: 'skeleton' }" data-cy="textarea-loading-skeleton"/>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITextareaFieldProps>({
					label: 'Message',
					color: 'primary',
					variant: undefined,
					density: undefined,
					rows: 4,
					autoGrow: false,
					noResize: false,
					counter: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="textarea-playground"
				/>
				<div data-cy="textarea-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"   title="label"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant" title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstSlider   v-model="state.rows"    title="rows"    :min="1" :max="12"/>
				<HstCheckbox v-model="state.autoGrow"  title="autoGrow"/>
				<HstCheckbox v-model="state.noResize"  title="noResize"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.error"     title="error"/>
			</template>
		</Variant>

		<Variant
				title="Mode — rich (HTML output)"
				:init-state="() => useStoryInitState<{ disabled?: boolean, readonly?: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richHtmlModel"
							mode="rich"
							output="html"
							label="Rich editor (HTML)"
							placeholder="Start typing — try Cmd+B, Cmd+I, Cmd+U…"
							:disabled="state.disabled"
							:readonly="state.readonly"
							data-cy="textarea-rich-html"
					/>
					<pre data-cy="textarea-rich-html-output" style="font-size: 12px; padding: 8px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">{{ richHtmlModel || '(empty)' }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<Variant
				title="Mode — rich (Markdown output)"
		>
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richMarkdownModel"
							mode="rich"
							output="markdown"
							label="Rich editor (Markdown)"
							placeholder="Bold / italic / links convert to Markdown on emit"
							data-cy="textarea-rich-markdown"
					/>
					<pre data-cy="textarea-rich-markdown-output" style="font-size: 12px; padding: 8px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">{{ richMarkdownModel || '(empty)' }}</pre>
				</div>
			</template>
		</Variant>

		<Variant
				title="Prop — toolbar (filtered)"
		>
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richToolbarFilteredModel"
							mode="rich"
							:toolbar="['bold', 'italic', 'link']"
							label="Filtered toolbar"
							placeholder="Only bold / italic / link are exposed"
							data-cy="textarea-rich-toolbar-filtered"
					/>
				</div>
			</template>
		</Variant>

		<Variant
				title="Prop — toolbarPosition"
				:init-state="() => useStoryInitState<{ toolbarPosition: 'top' | 'bottom' | 'floating' }>({ toolbarPosition: 'top' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richToolbarPositionModel"
							mode="rich"
							:toolbar-position="state.toolbarPosition"
							label="Toolbar position"
							data-cy="textarea-rich-toolbar-position"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.toolbarPosition"
						title="toolbarPosition"
						:options="[
							{ label: 'top', value: 'top' },
							{ label: 'bottom', value: 'bottom' },
							{ label: 'floating', value: 'floating' }
						]"
				/>
			</template>
		</Variant>

		<Variant
				title="Slot — toolbar"
		>
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richSlotToolbarModel"
							mode="rich"
							label="Custom toolbar slot"
							data-cy="textarea-rich-slot-toolbar"
					>
						<template #toolbar="{ format, isFormat }">
							<div role="toolbar" aria-label="Custom toolbar" style="display: flex; gap: 8px; padding: 8px;" data-cy="textarea-rich-slot-toolbar-custom">
								<button type="button" :aria-pressed="isFormat('bold') ? 'true' : 'false'" data-cy="textarea-rich-slot-toolbar-bold" @click="format('bold')">B</button>
								<button type="button" :aria-pressed="isFormat('italic') ? 'true' : 'false'" data-cy="textarea-rich-slot-toolbar-italic" @click="format('italic')">I</button>
								<button type="button" :aria-pressed="isFormat('list-bullet') ? 'true' : 'false'" data-cy="textarea-rich-slot-toolbar-list" @click="format('list-bullet')">UL</button>
							</div>
						</template>
					</origam-textarea-field>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — format"
		>
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-textarea-field
							v-model="richEmitFormatModel"
							mode="rich"
							label="Emit format counter"
							data-cy="textarea-rich-emit-format"
							@format="handleRichFormatEmit"
					/>
					<div data-cy="textarea-rich-emit-format-count">format() invocations: {{ richEmitFormatCount }}</div>
					<div data-cy="textarea-rich-emit-format-last">last command: {{ richEmitFormatLast || '(none)' }}</div>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamTextareaField } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, ITextareaFieldProps } from '@origam/interfaces'
	import type { TLoadingValue, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveTextareaLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeTextareaLoading = (state: ILoadingState): string => {
		const v = resolveTextareaLoading(state)
		return JSON.stringify(v, null, 2)
	}

	const variantModel           = ref('')
	const colorModel             = ref('')
	const densityModel           = ref('')
	const rowsModel              = ref('')
	const noResizeModel          = ref('')
	const counterModel           = ref('')
	const statesModel            = ref('')
	const slotOuterModel         = ref('')
	const slotInnerModel         = ref('')
	const slotClearModel         = ref('')
	const slotCounterModel       = ref('')
	const slotDetailsModel       = ref('')
	const slotFloatingLabelModel = ref('')
	const slotLabelModel         = ref('')
	const slotMessageModel       = ref('')
	const slotMessagesModel      = ref('')
	const slotPrefixModel        = ref('')
	const slotSuffixModel        = ref('')
	const emitModel              = ref('')
	const emitFocusModel         = ref('')
	const emitHeightModel        = ref('')
	const emitControlModel       = ref('')
	const emitMousedownModel     = ref('')
	const playgroundModel        = ref('')

	const richHtmlModel              = ref('<p>Hello <strong>world</strong></p>')
	const richMarkdownModel          = ref('')
	const richToolbarFilteredModel   = ref('')
	const richToolbarPositionModel   = ref('<p>Try switching the toolbar position.</p>')
	const richSlotToolbarModel       = ref('')
	const richEmitFormatModel        = ref('')
	const richEmitFormatCount        = ref(0)
	const richEmitFormatLast         = ref<string>('')

	const handleRichFormatEmit = (command: string) => {
		richEmitFormatCount.value++
		richEmitFormatLast.value = command
		logEvent('format', { command })
	}
</script>

<docs lang="md" src="@docs/components/TextareaField/OrigamTextareaField.md"/>
