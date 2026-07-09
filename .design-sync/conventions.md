# origam — conventions for the design agent

**origam is a Vue 3 design system.** Its components are NOT importable here (this
runtime builds React; `window.Origam` is intentionally empty). Build layouts with
plain HTML styled by origam's real compiled tokens and utility classes — they all
ship in `styles.css`'s import closure. The component preview cards in this project
are REAL renders of the Vue components (visual reference): imitate their look; the
1:1 code mapping lives in the npm package `origam` (Vue 3), not in this runtime.

## Styling idiom — tokens first

Everything is driven by CSS custom properties (all prefixed `--origam-`), defined
in `tokens/origam.css` (imported by `styles.css`). Read that file before styling.

- Semantic colors: `var(--origam-color__action--primary---bg)` /
  `---fg`, `--origam-color__action--secondary---bg`, `--origam-color__action--ghost---bg`,
  `--origam-color__surface---default`, `--origam-color__surface---disabled`.
- Radius scale: `var(--origam-radius---xs|sm|md|lg|xl|full|none)`.
- Shadow scale: `var(--origam-shadow---xs|sm|md|lg|xl)` — always use the scale,
  never hand-rolled `box-shadow` values.
- Dark mode: set `data-theme="dark"` on a root element (light is
  `data-theme="light"` / default). The token sheet swaps values by attribute —
  no JS needed.

## Utility classes (39, all real — from the shipped sheet)

Format `.origam--{group}-{value}`:

- Color: `origam--color-primary|secondary|success|warning|danger|info|neutral`
- Background: `origam--bg-primary|secondary|success|warning|danger|info|neutral`
- Rounded: `origam--rounded-xs|sm|md|lg|xl|full|none`
- Shadow: `origam--shadow-xs|sm|md|lg|xl|none`
- Text size: `origam--text-xs|sm|md|lg|xl`
- Border: `origam--border-thin|thick|none`

Never invent class names outside this list; for anything else use the
`var(--origam-*)` tokens inline.

## Icons

Material Design Icons ship in `fonts/mdi.css` (`@import`ed from `styles.css`):
`<span class="mdi mdi-home"></span>`.

## Example (idiomatic build snippet)

```html
<div data-theme="light" style="background: var(--origam-color__surface---default); padding: 24px">
  <article class="origam--bg-primary origam--rounded-lg origam--shadow-md" style="padding: 16px">
    <h3 class="origam--text-lg" style="margin: 0 0 8px">Card title</h3>
    <p class="origam--text-sm">Body copy on the primary surface.</p>
    <button class="origam--bg-secondary origam--rounded-md origam--border-none origam--shadow-sm"
            style="padding: 8px 16px; color: var(--origam-color__action--secondary---fg)">
      <span class="mdi mdi-check"></span> Confirm
    </button>
  </article>
</div>
```

Where the truth lives: `styles.css` → `tokens/origam.css` (all tokens + utilities +
reset) and `fonts/mdi.css`. The preview cards under `components/` show what each
origam component really looks like — match their look when composing equivalents.
