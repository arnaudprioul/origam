# Tokens Changelog

Auto-generated changelog for the design tokens layer of `origam`. The frontend
package itself follows its own SemVer in `CHANGELOG.md`; this file tracks token
value changes only.

Format inspired by [Keep a Changelog](https://keepachangelog.com/) but scoped
to design token mutations:

- **Added**: new tokens (primitive, semantic, component).
- **Changed**: value updates (e.g. `color.primary.500` from `#7C3AED` to `#8B5CF6`).
- **Renamed**: token path renames — always paired with an alias kept under
  `Deprecated` until the next major version.
- **Deprecated**: tokens marked for removal at next major.
- **Removed**: tokens dropped (only at major bumps).

The `tokens-sync` GitHub Action populates this file automatically when Tokens
Studio for Figma pushes a JSON change. Manual edits are allowed for clarifying
copy.

---

## [Unreleased]

### Added
- Initial token foundation (Lot 0):
  - Primitive tier: `color.{neutral,primary,green,amber,red,blue,black,white}`,
    `space`, `font.{family,size,weight,lineHeight,letterSpacing}`, `radius`,
    `shadow`, `motion.{duration,easing}`, `zIndex`, `opacity`, `border`.
  - Semantic tier (light + dark themes): `color.{surface,text,border,action,
    feedback,overlay}`.
  - Component tier (initial 6 components): `btn`, `card`, `chip`, `avatar`,
    `badge`, `alert`.
- Tokens Studio for Figma source-of-truth setup (`tokens/$metadata.json`,
  `tokens/$themes.json`).
- Multi-theme support: `light` (default), `dark` (override). Architecture
  ready for `brand-{x,y}` themes (see `$metadata.json#_note`).
- Component tier (Lot 2A — layout layer, 5 composants tokenisés) :
  - `component/app` — 7 tokens (background-color, color, min-height, display, flex-direction, overflow, position).
  - `component/app-bar` — 11 tokens (background-color, color, border-color, box-shadow, height, z-index, transition-duration, transition-easing + sous-section `img` avec height, width, object-fit).
  - `component/layout` — 10 tokens (background-color, display, flex, flex-direction, overflow, max-width, position + sous-section `wrapper` avec width, height, max-height, max-width).
  - `component/main` — 14 tokens (flex, max-width, width, height, display, position, position-top, position-left, transition-duration, transition-property, transition-timing-function, background-color, color + sous-section `scroller` avec position, max-width).
  - `component/section` — 8 tokens (background-color, color, padding, border-radius, display, flex-direction, gap, width).
- Component tier (Lot 2B — Sheet + SystemBar):
  - `component/sheet` — 34 tokens couvrant `position`, `display`, `box-sizing`,
    `background`, `color`, `box-shadow`, border (color/style/width ×4 + radius
    ×4 corners logiques), dimension (width/height + min/max), spacing (padding
    + margin ×4 logical), état `border` (border-widths + box-shadow), état
    `rounded` (border-radius). Aliases DTCG vers `{color.surface.default}`,
    `{color.text.primary}`, `{shadow.none}`, `{radius.none/sm}`,
    `{border.width.0/thin}`, `{space.0}`.
  - `component/system-bar` — 24 tokens couvrant `display`, `flex`,
    `align-items`, `justify-content`, `text-align`, `position`, dimensions
    (`height` + `height-window`), `padding-inline`, `background`, `color`,
    typographie complète (`font-size`, `font-weight`, `letter-spacing`,
    `line-height`, `text-transform`), sous-section `icon.opacity`, border
    complet (style/color/width ×4 + radius ×4 corners). Aliases vers
    `{color.neutral.700}`, `{color.text.inverse}`, `{opacity.70}`,
    `{font.size.sm}`, `{font.weight.regular}`, `{font.letterSpacing.wide}`.
- Component tier (Lot 2C — navigation layer, 2 composants tokenisés) :
  - `component/bottom-nav` — 37 tokens : racine `bottom-bar` (border ×4 côtés, border-color/style/radius, density, max-width, height, background, color, box-shadow, padding ×4, margin ×4, transition ×3), sous-section BEM `content` (justify-content, align-items, flex-wrap, transform), variantes d'état `elevated` et `active` (box-shadow → `{shadow.md}`), variantes structurelles `border-variant`, `rounded`, `density-{comfortable,default,compact}`.
  - `component/toolbar` — 72 tokens : racine `toolbar` (border ×4 côtés, border-color/style, border-radius logique ×4, max-width, width, height, box-sizing, overflow, position, z-index, transform, transition ×3, background, color, box-shadow), variantes `border-variant`, `flat`, `rounded`, `collapse`, `floating`, sous-sections BEM `wrapper` (7 tokens), `content` (8 tokens), `title` (15 tokens), `prepend` (8 tokens), `append` (8 tokens).
  - Les deux fichiers enregistrés dans `$metadata.json` et activés dans `$themes.json` (light + dark).
  - Suppression des blocs `<style>:root{}</style>` dans `OrigamBottomNav.vue` et `OrigamToolbar.vue`.
  - 4 hex retirés de `OrigamBottomNav.vue` (rgba box-shadow ×2 → refs tokens), 4 hex retirés de `OrigamToolbar.vue` (rgba border-color, rgba color, rgba+multipart box-shadow, rgb background → refs sémantiques).
- Component tier (Lot 2D — `drawer`, migration design tokens) :
  - `component/drawer` — 38 tokens répartis en :
    - Racine (22 tokens) : display, flex-direction, position, z-index, height, width, max-width, pointer-events, background, color, box-shadow, border-color, border-style, border-{top,left,bottom,right}-width, border-{start-start,start-end,end-start,end-end}-radius, transition-duration, transition-property, transition-timing-function.
    - Variantes : `temporary` (box-shadow → `{shadow.lg}`), `sticky` (height, transition-property), `border` (border-width, box-shadow).
    - Positions directionnelles `top`, `bottom`, `left`, `right` : override de la border du côté opposé.
    - Sous-section BEM `scrim` (9 tokens) : background, opacity, position, position-top, position-left, width, height, z-index, transition-{property,duration,timing-function}.
    - Sous-section BEM `content` (5 tokens) : flex, height, max-width, overflow-x, overflow-y.
    - Sous-section BEM `img` (4 tokens) : height, width, position, z-index.
  - Bloc `<style>:root{}` global supprimé de `OrigamDrawer.vue` (5 valeurs hex/rgb retirées).
  - Hex migrés : `rgba(0,0,0,0.87)` → `{color.text.primary}`, `rgb(255,255,255)` → `{color.surface.default}`, shadow triple `rgba(...)` → `{shadow.none}` / `{shadow.lg}`, `black` → `{color.overlay.scrim}`.
  - `component/drawer` enregistré dans `$metadata.json` (tokenSetOrder) et activé dans `$themes.json` (light + dark).
  - CSS-first appliqué sur `__scrim` : toutes les propriétés CSS passent par les custom properties tokenisées avec fallback explicite — aucun `CSS.supports()` nécessaire car `position: absolute` + `transition` sont universellement supportés.
  - Point d'arbitrage ouvert : `opacity.20` absent du primitif (palette : 12, 26, 32, 50). Valeur littérale `0.2` conservée dans `drawer.scrim.opacity` avec `$description`. Décision requise du lead : ajouter `opacity.20` au primitif ou aligner sur `opacity.26`.
