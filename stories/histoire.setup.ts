import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createOrigam } from '@origam/origam'

import OrigamStoryLayout from '@stories/components/wrapper/OrigamStoryLayout.vue'

// Design-system tokens must be loaded before any component renders —
// otherwise `var(--origam-color-action-*-bg)` and friends resolve to
// `undefined` and inline color styles silently no-op. The order matches
// `src/assets/scss/main.scss`: primitives first (raw values), then the
// theme overrides (light by default, dark via `[data-theme="dark"]`).
import '@origam/assets/css/tokens/primitive.css'
import '@origam/assets/css/tokens/light.css'
import '@origam/assets/css/tokens/dark.css'

// Material Design Icons font — every component that renders an icon
// (OrigamIcon, OrigamListGroup activator's expand chevron, OrigamBtn
// prepend-icon, OrigamChip close button, …) ships with class names
// like `mdi mdi-chevron-down`. Pictogrammers' `@mdi/font` declares the
// `@font-face` and the per-glyph `::before { content: "…" }` rules
// those classes consume. Without it, the `<i class="mdi mdi-…">`
// elements render as 16x16 invisible boxes and consumers see only the
// label next to the empty append slot. Material Icons / Symbols
// (loaded below) are a different icon set used by `OrigamLigatureIcon`
// and DO NOT cover the `mdi-*` glyph names.
import '@mdi/font/css/materialdesignicons.css'

// Force the light theme by default in the Histoire sandbox so component
// stories render against the light palette. The dark palette is still
// reachable by setting `<html data-theme="dark">` from a story wrapper
// (or via the OrigamThemeProvider component for sub-tree overrides).
// Without this attribute, `prefers-color-scheme: dark` on the host
// machine would silently flip every story to dark.
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light')

    // Force the sandbox iframe to fit the available viewport instead
    // of locking to its responsive preset (default 1024×768 in Histoire,
    // which forces a horizontal scroll on smaller screens). We inject
    // a `<style>` tag into the SHELL window (`window.top`) — that's
    // where the iframe element lives. Idempotent on re-runs.
    try {
        const top = window.top
        if (top && top !== window && top.document && !top.document.getElementById('origam-iframe-fit')) {
            const s = top.document.createElement('style')
            s.id = 'origam-iframe-fit'
            s.textContent = `
                iframe[src*="__sandbox"] {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: 100% !important;
                    max-height: 100% !important;
                }
            `
            top.document.head.appendChild(s)
        }
    } catch {
        // Cross-origin or no top window — silently no-op.
    }

    // Load Material Icons + Material Symbols Outlined fonts for
    // `OrigamLigatureIcon`. The component itself does NOT load any font
    // (each host app declares its own icon strategy), but the stories
    // need them so the ligature substitution can swap the icon name
    // text into the actual glyph. Idempotent — re-running setup won't
    // duplicate the <link>.
    const FONT_HREFS = [
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
    ]
    for (const href of FONT_HREFS) {
        if (!document.head.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = href
            document.head.appendChild(link)
        }
    }
}

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
    app.use(createOrigam())
    addWrapper(OrigamStoryLayout)
})
