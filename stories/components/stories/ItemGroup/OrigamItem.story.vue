<template>
	<Story
			group="components"
			title="ItemGroup/OrigamItem"
	>

		<!--
			<origam-item> is a renderless registration wrapper inside
			<origam-item-group>. It exposes a scoped slot
			`{ isSelected, toggle, select, value }` so the consumer can
			render any chrome on top of the group's selection model.

			Three showcase shapes from the PDF print spec:
			  1. Single — cards (radio-style) for a pricing picker.
			  2. Multiple — tiles (checkbox-style) for feature flags.
			  3. Segmented — chips (filter pills) for a category tab bar.
		-->

		<Variant title="Single — cards (radio, mandatory)">
			<div style="padding: 24px; max-width: 720px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					<code>v-model="plan" · mandatory</code>
				</p>
				<origam-item-group v-model="plan" mandatory data-cy="item-cards">
					<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
						<origam-item
								v-for="opt in plans"
								:key="opt.value"
								:value="opt.value"
						>
							<template #default="{ isSelected, toggle }">
								<button
										:class="['demo-card', { 'demo-card--active': isSelected }]"
										:aria-pressed="isSelected"
										@click="toggle"
										:data-cy="`card-${opt.value}`"
								>
									<div class="demo-card__title">{{ opt.title }}</div>
									<div class="demo-card__price">{{ opt.price }}</div>
									<div class="demo-card__hint">{{ opt.hint }}</div>
								</button>
							</template>
						</origam-item>
					</div>
				</origam-item-group>
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Selected plan: <strong>{{ plan }}</strong>
				</p>
			</div>
		</Variant>

		<Variant title="Multiple — tiles (checkbox)">
			<div style="padding: 24px; max-width: 640px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					<code>v-model="features[]" · multiple</code>
				</p>
				<origam-item-group v-model="features" multiple data-cy="item-tiles">
					<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
						<origam-item
								v-for="feat in featureList"
								:key="feat.value"
								:value="feat.value"
						>
							<template #default="{ isSelected, toggle }">
								<button
										:class="['demo-tile', { 'demo-tile--active': isSelected }]"
										:aria-pressed="isSelected"
										@click="toggle"
										:data-cy="`tile-${feat.value}`"
								>
									<span class="demo-tile__icon">{{ feat.icon }}</span>
									<span class="demo-tile__label">{{ feat.label }}</span>
									<span
											v-if="isSelected"
											class="demo-tile__check"
											aria-hidden="true"
									>✓</span>
								</button>
							</template>
						</origam-item>
					</div>
				</origam-item-group>
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Selected features: <strong>{{ features.length ? features.join(', ') : '(none)' }}</strong>
				</p>
			</div>
		</Variant>

		<Variant title="Segmented — chips (filter pills)">
			<div style="padding: 24px; max-width: 640px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					<code>tag="span" · selectedClass="origam-chip--selected"</code>
				</p>
				<origam-item-group
						v-model="filterCategory"
						tag="div"
						mandatory
						data-cy="item-chips"
				>
					<div style="display: flex; flex-wrap: wrap; gap: 8px;">
						<origam-item
								v-for="cat in categories"
								:key="cat"
								:value="cat"
								tag="span"
						>
							<template #default="{ isSelected, toggle }">
								<button
										:class="['demo-chip', { 'demo-chip--selected': isSelected }]"
										:aria-pressed="isSelected"
										@click="toggle"
										:data-cy="`chip-${cat.toLowerCase()}`"
								>
									{{ cat }}
								</button>
							</template>
						</origam-item>
					</div>
				</origam-item-group>
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Active filter: <strong>{{ filterCategory }}</strong>
				</p>
			</div>
		</Variant>

		<Variant title="Scoped slot — inspect what each item exposes">
			<div style="padding: 24px;">
				<origam-item-group v-model="introspectValue" data-cy="item-introspect">
					<origam-item value="alpha">
						<template #default="slot">
							<button class="demo-pill" @click="slot.toggle">
								<code style="font-size: 0.7rem;">{{ JSON.stringify({ value: slot.value, isSelected: slot.isSelected }) }}</code>
							</button>
						</template>
					</origam-item>
				</origam-item-group>
				<p style="margin-top: 12px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Click the pill to see the scoped slot props flip.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamItem, OrigamItemGroup } from '@origam/components'

	// ── Fixture data ────────────────────────────────────────────────
	const plans = [
		{ value: 'starter', title: 'Starter', price: '$0 /mo',  hint: 'Up to 3 projects' },
		{ value: 'pro',     title: 'Pro',     price: '$24 /mo', hint: 'Unlimited projects' },
		{ value: 'team',    title: 'Team',    price: '$96 /mo', hint: 'Multi-seat + SSO' },
	]

	const featureList = [
		{ value: 'a11y',   icon: '♿', label: 'A11y' },
		{ value: 'i18n',   icon: '🌐', label: 'i18n' },
		{ value: 'ssr',    icon: '🚀', label: 'SSR' },
		{ value: 'pwa',    icon: '📱', label: 'PWA' },
		{ value: 'rtl',    icon: '⇄',  label: 'RTL' },
		{ value: 'dark',   icon: '🌙', label: 'Dark' },
		{ value: 'tokens', icon: '🎨', label: 'Tokens' },
		{ value: 'tests',  icon: '🧪', label: 'Tests' },
	]

	const categories = ['All', 'Components', 'Tokens', 'Themes', 'Examples', 'Docs']

	// ── Reactive state ──────────────────────────────────────────────
	const plan = ref('pro')
	const features = ref<string[]>(['a11y', 'i18n', 'dark', 'tests'])
	const filterCategory = ref('All')
	const introspectValue = ref<string | undefined>(undefined)
