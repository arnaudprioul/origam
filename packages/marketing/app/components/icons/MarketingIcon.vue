<script setup lang="ts">
interface Props {
    name: string
    size?: number
    color?: string
    stroke?: number
    fill?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: 'currentColor',
    stroke: 1.6,
    fill: 'none'
})

const ICONS: Record<string, string> = {
    logo: '',
    search: '<circle cx="11" cy="11" r="7" /><path d="M21 21 L16 16" />',
    'arrow-right': '<path d="M5 12 H19 M13 6 L19 12 L13 18" />',
    check: '<path d="M5 12 L10 17 L19 7" />',
    x: '<path d="M6 6 L18 18 M6 18 L18 6" />',
    'chevron-down': '<path d="M6 9 L12 15 L18 9" />',
    'chevron-right': '<path d="M9 6 L15 12 L9 18" />',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15 V5 a2 2 0 0 1 2 -2 h10" />',
    external: '<path d="M10 4 H4 V20 H20 V14 M15 4 H20 V9 M20 4 L11 13" />',
    command: '<path d="M9 6 H15 V18 H9 Z M3 6 a3 3 0 1 1 6 0 V18 a3 3 0 1 1 -6 0 Z M21 6 a3 3 0 1 0 -6 0 V18 a3 3 0 1 0 6 0 Z" />',
    code: '<path d="M8 8 L4 12 L8 16 M16 8 L20 12 L16 16 M14 4 L10 20" />',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9 L11 12 L7 15 M13 16 H17" />',
    play: '<path d="M7 5 L19 12 L7 19 Z" />',
    share: '<circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11 L16 7 M8 13 L16 17" />',
    settings: '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />',
    moon: '<path d="M21 12.79 A9 9 0 1 1 11.21 3 a7 7 0 0 0 9.79 9.79 Z" />',
    sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41" />',
    paint: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2 a10 10 0 0 0 0 20 c1.5 0 2.5-1 2.5-2.5 c0-.7-.3-1.3-.8-1.7 c-.4-.4-.7-1-.7-1.6 c0-1.2 1-2.2 2.2-2.2 H17 a5 5 0 0 0 5-5 c0-5-4.5-7-10-7 Z" />',
    chart: '<path d="M3 3 V21 H21 M7 16 L11 11 L14 14 L20 7" /><circle cx="7" cy="16" r="1" fill="currentColor" /><circle cx="11" cy="11" r="1" fill="currentColor" /><circle cx="14" cy="14" r="1" fill="currentColor" /><circle cx="20" cy="7" r="1" fill="currentColor" />',
    shield: '<path d="M12 2 L4 5 V12 c0 5 4 9 8 10 c4-1 8-5 8-10 V5 L12 2 Z M9 12 L11 14 L15 10" />',
    layers: '<path d="M12 2 L2 8 L12 14 L22 8 L12 2 Z M2 14 L12 20 L22 14 M2 18 L12 24 L22 18" />',
    type: '<path d="M4 7 V4 H20 V7 M12 4 V20 M9 20 H15" />',
    bolt: '<path d="M13 2 L4 14 H12 L11 22 L20 10 H12 L13 2 Z" />',
    dna: '<path d="M4 3 c4 4 12 4 16 0 M4 21 c4-4 12-4 16 0 M5 8 H19 M5 16 H19 M9 5 V19 M15 5 V19" />',
    box: '<path d="M21 8 L12 13 L3 8 L12 3 L21 8 Z M21 8 V16 L12 21 L3 16 V8" />',
    star: '<path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2 Z" />',
    'star-fill': '<path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2 Z" />',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />',
    rocket: '<path d="M4.5 16.5 c-1.5 1.5 -2 5 -2 5 s3.5-.5 5-2 c.85-.85 1.4-2 1.4-3.18 a3.18 3.18 0 0 0-3.18-3.18 c-1.18 0-2.33 .55-3.18 1.4 Z M14.5 7.5 c-1.5 0-3 1.5-3 3 v2 H9 v3 c0 .5 .5 1 1 1 h3 v2 h2 v-2 c.5 0 1 -.5 1-1 h3 v-3 h-2.5 v-2 c0-1.5-1.5-3-3-3 Z M16 8 a2 2 0 1 0 0 4 a2 2 0 0 0 0-4" />',
    sparkles: '<path d="M12 3 L13.5 8.5 L19 10 L13.5 11.5 L12 17 L10.5 11.5 L5 10 L10.5 8.5 L12 3 Z M19 14 L19.7 16 L21.7 16.7 L19.7 17.4 L19 19.4 L18.3 17.4 L16.3 16.7 L18.3 16 L19 14 Z" />',
    github: '<path d="M12 0 C5.37 0 0 5.37 0 12 c0 5.3 3.44 9.8 8.21 11.4 c.6.11 .82-.26 .82-.58 v-2 c-3.34 .73-4.04-1.61-4.04-1.61 C4.42 18 3.65 17.65 3.65 17.65 c-1.09-.74 .08-.73 .08-.73 c1.2 .08 1.84 1.24 1.84 1.24 c1.07 1.83 2.8 1.3 3.49 1 c.11-.78 .42-1.3 .76-1.6 c-2.66-.3-5.47-1.33-5.47-5.93 c0-1.31 .47-2.38 1.24-3.22 c-.13-.31-.54-1.53 .12-3.18 c0 0 1-.32 3.3 1.23 c.96-.27 1.98-.4 3-.4 c1.02 0 2.04 .14 3 .4 c2.29-1.55 3.3-1.23 3.3-1.23 c.66 1.65 .25 2.87 .12 3.18 c.77 .84 1.24 1.91 1.24 3.22 c0 4.61-2.81 5.62-5.48 5.92 c.43 .37 .82 1.1 .82 2.22 v3.29 c0 .32 .22 .69 .82 .58 C20.56 21.79 24 17.3 24 12 c0-6.63-5.37-12-12-12 Z" />',
    npm: '<path d="M0 7 H24 V17 H12 V19 H8 V17 H0 V7 Z M2 9 V15 H4 V11 H6 V15 H8 V9 Z M10 9 V17 H14 V15 H16 V9 Z M14 11 H16 V13 H14 Z M18 9 V15 H20 V11 H22 V15 H24 V11 H22 V9 Z" />',
    vue: '<path d="M19.197 0H23l-11 19L1 0h8.4L12 4.5 14.6 0h4.597zm-4.998 0L12 3.5 9.799 0H6L12 10 18 0h-3.801z" />',
    'window-dots': '',
    dot: '',
    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />',
    discord: '<path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />'
}

