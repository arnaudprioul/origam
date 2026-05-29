<script setup lang="ts">
/*
 * Real-DS mini stand-ins for the Components catalog grid.
 *
 * Each tile renders the ACTUAL OrigamX component (OrigamBtn,
 * OrigamSwitch, OrigamChip, OrigamAvatar, OrigamAlert, OrigamBadge,
 * Chart*) with realistic but minimal config. That way:
 *   - what you see in the tile = what you'll see in the doc
 *   - design tokens (color/theme/density) propagate naturally
 *   - we don't have to maintain 96 hand-rolled HTML mocks
 *
 * For modal/portal components (Dialog, Snackbar, Tooltip, Menu) the
 * tile shows a static skeleton because mounting an open dialog inside
 * every grid card would block the page (focus trap, scrim, …).
 *
 * Default fallback (when we don't have a dedicated preview): render
 * the component name in an OrigamChip, so each tile still picks up
 * the active theme tokens.
 */

defineProps<{
    name: string
}>()

const CHART_LINE_DATA = [
    { name: 'series', data: [
        { x: 'A', y: 30 }, { x: 'B', y: 28 }, { x: 'C', y: 38 },
        { x: 'D', y: 50 }, { x: 'E', y: 48 }, { x: 'F', y: 62 }
    ] }
]
const CHART_BAR_DATA = [
    { name: 'series', data: [
        { x: 'A', y: 30 }, { x: 'B', y: 55 }, { x: 'C', y: 40 },
        { x: 'D', y: 70 }, { x: 'E', y: 50 }, { x: 'F', y: 80 }
    ] }
]
const CHART_DONUT_DATA = [
    { x: 'A', y: 70 },
    { x: 'B', y: 30 }
]

const AVATAR_ITEMS = [
    { text: 'A', color: 'primary' },
    { text: 'L', color: 'success' },
    { text: 'J', color: 'warning' },
    { text: 'M', color: 'danger' }
] as const
</script>

