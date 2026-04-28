<template>
	<Story
			group="components"
			title="Section/OrigamSection"
	>

		<!--
			OrigamSection is currently a stub component (no props, no slots).
			This story exposes the placeholder so testers can spot it in
			Histoire and track the day it gains its real API.
		-->

		<!-- ════════════ BASIC USAGE (placeholder) ════════════ -->
		<Variant title="Basic usage (WIP)">
			<origam-section/>
			<p style="margin-top: 12px; font-style: italic; opacity: 0.7;">
				Stub component — will be filled out in a follow-up. Default slot,
				container/row/col composition, and section-level tokens are
				planned but not yet implemented.
			</p>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant title="Playground">
			<origam-section/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSection } from '@origam/components'
</script>

<docs lang="md" src="@docs/components/Section/OrigamSection.md"/>
