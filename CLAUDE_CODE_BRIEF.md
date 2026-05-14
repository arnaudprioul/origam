# Brief Claude Code — Plugin Figma "Origam DS Sync"

> **Mission** : construire un plugin Figma pour la design system **Origam UI** qui (a) génère les composants Figma à partir des tokens existants, (b) exporte les Variables Figma vers le format de tokens du repo, (c) optionnellement importe les tokens depuis le repo vers Figma.
>
> Ce document est ton point d'entrée unique. Lis-le entièrement avant de coder.

---

## 0. Contexte de travail (À LIRE EN PREMIER)

Tu travailles à la racine du **repo Origam UI**. La commande `claude` a été lancée à la racine du repo, donc tout ce qui suit est relatif à ce répertoire.

### 0.1 Branche active

- **Branch** : `feature/figma-plugin-ds-sync` (branchée sur `develop`, qui contient le merge de `feature/design-tokens-foundation`).
- Avant toute chose, vérifie : `git branch --show-current` doit retourner `feature/figma-plugin-ds-sync`.

### 0.2 Disposition du repo

```
origam/                                # racine du repo (cwd de Claude Code)
├── src/components/<Name>/             # sources Vue + SCSS de chaque composant
├── tokens/                            # workspace Tokens Studio for Figma (DTCG)
│   ├── $metadata.json
│   ├── $themes.json
│   ├── primitive.json
│   ├── semantic/{light,dark}.json
│   └── component/<name>.json
├── scripts/
│   ├── tokens.config.mjs              # config Style Dictionary
│   └── build-tokens.mjs               # build pipeline
├── docs/components/<Name>/            # doc markdown par composant
├── maquettes/                         # SHOWCASE HTML (source de vérité visuelle)
│   ├── Origam Components.html
│   ├── design-canvas.jsx
│   ├── screens-foundations.jsx
│   ├── screens-forms.jsx
│   ├── screens-feedback.jsx
│   ├── screens-nav.jsx
│   ├── screens-data.jsx               # (le brief originel listait `screens-data-display.jsx`)
│   ├── screens-layout.jsx
│   ├── screens-extras.jsx
│   └── screens-extras2.jsx
├── CLAUDE_CODE_BRIEF.md               # ce fichier
└── figma-plugin/                      # le plugin
```

### 0.3 Catalogue des composants v1 (vérifié sur disque)

| Composant | `.vue` source | tokens | maquette JSX | doc |
|---|---|---|---|---|
| Btn | `src/components/Btn/OrigamBtn.vue` | `tokens/component/btn.json` | `screens-extras2.jsx`, `screens-data.jsx` | `docs/components/Btn/OrigamBtn.md` |
| TextField | `src/components/TextField/OrigamTextField.vue` | `tokens/component/text-field.json` | `screens-forms.jsx` | `docs/components/TextField/OrigamTextField.md` |
| Textarea | `src/components/TextareaField/OrigamTextareaField.vue` | `tokens/component/textarea-field.json` | `screens-forms.jsx` | `docs/components/TextareaField/OrigamTextareaField.md` |
| Select | `src/components/Select/OrigamSelect.vue` | `tokens/component/select.json` | `screens-forms.jsx` | `docs/components/Select/OrigamSelect.md` |
| Checkbox | `src/components/Checkbox/OrigamCheckbox.vue` | `tokens/component/checkbox.json` | `screens-forms.jsx` | `docs/components/Checkbox/OrigamCheckbox.md` |
| Radio | `src/components/Radio/OrigamRadio.vue` | `tokens/component/radio.json` | `screens-forms.jsx` | `docs/components/Radio/OrigamRadio.md` |
| Switch | `src/components/Switch/OrigamSwitch.vue` | `tokens/component/switch.json` | `screens-forms.jsx` | `docs/components/Switch/OrigamSwitch.md` |
| Card | `src/components/Card/OrigamCard.vue` | `tokens/component/card.json` | `screens-data.jsx` | `docs/components/Card/OrigamCard.md` |
| Chip | `src/components/Chip/OrigamChip.vue` | `tokens/component/chip.json` | `screens-data.jsx` | `docs/components/Chip/OrigamChip.md` |
| Avatar | `src/components/Avatar/OrigamAvatar.vue` | `tokens/component/avatar.json` | `screens-data.jsx` | `docs/components/Avatar/OrigamAvatar.md` |
| Alert | `src/components/Alert/OrigamAlert.vue` | `tokens/component/alert.json` | `screens-feedback.jsx` | `docs/components/Alert/OrigamAlert.md` |
| Dialog | `src/components/Dialog/OrigamDialog.vue` | `tokens/component/dialog.json` | `screens-data.jsx` | `docs/components/Dialog/OrigamDialog.md` |
| Toolbar | `src/components/Toolbar/OrigamToolbar.vue` | `tokens/component/toolbar.json` | `screens-nav.jsx` | `docs/components/Toolbar/OrigamToolbar.md` |
| Badge | `src/components/Badge/OrigamBadge.vue` | `tokens/component/badge.json` | `screens-data.jsx` | `docs/components/Badge/OrigamBadge.md` |
| ~~Tabs~~ | **MISSING** — pas de `.vue` dédié, composé via Btn+BtnGroup. **Skip pour v1**, à noter dans le README plugin. |

