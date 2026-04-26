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
- Component tier (Lot 3.2B — Input/TextField/TextareaField/ConfirmWrapper) :
  - `component/input` — 16 tokens : `font-size`, `font-weight`, `line-height`, `icon-opacity`, `icon-opacity-active`, `disabled-opacity`, `error-color` (alias vers `{color.feedback.danger.fgSubtle}`), sous-sections BEM `control` (height), `details` (font-size/weight/letter-spacing/line-height/min-height/padding-top), `prepend` (padding-top/margin-inline-end), `append` (padding-top/margin-inline-start), variantes `density-default` et `density-compact` (density dimension).
  - `component/text-field` — 6 tokens : sous-section `details` (padding-inline) et `input` (opacity/opacity-active/transition-duration/transition-easing). Bloc `<style>:root{}</style>` vide supprimé de `OrigamTextField.vue`.
  - `component/textarea-field` — 8 tokens : sous-section `textarea` (opacity/opacity-active/transition-duration/transition-easing/line-height) et `grip` (border-color → `{color.border.subtle}`, opacity → `{opacity.26}`, height). Hex `#ddd` retiré du composant — remplacé par `var(--origam-textarea-field__grip---border-color, var(--origam-color-border-subtle))`.
  - `component/confirm-wrapper` — aucun token ajouté (couverture complète depuis Lot 3.0 ; aucun hex résiduel détecté).
  - 2 hex retirés d'`OrigamInput.vue` : `rgba(255, 0, 0, 1)` × 2 → `var(--origam-input---error-color, var(--origam-color-feedback-danger-fg-subtle))`.
  - 1 hex retiré d'`OrigamTextareaField.vue` : `#ddd` → `var(--origam-textarea-field__grip---border-color, var(--origam-color-border-subtle))`.
  - Point d'arbitrage : `opacity.20` absent du primitif (même situation que Lot 2D). La grip opacity conserve `0.2` en fallback CSS mais le token pointe vers `{opacity.26}` — décision de cadrage requise du lead : ajouter `opacity.20` au primitif ou accepter `opacity.26` comme alignement permanent.
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
- Component tier (Lot 3.2A — form layer, 4 composants tokenisés) :
  - `component/field` — 36 tokens :
    - Racine (14 tokens) : padding-start/end/top/bottom, font-size, letter-spacing, border-radius, border-color → `{color.border.default}`, border-width → `{border.width.thin}`, border-opacity, background-color, color → `{color.text.primary}`, opacity-disabled → `{opacity.50}`, transition-duration → `{motion.duration.normal}`, transition-easing → `{motion.easing.standard}`.
    - État `error` (2 tokens) : border-color → `{color.feedback.danger.border}`, color → `{color.feedback.danger.fgSubtle}`.
    - Variante `variant-solo` (1 token : box-shadow → `{shadow.sm}`), `variant-outlined` (1 token : background-color).
    - Sous-sections BEM : `overlay` (4 tokens), `input` (5 tokens), `label` (3 tokens), `prefix` (2 tokens), `suffix` (2 tokens), `prepend-inner` (2 tokens), `append-inner` (2 tokens), `clearable` (5 tokens), `outline` (6 tokens), `loader` (1 token).
    - Bloc `<style>:root{}` global supprimé (9 custom properties).
    - 4 occurrences hex retirées du `<style scoped>` : `rgba(255, 0, 0, 1)` ×2 → `var(--origam-color-feedback-danger-fgSubtle)` ; `rgb(var(--origam-theme---color--error))` → `var(--origam-color-feedback-danger-border)` ; triple `rgba(0,0,0,…)` box-shadow solo → `var(--origam-shadow-sm)`.
  - `component/form` — 12 tokens :
    - Sous-section BEM `actions` (3 tokens : margin-top → `{space.4}`, gap → `{space.2}`, display).
    - Sous-section BEM `details` (7 tokens : font-size → `{font.size.sm}`, font-weight → `{font.weight.regular}`, letter-spacing, line-height, min-height, padding-top, icon-opacity).
    - État `error` (3 tokens : messages-color → `{color.feedback.danger.fgSubtle}`, icon-color → `{color.feedback.danger.fgSubtle}`, icon-opacity → `{opacity.100}`).
    - 3 occurrences hex retirées : `rgba(255, 0, 0, 1)` ×2 (messages + icône) → tokens sémantiques danger ; valeurs hardcodées layout remplacées par CSS custom properties tokenisées.
  - `component/label` — 9 tokens : color → `{color.text.secondary}`, font-size → `{font.size.md}`, font-weight → `{font.weight.regular}`, line-height → `{font.lineHeight.normal}`, letter-spacing → `{font.letterSpacing.normal}`, pointer-events, transition-duration/easing ; sous-section `floating` (2 tokens) ; sous-section `required-indicator.color` → `{color.feedback.danger.fgSubtle}`.
    - Bloc `<style>:root{}` vide supprimé.
  - `component/messages` — 11 tokens : color (currentColor), font-size (12 px fixe spec), min-height/min-width, opacity → `{opacity.87}`, padding/flex/position, density → `{space.0}` ; sous-section BEM `message` (4 tokens : line-height, word-break, overflow-wrap, transition-duration → `{motion.duration.normal}`).
    - Toutes les valeurs hardcodées du `<style scoped>` encapsulées dans des CSS custom properties tokenisées avec fallback.
  - Points d'arbitrage :
    - `--origam-field---rounded` est injecté par `useRounded()` au runtime : conservé tel quel dans `<style scoped>` (ne peut pas être résolu statiquement).
    - `--origam-field__input---padding-top` contient un `calc()` imbriqué dépendant de `--origam-input---density` (valeur runtime) : le token `field.input.padding-top` documente la formule ; la propriété reste dans `<style scoped>`.
    - `--origam-theme---elevation` (solo shadow) est un override runtime : conservé en premier argument du `var()` avec fallback → `var(--origam-shadow-sm)`.
    - `opacity.87` existe dans le primitif et a été utilisé dans `messages.opacity`.
