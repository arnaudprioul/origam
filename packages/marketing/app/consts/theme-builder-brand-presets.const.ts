/**
 * THEME_BUILDER_BRAND_PRESETS — seed values for the /theming builder, one entry
 * per brand theme (light + dark bundled). Each map is the SUBSET of the brand
 * theme cssVars that the builder actually exposes (the keys in
 * THEME_BUILDER_PRESET_LIGHT_VARS from theme-builder-presets.const.ts).
 *
 * GÉNÉRÉ depuis packages/marketing/app/assets/css/themes/*.css
 * par scripts/generate-brand-presets.mjs. Valeurs RÉELLES extraites des CSS
 * de marque — ne PAS éditer à la main. Régénérer via:
 *   node scripts/generate-brand-presets.mjs
 */
import type { IThemeBuilderPreset } from '~/interfaces/theme-builder.interface'

export const THEME_BUILDER_PRESET_CARTOON_LIGHT_VARS: Record<string, string> = {
        "--origam-btn---border-color": "#171717",
        "--origam-btn---border-width-ghost": "3px",
        "--origam-btn---border-width-outlined": "3px",
        "--origam-card---border-bottom-width": "3px",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-card---border-left-width": "3px",
        "--origam-card---border-right-width": "3px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "3px",
        "--origam-chip---border-color": "#171717",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "3px",
        "--origam-field---border-color": "#171717",
        "--origam-field---border-opacity": "1",
        "--origam-field---border-width": "3px",
        "--origam-title---font-family": "Inter, -apple-system, 'system-ui', sans-serif"
    }

export const THEME_BUILDER_PRESET_CARTOON_DARK_VARS: Record<string, string> = {
        "--origam-btn---border-color": "#fffefb",
        "--origam-btn---border-width-ghost": "3px",
        "--origam-btn---border-width-outlined": "3px",
        "--origam-card---border-bottom-width": "3px",
        "--origam-card---border-color": "#fffefb",
        "--origam-card---border-left-width": "3px",
        "--origam-card---border-right-width": "3px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "3px",
        "--origam-chip---border-color": "#fffefb",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "3px",
        "--origam-field---border-color": "#fffefb",
        "--origam-title---font-family": "Inter, -apple-system, 'system-ui', sans-serif"
    }

export const THEME_BUILDER_PRESET_APPLE_LIGHT_VARS: Record<string, string> = {
        "--origam-btn---border-color": "#d2d2d7",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-title---font-family": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"
    }

export const THEME_BUILDER_PRESET_APPLE_DARK_VARS: Record<string, string> = {
        "--origam-btn---border-color": "#38383a",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-title---font-family": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"
    }

export const THEME_BUILDER_PRESET_GEEK_LIGHT_VARS: Record<string, string> = {
        "--origam-btn---border-color": "rgba(217, 70, 239, 0.55)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-title---font-family": "'JetBrains Mono', 'Fira Code', ui-monospace, monospace"
    }

export const THEME_BUILDER_PRESET_GEEK_DARK_VARS: Record<string, string> = {
        "--origam-btn---border-color": "rgba(0, 240, 255, 0.40)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-title---font-family": "'JetBrains Mono', 'Fira Code', ui-monospace, monospace"
    }

export const THEME_BUILDER_PRESET_GLASS_LIGHT_VARS: Record<string, string> = {
        "--origam-btn---border-color": "rgba(124, 58, 237, 0.35)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px"
    }

export const THEME_BUILDER_PRESET_GLASS_DARK_VARS: Record<string, string> = {
        "--origam-btn---border-color": "rgba(255, 255, 255, 0.20)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px"
    }

export const THEME_BUILDER_PRESET_EDITORIAL_LIGHT_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "0px",
        "--origam-btn---border-color": "rgba(26, 23, 20, 0.40)",
        "--origam-btn---border-radius": "0px",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-bottom-width": "1px",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-card---border-left-width": "1px",
        "--origam-card---border-right-width": "1px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "1px",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)",
        "--origam-chip---border-radius": "0px",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "1px",
        "--origam-field---border-color": "rgba(26, 23, 20, 0.40)",
        "--origam-field---border-opacity": "1",
        "--origam-field---border-radius": "0px",
        "--origam-title---font-family": "'Fraunces', 'Playfair Display', Georgia, serif"
    }

export const THEME_BUILDER_PRESET_EDITORIAL_DARK_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "0px",
        "--origam-btn---border-color": "rgba(255, 255, 255, 0.20)",
        "--origam-btn---border-radius": "0px",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-bottom-width": "1px",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-card---border-left-width": "1px",
        "--origam-card---border-right-width": "1px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "1px",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)",
        "--origam-chip---border-radius": "0px",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "1px",
        "--origam-field---border-color": "rgba(255, 255, 255, 0.30)",
        "--origam-field---border-opacity": "1",
        "--origam-field---border-radius": "0px",
        "--origam-title---font-family": "'Fraunces', 'Playfair Display', Georgia, serif"
    }

export const THEME_BUILDER_PRESET_MATERIAL_LIGHT_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "var(--origam-radius---lg, 12px)",
        "--origam-alert---box-shadow-elevated": "0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)",
        "--origam-btn---border-color": "var(--origam-color__border---default)",
        "--origam-btn---border-radius": "999px",
        "--origam-btn---border-radius-rounded": "999px",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)",
        "--origam-chip---border-radius": "999px",
        "--origam-title---font-family": "'Roboto', 'Inter', -apple-system, sans-serif"
    }