</script>

<style scoped>
.demo-card {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 16px;
	text-align: start;
	background: var(--origam-color-surface-default);
	border: 1px solid var(--origam-color-border-subtle);
	border-radius: 12px;
	cursor: pointer;
	transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.demo-card:hover {
	border-color: var(--origam-color-border-default);
}
.demo-card--active {
	border-color: var(--origam-color-action-primary-bg);
	box-shadow: 0 0 0 1px var(--origam-color-action-primary-bg);
}
.demo-card__title {
	font-weight: 600;
	font-size: 0.95rem;
}
.demo-card__price {
	font-weight: 700;
	font-size: 1.15rem;
	color: var(--origam-color-text-primary);
}
.demo-card__hint {
	font-size: 0.75rem;
	color: var(--origam-color-text-secondary);
}

.demo-tile {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 14px 10px;
	background: var(--origam-color-surface-default);
	border: 1px solid var(--origam-color-border-subtle);
	border-radius: 10px;
	cursor: pointer;
	transition: border-color 0.15s ease;
}
.demo-tile:hover {
	border-color: var(--origam-color-border-default);
}
.demo-tile--active {
	border-color: var(--origam-color-action-primary-bg);
	background: color-mix(in srgb, var(--origam-color-action-primary-bg) 6%, transparent);
}
.demo-tile__icon {
	font-size: 1.5rem;
}
.demo-tile__label {
	font-size: 0.8125rem;
	font-weight: 500;
}
.demo-tile__check {
	position: absolute;
	top: 6px;
	right: 8px;
	width: 18px;
	height: 18px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: var(--origam-color-action-primary-bg);
	color: var(--origam-color-action-primary-fg);
	font-size: 0.7rem;
	font-weight: 700;
}

.demo-chip {
	padding: 6px 14px;
	border-radius: 999px;
	border: 1px solid var(--origam-color-border-subtle);
	background: var(--origam-color-surface-default);
	cursor: pointer;
	font-size: 0.8125rem;
}
.demo-chip:hover {
	border-color: var(--origam-color-border-default);
}
.demo-chip--selected {
	background: var(--origam-color-action-primary-bg);
	color: var(--origam-color-action-primary-fg);
	border-color: var(--origam-color-action-primary-bg);
}

.demo-pill {
	padding: 8px 16px;
	border-radius: 8px;
	border: 1px solid var(--origam-color-border-subtle);
	background: var(--origam-color-surface-overlay);
	cursor: pointer;
}
</style>

<docs lang="md" src="@docs/components/ItemGroup/OrigamItem.md"/>