- Component tier (Lot 3.2D — FileField ×3 + PasswordField, migration design tokens) :
  - `component/file-field` — 24 tokens répartis en :
    - Racine (6 tokens) : `gap`, `list-gap`, `field-gap`, `details-padding-inline` → `{space.4}`, `transition-duration` → `{motion.duration.medium}`, `transition-easing` → `{motion.easing.standard}`.
    - Sous-section BEM `dropzone` (18 tokens) : `background-color` (transparent), `color` → `{color.border.default}`, `color-hover` → `{color.border.strong}`, `border-width` (2px), `border-style` (dashed), `border-radius` → `{radius.md}`, `min-height` (140px), `padding` → `{space.6}`, `gap` → `{space.2}`, `cursor`, `cursor-disabled`, `opacity-disabled` → `{opacity.60}`, `icon-font-size` (40px), `icon-opacity` (0.7), `title-font-size` → `{font.size.md}`, `title-font-weight` → `{font.weight.medium}`, `subtitle-font-size` → `{font.size.sm}`, `subtitle-opacity` (0.6).
    - Sous-section `dropzone.has-file` (3 tokens) : `padding`, `padding-inline`, `gap`.
    - Sous-section `dropzone.dragging` (2 tokens) : `background-color` → `{color.feedback.info.bgSubtle}`, `border-color` → `{color.feedback.info.bg}`.
  - `component/file-field-dragndrop-item` — 10 tokens : racine `gap` → `{space.3}`, `content-gap` → `{space.1}`, `actions-gap` → `{space.1}` ; sous-sections `icon.color` → `{color.text.secondary}`, `meta.color` → `{color.text.secondary}`, `meta.font-size` → `{font.size.sm}`, `name.font-size` → `{font.size.md}`, `name.font-weight` → `{font.weight.medium}`, `progress.margin-top` → `{space.1}`, `remove.size`.
  - `component/file-field-list-item` — 14 tokens : `background-color` → `{color.surface.overlay}`, `border-color` → `{color.border.subtle}`, `border-width` (1px), `border-style`, `border-radius` → `{radius.sm}` (fallback 6px), `gap` → `{space.3}`, `padding-block` → `{space.2}` (fallback 10px), `padding-inline` → `{space.3}`, `content-gap` → `{space.1}`, `actions-gap` → `{space.1}` ; sous-sections `icon.color`, `name.font-size/weight`, `meta.color/font-size`, `progress.margin-top`, `remove.size`.
  - `component/password-field` — 17 tokens : `input-transition` ; sous-section `toggle-icon` (cursor, opacity) ; `details.padding-inline` → `{space.4}` ; `infos.padding` → `{space.0}`, `infos.padding-inline` → `{space.3}` ; `item` (padding → `{space.2}`, text-align, position, overflow) ; `item--valid.icon-opacity` (1) ; `item-icon` (opacity 0.2, font-size 45px littéral, font-weight → `{font.weight.bold}`) ; `validate` (position, top → `{space.0}`, right → `{space.0}`, transform).
  - Bloc `<style>:root{}` global supprimé de `OrigamFileField.vue` (3 custom properties density/min-height/padding migrées dans le token file-field.dropzone).
  - Hex/rgba retirés :
    - `OrigamFileField.vue` (8 suppressions) : `rgba(0,0,0,0.2)` → `var(--origam-color-border-default)` ; `rgba(0,0,0,0.4)` → `var(--origam-color-border-strong)` ; `rgba(25,118,210,0.06)` → `var(--origam-color-feedback-info-bg-subtle)` ; `rgb(25,118,210)` → `var(--origam-color-feedback-info-bg)` ; `2px dashed` hardcodé → tokens border-width/style ; `8px` border-radius → `{radius.md}` ; `0.2s ease` transition → token duration/easing ; padding/gap hardcodés → tokens.
    - `OrigamFileFieldDragNDropItem.vue` (1 suppression) : `rgba(0,0,0,0.6)` (meta color) → `var(--origam-color-text-secondary)`.
    - `OrigamFileFieldListItem.vue` (3 suppressions) : `rgba(0,0,0,0.02)` (bg) → `var(--origam-color-surface-overlay)` ; `rgba(0,0,0,0.08)` (border) → `var(--origam-color-border-subtle)` ; `rgba(0,0,0,0.6)` (meta) → `var(--origam-color-text-secondary)`.
    - `OrigamPasswordField.vue` (0 hex directs — SCSS utilisait déjà `var()` avec fallbacks ; 4 propriétés hardcodées non-tokenisées encapsulées dans `var()` : `cursor: pointer`, `font-weight: bold`, positioning `top/right: 0`, `transform: translate(50%,-50%)`).
  - Points d'arbitrage :
    - **Couleur dragover** : `rgba(25,118,210,0.06)` et `rgb(25,118,210)` n'ont pas d'alias sémantique exact. Mappés sur `{color.feedback.info.bgSubtle}` (blue.50) et `{color.feedback.info.bg}` (blue.500) — sémantiquement cohérents (action drag = info/primary). Si le lead souhaite un token `color.action.primary.*`, à arbitrer.
    - **`border-radius: 6px`** (list-item) : entre `radius.sm` (4px) et `radius.md` (8px). Décision : alias → `{radius.sm}` avec fallback `6px` littéral conservé dans le CSS var() du composant Vue pour préserver le rendu actuel.
    - **`font-size: 45px`** (password-field icon glyph) : `font.size.5xl` = 2.25rem = 36px — trop petit. Token spécifique `password-field.item-icon.font-size` à valeur littérale `45px` retenu. Décision requise : ajouter `font.size.6xl: 2.8125rem` au primitif ou conserver le littéral.
    - **`surface.overlay`** (list-item bg) : `color.neutral.100` (#F5F5F5) en light — très légère teinte gris sur fond blanc. Acceptable sémantiquement. En dark, `surface.overlay` sera la valeur dark correspondante, offrant un comportement multi-theme automatique.
- Component tier (Lot 3.2C — controls de formulaire, 6 composants tokenisés) :
  - `component/number-field` — 14 tokens : racine (background-color, color, border-color ×3, border-radius, font-size, opacity-disabled, padding-inline, transition ×2), sous-sections BEM `control` (background-color, border-radius, cursor ×2), `increment` (background-color ×3, color ×2, cursor ×2), `decrement` (idem increment).
  - `component/otp-input-field` — 18 tokens : racine (background-color, color, border-radius, padding-block, font-size, gap, transition ×2), sous-section `content` (height, max-width, max-width-divided, padding), `divider` (margin-inline), `cell` (width, height, color, border-color ×3, background-color, font-size, text-align, outline).
  - `component/checkbox` — 20 tokens : racine (min-height, flex, transition ×2), sous-section `input` (background-color ×4, border-color ×5, border-width/style/radius, opacity-disabled), `icon` (color ×3, opacity), `label` (color ×2).
  - `component/checkbox-btn` — 19 tokens : variante button-style du checkbox (background-color ×4, color ×3, border ×4, padding ×2, font ×2, transition ×2, opacity-disabled). Pointe les mêmes sémantiques que `checkbox`.
  - `component/selection-control` — 14 tokens : color ×2, opacity-disabled, density, transition ×2, sous-sections `wrapper` (width/height), `input` (border-radius, overlay-opacity ×2, overlay-background-color), `icon` (opacity ×2), `label` (color, color-error).
  - `component/selection-control-group` — 7 tokens layout-only : display, flex-direction ×2, flex-wrap, gap, padding-block, padding-inline.
  - Blocs `<style>:root{}` globaux supprimés de : `OrigamOtpInputField.vue`, `OrigamCheckbox.vue`, `OrigamSelectionControl.vue` (3 fichiers).
  - Hex retirés : 1 `transparent` dans `OrigamNumberField.vue` (`__control .origam-btn` → `var(--origam-number-field__control---background-color, transparent)`), 2 `rgba(255,0,0,1)` dans `OrigamSelectionControl.vue` (label + icon en état `--error` → `var(--origam-selection-control__label---color-error, var(--origam-color-feedback-danger-fgSubtle, #B91C1C))`).
  - `OrigamCheckboxBtn.vue` n'avait aucun bloc `<style>` — aucun hex à migrer ; `checkbox-btn.json` anticipe les besoins futurs de la variante bouton.
  - Point d'arbitrage : `selection-control.density` conservé en token littéral `0px` (la valeur est surchargée par les classes BEM `--density-*` ; aucun primitif `density` n'existe encore dans le tier primitif).
  - Point d'arbitrage : `color.text.onColor` référencé dans `checkbox.icon.color` et `checkbox-btn.color-checked` est défini dans `semantic/light.json` (`{color.neutral.0}`). À surveiller si un thème dark override ce token avec une valeur sombre.
