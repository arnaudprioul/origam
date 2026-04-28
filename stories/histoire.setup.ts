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

// Force the light theme by default in the Histoire sandbox so component
// stories render against the light palette. The dark palette is still
// reachable by setting `<html data-theme="dark">` from a story wrapper
// (or via the OrigamThemeProvider component for sub-tree overrides).
// Without this attribute, `prefers-color-scheme: dark` on the host
// machine would silently flip every story to dark.
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light')

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
