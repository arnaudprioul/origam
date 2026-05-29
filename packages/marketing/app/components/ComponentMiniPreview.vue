<script setup lang="ts">
/*
 * Visual mockups of every Components catalog tile (96 total).
 *
 * Each preview is a STATIC HTML/CSS simulation that LOOKS like what
 * the real component would render — not the component itself. Three
 * reasons:
 *   - 96 live components × marketing grid = heavy + many would
 *     misrender in 7rem tiles
 *   - a mockup is enough to convey "here's what Switch / Toolbar /
 *     Drawer look like" at a glance
 *   - matches the JSX source pattern (marketing-pages.jsx l.140+)
 *
 * Every mockup uses `--m-*` chrome tokens so the visual identity
 * adapts to the active theme (sobre / cartoon / geek / …).
 */

defineProps<{
    name: string
}>()

const PASSWORD_BARS = [true, true, true, false]
const CHECKBOX_STATES = [true, false, true]
const RATING_STARS = [true, true, true, false, false]
const AVATARS = [
    { letter: 'A', color: '#7C3AED' },
    { letter: 'L', color: '#2DD4BF' },
    { letter: 'J', color: '#F59E0B' }
]
const BAR_HEIGHTS = [30, 55, 40, 70, 50, 80]
const TABLE_ROWS = [1, 2, 3]
const OTP_DIGITS = ['1', '2', '3', '4']
const TIMELINE_STEPS = [
    { active: true, label: 'Sent' },
    { active: true, label: 'In transit' },
    { active: false, label: 'Delivered' }
]
const STEPPER_STEPS = [
    { done: true, num: 1 },
    { done: true, num: 2 },
    { done: false, num: 3 }
]
const BOTTOM_NAV_ICONS = ['mdi:home', 'mdi:magnify', 'mdi:bell', 'mdi:account-circle']
const TABS_ITEMS = [
    { label: 'One', active: true },
    { label: 'Two', active: false },
    { label: 'Three', active: false }
]
const TREE_NODES = [
    { indent: 0, label: 'Root', icon: 'mdi:folder' },
    { indent: 1, label: 'Child A', icon: 'mdi:file-outline' },
    { indent: 1, label: 'Child B', icon: 'mdi:file-outline' }
]
const CALENDAR_DAYS = [22, 23, 24, 25, 26, 27, 28]
const QR_CELLS = [0, 1, 3, 5, 6, 8, 10, 12, 13, 15]
const PROVIDER_TAGS = ['DefaultsProvider', 'ThemeProvider', 'ClientOnly', 'VirtualScroll']

function isProvider (n: string): boolean {
    return PROVIDER_TAGS.includes(n)
}
</script>

