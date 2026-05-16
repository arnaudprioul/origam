<template>
	<Story
			group="components"
			title="InlineEdit/OrigamInlineEdit"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IInlineEditProps>({
					modelValue: 'Initial title',
					placeholder: 'Click to edit',
					autoFocus: true,
					selectOnFocus: true,
					confirmOnBlur: true,
					confirmOnEnter: true,
					cancelOnEscape: true,
					disabled: false,
					multiline: false,
					trim: true,
					inputType: 'text',
					loadingOnConfirm: false,
					showActions: false
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="inline-edit-playground"
				>
					<origam-inline-edit
							v-model="state.modelValue"
							:placeholder="state.placeholder"
							:auto-focus="state.autoFocus"
							:select-on-focus="state.selectOnFocus"
							:confirm-on-blur="state.confirmOnBlur"
							:confirm-on-enter="state.confirmOnEnter"
							:cancel-on-escape="state.cancelOnEscape"
							:disabled="state.disabled"
							:multiline="state.multiline"
							:trim="state.trim"
							:input-type="state.inputType"
							:loading-on-confirm="state.loadingOnConfirm"
							:show-actions="state.showActions"
							data-cy="inline-edit-playground-host"
					/>
					<output
							class="story-state"
							data-cy="inline-edit-playground-state"
					>{{ state.modelValue }}</output>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.placeholder"
						title="placeholder"
				/>
				<HstCheckbox
						v-model="state.autoFocus"
						title="autoFocus"
				/>
				<HstCheckbox
						v-model="state.selectOnFocus"
						title="selectOnFocus"
				/>
				<HstCheckbox
						v-model="state.confirmOnBlur"
						title="confirmOnBlur"
				/>
				<HstCheckbox
						v-model="state.confirmOnEnter"
						title="confirmOnEnter"
				/>
				<HstCheckbox
						v-model="state.cancelOnEscape"
						title="cancelOnEscape"
				/>
				<HstCheckbox
						v-model="state.disabled"
						title="disabled"
				/>
				<HstCheckbox
						v-model="state.multiline"
						title="multiline"
				/>
				<HstCheckbox
						v-model="state.trim"
						title="trim"
				/>
				<HstSelect
						v-model="state.inputType"
						title="inputType"
						:options="['text', 'number', 'email', 'tel']"
				/>
				<HstCheckbox
						v-model="state.loadingOnConfirm"
						title="loadingOnConfirm"
				/>
				<HstCheckbox
						v-model="state.showActions"
						title="showActions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — validate (min length)">
			<div
					class="story-shell"
					data-cy="inline-edit-validate-min"
			>
				<p class="hint">
					Sync validator: title must be at least 3 characters.
					Type a shorter value and press Enter to see the
					inline error.
				</p>
				<origam-inline-edit
						v-model="minLengthTitle"
						:validate="validateMinLength"
						placeholder="Title (min 3 chars)"
						data-cy="inline-edit-validate-min-host"
				/>
			</div>
		</Variant>

		<Variant title="Prop — validate (regex email)">
			<div
					class="story-shell"
					data-cy="inline-edit-validate-email"
			>
				<p class="hint">
					Sync validator: must match a basic email regex.
				</p>
				<origam-inline-edit
						v-model="emailValue"
						:validate="validateEmail"
						input-type="email"
						placeholder="contact{'@'}example.com"
						data-cy="inline-edit-validate-email-host"
				/>
			</div>
		</Variant>

		<Variant title="Prop — validate (async API check, 30% fail)">
			<div
					class="story-shell"
					data-cy="inline-edit-validate-async"
			>
				<p class="hint">
					Simulates a server-side uniqueness check. ~30% of the
					time, the API "fails" — `isPending` flips true for
					800ms while the Promise is in flight.
				</p>
				<origam-inline-edit
						v-model="asyncValue"
						:validate="validateAsync"
						:loading-on-confirm="true"
						placeholder="Unique name"
						data-cy="inline-edit-validate-async-host"
				/>
			</div>
		</Variant>

		<Variant title="Prop — multiline">
			<div
					class="story-shell"
					data-cy="inline-edit-multiline"
			>
				<p class="hint">
					Multiline mode renders a `&lt;textarea&gt;`. Cmd/Ctrl+Enter
					confirms, Enter inserts a newline.
				</p>
				<origam-inline-edit
						v-model="multilineValue"
						:multiline="true"
						placeholder="Long description"
						data-cy="inline-edit-multiline-host"
				/>
			</div>
		</Variant>

		<Variant title="Prop — disabled">
			<div
					class="story-shell"
					data-cy="inline-edit-disabled"
			>
				<p class="hint">
					Disabled state — clicking the display does not enter
					edit mode.
				</p>
				<origam-inline-edit
						v-model="disabledValue"
						:disabled="true"
						placeholder="No editing"
						data-cy="inline-edit-disabled-host"
				/>
			</div>
		</Variant>

		<Variant title="Slot — display (h2 custom rendering)">
			<div
					class="story-shell"
					data-cy="inline-edit-slot-display"
			>
				<p class="hint">
					The `#display` slot exposes `{ value, edit, isEmpty, placeholder, disabled }`.
					Click the heading to enter edit mode.
				</p>
				<origam-inline-edit
						v-model="customDisplayValue"
						placeholder="Untitled"
						data-cy="inline-edit-slot-display-host"
				>
					<template #display="{ value, edit, isEmpty, placeholder }">
						<h2
								class="story-heading"
								:class="{ 'story-heading--empty': isEmpty }"
								data-cy="inline-edit-slot-display-trigger"
								@click="edit"
						>{{ isEmpty ? placeholder : value }}</h2>
					</template>
				</origam-inline-edit>
			</div>
		</Variant>

		<Variant title="Slot — edit (custom layout)">
			<div
					class="story-shell"
					data-cy="inline-edit-slot-edit"
			>
				<p class="hint">
					The `#edit` slot exposes `{ value, setValue, confirm, cancel, error, isPending }`.
					Here we render an input prefixed with an icon.
				</p>
				<origam-inline-edit
						v-model="customEditValue"
						:validate="validateMinLength"
						placeholder="Search query"
						data-cy="inline-edit-slot-edit-host"
				>
					<template #edit="{ value, setValue, confirm, cancel, error }">
						<div class="story-custom-editor">
							<span
									class="story-custom-editor__icon"
									aria-hidden="true"
							>&#9998;</span>
							<input
									class="story-custom-editor__input"
									:value="value"
									data-cy="inline-edit-slot-edit-input"
									@input="setValue(($event.target as HTMLInputElement).value)"
									@keydown.enter.prevent="confirm()"
									@keydown.esc.prevent="cancel()"
							>
							<span
									v-if="error"
									class="story-custom-editor__error"
									role="alert"
							>{{ error }}</span>
						</div>
					</template>
				</origam-inline-edit>
			</div>
		</Variant>

		<Variant title="Slot — actions (Confirm / Cancel buttons)">
			<div
					class="story-shell"
					data-cy="inline-edit-slot-actions"
			>
				<p class="hint">
					The `#actions` slot lets you render custom confirm/cancel
					buttons. When `showActions=true` the slot renders inside the
					field's `appendInner`. This variant uses `showActions=true` with
					a custom slot override.
				</p>
				<origam-inline-edit
						v-model="actionsValue"
						:show-actions="true"
						:confirm-on-blur="false"
						placeholder="Click to edit"
						data-cy="inline-edit-slot-actions-host"
				>
					<template #actions="{ confirm, cancel, isPending }">
						<div class="story-actions">
							<button
									type="button"
									class="story-actions__btn story-actions__btn--confirm"
									:disabled="isPending"
									data-cy="inline-edit-slot-actions-confirm"
									@mousedown.prevent
									@click="confirm()"
							>&#10003;</button>
							<button
									type="button"
									class="story-actions__btn story-actions__btn--cancel"
									data-cy="inline-edit-slot-actions-cancel"
									@mousedown.prevent
									@click="cancel()"
							>&#10005;</button>
						</div>
					</template>
				</origam-inline-edit>
			</div>
		</Variant>

		<Variant title="Prop — showActions">
			<div
					class="story-shell"
					data-cy="inline-edit-show-actions"
			>
				<p class="hint">
					`showActions` toggles the Edit (display mode) and Confirm /
					Cancel (edit mode) action buttons. Keyboard shortcuts work in
					parallel regardless of the flag.
				</p>

				<div class="story-row">
					<div class="story-col">
						<strong>showActions=false (keyboard only)</strong>
						<origam-inline-edit
								v-model="showActionsFalseValue"
								:show-actions="false"
								:confirm-on-blur="false"
								placeholder="Click to edit"
								data-cy="inline-edit-show-actions-false-host"
						/>
					</div>

					<div class="story-col">
						<strong>showActions=true</strong>
						<origam-inline-edit
								v-model="showActionsTrueValue"
								:show-actions="true"
								:confirm-on-blur="false"
								placeholder="Click to edit"
								data-cy="inline-edit-show-actions-true-host"
						/>
					</div>

					<div class="story-col">
						<strong>showActions=true + multiline</strong>
						<origam-inline-edit
								v-model="showActionsMultilineValue"
								:show-actions="true"
								:multiline="true"
								:confirm-on-blur="false"
								placeholder="Click to edit"
								data-cy="inline-edit-show-actions-multiline-host"
						/>
					</div>

					<div class="story-col">
						<strong>showActions=true + disabled</strong>
						<origam-inline-edit
								v-model="showActionsDisabledValue"
								:show-actions="true"
								:disabled="true"
								placeholder="No editing"
								data-cy="inline-edit-show-actions-disabled-host"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Emit — confirm / cancel / validate-error (logs)">
			<div
					class="story-shell"
					data-cy="inline-edit-emits"
			>
				<p class="hint">
					Counts each event the component emits. Use the
					min-length validator to trigger `validate-error`.
				</p>
				<origam-inline-edit
						v-model="emitValue"
						:validate="validateMinLength"
						placeholder="Type here"
						data-cy="inline-edit-emits-host"
						@confirm="onConfirm"
						@cancel="onCancel"
						@validate-error="onError"
						@edit="onEdit"
				/>
				<dl
						class="story-counters"
						data-cy="inline-edit-emits-counters"
				>
					<dt>edit</dt>
					<dd data-cy="inline-edit-emits-edit">{{ editCount }}</dd>
					<dt>confirm</dt>
					<dd data-cy="inline-edit-emits-confirm">{{ confirmCount }}</dd>
					<dt>cancel</dt>
					<dd data-cy="inline-edit-emits-cancel">{{ cancelCount }}</dd>
					<dt>error</dt>
					<dd data-cy="inline-edit-emits-error">{{ lastError ?? 'none' }}</dd>
				</dl>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamInlineEdit } from '@origam/components'

	import type { IInlineEditProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const showActionsFalseValue = ref('Keyboard only')
	const showActionsTrueValue = ref('With action buttons')
	const showActionsMultilineValue = ref('Multiline with action buttons')
	const showActionsDisabledValue = ref('Not editable')

	const minLengthTitle = ref('Hello')
	const emailValue = ref('user@example.com')
	const asyncValue = ref('alice')
	const multilineValue = ref('This is a long description.\nIt can span multiple lines.')
	const disabledValue = ref('Not editable')
	const customDisplayValue = ref('A great article')
	const customEditValue = ref('vue 3')
	const actionsValue = ref('My item')
	const emitValue = ref('Type here…')

	const editCount = ref(0)
	const confirmCount = ref(0)
	const cancelCount = ref(0)
	const lastError = ref<string | null>(null)

	const validateMinLength = (v: string): true | string => v.length >= 3 || 'Min 3 chars'

	const validateEmail = (v: string): true | string => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Not a valid email'

	const validateAsync = async (v: string): Promise<true | string> => {
		await new Promise((r) => setTimeout(r, 800))
		if (Math.random() < 0.3) return `Name "${v}" is already taken`
		return true
	}

	const onEdit = (): void => { editCount.value += 1 }
	const onConfirm = (): void => { confirmCount.value += 1 }
	const onCancel = (): void => { cancelCount.value += 1 }
	const onError = (message: string): void => { lastError.value = message }
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 540px;
	}

	.story-shell[data-cy="inline-edit-show-actions"] {
		max-width: 100%;
	}

	.story-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 24px;
		align-items: start;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-height: 96px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-state {
		display: inline-flex;
		padding: 4px 8px;
		border-radius: 4px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		font: 600 0.75rem/1 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-heading {
		margin: 0;
		font: 600 1.5rem/1.2 system-ui, sans-serif;
		cursor: pointer;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-heading--empty {
		color: var(--origam-color__text---disabled, #aaa);
		font-style: italic;
	}

	.story-custom-editor {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 4px 8px;
		border: 1px solid var(--origam-color__border---subtle, #ddd);
		border-radius: 4px;
		background: var(--origam-color__surface---default, #fff);
	}

	.story-custom-editor__icon {
		font-size: 1rem;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-custom-editor__input {
		border: none;
		outline: none;
		font: inherit;
		min-width: 200px;
		background: transparent;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-custom-editor__error {
		font-size: 0.75rem;
		color: var(--origam-color__feedback--danger---fg, #c00);
	}

	.story-actions {
		display: inline-flex;
		gap: 4px;
	}

	.story-actions__btn {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 4px;
		font: 600 0.875rem/1 system-ui, sans-serif;
	}

	.story-actions__btn--confirm {
		background: var(--origam-color__feedback--success---bgSubtle, #e6f6ec);
		color: var(--origam-color__feedback--success---fgSubtle, #16a34a);
	}

	.story-actions__btn--cancel {
		background: var(--origam-color__feedback--danger---bgSubtle, #fee);
		color: var(--origam-color__feedback--danger---fgSubtle, #b00);
	}

	.story-counters {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 12px;
		margin: 0;
		padding: 8px 12px;
		border-radius: 4px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		font: 0.75rem/1.3 ui-monospace, monospace;
	}

	.story-counters dt {
		font-weight: 600;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-counters dd {
		margin: 0;
		color: var(--origam-color__text---secondary, #555);
	}
</style>

<docs lang="md" src="@docs/components/InlineEdit/OrigamInlineEdit.md"/>
