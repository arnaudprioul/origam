import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PASSWORD_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-password-field-props',
    name: 'IPasswordFieldProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_password_field_props.description',
    descriptionFallback: 'Props contract for <OrigamPasswordField>. Extends ITextFieldProps with show/hide toggle icons, strength bar, configurable requirements checklist and a minimal mode that strips all adornments.',
    definition: `export interface IPasswordFieldProps extends ITextFieldProps {
    onIcon?: TIcon
    offIcon?: TIcon
    maxlength?: number
    requirements?: boolean
    persistentRequirements?: boolean
    minLength?: number
    needTiny?: boolean
    needUppercase?: boolean
    needNumber?: boolean
    needSpecial?: boolean
    menuProps?: IMenuProps
    menu?: boolean
    strengthBar?: boolean
    requirementRules?: IPasswordRequirement[]
    requirementsLayout?: 'list' | 'tiles'
    minimal?: boolean
}`,
    extends: ['ITextFieldProps'],
    props: [
        { name: 'onIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon displayed when the password is HIDDEN (clicking reveals the value).' },
        { name: 'offIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon displayed when the password is VISIBLE (clicking hides the value).' },
        { name: 'maxlength', type: 'number', optional: true, descriptionFallback: 'Native maxlength attribute mirrored into the requirements popup.' },
        { name: 'requirements', type: 'boolean', optional: true, descriptionFallback: 'Master switch for the strength-requirements popup. When false the field behaves exactly like a standard TextField.' },
        { name: 'persistentRequirements', type: 'boolean', optional: true, descriptionFallback: 'Keep the requirements popup open even when the field is not focused. Useful for forms that want requirements always visible.' },
        { name: 'minLength', type: 'number', optional: true, descriptionFallback: 'Minimum password length (default 8). Drives the minLength rule injected automatically.' },
        { name: 'needTiny', type: 'boolean', optional: true, descriptionFallback: 'Require at least one lowercase letter.' },
        { name: 'needUppercase', type: 'boolean', optional: true, descriptionFallback: 'Require at least one uppercase letter.' },
        { name: 'needNumber', type: 'boolean', optional: true, descriptionFallback: 'Require at least one digit.' },
        { name: 'needSpecial', type: 'boolean', optional: true, descriptionFallback: 'Require at least one non-alphanumeric character.' },
        { name: 'menuProps', type: 'IMenuProps', optional: true, descriptionFallback: 'Props forwarded to the internal <OrigamMenu> (location, delays, etc.).' },
        { name: 'menu', type: 'boolean', optional: true, descriptionFallback: 'Programmatically controls the requirements menu open/close state.' },
        { name: 'strengthBar', type: 'boolean', optional: true, descriptionFallback: 'Renders a 4-segment strength bar under the input. Segments fill as the password grows stronger using semantic colour tokens.' },
        { name: 'requirementRules', type: 'IPasswordRequirement[]', optional: true, descriptionFallback: 'Inline requirements checklist. Pass an array of IPasswordRequirement predicates. Falls back to DEFAULT_PASSWORD_REQUIREMENTS when requirements=true and this is omitted.' },
        { name: 'requirementsLayout', type: "'list' | 'tiles'", optional: true, descriptionFallback: 'Layout for the requirements checklist — "list" (default) vertical ul/li rows, or "tiles" OrigamChip pills.' },
        { name: 'minimal', type: 'boolean', optional: true, descriptionFallback: 'Strips every decoration (toggle eye, strength bar, requirements checklist). Useful for confirm-password fields where adornments add noise.' },
    ],
    usedBy: [
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/PasswordField/password-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_password_field_props.example',
            titleFallback: 'PasswordField with strength bar and requirements',
            code: `<origam-password-field
    v-model="password"
    :requirements="true"
    :strength-bar="true"
    :need-uppercase="true"
    :need-number="true"
    :min-length="10"
/>`,
            lang: 'html',
        },
    ],
}