<template>
    <div class="mp" aria-hidden="true">
        <!-- ═════════════ FORMS / INPUTS ═════════════ -->

        <div v-if="name === 'Btn'" class="mp__btn">Click me</div>

        <div v-else-if="name === 'BtnGroup'" class="mp__btngroup">
            <span>A</span>
            <span>B</span>
            <span>C</span>
        </div>

        <div v-else-if="name === 'BtnToggle'" class="mp__btngroup">
            <span><OrigamIcon icon="mdi:format-bold" :size="11" /></span>
            <span class="mp__btngroup-on"><OrigamIcon icon="mdi:format-italic" :size="11" /></span>
            <span><OrigamIcon icon="mdi:format-underline" :size="11" /></span>
        </div>

        <div v-else-if="name === 'TextField'" class="mp__input">
            <span class="mp__input-text">arnaud@…</span>
            <span class="mp__input-caret" />
        </div>

        <div v-else-if="name === 'Field'" class="mp__field">
            <span class="mp__field-label">Label</span>
            <div class="mp__field-control">
                <span class="mp__field-prefix">$</span>
                <span class="mp__field-slot" />
                <span class="mp__field-suffix">USD</span>
            </div>
        </div>

        <div v-else-if="name === 'Input'" class="mp__input-wrap">
            <div class="mp__input-struct">
                <span class="mp__input-prepend"><OrigamIcon icon="mdi:at" :size="11" /></span>
                <div class="mp__input mp__input-main"><span class="mp__input-text">username</span></div>
                <span class="mp__input-append"><OrigamIcon icon="mdi:check-circle-outline" :size="11" /></span>
            </div>
            <span class="mp__field-hint">hint text</span>
        </div>

        <div v-else-if="name === 'Label'" class="mp__label">
            <span>Email</span>
            <span class="mp__label-req">*</span>
        </div>

        <div v-else-if="name === 'PasswordField'" class="mp__col">
            <div class="mp__input">
                <span class="mp__input-text">••••••••</span>
                <span class="mp__eye"><OrigamIcon icon="mdi:eye-outline" :size="11" /></span>
            </div>
            <div class="mp__strength">
                <span v-for="(on, i) in PASSWORD_BARS" :key="i" :class="{ 'mp__strength-on': on }" />
            </div>
        </div>

        <div v-else-if="name === 'NumberField'" class="mp__input mp__input--num">
            <span class="mp__input-text">42</span>
            <span class="mp__num-spin">
                <OrigamIcon icon="mdi:chevron-up" :size="9" />
                <OrigamIcon icon="mdi:chevron-down" :size="9" />
            </span>
        </div>

        <div v-else-if="name === 'TextareaField'" class="mp__textarea">
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--60" />
            <span class="mp__skel mp__skel--40" />
        </div>

        <div v-else-if="name === 'Select'" class="mp__input">
            <span class="mp__input-text">France</span>
            <OrigamIcon icon="mdi:chevron-down" :size="11" />
        </div>

        <div v-else-if="name === 'Switch'" class="mp__row">
            <span class="mp__switch"><span class="mp__switch-thumb" /></span>
            <span class="mp__switch mp__switch--on"><span class="mp__switch-thumb" /></span>
        </div>

        <div v-else-if="name === 'Checkbox'" class="mp__row">
            <span v-for="(c, i) in CHECKBOX_STATES" :key="i" class="mp__check" :class="{ 'mp__check--on': c }">
                <OrigamIcon v-if="c" icon="mdi:check" :size="11" />
            </span>
        </div>

        <div v-else-if="name === 'SelectionControl'" class="mp__row mp__row--tight">
            <span class="mp__check mp__check--on"><OrigamIcon icon="mdi:check" :size="11" /></span>
            <span class="mp__radio mp__radio--on"><span /></span>
            <span class="mp__switch mp__switch--on"><span class="mp__switch-thumb" /></span>
        </div>

        <div v-else-if="name === 'CheckboxBtn'" class="mp__row mp__row--tight">
            <span class="mp__chipbtn">Vue 3</span>
            <span class="mp__chipbtn mp__chipbtn--on">A11y</span>
            <span class="mp__chipbtn">CSS</span>
        </div>

        <div v-else-if="name === 'Radio'" class="mp__row">
            <span class="mp__radio mp__radio--on"><span /></span>
            <span class="mp__radio" />
        </div>

        <div v-else-if="name === 'RadioBtn'" class="mp__row mp__row--tight">
            <span class="mp__chipbtn mp__chipbtn--on">EUR</span>
            <span class="mp__chipbtn">USD</span>
            <span class="mp__chipbtn">GBP</span>
        </div>

        <div v-else-if="name === 'RadioGroup'" class="mp__col" style="gap:4px">
            <div class="mp__row mp__row--tight">
                <span class="mp__radio mp__radio--on"><span /></span>
                <span class="mp__radiolabel">Option A</span>
            </div>
            <div class="mp__row mp__row--tight">
                <span class="mp__radio" />
                <span class="mp__radiolabel mp__radiolabel--off">Option B</span>
            </div>
        </div>

        <div v-else-if="name === 'SliderField'" class="mp__slider">
            <span class="mp__slider-track" />
            <span class="mp__slider-fill" />
            <span class="mp__slider-thumb" />
        </div>

        <div v-else-if="name === 'RatingField'" class="mp__row mp__row--tight">
            <span
                v-for="(on, i) in RATING_STARS"
                :key="i"
                class="mp__star"
                :class="{ 'mp__star--on': on }"
            >
                <OrigamIcon :icon="on ? 'mdi:star' : 'mdi:star-outline'" :size="14" />
            </span>
        </div>

        <div v-else-if="name === 'ColorPicker'" class="mp__cp">
            <span class="mp__cp-saturation" />
            <span class="mp__cp-hue" />
        </div>

        <div v-else-if="name === 'ColorPickerField'" class="mp__input">
            <span class="mp__cp-swatch" />
            <span class="mp__input-text">#7C3AED</span>
        </div>

        <div v-else-if="name === 'Calendar'" class="mp__cal-full">
            <div class="mp__cal-full-toolbar">
                <span class="mp__cal-full-nav">&lt;</span>
                <span class="mp__cal-full-title">May 2026</span>
                <span class="mp__cal-full-nav">&gt;</span>
            </div>
            <div class="mp__cal-full-views">
                <span class="mp__cal-full-view mp__cal-full-view--on">Month</span>
                <span class="mp__cal-full-view">Week</span>
                <span class="mp__cal-full-view">Day</span>
            </div>
            <div class="mp__cal-full-grid">
                <span v-for="d in CALENDAR_DAYS" :key="d" :class="{ 'mp__cal-day--on': d === 25 }">{{ d }}</span>
            </div>
        </div>

        <div v-else-if="name === 'DatePicker'" class="mp__datepick">
            <div class="mp__picker-head">May 25, 2026</div>
            <div class="mp__cal mp__cal--popover">
                <div class="mp__cal-head">May</div>
                <div class="mp__cal-grid">
                    <span v-for="d in CALENDAR_DAYS" :key="d" :class="{ 'mp__cal-day--on': d === 25 }">{{ d }}</span>
                </div>
            </div>
            <div class="mp__picker-actions">
                <span>Cancel</span>
                <span class="mp__picker-ok">OK</span>
            </div>
        </div>

        <div v-else-if="name === 'DatePickerField'" class="mp__input">
            <OrigamIcon icon="mdi:calendar" :size="11" />
            <span class="mp__input-text">29/05/2026</span>
        </div>

        <div v-else-if="name === 'FileField'" class="mp__filefield">
            <div class="mp__filefield-zone">
                <OrigamIcon icon="mdi:cloud-upload-outline" :size="18" />
                <span class="mp__filefield-hint">Drop or browse</span>
            </div>
            <div class="mp__filefield-item">
                <OrigamIcon icon="mdi:file-document-outline" :size="11" />
                <span class="mp__filefield-name">report.pdf</span>
                <span class="mp__filefield-size">142 kB</span>
            </div>
        </div>

        <div v-else-if="name === 'OtpInputField'" class="mp__row mp__row--tight">
            <span v-for="d in OTP_DIGITS" :key="d" class="mp__otp">{{ d }}</span>
        </div>

        <div v-else-if="name === 'InlineEdit'" class="mp__inline">
            <span>Edit me</span>
            <OrigamIcon icon="mdi:pencil-outline" :size="11" />
        </div>

        <div v-else-if="name === 'TextMask'" class="mp__textmask">
            origam
        </div>

        <div v-else-if="name === 'Form'" class="mp__form">
            <div class="mp__input"><span class="mp__input-text">Email</span></div>
            <div class="mp__btn mp__btn--full">Submit</div>
        </div>

        <!-- ═════════════ DISPLAY / DATA ═════════════ -->

        <div v-else-if="name === 'Card'" class="mp__card">
            <span class="mp__skel mp__skel--title" />
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--50" />
        </div>

        <div v-else-if="name === 'Chip'" class="mp__row">
            <span class="mp__chip mp__chip--primary">Primary</span>
            <span class="mp__chip mp__chip--success">Success</span>
        </div>

        <div v-else-if="name === 'Avatar'" class="mp__avatar-solo" style="background: var(--m-accent, #7c3aed)">AP</div>

        <div v-else-if="name === 'AvatarGroup'" class="mp__row">
            <div
                v-for="(a, i) in AVATARS"
                :key="i"
                class="mp__avatar"
                :style="{ background: a.color, marginInlineStart: i ? '-8px' : 0 }"
            >
                {{ a.letter }}
            </div>
            <div class="mp__avatar mp__avatar--rest">+12</div>
        </div>

        <div v-else-if="name === 'Badge'" class="mp__badge-wrap">
            <span class="mp__badge-host"><OrigamIcon icon="mdi:bell-outline" :size="16" /></span>
            <span class="mp__badge-dot">3</span>
        </div>

        <div v-else-if="name === 'Progress'" class="mp__progress">
            <span />
        </div>

        <div v-else-if="name === 'List'" class="mp__list">
            <div v-for="(_, i) in 3" :key="i" class="mp__list-row" :class="{ 'mp__list-row--on': i === 0 }">
                <span class="mp__bullet" />
                <span>Item {{ i + 1 }}</span>
            </div>
        </div>

        <div v-else-if="name === 'DataList'" class="mp__dl">
            <div class="mp__dl-row"><span class="mp__dl-key">Status</span><span class="mp__dl-val">Active</span></div>
            <div class="mp__dl-row"><span class="mp__dl-key">Owner</span><span class="mp__dl-val">Léa</span></div>
            <div class="mp__dl-row"><span class="mp__dl-key">Created</span><span class="mp__dl-val">2024-01-15</span></div>
        </div>

        <div v-else-if="name === 'DataTable'" class="mp__table">
            <div class="mp__table-head">
                <span>NAME</span><span>OWNER</span><span>STATUS</span>
            </div>
            <div v-for="i in TABLE_ROWS" :key="i" class="mp__table-row">
                <span>Item {{ i }}</span><span>Léa</span><span class="mp__table-status">● Live</span>
            </div>
        </div>

        <div v-else-if="name === 'Table'" class="mp__table mp__table--plain">
            <div class="mp__table-head mp__table-head--plain">
                <span>Key</span><span>Value</span>
            </div>
            <div class="mp__table-row mp__table-row--plain"><span>One</span><span>1</span></div>
            <div class="mp__table-row mp__table-row--plain"><span>Two</span><span>2</span></div>
        </div>

        <div v-else-if="name === 'Timeline'" class="mp__timeline">
            <div v-for="(s, i) in TIMELINE_STEPS" :key="i" class="mp__timeline-row">
                <span class="mp__timeline-dot" :class="{ 'mp__timeline-dot--on': s.active }" />
                <span>{{ s.label }}</span>
            </div>
        </div>

        <div v-else-if="name === 'Counter'" class="mp__col" style="gap:3px;align-items:stretch">
            <div class="mp__input">
                <span class="mp__input-text">Hello…</span>
                <span class="mp__input-caret" />
            </div>
            <div class="mp__counter-inline">
                <span>42 / 100</span>
            </div>
        </div>

        <div v-else-if="name === 'Stepper'" class="mp__stepper">
            <template v-for="(s, i) in STEPPER_STEPS" :key="i">
                <span class="mp__step" :class="{ 'mp__step--on': s.done }">{{ s.num }}</span>
                <span v-if="i < STEPPER_STEPS.length - 1" class="mp__step-line" />
            </template>
        </div>

        <div v-else-if="name === 'NumberFormat'" class="mp__big">1,234.56</div>

        <!-- ═════════════ FEEDBACK ═════════════ -->

        <div v-else-if="name === 'Alert'" class="mp__alert">
            <OrigamIcon icon="mdi:information-outline" :size="12" />
            <span>Heads up!</span>
        </div>

        <div v-else-if="name === 'SnackbarGroup'" class="mp__col" style="gap:4px;align-items:stretch">
            <div class="mp__snackbar">
                <OrigamIcon icon="mdi:check-circle" :size="11" />
                <span>Item saved</span>
            </div>
            <div class="mp__snackbar">
                <OrigamIcon icon="mdi:alert-circle" :size="11" />
                <span>Network slow</span>
            </div>
        </div>

        <div v-else-if="name === 'Snackbar'" class="mp__snackbar">
            <span>Saved</span>
            <span class="mp__snackbar-action">UNDO</span>
        </div>

        <div v-else-if="name === 'Messages'" class="mp__col" style="gap:3px;align-items:flex-start">
            <span class="mp__field-hint mp__field-hint--err"><OrigamIcon icon="mdi:alert-circle" :size="9" /> This field is required</span>
            <span class="mp__field-hint mp__field-hint--err"><OrigamIcon icon="mdi:alert-circle" :size="9" /> Must be a valid email</span>
            <span class="mp__field-hint">At least 8 characters</span>
        </div>

        <div v-else-if="name === 'Loader'" class="mp__loader">
            <span />
        </div>

        <div v-else-if="name === 'Skeleton'" class="mp__col">
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--60" />
            <span class="mp__skel mp__skel--40" />
        </div>

        <div v-else-if="name === 'EmptyState'" class="mp__empty">
            <OrigamIcon icon="mdi:tray-remove" :size="22" />
            <span>No data</span>
        </div>

        <!-- ═════════════ LAYOUT ═════════════ -->

        <div v-else-if="name === 'App'" class="mp__app">
            <span class="mp__app-bar" />
            <span class="mp__app-body" />
            <span class="mp__app-footer" />
        </div>

        <div v-else-if="name === 'Grid'" class="mp__grid">
            <span /><span /><span /><span />
        </div>

        <div v-else-if="name === 'Container'" class="mp__container-mock">
            <span class="mp__container-rule" />
            <div class="mp__container-body">
                <span class="mp__skel mp__skel--80" />
                <span class="mp__skel mp__skel--60" />
            </div>
            <span class="mp__container-rule" />
        </div>

        <div v-else-if="name === 'Row'" class="mp__rowmock mp__rowmock--row">
            <span class="mp__rowmock-col">col</span>
            <span class="mp__rowmock-col">col</span>
            <span class="mp__rowmock-col">col</span>
        </div>

        <div v-else-if="name === 'Col'">
            <div class="mp__colmock-grid">
                <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <div class="mp__colmock-span">
                <span class="mp__colmock-span-bar">cols=8</span>
            </div>
        </div>

        <div v-else-if="name === 'Spacer'" class="mp__spacermock">
            <span class="mp__spacermock-box" />
            <span class="mp__spacermock-fill">↔</span>
            <span class="mp__spacermock-box" />
        </div>

        <div v-else-if="name === 'Layout'" class="mp__layout">
            <span class="mp__layout-aside" />
            <div class="mp__layout-content">
                <span class="mp__layout-top" />
                <span class="mp__layout-main" />
            </div>
        </div>

        <div v-else-if="name === 'Main'" class="mp__main-mock">
            <span class="mp__main-offset" />
            <div class="mp__main-content">
                <span class="mp__skel mp__skel--80" />
                <span class="mp__skel mp__skel--60" />
                <span class="mp__skel mp__skel--40" />
            </div>
        </div>

        <div v-else-if="name === 'Section'" class="mp__section-stub">
            <span class="mp__section-stub-label">section</span>
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--60" />
        </div>

        <div v-else-if="name === 'Masonry'" class="mp__masonry">
            <span /><span /><span /><span /><span /><span />
        </div>

        <div v-else-if="name === 'Sheet'" class="mp__sheet-generic">
            <span class="mp__skel mp__skel--title" />
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--50" />
        </div>

        <div v-else-if="name === 'Drawer'" class="mp__drawer">
            <span class="mp__drawer-aside" />
            <span class="mp__drawer-bg" />
        </div>

        <div v-else-if="name === 'Toolbar'" class="mp__toolbar">
            <OrigamIcon icon="mdi:menu" :size="14" />
            <span>App title</span>
            <span class="mp__spacer" />
            <OrigamIcon icon="mdi:dots-vertical" :size="14" />
        </div>

        <div v-else-if="name === 'SystemBar'" class="mp__sysbar">
            <span>•••</span>
            <span class="mp__spacer" />
            <span>15:42</span>
        </div>

        <div v-else-if="name === 'Watermark'" class="mp__watermark">
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--60" />
            <span class="mp__watermark-tag">DRAFT</span>
        </div>

        <div v-else-if="name === 'Window'" class="mp__windowsw">
            <div class="mp__windowsw-frame">
                <span class="mp__skel mp__skel--title" />
                <span class="mp__skel mp__skel--80" />
                <span class="mp__skel mp__skel--50" />
            </div>
            <div class="mp__windowsw-dots">
                <span /><span class="mp__windowsw-on" /><span />
            </div>
        </div>

        <div v-else-if="name === 'WindowItem'" class="mp__windowsw">
            <span class="mp__windowsw-tag">Slide 2 of 3</span>
            <div class="mp__windowsw-frame">
                <span class="mp__skel mp__skel--80" />
                <span class="mp__skel mp__skel--50" />
            </div>
        </div>

        <div v-else-if="name === 'Title'" class="mp__heading">Title</div>

        <!-- ═════════════ NAVIGATION ═════════════ -->

        <div v-else-if="name === 'BottomNav'" class="mp__bnav">
            <span
                v-for="(icon, i) in BOTTOM_NAV_ICONS"
                :key="i"
                class="mp__bnav-icon"
                :class="{ 'mp__bnav-icon--on': i === 0 }"
            >
                <OrigamIcon :icon="icon" :size="14" />
            </span>
        </div>

        <div v-else-if="name === 'Breadcrumb'" class="mp__bcrumb">
            <span>Home</span>
            <OrigamIcon icon="mdi:chevron-right" :size="10" />
            <span>Docs</span>
            <OrigamIcon icon="mdi:chevron-right" :size="10" />
            <span class="mp__bcrumb-on">Page</span>
        </div>

        <div v-else-if="name === 'Pagination'" class="mp__pagi">
            <span><OrigamIcon icon="mdi:chevron-left" :size="11" /></span>
            <span>1</span>
            <span class="mp__pagi-on">2</span>
            <span>3</span>
            <span><OrigamIcon icon="mdi:chevron-right" :size="11" /></span>
        </div>

        <div v-else-if="name === 'Tabs'" class="mp__tabs">
            <span
                v-for="t in TABS_ITEMS"
                :key="t.label"
                :class="{ 'mp__tab--on': t.active }"
            >{{ t.label }}</span>
        </div>

        <div v-else-if="name === 'ItemGroup'" class="mp__itemgroup">
            <span class="mp__itemgroup-item">A</span>
            <span class="mp__itemgroup-item mp__itemgroup-item--on">B</span>
            <span class="mp__itemgroup-item">C</span>
        </div>

        <div v-else-if="name === 'Treeview'" class="mp__tree">
            <div
                v-for="(n, i) in TREE_NODES"
                :key="i"
                class="mp__tree-row"
                :style="{ paddingInlineStart: `${n.indent * 0.625}rem` }"
            >
                <OrigamIcon v-if="n.indent === 0" icon="mdi:chevron-down" :size="9" />
                <OrigamIcon v-else icon="mdi:circle-small" :size="9" />
                <OrigamIcon :icon="n.icon" :size="10" />
                <span>{{ n.label }}</span>
            </div>
        </div>

        <div v-else-if="name === 'Picker'" class="mp__picker-shell">
            <div class="mp__picker-shell-header">
                <span class="mp__picker-shell-title">Pick a value</span>
            </div>
            <div class="mp__picker-shell-body">
                <div class="mp__picker-shell-grid">
                    <span /><span /><span /><span /><span /><span />
                </div>
            </div>
            <div class="mp__picker-actions">
                <span>Cancel</span>
                <span class="mp__picker-ok">OK</span>
            </div>
        </div>

        <div v-else-if="name === 'CommandPalette'" class="mp__cmdp">
            <OrigamIcon icon="mdi:magnify" :size="11" />
            <span class="mp__cmdp-placeholder">Type a command…</span>
            <span class="mp__kbd">⌘K</span>
        </div>

        <!-- ═════════════ MEDIA ═════════════ -->

        <div v-else-if="name === 'Audio'" class="mp__audio">
            <span class="mp__audio-play"><OrigamIcon icon="mdi:play" :size="10" /></span>
            <div class="mp__audio-bars">
                <span v-for="i in 12" :key="i" :style="{ height: `${20 + Math.abs(Math.sin(i)) * 80}%` }" />
            </div>
        </div>

        <div v-else-if="name === 'Video'" class="mp__video">
            <span class="mp__video-play"><OrigamIcon icon="mdi:play" :size="14" /></span>
        </div>

        <div v-else-if="name === 'Img'" class="mp__img">
            <OrigamIcon icon="mdi:image-outline" :size="22" />
        </div>

        <div v-else-if="name === 'Carousel'" class="mp__carousel">
            <div class="mp__carousel-frame" />
            <div class="mp__carousel-dots">
                <span /><span class="mp__carousel-on" /><span /><span />
            </div>
        </div>

        <div v-else-if="name === 'Parallax'" class="mp__parallax">
            <span class="mp__parallax-back" />
            <span class="mp__parallax-mid" />
            <span class="mp__parallax-front" />
        </div>

        <div v-else-if="name === 'Slide'" class="mp__slidegroup">
            <span class="mp__slidegroup-prev"><OrigamIcon icon="mdi:chevron-left" :size="10" /></span>
            <div class="mp__slidegroup-track">
                <span class="mp__slidegroup-item mp__slidegroup-item--on">A</span>
                <span class="mp__slidegroup-item">B</span>
                <span class="mp__slidegroup-item">C</span>
                <span class="mp__slidegroup-item">D</span>
            </div>
            <span class="mp__slidegroup-next"><OrigamIcon icon="mdi:chevron-right" :size="10" /></span>
        </div>

        <!-- ═════════════ OVERLAY / MODAL ═════════════ -->

        <div v-else-if="name === 'Dialog'" class="mp__dialog">
            <span class="mp__skel mp__skel--title" />
            <span class="mp__skel mp__skel--80" />
            <div class="mp__dialog-actions">
                <span>Cancel</span>
                <span class="mp__dialog-ok">OK</span>
            </div>
        </div>

        <div v-else-if="name === 'Tooltip'" class="mp__tooltip">
            ⌘ + S
            <span class="mp__tooltip-arrow" />
        </div>

        <div v-else-if="name === 'Menu'" class="mp__menu">
            <span>Open</span>
            <span>Rename</span>
            <span class="mp__menu-on">Delete</span>
        </div>

        <div v-else-if="name === 'ContextualMenu'" class="mp__ctxmenu">
            <OrigamIcon icon="mdi:cursor-default-click-outline" :size="14" />
            <div class="mp__menu mp__menu--ctx">
                <span>Copy</span>
                <span>Paste</span>
                <span class="mp__menu-on">Delete</span>
            </div>
        </div>

        <div v-else-if="name === 'Overlay'" class="mp__overlay">
            <span class="mp__overlay-bg" />
            <span class="mp__overlay-card" />
        </div>

        <div v-else-if="name === 'ConfirmWrapper'" class="mp__confirm">
            <div class="mp__input mp__confirm-input">
                <span class="mp__input-text">arnaud@…</span>
            </div>
            <div class="mp__input mp__confirm-input mp__confirm-input--match">
                <span class="mp__input-text">arnaud@…</span>
                <OrigamIcon icon="mdi:check-circle" :size="13" />
            </div>
        </div>

        <!-- ═════════════ CHARTS ═════════════ -->

        <svg
            v-else-if="name === 'ChartLine'"
            viewBox="0 0 100 50"
            class="mp__chart"
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

        <svg
            v-else-if="name === 'ChartArea'"
            viewBox="0 0 100 50"
            class="mp__chart"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="mp-ga-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="var(--m-accent, #7c3aed)" stop-opacity=".5" />
                    <stop offset="1" stop-color="var(--m-accent, #7c3aed)" stop-opacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,40 L20,30 L40,32 L60,18 L80,22 L100,8 L100,50 L0,50 Z"
                fill="url(#mp-ga-area)"
            />
            <path
                d="M0,40 L20,30 L40,32 L60,18 L80,22 L100,8"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="1.5"
                fill="none"
            />
        </svg>

        <div v-else-if="name === 'ChartBar'" class="mp__bars">
            <span
                v-for="(h, i) in BAR_HEIGHTS"
                :key="i"
                :style="{ height: `${h}%`, opacity: 0.4 + i * 0.1 }"
            />
        </div>

        <svg
            v-else-if="name === 'ChartDonut'"
            viewBox="0 0 50 50"
            class="mp__donut"
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

        <div v-else-if="name === 'ChartColumn'" class="mp__bars mp__bars--col">
            <span v-for="(h, i) in BAR_HEIGHTS" :key="i" :style="{ height: `${h}%`, opacity: 0.4 + i * 0.1 }" />
        </div>

        <svg
            v-else-if="name === 'ChartPie'"
            viewBox="0 0 50 50"
            class="mp__donut"
        >
            <circle cx="25" cy="25" r="20" fill="none" stroke="var(--m-border, rgba(255,255,255,.08))" stroke-width="20" />
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="20"
                stroke-dasharray="50 200"
                transform="rotate(-90 25 25)"
            />
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="var(--m-accent-soft, #a78bfa)"
                stroke-width="20"
                stroke-dasharray="35 200"
                stroke-dashoffset="-50"
                transform="rotate(-90 25 25)"
            />
        </svg>

        <svg
            v-else-if="name === 'ChartScatter'"
            viewBox="0 0 100 50"
            class="mp__chart"
        >
            <circle cx="15" cy="38" r="3" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <circle cx="28" cy="26" r="3" fill="var(--m-accent, #7c3aed)" opacity=".8" />
            <circle cx="42" cy="32" r="3" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <circle cx="55" cy="14" r="3" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <circle cx="68" cy="20" r="3" fill="var(--m-accent, #7c3aed)" opacity=".7" />
            <circle cx="80" cy="8"  r="3" fill="var(--m-accent, #7c3aed)" opacity=".95" />
            <circle cx="35" cy="40" r="2" fill="var(--m-accent-soft, #a78bfa)" opacity=".6" />
            <circle cx="60" cy="35" r="2" fill="var(--m-accent-soft, #a78bfa)" opacity=".6" />
            <circle cx="72" cy="42" r="2" fill="var(--m-accent-soft, #a78bfa)" opacity=".6" />
        </svg>

        <svg
            v-else-if="name === 'ChartRadar'"
            viewBox="0 0 60 60"
            class="mp__radar"
        >
            <polygon points="30,4 56,20 47,50 13,50 4,20" fill="none" stroke="var(--m-border, rgba(255,255,255,.1))" stroke-width="1" />
            <polygon points="30,12 48,24 41,44 19,44 12,24" fill="none" stroke="var(--m-border, rgba(255,255,255,.07))" stroke-width="1" />
            <polygon
                points="30,8 50,22 43,46 17,46 10,22"
                fill="color-mix(in srgb, var(--m-accent, #7c3aed) 28%, transparent)"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="1.5"
            />
        </svg>

        <svg
            v-else-if="name === 'ChartSpline'"
            viewBox="0 0 100 50"
            class="mp__chart"
            preserveAspectRatio="none"
        >
            <path
                d="M0,40 C10,38 15,20 25,22 C35,24 38,35 50,28 C62,21 65,10 80,12 C90,13 95,8 100,6"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
            />
        </svg>

        <svg
            v-else-if="name === 'ChartSteppedLine'"
            viewBox="0 0 100 50"
            class="mp__chart"
            preserveAspectRatio="none"
        >
            <polyline
                points="0,42 20,42 20,30 40,30 40,36 60,36 60,18 80,18 80,24 100,24 100,10"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="2"
                fill="none"
                stroke-linejoin="round"
            />
        </svg>

        <svg
            v-else-if="name === 'ChartGauge'"
            viewBox="0 0 60 40"
            class="mp__gauge"
        >
            <path d="M8,36 A22,22 0 0 1 52,36" fill="none" stroke="var(--m-border, rgba(255,255,255,.1))" stroke-width="5" stroke-linecap="round" />
            <path d="M8,36 A22,22 0 0 1 44,14" fill="none" stroke="var(--m-accent, #7c3aed)" stroke-width="5" stroke-linecap="round" />
            <line x1="30" y1="36" x2="30" y2="16" stroke="var(--m-text, #fafafa)" stroke-width="1.5" stroke-linecap="round" transform="rotate(-30 30 36)" />
            <circle cx="30" cy="36" r="3" fill="var(--m-accent, #7c3aed)" />
        </svg>

        <svg
            v-else-if="name === 'ChartPyramid'"
            viewBox="0 0 60 50"
            class="mp__pyramid"
        >
            <polygon points="30,4 52,44 8,44" fill="color-mix(in srgb, var(--m-accent, #7c3aed) 28%, transparent)" stroke="var(--m-accent, #7c3aed)" stroke-width="1.5" />
            <line x1="8" y1="30" x2="52" y2="30" stroke="var(--m-bg, #0a0a0a)" stroke-width="1.5" />
            <line x1="16" y1="17" x2="44" y2="17" stroke="var(--m-bg, #0a0a0a)" stroke-width="1.5" />
        </svg>

        <svg
            v-else-if="name === 'ChartFunnel'"
            viewBox="0 0 60 50"
            class="mp__pyramid"
        >
            <polygon points="6,6 54,6 44,20 16,20" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <polygon points="16,22 44,22 36,36 24,36" fill="var(--m-accent, #7c3aed)" opacity=".65" />
            <polygon points="24,38 36,38 30,48 30,48" fill="var(--m-accent, #7c3aed)" opacity=".4" />
        </svg>

        <svg
            v-else-if="name === 'ChartHoneycomb'"
            viewBox="0 0 80 50"
            class="mp__chart"
        >
            <polygon points="14,8 22,8 26,15 22,22 14,22 10,15" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <polygon points="28,8 36,8 40,15 36,22 28,22 24,15" fill="var(--m-accent, #7c3aed)" opacity=".55" />
            <polygon points="42,8 50,8 54,15 50,22 42,22 38,15" fill="var(--m-accent, #7c3aed)" opacity=".75" />
            <polygon points="56,8 64,8 68,15 64,22 56,22 52,15" fill="var(--m-accent, #7c3aed)" opacity=".4" />
            <polygon points="21,22 29,22 33,29 29,36 21,36 17,29" fill="var(--m-accent, #7c3aed)" opacity=".65" />
            <polygon points="35,22 43,22 47,29 43,36 35,36 31,29" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <polygon points="49,22 57,22 61,29 57,36 49,36 45,29" fill="var(--m-accent, #7c3aed)" opacity=".45" />
        </svg>

        <svg
            v-else-if="name === 'ChartTreemap'"
            viewBox="0 0 70 50"
            class="mp__chart"
        >
            <rect x="1" y="1" width="40" height="30" rx="2" fill="var(--m-accent, #7c3aed)" opacity=".75" />
            <rect x="43" y="1" width="26" height="30" rx="2" fill="var(--m-accent, #7c3aed)" opacity=".5" />
            <rect x="1" y="33" width="28" height="16" rx="2" fill="var(--m-accent, #7c3aed)" opacity=".55" />
            <rect x="31" y="33" width="38" height="16" rx="2" fill="var(--m-accent, #7c3aed)" opacity=".35" />
        </svg>

        <svg
            v-else-if="name === 'ChartSankey'"
            viewBox="0 0 100 50"
            class="mp__chart"
        >
            <rect x="2" y="4" width="8" height="18" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <rect x="2" y="24" width="8" height="22" rx="1" fill="var(--m-accent-soft, #a78bfa)" opacity=".7" />
            <path d="M10,13 C40,13 60,10 90,10" stroke="var(--m-accent, #7c3aed)" stroke-width="6" fill="none" opacity=".6" />
            <path d="M10,35 C40,35 60,28 90,24" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="10" fill="none" opacity=".4" />
            <rect x="90" y="6" width="8" height="12" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <rect x="90" y="20" width="8" height="18" rx="1" fill="var(--m-accent-soft, #a78bfa)" opacity=".6" />
        </svg>

        <svg
            v-else-if="name === 'ChartWordCloud'"
            viewBox="0 0 100 50"
            class="mp__chart"
        >
            <text x="50" y="22" font-size="16" font-weight="700" fill="var(--m-accent, #7c3aed)" text-anchor="middle" opacity=".9">data</text>
            <text x="22" y="36" font-size="10" font-weight="600" fill="var(--m-accent-soft, #a78bfa)" text-anchor="middle" opacity=".75">chart</text>
            <text x="76" y="14" font-size="9" fill="var(--m-accent, #7c3aed)" text-anchor="middle" opacity=".6">flow</text>
            <text x="78" y="38" font-size="8" fill="var(--m-text-soft, #a3a3a3)" text-anchor="middle" opacity=".6">value</text>
            <text x="14" y="14" font-size="7" fill="var(--m-text-soft, #a3a3a3)" text-anchor="middle" opacity=".5">nodes</text>
            <text x="55" y="44" font-size="7" fill="var(--m-text-soft, #a3a3a3)" text-anchor="middle" opacity=".5">metric</text>
        </svg>

        <svg
            v-else-if="name === 'ChartHeatmap'"
            viewBox="0 0 70 50"
            class="mp__chart"
        >
            <rect x="2" y="2" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".2" />
            <rect x="16" y="2" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".5" />
            <rect x="30" y="2" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".8" />
            <rect x="44" y="2" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".4" />
            <rect x="58" y="2" width="10" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".9" />
            <rect x="2" y="14" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".7" />
            <rect x="16" y="14" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".3" />
            <rect x="30" y="14" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".6" />
            <rect x="44" y="14" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".95" />
            <rect x="58" y="14" width="10" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".25" />
            <rect x="2" y="26" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".45" />
            <rect x="16" y="26" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <rect x="30" y="26" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".55" />
            <rect x="44" y="26" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".15" />
            <rect x="58" y="26" width="10" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".7" />
            <rect x="2" y="38" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".6" />
            <rect x="16" y="38" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".35" />
            <rect x="30" y="38" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".75" />
            <rect x="44" y="38" width="12" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".1" />
            <rect x="58" y="38" width="10" height="10" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".5" />
        </svg>

        <svg
            v-else-if="name === 'ChartSunburst'"
            viewBox="0 0 60 60"
            class="mp__radar"
        >
            <circle cx="30" cy="30" r="28" fill="none" stroke="var(--m-border, rgba(255,255,255,.08))" stroke-width="1" />
            <circle cx="30" cy="30" r="22" fill="none" stroke="var(--m-accent, #7c3aed)" stroke-width="10" stroke-dasharray="50 200" stroke-dashoffset="0" transform="rotate(-90 30 30)" opacity=".8" />
            <circle cx="30" cy="30" r="22" fill="none" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="10" stroke-dasharray="35 200" stroke-dashoffset="-50" transform="rotate(-90 30 30)" opacity=".6" />
            <circle cx="30" cy="30" r="22" fill="none" stroke="var(--m-success, #6ee7b7)" stroke-width="10" stroke-dasharray="54 200" stroke-dashoffset="-85" transform="rotate(-90 30 30)" opacity=".5" />
            <circle cx="30" cy="30" r="10" fill="none" stroke="var(--m-accent, #7c3aed)" stroke-width="8" stroke-dasharray="30 200" stroke-dashoffset="0" transform="rotate(-90 30 30)" opacity=".9" />
            <circle cx="30" cy="30" r="10" fill="none" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="8" stroke-dasharray="32 200" stroke-dashoffset="-30" transform="rotate(-90 30 30)" opacity=".65" />
        </svg>

        <svg
            v-else-if="name === 'ChartBoxPlot'"
            viewBox="0 0 100 50"
            class="mp__chart"
        >
            <line x1="18" y1="10" x2="18" y2="44" stroke="var(--m-accent, #7c3aed)" stroke-width="1.5" />
            <rect x="10" y="18" width="16" height="18" rx="1" fill="color-mix(in srgb, var(--m-accent, #7c3aed) 30%, transparent)" stroke="var(--m-accent, #7c3aed)" stroke-width="1.5" />
            <line x1="10" y1="26" x2="26" y2="26" stroke="var(--m-accent, #7c3aed)" stroke-width="2" />
            <line x1="50" y1="6" x2="50" y2="46" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="1.5" />
            <rect x="40" y="16" width="20" height="22" rx="1" fill="color-mix(in srgb, var(--m-accent-soft, #a78bfa) 30%, transparent)" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="1.5" />
            <line x1="40" y1="30" x2="60" y2="30" stroke="var(--m-accent-soft, #a78bfa)" stroke-width="2" />
            <line x1="82" y1="14" x2="82" y2="42" stroke="var(--m-accent, #7c3aed)" stroke-width="1.5" />
            <rect x="74" y="20" width="16" height="16" rx="1" fill="color-mix(in srgb, var(--m-accent, #7c3aed) 30%, transparent)" stroke="var(--m-accent, #7c3aed)" stroke-width="1.5" />
            <line x1="74" y1="28" x2="90" y2="28" stroke="var(--m-accent, #7c3aed)" stroke-width="2" />
        </svg>

        <div v-else-if="name === 'ChartPictorial'" class="mp__bars mp__bars--pictorial">
            <span v-for="(h, i) in BAR_HEIGHTS" :key="i" class="mp__bars-pictorial-col" :style="{ height: `${h}%` }">
                <OrigamIcon icon="mdi:account" :size="8" />
            </span>
        </div>

        <svg
            v-else-if="name === 'ChartCandlestick'"
            viewBox="0 0 100 50"
            class="mp__chart"
        >
            <line x1="12" y1="8" x2="12" y2="44" stroke="var(--m-success, #6ee7b7)" stroke-width="1" />
            <rect x="8" y="14" width="8" height="20" rx="1" fill="var(--m-success, #6ee7b7)" opacity=".8" />
            <line x1="28" y1="12" x2="28" y2="42" stroke="var(--m-danger, #f87171)" stroke-width="1" />
            <rect x="24" y="20" width="8" height="16" rx="1" fill="var(--m-danger, #f87171)" opacity=".8" />
            <line x1="44" y1="10" x2="44" y2="40" stroke="var(--m-success, #6ee7b7)" stroke-width="1" />
            <rect x="40" y="16" width="8" height="18" rx="1" fill="var(--m-success, #6ee7b7)" opacity=".8" />
            <line x1="60" y1="14" x2="60" y2="46" stroke="var(--m-danger, #f87171)" stroke-width="1" />
            <rect x="56" y="22" width="8" height="14" rx="1" fill="var(--m-danger, #f87171)" opacity=".8" />
            <line x1="76" y1="6" x2="76" y2="38" stroke="var(--m-success, #6ee7b7)" stroke-width="1" />
            <rect x="72" y="12" width="8" height="20" rx="1" fill="var(--m-success, #6ee7b7)" opacity=".8" />
            <line x1="92" y1="10" x2="92" y2="44" stroke="var(--m-danger, #f87171)" stroke-width="1" />
            <rect x="88" y="18" width="8" height="16" rx="1" fill="var(--m-danger, #f87171)" opacity=".8" />
        </svg>

        <svg
            v-else-if="name === 'ChartStreamgraph'"
            viewBox="0 0 100 50"
            class="mp__chart"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="mp-gs1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="var(--m-accent, #7c3aed)" stop-opacity=".7" />
                    <stop offset="1" stop-color="var(--m-accent, #7c3aed)" stop-opacity=".4" />
                </linearGradient>
                <linearGradient id="mp-gs2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="var(--m-accent-soft, #a78bfa)" stop-opacity=".6" />
                    <stop offset="1" stop-color="var(--m-accent-soft, #a78bfa)" stop-opacity=".3" />
                </linearGradient>
            </defs>
            <path d="M0,20 C25,16 50,10 75,14 C90,17 100,18 100,18 L100,32 C90,32 75,36 50,40 C25,44 0,38 0,38 Z" fill="url(#mp-gs1)" />
            <path d="M0,38 C25,34 50,30 75,32 C90,33 100,34 100,34 L100,44 C90,44 75,46 50,48 C25,50 0,46 0,46 Z" fill="url(#mp-gs2)" />
            <path d="M0,12 C25,10 50,8 75,10 C90,11 100,12 100,12 L100,20 C90,18 75,16 50,16 C25,16 0,18 0,20 Z" fill="var(--m-success, #6ee7b7)" opacity=".35" />
        </svg>

        <div v-else-if="name === 'ChartVariwide'" class="mp__bars mp__bars--variwide">
            <span :style="{ height: '70%', flex: '2', opacity: '0.9' }" />
            <span :style="{ height: '50%', flex: '1.2', opacity: '0.7' }" />
            <span :style="{ height: '85%', flex: '1.8', opacity: '0.8' }" />
            <span :style="{ height: '40%', flex: '0.9', opacity: '0.6' }" />
        </div>

        <svg
            v-else-if="name === 'ChartPolarBar'"
            viewBox="0 0 60 60"
            class="mp__radar"
        >
            <circle cx="30" cy="30" r="24" fill="none" stroke="var(--m-border, rgba(255,255,255,.08))" stroke-width="1" />
            <path d="M30,30 L54,30 A24,24 0 0 1 42,51.2 Z" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <path d="M30,30 L42,51.2 A24,24 0 0 1 8.6,42 Z" fill="var(--m-accent, #7c3aed)" opacity=".6" />
            <path d="M30,30 L8.6,42 A24,24 0 0 1 6,30 Z" fill="var(--m-accent, #7c3aed)" opacity=".4" />
            <path d="M30,30 L6,30 A24,24 0 0 1 30,6 Z" fill="var(--m-accent-soft, #a78bfa)" opacity=".65" />
            <path d="M30,30 L30,6 A24,24 0 0 1 54,30 Z" fill="var(--m-accent-soft, #a78bfa)" opacity=".45" />
            <circle cx="30" cy="30" r="4" fill="var(--m-bg, #0a0a0a)" />
        </svg>

        <svg
            v-else-if="name === 'ChartBullet'"
            viewBox="0 0 100 30"
            class="mp__bullet"
        >
            <rect x="2" y="8" width="96" height="14" rx="2" fill="var(--m-border, rgba(255,255,255,.06))" />
            <rect x="2" y="10" width="60" height="10" rx="1" fill="var(--m-border, rgba(255,255,255,.12))" />
            <rect x="2" y="11" width="72" height="8" rx="1" fill="var(--m-border, rgba(255,255,255,.08))" />
            <rect x="2" y="12" width="55" height="6" rx="1" fill="var(--m-accent, #7c3aed)" opacity=".85" />
            <line x1="75" y1="6" x2="75" y2="24" stroke="var(--m-text, #fafafa)" stroke-width="2" stroke-linecap="round" />
        </svg>

        <div v-else-if="name === 'ChartPareto'" class="mp__bars mp__bars--pareto">
            <span v-for="(h, i) in BAR_HEIGHTS" :key="i" :style="{ height: `${h}%`, opacity: 0.9 - i * 0.1 }" />
            <svg class="mp__bars-pareto-line" viewBox="0 0 60 50" preserveAspectRatio="none">
                <path
                    d="M5,40 L15,24 L25,16 L35,10 L45,7 L55,5"
                    stroke="var(--m-warning, #FBBF24)"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                />
            </svg>
        </div>

        <svg
            v-else-if="name === 'ChartMap'"
            viewBox="0 0 100 60"
            class="mp__chart"
        >
            <rect x="2" y="2" width="96" height="56" rx="4" fill="var(--m-surface-2, #171717)" stroke="var(--m-border, rgba(255,255,255,.08))" stroke-width="1" />
            <path d="M20,15 C30,10 45,12 50,20 C55,28 48,38 40,40 C32,42 18,38 16,28 C14,20 10,20 20,15 Z" fill="var(--m-accent, #7c3aed)" opacity=".6" />
            <path d="M55,18 C65,14 78,16 80,26 C82,36 72,42 64,40 C56,38 50,32 52,24 C54,18 48,20 55,18 Z" fill="var(--m-accent, #7c3aed)" opacity=".35" />
            <path d="M28,42 C34,38 42,42 44,48 C46,54 36,56 30,54 C24,52 22,46 28,42 Z" fill="var(--m-accent-soft, #a78bfa)" opacity=".5" />
        </svg>

        <svg
            v-else-if="name === 'ChartSparkline'"
            viewBox="0 0 100 20"
            class="mp__sparkline"
            preserveAspectRatio="none"
        >
            <path
                d="M0,14 L12,12 L24,10 L36,13 L48,6 L60,8 L72,4 L84,6 L100,2"
                stroke="var(--m-accent, #7c3aed)"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
            />
        </svg>

        <!-- ═════════════ EXPANSION / DETAIL ═════════════ -->

        <div v-else-if="name === 'ExpansionPanel'" class="mp__expansion">
            <div class="mp__expansion-row">
                <span>Section</span>
                <OrigamIcon icon="mdi:chevron-up" :size="11" />
            </div>
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--50" />
        </div>

        <!-- ═════════════ UTILS ═════════════ -->

        <div v-else-if="name === 'Divider'" class="mp__divider">
            <span />
            <span />
        </div>

        <div v-else-if="name === 'Blockquote'" class="mp__quote">
            <span class="mp__quote-bar" />
            <div class="mp__quote-body">
                <span>&ldquo;Great design is invisible.&rdquo;</span>
                <span class="mp__quote-author">— Origam</span>
            </div>
        </div>

        <div v-else-if="name === 'Icon'" class="mp__big-icon">
            <OrigamIcon icon="mdi:star" :size="32" />
        </div>

        <div v-else-if="name === 'Kbd'" class="mp__kbd-row">
            <span class="mp__kbd">⌘</span>
            <span>+</span>
            <span class="mp__kbd">K</span>
        </div>

        <div v-else-if="name === 'Code'" class="mp__code-block">
            <div class="mp__code-header">
                <span class="mp__code-lang">js</span>
                <span class="mp__code-copy"><OrigamIcon icon="mdi:content-copy" :size="9" /></span>
            </div>
            <div class="mp__code">const x = 42</div>
        </div>

        <div v-else-if="name === 'Transition'" class="mp__transition">
            <span class="mp__transition-from" />
            <OrigamIcon icon="mdi:arrow-right" :size="14" />
            <span class="mp__transition-to" />
        </div>

        <div v-else-if="name === 'Bracket'" class="mp__bracket-tree">
            <div class="mp__bracket-round">
                <div class="mp__bracket-match">
                    <span class="mp__bracket-name">Team A</span>
                    <span class="mp__bracket-score mp__bracket-score--win">2</span>
                </div>
                <div class="mp__bracket-match mp__bracket-match--dim">
                    <span class="mp__bracket-name">Team B</span>
                    <span class="mp__bracket-score">1</span>
                </div>
            </div>
            <span class="mp__bracket-connector" />
            <div class="mp__bracket-round">
                <div class="mp__bracket-match mp__bracket-match--final">
                    <span class="mp__bracket-name mp__bracket-name--winner">Team A</span>
                    <span class="mp__bracket-score mp__bracket-score--win">3</span>
                </div>
            </div>
        </div>

        <div v-else-if="name === 'Clipboard'" class="mp__clipboard">
            <OrigamIcon icon="mdi:content-copy" :size="14" />
            <span>Copy</span>
        </div>

        <div v-else-if="name === 'QrCode' || name === 'QRCode'" class="mp__qr">
            <span v-for="i in 16" :key="i" :class="{ 'mp__qr-on': QR_CELLS.includes(i - 1) }" />
        </div>

        <!-- ═════════════ UTILITIES (lazy / responsive / media) ═════════════ -->

        <div v-else-if="name === 'InfiniteScroll'" class="mp__infinitescroll">
            <div class="mp__infinitescroll-item" />
            <div class="mp__infinitescroll-item" />
            <div class="mp__infinitescroll-item mp__infinitescroll-item--dim" />
            <div class="mp__infinitescroll-loader"><span class="mp__loader"><span /></span></div>
        </div>

        <div v-else-if="name === 'Responsive'" class="mp__responsive-wrap">
            <div class="mp__responsive-inner">
                <span class="mp__responsive-ratio">16:9</span>
            </div>
        </div>

        <div v-else-if="name === 'Lazy'" class="mp__lazy">
            <span class="mp__lazy-bar" />
            <span class="mp__lazy-bar mp__lazy-bar--mid" />
            <span class="mp__lazy-icon"><OrigamIcon icon="mdi:image-filter-center-focus" :size="16" /></span>
        </div>

        <div v-else-if="name === 'Media'" class="mp__mediactl">
            <span class="mp__mediactl-play"><OrigamIcon icon="mdi:play" :size="10" /></span>
            <div class="mp__mediactl-track">
                <span class="mp__mediactl-fill" />
                <span class="mp__mediactl-thumb" />
            </div>
            <span class="mp__mediactl-time">0:42</span>
        </div>

        <!-- ═════════════ ABSTRACT / PROVIDER ═════════════ -->

        <div v-else-if="isProvider(name)" class="mp__provider">
            &lt;<span>{{ name }}</span> /&gt;
        </div>

        <!-- ═════════════ FALLBACK ═════════════ -->

        <div v-else class="mp__fallback">
            {{ name }}
        </div>
    </div>
</template>

<style scoped>
.mp {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    padding: 0.5rem;
    color: var(--m-text, var(--origam-color__text---primary, #fafafa));
    font-family: var(--m-font-body, var(--origam-font__family---sans, sans-serif));
}

.mp__row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex-wrap: wrap;
    justify-content: center;
}

.mp__row--tight { gap: 0.25rem; }

.mp__col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    inline-size: 80%;
    max-inline-size: 14rem;
}

.mp__spacer { flex: 1; }

/* ============== BTN ============== */
.mp__btn {
    padding: 6px 14px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff);
    font-size: 12px;
    font-weight: 600;
}

.mp__btn--full {
    text-align: center;
    width: 100%;
}

/* ============== INPUTS ============== */
.mp__input {
    inline-size: 80%;
    max-inline-size: 14rem;
    padding: 6px 10px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, var(--origam-color__surface---overlay, #171717));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255,255,255,.08)));
    font-size: 11px;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: space-between;
}

.mp__input-text {
    flex: 1;
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
}

.mp__mono {
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
}

.mp__input-caret {
    inline-size: 1px;
    block-size: 11px;
    background: var(--m-accent, #7c3aed);
    animation: mp-blink 1.1s steps(1) infinite;
}

@keyframes mp-blink { 50% { opacity: 0; } }

.mp__input--num .mp__num-spin {
    display: flex;
    flex-direction: column;
}

.mp__eye { color: var(--m-text-soft); }

.mp__strength {
    display: flex;
    gap: 3px;
    inline-size: 80%;
    max-inline-size: 14rem;
}

.mp__strength > span {
    flex: 1;
    block-size: 3px;
    border-radius: 1px;
    background: var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__strength > span.mp__strength-on {
    background: var(--m-success, #6ee7b7);
}

.mp__textarea {
    inline-size: 80%;
    max-inline-size: 14rem;
    padding: 8px;
    border-radius: var(--m-radius-sm, 6px);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    background: var(--m-surface-2, #171717);
}

/* ============== SWITCH / CHECK / RADIO ============== */
.mp__switch {
    position: relative;
    inline-size: 32px;
    block-size: 18px;
    border-radius: 9px;
    background: var(--m-border-strong, rgba(255, 255, 255, 0.16));
}

.mp__switch--on { background: var(--m-accent, #7c3aed); }

.mp__switch-thumb {
    position: absolute;
    inset-block-start: 2px;
    inset-inline-start: 2px;
    inline-size: 14px;
    block-size: 14px;
    border-radius: 50%;
    background: #fff;
}

.mp__switch--on .mp__switch-thumb {
    inset-inline-start: auto;
    inset-inline-end: 2px;
}

.mp__check {
    display: grid;
    place-items: center;
    inline-size: 18px;
    block-size: 18px;
    border-radius: var(--m-radius-sm, 6px);
    border: 1.5px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
    color: #fff;
}

.mp__check--on {
    background: var(--m-accent, #7c3aed);
    border-color: transparent;
}

.mp__radio {
    display: grid;
    place-items: center;
    inline-size: 18px;
    block-size: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
}

.mp__radio--on { border-color: var(--m-accent, #7c3aed); }

.mp__radio--on > span {
    inline-size: 8px;
    block-size: 8px;
    border-radius: 50%;
    background: var(--m-accent, #7c3aed);
}

/* ============== SLIDER ============== */
.mp__slider {
    position: relative;
    inline-size: 70%;
    max-inline-size: 10rem;
    block-size: 14px;
}

.mp__slider-track,
.mp__slider-fill {
    position: absolute;
    inset-block-start: 6px;
    block-size: 2px;
    border-radius: 1px;
}

.mp__slider-track { inset-inline: 0; background: var(--m-border, rgba(255, 255, 255, 0.08)); }

.mp__slider-fill { inset-inline-start: 0; inline-size: 40%; background: var(--m-accent, #7c3aed); }

.mp__slider-thumb {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: calc(40% - 7px);
    inline-size: 14px;
    block-size: 14px;
    border-radius: 50%;
    background: var(--m-accent, #7c3aed);
    border: 2px solid var(--m-bg, #0a0a0a);
}

/* ============== RATING ============== */
.mp__star { color: var(--m-text-dim, var(--origam-color__text---disabled, #525252)); }
.mp__star--on { color: var(--m-warning, #FBBF24); }

/* ============== COLOR PICKER ============== */
.mp__cp {
    inline-size: 6rem;
    block-size: 4rem;
    border-radius: var(--m-radius-sm, 6px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.mp__cp-saturation {
    flex: 1;
    background: linear-gradient(to right, #fff, #7c3aed), linear-gradient(to top, #000, transparent);
    background-blend-mode: multiply;
}

.mp__cp-hue {
    block-size: 8px;
    background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
}

.mp__cp-swatch {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 3px;
    background: #7C3AED;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

/* ============== CALENDAR ============== */
.mp__cal {
    inline-size: 6rem;
    padding: 0.375rem;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-family: var(--m-font-mono, monospace);
    font-size: 0.5625rem;
}

.mp__cal-head {
    text-align: center;
    font-weight: 700;
    color: var(--m-text, #fafafa);
    margin-block-end: 4px;
}

.mp__cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    text-align: center;
    color: var(--m-text-soft);
}

.mp__cal-day--on {
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff);
    border-radius: 2px;
}

/* ============== OTP ============== */
.mp__otp {
    inline-size: 18px;
    block-size: 22px;
    border-radius: 4px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    background: var(--m-surface-2, #171717);
    display: grid;
    place-items: center;
    font-family: var(--m-font-mono, monospace);
    font-size: 11px;
    color: var(--m-text, #fafafa);
}

/* ============== INLINE EDIT ============== */
.mp__inline {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: var(--m-radius-sm, 6px);
    border: 1px dashed var(--m-border-strong, rgba(255, 255, 255, 0.16));
    font-size: 11px;
    color: var(--m-text, #fafafa);
}

/* ============== FORM ============== */
.mp__form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    inline-size: 80%;
    max-inline-size: 12rem;
}

/* ============== CARD ============== */
.mp__card {
    inline-size: 80%;
    max-inline-size: 12rem;
    padding: 10px 12px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__skel {
    display: block;
    block-size: 4px;
    border-radius: 2px;
    background: var(--m-text-soft, #a3a3a3);
    opacity: 0.45;
    margin-block-end: 4px;
}

.mp__skel--title { inline-size: 55%; background: var(--m-text, #fafafa); opacity: 0.85; margin-block-end: 8px; }
.mp__skel--80 { inline-size: 80%; }
.mp__skel--60 { inline-size: 60%; }
.mp__skel--50 { inline-size: 50%; }
.mp__skel--40 { inline-size: 40%; }

/* ============== CHIP ============== */
.mp__chip {
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
}

.mp__chip--primary {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-accent-soft, #a78bfa);
}

.mp__chip--success {
    background: rgba(110, 231, 183, 0.18);
    color: var(--m-success, #6ee7b7);
}

/* ============== AVATAR ============== */
.mp__avatar {
    inline-size: 28px;
    block-size: 28px;
    border-radius: 50%;
    border: 2px solid var(--m-bg, #0a0a0a);
    display: grid;
    place-items: center;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
}

.mp__avatar--rest {
    background: var(--m-surface-2, #171717);
    color: var(--m-text-quiet, #737373);
    font-size: 9px;
    font-weight: 500;
    margin-inline-start: -8px;
}

/* ============== BADGE ============== */
.mp__badge-wrap { position: relative; }

.mp__badge-host {
    display: grid;
    place-items: center;
    inline-size: 36px;
    block-size: 36px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    color: var(--m-text-soft);
}

.mp__badge-dot {
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

/* ============== PROGRESS ============== */
.mp__progress {
    inline-size: 80%;
    max-inline-size: 14rem;
    block-size: 6px;
    border-radius: 3px;
    background: var(--m-border, rgba(255, 255, 255, 0.08));
    overflow: hidden;
}

.mp__progress > span {
    display: block;
    block-size: 100%;
    inline-size: 60%;
    background: var(--m-accent, #7c3aed);
}

/* ============== LIST ============== */
.mp__list {
    inline-size: 80%;
    max-inline-size: 12rem;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.mp__list-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 11px;
    color: var(--m-text-soft);
}

.mp__list-row--on {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-text);
}

.mp__bullet {
    inline-size: 12px;
    block-size: 12px;
    border-radius: 50%;
    background: var(--m-text-dim, #525252);
    flex-shrink: 0;
}

/* ============== TABLE ============== */
.mp__table {
    inline-size: 80%;
    max-inline-size: 14rem;
    font-size: 9px;
}

.mp__table-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-block-end: 3px;
    border-block-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    color: var(--m-text-quiet, #737373);
    font-family: var(--m-font-mono, monospace);
}

.mp__table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-block: 3px;
    border-block-end: 1px solid var(--m-border-soft, rgba(255, 255, 255, 0.04));
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__table-status { color: var(--m-success, #6ee7b7); }

/* ============== TIMELINE ============== */
.mp__timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__timeline-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.mp__timeline-dot {
    inline-size: 8px;
    block-size: 8px;
    border-radius: 50%;
    border: 2px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
}

.mp__timeline-dot--on {
    background: var(--m-accent, #7c3aed);
    border-color: var(--m-accent, #7c3aed);
}

/* ============== COUNTER ============== */
.mp__counter {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: var(--m-radius-sm, 6px);
    overflow: hidden;
}

.mp__counter-btn {
    padding: 4px 8px;
    background: var(--m-surface-2, #171717);
    color: var(--m-text, #fafafa);
    font-size: 12px;
    font-weight: 600;
}

.mp__counter-val {
    padding: 4px 10px;
    font-size: 12px;
    color: var(--m-text, #fafafa);
}

/* ============== STEPPER ============== */
.mp__stepper {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.mp__step {
    inline-size: 18px;
    block-size: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
    display: grid;
    place-items: center;
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__step--on {
    background: var(--m-accent, #7c3aed);
    border-color: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff);
}

.mp__step-line {
    inline-size: 14px;
    block-size: 2px;
    background: var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__big {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--m-text, #fafafa);
    font-family: var(--m-font-mono, monospace);
}

/* ============== ALERT ============== */
.mp__alert {
    inline-size: 80%;
    max-inline-size: 14rem;
    padding: 6px 10px;
    border-radius: 6px;
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    border: 1px solid var(--m-accent-border, color-mix(in srgb, #7c3aed 30%, transparent));
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 11px;
    color: var(--m-accent-soft, #a78bfa);
}

/* ============== SNACKBAR ============== */
.mp__snackbar {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    padding: 6px 12px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 11px;
    color: var(--m-text, #fafafa);
}

.mp__snackbar-action {
    color: var(--m-accent, #7c3aed);
    font-weight: 700;
}

/* ============== LOADER ============== */
.mp__loader {
    inline-size: 28px;
    block-size: 28px;
}

.mp__loader > span {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
    border: 3px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-top-color: var(--m-accent, #7c3aed);
    animation: mp-spin 0.8s linear infinite;
}

@keyframes mp-spin { to { transform: rotate(360deg); } }

/* ============== EMPTY ============== */
.mp__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--m-text-soft, #a3a3a3);
    font-size: 11px;
}

/* ============== LAYOUT (App / Layout / Main / Section / Masonry / etc) ============== */
.mp__app {
    inline-size: 80%;
    max-inline-size: 12rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.mp__app-bar,
.mp__app-body,
.mp__app-footer {
    background: var(--m-surface-2, #171717);
    border-radius: var(--m-radius-sm, 6px);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__app-bar { block-size: 10px; }
.mp__app-body { block-size: 32px; background: var(--m-bg, #0a0a0a); }
.mp__app-footer { block-size: 8px; }

.mp__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    inline-size: 60%;
    max-inline-size: 6rem;
}

.mp__grid > span {
    aspect-ratio: 1;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: 4px;
}

.mp__layout {
    inline-size: 80%;
    max-inline-size: 10rem;
    block-size: 4rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 4px;
}

.mp__layout-aside,
.mp__layout-main,
.mp__layout-top {
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
}

.mp__layout-aside--dim { opacity: 0.4; }

.mp__layout-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.mp__layout-top { block-size: 10px; }
.mp__layout-main { flex: 1; background: var(--m-bg, #0a0a0a); border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08)); }

.mp__sections {
    inline-size: 80%;
    max-inline-size: 12rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.mp__sections > span {
    block-size: 14px;
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
}

.mp__masonry {
    inline-size: 70%;
    max-inline-size: 8rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 14px;
    gap: 3px;
}

.mp__masonry > span {
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
}

.mp__masonry > span:nth-child(1) { grid-row: span 2; }
.mp__masonry > span:nth-child(3) { grid-row: span 3; }
.mp__masonry > span:nth-child(5) { grid-row: span 2; }

.mp__sheet {
    inline-size: 80%;
    max-inline-size: 12rem;
    padding: 8px 12px 10px;
    border-radius: 12px 12px 0 0;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-block-end: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.mp__sheet-grip {
    inline-size: 32px;
    block-size: 3px;
    border-radius: 2px;
    background: var(--m-text-dim, #525252);
    margin-block-end: 6px;
}

.mp__sheet > .mp__skel { align-self: stretch; }

.mp__drawer {
    inline-size: 80%;
    max-inline-size: 10rem;
    block-size: 4rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0;
}

.mp__drawer-aside {
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: 6px 0 0 6px;
}

.mp__drawer-bg {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0 6px 6px 0;
}

.mp__toolbar {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 8px;
    inline-size: 80%;
    max-inline-size: 12rem;
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
    font-size: 11px;
    color: var(--m-text, #fafafa);
}

.mp__sysbar {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    inline-size: 80%;
    max-inline-size: 12rem;
    background: var(--m-surface, #0e0e0e);
    border-radius: 999px;
    color: var(--m-text-soft);
    font-family: var(--m-font-mono, monospace);
    font-size: 9px;
}

.mp__watermark {
    position: relative;
    inline-size: 80%;
    max-inline-size: 12rem;
    padding: 8px;
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
}

.mp__watermark-tag {
    position: absolute;
    inset: 50% 0;
    text-align: center;
    transform: translateY(-50%) rotate(-12deg);
    font-size: 14px;
    font-weight: 800;
    color: var(--m-text-dim, #525252);
    opacity: 0.5;
    letter-spacing: 2px;
    pointer-events: none;
}

.mp__window {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 8px;
    border-radius: 6px;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-family: var(--m-font-mono, monospace);
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__win-dot {
    inline-size: 8px;
    block-size: 8px;
    border-radius: 50%;
    background: var(--m-text-dim);
}

.mp__win-dot:nth-child(1) { background: #FF5F57; }
.mp__win-dot:nth-child(2) { background: #FEBC2E; }
.mp__win-dot:nth-child(3) { background: #28C840; }

.mp__win-title { margin-inline-start: 6px; }

.mp__heading {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--m-text);
    letter-spacing: -0.02em;
}

/* ============== NAVIGATION ============== */
.mp__bnav {
    display: inline-flex;
    align-items: center;
    gap: 0;
    padding: 6px 8px;
    background: var(--m-surface-2, #171717);
    border-radius: 999px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__bnav-icon {
    inline-size: 26px;
    block-size: 24px;
    display: grid;
    place-items: center;
    color: var(--m-text-soft);
    border-radius: 12px;
}

.mp__bnav-icon--on {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-accent, #7c3aed);
}

.mp__bcrumb {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: var(--m-text-soft);
    font-family: var(--m-font-mono, monospace);
}

.mp__bcrumb-on { color: var(--m-text); font-weight: 600; }

.mp__pagi {
    display: inline-flex;
    align-items: center;
    gap: 3px;
}

.mp__pagi > span {
    inline-size: 20px;
    block-size: 20px;
    display: grid;
    place-items: center;
    font-size: 10px;
    border-radius: 4px;
    color: var(--m-text-soft);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__pagi-on {
    background: var(--m-accent, #7c3aed) !important;
    color: var(--m-accent-fg, #fff) !important;
    border-color: var(--m-accent, #7c3aed) !important;
    font-weight: 700;
}

.mp__tabs {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border-block-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    padding-block-end: 3px;
}

.mp__tabs > span {
    position: relative;
    font-size: 11px;
    color: var(--m-text-soft);
    padding-block-end: 3px;
}

.mp__tab--on {
    color: var(--m-text, #fafafa);
    font-weight: 600;
}

.mp__tab--on::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-end: -4px;
    block-size: 2px;
    background: var(--m-accent, #7c3aed);
    border-radius: 1px;
}

.mp__group {
    display: inline-flex;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: var(--m-radius-sm, 6px);
    overflow: hidden;
}

.mp__group > span {
    padding: 4px 10px;
    font-size: 10px;
    color: var(--m-text-soft);
    border-inline-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__group > span:last-child { border-inline-end: none; }

.mp__group-on {
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg, #fff) !important;
    font-weight: 600;
}

.mp__tree {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: var(--m-font-mono, monospace);
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__tree-row {
    display: flex;
    align-items: center;
    gap: 3px;
}

.mp__cmdp {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border-radius: 6px;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 10px;
    color: var(--m-text-soft);
    inline-size: 80%;
    max-inline-size: 12rem;
}

.mp__cmdp-placeholder { flex: 1; text-align: start; }

.mp__kbd {
    padding: 1px 5px;
    border-radius: 3px;
    background: var(--m-bg, #0a0a0a);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 9px;
    font-family: var(--m-font-mono, monospace);
    color: var(--m-text);
}

/* ============== MEDIA ============== */
.mp__audio {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    background: var(--m-surface-2, #171717);
    border-radius: 999px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__audio-play {
    inline-size: 18px;
    block-size: 18px;
    border-radius: 50%;
    background: var(--m-accent, #7c3aed);
    color: var(--m-accent-fg);
    display: grid;
    place-items: center;
}

.mp__audio-bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 1px;
    block-size: 16px;
}

.mp__audio-bars > span {
    inline-size: 2px;
    background: var(--m-accent, #7c3aed);
    border-radius: 1px;
}

.mp__video,
.mp__img {
    display: grid;
    place-items: center;
    inline-size: 3.5rem;
    block-size: 2.5rem;
    border-radius: 4px;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    color: var(--m-text-soft);
    position: relative;
}

.mp__video-play {
    inline-size: 22px;
    block-size: 22px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: grid;
    place-items: center;
}

.mp__carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.mp__carousel-frame {
    inline-size: 3rem;
    block-size: 2rem;
    border-radius: 4px;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__carousel-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
}

.mp__carousel-dots > span {
    inline-size: 5px;
    block-size: 5px;
    border-radius: 50%;
    background: var(--m-text-dim);
}

.mp__carousel-dots > span.mp__carousel-on {
    inline-size: 16px;
    border-radius: 3px;
    background: var(--m-accent, #7c3aed);
}

.mp__parallax {
    position: relative;
    inline-size: 4rem;
    block-size: 3rem;
}

.mp__parallax > span {
    position: absolute;
    border-radius: 4px;
}

.mp__parallax-back {
    inset: 8px 0 0 8px;
    inline-size: 70%;
    block-size: 70%;
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 20%, transparent));
}

.mp__parallax-mid {
    inset: 4px 4px 4px 4px;
    background: var(--m-accent-soft, #a78bfa);
    opacity: 0.5;
}

.mp__parallax-front {
    inset: 0 8px 8px 0;
    inline-size: 70%;
    block-size: 70%;
    background: var(--m-accent, #7c3aed);
}

.mp__slide { color: var(--m-text-soft); }

/* ============== OVERLAY / DIALOG / TOOLTIP / MENU ============== */
.mp__dialog {
    inline-size: 80%;
    max-inline-size: 12rem;
    padding: 10px;
    border-radius: var(--m-radius, 10px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    color: var(--m-text, #fafafa);
    font-size: 10px;
}

.mp__dialog-actions {
    display: flex;
    gap: 4px;
    justify-content: flex-end;
    margin-block-start: 6px;
}

.mp__dialog-actions > span {
    padding: 3px 7px;
    border-radius: 4px;
    background: var(--m-surface, #0e0e0e);
    font-size: 9px;
    color: var(--m-text-soft);
}

.mp__dialog-ok {
    background: var(--m-accent, #7c3aed) !important;
    color: var(--m-accent-fg, #fff) !important;
}

.mp__dialog-danger {
    background: var(--m-danger, #f87171) !important;
    color: #fff !important;
}

.mp__tooltip {
    position: relative;
    padding: 4px 10px;
    border-radius: 4px;
    background: var(--m-text, #fafafa);
    color: var(--m-bg, #0a0a0a);
    font-size: 11px;
    font-weight: 600;
}

.mp__tooltip-arrow {
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

.mp__menu {
    display: flex;
    flex-direction: column;
    inline-size: 70%;
    max-inline-size: 10rem;
    padding: 4px;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-size: 10px;
}

.mp__menu > span {
    padding: 4px 8px;
    border-radius: 4px;
    color: var(--m-text-soft);
}

.mp__menu-on {
    background: var(--m-accent-bg, color-mix(in srgb, #7c3aed 14%, transparent));
    color: var(--m-text, #fafafa) !important;
}

.mp__overlay {
    position: relative;
    inline-size: 80%;
    max-inline-size: 12rem;
    block-size: 4rem;
}

.mp__overlay-bg {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 4px;
}

.mp__overlay-card {
    position: absolute;
    inset: 25% 20%;
    background: var(--m-surface-2, #171717);
    border-radius: 4px;
}

/* ============== CHARTS ============== */
.mp__chart {
    inline-size: 70%;
    max-inline-size: 10rem;
    block-size: 3rem;
}

.mp__bars {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    block-size: 50px;
}

.mp__bars > span {
    inline-size: 8px;
    background: var(--m-accent, #7c3aed);
    border-radius: 2px 2px 0 0;
}

.mp__bars--col > span {
    inline-size: 10px;
}

.mp__bars--variwide {
    gap: 3px;
}

.mp__bars--variwide > span {
    inline-size: auto;
    background: var(--m-accent, #7c3aed);
    border-radius: 2px 2px 0 0;
}

.mp__bars--pareto {
    position: relative;
}

.mp__bars-pareto-line {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
}

.mp__bars--pictorial {
    gap: 5px;
}

.mp__bars-pictorial-col {
    inline-size: 10px;
    background: var(--m-accent, #7c3aed);
    border-radius: 2px 2px 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: var(--m-accent-fg, #fff);
    overflow: hidden;
}

.mp__donut {
    inline-size: 50px;
    block-size: 50px;
}

.mp__radar {
    inline-size: 60px;
    block-size: 60px;
}

.mp__gauge {
    inline-size: 70px;
    block-size: 50px;
}

.mp__pyramid {
    inline-size: 60px;
    block-size: 50px;
}

.mp__bullet {
    inline-size: 80%;
    max-inline-size: 12rem;
    block-size: 30px;
}

.mp__sparkline {
    inline-size: 80%;
    max-inline-size: 12rem;
    block-size: 20px;
}

/* ============== EXPANSION ============== */
.mp__expansion {
    inline-size: 80%;
    max-inline-size: 12rem;
    padding: 8px 10px;
    background: var(--m-surface-2, #171717);
    border-radius: var(--m-radius-sm, 6px);
}

.mp__expansion-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: var(--m-text);
    margin-block-end: 6px;
}

/* ============== DIVIDER ============== */
.mp__divider {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    inline-size: 80%;
    max-inline-size: 10rem;
    color: var(--m-text-quiet, #737373);
    font-size: 10px;
}

.mp__divider > span:first-child,
.mp__divider > span:last-child {
    flex: 1;
    block-size: 1px;
    background: var(--m-border, rgba(255, 255, 255, 0.08));
}

/* ============== QUOTE ============== */
.mp__quote { display:flex; gap:8px; align-items:flex-start; inline-size:80%; max-inline-size:12rem; }
.mp__quote-bar { inline-size:3px; align-self:stretch; border-radius:2px; background:var(--m-accent,#7c3aed); flex-shrink:0; }
.mp__quote-body { display:flex; flex-direction:column; gap:3px; }
.mp__quote-body > span:first-child { font-style:italic; font-size:11px; color:var(--m-text-soft); }
.mp__quote-author { font-size:9px; color:var(--m-text-dim); }

/* ============== ICON ============== */
.mp__big-icon { color: var(--m-accent, #7c3aed); }

/* ============== KBD ============== */
.mp__kbd-row {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--m-text-soft);
    font-size: 11px;
}

/* ============== CODE ============== */
.mp__code-block { inline-size:80%; max-inline-size:12rem; border-radius:var(--m-radius-sm,6px); border:1px solid var(--m-border,rgba(255,255,255,.08)); background:var(--m-surface,#0e0e0e); overflow:hidden; }
.mp__code-header { display:flex; justify-content:space-between; align-items:center; padding:3px 8px; border-block-end:1px solid var(--m-border,rgba(255,255,255,.08)); background:var(--m-surface-2,#171717); }
.mp__code-lang { font-family:var(--m-font-mono,monospace); font-size:8px; text-transform:uppercase; letter-spacing:.08em; color:var(--m-text-soft); }
.mp__code-copy { color:var(--m-text-soft); }
.mp__code {
    padding: 4px 8px;
    color: var(--m-accent-soft, #a78bfa);
    font-family: var(--m-font-mono, monospace);
    font-size: 10px;
}

/* ============== CONFIRM WRAPPER ============== */
.mp__confirm {
    display: flex;
    flex-direction: column;
    gap: 6px;
    inline-size: 80%;
    max-inline-size: 12rem;
}

.mp__confirm-input {
    inline-size: 100%;
    max-inline-size: none;
}

.mp__confirm-input--match {
    border-color: var(--m-success, #6ee7b7);
    color: var(--m-success, #6ee7b7);
}

.mp__confirm-input--match :deep(.origam-icon) {
    color: var(--m-success, #6ee7b7);
}

/* ============== BRACKET ============== */
.mp__bracket-tree { display:flex; align-items:center; gap:4px; }
.mp__bracket-round { display:flex; flex-direction:column; gap:3px; }
.mp__bracket-match { padding:3px 6px; border-radius:3px; background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); display:flex; justify-content:space-between; gap:6px; min-inline-size:52px; font-size:9px; }
.mp__bracket-match--dim { opacity:.45; }
.mp__bracket-match--final { border-color:var(--m-accent-border, var(--m-accent,#7c3aed)); }
.mp__bracket-name { color:var(--m-text-soft); flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.mp__bracket-name--winner { color:var(--m-text); font-weight:600; }
.mp__bracket-score { color:var(--m-text-dim); font-variant-numeric:tabular-nums; font-family:var(--m-font-mono,monospace); }
.mp__bracket-score--win { color:var(--m-accent); font-weight:700; }
.mp__bracket-connector { inline-size:6px; block-size:1px; background:var(--m-border,rgba(255,255,255,.08)); align-self:center; }

/* ============== CLIPBOARD ============== */
.mp__clipboard {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: 4px;
    color: var(--m-text-soft);
    font-size: 11px;
}

/* ============== QR ============== */
.mp__qr {
    display: grid;
    grid-template-columns: repeat(4, 7px);
    grid-template-rows: repeat(4, 7px);
    gap: 1px;
    padding: 4px;
    background: #fff;
    border-radius: 4px;
}

.mp__qr > span { background: transparent; }
.mp__qr > span.mp__qr-on { background: #000; }

/* ============== PROVIDER TAG ============== */
.mp__provider {
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--m-surface, #0e0e0e);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    font-family: var(--m-font-mono, monospace);
    font-size: 10px;
    color: var(--m-text-soft);
}

.mp__provider > span {
    color: var(--m-accent-soft, #a78bfa);
    font-weight: 600;
}

/* ============== FALLBACK ============== */
.mp__fallback {
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--m-surface-2, #171717);
    color: var(--m-text-soft);
    font-size: 10px;
}

.mp :deep(.origam-icon) {
    color: inherit;
}

/* ============== WINDOW (content switcher) ============== */
.mp__windowsw {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    inline-size: 80%;
}

.mp__windowsw-frame {
    inline-size: 100%;
    padding: 8px 10px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    border-radius: 6px;
    background: var(--m-surface, #0e0e0e);
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.mp__windowsw-dots {
    display: inline-flex;
    gap: 4px;
}

.mp__windowsw-dots > span {
    inline-size: 6px;
    block-size: 6px;
    border-radius: 999px;
    background: var(--m-border, rgba(255, 255, 255, 0.18));
}

.mp__windowsw-dots > span.mp__windowsw-on {
    background: var(--m-accent, #a78bfa);
    inline-size: 14px;
}

/* ============== TEXT MASK (gradient text) ============== */
.mp__textmask {
    font-family: var(--m-font-display, var(--m-font-sans, system-ui));
    font-weight: 800;
    font-size: 28px;
    letter-spacing: -0.02em;
    background: linear-gradient(
        135deg,
        var(--m-accent, #a78bfa) 0%,
        var(--m-accent-soft, #f472b6) 50%,
        var(--m-success, #6ee7b7) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
}

/* ============== AVATAR SOLO ============== */
.mp__avatar-solo {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.02em;
}

/* ============== LAYOUT: CONTAINER ============== */
.mp__container {
    inline-size: 80%;
    block-size: 32px;
    border: 1px dashed var(--m-border, rgba(255, 255, 255, 0.18));
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mp__container-inner {
    inline-size: 60%;
    block-size: 14px;
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 30%, transparent);
    border-radius: 2px;
}

/* ============== LAYOUT: ROW MOCK ============== */
.mp__rowmock {
    display: flex;
    flex-direction: row;
    gap: 4px;
    inline-size: 80%;
}

.mp__rowmock > span {
    flex: 1;
    block-size: 22px;
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 25%, transparent);
    border-radius: 3px;
}

/* ============== LAYOUT: COL MOCK ============== */
.mp__colmock {
    display: flex;
    flex-direction: column;
    gap: 3px;
    inline-size: 36%;
}

.mp__colmock > span {
    block-size: 8px;
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 25%, transparent);
    border-radius: 2px;
}

/* ============== LAYOUT: SPACER ============== */
.mp__spacermock {
    display: flex;
    align-items: center;
    gap: 6px;
    inline-size: 80%;
}

.mp__spacermock-box {
    inline-size: 16px;
    block-size: 16px;
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 35%, transparent);
    border-radius: 2px;
}

.mp__spacermock-fill {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-block: 1px dashed var(--m-border, rgba(255, 255, 255, 0.18));
    color: var(--m-text-soft);
    font-size: 10px;
    block-size: 1.25rem;
}

/* ============== BTN GROUP / TOGGLE ============== */
.mp__btngroup {
    display: inline-flex;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.18));
    border-radius: 6px;
    overflow: hidden;
    background: var(--m-surface, #0e0e0e);
}

.mp__btngroup > span {
    padding: 4px 8px;
    font-size: 11px;
    color: var(--m-text-soft);
    border-inline-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.12));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-inline-size: 1.75rem;
}

.mp__btngroup > span:last-child { border-inline-end: 0; }

.mp__btngroup > span.mp__btngroup-on {
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 25%, transparent);
    color: var(--m-text, #fff);
    font-weight: 600;
}

/* ============== CHIP BUTTON (Checkbox/RadioBtn) ============== */
.mp__chipbtn {
    padding: 3px 8px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.18));
    border-radius: 999px;
    background: transparent;
    color: var(--m-text-soft);
    font-size: 10px;
    font-weight: 500;
}

.mp__chipbtn--on {
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 28%, transparent);
    border-color: var(--m-accent, #a78bfa);
    color: var(--m-text, #fff);
    font-weight: 600;
}

/* ============== RADIO LABEL ============== */
.mp__radiolabel {
    font-size: 11px;
    color: var(--m-text, #fff);
}

.mp__radiolabel--off { color: var(--m-text-soft); }

/* ============== FIELD (label + outline + hint) ============== */
.mp__field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    inline-size: 80%;
    max-inline-size: 12rem;
}

.mp__field-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--m-text-soft);
    font-weight: 600;
}

.mp__field-control {
    padding: 6px 8px;
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.18));
    border-radius: 4px;
    background: var(--m-surface, #0e0e0e);
    display: flex;
    align-items: center;
}

.mp__field-hint {
    font-size: 9px;
    color: var(--m-text-soft);
}

.mp__field-hint--err {
    color: var(--m-danger, #f87171);
    display: inline-flex;
    align-items: center;
    gap: 3px;
}

.mp__input--err {
    border-color: var(--m-danger, #f87171);
}

/* ============== LABEL (standalone) ============== */
.mp__label {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    font-weight: 600;
    color: var(--m-text, #fff);
    font-size: 13px;
}

.mp__label-req {
    color: var(--m-danger, #f87171);
    font-weight: 700;
}

/* ============== COUNTER (char count display) ============== */
.mp__counter {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    font-family: var(--m-font-mono, monospace);
}

.mp__counter-val {
    font-size: 22px;
    font-weight: 700;
    color: var(--m-text, #fff);
    font-variant-numeric: tabular-nums;
}

.mp__counter-sep {
    font-size: 18px;
    color: var(--m-text-soft);
    font-weight: 300;
}

.mp__counter-max {
    font-size: 13px;
    color: var(--m-text-soft);
    font-variant-numeric: tabular-nums;
}

/* ============== PICKER (shell) ============== */
.mp__picker-shell { inline-size:80%; max-inline-size:10rem; border-radius:var(--m-radius,10px); background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); overflow:hidden; }
.mp__picker-shell-header { background:var(--m-accent-bg, color-mix(in srgb, var(--m-accent,#7c3aed) 22%, transparent)); padding:6px 8px; border-block-end:1px solid var(--m-border,rgba(255,255,255,.08)); }
.mp__picker-shell-title { font-size:9px; font-weight:700; color:var(--m-accent-soft, var(--m-accent,#a78bfa)); text-transform:uppercase; letter-spacing:.06em; }
.mp__picker-shell-body { padding:6px 8px; }
.mp__picker-shell-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3px; }
.mp__picker-shell-grid > span { block-size:10px; border-radius:3px; background:var(--m-surface,#0e0e0e); border:1px solid var(--m-border,rgba(255,255,255,.06)); }

.mp__picker-head {
    font-size: 10px;
    font-weight: 700;
    color: var(--m-text, #fff);
    padding-block-end: 2px;
    border-block-end: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__picker-actions {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-block-start: 2px;
}

.mp__picker-actions > span {
    font-size: 9px;
    color: var(--m-text-soft);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.mp__picker-actions > .mp__picker-ok {
    color: var(--m-accent, #a78bfa);
    font-weight: 700;
}

/* ============== SLIDE (slidegroup nav) ============== */
.mp__slidegroup { display:flex; align-items:center; gap:3px; inline-size:80%; max-inline-size:12rem; }
.mp__slidegroup-prev, .mp__slidegroup-next { flex-shrink:0; color:var(--m-text-soft); display:grid; place-items:center; }
.mp__slidegroup-track { display:flex; gap:4px; overflow:hidden; flex:1; }
.mp__slidegroup-item { flex-shrink:0; padding:3px 8px; border-radius:999px; border:1px solid var(--m-border,rgba(255,255,255,.18)); font-size:10px; color:var(--m-text-soft); }
.mp__slidegroup-item--on { background:color-mix(in srgb, var(--m-accent,#a78bfa) 28%, transparent); border-color:var(--m-accent,#a78bfa); color:var(--m-text,#fff); }

/* ============== DATALIST (dl rows) ============== */
.mp__dl {
    display: flex;
    flex-direction: column;
    gap: 2px;
    inline-size: 80%;
    font-size: 10px;
}

.mp__dl-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-block: 2px;
    border-block-end: 1px dashed var(--m-border, rgba(255, 255, 255, 0.08));
}

.mp__dl-row:last-child { border-block-end: 0; }

.mp__dl-key {
    color: var(--m-text-soft);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 8px;
    font-weight: 600;
}

.mp__dl-val {
    color: var(--m-text, #fff);
    font-weight: 600;
}

/* ============== TABLE (plain variant) ============== */
.mp__table--plain { inline-size: 70%; }

.mp__table-head--plain {
    grid-template-columns: 1fr 1fr;
}

.mp__table-row--plain {
    grid-template-columns: 1fr 1fr;
}

/* ============== CONTEXTUAL MENU ============== */
.mp__ctxmenu {
    display: inline-flex;
    align-items: flex-start;
    gap: 4px;
    color: var(--m-accent, #a78bfa);
}

.mp__menu--ctx {
    box-shadow: 0 4px 12px color-mix(in srgb, var(--m-accent, #7c3aed) 18%, transparent);
}

/* ============== DATEPICKER (popover wrapper) ============== */
.mp__datepick {
    display: inline-block;
    padding: 4px;
    border-radius: 6px;
    background: var(--m-surface-2, #171717);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.12));
    box-shadow: 0 6px 16px color-mix(in srgb, var(--m-accent, #7c3aed) 12%, transparent);
}

.mp__cal--popover {
    border: 0;
    background: transparent;
    padding: 0;
}

/* ============== WINDOW ITEM tag ============== */
.mp__windowsw-tag {
    align-self: flex-end;
    font-size: 9px;
    color: var(--m-text-soft);
    font-variant-numeric: tabular-nums;
}

/* ============== COL highlighted ============== */
.mp__colmock-on {
    background: var(--m-accent, #a78bfa) !important;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--m-accent, #a78bfa) 50%, transparent);
}

/* ============== ITEMGROUP wrapper ============== */
.mp__group {
    padding: 4px 6px;
    border: 1px dashed var(--m-border, rgba(255, 255, 255, 0.22));
    border-radius: 6px;
}

/* ============== CHART wrap with type hint ============== */
.mp__chartwrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    inline-size: 80%;
}

.mp__chartwrap-tag {
    font-size: 8px;
    color: var(--m-text-soft);
    letter-spacing: 0.02em;
}

/* ============== TRANSITION ============== */
.mp__transition {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--m-accent, #a78bfa);
}

.mp__transition-from,
.mp__transition-to {
    inline-size: 18px;
    block-size: 18px;
    border-radius: 4px;
}

.mp__transition-from {
    background: color-mix(in srgb, var(--m-accent, #a78bfa) 25%, transparent);
}

.mp__transition-to {
    background: var(--m-accent, #a78bfa);
}

/* ============== CALENDAR FULL ============== */
.mp__cal-full { inline-size:85%; max-inline-size:13rem; border-radius:var(--m-radius-sm,6px); background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); overflow:hidden; font-size:9px; }
.mp__cal-full-toolbar { display:flex; align-items:center; justify-content:space-between; padding:4px 6px 2px; border-block-end:1px solid var(--m-border,rgba(255,255,255,.08)); color:var(--m-text,#fafafa); font-weight:700; }
.mp__cal-full-nav { color:var(--m-text-soft); font-size:8px; }
.mp__cal-full-title { font-size:9px; }
.mp__cal-full-views { display:flex; border-block-end:1px solid var(--m-border,rgba(255,255,255,.08)); }
.mp__cal-full-view { padding:2px 5px; font-size:8px; color:var(--m-text-soft); border-inline-end:1px solid var(--m-border,rgba(255,255,255,.08)); }
.mp__cal-full-view--on { background:var(--m-accent-bg, color-mix(in srgb, var(--m-accent,#7c3aed) 18%, transparent)); color:var(--m-accent,#a78bfa); font-weight:600; }
.mp__cal-full-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:1px; text-align:center; padding:3px; color:var(--m-text-soft); font-family:var(--m-font-mono,monospace); }

/* ============== COUNTER INLINE ============== */
.mp__counter-inline { display:flex; justify-content:flex-end; font-size:10px; font-family:var(--m-font-mono,monospace); color:var(--m-text-soft); padding-inline-end:2px; }

/* ============== FIELD PREFIX / SUFFIX / SLOT ============== */
.mp__field-prefix, .mp__field-suffix { font-size:10px; color:var(--m-text-soft); padding-inline:3px; }
.mp__field-slot { flex:1; block-size:10px; background:var(--m-border,rgba(255,255,255,.08)); border-radius:2px; opacity:.5; }

/* ============== FILE FIELD ============== */
.mp__filefield { display:flex; flex-direction:column; gap:5px; inline-size:80%; max-inline-size:12rem; }
.mp__filefield-zone { display:flex; flex-direction:column; align-items:center; gap:3px; padding:8px 10px; border:1.5px dashed var(--m-border,rgba(255,255,255,.18)); border-radius:var(--m-radius-sm,6px); color:var(--m-text-soft); font-size:10px; }
.mp__filefield-hint { font-size:9px; color:var(--m-text-soft); }
.mp__filefield-item { display:flex; align-items:center; gap:4px; padding:4px 8px; border-radius:4px; background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); font-size:10px; color:var(--m-text-soft); }
.mp__filefield-name { flex:1; font-family:var(--m-font-mono,monospace); }
.mp__filefield-size { font-size:9px; opacity:.6; }

/* ============== CONTAINER MOCK ============== */
.mp__container-mock { display:flex; align-items:stretch; inline-size:80%; block-size:40px; }
.mp__container-rule { inline-size:6px; background:color-mix(in srgb, var(--m-accent,#a78bfa) 25%, transparent); flex-shrink:0; }
.mp__container-rule:first-child { border-radius:2px 0 0 2px; }
.mp__container-rule:last-child { border-radius:0 2px 2px 0; }
.mp__container-body { flex:1; display:flex; flex-direction:column; justify-content:center; gap:4px; padding-inline:8px; background:var(--m-surface-2,#171717); border-block:1px solid var(--m-border,rgba(255,255,255,.08)); }

/* ============== ROW MOCK ============== */
.mp__rowmock--row { padding:2px; border:1px solid color-mix(in srgb, var(--m-accent,#a78bfa) 30%, transparent); border-radius:3px; }
.mp__rowmock-col { flex:1; block-size:22px; background:color-mix(in srgb, var(--m-accent,#a78bfa) 20%, transparent); border-radius:2px; display:grid; place-items:center; font-size:8px; color:var(--m-text-soft); }

/* ============== COL MOCK (12-col grid) ============== */
.mp__colmock-grid { display:grid; grid-template-columns:repeat(12,1fr); gap:2px; inline-size:80%; }
.mp__colmock-grid > span { block-size:5px; background:color-mix(in srgb, var(--m-accent,#a78bfa) 18%, transparent); border-radius:1px; }
.mp__colmock-span { inline-size:80%; display:grid; grid-template-columns:repeat(12,1fr); gap:2px; margin-block-start:3px; }
.mp__colmock-span-bar { grid-column:span 8; background:var(--m-accent,#a78bfa); border-radius:2px; display:grid; place-items:center; font-size:8px; color:var(--m-accent-fg,#fff); padding-block:2px; }

/* ============== INPUT WRAP / STRUCT ============== */
.mp__input-wrap { display:flex; flex-direction:column; gap:3px; inline-size:80%; max-inline-size:14rem; }
.mp__input-struct { display:flex; align-items:center; gap:4px; }
.mp__input-main { flex:1; inline-size:auto; max-inline-size:none; }
.mp__input-prepend, .mp__input-append { color:var(--m-text-soft); display:grid; place-items:center; }

/* ============== ITEM GROUP ============== */
.mp__itemgroup { display:inline-flex; gap:4px; padding:4px; border:1px dashed var(--m-border,rgba(255,255,255,.22)); border-radius:6px; }
.mp__itemgroup-item { inline-size:24px; block-size:24px; border-radius:4px; background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); display:grid; place-items:center; font-size:10px; color:var(--m-text-soft); }
.mp__itemgroup-item--on { background:color-mix(in srgb, var(--m-accent,#a78bfa) 25%, transparent); border-color:var(--m-accent,#a78bfa); color:var(--m-text,#fff); font-weight:600; }

/* ============== SECTION STUB ============== */
.mp__section-stub { display:flex; flex-direction:column; gap:5px; inline-size:80%; max-inline-size:12rem; padding:8px 10px; border:1px dashed var(--m-border,rgba(255,255,255,.22)); border-radius:var(--m-radius-sm,6px); }
.mp__section-stub-label { font-family:var(--m-font-mono,monospace); font-size:8px; text-transform:uppercase; letter-spacing:.08em; color:var(--m-text-soft); margin-block-end:2px; }

/* ============== SHEET GENERIC ============== */
.mp__sheet-generic { inline-size:80%; max-inline-size:12rem; padding:10px 12px; border-radius:var(--m-radius,10px); background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); box-shadow:0 4px 16px rgba(0,0,0,.35); display:flex; flex-direction:column; gap:4px; }

/* ============== MAIN MOCK ============== */
.mp__main-mock { inline-size:80%; max-inline-size:12rem; display:flex; }
.mp__main-offset { inline-size:10px; background:var(--m-accent-bg, color-mix(in srgb, var(--m-accent,#7c3aed) 14%, transparent)); border-inline-end:2px dashed var(--m-accent,#7c3aed); flex-shrink:0; border-radius:2px 0 0 2px; }
.mp__main-content { flex:1; padding:8px 10px; background:var(--m-bg,#0a0a0a); border:1px solid var(--m-border,rgba(255,255,255,.08)); border-radius:0 4px 4px 0; display:flex; flex-direction:column; gap:5px; }

/* ============== INFINITE SCROLL ============== */
.mp__infinitescroll { display:flex; flex-direction:column; gap:3px; inline-size:80%; max-inline-size:12rem; overflow:hidden; border:1px solid var(--m-border,rgba(255,255,255,.08)); border-radius:var(--m-radius-sm,6px); padding:4px; }
.mp__infinitescroll-item { block-size:10px; background:var(--m-surface-2,#171717); border-radius:3px; }
.mp__infinitescroll-item--dim { opacity:.4; block-size:7px; }
.mp__infinitescroll-loader { display:flex; justify-content:center; padding-block:2px; }

/* ============== RESPONSIVE ============== */
.mp__responsive-wrap { inline-size:70%; max-inline-size:8rem; }
.mp__responsive-inner { aspect-ratio:16/9; background:var(--m-surface-2,#171717); border:1px dashed var(--m-border,rgba(255,255,255,.18)); border-radius:var(--m-radius-sm,6px); display:grid; place-items:center; }
.mp__responsive-ratio { font-family:var(--m-font-mono,monospace); font-size:9px; color:var(--m-text-soft); letter-spacing:.06em; }

/* ============== LAZY ============== */
.mp__lazy { position:relative; inline-size:80%; max-inline-size:10rem; block-size:3.5rem; border:1px dashed var(--m-border,rgba(255,255,255,.18)); border-radius:var(--m-radius-sm,6px); overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; gap:4px; padding:8px; }
.mp__lazy-bar { block-size:4px; inline-size:70%; border-radius:2px; background:var(--m-text-soft); opacity:.25; }
.mp__lazy-bar--mid { inline-size:50%; }
.mp__lazy-icon { position:absolute; inset:0; display:grid; place-items:center; color:var(--m-text-dim,#525252); opacity:.4; }

/* ============== MEDIA CTL ============== */
.mp__mediactl { display:inline-flex; align-items:center; gap:6px; padding:5px 8px; inline-size:80%; max-inline-size:12rem; background:var(--m-surface-2,#171717); border:1px solid var(--m-border,rgba(255,255,255,.08)); border-radius:999px; }
.mp__mediactl-play { inline-size:18px; block-size:18px; border-radius:50%; background:var(--m-accent,#7c3aed); color:var(--m-accent-fg,#fff); display:grid; place-items:center; flex-shrink:0; }
.mp__mediactl-track { flex:1; position:relative; block-size:3px; background:var(--m-border,rgba(255,255,255,.12)); border-radius:2px; }
.mp__mediactl-fill { position:absolute; inset-block:0; inset-inline-start:0; inline-size:35%; background:var(--m-accent,#7c3aed); border-radius:2px; }
.mp__mediactl-thumb { position:absolute; inset-block-start:-4px; inset-inline-start:calc(35% - 4px); inline-size:8px; block-size:8px; border-radius:50%; background:var(--m-text,#fafafa); }
.mp__mediactl-time { font-size:9px; font-family:var(--m-font-mono,monospace); color:var(--m-text-soft); flex-shrink:0; }
</style>