Composants à fort volume (à scoper soigneusement) :
- **Btn** — 988 lignes
- **Select** — 1185 lignes

---

## 1. Tech & convention de nommage tokens

- **Tokens** : Style Dictionary v4 + `@tokens-studio/sd-transforms`. Config : `scripts/tokens.config.mjs`. Build : `npm run tokens:build`.
- **Convention CSS** émise par le transform `origam/name/css` :
  - `primitive.color.neutral.0` → `--origam-color-neutral-0`
  - `semantic.color.surface.default` → `--origam-color-surface-default`
  - `component.btn.bg` → `--origam-btn---bg` (triple tiret entre block et prop)
  - `component.btn.success.bg` → `--origam-btn--success---bg` (double tiret pour states/intents)
- **Intents reconnus** par le transform : `primary`, `secondary`, `ghost`, `success`, `warning`, `danger`, `info`, `selected`.

`tokens/$themes.json` déclare 2 thèmes : **Light** + **Dark** (primitive + semantic/{light,dark} + tous component/*).

---

## 2. Décisions d'architecture validées

| # | Décision | Détail |
|---|---|---|
| 1 | **Plugin Figma** | manifest dev mode, TypeScript strict, esbuild |
| 2 | **Stratégie Tokens Studio** | l'utilisateur installe Tokens Studio for Figma et importe `tokens/`. Notre plugin se concentre sur **les composants** + **l'export** |
| 3 | **Périmètre v1** | 15 composants — listés section 0.3 |
| 4 | **Component Properties Figma** | `intent` (Variant), `variant` (Variant), `size` (Variant), `disabled`/`loading`/`icon-prepend`/`icon-append` (Boolean), `label` (Text), icônes (Instance Swap) |
| 5 | **Variables Figma avec modes** | une variable, deux modes (Light/Dark). Géré par Tokens Studio |
| 6 | **Export** | format JSON Tokens Studio (consommable par `build-tokens.mjs`). Bonus : SCSS Origam exact |
| 7 | **Sync inverse repo→Figma** | v2 |
| 8 | **Icônes** | pas de lib MDI livrée. Instance Swap slot |
| 9 | **Installation** | source TypeScript à compiler. README explique `npm install && npm run build` puis "Plugins → Development → Import from manifest" |

---

## 3. Architecture cible du plugin

```
figma-plugin/
├── README.md
├── manifest.json
├── package.json
├── tsconfig.json
├── esbuild.config.mjs
├── src/
│   ├── code.ts                    # main thread (Figma API)
│   ├── ui.html
│   ├── ui.tsx                     # React UI — onglets Generate / Export / Sync
│   ├── lib/
│   │   ├── variables.ts
│   │   ├── styles.ts
│   │   ├── messaging.ts
│   │   ├── tokens-types.ts
│   │   └── color.ts
│   ├── components/
│   │   ├── _shared.ts
│   │   ├── Btn.ts
│   │   ├── TextField.ts
│   │   ├── ... (1 par composant v1)
│   ├── exporters/
│   │   ├── tokens-studio.ts
│   │   └── scss-origam.ts
│   └── importers/
│       └── from-tokens-studio.ts  # v2
└── dist/                          # build output (gitignoré)
```

---

## 4. UI plugin (3 onglets)

### Generate
- Bandeau prérequis : "Install Tokens Studio for Figma and import `tokens/` first"
- Bouton "Detect Origam variables" → vérifie présence des Variables `Origam/Color/Semantic/...`
- 14 cases à cocher (par défaut toutes cochées)
- Bouton "Generate components" → crée chaque composant comme COMPONENT_SET dans une page `[Origam] Components`

### Export
- Sélecteur format : Tokens Studio JSON / SCSS Origam / W3C Design Tokens JSON
- Bouton "Export" → génère un .zip téléchargeable
- Le fichier suit la structure attendue par `build-tokens.mjs`

### Sync (v2)
- Affiche "Coming soon"

---

## 5. Composants — règles communes

Tout composant suit ce template :

1. **COMPONENT_SET** nommé `Origam/<Component>` avec :
   - `intent` / `variant` / `size` / `state` (Variant)
   - Toggles boolean : `disabled`, `loading`, `icon-prepend`, `icon-append`, …
   - Properties Text : `label`, `helper`, …
   - Properties Instance Swap : icônes
2. **Auto layout** sur tous les frames
3. **Tokens Figma Variables** via `setBoundVariable()` pour fill, stroke, corner radius, padding
4. **Text Styles** locaux (Origam/Body/MD, Origam/Title/LG, …)

Spécifications par composant : voir le brief originel utilisateur (section 4.3) — pour chaque composant, lire AVANT de coder :
1. `src/components/<Name>/Origam<Name>.vue`
2. `src/components/<Name>/_origam.<name>.scss` (ou inline dans le .vue)
3. `tokens/component/<name>.json`
4. `maquettes/screens-*.jsx` (cf. catalogue 0.3)
5. `docs/components/<Name>/Origam<Name>.md` si présente

---

## 6. Exporter Tokens Studio JSON

Output mirroring `tokens/` :
```
tokens-export/
├── $metadata.json
├── $themes.json
├── primitive.json
├── semantic/{light,dark}.json
└── component/<name>.json
```

Format DTCG : `{ "$type": "color", "$value": "{color.neutral.0}" }`. Les alias `{...}` sont les références Tokens Studio.

---

## 7. Exporter SCSS Origam (bonus)

Génère `_origam.semantic.scss` au format `--origam-color-...` :
```scss
:root,
[data-theme="light"] {
  --origam-color-surface-default: #FFFFFF;
}
[data-theme="dark"] {
  --origam-color-surface-default: #0A0A0A;
}
```
(Reproduire le format du transform `origam/css/themed` dans `tokens.config.mjs`.)

---

## 8. Workflow utilisateur

1. Designer installe **Tokens Studio for Figma**
2. Tokens Studio pointe vers `tokens/` du repo
3. Tokens Studio crée les Variables Figma avec modes Light/Dark
4. Designer installe **Origam DS Sync** en dev mode
5. Onglet **Generate** → crée les 14 composants
6. Designer maquette une UI avec ces composants
7. Designer change un token (Tokens Studio) → toute la maquette se met à jour
8. Onglet **Export** → produit un zip JSON Tokens Studio
9. Dev consomme ce zip dans le repo, lance `npm run tokens:build`

---

## 9. Stack

- **TypeScript strict**
- **Bundler** : esbuild
- **UI** : React 18
- **Tests** : optionnel v1
- **Lint/Format** : config minimale

---

## 10. Plan de livraison (phases)

| Phase | Contenu |
|---|---|
| 1 | Scaffold (manifest, package.json, tsconfig, esbuild, README skeleton) — **done** |
| 2 | UI plugin (3 onglets, postMessage typés) |
| 3 | Lib helpers (variables, styles, color, messaging, tokens-types) |
| 4 | Btn (composant le plus complexe — référence) |
| 5 | TextField + Textarea + Select + Checkbox + Radio + Switch |
| 6 | Card + Chip + Avatar + Alert + Dialog + Toolbar + Badge |
| 7 | Exporter Tokens Studio JSON |
| 8 | Exporter SCSS Origam |
| 9 | README final + screenshots + CHANGELOG + pre-delivery checks |

---

## 11. Pièges connus

1. **Variables Figma** ne supportent pas tous les types DTCG. `dimension`, `color`, `number`, `string`, `boolean` OK. `shadow` / `typography` (composé) → utiliser **Effect Styles** + **Text Styles**.
2. **Component Properties → Variant tradeoff** : exposer chaque dimension en Variant fait exploser la matrice. Btn = `intent` + `variant` + `size` en Variants, le reste en Boolean/Text/Instance Swap.
3. **Naming Variables Figma** : Tokens Studio expose en hiérarchie. Vérifier `primitive.color.neutral.0` → `Primitive/Color/Neutral/0`. Si différent, ajuster le plugin.
4. **Auto layout** partout. Padding/gap via Variables Figma. Aucune valeur hardcodée.
5. **Modes Light/Dark** : Tokens Studio crée 2 modes sur la collection Semantic. `setBoundVariable()` pointe vers la collection (pas un mode spécifique).
6. **Performance** : 14 × ~50 variants = ~700 frames. Faire les insertions par batch avec `figma.notify()` toutes les 50 frames.
7. **Dev mode** : Figma desktop required. Manifest `editorType: ["figma"]`.

---

## 12. Livraison finale

- Code source dans `figma-plugin/`
- `dist/` build à jour
- README avec captures du workflow (ou GIF)
- `CHANGELOG.md` listant la matrice composants/variants livrée

**Ne pas livrer les 60 composants du premier coup. Livrer les 14 v1, demander validation, étendre ensuite.**
