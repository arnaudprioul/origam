/**
 * COMPONENTS_CATALOG — source de vérité du catalogue /components.
 *
 * RÈGLES :
 * - Un entry par dossier DS (slug = kebab-case du nom du dossier).
 * - Les familles multi-.vue (>1 composant dans le dossier) déclarent
 *   un tableau `family` ; l'entrée de la famille principale est celle
 *   dont le nom correspond au dossier (ex. "Btn" pour Btn/).
 * - Les sous-composants NE sont PAS des entrées distinctes dans ce
 *   tableau : ils sont référencés via `family[]` de leur parent et
 *   disposent d'un fichier consts/components/{slug}.const.ts propre.
 * - `descriptionKey` → namespace `components.catalog.{slug}.description`
 *   (toutes les clés sont en snake_case, conformes au skill i18n-keys).
 * - `icon` = MDI icon pour les catalog cards.
 *
 * Taxonomie dérivée de packages/docs/.vitepress/config.ts (COMPONENT_CATEGORIES).
 */
import type { IComponentEntry } from '~/interfaces/components-catalog.interface'

export const COMPONENTS_CATEGORIES = [
    'Layout & Structure',
    'Navigation',
    'Form & Input',
    'Data Display',
    'Feedback & Status',
    'Overlay & Surface',
    'Media',
    'Utilities & Providers'
] as const

export type TComponentCategory = typeof COMPONENTS_CATEGORIES[number]

