import type { IOrigamTheme } from 'origam/interfaces'

export const glassLightTheme: IOrigamTheme = {
    name: 'glass',
    label: 'Glass',
    vars: {
        rounded: {
            card: '16px',
            btn: '999px',
            pill: '999px',
            sm: '10px',
            md: '16px',
            lg: '22px'
        },
        color: {
            surface: {
                default: '#e9ecff',
                raised: 'rgba(255, 255, 255, 0.65)',
                sunken: 'rgba(255, 255, 255, 0.85)',
                overlay: 'rgba(255, 255, 255, 0.85)',
                disabled: 'rgba(196, 181, 253, 0.20)'
            },
            text: {
                primary: '#1a1538',
                secondary: '#3f2e7e',
                tertiary: '#4c3a8c',
                disabled: '#a78bfa',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1a1538'
            },
            action: {
                primary: {
                    bg: '#7c3aed',
                    bgHover: '#6d28d9',
                    bgSubtle: 'rgba(124, 58, 237, 0.10)',
                    bgDisabled: 'rgba(196, 181, 253, 0.20)',
                    fg: '#ffffff',
                    fgSubtle: '#6d28d9',
                    fgDisabled: '#a78bfa'
                },
                secondary: {
                    bg: 'rgba(255, 255, 255, 0.18)',
                    bgHover: 'rgba(255, 255, 255, 0.28)',
                    bgDisabled: 'rgba(255, 255, 255, 0.08)',
                    fg: '#1a1538',
                    fgDisabled: '#a78bfa'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(124, 58, 237, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#6d28d9',
                    fgDisabled: '#a78bfa'
                }
            },
            border: {
                // Fix source #2 (SYNTHESE glass §5.2, WCAG 1.4.11 non-text
                // contrast): the previous rgba(124,58,237,.20) resolved to
                // ~2.1:1 — an empty control/field contour was nearly
                // invisible on the frosted gradient. Solid #6d28d9 (6.06:1,
                // spec-calculated) replaces it as the global default border.
                default: '#6d28d9',
                subtle: 'rgba(124, 58, 237, 0.10)',
                strong: 'rgba(124, 58, 237, 0.35)',
                focus: '#7c3aed',
                'subtle-alpha': 'rgba(124, 58, 237, 0.12)',
                ghost: 'rgba(124, 58, 237, 0.16)'
            },
            feedback: {
                success: {
                    bg: '#16a34a',
                    bgSubtle: 'rgba(22, 163, 74, 0.1)',
                    fg: '#000000',
                    // Fix source #1 (SYNTHESE glass §5.1): #15803d measured
                    // 4.4:1 on the frosted surface (< AA). green-800 clears
                    // AA at 6.24:1.
                    fgSubtle: '#166534',
                    border: '#16a34a'
                },
                warning: {
                    bg: '#d97706',
                    bgSubtle: 'rgba(217, 119, 6, 0.1)',
                    fg: '#000000',
                    // Fix source #1 (SYNTHESE glass §5.1): #b45309 measured
                    // 4.4:1 on the frosted surface (< AA). amber-800 clears
                    // AA at 6.21:1.
                    fgSubtle: '#92400e',
                    border: '#d97706'
                },
                danger: {
                    bg: '#dc2626',
                    bgSubtle: 'rgba(220, 38, 38, 0.1)',
                    fg: '#ffffff',
                    fgSubtle: '#b91c1c',
                    border: '#dc2626'
                },
                info: {
                    bg: '#2563eb',
                    bgSubtle: 'rgba(37, 99, 235, 0.1)',
                    fg: '#ffffff',
                    fgSubtle: '#1d4ed8',
                    border: '#2563eb'
                }
            },
            'btn-primary-text': '#1a1538',
            'btn-secondary-bg': 'rgba(255, 255, 255, 0.22)',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#1a1538'
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. Échelle croissante glassmorphism :
        // inset white highlights (reflets internes) + blur diffus violet. Les composants
        // consomment via la prop `elevation` (ci-dessous), jamais de shadow custom nommée.
        shadow: {
            none: 'none',
            xs: 'inset 0 1px 0 rgba(255, 255, 255, 0.70), 0 1px 4px -1px rgba(60, 30, 120, 0.08)',
            sm: 'inset 0 1px 1px rgba(255, 255, 255, 0.80), inset 1px 0 1px rgba(255, 255, 255, 0.40), 0 4px 12px -4px rgba(60, 30, 120, 0.15)',
            md: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.10), 0 6px 20px -6px rgba(60, 30, 120, 0.25)',
            lg: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.12), 0 10px 30px -12px rgba(60, 30, 120, 0.40)',
            xl: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.60), inset 0 -1px 1px rgba(124, 58, 237, 0.18), 0 16px 48px -16px rgba(60, 30, 120, 0.55), 0 4px 12px -4px rgba(60, 30, 120, 0.20)'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides glass superposés sur la baseline
    // `origam` (deep-merge). Identité glassmorphism = très arrondi + translucide
    // + bordures subtiles + elevation diffuse. Seuls les reflets et couleurs
    // translucides (non exprimables en props) restent dans `vars`/`cssVars`.
    //
    // Source unique : SYNTHESE-glass-theme.md §3 (bloc validé). Chaque prop a
    // été vérifiée contre l'interface DS réelle avant écriture — voir la PR
    // pour le détail. PR #249 (issue #242, câblage `useDefaults()` sur 11
    // composants) est MERGÉE dans develop — tous les composants ci-dessous
    // sont désormais câblés et vérifiés par computed-style (voir la PR),
    // à l'exception de checkbox/radio (issue #241, glyphe mdi — distincte
    // de #242/#249, toujours ouverte).
    components: {
        // ── Btn family — hors périmètre SYNTHESE (non ré-spécifiée), conservée
        // telle quelle. `pill` retiré : IBtnProps n'a PAS de prop `pill`
        // (confirmé — seul IChipProps en a une) ; c'était un no-op silencieux.
        'origam-btn': { variant: 'tonal', rounded: 'lg', elevation: 2 },
        'origam-btn-group': { variant: 'tonal', rounded: 'lg', elevation: 2 },
        'origam-btn-toggle': { variant: 'tonal', rounded: 'lg', elevation: 2 },
        // `origam-field` — hors périmètre SYNTHESE. `border` retiré : IFieldProps
        // n'étend PAS IBorderProps (seuls IInputProps / ITextFieldProps l'ont) ;
        // c'était un no-op silencieux.
        'origam-field': { variant: 'outlined', rounded: 'lg' },
        'origam-date-picker-field': { rounded: 'lg', border: true },
        'origam-file-field': { rounded: 'lg', border: true },
        'origam-color-picker-field': { rounded: 'lg', border: true },

        // ── Feedback & Status (SYNTHESE §3) ─────────────────────────────
        'origam-alert': { rounded: 'lg', border: true, elevation: 2 },
        'origam-snackbar': { rounded: 'lg', border: true, elevation: 3 },
        'origam-badge': { rounded: 'lg', border: true, elevation: 1 },
        'origam-progress-linear': { rounded: true, color: 'primary' },
        'origam-progress-circular': { color: 'primary' },
        // variant:'tonal' retiré (fix source #3) : IChipProps n'a pas de
        // prop `variant` — translucidité posée via cssVars à la place.
        'origam-chip': { rounded: 'lg', border: true, pill: true, elevation: 1 },

        // ── Form & Input — sélection (SYNTHESE §3) ──────────────────────
        // rounded/border/elevation existent bien sur ICheckboxProps /
        // IRadioProps (types valides) mais ne sont PAS rendus par
        // OrigamCheckboxBtn.vue / OrigamRadioBtn.vue (glyphe mdi, aucun
        // useRounded/useBorder/useElevation dans le rendu — issue #241,
        // distincte de #242/#249. Posées quand même (prêtes à s'activer le jour où
        // #241 est corrigé) — marquées pending #241 dans la vérification (seul
        // point encore non résolu de tout le thème).
        'origam-checkbox': { rounded: 'lg', border: true, elevation: 3 }, // pending #241 (glyph render)
        'origam-radio': { rounded: 'lg', border: true, elevation: 3 }, // pending #241 (glyph render)
        // `color:'primary'` ajouté au-delà de la liste littérale SYNTHESE §3 :
        // ISwitchProps extends IColorProps (vérifié) — nécessaire pour obtenir
        // le "fill accent bombé" au ON exigé par la règle couple-actif §1.2 ;
        // sans lui le thumb/track ON restent sur la couleur neutre par défaut.
        'origam-switch': { rounded: 'lg', border: true, elevation: 3, inset: true, color: 'primary' },
        'origam-slider-field': { rounded: true, color: 'primary', trackProps: { rounded: true } },

        // ── Form & Input — champs (SYNTHESE §3) ─────────────────────────
        'origam-text-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-textarea-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-number-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-password-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-select': {
            variant: 'outlined', rounded: 'lg', border: true,
            menuProps: { rounded: 'lg', elevation: 3, nav: true }
        },

        // ── Overlay & Surface (SYNTHESE §3) ─────────────────────────────
        'origam-card': { rounded: 'lg', border: true, elevation: 4 },
        'origam-sheet': { rounded: 'lg', border: true, elevation: 4 },
        'origam-menu': { rounded: 'lg', border: true, elevation: 4, nav: true },
        'origam-dialog': { rounded: 'lg', border: true, elevation: 5 },
        // origam-tooltip volontairement ABSENT d'ici : ITooltipProps n'a NI
        // `rounded`, NI `border`, NI `elevation` (confirmé — aucune de ces
        // Commons interfaces n'est étendue). Le radius passe par le cssVar
        // `--origam-tooltip---border-radius` (seul hook exposé par le SCSS).
        // Le "sans caret" du §1.4 est acquis par défaut : le composant ne
        // rend aucun triangle/pointeur, la spec n'a rien à désactiver.

        // ── Navigation (SYNTHESE §3) ─────────────────────────────────────
        'origam-tabs': { variant: 'pills', rounded: 'lg' },
        'origam-bottom-nav': { rounded: 'lg', border: true, elevation: 4 },
        'origam-breadcrumb': { rounded: 'lg', border: true, density: 'compact' },
        // rounded retiré : IPaginationProps n'étend PAS IRoundedProps — le
        // radius est 100% cssVar-driven (`--origam-pagination---border-radius`
        // / `-rounded`), câblé plus bas dans `cssVars`.
        'origam-pagination': { border: true, elevation: 2 },
        'origam-list': { rounded: 'lg', nav: true },

        // ── Data Display (SYNTHESE §3) ───────────────────────────────────
        'origam-table': { rounded: 'lg', border: true, elevation: 3, hover: true },
        'origam-code': { rounded: 'lg', border: true, elevation: 3, copyable: true },
        'origam-avatar': { rounded: 'lg', border: true, elevation: 2 },
        'origam-blockquote': {
            variant: 'default', rounded: 'lg', border: true, elevation: 3,
            accentColor: 'primary'
        }
    },
    // Overrides bruts glassmorphism non exprimables en props (bordures translucides,
    // backdrop-filter, ombres douces à reflets internes). Migrés depuis glass.css →
    // appliqués par le DS via `[data-theme="glass"]` (sous-arbre-capable).
    //
    // ⛔ Chaque nom de var ci-dessous a été vérifié en lisant le `<style>` réel
    // du composant DS (`packages/ds/src/components/**`) — pas de var inventée.
    // Les effets demandés par SYNTHESE §4 qui n'ont AUCUN hook CSS réel dans le
    // composant sont listés en commentaire "DS GAP" (non appliqués) plutôt que
    // simulés avec un nom de var qui ne serait lu par rien — voir la PR.
    cssVars: {
        '--origam-btn---border-color': 'rgba(124, 58, 237, 0.35)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.12), 0 10px 30px -12px rgba(60, 30, 120, 0.40)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---backdrop-filter-ghost': 'blur(12px) saturate(1.8) brightness(1.05)',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '16px',
        '--origam-card---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-sheet---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-appbar---backdrop-filter': 'saturate(2) brightness(1.1) blur(26px)',
        '--origam-menu---backdrop-filter': 'blur(20px) saturate(1.8) brightness(1.05)',
        '--origam-appbar---bg': 'rgba(255, 255, 255, 0.30)',
        '--origam-menu---background': 'rgba(255, 255, 255, 0.80)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '16px',
        '--origam-menu---box-shadow': '0 8px 32px -8px rgba(124, 58, 237, 0.18), 0 1px 4px -1px rgba(124, 58, 237, 0.10), 0 0 0 1px var(--origam-color__border---default), inset 0 1px 0 rgba(255, 255, 255, 0.60)',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        // Respiration items (SYNTHESE §1.5/§4) — `nav:true` (posé en props sur
        // origam-menu/origam-list) applique déjà `margin-block-end:4px` via son
        // propre modificateur ; seul le radius d'item reste à fixer ici.
        '--origam-list-item---border-radius': '11px',
        // Tint hover/actif (SYNTHESE §4) — le "fill" de l'item est un overlay
        // `currentColor` dont seule l'opacité varie par état (.08 hover-link /
        // .12 actif / .16 actif+hover) ; on route sa COULEUR sur l'accent pour
        // obtenir un tint violet au lieu d'un tint "texte" par défaut. Couple
        // actif partiel : la teinte de fond est bien accent, mais aucun hook
        // CSS dédié n'existe pour forcer le texte en accent-ink par item actif
        // (résolution de la couleur se fait par prop JS, pas par cssVar) — DS GAP.
        '--origam-list-item__overlay---background-color': '#7c3aed',
        '--origam-list-item---border-color': 'var(--origam-color__border---default)',

        '--origam-alert---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-alert---background-color': 'rgba(255, 255, 255, 0.18)',
        '--origam-alert---border-color': 'rgba(124, 58, 237, 0.20)',

        // ── Chip (fix source #3) — `variant:'tonal'` retiré des props
        // (IChipProps n'a pas de `variant`, confirmé dead) ; la translucidité
        // qu'il était censé porter passe ici, sur les vraies vars du composant.
        '--origam-chip---background-color': 'rgba(255, 255, 255, 0.22)',
        '--origam-chip---border-color': 'rgba(124, 58, 237, 0.35)',

        // ── Snackbar (SYNTHESE §4) — plus opaque que l'alert (flotte au-dessus
        // du contenu). DS GAP : OrigamSnackbarItem.vue n'expose AUCUN
        // `backdrop-filter` (ni var, ni déclaration fixe) — impossible d'y
        // appliquer le flou sans toucher le composant DS. background-color/
        // border-color/color restent applicables.
        '--origam-snackbar-item---background-color': 'rgba(255, 255, 255, 0.55)',
        '--origam-snackbar-item---border-color': 'rgba(124, 58, 237, 0.24)',
        '--origam-snackbar-item---color': 'var(--origam-color__text---primary)',

        // ── Badge (SYNTHESE §4) — remplissage feedback plein conservé (classes
        // `--warning/--success/--info/--error` inchangées, lisent déjà
        // `vars.color.feedback`) ; le badge NEUTRE (sans intent) reçoit un
        // fill accent + rim clair, pas de translucidité (surface trop petite
        // pour lire un flou).
        // ⛔ BUG TROUVÉ EN VÉRIFICATION RUNTIME (Playwright) : `background-color`
        // (SCSS ligne consommatrice, `OrigamBadge.vue`) N'ACCEPTE PAS de
        // gradient — une valeur `linear-gradient(...)` y est CSS invalide et
        // rejetée silencieusement (aucun fallback dans `var(...)`), rendant le
        // badge transparent. Confirmé par capture computed-style AVANT/APRÈS.
        // Corrigé en couleur pleine unie ; le "dégradé spéculaire" demandé par
        // la spec n'est pas atteignable sans passer par `background-image`/
        // `background` (propriété non consommée par le composant) — DS GAP.
        '--origam-badge__badge---background-color': '#7c3aed',
        '--origam-badge__badge---border-color': 'rgba(255, 255, 255, 0.55)',
        '--origam-badge__badge---color': '#ffffff',

        // ── Progress (SYNTHESE §4) — piste translucide + barre accent. Le
        // "glow" spéculaire du pouce/barre n'a pas de hook box-shadow exposé
        // par OrigamProgressLinear/Circular — DS GAP, non appliqué.
        '--origam-progress-linear__background---color': '#7c3aed',
        '--origam-progress-linear__background---opacity': '0.14',
        '--origam-progress-linear__loader---color': '#7c3aed',
        '--origam-progress-circular__underlay---color': '#7c3aed',
        '--origam-progress-circular__underlay---opacity': '0.14',
        '--origam-progress-circular__overlay---color': '#7c3aed',

        // ── Switch (SYNTHESE §4) — puits translucide (OFF) + thumb perle. Le
        // fill bombé accent au ON vient de la prop `color:'primary'` posée sur
        // `origam-switch` (IColorProps, résolution JS — pas de cssVar requise).
        // Aucun hook box-shadow (glow/puits creux) exposé par
        // OrigamSwitchTrack/OrigamSwitch — DS GAP, non appliqué.
        '--origam-switch__track---background-color': 'rgba(255, 255, 255, 0.35)',
        '--origam-switch__thumb---background-color': '#ffffff',
        '--origam-switch__thumb---border-color': 'rgba(124, 58, 237, 0.35)',

        // ── Champs (SYNTHESE §4) — contour ≥0.55 au repos (le fix source #2
        // porte le contour ≥0.8 pour les CONTRÔLES VIDES ; ici on route le
        // champ sur ce même token fixé au lieu du fallback `currentColor` par
        // défaut). DS GAP : ni `--origam-field---backdrop-filter` ni
        // `--origam-field--focus---box-shadow` n'existent comme var lue par
        // OrigamField.vue (le flou de champ et l'anneau de focus demandés par
        // la spec ne sont donc pas applicables sans toucher le composant DS).
        '--origam-field---background-color': 'rgba(255, 255, 255, 0.30)',
        '--origam-field---border-color': 'var(--origam-color__border---default)',

        // ── Dialog / scrim (SYNTHESE §4) — le "scrim flouté" demandé n'a pas
        // de hook `backdrop-filter` sur OrigamOverlayScrim.vue (confirmé :
        // background-color/opacity/pointer-events/transition uniquement) —
        // DS GAP, le flou n'est pas applicable. La teinte de fond l'est.
        '--origam-overlay-scrim---background-color': 'rgba(20, 14, 48, 0.35)',

        // ── Table (SYNTHESE §4) ──────────────────────────────────────────
        '--origam-table---background-color': 'rgba(255, 255, 255, 0.30)',
        '--origam-table__header-cell---background-color': 'rgba(124, 58, 237, 0.08)',
        '--origam-table__row---hover-background-color': 'rgba(124, 58, 237, 0.10)',
        '--origam-table__cell---border-color': 'rgba(124, 58, 237, 0.12)',
        '--origam-table__header-cell---border-bottom-color': 'rgba(124, 58, 237, 0.20)',

        // ── Code (SYNTHESE §4) — en-tête translucide + surlignage tint accent.
        // DS GAP : les couleurs de syntaxe (kw/str/fn/cmt) viennent de shiki
        // (`--shiki-light`/`--shiki-dark`), PAS de vars `--origam-code---*` —
        // aucun token origam par-catégorie n'existe, donc rien à écraser ici
        // sans reconfigurer le thème shiki (hors périmètre d'un thème marketing).
        '--origam-code__header---background-color': 'rgba(255, 255, 255, 0.40)',
        '--origam-code__header---color': 'var(--origam-color__text---secondary)',
        '--origam-code__line-highlight---background-color': 'rgba(124, 58, 237, 0.10)',
        '--origam-code__line-highlight---accent-color': '#7c3aed',

        // ── Avatar (SYNTHESE §4) — perle de verre (initiales/icône) + anneau.
        '--origam-avatar---background-color': 'rgba(255, 255, 255, 0.40)',
        '--origam-avatar---border-color': 'rgba(255, 255, 255, 0.55)',

        // ── Divider — DS GAP : OrigamDivider.vue n'expose qu'un `border-*-width`
        // (pas de `background`/`background-color`), le dégradé demandé par la
        // spec (`linear-gradient(90deg, transparent, accent, transparent)`) est
        // donc IMPOSSIBLE via cssVars sans modifier le composant DS. Non appliqué.

        // ── Pagination (SYNTHESE §4) — page courante = fill accent + on-color
        // (couple actif). `rounded` n'existe pas comme prop (voir `components`
        // ci-dessus) ; le radius passe ici, en cssVar réelle.
        '--origam-pagination---border-radius': '12px',
        '--origam-pagination__item--is-active---background-color': '#7c3aed',
        '--origam-pagination__item--is-active---color': '#ffffff',
        '--origam-pagination__item--is-active---border-color': 'transparent',

        // ── Tooltip (SYNTHESE §3/§4) — seul hook exposé par OrigamTooltip.vue.
        // Pas de `border`/`box-shadow`/`backdrop-filter` — DS GAP (voir la note
        // dans `components` ci-dessus). Le "sans caret" est acquis par défaut.
        '--origam-tooltip---border-radius': '10px',
        '--origam-tooltip---background-color': 'rgba(26, 21, 56, 0.90)',
        '--origam-tooltip---color': '#ffffff'
    }
}

export const glassDarkTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'dark',
    vars: {
        rounded: {
            card: '22px',
            btn: '999px',
            pill: '999px',
            sm: '16px',
            md: '22px',
            lg: '30px'
        },
        color: {
            surface: {
                default: '#07060f',
                raised: 'rgba(255, 255, 255, 0.05)',
                sunken: 'rgba(255, 255, 255, 0.04)',
                overlay: 'rgba(255, 255, 255, 0.04)',
                disabled: 'rgba(107, 95, 175, 0.20)'
            },
            text: {
                primary: '#ffffff',
                secondary: '#e4deff',
                tertiary: '#cfc4f5',
                disabled: '#6b5faf',
                inverse: '#07060f',
                onColor: '#07060f',
                ink: '#ffffff'
            },
            action: {
                primary: {
                    bg: 'rgba(255, 255, 255, 0.08)',
                    bgHover: 'rgba(255, 255, 255, 0.14)',
                    bgSubtle: 'rgba(167, 139, 250, 0.14)',
                    bgDisabled: 'rgba(107, 95, 175, 0.20)',
                    fg: '#ffffff',
                    fgSubtle: '#ddd6fe',
                    fgDisabled: '#6b5faf'
                },
                secondary: {
                    bg: 'rgba(255, 255, 255, 0.05)',
                    bgHover: 'rgba(255, 255, 255, 0.10)',
                    bgDisabled: 'rgba(255, 255, 255, 0.02)',
                    fg: '#ffffff',
                    fgDisabled: '#6b5faf'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(167, 139, 250, 0.10)',
                    bgDisabled: 'transparent',
                    fg: '#ddd6fe',
                    fgDisabled: '#6b5faf'
                }
            },
            border: {
                // Fix source #2 (SYNTHESE glass §5.2): dark contour needs
                // white ≥0.35 opacity (3.10:1) — 0.12 was near-invisible.
                default: 'rgba(255, 255, 255, 0.35)',
                subtle: 'rgba(255, 255, 255, 0.06)',
                strong: 'rgba(255, 255, 255, 0.20)',
                focus: '#a78bfa',
                'subtle-alpha': 'rgba(255, 255, 255, 0.08)',
                ghost: 'rgba(255, 255, 255, 0.08)'
            },
            feedback: {
                success: {
                    bg: '#6ee7b7',
                    bgSubtle: 'rgba(110, 231, 183, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#6ee7b7',
                    border: '#6ee7b7'
                },
                warning: {
                    bg: '#fcd34d',
                    bgSubtle: 'rgba(252, 211, 77, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#fcd34d',
                    border: '#fcd34d'
                },
                danger: {
                    bg: '#fca5a5',
                    bgSubtle: 'rgba(252, 165, 165, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#fca5a5',
                    border: '#fca5a5'
                },
                info: {
                    bg: '#7dd3fc',
                    bgSubtle: 'rgba(125, 211, 252, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#7dd3fc',
                    border: '#7dd3fc'
                }
            },
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'rgba(255, 255, 255, 0.08)',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#ffffff'
        },
        // ELEVATION (dark) : même rampe glassmorphism, reflets blancs atténués sur fond
        // sombre + ombres portées profondes. Consommée via la prop `elevation`.
        shadow: {
            none: 'none',
            xs: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 4px -1px rgba(0, 0, 0, 0.25)',
            sm: 'inset 0 1px 1px rgba(255, 255, 255, 0.18), inset 1px 0 1px rgba(255, 255, 255, 0.10), 0 4px 12px -4px rgba(0, 0, 0, 0.35)',
            md: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 1.5px 0 1px rgba(255, 255, 255, 0.14), inset 0 -1px 1px rgba(0, 0, 0, 0.10), 0 8px 24px -8px rgba(0, 0, 0, 0.45)',
            lg: 'inset 0 1px 1px rgba(255, 255, 255, 0.60), inset 1.5px 0 1px rgba(255, 255, 255, 0.28), inset -1.5px 0 1px rgba(255, 255, 255, 0.14), inset 0 -10px 22px rgba(255, 255, 255, 0.05), inset 0 -1px 1px rgba(0, 0, 0, 0.20), 0 12px 34px -10px rgba(0, 0, 0, 0.50), 0 2px 6px -2px rgba(0, 0, 0, 0.30)',
            xl: 'inset 0 1px 1px rgba(255, 255, 255, 0.70), inset 1.5px 0 1px rgba(255, 255, 255, 0.35), inset -1.5px 0 1px rgba(255, 255, 255, 0.20), inset 0 -10px 22px rgba(255, 255, 255, 0.06), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 16px 48px -12px rgba(0, 0, 0, 0.65), 0 4px 10px -4px rgba(0, 0, 0, 0.40)'
        }
    },
    cssVars: {
        '--origam-btn---border-color': 'rgba(255, 255, 255, 0.20)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'inset 0 1px 1px rgba(255, 255, 255, 0.60), inset 1.5px 0 1px rgba(255, 255, 255, 0.28), inset 0 -1px 1px rgba(0, 0, 0, 0.20), 0 8px 24px -6px rgba(167, 139, 250, 0.60)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---backdrop-filter-ghost': 'blur(12px) saturate(1.6) brightness(1.02)',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '16px',
        '--origam-card---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-sheet---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-appbar---backdrop-filter': 'saturate(2) brightness(1.1) blur(26px)',
        '--origam-menu---backdrop-filter': 'blur(20px) saturate(1.6) brightness(1.02)',
        '--origam-appbar---bg': 'rgba(255, 255, 255, 0.06)',
        '--origam-menu---background': 'rgba(20, 18, 40, 0.85)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '22px',
        '--origam-menu---box-shadow': '0 8px 32px -8px rgba(0, 0, 0, 0.60), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-list-item---border-radius': '11px',
        // Dark = verre teinté sombre (SYNTHESE §1.3), pas blanc — l'overlay actif
        // reste sur l'accent clair `#a78bfa` (7.4:1 sur fond sombre, cf. §1.2 fill
        // accent bombé) plutôt que sur `#7c3aed` (trop sombre pour un tint dark).
        '--origam-list-item__overlay---background-color': '#a78bfa',
        '--origam-list-item---border-color': 'var(--origam-color__border---default)',

        '--origam-alert---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-alert---background-color': 'rgba(255, 255, 255, 0.06)',
        '--origam-alert---border-color': 'rgba(255, 255, 255, 0.12)',

        '--origam-chip---background-color': 'rgba(255, 255, 255, 0.08)',
        '--origam-chip---border-color': 'rgba(255, 255, 255, 0.20)',

        '--origam-snackbar-item---background-color': 'rgba(24, 22, 44, 0.78)',
        '--origam-snackbar-item---border-color': 'rgba(255, 255, 255, 0.16)',
        '--origam-snackbar-item---color': 'var(--origam-color__text---primary)',

        // Voir le commentaire "BUG TROUVÉ EN VÉRIFICATION RUNTIME" côté light —
        // même correction (solide, pas de gradient sur `background-color`).
        '--origam-badge__badge---background-color': '#a78bfa',
        '--origam-badge__badge---border-color': 'rgba(255, 255, 255, 0.30)',
        '--origam-badge__badge---color': '#07060f',

        '--origam-progress-linear__background---color': '#ffffff',
        '--origam-progress-linear__background---opacity': '0.10',
        '--origam-progress-linear__loader---color': '#a78bfa',
        '--origam-progress-circular__underlay---color': '#ffffff',
        '--origam-progress-circular__underlay---opacity': '0.10',
        '--origam-progress-circular__overlay---color': '#a78bfa',

        '--origam-switch__track---background-color': 'rgba(255, 255, 255, 0.10)',
        '--origam-switch__thumb---background-color': '#e4deff',
        '--origam-switch__thumb---border-color': 'rgba(255, 255, 255, 0.20)',

        '--origam-field---background-color': 'rgba(255, 255, 255, 0.06)',
        '--origam-field---border-color': 'var(--origam-color__border---default)',

        '--origam-overlay-scrim---background-color': 'rgba(4, 3, 12, 0.55)',

        '--origam-table---background-color': 'rgba(255, 255, 255, 0.05)',
        '--origam-table__header-cell---background-color': 'rgba(167, 139, 250, 0.10)',
        '--origam-table__row---hover-background-color': 'rgba(167, 139, 250, 0.12)',
        '--origam-table__cell---border-color': 'rgba(255, 255, 255, 0.10)',
        '--origam-table__header-cell---border-bottom-color': 'rgba(255, 255, 255, 0.16)',

        '--origam-code__header---background-color': 'rgba(255, 255, 255, 0.06)',
        '--origam-code__header---color': 'var(--origam-color__text---secondary)',
        '--origam-code__line-highlight---background-color': 'rgba(167, 139, 250, 0.14)',
        '--origam-code__line-highlight---accent-color': '#a78bfa',

        '--origam-avatar---background-color': 'rgba(255, 255, 255, 0.08)',
        '--origam-avatar---border-color': 'rgba(255, 255, 255, 0.24)',

        '--origam-pagination---border-radius': '12px',
        '--origam-pagination__item--is-active---background-color': '#a78bfa',
        '--origam-pagination__item--is-active---color': '#07060f',
        '--origam-pagination__item--is-active---border-color': 'transparent',

        '--origam-tooltip---border-radius': '10px',
        '--origam-tooltip---background-color': 'rgba(255, 255, 255, 0.12)',
        '--origam-tooltip---color': '#ffffff'
    }
}

export const glassThemes: IOrigamTheme[] = [glassLightTheme, glassDarkTheme]
