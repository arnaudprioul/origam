<template>
	<Story
			group="components"
			title="Blockquote/OrigamBlockquote"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBlockquoteProps>({
					variant: 'default',
					author: 'Linus Torvalds',
					source: 'LKML, 2003',
					cite: 'https://lkml.org/lkml/2003/8/26/142',
					lang: 'auto',
					align: 'left',
					color: 'primary'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="blockquote-playground"
				>
					<origam-blockquote
							v-bind="state"
							data-cy="blockquote-playground-host"
					>
						Talk is cheap. Show me the code.
					</origam-blockquote>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.variant"
						title="variant"
						:options="variantOptions"
				/>
				<HstText
						v-model="state.author"
						title="author"
				/>
				<HstText
						v-model="state.source"
						title="source"
				/>
				<HstText
						v-model="state.cite"
						title="cite"
				/>
				<HstSelect
						v-model="state.lang"
						title="lang"
						:options="langOptions"
				/>
				<HstSelect
						v-model="state.align"
						title="align"
						:options="alignOptions"
				/>
				<HstSelect
						v-model="state.color"
						title="color"
						:options="colorOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — variant">
			<div
					class="story-shell"
					data-cy="blockquote-variants"
			>
				<div
						v-for="variant in variants"
						:key="variant"
						class="story-col"
				>
					<strong>variant = {{ variant }}</strong>
					<origam-blockquote
							:variant="variant"
							author="Antoine de Saint-Exupéry"
							source="Terre des Hommes"
							:data-cy="`blockquote-variant-${variant}`"
					>
						La perfection est atteinte, non pas lorsqu'il n'y a plus rien à
						ajouter, mais lorsqu'il n'y a plus rien à retirer.
					</origam-blockquote>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — lang">
			<div
					class="story-shell"
					data-cy="blockquote-langs"
			>
				<p class="hint">
					The `quoted` variant pulls locale-aware decorative quote marks
					from `QUOTE_MARKS_BY_LANG`. Same citation, four locales — four
					different glyph pairs.
				</p>
				<div
						v-for="entry in langSamples"
						:key="entry.lang"
						class="story-col"
				>
					<strong>lang = {{ entry.lang }}</strong>
					<origam-blockquote
							variant="quoted"
							:lang="entry.lang"
							:author="entry.author"
							:source="entry.source"
							:data-cy="`blockquote-lang-${entry.lang}`"
					>
						{{ entry.text }}
					</origam-blockquote>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — color">
			<div
					class="story-shell"
					data-cy="blockquote-colors"
			>
				<div
						v-for="color in colorIntents"
						:key="color"
						class="story-col"
				>
					<strong>color = {{ color }}</strong>
					<origam-blockquote
							variant="default"
							:color="color"
							author="Voltaire"
							source="Candide, 1759"
							:data-cy="`blockquote-color-${color}`"
					>
						Il faut cultiver notre jardin.
					</origam-blockquote>
				</div>
			</div>
		</Variant>

		<Variant title="Variant — quoted">
			<div
					class="story-shell"
					data-cy="blockquote-quoted-showcase"
			>
				<p class="hint">
					The `quoted` variant renders a single oversized opening glyph as
					a background watermark (position: absolute, z-index: 0) behind
					the body text. The closing glyph is not rendered.
				</p>

				<div class="story-col">
					<strong>default color (primary accent)</strong>
					<origam-blockquote
							variant="quoted"
							lang="en"
							author="Linus Torvalds"
							source="LKML, 2003"
							data-cy="blockquote-quoted-default"
					>
						Talk is cheap. Show me the code.
					</origam-blockquote>
				</div>

				<div class="story-col">
					<strong>color = primary</strong>
					<origam-blockquote
							variant="quoted"
							lang="en"
							color="primary"
							author="Steve Jobs"
							source="Stanford Commencement, 2005"
							data-cy="blockquote-quoted-primary"
					>
						Stay hungry. Stay foolish.
					</origam-blockquote>
				</div>

				<div class="story-col">
					<strong>color = success</strong>
					<origam-blockquote
							variant="quoted"
							lang="fr"
							color="success"
							author="René Descartes"
							source="Discours de la méthode, 1637"
							data-cy="blockquote-quoted-success"
					>
						Je pense, donc je suis.
					</origam-blockquote>
				</div>

				<div class="story-col">
					<strong>color = danger</strong>
					<origam-blockquote
							variant="quoted"
							lang="de"
							color="danger"
							author="Friedrich Nietzsche"
							source="Götzen-Dämmerung, 1888"
							data-cy="blockquote-quoted-danger"
					>
						Was uns nicht umbringt, macht uns stärker.
					</origam-blockquote>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — author">
			<div
					class="story-shell"
					data-cy="blockquote-author-slot"
			>
				<p class="hint">
					Custom rendering via the `#author` slot — the prop is ignored
					when the slot is provided. Useful for linking to a bio page.
				</p>
				<origam-blockquote
						variant="elegant"
						source="Stanford Commencement, 2005"
						cite="https://news.stanford.edu/2005/06/14/jobs-061505/"
						data-cy="blockquote-author-slot-host"
				>
					Stay hungry. Stay foolish.

					<template #author>
						<a
								class="story-link"
								href="https://en.wikipedia.org/wiki/Steve_Jobs"
								data-cy="blockquote-author-slot-link"
						>Steve Jobs</a>
					</template>
				</origam-blockquote>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBlockquote } from '@origam/components'

	import { BLOCKQUOTE_ALIGNS, BLOCKQUOTE_LANGS, BLOCKQUOTE_VARIANTS } from '@origam/consts'

	import type { IBlockquoteProps, IOptions } from '@origam/interfaces'

	import type { TBlockquoteAlign, TBlockquoteLang, TBlockquoteVariant, TIntent } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const variantOptions: Array<IOptions<TBlockquoteVariant>> = BLOCKQUOTE_VARIANTS.map(v => ({label: v, value: v}))
	const langOptions: Array<IOptions<TBlockquoteLang>> = BLOCKQUOTE_LANGS.map(v => ({label: v, value: v}))
	const alignOptions: Array<IOptions<TBlockquoteAlign>> = BLOCKQUOTE_ALIGNS.map(v => ({label: v, value: v}))

	const colorIntents: ReadonlyArray<TIntent> = ['primary', 'secondary', 'success', 'danger']
	const colorOptions: Array<IOptions<TIntent>> = colorIntents.map(v => ({label: v, value: v}))

	const variants: ReadonlyArray<TBlockquoteVariant> = BLOCKQUOTE_VARIANTS

	interface ILangSample {
		lang: TBlockquoteLang
		text: string
		author: string
		source: string
	}

	const langSamples: ReadonlyArray<ILangSample> = [
		{
			lang: 'fr',
			text: "Je pense, donc je suis.",
			author: 'René Descartes',
			source: 'Discours de la méthode, 1637'
		},
		{
			lang: 'en',
			text: 'Talk is cheap. Show me the code.',
			author: 'Linus Torvalds',
			source: 'LKML, 2003'
		},
		{
			lang: 'es',
			text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme.',
			author: 'Miguel de Cervantes',
			source: 'Don Quijote, 1605'
		},
		{
			lang: 'de',
			text: 'Was uns nicht umbringt, macht uns stärker.',
			author: 'Friedrich Nietzsche',
			source: 'Götzen-Dämmerung, 1888'
		}
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding: 16px;
		max-width: 720px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col > strong {
		font: 0.75rem/1 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-link {
		color: var(--origam-color__action--primary---bg, #7c3aed);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}
</style>

<docs lang="md" src="@docs/components/Blockquote/OrigamBlockquote.md"/>
