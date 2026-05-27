<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCellMobile"
	>
		<!--
			Playground — the mobile fallback header cell (stacked card
			layout). OrigamDataTableHeadersCellMobile is internal and
			activated automatically when the parent uses `mobile` mode.
		-->
		<Variant title="Default">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile data-cy="mobile-cell-default"/>
			</div>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — sortable (sort indicator on mobile)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="sortableHeaders" :items="items" mobile data-cy="mobile-cell-sortable"/>
			</div>
		</Variant>

		<Variant title="Prop — showSelect (mobile checkbox row)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile show-select data-cy="mobile-cell-select"/>
			</div>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────── -->

		<Variant title="Slot — chip:append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-chip-append">
					<template #chip:append>
						<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — chip:close">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-chip-close">
					<template #chip:close>
						<origam-icon :icon="MDI_ICONS.CLOSE"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — chip:default">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-chip-default">
					<template #chip:default>
						<span>Custom chip content</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — chip:filter">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-chip-filter">
					<template #chip:filter>
						<origam-icon :icon="MDI_ICONS.FILTER"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — chip:prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-chip-prepend">
					<template #chip:prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — clear">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-clear">
					<template #clear>
						<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-append">
					<template #select.append>
						<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.appendInner">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-append-inner">
					<template #select.appendInner>
						<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.appendItem">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-append-item">
					<template #select.appendItem>
						<span>Append item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.chip">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-chip">
					<template #select.chip>
						<origam-chip text="Demo"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.floatingLabel">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-floating-label">
					<template #select.floatingLabel>
						<span>Sort by</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.item">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-item">
					<template #select.item>
						<span>Custom item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.label">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-label">
					<template #select.label>
						<span>Sort columns</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.loader">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-loader">
					<template #select.loader>
						<span>Loading...</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.noData">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-no-data">
					<template #select.noData>
						<span>No sortable columns</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-prepend">
					<template #select.prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.prependInner">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-prepend-inner">
					<template #select.prependInner>
						<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.prependItem">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-prepend-item">
					<template #select.prependItem>
						<span>Prepend item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.prefix">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-prefix">
					<template #select.prefix>
						<span>Sort:</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.selection">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-selection">
					<template #select.selection>
						<span>Custom selection</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slot — select.suffix">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="sortableColumns" data-cy="mobile-cell-slot-select-suffix">
					<template #select.suffix>
						<span>↕</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────── -->

		<Variant title="Emit — click:append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="sortableColumns"
						data-cy="mobile-cell-emit-click-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:clear">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="sortableColumns"
						data-cy="mobile-cell-emit-click-clear"
						@click:clear="logEvent('click:clear', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="sortableColumns"
						data-cy="mobile-cell-emit-click-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamChip, OrigamDataTable, OrigamDataTableHeadersCellMobile, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const sortableHeaders = headers.map((h) => ({ ...h, sortable: true }))

	const sortableColumns = sortableHeaders.map((h) => ({ ...h, key: h.key, value: h.key }))

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCellMobile.md"/>