const isFilled = computed(() => ['star-fill', 'play', 'github', 'npm', 'vue', 'twitter', 'discord'].includes(props.name))
const isLogo = computed(() => props.name === 'logo')
const isWindowDots = computed(() => props.name === 'window-dots')
const isDot = computed(() => props.name === 'dot')
const innerPath = computed(() => ICONS[props.name] ?? '')
</script>

<template>
    <span
        v-if="isDot"
        class="mkt-icon-dot"
        :style="{ width: `${size}px`, height: `${size}px`, background: color }"
        aria-hidden="true"
    />

    <span
        v-else-if="isWindowDots"
        class="mkt-icon-window-dots"
        aria-hidden="true"
    >
        <span class="mkt-icon-window-dots__red" />
        <span class="mkt-icon-window-dots__yellow" />
        <span class="mkt-icon-window-dots__green" />
    </span>

    <svg
        v-else-if="isLogo"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        class="mkt-icon"
    >
        <path d="M3 12 L12 3 L21 12 L12 21 Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        <path d="M3 12 L21 12 M12 3 L12 21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" opacity=".5" />
        <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>

    <svg
        v-else
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :fill="isFilled ? color : fill"
        :stroke="isFilled ? 'none' : color"
        :stroke-width="stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="mkt-icon"
        v-html="innerPath"
    />
</template>

<style scoped>
.mkt-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
}

.mkt-icon-dot {
    display: inline-block;
    border-radius: var(--origam-radius---full, 9999px);
    flex-shrink: 0;
}

.mkt-icon-window-dots {
    display: flex;
    gap: 6px;
    align-items: center;
}

.mkt-icon-window-dots__red,
.mkt-icon-window-dots__yellow,
.mkt-icon-window-dots__green {
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: var(--origam-radius---full, 9999px);
}

.mkt-icon-window-dots__red { background: #FF5F57; }
.mkt-icon-window-dots__yellow { background: #FEBC2E; }
.mkt-icon-window-dots__green { background: #28C840; }
</style>
