<template>
	<Story
			group="components"
			title="Clipboard/OrigamClipboard"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IClipboardProps>({
					value: 'arnaud@example.com',
					feedbackDuration: 2000,
					feedbackText: 'Copied!',
					feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON,
					disabled: false
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="clipboard-playground"
				>
					<origam-clipboard
							v-bind="state"
							data-cy="clipboard-playground-host"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.value"
						title="value"
				/>
				<HstNumber
						v-model="state.feedbackDuration"
						title="feedbackDuration"
				/>
				<HstText
						v-model="state.feedbackText"
						title="feedbackText"
				/>
				<HstSelect
						v-model="state.feedbackMode"
						title="feedbackMode"
						:options="feedbackModeOptions"
				/>
				<HstCheckbox
						v-model="state.disabled"
						title="disabled"
				/>
			</template>
		</Variant>

		<Variant title="feedbackMode — button (default)">
			<div
					class="story-shell"
					data-cy="clipboard-mode-button"
			>
				<p class="hint">
					The default mode. The built-in trigger flips its label to the
					feedback text while `copied` is true. No extra pill is shown.
				</p>
				<origam-clipboard
						value="hello-from-origam"
						feedback-mode="button"
						data-cy="clipboard-mode-button-host"
				/>
			</div>
		</Variant>

		<Variant title="feedbackMode — pill">
			<div
					class="story-shell"
					data-cy="clipboard-mode-pill"
			>
				<p class="hint">
					The trigger icon does NOT flip its label. An ARIA-live
					`role="status"` pill appears next to the trigger while
					`copied` is true. Useful when the trigger already has its
					own visual affordance.
				</p>
				<origam-clipboard
						value="hello-from-origam"
						feedback-mode="pill"
						data-cy="clipboard-mode-pill-host"
				/>
			</div>
		</Variant>

		<Variant title="feedbackMode — both">
			<div
					class="story-shell"
					data-cy="clipboard-mode-both"
			>
				<p class="hint">
					Both the label-flip on the trigger and the ARIA-live pill
					are active simultaneously.
				</p>
				<origam-clipboard
						value="hello-from-origam"
						feedback-mode="both"
						data-cy="clipboard-mode-both-host"
				/>
			</div>
		</Variant>

		<Variant title="feedbackMode — none">
			<div
					class="story-shell"
					data-cy="clipboard-mode-none"
			>
				<p class="hint">
					No visual feedback is rendered. The `@copy` emit still fires
					— useful when the parent manages its own success indicator.
				</p>
				<origam-clipboard
						value="hello-from-origam"
						feedback-mode="none"
						data-cy="clipboard-mode-none-host"
						@copy="onCopySuccess"
				/>
				<output
						class="story-counter"
						data-cy="clipboard-mode-none-counter"
				>{{ copyCount }}</output>
			</div>
		</Variant>

		<Variant title="Default — no slot (auto-rendered icon button)">
			<div
					class="story-shell"
					data-cy="clipboard-default"
			>
				<p class="hint">
					When no slot is provided, the component renders a
					default icon button with `mdi:mdi-content-copy`. The
					built-in label flips to the feedback text while
					`copied` is true.
				</p>
				<origam-clipboard
						value="hello-from-origam"
						data-cy="clipboard-default-host"
				/>
			</div>
		</Variant>

		<Variant title="Slot — default scoped (custom button)">
			<div
					class="story-shell"
					data-cy="clipboard-slot-default"
			>
				<p class="hint">
					The scoped default slot exposes `{ copy, copied, error }`.
					Wire the trigger of your choice — here a `OrigamBtn`
					whose label flips while the feedback window is open.
				</p>
				<origam-clipboard
						value="my-api-key-12345"
						data-cy="clipboard-slot-default-host"
				>
					<template #default="{ copy, copied }">
						<origam-btn
								data-cy="clipboard-slot-default-trigger"
								@click="copy"
						>
							{{ copied ? 'Copied!' : 'Copy API key' }}
						</origam-btn>
					</template>
				</origam-clipboard>
			</div>
		</Variant>

		<Variant title="Slot — feedback (custom pill)">
			<div
					class="story-shell"
					data-cy="clipboard-slot-feedback"
			>
				<p class="hint">
					`feedbackMode="pill"` renders the auto ARIA-live pill in
					addition to whatever the default slot draws. The
					`#feedback` slot lets you override its content.
				</p>
				<origam-clipboard
						value="copy-me"
						feedback-mode="pill"
						data-cy="clipboard-slot-feedback-host"
				>
					<template #feedback>
						<span data-cy="clipboard-slot-feedback-custom">
							Saved to clipboard
						</span>
					</template>
				</origam-clipboard>
			</div>
		</Variant>

		<Variant title="Emit — @copy (counter)">
			<div
					class="story-shell"
					data-cy="clipboard-emit-copy"
			>
				<p class="hint">
					Counts the number of successful copies. The component
					emits `@copy(value)` after every successful write.
				</p>
				<origam-clipboard
						value="counter-payload"
						data-cy="clipboard-emit-copy-host"
						@copy="onCopySuccess"
				/>
				<output
						class="story-counter"
						data-cy="clipboard-emit-copy-counter"
				>{{ copyCount }}</output>
			</div>
		</Variant>

		<Variant title="Emit — @error (simulated)">
			<div
					class="story-shell"
					data-cy="clipboard-emit-error"
			>
				<p class="hint">
					This Variant patches `navigator.clipboard` and
					`document.execCommand` so every write fails. The
					component re-emits the error to the parent.
				</p>
				<button
						type="button"
						class="story-arm"
						data-cy="clipboard-emit-error-arm"
						@click="armErrorMode"
				>
					Block clipboard API
				</button>
				<origam-clipboard
						value="never-copied"
						data-cy="clipboard-emit-error-host"
						@error="onCopyError"
				/>
				<output
						class="story-counter"
						data-cy="clipboard-emit-error-message"
				>{{ lastError ?? 'no error yet' }}</output>
			</div>
		</Variant>

		<Variant title="Prop — disabled">
			<div
					class="story-shell"
					data-cy="clipboard-disabled"
			>
				<p class="hint">
					Disabled state — the trigger is `disabled` and the
					copy pipeline short-circuits.
				</p>
				<origam-clipboard
						value="never-copied"
						disabled
						data-cy="clipboard-disabled-host"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamBtn, OrigamClipboard } from '@origam/components'

	import { CLIPBOARD_FEEDBACK_MODE } from '@origam/enums'

	import type { IClipboardProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const copyCount = ref(0)
	const lastError = ref<string | null>(null)

	const feedbackModeOptions = [
		{ label: 'button (default)', value: CLIPBOARD_FEEDBACK_MODE.BUTTON },
		{ label: 'pill', value: CLIPBOARD_FEEDBACK_MODE.PILL },
		{ label: 'both', value: CLIPBOARD_FEEDBACK_MODE.BOTH },
		{ label: 'none', value: CLIPBOARD_FEEDBACK_MODE.NONE }
	]

	const onCopySuccess = () => {
		copyCount.value += 1
	}

	const onCopyError = (err: Error) => {
		lastError.value = err.message
	}

	const armErrorMode = () => {
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: {
				writeText: () => Promise.reject(new Error('Simulated denial'))
			}
		})
		document.execCommand = (() => false) as unknown as typeof document.execCommand
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 540px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-counter {
		display: inline-flex;
		padding: 4px 8px;
		border-radius: 4px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		font: 600 0.75rem/1 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-arm {
		align-self: flex-start;
		padding: 6px 10px;
		border-radius: 4px;
		border: 1px solid var(--origam-color__border---subtle, #ddd);
		background: var(--origam-color__surface---raised, #f5f5f5);
		font: 0.75rem/1 system-ui, sans-serif;
		cursor: pointer;
	}
</style>

<docs lang="md" src="@docs/components/Clipboard/OrigamClipboard.md"/>
