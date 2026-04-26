# Installation

```bash
npm install origam
# or
pnpm add origam
# or
yarn add origam
```

## Plugin setup

```ts
// main.ts
import { createApp } from 'vue'
import { createOrigam } from 'origam'

import App from './App.vue'

const app = createApp(App)
app.use(createOrigam())
app.mount('#app')
```

## Styles

origam ships with a layered stylesheet — pick the level you need.

### All-in-one (recommended)

```ts
// main.ts
import 'origam/styles'
```

This loads the primitive tokens, both light and dark theme overrides,
and the SCSS helper mixins. Subsequent `data-theme="dark"` toggles
work out of the box.

### Granular layers

```ts
// Only the primitives (no theme).
import 'origam/tokens/css/primitive'

// One theme at a time.
import 'origam/tokens/css/light'
import 'origam/tokens/css/dark'
```

Useful when you want to ship a single-theme bundle (mobile splash,
embedded widget) or when your app already has a global token layer.

### SCSS

For SCSS consumers — the helpers expose `ds-intent`, `ds-elevation`,
`ds-text-style`, `ds-space`, `ds-focus-ring`:

```scss
@use 'origam/styles';
@use 'origam/scss/helpers' as ds;

.my-button {
    @include ds.intent('primary');
    @include ds.elevation('md');
    border-radius: var(--origam-radius-sm);
}
```

## TypeScript types

origam's prop / emit / slot interfaces are exported from the package
root for consumers who want to type-check their wrappers:

```ts
import type {
    IBtnProps,
    IFieldProps,
    IInputProps,
    TIntent,
    TTheme
} from 'origam/interfaces'
```

Token names are also typed for IDE autocomplete:

```ts
import type { TTokenName } from 'origam/tokens/types'
```

## No-flash setup (recommended)

Add this to your `index.html` `<head>`, before any stylesheet, to
avoid the brief default-theme flash on page load:

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

## Custom theme (Tokens Studio)

1. Install the Tokens Studio for Figma plugin.
2. Connect it to your fork of origam (branch `tokens-sync`).
3. Edit primitives or semantic tokens in Figma.
4. Click **Push to GitHub** in the plugin.
5. The `tokens-sync` workflow rebuilds artifacts and opens a PR
   against `develop` automatically.

See [Theming guide](./theming.md) for the full pipeline.

## Migrating from v0.x

origam v2.0.0 introduces three breaking changes:

1. CSS imports moved from per-component injection to a centralised
   token layer. See [styles section](#styles).
2. `useColorEffect` now expects `TIntent` values, not raw hex.
3. `useElevation` no longer accepts a `bgColor` parameter.

The full migration table is in [`CHANGELOG.md`](../../CHANGELOG.md#migrating-from-v0x-to-v200).
