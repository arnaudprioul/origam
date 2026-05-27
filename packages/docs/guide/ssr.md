# SSR safety

origam is consumed by Nuxt apps, Vite-SSR setups and Astro islands. All of
its composables, utilities and components are designed to render on a
server (no `window`, no `document`) without crashing. This page documents
the guarantees, the trade-offs and the small set of helpers you reach for
when the default behaviour is not enough.

## TL;DR

- **Default**: every composable, util and component renders on the server
  without throwing. No special setup needed.
- **`useCssSupport()`** returns all-false flags during SSR (the JS
  fallback branch is taken). On the client, the flags flip to the real
  detection result on the first browser-side call.
- **Hydration mismatches**: if a component renders **different markup**
  depending on a feature flag, wrap it in `<OrigamClientOnly>` or use
  `useCssSupportClient()` to keep the SSR and first-client renders
  identical.
- **Themes**: the Nuxt module injects `data-theme` server-side from a
  cookie. No FOUC, no flash.

## What is SSR-safe by default

| Composable | Server behaviour |
|---|---|
| `useTheme` | Returns the persisted theme via cookie/localStorage. Media-query listener attaches on `onMounted`. |
| `useCssSupport` | All flags `false` (matches the legacy / unsupported branch). |
| `useDisplay` | Falls back to `getClientWidth`/`Height` with optional `ssr` opts. |
| `useSnackbarGroup`, `useCommand`, `useCode`, `useMask` | Pure JS — no DOM access at setup. Singletons lazy-init in handlers / `onMounted`. |
| `useTouch`, `useHotkey`, `useSticky`, `useSheetSwipe`, `useScroll`, `useParallax` | All DOM listeners bound in `onMounted`. |
| `useTeleport`, `useLocationStrategies`, `useScrollStrategies`, `useStyleTag` | Guarded by `IN_BROWSER`. |
| `sanitizeHtml`, `htmlToMarkdown` (utils) | Return input untouched if `DOMParser` is missing. |

Overlay components (`OrigamDialog`, `OrigamDrawer`, `OrigamMenu`,
`OrigamTooltip`, `OrigamSnackbar`, `OrigamContextualMenu`,
`OrigamSnackbarGroup`, `OrigamCommandPalette`) all render an SSR-safe
shell — Vue's `<Teleport>` is deferred until the client.

## When you need `<OrigamClientOnly>`

If your component's **markup** depends on something the server cannot
know — `window.matchMedia`, `IntersectionObserver`, a stored auth token
that's only readable post-mount, geolocation, etc. — wrap the
client-only fragment in `OrigamClientOnly`:

```vue
<template>
    <section>
        <h2>{{ title }}</h2>

        <OrigamClientOnly>
            <DeviceOrientationBadge />

            <template #fallback>
                <div class="placeholder" aria-hidden="true" />
            </template>
        </OrigamClientOnly>
    </section>
</template>

<script setup lang="ts">
import { OrigamClientOnly } from '@origam'
</script>
```

- The `<slot>` is rendered **only after `onMounted`**.
- The `#fallback` slot (optional) renders during SSR and on the first
  client paint, then is replaced by the real slot. Use it to reserve
  layout space and avoid CLS.
- Use `placeholder-tag="div"` + `placeholder-class="my-placeholder"` for
  a quick reserved-space placeholder without writing a fallback slot.

### Anti-pattern: wrapping everything

Don't wrap entire pages in `<OrigamClientOnly>` "just in case" — you
lose SSR's perceived-perf and SEO benefits. Wrap the **smallest** node
that has SSR/client divergence.

## `useCssSupportClient()` — hydration-safe feature gate

`useCssSupport()` returns `false` for every flag during SSR. If your
template **branches on that flag**, you get a hydration mismatch:

```vue
<template>
    <!-- SSR: renders <div class="js-fallback">…</div>
         Client: hydrates into <div class="css-only">…</div>
         -> hydration mismatch warning -->
    <div v-if="css.containerQueries" class="css-only">…</div>
    <div v-else class="js-fallback">…</div>
</template>
```

Two fixes:

**Option 1 — `useCssSupportClient()`** when you want the component to
"upgrade" smoothly to the CSS path after hydration:

```vue
<script setup lang="ts">
import { useCssSupportClient } from '@origam'

// Starts at `false` on SSR and first client render — same as the JS
// fallback. Flips to the real value on `onMounted`. No mismatch.
const supportsContainer = useCssSupportClient('containerQueries')
</script>

<template>
    <div v-if="supportsContainer" class="css-only">…</div>
    <div v-else class="js-fallback">…</div>
</template>
```

**Option 2 — `<OrigamClientOnly>`** when the CSS branch produces
significantly different DOM and a fallback during SSR is acceptable:

```vue
<template>
    <OrigamClientOnly>
        <CSSGridLayout v-if="css.containerQueries" />
        <FlexFallback v-else />
    </OrigamClientOnly>
</template>
```

## Class vs. markup divergence

Hydration mismatches only happen when **node structure differs** — the
reconciler is happy with different classes / styles on the same node.
So this is fine, even though `flag.value` changes after mount:

```vue
<template>
    <div :class="{ 'has-grid': css.grid }">
        <!-- same node tree SSR + client; only the class differs -->
    </div>
</template>
```

Reach for `useCssSupportClient()` / `<OrigamClientOnly>` **only** when
the differing branches render different HTML structure (different tags,
different children).

## Theming and FOUC

The Nuxt module (`@origam/nuxt`) reads the persisted theme from a cookie
on every SSR request and injects `<html data-theme="dark">` server-side.
No flash on hydration, no client-side theme initialisation.

If you're not using the Nuxt module, run the `applyThemeSync()` helper
**before** Vue mounts:

```ts
import { applyThemeSync, readPersistedTheme } from '@origam'

// In your client entry, BEFORE `app.mount('#app')`:
applyThemeSync(readPersistedTheme())
```

## Migration from non-SSR usage

If you're moving an existing origam app to a Nuxt 3/4 SSR setup:

1. **Audit `<script setup>` blocks** for direct `window.` / `document.`
   access. Guard with `import.meta.client` (Nuxt) or wrap the offending
   logic in `onMounted`.
2. **Audit `useFetch` / API calls** — make sure they're SSR-safe (origam
   doesn't ship an opinionated data layer).
3. **Pick the right rendering mode per route**: pages that depend on
   per-user data (auth, locale) need `ssr: true`; pure marketing pages
   can stay static. The Nuxt module honours both.
4. **Test with `nuxt build` + `node .output/server/index.mjs`** — `dev`
   mode hides some SSR bugs.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ReferenceError: window is not defined` on `nuxt build` | Direct `window.` access at module-init time | Move the access inside `onMounted` or guard with `IN_BROWSER` |
| `Hydration class mismatch on <div>` | `useCssSupport().css.value.X` used in template + the class differs SSR vs client | Acceptable for classes — Vue 3 hydrates them differently; if it's noisy, use `useCssSupportClient()` |
| `Hydration node mismatch — server rendered <div>, client rendered <section>` | Markup differs based on a runtime flag | Wrap in `<OrigamClientOnly>` or use `useCssSupportClient()` |
| Flash of light theme before dark | `applyThemeSync()` not running before mount | Add the call to your client entry **before** `app.mount(...)` |
| `DOMParser is not defined` during SSR | `sanitizeHtml`/`htmlToMarkdown` called on the server | Already guarded — returns input untouched. If you need server-side sanitisation, install `linkedom` or `jsdom` and shim `DOMParser` |