export const THEME_BUILDER_PRESET_MATERIAL_DARK_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "var(--origam-radius---lg, 12px)",
        "--origam-alert---box-shadow-elevated": "0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)",
        "--origam-btn---border-color": "var(--origam-color__border---default)",
        "--origam-btn---border-radius": "999px",
        "--origam-btn---border-radius-rounded": "999px",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)",
        "--origam-chip---border-radius": "999px",
        "--origam-title---font-family": "'Roboto', 'Inter', -apple-system, sans-serif"
    }

export const THEME_BUILDER_PRESET_ECOM_LIGHT_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "6px",
        "--origam-btn---border-color": "#fed7aa",
        "--origam-btn---border-radius": "var(--origam-radius---btn, 6px)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "#ffffff",
        "--origam-card---border-bottom-width": "1px",
        "--origam-card---border-color": "#fed7aa",
        "--origam-card---border-end-end-radius": "10px",
        "--origam-card---border-end-start-radius": "10px",
        "--origam-card---border-left-width": "1px",
        "--origam-card---border-right-width": "1px",
        "--origam-card---border-start-end-radius": "10px",
        "--origam-card---border-start-start-radius": "10px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "1px",
        "--origam-chip---background-color": "var(--origam-color__surface---sunken, #ffedd5)",
        "--origam-chip---border-color": "#fed7aa",
        "--origam-chip---border-radius": "6px",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "1px",
        "--origam-field---border-color": "#fb923c",
        "--origam-field---border-opacity": "0.50",
        "--origam-field---border-radius": "6px",
        "--origam-title---font-family": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }

export const THEME_BUILDER_PRESET_ECOM_DARK_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "6px",
        "--origam-btn---border-color": "rgba(251, 146, 60, 0.30)",
        "--origam-btn---border-radius": "var(--origam-radius---btn, 6px)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "#2e1b14",
        "--origam-card---border-bottom-width": "1px",
        "--origam-card---border-color": "rgba(251, 146, 60, 0.20)",
        "--origam-card---border-end-end-radius": "10px",
        "--origam-card---border-end-start-radius": "10px",
        "--origam-card---border-left-width": "1px",
        "--origam-card---border-right-width": "1px",
        "--origam-card---border-start-end-radius": "10px",
        "--origam-card---border-start-start-radius": "10px",
        "--origam-card---border-style": "solid",
        "--origam-card---border-top-width": "1px",
        "--origam-chip---background-color": "var(--origam-color__surface---sunken, #231510)",
        "--origam-chip---border-color": "rgba(251, 146, 60, 0.30)",
        "--origam-chip---border-radius": "6px",
        "--origam-chip---border-style": "solid",
        "--origam-chip---border-width": "1px",
        "--origam-field---border-color": "#fb923c",
        "--origam-field---border-opacity": "0.40",
        "--origam-field---border-radius": "6px",
        "--origam-title---font-family": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }

export const THEME_BUILDER_PRESET_SOBRE_LIGHT_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "10px",
        "--origam-alert---box-shadow-elevated": "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px -16px rgba(0, 0, 0, 0.18)",
        "--origam-btn---border-color": "var(--origam-color__border---strong)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-card---border-radius-rounded": "12px",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)"
    }

export const THEME_BUILDER_PRESET_SOBRE_DARK_VARS: Record<string, string> = {
        "--origam-alert---border-radius": "10px",
        "--origam-alert---box-shadow-elevated": "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 24px -16px rgba(0, 0, 0, 0.6)",
        "--origam-btn---border-color": "var(--origam-color__border---strong)",
        "--origam-btn---border-width-ghost": "1px",
        "--origam-btn---border-width-outlined": "1px",
        "--origam-card---background": "var(--origam-color__surface---raised)",
        "--origam-card---border-color": "var(--origam-color__border---default)",
        "--origam-card---border-radius-rounded": "12px",
        "--origam-chip---background-color": "var(--origam-color__surface---raised)",
        "--origam-chip---border-color": "var(--origam-color__border---default)"
    }

export const THEME_BUILDER_BRAND_PRESETS: IThemeBuilderPreset[] = [
    {
        key: 'cartoon',
        labelKey: 'theming.preset.cartoon',
        labelFallback: 'Cartoon',
        light: THEME_BUILDER_PRESET_CARTOON_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_CARTOON_DARK_VARS
    },
    {
        key: 'apple',
        labelKey: 'theming.preset.apple',
        labelFallback: 'Apple',
        light: THEME_BUILDER_PRESET_APPLE_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_APPLE_DARK_VARS
    },
    {
        key: 'geek',
        labelKey: 'theming.preset.geek',
        labelFallback: 'Geek',
        light: THEME_BUILDER_PRESET_GEEK_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_GEEK_DARK_VARS
    },
    {
        key: 'glass',
        labelKey: 'theming.preset.glass',
        labelFallback: 'Glass',
        light: THEME_BUILDER_PRESET_GLASS_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_GLASS_DARK_VARS
    },
    {
        key: 'editorial',
        labelKey: 'theming.preset.editorial',
        labelFallback: 'Editorial',
        light: THEME_BUILDER_PRESET_EDITORIAL_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_EDITORIAL_DARK_VARS
    },
    {
        key: 'material',
        labelKey: 'theming.preset.material',
        labelFallback: 'Material',
        light: THEME_BUILDER_PRESET_MATERIAL_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_MATERIAL_DARK_VARS
    },
    {
        key: 'ecom',
        labelKey: 'theming.preset.ecom',
        labelFallback: 'E-commerce',
        light: THEME_BUILDER_PRESET_ECOM_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_ECOM_DARK_VARS
    },
    {
        key: 'sobre',
        labelKey: 'theming.preset.sobre',
        labelFallback: 'Sobre',
        light: THEME_BUILDER_PRESET_SOBRE_LIGHT_VARS,
        dark: THEME_BUILDER_PRESET_SOBRE_DARK_VARS
    }
]
