# Origam Marketing Platform — Specifications v3

> Référence canonique. Toute implémentation doit respecter : les maquettes
> fournies (`~/Desktop/Origam Marketing — print.pdf` + `Origam Marketing _standalone_.html`),
> le DS origam (composants + tokens + theming via `origam/nuxt` / `useTheme` /
> `OrigamThemeProvider`), et les conventions de code/architecture du projet
> (CLAUDE.md global + projet, structure par feature, naming, i18n dans
> `app/assets/locales`, theming via tokens DS — pas de calque CSS parallèle).

## Vision

Origam devient une plateforme complète de Design System composée de :

- Marketing Site
- Documentation
- Components Showcase
- Playground
- Theme Gallery
- Theme Builder
- Theme Export System

## Pages principales

- `/`
- `/components`
- `/playground`
- `/themes`
- `/themes/builder`
- `/docs`
- `/stories`
- `/blog`
- `/changelog`

## Landing Page (maquette "Landing — Sobre")

Conservée avec : Hero principal, Statistiques, Features, Playground Preview,
Showcase, Theming, CTA final.

Thèmes affichés (chacun en Light + Dark) : Sobre, Glass, Geek, Cartoon,
Editorial, Material, Ecom, Apple.

## Components (maquette Components)

Fonctionnalités : Recherche, Filtres, Catégories, Statuts, Preview live,
Accès documentation, Accès stories.

Catégories : Forms, Data Display, Feedback, Navigation, Layout, Charts,
Media, Utilities.

## Playground (maquette Playground)

Fonctionnalités : Monaco Editor, Vue REPL, Live Preview, Templates prédéfinis,
Partage via URL, Console intégrée, Informations bundle.

Templates : Hello World, Form, Data Table, Chart Line, Chart Donut,
Theme Switcher, Auth Flow, Dialog, Modal Stack.

## Theme Builder — `/themes/builder`

Objectif : créer un thème Origam complet sans écrire de code.
Layout : Sidebar de configuration + Preview temps réel.

Informations générales : Theme Name, Author, Description.

### Tokens globaux
- Couleurs : Primary, Secondary, Success, Warning, Danger, Info, Neutral,
  Surface, Background, Text, Border. Formats HEX / RGB / HSL. Preview instantané.
- Radius : xs, sm, md, lg, xl, 2xl, pill.
- Typography : Font Family, Font Scale, Font Weight, Letter Spacing, Line Height.
- Shadows : xs, sm, md, lg, xl.
- Spacing : xs, sm, md, lg, xl.
- Animations : Fast, Normal, Slow.

### Configuration des composants (preview live chacun)
- Button : Variant / Taille / Radius / Elevation / Animation par défaut.
- Card : Padding / Radius / Elevation / Border / Background.
- TextField : Filled / Outlined / Underlined / Focus Color / Border Style / Label Position.
- Composants supportés : Button, Card, Alert, Chip, Dialog, Drawer, Tooltip,
  Avatar, DataTable, TextField, Select, Checkbox, Switch, Tabs.

### Preview temps réel
Ne pas montrer un seul composant : afficher un **mini dashboard complet**
(Navbar, Cards, Inputs, Table, Charts, Dialogs, Alerts, Buttons) pour détecter
immédiatement les incohérences visuelles.

Modes : Device (Desktop / Tablet / Mobile) · Theme (Light / Dark).

### Export du thème (bouton "Export Theme")
Formats :
- JSON : `{ "name": "MyTheme", "tokens": {}, "components": {} }`
- TypeScript : `export const myTheme = {}`
- CSS Variables : `:root { --origam-primary: #7c3aed; }`

Snippet d'intégration auto-généré :
```ts
import { myTheme } from './my-theme'
createOrigam({ theme: myTheme })
```

### IA de génération de thème (futur)
Input : Logo / URL du site / Palette → génère Tokens, Radius, Typographie,
Styles de composants.

## Marketplace — `/themes`
Sections : Official Themes, Community Themes, Premium Themes.

## Maquettes de référence (officielles)
Landing Sobre, Components, Playground, et par thème Dark+Light :
Sobre, Glass, Geek, Cartoon, Editorial, Material, Ecom, Apple.
