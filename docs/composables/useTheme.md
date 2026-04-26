# useTheme

Reactive handle on the active design-system theme. Wraps a singleton
`Ref<TTheme>` so every `useTheme()` call across the app reads the same
state, persists changes to `localStorage`, and applies `data-theme` on
`<html>` automatically.

## Basic usage

```vue
<script setup lang="ts">
import { useTheme } from 'origam/composables'

const { theme, resolved, setTheme, toggle } = useTheme()
</script>

<template>
    <div>
        <p>Current theme: {{ theme }} (effective: {{ resolved }})</p>
        <OrigamBtn @click="toggle" text="Toggle light/dark" />
        <OrigamBtn @click="setTheme('auto')" text="Follow system" />
    </div>
</template>
```

## API

```ts
function useTheme(): {
    /** Current theme setting. Read-only — call `setTheme` to mutate. */
    theme: Readonly<Ref<TTheme>>

    /**
     * Effective theme after resolving `'auto'` against
     * `prefers-color-scheme`. Useful when an SVG asset / image needs to
     * mirror the active theme without reading the system query yourself.
     */
    resolved: Readonly<Ref<TThemeResolved>>

    /** Imperative setter. Persists + applies on the document root. */
    setTheme: (next: TTheme) => void

    /**
     * Convenience: flips `light` ↔ `dark`. Treats `'auto'` and any other
     * value (e.g. `'brand-a'`) as `light` for the flip.
     */
    toggle: () => void
}

type TTheme = 'auto' | 'light' | 'dark' | (string & {})
type TThemeResolved = Exclude<TTheme, 'auto'>
```

## Behaviour

- **SSR-safe**: no `window` / `document` access until the component
  using `useTheme()` mounts. Server-rendered HTML carries no
  `data-theme` (browsers honour the `prefers-color-scheme` media
  query inside the dark token CSS).
- **Persistence**: every `setTheme(...)` writes to
  `localStorage['origam-theme']`. The first `useTheme()` call on
  hydration reads it back — themes survive page reloads without a
  flash, provided the host app applies the saved value before
  hydration (see [no-flash plugin](#no-flash-on-load)).
- **`prefers-color-scheme`**: when `theme === 'auto'`, the composable
  attaches a `change` listener on
  `window.matchMedia('(prefers-color-scheme: dark)')` and updates
  `resolved` reactively when the OS-level theme changes.
- **Singleton**: every component shares the same ref, so toggling
  the theme in a header instantly reflows every consumer.

## Custom themes

Any string is a valid `TTheme`. Drop a matching CSS file (or a
`tokens/semantic/<name>.json` regenerated via `npm run tokens:build`)
and call `setTheme('brand-a')` — the document root grows
`data-theme="brand-a"` and any rule scoped to that selector takes over.

```ts
const { setTheme } = useTheme()
setTheme('brand-a')
// → <html data-theme="brand-a">
```

## Sub-tree overrides

The global `<html data-theme>` is page-wide. To theme a single
sub-tree (e.g. a marketing card embedded in a neutral admin page),
use `<OrigamThemeProvider>`:

```vue
<template>
    <main>
        <p>Page chrome — neutral light theme.</p>

        <OrigamThemeProvider theme="brand-a">
            <OrigamCard>Brand-themed card.</OrigamCard>
        </OrigamThemeProvider>
    </main>
</template>
```

## No-flash on load

Without it, the first paint shows the default theme briefly before
JavaScript hydrates and applies the persisted theme. The fix is to
write `data-theme` synchronously in a small inline script before any
CSS loads:

```html
<script>
    try {
        const t = localStorage.getItem('origam-theme')
        if (t && t !== 'auto') {
            document.documentElement.setAttribute('data-theme', t)
        }
    } catch (_) { /* private mode, etc. */ }
</script>
```

Drop this into your `index.html` head, **before** any stylesheet.

## Imperative helpers

```ts
import { applyThemeSync, readPersistedTheme } from 'origam/composables'

// Read the persisted value without mounting a component.
const stored = readPersistedTheme()  // 'auto' | 'light' | 'dark' | string

// Apply a theme synchronously (no Vue lifecycle required).
applyThemeSync('dark')
```

These power the no-flash plugin pattern above and are exported for
custom integrations.

## Tests

The composable ships with [`theme.composable.spec.ts`][1] covering:

- Default `'auto'` when no persisted value.
- Reading from / writing to localStorage.
- Toggling the `data-theme` attribute on the document root.
- `toggle()` flipping light ↔ dark from any starting state.
- `applyThemeSync` writing to `<html>` outside Vue's lifecycle.
- Custom theme strings (`'brand-a'`).

[1]: https://github.com/your-org/origam/blob/main/src/composables/Theme/theme.composable.spec.ts

## Related

- [`<OrigamThemeProvider>`](../components/ThemeProvider/OrigamThemeProvider.md) — sub-tree theme override.
- [`useCssSupport`](./useCssSupport.md) — feature detection, used together
  with `useTheme` to gate dark-mode-specific CSS features.
- [Design tokens guide](../guide/design-tokens.md) — how the `data-theme`
  attribute composes with the generated CSS layers.
