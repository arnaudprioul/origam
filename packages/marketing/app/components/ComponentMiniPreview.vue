<script setup lang="ts">
/*
 * Mini visual stand-ins for the Components catalog grid.
 *
 * Each tile shows a stylized representation of the actual component
 * (button, switch, chart, …) so a visitor scrolling the catalog can
 * recognize a component at a glance instead of reading the title.
 * Ported from `marketing-pages.jsx::ComponentPreview` line 140 — every
 * preview uses ONLY marketing chrome tokens (`--m-*`) so it adapts
 * to the active theme (sobre / cartoon / geek / …).
 *
 * Unknown component names fall through to a generic skeleton tile,
 * so the catalog never breaks when a new component is added before
 * its preview is designed.
 */

defineProps<{
    name: string
}>()

const PASSWORD_BARS = [1, 1, 1, 0] as const
const CHECKBOX_STATES = [true, false, true] as const
const LIST_ACTIVE = [true, false, false] as const
const TABLE_ROWS = [1, 2, 3] as const
const AVATAR_COLORS = ['#7C3AED', '#2DD4BF', '#F59E0B'] as const
const AVATAR_LETTERS = ['A', 'L', 'J'] as const
const BAR_HEIGHTS = [30, 55, 40, 70, 50, 80] as const
</script>

