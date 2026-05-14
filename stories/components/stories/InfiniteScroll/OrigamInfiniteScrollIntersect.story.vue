<template>
	<Story
			group="components"
			title="InfiniteScroll/OrigamInfiniteScrollIntersect"
	>

		<!--
			<origam-infinite-scroll-intersect> is a sentinel: an empty
			element observed by IntersectionObserver. When it scrolls
			into view inside its `rootRef`, it emits `intersect`. Used
			by <origam-infinite-scroll> to trigger more loads. Stories
			below show the parent in action; the sentinel itself has
			no visible chrome.
		-->

		<!-- ── Playground ─────────────────────────────────────────────── -->

		<Variant title="Playground">
			<div style="padding: 24px;">
				<origam-infinite-scroll
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						@load="handleLoad"
						data-cy="infinite-scroll-intersect-default"
				>
					<div
							v-for="(item, i) in items"
							:key="i"
							style="padding: 8px 16px; border-bottom: 1px solid var(--origam-color__border---subtle);"
					>
						Item #{{ i + 1 }} — {{ item }}
					</div>
				</origam-infinite-scroll>
				<p style="margin-top: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Scroll to the bottom of the box; the intersect sentinel
					triggers a load and appends 10 more items.
				</p>
			</div>
		</Variant>

		<!-- ── Props ──────────────────────────────────────────────────── -->

		<Variant title="Prop — side='both' (intersect at top + bottom)">
			<div style="padding: 24px;">
				<origam-infinite-scroll
						side="both"
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						@load="handleLoad"
						data-cy="infinite-scroll-intersect-both"
				>
					<div v-for="(item, i) in items" :key="i" style="padding: 8px 16px;">
						{{ i + 1 }}. {{ item }}
					</div>
				</origam-infinite-scroll>
			</div>
		</Variant>

		<Variant title="Prop — mode='manual' (load button instead of auto)">
			<div style="padding: 24px;">
				<origam-infinite-scroll
						mode="manual"
						load-more-text="Load more rows"
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						@load="handleLoad"
						data-cy="infinite-scroll-intersect-manual"
				>
					<div v-for="(item, i) in items" :key="i" style="padding: 8px 16px;">
						{{ i + 1 }}. {{ item }}
					</div>
				</origam-infinite-scroll>
			</div>
		</Variant>

		<!-- ── Notes ─────────────────────────────────────────────────── -->

		<Variant title="Slot — note (usage guidance)">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>&lt;origam-infinite-scroll-intersect&gt;</code> is normally
					rendered by the parent <code>OrigamInfiniteScroll</code> at
					each end of the scrollable area. It needs a <code>rootRef</code>
					prop pointing at the scroll viewport — without that, the
					IntersectionObserver has nothing to observe.
				</p>
				<p>
					Probing this component standalone in Histoire is rarely
					useful, so the Variants above showcase it through its
					parent.
				</p>
			</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — intersect">
			<div style="padding: 24px;">
				<origam-infinite-scroll
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						data-cy="infinite-scroll-intersect-emit"
						@load="handleEmitLoad"
				>
					<div
							v-for="(item, i) in emitItems"
							:key="i"
							style="padding: 8px 16px; border-bottom: 1px solid var(--origam-color__border---subtle);"
					>
						Item #{{ i + 1 }} — {{ item }}
					</div>
				</origam-infinite-scroll>
				<p style="margin-top: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					The internal sentinel emits <code>intersect</code> when scrolled into view,
					triggering the parent <code>load</code> event. Check the Histoire event log.
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
	import { logEvent } from 'histoire/client'

	import { OrigamInfiniteScroll, OrigamInfiniteScrollIntersect } from '@origam/components'

	const items = ref(Array.from({ length: 20 }, (_, i) => `lorem ipsum ${i + 1}`))
	let nextId = items.value.length

	const handleLoad = ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				nextId += 1
				items.value.push(`appended row ${nextId}`)
			}
			done?.('ok')
		}, 600)
	}

	const emitItems = ref(Array.from({ length: 20 }, (_, i) => `emit item ${i + 1}`))
	let emitNextId = emitItems.value.length

	const handleEmitLoad = ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
		logEvent('intersect', { side: 'end' })
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				emitNextId += 1
				emitItems.value.push(`emit row ${emitNextId}`)
			}
			done?.('ok')
		}, 600)
	}
</script>

<docs lang="md" src="@docs/components/InfiniteScroll/OrigamInfiniteScrollIntersect.md"/>
