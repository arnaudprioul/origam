<script
    lang="ts"
    setup
>
	import { OrigamApp } from '@origam/components'
</script>

<template>
	<!--
		Per-story shell. We still mount `<OrigamApp>` so layout-aware
		children (BottomNav, AppBar, Drawer, …) can register via
		`useLayoutItem`. Pass `:full-height="false"` so the layout's
		inner `__wrapper` does NOT pin to `100vw / 100vh` — that mode
		is for production app shells. In a story sandbox, the layout
		must hug the actual story content height, otherwise every
		variant floods the iframe with a full-viewport sheet and the
		user has to scroll past empty space to see what's below.
	-->
	<origam-app :full-height="false">
		<slot/>
	</origam-app>
</template>