<template>
    <div class="mini-preview" aria-hidden="true">
        <!-- Btn -->
        <div v-if="name === 'Btn'" class="mini-preview__btn">
            Click me
        </div>

        <!-- TextField -->
        <div v-else-if="name === 'TextField'" class="mini-preview__textfield">
            arnaud@…<span class="mini-preview__caret">|</span>
        </div>

        <!-- Select -->
        <div v-else-if="name === 'Select'" class="mini-preview__select">
            <span>France</span>
            <OrigamIcon icon="mdi:chevron-down" :size="11" />
        </div>

        <!-- PasswordField -->
        <div v-else-if="name === 'PasswordField'" class="mini-preview__password">
            <div class="mini-preview__password-input">••••••••</div>
            <div class="mini-preview__password-bars">
                <span
                    v-for="(filled, i) in PASSWORD_BARS"
                    :key="i"
                    class="mini-preview__password-bar"
                    :class="{ 'mini-preview__password-bar--filled': filled }"
                />
            </div>
        </div>

        <!-- Switch -->
        <div v-else-if="name === 'Switch'" class="mini-preview__switch-row">
            <span class="mini-preview__switch mini-preview__switch--off">
                <span class="mini-preview__switch-thumb" />
            </span>
            <span class="mini-preview__switch mini-preview__switch--on">
                <span class="mini-preview__switch-thumb" />
            </span>
        </div>

        <!-- Checkbox -->
        <div v-else-if="name === 'Checkbox'" class="mini-preview__checkbox-row">
            <span
                v-for="(checked, i) in CHECKBOX_STATES"
                :key="i"
                class="mini-preview__checkbox"
                :class="{ 'mini-preview__checkbox--checked': checked }"
            >
                <OrigamIcon v-if="checked" icon="mdi:check" :size="11" />
            </span>
        </div>

        <!-- Card -->
        <div v-else-if="name === 'Card'" class="mini-preview__card">
            <div class="mini-preview__card-bar mini-preview__card-bar--title" />
            <div class="mini-preview__card-bar mini-preview__card-bar--80" />
            <div class="mini-preview__card-bar mini-preview__card-bar--50" />
        </div>

        <!-- Chip -->
        <div v-else-if="name === 'Chip'" class="mini-preview__chip-row">
            <span class="mini-preview__chip mini-preview__chip--primary">Primary</span>
            <span class="mini-preview__chip mini-preview__chip--success">Success</span>
        </div>

        <!-- DataTable -->
        <div v-else-if="name === 'DataTable'" class="mini-preview__table">
            <div class="mini-preview__table-head">
                <span>NAME</span><span>OWNER</span><span>STATUS</span>
            </div>
            <div
                v-for="i in TABLE_ROWS"
                :key="i"
                class="mini-preview__table-row"
            >
                <span>Item {{ i }}</span><span>Léa</span><span class="mini-preview__table-status">● Live</span>
            </div>
        </div>

        <!-- Avatar -->
        <div v-else-if="name === 'Avatar'" class="mini-preview__avatar-row">
            <div
                v-for="(color, i) in AVATAR_COLORS"
                :key="i"
                class="mini-preview__avatar"
                :class="{ 'mini-preview__avatar--first': i === 0 }"
                :style="{ background: color }"
            >
                {{ AVATAR_LETTERS[i] }}
            </div>
            <div class="mini-preview__avatar mini-preview__avatar--rest">
                +12
            </div>
        </div>

        <!-- List -->
        <div v-else-if="name === 'List'" class="mini-preview__list">
            <div
                v-for="(active, i) in LIST_ACTIVE"
                :key="i"
                class="mini-preview__list-item"
                :class="{ 'mini-preview__list-item--active': active }"
            >
                <span class="mini-preview__list-bullet" />
                <span>Item {{ i + 1 }}</span>
            </div>
        </div>

        <!-- Alert -->
        <div v-else-if="name === 'Alert'" class="mini-preview__alert">
            <OrigamIcon icon="mdi:sparkles" :size="12" />
            Heads up!
        </div>

        <!-- Snackbar -->
        <div v-else-if="name === 'Snackbar'" class="mini-preview__snackbar">
            <span>Saved</span>
            <span class="mini-preview__snackbar-action">UNDO</span>
        </div>

        <!-- Dialog -->
        <div v-else-if="name === 'Dialog'" class="mini-preview__dialog">
            <div class="mini-preview__dialog-title" />
            <div class="mini-preview__dialog-body" />
            <div class="mini-preview__dialog-actions">
                <span class="mini-preview__dialog-btn">Cancel</span>
                <span class="mini-preview__dialog-btn mini-preview__dialog-btn--primary">OK</span>
            </div>
        </div>

        <!-- Tooltip -->
        <div v-else-if="name === 'Tooltip'" class="mini-preview__tooltip">
            ⌘ + S
            <span class="mini-preview__tooltip-arrow" />
        </div>

        <!-- Badge -->
        <div v-else-if="name === 'Badge'" class="mini-preview__badge-wrap">
            <span class="mini-preview__badge-icon">
                <OrigamIcon icon="mdi:layers-outline" :size="16" />
            </span>
            <span class="mini-preview__badge-dot">3</span>
        </div>

        <!-- ChartLine -->
        <svg
            v-else-if="name === 'ChartLine'"
            viewBox="0 0 100 50"
            class="mini-preview__chart"
            preserveAspectRatio="none"
        >
            <path
                d="M0,40 L20,30 L40,32 L60,18 L80,22 L100,8"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
            />
        </svg>

        <!-- ChartArea -->
        <svg
            v-else-if="name === 'ChartArea'"
            viewBox="0 0 100 50"
            class="mini-preview__chart"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="ga-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="var(--m-accent, #7c3aed)" stop-opacity=".5" />
                    <stop offset="1" stop-color="var(--m-accent, #7c3aed)" stop-opacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,40 L20,30 L40,32 L60,18 L80,22 L100,8 L100,50 L0,50 Z"
                fill="url(#ga-area)"
            />
            <path
                d="M0,40 L20,30 L40,32 L60,18 L80,22 L100,8"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="1.5"
                fill="none"
            />
        </svg>

        <!-- ChartBar -->
        <div v-else-if="name === 'ChartBar'" class="mini-preview__chart-bars">
            <span
                v-for="(h, i) in BAR_HEIGHTS"
                :key="i"
                class="mini-preview__chart-bar"
                :style="{ height: `${h}%`, opacity: 0.4 + i * 0.1 }"
            />
        </div>

        <!-- ChartDonut -->
        <svg
            v-else-if="name === 'ChartDonut'"
            viewBox="0 0 50 50"
            class="mini-preview__chart-donut"
        >
            <circle cx="25" cy="25" r="20" fill="none" stroke="var(--m-border, rgba(255,255,255,.08))" stroke-width="6" />
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="6"
                stroke-dasharray="70 200"
                transform="rotate(-90 25 25)"
                stroke-linecap="round"
            />
        </svg>

        <!-- Default fallback: monogram on subtle bg -->
        <div v-else class="mini-preview__fallback">
            {{ name.charAt(0) }}
        </div>
    </div>
</template>

<style scoped>
.mini-preview {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    font-family: var(--m-font-body, var(--origam-font__family---sans, sans-serif));
}

.mini-preview__btn {
    padding: 8px 16px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff);
    font-size: 12px;
    font-weight: 600;
}

