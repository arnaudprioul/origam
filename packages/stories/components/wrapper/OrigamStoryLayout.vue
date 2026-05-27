<script
    lang="ts"
    setup
>
	import { OrigamApp } from '@origam/components'
</script>

<template>
	<origam-app :full-height="false">
		<slot/>
	</origam-app>
</template>
