# ADR 0001 — Sortir la doc d'API (1758 const statiques) vers une base de données + backoffice

- **Statut** : Proposé (design only — aucun code de prod modifié)
- **Date** : 2026-06-27
- **Auteur** : architect
- **Périmètre** : `packages/marketing` (Nuxt 4 SSR / Nitro)
- **Portée** : les 8 familles d'entités de l'API Reference (components, composables,
  consts, directives, enums, interfaces, types, utils)
- **Hors périmètre** : format des thèmes (`IOrigamTheme` / props par défaut) — fourni
  séparément par l'utilisateur. On réserve seulement une place macro pour `themes`.

> Tout ce document est basé sur la lecture du code, pas sur des suppositions.
> Les points non vérifiés sont signalés explicitement.

---

## 1. Contexte (faits vérifiés)

### 1.1 Volumétrie réelle

`packages/marketing/app/consts/` contient **1758 fichiers `.const.ts`** générés,
répartis en 8 familles :

| Famille      | Fichiers | Dossier                         | Interface doc        |
|--------------|----------|---------------------------------|----------------------|
| interfaces   | 664      | `app/consts/interfaces/`        | `IInterfaceDoc`      |
| utils        | 345      | `app/consts/utils/`             | `IUtilDoc`           |
| consts       | 248      | `app/consts/consts/`            | `IConstDoc`          |
| components   | 194      | `app/consts/components/`        | `IComponentDoc`      |
| composables  | 104      | `app/consts/composables/`       | `IComposableDoc`     |
| enums        | 92       | `app/consts/enums/`             | `IEnumDoc`           |
| types        | 79       | `app/consts/types/`             | `ITypeDoc`           |
| directives   | 6        | `app/consts/directives/`        | `IDirectiveDoc`      |

À ces fichiers de détail s'ajoutent les **consts catalogue** (index/listing) :
`components-catalog.const.ts` (2078 lignes), `directives-catalog.const.ts`, plus
les catalogues d'enums/consts/types/interfaces/utils/composables (certains sont
des fichiers `*-catalog.const.ts`, d'autres sont **dérivés à la volée** des `_DOC`
via `import.meta.glob` — voir §1.4).

### 1.2 Comment la donnée est produite aujourd'hui

`scripts/generate-api-docs.mjs` + `scripts/lib/{extract,merge,serialize,read-existing}.mjs`
parsent la **source du DS** (`packages/ds/src/{enums,interfaces,consts,utils}`) via
l'API du compilateur TypeScript et émettent un fichier `.const.ts` par symbole.

Le pipeline est **idempotent** et **non destructif** par conception (cf. en-têtes
des scripts) : il distingue deux moitiés dans chaque entité.

