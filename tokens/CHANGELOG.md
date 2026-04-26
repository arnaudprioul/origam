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