<template>
    <div class="mini-preview" aria-hidden="true">
        <!-- ============ Inputs ============ -->

        <OrigamBtn
            v-if="name === 'Btn'"
            color="primary"
            variant="flat"
            rounded="md"
            size="sm"
            density="compact"
        >
            Click me
        </OrigamBtn>

        <OrigamTextField
            v-else-if="name === 'TextField'"
            model-value=""
            variant="outlined"
            density="compact"
            placeholder="arnaud@…"
            class="mini-preview__field"
        />

        <OrigamTextField
            v-else-if="name === 'PasswordField'"
            model-value="hunter22"
            type="password"
            variant="outlined"
            density="compact"
            class="mini-preview__field"
        />

        <OrigamSelect
            v-else-if="name === 'Select'"
            model-value="fr"
            :items="[{ title: 'France', value: 'fr' }, { title: 'Spain', value: 'es' }]"
            item-title="title"
            item-value="value"
            variant="outlined"
            density="compact"
            class="mini-preview__field"
        />

        <OrigamTextField
            v-else-if="name === 'NumberField'"
            model-value="42"
            type="number"
            variant="outlined"
            density="compact"
            class="mini-preview__field"
        />

        <OrigamTextField
            v-else-if="name === 'Textarea' || name === 'TextArea'"
            model-value="Notes…"
            variant="outlined"
            density="compact"
            class="mini-preview__field"
        />

        <div v-else-if="name === 'Switch'" class="mini-preview__row">
            <OrigamSwitch :model-value="false" density="compact" />
            <OrigamSwitch :model-value="true" color="primary" density="compact" />
        </div>

        <div v-else-if="name === 'Checkbox'" class="mini-preview__row">
            <OrigamCheckbox :model-value="true" color="primary" density="compact" />
            <OrigamCheckbox :model-value="false" density="compact" />
            <OrigamCheckbox :model-value="true" color="primary" density="compact" />
        </div>

        <div v-else-if="name === 'Radio'" class="mini-preview__row">
            <OrigamRadio :model-value="true" color="primary" density="compact" />
            <OrigamRadio :model-value="false" density="compact" />
        </div>

        <OrigamSlider
            v-else-if="name === 'Slider'"
            model-value="40"
            color="primary"
            class="mini-preview__field"
        />

        <!-- ============ Display / surfaces ============ -->

        <OrigamCard
            v-else-if="name === 'Card'"
            :elevation="1"
            rounded="md"
            class="mini-preview__card"
        >
            <OrigamCardText>
                <span class="mini-preview__skel mini-preview__skel--title" />
                <span class="mini-preview__skel mini-preview__skel--80" />
                <span class="mini-preview__skel mini-preview__skel--50" />
            </OrigamCardText>
        </OrigamCard>

        <div v-else-if="name === 'Chip'" class="mini-preview__row">
            <OrigamChip color="primary" variant="tonal" size="sm">Primary</OrigamChip>
            <OrigamChip color="success" variant="tonal" size="sm">Success</OrigamChip>
        </div>

        <OrigamAvatar
            v-else-if="name === 'Avatar'"
            text="AP"
            color="primary"
        />

        <OrigamAvatarGroup
            v-else-if="name === 'AvatarGroup'"
            :items="AVATAR_ITEMS"
            size="sm"
        />

        <OrigamBadge
            v-else-if="name === 'Badge'"
            content="3"
            color="danger"
        >
            <OrigamAvatar color="primary" text="A" size="default" />
        </OrigamBadge>

        <OrigamAlert
            v-else-if="name === 'Alert'"
            type="info"
            variant="tonal"
            rounded="sm"
            density="compact"
            class="mini-preview__alert"
        >
            Heads up!
        </OrigamAlert>

        <OrigamProgressLinear
            v-else-if="name === 'ProgressLinear' || name === 'Progress'"
            :model-value="60"
            color="primary"
            class="mini-preview__field"
        />

        <OrigamProgressCircular
            v-else-if="name === 'ProgressCircular'"
            :model-value="60"
            color="primary"
        />

        <OrigamRating
            v-else-if="name === 'Rating'"
            :model-value="3"
            color="warning"
            density="compact"
        />

        <OrigamSkeleton
            v-else-if="name === 'Skeleton'"
            class="mini-preview__field"
        />

        <OrigamDivider
            v-else-if="name === 'Divider'"
            class="mini-preview__field"
        />

        <OrigamIcon
            v-else-if="name === 'Icon'"
            icon="mdi:star"
            color="primary"
            :size="32"
        />

        <OrigamKbd v-else-if="name === 'Kbd'">
            ⌘ + K
        </OrigamKbd>

        <OrigamCode v-else-if="name === 'Code'">
            origam
        </OrigamCode>

        <OrigamBlockquote
            v-else-if="name === 'Blockquote'"
            class="mini-preview__quote"
        >
            Quote
        </OrigamBlockquote>

        <!-- ============ Navigation ============ -->

        <div v-else-if="name === 'Breadcrumb'" class="mini-preview__bcrumb">
            <span>Home</span><span>/</span><span>Docs</span>
        </div>

        <OrigamPagination
            v-else-if="name === 'Pagination'"
            :model-value="2"
            :length="5"
            density="compact"
        />

        <OrigamTabs
            v-else-if="name === 'Tabs'"
            model-value="one"
            density="compact"
            class="mini-preview__field"
        >
            <OrigamTab value="one">One</OrigamTab>
            <OrigamTab value="two">Two</OrigamTab>
        </OrigamTabs>

        <!-- ============ Data ============ -->

        <OrigamList
            v-else-if="name === 'List'"
            density="compact"
            class="mini-preview__list"
        >
            <OrigamListItem :active="true" color="primary">Item 1</OrigamListItem>
            <OrigamListItem>Item 2</OrigamListItem>
            <OrigamListItem>Item 3</OrigamListItem>
        </OrigamList>

        <OrigamDataTable
            v-else-if="name === 'DataTable'"
            density="compact"
            :headers="[{ title: 'Name', key: 'n' }, { title: 'Owner', key: 'o' }]"
            :items="[
                { n: 'Item 1', o: 'Léa' },
                { n: 'Item 2', o: 'Jade' }
            ]"
            class="mini-preview__table"
        />

        <!-- ============ Charts ============ -->

        <OrigamChartLine
            v-else-if="name === 'ChartLine'"
            :series="CHART_LINE_DATA"
            color="primary"
            class="mini-preview__chart"
        />

        <OrigamChartArea
            v-else-if="name === 'ChartArea'"
            :series="CHART_LINE_DATA"
            color="primary"
            class="mini-preview__chart"
        />

        <OrigamChartBar
            v-else-if="name === 'ChartBar'"
            :series="CHART_BAR_DATA"
            color="primary"
            class="mini-preview__chart"
        />

        <OrigamChartDonut
            v-else-if="name === 'ChartDonut'"
            :series="CHART_DONUT_DATA"
            color="primary"
            class="mini-preview__chart"
        />

        <!-- ============ Modal-ish (static facsimile) ============ -->

        <OrigamCard
            v-else-if="name === 'Dialog'"
            :elevation="2"
            rounded="md"
            class="mini-preview__card mini-preview__card--dialog"
        >
            <OrigamCardText>
                <span class="mini-preview__skel mini-preview__skel--title" />
                <span class="mini-preview__skel mini-preview__skel--80" />
                <div class="mini-preview__dialog-actions">
                    <OrigamBtn variant="text" size="xs">Cancel</OrigamBtn>
                    <OrigamBtn color="primary" variant="flat" size="xs">OK</OrigamBtn>
                </div>
            </OrigamCardText>
        </OrigamCard>

        <OrigamCard
            v-else-if="name === 'Snackbar'"
            :elevation="1"
            rounded="md"
            class="mini-preview__card mini-preview__card--snackbar"
        >
            <OrigamCardText class="mini-preview__snackbar-content">
                <span>Saved</span>
                <OrigamBtn variant="text" color="primary" size="xs">UNDO</OrigamBtn>
            </OrigamCardText>
        </OrigamCard>

        <OrigamCard
            v-else-if="name === 'Tooltip'"
            :elevation="2"
            rounded="sm"
            class="mini-preview__card mini-preview__card--tooltip"
        >
            <OrigamCardText>
                <OrigamKbd>⌘ + S</OrigamKbd>
            </OrigamCardText>
        </OrigamCard>

        <OrigamCard
            v-else-if="name === 'Menu'"
            :elevation="2"
            rounded="md"
            class="mini-preview__card mini-preview__card--menu"
        >
            <OrigamList density="compact">
                <OrigamListItem>One</OrigamListItem>
                <OrigamListItem>Two</OrigamListItem>
            </OrigamList>
        </OrigamCard>

        <!-- ============ Default fallback ============ -->

        <OrigamChip
            v-else
            color="neutral"
            variant="tonal"
            size="sm"
            class="mini-preview__fallback"
        >
            {{ name }}
        </OrigamChip>
    </div>
