# design-sync — notes repo origam

- ⛔ **BLOCAGE FONDAMENTAL (2026-07-09)** : le pipeline design-sync est **React-only**
  (sub-skill non-storybook, section "How it works / Scope" : "React design systems.
  Both _ds_bundle.js and the previews render via React — a non-React DS has nothing
  for the claude.ai/design agent to build with"). origam est **Vue 3** → le converter
  canonique ne s'applique pas tel quel.
- Pistes évaluées : (a) mode dégradé tokens-only (supporté : "Tokens-only DS emits
  styles.css only with an empty-bodied _ds_bundle.js") + cartes de preview HTML
  auto-contenues hors-script ; (b) build custom elements Vue (defineCustomElement)
  → DS web-components consommable par du JSX React (la base skill contemple les
  web-components DS dans les conventions) — chantier DS réel, n'existe pas encore
  dans origam.
- Le repo utilise **Histoire** (*.story.vue), pas Storybook → shape=package.
- Projet claude.ai/design créé et pinné : fcef95fb-c091-447f-a585-85f88f683629
  (« origam design system ») — VIDE tant qu'aucune option n'est choisie.

## Run 2026-07-09 — mode « tokens + cartes preview » (décision utilisateur)
- Générateur off-script : `.design-sync/build-cards.mjs` (base|shots|cards) —
  captures RÉELLES du Histoire statique (:6006, `histoire preview` après build).
- Gate de capture = présence DOM `[class*="origam"]` dans le sandbox (la taille
  du PNG n'est PAS un critère — Badge rend légitimement petit).
- 1 dossier stories ≠ 1 story : énumérer les FICHIERS Origam*.story.vue
  (Grids → Col/Container/Row/Spacer ; Slide → SlideGroup).
- ⚠️ Catalogue marketing (seed component.json) : catégories quasi-doublons
  (« Feedback » vs « Feedback & Status », « Utility(ies) (& Providers) »,
  « Layout (& Structure) », « Overlay (& Surface) », « (Media &) Display »,
  « Data & List ») → canonicalisées dans build-cards.mjs (CANON map).
  **À signaler : nettoyage souhaitable du catalogue côté marketing.**
- Sous-composants sans entrée catalogue → catégorie de la FAMILLE (dossier).
- Exclusions (démos de capacités, pas des composants) : ColorGradient, Utilities.
- Overlays capturés FERMÉS (état initial réel) : Dialog, DialogConfirmation,
  Drawer, Snackbar(+Group), Slide/Fade/Expand/Scale (toggles), Lazy, Menu?, Tooltip.
  **Amélioration possible** : viser un variant « ouvert » par overlay.
- _ds_sync.json volontairement OMIS (générateur off-script sans recette de hash
  → le prochain run re-vérifie tout, choix honnête per skill).

## Re-sync risks
- Les captures dépendent du build Histoire statique local (:6006) — rebuild avant.
- component.json (seed) évolue avec le catalogue : catégories/descriptions re-lues à chaque run.
- Si le converter design-sync devient Vue-compatible (ou si origam publie un build
  custom-elements), basculer vers le pipeline canonique.

## 2026-07-09 — catalogue nettoyé (#188)
- Les catégories composants du catalogue sont désormais la taxonomie OFFICIELLE
  (8 longues du Theme Builder/i18n + Typography, Surface, Data Visualization = 11).
- La map CANON de build-cards.mjs a été retirée (no-op). ⚠️ Au prochain re-sync
  claude.ai/design, les groupes seront RENOMMÉS (courts → longs) : les anciens
  chemins components/<court>/ doivent partir via les delete globs du plan.
- docs:sync:check est rouge indépendamment (drift DS↔docs accumulé pendant que
  le workflow docs-fixtures était cassé) — hors scope, à résorber par un run
  docs:sync dédié.

## 2026-07-09 — cartes v2 « artboard » (feedback utilisateur : v1 dégueux)
- Référence visuelle = le canvas « Origam Components.html » du projet claude.ai/design
  CLASSIQUE de l'utilisateur (019df9de-…) : artboards denses, light+dark côte à côte.
- Pipeline v7 (build-cards.mjs) : capture du conteneur `.histoire-generic-render-story`
  visible restylé (fit-content + padding + bg du mode), deviceScaleFactor 2,
  attente fonts/images, dark réel via data-mode="dark" (PAS data-theme),
  fallbacks : largeur fixe 640 (full-width collapse), scène 240px (origam-app absolu),
  iframe entière (position:fixed) ; variantes non-visuelles écartées (bbox contenu).
- ⚠️ Depuis #189 les cartes vivent sous les catégories LONGUES — les anciens chemins
  courts ont été supprimés du projet (64 deletes) à ce push.
- Findings DS gratuits : OrigamIcon ne suit pas le dark (glyphe noir sur fond sombre) ;
  description Btn = « test camel » (reliquat éditorial /admin à corriger).
