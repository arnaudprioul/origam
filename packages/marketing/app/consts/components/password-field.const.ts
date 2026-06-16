/**
 * /components/password-field — full documentation data for OrigamPasswordField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/PasswordField/password-field.interface.ts  (props)
 *   - packages/ds/src/components/PasswordField/OrigamPasswordField.vue      (template BEM)
 *   - packages/ds/tokens/component/password-field.json                      (CSS tokens)
 *
 * OrigamPasswordField extends ITextFieldProps. It adds:
 *   1. Show/hide toggle (eye icon), with onIcon / offIcon control.
 *   2. Strength bar (4 segments, semantic color per level).
 *   3. Requirements checklist (list or tiles layout) with custom predicates.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const PASSWORD_FIELD_DOC: IComponentDoc = {
    slug: 'password-field',
    name: 'PasswordField',
    tag: 'origam-password-field',
    icon: 'mdi-lock-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.password_field.description',
    descriptionFallback: 'Secure password input with show/hide toggle, 4-segment strength bar, and a requirements checklist (list or tile layout). Automatically injects validation rules for enabled requirements.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-passwordfield--design',
    docUrl: 'http://localhost:4000/components/PasswordField/OrigamPasswordField',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'PasswordField extends TextField (ITextFieldProps).'
        },
        {
            slug: 'confirm-wrapper',
            name: 'ConfirmWrapper',
            kind: 'component',
            descriptionKey: 'components.catalog.confirm_wrapper.description',
            descriptionFallback: 'Pairs two PasswordFields for a confirm-password flow.'
        }
    ],

    props: [
        // ── Show/hide toggle ─────────────────────────────────────────────
        {
            name: 'onIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'mdi-eye-off',
            descriptionKey: 'components.password_field.props.on_icon.description',
            descriptionFallback: 'Icon shown when the password is HIDDEN (click reveals it).'
        },
        {
            name: 'offIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'mdi-eye',
            descriptionKey: 'components.password_field.props.off_icon.description',
            descriptionFallback: 'Icon shown when the password is VISIBLE (click hides it).'
        },
        {
            name: 'maxlength',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.password_field.props.maxlength.description',
            descriptionFallback: 'Native maxlength attribute. Mirrored into the requirements popup when displayed.'
        },
        // ── Requirements popup / checklist ───────────────────────────────
        {
            name: 'requirements',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.requirements.description',
            descriptionFallback: 'Enables the strength-requirements popup / checklist. When false, the field behaves exactly like a plain TextField with type="password".'
        },
        {
            name: 'persistentRequirements',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.persistent_requirements.description',
            descriptionFallback: 'Keeps the requirements popup open even when the field is not focused.'
        },
        {
            name: 'minLength',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '8',
            descriptionKey: 'components.password_field.props.min_length.description',
            descriptionFallback: 'Minimum password length. Drives the minLength validation rule when requirements=true.'
        },
        {
            name: 'needTiny',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.need_tiny.description',
            descriptionFallback: 'Require at least one lowercase letter.'
        },
        {
            name: 'needUppercase',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.need_uppercase.description',
            descriptionFallback: 'Require at least one uppercase letter.'
        },
        {
            name: 'needNumber',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.need_number.description',
            descriptionFallback: 'Require at least one digit.'
        },
        {
            name: 'needSpecial',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.need_special.description',
            descriptionFallback: 'Require at least one non-alphanumeric character.'
        },
        {
            name: 'menuProps',
            type: { label: 'IMenuProps', slug: 'menu', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.password_field.props.menu_props.description',
            descriptionFallback: 'Props forwarded to the internal OrigamMenu (location, delays, offset…).'
        },
        {
            name: 'requirementRules',
            type: { label: 'IPasswordRequirement[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.password_field.props.requirement_rules.description',
            descriptionFallback: 'Custom checklist predicates. Each { id, label, test(value) } entry renders a row or tile. Falls back to DEFAULT_PASSWORD_REQUIREMENTS when undefined and requirements=true.'
        },
        {
            name: 'requirementsLayout',
            type: { label: "'list' | 'tiles'", slug: '', kind: 'primitive' },
            defaultValue: "'list'",
            descriptionKey: 'components.password_field.props.requirements_layout.description',
            descriptionFallback: 'Layout for the requirements checklist: list (vertical ul) or tiles (Chip pills).'
        },
        {
            name: 'minimal',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.minimal.description',
            descriptionFallback: 'Strips all decorations: toggle eye, strength bar, requirements. Useful for confirm-password fields.'
        },
        // ── Strength bar ─────────────────────────────────────────────────
        {
            name: 'strengthBar',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.strength_bar.description',
            descriptionFallback: 'Shows a 4-segment bar under the input that fills as password strength increases (weak → fair → good → strong).'
        },
        // ── Inherited from ITextFieldProps (key subset) ──────────────────
        {
            name: 'modelValue',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.password_field.props.model_value.description',
            descriptionFallback: 'Current password value. Use v-model to bind two-way.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.password_field.props.label.description',
            descriptionFallback: 'Floating label text.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.disabled.description',
            descriptionFallback: 'Disables the field and the toggle icon.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.password_field.props.readonly.description',
            descriptionFallback: 'Makes the field read-only.'
        },
        {
            name: 'rules',
            type: { label: 'Array<ValidationRule>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.password_field.props.rules.description',
            descriptionFallback: 'Form validation rules. Required-based rules (needTiny, needUppercase…) are auto-injected when requirements=true.'
        },
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.password_field.props.variant.description',
            descriptionFallback: 'Visual variant (outlined, filled, underlined, solo, plain).'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.password_field.emits.update_model_value.description',
            descriptionFallback: 'Two-way binding for the password string value.'
        },
        {
            event: 'update:strength',
            payload: { label: 'TPasswordStrengthLevel', slug: '', kind: 'primitive' },
            descriptionKey: 'components.password_field.emits.update_strength.description',
            descriptionFallback: 'Fires when the computed strength level changes (weak | fair | good | strong). Supports v-model:strength.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.password_field.emits.click_control.description',
            descriptionFallback: 'Fired when the show/hide toggle icon is clicked.'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.password_field.emits.mousedown_control.description',
            descriptionFallback: 'Fired on pointerdown on the toggle icon.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.password_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear button is clicked (clearable=true).'
        }
    ],

    slots: [
        {
            slot: 'info',
            slotProps: '{ [key: string]: any }',
            descriptionKey: 'components.password_field.slots.info.description',
            descriptionFallback: 'Overrides the requirements popup body. Receives the requirement state map.'
        },
        {
            slot: 'counter',
            slotProps: '{ counter, max, value }',
            descriptionKey: 'components.password_field.slots.counter.description',
            descriptionFallback: 'Custom counter renderer in the details slot.'
        },
        {
            slot: 'field',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.password_field.slots.field.description',
            descriptionFallback: 'Replaces the entire field control (advanced override).'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.password_field.slots.prepend.description',
            descriptionFallback: 'Content placed outside and before the field.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.password_field.slots.append.description',
            descriptionFallback: 'Content placed outside and after the field.'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.password_field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field, before the input.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.password_field.slots.label.description',
            descriptionFallback: 'Custom label content replacing the default floating label.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.password_field.slots.loader.description',
            descriptionFallback: 'Custom loading indicator.'
        }
    ],

    examples: [
        {
            titleKey: 'components.password_field.examples.basic.title',
            titleFallback: 'Basic',
            lang: 'vue',
            code: `<template>
  <origam-password-field
    v-model="password"
    label="Password"
    variant="outlined"
  />
</template>`
        },
        {
            titleKey: 'components.password_field.examples.requirements.title',
            titleFallback: 'With requirements checklist',
            lang: 'vue',
            code: `<template>
  <origam-password-field
    v-model="password"
    label="Create password"
    requirements
    :min-length="8"
    need-uppercase
    need-number
    need-special
    strength-bar
  />
</template>`
        },
        {
            titleKey: 'components.password_field.examples.tiles.title',
            titleFallback: 'Tiles layout',
            lang: 'vue',
            code: `<template>
  <origam-password-field
    v-model="password"
    label="Password"
    requirements
    requirements-layout="tiles"
    strength-bar
    :requirement-rules="customRules"
  />
</template>

<script setup lang="ts">
const customRules = [
  { id: 'length', label: '8+ chars', test: (v: string) => v.length >= 8 },
  { id: 'upper', label: 'Uppercase', test: (v: string) => /[A-Z]/.test(v) },
  { id: 'special', label: 'Symbol', test: (v: string) => /[^a-zA-Z0-9]/.test(v) }
]
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { label: 'Password', variant: 'outlined' } },
        { label: 'strength bar', props: { label: 'Create password', variant: 'outlined', strengthBar: true, requirements: true } },
        { label: 'tiles', props: { label: 'Password', variant: 'outlined', requirements: true, requirementsLayout: 'tiles' } },
        { label: 'minimal', props: { label: 'Confirm password', variant: 'outlined', minimal: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-password-field',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamPasswordField',
        svgDesc: 'Schematic of the PasswordField component with 7 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="20" width="640" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.4))" stroke-width="1.5"/>
  <text x="60" y="38" font-size="8" fill="var(--origam-color__text---secondary, #7c3aed)" font-family="'JetBrains Mono',monospace">Password</text>
  <rect x="60" y="44" width="540" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))"/>
  <text x="80" y="60" font-size="12" fill="var(--origam-color__text---primary, #444)" letter-spacing="4">••••••••</text>
  <rect x="620" y="44" width="36" height="24" rx="3" fill="transparent"/>
  <text x="638" y="60" font-size="14" fill="var(--origam-color__text---secondary, #7c3aed)" text-anchor="middle">👁</text>
  <rect x="30" y="86" width="640" height="8" rx="4" fill="var(--origam-color__surface---disabled, rgba(124,58,237,0.15))"/>
  <rect x="30" y="86" width="160" height="8" rx="4" fill="var(--origam-color__feedback--danger---bg, rgba(239,68,68,0.7))"/>
  <rect x="192" y="86" width="160" height="8" rx="4" fill="var(--origam-color__feedback--warning---bg, rgba(245,158,11,0.7))"/>
  <rect x="354" y="86" width="160" height="8" rx="4" fill="var(--origam-color__surface---disabled, rgba(124,58,237,0.15))"/>
  <rect x="516" y="86" width="154" height="8" rx="4" fill="var(--origam-color__surface---disabled, rgba(124,58,237,0.15))"/>
  <rect x="30" y="106" width="640" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1"/>
  <rect x="50" y="118" width="580" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))"/>
  <text x="70" y="134" font-size="9" fill="var(--origam-color__text---secondary, #7c3aed)" font-family="'JetBrains Mono',monospace">origam-password-field__item  — "8+ characters"  ✓</text>
  <rect x="50" y="148" width="580" height="24" rx="3" fill="transparent"/>
  <text x="70" y="164" font-size="9" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">origam-password-field__item  — "Uppercase letter"  ○</text>
  <rect x="50" y="178" width="580" height="24" rx="3" fill="transparent"/>
  <text x="70" y="194" font-size="9" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">origam-password-field__item  — "Number"  ○</text>
  <circle cx="26" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="616" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="616" y="52" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="26" cy="90" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="94" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="26" cy="110" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="114" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="44" cy="122" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="126" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="44" cy="152" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="156" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="44" cy="182" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="186" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">7</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-password-field&gt;</code> — 7 parts: field input, show/hide toggle, strength bar, requirements list container, and individual requirement items.',
        legend: [
            {
                num: 1,
                cls: '.origam-password-field',
                descriptionKey: 'components.password_field.anatomy.root',
                descriptionFallback: 'Root OrigamTextField wrapper with type="password" wiring.'
            },
            {
                num: 2,
                cls: '.origam-password-field__toggle-icon',
                descriptionKey: 'components.password_field.anatomy.toggle_icon',
                descriptionFallback: 'Show/hide toggle button in the appendInner slot. Icon swaps between onIcon and offIcon.'
            },
            {
                num: 3,
                cls: '.origam-password-field__strength',
                descriptionKey: 'components.password_field.anatomy.strength',
                descriptionFallback: '4-segment strength bar. Visible when strengthBar=true. Segments fill based on computed level.'
            },
            {
                num: 4,
                cls: '.origam-password-field__inline-footer',
                descriptionKey: 'components.password_field.anatomy.inline_footer',
                descriptionFallback: 'Container rendered in the details slot, hosting the strength bar and requirements list.'
            },
            {
                num: 5,
                cls: '.origam-password-field__requirements',
                descriptionKey: 'components.password_field.anatomy.requirements',
                descriptionFallback: 'Requirements list container. Modifier --list or --tiles controls the layout.'
            },
            {
                num: 6,
                cls: '.origam-password-field__item',
                descriptionKey: 'components.password_field.anatomy.item',
                descriptionFallback: 'Individual requirement row or tile. Gets --valid modifier when the predicate passes.'
            },
            {
                num: 7,
                cls: '.origam-password-field__requirement-icon',
                descriptionKey: 'components.password_field.anatomy.requirement_icon',
                descriptionFallback: 'Check or cross icon for each requirement. Opacity: 0.2 (unmet) → 1 (met).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-text-field class="origam-password-field">
  <!-- #default slot: the input with appended toggle -->
  <template #default>
    <input :type="isVisible ? 'text' : 'password'" />

    <!-- show/hide toggle -->
    <span class="origam-password-field__toggle-icon">
      <origam-icon :icon="isVisible ? offIcon : onIcon" />
    </span>

    <!-- requirements popup (menu) -->
    <origam-menu content-class="origam-password-field__info">
      <slot name="info">
        <div class="origam-password-field__item"
          v-for="rule in requirementRules">
          <div class="origam-password-field__validate">
            <origam-icon class="origam-password-field__icon" />
          </div>
        </div>
      </slot>
    </origam-menu>
  </template>

  <!-- details slot: strength bar + inline requirements -->
  <template #details>
    <div class="origam-password-field__inline-footer">
      <div class="origam-password-field__strength">
        <span
          v-for="i in 4"
          class="origam-password-field__strength-segment"
        />
      </div>

      <!-- list layout -->
      <ul class="origam-password-field__requirements origam-password-field__requirements--list">
        <li
          v-for="rule in requirementRules"
          class="origam-password-field__item"
        >
          <span class="origam-password-field__requirement-icon" />
          <span class="origam-password-field__requirement-label">{{ rule.label }}</span>
        </li>
      </ul>
    </div>
  </template>
</origam-text-field>`,
        classes: [
            {
                cls: 'origam-password-field',
                descriptionKey: 'components.password_field.anatomy.root',
                descriptionFallback: 'Root field container.'
            },
            {
                cls: 'origam-password-field__toggle-icon',
                descriptionKey: 'components.password_field.anatomy.toggle_icon',
                descriptionFallback: 'Show/hide toggle icon wrapper in the appendInner slot.'
            },
            {
                cls: 'origam-password-field__info',
                descriptionKey: 'components.password_field.anatomy.info',
                descriptionFallback: 'Requirements popup content class applied to the OrigamMenu.'
            },
            {
                cls: 'origam-password-field__item',
                descriptionKey: 'components.password_field.anatomy.item',
                descriptionFallback: 'Individual requirement row. Gets --valid modifier when test() returns true.'
            },
            {
                cls: 'origam-password-field__item--valid',
                descriptionKey: 'components.password_field.anatomy.item_valid',
                descriptionFallback: 'BEM modifier applied when the requirement predicate is satisfied.'
            },
            {
                cls: 'origam-password-field__validate',
                descriptionKey: 'components.password_field.anatomy.validate',
                descriptionFallback: 'Absolute-positioned checkmark badge on the tile corner.'
            },
            {
                cls: 'origam-password-field__icon',
                descriptionKey: 'components.password_field.anatomy.icon',
                descriptionFallback: 'Glyph icon (45px, bold). Opacity 0.2 unmet → 1 met.'
            },
            {
                cls: 'origam-password-field__inline-footer',
                descriptionKey: 'components.password_field.anatomy.inline_footer',
                descriptionFallback: 'Details slot container for strength bar + inline requirements list.'
            },
            {
                cls: 'origam-password-field__strength',
                descriptionKey: 'components.password_field.anatomy.strength',
                descriptionFallback: 'Strength bar wrapper containing 4 __strength-segment spans.'
            },
            {
                cls: 'origam-password-field__strength-segment',
                descriptionKey: 'components.password_field.anatomy.strength_segment',
                descriptionFallback: 'One segment of the 4-part strength bar. Background driven by level token.'
            },
            {
                cls: 'origam-password-field__requirements',
                descriptionKey: 'components.password_field.anatomy.requirements',
                descriptionFallback: 'Requirements list. Has --list (vertical ul) or --tiles (chip wrap) modifier.'
            },
            {
                cls: 'origam-password-field__requirement-chip',
                descriptionKey: 'components.password_field.anatomy.requirement_chip',
                descriptionFallback: 'Individual Chip tile in tiles layout.'
            },
            {
                cls: 'origam-password-field__requirement-label',
                descriptionKey: 'components.password_field.anatomy.requirement_label',
                descriptionFallback: 'Text label for each requirement item in list mode.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-password-field---input-transition',
            defaultValue: '0.15s opacity cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.password_field.css_vars.input_transition',
            descriptionFallback: 'Transition applied to the input on show/hide toggle.'
        },
        {
            name: '--origam-password-field__toggle-icon---cursor',
            defaultValue: 'pointer',
            descriptionKey: 'components.password_field.css_vars.toggle_cursor',
            descriptionFallback: 'Cursor style on the show/hide toggle wrapper.'
        },
        {
            name: '--origam-password-field__item-icon---opacity',
            defaultValue: '0.2',
            descriptionKey: 'components.password_field.css_vars.item_icon_opacity',
            descriptionFallback: 'Opacity of the requirement glyph icon when not yet satisfied.'
        },
        {
            name: '--origam-password-field__item-icon---font-size',
            defaultValue: '45px',
            descriptionKey: 'components.password_field.css_vars.item_icon_font_size',
            descriptionFallback: 'Font size of the requirement glyph icon. Intentionally larger than standard scale.'
        },
        {
            name: '--origam-password-field__strength---bg-weak',
            defaultValue: '{color.feedback.danger.bg}',
            descriptionKey: 'components.password_field.css_vars.strength_weak',
            descriptionFallback: 'Segment background color for strength level "weak".'
        },
        {
            name: '--origam-password-field__strength---bg-fair',
            defaultValue: '{color.feedback.warning.bg}',
            descriptionKey: 'components.password_field.css_vars.strength_fair',
            descriptionFallback: 'Segment background color for strength level "fair".'
        },
        {
            name: '--origam-password-field__strength---bg-good',
            defaultValue: '{color.feedback.info.bg}',
            descriptionKey: 'components.password_field.css_vars.strength_good',
            descriptionFallback: 'Segment background color for strength level "good".'
        },
        {
            name: '--origam-password-field__strength---bg-strong',
            defaultValue: '{color.feedback.success.bg}',
            descriptionKey: 'components.password_field.css_vars.strength_strong',
            descriptionFallback: 'Segment background color for strength level "strong".'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['textbox'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.password_field.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element (input → toggle icon).'
            },
            {
                key: 'Enter / Space (on toggle icon)',
                actionKey: 'components.password_field.a11y.key_toggle',
                actionFallback: 'Reveals or hides the password.'
            }
        ],
        notes: [
            {
                noteKey: 'components.password_field.a11y.toggle_note',
                noteFallback: 'The show/hide toggle is a button element with aria-label that changes between "Show password" and "Hide password" depending on state.'
            },
            {
                noteKey: 'components.password_field.a11y.requirements_note',
                noteFallback: 'The requirements popup opens with aria-haspopup="listbox" on the input. Each requirement item announces its state via a visually-hidden text or the icon\'s aria-hidden.'
            },
            {
                noteKey: 'components.password_field.a11y.strength_note',
                noteFallback: 'The strength bar is visual only (aria-hidden). Strength feedback is conveyed via the requirements checklist and the update:strength emit, which the parent can use to show a text label.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/password-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'password-field.input-transition',
                value: '0.15s opacity cubic-bezier(0.4, 0, 0.2, 1)',
                type: 'other',
                descriptionKey: 'components.password_field.tokens.input_transition',
                descriptionFallback: 'Input opacity transition for show/hide animation.'
            },
            {
                tokenPath: 'password-field.item-icon.opacity',
                value: '0.2',
                type: 'number',
                descriptionKey: 'components.password_field.tokens.item_icon_opacity',
                descriptionFallback: 'Default icon opacity (unmet requirement).'
            },
            {
                tokenPath: 'password-field.item-icon.font-size',
                value: '45px',
                type: 'dimension',
                descriptionKey: 'components.password_field.tokens.item_icon_font_size',
                descriptionFallback: 'Glyph icon font-size — intentionally larger than standard token.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'requirements',
                kind: 'switch',
                labelKey: 'components.password_field.playground.requirements',
                labelFallback: 'Requirements',
                defaultValue: false
            },
            {
                prop: 'strengthBar',
                kind: 'switch',
                labelKey: 'components.password_field.playground.strength_bar',
                labelFallback: 'Strength bar',
                defaultValue: false
            },
            {
                prop: 'requirementsLayout',
                kind: 'select',
                labelKey: 'components.password_field.playground.requirements_layout',
                labelFallback: 'Layout',
                defaultValue: 'list',
                options: [
                    { label: 'list', value: 'list' },
                    { label: 'tiles', value: 'tiles' }
                ]
            },
            {
                prop: 'needUppercase',
                kind: 'switch',
                labelKey: 'components.password_field.playground.need_uppercase',
                labelFallback: 'Uppercase required',
                defaultValue: false
            },
            {
                prop: 'needNumber',
                kind: 'switch',
                labelKey: 'components.password_field.playground.need_number',
                labelFallback: 'Number required',
                defaultValue: false
            },
            {
                prop: 'needSpecial',
                kind: 'switch',
                labelKey: 'components.password_field.playground.need_special',
                labelFallback: 'Special char required',
                defaultValue: false
            },
            {
                prop: 'minimal',
                kind: 'switch',
                labelKey: 'components.password_field.playground.minimal',
                labelFallback: 'Minimal',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.password_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
