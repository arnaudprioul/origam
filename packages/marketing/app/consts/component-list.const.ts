import type { IComponentMeta } from '~/interfaces/component.interface'

export const COMPONENT_LIST: ReadonlyArray<IComponentMeta> = [
    {
        name: 'Alert',
        slug: 'alert',
        category: 'feedback',
        description: 'Contextual message band for info, success, warning and error states.'
    },
    {
        name: 'App',
        slug: 'app',
        category: 'layout',
        description: 'Root application shell that wires themes, density and global defaults.'
    },
    {
        name: 'Audio',
        slug: 'audio',
        category: 'media',
        description: 'Accessible audio player with customisable controls and waveform.'
    },
    {
        name: 'Avatar',
        slug: 'avatar',
        category: 'media',
        description: 'Circular user picture with image, initials or icon fallback.'
    },
    {
        name: 'AvatarGroup',
        slug: 'avatar-group',
        category: 'media',
        description: 'Stacked avatars with overlap, max-visible count and rest indicator.'
    },
    {
        name: 'Badge',
        slug: 'badge',
        category: 'feedback',
        description: 'Numeric or dot indicator overlaid on another element.'
    },
    {
        name: 'Blockquote',
        slug: 'blockquote',
        category: 'utilities',
        description: 'Styled pull-quote with optional citation and accent border.'
    },
    {
        name: 'BottomNav',
        slug: 'bottom-nav',
        category: 'navigation',
        description: 'Mobile-first bottom navigation bar with icon + label items.'
    },
    {
        name: 'Bracket',
        slug: 'bracket',
        category: 'utilities',
        description: 'Decorative bracket wrapper for tournament-style bracket layouts.'
    },
    {
        name: 'Breadcrumb',
        slug: 'breadcrumb',
        category: 'navigation',
        description: 'Hierarchical page trail with custom separator and overflow collapse.'
    },
    {
        name: 'Btn',
        slug: 'btn',
        category: 'utilities',
        description: 'Versatile button with all variants, sizes, icons and loading state.'
    },
    {
        name: 'BtnGroup',
        slug: 'btn-group',
        category: 'utilities',
        description: 'Visually segmented row of buttons sharing styling and selection.'
    },
    {
        name: 'BtnToggle',
        slug: 'btn-toggle',
        category: 'forms',
        description: 'Multi-state segmented button group acting as a selector input.'
    },
    {
        name: 'Calendar',
        slug: 'calendar',
        category: 'forms',
        description: 'Full month/week/day calendar view with event slots and navigation.'
    },
    {
        name: 'Card',
        slug: 'card',
        category: 'layout',
        description: 'Elevated surface container with header, media, content and action areas.'
    },
    {
        name: 'Carousel',
        slug: 'carousel',
        category: 'media',
        description: 'Touch-friendly horizontal slider with autoplay, dots and arrow controls.'
    },
    {
        name: 'Chart',
        slug: 'chart',
        category: 'media',
        description: '29 chart types (bar, line, pie, radar…) built on SVG with design tokens.'
    },
    {
        name: 'Checkbox',
        slug: 'checkbox',
        category: 'forms',
        description: 'Accessible checkbox with indeterminate state and custom label.'
    },
    {
        name: 'CheckboxBtn',
        slug: 'checkbox-btn',
        category: 'forms',
        description: 'Checkbox rendered as a toggle button — same data binding, button chrome.'
    },
    {
        name: 'Chip',
        slug: 'chip',
        category: 'utilities',
        description: 'Compact tag or filter badge with optional close button and avatar.'
    },
    {
        name: 'ClientOnly',
        slug: 'client-only',
        category: 'utilities',
        description: 'Renders its slot only on the client, preventing SSR/hydration mismatches.'
    },
    {
        name: 'Clipboard',
        slug: 'clipboard',
        category: 'utilities',
        description: 'One-click copy-to-clipboard with visual confirmation feedback.'
    },
    {
        name: 'Code',
        slug: 'code',
        category: 'utilities',
        description: 'Syntax-highlighted code block with copy button and language label.'
    },
    {
        name: 'ColorPicker',
        slug: 'color-picker',
        category: 'forms',
        description: 'Full-featured colour picker with hue slider, opacity and hex/rgb inputs.'
    },
    {
        name: 'ColorPickerField',
        slug: 'color-picker-field',
        category: 'forms',
        description: 'Form field variant of ColorPicker with label, hint and validation.'
    },
    {
        name: 'CommandPalette',
        slug: 'command-palette',
        category: 'navigation',
        description: 'Keyboard-driven command palette overlay with fuzzy search.'
    },
    {
        name: 'ConfirmWrapper',
        slug: 'confirm-wrapper',
        category: 'overlay',
        description: 'Wraps any trigger with an inline confirmation prompt before action.'
    },
    {
        name: 'ContextualMenu',
        slug: 'contextual-menu',
        category: 'overlay',
        description: 'Right-click or long-press context menu anchored to a target element.'
    },
    {
        name: 'Counter',
        slug: 'counter',
        category: 'utilities',
        description: 'Animated number counter that tweens from one value to another.'
    },
    {
        name: 'DataList',
        slug: 'data-list',
        category: 'data',
        description: 'Key-value list renderer with optional KV mode and custom row slots.'
    },
    {
        name: 'DataTable',
        slug: 'data-table',
        category: 'data',
        description: 'Feature-rich table with sort, filter, pagination, selection and expansion.'
    },
    {
        name: 'DatePicker',
        slug: 'date-picker',
        category: 'forms',
        description: 'Standalone date/range picker with month grid and keyboard navigation.'
    },
    {
        name: 'DatePickerField',
        slug: 'date-picker-field',
        category: 'forms',
        description: 'Form field variant of DatePicker with label, hint and validation.'
    },
    {
        name: 'DefaultsProvider',
        slug: 'defaults-provider',
        category: 'utilities',
        description: 'Injects prop defaults to all descendent origam components in its tree.'
    },
    {
        name: 'Dialog',
        slug: 'dialog',
        category: 'overlay',
        description: 'Modal dialog with multiple sizes, fullscreen mode and focus trap.'
    },
    {
        name: 'Divider',
        slug: 'divider',
        category: 'layout',
        description: 'Horizontal or vertical separator with optional label inset.'
    },
    {
        name: 'Drawer',
        slug: 'drawer',
        category: 'overlay',
        description: 'Side-panel drawer that slides in from any edge with scrim backdrop.'
    },
    {
        name: 'EmptyState',
        slug: 'empty-state',
        category: 'feedback',
        description: 'Placeholder illustration + message for zero-data screens.'
    },
    {
        name: 'ExpansionPanel',
        slug: 'expansion-panel',
        category: 'layout',
        description: 'Accordion-style panel group with animated expand/collapse.'
    },
    {
        name: 'Field',
        slug: 'field',
        category: 'forms',
        description: 'Base form field shell with label, hint, error message and affix slots.'
    },
    {
        name: 'FileField',
        slug: 'file-field',
        category: 'forms',
        description: 'Drag-and-drop file upload field with preview, progress and multi-file.'
    },
    {
        name: 'Form',
        slug: 'form',
        category: 'forms',
        description: 'Form wrapper providing validation context and submit handling.'
    },
    {
        name: 'Grid',
        slug: 'grid',
        category: 'layout',
        description: 'CSS-grid row container with configurable columns and gutter.'
    },
    {
        name: 'Container',
        slug: 'container',
        category: 'layout',
        description: 'Centred max-width wrapper with responsive horizontal padding.'
    },
    {
        name: 'Row',
        slug: 'row',
        category: 'layout',
        description: 'Flex row container — pair with Col to build responsive grids.'
    },
    {
        name: 'Col',
        slug: 'col',
        category: 'layout',
        description: 'Responsive column with span / offset / order across breakpoints.'
    },
    {
        name: 'Spacer',
        slug: 'spacer',
        category: 'layout',
        description: 'Flex spacer that absorbs remaining space inside a Row / flex line.'
    },
    {
        name: 'Icon',
        slug: 'icon',
        category: 'media',
        description: 'Universal icon wrapper supporting Material Symbols and custom SVGs.'
    },
    {
        name: 'Img',
        slug: 'img',
        category: 'media',
        description: 'Smart image with lazy-load, aspect-ratio, srcset and fallback.'
    },
    {
        name: 'InfiniteScroll',
        slug: 'infinite-scroll',
        category: 'data',
        description: 'Intersection-observer-based infinite scroll trigger for lists.'
    },
    {
        name: 'InlineEdit',
        slug: 'inline-edit',
        category: 'forms',
        description: 'Click-to-edit inline text with confirm/cancel controls.'
    },
    {
        name: 'Input',
        slug: 'input',
        category: 'forms',
        description: 'Low-level text input primitive consumed by all form field components.'
    },
    {
        name: 'ItemGroup',
        slug: 'item-group',
        category: 'utilities',
        description: 'Single or multi-select group managing active state across children.'
    },
    {
        name: 'Kbd',
        slug: 'kbd',
        category: 'utilities',
        description: 'Keyboard key badge rendering sequences like ⌘K or Ctrl+Shift+P.'
    },
    {
        name: 'Label',
        slug: 'label',
        category: 'forms',
        description: 'Accessible form label with required indicator and disabled styling.'
    },
    {
        name: 'Layout',
        slug: 'layout',
        category: 'layout',
        description: 'Application chrome layout with app-bar, drawer and main content areas.'
    },
    {
        name: 'Lazy',
        slug: 'lazy',
        category: 'utilities',
        description: 'Defers rendering of heavy slot content until it enters the viewport.'
    },
    {
        name: 'List',
        slug: 'list',
        category: 'navigation',
        description: 'Navigational list with items, sub-headers, dividers and icon slots.'
    },
    {
        name: 'Loader',
        slug: 'loader',
        category: 'feedback',
        description: 'Circular or linear loading indicator with determinate and indeterminate modes.'
    },
    {
        name: 'Main',
        slug: 'main',
        category: 'layout',
        description: 'Semantic main content area that adapts to Layout drawer/rail offsets.'
    },
    {
        name: 'Masonry',
        slug: 'masonry',
        category: 'layout',
        description: 'Pinterest-style masonry grid using CSS columns with auto flow.'
    },
    {
        name: 'Media',
        slug: 'media',
        category: 'media',
        description: 'Audio/video media controller with scrubber, play/pause and volume.'
    },
    {
        name: 'Menu',
        slug: 'menu',
        category: 'overlay',
        description: 'Floating dropdown menu anchored to a trigger with smart positioning.'
    },
    {
        name: 'Messages',
        slug: 'messages',
        category: 'feedback',
        description: 'Renders a list of hint, warning or error messages below a form field.'
    },
    {
        name: 'NumberField',
        slug: 'number-field',
        category: 'forms',
        description: 'Numeric input with stepper controls, min/max, step and formatting.'
    },
    {
        name: 'NumberFormat',
        slug: 'number-format',
        category: 'utilities',
        description: 'Inline number formatter using Intl.NumberFormat with locale support.'
    },
    {
        name: 'OtpInputField',
        slug: 'otp-input-field',
        category: 'forms',
        description: '6-digit OTP input with auto-focus advance and paste handling.'
    },
    {
        name: 'Overlay',
        slug: 'overlay',
        category: 'overlay',
        description: 'Base scrim overlay layer used by dialogs, drawers and menus.'
    },
    {
        name: 'Pagination',
        slug: 'pagination',
        category: 'navigation',
        description: 'Page controls with prev/next, page numbers, jump-to and page-size picker.'
    },
    {
        name: 'Parallax',
        slug: 'parallax',
        category: 'media',
        description: 'Scroll-driven parallax image or slot with configurable speed factor.'
    },
    {
        name: 'PasswordField',
        slug: 'password-field',
        category: 'forms',
        description: 'Password input with show/hide toggle, strength meter and rules.'
    },
    {
        name: 'Picker',
        slug: 'picker',
        category: 'overlay',
        description: 'Generic floating picker shell used by ColorPicker and DatePicker.'
    },
    {
        name: 'Progress',
        slug: 'progress',
        category: 'feedback',
        description: 'Linear or circular progress bar with label and determinate/indeterminate modes.'
    },
    {
        name: 'QrCode',
        slug: 'qr-code',
        category: 'media',
        description: 'Renders a QR code SVG from any string value with custom colours.'
    },
    {
        name: 'Radio',
        slug: 'radio',
        category: 'forms',
        description: 'Accessible radio button with custom label and group binding.'
    },
    {
        name: 'RadioBtn',
        slug: 'radio-btn',
        category: 'forms',
        description: 'Radio rendered as a toggle button — single-choice in a segmented row.'
    },
    {
        name: 'RadioGroup',
        slug: 'radio-group',
        category: 'forms',
        description: 'Group container that binds multiple Radio inputs to a single model.'
    },
    {
        name: 'RatingField',
        slug: 'rating-field',
        category: 'forms',
        description: 'Star or custom-icon rating input with half-star and read-only modes.'
    },
    {
        name: 'Responsive',
        slug: 'responsive',
        category: 'utilities',
        description: 'Aspect-ratio container that locks its content to a target ratio (16/9, 1/1, …) without JS.'
    },
    {
        name: 'Section',
        slug: 'section',
        category: 'layout',
        description: 'Semantic section container with constrained-width inner content.'
    },
    {
        name: 'Select',
        slug: 'select',
        category: 'forms',
        description: 'Searchable select/combobox with single and multi-select modes.'
    },
    {
        name: 'SelectionControl',
        slug: 'selection-control',
        category: 'forms',
        description: 'Base selection primitive shared by Checkbox, Radio and Switch.'
    },
    {
        name: 'Sheet',
        slug: 'sheet',
        category: 'overlay',
        description: 'Generic chrome surface with full mixin set (border, rounded, elevation, position); base of Card, Dialog and other panel-like components.'
    },
    {
        name: 'Skeleton',
        slug: 'skeleton',
        category: 'feedback',
        description: 'Animated loading placeholder matching the shape of incoming content.'
    },
    {
        name: 'Slide',
        slug: 'slide',
        category: 'utilities',
        description: 'Horizontal (or vertical) overflow scroller with prev/next navigation and keyboard support.'
    },
    {
        name: 'SliderField',
        slug: 'slider-field',
        category: 'forms',
        description: 'Range slider with single thumb or dual handles for interval selection.'
    },
    {
        name: 'Snackbar',
        slug: 'snackbar',
        category: 'feedback',
        description: 'Timed toast notification with action button and position variants.'
    },
    {
        name: 'SnackbarGroup',
        slug: 'snackbar-group',
        category: 'feedback',
        description: 'Manager that stacks and animates multiple Snackbars in a single corner.'
    },
    {
        name: 'Stepper',
        slug: 'stepper',
        category: 'navigation',
        description: 'Multi-step wizard with linear or non-linear navigation and step states.'
    },
    {
        name: 'Switch',
        slug: 'switch',
        category: 'forms',
        description: 'Toggle switch with animated thumb, custom labels and loading state.'
    },
    {
        name: 'SystemBar',
        slug: 'system-bar',
        category: 'layout',
        description: 'App-level status bar for notifications count, battery and time display.'
    },
    {
        name: 'Table',
        slug: 'table',
        category: 'data',
        description: 'Semantic HTML table primitives with sticky headers and responsive scroll.'
    },
    {
        name: 'Tabs',
        slug: 'tabs',
        category: 'navigation',
        description: 'Tab bar with panel content, icons, badges and scroll overflow.'
    },
    {
        name: 'TextareaField',
        slug: 'textarea-field',
        category: 'forms',
        description: 'Auto-resizing textarea with char counter, label and validation.'
    },
    {
        name: 'TextField',
        slug: 'text-field',
        category: 'forms',
        description: 'Full-featured text input with label, affixes, clear button and validation.'
    },
    {
        name: 'TextMask',
        slug: 'text-mask',
        category: 'utilities',
        description: 'Typographic display component that clips any gradient or image through text glyphs via background-clip: text — for hero headlines and brand reveals.'
    },
    {
        name: 'ThemeProvider',
        slug: 'theme-provider',
        category: 'utilities',
        description: 'Sub-tree theme override — switch any branch to dark, light or brand.'
    },
    {
        name: 'Timeline',
        slug: 'timeline',
        category: 'data',
        description: 'Vertical or horizontal timeline with event items and connector lines.'
    },
    {
        name: 'Title',
        slug: 'title',
        category: 'utilities',
        description: 'Typographic title component rendering h1–h6 with design-token scales.'
    },
    {
        name: 'Toolbar',
        slug: 'toolbar',
        category: 'layout',
        description: 'Horizontal toolbar at 56dp height for actions, search and controls.'
    },
    {
        name: 'Tooltip',
        slug: 'tooltip',
        category: 'overlay',
        description: 'Hover or focus tooltip anchored to any element with smart flip.'
    },
    {
        name: 'Treeview',
        slug: 'treeview',
        category: 'data',
        description: 'Hierarchical tree with lazy-load, multi-select, drag-and-drop and icons.'
    },
    {
        name: 'Video',
        slug: 'video',
        category: 'media',
        description: 'Styled video player with poster, controls overlay and aspect-ratio.'
    },
    {
        name: 'VirtualScroll',
        slug: 'virtual-scroll',
        category: 'data',
        description: 'Virtualised list rendering only visible items for massive datasets.'
    },
    {
        name: 'Watermark',
        slug: 'watermark',
        category: 'utilities',
        description: 'Canvas-based watermark overlay with text or image, angle and opacity.'
    },
    {
        name: 'Transition',
        slug: 'transition',
        category: 'utilities',
        description: 'Reusable enter/leave transition wrapper with timing presets.'
    },
    {
        name: 'Window',
        slug: 'window',
        category: 'navigation',
        description: 'Content switcher container — pairs with Tabs / Carousel to swap views.'
    },
    {
        name: 'WindowItem',
        slug: 'window-item',
        category: 'navigation',
        description: 'Single view inside a Window — transitions in/out when activated.'
    }
] as const
