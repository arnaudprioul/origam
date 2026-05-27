import type { IPlaygroundTemplate } from '~/interfaces/playground.interface'

const BTN_CODE = `<script setup lang="ts">
import { ref } from 'vue'
import { OrigamBtn } from 'origam'

const count = ref(0)
<\/script>

<template>
    <OrigamBtn
        color="primary"
        rounded="pill"
        @click="count++"
    >
        Clicked {{ count }} times
    </OrigamBtn>
</template>`

const CARD_CODE = `<script setup lang="ts">
import { OrigamCard } from 'origam'
<\/script>

<template>
    <OrigamCard
        elevation="3"
        rounded="2xl"
        style="max-width: 20rem;"
    >
        <template #title>
            origam Card
        </template>
        <template #subtitle>
            Design system component
        </template>
        <template #text>
            A versatile elevated surface container with header,
            media, content and action areas. Fully tokenised.
        </template>
    </OrigamCard>
</template>`

const CHART_LINE_CODE = `<script setup lang="ts">
import { OrigamChart } from 'origam'

const series = [
    {
        name: 'Downloads',
        data: [30, 42, 28, 61, 45, 74, 55, 89, 66, 92, 78, 110]
    }
]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
<\/script>

<template>
    <OrigamChart
        type="line"
        :series="series"
        :categories="categories"
        height="300"
        color="primary"
    />
</template>`

const DATA_TABLE_CODE = `<script setup lang="ts">
import { OrigamDataTable } from 'origam'

const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Role', key: 'role' },
    { title: 'Status', key: 'status' }
]

const items = [
    { name: 'Alice Martin', role: 'Engineer', status: 'Active' },
    { name: 'Bob Chen', role: 'Designer', status: 'Active' },
    { name: 'Carol Smith', role: 'Manager', status: 'Away' }
]
<\/script>

<template>
    <OrigamDataTable
        :headers="headers"
        :items="items"
        rounded="2xl"
    />
</template>`

const FORM_BASIC_CODE = `<script setup lang="ts">
import { ref } from 'vue'
import { OrigamForm, OrigamTextField, OrigamBtn } from 'origam'

const email = ref('')
const submitted = ref(false)

function handleSubmit () {
    submitted.value = true
}
<\/script>

<template>
    <OrigamForm @submit.prevent="handleSubmit" style="max-width: 24rem; display: flex; flex-direction: column; gap: 1rem;">
        <OrigamTextField
            v-model="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            required
        />
        <OrigamBtn
            type="submit"
            color="primary"
            rounded="pill"
        >
            {{ submitted ? 'Sent!' : 'Subscribe' }}
        </OrigamBtn>
    </OrigamForm>
</template>`

const ALERT_CODE = `<script setup lang="ts">
import { ref } from 'vue'
import { OrigamAlert } from 'origam'

const visible = ref(true)
<\/script>

<template>
    <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 28rem;">
        <OrigamAlert color="info" rounded="2xl">
            This is an informational message.
        </OrigamAlert>
        <OrigamAlert color="success" rounded="2xl">
            Operation completed successfully.
        </OrigamAlert>
        <OrigamAlert color="warning" rounded="2xl">
            Please review your input before continuing.
        </OrigamAlert>
        <OrigamAlert color="danger" rounded="2xl" :model-value="visible" @update:model-value="visible = $event">
            Dismissible error message.
        </OrigamAlert>
    </div>
</template>`

const BLANK_CODE = `<script setup lang="ts">
import { } from 'origam'
<\/script>

<template>
    <div>
        <!-- Start coding here -->
    </div>
</template>`

export const PLAYGROUND_TEMPLATES: ReadonlyArray<IPlaygroundTemplate> = [
    {
        id: 'btn',
        label: 'Button',
        description: 'Interactive button with click counter',
        code: BTN_CODE,
        icon: 'mdi:button-cursor'
    },
    {
        id: 'card',
        label: 'Card',
        description: 'Elevated surface container with slots',
        code: CARD_CODE,
        icon: 'mdi:card-outline'
    },
    {
        id: 'chart-line',
        label: 'Line chart',
        description: 'Line chart with monthly data series',
        code: CHART_LINE_CODE,
        icon: 'mdi:chart-line'
    },
    {
        id: 'data-table',
        label: 'Data table',
        description: 'Feature-rich table with sortable columns',
        code: DATA_TABLE_CODE,
        icon: 'mdi:table'
    },
    {
        id: 'form-basic',
        label: 'Form',
        description: 'Simple form with validation and submit',
        code: FORM_BASIC_CODE,
        icon: 'mdi:form-select'
    },
    {
        id: 'alert',
        label: 'Alert',
        description: 'Contextual alerts for all intent levels',
        code: ALERT_CODE,
        icon: 'mdi:alert-circle-outline'
    },
    {
        id: 'blank',
        label: 'Blank',
        description: 'Empty canvas — start from scratch',
        code: BLANK_CODE,
        icon: 'mdi:file-outline'
    }
] as const
