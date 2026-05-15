# OrigamCode

`<OrigamCode>` renders a block of source code with shiki-powered syntax
highlighting, optional line numbers, line highlighting, a copy button and
theme awareness. It is the canonical replacement for the v2.x plain-text
`<pre>` wrapper.

## Quick start

### Via the `code` prop

```vue
<template>
    <OrigamCode lang="ts" :code="snippet" line-numbers/>
</template>

<script setup lang="ts">
    const snippet = `const x = 42`
</script>
```

### Via the default slot (multi-line snippets read better here)

```vue
<template>
    <OrigamCode lang="vue" filename="App.vue" line-numbers>
&lt;template&gt;
  &lt;h1&gt;Hello&lt;/h1&gt;
&lt;/template&gt;
    </OrigamCode>
</template>
```

> The prop wins when both are provided. The slot path strips leading /
> trailing blank lines so authors don't have to worry about indentation.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | `undefined` | Source code. Falls back to the default slot when omitted. |
| `lang` | `TCodeLang` | `'plaintext'` | Grammar to apply. Unknown values fall back to `plaintext` with a one-shot console warning. |
| `lineNumbers` | `boolean` | `false` | Show a left gutter with line numbers (pure CSS counter). |
| `highlightLines` | `number[] \| string \| null` | `null` | Lines to highlight. Accepts an array (`[2, 5]`) or a range string (`'2,5-7'`). |
| `copyable` | `boolean` | `true` | Show the copy-to-clipboard button (top-right or in the header when `filename` is set). |
| `maxHeight` | `number \| string \| null` | `null` | Cap the rendered height and enable vertical scroll past it. |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | shiki theme to apply. `auto` follows the document `data-theme`. |
| `format` | `boolean` | `false` | **Stub in v2.x.** Currently normalises whitespace only. Prettier is intentionally not bundled at runtime (size cost). |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling horizontally. |
| `filename` | `string` | `undefined` | Display a header bar with the filename. The copy button moves into the header when this is set. |

## Events

| Event | Payload | Description |
|---|---|---|
| `copy` | `code: string` | Emitted after a successful clipboard write. |

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Alternative to the `code` prop for multi-line snippets. |
| `header` | `{ filename, langName, copy, copied }` | Override the entire header bar (filename + copy button). |
| `footer` | — | Add a custom footer under the code surface. |

## Supported languages

| Value | shiki grammar |
|---|---|
| `plaintext` | text |
| `vue` | Vue SFC |
| `ts` / `tsx` | TypeScript (+ JSX) |
| `js` / `jsx` | JavaScript (+ JSX) |
| `scss` / `css` | SCSS / CSS |
| `json` | JSON |
| `bash` | Bash / sh |
| `html` / `xml` | HTML / XML |
| `yaml` | YAML |
| `md` | Markdown |

Adding a language requires re-bundling the shiki highlighter — see the
composable for the loaded subset.

## Theme integration

`theme="auto"` (default) follows the page's `<html data-theme="...">`
attribute. Switching the document theme at runtime triggers a re-render
of every visible `<OrigamCode>` with the matching shiki theme. The
`light` / `dark` values force a specific theme regardless of the page.

The component surface uses origam tokens
(`--origam-code---background-color`, `--origam-code---border-color`, …)
so it always blends with the host page even when the shiki theme would
emit a different background colour.

## Performance

- **Lazy highlighter**: shiki is dynamic-imported on the first mount,
  not at app boot. The first `<OrigamCode>` pays a ~200 ms cold load;
  subsequent ones reuse the singleton.
- **LRU cache**: highlighted HTML is cached by `(code, lang, theme)` up
  to 64 entries. Re-renders, hover effects and re-mounts never re-tokenise.
- **Tarball impact**: shiki sits in `dependencies` and adds ~3 MB to the
  installed `node_modules` (curated to 14 langs + 2 themes — far below
  the ~30 MB of the full default bundle). The actual JS shipped to the
  browser is split per chunk via dynamic import.

## Accessibility

- The container carries `role="region"` and an `aria-label` that
  includes the filename (or language fallback).
- The copy button is a real `<button>` with an `aria-label` describing
  the action, and an `aria-live="polite"` region for the "Copied!"
  feedback.
- Line numbers are emitted via a CSS `::before` counter with
  `user-select: none`; they do not appear in clipboard copies of the
  code text.
- The code content remains screen-reader-readable in its natural
  sequence (shiki only adds inline `<span>` styling, never reorders
  tokens).
