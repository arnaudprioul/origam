# Nuxt integration

origam ships an official Nuxt 3 / Nuxt 4 module that wires the design
system into a Nuxt application in one line: auto-imports for every
`Origam*` component and `useXxx` composable, SSR-safe resolution of both
theming axes — the brand `theme` (via cookie) and the color `mode` (via
cookie + `Sec-CH-Prefers-Color-Scheme`) — and automatic injection of the
token stylesheets in the right order.

The module is published as a **sub-export of `origam`** — there is no
separate package to install. You get the components, the tokens, the
composables and the Nuxt module in a single dependency.

## Installation

```bash
npm install origam
```

## Setup

Register the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    modules: ['origam/nuxt']
})
```

That is it. Every `Origam*` component and `useXxx` composable is now
auto-imported, the primitive + light + dark + utilities token sheets are
loaded, and both the active brand and color mode are resolved server-side
so the first paint already matches the user preference (no FOUC).

## Configuration

All options are optional. Place them under the top-level `origam` key:

```ts
export default defineNuxtConfig({
    modules: ['origam/nuxt'],
    origam: {
        themes: ['light', 'dark', 'brand-x'],
        defaultTheme: 'auto',
        modes: ['light', 'dark'],
        defaultMode: 'auto',
        cookieName: 'origam-theme',
        modeCookieName: 'origam-mode',
        cookieMaxAge: 60 * 60 * 24 * 365,
        autoImport: true,
        includeUtilities: true,
        prefix: 'Origam'
    }
})
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `themes` | `string[]` | `['light', 'dark']` | Brand theme files to load. Each name must match a generated `origam/tokens/css/{theme}` import. |
| `defaultTheme` | `string` | `'auto'` | Active brand when no cookie is set. `'auto'` renders no `data-theme` (the default brand). |
| `modes` | `string[]` | `['light', 'dark']` | Color modes supported by the loaded token sheets. Used to validate the resolved mode. |
| `defaultMode` | `string` | `'auto'` | Active color mode when no cookie is set. `'auto'` falls back to the `Sec-CH-Prefers-Color-Scheme` client hint, then renders no `data-mode`. |
| `cookieName` | `string` | `'origam-theme'` | Cookie that stores the user's chosen brand. |
| `modeCookieName` | `string` | `'origam-mode'` | Cookie that stores the user's chosen color mode. |
| `cookieMaxAge` | `number` | `31_536_000` (1 year) | Cookie lifetime in seconds (shared by both cookies). |
| `autoImport` | `boolean` | `true` | Auto-register components and composables as Nuxt auto-imports. |
| `includeUtilities` | `boolean` | `true` | Inject the utility-classes stylesheet (`origam-utilities.css`). |
| `prefix` | `string` | `'Origam'` | Reserved for future use. origam components already ship prefixed, so the active prefix is empty. |

## SSR theme + mode resolution

The server plugin reads the `origam-theme` and `origam-mode` cookies
before the response is rendered and injects the resolved values as
`<html data-theme="…" data-mode="…">` via Nuxt's `useHead()` (attributes
are omitted when the axis resolves to `'auto'`).

- **Brand (`data-theme`)** is driven by the `origam-theme` cookie, then
  `defaultTheme`.
- **Mode (`data-mode`)** is driven by the `origam-mode` cookie, then
  `defaultMode`, then the `Sec-CH-Prefers-Color-Scheme` request header
  (sent by modern browsers when the `Accept-CH` response advertises
  support).

The client plugin then picks up the attributes already set by the server,
so the hydration boundary stays clean — no flash of unstyled /
wrong-themed content, no hydration mismatch warning.

To opt-in to client-hint advertising, return `Accept-CH:
Sec-CH-Prefers-Color-Scheme` from your root response (Nitro middleware
or `routeRules`).

## Changing the theme at runtime

Use `useTheme()` — it is auto-imported by the module:

```vue
<script setup lang="ts">
    const {theme, resolved, setTheme, toggle} = useTheme()
</script>

<template>
    <button @click="toggle">
        {{ resolved === 'dark' ? 'Light mode' : 'Dark mode' }}
    </button>
</template>
```

The client plugin watches the composable's `theme` ref and persists
every change to the configured cookie. No extra wiring needed.

## Opting out of auto-imports

If you need to namespace origam imports manually (conflict with another
design system, custom build pipeline, …) set `autoImport: false`:

```ts
export default defineNuxtConfig({
    modules: ['origam/nuxt'],
    origam: {autoImport: false}
})
```

You can then import explicitly:

```ts
import {OrigamBtn, OrigamCard} from 'origam/components'
import {useTheme} from 'origam/composables'
```

The plugins, CSS injection and SSR theme resolution still apply — only
the magic `auto-import everything` step is disabled.

## Migrating from a manual `createOrigam()` setup

If your app already calls `app.use(createOrigam(...))` in a custom
plugin, remove that plugin and add `'origam/nuxt'` to `modules` instead.
The module installs origam with sensible defaults; you only need to
keep your manual plugin if you pass non-trivial `createOrigam()` options
(custom icon set, locale, blueprint, …). In that case, set
`autoImport: false` to avoid double registration and keep your manual
plugin for the `createOrigam()` call.

## Requirements

- Nuxt **3.x or 4.x**
- Node **>= 22** (origam's own engine requirement)