</template>

<style scoped>
.mini-preview {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    padding: 0.5rem;
}

.mini-preview__row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
}

.mini-preview__field {
    inline-size: 80%;
    max-inline-size: 14rem;
}

.mini-preview__card {
    inline-size: 80%;
    max-inline-size: 12rem;
}

.mini-preview__card--dialog {
    inline-size: 88%;
    max-inline-size: 14rem;
}

.mini-preview__card--snackbar {
    inline-size: auto;
    max-inline-size: 14rem;
}

.mini-preview__card--tooltip {
    inline-size: auto;
}

.mini-preview__card--menu {
    inline-size: 70%;
    max-inline-size: 10rem;
}

.mini-preview__skel {
    display: block;
    block-size: 4px;
    border-radius: 2px;
    background: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
    opacity: 0.45;
    margin-block-end: 4px;
}

.mini-preview__skel--title {
    inline-size: 55%;
    background: var(--m-text, var(--origam-color__text---primary, #fafafa));
    opacity: 0.85;
    margin-block-end: 8px;
}

.mini-preview__skel--80 {
    inline-size: 80%;
}

.mini-preview__skel--50 {
    inline-size: 50%;
}

.mini-preview__alert {
    inline-size: 80%;
    max-inline-size: 14rem;
    font-size: 0.6875rem;
}

.mini-preview__quote {
    inline-size: 80%;
    max-inline-size: 14rem;
    font-size: 0.75rem;
}

.mini-preview__list {
    inline-size: 80%;
    max-inline-size: 12rem;
    font-size: 0.75rem;
}

.mini-preview__table {
    inline-size: 80%;
    max-inline-size: 14rem;
    font-size: 0.6875rem;
}

.mini-preview__chart {
    inline-size: 80%;
    max-inline-size: 14rem;
    block-size: 4rem;
}

.mini-preview__bcrumb {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
}

.mini-preview__dialog-actions {
    display: flex;
    gap: 0.25rem;
    justify-content: flex-end;
    margin-block-start: 0.375rem;
}

.mini-preview__snackbar-content {
    display: flex;
    gap: 0.625rem;
    align-items: center;
    font-size: 0.75rem;
}

.mini-preview__fallback {
    max-inline-size: 90%;
}

.mini-preview :deep(.origam-icon) {
    color: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
}
</style>