export const COMPONENTS_CATALOG: IComponentEntry[] = [
    // ─────────────────────────────────────────────
    // Layout & Structure
    // ─────────────────────────────────────────────
    {
        slug: 'app',
        name: 'App',
        icon: 'mdi-application-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.app.description',
        descriptionFallback: 'Root application shell with AppBar support.',
        family: [
            {
                slug: 'app-bar',
                name: 'AppBar',
                descriptionKey: 'components.catalog.app_bar.description',
                descriptionFallback: 'Top application bar with title, actions and nav slot.'
            }
        ]
    },
    {
        slug: 'app-bar',
        name: 'AppBar',
        icon: 'mdi-page-layout-header',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.app_bar.description',
        descriptionFallback: 'Top application bar with title, actions and nav slot.',
        parentSlug: 'app',
        family: []
    },
    {
        slug: 'card',
        name: 'Card',
        icon: 'mdi-card-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.card.description',
        descriptionFallback: 'Flexible surface container with header, content and action slots.',
        family: [
            {
                slug: 'card-header',
                name: 'CardHeader',
                descriptionKey: 'components.catalog.card_header.description',
                descriptionFallback: 'Card header with prepend/title/subtitle/append layout.'
            },
            {
                slug: 'card-text',
                name: 'CardText',
                descriptionKey: 'components.catalog.card_text.description',
                descriptionFallback: 'Padded text content area inside a card.'
            }
        ]
    },
    {
        slug: 'card-header',
        name: 'CardHeader',
        icon: 'mdi-card-text-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.card_header.description',
        descriptionFallback: 'Card header with prepend/title/subtitle/append layout.',
        parentSlug: 'card',
        family: []
    },
    {
        slug: 'card-text',
        name: 'CardText',
        icon: 'mdi-card-text-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.card_text.description',
        descriptionFallback: 'Padded text content area inside a card.',
        parentSlug: 'card',
        family: []
    },
    {
        slug: 'divider',
        name: 'Divider',
        icon: 'mdi-minus',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.divider.description',
        descriptionFallback: 'Horizontal or vertical visual separator.',
        family: []
    },
    {
        slug: 'expansion-panel',
        name: 'ExpansionPanel',
        icon: 'mdi-chevron-down-box-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.expansion_panel.description',
        descriptionFallback: 'Collapsible accordion panel with header and content slots.',
        family: [
            {
                slug: 'expansion-panels',
                name: 'ExpansionPanels',
                descriptionKey: 'components.catalog.expansion_panels.description',
                descriptionFallback: 'Container for one or more ExpansionPanel items.'
            },
            {
                slug: 'expansion-panel-header',
                name: 'ExpansionPanelHeader',
                descriptionKey: 'components.catalog.expansion_panel_header.description',
                descriptionFallback: 'Header row of an ExpansionPanel with toggle action.'
            },
            {
                slug: 'expansion-panel-content',
                name: 'ExpansionPanelContent',
                descriptionKey: 'components.catalog.expansion_panel_content.description',
                descriptionFallback: 'Expandable body of an ExpansionPanel.'
            }
        ]
    },
    {
        slug: 'expansion-panels',
        name: 'ExpansionPanels',
        icon: 'mdi-view-list-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.expansion_panels.description',
        descriptionFallback: 'Container for one or more ExpansionPanel items.',
        parentSlug: 'expansion-panel',
        family: []
    },
    {
        slug: 'expansion-panel-header',
        name: 'ExpansionPanelHeader',
        icon: 'mdi-chevron-down-box-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.expansion_panel_header.description',
        descriptionFallback: 'Header row of an ExpansionPanel with toggle action.',
        parentSlug: 'expansion-panel',
        family: []
    },
    {
        slug: 'expansion-panel-content',
        name: 'ExpansionPanelContent',
        icon: 'mdi-chevron-down-box-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.expansion_panel_content.description',
        descriptionFallback: 'Expandable body of an ExpansionPanel.',
        parentSlug: 'expansion-panel',
        family: []
    },
    {
        slug: 'grid',
        name: 'Grid',
        icon: 'mdi-view-grid-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.grid.description',
        descriptionFallback: 'CSS Grid wrapper with gap and columns props.',
        family: [
            {
                slug: 'grid-item',
                name: 'GridItem',
                descriptionKey: 'components.catalog.grid_item.description',
                descriptionFallback: 'Cell inside an OrigamGrid container.'
            }
        ]
    },
    {
        slug: 'grid-item',
        name: 'GridItem',
        icon: 'mdi-view-grid-plus-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.grid_item.description',
        descriptionFallback: 'Cell inside an OrigamGrid container.',
        parentSlug: 'grid',
        family: []
    },
    {
        slug: 'grids',
        name: 'Grids',
        icon: 'mdi-table-column',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.grids.description',
        descriptionFallback: 'Bootstrap-style 12-column grid system (Container, Row, Col, Spacer).',
        family: [
            {
                slug: 'container',
                name: 'Container',
                descriptionKey: 'components.catalog.container.description',
                descriptionFallback: 'Max-width constrained layout container.'
            },
            {
                slug: 'row',
                name: 'Row',
                descriptionKey: 'components.catalog.row.description',
                descriptionFallback: 'Flex row inside a Container.'
            },
            {
                slug: 'col',
                name: 'Col',
                descriptionKey: 'components.catalog.col.description',
                descriptionFallback: 'Responsive column with span and offset props.'
            },
            {
                slug: 'spacer',
                name: 'Spacer',
                descriptionKey: 'components.catalog.spacer.description',
                descriptionFallback: 'Flex spacer that fills remaining row space.'
            }
        ]
    },
    {
        slug: 'container',
        name: 'Container',
        icon: 'mdi-view-compact-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.container.description',
        descriptionFallback: 'Max-width constrained layout container.',
        parentSlug: 'grids',
        family: []
    },
    {
        slug: 'row',
        name: 'Row',
        icon: 'mdi-table-row',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.row.description',
        descriptionFallback: 'Flex row inside a Container.',
        parentSlug: 'grids',
        family: []
    },
    {
        slug: 'col',
        name: 'Col',
        icon: 'mdi-table-column',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.col.description',
        descriptionFallback: 'Responsive column with span and offset props.',
        parentSlug: 'grids',
        family: []
    },
    {
        slug: 'spacer',
        name: 'Spacer',
        icon: 'mdi-arrow-expand-horizontal',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.spacer.description',
        descriptionFallback: 'Flex spacer that fills remaining row space.',
        parentSlug: 'grids',
        family: []
    },
    {
        slug: 'item-group',
        name: 'ItemGroup',
        icon: 'mdi-format-list-group',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.item_group.description',
        descriptionFallback: 'Manages single or multi selection across child items.',
        family: [
            {
                slug: 'item',
                name: 'Item',
                descriptionKey: 'components.catalog.item.description',
                descriptionFallback: 'Selectable item inside an ItemGroup.'
            }
        ]
    },
    {
        slug: 'item',
        name: 'Item',
        icon: 'mdi-checkbox-blank-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.item.description',
        descriptionFallback: 'Selectable item inside an ItemGroup.',
        parentSlug: 'item-group',
        family: []
    },
    {
        slug: 'layout',
        name: 'Layout',
        icon: 'mdi-page-layout-body',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.layout.description',
        descriptionFallback: 'Full-page layout orchestrator with named slot regions.',
        family: []
    },
    {
        slug: 'main',
        name: 'Main',
        icon: 'mdi-view-dashboard-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.main.description',
        descriptionFallback: 'Main content area inside a Layout.',
        family: []
    },
    {
        slug: 'masonry',
        name: 'Masonry',
        icon: 'mdi-view-quilt-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.masonry.description',
        descriptionFallback: 'Masonry-style column layout for variable-height items.',
        family: []
    },
    {
        slug: 'responsive',
        name: 'Responsive',
        icon: 'mdi-responsive',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.responsive.description',
        descriptionFallback: 'Renders slot content conditionally per active breakpoint.',
        family: []
    },
    {
        slug: 'section',
        name: 'Section',
        icon: 'mdi-card-outline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.section.description',
        descriptionFallback: 'Semantic section wrapper with optional heading.',
        family: []
    },
    {
        slug: 'system-bar',
        name: 'SystemBar',
        icon: 'mdi-view-headline',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.system_bar.description',
        descriptionFallback: 'Thin status bar displayed at the top of the layout.',
        family: []
    },
    {
        slug: 'toolbar',
        name: 'Toolbar',
        icon: 'mdi-toolbar',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.toolbar.description',
        descriptionFallback: 'Horizontal toolbar for grouping action buttons.',
        family: []
    },
    {
        slug: 'window',
        name: 'Window',
        icon: 'mdi-window-maximize',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.window.description',
        descriptionFallback: 'Animated slide-between panel container.',
        family: [
            {
                slug: 'window-item',
                name: 'WindowItem',
                descriptionKey: 'components.catalog.window_item.description',
                descriptionFallback: 'Individual slide panel inside a Window.'
            }
        ]
    },
    {
        slug: 'window-item',
        name: 'WindowItem',
        icon: 'mdi-window-restore',
        category: 'Layout & Structure',
        descriptionKey: 'components.catalog.window_item.description',
        descriptionFallback: 'Individual slide panel inside a Window.',
        parentSlug: 'window',
        family: []
    },

    // ─────────────────────────────────────────────
    // Navigation
    // ─────────────────────────────────────────────
    {
        slug: 'bottom-nav',
        name: 'BottomNav',
        icon: 'mdi-navigation-variant-outline',
        category: 'Navigation',
        descriptionKey: 'components.catalog.bottom_nav.description',
        descriptionFallback: 'Mobile bottom navigation bar with icon + label items.',
        family: []
    },
    {
        slug: 'bracket',
        name: 'Bracket',
        icon: 'mdi-tournament',
        category: 'Navigation',
        descriptionKey: 'components.catalog.bracket.description',
        descriptionFallback: 'Tournament bracket visualization with rounds and matches.',
        family: [
            {
                slug: 'bracket-round',
                name: 'BracketRound',
                descriptionKey: 'components.catalog.bracket_round.description',
                descriptionFallback: 'One round column inside a Bracket.'
            },
            {
                slug: 'bracket-match',
                name: 'BracketMatch',
                descriptionKey: 'components.catalog.bracket_match.description',
                descriptionFallback: 'One match cell inside a BracketRound.'
            },
            {
                slug: 'bracket-competitor',
                name: 'BracketCompetitor',
                descriptionKey: 'components.catalog.bracket_competitor.description',
                descriptionFallback: 'Competitor row inside a BracketMatch.'
            }
        ]
    },
    {
        slug: 'bracket-round',
        name: 'BracketRound',
        icon: 'mdi-tournament',
        category: 'Navigation',
        descriptionKey: 'components.catalog.bracket_round.description',
        descriptionFallback: 'One round column inside a Bracket.',
        parentSlug: 'bracket',
        family: []
    },
    {
        slug: 'bracket-match',
        name: 'BracketMatch',
        icon: 'mdi-tournament',
        category: 'Navigation',
        descriptionKey: 'components.catalog.bracket_match.description',
        descriptionFallback: 'One match cell inside a BracketRound.',
        parentSlug: 'bracket',
        family: []
    },
    {
        slug: 'bracket-competitor',
        name: 'BracketCompetitor',
        icon: 'mdi-tournament',
        category: 'Navigation',
        descriptionKey: 'components.catalog.bracket_competitor.description',
        descriptionFallback: 'Competitor row inside a BracketMatch.',
        parentSlug: 'bracket',
        family: []
    },
    {
        slug: 'breadcrumb',
        name: 'Breadcrumb',
        icon: 'mdi-chevron-right',
        category: 'Navigation',
        descriptionKey: 'components.catalog.breadcrumb.description',
        descriptionFallback: 'Hierarchical path breadcrumb with custom divider.',
        family: [
            {
                slug: 'breadcrumb-item',
                name: 'BreadcrumbItem',
                descriptionKey: 'components.catalog.breadcrumb_item.description',
                descriptionFallback: 'One link item inside a Breadcrumb.'
            },
            {
                slug: 'breadcrumb-divider',
                name: 'BreadcrumbDivider',
                descriptionKey: 'components.catalog.breadcrumb_divider.description',
                descriptionFallback: 'Separator between BreadcrumbItem elements.'
            }
        ]
    },
    {
        slug: 'breadcrumb-item',
        name: 'BreadcrumbItem',
        icon: 'mdi-chevron-right',
        category: 'Navigation',
        descriptionKey: 'components.catalog.breadcrumb_item.description',
        descriptionFallback: 'One link item inside a Breadcrumb.',
        parentSlug: 'breadcrumb',
        family: []
    },
    {
        slug: 'breadcrumb-divider',
        name: 'BreadcrumbDivider',
        icon: 'mdi-chevron-right',
        category: 'Navigation',
        descriptionKey: 'components.catalog.breadcrumb_divider.description',
        descriptionFallback: 'Separator between BreadcrumbItem elements.',
        parentSlug: 'breadcrumb',
        family: []
    },
    {
        slug: 'command-palette',
        name: 'CommandPalette',
        icon: 'mdi-magnify',
        category: 'Navigation',
        descriptionKey: 'components.catalog.command_palette.description',
        descriptionFallback: 'Keyboard-first command search palette overlay.',
        family: []
    },
    {
        slug: 'contextual-menu',
        name: 'ContextualMenu',
        icon: 'mdi-menu',
        category: 'Navigation',
        descriptionKey: 'components.catalog.contextual_menu.description',
        descriptionFallback: 'Right-click or long-press context menu.',
        family: []
    },
    {
        slug: 'menu',
        name: 'Menu',
        icon: 'mdi-menu-open',
        category: 'Navigation',
        descriptionKey: 'components.catalog.menu.description',
        descriptionFallback: 'Floating dropdown menu anchored to an activator.',
        family: []
    },
    {
        slug: 'pagination',
        name: 'Pagination',
        icon: 'mdi-dots-horizontal',
        category: 'Navigation',
        descriptionKey: 'components.catalog.pagination.description',
        descriptionFallback: 'Page-number navigation with prev/next controls.',
        family: []
    },
    {
        slug: 'stepper',
        name: 'Stepper',
        icon: 'mdi-stairs',
        category: 'Navigation',
        descriptionKey: 'components.catalog.stepper.description',
        descriptionFallback: 'Multi-step wizard with progress indicators.',
        family: [
            {
                slug: 'stepper-item',
                name: 'StepperItem',
                descriptionKey: 'components.catalog.stepper_item.description',
                descriptionFallback: 'One step in a Stepper component.'
            }
        ]
    },
    {
        slug: 'stepper-item',
        name: 'StepperItem',
        icon: 'mdi-stairs',
        category: 'Navigation',
        descriptionKey: 'components.catalog.stepper_item.description',
        descriptionFallback: 'One step in a Stepper component.',
        parentSlug: 'stepper',
        family: []
    },
    {
        slug: 'tabs',
        name: 'Tabs',
        icon: 'mdi-tab',
        category: 'Navigation',
        descriptionKey: 'components.catalog.tabs.description',
        descriptionFallback: 'Tabbed navigation with underline, pill or flat variants.',
        family: [
            {
                slug: 'tab',
                name: 'Tab',
                descriptionKey: 'components.catalog.tab.description',
                descriptionFallback: 'Individual tab button inside a Tabs bar.'
            },
            {
                slug: 'tab-panels',
                name: 'TabPanels',
                descriptionKey: 'components.catalog.tab_panels.description',
                descriptionFallback: 'Container for tab panel content areas.'
            },
            {
                slug: 'tab-panel',
                name: 'TabPanel',
                descriptionKey: 'components.catalog.tab_panel.description',
                descriptionFallback: 'Content panel associated with one Tab.'
            }
        ]
    },
    {
        slug: 'tab',
        name: 'Tab',
        icon: 'mdi-tab',
        category: 'Navigation',
        descriptionKey: 'components.catalog.tab.description',
        descriptionFallback: 'Individual tab button inside a Tabs bar.',
        parentSlug: 'tabs',
        family: []
    },
    {
        slug: 'tab-panels',
        name: 'TabPanels',
        icon: 'mdi-tab',
        category: 'Navigation',
        descriptionKey: 'components.catalog.tab_panels.description',
        descriptionFallback: 'Container for tab panel content areas.',
        parentSlug: 'tabs',
        family: []
    },
    {
        slug: 'tab-panel',
        name: 'TabPanel',
        icon: 'mdi-tab',
        category: 'Navigation',
        descriptionKey: 'components.catalog.tab_panel.description',
        descriptionFallback: 'Content panel associated with one Tab.',
        parentSlug: 'tabs',
        family: []
    },
    {
        slug: 'treeview',
        name: 'Treeview',
        icon: 'mdi-file-tree-outline',
        category: 'Navigation',
        descriptionKey: 'components.catalog.treeview.description',
        descriptionFallback: 'Hierarchical tree with expand/collapse and selection.',
        family: [
            {
                slug: 'treeview-node',
                name: 'TreeviewNode',
                descriptionKey: 'components.catalog.treeview_node.description',
                descriptionFallback: 'Individual node inside a Treeview.'
            }
        ]
    },
    {
        slug: 'treeview-node',
        name: 'TreeviewNode',
        icon: 'mdi-file-tree-outline',
        category: 'Navigation',
        descriptionKey: 'components.catalog.treeview_node.description',
        descriptionFallback: 'Individual node inside a Treeview.',
        parentSlug: 'treeview',
        family: []
    },

    // ─────────────────────────────────────────────
    // Form & Input
    // ─────────────────────────────────────────────
    {
        slug: 'btn',
        name: 'Btn',
        icon: 'mdi-gesture-tap-button',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.btn.description',
        descriptionFallback: 'Polymorphic action element with intent, variant, size and icon support.',
        family: [
            {
                slug: 'btn-group',
                name: 'BtnGroup',
                descriptionKey: 'components.catalog.btn_group.description',
                descriptionFallback: 'Groups Btn elements into a connected segmented control.'
            },
            {
                slug: 'btn-toggle',
                name: 'BtnToggle',
                descriptionKey: 'components.catalog.btn_toggle.description',
                descriptionFallback: 'Single or multi-select toggle group of Btn elements.'
            }
        ]
    },
    {
        slug: 'btn-group',
        name: 'BtnGroup',
        icon: 'mdi-gesture-tap-button',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.btn_group.description',
        descriptionFallback: 'Groups Btn elements into a connected segmented control.',
        parentSlug: 'btn',
        family: []
    },
    {
        slug: 'btn-toggle',
        name: 'BtnToggle',
        icon: 'mdi-toggle-switch-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.btn_toggle.description',
        descriptionFallback: 'Single or multi-select toggle group of Btn elements.',
        parentSlug: 'btn',
        family: []
    },
    {
        slug: 'checkbox',
        name: 'Checkbox',
        icon: 'mdi-checkbox-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.checkbox.description',
        descriptionFallback: 'Accessible checkbox with indeterminate state and label.',
        family: [
            {
                slug: 'checkbox-btn',
                name: 'CheckboxBtn',
                descriptionKey: 'components.catalog.checkbox_btn.description',
                descriptionFallback: 'Checkbox styled as a toggle button.'
            }
        ]
    },
    {
        slug: 'checkbox-btn',
        name: 'CheckboxBtn',
        icon: 'mdi-checkbox-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.checkbox_btn.description',
        descriptionFallback: 'Checkbox styled as a toggle button.',
        parentSlug: 'checkbox',
        family: []
    },
    {
        slug: 'color-picker',
        name: 'ColorPicker',
        icon: 'mdi-palette-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker.description',
        descriptionFallback: 'Full-featured color picker with canvas, swatches and hex/rgb editing.',
        family: [
            {
                slug: 'color-picker-canvas',
                name: 'ColorPickerCanvas',
                descriptionKey: 'components.catalog.color_picker_canvas.description',
                descriptionFallback: 'Gradient saturation/brightness canvas inside a ColorPicker.'
            },
            {
                slug: 'color-picker-edit',
                name: 'ColorPickerEdit',
                descriptionKey: 'components.catalog.color_picker_edit.description',
                descriptionFallback: 'Hex/RGB/HSL input fields inside a ColorPicker.'
            },
            {
                slug: 'color-picker-preview',
                name: 'ColorPickerPreview',
                descriptionKey: 'components.catalog.color_picker_preview.description',
                descriptionFallback: 'Before/after color preview swatch in a ColorPicker.'
            },
            {
                slug: 'color-picker-swatches',
                name: 'ColorPickerSwatches',
                descriptionKey: 'components.catalog.color_picker_swatches.description',
                descriptionFallback: 'Pre-defined color swatch grid in a ColorPicker.'
            }
        ]
    },
    {
        slug: 'color-picker-canvas',
        name: 'ColorPickerCanvas',
        icon: 'mdi-palette-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker_canvas.description',
        descriptionFallback: 'Gradient saturation/brightness canvas inside a ColorPicker.',
        parentSlug: 'color-picker',
        family: []
    },
    {
        slug: 'color-picker-edit',
        name: 'ColorPickerEdit',
        icon: 'mdi-palette-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker_edit.description',
        descriptionFallback: 'Hex/RGB/HSL input fields inside a ColorPicker.',
        parentSlug: 'color-picker',
        family: []
    },
    {
        slug: 'color-picker-preview',
        name: 'ColorPickerPreview',
        icon: 'mdi-palette-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker_preview.description',
        descriptionFallback: 'Before/after color preview swatch in a ColorPicker.',
        parentSlug: 'color-picker',
        family: []
    },
    {
        slug: 'color-picker-swatches',
        name: 'ColorPickerSwatches',
        icon: 'mdi-palette-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker_swatches.description',
        descriptionFallback: 'Pre-defined color swatch grid in a ColorPicker.',
        parentSlug: 'color-picker',
        family: []
    },
    {
        slug: 'color-picker-field',
        name: 'ColorPickerField',
        icon: 'mdi-eyedropper-variant',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.color_picker_field.description',
        descriptionFallback: 'Form field input that opens a ColorPicker in a popover.',
        family: []
    },
    {
        slug: 'date-picker',
        name: 'DatePicker',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker.description',
        descriptionFallback: 'Calendar date picker with month, year and range selection.',
        family: [
            {
                slug: 'date-picker-controls',
                name: 'DatePickerControls',
                descriptionKey: 'components.catalog.date_picker_controls.description',
                descriptionFallback: 'Prev/next navigation controls inside a DatePicker.'
            },
            {
                slug: 'date-picker-header',
                name: 'DatePickerHeader',
                descriptionKey: 'components.catalog.date_picker_header.description',
                descriptionFallback: 'Month/year title header inside a DatePicker.'
            },
            {
                slug: 'date-picker-month',
                name: 'DatePickerMonth',
                descriptionKey: 'components.catalog.date_picker_month.description',
                descriptionFallback: 'Day grid view for a single month in a DatePicker.'
            },
            {
                slug: 'date-picker-months',
                name: 'DatePickerMonths',
                descriptionKey: 'components.catalog.date_picker_months.description',
                descriptionFallback: 'Month grid selector view in a DatePicker.'
            },
            {
                slug: 'date-picker-years',
                name: 'DatePickerYears',
                descriptionKey: 'components.catalog.date_picker_years.description',
                descriptionFallback: 'Year list selector view in a DatePicker.'
            }
        ]
    },
    {
        slug: 'date-picker-controls',
        name: 'DatePickerControls',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_controls.description',
        descriptionFallback: 'Prev/next navigation controls inside a DatePicker.',
        parentSlug: 'date-picker',
        family: []
    },
    {
        slug: 'date-picker-header',
        name: 'DatePickerHeader',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_header.description',
        descriptionFallback: 'Month/year title header inside a DatePicker.',
        parentSlug: 'date-picker',
        family: []
    },
    {
        slug: 'date-picker-month',
        name: 'DatePickerMonth',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_month.description',
        descriptionFallback: 'Day grid view for a single month in a DatePicker.',
        parentSlug: 'date-picker',
        family: []
    },
    {
        slug: 'date-picker-months',
        name: 'DatePickerMonths',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_months.description',
        descriptionFallback: 'Month grid selector view in a DatePicker.',
        parentSlug: 'date-picker',
        family: []
    },
    {
        slug: 'date-picker-years',
        name: 'DatePickerYears',
        icon: 'mdi-calendar-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_years.description',
        descriptionFallback: 'Year list selector view in a DatePicker.',
        parentSlug: 'date-picker',
        family: []
    },
    {
        slug: 'date-picker-field',
        name: 'DatePickerField',
        icon: 'mdi-calendar-edit-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.date_picker_field.description',
        descriptionFallback: 'Form field input that opens a DatePicker in a popover.',
        family: []
    },
    {
        slug: 'field',
        name: 'Field',
        icon: 'mdi-form-textbox',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.field.description',
        descriptionFallback: 'Base form field wrapper with label, error and hint slots.',
        family: []
    },
    {
        slug: 'file-field',
        name: 'FileField',
        icon: 'mdi-paperclip',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.file_field.description',
        descriptionFallback: 'File upload field with drag-and-drop and file list.',
        family: [
            {
                slug: 'file-field-drag-n-drop-item',
                name: 'FileFieldDragNDropItem',
                descriptionKey: 'components.catalog.file_field_drag_n_drop_item.description',
                descriptionFallback: 'Drop zone item inside a FileField.'
            },
            {
                slug: 'file-field-list-item',
                name: 'FileFieldListItem',
                descriptionKey: 'components.catalog.file_field_list_item.description',
                descriptionFallback: 'Listed file item inside a FileField.'
            }
        ]
    },
    {
        slug: 'file-field-drag-n-drop-item',
        name: 'FileFieldDragNDropItem',
        icon: 'mdi-paperclip',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.file_field_drag_n_drop_item.description',
        descriptionFallback: 'Drop zone item inside a FileField.',
        parentSlug: 'file-field',
        family: []
    },
    {
        slug: 'file-field-list-item',
        name: 'FileFieldListItem',
        icon: 'mdi-paperclip',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.file_field_list_item.description',
        descriptionFallback: 'Listed file item inside a FileField.',
        parentSlug: 'file-field',
        family: []
    },
    {
        slug: 'form',
        name: 'Form',
        icon: 'mdi-form-select',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.form.description',
        descriptionFallback: 'Form wrapper with native submit, validation and reset lifecycle.',
        family: []
    },
    {
        slug: 'inline-edit',
        name: 'InlineEdit',
        icon: 'mdi-pencil-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.inline_edit.description',
        descriptionFallback: 'Click-to-edit inline field with confirm/cancel actions.',
        family: []
    },
    {
        slug: 'input',
        name: 'Input',
        icon: 'mdi-keyboard-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.input.description',
        descriptionFallback: 'Low-level input primitive; extended by TextField, NumberField, etc.',
        family: []
    },
    {
        slug: 'number-field',
        name: 'NumberField',
        icon: 'mdi-numeric',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.number_field.description',
        descriptionFallback: 'Numeric input with step, min, max and spin buttons.',
        family: []
    },
    {
        slug: 'otp-input-field',
        name: 'OtpInputField',
        icon: 'mdi-lock-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.otp_input_field.description',
        descriptionFallback: 'One-time password input with auto-advance between cells.',
        family: []
    },
    {
        slug: 'password-field',
        name: 'PasswordField',
        icon: 'mdi-eye-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.password_field.description',
        descriptionFallback: 'Password input with show/hide toggle.',
        family: []
    },
    {
        slug: 'picker',
        name: 'Picker',
        icon: 'mdi-select-drag',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.picker.description',
        descriptionFallback: 'Generic picker surface used by DatePicker and ColorPicker.',
        family: [
            {
                slug: 'picker-title',
                name: 'PickerTitle',
                descriptionKey: 'components.catalog.picker_title.description',
                descriptionFallback: 'Title header slot inside a Picker.'
            }
        ]
    },
    {
        slug: 'picker-title',
        name: 'PickerTitle',
        icon: 'mdi-select-drag',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.picker_title.description',
        descriptionFallback: 'Title header slot inside a Picker.',
        parentSlug: 'picker',
        family: []
    },
    {
        slug: 'radio',
        name: 'Radio',
        icon: 'mdi-radiobox-marked',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.radio.description',
        descriptionFallback: 'Radio button with group and button-style variants.',
        family: [
            {
                slug: 'radio-btn',
                name: 'RadioBtn',
                descriptionKey: 'components.catalog.radio_btn.description',
                descriptionFallback: 'Radio input styled as a toggle button.'
            },
            {
                slug: 'radio-group',
                name: 'RadioGroup',
                descriptionKey: 'components.catalog.radio_group.description',
                descriptionFallback: 'Group container managing Radio/RadioBtn selection.'
            }
        ]
    },
    {
        slug: 'radio-btn',
        name: 'RadioBtn',
        icon: 'mdi-radiobox-marked',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.radio_btn.description',
        descriptionFallback: 'Radio input styled as a toggle button.',
        parentSlug: 'radio',
        family: []
    },
    {
        slug: 'radio-group',
        name: 'RadioGroup',
        icon: 'mdi-radiobox-marked',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.radio_group.description',
        descriptionFallback: 'Group container managing Radio/RadioBtn selection.',
        parentSlug: 'radio',
        family: []
    },
    {
        slug: 'rating-field',
        name: 'RatingField',
        icon: 'mdi-star-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.rating_field.description',
        descriptionFallback: 'Star rating input with half-star and custom icon support.',
        family: [
            {
                slug: 'rating-field-item',
                name: 'RatingFieldItem',
                descriptionKey: 'components.catalog.rating_field_item.description',
                descriptionFallback: 'Individual star item inside a RatingField.'
            }
        ]
    },
    {
        slug: 'rating-field-item',
        name: 'RatingFieldItem',
        icon: 'mdi-star-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.rating_field_item.description',
        descriptionFallback: 'Individual star item inside a RatingField.',
        parentSlug: 'rating-field',
        family: []
    },
    {
        slug: 'select',
        name: 'Select',
        icon: 'mdi-chevron-down-box-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.select.description',
        descriptionFallback: 'Dropdown select with search, multi-select and custom item slot.',
        family: []
    },
    {
        slug: 'selection-control',
        name: 'SelectionControl',
        icon: 'mdi-toggle-switch-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.selection_control.description',
        descriptionFallback: 'Low-level selectable control base for Checkbox, Radio and Switch.',
        family: [
            {
                slug: 'selection-control-group',
                name: 'SelectionControlGroup',
                descriptionKey: 'components.catalog.selection_control_group.description',
                descriptionFallback: 'Group wrapper managing SelectionControl selection state.'
            }
        ]
    },
    {
        slug: 'selection-control-group',
        name: 'SelectionControlGroup',
        icon: 'mdi-toggle-switch-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.selection_control_group.description',
        descriptionFallback: 'Group wrapper managing SelectionControl selection state.',
        parentSlug: 'selection-control',
        family: []
    },
    {
        slug: 'slider-field',
        name: 'SliderField',
        icon: 'mdi-tune-variant',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.slider_field.description',
        descriptionFallback: 'Range slider with thumb, track and tick marks.',
        family: [
            {
                slug: 'slider-field-track',
                name: 'SliderFieldTrack',
                descriptionKey: 'components.catalog.slider_field_track.description',
                descriptionFallback: 'Track element inside a SliderField.'
            }
        ]
    },
    {
        slug: 'slider-field-track',
        name: 'SliderFieldTrack',
        icon: 'mdi-tune-variant',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.slider_field_track.description',
        descriptionFallback: 'Track element inside a SliderField.',
        parentSlug: 'slider-field',
        family: []
    },
    {
        slug: 'switch',
        name: 'Switch',
        icon: 'mdi-toggle-switch-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.switch.description',
        descriptionFallback: 'Toggle switch with on/off label and loading state.',
        family: [
            {
                slug: 'switch-track',
                name: 'SwitchTrack',
                descriptionKey: 'components.catalog.switch_track.description',
                descriptionFallback: 'Visual track element of a Switch.'
            }
        ]
    },
    {
        slug: 'switch-track',
        name: 'SwitchTrack',
        icon: 'mdi-toggle-switch-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.switch_track.description',
        descriptionFallback: 'Visual track element of a Switch.',
        parentSlug: 'switch',
        family: []
    },
    {
        slug: 'text-field',
        name: 'TextField',
        icon: 'mdi-form-textbox',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.text_field.description',
        descriptionFallback: 'Standard text input field with label, validation and icon slots.',
        family: []
    },
    {
        slug: 'text-mask',
        name: 'TextMask',
        icon: 'mdi-form-textbox-password',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.text_mask.description',
        descriptionFallback: 'Text input with a configurable input mask (date, phone, etc.).',
        family: []
    },
    {
        slug: 'textarea-field',
        name: 'TextareaField',
        icon: 'mdi-text-box-outline',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.textarea_field.description',
        descriptionFallback: 'Multi-line textarea with auto-grow and rich-text toolbar.',
        family: [
            {
                slug: 'rich-toolbar',
                name: 'RichToolbar',
                descriptionKey: 'components.catalog.rich_toolbar.description',
                descriptionFallback: 'Formatting toolbar shown above a rich TextareaField.'
            }
        ]
    },
    {
        slug: 'rich-toolbar',
        name: 'RichToolbar',
        icon: 'mdi-format-bold',
        category: 'Form & Input',
        descriptionKey: 'components.catalog.rich_toolbar.description',
        descriptionFallback: 'Formatting toolbar shown above a rich TextareaField.',
        parentSlug: 'textarea-field',
        family: []
    },

    // ─────────────────────────────────────────────
    // Data Display
    // ─────────────────────────────────────────────
    {
        slug: 'avatar',
        name: 'Avatar',
        icon: 'mdi-account-circle-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.avatar.description',
        descriptionFallback: 'Circular image, initials or icon avatar with group stacking.',
        family: [
            {
                slug: 'avatar-group',
                name: 'AvatarGroup',
                descriptionKey: 'components.catalog.avatar_group.description',
                descriptionFallback: 'Stacked avatar group with overflow counter.'
            }
        ]
    },
    {
        slug: 'avatar-group',
        name: 'AvatarGroup',
        icon: 'mdi-account-group-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.avatar_group.description',
        descriptionFallback: 'Stacked avatar group with overflow counter.',
        parentSlug: 'avatar',
        family: []
    },
    {
        slug: 'badge',
        name: 'Badge',
        icon: 'mdi-bell-badge-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.badge.description',
        descriptionFallback: 'Floating notification count or status dot badge.',
        family: []
    },
    {
        slug: 'blockquote',
        name: 'Blockquote',
        icon: 'mdi-format-quote-close',
        category: 'Data Display',
        descriptionKey: 'components.catalog.blockquote.description',
        descriptionFallback: 'Styled blockquote with optional citation and accent bar.',
        family: []
    },
    {
        slug: 'calendar',
        name: 'Calendar',
        icon: 'mdi-calendar-month-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.calendar.description',
        descriptionFallback: 'Event calendar with month, week and day views.',
        family: []
    },
    {
        slug: 'chart',
        name: 'Chart',
        icon: 'mdi-chart-line',
        category: 'Data Display',
        descriptionKey: 'components.catalog.chart.description',
        descriptionFallback: 'Comprehensive chart suite: cartesian, polar, specialized and map charts.',
        family: [
            { slug: 'chart-axis', name: 'ChartAxis', descriptionKey: 'components.catalog.chart_axis.description', descriptionFallback: 'Axis component inside a cartesian chart.' },
            { slug: 'chart-box-plot', name: 'ChartBoxPlot', descriptionKey: 'components.catalog.chart_box_plot.description', descriptionFallback: 'Box-and-whisker plot chart.' },
            { slug: 'chart-bullet', name: 'ChartBullet', descriptionKey: 'components.catalog.chart_bullet.description', descriptionFallback: 'Bullet chart for KPI vs target comparison.' },
            { slug: 'chart-candlestick', name: 'ChartCandlestick', descriptionKey: 'components.catalog.chart_candlestick.description', descriptionFallback: 'OHLC candlestick chart.' },
            { slug: 'chart-cartesian', name: 'ChartCartesian', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Line, bar and area charts on a cartesian grid.' },
            { slug: 'chart-gauge', name: 'ChartGauge', descriptionKey: 'components.catalog.chart_gauge.description', descriptionFallback: 'Radial gauge chart.' },
            { slug: 'chart-heatmap', name: 'ChartHeatmap', descriptionKey: 'components.catalog.chart_heatmap.description', descriptionFallback: 'Grid heatmap with color-coded values.' },
            { slug: 'chart-honeycomb', name: 'ChartHoneycomb', descriptionKey: 'components.catalog.chart_honeycomb.description', descriptionFallback: 'Hexagonal grid chart.' },
            { slug: 'chart-legend', name: 'ChartLegend', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend component for charts.' },
            { slug: 'chart-map', name: 'ChartMap', descriptionKey: 'components.catalog.chart_map.description', descriptionFallback: 'Geographic map chart.' },
            { slug: 'chart-pareto', name: 'ChartPareto', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto combination chart.' },
            { slug: 'chart-pictorial', name: 'ChartPictorial', descriptionKey: 'components.catalog.chart_pictorial.description', descriptionFallback: 'Icon-based pictorial bar chart.' },
            { slug: 'chart-polar', name: 'ChartPolar', descriptionKey: 'components.catalog.chart_polar.description', descriptionFallback: 'Polar/radar chart.' },
            { slug: 'chart-polar-bar', name: 'ChartPolarBar', descriptionKey: 'components.catalog.chart_polar_bar.description', descriptionFallback: 'Polar bar/wind-rose chart.' }
        ]
    },
    { slug: 'chart-axis', name: 'ChartAxis', icon: 'mdi-chart-line', category: 'Data Display', descriptionKey: 'components.catalog.chart_axis.description', descriptionFallback: 'Axis component inside a cartesian chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-box-plot', name: 'ChartBoxPlot', icon: 'mdi-chart-box-outline', category: 'Data Display', descriptionKey: 'components.catalog.chart_box_plot.description', descriptionFallback: 'Box-and-whisker plot chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-bullet', name: 'ChartBullet', icon: 'mdi-chart-bar', category: 'Data Display', descriptionKey: 'components.catalog.chart_bullet.description', descriptionFallback: 'Bullet chart for KPI vs target comparison.', parentSlug: 'chart', family: [] },
    { slug: 'chart-candlestick', name: 'ChartCandlestick', icon: 'mdi-finance', category: 'Data Display', descriptionKey: 'components.catalog.chart_candlestick.description', descriptionFallback: 'OHLC candlestick chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-cartesian', name: 'ChartCartesian', icon: 'mdi-chart-areaspline', category: 'Data Display', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Line, bar and area charts on a cartesian grid.', parentSlug: 'chart', family: [] },
    { slug: 'chart-gauge', name: 'ChartGauge', icon: 'mdi-gauge', category: 'Data Display', descriptionKey: 'components.catalog.chart_gauge.description', descriptionFallback: 'Radial gauge chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-heatmap', name: 'ChartHeatmap', icon: 'mdi-grid', category: 'Data Display', descriptionKey: 'components.catalog.chart_heatmap.description', descriptionFallback: 'Grid heatmap with color-coded values.', parentSlug: 'chart', family: [] },
    { slug: 'chart-honeycomb', name: 'ChartHoneycomb', icon: 'mdi-hexagon-outline', category: 'Data Display', descriptionKey: 'components.catalog.chart_honeycomb.description', descriptionFallback: 'Hexagonal grid chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-legend', name: 'ChartLegend', icon: 'mdi-chart-line', category: 'Data Display', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend component for charts.', parentSlug: 'chart', family: [] },
    { slug: 'chart-map', name: 'ChartMap', icon: 'mdi-map-outline', category: 'Data Display', descriptionKey: 'components.catalog.chart_map.description', descriptionFallback: 'Geographic map chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-pareto', name: 'ChartPareto', icon: 'mdi-chart-bar', category: 'Data Display', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto combination chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-pictorial', name: 'ChartPictorial', icon: 'mdi-image-outline', category: 'Data Display', descriptionKey: 'components.catalog.chart_pictorial.description', descriptionFallback: 'Icon-based pictorial bar chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-polar', name: 'ChartPolar', icon: 'mdi-radar', category: 'Data Display', descriptionKey: 'components.catalog.chart_polar.description', descriptionFallback: 'Polar/radar chart.', parentSlug: 'chart', family: [] },
    { slug: 'chart-polar-bar', name: 'ChartPolarBar', icon: 'mdi-chart-donut', category: 'Data Display', descriptionKey: 'components.catalog.chart_polar_bar.description', descriptionFallback: 'Polar bar/wind-rose chart.', parentSlug: 'chart', family: [] },
    {
        slug: 'chip',
        name: 'Chip',
        icon: 'mdi-label-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.chip.description',
        descriptionFallback: 'Compact tag element with icon, close and group selection support.',
        family: [
            {
                slug: 'chip-group',
                name: 'ChipGroup',
                descriptionKey: 'components.catalog.chip_group.description',
                descriptionFallback: 'Container managing single or multi selection of chips.'
            }
        ]
    },
    {
        slug: 'chip-group',
        name: 'ChipGroup',
        icon: 'mdi-label-multiple-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.chip_group.description',
        descriptionFallback: 'Container managing single or multi selection of chips.',
        parentSlug: 'chip',
        family: []
    },
    {
        slug: 'clipboard',
        name: 'Clipboard',
        icon: 'mdi-content-copy',
        category: 'Data Display',
        descriptionKey: 'components.catalog.clipboard.description',
        descriptionFallback: 'Copy-to-clipboard button with feedback state.',
        family: []
    },
    {
        slug: 'code',
        name: 'Code',
        icon: 'mdi-code-braces',
        category: 'Data Display',
        descriptionKey: 'components.catalog.code.description',
        descriptionFallback: 'Syntax-highlighted code block with line numbers and copy button.',
        family: []
    },
    {
        slug: 'counter',
        name: 'Counter',
        icon: 'mdi-counter',
        category: 'Data Display',
        descriptionKey: 'components.catalog.counter.description',
        descriptionFallback: 'Animated numeric counter with min, max and step.',
        family: []
    },
    {
        slug: 'data-list',
        name: 'DataList',
        icon: 'mdi-format-list-bulleted',
        category: 'Data Display',
        descriptionKey: 'components.catalog.data_list.description',
        descriptionFallback: 'Definition list with title/text pair rows.',
        family: [
            {
                slug: 'data-title',
                name: 'DataTitle',
                descriptionKey: 'components.catalog.data_title.description',
                descriptionFallback: 'Title (dt) inside a DataList.'
            },
            {
                slug: 'data-text',
                name: 'DataText',
                descriptionKey: 'components.catalog.data_text.description',
                descriptionFallback: 'Value (dd) inside a DataList.'
            }
        ]
    },
    {
        slug: 'data-title',
        name: 'DataTitle',
        icon: 'mdi-format-list-bulleted',
        category: 'Data Display',
        descriptionKey: 'components.catalog.data_title.description',
        descriptionFallback: 'Title (dt) inside a DataList.',
        parentSlug: 'data-list',
        family: []
    },
    {
        slug: 'data-text',
        name: 'DataText',
        icon: 'mdi-format-list-bulleted',
        category: 'Data Display',
        descriptionKey: 'components.catalog.data_text.description',
        descriptionFallback: 'Value (dd) inside a DataList.',
        parentSlug: 'data-list',
        family: []
    },
    {
        slug: 'data-table',
        name: 'DataTable',
        icon: 'mdi-table-large',
        category: 'Data Display',
        descriptionKey: 'components.catalog.data_table.description',
        descriptionFallback: 'Full-featured data table with sort, pagination and row selection.',
        family: [
            { slug: 'data-table-row', name: 'DataTableRow', descriptionKey: 'components.catalog.data_table_row.description', descriptionFallback: 'Row component inside a DataTable.' },
            { slug: 'data-table-rows', name: 'DataTableRows', descriptionKey: 'components.catalog.data_table_rows.description', descriptionFallback: 'tbody slot inside a DataTable.' },
            { slug: 'data-table-header-cell', name: 'DataTableHeaderCell', descriptionKey: 'components.catalog.data_table_header_cell.description', descriptionFallback: 'Individual header cell with sort controls.' },
            { slug: 'data-table-headers', name: 'DataTableHeaders', descriptionKey: 'components.catalog.data_table_headers.description', descriptionFallback: 'Header row container in a DataTable.' },
            { slug: 'data-table-footer', name: 'DataTableFooter', descriptionKey: 'components.catalog.data_table_footer.description', descriptionFallback: 'Pagination footer of a DataTable.' }
        ]
    },
    { slug: 'data-table-row', name: 'DataTableRow', icon: 'mdi-table-row', category: 'Data Display', descriptionKey: 'components.catalog.data_table_row.description', descriptionFallback: 'Row component inside a DataTable.', parentSlug: 'data-table', family: [] },
    { slug: 'data-table-rows', name: 'DataTableRows', icon: 'mdi-table-large', category: 'Data Display', descriptionKey: 'components.catalog.data_table_rows.description', descriptionFallback: 'tbody slot inside a DataTable.', parentSlug: 'data-table', family: [] },
    { slug: 'data-table-header-cell', name: 'DataTableHeaderCell', icon: 'mdi-table-column', category: 'Data Display', descriptionKey: 'components.catalog.data_table_header_cell.description', descriptionFallback: 'Individual header cell with sort controls.', parentSlug: 'data-table', family: [] },
    { slug: 'data-table-headers', name: 'DataTableHeaders', icon: 'mdi-table-large', category: 'Data Display', descriptionKey: 'components.catalog.data_table_headers.description', descriptionFallback: 'Header row container in a DataTable.', parentSlug: 'data-table', family: [] },
    { slug: 'data-table-footer', name: 'DataTableFooter', icon: 'mdi-table-large', category: 'Data Display', descriptionKey: 'components.catalog.data_table_footer.description', descriptionFallback: 'Pagination footer of a DataTable.', parentSlug: 'data-table', family: [] },
    {
        slug: 'icon',
        name: 'Icon',
        icon: 'mdi-emoticon-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.icon.description',
        descriptionFallback: 'Universal icon component supporting MDI, SVG, ligature and custom icon sets.',
        family: [
            { slug: 'class-icon', name: 'ClassIcon', descriptionKey: 'components.catalog.class_icon.description', descriptionFallback: 'Renders an icon via CSS class (MDI, Font Awesome…).' },
            { slug: 'svg-icon', name: 'SvgIcon', descriptionKey: 'components.catalog.svg_icon.description', descriptionFallback: 'Renders an icon from an inline SVG string.' },
            { slug: 'ligature-icon', name: 'LigatureIcon', descriptionKey: 'components.catalog.ligature_icon.description', descriptionFallback: 'Renders an icon via font ligature (Material Symbols).' },
            { slug: 'component-icon', name: 'ComponentIcon', descriptionKey: 'components.catalog.component_icon.description', descriptionFallback: 'Renders an icon from a Vue component.' }
        ]
    },
    { slug: 'class-icon', name: 'ClassIcon', icon: 'mdi-emoticon-outline', category: 'Data Display', descriptionKey: 'components.catalog.class_icon.description', descriptionFallback: 'Renders an icon via CSS class.', parentSlug: 'icon', family: [] },
    { slug: 'svg-icon', name: 'SvgIcon', icon: 'mdi-svg', category: 'Data Display', descriptionKey: 'components.catalog.svg_icon.description', descriptionFallback: 'Renders an icon from an inline SVG string.', parentSlug: 'icon', family: [] },
    { slug: 'ligature-icon', name: 'LigatureIcon', icon: 'mdi-format-letter-case', category: 'Data Display', descriptionKey: 'components.catalog.ligature_icon.description', descriptionFallback: 'Renders an icon via font ligature.', parentSlug: 'icon', family: [] },
    { slug: 'component-icon', name: 'ComponentIcon', icon: 'mdi-puzzle-outline', category: 'Data Display', descriptionKey: 'components.catalog.component_icon.description', descriptionFallback: 'Renders an icon from a Vue component.', parentSlug: 'icon', family: [] },
    {
        slug: 'img',
        name: 'Img',
        icon: 'mdi-image-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.img.description',
        descriptionFallback: 'Image component with lazy loading, aspect-ratio and cover/contain modes.',
        family: []
    },
    {
        slug: 'kbd',
        name: 'Kbd',
        icon: 'mdi-keyboard-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.kbd.description',
        descriptionFallback: 'Styled keyboard shortcut badge.',
        family: []
    },
    {
        slug: 'list',
        name: 'List',
        icon: 'mdi-format-list-bulleted',
        category: 'Data Display',
        descriptionKey: 'components.catalog.list.description',
        descriptionFallback: 'Rich list with items, sub-headers, groups and nested support.',
        family: [
            { slug: 'list-item', name: 'ListItem', descriptionKey: 'components.catalog.list_item.description', descriptionFallback: 'Individual item in a List.' },
            { slug: 'list-group', name: 'ListGroup', descriptionKey: 'components.catalog.list_group.description', descriptionFallback: 'Collapsible group inside a List.' },
            { slug: 'list-group-activator', name: 'ListGroupActivator', descriptionKey: 'components.catalog.list_group_activator.description', descriptionFallback: 'Activator header for a ListGroup.' },
            { slug: 'list-subheader', name: 'ListSubheader', descriptionKey: 'components.catalog.list_subheader.description', descriptionFallback: 'Non-interactive subheader between list items.' }
        ]
    },
    { slug: 'list-item', name: 'ListItem', icon: 'mdi-format-list-bulleted', category: 'Data Display', descriptionKey: 'components.catalog.list_item.description', descriptionFallback: 'Individual item in a List.', parentSlug: 'list', family: [] },
    { slug: 'list-group', name: 'ListGroup', icon: 'mdi-format-list-group', category: 'Data Display', descriptionKey: 'components.catalog.list_group.description', descriptionFallback: 'Collapsible group inside a List.', parentSlug: 'list', family: [] },
    { slug: 'list-group-activator', name: 'ListGroupActivator', icon: 'mdi-format-list-group', category: 'Data Display', descriptionKey: 'components.catalog.list_group_activator.description', descriptionFallback: 'Activator header for a ListGroup.', parentSlug: 'list', family: [] },
    { slug: 'list-subheader', name: 'ListSubheader', icon: 'mdi-format-list-group', category: 'Data Display', descriptionKey: 'components.catalog.list_subheader.description', descriptionFallback: 'Non-interactive subheader between list items.', parentSlug: 'list', family: [] },
    {
        slug: 'number-format',
        name: 'NumberFormat',
        icon: 'mdi-numeric',
        category: 'Data Display',
        descriptionKey: 'components.catalog.number_format.description',
        descriptionFallback: 'Locale-aware number, currency and percentage formatter.',
        family: []
    },
    {
        slug: 'qr-code',
        name: 'QrCode',
        icon: 'mdi-qrcode',
        category: 'Data Display',
        descriptionKey: 'components.catalog.qr_code.description',
        descriptionFallback: 'QR code generator rendered as an inline SVG.',
        family: []
    },
    {
        slug: 'table',
        name: 'Table',
        icon: 'mdi-table',
        category: 'Data Display',
        descriptionKey: 'components.catalog.table.description',
        descriptionFallback: 'Simple semantic HTML table with theming and border options.',
        family: []
    },
    {
        slug: 'timeline',
        name: 'Timeline',
        icon: 'mdi-timeline-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.timeline.description',
        descriptionFallback: 'Vertical timeline with dot, connector and item content slots.',
        family: [
            {
                slug: 'timeline-item',
                name: 'TimelineItem',
                descriptionKey: 'components.catalog.timeline_item.description',
                descriptionFallback: 'Individual event entry inside a Timeline.'
            }
        ]
    },
    {
        slug: 'timeline-item',
        name: 'TimelineItem',
        icon: 'mdi-timeline-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.timeline_item.description',
        descriptionFallback: 'Individual event entry inside a Timeline.',
        parentSlug: 'timeline',
        family: []
    },
    {
        slug: 'title',
        name: 'Title',
        icon: 'mdi-format-header-1',
        category: 'Data Display',
        descriptionKey: 'components.catalog.title.description',
        descriptionFallback: 'Polymorphic heading with configurable tag (h1–h6) and typography tokens.',
        family: []
    },
    {
        slug: 'virtual-scroll',
        name: 'VirtualScroll',
        icon: 'mdi-view-sequential-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.virtual_scroll.description',
        descriptionFallback: 'Virtualised list that renders only visible rows for large datasets.',
        family: [
            {
                slug: 'virtual-scroll-item',
                name: 'VirtualScrollItem',
                descriptionKey: 'components.catalog.virtual_scroll_item.description',
                descriptionFallback: 'Individual row inside a VirtualScroll.'
            }
        ]
    },
    {
        slug: 'virtual-scroll-item',
        name: 'VirtualScrollItem',
        icon: 'mdi-view-sequential-outline',
        category: 'Data Display',
        descriptionKey: 'components.catalog.virtual_scroll_item.description',
        descriptionFallback: 'Individual row inside a VirtualScroll.',
        parentSlug: 'virtual-scroll',
        family: []
    },

    // ─────────────────────────────────────────────
    // Feedback & Status
    // ─────────────────────────────────────────────
    {
        slug: 'alert',
        name: 'Alert',
        icon: 'mdi-alert-circle-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.alert.description',
        descriptionFallback: 'Contextual alert banner with intent variants and dismiss action.',
        family: []
    },
    {
        slug: 'confirm-wrapper',
        name: 'ConfirmWrapper',
        icon: 'mdi-check-circle-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.confirm_wrapper.description',
        descriptionFallback: 'Wraps any action with a confirmation dialog before proceeding.',
        family: []
    },
    {
        slug: 'empty-state',
        name: 'EmptyState',
        icon: 'mdi-tray-remove',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.empty_state.description',
        descriptionFallback: 'Illustrated empty state with title, description and action slot.',
        family: []
    },
    {
        slug: 'label',
        name: 'Label',
        icon: 'mdi-tag-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.label.description',
        descriptionFallback: 'Form field label with required indicator.',
        family: []
    },
    {
        slug: 'loader',
        name: 'Loader',
        icon: 'mdi-loading',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.loader.description',
        descriptionFallback: 'Loading wrapper that swaps content with a skeleton or spinner.',
        family: []
    },
    {
        slug: 'messages',
        name: 'Messages',
        icon: 'mdi-message-text-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.messages.description',
        descriptionFallback: 'Field-level validation message list.',
        family: []
    },
    {
        slug: 'progress',
        name: 'Progress',
        icon: 'mdi-progress-clock',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.progress.description',
        descriptionFallback: 'Progress indicator in linear, circular or indeterminate mode.',
        family: [
            {
                slug: 'progress-linear',
                name: 'ProgressLinear',
                descriptionKey: 'components.catalog.progress_linear.description',
                descriptionFallback: 'Horizontal progress bar.'
            },
            {
                slug: 'progress-circular',
                name: 'ProgressCircular',
                descriptionKey: 'components.catalog.progress_circular.description',
                descriptionFallback: 'Circular spinner progress indicator.'
            }
        ]
    },
    {
        slug: 'progress-linear',
        name: 'ProgressLinear',
        icon: 'mdi-progress-helper',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.progress_linear.description',
        descriptionFallback: 'Horizontal progress bar.',
        parentSlug: 'progress',
        family: []
    },
    {
        slug: 'progress-circular',
        name: 'ProgressCircular',
        icon: 'mdi-progress-clock',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.progress_circular.description',
        descriptionFallback: 'Circular spinner progress indicator.',
        parentSlug: 'progress',
        family: []
    },
    {
        slug: 'skeleton',
        name: 'Skeleton',
        icon: 'mdi-loading',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.skeleton.description',
        descriptionFallback: 'Animated skeleton placeholder for loading states.',
        family: []
    },
    {
        slug: 'snackbar',
        name: 'Snackbar',
        icon: 'mdi-message-flash-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.snackbar.description',
        descriptionFallback: 'Brief notification toast with action and auto-dismiss.',
        family: [
            {
                slug: 'snackbar-group',
                name: 'SnackbarGroup',
                descriptionKey: 'components.catalog.snackbar_group.description',
                descriptionFallback: 'Stack manager for multiple simultaneous Snackbars.'
            },
            {
                slug: 'snackbar-item',
                name: 'SnackbarItem',
                descriptionKey: 'components.catalog.snackbar_item.description',
                descriptionFallback: 'Individual notification item inside a SnackbarGroup.'
            }
        ]
    },
    {
        slug: 'snackbar-group',
        name: 'SnackbarGroup',
        icon: 'mdi-message-flash-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.snackbar_group.description',
        descriptionFallback: 'Stack manager for multiple simultaneous Snackbars.',
        parentSlug: 'snackbar',
        family: []
    },
    {
        slug: 'snackbar-item',
        name: 'SnackbarItem',
        icon: 'mdi-message-flash-outline',
        category: 'Feedback & Status',
        descriptionKey: 'components.catalog.snackbar_item.description',
        descriptionFallback: 'Individual notification item inside a SnackbarGroup.',
        parentSlug: 'snackbar',
        family: []
    },

    // ─────────────────────────────────────────────
    // Overlay & Surface
    // ─────────────────────────────────────────────
    {
        slug: 'dialog',
        name: 'Dialog',
        icon: 'mdi-window-maximize',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.dialog.description',
        descriptionFallback: 'Modal dialog with focus trap, scroll lock and transition.',
        family: [
            {
                slug: 'dialog-confirmation',
                name: 'DialogConfirmation',
                descriptionKey: 'components.catalog.dialog_confirmation.description',
                descriptionFallback: 'Pre-built confirm/cancel dialog variant.'
            }
        ]
    },
    {
        slug: 'dialog-confirmation',
        name: 'DialogConfirmation',
        icon: 'mdi-window-maximize',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.dialog_confirmation.description',
        descriptionFallback: 'Pre-built confirm/cancel dialog variant.',
        parentSlug: 'dialog',
        family: []
    },
    {
        slug: 'drawer',
        name: 'Drawer',
        icon: 'mdi-arrow-right-box',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.drawer.description',
        descriptionFallback: 'Side panel drawer anchored to any viewport edge.',
        family: []
    },
    {
        slug: 'overlay',
        name: 'Overlay',
        icon: 'mdi-layers-outline',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.overlay.description',
        descriptionFallback: 'Low-level overlay with portal, scrim and position management.',
        family: [
            {
                slug: 'overlay-scrim',
                name: 'OverlayScrim',
                descriptionKey: 'components.catalog.overlay_scrim.description',
                descriptionFallback: 'Backdrop scrim element used by Overlay-based components.'
            }
        ]
    },
    {
        slug: 'overlay-scrim',
        name: 'OverlayScrim',
        icon: 'mdi-layers-outline',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.overlay_scrim.description',
        descriptionFallback: 'Backdrop scrim element used by Overlay-based components.',
        parentSlug: 'overlay',
        family: []
    },
    {
        slug: 'sheet',
        name: 'Sheet',
        icon: 'mdi-note-outline',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.sheet.description',
        descriptionFallback: 'Themed surface sheet with elevation and rounded props.',
        family: []
    },
    {
        slug: 'tooltip',
        name: 'Tooltip',
        icon: 'mdi-tooltip-outline',
        category: 'Overlay & Surface',
        descriptionKey: 'components.catalog.tooltip.description',
        descriptionFallback: 'Floating tooltip anchored to any element via activator slot.',
        family: []
    },

    // ─────────────────────────────────────────────
    // Media
    // ─────────────────────────────────────────────
    {
        slug: 'audio',
        name: 'Audio',
        icon: 'mdi-music-note-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.audio.description',
        descriptionFallback: 'Accessible audio player with custom controls and waveform.',
        family: []
    },
    {
        slug: 'carousel',
        name: 'Carousel',
        icon: 'mdi-view-carousel-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.carousel.description',
        descriptionFallback: 'Touch/swipe carousel with autoplay, arrows and indicator dots.',
        family: [
            {
                slug: 'carousel-item',
                name: 'CarouselItem',
                descriptionKey: 'components.catalog.carousel_item.description',
                descriptionFallback: 'Individual slide inside a Carousel.'
            }
        ]
    },
    {
        slug: 'carousel-item',
        name: 'CarouselItem',
        icon: 'mdi-view-carousel-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.carousel_item.description',
        descriptionFallback: 'Individual slide inside a Carousel.',
        parentSlug: 'carousel',
        family: []
    },
    {
        slug: 'media',
        name: 'Media',
        icon: 'mdi-play-circle-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.media.description',
        descriptionFallback: 'Media player controller with scrubber and volume control.',
        family: [
            {
                slug: 'media-controller',
                name: 'MediaController',
                descriptionKey: 'components.catalog.media_controller.description',
                descriptionFallback: 'Playback controls overlay for Media.'
            },
            {
                slug: 'media-scrubber',
                name: 'MediaScrubber',
                descriptionKey: 'components.catalog.media_scrubber.description',
                descriptionFallback: 'Timeline scrubber inside a MediaController.'
            },
            {
                slug: 'media-volume-control',
                name: 'MediaVolumeControl',
                descriptionKey: 'components.catalog.media_volume_control.description',
                descriptionFallback: 'Volume slider inside a MediaController.'
            }
        ]
    },
    {
        slug: 'media-controller',
        name: 'MediaController',
        icon: 'mdi-play-circle-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.media_controller.description',
        descriptionFallback: 'Playback controls overlay for Media.',
        parentSlug: 'media',
        family: []
    },
    {
        slug: 'media-scrubber',
        name: 'MediaScrubber',
        icon: 'mdi-play-circle-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.media_scrubber.description',
        descriptionFallback: 'Timeline scrubber inside a MediaController.',
        parentSlug: 'media',
        family: []
    },
    {
        slug: 'media-volume-control',
        name: 'MediaVolumeControl',
        icon: 'mdi-volume-high',
        category: 'Media',
        descriptionKey: 'components.catalog.media_volume_control.description',
        descriptionFallback: 'Volume slider inside a MediaController.',
        parentSlug: 'media',
        family: []
    },
    {
        slug: 'parallax',
        name: 'Parallax',
        icon: 'mdi-layers-triple-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.parallax.description',
        descriptionFallback: 'Scroll-driven parallax effect for images and layers.',
        family: [
            {
                slug: 'parallax-element',
                name: 'ParallaxElement',
                descriptionKey: 'components.catalog.parallax_element.description',
                descriptionFallback: 'Individually scrolling element inside a Parallax.'
            },
            {
                slug: 'parallax-layer',
                name: 'ParallaxLayer',
                descriptionKey: 'components.catalog.parallax_layer.description',
                descriptionFallback: 'Depth layer inside a Parallax container.'
            }
        ]
    },
    {
        slug: 'parallax-element',
        name: 'ParallaxElement',
        icon: 'mdi-layers-triple-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.parallax_element.description',
        descriptionFallback: 'Individually scrolling element inside a Parallax.',
        parentSlug: 'parallax',
        family: []
    },
    {
        slug: 'parallax-layer',
        name: 'ParallaxLayer',
        icon: 'mdi-layers-triple-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.parallax_layer.description',
        descriptionFallback: 'Depth layer inside a Parallax container.',
        parentSlug: 'parallax',
        family: []
    },
    {
        slug: 'slide',
        name: 'Slide',
        icon: 'mdi-gesture-swipe-horizontal',
        category: 'Media',
        descriptionKey: 'components.catalog.slide.description',
        descriptionFallback: 'Slide group with drag scroll and arrow controls.',
        family: []
    },
    {
        slug: 'video',
        name: 'Video',
        icon: 'mdi-video-outline',
        category: 'Media',
        descriptionKey: 'components.catalog.video.description',
        descriptionFallback: 'HTML5 video player with custom controls and poster.',
        family: []
    },
    {
        slug: 'watermark',
        name: 'Watermark',
        icon: 'mdi-watermark',
        category: 'Media',
        descriptionKey: 'components.catalog.watermark.description',
        descriptionFallback: 'Repeating text or image watermark overlay.',
        family: []
    },

    // ─────────────────────────────────────────────
    // Utilities & Providers
    // ─────────────────────────────────────────────
    {
        slug: 'defaults-provider',
        name: 'DefaultsProvider',
        icon: 'mdi-tune',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.defaults_provider.description',
        descriptionFallback: 'Provides default prop values to all descendant origam components.',
        family: []
    },
    {
        slug: 'infinite-scroll',
        name: 'InfiniteScroll',
        icon: 'mdi-arrow-down-circle-outline',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.infinite_scroll.description',
        descriptionFallback: 'Intersection-observer based infinite scroll loader.',
        family: [
            {
                slug: 'infinite-scroll-intersect',
                name: 'InfiniteScrollIntersect',
                descriptionKey: 'components.catalog.infinite_scroll_intersect.description',
                descriptionFallback: 'Sentinel element triggering load inside an InfiniteScroll.'
            }
        ]
    },
    {
        slug: 'infinite-scroll-intersect',
        name: 'InfiniteScrollIntersect',
        icon: 'mdi-arrow-down-circle-outline',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.infinite_scroll_intersect.description',
        descriptionFallback: 'Sentinel element triggering load inside an InfiniteScroll.',
        parentSlug: 'infinite-scroll',
        family: []
    },
    {
        slug: 'lazy',
        name: 'Lazy',
        icon: 'mdi-sleep',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.lazy.description',
        descriptionFallback: 'Defers rendering its slot content until it enters the viewport.',
        family: []
    },
    {
        slug: 'theme-provider',
        name: 'ThemeProvider',
        icon: 'mdi-palette-swatch-outline',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.theme_provider.description',
        descriptionFallback: 'Overrides the active theme for a sub-tree without JS.',
        family: []
    },
    {
        slug: 'transition',
        name: 'Transition',
        icon: 'mdi-transition',
        category: 'Utilities & Providers',
        descriptionKey: 'components.catalog.transition.description',
        descriptionFallback: 'Library of named Vue transitions: fade, slide, expand, scale and more.',
        family: [
            { slug: 'fade', name: 'Fade', descriptionKey: 'components.catalog.fade.description', descriptionFallback: 'Fade in/out transition.' },
            { slug: 'expand-x', name: 'ExpandX', descriptionKey: 'components.catalog.expand_x.description', descriptionFallback: 'Horizontal expand/collapse transition.' },
            { slug: 'expand-y', name: 'ExpandY', descriptionKey: 'components.catalog.expand_y.description', descriptionFallback: 'Vertical expand/collapse transition.' },
            { slug: 'slide-x', name: 'SlideX', descriptionKey: 'components.catalog.slide_x.description', descriptionFallback: 'Horizontal slide transition.' },
            { slug: 'slide-y', name: 'SlideY', descriptionKey: 'components.catalog.slide_y.description', descriptionFallback: 'Vertical slide transition.' },
            { slug: 'scale-rotate', name: 'ScaleRotate', descriptionKey: 'components.catalog.scale_rotate.description', descriptionFallback: 'Scale + rotate entrance transition.' }
        ]
    },
    { slug: 'fade', name: 'Fade', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.fade.description', descriptionFallback: 'Fade in/out transition.', parentSlug: 'transition', family: [] },
    { slug: 'expand-x', name: 'ExpandX', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.expand_x.description', descriptionFallback: 'Horizontal expand/collapse transition.', parentSlug: 'transition', family: [] },
    { slug: 'expand-y', name: 'ExpandY', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.expand_y.description', descriptionFallback: 'Vertical expand/collapse transition.', parentSlug: 'transition', family: [] },
    { slug: 'slide-x', name: 'SlideX', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.slide_x.description', descriptionFallback: 'Horizontal slide transition.', parentSlug: 'transition', family: [] },
    { slug: 'slide-y', name: 'SlideY', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.slide_y.description', descriptionFallback: 'Vertical slide transition.', parentSlug: 'transition', family: [] },
    { slug: 'scale-rotate', name: 'ScaleRotate', icon: 'mdi-transition', category: 'Utilities & Providers', descriptionKey: 'components.catalog.scale_rotate.description', descriptionFallback: 'Scale + rotate entrance transition.', parentSlug: 'transition', family: [] }
]

/** Lookup map: slug → IComponentEntry */
export const COMPONENTS_CATALOG_MAP = new Map(
    COMPONENTS_CATALOG.map(entry => [entry.slug, entry])
)

/** Returns only top-level entries (no parentSlug) for the catalog grid */
export const COMPONENTS_CATALOG_TOP_LEVEL = COMPONENTS_CATALOG.filter(e => !e.parentSlug)