- **Champs STRUCTURAUX (auto-dérivés, regénérés)** — extraits avec certitude de
  la source DS :
  - `definition` / `signature` (texte verbatim du déclaratif)
  - `values[].value` (membres d'enum / d'objet / d'array)
  - `props[].name | type | optional` (interfaces)
  - `params[].name | type | required | defaultValue`, `returns.type` (utils)
  - `extends[]`, `name`, `sourceFile`, `value`
- **Champs ÉDITORIAUX (curated, préservés verbatim, jamais écrasés)** :
  - `category`, `icon`
  - `descriptionKey` (clé i18n), `descriptionFallback` (prose anglaise)
  - `examples[]` (titre + code + lang)
  - `usedBy[]`, `related[]`
  - `noteKey` / `noteFallback`
  - **la description par item** (par valeur d'enum, par prop d'interface, par
    param d'util) — réappariée par identité (`value` / `name`).

La règle d'or du merge (cf. `merge.mjs`) : *« les champs structuraux sont
regénérés depuis la source ; les champs curated sont préservés verbatim et ne sont
JAMAIS écrasés par une prose vide / auto-générée. »* Une description n'est remplie
depuis la JSDoc source que si elle est réelle (pas le placeholder DS).

> Note de couverture : le générateur traite **4 domaines** (enums, interfaces,
> consts, utils). Les 4 autres familles présentes dans `app/consts/`
> (**components, composables, types, directives**) ne sont **pas** produites par ce
> script — leurs `_DOC` sont curated à la main et/ou enrichis par fan-out (cf. le
> guide « FAN-OUT GUIDE » dans `components-catalog.interface.ts`). Cette asymétrie
> est un fait du dépôt à conserver dans le modèle (toutes les familles ne se
> re-synchronisent pas automatiquement de la même façon).

### 1.3 Modèle d'entité complet (recensé)

Interfaces sous `packages/marketing/app/interfaces/` :

- `components-catalog.interface.ts` — `IComponentEntry`, `IComponentFamilyMember`,
  `IComponentRelated`, **`IComponentDoc`** (la plus riche), `IComponentTypeRef`,
  `IComponentPropRow`, `IComponentEmitRow`, `IComponentSlotRow`,
  `IComponentExample`, `IComponentAnatomy(+Node, +LegendItem)`,
  `IComponentPreviewVariant`, `IComponentCssVar`, `IComponentExposed`,
  `IComponentComposable`, `IComponentA11y`, `IComponentTokens`,
  `IComponentPlayground(+Control)`.
- `composables-catalog.interface.ts` — `IComposableEntry`, `IComposableParam`,
  `IComposableReturn`, `IComposableExample`, **`IComposableDoc`**.
- `consts-catalog.interface.ts` — `IConstEntry`, `IConstValue`,
  `IConstUsedByEntry`, `IConstExample`, **`IConstDoc`**.
- `enums-catalog.interface.ts` — `IEnumEntry`, **`IEnumDoc`**, `IEnumDocValue`,
  `IEnumUsedByEntry`, `IEnumExample`.
- `interfaces-catalog.interface.ts` — `IInterfaceEntry`, **`IInterfaceDoc`**,
  `IInterfacePropRow`, `IInterfaceUsedByEntry`, `IInterfaceExample`.
- `types-catalog.interface.ts` — `ITypeEntry`, **`ITypeDoc`**, `ITypeDocValue`,
  `ITypeUsedByEntry`, `ITypeExample`.
- `utils-catalog.interface.ts` — `IUtilEntry`, `IUtilParam`, `IUtilReturn`,
  `IUtilExample`, **`IUtilDoc`**.
- `directives-catalog.interface.ts` — `IDirectiveCatalogItem`, `IDirectiveArg`,
  `IDirectiveModifier`.
- `directive-doc.interface.ts` — **`IDirectiveDoc`**, `IDirectiveArgRow`,
  `IDirectiveModifierRow`, `IDirectiveExample` (importe `IComponentRelated`).

> Observation transverse : les 8 `*Doc` partagent une **forme commune** :
> `slug`, `name`, `category`/`domain`, `icon`, `descriptionKey`,
> `descriptionFallback`, `sourceFile`, `examples[]`, `usedBy[]` ou `related[]`.
> Les différences sont la collection enfant (props / values / params / emits /
> slots / args / modifiers) et les blocs riches propres aux composants (anatomy,
> a11y, tokens, playground, …). Cette communauté de forme guide le schéma DB
> (une table `doc_entry` générique + des tables enfants par type de collection),
> et **respecte la règle anti-duplication du repo** (réutiliser les champs
> transverses plutôt qu'en redéfinir un jeu par famille).

### 1.4 Qui consomme quoi (cartographie import → page)

| Page | Source de la donnée (vérifiée) |
|---|---|
| `pages/components/index.vue` | `COMPONENTS_CATALOG`, `COMPONENTS_CATEGORIES` (`consts/components-catalog.const`) |
| `pages/components/[slug].vue` | `COMPONENTS_CATALOG` + `import.meta.glob('~/consts/components/*.const.ts', { eager: true })` → export `*_DOC` |
| `pages/composables/index.vue` | `import.meta.glob('~/consts/composables/*.const.ts', { eager: true })` (catalogue dérivé à la volée) |
| `pages/composables/[slug].vue` | `import.meta.glob('~/consts/composables/*.const.ts', { eager: true })` → `*_DOC` |
| `pages/enums/index.vue` | `import.meta.glob('~/consts/enums/*.const.ts', { eager: true })` |
| `pages/enums/[slug].vue` | `import.meta.glob('~/consts/enums/*.const.ts')` → `*_ENUM_DOC` |
| `pages/consts/index.vue` | `import.meta.glob('~/consts/consts/*.const.ts')` |
| `pages/consts/[slug].vue` | idem → `*_CONST_DOC` |
| `pages/types/index.vue` | `import.meta.glob('~/consts/types/*.const.ts')` |
| `pages/types/[slug].vue` | idem → `*_DOC` |
| `pages/interfaces/index.vue` | `import.meta.glob('~/consts/interfaces/*.const.ts')` |
| `pages/interfaces/[slug].vue` | idem → `*_INTERFACE_DOC` |
| `pages/utils/index.vue` | `import.meta.glob('~/consts/utils/*.const.ts')` |
| `pages/utils/[slug].vue` | idem → `*_UTIL_DOC` |
| `pages/directives/index.vue` | `DIRECTIVES_CATALOG` (`consts/directives-catalog.const`) |
| `pages/directives/[slug].vue` | `DIRECTIVES_CATALOG` + `import.meta.glob('~/consts/directives/*.const.ts')` → `*_DOC` |

**Conséquence architecturale** : le couplage page ↔ donnée passe par exactement
deux mécanismes — (a) un `import.meta.glob` eager sur le dossier `consts/<famille>/`,
(b) un import statique d'une const catalogue. Pour rebrancher les pages sur l'API
(ticket D), il suffit de remplacer ces deux accès par un **composable de lecture**
(`useApiReference`) qui appelle l'API Nitro. Le `<template>` des pages ne change
quasiment pas. C'est ce qui rend la migration incrémentale et non destructive.

### 1.5 Infrastructure réelle (vérifiée)

- **Aucune dépendance DB** dans `packages/marketing/package.json` (pas de knex,
  drizzle, prisma, pg, better-sqlite3…).
- Déjà un `server/api/` Nitro : `health.get.ts`, `github-stars.get.ts`
  (pattern `defineCachedEventHandler`, secrets via `process.env` / `runtimeConfig`).
- `nuxt.config.ts` : i18n `@nuxtjs/i18n 9`, `defaultLocale: 'en'`,
  `strategy: 'prefix_except_default'`, locales via `app/assets/locales/en.json`,
  cookie `I18N_COOKIE_KEY`. `runtimeConfig.public` alimenté par `process.env`.
- **Déploiement** : `packages/marketing/Dockerfile` multi-stage. Stage `build`
  compile la lib + embeds (Histoire/VitePress) + `nuxt build` → `.output`. Stage
  `runtime` (node:22-alpine) ne copie **que** `.output` et lance
  `node .output/server/index.mjs`. Coolify, 3 envs (dev/stage/prod), healthcheck
  `GET /api/health`, port 3000.
- **Fait critique pour le choix DB** : l'image runtime est **immuable et reconstruite
  à chaque déploiement**. Un fichier embarqué dans l'image (ex. SQLite baked) serait
  réinitialisé à chaque deploy. Toute donnée persistante **doit** vivre soit dans un
  **volume persistant Coolify monté** (SQLite), soit dans un **service externe**
  (Postgres managé/containerisé).

---

## 2. Décision — Moteur de base de données

### Reco tranchée : **PostgreSQL** (service séparé), via **Knex.js**.

> Knex est déjà la baseline du projet (cf. CLAUDE.md racine utilisateur :
> « Knex.js — SQL query builder (SQLite, PostgreSQL, MySQL) »). On le réutilise —
> pas de nouvelle abstraction (règle anti-duplication). Le même code Knex tourne
> sur SQLite en dev local et Postgres en stage/prod si on le souhaite.

### Comparatif factuel

| Critère | SQLite (better-sqlite3, fichier) | **PostgreSQL (service)** |
|---|---|---|
| Ops / setup | Zéro service. **MAIS** : image runtime immuable → exige un **volume persistant** monté par Coolify, sinon reset à chaque deploy | Service séparé (container Coolify ou managé). Setup une fois par env |
| 3 envs (dev/stage/prod) | 3 volumes à gérer + sauvegardes fichier par env | 3 bases, backups/restore standard Coolify/PG, snapshots |
| Écritures concurrentes (backoffice multi-éditeur + SSR lecture) | Verrou écrivain unique (acceptable à faible charge, mais le backoffice peut écrire pendant que le SSR lit) | MVCC, conçu pour lecture/écriture concurrentes |
| Build Docker | better-sqlite3 est **natif** → recompilation (`python3/make/g++` déjà présents), risque de mismatch ABI alpine | Client `pg` pur JS, aucun binaire natif |
| Migrations / rollback | Knex migrations OK ; ALTER limité sur SQLite (recréation de table fréquente) | Knex migrations + ALTER complet, rollback propre |
| Cohérence baseline projet | Knex supporté mais SQLite = scénario « zéro service » | **Postgres = port `Y432` déjà prévu dans la stack baseline** |
| Recherche full-text (catalogues filtrables) | FTS5 (extension) | `tsvector` / `pg_trgm` natifs, plus riches |

### Pourquoi Postgres l'emporte ici

1. **L'argument « zéro service » de SQLite s'effondre** sur ce déploiement précis :
   l'image runtime ne contient que `.output` et est reconstruite à chaque deploy,
   donc SQLite **exige quand même** un volume persistant Coolify monté + une
   stratégie de backup par env. On ne gagne pas la simplicité d'ops promise.
2. Le backoffice introduit des **écritures concurrentes** avec le SSR qui lit en
   continu — exactement le cas où le modèle écrivain-unique de SQLite gêne.
3. `pg` est **pur JS** → pas de binaire natif à recompiler dans l'image alpine
   (better-sqlite3 a déjà mordu d'autres projets sur l'ABI alpine).
4. Postgres est **la baseline de la stack** (`Y432` réservé), backups et restore
   sont une fonction standard Coolify.

### Fallback documenté (si l'utilisateur refuse un service séparé)

SQLite + `better-sqlite3` reste viable **à condition** de :
- monter un **volume persistant Coolify** sur le chemin du fichier `.db` (hors
  `.output`, sinon écrasé) ;
- gérer 3 fichiers + 3 backups (un par env) ;
- accepter le verrou écrivain-unique (charge backoffice faible → OK).
Le code Knex étant identique, basculer SQLite ↔ Postgres est une question de
config de connexion. Cette dérogation devra être approuvée par l'utilisateur et
tracée (cf. politique d'exception du repo).

---

## 3. Modèle de données

### 3.1 Principe — table générique `doc_entry` + tables enfants

Les 8 `*Doc` partagent une forme commune (§1.3). Plutôt que 8 schémas parallèles
(duplication), on modélise une entité racine commune et on rattache les
collections variables par des tables enfants. Le champ `kind` discrimine la
famille. C'est l'application directe de la règle anti-duplication du repo.

### 3.2 Tables

> Convention : noms de tables/colonnes en `snake_case`, clés primaires `id` (uuid
> ou identité), `created_at` / `updated_at` sur chaque table. Champs marqués
> **[ÉDIT]** = éditoriaux (éditables backoffice) ; **[SRC]** = auto-dérivés de la
> source DS (re-synchronisables, jamais édités à la main) ; **[DÉRIVÉ]** =
> calculé/relationnel.

#### `doc_entry` (racine, toutes familles)

| Colonne | Type | Origine | Notes |
|---|---|---|---|
| `id` | uuid PK | — | |
| `kind` | enum(`component`,`composable`,`const`,`directive`,`enum`,`interface`,`type`,`util`) | — | discriminant famille |
| `slug` | text | **[SRC]** | unique par `kind` (`UNIQUE(kind, slug)`) |
| `name` | text | **[SRC]** | PascalCase / fn name |
| `category` | text | **[ÉDIT]** | curated (le générateur préserve l'existant) |
| `domain` | text null | **[ÉDIT]** | utilisé par composables/utils |
| `icon` | text null | **[ÉDIT]** | MDI |
| `description_key` | text | **[ÉDIT]** | clé i18n (snake_case) |
| `description_fallback` | text | **[ÉDIT]** | prose EN |
| `definition` | text null | **[SRC]** | code verbatim (enum/interface/const/type) |
| `signature` | text null | **[SRC]** | utils/composables |
| `tag` | text null | **[SRC]** | composants : `origam-btn` |
| `value` | text null | **[SRC]** | const scalaire |
| `source_file` | text null | **[SRC]** | chemin repo |
| `package_note` | text null | **[ÉDIT]** | composants |
| `note_key` / `note_fallback` | text null | **[ÉDIT]** | callout |
| `story_url` / `doc_url` | text null | **[ÉDIT]** | liens Histoire/VitePress |
| `parent_slug` | text null | **[SRC/ÉDIT]** | sous-composant |
| `kind_extra` | jsonb null | **[SRC+ÉDIT]** | champs propres composants peu requêtés : `anatomy`, `a11y`, `tokens`, `playground`, `exposed`, `css_vars`, `composable`, `preview_variants` (voir §3.4) |
| `created_at` / `updated_at` | timestamptz | — | |

#### Tables enfants de collection (ordonnées, `position int`)

- `doc_prop` — props d'interface ET props de composant : `entry_id` FK, `name`
  **[SRC]**, `type_label` **[SRC]**, `type_slug` **[ÉDIT/DÉRIVÉ]**, `type_kind`
  **[ÉDIT]** (`primitive|type|enum`), `optional` **[SRC]**, `required` **[SRC]**,
  `default_value` **[SRC/ÉDIT]**, `description_key` **[ÉDIT]**,
  `description_fallback` **[ÉDIT]** (curated, réapparié par `name`), `position`.
- `doc_value` — membres d'enum / valeurs d'objet|array de const / valeurs de type :
  `entry_id`, `value` **[SRC]**, `description_key`/`description_fallback`
  **[ÉDIT]**, `position`.
- `doc_param` — params d'util/composable : `entry_id`, `name` **[SRC]**,
  `type` **[SRC]**, `required` **[SRC]**, `default_value` **[SRC/ÉDIT]**,
  `description_key`/`description_fallback` **[ÉDIT]**, `position`.
- `doc_return` — retour d'util (1-1) ou retours de composable (1-N) : `entry_id`,
  `name` null **[SRC]**, `type` **[SRC]**, `description_*` **[ÉDIT]**, `position`.
- `doc_emit` — emits composant : `entry_id`, `event` **[SRC]**, `payload_label`
  **[SRC]**, `payload_slug`/`payload_kind` **[ÉDIT]**, `description_*` **[ÉDIT]**.
- `doc_slot` — slots composant : `entry_id`, `slot` **[SRC]**, `slot_props`
  **[SRC]**, `description_*` **[ÉDIT]**.
- `doc_example` — exemples (toutes familles) : `entry_id`, `title_key` **[ÉDIT]**,
  `title_fallback` **[ÉDIT]**, `code` **[ÉDIT]**, `lang` **[ÉDIT]**, `position`.
- `doc_directive_arg` / `doc_directive_modifier` — spécifiques directives
  (`name`, `type`, `required`, `description_*`).

#### Tables de relation (graphe de la doc)

- `doc_relation` — arêtes génériques `usedBy` / `related` / `family` / `extends` :
  `from_entry_id` FK, `to_kind` text, `to_slug` text, `to_name` text **[ÉDIT]**,
  `rel_type` enum(`used_by`,`related`,`family`,`extends`), `prop_name` text null
  **[SRC]** (pour `used_by` enum/type), `position`. La plupart sont **[ÉDIT]**
  (curated) sauf `extends` qui est **[SRC]**.

#### Catalogue & navigation

- `doc_category` — groupes d'affichage des pages index : `kind`, `key`, `label_key`
  **[ÉDIT]**, `icon` **[ÉDIT]**, `position`. (remplace `COMPONENTS_CATEGORIES`).
  Le « catalogue » des pages index devient une **projection** de `doc_entry`
  (champs légers : slug/name/icon/category/description) — pas une table à part.

#### Sync & audit

- `doc_sync_run` — trace chaque exécution du seed/ingestion : `id`, `started_at`,
  `finished_at`, `domain`, `created_count`, `updated_count`, `unchanged_count`,
  `source_commit` (git sha du DS au moment du run), `status`. Donne l'auditabilité
  que le générateur fichier offrait via ses logs.
- `doc_field_provenance` (optionnel mais recommandé) — pour chaque champ éditorial
  d'une entrée, marque s'il a été **édité manuellement** (`edited_by_user=true`) :
  c'est le verrou qui empêche la re-sync d'écraser une édition (cf. §4). Alternative
  plus simple : une colonne `editorial_locked_at` par table éditoriale. Choix laissé
  au backend-lead au ticket A.

#### Place réservée (hors périmètre, macro seulement)

- `theme` / `theme_preset` — **placeholder** pour le futur format de thème
  (`IOrigamTheme`). On réserve la place au niveau macro : une table `theme`
  (`id`, `slug`, `name`, `data jsonb`, `created_at`) sans plus de détail tant que
  l'utilisateur n'a pas fourni l'exemple. **Ne pas implémenter dans ce chantier.**

### 3.3 Séparation éditorial vs auto-dérivé (synthèse)

| Catégorie | Champs | Propriétaire | Re-sync |
|---|---|---|---|
| **Auto-dérivé [SRC]** | `definition`, `signature`, `tag`, `value`, `source_file`, `extends`, `props.name/type/optional/required`, `values.value`, `params.name/type/required`, `returns.type`, `emits.event/payload_label`, `slots.slot/slot_props`, `prop_name` des `used_by` | Source DS (code) | Écrasé à chaque re-sync |
| **Éditorial [ÉDIT]** | `category`, `domain`, `icon`, `description_key`, `description_fallback` (entry + par item), `examples`, `usedBy`/`related`/`family`, `note*`, `story_url`/`doc_url`, `package_note`, blocs riches composant (`anatomy`, `a11y`, `tokens`, `playground`, …) | DB / backoffice | **Préservé** (jamais écrasé) |

C'est exactement la frontière déjà appliquée par `merge.mjs` — on la porte
fidèlement en DB. Le seed (ticket B) **réutilise** `extract.mjs` + `merge.mjs`
plutôt que d'en réécrire la logique (anti-duplication).

### 3.4 Pourquoi `kind_extra` en `jsonb` pour les blocs riches composant

`anatomy`, `a11y`, `tokens`, `playground`, `exposed`, `css_vars`, `composable`,
`preview_variants` sont (a) propres aux composants, (b) lus en bloc à l'affichage,
(c) jamais filtrés/triés par la requête. Les normaliser en ~10 tables
supplémentaires alourdirait le schéma sans bénéfice de requête. On les stocke en
`jsonb` validé par les interfaces TS existantes (réutilisées telles quelles côté
API). Les collections **partagées et requêtables** (props, values, params, emits,
slots, examples, relations) restent normalisées.

---

## 4. Stratégie source-of-truth (modèle hybride)

Trois acteurs coexistent : **le code DS** (`packages/ds/src`), **la DB**, **le
backoffice**. Modèle hybride :

- La **source DS reste la vérité** pour les champs **[SRC]** (structure du code).
- La **DB devient la vérité** pour les champs **[ÉDIT]** (prose, exemples,
  catégorisation, liens, blocs riches).

### Flux de re-sync (non destructif)

```
packages/ds/src ──(extract.mjs, inchangé)──▶ faits structuraux
                                                     │
app/consts/**.const.ts (legacy, phase transitoire) ─┤  (merge.mjs, inchangé : préserve le curated)
                                                     ▼
                                          seed/ingestion (NOUVEAU, ticket B)
                                                     │  UPSERT par (kind, slug)
                                                     ▼
                                                  PostgreSQL
                                            ▲                 │
                              (édite [ÉDIT]) │                 │ (lit [SRC]+[ÉDIT])
                                       backoffice         API lecture ──▶ pages marketing
```

Règles du flux (calquées sur la règle d'or de `merge.mjs`) :

1. La re-sync **upsert** par clé `(kind, slug)`. Elle **n'écrit que les champs
   [SRC]**. Elle ne touche jamais un champ [ÉDIT].
2. Pour les descriptions par item (prop/value/param), réappariement par identité
   (`name`/`value`) — comme `merge.mjs`. Item disparu de la source → la ligne est
   marquée `orphaned` (pas supprimée immédiatement : on garde le curated le temps
   d'une revue backoffice), nouvel item → ligne créée avec champs [ÉDIT] vides.
3. **Verrou anti-écrasement** : un champ [ÉDIT] modifié dans le backoffice est
   marqué (`edited_by_user` / `editorial_locked_at`). La re-sync ne le réécrit
   jamais (elle n'y touche pas de toute façon, mais le flag protège aussi contre un
   futur seed « backfill prose depuis JSDoc »).
4. **Premier seed** : la source de vérité initiale des champs [ÉDIT] est le contenu
   **actuel** des 1758 `.const.ts` (ils contiennent déjà toute la prose curated).
   Le seed lit ces fichiers via `read-existing.mjs` (déjà écrit) pour peupler la DB
   sans perte. C'est ce qui rend la migration **non destructive**.
5. La re-sync produit une ligne `doc_sync_run` (audit) et peut tourner en mode
   `--check` (drift gate CI) exactement comme aujourd'hui.

> Conséquence : `generate-api-docs.mjs` n'est pas jeté. Il est **réorienté** :
> sa cible d'écriture passe de « fichiers `.const.ts` » à « UPSERT DB ». Les libs
> `extract/merge/read-existing` sont réutilisées quasi telles quelles. Cela
> respecte la règle « réutiliser avant d'écrire ».

---

## 5. Couche API (Nitro `server/api`)

Convention Nitro file-based déjà en place (`server/api/*.get.ts`). On ajoute un
namespace versionné `server/api/reference/`.

### Lecture publique (consommée par le site, cacheable)

| Route | Méthode | Rôle |
|---|---|---|
| `/api/reference/:kind` | GET | catalogue (liste légère filtrable) d'une famille — remplace les `*_CATALOG` et les `import.meta.glob` d'index |
| `/api/reference/:kind/:slug` | GET | doc complète d'une entité (entry + collections + relations + `kind_extra`) — remplace `import.meta.glob` de détail |
| `/api/reference/categories/:kind` | GET | groupes d'affichage (remplace `COMPONENTS_CATEGORIES`) |

- Réutiliser `defineCachedEventHandler` (déjà utilisé par `github-stars.get.ts`)
  pour la lecture publique → SSR rapide, invalidation à la re-sync/édition.
- **Validation d'input sur chaque endpoint** (`:kind` ∈ enum des 8 familles,
  `:slug` validé regex kebab) — règle backend du repo.
- Forme de réponse = exactement les interfaces `*Doc` existantes (réutilisées,
  pas redéfinies). L'API mappe `doc_entry` + enfants → `IComponentDoc` etc.

### CRUD protégé (backoffice)

| Route | Méthode | Rôle |
|---|---|---|
| `/api/admin/reference/:kind/:slug` | PUT/PATCH | éditer les champs **[ÉDIT]** d'une entité |
| `/api/admin/reference/:kind/:slug/:collection/...` | POST/PATCH/DELETE | gérer examples / relations / descriptions par item |
| `/api/admin/reference/sync` | POST | déclencher une re-sync (réutilise le pipeline ticket B) |
| `/api/admin/reference/sync/runs` | GET | historique `doc_sync_run` |

- **Le CRUD ne touche jamais les champs [SRC]** (ils sont en lecture seule côté
  backoffice ; seule la re-sync les écrit). C'est imposé côté serveur, pas
  seulement côté UI.
- Validation stricte (type/format/taille) + distinction `4xx`/`5xx`, logs
  structurés, aucun secret hardcodé (tout via `runtimeConfig`/env) — règles backend.

### Auth backoffice (le plus simple qui tienne)

Reco : **session par cookie httpOnly signé**, un seul rôle `admin`, secret via
`runtimeConfig` (env `NUXT_ADMIN_...`). Concrètement :

- `/api/admin/login` (POST) : compare le mot de passe à un **hash** stocké en
  env/secret (argon2/bcrypt), pose un cookie de session signé httpOnly + SameSite.
- Un **middleware serveur Nitro** (`server/middleware/admin.ts`) protège tout
  `/api/admin/**` (rejette 401 si pas de session valide). On réutilise le pattern
  « PUBLIC_ROUTES »/middleware auth de la baseline (CLAUDE.md global).
- Pas d'OAuth, pas de table users pour démarrer (un seul admin = l'utilisateur).
  Si plusieurs éditeurs plus tard → table `admin_user` + ioredis pour les sessions
  (déjà dans la baseline, port `Y379`). **Hors périmètre initial.**

> Justification simplicité : un seul éditeur connu, surface d'écriture interne. Une
> session cookie signée + secret env couvre le besoin sans introduire ioredis,
> JWT, ni provider OAuth. Évolution documentée si le besoin grandit.

---

## 6. Backoffice (UI admin)

### Où il vit

Reco : **section `/admin` du même site marketing**, protégée par le middleware
serveur, **PAS une app séparée**.

Justifications factuelles :
- L'API de lecture/écriture vit déjà dans le même process Nitro → zéro CORS, zéro
  second déploiement, un seul Dockerfile/Coolify.
- La baseline impose `BaseService` en URL relative `/api/v1` (API + UI même
  process) — même philosophie.
- **Le marketing est une démo du DS** (règle MEMORY) : un backoffice construit
  avec les composants origam (`origam-table`, `origam-btn`, `origam-text-field`,
  `origam-dialog`, …) est une vitrine supplémentaire. Réutiliser les composants DS
  est obligatoire (zéro HTML natif quand un composant origam existe).

Conséquence structure (anticiper l'évolution — règle MEMORY « prévoir layouts en
amont ») :
- `app/pages/admin/` (login, dashboard, `:kind/index`, `:kind/:slug` éditeur).
- `app/layouts/admin.vue` créé d'emblée (chrome backoffice distinct du site),
  même si un seul layout au départ.
- `app/middleware/admin.ts` (client, garde de route) + `server/middleware/admin.ts`
  (serveur, garde API). Le serveur est la vraie barrière ; le client est UX.
- i18n : toutes les chaînes du backoffice en `t('key','fallback')`, clés
  **snake_case** ajoutées à `en.json` dans le même commit (règle i18n).

### Périmètre CRUD par famille

| Famille | Éditable dans le backoffice ([ÉDIT]) | Lecture seule ([SRC], re-sync) |
|---|---|---|
| components | category, icon, descriptions (entry + par item), examples, family/related/usedBy, note, story/doc URL, blocs riches (anatomy/a11y/tokens/playground/exposed/cssVars/composable/preview) | tag, props.type, emits.payload, slots.slotProps, source_file |
| composables | domain, icon, descriptions, examples, related, consumedInterfaces, note | signature, params.type, returns.type, source_file |
| utils | category, icon, descriptions, examples, related, note | signature, params.type, returns.type, source_file |
| consts | category, icon, descriptions (entry + par value), examples, usedBy | definition, value(s), source_file |
| enums | category, icon, descriptions (entry + par value), examples, usedBy | definition, values, source_file |
| types | category, icon, descriptions (entry + par value), examples, usedBy | definition, values, kind, source_file |
| interfaces | category, icon, descriptions (entry + par prop), examples, usedBy | definition, extends, props.type/optional, source_file |
| directives | icon, descriptions, args/modifiers descriptions, examples, related, note, story_url | signature(Code/Summary), args.type |

Plus un écran **Sync** : bouton « re-synchroniser depuis la source DS », affichage
du dernier `doc_sync_run`, diff des items orphelins/nouveaux à arbitrer.

---

## 7. Plan de migration — incrémental & non destructif

Ordre **impératif**. À aucun moment le site live ne casse : tant que le ticket D
n'est pas mergé, les pages continuent de lire les `.const.ts` ; la suppression des
const (ticket F) n'arrive qu'après bascule + validation.

1. **(A) Infra DB + schéma + migrations**
   Choix Postgres, connexion Knex (réutiliser la baseline), migrations versionnées
   (up/down) pour toutes les tables §3, **rollback documenté**. Connexion via
   `runtimeConfig` (env, aucun secret hardcodé). Coolify : provisionner le service
   PG sur les 3 envs (`Y432`). Healthcheck DB ajouté à `/api/health`.
   → *Le site continue de tourner sur les const ; rien n'est rebranché.*

2. **(B) Seed / ingestion depuis l'existant**
   Réorienter `generate-api-docs.mjs` (réutilise `extract/merge/read-existing`)
   pour **UPSERT en DB** au lieu d'écrire des fichiers. Premier seed = lecture des
   1758 `.const.ts` actuels (prose curated) + faits structuraux de la source DS.
   Idempotent, mode `--check`, écrit `doc_sync_run`. **Aucune perte** : la DB
   reçoit exactement ce qui est dans les fichiers.
   → *Vérification : `count(doc_entry)` par kind == nombre de fichiers (664, 345,
   248, 194, 104, 92, 79, 6). Spot-check de quelques entités contre leur `.const.ts`.*

3. **(C) API de lecture**
   `server/api/reference/:kind` + `:kind/:slug` + `categories/:kind`,
   `defineCachedEventHandler`, validation d'input, mapping DB → interfaces `*Doc`
   existantes. Doc d'API (markdown/OpenAPI) à jour.
   → *Vérification : la réponse API d'une entité est byte-équivalente (au mapping
   près) à l'objet `_DOC` du fichier correspondant. Tests d'intégration sur les 8
   kinds.*

4. **(D) Rebrancher les pages sur l'API**
   Introduire `composables/useApiReference.ts` (lecture via `$fetch`/`useFetch`,
   SSR-friendly). Remplacer dans chaque page le `import.meta.glob` et l'import de
   catalogue par le composable. **Les `<template>` ne changent pas** (mêmes formes
   de données). Pages basculées une par une (8 familles × index/détail).
   → *Vérification : QA e2e sur chaque route index + détail (parcours critiques),
   a11y vert, comparaison visuelle avant/après. Le site live reste identique.*

5. **(E) Backoffice CRUD**
   Auth (session cookie + middleware serveur), pages `/admin`, layout `admin.vue`,
   API `/api/admin/**` (édition [ÉDIT] uniquement), écran Sync. Composants origam.
   → *Vérification : éditer une description dans le backoffice → re-sync → la
   description n'est PAS écrasée (verrou). e2e du parcours admin.*

6. **(F) Retrait des 1758 const (DERNIER)**
   Seulement après D validé en prod et E livré. Supprimer
   `app/consts/{components,composables,consts,directives,enums,interfaces,types,utils}/`
   + les `*-catalog.const.ts` devenus inutiles. Retirer les `import.meta.glob`
   résiduels. Conserver `generate-api-docs.mjs` réorienté (il sert maintenant la
   re-sync DB).
   → *Vérification : build + typecheck + e2e complets verts sans les const.
   Filet de sécurité git tag avant suppression (règle « stash/tag before
   destructive op »).*

Pre-delivery gate à chaque merge (règle repo) : TU verts, e2e/a11y verts, sécurité
(`pnpm audit` sans high/critical, scan secrets, `/security-review`), sign-off
`project-manager`.

---

## 8. Découpage en tickets parallélisables

1 ticket = 1 livrable indépendant (idéalement 1 dev / worktree). Dépendances
explicites.

| # | Ticket | Rôle | Dépend de | Parallélisable avec |
|---|---|---|---|---|
| **A** | Infra DB Postgres + schéma + migrations Knex (up/down + rollback doc) + connexion via env + provisioning Coolify 3 envs + healthcheck DB | backend-lead + backend-dev | — | G (en partie) |
| **B** | Pipeline seed/ingestion : réorienter `generate-api-docs.mjs` vers UPSERT DB (réutilise extract/merge/read-existing), premier seed depuis les 1758 const, `doc_sync_run`, mode `--check` | backend-dev | A | — |
| **C** | API lecture publique `server/api/reference/**` (cacheable, validation, mapping → `*Doc`) + doc API | backend-dev | A (schéma) ; B utile pour données réelles | E1 (auth) |
| **D** | `composables/useApiReference` + rebranchement des 16 pages (8 index + 8 détail) du glob/catalogue vers l'API ; `<template>` inchangés ; e2e par route | frontend-lead + frontend-dev | C | E2 |
| **E1** | Auth backoffice : `/api/admin/login`, session cookie signée, `server/middleware/admin.ts`, secret via env | backend-dev | A | C |
| **E2** | Backoffice UI : `layouts/admin.vue`, pages `/admin/**`, `middleware/admin.ts`, composants origam, i18n snake_case | frontend-dev | E1 + C (lecture) | D |
| **E3** | API CRUD `/api/admin/reference/**` (édition [ÉDIT] only, verrou anti-écrasement, validation) + endpoint Sync | backend-dev | A, E1 ; B (pipeline sync) | E2 |
| **F** | Retrait des 1758 const + `*-catalog.const.ts` + globs résiduels ; tag de sécurité ; build/typecheck/e2e verts | frontend-lead | **D mergé en prod + E2/E3 livrés** | — |
| **G** | (transverse) Doc ADR + runbook ops (backup/restore PG, rollback migration, procédure re-sync) | architect | A (pour le runbook ops) | tout |

Chemin critique : **A → B → C → D → F**. La branche backoffice **E1 → (E2 ∥ E3)**
se développe en parallèle de C/D une fois A livré. G est transverse.

---

## 9. Conséquences

### Positives
- Élimination de la dette des 1758 fichiers générés versionnés.
- Édition de la prose/exemples/catégories sans rebuild ni commit (backoffice).
- Frontière [SRC]/[ÉDIT] explicite et appliquée côté serveur (plus seulement par
  convention de script).
- Backoffice = vitrine supplémentaire du DS.
- Réutilisation maximale de l'existant (`extract/merge/read-existing`, interfaces
  `*Doc`, `defineCachedEventHandler`, pattern middleware) → conforme anti-duplication.

### Coûts / risques
- Un service Postgres à exploiter sur 3 envs (backup/restore, monitoring).
- Surface API + auth à sécuriser (atténué : un seul rôle admin, validation stricte,
  security-review obligatoire).
- La re-sync orpheline/nouvelle doit être arbitrée à la main (écran Sync) — pas une
  régression : c'est déjà le cas implicitement avec le générateur fichier.

### Dérogation possible (à approuver par l'utilisateur)
- SQLite + volume persistant Coolify au lieu de Postgres (cf. §2 fallback). Même
  code Knex, bascule par config.
