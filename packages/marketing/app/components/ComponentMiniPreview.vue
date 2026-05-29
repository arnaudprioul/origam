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
const PROVIDER_TAGS = ['DefaultsProvider', 'ThemeProvider', 'ClientOnly', 'Lazy', 'Responsive', 'VirtualScroll', 'InfiniteScroll', 'Media']

function isProvider (n: string): boolean {
    return PROVIDER_TAGS.includes(n)
}
</script>

<template>
    <div class="mp" aria-hidden="true">
        <!-- ═════════════ FORMS / INPUTS ═════════════ -->

        <div v-if="name === 'Btn'" class="mp__btn">Click me</div>

        <div v-else-if="name === 'TextField' || name === 'Input' || name === 'Field' || name === 'Label'" class="mp__input">
            <span class="mp__input-text">arnaud@…</span>
            <span class="mp__input-caret" />
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

        <div v-else-if="name === 'Checkbox' || name === 'SelectionControl'" class="mp__row">
            <span v-for="(c, i) in CHECKBOX_STATES" :key="i" class="mp__check" :class="{ 'mp__check--on': c }">
                <OrigamIcon v-if="c" icon="mdi:check" :size="11" />
            </span>
        </div>

        <div v-else-if="name === 'Radio'" class="mp__row">
            <span class="mp__radio mp__radio--on"><span /></span>
            <span class="mp__radio" />
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

        <div v-else-if="name === 'DatePicker' || name === 'Calendar'" class="mp__cal">
            <div class="mp__cal-head">May</div>
            <div class="mp__cal-grid">
                <span v-for="d in CALENDAR_DAYS" :key="d" :class="{ 'mp__cal-day--on': d === 25 }">{{ d }}</span>
            </div>
        </div>

        <div v-else-if="name === 'DatePickerField'" class="mp__input">
            <OrigamIcon icon="mdi:calendar" :size="11" />
            <span class="mp__input-text">29/05/2026</span>
        </div>

        <div v-else-if="name === 'FileField'" class="mp__input">
            <OrigamIcon icon="mdi:paperclip" :size="11" />
            <span class="mp__input-text">report.pdf</span>
        </div>

        <div v-else-if="name === 'OtpInputField'" class="mp__row mp__row--tight">
            <span v-for="d in OTP_DIGITS" :key="d" class="mp__otp">{{ d }}</span>
        </div>

        <div v-else-if="name === 'InlineEdit'" class="mp__inline">
            <span>Edit me</span>
            <OrigamIcon icon="mdi:pencil-outline" :size="11" />
        </div>

        <div v-else-if="name === 'TextMask'" class="mp__input">
            <span class="mp__input-text mp__mono">__/__/____</span>
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

        <div v-else-if="name === 'Avatar'" class="mp__row">
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

        <div v-else-if="name === 'List' || name === 'DataList'" class="mp__list">
            <div v-for="(_, i) in 3" :key="i" class="mp__list-row" :class="{ 'mp__list-row--on': i === 0 }">
                <span class="mp__bullet" />
                <span>Item {{ i + 1 }}</span>
            </div>
        </div>

        <div v-else-if="name === 'DataTable' || name === 'Table'" class="mp__table">
            <div class="mp__table-head">
                <span>NAME</span><span>OWNER</span><span>STATUS</span>
            </div>
            <div v-for="i in TABLE_ROWS" :key="i" class="mp__table-row">
                <span>Item {{ i }}</span><span>Léa</span><span class="mp__table-status">● Live</span>
            </div>
        </div>

        <div v-else-if="name === 'Timeline'" class="mp__timeline">
            <div v-for="(s, i) in TIMELINE_STEPS" :key="i" class="mp__timeline-row">
                <span class="mp__timeline-dot" :class="{ 'mp__timeline-dot--on': s.active }" />
                <span>{{ s.label }}</span>
            </div>
        </div>

        <div v-else-if="name === 'Counter'" class="mp__counter">
            <span class="mp__counter-btn">−</span>
            <span class="mp__counter-val">5</span>
            <span class="mp__counter-btn">+</span>
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

        <div v-else-if="name === 'Snackbar' || name === 'Messages'" class="mp__snackbar">
            <span>Saved</span>
            <span class="mp__snackbar-action">UNDO</span>
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

        <div v-else-if="name === 'Grid' || name === 'Grids'" class="mp__grid">
            <span /><span /><span /><span />
        </div>

        <div v-else-if="name === 'Layout'" class="mp__layout">
            <span class="mp__layout-aside" />
            <div class="mp__layout-content">
                <span class="mp__layout-top" />
                <span class="mp__layout-main" />
            </div>
        </div>

        <div v-else-if="name === 'Main'" class="mp__layout">
            <span class="mp__layout-aside mp__layout-aside--dim" />
            <span class="mp__layout-main" />
        </div>

        <div v-else-if="name === 'Section'" class="mp__sections">
            <span /><span /><span />
        </div>

        <div v-else-if="name === 'Masonry'" class="mp__masonry">
            <span /><span /><span /><span /><span /><span />
        </div>

        <div v-else-if="name === 'Sheet'" class="mp__sheet">
            <span class="mp__sheet-grip" />
            <span class="mp__skel mp__skel--80" />
            <span class="mp__skel mp__skel--60" />
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

        <div v-else-if="name === 'Window'" class="mp__window">
            <span class="mp__win-dot" />
            <span class="mp__win-dot" />
            <span class="mp__win-dot" />
            <span class="mp__win-title">App.vue</span>
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

        <div v-else-if="name === 'ItemGroup'" class="mp__group">
            <span>A</span>
            <span class="mp__group-on">B</span>
            <span>C</span>
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

        <div v-else-if="name === 'Picker'" class="mp__input">
            <span class="mp__input-text">Pick…</span>
            <OrigamIcon icon="mdi:menu-down" :size="11" />
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

        <div v-else-if="name === 'Slide'" class="mp__slide">
            <OrigamIcon icon="mdi:gesture-swipe-horizontal" :size="22" />
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

        <div v-else-if="name === 'Menu' || name === 'ContextualMenu'" class="mp__menu">
            <span>Open</span>
            <span>Rename</span>
            <span class="mp__menu-on">Delete</span>
        </div>

        <div v-else-if="name === 'Overlay'" class="mp__overlay">
            <span class="mp__overlay-bg" />
            <span class="mp__overlay-card" />
        </div>

        <div v-else-if="name === 'ConfirmWrapper'" class="mp__dialog">
            <span class="mp__skel mp__skel--title" />
            <span>Are you sure?</span>
            <div class="mp__dialog-actions">
                <span>No</span>
                <span class="mp__dialog-danger">Delete</span>
            </div>
        </div>

        <!-- ═════════════ CHARTS ═════════════ -->

        <svg
            v-else-if="name === 'Chart' || name === 'ChartLine'"
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
            <span>or</span>
            <span />
        </div>

        <div v-else-if="name === 'Blockquote'" class="mp__quote">
            <span>“The Vue 3 DS”</span>
        </div>

        <div v-else-if="name === 'Icon'" class="mp__big-icon">
            <OrigamIcon icon="mdi:star" :size="32" />
        </div>

        <div v-else-if="name === 'Kbd'" class="mp__kbd-row">
            <span class="mp__kbd">⌘</span>
            <span>+</span>
            <span class="mp__kbd">K</span>
        </div>

        <div v-else-if="name === 'Code'" class="mp__code">
            const x = 42
        </div>

        <div v-else-if="name === 'Bracket'" class="mp__bracket">
            <span>[</span>
            <OrigamIcon icon="mdi:dots-horizontal" :size="14" />
            <span>]</span>
        </div>

        <div v-else-if="name === 'Clipboard'" class="mp__clipboard">
            <OrigamIcon icon="mdi:content-copy" :size="14" />
            <span>Copy</span>
        </div>

        <div v-else-if="name === 'QRCode'" class="mp__qr">
            <span v-for="i in 16" :key="i" :class="{ 'mp__qr-on': QR_CELLS.includes(i - 1) }" />
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

.mp__donut {
    inline-size: 50px;
    block-size: 50px;
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
.mp__quote {
    padding-inline-start: 8px;
    border-inline-start: 3px solid var(--m-accent, #7c3aed);
    color: var(--m-text-soft);
    font-style: italic;
    font-size: 11px;
}

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
.mp__code {
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--m-surface, #0e0e0e);
    border: 1px solid var(--m-border, rgba(255, 255, 255, 0.08));
    color: var(--m-accent-soft, #a78bfa);
    font-family: var(--m-font-mono, monospace);
    font-size: 10px;
}

/* ============== BRACKET ============== */
.mp__bracket {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--m-font-mono, monospace);
    font-size: 16px;
    color: var(--m-accent-soft, #a78bfa);
}

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
</style>
