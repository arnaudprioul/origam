<template>
	<Story
			group="components"
			title="Card/OrigamCard"
	>

		<!-- ════════════ BASIC ════════════ -->
		<!--
			Modelled on Vuetify's first `<v-card>` showcase example
			(https://vuetifyjs.com/en/components/cards/) — image on top,
			title + subtitle, supporting paragraph, two action buttons
			in the footer. A "real-world" composition is more useful for
			spotting layout bugs than a bare text-only card.
		-->
		<Variant title="Basic">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card
						data-cy="card-basic"
						title="Top 10 Australian Beaches"
						subtitle="Number 10"
						image="https://picsum.photos/seed/beach/600/200"
						text="Whitehaven Beach, Whitsunday Island, Whitsunday Islands"
						rounded
				>
					<template #footer>
						<div style="display: flex; gap: 8px; padding: 12px; justify-content: flex-end;">
							<origam-btn text="Share" data-cy="card-basic-share"/>
							<origam-btn color="primary" text="Explore" data-cy="card-basic-explore"/>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE — Action card (Word of the Day) ════════════ -->
		<!--
			Vuetify's "Word of the Day" pattern — large display word,
			hint adjective/noun, definition, single CTA. Tests the
			default slot composition + footer + typography hierarchy.
		-->
		<Variant title="Showcase — Action">
			<div style="padding: 16px; max-width: 344px;">
				<origam-card data-cy="card-showcase-action" rounded>
					<div style="padding: 16px;">
						<div style="font-size: 0.875rem; opacity: 0.7; margin-bottom: 8px;">Word of the Day</div>
						<div style="font-size: 2rem; font-weight: 900; margin-bottom: 4px;">benevolent</div>
						<div style="font-style: italic; opacity: 0.7; margin-bottom: 12px;">adjective</div>
						<div>well meaning and kindly. <em>"a benevolent smile"</em></div>
					</div>
					<template #footer>
						<div style="display: flex; padding: 8px 12px; justify-content: flex-start;">
							<origam-btn color="primary" text="Learn More" data-cy="card-showcase-action-cta"/>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE — Profile (avatar + content) ════════════ -->
		<!--
			Vuetify's "Profile card" pattern — prepend avatar, full-name
			title, role subtitle, body quote, metrics footer. Tests the
			adjacent (prepend-avatar) + multi-line body composition.
		-->
		<Variant title="Showcase — Profile">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card
						data-cy="card-showcase-profile"
						title="Evan You"
						subtitle="Vue Creator"
						prepend-avatar="https://i.pravatar.cc/64?u=evan"
						rounded
				>
					<div style="padding: 0 16px 12px;">
						Turns out semicolon-less style is easier and safer in TS because invalid syntax tends to error in fewer cases. Vue is now a TS-first framework.
					</div>
					<template #footer>
						<div style="display: flex; gap: 16px; padding: 12px 16px; opacity: 0.7; font-size: 0.875rem; border-top: 1px solid var(--origam-color-border-subtle);">
							<span>256 Likes</span>
							<span>·</span>
							<span>45 Shares</span>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE — Media (picture + caption) ════════════ -->
		<!--
			Vuetify's "Media card" pattern — full-width image, title +
			subtitle below, single right-aligned CTA with append icon.
			Tests image asset + footer alignment + button-with-icon.
		-->
		<Variant title="Showcase — Media">
			<div style="padding: 16px; max-width: 340px;">
				<origam-card
						data-cy="card-showcase-media"
						title="Evening Sunset"
						subtitle="Take a walk down the beach"
						image="https://picsum.photos/seed/sunset/600/200"
						rounded
				>
					<template #footer>
						<div style="display: flex; padding: 12px; justify-content: flex-end;">
							<origam-btn
									color="danger"
									text="Book Activity"
									:append-icon="MDI_ICONS.CHEVRON_RIGHT"
									data-cy="card-showcase-media-cta"
							/>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE — Info banner ════════════ -->
		<!--
			Vuetify's "Welcome to Vuetify" info-banner pattern —
			prepend icon, title with strong weight, subtitle,
			descriptive paragraph. No image, no footer.
			Tests the icon-prepend + title+subtitle stacking.
		-->
		<Variant title="Showcase — Info banner">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card
						data-cy="card-showcase-info"
						title="Welcome to origam"
						subtitle="The Vue 3 design system"
						:prepend-icon="MDI_ICONS.INFORMATION_OUTLINE"
						border
						rounded
				>
					<div style="padding: 0 16px 16px;">
						origam ships ready-to-use Vue 3 components, design tokens (Style Dictionary), Histoire docs, and Cypress + Playwright tests. CSS-first, JS-fallback. Multi-theme via <code>data-theme</code>.
					</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE — Pricing ════════════ -->
		<!--
			Compact pricing card — emoji "icon", goal title + subtitle,
			right-aligned CTA, large numeric progress, helper text.
			Tests inline content composition + footer + visual hierarchy
			at small widths.
		-->
		<Variant title="Showcase — Pricing">
			<div style="padding: 16px; max-width: 500px;">
				<origam-card data-cy="card-showcase-pricing" rounded border>
					<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
						<div style="font-size: 2rem;">🎯</div>
						<div style="flex: 1;">
							<div style="font-weight: 700;">Set an earnings goal</div>
							<div style="font-size: 0.875rem; opacity: 0.7;">Earn my first $100</div>
						</div>
						<origam-btn color="primary" text="Create Goal" data-cy="card-showcase-pricing-cta"/>
					</div>
					<div style="padding: 0 16px 16px;">
						<div style="font-size: 1.5rem; font-weight: 900; margin-bottom: 8px;">0%</div>
						<div style="background: var(--origam-color-border-subtle); height: 4px; border-radius: 999px; overflow: hidden; margin-bottom: 8px;">
							<div style="background: var(--origam-color-action-primary); height: 100%; width: 2%;"></div>
						</div>
						<div style="font-size: 0.75rem; opacity: 0.7;">$0 of $100 earned — 7 days left</div>
					</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<!--
			Side-by-side render of every intent so the e2e suite can
			assert the runtime computed `backgroundColor` differs per
			value. Pre-fix `ICardProps` didn't even extend `IColorProps`
			— `<origam-card color="primary">` was a silent no-op.
			Closes the user-reported audit gap on color/bgColor coverage.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" title="Interactive card" text="Tweak controls →" data-cy="card-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures (intent rungs):</small>
						<origam-card bg-color="primary" title="primary" data-cy="card-color-primary"/>
						<origam-card bg-color="success" title="success" data-cy="card-color-success"/>
						<origam-card bg-color="warning" title="warning" data-cy="card-color-warning"/>
						<origam-card bg-color="danger"  title="danger"  data-cy="card-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<{ elevation?: number, flat?: boolean }>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							:elevation="state.elevation"
							:flat="state.flat"
							title="Elevation card"
							text="Shadow changes with elevation."
							data-cy="card-elevation"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.flat" title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED (IRoundedProps) ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card :rounded="state.rounded" title="Interactive" text="Tweak controls →" data-cy="card-rounded"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures:</small>
						<origam-card title='rounded={false} (default)' data-cy="card-rounded-default"/>
						<origam-card title='rounded={true}' :rounded="true" data-cy="card-rounded-true"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-card v-bind="state" title="Interactive card" text="Toggle controls →" data-cy="card-border"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<small>Showcase fixtures:</small>
						<origam-card title='border={false} (default)'                   data-cy="card-border-default"/>
						<origam-card title='border={true}'   :border="true"             data-cy="card-border-true"/>
						<origam-card title='border="top"'    border="top"               data-cy="card-border-top"/>
						<origam-card title='border="right"'  border="right"             data-cy="card-border-right"/>
						<origam-card title='border="bottom"' border="bottom"            data-cy="card-border-bottom"/>
						<origam-card title='border="left"'   border="left"              data-cy="card-border-left"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							:density="state.density"
							title="Density card"
							text="Padding changes with density."
							data-cy="card-density"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ HEADER (adjacent icons) ════════════ -->
		<Variant
				title="Header (adjacent)"
				:init-state="() => useStoryInitState<IAdjacentProps & { title?: string, subtitle?: string }>({
					title: 'Card with icons',
					subtitle: 'Subtitle here'
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							v-bind="state"
							text="Use prepend/append icons to enrich the header."
							data-cy="card-adjacent"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon" title="appendIcon" :options="iconList"/>
				<HstText   v-model="state.prependAvatar" title="prependAvatar (URL)"/>
				<HstText   v-model="state.appendAvatar" title="appendAvatar (URL)"/>
				<HstText   v-model="state.title" title="title"/>
				<HstText   v-model="state.subtitle" title="subtitle"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					hover?: boolean
					loading?: boolean | number
					flat?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<div style="padding: 16px;">
					<origam-card
							v-bind="state"
							title="States card"
							text="Toggle states in the controls panel."
							data-cy="card-states"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.hover" title="hover"/>
				<HstCheckbox v-model="state.loading" title="loading (boolean)"/>
				<HstCheckbox v-model="state.flat" title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ IMAGE / ASSET ════════════ -->
		<Variant
				title="Image"
				:init-state="() => useStoryInitState<{ image?: string }>({ image: 'https://picsum.photos/600/200' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 400px;">
					<origam-card
							:image="state.image"
							title="Image card"
							text="An asset image above the body."
							data-cy="card-image"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.image" title="image (URL)"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-default">
					<div style="padding: 16px;">
						<p>Custom slot content — any markup goes here.</p>
					</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: header ════════════ -->
		<Variant title="Slot — header">
			<div style="padding: 16px;">
				<origam-card data-cy="card-slot-header">
					<template #header>
						<div style="padding: 16px; font-weight: 700;">Custom header slot</div>
					</template>
					<div style="padding: 16px;">Body content.</div>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: footer ════════════ -->
		<Variant title="Slot — footer">
			<div style="padding: 16px;">
				<origam-card title="Footer card" text="Card with footer." data-cy="card-slot-footer">
					<template #footer>
						<div style="padding: 16px; display: flex; justify-content: flex-end; gap: 8px;">
							<origam-btn text="Cancel"/>
							<origam-btn color="primary" text="Confirm"/>
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: loader ════════════ -->
		<Variant title="Slot — loader">
			<div style="padding: 16px;">
				<origam-card loading title="Custom loader" data-cy="card-slot-loader">
					<template #loader>
						<div style="text-align: center; padding: 4px;">Loading...</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ SLOT: asset ════════════ -->
		<Variant title="Slot — asset">
			<div style="padding: 16px; max-width: 400px;">
				<origam-card title="Asset slot" data-cy="card-slot-asset">
					<template #asset>
						<div style="background: var(--origam-color-surface-raised, #eee); height: 120px; display: flex; align-items: center; justify-content: center;">
							Custom asset placeholder
						</div>
					</template>
				</origam-card>
			</div>
		</Variant>

		<!-- ════════════ EMIT: click:prepend ════════════ -->
		<Variant title="Emit — click:prepend">
			<div style="padding: 16px;">
				<origam-card
						title="Prepend click"
						:prepend-icon="MDI_ICONS.ACCOUNT"
						data-cy="card-emit-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════ EMIT: click:append ════════════ -->
		<Variant title="Emit — click:append">
			<div style="padding: 16px;">
				<origam-card
						title="Append click"
						:append-icon="MDI_ICONS.DOTS_VERTICAL"
						data-cy="card-emit-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════ LOADING SHAPES ════════════ -->
		<!--
			Card defaultKind = 'line'. Each fixture uses a consistent card
			composition (title + subtitle + text + image) so the loading
			overlay renders against a realistic card body.
			The skeleton fixture replaces the entire card body — the header,
			asset, and footer should NOT be rendered when kind='skeleton'.
		-->
		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; max-width: 480px;">
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={true}</code>
					<origam-card
							loading
							title="Loading card"
							subtitle="Loading content"
							text="Body text"
							image="https://picsum.photos/seed/loading/400/200"
							data-cy="card-loading-bool"
					/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={42}</code>
					<origam-card
							:loading="42"
							title="Loading card"
							subtitle="Loading content"
							text="Body text"
							image="https://picsum.photos/seed/loading/400/200"
							data-cy="card-loading-number"
					/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={{ type: 'line' }}</code>
					<origam-card
							:loading="{ type: 'line' }"
							title="Loading card"
							subtitle="Loading content"
							text="Body text"
							image="https://picsum.photos/seed/loading/400/200"
							data-cy="card-loading-line"
					/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={{ type: 'circular', size: 16 }}</code>
					<origam-card
							:loading="{ type: 'circular', size: 16 }"
							title="Loading card"
							subtitle="Loading content"
							text="Body text"
							image="https://picsum.photos/seed/loading/400/200"
							data-cy="card-loading-circular-override"
					/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<code style="min-width: 240px;">loading={{ type: 'skeleton' }}</code>
					<origam-card
							:loading="{ type: 'skeleton' }"
							title="Loading card"
							subtitle="Loading content"
							text="Body text"
							image="https://picsum.photos/seed/loading/400/200"
							data-cy="card-loading-skeleton"
					/>
				</div>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICardProps>({
					title: 'Card title',
					subtitle: 'Subtitle',
					text: 'Body text.',
					elevation: undefined,
					flat: false,
					hover: false,
					disabled: false,
					loading: false,
					rounded: undefined,
					density: undefined
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 420px;">
					<origam-card v-bind="state" data-cy="card-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"     title="title"/>
				<HstText     v-model="state.subtitle"  title="subtitle"/>
				<HstText     v-model="state.text"      title="text"/>
				<HstSelect   v-model="state.elevation" title="elevation"  :options="elevationList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"    :options="roundedList"/>
				<HstSelect   v-model="state.density"   title="density"    :options="densityList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.hover"     title="hover"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.loading"   title="loading"/>
				<HstCheckbox v-model="state.border"    title="border"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamCard } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAdjacentProps,
		IBorderProps,
		ICardProps,
		IColorProps,
		IDensityProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		iconList,
		intentList,
		roundedList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Card/OrigamCard.md"/>
