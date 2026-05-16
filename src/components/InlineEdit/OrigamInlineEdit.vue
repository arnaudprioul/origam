<template>
	<component
			:is="tag"
			class="origam-inline-edit"
			:class="rootClasses"
			:style="rootStyles"
			:aria-busy="isPending ? 'true' : 'false'"
			data-cy="origam-inline-edit"
	>
		<template v-if="!isEditing">
			<slot
					name="display"
					:value="displayValue"
					:edit="handleEnterEdit"
					:is-empty="isEmpty"
					:placeholder="resolvedPlaceholder"
					:disabled="disabled"
			>
				<button
						type="button"
						class="origam-inline-edit__display"
						:class="{
							'origam-inline-edit__display--empty': isEmpty,
							'origam-inline-edit__display--disabled': disabled
						}"
						:disabled="disabled"
						:aria-label="displayAriaLabel"
						data-cy="origam-inline-edit-display"
						@click="handleEnterEdit"
				>
					{{ isEmpty ? resolvedPlaceholder : displayValue }}
				</button>
			</slot>
		</template>

		<template v-else>
			<slot
					name="edit"
					:value="draft"
					:set-value="setValue"
					:confirm="handleConfirm"
					:cancel="handleCancel"
					:error="error"
					:is-pending="isPending"
			>
				<div
						class="origam-inline-edit__editor"
						:class="{ 'origam-inline-edit__editor--has-error': error !== null }"
						data-cy="origam-inline-edit-editor"
				>
					<textarea
							v-if="multiline"
							ref="inputRef"
							class="origam-inline-edit__input origam-inline-edit__input--multiline"
							:value="draft"
							:placeholder="resolvedPlaceholder"
							:disabled="disabled || isPending"
							:aria-invalid="error !== null"
							:aria-describedby="error !== null ? errorId : undefined"
							data-cy="origam-inline-edit-input"
							@input="handleInput"
							@keydown="handleKeyDown"
							@blur="handleBlur"
					/>
					<input
							v-else
							ref="inputRef"
							class="origam-inline-edit__input"
							:type="inputType"
							:value="draft"
							:placeholder="resolvedPlaceholder"
							:disabled="disabled || isPending"
							:aria-invalid="error !== null"
							:aria-describedby="error !== null ? errorId : undefined"
							data-cy="origam-inline-edit-input"
							@input="handleInput"
							@keydown="handleKeyDown"
							@blur="handleBlur"
					>
					<span
							v-if="error !== null"
							:id="errorId"
							class="origam-inline-edit__error"
							role="alert"
							data-cy="origam-inline-edit-error"
					>{{ error }}</span>
				</div>
			</slot>

			<slot
					name="actions"
					:confirm="handleConfirm"
					:cancel="handleCancel"
					:is-pending="isPending"
			/>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		nextTick,
		ref,
		type StyleValue,
		useId,
		watch
	} from 'vue'

	import { useInlineEdit } from '../../composables'

	import type {
		IInlineEditEmits,
		IInlineEditProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamInlineEdit>`. Defaults are inlined
	 * here (not pulled from a const) because the Vue SFC compiler
	 * analyses `withDefaults` statically and only resolves literals —
	 * cf. CLAUDE.md "withDefaults — inline literals only" rule.
	 ********************************************************/
	const props = withDefaults(defineProps<IInlineEditProps>(), {
		tag: 'span',
		placeholder: 'Click to edit',
		validate: undefined,
		autoFocus: true,
		selectOnFocus: true,
		confirmOnBlur: true,
		confirmOnEnter: true,
		cancelOnEscape: true,
		disabled: false,
		multiline: false,
		trim: true,
		inputType: 'text',
		loadingOnConfirm: false
	})

	const emit = defineEmits<IInlineEditEmits>()

	/*********************************************************
	 * Model — reactive accessor so the composable always reads the
	 * up-to-date value (props are not Refs themselves).
	 ********************************************************/
	const modelRef = computed<string | number>(() => props.modelValue)

	/*********************************************************
	 * Composable — owns the IDLE → EDITING → VALIDATING state machine.
	 * The SFC layer adds DOM glue: focus, keyboard, blur, ARIA wiring.
	 ********************************************************/
	const {
		isEditing,
		draft,
		error,
		isPending,
		edit,
		confirm,
		cancel,
		setValue
	} = useInlineEdit(modelRef, {
		validate: props.validate,
		trim: props.trim,
		onConfirm: (value: string) => {
			// Preserve the original v-model shape (string vs number)
			// when round-tripping through the input. Failed coercion
			// (NaN) falls back to the raw string.
			const normalised: string | number =
				typeof props.modelValue === 'number'
					? Number(value)
					: value
			const out = typeof normalised === 'number' && Number.isNaN(normalised) ? value : normalised
			emit('confirm', out)
			emit('update:modelValue', out)
		},
		onCancel: () => emit('cancel'),
		onError: (message: string) => emit('validate-error', message)
	})

	/*********************************************************
	 * Refs / IDs
	 ********************************************************/
	const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
	const errorId = `origam-inline-edit-error-${useId()}`

	/*********************************************************
	 * Derived display state
	 ********************************************************/
	const displayValue = computed<string>(() => {
		const v = props.modelValue
		if (v === null || v === undefined) return ''
		return String(v)
	})

	const isEmpty = computed<boolean>(() => displayValue.value.trim().length === 0)

	const resolvedPlaceholder = computed<string>(() => props.placeholder ?? 'Click to edit')

	const displayAriaLabel = computed<string>(() => {
		const label = isEmpty.value ? resolvedPlaceholder.value : displayValue.value
		return `Edit ${label}`
	})

	/*********************************************************
	 * Edit / confirm / cancel handlers — own the SFC-level emits.
	 ********************************************************/
	const handleEnterEdit = (): void => {
		if (props.disabled) return
		edit()
		emit('edit')
	}

	const handleConfirm = (): void => {
		void confirm()
	}

	const handleCancel = (): void => {
		cancel()
	}

	/*********************************************************
	 * Input / keyboard glue
	 ********************************************************/
	const handleInput = (event: Event): void => {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement
		setValue(target.value)
	}

	const handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === 'Enter' && props.confirmOnEnter && !props.multiline) {
			event.preventDefault()
			handleConfirm()
			return
		}
		if (event.key === 'Enter' && props.confirmOnEnter && props.multiline && (event.metaKey || event.ctrlKey)) {
			event.preventDefault()
			handleConfirm()
			return
		}
		if (event.key === 'Escape' && props.cancelOnEscape) {
			event.preventDefault()
			handleCancel()
		}
	}

	/**
	 * Blur is intentionally async-aware: while a validator Promise is
	 * pending we let it land; we never re-fire confirm on blur in that
	 * window or we would double-commit.
	 */
	const handleBlur = (): void => {
		if (!props.confirmOnBlur) return
		if (isPending.value) return
		handleConfirm()
	}

	/*********************************************************
	 * Focus management — auto-focus on transition into edit mode and
	 * (optionally) select the text so the user can type a replacement
	 * immediately.
	 ********************************************************/
	watch(isEditing, async (next: boolean): Promise<void> => {
		if (!next) return
		if (!props.autoFocus) return
		await nextTick()
		const el = inputRef.value
		if (!el) return
		el.focus()
		if (props.selectOnFocus && typeof el.select === 'function') {
			el.select()
		}
	})

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-inline-edit--editing': isEditing.value,
			'origam-inline-edit--disabled': props.disabled,
			'origam-inline-edit--pending': isPending.value,
			'origam-inline-edit--loading-on-confirm': props.loadingOnConfirm && isPending.value,
			'origam-inline-edit--multiline': props.multiline,
			'origam-inline-edit--has-error': error.value !== null
		},
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [props.style] as StyleValue)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		edit: handleEnterEdit,
		confirm: handleConfirm,
		cancel: handleCancel,
		isEditing,
		draft,
		error,
		isPending
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-inline-edit {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		gap: var(--origam-inline-edit__editor---gap, 4px);
		max-width: 100%;
		transition: opacity var(--origam-inline-edit---transition-duration, 160ms) ease;
	}

	.origam-inline-edit--disabled {
		opacity: 0.65;
		pointer-events: none;
	}

	.origam-inline-edit--loading-on-confirm {
		opacity: 0.75;
		pointer-events: none;
	}

	.origam-inline-edit__display {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		min-height: var(--origam-inline-edit__display---min-height, 24px);
		padding: var(--origam-inline-edit__display---padding-block, 2px)
		         var(--origam-inline-edit__display---padding-inline, 6px);
		border-radius: var(--origam-inline-edit__display---border-radius, 4px);
		font: inherit;
		color: var(--origam-color__text---primary);
		cursor: text;
		transition: background-color var(--origam-inline-edit---transition-duration, 160ms) ease,
		            color var(--origam-inline-edit---transition-duration, 160ms) ease;
	}

	.origam-inline-edit__display:hover:not(:disabled) {
		background-color: var(--origam-inline-edit__display---hover-bg-color);
	}

	.origam-inline-edit__display:focus-visible {
		outline: 2px solid var(--origam-color__action--primary---bg);
		outline-offset: 2px;
	}

	.origam-inline-edit__display--empty {
		color: var(--origam-inline-edit__display---color-empty);
		font-style: italic;
	}

	.origam-inline-edit__display--disabled {
		cursor: not-allowed;
	}

	.origam-inline-edit__editor {
		display: inline-flex;
		flex-direction: column;
		gap: var(--origam-inline-edit__editor---gap, 4px);
	}

	.origam-inline-edit__input {
		box-sizing: border-box;
		width: 100%;
		min-width: var(--origam-inline-edit__input---min-width, 120px);
		padding: var(--origam-inline-edit__editor---padding-block, 4px)
		         var(--origam-inline-edit__editor---padding-inline, 8px);
		border: 1px solid var(--origam-inline-edit__editor---border-color, var(--origam-color__border---subtle));
		border-radius: var(--origam-inline-edit__editor---border-radius, 4px);
		background-color: var(--origam-inline-edit__editor---bg-color);
		color: var(--origam-color__text---primary);
		font: inherit;
		outline: none;
		transition: border-color var(--origam-inline-edit---transition-duration, 160ms) ease,
		            box-shadow var(--origam-inline-edit---transition-duration, 160ms) ease;
	}

	.origam-inline-edit__input:focus {
		border-color: var(--origam-inline-edit__editor---focus-border-color, var(--origam-color__action--primary---bg));
		box-shadow: 0 0 0 2px var(--origam-inline-edit__editor---focus-ring-color, transparent);
	}

	.origam-inline-edit__input--multiline {
		min-height: var(--origam-inline-edit__input---multiline-min-height, 64px);
		resize: vertical;
		font-family: inherit;
	}

	.origam-inline-edit__editor--has-error .origam-inline-edit__input {
		border-color: var(--origam-inline-edit__error---color);
	}

	.origam-inline-edit__editor--has-error .origam-inline-edit__input:focus {
		box-shadow: 0 0 0 2px var(--origam-inline-edit__error---ring-color, transparent);
	}

	.origam-inline-edit__error {
		font-size: var(--origam-inline-edit__error---font-size, 0.75rem);
		color: var(--origam-inline-edit__error---color);
		line-height: 1.3;
	}
</style>
