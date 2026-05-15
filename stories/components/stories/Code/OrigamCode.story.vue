<template>
	<Story
			group="components"
			title="Code/OrigamCode"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICodeProps>({
					tag: 'div',
					lang: CODE_LANG.TS,
					lineNumbers: true,
					highlightLines: '2',
					copyable: true,
					maxHeight: null,
					theme: CODE_THEME.AUTO,
					wrap: false,
					format: false,
					filename: 'App.ts'
				})"
		>
			<template #default="{ state }">
				<origam-code v-bind="state" :code="playgroundSnippet"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.lang"           title="lang"           :options="codeLangList"/>
				<HstSelect   v-model="state.theme"          title="theme"          :options="codeThemeList"/>
				<HstText     v-model="state.highlightLines" title="highlight-lines (e.g. '2,5-7')"/>
				<HstText     v-model="state.filename"       title="filename"/>
				<HstNumber   v-model="state.maxHeight"      title="max-height (px, blank = none)"/>
				<HstCheckbox v-model="state.lineNumbers"    title="line-numbers"/>
				<HstCheckbox v-model="state.copyable"       title="copyable"/>
				<HstCheckbox v-model="state.wrap"           title="wrap"/>
				<HstCheckbox v-model="state.format"         title="format (v3 stub)"/>
			</template>
		</Variant>

		<Variant title="Prop — lang (parallel)">
			<div :style="stackStyle">
				<div v-for="entry in langSamples" :key="entry.lang">
					<h4 :style="langTitleStyle">{{ entry.lang }}</h4>
					<origam-code :lang="entry.lang" :code="entry.code" line-numbers/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — lineNumbers">
			<origam-code :lang="CODE_LANG.TS" :code="tenLineSnippet" line-numbers/>
		</Variant>

		<Variant title="Prop — highlightLines (2,5-7)">
			<origam-code :lang="CODE_LANG.TS" :code="tenLineSnippet" line-numbers highlight-lines="2,5-7"/>
		</Variant>

		<Variant title="Prop — theme (light vs dark)">
			<div :style="stackStyle">
				<div>
					<h4 :style="langTitleStyle">theme = light</h4>
					<origam-code :lang="CODE_LANG.TS" :code="shortSnippet" :theme="CODE_THEME.LIGHT" filename="light.ts"/>
				</div>
				<div>
					<h4 :style="langTitleStyle">theme = dark</h4>
					<origam-code :lang="CODE_LANG.TS" :code="shortSnippet" :theme="CODE_THEME.DARK" filename="dark.ts"/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — filename (header visible)">
			<origam-code :lang="CODE_LANG.VUE" :code="vueSnippet" filename="UserCard.vue" line-numbers/>
		</Variant>

		<Variant title="Prop — wrap">
			<div :style="stackStyle">
				<div>
					<h4 :style="langTitleStyle">wrap = false (scroll)</h4>
					<origam-code :lang="CODE_LANG.JS" :code="longLineSnippet"/>
				</div>
				<div>
					<h4 :style="langTitleStyle">wrap = true (soft)</h4>
					<origam-code :lang="CODE_LANG.JS" :code="longLineSnippet" wrap/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — maxHeight (scroll cap)">
			<origam-code :lang="CODE_LANG.TS" :code="longSnippet" :max-height="160" line-numbers/>
		</Variant>

		<Variant title="Slot — header (custom toolbar)">
			<origam-code :lang="codeSwitcherState.lang" :code="vueSnippet" copyable filename="App.vue">
				<template #header="{ filename, copy, copied }">
					<span style="font-weight: 600;">{{ filename }}</span>
					<div style="display: inline-flex; gap: 0.5rem; align-items: center;">
						<select v-model="codeSwitcherState.lang" style="font-size: 0.75rem;">
							<option v-for="opt in codeLangList" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
						</select>
						<button type="button" style="font-size: 0.75rem; cursor: pointer;" @click="copy">
							{{ copied ? 'Done!' : 'Copy snippet' }}
						</button>
					</div>
				</template>
			</origam-code>
		</Variant>

		<Variant title="Emit — @copy (counter)">
			<origam-code :lang="CODE_LANG.TS" :code="shortSnippet" @copy="copyEvents++"/>
			<p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">Copy events: <strong>{{ copyEvents }}</strong></p>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive, ref, type CSSProperties } from 'vue'

	import { OrigamCode } from '@origam/components'
	import { CODE_LANG, CODE_THEME } from '@origam/enums'
	import type { ICodeProps, IOptions } from '@origam/interfaces'
	import type { TCodeLang, TCodeTheme } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	/*********************************************************
	 * Option lists for the HstSelect controls.
	 ********************************************************/
	const codeLangList: Array<IOptions<TCodeLang>> = [
		{ label: 'plaintext', value: CODE_LANG.PLAINTEXT },
		{ label: 'vue', value: CODE_LANG.VUE },
		{ label: 'ts', value: CODE_LANG.TS },
		{ label: 'js', value: CODE_LANG.JS },
		{ label: 'tsx', value: CODE_LANG.TSX },
		{ label: 'jsx', value: CODE_LANG.JSX },
		{ label: 'scss', value: CODE_LANG.SCSS },
		{ label: 'css', value: CODE_LANG.CSS },
		{ label: 'json', value: CODE_LANG.JSON },
		{ label: 'bash', value: CODE_LANG.BASH },
		{ label: 'html', value: CODE_LANG.HTML },
		{ label: 'xml', value: CODE_LANG.XML },
		{ label: 'yaml', value: CODE_LANG.YAML },
		{ label: 'md', value: CODE_LANG.MD }
	]

	const codeThemeList: Array<IOptions<TCodeTheme>> = [
		{ label: 'auto (follow document)', value: CODE_THEME.AUTO },
		{ label: 'light', value: CODE_THEME.LIGHT },
		{ label: 'dark', value: CODE_THEME.DARK }
	]

	/*********************************************************
	 * Snippets — kept short on purpose so the playground renders
	 * fast and the visual signal stays legible.
	 ********************************************************/
	const playgroundSnippet = `const greet = (name: string): string => {
  return \`Hello, \${name}!\`
}

console.log(greet('origam'))`

	const shortSnippet = `import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)`

	const tenLineSnippet = `import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({ value: 0 }),
  getters: {
    double: (state) => state.value * 2
  },
  actions: {
    increment () { this.value++ },
    reset () { this.value = 0 }
  }
})`

	const longSnippet = `export class EventEmitter<T extends Record<string, unknown>> {
  private listeners = new Map<keyof T, Set<(payload: T[keyof T]) => void>>()

  on<K extends keyof T> (event: K, cb: (payload: T[K]) => void): () => void {
    const set = this.listeners.get(event) ?? new Set()
    set.add(cb as never)
    this.listeners.set(event, set)
    return () => this.off(event, cb)
  }

  off<K extends keyof T> (event: K, cb: (payload: T[K]) => void): void {
    this.listeners.get(event)?.delete(cb as never)
  }

  emit<K extends keyof T> (event: K, payload: T[K]): void {
    this.listeners.get(event)?.forEach((cb) => cb(payload))
  }
}`

	const longLineSnippet = `const url = 'https://api.example.com/v1/some/very/long/resource/path?with=lots&of=query&parameters=that&do=not&fit=on&one=line'
fetch(url).then((r) => r.json()).then(console.log)`

	const vueSnippet = `<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ user: { name: string, email: string } }>()
<\/script>`

	const langSamples = [
		{ lang: CODE_LANG.VUE, code: vueSnippet },
		{ lang: CODE_LANG.TS, code: shortSnippet },
		{ lang: CODE_LANG.SCSS, code: '.card {\n  background: var(--surface);\n  border-radius: 0.5rem;\n}' },
		{ lang: CODE_LANG.JSON, code: '{\n  "name": "origam",\n  "version": "2.2.1"\n}' },
		{ lang: CODE_LANG.BASH, code: '#!/usr/bin/env bash\nset -euo pipefail\nnpm run tokens:build' },
		{ lang: CODE_LANG.HTML, code: '<button class="btn" type="button">Click me</button>' }
	] as const

	const codeSwitcherState = reactive({ lang: CODE_LANG.VUE as TCodeLang })
	const copyEvents = ref(0)

	const stackStyle: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.25rem'
	}

	const langTitleStyle: CSSProperties = {
		margin: '0 0 0.5rem',
		fontSize: '0.75rem',
		textTransform: 'uppercase',
		letterSpacing: '0.05em',
		color: '#666'
	}
</script>

<docs lang="md" src="@docs/components/Code/OrigamCode.md"/>
