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
		-->

		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{ multiple: boolean, mandatory: boolean }>({ multiple: false, mandatory: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-item-group v-model="playgroundModel" :multiple="state.multiple" :mandatory="state.mandatory" data-cy="item-playground-group">
						<div style="display: flex; gap: 12px; flex-wrap: wrap;">
							<origam-item v-for="opt in plans" :key="opt.value" :value="opt.value">
								<template #default="{ isSelected, toggle }">
									<button
											:class="['demo-card', { 'demo-card--active': isSelected }]"
											:aria-pressed="isSelected"
											@click="toggle"
											:data-cy="`item-playground-${opt.value}`"
									>
										<div class="demo-card__title">{{ opt.title }}</div>
										<div class="demo-card__price">{{ opt.price }}</div>
									</button>
								</template>
							</origam-item>
						</div>
					</origam-item-group>
					<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
						selected = <strong>{{ JSON.stringify(playgroundModel) }}</strong>
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — value (single selection, mandatory)">
			<!-- Demonstrates single-select radio-style with mandatory -->
			<div style="padding: 24px; max-width: 720px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					<code>mandatory · single-select</code>
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
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Selected plan: <strong>{{ plan }}</strong>
				</p>
			</div>
		</Variant>

		<Variant title="Prop — multiple (checkbox-style tiles)">
			<!-- multiple allows selecting several items at the same time -->
			<div style="padding: 24px; max-width: 640px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					<code>multiple</code>
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
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Selected features: <strong>{{ features.length ? features.join(', ') : '(none)' }}</strong>
				</p>
			</div>
		</Variant>

		<Variant title="Prop — mandatory (segmented chips, always one selected)">
			<!-- mandatory ensures at least one value always stays active -->
			<div style="padding: 24px; max-width: 640px;">
				<p style="margin: 0 0 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					<code>mandatory · tag="div"</code>
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
				<p style="margin: 12px 0 0; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Active filter: <strong>{{ filterCategory }}</strong>
				</p>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default (scoped slot inspection)">
			<!-- Demonstrates the full scope exposed by OrigamItem's default slot -->
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
				<p style="margin-top: 12px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Click the pill to see the scoped slot props flip.
				</p>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue (via ItemGroup)"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-item-group
							v-model="emitModel"
							data-cy="item-emit-group"
							@update:model-value="(v: any) => {
								state.log = [`update:modelValue → ${JSON.stringify(v)}`, ...state.log].slice(0, 6)
							}"
					>
						<div style="display: flex; gap: 12px;">
							<origam-item v-for="opt in plans.slice(0,3)" :key="opt.value" :value="opt.value">
								<template #default="{ isSelected, toggle }">
									<button
											:class="['demo-card', { 'demo-card--active': isSelected }]"
											:aria-pressed="isSelected"
											@click="toggle"
											:data-cy="`item-emit-${opt.value}`"
									>
										<div class="demo-card__title">{{ opt.title }}</div>
									</button>
								</template>
							</origam-item>
						</div>
					</origam-item-group>
					<ul v-if="state.log.length" style="font-family: monospace; font-size: 0.8rem; margin: 12px 0 0; padding-left: 16px;">
						<li v-for="(l, i) in state.log" :key="i">{{ l }}</li>
					</ul>
					<p v-else style="margin: 8px 0 0; font-size: 0.75rem; color: var(--origam-color__text---secondary);">Click a card to see events.</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamItem, OrigamItemGroup } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

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
	const playgroundModel = ref<any>('pro')
	const emitModel = ref<string | undefined>(undefined)
</script>

<style scoped>
:deep(.origam-item-group) > div {
	width: 100%;
}
:deep(.origam-item-group) > div > div {
	display: block;
	height: 100%;
}

.demo-card {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 16px;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	text-align: start;
	background: var(--origam-color__surface---default);
	border: 1px solid var(--origam-color__border---subtle);
	border-radius: 12px;
	cursor: pointer;
	transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.demo-card:hover { border-color: var(--origam-color__border---default); }
.demo-card--active {
	border-color: var(--origam-color__action--primary---bg);
	box-shadow: 0 0 0 1px var(--origam-color__action--primary---bg);
}
.demo-card__title { font-weight: 600; font-size: 0.95rem; }
.demo-card__price { font-weight: 700; font-size: 1.15rem; color: var(--origam-color__text---primary); }
.demo-card__hint  { font-size: 0.75rem; color: var(--origam-color__text---secondary); }

.demo-tile {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 6px;
	padding: 14px 10px;
	width: 100%;
	min-height: 88px;
	box-sizing: border-box;
	background: var(--origam-color__surface---default);
	border: 1px solid var(--origam-color__border---subtle);
	border-radius: 10px;
	cursor: pointer;
	transition: border-color 0.15s ease;
}
.demo-tile:hover { border-color: var(--origam-color__border---default); }
.demo-tile--active {
	border-color: var(--origam-color__action--primary---bg);
	background: color-mix(in srgb, var(--origam-color__action--primary---bg) 6%, transparent);
}
.demo-tile__icon  { font-size: 1.5rem; }
.demo-tile__label { font-size: 0.8125rem; font-weight: 500; }
.demo-tile__check {
	position: absolute; top: 6px; right: 8px;
	width: 18px; height: 18px;
	display: inline-flex; align-items: center; justify-content: center;
	border-radius: 50%;
	background: var(--origam-color__action--primary---bg);
	color: var(--origam-color__action--primary---fg);
	font-size: 0.7rem; font-weight: 700;
}

.demo-chip {
	padding: 6px 14px;
	border-radius: 999px;
	border: 1px solid var(--origam-color__border---subtle);
	background: var(--origam-color__surface---default);
	cursor: pointer;
	font-size: 0.8125rem;
}
.demo-chip:hover { border-color: var(--origam-color__border---default); }
.demo-chip--selected {
	background: var(--origam-color__action--primary---bg);
	color: var(--origam-color__action--primary---fg);
	border-color: var(--origam-color__action--primary---bg);
}

.demo-pill {
	padding: 8px 16px;
	border-radius: 8px;
	border: 1px solid var(--origam-color__border---subtle);
	background: var(--origam-color__surface---overlay);
	cursor: pointer;
}
</style>

<docs lang="md" src="@docs/components/ItemGroup/OrigamItem.md"/>
