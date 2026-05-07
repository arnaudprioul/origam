<template>
	<Story
			group="components"
			title="Section/OrigamSection"
	>

		<Variant title="Basic usage (WIP)">
			<origam-section/>
			<p style="margin-top: 12px; font-style: italic; opacity: 0.7;">
				Stub component — will be filled out in a follow-up. Default slot,
				container/row/col composition, and section-level tokens are
				planned but not yet implemented.
			</p>
		</Variant>

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
