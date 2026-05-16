<template>
	<component
			:is="tag"
			class="origam-clipboard"
			:class="rootClasses"
			:style="rootStyles"
			data-cy="origam-clipboard"
	>
		<slot
				:copy="handleCopy"
				:copied="copied"
				:error="error"
		>
			<button
					type="button"
					class="origam-clipboard__default-trigger"
					:class="{ 'origam-clipboard__default-trigger--copied': copied }"
					:disabled="disabled"
					:aria-label="defaultAriaLabel"
					data-cy="origam-clipboard-default-trigger"
					@click="handleCopy"
			>
				<origam-icon
						:icon="defaultIcon"
						class="origam-clipboard__default-icon"
						aria-hidden="true"
				/>
				<span
						v-if="showButtonLabel"
						class="origam-clipboard__default-label"
				>{{ resolvedFeedbackText }}</span>
			</button>
		</slot>

		<span
				v-if="showPill && copied"
				class="origam-clipboard__feedback"
				role="status"
				aria-live="polite"
				data-cy="origam-clipboard-feedback"
		>
			<slot
					name="feedback"
					:copied="copied"
			>
				{{ resolvedFeedbackText }}
			</slot>
		</span>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		type StyleValue
	} from 'vue'

	import { OrigamIcon } from '../Icon'

	import { useClipboard } from '../../composables'

	import { CLIPBOARD_FEEDBACK_MODE, MDI_ICONS } from '../../enums'

	import type {
		IClipboardEmits,
		IClipboardProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamClipboard>`. The component is a thin
	 * wrapper around `useClipboard`: it owns the optional ARIA-live
	 * feedback overlay and the auto-rendered default trigger, but
	 * delegates all copy logic + auto-reset timing to the composable.
	 *
	 * Defaults are inlined here (not pulled from a CLIPBOARD_DEFAULTS
	 * const) because the Vue SFC compiler analyses `withDefaults`
	 * statically and only resolves literals — cf. CLAUDE.md rule.
	 ********************************************************/
	const props = withDefaults(defineProps<IClipboardProps>(), {
		tag: 'span',
		feedbackDuration: 2000,
		feedbackText: 'Copied!',
		successText: undefined,
		feedbackMode: 'button',
		showFeedback: undefined,
		disabled: false
	})

	const emit = defineEmits<IClipboardEmits>()

	/*********************************************************
	 * Deprecation shim — showFeedback → feedbackMode
	 *
	 * One-shot warn per component instance to preserve the console
	 * contract without spamming on every render cycle.
	 ********************************************************/
	let _deprecationWarned = false

	const resolvedFeedbackMode = computed((): CLIPBOARD_FEEDBACK_MODE => {
		if (props.showFeedback !== undefined) {
			if (!_deprecationWarned) {
				_deprecationWarned = true
				console.warn(
					'[OrigamClipboard] The `showFeedback` prop is deprecated since v2.2 and will be removed in v3.0. ' +
					'Use `feedbackMode="pill"` instead of `:show-feedback="true"`.'
				)
			}
			return props.showFeedback
				? CLIPBOARD_FEEDBACK_MODE.PILL
				: CLIPBOARD_FEEDBACK_MODE.NONE
		}
		return (props.feedbackMode as CLIPBOARD_FEEDBACK_MODE) ?? CLIPBOARD_FEEDBACK_MODE.BUTTON
	})

	/*********************************************************
	 * Composable — owns the copy pipeline + auto-resetting flag.
	 ********************************************************/
	const { copy, copied, error } = useClipboard({
		feedbackDuration: props.feedbackDuration
	})

	/*********************************************************
	 * Derived visibility flags from feedbackMode.
	 ********************************************************/
	const showButtonLabel = computed(
		() => copied.value && (
			resolvedFeedbackMode.value === CLIPBOARD_FEEDBACK_MODE.BUTTON ||
			resolvedFeedbackMode.value === CLIPBOARD_FEEDBACK_MODE.BOTH
		)
	)

	const showPill = computed(
		() =>
			resolvedFeedbackMode.value === CLIPBOARD_FEEDBACK_MODE.PILL ||
			resolvedFeedbackMode.value === CLIPBOARD_FEEDBACK_MODE.BOTH
	)

	/*********************************************************
	 * Labels (i18n-friendly fallback strings; consumers wrap with t()).
	 ********************************************************/
	const resolvedFeedbackText = computed(() => props.successText ?? props.feedbackText ?? 'Copied!')

	const defaultIcon = MDI_ICONS.CONTENT_COPY

	const defaultAriaLabel = computed(() => copied.value
		? 'Value copied to clipboard'
		: 'Copy to clipboard'
	)

	/*********************************************************
	 * Handler — short-circuits when disabled, otherwise drives the
	 * composable and forwards success / error to the parent emit.
	 ********************************************************/
	async function handleCopy (): Promise<boolean> {
		if (props.disabled) return false
		const ok = await copy(props.value)
		if (ok) {
			emit('copy', props.value)
		} else if (error.value) {
			emit('error', error.value)
		}
		return ok
	}

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			'origam-clipboard--copied': copied.value,
			'origam-clipboard--disabled': props.disabled,
			'origam-clipboard--with-feedback': showPill.value
		},
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [props.style] as StyleValue)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		copy: handleCopy,
		copied,
		error
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-clipboard {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--origam-clipboard__feedback---gap, 4px);
	}

	.origam-clipboard--disabled {
		cursor: not-allowed;
	}

	.origam-clipboard__default-trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: var(--origam-clipboard__feedback---gap, 4px);
		padding: var(--origam-clipboard__feedback---padding-block, 4px)
		         var(--origam-clipboard__feedback---padding-inline, 8px);
		border-radius: var(--origam-clipboard__feedback---border-radius, 4px);
		font-size: var(--origam-clipboard__feedback---font-size, 0.75rem);
		font-weight: var(--origam-clipboard__feedback---font-weight, 500);
		color: var(--origam-color__text---secondary);
		transition: color var(--origam-clipboard__feedback---transition-duration, 160ms) ease,
		            background-color var(--origam-clipboard__feedback---transition-duration, 160ms) ease;
	}

	.origam-clipboard__default-trigger:hover:not(:disabled) {
		color: var(--origam-color__text---primary);
		background-color: var(--origam-color__surface---raised);
	}

	.origam-clipboard__default-trigger:focus-visible {
		outline: 2px solid var(--origam-color__action--primary---bg);
		outline-offset: 2px;
	}

	.origam-clipboard__default-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.origam-clipboard__default-trigger--copied {
		color: var(--origam-clipboard__feedback---color);
		background-color: var(--origam-clipboard__feedback---bg-color);
	}

	.origam-clipboard__default-icon {
		font-size: 1.125em;
		line-height: 1;
	}

	.origam-clipboard__default-label {
		font: inherit;
	}

	.origam-clipboard__feedback {
		display: inline-flex;
		align-items: center;
		gap: var(--origam-clipboard__feedback---gap, 4px);
		padding: var(--origam-clipboard__feedback---padding-block, 4px)
		         var(--origam-clipboard__feedback---padding-inline, 8px);
		border-radius: var(--origam-clipboard__feedback---border-radius, 4px);
		font-size: var(--origam-clipboard__feedback---font-size, 0.75rem);
		font-weight: var(--origam-clipboard__feedback---font-weight, 500);
		color: var(--origam-clipboard__feedback---color);
		background-color: var(--origam-clipboard__feedback---bg-color);
		transition: opacity var(--origam-clipboard__feedback---transition-duration, 160ms) ease;
		pointer-events: none;
	}

	.origam-clipboard--with-feedback .origam-clipboard__feedback {
		margin-inline-start: var(--origam-clipboard__feedback---offset, 8px);
	}
</style>
