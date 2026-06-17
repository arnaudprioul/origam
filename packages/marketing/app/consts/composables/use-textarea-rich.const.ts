import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TEXTAREA_RICH_DOC: IComposableDoc = {
    slug: 'use-textarea-rich',
    name: 'useTextareaRich',
    domain: 'Textarea',
    icon: 'mdi-format-text',
    descriptionKey: '',
    descriptionFallback: 'Owns the runtime contract of the rich-text textarea (OrigamTextareaRich). Mounts a contenteditable host, applies formatting commands via document.execCommand, tracks active formatting state at the caret for toolbar UI feedback, and sanitises every emit so the consumer v-model never carries XSS payloads. Registers Cmd/Ctrl keyboard shortcuts for the common formatting commands.',
    signature: `function useTextareaRich(
  options: IUseTextareaRichOptions
): {
  hostRef: Ref<HTMLElement | undefined>
  active: ITextareaRichActiveState
  format: (command: TTextareaToolbarCommand, value?: string) => void
  isFormatActive: (command: TTextareaToolbarCommand) => boolean
  setValue: (html: string) => void
  onInput: () => void
  onKeydown: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
}`,
    params: [
        {
            name: 'options',
            type: 'IUseTextareaRichOptions',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration object. value: () => string — getter for the initial HTML content (bound to the parent v-model). onUpdate: (html: string) => void — called with sanitised HTML on every change. onFormat: (command, value?) => void — called after each format command (lets the host open a link popover on Cmd+K). disabled: () => boolean — suppresses all commands and keyboard shortcuts when true.',
        },
    ],
    returns: [
        {
            name: 'hostRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Template ref to assign to the contenteditable element. The composable uses it to read and write innerHTML, attach the selectionchange listener, and focus the element before applying a format command.',
        },
        {
            name: 'active',
            type: 'ITextareaRichActiveState',
            descriptionKey: '',
            descriptionFallback: 'Reactive object tracking the formatting state at the current caret position. Properties: bold, italic, underline, code, link (booleans), listBullet, listOrdered (booleans), heading (0 | 1 | 2 | 3). Bind to toolbar button :active props.',
        },
        {
            name: 'format',
            type: '(command: TTextareaToolbarCommand, value?: string) => void',
            descriptionKey: '',
            descriptionFallback: 'Apply a formatting command. Delegates to document.execCommand for bold, italic, underline, lists, and headings. Handles link creation (value = URL) and inline code toggling (insertHTML). Calls onFormat and onUpdate after every change.',
        },
        {
            name: 'isFormatActive',
            type: '(command: TTextareaToolbarCommand) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns whether the given command is active at the current caret position. Reads from the reactive active object — a convenience wrapper for toolbar binding.',
        },
        {
            name: 'setValue',
            type: '(html: string) => void',
            descriptionKey: '',
            descriptionFallback: 'Imperatively update the contenteditable innerHTML with sanitised HTML. No-ops when hostRef is unset or when the content is already identical (avoids cursor jump).',
        },
        {
            name: 'onInput / onKeydown / onPaste',
            type: '(event) => void',
            descriptionKey: '',
            descriptionFallback: 'Event handlers to bind on the host element. onInput emits sanitised HTML. onKeydown intercepts Cmd/Ctrl+B/I/U/E/K and Cmd+Shift+7/8 for list shortcuts. onPaste strips HTML to sanitised form (or escapes plain text) before inserting.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Minimal rich textarea with toolbar',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useTextareaRich } from 'origam'
import { TEXTAREA_TOOLBAR_COMMAND } from 'origam/enums'

const model = ref('<p>Hello</p>')

const { hostRef, active, format, onInput, onKeydown, onPaste } = useTextareaRich({
  value: () => model.value,
  onUpdate: (html) => { model.value = html },
  onFormat: (cmd, val) => {
    if (cmd === TEXTAREA_TOOLBAR_COMMAND.LINK) {
      // open link popover…
    }
  },
  disabled: () => false,
})
</script>

<template>
  <div>
    <origam-btn :active="active.bold" @click="format(TEXTAREA_TOOLBAR_COMMAND.BOLD)">B</origam-btn>
    <origam-btn :active="active.italic" @click="format(TEXTAREA_TOOLBAR_COMMAND.ITALIC)">I</origam-btn>
    <div
      ref="hostRef"
      contenteditable
      @input="onInput"
      @keydown="onKeydown"
      @paste="onPaste"
    />
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['IUseTextareaRichOptions', 'ITextareaRichActiveState'],
    noteFallback: 'useTextareaRich uses document.execCommand, which is marked deprecated by spec but remains the only first-party contenteditable API without a 100 KB library. Limitations: no IME-safe undo stack, no granular collaborative cursor. Every value emitted through onUpdate is sanitised by sanitizeHtml to strip <script> tags and javascript: hrefs.',
}
