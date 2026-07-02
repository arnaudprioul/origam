<template>
	<fieldset class="story-group">
		<legend class="story-group__legend">{{ title }}</legend>
		<div class="story-group__body">
			<slot/>
		</div>
	</fieldset>
</template>

<script
		lang="ts"
		setup
>
	defineProps<{ title: string }>()
</script>

<style scoped>
	.story-group {
		border: 1px solid rgb(127 127 127 / 0.25);
		border-radius: 6px;
		padding: 8px 10px 10px;
		margin: 0 0 12px;
		min-inline-size: 0;
	}

	.story-group__legend {
		padding: 0 6px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		opacity: 0.6;
	}

	.story-group__body {
		display: grid;
		gap: 12px;
	}
</style>
