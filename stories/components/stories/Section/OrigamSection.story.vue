<template>
	<Story
			group="components"
			title="Section/OrigamSection"
	>
		<!--
			Playground — first variant by convention.
			OrigamSection is a stub component — default slot, container/row/col
			composition, and section-level tokens are planned but not yet
			implemented. Controls will be wired once the API is finalised.
		-->
		<Variant title="Default">
			<origam-section>
				<div class="demo-content">Playground — stub</div>
			</origam-section>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — default (WIP)">
			<origam-section/>
			<p style="margin-top: 12px; font-style: italic; opacity: 0.7;">
				Stub component — will be filled out in a follow-up. Default slot,
				container/row/col composition, and section-level tokens are
				planned but not yet implemented.
			</p>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-section>
				<div class="demo-content">
					<strong>Custom slot content</strong>
					<p>Anything goes inside a section.</p>
				</div>
			</origam-section>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSection } from '@origam/components'
</script>

<style scoped>
	.demo-content {
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
	}
</style>

<docs lang="md" src="@docs/components/Section/OrigamSection.md"/>
