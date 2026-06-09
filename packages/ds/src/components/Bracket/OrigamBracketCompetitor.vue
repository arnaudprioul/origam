<template>
	<component
			:is="tag"
			:id="id"
			:aria-label="ariaLabel"
			:class="rowClasses"
			:role="interactive ? 'button' : undefined"
			:style="rowStyles"
			:tabindex="interactive ? 0 : undefined"
			@click="handleClick"
			@keydown="handleKeydown"
	>
		<span
				v-if="showSeed && competitor?.seed != null"
				class="origam-bracket-competitor__seed"
		>
			{{ competitor.seed }}
		</span>

		<img
				v-if="competitor?.avatar"
				:alt="`${competitor.name} avatar`"
				:src="competitor.avatar"
				class="origam-bracket-competitor__avatar"
		>

		<span class="origam-bracket-competitor__name">
			{{ displayName }}
		</span>

		<span
				v-if="hasAdvantage"
				:aria-label="advantageAriaLabel"
				:title="advantageAriaLabel"
				class="origam-bracket-competitor__advantage"
		>
			{{ advantageLabel }}
		</span>

		<span
				v-if="showScore"
				class="origam-bracket-competitor__score"
		>
			{{ displayScore }}
		</span>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'

	import { useProps } from '../../composables'

	import type { IBracketCompetitorProps } from '../../interfaces'

	const props = withDefaults(defineProps<IBracketCompetitorProps>(), {
		tag: 'div',
		isWinner: false,
		isLoser: false,
		showScore: true,
		showSeed: false,
		interactive: true,
		color: 'primary'
	})

	const emit = defineEmits<{
		(e: 'click', event: MouseEvent | KeyboardEvent): void
	}>()

	const {filterProps} = useProps<IBracketCompetitorProps>(props)

	const isTbd = computed<boolean>(() => props.competitor === null)

	const displayName = computed<string>(() => {
		if (isTbd.value) return 'TBD'

		return props.competitor!.name
	})

	const displayScore = computed<string>(() => {
		if (props.score == null) return '—'
		if (typeof props.score === 'number') return String(props.score)

		return props.score
	})

	const hasAdvantage = computed<boolean>(() => (props.advantageRounds ?? 0) > 0)

	const advantageLabel = computed<string>(() => `+${props.advantageRounds ?? 0}`)

	const advantageAriaLabel = computed<string>(() => {
		const rounds = props.advantageRounds ?? 0

		return `${rounds}-round head start`
	})

	const ariaLabel = computed<string>(() => {
		if (isTbd.value) return 'To be determined'

		const base = props.competitor!.name
		const score = props.score != null ? `, score ${displayScore.value}` : ''
		const winner = props.isWinner ? ', winner' : ''

		return `${base}${score}${winner}`
	})

	const handleClick = (event: MouseEvent) => {
		if (!props.interactive) return

		emit('click', event)
	}

	const handleKeydown = (event: KeyboardEvent) => {
		if (!props.interactive) return
		if (event.key !== 'Enter' && event.key !== ' ') return

		event.preventDefault()
		emit('click', event)
	}

	const rowStyles = computed<StyleValue>(() => {
		return [props.style] as StyleValue
	})

	const rowClasses = computed(() => {
		return [
			'origam-bracket-competitor',
			`origam-bracket-competitor--color-${props.color}`,
			{
				'origam-bracket-competitor--winner': props.isWinner,
				'origam-bracket-competitor--loser': props.isLoser,
				'origam-bracket-competitor--tbd': isTbd.value,
				'origam-bracket-competitor--interactive': props.interactive
			},
			props.class
		]
	})

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-bracket-competitor {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--origam-bracket-competitor---gap, 8px);
		min-height: var(--origam-bracket-competitor---height, 36px);
		padding-block: var(--origam-bracket-competitor---padding-block, 4px);
		padding-inline: var(--origam-bracket-competitor---padding-inline, 12px);
		font-size: var(--origam-bracket-competitor---font-size, 0.875rem);
		font-weight: var(--origam-bracket-competitor---font-weight, 400);
		color: var(--origam-bracket-competitor---color, currentColor);
		background-color: var(--origam-bracket-competitor---background-color, transparent);
		border: 0;
		transition: background-color 120ms ease, color 120ms ease;
		user-select: none;

		&__seed {
			min-width: var(--origam-bracket-seed---min-width, 20px);
			font-size: var(--origam-bracket-seed---font-size, 0.75rem);
			font-weight: var(--origam-bracket-seed---font-weight, 500);
			color: var(--origam-bracket-seed---color, var(--origam-color__text---tertiary, rgba(0, 0, 0, 0.5)));
			text-align: end;
			flex: 0 0 auto;
		}

		&__avatar {
			width: var(--origam-bracket-avatar---size, 20px);
			height: var(--origam-bracket-avatar---size, 20px);
			border-radius: var(--origam-bracket-avatar---border-radius, 9999px);
			object-fit: cover;
			flex: 0 0 auto;
		}

		&__name {
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__advantage {
			flex: 0 0 auto;
			padding-block: var(--origam-bracket-advantage---padding-block, 1px);
			padding-inline: var(--origam-bracket-advantage---padding-inline, 6px);
			font-size: var(--origam-bracket-advantage---font-size, 0.6875rem);
			font-weight: var(--origam-bracket-advantage---font-weight, 700);
			line-height: 1.4;
			color: var(--origam-bracket-advantage---color, var(--origam-color__action--primary---fg, #fff));
			background-color: var(--origam-bracket-advantage---background-color, var(--origam-color__action--primary---bg, #1976d2));
			border-radius: var(--origam-bracket-advantage---border-radius, 9999px);
		}

		&__score {
			min-width: var(--origam-bracket-score---min-width, 28px);
			text-align: end;
			font-size: var(--origam-bracket-score---font-size, 0.875rem);
			font-weight: var(--origam-bracket-score---font-weight, 600);
			color: var(--origam-bracket-score---color, currentColor);
			flex: 0 0 auto;
		}

		&--interactive {
			cursor: pointer;

			&:hover {
				background-color: var(--origam-bracket-competitor--hover---background-color, rgba(0, 0, 0, 0.04));
			}

			&:focus-visible {
				outline: 2px solid var(--origam-color__action--primary---bg, #1976d2);
				outline-offset: -2px;
			}
		}

		&--winner {
			color: var(--origam-bracket-competitor--winner---color, currentColor);
			background-color: var(--origam-bracket-competitor--winner---background-color, rgba(25, 118, 210, 0.08));
			font-weight: var(--origam-bracket-competitor--winner---font-weight, 600);

			.origam-bracket-competitor__score {
				color: var(--origam-bracket-competitor--winner---color, var(--origam-color__action--primary---bg, #1976d2));
			}
		}

		&--loser {
			color: var(--origam-bracket-competitor--loser---color, var(--origam-color__text---tertiary, rgba(0, 0, 0, 0.5)));
			opacity: var(--origam-bracket-competitor--loser---opacity, 0.75);
		}

		&--tbd {
			color: var(--origam-bracket-competitor--pending---color, var(--origam-color__text---tertiary, rgba(0, 0, 0, 0.5)));
			font-style: var(--origam-bracket-competitor--pending---font-style, italic);
		}
	}
</style>

<style>
	:root {
		--origam-bracket-competitor---height: 36px;
		--origam-bracket-competitor---padding-block: 4px;
		--origam-bracket-competitor---padding-inline: 12px;
		--origam-bracket-competitor---gap: 8px;
		--origam-bracket-competitor---font-size: 0.875rem;
		--origam-bracket-competitor---font-weight: 400;
		--origam-bracket-avatar---size: 20px;
		--origam-bracket-avatar---border-radius: 9999px;
		--origam-bracket-score---min-width: 28px;
		--origam-bracket-score---font-size: 0.875rem;
		--origam-bracket-score---font-weight: 600;
		--origam-bracket-seed---min-width: 20px;
		--origam-bracket-seed---font-size: 0.75rem;
		--origam-bracket-seed---font-weight: 500;
	}
</style>
