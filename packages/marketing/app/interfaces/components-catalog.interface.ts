/**
 * Catalog entry — one row in the flat component list displayed on /components.
 * Descriptions come from docs .md files (first line) or a factual fallback.
 */
export interface IComponentEntry {
    /** kebab-case slug used as the URL segment: /components/{slug} */
    slug: string
    /** PascalCase component name as it appears in the DS, e.g. "Btn" */
    name: string
    /** MDI icon name for the catalog card */
    icon: string
    /** i18n key for the short description */
    descriptionKey: string
    /** Inline fallback description (English) — used when key is missing */
    descriptionFallback: string
    /** Category this component belongs to — drives the section grouping */
    category: string
    /**
     * Family members: sub-components that belong to the same DS folder.
     * Empty for single-component dirs (e.g. Alert, Divider…).
     * Each entry is a sibling cliquable card on /components/{slug}.
     */
    family: IComponentFamilyMember[]
    /**
     * If this entry IS a sub-component, points to the primary family slug.
     * Used to render a "Back to family" link on the sub-component page.
     * Undefined for top-level / standalone components.
     */
    parentSlug?: string
}

/** A related sub-component shown in the "family" section of a component page. */
export interface IComponentFamilyMember {
    /** kebab-case slug for this sub-component — its own /components/{slug} page */
    slug: string
    /** Full component name, e.g. "BtnGroup" */
    name: string
    /** Short one-line description */
    descriptionFallback: string
    /** i18n key for the description */
    descriptionKey: string
}

/**
 * A cross-reference to a component or directive from a DIFFERENT folder that
 * collaborates with this component. Distinct from `family` (same DS folder).
 */
export interface IComponentRelated {
    /** kebab-case slug — for components: /components/{slug}, for directives: /directives#{slug} */
    slug: string
    /** Display name, e.g. "Dialog", "v-click-outside" */
    name: string
    /** Whether this is a directive (links to /directives) or a component (links to /components) */
    kind: 'component' | 'directive'
    descriptionFallback: string
    descriptionKey: string
}

/**
 * Per-component documentation data — drives the /components/[slug].vue template.
 * One file per component under app/consts/components/{slug}.const.ts.
 */
export interface IComponentDoc {
    /** Must match the catalog entry slug exactly */
    slug: string
    /** Display name (PascalCase) */
    name: string
    /** Full component tag used in templates, e.g. "origam-btn" */
    tag: string
    /** MDI icon */
    icon: string
    /** i18n key for the hero description */
    descriptionKey: string
    descriptionFallback: string
    /** DS category used as the primary chip */
    category: string
    /** Optional npm package / sub-export note */
    packageNote?: string
    /** Prop rows shown in the Props table */
    props: IComponentPropRow[]
    /** Emit rows */
    emits: IComponentEmitRow[]
    /** Slot rows */
    slots: IComponentSlotRow[]
    /** 2-3 runnable code snippets */
    examples: IComponentExample[]
    /**
     * Family members — sub-components that live in the SAME DS folder.
     * Rendered as "Family" section on the detail page.
     */
    family: IComponentFamilyMember[]
    /**
     * Cross-references to OTHER components/directives from DIFFERENT folders
     * that collaborate with this component. Rendered as "Éléments liés" section.
     * Must only contain REAL documented relationships (not invented).
     */
    related?: IComponentRelated[]
    /**
     * If this is a sub-component, the parent slug for the breadcrumb.
     */
    parentSlug?: string
    /** Link to the Histoire story, if it exists */
    storyUrl?: string
    /** Link to the VitePress doc, if it exists */
    docUrl?: string
}

/** One row in the Props table */
export interface IComponentPropRow {
    /** Prop name as the developer writes it (camelCase, matching the TS interface) */
    name: string
    /** TypeScript type as a display string */
    type: string
    /** Default value as a display string, e.g. "'default'" or "false" */
    defaultValue: string
    /** i18n key for the description */
    descriptionKey: string
    descriptionFallback: string
    /** true = prop is required */
    required?: boolean
}

/** One row in the Emits table */
export interface IComponentEmitRow {
    /** Event name, e.g. "click" or "click:prepend" */
    event: string
    /** Payload type as a display string */
    payload: string
    descriptionKey: string
    descriptionFallback: string
}

/** One row in the Slots table */
export interface IComponentSlotRow {
    /** Slot name, e.g. "default", "prepend", "loader" */
    slot: string
    /** Slot props signature as a display string, e.g. "{ copy, copied }" */
    slotProps: string
    descriptionKey: string
    descriptionFallback: string
}

/** A runnable code snippet shown in the Examples section */
export interface IComponentExample {
    /** Short example title */
    titleKey: string
    titleFallback: string
    /** Full Vue template / JS snippet */
    code: string
    /** Highlight language, e.g. "vue", "ts", "bash" */
    lang: string
}