.mini-preview__textfield {
    inline-size: 72%;
    padding: 8px 10px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1.5px solid var(--m-accent, #7c3aed);
    font-size: 11px;
    color: var(--m-text-soft, #a3a3a3);
    font-family: var(--m-font-mono, monospace);
}

.mini-preview__caret {
    color: var(--m-accent, #7c3aed);
}

.mini-preview__select {
    inline-size: 72%;
    padding: 8px 10px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 11px;
    color: var(--m-text, #fafafa);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mini-preview__password {
    display: flex;
    flex-direction: column;
    gap: 6px;
    inline-size: 72%;
}

.mini-preview__password-input {
    padding: 6px 8px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 11px;
}

.mini-preview__password-bars {
    display: flex;
    gap: 3px;
}

.mini-preview__password-bar {
    flex: 1;
    block-size: 3px;
    border-radius: 1px;
    background: var(--m-border, rgba(255, 255, 255, 0.08));
}

.mini-preview__password-bar--filled {
    background: var(--m-success, #6ee7b7);
}

.mini-preview__switch-row {
    display: flex;
    gap: 10px;
}

.mini-preview__switch {
    position: relative;
    inline-size: 32px;
    block-size: 18px;
    border-radius: 9px;
    background: var(--m-border-strong, rgba(255, 255, 255, 0.16));
}

.mini-preview__switch--on {
    background: var(--m-accent, #7c3aed);
}

.mini-preview__switch-thumb {
    position: absolute;
    inset-block-start: 2px;
    inline-size: 14px;
    block-size: 14px;
    border-radius: 50%;
    background: #fff;
}

.mini-preview__switch--off .mini-preview__switch-thumb {
    inset-inline-start: 2px;
}

.mini-preview__switch--on .mini-preview__switch-thumb {
    inset-inline-end: 2px;
}

.mini-preview__checkbox-row {
    display: flex;
    gap: 8px;
}

.mini-preview__checkbox {
    display: grid;
    place-items: center;
    inline-size: 18px;
    block-size: 18px;
    border-radius: var(--m-radius-sm, 6px);
    border: 1.5px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
    color: #fff;
}

.mini-preview__checkbox--checked {
    background: var(--m-accent, #7c3aed);
    border-color: transparent;
}

.mini-preview__card {
    inline-size: 72%;
    padding: 10px 12px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mini-preview__card-bar {
    block-size: 3px;
    border-radius: 2px;
    background: var(--m-text-soft, #a3a3a3);
    margin-block-end: 3px;
    opacity: 0.5;
}

.mini-preview__card-bar--title {
    block-size: 4px;
    inline-size: 60%;
    background: var(--m-text, #fafafa);
    opacity: 0.8;
    margin-block-end: 6px;
}

.mini-preview__card-bar--80 {
    inline-size: 80%;
}

.mini-preview__card-bar--50 {
    inline-size: 50%;
}

.mini-preview__chip-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    max-inline-size: 90%;
}

.mini-preview__chip {
    padding: 3px 8px;
    border-radius: var(--m-radius-pill, 999px);
    font-size: 10px;
    font-weight: 600;
}

.mini-preview__chip--primary {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-accent-soft, #a78bfa);
}

.mini-preview__chip--success {
    background: rgba(110, 231, 183, 0.18);
    color: var(--m-success, #6ee7b7);
}

.mini-preview__table {
    inline-size: 82%;
    font-size: 9px;
}

.mini-preview__table-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-block-end: 4px;
    border-block-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    color: var(--m-text-quiet, #737373);
    font-family: var(--m-font-mono, monospace);
}

.mini-preview__table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-block: 3px;
    border-block-end: 1px solid var(--m-border-soft, rgba(255, 255, 255, 0.04));
    font-size: 10px;
    color: var(--m-text-soft, #a3a3a3);
}

.mini-preview__table-status {
    color: var(--m-success, #6ee7b7);
}

.mini-preview__avatar-row {
    display: flex;
}

.mini-preview__avatar {
    inline-size: 28px;
    block-size: 28px;
    border-radius: 50%;
    border: 2px solid var(--m-bg, #0a0a0a);
    display: grid;
    place-items: center;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    margin-inline-start: -8px;
}

.mini-preview__avatar--first {
    margin-inline-start: 0;
}

.mini-preview__avatar--rest {
    background: var(--m-surface-2, #171717);
    color: var(--m-text-quiet, #737373);
    font-size: 9px;
    font-weight: 500;
}

.mini-preview__list {
    inline-size: 82%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.mini-preview__list-item {
    padding: 5px 7px;
    border-radius: var(--m-radius-sm, 6px);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: var(--m-text-soft, #a3a3a3);
}

.mini-preview__list-item--active {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-text, #fafafa);
}

.mini-preview__list-bullet {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 50%;
    background: var(--m-text-dim, #525252);
}

.mini-preview__alert {
    inline-size: 82%;
    padding: 8px 10px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    border: 1px solid var(--m-accent, #7c3aed);
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 11px;
    color: var(--m-accent-soft, #a78bfa);
    font-weight: 500;
}

.mini-preview__snackbar {
    padding: 8px 12px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 11px;
    color: var(--m-text, #fafafa);
    display: flex;
    gap: 10px;
}

.mini-preview__snackbar-action {
    color: var(--m-accent, #7c3aed);
    font-weight: 700;
}

.mini-preview__dialog {
    inline-size: 140px;
    padding: 10px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mini-preview__dialog-title {
    block-size: 4px;
    inline-size: 60%;
    background: var(--m-text, #fafafa);
    border-radius: 2px;
    margin-block-end: 6px;
}

.mini-preview__dialog-body {
    block-size: 3px;
    inline-size: 90%;
    background: var(--m-text-soft, #a3a3a3);
    border-radius: 2px;
    margin-block-end: 8px;
    opacity: 0.5;
}

.mini-preview__dialog-actions {
    display: flex;
    gap: 4px;
    justify-content: flex-end;
}

.mini-preview__dialog-btn {
    padding: 3px 7px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface, #0e0e0e);
    font-size: 9px;
    color: var(--m-text-soft, #a3a3a3);
}

.mini-preview__dialog-btn--primary {
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff);
}

.mini-preview__tooltip {
    position: relative;
    padding: 5px 10px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-text, #fafafa);
    color: var(--m-bg, #0a0a0a);
    font-size: 11px;
    font-weight: 600;
}

.mini-preview__tooltip-arrow {
    position: absolute;
    inset-block-end: -4px;
    inset-inline-start: 50%;
    margin-inline-start: -4px;
    inline-size: 0;
    block-size: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--m-text, #fafafa);
}

.mini-preview__badge-wrap {
    position: relative;
}

.mini-preview__badge-icon {
    inline-size: 36px;
    block-size: 36px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    display: grid;
    place-items: center;
    color: var(--m-text-soft, #a3a3a3);
}

.mini-preview__badge-dot {
    position: absolute;
    inset-block-start: -4px;
    inset-inline-end: -4px;
    min-inline-size: 18px;
    block-size: 18px;
    padding: 0 5px;
    border-radius: 9px;
    background: var(--m-danger, #f87171);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 9px;
    font-weight: 700;
    border: 2px solid var(--m-bg, #0a0a0a);
}

.mini-preview__chart {
    inline-size: 72%;
    block-size: 60%;
}

.mini-preview__chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    block-size: 50px;
}

.mini-preview__chart-bar {
    inline-size: 10px;
    background: var(--m-accent, #7c3aed);
    border-radius: 2px 2px 0 0;
}

.mini-preview__chart-donut {
    inline-size: 50px;
    block-size: 50px;
}

.mini-preview__fallback {
    inline-size: 60px;
    block-size: 60px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    display: grid;
    place-items: center;
    font-size: 24px;
    font-weight: 700;
    color: var(--m-text-quiet, #737373);
    font-family: var(--m-font-mono, monospace);
}
</style>
